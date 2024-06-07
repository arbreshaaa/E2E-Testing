describe('Recipe Views Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234'); // Adjust the URL to match your application's URL
  });

  it('should render a recipe', () => {
    // Simulate loading a recipe by navigating to a specific hash
    cy.window().then(win => {
      win.location.hash = '#664c8f193e7aa067e94e845a'; // Replace with a valid recipe ID
    });

    // Wait for the recipe to load
    cy.get('.recipe__title').should('contain', 'Veggie Pizza'); // Replace 'Recipe Title' with the actual title
  });

  it('should update the servings', () => {
    // Simulate loading a recipe by navigating to a specific hash
    cy.window().then(win => {
      win.location.hash = '#664c8f193e7aa067e94e845a'; // Replace with a valid recipe ID
    });

    // Wait for the recipe to load
    cy.get('.recipe__info-data--people').should('contain', '4'); // Initial servings
    
  });

  it('should add a bookmark', () => {
    // Simulate loading a recipe by navigating to a specific hash
    cy.window().then(win => {
      win.location.hash = '#664c8f193e7aa067e94e845a'; // Replace with a valid recipe ID
    });

    // Wait for the recipe to load
    cy.get('.btn--round.btn--bookmark').click();

    // Check if the bookmark was added
    cy.get('.bookmarks__list').should('not.be.empty');
  });

  it('should remove a bookmark', () => {
    // Simulate loading a recipe by navigating to a specific hash
    cy.window().then(win => {
      win.location.hash = '#664c8f193e7aa067e94e845a'; // Replace with a valid recipe ID
    });

    // Add a bookmark
    cy.get('.btn--round.btn--bookmark').click();

    // Check if the bookmark was added
    cy.get('.bookmarks__list').should('not.be.empty');

    // Remove the bookmark
    cy.get('.btn--round.btn--bookmark').click();

    // Check if the bookmark was removed
    cy.contains('No BookMark yet.Find a nice recipe and bookmark it');
  });

  it('should display vegetarian message', () => {
    // Simulate loading a vegetarian recipe by navigating to a specific hash
    cy.window().then(win => {
      win.location.hash = '#664c8f193e7aa067e94e845a'; // Replace with a valid vegetarian recipe ID
    });

    // Check if the vegetarian message is displayed
    cy.contains('Vegetarian Meal');
  });
});
