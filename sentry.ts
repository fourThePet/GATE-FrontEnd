import * as Sentry from "@sentry/react";
import { useEffect } from "react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import { version } from "./package.json";

export const initSentry = () => {
  Sentry.init({
    dsn: "https://7da43d636a7621ad4879b5c7cd6e48fd@o4508461570260992.ingest.us.sentry.io/4508461573013504",
    ignoreErrors: [/AxiosError/i],

    release: version,
    environment: "production",
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
      "localhost",
      /^https:\/\/(abcdedu\.com|www\.abcdedu\.com)$/,
    ],
  });
};
