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
                        <button @click="deleteEmail(email)"><i class="fas fa-trash"></i></button>
                        <button title="Reply" @click="reaplyMail"><i class="fas fa-reply"></i></button>
                    </div>
                    <div class="e-envlope-body"><pre>{{email.body}}</pre></div>
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
            console.log(emailId)
    },
    methods: {
        reaplyMail() {
                window.location = "index.html#/email/compose/" + this.email.id;
        },
        deleteEmail(email) {
            emailService.deleteEmail(email);
            window.location="index.html#/email/";
        }

    },
    computed: {


    },
    components: {

    }
}