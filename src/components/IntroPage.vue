<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="intro-page">
          <p v-if="isAuthenticated">User is logged in</p>
          <p v-else>User is not logged in</p>
          <h1>Welcome to ReadIt</h1>
          <p>
            Explore our vast collection of books, from timeless classics to contemporary bestsellers, and embark on literary adventures that will transport you to new worlds.
          </p>
          <div class="row book-grid">
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">Name of the Wind</h3>
                  <p class="card-text">Author: Patrick Rothfuss</p>
                  <p class="card-text">Price: $22.99</p>
                  <img src="../assets/book1.jpg" alt="Pride and Prejudice Cover" class="card-img-top">
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">The Catcher in the Rye</h3>
                  <p class="card-text">Author: J.D. Salinger</p>
                  <p class="card-text">Price: $22.52</p>
                  <img src="../assets/book2.jpg" alt="Pride and Prejudice Cover" class="card-img-top">
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h3 class="card-title">War and Peace</h3>
                  <p class="card-text">Author: Leo Tolstoy</p>
                  <p class="card-text">Price: $55.99</p>
                  <img src="../assets/book3.jpeg" alt="Pride and Prejudice Cover" class="card-img-top">
                </div>
              </div>
            </div>
            <!-- Repeat the above card structure for other books -->
          </div>
          <p>
            Dive into our collection now and uncover stories that will captivate your imagination and enrich your reading journey.
          </p>
          <button @click="handleLogout" class="btn btn-primary">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script>
import { mapGetters } from 'vuex';


  export default {
    name: 'IntroPage',
    computed: {
       ...mapGetters(['updateAuthenticationStatus']),
      isAuthenticated() {
        return this.$store.state.isAuthenticated;
      },
      users(){
        return this.$store.state.users
      },
      
    },
    methods: {
      handleLogout() {
          localStorage.removeItem('token');
          this.$router.push('/login');
          const userIndex = this.users.findIndex(user => user.isloggedIn === true); 
          this.users[userIndex].isloggedIn = false;
          console.log(this.users[userIndex].isloggedIn = false)
      },
      updateAuthenticationStatus: function(status) {
          this.$store.dispatch('UpdateAuthenticationStatus', status);
          //this.bookMessage = `${book.title} added to cart`;
      }
      
    }
    
  }
</script>

<style scoped>
.container {
  background-color: #C98340; /* Change background color to beige */
  font-family: 'Georgia', serif; /* Change font family to Georgia */
  padding: 20px; /* Add padding for better spacing */
}

/* Update the button style */
.intro-page button {
  margin-top: 20px; /* Add some margin to the top of the button */
}
.card {
  border: 1px solid #ddd; /* Add border to the card */
  border-radius: 8px; /* Add border radius to soften the edges */
}

/* Style for the card body */
.card-body {
  padding: 20px; /* Add padding to the card body */
}

/* Style for the card title */
.card-title {
  font-size: 1.2rem; /* Increase font size for the title */
  margin-bottom: 10px; /* Add margin at the bottom of the title */
}

/* Style for the card text */
.card-text {
  font-size: 1rem; /* Set font size for the text */
  color: #666; /* Set text color */
  margin-bottom: 8px; /* Add margin at the bottom of the text */
}

/* Style for the card image */
.card-img-top {
  width: 100%; /* Ensure the image fills the width of the card */
  border-top-left-radius: 8px; /* Add border radius to the top left corner of the image */
  border-top-right-radius: 8px; /* Add border radius to the top right corner of the image */
}


</style>