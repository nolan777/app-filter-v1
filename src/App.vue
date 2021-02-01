<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <DispUsers msg="Welcome to Your Vue.js App" />
      <div class="headt">
        <button id="fetch-users" class="btn btn-primary" v-on:click="fetchUsers">Réupérer des utilisateurs</button>
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
        <input type="text" v-model="search" placeholder="Rechercher"/>
        <label for="">Trier par âge :          
        </label>
        <p v-if="sortDirection === ''"> Par défaut</p>
        <p v-if="sortDirection === 'asc'"> Décroissant</p>
        <p v-if="sortDirection === 'desc'"> Croissant</p>
      </div>
    <p>il y a <strong>{{searchedUsers.length}}</strong> utilisateurs</p>
    <table id="tbl-users" class="table table-hover">
    <thead>
    <tr class="">
        <th>Photo</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Tel</th>
        <th>Genre</th>
        <th v-on:click="changeSort"> <a class="btn btn-light"> Âge
          <i v-if="sortDirection === 'asc' || sortDirection === 'desc'" class="fa" v-bind:class="[ sortDirection == 'asc' ? sortup : sortdown ]"></i>
        </a></th>
    </tr>
    </thead>
    <tbody id="tbody-users" v-if="users">
      <tr v-for="user in searchedUsers" :key="user.email">
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
      search: '',
      sortDirection: '',
      sortup: 'fa-sort-up',
      sortdown: 'fa-sort-down'
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
    },
    changeSort() {
      if (this.sortDirection == ''){
        this.sortDirection = 'asc'
      }else if (this.sortDirection == 'asc'){
        this.sortDirection = 'desc'
        this.users = this.users.sort((a,b) => a.dob.age > b.dob.age ? 1 : -1 )
      } else if (this.sortDirection == 'desc'){
        this.sortDirection = ''
        this.users = this.users.sort((a,b) => a.dob.age < b.dob.age ? 1 : -1 )
      }
    },
  },
  computed: {
    usersFiltered() {
      return this.users.filter((user) => this.genderFilter.includes(user.gender));
                
    },
    searchedUsers() {

      return this.usersFiltered.filter((user) => {
        if (user.name.first.toLowerCase().match(this.search)){
        return user.name.first.toLowerCase().match(this.search);
        } else if (user.name.last.toLowerCase().match(this.search)){
        return user.name.last.toLowerCase().match(this.search);
        }
      })
    },
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
