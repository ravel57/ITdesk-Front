import Vue from 'vue'
import Vuex from 'vuex'
import {isBoolean} from "vue-resource/src/util";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        clients: [],
        messages: [],
        tasks: [],
        client: {},
        page: '',
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
        },
        CLIENTS: state => {
            return state.clients
        },
        PAGE: state => {
            return state.page
        },
    },

    mutations: {
        newMessage: (state, payload) => {
            payload.undelivered = true
            state.messages.push(payload)
        },

        changeMessage: (state, payload) => {
            // console.log('payload:', payload)
            // console.log('payload.id:', payload.id)
            // console.log('messages.length:', state.messages.length)
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
            // change task
            else {
                // confirm delivery
                if (state.tasks[payload.id].undelivered) {
                    state.tasks[payload.id].undelivered = false
                    delete state.tasks[payload.id].undelivered
                }
                state.tasks[payload.id].text = payload.text
                state.tasks[payload.id].actual = payload.actual
            }
        },

        async changeMainPageMessage(state, message) {
            let index = state.clients.findIndex(x => x.id === message.clientId)
            if (index >= 0) {
                state.clients[index].lastMessageDateTime = message.date
                let tmp = state.clients[index]
                state.clients.splice(index, 1)
                state.clients.unshift(tmp)
            } else {
                let client = {
                    id: '',
                    firstName: '',
                    lastName: '',
                    organization: '',
                    lastMessageDateTime: '',
                    lastMessageType: '',
                    lastMessageDifTime: '',
                    tasks: '',
                }
                await axios.get('/api/v1/client/' + message.clientId)
                    .then(response => {
                        client.id = response.data.id
                        client.firstName = response.data.firstName
                        client.lastName = response.data.lastName
                        client.organization = response.data.organization
                        client.lastMessageDateTime = Date.now()
                        client.lastMessageType = 'message client'
                        client.lastMessageDifTime = 0
                    })
                await axios.get('/api/v1/tasks/' + message.clientId)
                    .then(response => {
                        client.tasks = response.data
                        this.state.clients.unshift(client)
                    })
            }
        },


        changeMainPageTask(state, task) {
            // console.log(task)
            let clientIndex = state.clients.findIndex(c => c.id === task.clientId)
            // console.log(state.clients[clientIndex].tasks)
            let index = state.clients[clientIndex].tasks.findIndex(t => t.id === task.id)
            // console.log(index)
            if (index >= 0) {
                if (!task.actual) {
                    state.clients[clientIndex].tasks.splice(index, 1)
                }
            } else {
                state.clients[clientIndex].tasks.splice(index, 0, task)

            }
        },
    },

    actions: {},
    modules: {},
})
