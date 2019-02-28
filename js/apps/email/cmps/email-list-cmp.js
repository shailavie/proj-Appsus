import emailPreview from '../cmps/email-preview-cmp.js';

export default {
    props: ['emails'],
    template: `
    <ul>
                <li :key="currEmail.id"
                v-for="(currEmail, idx) in emails">
                    <email-preview
                    :email="currEmail" 
                    :idx="idx+1" 
                    @click.native="showEmail(currEmail)"
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
        showEmail(email) {
            this.$emit('selectedEmail', email);
        }
    },
    computed: {

    },
    components: {
        emailPreview
    }
}