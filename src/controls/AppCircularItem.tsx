import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { useFirebase } from '../services/firebase.service';
import { ImageLink, SimpleText } from '../state/dynamic.types';
import { AppColumn } from './AppColumn';

type AppCircularItemProps = {
    onClick?:() => void;
    text?: string;
    imageTitle?: SimpleText;
    subtitle?: string;
    image: ImageLink;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    alignment?: 'top-right'|'bottom-left';
}
export function AppCircularItem({size = 'xl', image, text, imageTitle, subtitle, onClick, alignment = 'top-right'}: AppCircularItemProps) {
    const firebaseService = useFirebase();
    const imageLink = firebaseService.get(image.link);

    return (
        <div onClick={onClick} className='app-circular-item'>
            <h1 className='app-circular-item-title'>{imageTitle?.value}</h1>
            <div 
                style={{ backgroundImage: `url('${imageLink}')`}}    
                className={classNames('app-circular-item-box', {
                'has-sm-size': size === 'sm',
                'has-md-size': size === 'md',
                'has-lg-size': size === 'lg',
                'has-xl-size': size === 'xl',
            })}>
                <div className='app-circular-item-box-filter'>
                    <FontAwesomeIcon className='app-circular-item-box-filter-icon' icon={faPlusCircle} />
                </div>
                { text !== undefined &&
                    <AppColumn className={classNames('app-circular-item-box-text', {
                        'has-alignment-top-right': alignment === 'top-right',
                        'has-alignment-bottom-left': alignment === 'bottom-left',
                    })}>
                        <span className='app-circular-item-box-text-title'>{text}</span>
                        { subtitle !== undefined &&
                            <span className='app-circular-item-box-text-subtitle'>{subtitle}</span>
                        }
                    </AppColumn>
                }
            </div>
        </div>
    );
}