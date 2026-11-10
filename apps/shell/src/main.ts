import { initFederation } from '@angular-architects/native-federation';

// No remotes are known at build time. The shell reads registry.json at
// startup and loads each tool's remoteEntry.json on demand.
initFederation({}, {
  hostRemoteEntry: { url: './remoteEntry.json' },
})
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
