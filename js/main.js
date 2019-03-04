
import appHeader from './cmps/app-header-cmp.js';
import appFooter from './cmps/app-footer-cmp.js';
import routes from './routes.js';
// import eventBus from './cmps/reviews/event-bus.js'

const router = new VueRouter({ routes })

window.vueApp = new Vue({
    el: '#app',
    components: {
        appHeader,
        appFooter,
    },
    router,

})
