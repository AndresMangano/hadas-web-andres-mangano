import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { useFirebase } from '../services/firebase.service';
import { ImageLink } from '../state/dynamic.types';

type AppRowProps = {
    className?: string;
    image?: {
        source: ImageLink;
        title: string;
        gradient: boolean;
        fixed: boolean;
    }
    transparent?: boolean;
    size?: 'half'|'full'|'auto'|'separator'|'quarter';
    grow?: number;
    justify?: 'flex-start'|'center'|'flex-end'|'space-around'|'space-between';
    align?: 'flex-start'|'center'|'flex-end';
    padding?: 'sm'|'md'|'lg';
    wrap?: boolean;
    reverse?: boolean;
    mobile?: boolean;
    children?: ReactNode;
}
export function AppRow({className, children, size, padding, transparent = false, image, justify = 'space-around', align = 'center', grow = 1, reverse = false, wrap = true, mobile = true}: AppRowProps) {
    const firebaseService = useFirebase();
    const imageLink = image?.source !== undefined ? firebaseService.get(image?.source.link) : undefined;
    
    return (
        <div
            className={classNames('app-row', className, {
                'is-solid': image === undefined && !transparent,
                'not-in-mobile': !mobile,
                'has-image': image !== undefined,
                'is-quarter': size === 'quarter',
                'is-half': size === 'half',
                'is-full': size === 'full',
                'is-fixed': image?.fixed,
                'is-separator': size === 'separator',
                'has-lg-padding': padding === 'lg',
                'has-md-padding': padding === 'md',
                'has-sm-padding': padding === 'sm',
                'should-not-wrap': !wrap,
                'is-reversed': reverse
            })}
            style={{
                backgroundImage: imageLink === undefined ? undefined : `${ image?.gradient ? 'linear-gradient(rgba(50, 50, 50, 0.3), rgba(50, 50, 50, 0.3)),' : ''} url(${imageLink})`,
                flexGrow: grow,
                justifyContent: justify,
                alignItems: align
            }}
            title={image?.title}>
                {children}
        </div>
    );
}