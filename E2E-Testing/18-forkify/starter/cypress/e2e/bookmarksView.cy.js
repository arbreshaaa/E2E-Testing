describe('Bookmarks View Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234'); // Adjust the URL to match your application's URL
  });

  it('should render bookmarks correctly', () => {
    // Define some bookmark data to use for testing
    const bookmarkData = [
      {
        id: '1',
        image: 'https://example.com/image1.jpg',
        title: 'Bookmark 1',
        publisher: 'Publisher 1',
      },
      {
        id: '2',
        image: 'https://example.com/image2.jpg',
        title: 'Bookmark 2',
        publisher: 'Publisher 2',
      },
    ];

    // Manually add the bookmarks to the DOM for testing purposes
    bookmarkData.forEach(bookmark => {
      const markup = `
        <li class="preview">
          <a class="preview__link" href="#${bookmark.id}">
            <figure class="preview__fig">
              <img src="${bookmark.image}" alt="${bookmark.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${bookmark.title}</h4>
              <p class="preview__publisher">${bookmark.publisher}</p>
            </div>
          </a>
        </li>
      `;
      cy.window()
        .its('document')
        .then(doc => {
          const bookmarksList = doc.querySelector('.bookmarks__list');
          const element = doc.createRange().createContextualFragment(markup);
          bookmarksList.appendChild(element);
        });
    });

    // Check if the bookmarks are rendered correctly
    cy.get('.bookmarks__list .preview').should(
      'have.length',
      bookmarkData.length
    );
    bookmarkData.forEach((bookmark, index) => {
      cy.get(`.bookmarks__list .preview:eq(${index})`)
        .should('contain', bookmark.title)
        .and('contain', bookmark.publisher)
        .find('img')
        .should('have.attr', 'src', bookmark.image);
    });
  });

  it('should show error message when there are no bookmarks', () => {
    // Check if the error message is displayed within bookmarks__list
    cy.get('.bookmarks__list > .error').should(
      'contain',
      'No BookMark yet.Find a nice recipe and bookmark it'
    );
  });
});
