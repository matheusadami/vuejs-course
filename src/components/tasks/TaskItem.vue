<template>
  <div class="bg-gray-300 rounded-sm">
    <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">
      <div class="flex items-center justify-center mr-2">
        <button @click="changeTaskStatus" :class="{'text-gray-400': !form.completed, 'text-green-700': form.completed}">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>

      <div class="w-full">
        <input v-model="form.title" @keyup.enter="updateTask" type="text" placeholder="Digite a sua tarefa"
          class="bg-gray-300 placeholder-gray-500 text-gray-800 font-light focus:outline-none block w-full appearance-none leading-normal mr-3">
      </div>

      <div class="ml-auto flex items-center justify-center">
        <button @click="removeTask" class="focus:outline-none">
          <svg class="ml-3 h-4 w-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 7L18.1327 19.1425C18.0579 
                  20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 
                  19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 
                  3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const store = useStore()
const form = ref(props.task)

async function updateTask() {
  if (form.value.title) {
    await store.dispatch('updateTask', { id: props.task.id, data: form.value })
  }
}

async function changeTaskStatus() {
  form.value.completed = !form.value.completed
  await store.dispatch('updateTask', { id: props.task.id, data: form.value })
}

async function removeTask() {
  await store.dispatch('removeTask', { id: props.task.id })
}

</script>