import { eventBus, EVENT_EDITNOTE, EVENT_CHANGE_NOTE_COLOR, EVENT_TOGGLE_PIN_NOTE, EVENT_DELETE_NOTE, EVENT_NOTE_TO_EMAIL, EVENT_DUPLICATE_NOTE } from '../../../services/eventbus-service.js'
// import { makeId } from '../../../services/util-service.js'
import { makeId } from '../../email/services/util-service.js'

const colorPicker = {
    props: ['colors'],
    template: `
    <div class="color-picker" @mouseleave="hideColorPicker" >
        <div v-for="(color) in colors" :key="color">
            <div class="color-circle" :style="getClass(color)" @click.stop="changeColor(color)" ></div>
        </div>
    </div>
    `,
    methods: {
        hideColorPicker() {
            this.$emit('hideColorPicker')
        },
        changeColor(color) {
            this.$emit('changeColor', color)
        },
        getClass(color) {
            return { 'backgroundColor': color }
        }
    },
}


//TO DO - Add duplicate functionality (eventBus to keep-app-cmp -> service)
// Use this icon <i class="fas fa-copy"></i>
export default {
    props: ['note'],
    template: `
        <div class="note-controllers-container">
            <i class="fas fa-thumbtack note-control-opt" :title="pinTitle" @click.stop="pinNote(note)"></i>
            <i class="fas fa-edit note-control-opt" title="Edit note" @click.stop="editNote(note)"></i>
            <i class="fas fa-copy note-control-opt" title="Duplicate note" @click.stop="duplicateNote(note)"></i>
            <i class="fas fa-palette note-control-opt" title="Change color" @mouseover="showColorPicker=!showColorPicker" ></i>
            <i class="fas fa-share-square note-control-opt" title="Send to mail" @click.stop="sendNoteToMail"></i>
            <i class="fas fa-trash note-control-opt" title="Delete note" @click.stop="deleteNote(note)"></i>
            <color-picker v-if="showColorPicker" @changeColor="changeColor" :colors="colors" @hideColorPicker="hideColorPicker"></color-picker>
        </div>
        `,
    data() {
        return {
            colors: ['CornflowerBlue', 'yellow', 'orange', 'PaleGreen', 'LightGoldenRodYellow', 'tomato', 'LightGray', 'LightPink', 'white'],
            showColorPicker: false
        }
    },
    methods: {
        sendNoteToMail() {
            let noteToEmail = {
                id: makeId(),
                name: "Me",
                from: 'me@gmail.com',
                to: 'Me',
                subject: this.note.data.subject,
                body: this.note.data.body,
                isRead: false,
                sentAt: Math.floor(Date.now() / 1000)
            }
            // console.log('here you go Sarel',noteToEmail)
            eventBus.$emit(EVENT_NOTE_TO_EMAIL,noteToEmail)
        },
        editNote(note) {
            this.$emit('editNote', note)
            eventBus.$emit(EVENT_EDITNOTE, note)
        },
        duplicateNote(note){
            eventBus.$emit(EVENT_DUPLICATE_NOTE, note)
        },
        hideColorPicker() {
            this.showColorPicker = false;
        },
        deleteNote(note) {
            eventBus.$emit(EVENT_DELETE_NOTE, note)
        },
        pinNote(note) {
            eventBus.$emit(EVENT_TOGGLE_PIN_NOTE, note)
        },
        changeColor(color) {
            this.note.bgColor = color
            eventBus.$emit(EVENT_CHANGE_NOTE_COLOR, this.note)
        },
    },
    computed: {
        pinTitle() {
            return (this.note.isPinned) ? 'Unpin note' : 'Pin note'
        }
    },
    components: {
        colorPicker,
        eventBus
    },

}