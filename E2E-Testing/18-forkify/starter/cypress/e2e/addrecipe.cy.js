// cypress/integration/addRecipeView.spec.js

describe('Add Recipe View Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234'); // Adjust the URL to match your application's URL
  });

  it('should open and close the add recipe modal', () => {
    cy.get('.nav__btn--add-recipe').click();
    cy.get('.add-recipe-window').should('not.have.class', 'hidden');
    cy.get('.overlay').should('not.have.class', 'hidden');
    cy.get('.btn--close-modal').click();
    cy.get('.add-recipe-window').should('have.class', 'hidden');
    cy.get('.overlay').should('have.class', 'hidden');
  });

  it('should enable the upload button only if all required fields are valid', () => {
    cy.get('.nav__btn--add-recipe').click();
    cy.get('input[name="sourceUrl"]').type('https://example.com');
    cy.get('input[name="image"]').type('https://example.com/image.jpg');
    cy.get('input[name="title"]').type('Test Recipe');
    cy.get('.upload__btn').should('not.have.attr', 'disabled');
  });

 
});
