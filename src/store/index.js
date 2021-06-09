import Vue from 'vue'
import Vuex from 'vuex'
import {isBoolean} from "vue-resource/src/util";
import axios from "axios";
import messages from "@/components/chat/messages";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        clients: [],
        messages: [
            // {
            //     id: 0,
            //     text: "123123123123",
            //     date: Date.now(),
            //     messageType: "support",
            //     selected: false
            // }, {
            //     id: 1,
            //     text: "456456456",
            //     date: Date.now(),
            //     messageType: "client",
            //     selected: false
            // }, {
            //     id: 2,
            //     text: "789789789",
            //     date: Date.now(),
            //     messageType: "support",
            //     selected: false
            // }, {
            //     id: 3,
            //     text: "15436127498",
            //     date: Date.now(),
            //     messageType: "client",
            //     selected: false
            // },
        ],
        tasks: [
            // {id: 0, text: "123123", actual: true, messageId: null , lastMessageDateTime: Date.now},
            // {id: 1, text: "123123", actual: false, messageId: null, lastMessageDateTime: Date.now},
            // {id: 2, text: "123123", actual: true, messageId: null , lastMessageDateTime: Date.now},
            // {id: 3, text: "123123", actual: false, messageId: null, lastMessageDateTime: Date.now},
        ],
        client: {},
        page: '',
        messageType: 'message support',
        selectedMessages: [],
        pinMessageToTaskActive: false,
        hideMenu: false,
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
        MESSAGETYPE: state => {
            return state.messageType
        },
        SELECTEDMESSAGES: state => {
            return state.selectedMessages
        },
        pinMessageToTaskActive: state => {
            return state.pinMessageToTaskActive
        },
        hideMenu: state => {
            return state.hideMenu
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

        clearChat(state) {
            state.client = {}
            state.messages = []
            state.tasks = []
            state.selectedMessages = []
            state.messageType = 'message support'
        },

        async changeMainPageMessage(state, message) {
            let index = state.clients.findIndex(x => x.id === message.clientId)
            if (index >= 0) {
                state.clients[index].lastMessageDateTime = message.date
                state.clients[index].lastMessageType = message.messageType
                state.clients[index].read = false
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
                    read: false
                }
                await axios.get('/api/v1/client/' + message.clientId)
                    .then(response => {
                        client.id = response.data.id
                        client.firstName = response.data.firstName
                        client.lastName = response.data.lastName
                        client.organization = response.data.organization
                        client.lastMessageDateTime = Date.now()
                        client.lastMessageType = message.messageType
                        client.lastMessageDifTime = 0
                    })
                await axios.get('/api/v1/tasks/' + message.clientId)
                    .then(response => {
                        client.tasks = response.data
                        this.state.clients.unshift(client)
                    })
                // console.log(client)
            }
        },


        changeMainPageTask(state, task) {
            let clientIndex = state.clients.findIndex(c => c.id === task.clientId)
            let taskIndex = state.clients[clientIndex].tasks.findIndex(t => t.id === task.id)
            // console.log('task.id', task.id)
            // console.log('tasks', state.clients[clientIndex].tasks)
            // console.log('')
            // console.log('clientIndex', clientIndex)
            // console.log('taskIndex', taskIndex)
            // console.log('')
            // console.log('state.clients[clientIndex].tasks', state.clients[clientIndex].tasks)
            // console.log('state.clients[clientIndex].tasks[index]', state.clients[clientIndex].tasks[taskIndex])
            if (taskIndex >= 0) {
                if (!task.actual) {
                    state.clients[clientIndex].tasks.splice(taskIndex, 1)
                }
            } else {
                state.clients[clientIndex].tasks.splice(taskIndex, 0, task)

            }
        },

        async changeMainPageClient(state, client) {
            let index = state.clients.findIndex(x => x.id === client.id)
            if (index >= 0) {
                state.clients[index].lastName = client.lastName
                state.clients[index].firstName = client.firstName
                state.clients[index].organization = client.organization
            } else {
                // let client = {
                //     id: '',
                //     firstName: '',
                //     lastName: '',
                //     organization: '',
                //     lastMessageDateTime: '',
                //     lastMessageType: '',
                //     lastMessageDifTime: '',
                //     tasks: '',
                //     readed: false
                // }
                // await axios.get('/api/v1/client/' + client.id)
                //     .then(response => {
                //         client.id = response.data.id
                //         client.firstName = response.data.firstName
                //         client.lastName = response.data.lastName
                //         client.organization = response.data.organization
                //         client.lastMessageDateTime = Date.now()
                //         client.lastMessageType = 'message client'
                //         client.lastMessageDifTime = 0
                //     })
                // await axios.get('/api/v1/tasks/' + client.id)
                //     .then(response => {
                //         client.tasks = response.data
                //         this.state.clients.unshift(client)
                //     })
                // console.log(client)
            }
        },

        changeMessageType(state, newType) {
            if (state.messageType === 'message support') {
                state.messageType = 'comment'
            } else if (state.messageType === 'comment') {
                state.messageType = 'message support'
            }
        },

        selectMessage(state, id) {
            if (!this.state.messages[id].selected) {
                state.messages[id].selected = true
                state.selectedMessages.push(id)
            } else {
                state.messages[id].selected = false
                state.selectedMessages.splice(this.state.selectedMessages.indexOf(id), 1)
            }
        },

        pinMessageToTask(state, id) {
            state.pinMessageToTaskActive = true
            // console.log(state.tasks[id])
            // console.log(state.pinMessageToTaskActive)
            // state.tasks[id].messageId = Math.min.apply(Math, state.selectedMessages)
        },

        selectTask(state, taskId) {
            state.tasks[taskId].messageId = Math.min.apply(Math, state.selectedMessages)
            this.commit('removeSelection')
        },

        removeSelection(state) {
            state.pinMessageToTaskActive = false
            state.selectedMessages.forEach(element => this.state.messages[element].selected = false)
            state.selectedMessages = []
        },

        changeHideMenuStatus(state) {
            state.hideMenu = !state.hideMenu
        }
    },

    actions: {},

    modules: {},
})
