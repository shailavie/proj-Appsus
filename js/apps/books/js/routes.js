
// Miss books routes

import bookApp from './pages/book-app-cmp.js'
import bookDetails from './pages/book-details-cmp.js'
import about from './pages//about-cmp.js'



const routes = [
    { path: '/', component: bookApp },
    { path: '/book/:bookId', component: bookDetails },
    { path: '/about', component: about },
]

export default routes;