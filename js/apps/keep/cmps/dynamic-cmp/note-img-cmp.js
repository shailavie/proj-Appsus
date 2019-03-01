// import noteFilterCmp from "./note-filter-cmp";
import labels from '../note-preview-labels-cmp.js'
import highlight from '../note-preview-highligh-cmp.js'
import noteControls from '../note-preview-controls-cmp.js'
import noteService from '../../services/note-service.js'; // TO DO - eventbus so that only the page will talk to service

 
export default {
    props: ['note', 'idx','search'],
    template: `
            <div :style="getBgColor" class="note-preview" @mouseover="showControls = true" @mouseout="showControls = false">
                <img :src="note.data.src" class="note-img"/>
                <div class="note-preview-snippet">
                    <h3>
                        <highlight 
                                :msg="note.data.subject" 
                                :search="search" 
                                effect="sexiness" >
                        </highlight>
                    </h3>
                    <p>
                        <highlight   
                                :msg="note.data.body" 
                                :search="search" 
                                effect="sexiness" >  
                        {{note.data.body}}
                        </highlight>
                    </p>
                    <span class="labels-container"
                        v-for="(label, idx) in note.labels" 
                        :key="idx" 
                        :label="note.labels">
                    
                        <labels :search="search" :label="note.labels[idx]"></labels>
                    </span>
                </div>
                <div class="note-controls-placeholder">
                    <note-controls 
                        :note="note" 
                        v-show="showControls" 
                        @pinNote="pinNote(note)" 
                        @changeColor="changeColor" 
                        @deleteNote="deleteNote(note)" 
                        ></note-controls>
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
        },
        changeColor(color){
            console.log('lets2 change color!',color)
            this.$emit('changeColor',color)
            // noteService.changeColor(note,color)
            this.note.bgColor = color
        },
        
    },
    computed: {
        getBgColor(){
            return {'backgroundColor' : this.note.bgColor}
        }
    },
    components:{
        labels,
        highlight,
        noteControls
    }
}