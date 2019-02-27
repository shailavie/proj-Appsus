
// TO DO - MAKE THE LIST WORKS WITH DYNAMIC COMPONENTS

import notePreview from './note-preview-cmp.js';

export default {
    template: `
            <transition-group tag="div" class="note-list wrapper">
            <!-- <router-link  -->
            <div 
                :to="'/note/' + currNote.id" 
                v-for="(currNote, idx) in notes" 
                :key="currNote.id" 
                :note="currNote" 
                >
                <note-preview 
                            :note="currNote" 
                             :idx="idx+1" 
                             @click.native="selectNote(currNote)"
                             >
                </note-preview>
            </div>
                <!-- </router-link> -->

           

        </transition-group>
    `,
    props: ['notes'],
    methods: {
        selectNote(note){
            this.$emit('selected',note)
        }
    },
    components: {
        notePreview
    }
}


 