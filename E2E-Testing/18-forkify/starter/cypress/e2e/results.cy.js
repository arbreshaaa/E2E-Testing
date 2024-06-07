describe('Result View Tests', () => {
  beforeEach(() => {
    cy.visit(' http://localhost:1234'); // Adjust the URL to match your application's URL
    cy.get('.search__field').type('pizza');
    cy.get('.search').submit();
  });

  it('should sort results by cooking time ascending', () => {
    cy.get('.sort-btn.time--asc').first().click(); // Click the first matching element
    // Add your custom logic to verify the sorting
  });

  it('should sort results by cooking time descending', () => {
    cy.get('.sort-btn.time--dsc').first().click(); // Click the first matching element
    // Add your custom logic to verify the sorting
  });

  it('should display error message when no results found', () => {
    cy.get('.search__field').clear().type('nonexistentfood');
    cy.get('.search').submit();
    cy.contains('No recipes found for your query.Please try again'); // Ensure the error message is correct
  });
});
