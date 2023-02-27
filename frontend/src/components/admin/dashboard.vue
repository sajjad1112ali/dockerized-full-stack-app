<template>
  <div class="container">
    <h1>All Products</h1>

    <div class="form-group">
      <label for>Search</label>
      <input type="text" class="form-control" v-model="search" v-on:keyup="fileterProducts($event)" />
    </div>

    <div class="form-group">
      <router-link class="btn btn-success" role="button" v-bind:to="{name: 'addProduct'}" exact>Add</router-link>
    </div>

    <div
      v-if="messages.length"
      class="alert alert-dismissible fade show"
      v-bind:class="alertClass"
      role="alert"
    >
      <b v-for="error in messages">{{ error }}</b>

      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <table class="table table-bordered table-striped table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Is available</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="productChunks in allProducts">
          <tr v-for="product in productChunks">
            <th scope="row">1</th>
            <td>{{product.name}}</td>
            <td>
              <img
                v-bind:src="product.image_url"
                class="img-fluid"
                style="width: 80px; height: 80px;"
                v-bind:alt="product.name"
              />
            </td>
            <td>{{product.available | is_available }}</td>
            <td>
              <router-link
                class="text-white"
                v-bind:to="{name: 'editProduct', params: { id: product._id }}"
                exact
              >Edit</router-link> |
              <span
                class="text-white span-link"
                v-on:click.prevent="deleteThis($event)"
                :data-id="product._id"
              >Delete</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- PAGINATION -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <a
            class="page-link"
            href="#"
            v-on:click.prevent="changeTable($event)"
            data-page="Previous"
          >Previous</a>
        </li>
        <li
          v-for="(n,index) in paginationLinksNumber"
          class="page-item"
          v-bind:class="{ disabled: index == 0}"
        >
          <a
            class="page-link"
            href="#"
            v-on:click.prevent="changeTable($event)"
            :data-page="index"
            v-bind:class="{paginationActive: index == 0 }"
          >{{++index}}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            v-on:click.prevent="changeTable($event)"
            data-page="Next"
          >Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
import logOutMixins from "../../mixins/logOut";
import beforeCreateMixins from "../../mixins/beforeCreateMixins";

import filterProductsMixins from "../../mixins/filterProductsMixins";

export default {
  data() {
    return {
      allProducts: [],
      filteredProducts: [],
      search: "",
      messages: [],
      alertClass: "",
      limit: 3,
      page: 1,
      paginationLinksNumber: 0
    };
  },
  methods: {
    deleteThis: function(evt) {
      let senderTag = evt.currentTarget;

      if (confirm("Are you sure you want to delete?")) {
        this.messages = [];

        let headers = {
          "Content-Type": "application/json",
          "x-auth-token": this.$session.get("token")
        };

        this.$http
          .delete(
            `http://localhost:3010/api/product/${senderTag.getAttribute(
              "data-id"
            )}`,
            { headers }
          )
          .then(
            response => {
              console.log(response);
              senderTag.parentElement.parentElement.remove();

              var removeIndex = this.filteredProducts
                .map(function(item) {
                  return item._id;
                })
                .indexOf(senderTag.getAttribute("data-id"));
              this.setMessage("alert-success", response.body.message);
            },
            response => {
              console.log(response);
              evt.currentTarget.parentElement.parentElement.remove();

              this.setMessage("alert-danger", response.body.message);
            }
          );
      }
    }, // End deleteThis

    setMessage: function(class_name, msg) {
      this.messages.push(msg);
      this.alertClass = class_name;
    },
    getProducts: function() {
      this.$http
        .get(
          `http://localhost:3010/api/product?limit=${this.limit}&page=${this.page}`
        )
        .then(
          response => {
            return response.json();
          },
          response => {
            console.log(response);
          }
        )
        .then(function(response) {
          let productArray = response.data;
          this.filteredProducts = response.data.docs;
          this.paginationLinksNumber = Math.ceil(
            response.data.total / this.limit
          );
          this.allProducts = _.chunk(this.filteredProducts, 3);
        });
    },
    changeTable: function(evt) {
      let paginateText = evt.currentTarget.getAttribute("data-page");
      if (paginateText == "Next") {
        this.page++;
      } else if (paginateText == "Previous") {
        this.page--;
      } else {
        this.page = parseInt(paginateText) + 1;
      }

      this.makeThisActive(evt.currentTarget, paginateText);
      this.getProducts();
    }, // End changeTable
    makeThisActive: function(tag, txt) {
      $(".page-item").removeClass("disabled");
      $(".page-link").removeClass("paginationActive");
      if (txt != "Next" || txt != "Previous") {
        console.log(`Page = ${this.page}, Text = ${this.page - 1}`);

        $(`a[data-page="${this.page - 1}"]`)
          .parent()
          .addClass("disabled");
        $(`a[data-page="${this.page - 1}"]`).addClass("paginationActive");
      }

      if (this.page == 1 || this.page == this.paginationLinksNumber) {
        let makeDisable = this.page == 1 ? "Previous" : "Next";
        $(`a[data-page="${makeDisable}"]`)
          .parent()
          .addClass("disabled");
      }
    } // End makeThisActive
  },
  computed: {},

  created() {
    this.getProducts();
  },
  mixins: [logOutMixins, beforeCreateMixins, filterProductsMixins]
};
</script>
  <style scopped>
.page-item.disabled .page-link.paginationActive {
  z-index: 1;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
</style>