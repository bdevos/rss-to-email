# RSS to Email

Scheduled RSS to Email with Github Actions

## Getting started

1. [Fork](../../fork) this repository
2. Update [feeds.ts](src/feeds.ts) to your favorite RSS feed(s)
3. Update the [cron schedule](.github/workflows/send-email.yaml#L5) in the workflow file
4. Add the following [variables](../../settings/variables/actions) in settings:
   - SMTP_SERVER
   - SMTP_PORT
5. Add the following [secrets](../../settings/secrets/actions) in settings:
   - MAIL_PASSWORD
   - MAIL_TO
   - MAIL_USERNAME
6. Done 💪

If you want to view and modify the email that will be send, there is a local dev server. To try it:

```bash
npm install
npm run dev
```

## Pro and cons

🔥 bla

💩 bla
