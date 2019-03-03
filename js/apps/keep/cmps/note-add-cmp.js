
import { makeId } from '../../../services/util-service.js';
import localStorageService from '../services/local-storage-service.js'
import textArea from './dynamic-cmp/form-textarea-cmp.js';
import textBox from './dynamic-cmp/form-textbox-cmp.js';
import { eventBus, EVENT_EDITNOTE } from '../../../services/eventbus-service.js'

export default {
    props: ['note'],
    template: `
    <div class="overlayer">
    <section :style="getBgColor" class="note-add">
    <img id='output' v-if="showImg" style="height:auto; width:50%;">
    <form @submit.prevent="saveNewNote" class="note-add-form" @keyup.tab.prevent @keyup.esc="hideAddNote">
            <component v-for="(currCmp, idx) in cmps" 
                        class="add-note-field  flex   space-between"
                        :is="currCmp.type" 
                        :data="currCmp.data"
                    
                        v-model="note"
                        :key="currCmp.id"
                        @setInput="setInput($event, idx)">
            </component>
            <input class="add-img-btn" type="file" accept="image/*" @change="openFile($event)">
           
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
            note2: this.deepCopy(this.note),
            isEditMode: null,
            cmps: [
                {
                    id: makeId(),
                    type: 'textBox',
                    data: {
                        value: (this.isEditMode)? this.note.data.subject : '',
                        placeholder: this.note.data.subject,  // || 'Title',
                        for: 'subject',
                        myClass: 'add-note-textBox',
                    }
                },
                {
                    id: makeId(),
                    type: 'textArea',
                    data: {
                        value: (this.isEditMode)? this.note.data.body : '',
                        placeholder: this.note.data.body,  //'Take a note',
                        for: 'body',
                        myClass: 'add-note-textArea',
                    }
                },
            ],
            answers: []
        }
    },
    methods: {
        deepCopy(obj) {
            var res = JSON.parse(JSON.stringify(obj))
            return JSON.parse(JSON.stringify(obj))
        },
        openFile(file) {
            var input = file.target;
            var reader = new FileReader();
            var dataUrl;
            reader.onload = function () {
                dataUrl = reader.result;
                localStorageService.saveToLocalStorage('imgUrl', dataUrl)
                    .then(res => { this.imgUrl = res })
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
            if (this.isEditMode) {
                var newNote = this.note
            } else {
                var newNote = {
                    id: (this.isEditMode) ? this.note.id : makeId(),
                    type: this.noteType,
                    isPinned: false,
                    dateCreated: new Date(),
                    bgColor: 'white',
                    placeholders: [],
                    data: {
                        subject: '',
                        body: '',
                        src: '',
                    }
                }
                localStorageService.loadFromLocalStorage('imgUrl').then(res => newNote.data.src = res)
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
        eventBus.$on(EVENT_EDITNOTE, note2Edit => {
            console.log('hopa lalalalalalalal! lets edit this', note2Edit);


            this.$set(this.cmps[0].data, 'value', note2Edit.data.subject)
            this.$set(this.cmps[1].data, 'value', note2Edit.data.body)
            this.isEditMode = true

            // console.log('potaot', this.cmps[0])

        })
    },
    destroyed() {
        console.log('bye')
    },
    computed: {
        getBgColor(){
            return {'backgroundColor' : this.note.bgColor}
        }
    },
    components: {
        textBox,
        textArea,
        localStorageService,
        eventBus
    }
}

