import longText from '../cmps/book-long-text-cmp.js'
import { getCurrencySymbol } from '../services/util-service.js'
import bookService from '../services/book-service.js'
import bookReview from '../cmps/book-review-cmp.js'
import addReview from '../cmps/reviews/review-add-cmp.js'

export default {
    template: `
        <section v-if="book"  class="book-details-page flex column middle">
        <div class="book-details" >
            <button @click="$router.go(-1)" class="back-btn">Back</button>
            <div class="book-details-container">
                <img class="book-preview-thumbnail-details" v-bind:src="imgUrl" />
                <div class="book-details-preview">
                        <div class="on-sale" v-if="isOnSale">
                            <h1 >50% OFF!</h1>
                        </div>
                    <h2>{{book.title}}</h2>
                    <h3>{{book.subtitle}}</h3>
                    <h4> By {{authorsToShow}}</h4>
                    <h4>Published at {{book.publishedDate}} </h4>
                    <h4>{{categoriesToShow}} {{readLenToShow}} {{bookDescToShow}} </h4>
                    <h4 v-if="isOnSale" class="book-details-price"> {{priceOnSaleToShow}} <span class="price-on-sale">  {{priceToShow}}</span> </h4>
                    <h4 v-else class="book-details-price">{{priceToShow}}</h4> 
                    <long-text :txt="book.description"></long-text>
                </div>
            </div>
        </div>
        <book-review class="book-reviews-cmp" :book="bookToReview" ></book-review>
        <button @click="toggleAddReview" v-if="!showAddReview" class="btn-new-review">Add a New Review</button>
        <add-review v-if="showAddReview" :booktitle="book.title" @newreview="addReview"></add-review>
        </section> 
    `,
    data(){
        return {
            book :  null,
            showAddReview : false,
        }
    },
    created() {
        console.log('Param from route:', this.$route.params);
        const bookId = this.$route.params.bookId;
        bookService.getBookById(bookId)
            .then(book => {
                this.book = book
                console.log('here is the book:',this.book)   
            }
                )
            
        // if (this.book.reviews) this.areReviews = true 
    },
    methods: {
        toggleAddReview(){
            this.showAddReview = !this.showAddReview;         
        },
        addReview(ev){
            console.log('kawabanga!',ev)
            console.log(this.book.id)
            console.log('here are the reviewssssssssssss:',this.book.reviews)
            if (!this.book.hasOwnProperty('reviews')) {
                console.log('no reviews, trying to add empty array')

                // option 1
                // this.book.reviews = []

                // option 2
                // let puki = { 'reviews' : []}
                // console.log(puki)
                // this.book = Object.assign(this.book,puki)
                // console.log(this.book.reviews)
                
                //option 3
                this.$set(this.book,'reviews',[])
                console.log(this.book.reviews)
            }
            bookService.addBookReview(this.book.id,ev)
            this.areReviews = true
        }
    },
    components: {
        longText,
        bookReview,
        addReview,
    },
    computed: {
        imgUrl() {
            return this.book.thumbnail
        },
        authorsToShow() {
            if (this.book.authors.length > 1) {
                return this.book.authors.toString().replace(/\,/ig, ' and ')
            } else return this.book.authors.toString()
        },
        readLenToShow() {
            let bookLength = this.book.pageCount;
            if (bookLength < 100) return '| Light Reading'
            if (bookLength >= 100 && bookLength < 500) return '| Decent Reading'
            if (bookLength >= 500) return '| Long Reading'
        },
        bookDescToShow() {
            let bookAge = new Date().getFullYear() - this.book.publishedDate;
            console.log(bookAge)
            if (bookAge < 2) return '| New Book '
            if (bookAge > 10) return '| Veteran Book'
        },
        categoriesToShow() {
            return this.book.categories.toString().replace(/\,/ig, ' and ')
        },
        priceToShow(){
            let currencySymbol = getCurrencySymbol(this.book.listPrice.currencyCode)
            return `${currencySymbol}${this.book.listPrice.amount}`
        },
        priceOnSaleToShow(){
            let currencySymbol = getCurrencySymbol(this.book.listPrice.currencyCode)
            return `${currencySymbol}${this.book.listPrice.amount*0.5}`
        },
        isOnSale() {
            let res = this.book.listPrice.isOnSale
            if (!res) return false
            else return res 
        },
        isLongDesc() {
            return (this.book.description.length > 100)
        },
        bookToReview(){
            return this.book;
        }
         
    }
}