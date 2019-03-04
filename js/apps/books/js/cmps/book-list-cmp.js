
import bookPreview from './book-preview-cmp.js';


export default {
    template: `
        <transition-group tag='div' class='book-list'>
            <router-link 
                :to="'/book/' + currBook.id" 
                v-for="(currBook, idx) in books" 
                :key="currBook.id" 
                :book="currBook" 
                >
                <book-preview 
                            :book="currBook" 
                             :idx="idx+1" 
                             @click.native="selectBook(currBook)"
                             >
                </book-preview>
                </router-link>

            <router-view></router-view>

        </transition-group>
    `,
    props: ['books'],
    methods: {
        selectBook(book){
            this.$emit('selected',book)
        }
    },
    components: {
        bookPreview
    }
}


 