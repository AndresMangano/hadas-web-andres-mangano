import React from 'react';
import { useFirebase } from '../services/firebase.service';
import { ImageLink } from '../state/dynamic.types';
import { AppColumn } from './AppColumn';

type AppGovenrmentLogoProps= {
    image: ImageLink;
}

export function AppGovernmentLogo({image}: AppGovenrmentLogoProps) {
    const firebaseService = useFirebase();
    const imageLink = firebaseService.get(image.link);
    
    return(
        <AppColumn className="app-gob-logo">
            <img src={imageLink} alt="Gobierno Cultura Logo"/>
            <p className="app-gob-logo-text"><strong>Este espacio cuenta con el apoyo del fondo desarrollar - Ministerio de Cultura de la Nación</strong></p>
        </AppColumn>
    );
}