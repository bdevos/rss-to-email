# RSS to Email

Scheduled RSS to Email with Github Actions

## Getting started

1. [Fork](../../fork) this repository
2. Update [feeds.ts](src/feeds.ts) to your favorite RSS feed(s)
3. Update the [cron schedule](.github/workflows/send-email.yaml#L5) in the workflow file
4. Add the following [variables](../../settings/variables/actions) in settings:
   - `SMTP_SERVER` for example: smtp.fastmail.com
   - `SMTP_PORT` for example: 587
5. Add the following [secrets](../../settings/secrets/actions) in settings:
   - `MAIL_TO`
   - `SMTP_PASSWORD`
   - `SMTP_USERNAME`
6. Done :muscle:

| :warning: | the above variables and secrets can also be changed in the workflow, but be aware that if you forked this repo and it is still public that this could expose your smtp credentials! |
| :-------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

The project includes a local dev server to view and modify the email template based on your RSS feeds.

```bash
npm install
npm run dev
```

## Pro and cons

:fire: bla

:poop: bla
