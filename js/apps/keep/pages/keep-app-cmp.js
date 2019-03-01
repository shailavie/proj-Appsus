import noteService from '../services/note-service.js'
import noteList from '../cmps/note-list-cmp.js'
import noteFilter from '../cmps/note-filter-cmp.js'
import addNote from '../cmps/note-add-cmp.js'

// line 14
export default {
    template: `
    <section class="notes-app"> 
        <note-filter class="note-filter" @filtered="setFilter"></note-filter>

        <div class="add-note-container flex center-all">
            <input @click="toggleAddNote" placeholder="Take a note" v-if="!showAddNote" class="take-a-note" > 
            <add-note 
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
            searchTerm : '',
            showAddNote: false,
        }
    },
    created() {
        console.log('fetching notes')
        document.title = 'Keep it'
        noteService.getNotes()
            .then(notes => this.notes = notes)
    },
    methods: {
        hideAddNote(){
           this.showAddNote = false; 
        },
        setFilter(filterBy) {
            // console.log('noteApp Got Filter: ', filterBy);
            this.filterBy.txt = filterBy.txt;
        },
        getNote(note) {
            this.selectedNote = note
            // console.log('selected note: ',this.selectedNote)
        },
        toggleAddNote(){
            this.showAddNote = !this.showAddNote;         
        },
        addNote(newNote){
            console.log('kawabanga!',newNote)
            noteService.addNewNote(newNote)
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
                ) &&   !note.isPinned
            })
        },
        pinnedNotesToShow() {
            this.searchTerm = this.filterBy.txt.toLowerCase()
            return this.notes.filter(note => {
                return (
                       note.data.subject.toLowerCase().includes(this.searchTerm)
                    || note.data.body.toLowerCase().includes(this.searchTerm)
                    || note.labels.join('').toLowerCase().includes(this.searchTerm)
                ) &&   note.isPinned
            })
        },
        pinnedNotesCount(){
            return this.notes.filter(note => note.isPinned)
        },
        unPinnedNotesCount(){
            return this.notes.filter(note => !note.isPinned)
        }
    },
    components: {
        noteService,
        noteList,
        noteFilter,
        addNote
    }
}