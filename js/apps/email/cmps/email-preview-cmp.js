var preview = {
    props: ['email'],
    data() {
        return {
            showEnvlope: false,
        }
    },
    template: `
    <div>
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
                <div class="e-envlope" v-if="showEnvlope">
                    <div class="e-envlope-details">
                    <h1>{{email.subject}}</h1>
                    <span class="unread">{{email.name}}</span>
                    <span class="grey">&nbsp;<{{email.from}}></span>
                    </div>
                    <div class="e-envlope-buttons">
                        <button title="Delete Email" @click="deleteEmail(email)"><i class="fas fa-trash"></i></button>
                        <button title="Open Email" @click="openMailNewWindow"><i class="fas fa-expand"></i></button>
                        <button title="Reply" @click="reaplyMail"><i class="fas fa-reply"></i></button>
                    </div>
                </div>
                <div class="e-envlope-body" v-if="showEnvlope">{{email.body}}</div>
                <hr/>
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
        reaplyMail() {
            window.location = "index.html#/email/compose/" + this.email.id;
        }
    },
    computed: {
        Unix_timestamp() {
            var t = this.email.sentAt;
            var dt = new Date(t * 1000);
            var hr = dt.getHours();
            var m = "0" + dt.getMinutes();
            var s = "0" + dt.getSeconds();
            var ampm;
            if (hr < 12) {
                ampm = 'AM';
                if (hr < 10) hr = '0' + hr;
            } else ampm = 'PM';
            return hr + ':' + m.substr(-2) + ' ' + ampm;
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