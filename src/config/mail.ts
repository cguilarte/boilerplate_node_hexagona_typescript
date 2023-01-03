import nodemailer from 'nodemailer';
import Email from 'email-templates';
import path from 'path';
import { env } from './env';

const pathTemplate = path.join(__dirname, '..', 'templates/mails/');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

const email = new Email({
  transport: transporter,
  message: {
    from: `${env.APPLICATION_NAME} <${env.EMAIL_USER}>`,
  },
  send: true,
  preview: false,
  views: {
    root: `${pathTemplate}`,
    options: {
      extension: 'twig',
    },
  },
});

export default email;
