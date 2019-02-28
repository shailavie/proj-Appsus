// import noteFilterCmp from "./note-filter-cmp";
import labels from './note-preview-labels-cmp.js'
import highlight from './note-preview-highligh-cmp.js'
import noteControls from './note-preview-controls-cmp.js'
import noteService from '../services/note-service.js';

 

export default {
    props: ['note', 'idx','search'],
    template: `
            <div class="note-preview" @mouseover="showControls = true" @mouseout="showControls = false">
                <div class="note-preview-snippet">
                    <h3>
                        <highlight 
                                :msg="note.data.subject" 
                                :search="search" 
                                effect="sexiness" >
                        </highlight>
                    </h3>
                    <!-- <h3>{{note.data.subject}} </h3> -->
                    <p>
                        <!-- <pre> -->
                        <highlight   
                                :msg="note.data.body" 
                                :search="search" 
                                effect="sexiness" >  
                        {{note.data.body}}
                        </highlight>
                        <!-- </pre> -->
                    </p>
                    <span class="labels-container"
                        v-for="(label, idx) in note.labels" 
                        :key="idx" 
                        :label="note.labels">
                    
                        <labels :search="search" :label="note.labels[idx]"></labels>
                    </span>
                </div>
                <!-- <div class="note-controls"> </div>-->
                <div class="note-controls-placeholder">
                    <note-controls :note="note" @pinnote="pinNote(note)" @deleteNote="deleteNote(note)" v-show="showControls" ></note-controls>
                </div>
            </div>
    `,
    data(){
        return {
            showControls: false,
        }
    },
    methods: {
        deleteNote(note){
            console.log('got request to delete', note)
            noteService.deleteNote(note)
        },
        pinNote(note){
            console.log('got request to pin', note)
            noteService.togglePinNote(note)
        }
    },
    computed: {
    },
    components:{
        labels,
        highlight,
        noteControls
    }
}