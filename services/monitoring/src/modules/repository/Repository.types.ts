interface RequestBase {
    userId: string;
}

interface UrlData {
    url: string;
    interval: number;
}

interface UrlWithIdData extends UrlData {
    urlId: string
}


export interface RequestCreateRecord extends RequestBase {
    data: UrlData;
}

export interface RequestUpdateUrl extends RequestBase {
    data: UrlWithIdData;
}

export interface RequestDeleteUrl extends RequestBase {
    data: Pick<UrlWithIdData, 'urlId'>;
}

export interface RequestDeleteRecord extends RequestBase {}
