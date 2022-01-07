import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppButton } from '../controls/AppButton';
import { AppButtonList } from '../controls/AppButtonList';
import { AppColumn } from '../controls/AppColumn';
import { AppFooter } from '../controls/AppFooter';
import { AppHeader } from '../controls/AppHeader';
import { AppHighlightedText } from '../controls/AppHighlightedText';
import { AppPicture } from '../controls/AppPicture';
import { AppRow } from '../controls/AppRow';
import { AppText } from '../controls/AppText';
import { AppTextEditor } from '../controls/AppTextEditor';
import { AppTitle } from '../controls/AppTitle';
import { AppView } from '../controls/AppView';
import { AppYoutube } from '../controls/AppYoutubeVideo';
import { useFirebase } from '../services/firebase.service';
import { Action, SiteChangeAction } from '../state/app.action';
import { getSection } from '../state/app.reducer';
import { AppStateData } from '../state/app.state';

type AdministrationViewProps = {
    admin: boolean;
    state: AppStateData;
    dispatch: React.Dispatch<Action>;
} & RouteComponentProps<{section: string|undefined}>;
export function AdministrationView({admin, state, dispatch, match, history}: AdministrationViewProps) {
    const firebaseService = useFirebase();
    const { section } = match.params;
    const sectionData = getSection(state, section);

    function login() {
        firebaseService.login()
            .then(() => dispatch({ _type: 'START_ADMIN_MODE' }))
    }

    function dispatchSiteChange(action: SiteChangeAction) {
        dispatch({ _type: 'CHANGE_SITE', body: action });
    }

    return (
        <AppView>
            <AppHeader {...state.header} />
            <AppRow size='half'>
                <AppTitle text={{_type: 'STRING', value: 'ADMINISTRACIÓN'}} />
            </AppRow>
            <AppRow>
                <AppColumn>
                    <AppButton onClick={login}>Login</AppButton>
                </AppColumn>
            </AppRow>
            {
                admin &&
                    <>
                        <AppRow align='flex-start' wrap={false}>
                            <AppColumn >
                                <AppButtonList>
                                    {
                                        Object.keys(sectionData).filter(k => sectionData[k]['_type'] === undefined).map((e, index) =>
                                            <div key={index}>
                                                <Link key={index} to={`/admin/${section !== undefined ? `${section}.${e}` : e}`}>{sectionData[e]?.name?.value || e}</Link>
                                                {
                                                    (sectionData instanceof Array && sectionData.length > 1) &&
                                                        <button
                                                            style={{color: 'white', background: 'none', border: 'none'}}
                                                            onClick={() => dispatchSiteChange({ _type: 'REMOVE_SECTION', section, index })}>
                                                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                                        </button>
                                                }
                                            </div>)
                                    }
                                    {
                                        sectionData instanceof Array
                                            ?   <AppButton onClick={() => dispatchSiteChange({ _type: 'ADD_SECTION', section })}>Agregar</AppButton>
                                            :   []
                                    }
                                </AppButtonList>
                            </AppColumn>
                            <AppColumn grow={3} align='stretch'>
                                <AppRow size='quarter'>
                                    <AppText fontSize='lg' text={{ _type: 'STRING', value: section?.toUpperCase().replace(/[.]/g, '/') || '' }} />
                                </AppRow>
                                { Object.keys(sectionData)
                                    .filter(k => sectionData[k]._type !== undefined)
                                    .map((e, index) => {
                                        let item = sectionData[e];
                                        let actual = `${section}.${e}`;
                                        return (<AppRow key={index}>
                                            <AppColumn shadow>
                                                <h3 style={{textTransform: "uppercase"}}><AppHighlightedText color='primary' fontSize='md'>{e}</AppHighlightedText></h3>
                                                <AppRow>
                                                    <AppColumn>
                                                    {
                                                        item._type === 'STRING'
                                                            ?   <AppText fontSize='sm' text={item} />
                                                        : (item._type === 'TEXT' && item.parts !== undefined)
                                                            ?   <AppText fontSize='sm' text={item} />
                                                        : item._type === 'LINK'
                                                            ?   <span style={{wordBreak: 'break-word'}}>{item.url}</span>
                                                        : item._type === 'IMAGE'
                                                            ?   <AppPicture source={item} title='image' />
                                                        : item._type === 'YOUTUBE'
                                                            ?   <AppYoutube video={item} />
                                                        : item._type === 'VIDEO'
                                                            ?   <span>Video: {item.link}</span>
                                                            :   <></>
                                                    }
                                                    </AppColumn>
                                                    <AppColumn align='stretch'>
                                                    {
                                                        item._type === 'STRING'
                                                            ?   <input placeholder={e} value={item.value} onChange={event => dispatchSiteChange({ _type: 'CHANGE_STRING', section: actual, value: event.currentTarget.value })} />
                                                        : (item._type === 'TEXT' && item.parts !== undefined)
                                                            ?   <AppTextEditor
                                                                    text={item}
                                                                    onAdd={part => dispatchSiteChange({ _type: 'ADD_TEXT', section: actual, part })}
                                                                    onChange={(index, text) => dispatchSiteChange({ _type: 'UPDATE_TEXT', section: actual, index, text })}
                                                                    onChangeLink={(index, link) => dispatchSiteChange({ _type: 'UPDATE_TEXT_LINK', section: actual, index, link })}
                                                                    onRemove={index => dispatchSiteChange({ _type: 'REMOVE_TEXT', section: actual, index })}
                                                                />
                                                        : item._type === 'LINK'
                                                            ?   <input placeholder={e} value={item.url} onChange={event => dispatchSiteChange({ _type: 'CHANGE_LINK', section: actual, url: event.currentTarget.value })} />
                                                        : item._type === 'VIDEO'
                                                            ?   <input type='file' accept='.mp4' placeholder={e} onChange={event => {
                                                                    let file = event.currentTarget.files?.[0];
                                                                    if (file !== undefined) {
                                                                        firebaseService.addCache(file);
                                                                        dispatchSiteChange({ _type: 'CHANGE_VIDEO', section: actual, file });
                                                                    }
                                                                }} />
                                                        : item._type === 'IMAGE'
                                                            ?   <input type='file' accept='.jpg,.png' placeholder={e} onChange={event => {
                                                                    let file = event.currentTarget.files?.[0];
                                                                    if (file !== undefined) {
                                                                        firebaseService.addCache(file);
                                                                        dispatchSiteChange({ _type: 'CHANGE_IMAGE', section: actual, file })
                                                                    }
                                                                }} />
                                                        : item._type === 'YOUTUBE'
                                                            ?   <input placeholder={e} value={item.link} onChange={event => dispatchSiteChange({ _type: 'CHANGE_YOUTUBE_VIDEO', section: actual, link: event.currentTarget.value })} />
                                                        :   <></>
                                                    }
                                                    </AppColumn>
                                                </AppRow>
                                            </AppColumn>
                                        </AppRow>)
                                    }
                                )}
                            </AppColumn>
                            <AppColumn />
                        </AppRow>
                    </>
            }
            <AppFooter {...state.footer} />
        </AppView>
    );
}