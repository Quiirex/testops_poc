describe('Adding a note to favourites', () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000');
    cy.wait(1000);
    cy.get('button.inline-flex:nth-child(3)').click();
    cy.wait(3000);
    cy.get(
      'div.flex:nth-child(4) > div:nth-child(1) > button:nth-child(2)',
    ).click();
    cy.get('input.bg-transparent').clear();
    cy.get('input.bg-transparent').type('test');
    cy.get('button.px-2:nth-child(1)').click();
    cy.wait(3000);
    cy.get('div.flex:nth-child(4) > div:nth-child(2) a > button').click();
    cy.get('button.inline-flex:nth-child(1)').click();
    cy.get(
      'div.border:nth-child(2) > div:nth-child(1) > h2:nth-child(1)',
    ).contains('New Note');
  });
  it('should add note to favourites', () => {
    cy.get('div.border:nth-child(2)').click();
    cy.get('button.rounded-full').click();
    cy.get('div.select-none:nth-child(1)').click();
    cy.get('a.transition:nth-child(1)').click();
    cy.get('div.rounded-lg:last-child > div > h2').contains('New Note');
  });
});
