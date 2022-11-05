<template>
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <CommonSpinner v-if="isLoading" />
      <template v-else>
        <TaskForm />
        <TaskItems :tasks="tasks" />
        <TaskEmpty v-if="isEmptyTasks" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import CommonSpinner from '@/components/core/CommonSpinner.vue'
import TaskItems from '@/components/tasks/TaskItems.vue'
import TaskEmpty from '@/components/tasks/TaskEmpty.vue'
import TaskForm from '@/components/tasks/TaskForm.vue'

const store = useStore()
const tasks = computed(() => store.getters.tasks || [])
const isLoading = ref(false)
const isEmptyTasks = computed(() => !tasks.value.length)

created()

function created() {
  getTasks()
}

async function getTasks() {
  isLoading.value = true
  await store.dispatch('getTasks')
  isLoading.value = false
}

</script>