import React, { useState } from 'react';
import { AppButton } from '../controls/AppButton';
import { AppForm } from '../controls/AppForm';
import { AppInput } from '../controls/AppInput';
import { AppTextArea } from '../controls/AppTextArea';
import { useMail } from '../services/mail.service';

export function AppInscriptionForm() {
    const mailService = useMail();
    const [name, setName] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    function sendMail(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        mailService.sendEmail({
            name,
            email,
            telephone,
            message
        })
        .then(() => {
            alert("Mail enviado!")
            setName('');
            setTelephone('');
            setEmail('');
            setMessage('');
        })
        .catch(() => alert("Error al enviar el mail, intenta contactarnos por Whatsapp, Instagram o Facebook"));
    }

    return (
        <AppForm onSubmit={sendMail}>
            <>
                <AppInput type='text' name='name' value={name} placeholder='Nombre' onChange={event => setName(event.currentTarget.value)} />
                <AppInput type='text' name='telephone' value={telephone} placeholder='Telefono' onChange={event => setTelephone(event.currentTarget.value)} />
            </>
            <>
                <AppInput type='email' name='email' value={email} placeholder='Email' onChange={event => setEmail(event.currentTarget.value)} />
            </>
            <>
                <AppTextArea name='message' rows={7} value={message} placeholder='Mensaje' onChange={event => setMessage(event.currentTarget.value)} />
            </>
            <>
                <AppButton>ENVIAR</AppButton>
            </>
        </AppForm>
    );
}