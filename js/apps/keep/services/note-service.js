 
import util from '../../../services/util-service.js'

// var gNotes;


export default {
    getNotes,
    addNewNote,
    deleteNote,
    togglePinNote
} 

function getNoteById(noteId) {
    var note = gNotes.find(function (note) {
        return noteId === note.id
    })
    return Promise.resolve(note)
}

function _getNoteIdxByNote(note) {
    let idx = gNotes.findIndex(function (item) {
        return note.id === item.id
    })
    return Promise.resolve(idx)
}

function addNewNote(newNote){
    gNotes.unshift(newNote)
    return Promise.resolve(gNotes)
}

function deleteNote(note){
    let noteIdx = _getNoteIdxByNote(note)
    gNotes.splice(noteIdx,1)
    return Promise.resolve(gNotes)
}

function getNotes() {
    return Promise.resolve(gNotes)
}

function togglePinNote(note){
    note.isPinned = !note.isPinned;
    return Promise.resolve(gNotes)
}


const gNotes = [
    {
        id : util.makeId(), 
        type : 'txt',
        isPinned : false,
        dateCreated : new Date(),
        bgColor : 'white',
        labels : ['cool', 'pretty', 'smart'],
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
        labels : ['serendipity'],
        data : {
            subject : 'The Road Not Taken',
            body : `Two roads diverged in a yellow wood, 
            And sorry I could not travel both
            And be one traveler, long I stood
            And looked down one as far as I could
            To where it bent in the undergrowth

            Two roads diverged in a yellow wood, 
            And sorry I could not travel both
            And be one traveler, long I stood
            And looked down one as far as I could
            To where it bent in the undergrowth

            Two roads diverged in a yellow wood, 
            And sorry I could not travel both
            And be one traveler, long I stood
            And looked down one as far as I could
            To where it bent in the undergrowth

            Two roads diverged in a yellow wood, 
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
        labels : ['NaN'],
        data : {
            subject : 'My favorite number',
            body : '',
        }
    },
    {
        id : util.makeId(),
        type : 'txt',
        isPinned : false,
        dateCreated : new Date(),
        bgColor : 'white',
        labels : ['so cool', 'wow', 'number1'],
        data : {
            subject : 'Cool App',
            body : 'https://shailavie.github.io/proj-Appsus ght',
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
            subject : 'Don\'t forget!',
            body : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id modi facere adipisci incidunt impedit voluptatibus nostrum, velit ad!',
        }
    },
    {
        id : util.makeId(),
        type : 'txt',
        isPinned : false,
        dateCreated : new Date(),
        bgColor : 'white',
        labels : ['react?', 'What?', 'WOW'],
        data : {
            subject : 'Check this out',
            body : 'https://vuejs.org/',
        }
    },
    {
        id : util.makeId(),
        type : 'txt',
        isPinned : false,
        dateCreated : new Date(),
        bgColor : 'white',
        labels : ['cool', 'enjoyable', 'happy'],
        data : {
            subject : '',
            body : `Sed maxime harum repellat aperiam animi, 
            vitae aliquid reprehenderit aliquam qui autem.
            Two roads diverged in a yellow wood, 
            And sorry I could not travel both
            And be one traveler, long I stood
            And looked down one as far as I could
            To where it bent in the undergrowth

            Two roads diverged in a yellow wood, 
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
        labels : ['css', 'Asi', 'Sawsan4Life','התחלנו'],
        data : {
            subject : 'Nice course',
            body : 'https://www.coding-academy.org/landing2/',
        }
    },
 
    
]