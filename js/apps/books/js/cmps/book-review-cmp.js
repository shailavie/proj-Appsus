import stars from './reviews/stars-cmp.js'
import { eventBus } from './reviews/event-bus.js'


export default {
    template: `
        <section class="book-reviews-container">
            <div class="book-review" v-for="(review, idx) in book.reviews" :key="review.id">
                    <h2 class="subject">{{review.subject}}</h2>         
                    <h2 class="readAt">{{review.readAt}}</h2>
                    <stars class="rate" :rate="review.rate"></stars>         
                    <h2 class="name">By {{review.name}}</h2>         
                    <h2 class="txt">{{review.txt}}</h2>         
        </div>        
          <!-- <pre>{{reviews}}</pre> -->
        </section> 
    `,
    data(){
        return {
            // bookReviews : JSON.parse(JSON.stringify(this.book.reviews)),
            isReviews : false,
            // reviews : this.book.reviews,
        }
    },
    props: ['book'],
    created() {
        if (this.book) {
            console.log('got reviews!',this.book);
            this.isReviews = true;
        }
        else {
            console.log('no reviews to show');
            this.isReviews = false;
        }
        // console.log(this.reviews)
    },
    watch: {
        'book.reviews': function(newVal, oldVal) {
            console.log('value changed from ' + oldVal + ' to ' + newVal);
        }
    },
    methods: {
    },
    components: {
        stars,
        eventBus
    },
    computed: {
       
    }
}

 