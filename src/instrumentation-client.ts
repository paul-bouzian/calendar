import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	environment: process.env.NODE_ENV,

	tracesSampleRate: 0.1,
	replaysSessionSampleRate: 0.05,
	replaysOnErrorSampleRate: 1.0,

	integrations: [
		Sentry.replayIntegration({
			maskAllText: true,
			blockAllMedia: true,
		}),
	],

	beforeSend(event) {
		if (event.request?.headers) {
			delete event.request.headers["Authorization"];
		}
		return event;
	},
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
