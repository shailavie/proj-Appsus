
// TO DO - MAKE THE LIST WORKS WITH DYNAMIC COMPONENTS

import notePreview from './note-preview-cmp.js';

export default {
    template: `
           <masonry 
           :cols="{default: 4, 1000: 3, 700: 2, 400: 1}" 
           :gutter="{default: '30px', 700: '15px'}"
           >
                <div 
                    :to="'/note/' + currNote.id" 
                    v-for="(currNote, idx) in notes" 
                    :key="currNote.id" 
                    :note="currNote">
                    
                    <note-preview 
                        class="masonry-brick" 
                        :note="currNote" 
                        :search="search"
                        :idx="idx+1" 
                        @click.native="selectNote(currNote)">
                    </note-preview>
                </div>
            </masonry>
    `,
    props: ['notes','search'],
    methods: {
        selectNote(note) {
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