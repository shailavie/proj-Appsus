import emailService from '../services/email-service.js';

export default {
    template: `
        <section class="e-app">
            <div class="e-sidebar">
            <router-link to="/email/compose"><button>Compose</button></router-link>
                <br/>
                <router-link to="/email/">Inbox</router-link> <br/>
                Starred <br/>
                Sent Mail<br/>
                Drafts<br/>
                Progress Bar
            </div>

            <div class="e-main-emails">
            <router-view></router-view>
            </div>
        </section> 
    `,
    data() {
        return {
        }
    },
    created() {
        window.document.title = 'Email App'
    },
    methods: {
    },
    computed: {

    },
    components: {

    }
}