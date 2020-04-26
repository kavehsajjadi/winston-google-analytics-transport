import * as path from 'path';
import { SPLAT } from 'triple-beam';
import { default as Transport, TransportStreamOptions } from 'winston-transport';
import { default as ua, EventParams, PageviewParams, Visitor, VisitorOptions } from 'universal-analytics';
export type GoogleAnalyticsConstructorParams = TransportStreamOptions & { accountID: string; clientID?: string };
export type GoogleAnalyticsLogParams = EventParams | PageviewParams;

export class GoogleAnalytics extends Transport {
  private visitor: Visitor;

  constructor(params: GoogleAnalyticsConstructorParams) {
    super(params);
    if (params.clientID) {
      this.visitor = ua(params.accountID, params.clientID, { strictCidFormat: false });
    } else {
      this.visitor = ua(params.accountID);
    }
  }

  async log(info: any, callback: (_: any, __: boolean) => void) {
    // we only care if an object with the shape { analytics: GoogleAnalyticsLogParams } is passed in
    const { label, message, ...meta } = info;

    const [_, params] = meta[SPLAT];

    if (!params) {
      this.emit('warn', 'no params');
      return;
    }

    if (this.isEventParams(params)) {
      await this.sendEvent(params);
      return callback(null, true);
    }

    if (this.isPageviewParams(params)) {
      await this.sendPageview(params);
      return callback(null, true);
    }

    this.emit('error', 'nothing passed');
    return callback(null, false);
  }

  private async sendPageview(params: PageviewParams) {
    await this.visitor.pageview(params).send();
    this.emit('logged', params);
  }

  private async sendEvent(params: EventParams) {
    await this.visitor.event(params).send();
    this.emit('logged', params);
  }

  private isEventParams(params: any): params is EventParams {
    return params.ec && params.ea;
  }

  private isPageviewParams(params: any): params is PageviewParams {
    return params.dp && params.dh;
  }
}
