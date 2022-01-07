import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppColumn } from '../controls/AppColumn';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppHighlightedText } from '../controls/AppHighlightedText';
import { AppPicture } from '../controls/AppPicture';
import { AppRow } from '../controls/AppRow';
import { AppText } from '../controls/AppText';
import { AppTitle } from '../controls/AppTitle';
import { AppView } from '../controls/AppView';
import { useScrollTop } from '../hooks/useScrollTop';
import { AppStateData } from '../state/app.state';

type CoachViewProps = {
    state: AppStateData;
} & RouteComponentProps<{coach: string}>;
export function CoachView({state, match}: CoachViewProps) {
    useScrollTop();
    const {
        name,
        header,
        title,
        stories,
        bottom
    } = state.profes.coaches[parseInt(match.params.coach, 10)];

    return (
        <AppView>
           <AppHeader {...state.header} back='/profes' />
            <AppRow size='half'>
                <AppTitle text={header.title} />
            </AppRow>
            <AppRow size='quarter'>
                <AppColumn>
                    <AppText fontSize='md' text={title} />
                </AppColumn>
            </AppRow>
            {
                stories.map((e, index) => 
                    <AppRow key={index} size='full' reverse={index % 2 === 1}>
                        <AppColumn>
                            <AppPicture source={e.image} title={name.value} />
                        </AppColumn>
                        <AppColumn>
                            <AppText fontSize='sm' animated={300} text={e.text} />
                        </AppColumn>
                    </AppRow>)
            }
            <AppRow size='auto'>
                {
                    bottom.map((e, index) =>
                        <AppColumn key={index}>
                            <AppText fontSize='sm' animated={300} text={e.text} />
                        </AppColumn>)
                }
            </AppRow>
            <AppRow size='half'>
                <AppColumn>
                    <Link to='/clases' onClick={() => window.scroll(0, 0)}>
                        <AppHighlightedText fontSize='md' color='secondary'>{state.profes.classes.value}</AppHighlightedText>
                    </Link>
                </AppColumn>
            </AppRow>
            <AppFooter {...state.footer} />
        </AppView>
    );
}
