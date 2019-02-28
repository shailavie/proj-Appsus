// import noteFilterCmp from "./note-filter-cmp";
import labels from './note-preview-labels-cmp.js'
import highlight from './note-preview-highligh-cmp.js'

export default {
    props: ['note', 'idx','search'],
    template: `
            <div class="note-preview" >
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
                        <highlight   
                                :msg="note.data.body" 
                                :search="search" 
                                effect="sexiness" >  
                        {{note.data.body}}
                        </highlight>
                    </p>
                    <span 
                        v-for="(label, idx) in note.labels" 
                        :key="idx" 
                        :label="note.labels">
                    
                        <labels :search="search" :label="note.labels[idx]"></labels>
                    </span>
                </div>
            </div>
    `,
    methods: {
        
    },
    computed: {
    },
    components:{
        labels,
        highlight
    }
}