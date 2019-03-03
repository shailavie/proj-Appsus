///////////////////////////////
////////// AppSus /////////////
///////////////////////////////


import { eventBus, EVENT_NOTE_TO_EMAIL } from './services/eventbus-service.js'
import emailApp from './apps/email/pages/email-app-cmp.js'
import emailInbox from './apps/email/pages/email-inbox-cmp.js'
import emailSent from './apps/email/pages/email-sent-cmp.js'
import emailCompose from './apps/email/pages/email-compose-cmp.js'
import emailDetails from './apps/email/pages/email-details-cmp.js'
import keepApp from './apps/keep/pages/keep-app-cmp.js'
import booksApp from './apps/books/js/pages/book-app-cmp.js'
import homeCmp from './home-cmp.js'

const routes = [
    { path: '/', component: homeCmp },
    { path: '/keep', component: keepApp },
    { path: '/books', component: booksApp },
    {
        path: '/email', component: emailApp,
        children: [
            { path: '', component: emailInbox },
            { path: 'sent', component: emailSent },
            {
                path: 'compose', component: emailCompose, children:
                    [{ path: ':emailId', component: emailCompose }]
            },
            { path: ':emailId', component: emailDetails },
        ]
    },
]

export default routes;