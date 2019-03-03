import noteTxt from './dynamic-cmp/note-txt-cmp.js'
import noteImg from './dynamic-cmp/note-img-cmp.js'
import noteVid from './dynamic-cmp/note-vid-cmp.js'
import noteAud from './dynamic-cmp/note-aud-cmp.js'
import noteTodos from './dynamic-cmp/note-todos-cmp.js'

export default {
    props: ['notes', 'search'],
    template: `
           <masonry 
           :cols="{default: 5, 1500 :4, 1000: 3, 700: 2, 500: 1}" 
           :gutter="{default: '20px', 700: '20px'}"
           >
                    <component 
                        v-for="(currNote, idx) in notes" 
                        class="masonry-brick" 
                        :is="currNote.type" 
                        :note="currNote"
                        :key="currNote.id"
                        :search="search"
                        :idx="idx+1" 
                        @click.native="selectNote(currNote)">
                    </component>

            </masonry>
    `,
    methods: {
        selectNote(note) {
            console.log(note, 'is selected!')
            this.$emit('selected', note)
        }
    },
    created() {
    },
    components: {
        noteTxt,
        noteImg,
        noteVid,
        noteAud,
        noteTodos
    }
}

/* <transition-group tag="div"  name="fade"
v-for="(currNote, idx) in notes"
:key="idx"
:note="currNote"
>

</transition-group> */
