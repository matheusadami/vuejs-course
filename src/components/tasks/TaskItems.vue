<template>
  <div class="space-y-2">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

import TaskItem from '@/components/tasks/TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true
  }
})
</script>