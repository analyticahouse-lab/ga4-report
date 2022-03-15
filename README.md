## GA Realtime and Reporting API

## Installed GA4 Account ID's

- 277788968 - AnalyticaHouse GA4

## Development

- Clone `git clone github.com/analyticahouse/ga4-report`
- Insall packgages and run
  `yarn && yarn dev`

## Usage

This project temporarily doesn't support oAuth, because of cache-control and verified callback domains.

So you should add to service account email to each GA4 Account, manually.

- Go to your GA4 Account > Admin > Property Access Management
- Click Plus (+), add this email as a new user 👇

`starting-account-s81d1ngszc9q@quickstart-1647295587436.iam.gserviceaccount.com`

- And paste your GA4 property ID to this app.

## Resources

- [Dimension and metrics mapping](https://developers.google.com/analytics/devguides/migration/api/reporting-ua-to-ga4-dims-mets)
- [API Schema](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)
- [DATA API (Beta)](https://developers.google.com/analytics/devguides/reporting/data/v1)
