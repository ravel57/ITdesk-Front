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
            payload.undelivered = true
            state.messages.push(payload)
        },

        changeMessage: (state, payload) => {
            if (payload.id >= state.messages.length) {
                state.messages.push(payload)

            } else if (state.messages[payload.id].undelivered) {
                state.messages[payload.id].undelivered = false
                delete state.messages[payload.id].undelivered
            }
            // state.messages[payload.id].text = payload.text

        },

        addTask: (state, payload) => {
            payload.undelivered = true
            state.tasks.push(payload)
        },

        changeTask: (state, payload) => {
            // new task
            if (payload.id >= state.tasks.length)
                state.tasks.push(payload)
            //change task
            else {
                if (state.tasks[payload.id].undelivered) {
                    state.tasks[payload.id].undelivered = false
                    delete state.tasks[payload.id].undelivered
                }
                state.tasks[payload.id].text = payload.text
                state.tasks[payload.id].actual = payload.actual
            }
        },
    },

    actions: {},
    modules: {},
})
