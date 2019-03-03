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
            Unread: {{unreadCount}} / {{emailsCount}}
                <email-progress :emails="emailsToShow"></email-progress>
            <router-link to="/email/compose"><button>Compose</button></router-link>
                
                <router-link to="/email/">Inbox</router-link> 
                <div>Starred</div>
                <div>Sent Mail</div>
                
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
        },
        emailsCount() {
            if (!this.emailsToShow) return 0;
            return this.emailsToShow.length;        
        },
        unreadCount() {
            if (!this.emailsToShow) return 0;
            let counter = 0;
            this.emailsToShow.forEach(email => {
                if (!email.isRead) counter++;
            });
            return counter;
        },
    },
    components: {
        emailProgress
    }
}