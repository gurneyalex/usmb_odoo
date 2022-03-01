import 'bulma-popover/css/bulma-popover.css'
import 'bulma/css/bulma.css'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import { Vue3Mq } from 'vue3-mq'
import App from './App.vue'
import Cart from './components/cart/Cart.vue'
import Catalog from './components/Catalog.vue'
import Connexion from './components/connexion/Connexion.vue'
import messages from './i18n/messages'
import store from './state/store'
import History from './components/history/History.vue'


const i18n = createI18n({
    locale: navigator.language,
    fallbackLocale: 'en',
    messages,
})


const router = createRouter({
    history: createWebHistory(),

    routes: [
        { path: '/', component: Catalog },
        { path: '/cart', component: Cart },
        { path: '/connexion', component: Connexion },
        { path: '/history', component: History },
    ],
})


createApp(App)
    .use(i18n)
    .use(Vue3Mq, {
        breakpoints: {
            phone: 0,
            tablet: 1024,
            other: 1366,
        },
    })
    .use(store)
    .use(router)
    .mount('#app')
