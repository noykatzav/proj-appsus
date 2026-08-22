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
    getDefaultFilter,
    getDefaultSort,
    getFilterFromSearchParams,
    getSortFromSearchParams
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

            if (filterBy.from) {
                mails = mails.filter(mail => mail.from === filterBy.from)
            }

            if (filterBy.isRead === false) {
                mails = mails.filter(mail => !mail.isRead)
            }

            if (filterBy.isStarred) {
                mails = mails.filter(mail => mail.isStarred === true)
            }

            if (sortBy.sortField === 'sentAt') {
                mails.sort((mail1, mail2) => 
                    (mail1.sentAt - mail2.sentAt) * sortBy.sortDir)
            }            

            if (sortBy.sortField === 'subject') {
                mails.sort((mail1, mail2) => 
                    mail1.subject.localeCompare(mail2.subject) * sortBy.sortDir)
            }            

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail = _setNextPrevMailId(mail)
            return mail
        })
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

function getDefaultFilter(filterBy = { status: 'inbox/', txt: '', isRead: undefined, isStarred: undefined, lables: [] , from: ''}) {
    return { status: filterBy.status, txt: filterBy.txt, isRead: filterBy.isRead, isStarred: filterBy.isStarred, lables: filterBy.lables, from: filterBy.from }
}

function getDefaultSort(sortBy = {sortField: 'sentAt', sortDir: -1} ) {
    return { sortField: sortBy.sortField, sortDir: sortBy.sortDir}
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}

    for (const field in defaultFilter) {
        const value = searchParams.get(field)
        
        if (value === null) {
            filterBy[field] = defaultFilter[field]
        } else if (value === 'true') {
            filterBy[field] = true
        } else if (value === 'false') {
            filterBy[field] = false
        } else {
            filterBy[field] = value
        } 
    }
    return filterBy
}

