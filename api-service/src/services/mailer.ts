import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST || 'smtp.mailtrap.io',
    port: Number(process.env.NODEMAILER_PORT) || 2525,
    auth: {
        user: '847808607f5c1d',
        pass: '2b60a4a0096a90'
    }
});

export default transport;
