import utilService from '../services/util-service.js';

export default {
    getEmails,
    getEmailById,
    addEmail,
    deleteEmail
}

function getEmails() {
    return Promise.resolve(gEmails);
}

function getEmailById(id) {
    var email = gEmails.find(function (email) {
        return id === email.id
    })
    return Promise.resolve(email);
}

function _getEmailIdxByEmail(email) {
    return gEmails.findIndex(function (item) {
        return email.id === item.id
    })
}

function createEmail(subject, body) {
    return {
        id: utilService.makeId(),
        name: "Me",
        from: 'me@gmail.com',
        to: 'Me',
        subject,
        body,
        isRead: false,
        sentAt: Date.now()
    }
}

function addEmail(subject, body) {
    gEmails.unshift(createEmail(subject, body));
}

function deleteEmail(email){
    let emailIdx = _getEmailIdxByEmail(email)
    gEmails.splice(emailIdx,1)
    return Promise.resolve(gEmails)
}

var gEmails = [
    {
        id: utilService.makeId(),
        name: "Moshe",
        from: "Moshe23123@gmail.com",
        to: "Me",
        subject: 'Wassap with Vue?',
        body: 'bla bla bla bla bla bla blab lablabl abla blabalbaa aaa sssss',
        isRead: false,
        sentAt: 1951133930594
    },
    {
        id: utilService.makeId(),
        name: "Anna",
        from: "Anna2012@gmail.com",
        to: "Me",
        subject: 'Hello',
        body: 'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum ',
        isRead: true,
        sentAt: 1551133930594
    },
    {
        id: utilService.makeId(),
        name: "Haim",
        from: "thecoolestmailever@gmail.com",
        to: "Me",
        subject: 'Wassap with Vue?',
        body: 'May I',
        isRead: false,
        sentAt: 1551133930594
    }
]