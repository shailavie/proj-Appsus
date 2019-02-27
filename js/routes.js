///////////////////////////////
////////// AppSus /////////////
///////////////////////////////


import emailApp from './apps/email/pages/email-app-cmp.js'
import keepApp from './apps/keep/pages/keep-app-cmp.js'
// import bookDetails from './pages/book-details-cmp.js'
// import about from './pages//about-cmp.js'

const homeCmp = {
    template: `<h1> Welcome to Appsus</h1>`
}


const routes = [
    { path: '/', component: homeCmp },
    { path: '/email', component: emailApp },
    { path: '/keep', component: keepApp },
]

export default routes;