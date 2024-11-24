# rsp.bot

[Latest Release](https://github.com/zmaillard/rsp.bot/releases/latest)

Bot (that will soon be) behind [@roadsign.pictures](https://bsky.app/profile/roadsign.pictures).  Built using [Bun](https://bun.sh) and on the nice foundation of [Skyware](https://skyware.js.org).

## Usage
- `!random` - Retreive a random road sign
- `!state <statename>` - Retreive a random road sign from the state/state equivalent specified.
- `!country <countryname>` - Retreive a random road sign from the country equivalent specified.  At this time only United States, Canada, Costa Rica and México are supported.

## Configuration

The following environment variables are needed to run the application:
|    Name     |     Purpose     |
|-------------|-----------------|
|BSKY_USERNAME|Handle of Bot that will respond|
|BSKY_PASSWORD|Password associated with the `BSKY_USERNAME` handle |
|AWS_ACCESS_KEY_ID | Account id with access to storage bucket |
|AWS_SECRET_ACCESS_KEY |  Secret key corresponding to `AWS_ACCESS_KEY_ID` |
|AWS_REGION | Region content is hoted in |
|AWS_ENDPOINT_URL |  Optional endpoint url |
|AUTO_POST_CRON_SCHEDULE |  Optional Crontab For Posting Random Signs |

## Local Development

Running Bot:
```bash
bun install
bun run run
```

Run Tests: `bun test`
