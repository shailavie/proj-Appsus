import { eventBus, EVENT_NOTE_TO_EMAIL } from './services/eventbus-service.js'

export default {
    template: `
        <section>
            <div class="home-apps">
                <div class="apps-container">
                    <div class="app-container">
                        <router-link to="/email"  class="nb-link" title="Email">
                            <i class="fas fa-envelope-open"></i>
                            <h2>Email</h2>
                        </router-link>
                    </div>
                    <div class="app-container">
                        <router-link to="/keep"  class="nb-link" title="Keep">
                            <i class="fas fa-sticky-note"></i>
                            <h2>Keep</h2>
                        </router-link>
                    </div>
                    <div class="app-container">
                        <router-link to="/books" class="nb-link" title="Books">
                            <i class="fas fa-book"></i>
                            <h2>Books</h2>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        `
    , created() {
        console.log('home is adding event BUS')
        eventBus.$on(EVENT_NOTE_TO_EMAIL, emailFromNote => {
            console.log('TA DA!', emailFromNote)
            let url = `index.html#/email/compose/${emailFromNote.id}&${emailFromNote.subject}&${emailFromNote.body}`
            console.log(url)
            window.location = url
        })
    },
    component: {
        eventBus,
    }
}