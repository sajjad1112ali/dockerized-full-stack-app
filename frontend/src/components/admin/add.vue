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
        v-on:click="resetForm"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="card">
      <h5 class="card-header">Create Product</h5>
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


          <div class="form-group text-center">
           <button type="submit" v-on:click.prevent="addProduct" class="btn btn-success w-25">Add</button>
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
      product: {
        name: "",
        description: "",
        image_url: "",
        cost: "",
        available: true
      },
      submitted: false,
      messages: [],
      alertClass: ""
    };
  },
  methods: {
    addProduct: function() {

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

        this.$http
          .post("http://localhost:3010/api/product/add", this.product, {
            headers
          })
          .then(
            response => {
              this.setMessage("alert-success", "Product added successfully.");
              this.submitted = true;
              console.log(response);

              this.product = {
                name: "",
                description: "",
                image_url: "",
                cost: "",
                available: true
              };
            },
            response => {
              console.log(response);
              this.setMessage("alert-danger", response.body.message);
            }
          );
      }
    }, // End addProduct
    resetForm: function() {
      this.messages = [];
      this.submitted = false;
    }, // End resetForm
    setMessage: function(class_name, msg) {
      this.messages.push(msg);
      this.alertClass = class_name;
    }
  },
  mixins: [logOutMixins, beforeCreateMixins]
};
</script>

