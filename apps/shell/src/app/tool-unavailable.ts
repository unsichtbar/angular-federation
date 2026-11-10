import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tool-unavailable',
  template: `
    <div class="box">
      <h2>This tool is unavailable</h2>
      <p>The shell could not load <code>{{ remoteEntry() }}</code>. Other tools are unaffected.</p>
    </div>
  `,
  styles: `.box { padding: 1.5rem; border: 1px solid #fecaca; background: #fef2f2; border-radius: 8px; color: #991b1b; }`,
})
export class ToolUnavailable {
  readonly remoteEntry = input<string>();
}
