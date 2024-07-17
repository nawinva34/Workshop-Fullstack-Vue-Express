<template>
  <div class="login">
    <div class="login-form">
      <v-form ref="loginForm" @submit.prevent="login" v-model="valid" validate-on="submit lazy" class="form-login">
        <div class="illustration">
          <img src="../../../public/img/dog2.png" alt="Puppy Image"/>
        </div>
        <v-text-field
          label="Username"
          v-model="username"
          :rules="[v => !!v || 'Username is required']"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          :rules="[v => !!v || 'Password is required']"
          type="password"
          required
        ></v-text-field>
        <v-btn color="success" type="submit" :disabled="!valid">Login</v-btn>
        <v-btn color="primary" @click="goToRegister">Register</v-btn> <!-- Button for registration -->
      </v-form>
      <div>
        <img src="../../../public/img/dogshop.jpeg" alt='dog' width="250px" height="350px" class="mt-4"/>
      </div>
    </div>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Login Failed</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      valid: false,
      dialog: false,
    }
  },
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        try {
          const response = await axios.post('http://localhost:3000/API/v1/login', {
            username: this.username,
            password: this.password
          });

          if (response.data.success) {
            const userData = response.data.data[0];
            localStorage.setItem('username', userData.username);
            localStorage.setItem('token', response.data.token);
            router.push('/dashboard');
          } else {
            this.errorMessage = "Incorrect username or password.";
            this.dialog = true;
          }
        } catch (error) {
          this.errorMessage = "Incorrect username or password.";
          this.dialog = true;
        }
      }
    },
    goToRegister() {
      router.push('/register'); 
    }
  }
};
</script>

<style scoped>
.login {
  background: linear-gradient(45deg, #8E0E00, #1F1C18);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 700px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f9f9f9;
  display: flex;
  justify-content: space-around;
}

.form-login{
  width: 300px;
}

.illustration {
  text-align: center;
}

.illustration img {
  width: 100px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.v-btn {
  width: 100%;
  margin: 8px 0;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
