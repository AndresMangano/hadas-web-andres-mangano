import { AppStateData } from "./app.state";
import { DynamicTextPart } from "./dynamic.types";

export type Action =
| { _type: 'DATA_LOADED', data: AppStateData }
| { _type: 'START_ADMIN_MODE' }
| { _type: 'CHANGE_SITE', body: SiteChangeAction };

export type SiteChangeAction =
| { _type: 'ADD_TEXT', section: string|undefined, part: DynamicTextPart }
| { _type: 'UPDATE_TEXT', section: string|undefined, index: number, text: string }
| { _type: 'UPDATE_TEXT_LINK', section: string|undefined, index:number, link: string }
| { _type: 'REMOVE_TEXT', section: string|undefined, index: number }
| { _type: 'CHANGE_STRING', section: string|undefined, value: string }
| { _type: 'CHANGE_LINK', section: string|undefined, url: string }
| { _type: 'CHANGE_VIDEO', section: string|undefined, file: File }
| { _type: 'CHANGE_IMAGE', section: string|undefined, file: File }
| { _type: 'CHANGE_YOUTUBE_VIDEO', section: string|undefined, link: string }
| { _type: 'ADD_SECTION', section: string|undefined }
| { _type: 'REMOVE_SECTION', section: string|undefined, index: number }