function getSortFromSearchParams(searchParams) {
    const defaultSort = getDefaultSort()

    return {
        sortField: searchParams.get('sortField') || defaultSort.sortField,
        sortDir: +(searchParams.get('sortDir') || defaultSort.sortDir)
    }
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
        `Just wanted to check in about tomorrow.
        Are we still meeting at the same time?
        Let me know if anything has changed on your side.
        Looking forward to catching up and getting everything done.`,

        `Your order is on its way!
        It should arrive within the next few days.
        You can use the tracking link to see the latest updates.
        Thanks again for your purchase, and enjoy your order!`,

        `I wanted to ask you a quick question about the project.
        Do you think we should keep the current approach?
        I have a couple of ideas that we could discuss.
        Let me know when you have a minute.`,

        `Here is the latest update on the project.
        We finished most of the work we planned for this week.
        There are still a few small things left to review.
        I will send another update once everything is ready.`,

        `Are we still on for dinner tonight?
        I was thinking we could try that new place downtown.
        They have some really good reviews and a nice atmosphere.
        Let me know what time works best for you.`,

        `We are really excited to have you with us!
        Everyone is looking forward to meeting you and getting started.
        I attached some information that might be useful for your first day.
        Feel free to reach out if you have any questions.`,

        `There has been a small change to the original plan.
        The meeting will now start about thirty minutes later.
        Everything else should stay exactly the same.
        I will let you know if anything else comes up.`,

        `I attached the file you asked me for.
        It includes the latest version with all the changes we discussed.
        Take a look when you have a chance and let me know what you think.
        I can make any additional changes if needed.`,

        `Hope you have an amazing day!
        I just wanted to send a quick message and say thank you.
        I really appreciate all your help with everything recently.
        Hopefully we can catch up again soon.`,

        `What are you doing this weekend?
        I was thinking about going somewhere outside the city.
        The weather looks like it should be pretty nice.
        Let me know if you want to join and we can make some plans.`,

        `The invoice is attached to this email.
        Please take a look and make sure all the details are correct.
        The payment information is included at the bottom of the document.
        Let me know if you notice anything that needs to be changed.`,

        `It was great seeing you yesterday.
        I really enjoyed our conversation and it was nice catching up.
        We should definitely try to do this more often.
        Let me know when you are free again.`,

        `Just a quick reminder about our meeting tomorrow.
        We are scheduled to meet at ten in the morning.
        I will bring the documents we discussed last time.
        See you then!`,

        `See you at the appointment!
        Everything is confirmed for tomorrow afternoon.
        Please let me know if you need to reschedule for any reason.
        Otherwise, I will see you there at the scheduled time.`,

        `I uploaded the new photos from the event.
        There are quite a few good ones in the folder.
        Feel free to download whichever photos you like.
        Let me know if you want me to send you the originals.`,

        `I wanted to follow up on this and see if you had a chance to look at it.
        There is no rush, but I would love to hear your thoughts.
        We can make any changes you think are necessary.
        Thanks again for taking the time to review everything.`,

        `Looking forward to seeing you!
        It has been a while since we last got together.
        I think it will be really nice to spend some time catching up.
        Let me know if there is anything you want me to bring.`,

        `Here are all the travel details for the upcoming trip.
        I included the flight information, hotel address, and reservation number.
        Everything should be ready, but please double-check the dates.
        Let me know if you notice anything that looks incorrect.`,

        `I almost forgot to mention one more thing.
        We should probably make a decision before the end of the week.
        I think both options could work, but there are a few things to consider.
        Let me know what you think when you get a chance.`,

        `I have some exciting news!
        Everything we were waiting for has finally been approved.
        This means we can move forward with the next stage.
        I will send more details once I have everything confirmed.`,

        `Here is the schedule for next week.
        I included all the meetings and important deadlines.
        Take a look and let me know if anything conflicts with your calendar.
        We can make adjustments before the week starts.`,

        `Thanks again for everything!
        Your help made the whole process much easier.
        I really appreciate you taking the time to help me with this.
        Hopefully I can return the favor sometime soon.`,

        `I thought you might like this.
        I came across it earlier today and immediately thought of you.
        It reminded me of the conversation we had last week.
        Let me know what you think when you get a chance to check it out.`,

        `Just checking if you saw my previous message.
        I know things can get busy, so I wanted to make sure it did not get lost.
        There is no immediate rush to respond.
        Just let me know when you have a chance.`,

        `Lets grab coffee soon.
        It feels like we have not had a proper chance to catch up lately.
        I am usually free in the afternoons next week.
        Let me know which day works best for you.`,

        `Your subscription was renewed successfully.
        Your account will remain active for the next billing period.
        You can review your subscription details from your account settings.
        Please contact us if you have any questions.`,

        `We are almost done!
        There are just a few final details that still need to be completed.
        Everything else is looking good so far.
        I will let you know as soon as we are officially finished.`,

        `Do you have a minute to talk?
        I wanted to get your opinion about something related to the project.
        It should only take a few minutes.
        Let me know when you are available.`,

        `It has been way too long!
        We really need to find some time to catch up.
        So much has happened since the last time we talked.
        Let me know when you are free and we can plan something.`,

        `Hope everything is going well!
        I just wanted to check in and see how things are going.
        Things have been pretty busy on my end lately.
        Hopefully we can catch up sometime soon.`
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

        for (let i = 0; i < 170; i++) {
            const subject = subjects[utilService.getRandomIntInclusive(0, subjects.length - 1)]
            const body = bodies[utilService.getRandomIntInclusive(0, bodies.length - 1)]
            const isRead = booleanOptions[utilService.getRandomIntInclusive(0, booleanOptions.length - 1)]
            const isStarred = booleanOptions[utilService.getRandomIntInclusive(0, booleanOptions.length - 1)]
            const sentAt = Date.now() - utilService.getRandomIntInclusive(0, 500) * 24 * 60 * 60 * 1000
            const from = users[utilService.getRandomIntInclusive(0, users.length - 1)].email
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

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}