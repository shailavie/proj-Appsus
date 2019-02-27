import noteService from '../services/note-service.js'
import noteList from '../cmps/note-list-cmp.js'

export default {
    template:`
    <section class="notes-app flex center-all"> 
        <!-- maybe this componenet wants to be grid -->
        <!-- <h1> I am the Keep app</h1> -->
        <note-list :notes="notes"></note-list>
        <!-- <pre>{{notes}}</pre> -->
    </section>
    `,
    data() {
        return {
            // pageTitle = 'Keep it',
            notes: [],
            filterBy: {
                subject: '',
            },
            selectedNotes: []
        }
    },
    created() {
        console.log('fetching books')
        document.title = 'Keep it'
        noteService.getNotes()
            .then(notes => this.notes = notes)
    },
    methods: {
    },
    computed: {

    },
    components: {
        noteService,
        noteList
    }
}