import { Injectable, signal } from '@angular/core';
import { PlatformContext, PlatformUser, WorkspaceInfo } from '@poc/platform-sdk';

export interface Toast {
  id: number;
  message: string;
}

/** The shell's implementation of the contract every tool depends on. */
@Injectable({ providedIn: 'root' })
export class ShellPlatformContext implements PlatformContext {
  readonly user = signal<PlatformUser>({ id: 'u-1', name: 'Alex Example' }).asReadonly();
  readonly workspace = signal<WorkspaceInfo | null>(null);
  readonly toasts = signal<Toast[]>([]);
  private nextId = 0;

  notify(message: string): void {
    const toast = { id: this.nextId++, message };
    this.toasts.update((t) => [...t, toast]);
    setTimeout(() => this.toasts.update((t) => t.filter((x) => x !== toast)), 4000);
  }
}
