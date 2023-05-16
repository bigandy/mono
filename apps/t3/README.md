# T3 Strava Tauri App

## TODO:

### Grabbing Data from Strava

- [x] Save all available data from Strava to the DB. In the short-term this can be 100 activities or similar
- [ ] Have ability to regularly sync this data to the DB. Every 4 hours or so?
- [ ] Have ability to press a button to sync the data

### Update Strava activities from this app

#### Single Activity

- [ ] edit one activity in Strava (editable fields should only be name/comments/type)
- [ ] editing this one activity should also update the local DB (should it be DB first or Strava API first?)
- [ ] optimistic update so the UI feels super quick
- [ ] on success show success toast
- [ ] if error, show error toast, and roll back the UI change

#### Multiple Activities

- [ ] do above but for multiple activities (e.g. bulk conversion from Run => Walk, for example)

### Show Strava Data in UI

#### Strava Table

- [ ] Strava Table with customisable columns (show/hide)
- [ ] pagination
- [ ] column sorting
- [ ] filtering e.g. by 'type'

#### Strava "Feed"

- [ ] show a feed of all the activities from the DB
- [ ] name / hr / speed ... etc
- [ ] filtering e.g. by 'type'

---

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
