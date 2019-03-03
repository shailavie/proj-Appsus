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
            filterBy: {
                txt: '',
                selectedFilter: 'All',
                sortBy: 'Sort By'
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
            this.filterBy.sortBy = filterBy.sortBy;

        }
    },
    computed: {
        emailsToShow() {
            this.searchTerm = this.filterBy.txt.toLowerCase()

            var filteredEmails = this.emails.filter(email => {
                return (
                    (email.name === 'Me') &&
                    (email.isRead && this.filterBy.selectedFilter === 'Read' ||
                        !email.isRead && this.filterBy.selectedFilter === 'Unread' ||
                        this.filterBy.selectedFilter === 'All'
                    )
                )
            })

            return filteredEmails;
        }

    },
    components: {
        emailList,
        emailFilter
    }
}