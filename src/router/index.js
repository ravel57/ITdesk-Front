import Vue from 'vue'
import VueRouter from 'vue-router'

import chatPage from "@/pages/chat-page/chatPage";
import mainPage from "@/pages/main-page/mainPage";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [{
        path: '/dialogs',
        name: 'main',
        component: mainPage
    }, {
        path: '/dialogs/:id',
        name: 'chat',
        component: chatPage,
    },
    ]
})
