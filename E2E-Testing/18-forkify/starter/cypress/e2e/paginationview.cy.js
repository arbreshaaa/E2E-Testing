describe('Pagination View Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:1234'); // Adjust the URL to match your application's URL
      cy.intercept('GET', '/api/recipes', { fixture: 'recipes.json' }); // Intercept API call if needed
    });
  
    it('should render the next page button on the first page if there are multiple pages', () => {
      cy.window().then((win) => {
        win.PaginationView.render({
          page: 1,
          results: Array(30).fill({}), // Assume there are 30 results
          resulstPerPage: 10,
        });
      });
      cy.get('.pagination__btn--next').should('exist');
      cy.get('.pagination__btn--prev').should('not.exist');
    });
  
    it('should render both next and previous page buttons if not on the first or last page', () => {
      cy.window().then((win) => {
        win.PaginationView.render({
          page: 2,
          results: Array(30).fill({}),
          resulstPerPage: 10,
        });
      });
      cy.get('.pagination__btn--next').should('exist');
      cy.get('.pagination__btn--prev').should('exist');
    });
  
    it('should render the previous page button on the last page if there are multiple pages', () => {
      cy.window().then((win) => {
        win.PaginationView.render({
          page: 3,
          results: Array(30).fill({}),
          resulstPerPage: 10,
        });
      });
      cy.get('.pagination__btn--next').should('not.exist');
      cy.get('.pagination__btn--prev').should('exist');
    });
  
    it('should not render any pagination buttons if there is only one page', () => {
      cy.window().then((win) => {
        win.PaginationView.render({
          page: 1,
          results: Array(10).fill({}),
          resulstPerPage: 10,
        });
      });
      cy.get('.pagination__btn--next').should('not.exist');
      cy.get('.pagination__btn--prev').should('not.exist');
    });
  
    it('should handle click events correctly and navigate to the appropriate page', () => {
      cy.window().then((win) => {
        win.PaginationView.render({
          page: 2,
          results: Array(30).fill({}),
          resulstPerPage: 10,
        });
      });
  
      const stub = cy.stub();
      cy.on('window:alert', stub);
  
      cy.get('.pagination__btn--next').click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith(3); // Assuming the handler alerts the new page number
      });
  
      cy.get('.pagination__btn--prev').click().then(() => {
        expect(stub.getCall(1)).to.be.calledWith(1); // Assuming the handler alerts the new page number
      });
    });
  });
  