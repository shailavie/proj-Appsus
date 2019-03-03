import { eventBus, EVENT_NOTE_TO_EMAIL } from './services/eventbus-service.js'

export default  {
    template: `<h1> Welcome to Appsus. Choose youre App</h1>`
    ,created(){
        console.log('home is adding event BUS')
        eventBus.$on(EVENT_NOTE_TO_EMAIL, emailFromNote => {
            console.log('TA DA!',emailFromNote)
            let url = `index.html#/email/compose/${emailFromNote.id}&${emailFromNote.subject}&${emailFromNote.body}`
            console.log(url)
            window.location = url
        })
    },
    component:{
        eventBus,
    }
}