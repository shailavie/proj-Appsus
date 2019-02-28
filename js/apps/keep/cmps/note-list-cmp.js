
// TO DO - MAKE THE LIST WORKS WITH DYNAMIC COMPONENTS

import notePreview from './note-preview-cmp.js';

export default {
    props: ['notes','search'],
    template: `
           <masonry 
           :cols="{default: 5, 1500 :4, 1000: 3, 700: 2, 500: 1}" 
           :gutter="{default: '20px', 700: '20px'}"
           >
           <transition-group tag="div"  name="fade"
                    v-for="(currNote, idx) in notes" 
                    :key="idx"
                    :note="currNote"
                    >
                    
                    <note-preview 
                        class="masonry-brick" 
                        :note="currNote" 
                        :search="search"
                        :idx="idx+1" 
                        :key="currNote.id" 
                        @click.native="selectNote(currNote)">
                    </note-preview>
            </transition-group>
            </masonry>
    `,
    methods: {
        selectNote(note) {
            console.log(note,'is selected!')
            this.$emit('selected', note)
        }
    },
    created() {
        console.log('got :',this.search)
    },
    components: {
        notePreview
    }
}



// TO DO - MAKE THE LIST WORKS WITH DYNAMIC COMPONENTS

// import notePreview from './note-preview-cmp.js';

// export default {
//     template: `
//            <masonry 
//            :cols="{default: 4, 1000: 3, 700: 2, 500: 1}" 
//            :gutter="{default: '20px', 700: '20px'}"
//            >
//            <transition-group tag='div' class='note-list'>
//                 <div 
//                     :to="'/note/' + currNote.id" 
//                     v-for="(currNote, idx) in notes" 
//                     :key="currNote.id" 
//                     :note="currNote">
                    
//                     <note-preview 
//                         class="masonry-brick" 
//                         :note="currNote" 
//                         :search="search"
//                         :idx="idx+1" 
//                         @click.native="selectNote(currNote)">
//                     </note-preview>
//                 </div>
//             </transition-group>
//             </masonry>
//     `,
//     props: ['notes','search'],
//     methods: {
//         selectNote(note) {
//             console.log(note,'is selected!')
//             this.$emit('selected', note)
//         }
//     },
//     created() {
//         console.log('got :',this.search)
//     },
//     components: {
//         notePreview
//     }
// }