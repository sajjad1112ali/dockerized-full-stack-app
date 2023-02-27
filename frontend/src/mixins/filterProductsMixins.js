export default {
  methods: {
    fileterProducts: function(tb)
    {
      let products =  this.filteredProducts.filter(product => {
        return product.name.toLowerCase().match(this.search.toLowerCase());
      });
        this.allProducts = _.chunk(products, 3);
    }
  }

};