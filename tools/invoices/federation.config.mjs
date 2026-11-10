import {
  withNativeFederation,
  fromPackageJson,
} from '@angular-architects/native-federation/config';
import { resolveSharedVersions } from '../../federation.versions.mjs';

export default withNativeFederation({
  name: 'invoices',

  exposes: {
    './routes': './src/app/tool.routes.ts',
  },

  //shareScope: autoShareScope({level: 'minor'}),

  shared: resolveSharedVersions(fromPackageJson({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
    build: 'package',
  })
    .patch(['@angular/*'], { includeSecondaries: { keepAll: true } })
    .get()),

  //sharedMappings: mappingsFromWorkspace({ singleton: true }).filter(['@my-org/*']).get(),

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],

  // Please read our docs about configuring native federation:
  // https://native-federation.com/docs/v4/angular-adapter/configuration/

  features: {
    denseChunking: true,
    denseExternals: true,
    strictImports: false,
  },
});
