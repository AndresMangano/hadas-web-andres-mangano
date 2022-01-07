import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../services/firebase.service';
import { ImageLink, SimpleText } from '../state/dynamic.types';
import { AppColumn } from './AppColumn';
import { AppRow } from './AppRow';

type AppFooterProps = {
    logo: ImageLink;
    background: ImageLink;
    address: {
        tel: SimpleText;
        email: SimpleText;
        address1: SimpleText;
    };
}
export function AppFooter({logo, background, address}: AppFooterProps) {
    const firebaseService = useFirebase();
    const logoLink = firebaseService.get(logo.link);

    function scrollUp() {
        window.scrollTo(0, 0);
    }

    return (
        <AppRow className='app-footer'>
            <AppColumn align='stretch'>
                <AppRow transparent>
                    <AppColumn className='app-footer-contact'>
                        <span>{address.tel.value}</span>
                        <span>{address.email.value}</span>
                        <span>{address.address1.value}</span>
                    </AppColumn>
                    <AppColumn className='app-footer-logo'>
                        <img src={logoLink} alt="Hadas Brand" />
                    </AppColumn>
                    <AppColumn>
                        <AppRow transparent>
                            <AppColumn className='app-footer-links'>
                                <Link to='/' onClick={scrollUp}>INICIO</Link>
                                <Link to="/profes" onClick={scrollUp}>PROFES</Link>
                                <Link to="/clases" onClick={scrollUp}>CLASES</Link>
                                <Link to="/salas" onClick={scrollUp}>SALAS</Link>
                            </AppColumn>
                            <AppColumn className='app-footer-links'>
                                <Link to="/testimoniales" onClick={scrollUp}>TESTIMONIALES</Link>
                                <Link to="/shows" onClick={scrollUp}>SHOWS</Link>
                                <Link to="/fotos" onClick={scrollUp}>FOTOS</Link>
                                <Link to='/inscripcion' onClick={scrollUp}>INSCRIPCION</Link>
                            </AppColumn>
                        </AppRow>
                    </AppColumn>
                </AppRow>
                <AppRow transparent>
                    <AppColumn className="app-footer-developer" align='stretch'>
                        <span>Designed by Hoxon Studios <Link to='/admin' style={{color: 'darkblue'}}>λ</Link></span>
                    </AppColumn>
                </AppRow>
            </AppColumn>
        </AppRow>
    );
}