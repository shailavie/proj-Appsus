import emailService from '../services/email-service.js';
import emailPreview from '../services/email-service.js';

export default {
    template: `
    <ul>
                <li :key="currBook.id"
                v-for="(currBook, idx) in books">
                <router-link
                    :to="'/book/' + currBook.id" >
                    <book-preview
                    :book="currBook" 
                    @selectedBook="showBook"
                    :idx="idx+1" 
                    :key="currBook.id">
                </book-preview>
                </router-link>
                </li>
            </ul>
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