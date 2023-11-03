/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
    it ('opens with Fall CS courses', () => {
        cy.visit ('/');
        cy.get('[class=banner-container]').should('contain', 'CS Courses');
      });

    it('shows Winter courses when Winter is selected', () => {
        cy.visit ('/');
        cy.get('[data-cy=Winter]').click();
        cy.get('[data-cy=course]').should('contain' ,'Winter');
      });
  });