'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var KG_TO_LBS = 55.1156;

Vue.component('prices-table', {
  props: ['products', 'isRetail', 'title', 'hst-tax-rate', 'formatNumber'],
  data: function data() {
    return {
      productsExpanded: false
    };
  },
  computed: {
    productsClass: function productsClass() {
      return {
        'fa-chevron-up': this.productsExpanded,
        'fa-chevron-down': !this.productsExpanded
      };
    },
    computedTotalPrice: function computedTotalPrice() {
      var _this = this;

      var computedTotalPrice = this.products.map(function (product) {
        var price = 0;
        if (!product.quantity || product.quantity <= 0) return {
          name: product.name,
          price: price,
          hst: 0,
          weight: 0,
          quantity: 0
        };
        if (_this.isRetail()) {
          price = product.quantity * product.price_retailers;
        } else {
          price = product.quantity * product.price;
        }
        return {
          name: product.name,
          price: price,
          quantity: product.quantity,
          hst: product.hst ? price * _this.hstTaxRate : 0,
          weight: product.quantity * KG_TO_LBS
        };
      });
      this.$emit('computed-total-price', computedTotalPrice);
      return computedTotalPrice;
    },
    formattedPriceArray: function formattedPriceArray() {
      var _this2 = this;

      return this.computedTotalPrice.map(function (priceObj) {
        return priceObj.price != 0 ? _this2.formatNumber(priceObj.price) : null;
      });
    }
  },
  methods: {
    toggle: function toggle() {
      this.productsExpanded = !this.productsExpanded;
    },
    checkQuantity: function checkQuantity(i) {
      var product = this.products[i];
      if (product.quantity < 0) product.quantity = 0;
      if (!Number.isInteger(product.quantity)) product.quantity = Math.floor(product.quantity);
      console.log('checkQuantity: ' + product.quantity);
    }
  },
  template: '\n  \n  <div>\n    <div>\n    <p>\n      <a href="#" @click.prevent="toggle()">{{title}}\n        <i class="icon" :class="productsClass"></i>\n      </a>\n    </p>\n  </div>\n\n  <div v-show="productsExpanded && products.length == 0">\n    <p>Sorry, there are no products available to buy.</p>\n  </div>\n\n  <table class="non-striped" style="display: none" v-show="productsExpanded && products.length > 0">\n    <thead>\n      <tr>\n        <th>Products</th>\n        <th width="15%">Quantity</th>\n        <th>Price</th>\n      </tr>\n    </thead>\n    <tbody>\n\n      <tr v-for="(product, index) in products">\n          <td>\n            <p style="margin-bottom: 0;">{{product.name}}</p>\n            <p style="margin-top: .5em; margin-bottom: .5em;" class="help-block">{{product.description}}</p>\n          </td>\n          <td width="15%">\n            <input type="number" name="quantity" v-model="product.quantity" min="0" @change="checkQuantity(index)">\n            <span class="help-block" id="priceTon" v-if="!isRetail()">$ {{ product.price }}\n              <small>each</small>\n            </span>\n            <span class="help-block" id="priceTon" v-if="isRetail()">$ {{ product.price_retailers }}\n                <small>/item</small>\n              </span>\n          </td>\n          <td width="15%">\n            <input :name="product.name + \' - price\'" v-model="formattedPriceArray[index]" disabled class="row-sum rowTotal">\n          </td>\n        </tr>\n    </tbody>\n    <tfoot>\n    </tfoot>\n  </table>\n  </div>\n  \n  '
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
    //grandTotal: 0,
    hstTaxRate: 0,
    shippingRates: {},
    selectedShipping: null,
    fuelSurcharge: {}
  },
  computed: {
    totalQuantity: function totalQuantity() {

      return this.barnyardOrganicsProducts.concat(this.generalSeedProducts).concat(this.bioAgProducts).reduce(function (sum, product) {
        if (!product || !product.quantity) return sum;
        return sum + Number(product.quantity);
      }, 0);
    },
    isOrderAllowed: function isOrderAllowed() {
      return this.totalQuantity != 0 && this.totalQuantity % 20 === 0;
    },
    weightTotal: function weightTotal() {
      return this.barnyardComputedTotalPrice.concat(this.generalSeedComputedTotalPrice).concat(this.bioAgComputedTotalPrice).reduce(function (sum, prices) {
        if (!prices || !prices.weight) return sum;
        return sum + prices.weight;
      }, 0);
    },
    shippingLocation: function shippingLocation() {
      var _this3 = this;

      //first, let's find the shipping location from the select.
      var item = null;
      var selectedShipping = this.selectedShipping;
      Object.keys(this.shippingRates).forEach(function (region) {
        var locations = _this3.shippingRates[region];
        locations.forEach(function (shippingRate) {
          if (shippingRate.location === selectedShipping) {
            item = shippingRate;
          }
        });
      });
      if (!item) return;
      return item;
    },
    shippingPrice: function shippingPrice() {
      var _this4 = this;

      //This function calculates the shipping price based on the location selected.
      if (!this.shippingLocation) return 0;
      //first, transform the object with prices in a simpler data structure.
      // move prom "price-1000: 3.55" to an object { key: 1000, value: 3.55 }
      var arrayOfPrices = [];
      Object.keys(this.shippingLocation).filter(function (key) {
        return key.startsWith("price-");
      }).forEach(function (price) {
        arrayOfPrices.push({
          key: Number(price.substring(6)),
          value: Number(_this4.shippingLocation[price])
        });
      });

      // sort this array of prices by key.
      arrayOfPrices.sort(function (item1, item2) {
        return item1.key - item2.key;
      });

      // compare the total weight against the key.
      // If the weight is more than the key, update the priceToReturn.
      // if the weight is greater than the key, we skip the check
      // (we have set the value at the preceeding check)
      var priceFor100Lbs = 0;
      arrayOfPrices.forEach(function (elem) {
        if (_this4.weightTotal >= elem.key) priceFor100Lbs = elem.value;
        if (_this4.weightTotal < elem.key) return;
      });

      var fuelSurcharge = this.weightTotal < 10000 ? this.fuelSurcharge.fuelSurcharge : this.fuelSurcharge.fuelSurcharge1000;

      // Now we finally calculate the shipping for this weight
      var priceToReturn = priceFor100Lbs * this.weightTotal / 100 * fuelSurcharge;

      console.log("----------------------------------");
      console.log("total weight: ", this.weightTotal);
      console.log("price per 100 lbs: ", priceFor100Lbs), console.log("shippingPrice: ", priceToReturn), console.log("fuelSurcharge: ", fuelSurcharge);
      return priceToReturn;
    },
    shippingPriceFormatted: function shippingPriceFormatted() {
      return this.formatNumber(this.shippingPrice);
    },
    shippingHST: function shippingHST() {
      var shippingHST = this.shippingPrice * this.hstTaxRate / 100;
      return shippingHST;
    },
    hstTax: function hstTax() {
      var hstForProducts = this.barnyardComputedTotalPrice.concat(this.generalSeedComputedTotalPrice).concat(this.bioAgComputedTotalPrice).reduce(function (sum, prices) {
        if (!prices || !prices.hst) return sum;
        return sum + prices.hst / 100;
      }, 0);
      console.log("HST for products: ", hstForProducts);
      console.log("HST for Shipping: ", this.shippingHST);
      var hstTotal = Number(hstForProducts) + Number(this.shippingHST);
      console.log("HST total: ", hstTotal);
      return hstTotal;
    },
    subtotal: function subtotal() {
      return Number(this.shippingPrice) + Number(this.itemsTotal);
    },
    subtotalFormatted: function subtotalFormatted() {
      return this.formatNumber(this.subtotal);
    },
    hstTaxFormatted: function hstTaxFormatted() {
      return this.formatNumber(this.hstTax);
    },
    itemsTotal: function itemsTotal() {
      return this.barnyardComputedTotalPrice.concat(this.generalSeedComputedTotalPrice).concat(this.bioAgComputedTotalPrice).reduce(function (sum, prices) {
        if (!prices || !prices.price) return sum;
        return sum + prices.price;
      }, 0);
    },
    orderSummary: function orderSummary() {
      var _this5 = this;

      return this.barnyardComputedTotalPrice.concat(this.generalSeedComputedTotalPrice).concat(this.bioAgComputedTotalPrice).reduce(function (summary, product) {
        if (product.price && product.quantity) {
          return summary + (product.name + ',\t ' + product.quantity + ',\t ' + _this5.formatNumber(product.price) + '\n');
        }
        return summary;
      }, '');
    },
    grandTotal: function grandTotal() {
      console.log('itemsTotal: ', this.itemsTotal);
      console.log('shippingPrice: ', this.shippingPrice);
      console.log('hstTax:', this.hstTax);
      return Number(this.itemsTotal) + Number(this.shippingPrice) + Number(this.hstTax);
    },
    grandTotalFormatted: function grandTotalFormatted() {
      return this.formatNumber(this.grandTotal);
    }
  },
  methods: {
    isRetail: function isRetail() {
      return this.purchaser === 'retail' && this.companyName && this.companyName.trim().length > 0;
    },

    formatNumber: function formatNumber(number) {
      return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(number);
    }

  },
  created: function created() {

    function convertPricesToNumbers(product) {
      return _extends({}, product, {
        price: Number(product.price),
        price_retailers: Number(product.price_retailers)
      });
    }

    this.barnyardOrganicsProducts = _orderForm.barnyard_organics.products.map(convertPricesToNumbers);
    this.generalSeedProducts = _orderForm.general_seed.products.map(convertPricesToNumbers);
    this.bioAgProducts = _orderForm.bio_ag.products.map(convertPricesToNumbers);
    this.hstTaxRate = Number(_orderForm.hst);
    this.fuelSurcharge = {
      fuelSurcharge: Number(_shippingRates.fuel_surcharge),
      fuelSurcharge1000: Number(_shippingRates.fuel_surcharge_10000)

    };
    var _shippingRates2 = _shippingRates;
    var fuel_surcharge = _shippingRates2.fuel_surcharge;
    var fuel_surcharge_10000 = _shippingRates2.fuel_surcharge_10000;

    var shippingRates = _objectWithoutProperties(_shippingRates2, ['fuel_surcharge', 'fuel_surcharge_10000']);

    this.shippingRates = shippingRates;
  }
});