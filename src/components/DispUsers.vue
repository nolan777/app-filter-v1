<template>
  <div class="container-fluid">
    <div id="test">
      <div>
        <h1>Vue app filter v1</h1>
        <hr>
            
            
        <p id="nb-users" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DispUsers',
  props: {
    msg: String
  },
  data() {
    return {
      users: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
