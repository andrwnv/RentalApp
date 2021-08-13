<template>
  <div class = 'login_page'>
    <LoginComponent />
  </div>
</template>

<script>
import LoginComponent from '../components/LoginComponent.vue';

export default {
  name: 'HelloWorld',
  components: {
    LoginComponent,
  }
}
</script>

<style scoped>
.login_page {
  width: 100%;
  height: 100vh;
  background-image: url('../assets/auth_bg.png');
  background-size: cover;

  display: flex;
  justify-content: center;
}
</style>
