import { default as Transport, TransportStreamOptions } from 'winston-transport';
import { EventParams, PageviewParams } from 'universal-analytics';
export declare type GoogleAnalyticsConstructorParams = TransportStreamOptions & {
    accountID: string;
};
export declare type GoogleAnalyticsLogParams = EventParams | PageviewParams;
export declare class GoogleAnalytics extends Transport {
    private visitor;
    constructor(params: GoogleAnalyticsConstructorParams);
    log(info: any, callback: (_: any, __: boolean) => void): Promise<void>;
    private sendPageview;
    private sendEvent;
    private isEventParams;
    private isPageviewParams;
}
