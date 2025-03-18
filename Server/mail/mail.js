import { readByUserId } from "../DBtools/read.js";

export const getMail = (userId) => {
    return [
        {
        id: 128372,
        from: 652102029108137472,
        subject: "Hello from Node.js",
        body: "This is a test email sent from Node.js using SendGrid."
        },
        {
        id: 128373,
        from: 652102029108137472,
        subject: "Test 2",
        body: "Cool Man."
        },
    ]
}

export const getMailById = (emailId) => {
    return {
        id: 128372,
        from: 652102029108137472,
        subject: "Hello from Node.js",
        body: "This is a test email sent from Node.js using SendGrid."
    }
}

export const parseMail = (mail) => {
    return Promise.all(mail.map((mail) => 
        readByUserId(mail.from).then((user) => ({
            id: mail.id,
            from: user.username,
            subject: mail.subject,
            body: mail.body
        }))
    ));
}