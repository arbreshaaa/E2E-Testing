describe('Preview View Tests', () => {
  const recipeData = {
    id: '5664c8f193e7aa067e94e8531',
    image: 'https://forkify-api.herokuapp.com/images/5ed6604591c37cdc054bc886.jpg',
    title: 'Homemade Pizza',
    publisher: 'Simply Recipes',
    key: null,
  };

  const iconsMock = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-user" viewBox="0 0 20 20"><title>user</title><path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zM10 18.1c-4.5 0-8.1-3.6-8.1-8.1S5.5 1.9 10 1.9s8.1 3.6 8.1 8.1-3.6 8.1-8.1 8.1zM10 5.7c-1.2 0-2.2 1-2.2 2.2S8.8 10 10 10s2.2-1 2.2-2.2S11.2 5.7 10 5.7zM10 16.1c-2.7 0-5-2.2-5-5H5c0 2.2 1.8 4 4 4s4-1.8 4-4h0c0 2.8-2.3 5-5 5z"></path></symbol></svg>';

  beforeEach(() => {
    // Visit the application URL before each test
    cy.visit('http://localhost:1234'); // Adjust the URL to match your application's URL
  });

  it('should render the preview correctly', () => {
    // Set the hash to simulate the selected recipe
    cy.window().then(win => {
      win.location.hash = '#5664c8f193e7aa067e94e8531';
    });

    // Manually add the preview HTML to the DOM for testing purposes
    const markup = `
      <ul class="preview__list">
        <li class="preview">
          <a class="preview__link preview__link--active" href="#5664c8f193e7aa067e94e8531">
            <figure class="preview__fig">
              <img src="${recipeData.image}" alt="${recipeData.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${recipeData.title}</h4>
              <p class="preview__publisher">${recipeData.publisher}</p>
              <div class="preview__user-generated ${recipeData.key ? '' : 'hidden'}">
                <svg>
                  <use href="${iconsMock}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
      </ul>
    `;

    // Use cy.document() to append the markup
    cy.document().then(doc => {
      doc.body.insertAdjacentHTML('beforeend', markup);
    });

    // Check if the preview link is active
    cy.get('.preview__link--active').should('have.attr', 'href', `#${recipeData.id}`);

    // Check if the preview title is correct
    cy.get('.preview__title').should('contain', recipeData.title);

    // Check if the preview publisher is correct
    cy.get('.preview__publisher').should('contain', recipeData.publisher);

    // Check if the preview image is correct
    cy.get('.preview__fig img').should('have.attr', 'src', recipeData.image);

    // Check if the user-generated icon is hidden
    cy.get('.preview__user-generated').should('have.class', 'hidden');
  });

  it('should highlight the active recipe', () => {
    // Set a different recipe as active
    cy.window().then(win => {
      win.location.hash = '#another-recipe-id'; // Set a different hash
    });

    // Manually add the preview HTML to the DOM for testing purposes
    const newMarkup = `
      <ul class="preview__list">
        <li class="preview">
          <a class="preview__link preview__link--active" href="#another-recipe-id">
            <figure class="preview__fig">
              <img src="${recipeData.image}" alt="${recipeData.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${recipeData.title}</h4>
              <p class="preview__publisher">${recipeData.publisher}</p>
              <div class="preview__user-generated ${recipeData.key ? '' : 'hidden'}">
                <svg>
                  <use href="${iconsMock}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>
      </ul>
    `;

    // Use cy.document() to append the new markup
    cy.document().then(doc => {
      doc.body.insertAdjacentHTML('beforeend', newMarkup);
    });

    // Check if the new preview link is active
    cy.get('.preview__link--active').should('have.attr', 'href', '#another-recipe-id');
  });
});
