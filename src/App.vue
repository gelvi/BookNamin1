<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- Brand/logo -->
      <router-link to="/" class="navbar-brand">ReadIt</router-link>
      
      <!-- Navbar toggler -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar items -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/bookstore" class="nav-link">Books</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/bookcart" class="nav-link">Cart</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>


<script>

export default {
name: 'App',
components: {
},
data() {
  return {
  }
}
}
</script>

<style>
/* Navbar container */
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Navbar items */
.nav-item {
  margin-right: 10px;
}

/* Active link style */
.nav-link.active {
  font-weight: bold;
}

/* Navbar brand/logo */
.navbar-brand {
  font-size: 1.5rem;
}

/* Navbar toggler icon */
.navbar-toggler-icon {
  background-color: #000;
}

/* Navbar background color */
.navbar {
  background-color: #f8f9fa;
}

/* Navbar text color */
.navbar-nav .nav-link {
  color: #000;
}

/* Navbar link hover effect */
.navbar-nav .nav-link:hover {
  color: #007bff;
}

/* Collapse navbar transition */
.navbar-collapse {
  transition: max-height 0.3s ease-out;
}

/* Navbar active link */
.nav-item.active .nav-link {
  color: #007bff;
}

</style>
