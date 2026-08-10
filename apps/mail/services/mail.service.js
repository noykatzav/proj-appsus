// const mail = {
//     id: 'e101',
//     createdAt : 1551133930500,
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     isStarred: false,
//     sentAt : 1551133930594,
//     removedAt : null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const LoggedinUser = {
    email: 'noyk@appsus.com',
    fullname: 'Noy Katzav'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter
}
// For Debug (easy access from console):
window.ms = mailService


function query(options = {}) {
    const filterBy = options.filterBy
    const sortBy = options.sortBy

    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }

            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead === true)
            }

            if (filterBy.isStarred) {
                mails = mails.filter(mail => mail.isStarred === true)
            }


            if (sortBy.sortField === 'sentAt') {
                mails.sort((mail1, mail2) => 
                    (mail1.sentAt - mail2.sentAt) * sortBy.sortDir)
            }            

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}
function getEmptyMail(subject = '', body = '', isRead = false, isStarred = false, sentAt = utilService.getCurrentTimestamp(), from = '', to = '', removedAt = null, createdAt = utilService.getCurrentTimestamp()) {
    return { createdAt, subject, body, isRead, isStarred, sentAt, removedAt, from, to }
}

function getDefaultFilter(filterBy = { status: 'inbox/', txt: '', isRead: undefined, isStarred: undefined, lables: [] }) {
    return { status: filterBy.status, txt: filterBy.txt, isRead: filterBy.isRead, isStarred: filterBy.isStarred, lables: filterBy.lables }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        const booleanOptions = [false, true]
        const subjects = [
            'Meeting tomorrow',
            'Your order has shipped',
            'Quick question',
            'Project update',
            'Dinner plans',
            'Welcome to the team',
            'Important update',
            'Can you send me the file?',
            'Happy birthday!',
            'Weekend plans',
            'Invoice attached',
            'Lets catch up',
            'Reminder',
            'Your appointment',
            'New photos',
            'About yesterday',
            'See you soon',
            'Travel details',
            'One more thing',
            'Great news!',
            'Schedule for next week',
            'Thanks for your help',
            'Check this out',
            'Following up',
            'Coffee sometime?',
            'Your subscription',
            'Almost there!',
            'Question about the project',
            'Long time no see',
            'Have a great day!'
        ]
        const bodies = [
            'Just wanted to check in about tomorrow.',
            'Your order is on its way!',
            'Let me know what you think.',
            'Here is the latest update.',
            'Are we still on for dinner?',
            'Excited to have you with us!',
            'There has been a small change.',
            'I attached the file you asked for.',
            'Hope you have an amazing day!',
            'What are you doing this weekend?',
            'The invoice is attached.',
            'It was great seeing you yesterday.',
            'Just a quick reminder.',
            'See you at the appointment!',
            'I uploaded the new photos.',
            'I wanted to follow up on this.',
            'Looking forward to seeing you!',
            'Here are all the travel details.',
            'I almost forgot to mention this.',
            'I have some exciting news!',
            'Here is the schedule for next week.',
            'Thanks again for everything!',
            'I thought you might like this.',
            'Just checking if you saw my message.',
            'Lets grab coffee soon.',
            'Your subscription was renewed.',
            'We are almost done!',
            'Do you have a minute to talk?',
            'It has been way too long!',
            'Hope everything is going well.'
        ]
        const users = [
            {
                email: 'emma@appsus.com',
                fullname: 'Emma Wilson'
            },
            {
                email: 'liam@appsus.com',
                fullname: 'Liam Carter'
            },
            {
                email: 'olivia@appsus.com',
                fullname: 'Olivia Brown'
            },
            {
                email: 'noah@appsus.com',
                fullname: 'Noah Miller'
            },
            {
                email: 'ava@appsus.com',
                fullname: 'Ava Davis'
            },
            {
                email: 'ethan@appsus.com',
                fullname: 'Ethan Anderson'
            },
            {
                email: 'sophia@appsus.com',
                fullname: 'Sophia Martinez'
            },
            {
                email: 'lucas@appsus.com',
                fullname: 'Lucas Taylor'
            },
            {
                email: 'mia@appsus.com',
                fullname: 'Mia Thomas'
            },
            {
                email: 'james@appsus.com',
                fullname: 'James Moore'
            },
            {
                email: 'charlotte@appsus.com',
                fullname: 'Charlotte Jackson'
            },
            {
                email: 'benjamin@appsus.com',
                fullname: 'Benjamin White'
            },
            {
                email: 'amelia@appsus.com',
                fullname: 'Amelia Harris'
            },
            {
                email: 'henry@appsus.com',
                fullname: 'Henry Martin'
            },
            {
                email: 'isabella@appsus.com',
                fullname: 'Isabella Thompson'
            },
            {
                email: 'daniel@appsus.com',
                fullname: 'Daniel Garcia'
            },
            {
                email: 'ella@appsus.com',
                fullname: 'Ella Robinson'
            },
            {
                email: 'michael@appsus.com',
                fullname: 'Michael Clark'
            },
            {
                email: 'grace@appsus.com',
                fullname: 'Grace Lewis'
            },
            {
                email: 'alexander@appsus.com',
                fullname: 'Alexander Lee'
            },
            {
                email: 'chloe@appsus.com',
                fullname: 'Chloe Walker'
            },
            {
                email: 'matthew@appsus.com',
                fullname: 'Matthew Hall'
            },
            {
                email: 'lily@appsus.com',
                fullname: 'Lily Allen'
            },
            {
                email: 'david@appsus.com',
                fullname: 'David Young'
            },
            {
                email: 'sofia@appsus.com',
                fullname: 'Sofia King'
            },
            {
                email: 'jack@appsus.com',
                fullname: 'Jack Wright'
            },
            {
                email: 'emily@appsus.com',
                fullname: 'Emily Scott'
            },
            {
                email: 'ryan@appsus.com',
                fullname: 'Ryan Green'
            },
            {
                email: 'hannah@appsus.com',
                fullname: 'Hannah Baker'
            },
            {
                email: 'jacob@appsus.com',
                fullname: 'Jacob Adams'
            }
        ]
        const timestamps = [
            1786387474000,
            1786382271000,
            1786378365000,
            1786371268000,
            1786358667000,
            1786351731000,
            1785454211000,
            1785394970000,
            1785113346000,
            1781102133000,
            1778600806000,
            1776090393000,
            1775316881000,
            1772288528000,
            1769603419000,
            1764004294000,
            1754146505000,
            1752124014000,
            1751303208000,
            1750669019000,
            1750362146000,
            1745053831000,
            1743160901000,
            1742567934000,
            1741977381000,
            1741523966000,
            1737822499000,
            1737689257000,
            1737470398000,
            1737368043000
        ]

        for (let i = 0; i < 60; i++) {
            const subject = subjects[utilService.getRandomIntInclusive(0, subjects.length - 1)]
            const body = bodies[utilService.getRandomIntInclusive(0, bodies.length - 1)]
            const isRead = booleanOptions[utilService.getRandomIntInclusive(0, booleanOptions.length - 1)]
            const isStarred = booleanOptions[utilService.getRandomIntInclusive(0, booleanOptions.length - 1)]
            const sentAt = Date.now() - utilService.getRandomIntInclusive(0, 500 * 24 * 60 * 60 * 1000)
            const from = users[utilService.getRandomIntInclusive(0, users.length - 1)].email
            console.log(LoggedinUser + ' | '  + LoggedinUser.email)
            const to = LoggedinUser.email

            mails.push(_createMail(subject, body, isRead, isStarred, sentAt, from, to))
        }                      
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}


function _createMail(subject, body, isRead, isStarred, sentAt, from, to, removedAt) {
    const mail = getEmptyMail(subject, body, isRead, isStarred, sentAt, from, to, removedAt)
    mail.id = utilService.makeId(11)
    return mail
}