var vm = new Vue({
  el: '#main',
  delimiters: ["((", "))"],
  data: {
    purchaser: 'farm',
    companyName: '',
    barnyardOrganicsProductsExpanded: false,
    generalSeedProductsExpanded: false,
    barnyardOrganicsProducts: []
  },
  computed: {
    barnyardOrganicsProductsClass: function () {
      return {
        'fa-chevron-up': this.barnyardOrganicsProductsExpanded,
        'fa-chevron-down': !this.barnyardOrganicsProductsExpanded
      }
    },
    generalSeedProductsClass: function () {
      return {
        'fa-chevron-up': this.barnyardOrganicsProductsExpanded,
        'fa-chevron-down': !this.barnyardOrganicsProductsExpanded
      }
    },
    barnyardComputedTotalPrice: function() {
      return this.barnyardOrganicsProducts.map(product => {
        if (!product.quantity) return '';
        if (this.isRetail()) {
          return product.quantity * product.price_retailers
        } else {
          return product.quantity * product.price 
        }
      })
    }
  },
  methods: {
    toggleBarnyard: function () {
      this.barnyardOrganicsProductsExpanded = !this.barnyardOrganicsProductsExpanded
    },
    toggleGeneral: function () {
      this.generalSeedProductsExpanded = !this.generalSeedProductsExpanded
    },
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