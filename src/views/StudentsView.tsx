import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppCarousel } from '../controls/AppCarousel';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppPicture } from '../controls/AppPicture';
import { AppRow } from '../controls/AppRow';
import { AppTitle } from '../controls/AppTitle';
import { AppView } from '../controls/AppView';
import { AppStateData } from '../state/app.state';

type StudentsViewProps = {
    state: AppStateData;
} & RouteComponentProps;
export function StudentsView({state}: StudentsViewProps) {
    const {
        header,
        items
    } = state.alumnos;
    const isMobile = document.documentElement.clientWidth <= 992;
    
    return (
        <AppView>
            <AppHeader {...state.header} />
            <AppRow size='half'>
                <AppTitle text={header} />
            </AppRow>
            <AppRow size='full' padding='lg'>
                <AppCarousel width={isMobile ? 75 : 45}>
                    {
                        items.map((e, index) =>
                            <AppPicture key={index} source={e.image} title={'Testimonio'} rounded={false} />)
                    }
                </AppCarousel>
            </AppRow>
            <AppRow size='separator' />
            <AppFooter {...state.footer} />
        </AppView>
    );
}