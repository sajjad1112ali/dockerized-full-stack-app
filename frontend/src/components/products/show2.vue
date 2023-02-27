<template>
  <div class="container">
    <h1>All Products</h1>

    <div class="form-group">
      <label for>Search</label>
      <input type="text" class="form-control" v-model="search" v-on:keyup="fileterProducts($event)" />
    </div>

    <div v-for="productChunks in allProducts" class="row row-eq-height pt-3">
      <div v-for="product in productChunks" class="col-md-4 card position-relative">
        <div class="pb-3">
          <img v-bind:src="product.image_url" class="card-img-top" v-bind:alt="product.name" />
          <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">{{product.description}}</p>
            <p class="card-text">
              <small class="text-muted">{{product.available | is_available }}</small>
            </p>
          </div>
        </div>
        <div class="anchor-container mt-3 mb-3">
          <router-link
            class="btn btn-primary position-absolute anchorClass"
            v-bind:to="'/product/'+product._id"
            exact
          >View more</router-link>
        </div>
      </div>
    </div>


      <h1
        v-bind:class="[isFinished ? 'finish' : 'load-more']"
        @click="getProducts()"
        v-cloak
      >{{ buttonText }}</h1>



  </div>
</template>


<script>
import filterProductsMixins from "../../mixins/filterProductsMixins";
import logOutMixins from "../../mixins/logOut";
export default {
  data() {
    return {
      allProducts: [],
      filteredProducts: [],
      search: "",
      limit: 3,
      page: 1,
      isFinished: false,
      buttonText: "Load More",

    };
  },
  methods: {
    getProducts: function(){

    this.$http
      .get(
        `http://localhost:3010/api/product?limit=${this.limit}&page=${this.page}`
      )
      .then(
        response => {
            if (response.body.data.docs.length) {
              // Update rowperpage
              this.page++;
              var len = response.body.data.docs.length;

              if (len > 0) {
                this.buttonText = "Loading ...";
                var self = this;
                setTimeout(function() {
                  self.buttonText = "Load More";
                  console.log(
                    `In function allProducts = ${self.rowperpage}`
                  );

                  // Loop on data and push in posts
                  for (let i = 0; i < response.body.data.docs.length; i++) {
                    console.log(`ROWS = ${self.rowperpage}`);
                    self.filteredProducts.push(response.body.data.docs[i]);
                  }

                 if(self.page != 2) $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                  self.allProducts = _.chunk(self.filteredProducts, 3);
      }, 1000);
              } else {
                this.allProducts = response.body.data.docs;
              }
            } else {
              this.buttonText = "No more records avaiable.";
              this.isFinished = true;
            }
          },
        response => {
          // error callback
        }
      );    
    }
  },
  computed: {},

  created() {
    this.getProducts()
  },
  mixins: [filterProductsMixins, logOutMixins]
};
</script>
  <style scopped>
.anchorClass {
  bottom: 15px;
  left: 31px;
}
</style>