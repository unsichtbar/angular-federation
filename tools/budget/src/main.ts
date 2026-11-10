import { initFederation } from '@angular-architects/native-federation';

// Only used when the tool runs on its own (`pnpm start`). Inside the shell,
// the shell loads ./routes from remoteEntry.json and this file never runs.
initFederation({}, {
  hostRemoteEntry: { url: './remoteEntry.json' },
})
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
