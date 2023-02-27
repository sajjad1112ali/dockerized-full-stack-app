<template>
  <div id="app">
   <showHeader v-bind:isAdmin="isAdmin"></showHeader> 
   <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/header.vue'

export default {
  name: 'app',
    data() {
    return {
      isAdmin: false
    };
  },
  components: {
    showHeader: Header
  },
  created() {
        if (this.$session.exists()) {
          this.isAdmin = true;
        }
  },
  watch: {
    $route(to, from) {
        this.isAdmin = false;
        if (this.$session.exists()) {
          this.isAdmin = true;
        }

    }
  }

}
</script>
