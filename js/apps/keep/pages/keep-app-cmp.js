import noteService from '../services/note-service.js'
import noteList from '../cmps/note-list-cmp.js'
import noteFilter from '../cmps/note-filter-cmp.js'
import addNote from '../cmps/note-add-cmp.js'
import { eventBus, EVENT_EDITNOTE, EVENT_CHANGE_NOTE_COLOR, EVENT_TOGGLE_PIN_NOTE, EVENT_DELETE_NOTE } from '../../../services/eventbus-service.js';

export default {
    template: `
    <section class="notes-app"> 
    <button @click.stop="clear">clear</button>
        <note-filter class="note-filter" @filtered="setFilter"></note-filter>

        <div class="add-note-container flex center-all">
            <input  @click="toggleAddNote" placeholder="Take a note" v-if="!showAddNote" class="take-a-note" > 
            <add-note 
                :note="noteToEdit"
                v-show="showAddNote"
                @hideAddNote="hideAddNote"
                @newnote="addNote">
            </add-note>
        </div>
        <div v-if="pinnedNotesCount.length > 0">
            <h4>PINNED</h4>
            <note-list class="notes-to-show" :notes="pinnedNotesToShow" :search="searchTerm"></note-list>
        </div>
        <div v-if="unPinnedNotesCount.length > 0">
            <h4>OTHERS</h4>
            <note-list class="notes-to-show" :notes="notesToShow" :search="searchTerm"></note-list>
        </div>
    </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: {
                txt: '',
            },
            selectedNotes: [],
            noteToEdit: null,
            isEditNote: null,
            searchTerm: '',
            showAddNote: false,
            showEditNote: false,
            showImgPrev: false,
            imgUrl: null,
        }
    },
    created() {
        this.noteToEdit = this.getEmptyNote()
        document.title = 'Keep it'
        noteService.initNotes()
            .then(gNotes => this.notes = gNotes)
        eventBus.$on(EVENT_EDITNOTE, note => {
            this.noteToEdit = note
            this.isEditNote = true
            this.editNote(note)
        })
        eventBus.$on(EVENT_DELETE_NOTE, note => {
            noteService.deleteNote(note)
        })
        eventBus.$on(EVENT_TOGGLE_PIN_NOTE, note => {
            noteService.togglePinNote(note)
        })
        eventBus.$on(EVENT_CHANGE_NOTE_COLOR, note => {
            noteService.changeNoteColor(note)
        })
    },
    watch: {
        noteToEdit: function () {
            console.log('noteToEdit has changed: ', this.noteToEdit)
        }
    },
    methods: {
        clear() {
            localStorage.clear()
            console.log('local stoarge cleared')
        },
        getEmptyNote() {
            let emptyNote = {
                id: '',
                type: '',
                isPinned: null,
                dateCreated: null,
                bgColor: '',
                labels: [],
                data: {
                    subject: 'Title',
                    body: 'Take a note',
                    src: '',
                }
            }
            return emptyNote
        },
        editNote() {
            this.toggleAddNote()
        },
        hideAddNote() {
            this.showAddNote = false;
        },

        setFilter(filterBy) {
            this.filterBy.txt = filterBy.txt;
        },
        getNote(note) {
            this.selectedNote = note
        },
        toggleAddNote() {
            this.showAddNote = !this.showAddNote;
        },

        addNote(note) {
            if (this.isEditNote === null) {
                noteService.addNewNote(note)
            } else {
                console.log('should trigger an edit item service function')
                noteService.editNote(note)
                this.isEditNote = null;
            }
        },
        saveNote(note) {
            console.log('saveNote!')
        }
    },
    computed: {
        notesToShow() {
            this.searchTerm = this.filterBy.txt.toLowerCase()
            return this.notes.filter(note => {
                return (
                    note.data.subject.toLowerCase().includes(this.searchTerm)
                    || note.data.body.toLowerCase().includes(this.searchTerm)
                    || note.labels.join('').toLowerCase().includes(this.searchTerm)
                ) && !note.isPinned
            })
        },
        pinnedNotesToShow() {
            this.searchTerm = this.filterBy.txt.toLowerCase()
            return this.notes.filter(note => {
                return (
                    note.data.subject.toLowerCase().includes(this.searchTerm)
                    || note.data.body.toLowerCase().includes(this.searchTerm)
                    || note.labels.join('').toLowerCase().includes(this.searchTerm)
                ) && note.isPinned
            })
        },
        pinnedNotesCount() {
            return this.notes.filter(note => note.isPinned)
        },
        unPinnedNotesCount() {
            return this.notes.filter(note => !note.isPinned)
        }
    },
    components: {
        noteService,
        noteList,
        noteFilter,
        addNote,
        eventBus
    }
}