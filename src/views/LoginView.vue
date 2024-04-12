<template>
  <div class="background">
    <div class="card">
    <div class="container login-container">
      <!-- <img src="../assets/garnierLogo.jpg" alt="Garnier Logo" class="login garnier-logo"> -->
      <p class="message">{{ message }}</p>
      <!-- Login Form -->
      <form v-if="!showRegisterForm" @submit.prevent="login" class="login-form">
        <h1 class="login-heading garnier-heading">Welcome To ReadIt!</h1>
        <div class="form-group">
          <label for="loginEmail" class="form-label">Email:</label>
          <input type="email" id="loginEmail" v-model.trim="loginForm.email" required class="form-control">
        </div>
        <div class="form-group">
          <label for="loginPassword" class="form-label">Password:</label>
          <input type="password" id="loginPassword" v-model="loginForm.password" required class="form-control">
        </div>
        <button type="submit" class="btn btn-primary btn-block">Login</button>
      </form>

      <!-- Registration Form -->
      <form v-if="showRegisterForm" @submit.prevent="register" class="register-form">
        <h1 class="login-heading garnier-heading">Create an Account</h1>
        <div class="form-group">
          <label for="registerEmail" class="form-label">Email:</label>
          <input type="email" id="registerEmail" v-model.trim="registerForm.email" required class="form-control">
        </div>
        <div class="form-group">
          <label for="registerPassword" class="form-label">Password:</label>
          <input type="password" id="registerPassword" v-model="registerForm.password" required class="form-control">
        </div>
        <div class="form-group">
          <label for="confirmPassword" class="form-label">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required class="form-control">
        </div>
        <button type="submit" class="btn btn-primary btn-block">Register</button>
      </form>

      <!-- Toggle between Login and Registration forms -->
      <button @click="toggleForm" class="btn btn-secondary btn-block toggle-button">
        {{ showRegisterForm ? 'Back to Login' : 'Register' }}
      </button>

      <!-- Error message -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
  </div>
 
</template>

  <script>
  import { store } from '@/store/store.js'
  export default {
  

    data() {
      return {
        message: '',
        loginForm: {
          email: '',
          password: ''
        },
        registerForm: {
          email: '',
          password: ''
        },
        confirmPassword: '',
        showRegisterForm: false,
        errorMessage: ''
      }
    },
    computed: {
      users() {
        return this.$store.state.users
      },
      
    },
    methods: {
      login() {
        const { email, password } = this.loginForm;
        console.log(this.users);
        const userFound = this.users.find(user => user.email === email && user.password === password);
        if (userFound) {
          userFound.isloggedIn = true;
          console.log(userFound.isloggedIn);
          localStorage.setItem('token', '12345');
          this.$router.push({ name: 'home' });
          store.state.isAuthenticated = true;
          console.log(store.state.isAuthenticated);
          
        } else {
          this.errorMessage = 'Invalid email or password';
        }
        this.clearFields();
      },
  
      clearFields() {
        this.loginForm.email = '';
        this.loginForm.password = '';
      },
      
      register() {
        // Perform registration logic
        if (this.registerForm.password !== this.confirmPassword) {
          this.errorMessage = 'Passwords do not match';
          return;
        }
        // Check if email already exists
        if (this.users.some(user => user.email === this.registerForm.email)) {
          this.errorMessage = 'Email already registered';
          return;
        }
        
        this.$store.commit('incrementUserId');
    
        // Get the updated userId
        const userId = this.$store.state.constUserId;
        // Add new user to the users array
        this.users.push({
          userId: userId,
          email: this.registerForm.email,
          password: this.registerForm.password, 
          isloggedIn: false,
          userCart: [],
          userOrder: [],
        });
  
        console.log(this.users);
        this.message = "Registration Complete";
        
        // Reset form fields and error message
        this.registerForm.email = '';
        this.registerForm.password = '';
        this.confirmPassword = '';
        this.errorMessage = '';
  
        // Redirect to login page after successful registration
        this.showRegisterForm = false;
      },
      toggleForm() {
        this.showRegisterForm = !this.showRegisterForm;
        this.errorMessage = ''; // Clear error message when toggling between forms
      }
    },
    
  }
  </script>
  
<style scoped>
.card {
  background-color: #fff; /* White background */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow */
  padding: 20px; /* Padding */
  max-width: 400px; /* Maximum width */
  margin: 0 auto; /* Center horizontally */
}

.background {
  background-image: url("../assets/bookBackground.jpeg"); /* Path to your background image */
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Do not repeat the background image */
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  min-height: 100vh; /* Set minimum height to full viewport height */
}


.login-container {
  text-align: center; /* Center content */
}

.message {
  margin-bottom: 20px; /* Spacing below message */
  color: #555; /* Dark gray color for message */
}

.login-form, .register-form {
  margin-bottom: 20px; /* Spacing between forms */
}

.login-heading, .garnier-heading {
  margin-bottom: 20px; /* Spacing below headings */
  color: #333; /* Dark color for headings */
}

.form-group {
  margin-bottom: 20px; /* Spacing between form fields */
}

.btn-block {
  width: 100%; /* Full width buttons */
}

.toggle-button {
  margin-top: 20px; /* Spacing above toggle button */
}

.error {
  color: #dc3545; /* Red color for error message */
}
  </style>
  