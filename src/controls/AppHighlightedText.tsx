import React, { ReactNode } from 'react';
import classNames from 'classnames';

type AppHighlightedTextProps = {
    fontSize?: 'sm'|'md'|'lg';
    children?: ReactNode;
    color: 'primary'|'secondary'|'bold'|'default'|'white';
}
export function AppHighlightedText({fontSize, color = 'default', children}: AppHighlightedTextProps) {
    return(
        <span className={classNames('app-hl-text', {
            'is-primary': color === 'primary',
            'is-secondary': color === 'secondary',
            'is-white': color === 'white',
            'is-bold': color === 'bold',
            'has-sm-font': fontSize === 'sm',
            'has-md-font': fontSize === 'md',
            'has-lg-font': fontSize === 'lg'
        })}>
            {children}
        </span>
    );
}
