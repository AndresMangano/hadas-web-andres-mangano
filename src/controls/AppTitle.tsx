import React from 'react';
import { SimpleText } from '../state/dynamic.types';
import { AppRow } from './AppRow';

type AppTitleProps = {
    text: SimpleText;
}

export function AppTitle({text}: AppTitleProps) {
    return (
        <AppRow className="app-title" transparent>
            <h1 className="app-title-text">
                {text.value}
            </h1>
        </AppRow>
    )
}