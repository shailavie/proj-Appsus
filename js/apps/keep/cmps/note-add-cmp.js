

import { makeId } from '../../../services/util-service.js';
// import { eventBus } from './event-bus.js'

const textBox = {
    props: ['data'],
    template: `
        <div class="row">
            <!-- <label>
                {{data.label}} -->
                <input type="text" v-model="txt" :placeholder=data.label @blur="reportVal" class='add-note-textBox'/>
            <!-- </label> -->
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
            <!-- <label>
                {{data.label}} -->
                <textarea type="text" v-model="textArea" :placeholder=data.label @blur="reportVal" class='add-note-textArea' ref="note-input-to-focus"></textarea> 
            <!-- </label> -->
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
    <div class="overlayer">
    <section class="note-add">
    <form @submit.prevent="saveNewNote" class="note-add-form" @keyup.tab.prevent @keyup.esc="hideAddNote">
            <component v-for="(currCmp, idx) in cmps" 
                        class="add-note-field  flex   space-between"
                        :is="currCmp.type" 
                        :data="currCmp.data"
                        :key="currCmp.id"
                        @setInput="setInput($event, idx)">
            </component>
            <button type="submit" class="save-note-btn" @click.stop="hideAddNote">Save</button>
            <button class="close-btn" @click.stop.prevent="hideAddNote"><i class="fas fa-times"></i></button>
        </form>
    </section>
    </div>
    `,
    data() {
        return {
            cmps: [
                {
                    id: makeId(),
                    type: 'textBox',
                    data: {
                        label: 'Title',
                        for: 'subject',
                        myClass: 'add-note-textBox',
                    }
                },
                {
                    id: makeId(),
                    type: 'textArea',
                    data: {
                        label: 'Take a note',
                        for: 'body',
                        myClass: 'add-note-textArea',
                    }
                },
               
            ],
            answers: []
        }
    },
    methods: {
        hideAddNote(){
            console.log('closing modal');
            setTimeout(() => {
                this.$emit('hideAddNote')
            }, 10);
        },
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

