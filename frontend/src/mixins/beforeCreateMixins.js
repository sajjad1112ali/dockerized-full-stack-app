export default {
    beforeCreate: function () {
        if (!this.$session.exists()) {
          this.$router.push('/admin/login');
        }
      }
};