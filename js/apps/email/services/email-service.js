import utilService from '../services/util-service.js';

export default {

}

function getEmails() {
    return Promise.resolve(gEmails);
}

var gEmails = [
    {
        subject: 'Wassap with Vue?',
        body: 'May I',
        isRead: false,
        sentAt: 1551133930594
    }
]