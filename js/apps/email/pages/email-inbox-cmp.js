import emailService from '../services/email-service.js';
import emailList from '../cmps/email-list-cmp.js';

export default {
    template: `
            <email-list :emails="emailsToShow" @selectedEmail="showEmail" @click="showEmail"></email-list>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
            selecedId: 0,
            showDetails: false,
            selectedEmail: null
        }
    },
    created() {
        window.document.title = 'Email App'
        emailService.getEmails()
            .then(emails => this.emails = emails)
    },
    methods: {
        showEmail(id) {
            emailService.getEmailById(id)
                .then(email => this.selectedEmail = email);
            this.showDetails = true;
            console.log('sss')
        },
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