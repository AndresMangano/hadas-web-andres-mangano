import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppColumn } from '../controls/AppColumn';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppPicture } from '../controls/AppPicture';
import { AppRow } from '../controls/AppRow';
import { AppText } from '../controls/AppText';
import { AppTitle } from '../controls/AppTitle';
import { AppView } from '../controls/AppView';
import { AppYoutube } from '../controls/AppYoutubeVideo';
import { useScrollTop } from '../hooks/useScrollTop';
import { AppStateData } from '../state/app.state';

type ClassViewProps = {
    state: AppStateData;
} & RouteComponentProps<{group: string; class: string}>;
export function ClassView({state, match}: ClassViewProps) {
    useScrollTop();
    const {
        groups
    } = state.clases;
    const {
        video,
        name,
        image,
        text,
        detail
    } = groups[parseInt(match.params.group, 10)]
            .classes[parseInt(match.params.class, 10)];

    return (
        <AppView>
           <AppHeader {...state.header} back='/clases' />
            <AppRow size='half'>
                <AppTitle text={name} />
            </AppRow>
            <AppRow size='half' padding='lg'>
                <AppColumn grow={2}>
                {   video.link === ''
                        ? <AppPicture source={image} title={name.value} />
                        : <AppYoutube video={video} />
                }
                </AppColumn>
                <AppColumn>
                    <AppText fontSize='md' animated={300} text={text} />
                </AppColumn>
            </AppRow>
            {   detail.parts?.length > 0 &&
                <>
                    <AppRow size='auto' padding='sm'>
                        <AppText fontSize='sm' text={detail} />
                    </AppRow>
                    <AppRow size='separator' />
                    <AppFooter {...state.footer} />
                </>
            }
            <AppFooter {...state.footer} />
        </AppView>
    );
}