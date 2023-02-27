export default {
  methods: {
    logout: function () {
      this.$session.destroy();
      this.$router.push('/');
    }
  }

};