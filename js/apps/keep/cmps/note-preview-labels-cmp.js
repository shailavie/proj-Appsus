import highlight from './note-preview-highligh-cmp.js'

export default {
    props: ['label','search'],
    template: `
            <span class="note-label-preview"  >
            <highlight   
                    :msg="label" 
                    :search="search" 
                    effect="sexiness2" >  
            </highlight>
            </span>
            `,
    methods: {    
    },
    components:{
        highlight
    }
}