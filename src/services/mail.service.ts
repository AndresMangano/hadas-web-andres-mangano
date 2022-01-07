import React, { useContext } from 'react';
import emailjs from 'emailjs-com';

const emailService = process.env.REACT_APP_EMAIL_JS_SERVICE;
const emailTemplate = process.env.REACT_APP_EMAIL_JS_TEMPLATE;
const emailUserId = process.env.REACT_APP_EMAIL_JS_USER_ID;

export interface IMailService {
    sendEmail(params: any): Promise<void>;
}

class MailService implements IMailService {
    async sendEmail(params: any): Promise<void> {
        if (emailService !== undefined
            && emailTemplate !== undefined
            && emailUserId !== undefined)
        {
            await emailjs.send(emailService, emailTemplate, params, emailUserId);
        } else {
            Promise.reject();
        }
    }
}

const mailServiceContext = React.createContext<IMailService>(new MailService());

export function useMail() {
    return useContext(mailServiceContext);
}