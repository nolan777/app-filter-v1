<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <DispUsers msg="Welcome to Your Vue.js App" />
  <table id="tbl-users" class="table table-hover">
    <thead>
      <button id="fetch-users" class="btn btn-primary" v-on:click="fetchUsers">Réupérer les utilisateurs</button>
      <label>
      <input
        v-model="genderFilter"
        type="checkbox"
        value="male"
      >
        Hommes
      </label>
      <label>
        <input
          v-model="genderFilter"
          type="checkbox"
          value="female"
        >
        Femmes
      </label>
    <tr>
        <th></th>
        <th>Nom</th>
        <th>Email</th>
        <th>Tel</th>
        <th>Genre</th>
        <th> Âge</th>
    </tr>
    </thead>
    <tbody id="tbody-users" v-if="users">
      <tr v-for="user in usersFiltered" :key="user.email">
          <td><img :src="user.picture.thumbnail"></td>
          <td>{{ user.name.first }} {{ user.name.last }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.dob.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DispUsers from './components/DispUsers.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    DispUsers
  },
  data() {
    return {
      fkey: "gender",
      users: [],
      tableau: true,
      errored: false,
      genderFilter: ['male', 'female'],
    }
  },
  methods: {
    fetchUsers() {
      if (this.users == '')
      axios
        .get('https://randomuser.me/api/?results=20')
        .then(response => {
          this.users = response.data.results
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
      else 
      axios
        .get('https://randomuser.me/api/?results=20')
        .then(response => {
         this.users.push.apply(this.users, response.data.results)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  },
  computed: {
    usersFiltered() {
      return this.users.filter((user) => this.genderFilter.includes(user.gender));
                
    }
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
