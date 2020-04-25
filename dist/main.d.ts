import { default as Transport, TransportStreamOptions } from 'winston-transport';
import { EventParams, PageviewParams, VisitorOptions } from 'universal-analytics';
export declare type GoogleAnalyticsConstructorParams = TransportStreamOptions & VisitorOptions;
export declare type GoogleAnalyticsLogParams = {
    analytics: EventParams | PageviewParams;
};
export declare class GoogleAnalytics extends Transport {
    private visitor;
    constructor(params: GoogleAnalyticsConstructorParams);
    log(info: GoogleAnalyticsLogParams, callback: (_: any, __: boolean) => void): Promise<void>;
    private sendPageview;
    private sendEvent;
    private isEventParams;
    private isPageviewParams;
}
