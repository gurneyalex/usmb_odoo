
import messages from '../src/i18n/messages.js'



const { createApp } = Vue;
const { createI18n } = VueI18n;
const { createRouter } = VueRouter;

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
