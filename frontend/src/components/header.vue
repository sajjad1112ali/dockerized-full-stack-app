<template>
<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" v-bind:to="{name: 'home'}" exact>Home</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li v-if="isAdmin" class="nav-item">
        <router-link class="nav-link" v-bind:to="{name: 'dashboard'}" exact>Dashboard</router-link>
      </li>
    </ul>
    <span v-if="isAdmin" class="navbar-text cursor-pointer"  v-on:click.prevent="logout">
      Logout
    </span>
  </div>
</nav>


</div>
</template>

<script>
import logOutMixins from "../mixins/logOut";
export default {
  props: ['isAdmin'],
  data() {
    return {
    };
  },
  mixins: [logOutMixins]
};
</script>
<style>
.router-link-active {
  color: #fff !important;
}
</style>

  
