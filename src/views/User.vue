<template>
  <div>
    <button class="btn btn-primary" @click="back">Retour</button>
  </div>
  <div class="headt">
    <p>Modifier l'utilisateur {{user.firstName}}</p>
  </div>
  <div class="profil card carte">
    <img class="img-fluid image" :src="user.avatarUrl" width="200" alt="avatar">
    <h3>{{user.lastName}} {{user.firstName}}</h3>
    <p>{{user.email}}</p>
    <p>{{user.tel}}</p>
    <p>{{user.age}} ans</p>
    <Form :user="user"/>
  </div>
  
  
</template>

<script>
import Form from "../components/form/Form.vue"
import axios from 'axios'

export default {
  name: 'User',
  components: {
    Form
  },
  data() {
    return {
      user: {},
      errored: false,
    }
  },
  
  methods: {
    fetchUser() { 
      axios
        .get(`http://localhost:8010/users/${this.$route.params.id}`)
        .then(response => this.user = response.data)
        .catch(error => {
          console.error(error)
          this.errored = true
        })
    },
    back(){
      this.$router.go(-1);
    },
  },  
  created(){
    this.fetchUser();
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
.carte{
  padding: 3%;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
}
.image {
  border-radius: 20px;
  margin-bottom: 5%;
  margin-left: auto;
  margin-right: auto;
}
</style>