import SockJS from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'
import store from '@/store/index'
import header from "vue-resource/src/http/interceptor/header";


var stompClient = null
const handlers = []

export function connect() {
    const socket = new SockJS('/gs-guide-websocket')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, frame => {
        // console.log('Connected: ' + frame)
        stompClient.subscribe('/topic/activity', message => {
            let m = JSON.parse(message.body)
            if (m.clientId === store.getters.CLIENT.id) {
                // console.log('m.clientId === store.getters.CLIENT.id')
                // handlers.forEach(handler => handler(JSON.parse(message.body)))
                if (m.hasOwnProperty('messageType')) {
                    store.commit('newMessage', m)
                    let element = document.getElementById("messages")
                    setTimeout(() => {
                        if (element.scrollTop + element.clientHeight + 300 >= element.scrollHeight)
                            element.scrollTop = element.scrollHeight
                    }, 10)
                } else if (m.hasOwnProperty('actual')) {
                    // console.log(store.getters.TASKS[8].actual)
                    store.commit('changeTask', m)
                    // console.log(store.getters.TASKS[8].actual)
                }
            }
        })
    })
}

export function addHandler(handler) {
    handlers.push(handler)
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    console.log("Disconnected")
}

export function sendMessage(message) {
    stompClient.send("/app/changeMessage", {}, JSON.stringify(message))
}

export function sendTask(task) {
    stompClient.send("/app/changeTask", {}, JSON.stringify(task))
}
