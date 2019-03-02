
import { makeId } from '../../../services/util-service.js';
import localStorageService from '../services/local-storage-service.js'
import textArea from './dynamic-cmp/form-textarea-cmp.js';
import textBox from './dynamic-cmp/form-textbox-cmp.js';


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
            <input type="file" accept="image/*" @change="openFile($event)">
            <img id='output' v-if="showImg" style="height:100px; width:100px;">
            <button type="submit" class="save-note-btn" @click.stop="hideAddNote">Save</button>
            <button class="close-btn" @click.stop.prevent="hideAddNote"><i class="fas fa-times"></i></button>
        </form>
    </section>
    </div>
    `,
    data() {
        return {
            showImg: false,
            noteType: 'noteTxt',
            imgUrl: null,
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
        openFile(file) {
            var input = file.target;
            var reader = new FileReader();
            var dataUrl;
            reader.onload = function () {
                dataUrl = reader.result;
                localStorageService.saveToLocalStorage('imgUrl', dataUrl)
                .then(res =>  {this.imgUrl = res})
                var output = document.getElementById('output');
                output.src = dataUrl;
            };
            reader.readAsDataURL(input.files[0]);
            this.noteType = 'noteImg'
            this.showImg = true;
        },
        hideAddNote() {
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
                id: makeId(),
                type: this.noteType,
                isPinned: false,
                dateCreated: new Date(),
                bgColor: 'white',
                labels: [],
                data: {
                    subject: '',
                    body: '',
                    src: '',
                }
            }
            this.answers.forEach(answer => {
                if (answer.subject) newNote.data.subject = answer.subject
                if (answer.body) newNote.data.body = answer.body
            });
            localStorageService.loadFromLocalStorage('imgUrl').then(res => newNote.data.src=res)
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
        localStorageService
    }
}

