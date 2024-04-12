<template>
  <div class="container">
    <h2>List of Books</h2>
    <p class="message">{{ bookMessage }}</p>
    <!-- Search input field -->
    <div class="mb-3">
      <input type="text" v-model="searchTerm" @input="searchBooks" class="form-control" placeholder="Search books by title">
     
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in filteredBooks" :key="book.id">
          <td>{{ book.title }}</td>
          <td>${{ book.price }}</td>
          <td><img :src="book.image" alt="Book Image" width="100" height="100"></td>
          <td><button @click="addToCart(book)" class="btn btn-primary">Add to Cart</button></td>
        </tr>
      </tbody>
      <tbody v-if="filteredBooks.length === 0">
        <tr v-for="book in salesBooks" :key="book.id">
          <td>{{ book.title }}</td>
          <td>${{ book.price }}</td>
          <td><img :src="book.image" alt="Book Image" width="100" height="100"></td>
          <td><button @click="addToCart(book)" class="btn btn-primary">Add to Cart</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookMessage: '',
       // Initialize search term
    };
  },
  computed: {
    // Retrieve books from the store
    books() {
      return this.$store.state.books;
    },
    // Retrieve sales books from the store
    salesBooks() {
      return this.$store.getters.salesBooks;
    },
    filteredBooks() {
      return this.$store.state.books.filter(book =>
        book.title.toLowerCase().includes(this.$store.state.searchTerm.toLowerCase())
      );
    },
    
  },
  methods: {
    // Add book to cart
    addToCart(book) {
      this.$store.dispatch('AddToCart', book);
      this.bookMessage = `${book.title} added to cart!`;
    },
    // Search books based on input search term
    searchBooks() {
        this.$store.commit('setSearchTerm', this.searchTerm);
        this.$store.dispatch('searchBooks');
      },
  },
};
</script>


<style scoped>
.container {
  font-family: Arial, sans-serif; /* Set the font family */
  color: #333; /* Set the text color */
  
}

h2 {
  font-size: 24px; /* Increase the font size of the heading */
  color: #4CAF50; /* Green color for the heading */
  margin-bottom: 20px; /* Add margin below the heading */
}

.message {
  margin-bottom: 20px; /* Add margin below the message */
  color: #777 
}

.mb-3 input {
  width: 100%; /* Make the search input field fill the entire width */
  padding: 10px; /* Add padding to the input field */
  border-radius: 5px; /* Add border radius to the input field */
  border: 1px solid #ccc; /* Add a border to the input field */
}

.table {
  width: 100%; /* Make the table fill the entire width */
}

.table th,
.table td {
  padding: 10px; /* Add padding to table cells */
}

.table th {
  font-weight: bold; /* Make the table header text bold */
}

.table tbody tr:nth-child(even) {
  background-color: #f2f2f2; /* Add a background color to even rows */
}

.table tbody tr:hover {
  background-color: #ddd; /* Add a background color on hover */
}

.btn-primary {
  background-color: #4CAF50; /* Green background color for primary buttons */
  color: white; /* White text color for primary buttons */
  border: none; /* Remove border from primary buttons */
  padding: 10px 20px; /* Add padding to primary buttons */
  border-radius: 5px; /* Add border radius to primary buttons */
  cursor: pointer; /* Add cursor pointer to primary buttons */
}

.btn-primary:hover {
  background-color: #45a049; /* Darker green color on button hover */
}



</style>