export type DynamicText = { _type: 'TEXT', parts: DynamicTextPart[]};
export type DynamicTextPart =
(| { _type: 'LINK_TEXT', size?: DynamicTextPartSize, color: DynamicTextPartColor, link: string, text: string}
| { _type: 'RAW_TEXT', text: string }
| { _type: 'STYLED_TEXT', size?: DynamicTextPartSize, color: DynamicTextPartColor, text: string }
| { _type: 'BREAK' });
export type SimpleText = { _type: 'STRING', value: string };
export type ImageLink = { _type: 'IMAGE', link: string };
export type VideoLink = { _type: 'VIDEO', link: string };
export type YoutubeLink = { _type: 'YOUTUBE', link: string };
export type MediaLink = ImageLink|YoutubeLink;
export type UrlLink = { _type: 'LINK', url: string };
export type DynamicTextPartType = 'LINK_TEXT'|'RAW_TEXT'|'STYLED_TEXT'|'BREAK';
export type DynamicTextPartSize = 'lg'|'md'|'sm';
export type DynamicTextPartColor = 'bold'|'default'|'primary'|'secondary'|'white';