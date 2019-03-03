///////////////////////////////
////////// AppSus /////////////
///////////////////////////////


import emailApp from './apps/email/pages/email-app-cmp.js'
import emailInbox from './apps/email/pages/email-inbox-cmp.js'
import emailCompose from './apps/email/pages/email-compose-cmp.js'
import emailDetails from './apps/email/pages/email-details-cmp.js'
import keepApp from './apps/keep/pages/keep-app-cmp.js'
import { eventBus, EVENT_NOTE_TO_EMAIL } from './services/eventbus-service.js'
import emailService from './apps/email/services/email-service.js'


const homeCmp = {
    template: `<h1> Welcome to Appsus. Choose youre App</h1>`
    ,created(){
        console.log('home is adding event BUS')
        eventBus.$on(EVENT_NOTE_TO_EMAIL, emailFromNote => {
            console.log('TA DA!',emailFromNote)
            emailService.addEmail(emailFromNote.subject,emailFromNote.body)
            let url = `index.html#/email/compose/${emailFromNote.id}&${emailFromNote.subject}&${emailFromNote.body}`
            console.log(url)
            window.location = url
        })
    },
    component:{
        eventBus,
        emailService
    }
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