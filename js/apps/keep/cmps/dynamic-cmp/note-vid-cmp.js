import labels from '../note-preview-labels-cmp.js'
import highlight from '../note-preview-highligh-cmp.js'
import noteControls from '../note-preview-controls-cmp.js'

 
export default {
    props: ['note', 'idx','search'],
    template: `
            <div :style="getBgColor" class="note-preview" @mouseover="showControls = true" @mouseout="showControls = false">
                <video width="320" height="240" :src="note.data.src" class="note-vid" controls>
                    <source src="movie.mp4" type="video/mp4">
                </video>
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