import React, { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { RouteComponentProps } from 'react-router-dom';
import { AppCircularItem } from '../controls/AppCircularItem';
import { AppColumn } from '../controls/AppColumn';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppRow } from '../controls/AppRow';
import { AppText } from '../controls/AppText';
import { AppTitle } from '../controls/AppTitle';
import { AppView } from '../controls/AppView';
import { AppStateData } from '../state/app.state';

type ClassesViewProps = {
    state: AppStateData;
} & RouteComponentProps;
export function ClassesView({state, history}: ClassesViewProps) {
    const {
        header,
        title,
        groups
    } = state.clases;

    useEffect(() => ReactPixel.trackCustom('clases'), []);

    return (
        <AppView>
            <AppHeader {...state.header} />
            <AppRow size='half'>
                <AppTitle text={header} />
            </AppRow>
            <AppRow size="half">
                <AppColumn>
                    <AppText fontSize='md' text={title} />
                </AppColumn>
            </AppRow>
            {
                groups.map((group, gIndex) =>
                    <div key={gIndex}>
                        <AppRow size='quarter'>
                            <AppColumn>
                                <AppText fontSize='lg' text={group.name} />
                            </AppColumn>
                        </AppRow>
                        <AppRow>
                            {
                                group.classes.map((e, index) => 
                                    <AppColumn key={index} grow={3}>
                                        <AppCircularItem
                                            imageTitle={e.name}
                                            image={e.image}
                                            alignment={index %2 === 0
                                                ? 'top-right'
                                                : 'bottom-left'}
                                            onClick={() => history.push(`/clases/${gIndex}/${index}`)}
                                            size='xl'
                                        />
                                    </AppColumn>)
                            }
                        </AppRow>
                    </div>)
            }
            <AppFooter {...state.footer} />
        </AppView>
    );
}