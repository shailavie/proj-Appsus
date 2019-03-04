import navBar from './app-nav-bar-cmp.js'
import { eventBus, EVENT_APP_CHANGE } from '../services/eventbus-service.js'

export default {
    template: `
        <header class="app-header flex space-between center-ver">
                <h1 class="app-title" ref="apptitle">Appsus</h1>
                <nav-bar></nav-bar>
                <img class="user-avatar" src="./img/user.jpg" alt="user" @click="clearStorage">
        </header> 
    `, components: {
        navBar,
        eventBus
    },
    methods: {
        clearStorage() {
            console.log('local storage cleared')
            localStorage.clear()
        }
    },
    created() {
        eventBus.$on(EVENT_APP_CHANGE, app => {
            this.$refs.apptitle.innerText = app
        })
    },
    mounted() {
        console.log(this.$refs)
    }
}
