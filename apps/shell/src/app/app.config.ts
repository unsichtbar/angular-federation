import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { PLATFORM_CONTEXT } from '@poc/platform-sdk';
import { ShellPlatformContext } from './platform-context';
import { WorkspaceRegistry } from './registry';
import { buildRoutes } from './tool-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter([], withComponentInputBinding()),
    { provide: PLATFORM_CONTEXT, useExisting: ShellPlatformContext },
    provideAppInitializer(async () => {
      const router = inject(Router);
      const workspaces = await inject(WorkspaceRegistry).load();
      router.resetConfig(buildRoutes(workspaces));
    }),
  ],
};
