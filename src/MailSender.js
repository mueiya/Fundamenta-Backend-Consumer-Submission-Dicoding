const nodemailer = require('nodemailer');

class MailSender {
    constructor() {
        this._trandporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: 'Open Music',
            to: targetEmail,
            subject: 'Playlist Export',
            text: 'Playlis\'s export result attached',
            attachments: [
                {
                    filename: 'playlists.json',
                    content,
                }
            ]
        }
        return this._transporter.sendMail(message);
    }

}
module.exports = MailSender;