<template>
    <div class="register">
      <div class="register-form">
        <v-form ref="registerForm" @submit.prevent="register" v-model="valid" validate-on="submit lazy" class="form-register">
          <div class="illustration">
            <p>Register</p>
            <img src="../../../public/img/dog2.png" alt="Puppy Image" />
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
          <v-text-field
            label="Confirm Password"
            v-model="confirmPassword"
            :rules="[v => !!v || 'Confirm Password is required', v => v === password || 'Passwords do not match']"
            type="password"
            required
          ></v-text-field>
          <v-btn color="success" type="submit" :disabled="!valid">Register</v-btn>
        </v-form>
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-title class="headline">Register Successful!!</v-card-title>
            <v-card-text>You have successfully registered. Please try to login.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="dialog = false; redirectToLogin()">Go to Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
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
        confirmPassword: '',
        valid: false,
        dialog: false,
      }
    },
    methods: {
      async register() {
        if (this.$refs.registerForm.validate()) {
          try {
            const response = await axios.post('http://localhost:3000/API/v1/register', {
              username: this.username,
              password: this.password
            });
  
            if (response.data.success) {
              this.dialog = true; // Show registration success dialog
            } else {
              console.error('Registration failed:', response.data.message);
              // Show error message to user if registration failed
            }
          } catch (error) {
            console.error('Error during registration:', error);
            // Show error message to user if request fails
          }
        }
      },
      redirectToLogin() {
        router.push('/login'); // Redirect to login page
      }
    }
  };
  </script>
  
  <style scoped>
  .register {
    background: linear-gradient(45deg, #8E0E00, #1F1C18);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .register-form {
    width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #f9f9f9;
  }
  
  .illustration {
    text-align: center;
    margin-bottom: 20px;
    font-size: 48px;
    font-weight: 700;
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
  