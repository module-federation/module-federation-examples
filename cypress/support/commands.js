/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email, password): Chainable<void>
//       drag(subject, options): Chainable<Element>
//       dismiss(subject, options): Chainable<Element>
//       visit(originalFn, url, options): Chainable<Element>
//     }
//   }
// }

require('cypress-fill-command');
require('cypress-real-events');
require('cypress-wait-until');

Cypress.Commands.add('skipWhen', function (condition) {
    if (condition) {
        this.skip()
    }
})