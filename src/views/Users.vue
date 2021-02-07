<template>
  <DispUsers msg="Welcome to Your Vue.js App" />
  <div class="headt">
    <button class="btn btn-primary" v-on:click="fetchUsers">Récupérer des utilisateurs</button>
    <label>
      <input
        v-model="genderFilter"
        type="checkbox"
        value="male"
        :disabled="genderFilter.length<2 && genderFilter.includes('male')"
      >
      Hommes
    </label>
    <label>
      <input
        v-model="genderFilter"
        type="checkbox"
        value="female"
        :disabled="genderFilter.length<2 && genderFilter.includes('female')"
      >
      Femmes
    </label>
    <label>
      Rechercher :
      <input type="text" v-model="search" placeholder="Rechercher"/>
    </label>  
    <label>Trier par âge :          
    </label>
    <p v-if="sortDirection === ''">Par défaut</p>
    <p v-if="sortDirection === 'asc'">Croissant</p>
    <p v-if="sortDirection === 'desc'">Décroissant</p>
  </div>
  <p v-if="users.length">il y a <strong>{{searchedUsers.length}}</strong> utilisateur{{ searchedUsers.length > 1 ? 's' : ''}} filtré{{ searchedUsers.length > 1 ? 's' : ''}} sur <strong>{{users.length}}</strong> utilisateurs</p>
  <p v-else >il n'y a <strong>aucun</strong> utilisateur récupéré</p>
  <button @click="resetFilters" class="btn btn-primary">Réinitialiser les filtres</button>
  <table class="table table-hover" v-if="users.length">
  <thead>
    <tr>
        <th>Photo</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Tel</th>
        <th>Genre</th>
        <th> <button v-on:click="changeSort" class="btn btn-light"> Âge
          <i v-if="sortDirection" class="fa" v-bind:class="[ sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down' ]"></i>
        </button></th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="user in searchedUsers" :key="user.id">
        <td><img :src="user.avatarUrl" width="100"></td>
        <td>{{ user.firstName }} {{ user.lastName }} <router-link :to="{name : 'User', params:{id: user.id} }">éditer</router-link></td>
        <td>{{ user.email }}</td>
        <td>{{ user.tel }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DispUsers from '../components/DispUsers.vue'
import axios from 'axios'

export default {
  name: 'Users',
  components: {
    DispUsers
  },
  data() {
    return {
      users: [],
      errored: false,
      genderFilter: (this.$route.query.gender || 'male,female').split(','),
      search: this.$route.query.search || '',
      sortDirection: this.$route.query.sortdirection || '',
    }
  },
  
  methods: {
    fetchUsers() { 
      axios
        .get('http://localhost:8010/users')
        .then(response => {
         this.users = response.data
         console.log(this.users)
         //this.users = this.users.concat(response.data.results)
        })
        .catch(error => {
          console.error(error)
          this.errored = true
        })
    },
    changeSort() {
      if (this.sortDirection === ''){
        this.sortDirection = 'asc'
        return this.users
      }else if (this.sortDirection === 'asc'){
        this.sortDirection = 'desc'
      } else if (this.sortDirection === 'desc'){
        this.sortDirection = ''
      }
    },
    updateQuery() {
        const query = {}
        if (this.genderFilter.length <2) {
            query.gender = this.genderFilter.join('')
        }
        if (this.search){
            query.search = this.search
        }
        if (this.sortDirection) {
            query.sortdirection = this.sortDirection
        }
        this.$router.push({ query: query })
    },
    resetFilters() {
        this.genderFilter = ['male','female'],
        this.search = '',
        this.sortDirection = ''
    }
  },
  computed: {
    searchedUsers() {
      return this.users
      .filter((user) => this.genderFilter.includes(user.gender))
      .filter((user) => {
        return (user.firstName.toLowerCase().includes(this.search.toLowerCase())) ||
        (user.lastName.toLowerCase().includes(this.search.toLowerCase()))
      })
      .sort((a,b) => {
        if (!this.sortDirection) return 0;
        const  modifier = this.sortDirection === 'desc' ? -1 : 1;
        return (a.age - b.age) * modifier;
      })
    },
    
  },
  watch: {
      genderFilter() {
          this.updateQuery()
      },
      search() {
          this.updateQuery()
      },
      sortDirection() {
          this.updateQuery()
      }
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