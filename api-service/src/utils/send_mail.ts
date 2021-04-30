import { SentMessageInfo } from 'nodemailer';

import mailTransport from '../services/mailer';

interface SendMailProps {
    from: string,
    to: string,
    subject: string,
    body: string,
    callback: (err: Error | null, info: SentMessageInfo) => void
}

export const sendMail = (
    {
        from,
        to,
        subject,
        body,
        callback
    }: SendMailProps) => {
    mailTransport.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: body,
    }, callback);
}
