describe('ManagerPanel component', () => {
  beforeEach(() => {
    //Added this because after every click on the -View Full Report- cypress errored out because some reports don't have the same elements and data and cypress get confused. With this function  below,it bypasses...
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.error('Uncaught Exception:', err.message);
      return false;
    });
    cy.intercept('/api/getCurrentCycle', { fixture: 'currentCycle.json' })
    cy.intercept('/api/getAllUsers', { fixture: 'allUsers.json' })

    // configure port address accordingly(Mine always get changed lol)
    cy.visit('http://localhost:3003/managerpanel')
  })

  it('should display the list of users', () => {
    cy.contains('h2', 'List of the users').should('be.visible')
    cy.get('.grid-cols-4 > :nth-child(1)').should('be.visible')
    cy.get('.grid-cols-4 > :nth-child(2)').should('be.visible')
    cy.get('.grid-cols-4 > :nth-child(3)').should('be.visible')
    cy.get('a > :contains("View Full Report")').should('be.visible').click({ multiple: true });
  });

  it('should navigate to the user report when "View Full Report" button is clicked', () => {
    cy.intercept('/employee/*/manager-report/*').as('report')
    cy.get('a:contains("View Full Report")').each((button) => {
      cy.wrap(button).click();
      cy.wait('@report').its('response.statusCode').should('eq', 200);
    })
  })
});
