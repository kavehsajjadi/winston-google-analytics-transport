import * as path from 'path';
import { SPLAT } from 'triple-beam';
import {
  default as Transport,
  TransportStreamOptions,
} from 'winston-transport';
import {
  default as ua,
  EventParams,
  PageviewParams,
  Visitor,
  VisitorOptions,
} from 'universal-analytics';
export type GoogleAnalyticsConstructorParams = TransportStreamOptions & {
  accountID: string;
  clientID?: string;
};
export type GoogleAnalyticsLogParams = EventParams | PageviewParams;

export class GoogleAnalytics extends Transport {
  private visitor: Visitor;

  constructor(params: GoogleAnalyticsConstructorParams) {
    super(params);
    if (params.clientID) {
      this.visitor = ua(params.accountID, params.clientID, {
        strictCidFormat: false,
      });
    } else {
      this.visitor = ua(params.accountID);
    }
  }

  // the callback is not documented in winston
  async log(info: any, callback: (_?: any, __?: boolean) => void) {
    const { label, message, ...meta } = info;

    if (!meta || !meta[SPLAT]) {
      this.emit('finish');
      callback(null);
      return;
    }

    const [_, params] = meta[SPLAT];

    if (!params) {
      this.emit('finish');
      callback(null);
      return;
    }

    if (this.isEventParams(params)) {
      try {
        await this.visitor.event(params).send();
        return callback(null, true);
      } catch (e) {
        this.emit('error');
        callback(null, false);
      }
    }

    if (this.isPageviewParams(params)) {
      try {
        await this.visitor.pageview(params);
        return callback(null, true);
      } catch (e) {
        this.emit('error');
        callback(null, false);
      }
    }

    this.emit('error', 'nothing passed');
    return callback(null, false);
  }

  private isEventParams(params: any): params is EventParams {
    return params.ec && params.ea;
  }

  private isPageviewParams(params: any): params is PageviewParams {
    return params.dp && params.dh;
  }
}
