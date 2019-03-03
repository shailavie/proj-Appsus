import utilService from '../services/util-service.js';
import emailService from '../services/email-service.js';

export default {
    template: `
    <div class="e-compose">
        <div class="e-new-msg">New Messeage</div>
        <form @submit.prevent="sendEmail" class="e-form">
            <input type="text" class="e-input" placeholder="To:" v-model="to"/><hr/>
            <input type="text" class="e-input" placeholder="Cc:" v-model="cc"/><hr/>
            <input type="text" class="e-input" placeholder="Bcc:"v-model="bcc"/><hr/>
            <input type="text" class="e-input" placeholder="Subject:" v-model="subject"/><hr/>
            <textarea v-model="body" class="e-textarea"></textarea>
            <div class="flex-btns">
                <button class="send-btn">SEND</button>
                <i class="fas fa-trash" @click="deleteEmail"></i>
            </div>
        </form>
    </div>
    `,
    data() {
        return {
            to: '',
            cc: '',
            bcc: '',
            subject: '',
            body: '',
            email: null
        }
    },
    created() {
        const emailId = this.$route.params;
        if (!utilService.isEmpty(emailId)) {
            emailService.getEmailById(emailId.emailId)
                .then(email => {
                    this.email = email;
                    this.subject = 'Re: '+this.email.subject;
                    this.to = this.email.to;
                    this.body = '\n\n<'+ this.email.from+' wrote:>\n\n'+this.email.body;
                })
        }
    },
    methods: {
        sendEmail() {
            emailService.addEmail(this.subject, this.body);
            window.location = "index.html#/email/";
        },
        deleteEmail() {
            window.location = "index.html#/email/";
        }

    },
    computed: {
        Unix_timestamp() {
            var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var date = new Date(this.email.sentAt*1000);
            var year = date.getFullYear();
            var month = months_arr[date.getMonth()];
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            // Display date time in MM-dd-yyyy h:m:s format
            var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2);
            return convdataTime;
        }
    },
    components: {

    }
}