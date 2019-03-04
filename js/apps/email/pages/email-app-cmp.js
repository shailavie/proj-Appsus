import emailService from '../services/email-service.js';
import emailProgress from '../cmps/email-status-cmp.js';
import { eventBus, EVENT_APP_CHANGE } from '../../../services/eventbus-service.js';

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
                        <router-link class="e-sidebar-btn" to="/email/compose">
                            <i class="fas fa-plus-circle fa-2x"></i>
                            <div class="e-compose-txt">Compose</div>
                        </router-link>
                    </div>
                    <div class="e-sidebar-btn">
                        <router-link class="e-sidebar-btn" to="/email/">
                        <i class="fas fa-inbox fa-2x"></i>
                        <div class="e-compose-txt">Inbox</div>
                        </router-link> 
                    </div>
                    <div class="e-sidebar-btn">
                        <router-link class="e-sidebar-btn" to="/email/sent">
                            <i class="fas fa-share-square fa-2x"></i>
                            <div class="e-compose-txt">Sent Mail</div>
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
        eventBus.$emit(EVENT_APP_CHANGE,'Email')
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