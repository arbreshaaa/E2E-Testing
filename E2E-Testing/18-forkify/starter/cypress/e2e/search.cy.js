describe('Search View Tests', () => {
  beforeEach(() => {
    cy.visit(' http://localhost:1234'); // Visit the base URL of your application
  });

  it('should get a search query and clear the input', () => {
    // Simulate typing a query in the search field
    cy.get('.search__field').type('pizza');

    // Simulate form submission
    cy.get('.search').submit();

    // Check if the input field is cleared
    cy.get('.search__field').should('have.value', ' ');
  });

  it('should handle live search input', () => {
    cy.get('.search__field').type('burger');

    // Check if the input value is as expected
    cy.get('.search__field').should('have.value', 'burger');

    // Assuming there is some live search result being updated
    // For example, we can check if results container is updated
    cy.get('.results').should('not.be.empty');
  });
});
