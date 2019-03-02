import emailService from '../services/email-service.js';

export default {
    template: `
    <div class="e-compose">
        <div class="e-new-msg">New Messeage</div>
        <form @submit.prevent="sendEmail">
            <input type="text" class="e-input" placeholder="To:" v-model="to"/><hr/>
            <input type="text" class="e-input" placeholder="Cc:" v-model="cc"/><hr/>
            <input type="text" class="e-input" placeholder="Bcc:"v-model="bcc"/><hr/>
            <input type="text" class="e-input" placeholder="Subject:" v-model="subject"/><hr/>
            <textarea v-model="body"></textarea>
            <div class="flex-btns">
                <button class="send-btn">SEND</button>
                <i class="fas fa-trash"></i>
            </div>
        </form>
    </div>
    `,
    data() {
        return {
            to:'',
            cc:'',
            bcc:'',
            subject:'',
            body:''
        }
    },
    created() {
        const emailId = this.$route.params;
        console.log(emailId)
    },
    methods: {
        sendEmail() {
            emailService.addEmail(this.subject, this.body);
            window.location="index.html#/email/";
        }

    },
    computed: {


    },
    components: {

    }
}