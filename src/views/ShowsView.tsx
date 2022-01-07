import React, { useReducer } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppCarousel } from '../controls/AppCarousel';
import { AppCircularItem } from '../controls/AppCircularItem';
import { AppColumn } from '../controls/AppColumn';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppMediaModal } from '../controls/AppMediaModal';
import { AppPicture } from '../controls/AppPicture';
import { AppRow } from '../controls/AppRow';
import { AppText } from '../controls/AppText';
import { AppTitle } from '../controls/AppTitle';
import { AppView } from '../controls/AppView';
import { AppYoutube } from '../controls/AppYoutubeVideo';
import { AppStateData } from '../state/app.state';
import { MediaLink } from '../state/dynamic.types';

type ShowsViewProps = {
    state: AppStateData;
} & RouteComponentProps;
export function ShowsView({state}: ShowsViewProps) {
    const {
        header,
        title,
        items
    } = state.shows;
    const isMobile = document.documentElement.clientWidth <= 992;
    const [{modal}, dispatch] = useReducer (reducer, {
        modal: {
            visible: false,
            media: []
        }
    });

    function handleOpenModal(index: number, media: MediaLink[]) {
        dispatch({ _type: 'OPEN_MODAL_VIDEO', media });
    }

    function handleCloseModal() {
        dispatch({ _type: 'CLOSE_MODAL' });
    }
    
    return (
        <AppView>
            <AppHeader {...state.header} />
            <AppRow size='half'>
                <AppTitle text={header} />
            </AppRow>
            <AppRow size='half'>
                <AppText fontSize='md' text={title} />
            </AppRow>
            {
                items.map((e, index) =>
                    <AppRow key={index} size='half' reverse={index % 2 === 1}>
                        <AppColumn>
                            <h3>
                                <AppText fontSize='md' animated={300} text={e.text.title} />
                            </h3>
                            <AppText fontSize='md' animated={300} text={e.text.body} />
                        </AppColumn>
                        <AppColumn>
                            <AppCircularItem image={e.image} onClick={() => handleOpenModal(index, e.media)} />
                        </AppColumn>
                    </AppRow>)
            }
            <AppMediaModal visible={modal.visible} onClose={handleCloseModal}>
                <AppCarousel width={isMobile ? 75 : 50} widthUnit='vw' arrow='light'>
                {
                    modal.media.map((e, index) =>
                        <div key={index}>
                            { e._type === 'YOUTUBE' && <AppYoutube video={e} />}
                            { e._type === 'IMAGE' && <AppPicture source={e} title='Image' rounded={false} /> }
                        </div>)
                }
                </AppCarousel>
            </AppMediaModal>
            <AppFooter {...state.footer} />
        </AppView>
    );
}

type State = {
    modal: {
        visible: boolean;
        media: MediaLink[];
    }
}
type Action =
| { _type: 'OPEN_MODAL_VIDEO', media: MediaLink[] }
| { _type: 'CLOSE_MODAL'}
function reducer(state: State, action: Action) : State {
    switch (action._type) {
        case 'OPEN_MODAL_VIDEO': return {...state, modal: {visible: true, media: action.media}};
        case 'CLOSE_MODAL': return {...state, modal: {...state.modal, visible: false }};
    }
}