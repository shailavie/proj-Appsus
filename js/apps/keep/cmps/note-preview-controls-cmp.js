import {eventBus, EVENT_EDITNOTE } from '../../../services/eventbus-service.js'

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
            this.$emit('hideColorPicker')
        },
        changeColor(color){
            this.$emit('changeColor',color)
        },
        getClass(color){
            return {'backgroundColor' : color}
        }
    },
}


//TO DO - Add duplicate functionality (eventBus to keep-app-cmp -> service)
// Use this icon <i class="fas fa-copy"></i>

export default {
    props:['note'],
    template:`
        <div class="note-controllers-container">
            <i class="fas fa-thumbtack" :title="pinTitle" @click.stop="pinNote(note)"></i>
            <i class="fas fa-edit" title="Edit Note" @click.stop="editNote(note)"></i>
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
        editNote(note){
            // console.log('editing note',note)
            this.$emit('editNote',note)
            eventBus.$emit(EVENT_EDITNOTE,note)
        },
        hideColorPicker(){
            this.showColorPicker = false;
        },
        deleteNote(note){
            this.$emit('deleteNote',note)
        },
        pinNote(note){
            this.$emit('pinNote',note)
        },
        changeColor(color){
            this.$emit('changeColor',color)
        },
    },
    computed:{
        pinTitle(){
            return (this.note.isPinned)? 'Unpin note' : 'Pin note'
        }
    },
    components:{
        colorPicker,
        eventBus
    },
 
}