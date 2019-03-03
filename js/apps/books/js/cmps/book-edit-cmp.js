// export default {
//     template: `
//         <section class="book-edit" @click="">
//             <h1>Book Edit</h1>
//             <form @submit.prevent="saveBook">
//                 <p style="white-space: pre">{{ book.desc }}</p>
//                 <textarea v-model.trim="book.desc" placeholder="add multiple lines"></textarea>

//                 <input type="text" @keyup.esc="book.desc='FAST FAST'" v-model.number="book.speed" placeholder="speed" />


//                 <input type="checkbox" value="Jack" v-model="book.drivers" />  Jack
//                 <input type="checkbox" value="John" v-model="book.drivers" /> John

//                 <input type="radio" value="One" v-model="book.picked"> One
//                 <input type="radio" value="Two" v-model="book.picked"> Two

//                 <select v-model="book.type">
//                     <option>A</option>
//                     <option>B</option>
//                     <option>C</option>
//                 </select>
//                 <button type="submit" :disabled="!isValid">Save</button>
//                 <pre>{{book}}</pre>
//             </form>

//         </section>
//     `,

//     data() {
//         return {
//             book: {
//                 desc: 'This book is great',
//                 drivers: [],
//                 picked: '',
//                 type: 'A'
                
//             }
//         }
//     },
//     methods: {
//         saveBook() {
//             console.log('SAVING BOOK', this.book);
//         }
//     },
//     computed: {
//         isValid() {
//             return this.book.drivers.length > 0
//         }
//     }
// }