import { GoogleAnalytics } from './main';

const GOOGLE_ANALYTICS_CLIENT_ID = 'local-dev-client';
const GOOGLE_ANALYTICS_TRACKING_ID = 'UA-36997921-1';

let logger: GoogleAnalytics;

describe('GoogleAnalytics', () => {
  beforeEach(() => {
    logger = new GoogleAnalytics({
      accountID: GOOGLE_ANALYTICS_TRACKING_ID,
      clientID: GOOGLE_ANALYTICS_CLIENT_ID,
    });
  });

  describe('log', () => {
    it('emits finished when no meta args are encountered', async () => {
      const onErrorCb = jest.fn(); 
      const logCb = jest.fn();
      logger.on('finish', onErrorCb);
      await logger.log({}, logCb);
      expect(onErrorCb).toHaveBeenCalledTimes(1);
      expect(logCb).toHaveBeenCalledTimes(1);
    });
  });
});
