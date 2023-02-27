<template>
  <div class="container">
    <h1>All Products</h1>

    <!-- Posts List -->
    <div class="container" id="myapp">
      <!-- Post -->
      <div class="post" v-for="post in allProducts">
        <h1 v-cloak>{{ post.name }}</h1>
        <p v-cloak>{{ post.description }}</p>
      </div>

      <!-- Load More -->
      <h1
        v-bind:class="[isFinished ? 'finish' : 'load-more']"
        @click="getPosts()"
        v-cloak
      >{{ buttonText }}</h1>
    </div>
  </div>
</template>


<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      allProducts: [],
      filteredProducts: [],
      search: "",
      isFinished: false,
      row: 0, // Record selction position
      rowperpage: 3, // Number of records fetch at a time
      buttonText: "Load More",
      posts: [],
      page: 1,
      limit: 3
    };
  },
  methods: {
    getPosts: function() {
                  console.log(
                    `The length of allProducts = ${this.allProducts.length}`
                  );
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
                    self.allProducts.push(response.body.data.docs[i]);
                  }

                  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                }, 2000);
              } else {
                this.allProducts = response.body.data.docs;
              }
            } else {
              this.buttonText = "No more records avaiable.";
              this.isFinished = true;
            }
          },
          response => {
            console.log(response);
          }
        );
    }
  },
  computed: {},

  created() {
    this.getPosts();
  }
};
</script>
  <style scopped>
.container {
  width: 55%;
  margin: 0 auto;
  border: 0px solid black;
  padding: 10px 0px;
}

/* post */
.post {
  width: 97%;
  min-height: 200px;
  padding: 5px;
  border: 1px solid gray;
  margin-bottom: 15px;
}

.post h1 {
  letter-spacing: 1px;
  font-weight: normal;
  font-family: sans-serif;
}

.post p {
  letter-spacing: 1px;
  text-overflow: ellipsis;
  line-height: 25px;
}

/* Load more */
.load-more {
  background: #15a9ce;
  text-align: center;
  color: white;
  padding: 10px 0px;
  font-family: sans-serif;
  margin-top: 1.5rem;
}

.load-more:hover {
  cursor: pointer;
}

/* Finish */
.finish {
  width: 99%;
  background: darkgray;
  text-align: center;
  color: white;
  padding: 10px 0px;
  font-family: sans-serif;
}

/* more link */
.more {
  color: blue;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 16px;
}

[v-cloak] {
  display: none;
}
</style>