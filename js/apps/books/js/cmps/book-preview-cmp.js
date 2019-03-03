 
// import {getCurrencySymbol} from '../services/util-service.js'
// import { getBookPrice } from '../services/book-service.js'
// import bookService from '../services/book-service.js';
import { getCurrencySymbol } from '../services/util-service.js'

export default {
    props: ['book', 'idx'],
    template: `
            <div class="book-preview" >
                <img class="book-preview-thumbnail" :src="imgUrl" />
                <div class="book-preview-snippet">
                    <h3>{{book.title}}</h3>
                    <h4>{{priceToShow}}</h4>
                </div>
            </div>
    `,
    methods: {
        
    },
    computed: {
        imgUrl() {
            return this.book.thumbnail
        },
        priceToShow(){
            let currencySymbol = getCurrencySymbol(this.book.listPrice.currencyCode)
            return `${currencySymbol}${this.book.listPrice.amount}`
        }
    }
}