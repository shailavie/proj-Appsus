import emailService from '../services/email-service.js';

export default {
    template: `
        <section class="e-app">
            <div class="e-sidebar">
                <button>Compose</button><br/>
                Inbox <br/>
                Starred <br/>
                Sent Mail<br/>
                Drafts<br/>
                Progress Bar
            </div>

            <div class="e-main-emails">
                emails
            </div>
        </section> 
    `,
    data() {
        return {
        }
    },
    created() {
        window.document.title='Email App'
    },
    methods: {
    },
    computed: {
        
    },
    components: {

    }
}