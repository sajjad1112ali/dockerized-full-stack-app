<template>
  <div class="container pt-5">
    <div
      v-if="messages.length || submitted"
      class="alert alert-dismissible fade show"
      v-bind:class="alertClass"
      role="alert"
    >
      <b v-for="error in messages">{{ error }}</b>

      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="card">
      <h5 class="card-header">Edit Product</h5>
      <div class="card-body">
        <form action="#">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="product.name" class="form-control" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" v-model="product.description" class="form-control" />
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="text" v-model="product.image_url" class="form-control" />
          </div>
          <div class="form-group">
            <label>Cost</label>
            <input type="text" v-model="product.cost" class="form-control" />
          </div>

<input
  type="checkbox"
  v-model="product.available"
  true-value="true"
  false-value="false"
> Is Availabe
          <div class="form-group text-center">
           <button type="submit" v-on:click.prevent="EditProduct" class="btn btn-success w-25">Edit</button>
          </div>


        </form>
      </div>
    </div>
  </div>
</template>

<script>

import logOutMixins from "../../mixins/logOut";
import beforeCreateMixins from "../../mixins/beforeCreateMixins";
export default {
  data() {
    return {
      id: this.$route.params.id,
      product: [],
      submitted: false,
      messages: [],
      alertClass: ""
    };
  },
  methods:{
    EditProduct: function()
    {

      this.messages = [];
       if (this.product.name == "" || this.product.description == "") {
     // if (0) {
        this.setMessage(
          "alert-danger",
          "Kindly provide all the required fields."
        );
      } else {
        let headers = {
          "Content-Type": "application/json",
          "x-auth-token": this.$session.get("token")
        };

        this.product.id = this.id;
        this.$http
          .put(`http://localhost:3010/api/product/${this.id}`, _.pick(this.product, ['name','description', 'image_url', 'cost', 'available' ]), {
            headers
          })
          .then(
            response => {
              this.setMessage("alert-success", "Product updated successfully.");
              this.submitted = true;
            },
            response => {
                console.log(response.body.message);
              this.setMessage("alert-danger", response.body.message);
            }
          );
      }
    }, // End EditProduct
    setMessage: function(class_name, msg) {
      this.messages.push(msg);
      this.alertClass = class_name;
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
  },
  mixins: [logOutMixins, beforeCreateMixins]
};
</script>
