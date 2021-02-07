<template>
  <div class="headt">
    <p>Bonjour utilisateur {{this.$route.params.id}}</p>
    <pre>{{user}}</pre>
  </div>
  <table class="table table-hover" v-if="user">
  <thead>
    <tr>
        <th>Photo</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Tel</th>
        <th>Genre</th>
        <th>Âge</th>
    </tr>
    </thead>
    <tbody>
      <tr :key="user.id">
        <td><img :src="user.avatarUrl" width="100"></td>
        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.tel }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Users',
  components: {
    
  },
  data() {
    return {
      user: {},
      errored: false,
    }
  },
  
  methods: {
    fetchUsers() { 
      axios
        .get('http://localhost:8010/users/$(this.$route.params.id)')
        .then(response => {
         this.user = response.data
         //this.users = this.users.concat(response.data.results)
        })
        .catch(error => {
          console.error(error)
          this.errored = true
        })
    },
  },
  mounted() {
      console.log(this.users)
      
  }
  //created(){ this.fetchUsers()},
  
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
.headt{
  display: flex;
  justify-content: space-around;
}
.btn-primary{
  background-color: #41B883!important;
  border-color: #41B883!important;
}
.btn-primary:hover{
  background-color: #35495E!important;
}
</style>