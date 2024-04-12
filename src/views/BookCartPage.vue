<template>
    <div class="container">
      <div class="row">
        <!-- Cart column -->
        <div class="col-md-6">
          <h2 class="cart-heading">Cart</h2>
          <p class="message">{{ cartMessage }}</p>
          <table class="table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-for="user in loggedInUsers" :key="user.userId">
              <tr v-for="item in user.userCart" :key="item.id" class="cart-item">
                <td>{{ item.id }}</td>
                <td>
                  <img :src="item.image" alt="Product Image" width="100" height="100">
                  <span class="item-info">{{ item.name }}</span>
                </td>
                <td>₱{{ item.price }}</td>
                <td>
                  <input type="number" v-model="item.quantity" @change="updateQuantity(item)" class="form-control">
                </td>
                <td>
                  <button @click="removeFromCart(item.id)" class="btn btn-danger">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col-md-10">
                <p>Total: ₱{{ totalPrice }}</p>
            </div>
            <div class="col-md-2" v-for="user in loggedInUsers" :key="user.userId">
                <button @click="purchaseBooks()" class="btn btn-primary">Place Order</button>
            </div>
          </div>
        </div>
        
        <!-- Processed transaction column -->
        <div class="col-md-6">
            <h2>Processed Transactions</h2>
            <table class="table">
                <thead>
                <tr>
                    <th>User Email</th>
                    <th>Book Title</th>
                    <th>Price</th>
                    <th>Transaction No.</th>
                </tr>
                </thead>
                <tbody v-for="user in loggedInUsers" :key="user.userId">
                <tr v-for="transaction in user.userOrder" :key="transaction.id">
                    <td>{{ transaction.userEmail}}</td>
                    <td>{{ transaction.title }}</td>
                    <td>₱{{ transaction.price }}</td>
                    <td>{{ transaction.transactionId }}</td>
                </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            cartMessage: ''
        };
    },
    computed: {
        users() {
            return this.$store.state.users
        },
        totalPrice() {
            return this.$store.getters.totalPrice;
        },
        loggedInUsers() {
            return this.users.filter(user => user.isloggedIn);
        }
        
    },
    methods: {
        updateQuantity(item) {
            if (item.quantity < 1) {
                item.quantity = 1;
            }
            this.cartMessage = `Quantity updated for ${item.title}`;
        },
        
        removeFromCart: function(bookId) {
            this.$store.dispatch('RemoveFromCart', bookId);
            this.cartMessage = `Book. ${bookId} removed from cart`; // Update message
        },

        purchaseBooks() {
          const loggedInUser = this.loggedInUsers[0]; // Assuming there's only one logged-in user
          console.log(loggedInUser);
          //const userId = loggedInUser.userId;
          const books = loggedInUser.userCart; // Assuming userCart contains an array of books
          console.log(books);
          this.$store.dispatch('purchaseBooks', { books })
              .then(message => {
                  console.log(message);
                  this.cartMessage = message;
              })
              .catch(error => {
                  console.error(error);
                  this.cartMessage = 'Purchase failed';
              });
        },



    },
  };
  </script>
  
<style >

.cart-heading {
  font-size: 24px; /* Increase the font size of the heading */
  color: #4CAF50; /* Green color for the heading */
  margin-bottom: 20px; /* Add some margin below the heading */
}

.message {
  font-family: Arial, sans-serif;
  margin-bottom: 10px; /* Add some margin below the message */
  color: #777 
}

.cart-item img {
  margin-right: 10px; /* Add some margin to the right of the book image */
}

.cart-item .item-info {
  font-weight: bold; /* Make the item info text bold */
  vertical-align: middle; /* Align the item info text vertically */
}

.cart-item input[type="number"] {
  width: 60px; /* Adjust the width of the quantity input field */
}

.cart-total {
  margin-top: 20px; /* Add margin to the top of the total section */
  font-weight: bold; /* Make the total text bold */
}

.place-order-btn {
  margin-top: 20px; /* Add margin to the top of the button */
}

/* Processed transaction column */
.processed-transactions h2 {
  font-size: 24px; /* Increase the font size of the heading */
  color: #4CAF50; /* Green color for the heading */
  margin-bottom: 20px; /* Add some margin below the heading */
}

.processed-transactions p {
  margin-bottom: 20px; /* Add some margin below the paragraph */
  color: #4CAF50; /* Green color for the paragraph */
}

.processed-transactions table {
  width: 100%; /* Make the table fill the entire width */
}

.processed-transactions th {
  font-weight: bold; /* Make the table header text bold */
  color: #4CAF50; /* Green color for the table headers */
}

.processed-transactions td {
  padding: 10px; /* Add padding to the table cells */
}



</style>