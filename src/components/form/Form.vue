<template>
  <p v-if="message">
        {{message}}
  </p>
  <form class="form-group formulaire" @submit.prevent="handleSubmit">
      <InputText label="Nom" v-model:name="userLastName" />
      <InputText label="Prenom" v-model:name="userFirstName" />
      <label>
        Date de naissance
        <input class="form-control inputs" type="date" v-model="userBirthDate"/>
      </label>
      
      <div>
        <select class="form-control inputs" v-model="userGender" name="gender">
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
      </div>
      <InputText label="Email" v-model:name="userEmail" />
      <button class="btn btn-primary bouton">Sauvegarder</button>
  </form>
</template>

<script>
import InputText from "@/components/form/InputText.vue"
import axios from "axios"

export default {
  name: 'Form',
  components: {
    InputText
  },
  props: {'user': Object},
  data() {
    return {
      userFirstName: '',
      userLastName: '',
      userBirthDate: '',
      userEmail: '',
      userGender: '',
    }
  },
  methods: {
    async handleSubmit() {
      const data = {
        firstName: this.userFirstName,
        lastName: this.userLastName,
        birthDate: this.userBirthDate,
        email: this.userEmail,
        gender: this.userGender,
        avatarUrl: this.userAvatarUrl,
      };     
      
      const response = await axios.put(`http://localhost:8010/users/${this.$route.params.id}`, data);

      if (response.data.errmessage) {
        alert(response.data.errmessage)
      } else {
        alert('Modifications enregistrées');
        window.location.replace('/users');
      }
      
    }
  },
  watch: {
    user: function(newVal) {
      this.userFirstName = newVal.firstName;
      this.userLastName = newVal.lastName;
      this.userBirthDate = newVal.birthDate;
      this.userGender = newVal.gender;
      this.userEmail = newVal.email;
      this.userAvatarUrl = newVal.avatarUrl;
    }
  }

}
</script>

<style>
.formulaire{
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  
}
.bouton {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
}
.inputs{
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>