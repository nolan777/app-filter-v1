<template>
  <p v-if="message">
    {{ message }}
  </p>
  <form
    enctype="multipart/form-data"
    class="card carte form-group formulaire"
    @submit.prevent="handleSubmit"
  >
    <input
      class="inputs"
      type="file"
      name="avatarFile"
      :value="avatarUrl"
      required
      @change="onSelect"
    >
    <InputText
      v-model:name="userLastName"
      label="Nom"
    />
    <InputText
      v-model:name="userFirstName"
      label="Prenom"
    />
    <label>
      Date de naissance
      <input
        v-model="userBirthDate"
        class="form-control inputs"
        type="date"
      >
    </label>
        
    <div>
      <select
        v-model="userGender"
        class="form-control inputs"
        name="gender"
      >
        <option value="male">
          Homme
        </option>
        <option value="female">
          Femme
        </option>
      </select>
    </div>
    <InputText
      v-model:name="userEmail"
      label="Email"
    />
    <button class="btn btn-primary">
      Sauvegarder
    </button>
  </form>
</template>

<script>
import InputText from "@/components/form/InputText.vue"
import axios from "axios"


export default {
    name: 'RegisterUser',
    components: {
        InputText
    },
    data() {
        return {
            userFirstName: '',
            userLastName: '',
            userAvatarUrl: '',
            userBirthDate: '',
            userEmail: '',
            userGender: '',
            message: '',
            file: ''
        }
    },
    methods: {
        onSelect(event) {
            this.userAvatarUrl = event.target.files[0]
        },
        async handleSubmit() {
        const formData = new FormData()
        formData.append('avatarUrl', this.userAvatarUrl, this.userAvatarUrl.name)
        formData.append('firstName', this.userFirstName)
        formData.append('lastName', this.userLastName)
        formData.append('usirthDate', this.userBirthDate)
        formData.append('email', this.userEmail)
        formData.append('gender', this.userGender)        
        const response = await axios.post('http://localhost:3000/users/', formData, {headers: {'Content-Type': 'multipart/form-data'}});
        this.message = response.data.errmessage;

        if (this.message) {
            return
        } else {
            alert('Utilisateur ajouté');
        }      
        window.location.replace('/users');
      
      
    }
  },

}
</script>

<style>
.inputs{
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>