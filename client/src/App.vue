<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <RegisterUser></RegisterUser>
  <GetAllUser></GetAllUser>
  <DeletUser></DeletUser>
</template>

<script>
import GetAllUser from './components/getAllUser.vue';
import RegisterUser from './components/registerUser.vue';
import DeletUser from './components/deleteUser.vue';



export default {
  name: 'App',
  components: {
    RegisterUser,
    GetAllUser,
    DeletUser
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
