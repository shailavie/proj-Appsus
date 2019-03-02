import emailService from '../services/email-service.js';
import emailList from '../cmps/email-list-cmp.js';

export default {
    template: `
            <email-list :emails="emailsToShow" @selectedEmail="showEmail" @deleteEmail="deleteEmail" @unreadEmail="unreadEmail"></email-list>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
            selecedId: 0,
            selectedEmail: null
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails)
    },
    methods: {
        showEmail(email) {
            emailService.markAsRead(email);
        },
        deleteEmail(email) {
            emailService.deleteEmail(email);
        },
        unreadEmail(email) {
            emailService.unreadEmail(email);
        }
    },
    computed: {
        emailsToShow() {
            return this.emails;
        }

    },
    components: {
        emailList
    }
}