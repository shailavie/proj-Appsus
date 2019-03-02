export default {
    template: `
        <section class="note-filter">
            <div class="filters-container">
                
                <!-- filter note by txt -->              
                <input  class="input-filter-by-text"
                    type="text" 
                    placeholder="Search for note" 
                    @keyup="emitFilter" 
                    v-model="filterBy.txt" /> 
            </div>
        </section> 
    `,
    data() {
        return {
            filterBy: {
                txt: '',
            }
        }
    },
    methods: {
        emitFilter() {
            console.log('Emitting to Parent');
            this.$emit('filtered', { ...this.filterBy })
        },

    },
    computed: {
    }
}
 