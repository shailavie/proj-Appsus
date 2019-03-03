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
            let res = this.data.value.split(',')
            console.log('got', res)
            console.log(this.data.for)
            this.$emit('setInput', { [this.data.for]: res })
        }
    }, 
    created(){
        eventBus.$on(EVENT_EDITNOTE, val => {
            this.$set(this.data, 'value', val.labels)
        })
    },
    components: {
        eventBus
    }
}