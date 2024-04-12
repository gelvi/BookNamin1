import Vuex from 'vuex'

export const store = new Vuex.Store({
    name: 'store',
    state: {
        books: [
          { id: 1, title: 'Name of the Wind', author: 'Patrick Rothfuss', price: 22.99, image: require('../assets/book1.jpg')},                                                                                         
          { id: 2, title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 22.52, image: require('../assets/book2.jpg')},
          { id: 3, title: 'War and Peace', author: 'Leo Tolstoy', price: 55.99, image: require('../assets/book3.jpeg') },
          { id: 4, title: 'The Grapes of Wrath', author: 'John Steinbeck', price: 659.99, image: require('../assets/book4.jpg') },
          { id: 5, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 757.99, image: require('../assets/book5.jpg') },
          { id: 6, title: 'Don Quixote', author: 'Miguel de Cervantes', price: 5.99, image: require('../assets/book6.webp') },
          { id: 7, title: 'Lord of the Rings', author: 'J.R.R. Tolkien', price: 15.99, image: require('../assets/book7.jpg') },
          { id: 8, title: 'Harry Potter and the Sorcerers Stone', author: 'J.K. Rowling', price: 11.99, image: require('../assets/book8.jpg') },
          { id: 9, title: 'And Then There Were None', author: 'Agatha Christie', price: 7.49, image: require('../assets/book9.jpg') },
          { id: 10, title: 'Alices Adventures in Wonderland', author: 'Lewis Carroll', price: 1.99, image: require('../assets/book10.webp') },
          { id: 11, title: 'Dispareo I', author: 'Bambi Apdian', price: 5.31, image: require('../assets/book11.jpg') },
          { id: 12, title: 'Project Loki Vol. 1 Part 1', author: 'akosiibarra', price: 3, image: require('../assets/book12.jpg') },
          { id: 13, title: 'Mnemosynes Tale', author: 'Tales of Demi', price: 4.91, image: require('../assets/book13.jpg') },
          { id: 14, title: 'Detective Files', author: 'Tammi Gomez', price: 3.09, image: require('../assets/book14.jpg') },
          { id: 15, title: 'Million Dollar Gift', author: 'Ian somers', price: 3.99, image: require('../assets/book15.jpg') },
          { id: 16, title: 'The Ten-Year Gap', author: 'Owwsic', price: 4.04, image: require('../assets/book16.jpeg') },
          { id: 17, title: 'Stay Awake Agatha', author: 'Bambi Apdian', price: 3.09, image: require('../assets/book17.jpeg') },
          { id: 18, title: 'The Rain in España', author: '4Reuminct', price: 12.35, image: require('../assets/book18.jpg') },
          { id: 19, title: 'Good night, Enemy', author: 'Bambi Apdian', price: 3.44, image: require('../assets/book19.webp') },
          { id: 20, title: 'Shatter Me ', author: 'Tahereh Mafi', price: 12.79, image: require('../assets/book20.jpeg') }
        ], 
        isAuthenticated: false, // Initial authentication status is false
        searchTerm: '',
        constUserId: 1,
        users:  [
          { 
              userId: 1,
              email: 'gelvi@gmail.com', 
              password: 'gelvi123', 
              isloggedIn: false,
              userCart: [],
              userOrder: [],

          }
        ]
    },
    getters:{
    salesBooks: state => {
        var salesBooks = state.books.map(book => {
          return {
            id: book.id,
            title: book.title , 
            author: book.author,
            price: book.price,
            image: book.image
          }
        })
        return salesBooks
    },
    totalPrice(state) {
      // Get the index of the logged-in user
      const loggedInUserIndex = state.users.findIndex(user => user.isloggedIn === true);
      if (loggedInUserIndex !== -1) {
          // Calculate total price for the cart of the logged-in user
          const totalPrice = state.users[loggedInUserIndex].userCart.reduce((total, item) => {
              return total + (item.price * item.quantity);
          }, 0);
          // Round off the total price to two decimal places
          return totalPrice.toFixed(2);
      } else {
          return 0;
      }
    },
    
  },
  mutations: {
    updateAuthenticationStatus(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    clearCart(state, userId) {
      const userIndex = state.users.findIndex(user => user.userId === userId);
      if (userIndex !== -1) {
        state.users[userIndex].userCart = [];
      }
    },
    addToCart(state, book) {
      const loggedInUserIndex = state.users.findIndex(user => user.isloggedIn === true);
      console.log(loggedInUserIndex);
      const userCart = state.users[loggedInUserIndex].userCart;
      console.log(userCart);
      const index = userCart.findIndex(item => item.id === book.id);
      if (index !== -1) {
          userCart[index].quantity++;
      } else {
          console.log(book);
          userCart.push({ ...book, quantity: 1 });
      }
      console.log(userCart);
    },
    removeFromCart(state, bookId) {
      // Find the user who added this book
      const userIndex = state.users.findIndex(user => user.userCart.some(item => item.id === bookId));
      if (userIndex !== -1) {
          // Find the index of the book in the user's userCart array
          const userCartIndex = state.users[userIndex].userCart.findIndex(item => item.id === bookId);
          if (userCartIndex !== -1) {
              
              // Remove the book from the user's userCart array
              state.users[userIndex].userCart.splice(userCartIndex, 1);
              //
          }
      }
    },
    setSearchTerm(state, term) {
      state.searchTerm = term;      
    },
    incrementUserId(state) {
      state.constUserId++;
    },
  },
  actions: {
    AddToCart: (context, book) => {
        context.commit('addToCart', book);       
    },
    RemoveFromCart: (context, bookId) => {
        context.commit('removeFromCart', bookId);       
    },
    UpdateAuthenticationStatus: (context, isAuthenticated) => {
      context.commit('updateAuthenticationStatus', isAuthenticated);       
    },
    searchBooks({ commit, state }) {
      // Perform search logic here
      // For simplicity, just filter books by title containing the search term
      const filteredBooks = state.books.filter(book =>
        book.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      // Commit mutation to update the filtered books in the state
      commit('setFilteredBooks', filteredBooks);
    },
    
    // Action method in store.js
    async purchaseBooks({ state, commit }, { books }) {
        try {
            if (books.length === 0) {
                return 'Cart is empty! add books to cart first';
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const loggedInUserIndex = state.users.findIndex(user => user.isloggedIn === true);
            const userOrder = state.users[loggedInUserIndex].userOrder;
            const userEmail = state.users[loggedInUserIndex].email;
            
            // const totalPrice = state.users[loggedInUserIndex].userCart.reduce((total, item) => {
            //     return total + (item.price * item.quantity);
            // }, 0);
            // console.log(totalPrice);
            
            for (const book of books) {      
                // Increment transactionId for each book
                const transactionId = userOrder.length + 1; // Generate unique transaction ID
                userOrder.push({ 
                    id: book.id,
                    title: book.title,
                    price: book.price,
                    userEmail,
                    quantity: 1,
                    transactionId, // Assign unique transaction ID to each book
                });
            }
    
            // Clear user's cart after purchase
            commit('clearCart', state.users[loggedInUserIndex].userId);
    
            return 'Purchase successful';
        } catch (error) {
            return 'Purchase failed';
        }
    },
  
}

})
