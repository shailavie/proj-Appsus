export default {
    props: ['data'],
    template: `
        <div class="row">
                <textarea type="text" 
                v-model="textArea" 
                :placeholder=data.label 
                @blur="reportVal" 
                class="add-note-textArea" 
                ref="note-input-to-focus"></textarea> 
        </div>
    `,
    data() {
        return {
            textArea: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', { [this.data.for]: this.textArea })
        }
    }
}