import emailService from '../services/email-service.js';

export default {
    template: `
        <section class="e-app">
            <div class="e-sidebar">
            <router-link to="/email/compose"><button>Compose</button></router-link>
                
                <router-link to="/email/">Inbox</router-link> 
                <div>Starred</div>
                <div>Sent Mail</div>
                <div>Drafts</div>
                <div>Progress Bar</div>
            </div>

            <div class="e-main-emails">
            <router-view></router-view>
            </div>
        </section> 
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