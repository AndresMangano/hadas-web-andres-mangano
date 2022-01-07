import { Action } from "./app.action";
import { AppState } from "./app.state";

export function reducer(state: AppState, action: Action): AppState {
    console.log(action);
    switch (action._type) {
        case 'DATA_LOADED': return { ...state, data: action.data};
        case 'START_ADMIN_MODE': return { ...state, admin: true };
        case 'CHANGE_SITE':
            let body = action.body;
            let nextState = {...state};
            let s = getSection(nextState.data, body.section);
            switch (body._type) {
                case 'ADD_TEXT':
                    Object.assign(s, { ...s, parts: [...s.parts, body.part]});
                    return nextState;
                case 'REMOVE_TEXT':
                    s.parts.splice(body.index, 1);
                    return nextState;
                case 'UPDATE_TEXT':
                    s.parts[body.index].text = body.text;
                    return nextState;
                case 'UPDATE_TEXT_LINK':
                    s.parts[body.index].link = body.link;
                    return nextState;
                case 'CHANGE_STRING':
                    s.value = body.value;
                    return nextState;
                case 'CHANGE_IMAGE':
                    s.link = body.file.name;
                    return { ...nextState, newResources: [...nextState.newResources, body.file]}
                case 'CHANGE_LINK':
                    s.url = body.url;
                    return nextState;
                case 'CHANGE_VIDEO':
                    s.link = body.file.name;
                    return { ...nextState, newResources: [...nextState.newResources, body.file]}
                case 'CHANGE_YOUTUBE_VIDEO':
                    s.link = body.link;
                    return nextState;
                case 'ADD_SECTION':
                    s.push(JSON.parse(JSON.stringify(s[0])));
                    return nextState;
                case 'REMOVE_SECTION':
                    if (s.length > 1) {
                        s.splice(body.index, 1);
                    }
                    return nextState;
            }
    }
}

export function getSection(sectionsData: any, section: string | undefined): any {
    if (section === undefined || section === '') {
        return sectionsData;
    } else {
        let parts = section.split('.');
        if (parts.length === 1) {
            return sectionsData[parts[0]];
        } else {
            return getSection(sectionsData[parts[0]], parts.slice(1).join('.'));
        }
    }
}