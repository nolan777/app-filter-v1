<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <DispUsers msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import DispUsers from '@/components/DispUsers.vue'

export default {
  name: 'Home',
  components: {
    DispUsers
  }
}
</script>
