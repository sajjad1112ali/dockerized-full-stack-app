<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <input type="file" v-on:change="getSelectedImage($event)" />
      <button v-on:click="uploadImage">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      userImage: ''
    };
  },
  methods: {
    getSelectedImage: function(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadImage: function() {
      let data = new FormData();
      data.append("name", Date.now());
      data.append('files', this.selectedFile);
   let headers= {
       'Content-Type': 'multipart/form-data'
   };
      

      this.$http
        .post("http://localhost:3010/api/product/upload/image", data, {headers})
        .then(
          response => {
              console.log("YES");
              console.log(response);
          },
          response => {
              console.log("in error");
              console.log(response);
          }
        )
    }
  },
  created() {
    // console.log(Date.now());
  }
};
</script>
<style scoped>
.router-link-active {
  color: #fff !important;
}
html,
body {
  height: 100%;
}
</style>

  
