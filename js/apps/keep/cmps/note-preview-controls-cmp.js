export default {
    props:['note'],
    template:`
        <div class="note-controllers-container">
            <i class="fas fa-thumbtack" title="Pin note" @click.stop="pinNote(note)"></i>
            <i class="fas fa-palette" title="Change color"></i>
            <i class="fas fa-trash" title="Delete note" @click.stop="deleteNote(note)"></i>
        </div>
        `,
    methods: {
        deleteNote(note){
            console.log('deleting this note',note)
            this.$emit('deletenote',note)
        },
        pinNote(note){
            console.log('pin this note',note)
            this.$emit('pinnote',note)
        }
    }
}