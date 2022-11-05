<template>
  <form @submit.prevent="saveTask" class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3">
    <input v-model="form.title" placeholder="Adicione um novo item ..." type="text"
      class="bg-gray-900 placeholder-gray-200 text-gray-200  font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3">

    <button v-if="isValidForm" class="text-green-400 text-xs font-semibold focus:outline-none" type="submit">
      ADICIONAR
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const form = ref({ title: '', completed: false })

const isValidForm = computed(() => form.value.title)

function resetForm() {
  form.value.title = '';
}

async function saveTask() {
  if (form.value.title) {
    await store.dispatch('saveTask', form.value)
    resetForm()
  }
}
</script>