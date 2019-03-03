import { eventBus, EVENT_EDITNOTE } from '../../../../services/eventbus-service.js'

export default {
    props: ['data'],
    template: `
        <div class="row">
                <textarea type="text" 
            
                v-model=data.value
                :placeholder=data.placeholder 
                @blur="reportVal" 
                class="add-note-textArea" 
                ref="note-input-to-focus"></textarea> 
        </div>
    `,
    data() {
        return {
            textArea: this.data.value,
        }
    },
    methods: { 
        reportVal() {
            this.$emit('setInput', { [this.data.for]: this.data.value })
        }
    },
    created() {
        eventBus.$on(EVENT_EDITNOTE, val => {
            console.log('hopa! lets edit this', val.data.body);
            this.$set(this.data, 'value', val.data.body)
            
            // this.data.value = val.data.body
            
            // let obj = JSON.parse(JSON.stringify(this.data.value))
            // obj.value = val.data.body
            // console.log(obj)
            // Object.assign(this.data.value,obj)

        })
    },
    components: {
        eventBus
    }
}

// v-model=data.value