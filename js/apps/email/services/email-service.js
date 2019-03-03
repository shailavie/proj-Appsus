import utilService from '../services/util-service.js';
import storageService from '../services/storage-service.js';

const EMAILS_KEY = 'emails';

export default {
    getEmails,
    getEmailById,
    addEmail,
    deleteEmail,
    unreadEmail,
    markAsRead,
    sortEmails
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
        sentAt: Math.floor(Date.now() / 1000)
    }
}

function sortEmails(emailsToSort, filterBy) {
    switch (filterBy.sortBy) {
        case 'date':
            emailsToSort = emailsToSort.sort((a, b) => {
                return a.sentAt - b.sentAt;
            });
            break;
        case 'subject':
            emailsToSort = emailsToSort.sort((a, b) => {
                if (a.subject < b.subject) return -1;
                if (a.subject > b.subject) return 1;
                return 0;
            });
            break;
    }
    
    // emailsToSort.reverse();
    
    return emailsToSort;
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
        body: 'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum',
        isRead: false,
        sentAt: Math.floor(Date.now() / 1000)
    },
    {
        id: utilService.makeId(),
        name: "Anna",
        from: "Anna2012@gmail.com",
        to: "Me",
        subject: 'Hello',
        body: 'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum ',
        isRead: true,
        sentAt: Math.floor(Date.now() / 1000)
    },
    {
        id: utilService.makeId(),
        name: "Haim",
        from: "thecoolestmailever@gmail.com",
        to: "Me",
        subject: 'Wassap with Vue?',
        body: 'May I',
        isRead: false,
        sentAt: Math.floor(Date.now() / 1000)
    }
]