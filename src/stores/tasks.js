import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    tasks: []
  },
  mutations: {
    setTasks: (state, payload) => state.tasks = payload,
    pushTask: (state, payload) => state.tasks.push(payload),
    updateTask: (state, { i, payload }) => state.tasks.splice(i, 1, payload),
    removeTask: (state, { i }) => state.tasks.splice(i, 1)
  },
  getters: {
    tasks(state) {
      return state.tasks
    }
  },
  actions: {
    async getTasks({ commit }) {
      let response = await axios.get('http://localhost:3000/todos');
      commit('setTasks', response.data || [])
    },
    async saveTask({ commit }, data) {
      let response = await axios.post('http://localhost:3000/todos', data);
      if (response.data) {
        commit('pushTask', response.data)
      }
    },
    async updateTask({ getters, commit }, { id, data }) {
      let response = await axios.put(`http://localhost:3000/todos/${id}`, data)
      if (response.data) {
        let i = getters.tasks.findIndex(task => task.id === id)
        if (i >= 0) {
          commit('updateTask', { i, payload: response.data })
        }
      }
    },
    async removeTask({ getters, commit }, { id }) {
      await axios.delete(`http://localhost:3000/todos/${id}`)
      let i = getters.tasks.findIndex(task => task.id === id)
      if (i >= 0) {
        commit('removeTask', { i })
      }
    }
  }
})

export default store