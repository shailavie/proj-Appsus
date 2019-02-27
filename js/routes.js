///////////////////////////////
////////// AppSus /////////////
///////////////////////////////


import emailApp from './apps/email/pages/email-app-cmp.js'
import emailInbox from './apps/email/pages/email-inbox-cmp.js'
import keepApp from './apps/keep/pages/keep-app-cmp.js'
// import bookDetails from './pages/book-details-cmp.js'
// import about from './pages//about-cmp.js'

const homeCmp = {
    template: `<h1> Welcome to Appsus</h1>`
}

const compose = { template: '<div>COMPOSE</div>' }
const inbox = { template: '<div>inbox</div>' }

const routes = [
    { path: '/', component: homeCmp },
    { path: '/keep', component: keepApp },
    { path: '/email', component: emailApp,
    children: [
        { path: '', component: emailInbox },
        { path: 'compose', component: compose }
      ]
},
]

export default routes;