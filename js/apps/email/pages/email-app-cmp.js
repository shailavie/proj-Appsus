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
                <div class="e-sidebar-btns">
                    <div class="e-sidebar-btn">
                        <router-link to="/email/compose">
                            <i class="fas fa-plus-circle fa-2x"></i><span class="e-compose-txt">Compose</span>
                        </router-link>
                    </div>
                    <div class="e-sidebar-btn">
                        <router-link to="/email/">
                        <i class="fas fa-inbox fa-2x"></i><span class="e-compose-txt">Inbox</span>
                        </router-link> 
                    </div>
                    <div class="e-sidebar-btn">
                        <router-link to="/email/sent">
                            <i class="fas fa-share-square fa-2x"></i><span class="e-compose-txt">Sent Mail</span>
                        </router-link> 
                    </div>
                </div>    
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