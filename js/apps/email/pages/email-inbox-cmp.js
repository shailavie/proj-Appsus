import emailService from '../services/email-service.js';
import emailList from '../cmps/email-list-cmp.js';
import emailFilter from '../cmps/email-filter-cmp.js'


export default {
    template: `<div>
        <email-filter class="note-filter" @filtered="setFilter"></email-filter>
        <email-list :emails="emailsToShow" @selectedEmail="showEmail" @deleteEmail="deleteEmail" @unreadEmail="unreadEmail"></email-list>
    </div>`,
    data() {
        return {
            emails: [],
            filteredEmails: [],
            filterBy: {
                txt: '',
                selectedFilter: 'All'
            },
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
        },
        setFilter(filterBy) {
            this.filterBy.txt = filterBy.txt;
            this.filterBy.selectedFilter = filterBy.selectedFilter;
            if (filterBy.selectedFilter === 'Read') {
                var readEmails = this.emails.filter(email => email.isRead)
                this.emails = readEmails;
            }

            if (filterBy.selectedFilter === 'Unread') {
                var unreadEmails = this.emails.filter(email => !email.isRead)
                this.emails = unreadEmails;
            }
            if (filterBy.selectedFilter === 'All') {
                emailService.getEmails()
                    .then(emails => this.emails = emails)
            }
        }
    },
    computed: {
        emailsToShow() {
            this.searchTerm = this.filterBy.txt.toLowerCase()
            return this.emails.filter(email => {
                return (
                    email.subject.toLowerCase().includes(this.searchTerm)
                    || email.body.toLowerCase().includes(this.searchTerm)
                    || email.from.toLowerCase().includes(this.searchTerm)
                )
            })

        }

    },
    components: {
        emailList,
        emailFilter
    }
}