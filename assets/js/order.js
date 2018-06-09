---
---
const KG_TO_LBS = 55.1156

Vue.component('prices-table', {
  props: [
    'products',
    'isRetail',
    'title',
    'hst-tax-rate', 
    'formatNumber'
  ],
  data() {
    return {
      productsExpanded: false
    }
  },
  computed: {
    productsClass() {
      return {
        'fa-chevron-up': this.productsExpanded,
        'fa-chevron-down': !this.productsExpanded
      }
    },
    computedTotalPrice() {
      const computedTotalPrice = this.products.map(product => {
        let price = 0;
        if (!product.quantity) return {
          price,
          hst: 0,
          weight: 0
        };
        if (this.isRetail()) {
          price = product.quantity * product.price_retailers
        } else {
          price = product.quantity * product.price
        }
        return {
          price,
          hst: product.hst ? price * this.hstTaxRate : 0,
          weight: product.quantity * KG_TO_LBS
        }
      });
      this.$emit('computed-total-price', computedTotalPrice)
      return computedTotalPrice
    },
    formattedPriceArray: function() {
      return this.computedTotalPrice.map(priceObj => {
        return this.formatNumber(priceObj.price)
      })
    }
  },
  methods: {
    toggle: function () {
      this.productsExpanded = !this.productsExpanded
    }
  },
  template: `
  {% raw %}
  <div>
    <div>
    <p>
      <a href="#" @click.prevent="toggle()">{{title}}
        <i class="icon" :class="productsClass"></i>
      </a>
    </p>
  </div>

  <div v-show="productsExpanded && products.length == 0">
    <p>Sorry, there are no products available to buy.</p>
  </div>

  <table class="non-striped" style="display: none" v-show="productsExpanded && products.length > 0">
    <thead>
      <tr>
        <th>Products</th>
        <th width="15%">Quantity (25Kg / 55.1156lbs Bags)</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
    
      <tr v-for="(product, index) in products">
          <td>
            <p style="margin-bottom: 0;">{{product.name}}</p>
            <p style="margin-top: .5em; margin-bottom: .5em;" class="help-block">{{product.description}}</p>
          </td>
          <td width="15%">
            <input type="number" :name="product.name + ' - quantity'" v-model="product.quantity">
            <span class="help-block" id="priceTon" v-if="!isRetail()">$ {{ product.price }}
              <small>/bag</small>
            </span>
            <span class="help-block" id="priceTon" v-if="isRetail()">$ {{ product.price_retailers }}
                <small>/bag</small>
              </span>
          </td>
          <td width="15%">
            <input :name="product.name + ' - price'" v-model="formattedPriceArray[index]" disabled class="row-sum rowTotal">
          </td>
        </tr>
    </tbody>
    <tfoot>
    </tfoot>
  </table>
  </div>
  {% endraw %}
  `
});


