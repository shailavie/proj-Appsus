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
        subject: 'Wassap with Vue?',
        body: 'May I',
        isRead: false,
        sentAt: 1551133930594
    }
]