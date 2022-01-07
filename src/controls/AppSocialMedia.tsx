import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { AppColumn } from './AppColumn';
import { UrlLink } from '../state/dynamic.types';

type AppSocialMediaProps = {
    instagram: UrlLink;
    facebook: UrlLink;
    whatsapp: UrlLink;
}
export function AppSocialMedia({instagram, facebook, whatsapp}: AppSocialMediaProps) {

    return (
        <AppColumn className='app-social-media'>
            <a className='app-social-media-instagram' href={instagram.url} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faInstagramSquare} className="app-social-media-icon" />
            </a>
            <a className='app-social-media-facebook' href={facebook.url} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faFacebookSquare} className="app-social-media-icon" />
            </a>
            <a className='app-social-media-whatsapp' href={whatsapp.url} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faWhatsappSquare} className="app-social-media-icon" />
            </a>
        </AppColumn>
    );
}