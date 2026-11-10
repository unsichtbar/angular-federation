import { Component, inject } from '@angular/core';
import { PLATFORM_CONTEXT } from '@poc/platform-sdk';
import { TOOL_VERSION } from './version';

@Component({
  selector: 'tool-home',
  template: `
    <h1>__TITLE__ <small>v{{ version }}</small></h1>
    <p>Hello {{ platform.user().name }}, you are in {{ platform.workspace()?.label }}.</p>
  `,
})
export class Home {
  protected readonly platform = inject(PLATFORM_CONTEXT);
  protected readonly version = TOOL_VERSION;
}
