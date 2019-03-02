export default {
    props: ['data'],
    template: `
        <div class="row">
                <input type="text" 
                v-model="txt" 
                :placeholder=data.label 
                @blur="reportVal" 
                class="add-note-textBox"/>
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
    }
}