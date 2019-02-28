import noteService from '../services/note-service.js'
import noteList from '../cmps/note-list-cmp.js'
import noteFilter from '../cmps/note-filter-cmp.js'

export default {
    template: `
    <section class="notes-app"> 
        <note-filter class="note-filter" @filtered="setFilter"></note-filter>
        <note-list class="notes-to-show masonry" :notes="notesToShow" :search="searchTerm"></note-list>
    </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: {
                txt: '',
            },
            selectedNotes: [],
            searchTerm : ''
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
            // console.log('noteApp Got Filter: ', filterBy);
            this.filterBy.txt = filterBy.txt;
        },
        getNote(note) {
            this.selectedNote = note
            // console.log('selected note: ',this.selectedNote)
        },
    },
    computed: {
        notesToShow() {
            this.searchTerm = this.filterBy.txt.toLowerCase()
            return this.notes.filter(note => {
                return note.data.subject.toLowerCase().includes(this.searchTerm)
                    || note.data.body.toLowerCase().includes(this.searchTerm)
                    || note.labels.join('').toLowerCase().includes(this.searchTerm)
            })
            // console.log(res)
            // for (let i = 0; i < res.length; i++) {
            //     console.log(res[i].data.subject.replace(searchTerm, 'POTATO'))
            // }
            // res
             //[0].data.subject.replace(searchTerm,'bla')
        },
    },
    components: {
        noteService,
        noteList,
        noteFilter,
        // noteDetails,
    }
}