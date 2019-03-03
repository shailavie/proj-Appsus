
// import {dummyNotes} from './note-storage.js'
import { makeId } from '../../../services/util-service.js'

export default {
    initNotes,
    getNotes,
    addNewNote,
    deleteNote,
    togglePinNote,
    editNote,
    changeNoteColor,
    duplicateNote
}

var gNotes;
const NOTES_KEY = 'notes'
var dummyNotes = [
    {
        id: makeId(),
        type: 'noteTxt',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['cool', 'pretty', 'smart'],
        data: {
            subject: 'Keren',
            body: '052-8985898',
        }
    },
    // {
    //     id: makeId(),
    //     type: 'noteTodos',
    //     isPinned: false,
    //     dateCreated: new Date(),
    //     bgColor: 'white',
    //     labels: ['must get sleep'],
    //     data: {
    //         subject: 'Don\'t forget',
    //         body : ['Sleep','Learn Vue','Call mom']
    //     }
    // },
    {
        id: makeId(),
        type: 'noteImg',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['not sure', 'Fry', 'Futurama'],
        data: {
            subject: 'Fry not sure',
            body: 'Is this the real life, is this just fantasy?',
            src: 'https://i.kym-cdn.com/entries/icons/mobile/000/006/026/NOTSUREIF.jpg'
        }
    },
    {
        id: makeId(),
        type: 'noteTxt',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['serendipity'],
        data: {
            subject: 'The Road Not Taken',
            body: `Two roads diverged in a yellow wood, 
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
        id: makeId(),
        type: 'noteTxt',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['NaN'],
        data: {
            subject: 'My favorite number',
            body: '',
        }
    },
    {
        id: makeId(),
        type: 'noteAud',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['rick and morty',],
        data: {
            subject: 'Get your shit together',
            body: 'get all your shit, so its together',
            src: 'https://www.myinstants.com/media/sounds/getyourshit_full_lowquality.mp3',
        }
    },
    {
        id: makeId(),
        type: 'noteTxt',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['so cool', 'wow', 'number1'],
        data: {
            subject: 'Cool App',
            body: 'https://shailavie.github.io/proj-Appsus ght',
        }
    },
    {
        id: makeId(),
        type: 'noteTxt',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: [],
        data: {
            subject: 'Don\'t forget!',
            body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id modi facere adipisci incidunt impedit voluptatibus nostrum, velit ad!',
        }
    },
    {
        id: makeId(),
        type: 'noteTxt',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['react?', 'What?', 'WOW'],
        data: {
            subject: 'Check this out',
            body: 'https://vuejs.org/',
        }
    },
    {
        id: makeId(),
        type: 'noteTxt',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['cool', 'enjoyable', 'happy'],
        data: {
            subject: '',
            body: `Sed maxime harum repellat aperiam animi, 
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
        id: makeId(),
        type: 'noteTxt',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['css', 'Asi', 'Sawsan4Life', 'התחלנו'],
        data: {
            subject: 'Nice course',
            body: 'https://www.coding-academy.org/landing2/',
        }
    },
    {
        id: makeId(),
        type: 'noteVid',
        isPinned: false,
        dateCreated: new Date(),
        bgColor: 'white',
        labels: ['sample', 'video', 'lego'],
        data: {
            subject: 'Sample video',
            body: 'how cool is that!',
            src: 'http://techslides.com/demos/sample-videos/small.mp4'
        }
    },

]

initNotes()

// Exported Functions
function initNotes() {
    gNotes = _loadFromStorage(NOTES_KEY);
    if (!gNotes || gNotes.length === 0) {
        gNotes = _createNotes();
        _saveToStorage(NOTES_KEY, gNotes)
    }
    return Promise.resolve(gNotes)
}
function addNewNote(newNote) {
    gNotes.unshift(newNote)
    _saveToStorage(NOTES_KEY, gNotes)
    return Promise.resolve(gNotes)
}
function editNote(note) {
    // console.log('EDITING A NOTE')
    // console.log('NOTE TO EDIT:', note)
    let noteIdx = _getNoteIdxByNote(note)
    gNotes.splice(noteIdx, 1, note)
    _saveToStorage(NOTES_KEY, gNotes)
    return Promise.resolve(gNotes)
}
function duplicateNote(note) {
    let noteCopy = _deepCopy(note)
    noteCopy.id = makeId()
    gNotes.unshift(noteCopy)
    _saveToStorage(NOTES_KEY, gNotes)
    return Promise.resolve(gNotes)
}
function deleteNote(note) {
    console.log('service deletes ', note)
    let noteIdx = _getNoteIdxByNote(note)
    gNotes.splice(noteIdx, 1)
    _saveToStorage(NOTES_KEY, gNotes)
    return Promise.resolve(gNotes)
}
function getNotes() {
    return Promise.resolve(gNotes)
}
function changeNoteColor(note) {
    _saveToStorage(NOTES_KEY, gNotes)
    return Promise.resolve(gNotes)
}
function togglePinNote(note) {
    note.isPinned = !note.isPinned;
    _saveToStorage(NOTES_KEY, gNotes)
    return Promise.resolve(gNotes)
}

// Inhouse functions
function _getNoteIdxByNote(note) {
    return gNotes.findIndex(function (item) {
        return note.id === item.id
    })
}
function _deepCopy(item) {
    return JSON.parse(JSON.stringify(item))
}
function _createNotes() {
    console.log('creating notes from dummy data');
    let notes = dummyNotes;
    return notes
}
function _getNoteById(noteId) {
    var note = gNotes.find(function (note) {
        return noteId === note.id
    })
    return Promise.resolve(note)
}
function _saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
function _loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

