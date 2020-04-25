import { default as Transport, TransportStreamOptions } from 'winston-transport';
import { EventParams, PageviewParams, Visitor, VisitorOptions } from 'universal-analytics';

export type GoogleAnalyticsConstructorParams = TransportStreamOptions & VisitorOptions;
export type GoogleAnalyticsLogParams = { analytics: EventParams | PageviewParams };

export class GoogleAnalytics extends Transport {
  private visitor: Visitor;

  constructor(params: GoogleAnalyticsConstructorParams) {
    super(params);
    this.visitor = new Visitor(params);
  }

  async log(info: GoogleAnalyticsLogParams, callback: (_: any, __: boolean) => void) {
    const params = info.analytics;

    if (this.isEventParams(params)) {
      await this.sendEvent(params);
      return callback(null, true);
    }

    if (this.isPageviewParams(params)) {
      await this.sendPageview(params);
      return callback(null, true);
    }

    return callback(null, false);
  }

  private async sendPageview(params: PageviewParams) {
    this.visitor.pageview(params);
  }

  private async sendEvent(params: EventParams) {
    this.visitor.event(params);
  }

  private isEventParams(params: any): params is EventParams {
    return params.ec && params.ea;
  }

  private isPageviewParams(params: any): params is PageviewParams {
    return params.dp && params.dh;
  }
}
