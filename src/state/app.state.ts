import { UrlLink, ImageLink, DynamicText, VideoLink, SimpleText, MediaLink, YoutubeLink } from "./dynamic.types";

export type AppState = {
    admin: boolean;
    newResources: File[];
    data: AppStateData|undefined;
}
export type AppStateData = {
    header: {
        logo: ImageLink;
        social: {
            instagram: UrlLink;
            facebook: UrlLink;
            whatsapp: UrlLink;
        }
        labels: {
            inicio: SimpleText;
            shows: SimpleText;
            salas: SimpleText;
            clases: SimpleText;
            profes: SimpleText;
            alumnos: SimpleText;
            fotos: SimpleText;
            contacto: SimpleText;
        },
        image: ImageLink;
    }
    footer: {
        logo: ImageLink;
        background: ImageLink;
        address: {
            tel: SimpleText;
            email: SimpleText;
            address1: SimpleText;
        };
    }
    inicio: {
        title: DynamicText;
        video: {
            image: ImageLink;
            source: VideoLink;
        }
        text: DynamicText;
    }
    shows: {
        header: SimpleText;
        title: DynamicText;
        items: {
            image: ImageLink;
            media: MediaLink[];
            text: {
                title: DynamicText;
                body: DynamicText;
            };
        }[]
    }
    salas: {
        header: SimpleText;
        title: DynamicText;
        items: {
            image: ImageLink;
            text: {
                title: DynamicText;
                items: SimpleText[];
            };
        }[]
        bottom: {
            title: DynamicText;
            body: DynamicText;
        }
    },
    fotos: {
        header: SimpleText;
        images: ImageLink[];
    },
    clases: {
        header: SimpleText;
        title: DynamicText;
        groups: {
            name: SimpleText;
            classes: {
                image: ImageLink;
                name: SimpleText;
                text: DynamicText;
                video: YoutubeLink;
                detail: DynamicText;
            }[]
        }[]
    }
    profes: {
        header: SimpleText;
        classes: SimpleText;
        coaches: {
            name: SimpleText;
            image: ImageLink;
            header: {
                image: ImageLink;
                title: SimpleText;
            }
            title: DynamicText;
            stories: {
                image: ImageLink;
                text: DynamicText;
            }[],
            bottom: {
                text: DynamicText;
            }[]
        }[]
    }
    alumnos: {
        header: SimpleText;
        items: {
            image: ImageLink;
        }[] 
    }
    contacto: {
        header: SimpleText;
        main: {
            text: DynamicText;
            bottomText: DynamicText;
        }
        form: {
            title: SimpleText;
        }
        address: UrlLink;
        instagram: UrlLink;
        facebook: UrlLink;
        governmentLogo: ImageLink;
    }
}