import emailPreview from '../cmps/email-preview-cmp.js';

export default {
    props: ['emails'],
    template: `
    <ul>
                <li :key="currEmail.id"
                v-for="(currEmail, idx) in emails">
                    <email-preview
                    :email="currEmail" 
                    @selectedEmail="showEmail"
                    :idx="idx+1" 
                    :key="currEmail.id">
                </email-preview>
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
        showEmail(id) {
            this.$emit('selectedEmail', id);
        }
    },
    computed: {

    },
    components: {
        emailPreview
    }
}