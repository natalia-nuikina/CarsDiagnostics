// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { VitePWA } from 'vite-plugin-pwa'
// // import vueDevTools from 'vite-plugin-vue-devtools'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       injectRegister: 'auto',
//       workbox: {
//         cleanupOutdatedCaches: false
//       },
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     },
//   },
//   base: '/',
// })
import process from 'node:process';
import replace from '@rollup/plugin-replace';
import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

const pwaAssets = process.env.PWA_ASSETS === 'true';

const pwaOptions = {
	mode: 'development',
	base: '/',
	includeAssets: ['favicon.svg'],
	manifest: {
		name: 'Cars Diagnostics',
		short_name: 'Cars Diagnostics',
		theme_color: '#0f0f0f',
		icons: [
			{
				src: 'pwa-192x192.png', // <== don't add slash, for testing
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/pwa-512x512.png', // <== don't remove slash, for testing
				sizes: '512x512',
				type: 'image/png',
			},
			{
				src: 'pwa-512x512.png', // <== don't add slash, for testing
				sizes: '512x512',
				type: 'image/png',
				purpose: ['any', 'maskable'], // testing new type declaration
			},
		],
	},
	// showMaximumFileSizeToCacheInBytesWarning: true,
	// workbox: {
	//   maximumFileSizeToCacheInBytes: 12000,
	// },
	devOptions: {
		enabled: process.env.SW_DEV === 'true',
		/* when using generateSW the PWA plugin will switch to classic */
		type: 'module',
		navigateFallback: 'index.html',
		suppressWarnings: true,
	},
};

if (pwaAssets) {
	pwaOptions.pwaAssets = {
		preset: 'minimal-2023',
		overrideManifestIcons: true,
	};
}

const claims = process.env.CLAIMS === 'true';
const selfDestroying = process.env.SW_DESTROY === 'true';

function virtualMessagePlugin() {
	const virtual = 'virtual:message';
	const resolvedVirtual = `\0${virtual}`;
	return {
		name: 'vite-plugin-test',
		resolveId(id) {
			return id === virtual ? resolvedVirtual : null;
		},
		load(id) {
			if (id === resolvedVirtual)
				return `export const message = 'Message from Virtual Module Plugin'`;
		},
	};
}

if (process.env.SW === 'true') {
	pwaOptions.srcDir = 'src';
	pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
	pwaOptions.strategies = 'injectManifest'
	;(pwaOptions.manifest).name = 'PWA Inject Manifest'
	;(pwaOptions.manifest).short_name = 'PWA Inject';
	pwaOptions.injectManifest = {
		minify: false,
		enableWorkboxModulesLogs: true,
		buildPlugins: {
			vite: [virtualMessagePlugin()],
		},
		// maximumFileSizeToCacheInBytes: 1000,
	};
}

if (claims)
	pwaOptions.registerType = 'autoUpdate';

if (selfDestroying)
	pwaOptions.selfDestroying = selfDestroying;

export default defineConfig({
	// base: process.env.BASE_URL || 'https://github.com/',
	build: {
		sourcemap: process.env.SOURCE_MAP === 'true',
	},
	plugins: [
		Vue(),
		eslint(),
		virtualMessagePlugin(),
		VitePWA(pwaOptions),
		replace({
			__DATE__: new Date().toISOString(),
			__RELOAD_SW__: process.env.RELOAD_SW === 'true' ? 'true' : 'false',
		}),
	],
});
