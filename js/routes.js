
import bookApp from './pages/book-app-cmp.js'
import bookDetails from './pages/book-details-cmp.js'

var aboutCmp = {
    template: `<section>
        <h1>About Us</h1>
        <router-link exact to="/">Go Back Home</router-link>
        <button @click="sendFeedback">Send Feedback</button>
        </section>`,
    methods: {
        sendFeedback() {
            console.log('Sedning your Feedback');
            setTimeout(() => {
                // this.$router.push('/')
                this.$router.go(-1)
            }, 1000)
        }
    }
}



var homeCmp = {
    template: `<h1>Home</h1>`
}

const routes = [
    { path: '/', component: homeCmp },
    { path: '/about', component: aboutCmp },
    { path: '/book/:bookId', component: bookDetails },
    { path: '/book-app', component: bookApp },
]

export default routes;