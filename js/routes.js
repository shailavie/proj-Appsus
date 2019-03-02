///////////////////////////////
////////// AppSus /////////////
///////////////////////////////


import emailApp from './apps/email/pages/email-app-cmp.js'
import emailInbox from './apps/email/pages/email-inbox-cmp.js'
import emailCompose from './apps/email/pages/email-compose-cmp.js'
import emailDetails from './apps/email/pages/email-details-cmp.js'
import keepApp from './apps/keep/pages/keep-app-cmp.js'

const homeCmp = {
    template: `<h1> Welcome to Appsus. Choose youre App</h1>`
}

const routes = [
    { path: '/', component: homeCmp },
    { path: '/keep', component: keepApp },
    {
        path: '/email', component: emailApp,
        children: [
            { path: '', component: emailInbox },
            { path: 'compose', component: emailCompose, children: 
                [{ path: ':emailId', component: emailCompose }] },
            { path: ':emailId', component: emailDetails },
        ]
    },
]

export default routes;