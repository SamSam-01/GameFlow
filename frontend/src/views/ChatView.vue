<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const router = useRouter()
const messages = ref([])
const inputMessage = ref('')
const isTyping = ref(false)
const socket = ref(null)
const chatContainer = ref(null)
const connectionStatus = ref('Connecting...')

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws'

// Helper to format current time
const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const connectWebSocket = () => {
  console.log(`Connecting to ${WS_URL}...`)
  socket.value = new WebSocket(WS_URL)

  socket.value.onopen = () => {
    connectionStatus.value = 'Combined'
    console.log("WebSocket Connected")
    messages.value.push({
      role: 'system',
      content: `Arbitre connecté pour le jeu : ${props.slug}. Posez votre question sur les règles.`,
      time: getCurrentTime()
    })
  }

  socket.value.onmessage = (event) => {
    const text = event.data
    
    if (text === " [FIN]") {
      isTyping.value = false
      return
    }

    // Check if we are currently receiving a message (streaming)
    const lastMessage = messages.value[messages.value.length - 1]
    
    if (lastMessage && lastMessage.role === 'assistant' && isTyping.value) {
      lastMessage.content += text
    } else {
      // Start of a new message from assistant
      isTyping.value = true
      messages.value.push({
        role: 'assistant',
        content: text,
        time: getCurrentTime()
      })
    }
    scrollToBottom()
  }

  socket.value.onclose = () => {
    connectionStatus.value = 'Disconnected'
    console.log("WebSocket Disconnected")
  }

  socket.value.onerror = (error) => {
    console.error("WebSocket Error:", error)
    connectionStatus.value = 'Error'
  }
}

const sendMessage = () => {
  if (!inputMessage.value.trim() || !socket.value || socket.value.readyState !== WebSocket.OPEN) return

  const userText = inputMessage.value
  messages.value.push({
    role: 'user',
    content: userText,
    time: getCurrentTime()
  })
  
  // Send JSON as expected by backend
  const payload = JSON.stringify({
    slug: props.slug,
    question: userText
  })
  
  socket.value.send(payload)
  inputMessage.value = ''
  isTyping.value = true // Expecting response
  scrollToBottom()
}


const renderMarkdown = (text) => {
  if (!text) return ''
  const rawHtml = marked.parse(text)
  return DOMPurify.sanitize(rawHtml)
}

onMounted(() => {
  connectWebSocket()
})


onUnmounted(() => {
  if (socket.value) {
    socket.value.close()
  }
})
</script>

<template>
  <div class="chat-layout">
    <header class="chat-header glass-card">
      <button @click="router.push('/')" class="btn-back">
        &larr; Retour
      </button>
      <div class="header-info">
        <h1>{{ slug }}</h1>
        <span class="status-indicator" :class="{ connected: connectionStatus === 'Combined' }">
          {{ connectionStatus === 'Combined' ? 'En ligne' : connectionStatus }}
        </span>
      </div>
    </header>

    <div class="chat-container glass-card" ref="chatContainer">
      <div v-for="(msg, index) in messages" :key="index" class="message-wrapper" :class="msg.role">
        <div class="message-bubble">
          <div class="message-content" v-html="renderMarkdown(msg.content)"></div>
          <div class="message-time">{{ msg.time }}</div>
        </div>
      </div>
      <div v-if="isTyping && messages[messages.length-1]?.role !== 'assistant'" class="typing-indicator">
        L'arbitre écrit...
      </div>
    </div>

    <div class="input-area glass-card">
      <input 
        v-model="inputMessage" 
        @keyup.enter="sendMessage"
        type="text" 
        placeholder="Posez une question sur les règles..." 
        autofocus
      />
      <button @click="sendMessage" class="btn-send">
        Envoyer
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-layout {
  max-width: 900px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
}

.chat-header {
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-info {
  text-align: right;
}

.header-info h1 {
  text-transform: capitalize;
  font-size: 1.5rem;
  margin: 0;
}

.status-indicator {
  font-size: 0.8rem;
  color: #94a3b8;
}

.status-indicator.connected {
  color: #4ade80;
}

.btn-back {
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.8;
}

.btn-back:hover {
  opacity: 1;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 80%;
}

.message-wrapper.user {
  align-self: flex-end;
  align-items: flex-end;
}

.message-wrapper.assistant,
.message-wrapper.system {
  align-self: flex-start;
}

.message-bubble {
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  color: #fff;
  position: relative;
  line-height: 1.5;
}

.user .message-bubble {
  background: var(--primary);
  border-bottom-right-radius: 0.2rem;
}

.assistant .message-bubble {
  background: rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 0.2rem;
}

.system .message-bubble {
  background: rgba(236, 72, 153, 0.2);
  border: 1px solid rgba(236, 72, 153, 0.3);
  text-align: center;
  width: 100%;
  font-style: italic;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 0.5rem;
  text-align: right;
}

.input-area {
  padding: 1rem;
  display: flex;
  gap: 1rem;
}

input {
  flex: 1;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--glass-border);
  border-radius: 0.5rem;
  padding: 1rem;
  color: #fff;
  font-size: 1rem;
  outline: none;
}

input:focus {
  border-color: var(--primary);
}

.btn-send {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-send:hover {
  background: var(--primary-hover);
}

.typing-indicator {
  font-style: italic;
  opacity: 0.6;
  font-size: 0.9rem;
  margin-left: 1rem;
}
</style>
