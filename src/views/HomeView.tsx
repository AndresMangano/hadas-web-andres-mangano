import React, { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppTopVideo } from '../controls/AppTopVideo';
import { AppView } from '../controls/AppView';
import { AppRow } from '../controls/AppRow';
import { AppText } from '../controls/AppText';
import { AppColumn } from '../controls/AppColumn';
import { RouteComponentProps } from 'react-router-dom';
import { AppStateData } from '../state/app.state';

type HomeViewProps = {
    state: AppStateData;
} & RouteComponentProps;
export function HomeView({state}: HomeViewProps) {
    const {
        video,
        title,
        text
    } = state.inicio;

    useEffect(() => ReactPixel.trackCustom('inicio'), []);
    
    return  (
        <AppView>
            <AppHeader {...state.header} />
            <AppTopVideo video={video.source} background={video.image} />
            <AppRow size='half' padding='lg'>
                <AppColumn>
                    <AppText fontSize='lg' text={title} />
                    <AppText fontSize='md' animated={100} text={text} />
                </AppColumn>
            </AppRow>
            <AppFooter {...state.footer} />
        </AppView>
    );
}