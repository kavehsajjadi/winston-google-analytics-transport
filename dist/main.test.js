"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const main_1 = require("./main");
const GOOGLE_ANALYTICS_CLIENT_ID = 'local-dev-client';
const GOOGLE_ANALYTICS_TRACKING_ID = 'UA-36997921-1';
let logger;
describe('GoogleAnalytics', () => {
    beforeEach(() => {
        logger = new main_1.GoogleAnalytics({
            accountID: GOOGLE_ANALYTICS_TRACKING_ID,
            clientID: GOOGLE_ANALYTICS_CLIENT_ID,
        });
    });
    describe('log', () => {
        it('emits finished when no meta args are encountered', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const onErrorCb = jest.fn();
            const logCb = jest.fn();
            logger.on('finish', onErrorCb);
            yield logger.log({}, logCb);
            expect(onErrorCb).toHaveBeenCalledTimes(1);
            expect(logCb).toHaveBeenCalledTimes(1);
        }));
    });
});
//# sourceMappingURL=main.test.js.map