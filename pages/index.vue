<template>
  <div class="home-container">
    <h1>Welcome to Login Vibe!</h1>
    <p>This is a simple Nuxt 3 + Vue 3 starter with login and register pages.</p>
    <NuxtLink to="/login">Login</NuxtLink> | <NuxtLink to="/register">Register</NuxtLink>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 500px;
  margin: 60px auto;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fafbfc;
  text-align: center;
}
.home-container h1 {
  margin-bottom: 1rem;
}
.home-container a {
  color: #007bff;
  text-decoration: none;
  margin: 0 0.5rem;
}
.home-container a:hover {
  text-decoration: underline;
}
</style>
