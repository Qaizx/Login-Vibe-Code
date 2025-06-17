<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="onLogin">
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <NuxtLink to="/register">Register</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const { login } = useAuth()

function onLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }
  const result = login(email.value, password.value)
  if (!result.success) {
    error.value = result.message
    return
  }
  alert('Logged in!')
  router.push('/user')
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
}
.login-container h1 {
  text-align: center;
}
.login-container form > div {
  margin-bottom: 1rem;
}
.login-container label {
  display: block;
  margin-bottom: 0.5rem;
}
.login-container input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.login-container button {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.login-container button:hover {
  background: #0056b3;
}
.error {
  color: #d32f2f;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
