<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="onRegister">
      <div>
        <label for="firstname">First Name</label>
        <input id="firstname" v-model="firstname" type="text" required />
      </div>
      <div>
        <label for="surname">Surname</label>
        <input id="surname" v-model="surname" type="text" required />
      </div>
      <div>
        <label for="age">Age</label>
        <input id="age" v-model.number="age" type="number" min="0" required />
      </div>
      <div>
        <label for="dob">Date of Birth</label>
        <input id="dob" v-model="dob" type="date" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <div>
        <label for="confirm">Confirm Password</label>
        <input id="confirm" v-model="confirm" type="password" required />
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <NuxtLink to="/login">Login</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const firstname = ref('')
const surname = ref('')
const age = ref<number | null>(null)
const dob = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')
const router = useRouter()
const { register } = useAuth()

function onRegister() {
  error.value = ''
  if (!firstname.value || !surname.value || !age.value || !dob.value || !email.value || !password.value || !confirm.value) {
    error.value = 'Please fill in all fields'
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Passwords do not match'
    return
  }
  const result = register(email.value, password.value, firstname.value, surname.value, age.value, dob.value)
  if (!result.success) {
    error.value = result.message
    return
  }
  alert('Registered!')
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
}
.register-container h1 {
  text-align: center;
}
.register-container form > div {
  margin-bottom: 1rem;
}
.register-container label {
  display: block;
  margin-bottom: 0.5rem;
}
.register-container input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.register-container button {
  width: 100%;
  padding: 0.75rem;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.register-container button:hover {
  background: #218838;
}
.error {
  color: #d32f2f;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
