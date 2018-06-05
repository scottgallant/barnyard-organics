Vue.component('prices-table', {
  props: [
    'products',
    'isRetail',
    'title',
    'hst-tax-rate'
  ],
  data: function () {
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
    computedTotalPrice: function () {
      const computedTotalPrice = this.products.map(product => {
        let price = 0; 
        if (!product.quantity) return {price, hst: 0};
        if (this.isRetail()) {
          price = product.quantity * product.price_retailers
        } else {
          price = product.quantity * product.price
        }
        return {
          price, 
          hst: product.hst ? price*this.hstTaxRate : 0
        }
      });
      this.$emit('computed-total-price', computedTotalPrice)
      return computedTotalPrice
    }
  },
  methods: {
    toggle: function () {
      this.productsExpanded = !this.productsExpanded
    }
  },
  template: `
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
        <th width="15%">Quantity (25Kg Bags)</th>
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
            <input type="number" name="quantity" v-model="product.quantity">
            <span class="help-block" id="priceTon" v-if="!isRetail()">$ {{ product.price }}
              <small>/bag</small>
            </span>
            <span class="help-block" id="priceTon" v-if="isRetail()">$ {{ product.price_retailers }}
                <small>/bag</small>
              </span>
          </td>
          <td width="15%">
            <input v-model="computedTotalPrice[index].price" disabled class="row-sum rowTotal">
          </td>
        </tr>
    </tbody>
    <tfoot>
    </tfoot>
  </table>
  </div>
  `
});


var vm = new Vue({
  el: '#main',
  delimiters: ["((", "))"],
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
    hstTaxRate: 0
  },
  computed: {
    totalQuantity: function () {

      return this.barnyardOrganicsProducts
        .concat(this.generalSeedProducts)
        .concat(this.bioAgProducts)
        .reduce(function (sum, product) {
          if (!product || !product.quantity) return sum
          return sum + Number(product.quantity)
        }, 0)
    }, 
    isOrderAllowed: function() {
      return (this.totalQuantity != 0 && this.totalQuantity % 20 === 0) 
    },
    hstTax: function() {
      return this.barnyardComputedTotalPrice
      .concat(this.generalSeedComputedTotalPrice)
      .concat(this.bioAgComputedTotalPrice)
      .reduce(function (sum, prices) {
        if (!prices || !prices.hst) return sum
        return sum + (prices.hst/100)
      }, 0);
    }
  },
  watch: {
    //using watch because computed properties can't detect modifications in arrays.
    barnyardComputedTotalPrice: function () {
      this.computeGrandTotal()
    },
    generalSeedComputedTotalPrice: function () {
      this.computeGrandTotal()
    },
    bioAgComputedTotalPrice: function () {
      this.computeGrandTotal()
    }
  },
  methods: {
    isRetail: function () {
      return this.purchaser === 'retail' && this.companyName && this.companyName.trim().length > 0
    },
    computeGrandTotal: function () {
      this.grandTotal =
        this.barnyardComputedTotalPrice
        .concat(this.generalSeedComputedTotalPrice)
        .concat(this.bioAgComputedTotalPrice)
        .reduce(function (sum, prices) {
          if (!prices || !prices.price) return sum
          return sum + prices.price
        }, 0);
    }
  },
  created: function () {
    this.barnyardOrganicsProducts = _orderForm.barnyard_organics.products
    this.generalSeedProducts = _orderForm.general_seed.products
    this.bioAgProducts = _orderForm.bio_ag.products
    this.hstTaxRate = Number(_orderForm.hst)
  }
})