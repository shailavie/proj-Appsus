var preview = {
    props: ['email'],
    data() {
        return {
            showEnvlope: false,
        }
    },
    template: `
    <div><ul>
        <li class="e-preview">
         <div class="e-email-preview" :class="{unread: !email.isRead}" @click="toggleEnvlope">
            <div class="e-email-author">
            {{email.name}}
            </div>
            <div class="e-email-content">
            {{email.subject}} - <span class="grey">{{shortEmailBody}}</span>
            </div>
            <div class="e-email-time">
                {{Unix_timestamp}}
            </div>
        </div>
</li></ul>
                <div class="e-envlope" v-if="showEnvlope">
                    <div class="e-envlope-details">
                    <h1>{{email.subject}}</h1>
                    <span class="unread">{{email.name}}</span>
                    <span class="grey">&nbsp;<{{email.from}}></span>
                    </div>
                    <div class="e-envlope-buttons">
                        <button title="Delete Email" @click="deleteEmail(email)"><i class="fas fa-trash"></i></button>
                        <button title="Open Email" @click="openMailNewWindow"><i class="fas fa-expand"></i></button>
                        <button title="Mark As Unread" @click.stop="markAsUnread"><i class="fas fa-envelope"></i></button>
                        <button title="Reply" @click="reaplyMail"><i class="fas fa-reply"></i></button>
                    </div>
                </div>
                <div class="e-envlope-body" v-if="showEnvlope" style="white-space: pre;">{{email.body}}</div>
</div>
        
    `,
    methods: {
        toggleEnvlope() {
            var isShow = this.showEnvlope;
            if (!isShow) {
                this.showEnvlope = true;
            } else {
                this.showEnvlope = false;
            }
        },
        openMailNewWindow() {
            window.location = "index.html#/email/" + this.email.id;
        },
        deleteEmail(email) {
            this.$emit('emailToDelete', email)
        },
        markAsUnread(email) {
            this.$emit('unread', email)
            this.showEnvlope = false;
        },
        reaplyMail() {
            window.location = "index.html#/email/compose/" + this.email.id;
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
            var convdataTime = hours + ':' + minutes.substr(-2);
            return convdataTime;
        },
        shortEmailBody() {
            var emailBody = this.email.body;
            if (emailBody.length < 50) {
                return emailBody;
            } else {
                return emailBody.substr(0, 50) + '...'
            }
        }
    },
    created() {
    }
}

export default preview