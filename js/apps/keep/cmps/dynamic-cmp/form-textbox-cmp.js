import { eventBus, EVENT_EDITNOTE } from '../../../../services/eventbus-service.js'

export default {
    props: ['data'],
    template: `
        <div class="row">
                <input type="text" 
              
                v-model=data.value
                :placeholder=data.placeholder
                @blur="reportVal" 
                class="add-note-textBox"
                />
        </div>
    `,
    data() {
        return {
            txt: this.data.value,
        }
    },
    methods: { 
        reportVal() {
            // console.log('sending VALUE ',this.txt)
            // console.log('should bbe sending VALUE? ',this.data.value)
            this.$emit('setInput', { [this.data.for]: this.data.value })
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

// v-model=data.value
// v-model="txt" 