import React, { ReactNode } from 'react';
import { useFirebase } from '../services/firebase.service';
import { ImageLink } from '../state/dynamic.types';

type AppViewProps = {
    children?: ReactNode;
    backgroundImage?: ImageLink;
}
export function AppView({children, backgroundImage}: AppViewProps) {
    const firebaseService = useFirebase();
    const imageLink = backgroundImage !== undefined ? firebaseService.get(backgroundImage.link) : undefined;

    return (
        <div className='app-view' style={{
            backgroundImage: imageLink === undefined ? undefined : `url(${imageLink})`
        }}>
            {children}
        </div>
    );
}