<template>
  <div class="container pt-5">
    <div v-if="hasError" class="alert alert-danger alert-dismissible fade show" role="alert">
      <b>{{ message }}</b>

      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="card">
      <h5 class="card-header">Admin Login</h5>
      <div class="card-body">
        <form action="#">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="user.email" class="form-control" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" v-model="user.password" class="form-control" />
          </div>
          <div class="form-group text-center">
            <button type="submit" v-on:click.prevent="doLogin" class="btn btn-success w-25">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasError: false,
      message: "Kindly provide required field.",
      user: {
        email: "sajjad.ali@yahoo.com",
        password: "Sajjad@1"
      }
    };
  },
  methods: {
    doLogin: function() {
      if (this.user.email == "" || this.user.password == "") {
        this.hasError = true;
        this.message = "Kindly provide required field.";
      } else {
        let headers = {
          "Content-Type": "application/json"
        };

        this.$http
          .post("http://localhost:3010/api/user", this.user, {
            headers
          })
          .then(
            response => {
              if (response.body.status) {
                this.$session.start();
                this.$session.set("token", response.body.data.token);
                this.$router.push("/admin/dashboard");
              } else {
                this.message = "Email or password is in correct.";
              }
            },
            response => {
              console.log(response.body);
              this.hasError = true;
              this.message = response.body.message;
            }
          );
      }
    }
  }
};
</script>