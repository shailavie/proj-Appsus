import utilService from '../services/util-service.js';
import storageService from '../services/storage-service.js';

const EMAILS_KEY = 'emails';

export default {
    getEmails,
    getEmailById,
    addEmail,
    deleteEmail,
    unreadEmail,
    markAsRead
}

function getEmails() {
    var emails = storageService.loadFromStorage(EMAILS_KEY);
    if (!emails || emails.length === 0) {
        storageService.saveToStorage(EMAILS_KEY, gEmails);
    } else {
        gEmails = emails
    }
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
    storageService.saveToStorage(EMAILS_KEY, gEmails);
}

function deleteEmail(email) {
    let emailIdx = _getEmailIdxByEmail(email)
    gEmails.splice(emailIdx, 1)
    storageService.saveToStorage(EMAILS_KEY, gEmails);
    return Promise.resolve(gEmails)
}

function unreadEmail(email) {
    email.isRead = false;
    console.log(gEmails)
    console.log(email.isRead)
    storageService.saveToStorage(EMAILS_KEY, gEmails);
}

function markAsRead(email) {
    email.isRead = true;
    storageService.saveToStorage(EMAILS_KEY, gEmails);

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