/* eslint-disable cypress/no-unnecessary-waiting */
describe('Google login and get token', () => {
	it('login and get token', () => {
		cy.visit('https://localhost');

		cy.origin('https://accounts.google.com/', () => {
			// eslint-disable-next-line no-unused-vars
			Cypress.on('uncaught:exception', (err) => false);
			cy.get('input[type="email"]').type(Cypress.env('GOOGLE_ACCOUNT_ID'));
			cy.contains(Cypress.env('IS_CI') ? 'Next' : '次へ').click();

			cy.wait(10000);

			cy.get('#password input').type(Cypress.env('GOOGLE_ACCOUNT_PASSWORD'));
			cy.contains(Cypress.env('IS_CI') ? 'Next' : '次へ').click();
		});

		cy.wait(10000);

		cy.request('https://localhost/auth/token').as('authTokenRequest');
		cy.get('@authTokenRequest').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.token).to.not.eq(null);
			cy.writeFile('__tests__/token.json', { token: response.body.token });
		});
	});
});
