<template>
  <div class="landing-hero">
    <div class="hero-content">
      <h1>Welcome to <span class="brand">Login Vibe</span></h1>
      <p class="subtitle">A modern Nuxt 3 + Vue 3 starter for beautiful authentication experiences.</p>
      <div class="cta-buttons">
        <NuxtLink to="/login" class="btn primary">Login</NuxtLink>
        <NuxtLink to="/register" class="btn">Register</NuxtLink>
      </div>
    </div>
    <div class="hero-graphic">
      <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="160" cy="90" rx="140" ry="60" fill="#6366f1" fill-opacity="0.12"/>
        <ellipse cx="160" cy="90" rx="100" ry="40" fill="#22d3ee" fill-opacity="0.10"/>
        <ellipse cx="160" cy="90" rx="60" ry="24" fill="#4ade80" fill-opacity="0.10"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.landing-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
  padding: 0 1rem;
}
.hero-content {
  text-align: center;
  margin-bottom: 2.5rem;
}
.brand {
  background: linear-gradient(90deg, #6366f1 0%, #22d3ee 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-weight: 800;
}
.landing-hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #22223b;
}
.subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 2rem;
}
.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.btn {
  padding: 0.7rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  background: #e5e7eb;
  color: #22223b;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
  box-shadow: 0 2px 8px 0 rgba(60, 72, 88, 0.10);
}
.btn.primary {
  background: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%);
  color: #fff;
}
.btn.primary:hover {
  background: linear-gradient(135deg, #4f46e5 0%, #2563eb 100%);
}
.btn:hover {
  background: #cbd5e1;
}
.hero-graphic {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}
@media (max-width: 600px) {
  .landing-hero h1 {
    font-size: 2rem;
  }
  .hero-graphic svg {
    width: 200px;
    height: 100px;
  }
}
</style>
