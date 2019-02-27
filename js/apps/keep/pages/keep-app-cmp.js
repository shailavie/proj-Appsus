import noteService from '../services/note-service.js'
import noteList from '../cmps/note-list-cmp.js'
import noteFilter from '../cmps/note-filter-cmp.js'

export default {
    template:`
    <section class="notes-app flex center-all"> 
        <!-- maybe this componenet wants to be grid -->
        <note-filter class="note-filter" @filtered="setFilter"></note-filter>
        <note-list :notes="notesToShow"></note-list>
    </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: {
                subject: '',
            },
            selectedNotes: []
        }
    },
    created() {
        console.log('fetching notes')
        document.title = 'Keep it'
        noteService.getNotes()
            .then(notes => this.notes = notes)
    },
    methods: {
        setFilter(filterBy) {
            console.log('noteApp Got Filter: ', filterBy);
            this.filterBy.subject = filterBy.subject;
            // this.filterBy.price = filterBy.price;co
            // this.filterBy.currency = filterBy.currency;
        },
        getNote(note) {
            this.selectedNote = note
            console.log('selected note: ',this.selectedNote)
        },
    },
    computed: {
        notesToShow() {
            return this.notes.filter(note => {
                return note.data.subject.toLowerCase().includes(this.filterBy.subject.toLowerCase())
                    // && note.listPrice.amount >= this.filterBy.price[0] 
                    // && note.listPrice.amount <= this.filterBy.price[1] 
                    // && note.listPrice.currencyCode === this.filterBy.currency
            })
        },
    },
    components: {
        noteService,
        noteList,
        noteFilter,
        // noteDetails,
    }
}