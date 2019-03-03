export default {
    template: `
        <section class="note-filter">
            <div class="filters-container">
                
                <!-- filter email by txt -->              
                <input class="input-filter-by-text"
                    type="text" 
                    placeholder="Search for email" 
                    @keyup="emitFilter" 
                    v-model="filterBy.txt" /> 
                    <select v-model="filterBy.selectedFilter" name="" id="" @change="emitFilter">
                    <option value="All" selected="selected">All</option>
                    <option value="Read">Read</option>
                     <option value="Unread">Unread</option>
                     </select>

                     <select id="sort" v-model="filterBy.sortBy" @change="emitFilter">
                        <option value="Sort By" disabled selected>Sort By</option>
                        <option value="date" >Date</option>
                        <option value="subject">Subject</option>
                    </select>
            </div>
        </section> 
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                selectedFilter: 'All',
                sortBy: 'Sort By'
            },
        }
    },
    methods: {
        emitFilter() {
            console.log('Emitting to Parent');
            this.$emit('filtered', { ...this.filterBy })
        }

    },
    computed: {
    }
}
 