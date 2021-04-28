import Vue from 'vue'
import Vuex from 'vuex'
import {isBoolean} from "vue-resource/src/util";

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
            state.tasks.unshift(payload)
        },

        changeTask: (state, payload) => {
            // new task
            if (payload.id >= state.tasks.length)
                state.tasks.unshift(payload)
            //change task
            else {
                state.tasks[payload.id].id = payload.id
                state.tasks[payload.id].clientId = payload.clientId
                state.tasks[payload.id].text = payload.text
                state.tasks[payload.id].actual = payload.actual
            }
        },
    },

    actions: {},
    modules: {},
})
