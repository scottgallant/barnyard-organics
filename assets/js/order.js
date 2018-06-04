Vue.component('prices-table', {
  props: [
    'products',
    'isRetail',
    'title'
  ], 
  data: function() {
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
    computedTotalPrice: function() {
      const computedTotalPrice = this.products.map(product => {
        if (!product.quantity) return null;
        if (this.isRetail()) {
          return product.quantity * product.price_retailers
        } else {
          return product.quantity * product.price 
        }
      });
      this.$emit('computed-total-price', computedTotalPrice)
      return computedTotalPrice
    }
  },
  methods: {
    toggle: function() {
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
    Sorry, there are no products available to buy.
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
            <input v-model="computedTotalPrice[index]" disabled class="row-sum rowTotal">
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
    bioAgComputedTotalPrice: []
  },
  methods: {
    isRetail() {
      return this.purchaser === 'retail' && this.companyName && this.companyName.trim().length > 0
    }
  }, 
  created: function() {
    this.barnyardOrganicsProducts = _orderForm.barnyard_organics.products
    this.generalSeedProducts = _orderForm.general_seed.products
    this.bioAgProducts = _orderForm.bio_ag.products
  }
})