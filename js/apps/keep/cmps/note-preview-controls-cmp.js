 

const colorPicker = {
    props:['colors'],
    template:`
    <div class="color-picker" @mouseleave="hideColorPicker" >
        <div v-for="(color) in colors" :key="color">
            <div class="color-circle" :style="getClass(color)" @click.stop="changeColor(color)" ></div>
        </div>
    </div>
    `,
    methods:{
        hideColorPicker(){
            console.log('yalla sogrim')
            this.$emit('hideColorPicker')
        },
        changeColor(color){
            console.log('lets change color!',color)
            this.$emit('changeColor',color)
        },
        getClass(color){
            return {'backgroundColor' : color}
        }
    },
}

export default {
    props:['note'],
    template:`
        <div class="note-controllers-container">
            <i class="fas fa-thumbtack" :title="pinTitle" @click.stop="pinNote(note)"></i>
            <i class="fas fa-palette" title="Change color" @mouseover="showColorPicker=!showColorPicker" ></i>
            <i class="fas fa-trash" title="Delete note" @click.stop="deleteNote(note)"></i>
            <color-picker v-if="showColorPicker" @changeColor="changeColor" :colors="colors" @hideColorPicker="hideColorPicker"></color-picker>
        </div>
        `,
    data(){
        return {
            colors:['CornflowerBlue','yellow','orange','PaleGreen','LightGoldenRodYellow','tomato','LightGray','LightPink','white'],
            showColorPicker:false
        }
    },
    methods: {
        hideColorPicker(){
            console.log('copy that')
            this.showColorPicker = false;
        },
        deleteNote(note){
            console.log('preview request:  delete this note',note)
            this.$emit('deleteNote',note)
        },
        pinNote(note){
            console.log('pin this note',note)
            this.$emit('pinNote',note)
        },
        changeColor(color){
            console.log('lets2 change color!',color)
            this.$emit('changeColor',color)
        },
    },
    computed:{
        pinTitle(){
            return (this.note.isPinned)? 'Unpin note' : 'Pin note'
        }
    },
    components:{
        colorPicker
    },
    // destroyed(){
    //     this.showColorPicker = false;
    // }
}