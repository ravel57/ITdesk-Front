import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        messages: [],
        tasks: [],
        client: {}
    },

    getters: {
        MESSAGES: state => {
            return state.messages
        },
        TASKS: state => {
            return state.tasks
        },
        CLIENT: state => {
            return state.client
        }
    },

    mutations: {
        newMessage: (state, payload) => {
            state.messages.push(payload)
        },

        addTask: (state, payload) => {
            state.tasks.push(payload)
        },

        changeTask: (state, payload) => {
            // console.log('changeTask()')
            // console.log('payload = ', payload)
            // console.log('payload.id = ', payload.id)
            // console.log('state.tasks.length = ', state.tasks.length)
            if (payload.id >= state.tasks.length)
                state.tasks.push(payload)
            else {
                // console.log(state.tasks)
                state.tasks[payload.id] = payload
            }
        },

    },

    actions: {},
    modules: {},
})
