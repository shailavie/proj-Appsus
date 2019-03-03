export default {
    props: ['emails'],

    template: `
        <div>
            <progress :max="emailsCount" :value="counter"></progress>
        </div>
        `
    ,
    computed: {
        counter() {
            if (!this.emails) return;
            let counter = 0;
            this.emails.forEach(email => {
                if (email.isRead) counter++;
            });
            return counter;
        },
        emailsCount() {
            if (!this.emails) return;
            return this.emails.length;
        }
    },
    created() {
    },
}