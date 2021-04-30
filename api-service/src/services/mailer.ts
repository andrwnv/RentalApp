import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST || 'smtp.gmail.com',
    port: Number(process.env.NODEMAILER_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});

export default transport;
