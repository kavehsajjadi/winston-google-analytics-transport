"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_transport_1 = tslib_1.__importDefault(require("winston-transport"));
const universal_analytics_1 = require("universal-analytics");
class GoogleAnalytics extends winston_transport_1.default {
    constructor(params) {
        super(params);
        this.visitor = new universal_analytics_1.Visitor(params);
    }
    log(info, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const params = info.analytics;
            if (this.isEventParams(params)) {
                yield this.sendEvent(params);
                return callback(null, true);
            }
            if (this.isPageviewParams(params)) {
                yield this.sendPageview(params);
                return callback(null, true);
            }
            return callback(null, false);
        });
    }
    sendPageview(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.visitor.pageview(params);
        });
    }
    sendEvent(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.visitor.event(params);
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