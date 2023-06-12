import 'dotenv/config.js';
import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: 'x2ho7v',
	pageLoadTimeout: 75000, // 70s
	defaultCommandTimeout: 65000, // 65s
	env: {
		IS_CI: process.env.IS_CI,
		GOOGLE_ACCOUNT_ID: process.env.GOOGLE_ACCOUNT_ID,
		GOOGLE_ACCOUNT_PASSWORD: process.env.GOOGLE_ACCOUNT_PASSWORD
	},
	// https://docs.cypress.io/guides/references/configuration#e2e
	e2e: {
		supportFile: 'cypress/support/e2e.js',
		experimentalModifyObstructiveThirdPartyCode: true,
		specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,ts}'
		// setupNodeEvents(on, config) {
		// 	// implement node event listeners here
		// }
	},
	userAgent:
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.51 Safari/537.36'
});
