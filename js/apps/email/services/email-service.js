import utilService from '../services/util-service.js';

export default {
getEmails
}

function getEmails() {
    return Promise.resolve(gEmails);
}

var gEmails = [
    {
        id: utilService.makeId(),
        from: "Moshe@gmail.com",
        to: "Me",
        subject: 'Wassap with Vue?',
        body: 'bla bla bla bla bla bla blab lablabl abla blabalbaa aaa sssss',
        isRead: false,
        sentAt: 1951133930594
    },
    {
        id: utilService.makeId(),
        from: "Anna@gmail.com",
        to: "Me",
        subject: 'Hello',
        body: 'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum ',
        isRead: true,
        sentAt: 1551133930594
    },
    {
        id: utilService.makeId(),
        from: "Haim@gmail.com",
        to: "Me",
        subject: 'Wassap with Vue?',
        body: 'May I',
        isRead: false,
        sentAt: 1551133930594
    }
]