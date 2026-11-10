import { InjectionToken, Signal } from '@angular/core';

/**
 * The contract between the shell and every tool.
 *
 * The shell provides an implementation; tools only depend on this interface.
 * This package is shared as a federation singleton, so the token instance is
 * the same object in the shell and in every remote.
 */
export interface PlatformUser {
  id: string;
  name: string;
}

export interface WorkspaceInfo {
  id: string;
  label: string;
  businessArea: string;
}

export interface PlatformContext {
  readonly user: Signal<PlatformUser>;
  readonly workspace: Signal<WorkspaceInfo | null>;
  notify(message: string): void;
}

export const PLATFORM_CONTEXT = new InjectionToken<PlatformContext>('PLATFORM_CONTEXT');

/** What a tool's remote must expose as `./routes`. */
export const TOOL_ROUTES_EXPOSE = './routes';

export const SDK_VERSION = '1.0.0';
