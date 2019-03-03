import labels from '../note-preview-labels-cmp.js'
import highlight from '../note-preview-highligh-cmp.js'
import noteControls from '../note-preview-controls-cmp.js'

 //TO DO - TODOS

export default {
    props: ['note', 'idx','search'],
    template: `
            <div :style="getBgColor" class="note-preview" @mouseover="showControls = true" @mouseout="showControls = false">
                <div class="note-preview-snippet">
                    <h3>
                        <highlight 
                                :msg="note.data.subject" 
                                :search="search" 
                                effect="sexiness" >
                        </highlight>
                    </h3>
                    <p>
                        <!-- {{note.data.body}} -->
                        <p 
                            v-for="(currTodo, idx) in note.data.body"
                            :key="currTodo"
                            >
                            {{note.data.body[idx]}}
                            <!-- {{todoToShow(note.data.body[idx])}} -->
                        </p>
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
        },
        todoToShow(todoIdx){
            let todo = todoIdx
            console.log('gpt smth', todoIdx)
            return todo.toUpperCase()
        }
    },
    components:{
        labels,
        highlight,
        noteControls
    }
}