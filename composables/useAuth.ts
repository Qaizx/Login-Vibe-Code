import { ref } from 'vue'
import { useStorage } from '@vueuse/core'

// Store users in localStorage for demo purposes
export interface User {
  email: string;
  password: string;
  firstname: string;
  surname: string;
  age: number;
  dob: string;
}

const users = useStorage<User[]>('users', [])
const currentUser = useStorage<string | null>('currentUser', null)

export function useAuth() {
  function register(email: string, password: string, firstname: string, surname: string, age: number, dob: string) {
    if (users.value.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered.' }
    }
    users.value.push({ email, password, firstname, surname, age, dob })
    return { success: true }
  }

  function login(email: string, password: string) {
    // Always get the latest users from localStorage
    const usersList = JSON.parse(localStorage.getItem('users') || '[]')
    const user = usersList.find((u: any) => u.email === email && u.password === password)
    if (user) {
      currentUser.value = email
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials or user not registered.' }
  }

  function logout() {
    currentUser.value = null
  }

  function isLoggedIn() {
    return !!currentUser.value
  }

  function getCurrentUser() {
    if (!currentUser.value) return null
    return users.value.find(u => u.email === currentUser.value) || null
  }

  return { register, login, logout, isLoggedIn, currentUser, getCurrentUser }
}
