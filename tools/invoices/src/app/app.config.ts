import { ApplicationConfig, provideBrowserGlobalErrorListeners, signal } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { PLATFORM_CONTEXT, PlatformContext } from '@poc/platform-sdk';
import { routes } from './tool.routes';

/** Stand-in for the shell, so the team can develop the tool in isolation. */
const devPlatformContext: PlatformContext = {
  user: signal({ id: 'dev', name: 'Local Developer' }),
  workspace: signal({ id: 'dev', label: 'Standalone', businessArea: 'Local' }),
  notify: (message) => alert(message),
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    { provide: PLATFORM_CONTEXT, useValue: devPlatformContext },
  ],
};
