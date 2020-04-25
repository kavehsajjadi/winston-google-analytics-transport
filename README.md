# winston-google-analytics-transport
Wraps `universal-analytics` and provides a bare minimum API to track events and pageviews.
This implementation is barebones, PRs welcomed and wanted :)

## 1. Install
`npm install winston-google-analytics-transport`

## 2. Configure
```
import { GoogleAnalytics } from 'winston-google-analytics-transport';

const gaTransport = new GoogleAnalytics({
  level: 'debug',
  accountID: GOOGLE_ANALYTICS_TRACKING_ID,
});

logger.add(gaTransport);
```

## 3. Track Analytics
Takes `params` that are either `EventParams` or `PageviewParams` from the `universal-analytics` lib.
Search [DefinitelyTyped/universal-analytics](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/universal-analytics/index.d.ts) for the type definitions.
```
const message: string = '';
const label: string = '';
const params: EventParams = {
  ec: '',
  ea '',
}
log.info(message, label, params);
```
