<template>
  <div class="container">
    <h1>All Products</h1>

    <div class="form-group">
      <input type="text" class="form-control" v-model="search" v-on:keyup="fileterProducts($event)"/>
    </div>

    <div v-for="productChunks in allProducts" class="row row-eq-height pt-3">


<div v-for="product in productChunks" class="col-md-4 card">
  
      <div>
        <img v-bind:src="product.image_url" class="card-img-top" v-bind:alt="product.name" />
        <div class="card-body">
          <h5 class="card-title">{{product.name}} </h5>
          <p class="card-text">{{product.description}}</p>
          <p class="card-text">
            <small class="text-muted">{{product.available | is_available }}</small>
          </p>
        </div>
      </div>  
</div>




    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      allProducts: [],
      filteredProducts: [],
      search: ""
    };
  },
  methods:{
    fileterProducts: function(tb)
    {
      let products =  this.filteredProducts.filter(product => {
        return product.name.match(this.search);
      });
        this.allProducts = _.chunk(products, 3);
    }
  },
  computed: {
    // filteredProducts: function() {
    //   return this.allProducts.filter(product => {
    //     return product.name.match(this.search);
    //   });
    // }
  },

  created() {
    this.$http
      .get("http://localhost:3010/api/product")
      .then(
        response => {
          return response.json();
        },
        response => {
          // error callback
        }
      )
      .then(function(response) {
        let productArray = response.data;
        this.filteredProducts = response.data;
        this.allProducts = _.chunk(this.filteredProducts, 3);
      });
  }
};
</script>
  <style>
    .equal {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
  </style>