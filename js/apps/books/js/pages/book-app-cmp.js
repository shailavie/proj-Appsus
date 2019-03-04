import bookService from '../services/book-service.js';
import bookList from '../cmps/book-list-cmp.js';
import bookFilter from '../cmps/book-filter-cmp.js';
import bookDetails from './book-details-cmp.js'
import { eventBus, EVENT_APP_CHANGE } from '../../../../services/eventbus-service.js';

{/* <book-filter @filtered="setFilter"></book-filter> */}
export default {
    template: `
        <section class="book-app">
            <main>
                <book-list :books="booksToShow" @selected="getBook"></book-list>
                <book-details v-if="selectedBook" :book="selectedBook"></book-details>
            </main>
          
        </section> 
    `,
    data() {
        return {
            books: [],
            filterBy: {
                title: '',
                price: [0,186],
                currency: 'USD',
            },
            selectedBook: null
        }
    },
    created() {
        window.document.title = 'Books App'
        eventBus.$emit(EVENT_APP_CHANGE,'Books')
        console.log('fetching books')
        bookService.getBooks()
            .then(books => this.books = books)
    },
    methods: {
        setFilter(filterBy) {
            console.log('bookApp Got Filter: ', filterBy);
            this.filterBy.title = filterBy.title;
            this.filterBy.price = filterBy.price;
            this.filterBy.currency = filterBy.currency;
        },
        getBook(book) {
            this.selectedBook = book
            console.log('selected book: ',this.selectedBook)
        },
    },
    computed: {
        booksToShow() {
            return this.books.filter(book => {
                return book.listPrice.amount >= this.filterBy.price[0] 
                    && book.listPrice.amount <= this.filterBy.price[1] 
                    && book.title.includes(this.filterBy.title)
                    && book.listPrice.currencyCode === this.filterBy.currency
            })
        },
         
    },
    components: {
        bookList,
        bookFilter,
        bookDetails
    }
}