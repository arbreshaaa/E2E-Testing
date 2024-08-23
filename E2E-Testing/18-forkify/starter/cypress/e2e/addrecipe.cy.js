// cypress/integration/addRecipeView.spec.js

describe("Add Recipe View Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234"); // Adjust the URL to match your application's URL
  });

  it("should open and close the add recipe modal", () => {
    cy.get(".nav__btn--add-recipe").click();
    cy.get(".add-recipe-window").should("not.have.class", "hidden");
    cy.get(".overlay").should("not.have.class", "hidden");
    cy.get(".btn--close-modal").click();
    cy.get(".add-recipe-window").should("have.class", "hidden");
    cy.get(".overlay").should("have.class", "hidden");
  });

  it("should enable the upload button only if all required fields are valid", () => {
    cy.get(".nav__btn--add-recipe").click();
    cy.get('input[name="sourceUrl"]').type("https://example.com");
    cy.get('input[name="image"]').type("https://example.com/image.jpg");
    cy.get('input[name="title"]').type("Test Recipe");
    cy.get(".upload__btn").should("not.have.attr", "disabled");
  });

  // Test: Add a new ingredient row
  it('should add a new ingredient row when the "Add Row" button is clicked', () => {
    cy.get(".nav__btn--add-recipe").click();
    cy.get("button[class*=add-row]").click();
    cy.get(".ingredient-row").should("have.length", 2); // Assuming there's initially one row
  });

  // Test: Form submission with valid inputs
  it("should submit the form when all required fields are valid", () => {
    cy.get(".nav__btn--add-recipe").click();
    cy.get('input[name="sourceUrl"]').type("https://example.com");
    cy.get('input[name="image"]').type("https://example.com/image.jpg");
    cy.get('input[name="title"]').type("Test Recipe");
    cy.get(".upload__btn").click();
    // Add assertions to check if the recipe was successfully submitted
  });

  // Test: Check if validation works properly for URL fields
  it("should keep the upload button disabled if the URL fields are invalid", () => {
    cy.get(".nav__btn--add-recipe").click();
    cy.get('input[name="sourceUrl"]').type("invalid-url");
    cy.get('input[name="image"]').type("https://example.com/image.jpg");
    cy.get('input[name="title"]').type("Test Recipe");
    cy.get(".upload__btn").should("have.attr", "disabled");
  });

  // Test: Ensure window closes after successful upload
  it("should close the add recipe window after a successful submission", () => {
    cy.get(".nav__btn--add-recipe").click();
    cy.get('input[name="sourceUrl"]').type("https://example.com");
    cy.get('input[name="image"]').type("https://example.com/image.jpg");
    cy.get('input[name="title"]').type("Test Recipe");
    cy.get(".upload__btn").click();
    cy.get(".add-recipe-window").should("have.class", "hidden");
    cy.get(".overlay").should("have.class", "hidden");
  });

  // Test: Adding multiple ingredient rows
  it("should allow adding multiple ingredient rows", () => {
    cy.get(".nav__btn--add-recipe").click();
    cy.get("button[class*=add-row]").click().click().click(); // Adding 3 rows
    cy.get(".ingredient-row").should("have.length", 4); // Assuming there's initially one row
  });
});
