export default {
    template: `
        <section class="book-filter">
            <div class="filters-container">
                
                <!-- filter by title -->              
                <input  class="input-filter-by-text"
                    type="text" 
                    placeholder="Filter By Title" 
                    @keyup="emitFilter" 
                    v-model="filterBy.title" /> 

                <!-- filter by currency -->
                <select class="input-filter-by-currency"
                    v-model="filterBy.currency" @change="emitFilter">
                    <option value="USD" selected>USD</option>
                    <option value="EUR">EUR</option>
                    <option value="ILS">ILS</option>
                </select>

                <!-- filter by priee range -->
                <div class="my-slider-container">
                    <div class="my-slider-labels">
                        <label for="amount">Price range:</label>
                        <input class="my-slider-range" @keyup.enter="emitFilter"  type="text" id="amount" readonly >
                    </div>
                    <div @mousedown="emitFilter"  class="my-slider" id="slider-range"></div>
                </div>
            </div>
        </section> 
    `,
    data() {
        return {
            filterBy: {
                title: '',
                price: null,
                currency: 'USD'
            }
        }
    },
    mounted() {
        $( function() {
            $( "#slider-range" ).slider({
              range: true,
              min: 0,
              max: 186,
              values: [ 0, 186 ],
              slide: function( event, ui ) {
                $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                // $( "#amount" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
              }
            });
            $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
            " - $" + $( "#slider-range" ).slider( "values", 1 ) );
            // console.log($( "#amount" ).val())
            // console.log($( "#amount" ))
            // console.log($( "#amount" ).val().replace(' - ',' ').split(' ').map(val => Number(val)))
            // console.log('potato')
        } )
    },
    methods: {
        emitFilter() {
            console.log('Emitting to Parent');
            this.filterBy.price = [];
            let elAmount = $("#amount").val()
            console.log('shubisifsdfsdfsdfs', elAmount) //.replace(' - ', ' ').split(' ').map(val => Number(val))
            let priceRange = elAmount.slice()
            console.log('NEW PRICE RANGE before:', priceRange)
            priceRange = priceRange.replace(/\$/ig,'').replace(' - ',' ').split(' ').map(val => Number(val))
            console.log('NEW PRICE RANGE:', priceRange)
            let minPrice = priceRange[0]
            let maxPrice = priceRange[1]
            this.filterBy.price = [];
            this.filterBy.price.push(minPrice, maxPrice)
            // console.log('really?!', this.filterBy.price)
            this.$emit('filtered', { ...this.filterBy })

        },

    },
    computed: {
    }
}

// @keyup.enter="emitFilter" 