var vm = new Vue({
  el: '#vue-app',
  //delimiters: ["((", "))"],
  data: {
    purchaser: 'farm',
    companyName: '',
    barnyardOrganicsProducts: [],
    generalSeedProducts: [],
    bioAgProducts: [],
    barnyardComputedTotalPrice: [],
    generalSeedComputedTotalPrice: [],
    bioAgComputedTotalPrice: [],
    grandTotal: 0,
    hstTaxRate: 0,
    shippingRates: {},
    selectedShipping: null,
    fuelSurcharge: {}
  },
  computed: {
    totalQuantity() {

      return this.barnyardOrganicsProducts
        .concat(this.generalSeedProducts)
        .concat(this.bioAgProducts)
        .reduce(function (sum, product) {
          if (!product || !product.quantity) return sum
          return sum + Number(product.quantity)
        }, 0)
    },
    isOrderAllowed() {
      return (this.totalQuantity != 0 && this.totalQuantity % 20 === 0)
    },
    weightTotal() {
      return this.barnyardComputedTotalPrice
        .concat(this.generalSeedComputedTotalPrice)
        .concat(this.bioAgComputedTotalPrice)
        .reduce(function (sum, prices) {
          if (!prices || !prices.weight) return sum
          return sum + (prices.weight)
        }, 0);
    },
    shippingLocation() {
      //first, let's find the shipping location from the select. 
      let item = null;
      const selectedShipping = this.selectedShipping;
      Object.keys(this.shippingRates).forEach(region => {
        const locations = this.shippingRates[region]
        locations.forEach(shippingRate => {
          if (shippingRate.location === selectedShipping) {
            item = shippingRate
          }
        })
      })
      if (!item) return;
      return item
    },
    shippingPrice() {
      //This function calculates the shipping price based on the location selected. 
      if (!this.shippingLocation) return 0
      //first, transform the object with prices in a simpler data structure. 
      // move prom "price-1000: 3.55" to an object { key: 1000, value: 3.55 }
      const arrayOfPrices = []
      Object.keys(this.shippingLocation)
        .filter(key => key.startsWith("price-"))
        .forEach(price => {
          arrayOfPrices.push({
            key: Number(price.substring(6)),
            value: Number(this.shippingLocation[price])
          })
        })

      // sort this array of prices by key.
      arrayOfPrices.sort((item1, item2) => {
        return item1.key - item2.key
      })

      // compare the total weight against the key. 
      // If the weight is more than the key, update the priceToReturn.
      // if the weight is greater than the key, we skip the check 
      // (we have set the value at the preceeding check)
      let priceFor100Lbs = 0;
      arrayOfPrices.forEach(elem => {
        if (this.weightTotal >= elem.key) priceFor100Lbs = elem.value
        if (this.weightTotal < elem.key) return;
      })

      const fuelSurcharge = this.weightTotal < 10000 ?
        this.fuelSurcharge.fuelSurcharge :
        this.fuelSurcharge.fuelSurcharge1000

      // Now we finally calculate the shipping for this weight
      const priceToReturn = ((priceFor100Lbs * this.weightTotal) / 100) * fuelSurcharge

      console.log("----------------------------------")
      console.log("total weight: ", this.weightTotal)
      console.log("price per 100 lbs: ", priceFor100Lbs),
        console.log("shippingPrice: ", priceToReturn),
        console.log("fuelSurcharge: ", fuelSurcharge)
      return priceToReturn;
    },
    shippingPriceFormatted() {
      return this.formatNumber(this.shippingPrice);
    },
    shippingHST() {
      const shippingHST = this.shippingPrice * this.hstTaxRate / 100
      return shippingHST
    },
    hstTax() {
      const hstForProducts = this.barnyardComputedTotalPrice
        .concat(this.generalSeedComputedTotalPrice)
        .concat(this.bioAgComputedTotalPrice)
        .reduce(function (sum, prices) {
          if (!prices || !prices.hst) return sum
          return sum + (prices.hst / 100)
        }, 0);
      console.log("HST for products: ", hstForProducts)
      console.log("HST for Shipping: ", this.shippingHST)
      const hstTotal = hstForProducts + this.shippingHST
      console.log("HST total: ", hstTotal)
      return hstTotal
    },
    hstTaxFormatted() {
      return this.formatNumber(this.hstTax)
    },
    grandTotalFormatted() {
      return this.formatNumber(this.grandTotal)
    }
  },
  watch: {
    //using watch because computed properties can't detect modifications in arrays.
    barnyardComputedTotalPrice() {
      this.computeGrandTotal()
    },
    generalSeedComputedTotalPrice: function () {
      this.computeGrandTotal()
    },
    bioAgComputedTotalPrice: function () {
      this.computeGrandTotal()
    },
  },
  methods: {
    isRetail() {
      return this.purchaser === 'retail' && this.companyName && this.companyName.trim().length > 0
    },
    computeGrandTotal() {
      const itemsTotal = this.barnyardComputedTotalPrice
        .concat(this.generalSeedComputedTotalPrice)
        .concat(this.bioAgComputedTotalPrice)
        .reduce(function (sum, prices) {
          if (!prices || !prices.price) return sum
          return sum + prices.price
        }, 0);
      const grandTotal = Number(itemsTotal) + Number(this.shippingPrice) + Number(this.hstTax)
      console.log(grandTotal)
      
      this.grandTotal = grandTotal
    },

    formatNumber(number) {
      return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(number)
    },
    submitForm() {
      $("#order-form").submit(function(e) {
        e.preventDefault();
        
        var $form = $(this);
        console.log($form);
        $.post($form.attr("action"), $form.serialize()).then(function() {
          alert("Thank you!");
        });
      });
    }
  },
  created() {

    function convertPricesToNumbers(product) {
      return {
        ...product,
        price: Number(product.price),
        price_retailers: Number(product.price_retailers)
      }
    }

    this.barnyardOrganicsProducts = _orderForm.barnyard_organics.products.map(convertPricesToNumbers);
    this.generalSeedProducts = _orderForm.general_seed.products.map(convertPricesToNumbers);
    this.bioAgProducts = _orderForm.bio_ag.products.map(convertPricesToNumbers);
    this.hstTaxRate = Number(_orderForm.hst)
    this.fuelSurcharge = {
      fuelSurcharge: Number(_shippingRates.fuel_surcharge),
      fuelSurcharge1000: Number(_shippingRates.fuel_surcharge_10000)

    }
    const {
      fuel_surcharge,
      fuel_surcharge_10000,
      ...shippingRates
    } = _shippingRates
    this.shippingRates = shippingRates
  }
})