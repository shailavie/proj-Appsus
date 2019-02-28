import emailService from '../services/email-service.js';

export default {
    template: `
                <div class="e-envlope" v-if="email">
                    <div class="e-envlope-details">
                    <h1>{{email.subject}}</h1>
                    <span class="unread">{{email.name}}</span>
                    <span class="grey">&nbsp;<{{email.from}}></span>
                    </div>
                    <div class="e-envlope-buttons">
                        <button><i class="fas fa-trash"></i></button>
                        <button @click="reaplyMail"><i class="fas fa-expand"></i></button>
                    </div>
                    <div class="e-envlope-body">{{email.body}}</div>
                </div>
    `,
    data() {
        return {
            email: null

        }
    },
    created() {
        const emailId = this.$route.params.emailId;
        emailService.getEmailById(emailId)
            .then(email => {
                this.email = email
            })
    },
    methods: {
        reaplyMail() {

        }

    },
    computed: {


    },
    components: {

    }
}