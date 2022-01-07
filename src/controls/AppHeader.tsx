import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../services/firebase.service';
import { ImageLink, SimpleText, UrlLink } from '../state/dynamic.types';
import { AppColumn } from './AppColumn';
import { AppRow } from './AppRow';
import { AppSocialMedia } from './AppSocialMedia';

type AppHeaderProps = {
    back?: string;
    logo: ImageLink;
    social: {
        instagram: UrlLink;
        facebook: UrlLink;
        whatsapp: UrlLink;
    },
    labels: {
        inicio: SimpleText;
        shows: SimpleText;
        fotos: SimpleText;
        salas: SimpleText;
        clases: SimpleText;
        profes: SimpleText;
        alumnos: SimpleText;
        contacto: SimpleText;
    }
}
export function AppHeader({back, logo, social, labels}: AppHeaderProps) {
    const firebaseService = useFirebase();
    const logoLink = firebaseService.get(logo.link);
    const [collapsed, setCollapsed] = useState(true);

    function scrollUp() {
        window.scrollTo(0, 0);
    }

    return (
        <AppRow className="app-header" transparent>
            <AppColumn className='app-header-logo'>
                <Link to='/'>
                    <img src={logoLink} alt="Hadas Brand"/>
                </Link>
                { back !== undefined &&
                    <Link className='app-header-logo-back' to={back}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Volver
                    </Link>
                }
            </AppColumn>
            <AppRow className='app-header-collapse' transparent={true} align='center' justify='flex-start'>
                <AppColumn align='flex-start'>
                    <button className='app-header-collapse-button' onClick={() => setCollapsed(prev => !prev)}>
                        <FontAwesomeIcon icon={faBars} size='4x'/>
                    </button>
                </AppColumn>
                <AppColumn>
                    <Link to='/'>
                        <img className='app-header-collapse-logo' src={logoLink} alt="Hadas Brand"/>
                    </Link>
                </AppColumn>
                <AppColumn />
            </AppRow>
            <AppColumn className='app-header-navbar' grow={5} align='stretch' alignSelf='flex-start'>
                <AppRow className={classNames('app-header-navbar-links', {
                    'is-collapsed': collapsed
                })} transparent align='center' justify='center'>
                    <Link to='/' onClick={scrollUp}>{labels.inicio.value}</Link>
                    <Link to="/profes" onClick={scrollUp}>{labels.profes.value}</Link>
                    <Link to="/clases" onClick={scrollUp}>{labels.clases.value}</Link>
                    <Link to="/salas" onClick={scrollUp}>{labels.salas.value}</Link>
                    <Link to="/testimoniales" onClick={scrollUp}>{labels.alumnos.value}</Link>
                    <Link to="/shows" onClick={scrollUp}>{labels.shows.value}</Link>
                    <Link to="/fotos" onClick={scrollUp}>{labels.fotos.value}</Link>
                    <Link to='/inscripcion' onClick={scrollUp}>{labels.contacto.value}</Link>
                </AppRow>
            </AppColumn>
            <AppColumn></AppColumn>
            <div className='app-header-contact'>
                <AppSocialMedia {...social} />
            </div>
        </AppRow>
    )
}