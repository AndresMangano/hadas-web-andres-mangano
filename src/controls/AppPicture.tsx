import classNames from 'classnames';
import React from 'react';
import { useFirebase } from '../services/firebase.service';
import { ImageLink } from '../state/dynamic.types';

type AppPictureProps = {
    title: string;
    source: ImageLink;
    rounded?: boolean;
}
export function AppPicture({title, source, rounded = true}: AppPictureProps) {
    const firebaseService = useFirebase();
    const imageLink = firebaseService.get(source.link);

    return (
        <div className={classNames('app-picture', {
            'is-rounded': rounded
        })}>
            <img src={imageLink} alt={title}/>
        </div>
    );
}