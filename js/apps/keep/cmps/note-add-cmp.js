
// export default {
//     props:[],
//     template: `
//     <section>
        
//     </section>
//     `
// }


import { makeId } from '../../../services/util-service.js';
// import { eventBus } from './event-bus.js'

const textBox = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <input type="text" v-model="txt" @blur="reportVal" />
            </label>
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
const textArea = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <textarea type="text" v-model="textArea" @blur="reportVal" ></textarea> 
            </label>
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
const selectBox = {
    props: ['data'],
    template: `
        <div class="row">
            <label>
                {{data.label}}
                <select v-model="selectedOpt" @blur="reportVal">
                    <option v-for="opt in data.opts">{{opt}}</option>
                </select>
            </label>
        </div>
    `,
    data() {
        return {
            selectedOpt: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setInput', { [this.data.for]: this.selectedOpt })
        }
    }
}
 

export default {
    template: `
    <section class="note-add">
    <form @submit.prevent="saveNewNote">
            <component v-for="(currCmp, idx) in cmps" 
                        class="add-note-field  flex   space-between"
                        :is="currCmp.type" 
                        :data="currCmp.data"
                        :key="currCmp.id"
                        @setInput="setInput($event, idx)">
            </component>
            <button type="submit" class="btn">Save Note</button>
        </form>
    </section>
    `,
    data() {
        return {
            cmps: [
                {
                    id: makeId(),
                    type: 'textBox',
                    data: {
                        label: 'Subject',
                        for: 'subject',
                        class: 'add-note-field flex center-all space-between',
                    }
                },
                {
                    id: makeId(),
                    type: 'textArea',
                    data: {
                        label: 'Take a note',
                        for: 'body',
                        class: 'add-note-field flex center-all space-between',
                    }
                },
               
            ],
            answers: []
        }
    },
    methods: {
        setInput(ans, inputIdx) {
            this.answers.splice(inputIdx, 1, ans);
            console.log('Survey Got ev', ans);
        },
        saveNewNote() {
            console.log('Survey Answers', this.answers);
            let newNote = {
                id : makeId(), 
                type : 'txt',
                isPinned : false,
                dateCreated : new Date(),
                bgColor : 'white',
                labels : [],
                data : {
                    subject : '',
                    body : '',
                }
            }
            this.answers.forEach(answer => {
                if (answer.subject) newNote.data.subject = answer.subject
                if (answer.body) newNote.data.body = answer.body
            });
            console.log('Huston we have a new note: ', newNote)
            this.$emit('newnote', newNote)
        }
    },
    created() {

    },
    components: {
        textBox,
        selectBox,
        textArea,
    }
}

