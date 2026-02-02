<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const games = ref([])
const loading = ref(true)
const error = ref(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}/games`)
    games.value = response.data
  } catch (e) {
    error.value = "Impossible de charger les jeux. Vérifiez que le backend est lancé."
    console.error(e)
  } finally {
    loading.value = false
  }
})

const getGameIcon = (slug) => {
  // Simple mapping for icons based on slug, could be replaced by DB images later
  if (slug.includes('monopoly')) return '🏠'
  if (slug.includes('uno')) return '🃏'
  return '🎲'
}
</script>

<template>
  <div class="home-container animate-fade-in">
    <header class="hero">
      <h1>GameFlow AI</h1>
      <p class="subtitle">Votre arbitre personnel de jeux de société</p>
    </header>

    <main>
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="error-msg glass-card">
        {{ error }}
      </div>

      <div v-else class="games-grid">
        <router-link 
          v-for="game in games" 
          :key="game.slug" 
          :to="{ name: 'chat', params: { slug: game.slug } }"
          class="game-card glass-card"
        >
          <div class="card-icon">{{ getGameIcon(game.slug) }}</div>
          <h2>{{ game.game_name }}</h2>
          <div class="card-footer">
            <span class="btn-text">Commencer la partie &rarr;</span>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
}

.hero {
  margin-bottom: 4rem;
}

h1 {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  letter-spacing: -2px;
}

.subtitle {
  font-size: 1.5rem;
  color: #94a3b8;
  font-weight: 300;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.game-card {
  padding: 2.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.game-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(99, 102, 241, 0.2);
  border-color: rgba(99, 102, 241, 0.3);
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  transform: translateX(-100%);
  transition: 0.5s;
}

.game-card:hover::before {
  transform: translateX(100%);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #fff;
}

.card-footer {
  margin-top: auto;
}

.btn-text {
  color: var(--primary);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error-msg {
  color: #ef4444;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
