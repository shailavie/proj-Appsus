import { eventBus, EVENT_EDITNOTE } from '../../../../services/eventbus-service.js'

export default {
    props: ['data'],
    template: `
        <div class="row">
                <input type="text" 
                v-model="txt" 
                v-model=data.value
                :placeholder=data.placeholder
                @blur="reportVal" 
                class="add-note-textBox"
                />
        </div>
    `,
    data() {
        return {
            txt: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', { [this.data.for]: this.txt })
        }
    },
    created(){
        eventBus.$on(EVENT_EDITNOTE, val => {
            console.log('hopa! lets edit this', val.data.subject);
            this.$set(this.data, 'value', val.data.subject)
            // this.data.value = val.data.subject
        })
    },
    components: {
        eventBus
    }
}