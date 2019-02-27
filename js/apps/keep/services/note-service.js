 
import util from '../../../services/util-service.js'

// var gNotes;


export default {
    getNotes
} 

function getNoteById(bookId) {
    var note = gNotes.find(function (note) {
        return bookId === note.id
    })
    return Promise.resolve(note)
}


function getNotes() {
    return Promise.resolve(gNotes)
}



const gNotes = [
    {
        id : util.makeId(), 
        type : 'txt',
        isPinned : false,
        dateCreated : new Date(),
        bgColor : 'white',
        labels : [],
        data : {
            subject : 'Keren',
            body : '052-8985898',
        }
    },
    {
        id : util.makeId(),
        type : 'txt',
        isPinned : false,
        dateCreated : new Date(),
        bgColor : 'white',
        labels : [],
        data : {
            subject : 'The Road Not Taken',
            body : `Two roads diverged in a yellow wood, 
            And sorry I could not travel both
            And be one traveler, long I stood
            And looked down one as far as I could
            To where it bent in the undergrowth
            `,
        }
    },
    {
        id : util.makeId(),
        type : 'txt',
        isPinned : false,
        dateCreated : new Date(),
        bgColor : 'white',
        labels : [],
        data : {
            subject : 'Cool App',
            body : 'https://shailavie.github.io/proj-Appsus/',
        }
    },
    {
        id : util.makeId(),
        type : 'txt',
        isPinned : false,
        dateCreated : new Date(),
        bgColor : 'white',
        labels : [],
        data : {
            subject : 'Nice course',
            body : 'https://www.coding-academy.org/landing2/',
        }
    },
 
    
]