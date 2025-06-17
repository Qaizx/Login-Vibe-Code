<template>
  <div class="user-card-wrapper" v-if="user">
    <div class="user-card">
      <div class="user-avatar">
        <span>{{ user.firstname.charAt(0) }}{{ user.surname.charAt(0) }}</span>
      </div>
      <h2>{{ user.firstname }} {{ user.surname }}</h2>
      <p class="user-email">{{ user.email }}</p>
      <form v-if="editMode" @submit.prevent="saveEdit" class="user-form">
        <div class="form-row">
          <label for="firstname">First Name</label>
          <input id="firstname" v-model="editUser.firstname" type="text" required />
        </div>
        <div class="form-row">
          <label for="surname">Surname</label>
          <input id="surname" v-model="editUser.surname" type="text" required />
        </div>
        <div class="form-row">
          <label for="age">Age</label>
          <input id="age" v-model.number="editUser.age" type="number" min="0" required />
        </div>
        <div class="form-row">
          <label for="dob">Date of Birth</label>
          <input id="dob" v-model="editUser.dob" type="date" required />
        </div>
        <div class="form-row">
          <label for="email">Email</label>
          <input id="email" v-model="editUser.email" type="email" required />
        </div>
        <div class="form-actions">
          <button class="btn primary" type="submit">Save</button>
          <button class="btn" type="button" @click="cancelEdit">Cancel</button>
        </div>
      </form>
      <ul v-else class="user-info-list">
        <li><strong>First Name:</strong> {{ user.firstname }}</li>
        <li><strong>Surname:</strong> {{ user.surname }}</li>
        <li><strong>Age:</strong> {{ user.age }}</li>
        <li><strong>Date of Birth:</strong> {{ user.dob }}</li>
        <li><strong>Email:</strong> {{ user.email }}</li>
      </ul>
      <div class="user-actions">
        <button v-if="!editMode" class="btn primary" @click="editMode = true">Edit</button>
        <button class="btn danger" @click="logoutAndGoHome">Logout</button>
      </div>
    </div>
  </div>
  <div v-else class="user-card-wrapper">
    <div class="user-card">
      <p>You are not logged in. <NuxtLink to="/login">Login</NuxtLink></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'
import { computed, ref, watch } from 'vue'

const router = useRouter()
const { currentUser, logout } = useAuth()
const userRefreshKey = ref(0)
const user = computed(() => {
  userRefreshKey.value // dependency for refresh
  if (!currentUser.value) return null
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  return users.find((u: any) => u.email === currentUser.value) || null
})

const editMode = ref(false)
const editUser = ref({ firstname: '', surname: '', age: 0, dob: '', email: '' })

watch(user, (val) => {
  if (val) {
    editUser.value = { ...val }
  }
}, { immediate: true })

function saveEdit() {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const idx = users.findIndex((u: any) => u.email === user.value.email)
  // Prevent duplicate email
  if (editUser.value.email !== user.value.email && users.some((u: any) => u.email === editUser.value.email)) {
    alert('This email is already registered with another account.')
    return
  }
  if (idx !== -1) {
    const oldPassword = users[idx].password
    users[idx] = { ...editUser.value, password: oldPassword }
    localStorage.setItem('users', JSON.stringify(users))
    currentUser.value = editUser.value.email // always update currentUser
    userRefreshKey.value++ // trigger user recompute
    // Debug log
    console.log('Updated user:', users[idx])
    console.log('All users:', users)
  }
  editMode.value = false
}

function cancelEdit() {
  editUser.value = { ...user.value }
  editMode.value = false
}

function logoutAndGoHome() {
  logout()
  router.push('/')
}
</script>

<style scoped>
.user-card-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
}
.user-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(60, 72, 88, 0.12);
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  position: relative;
}
.user-avatar {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #6366f1 0%, #60a5fa 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #fff;
  margin: 0 auto 1rem auto;
  font-weight: bold;
  box-shadow: 0 2px 8px 0 rgba(60, 72, 88, 0.10);
}
.user-card h2 {
  margin: 0.5rem 0 0.25rem 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: #22223b;
}
.user-email {
  color: #6366f1;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
.user-info-list {
  text-align: left;
  margin: 1.5rem 0 1rem 0;
  padding: 0;
  list-style: none;
}
.user-info-list li {
  margin-bottom: 0.75rem;
  font-size: 1.05rem;
}
.user-form {
  margin: 1.5rem 0 1rem 0;
}
.form-row {
  margin-bottom: 1rem;
  text-align: left;
}
.form-row label {
  display: block;
  margin-bottom: 0.3rem;
  color: #6366f1;
  font-weight: 500;
}
.form-row input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  background: #f1f5f9;
  transition: border 0.2s;
}
.form-row input:focus {
  border: 1.5px solid #6366f1;
  outline: none;
}
.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
}
.user-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
}
.btn {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: #e5e7eb;
  color: #22223b;
  transition: background 0.2s, color 0.2s;
}
.btn.primary {
  background: linear-gradient(135deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
}
.btn.primary:hover {
  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
}
.btn.danger {
  background: #f87171;
  color: #fff;
}
.btn.danger:hover {
  background: #dc2626;
}
</style>
