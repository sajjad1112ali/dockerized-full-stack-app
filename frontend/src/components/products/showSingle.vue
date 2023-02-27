<template>
  <div class="container mt-5">
    <div class="row row-eq-height">
      <div class="col-lg-4 card">
        <img v-bind:src="product.image_url" class="card-img-top" v-bind:alt="product.name" />
      </div>
      <div class="col-lg-8 card">
        <div class="">
        <div class="card-body">
          <h5 class="card-title">{{product.name}} </h5>
          <p class="card-text">{{product.description}}</p>
          <p class="card-text">
            Status: <small class="text-muted">{{product.available | is_available }}</small>
          </p>
          <p class="card-text">
            Cost: <strong class="text-muted">{{product.cost | currency }}</strong>
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
      id: this.$route.params.id,
      product: []
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
  created() {
    this.$http
      .get("http://localhost:3010/api/product/"+this.id)
      .then(
        response => {
          return response.json();
        },
        response => {
          // error callback
        }
      )
      .then(function(response) {
        this.product = response.data;
        console.log(this.product);
      });
  }
};
</script>
