
export default {
    props: ['note', 'idx'],
    template: `
            <div class="note-preview" >
                <div class="note-preview-snippet">
                    <h3>{{note.data.subject}}</h3>
                    <h3>{{note.data.body}}</h3>
                    <!-- <pre>{{note}}</pre> -->
                </div>
            </div>
    `,
    methods: {
        
    },
    computed: {
        
        
    }
}