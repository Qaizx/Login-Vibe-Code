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
      <div v-if="prompt" :class="['prompt', promptType]">{{ prompt }}</div>
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
const prompt = ref('')
const promptType = ref('')
const router = useRouter()
const { login } = useAuth()

function onLogin() {
  prompt.value = ''
  promptType.value = ''
  if (!email.value || !password.value) {
    prompt.value = 'Please fill in all fields'
    promptType.value = 'error'
    return
  }
  const result = login(email.value, password.value)
  if (!result.success) {
    prompt.value = result.message
    promptType.value = 'error'
    return
  }
  prompt.value = 'Login successful! Redirecting...'
  promptType.value = 'success'
  setTimeout(() => {
    router.push('/user')
  }, 1200)
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
.prompt {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
  box-shadow: 0 2px 8px 0 rgba(60, 72, 88, 0.10);
}
.prompt.success {
  background: linear-gradient(90deg, #4ade80 0%, #22d3ee 100%);
  color: #065f46;
}
.prompt.error {
  background: linear-gradient(90deg, #fca5a5 0%, #f87171 100%);
  color: #991b1b;
}
</style>
