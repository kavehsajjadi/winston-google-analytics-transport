"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const triple_beam_1 = require("triple-beam");
const winston_transport_1 = tslib_1.__importDefault(require("winston-transport"));
const universal_analytics_1 = tslib_1.__importDefault(require("universal-analytics"));
class GoogleAnalytics extends winston_transport_1.default {
    constructor(params) {
        super(params);
        if (params.clientID) {
            this.visitor = universal_analytics_1.default(params.accountID, params.clientID, { strictCidFormat: false });
        }
        else {
            this.visitor = universal_analytics_1.default(params.accountID);
        }
    }
    log(info, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { label, message } = info, meta = tslib_1.__rest(info, ["label", "message"]);
            const [_, params] = meta[triple_beam_1.SPLAT];
            if (!params) {
                this.emit('warn', 'no params');
                return;
            }
            if (this.isEventParams(params)) {
                yield this.sendEvent(params);
                return callback(null, true);
            }
            if (this.isPageviewParams(params)) {
                yield this.sendPageview(params);
                return callback(null, true);
            }
            this.emit('warn', 'nothing passed');
            return callback(null, false);
        });
    }
    sendPageview(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.visitor.pageview(params).send();
            this.emit('logged', params);
        });
    }
    sendEvent(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.visitor.event(params).send();
            this.emit('logged', params);
        });
    }
    isEventParams(params) {
        return params.ec && params.ea;
    }
    isPageviewParams(params) {
        return params.dp && params.dh;
    }
}
exports.GoogleAnalytics = GoogleAnalytics;
//# sourceMappingURL=main.js.map