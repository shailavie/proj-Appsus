import emailService from '../services/email-service.js';
import emailProgress from '../cmps/email-status-cmp.js';


export default {
    data() {
        return {
            emails: []
        }
    },
    template: `
        <section class="e-app">
            <div class="e-sidebar">
            <router-link to="/email/compose"><button>Compose</button></router-link>
                
                <router-link to="/email/">Inbox</router-link> 
                <div>Starred</div>
                <div>Sent Mail</div>
                <div>Drafts</div>
                <email-progress :emails="emailsToShow"></email-progress>
                
            </div>

            <div class="e-main-emails">
            <router-view></router-view>
            </div>
        </section> 
    `,
    created() {
        window.document.title = 'Email App'
        emailService.getEmails()
            .then(emails => this.emails = emails)
    },
    methods: {
    },
    computed: {
        emailsToShow() {
            return this.emails;
        }
    },
    components: {
        emailProgress
    }
}