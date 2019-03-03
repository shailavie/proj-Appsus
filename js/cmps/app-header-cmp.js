import navBar from './app-nav-bar-cmp.js'

export default {
    template: `
        <header class="app-header flex space-between center-ver">
                <h1>Appsus</h1>
                <nav-bar></nav-bar>
                <img class="user-avatar" src="./img/user.jpg" alt="user" @click="clearStorage">
        </header> 
    `, components: {
        navBar,
    },
    methods: {
        clearStorage() {
            console.log('local storage cleared')
            localStorage.clear()
        }
    }
}
