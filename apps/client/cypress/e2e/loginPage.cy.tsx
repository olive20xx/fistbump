describe('Login component', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:4000/', { fixture: 'getUserByEmail.json' }).as('loginRequest')
    // configure port address accordingly(Mine always get changed lol)
    cy.visit('http://localhost:3004/login')
  })

  it('should display the login form', () => {
    cy.get('form').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should display an error message for invalid login', () => {
    //not ready yet 
  })

  it('should redirect to the dashboard on successful login', () => {

    cy.get('input[name="email"]').type('valid@example.com')
    cy.get('input[name="password"]').type('321')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginRequest').then((interception) => {
      const response = interception.response.body;
      if (response && response.getUserByEmail && response.getUserByEmail.fullName) {
        cy.url().should('include', '/dashboard')
      } else {
        cy.log('Login response does not match the expected structure.')
      }
    })
  })

  it('should display a link to the sign-up page', () => {
    cy.get('a[href="/sign-up"]').should('be.visible').should('have.attr', 'href', '/sign-up')
  })

  it('should navigate to the sign-up page when the sign-up link is clicked', () => {
    cy.get('a[href="/sign-up"]').click()
    cy.url().should('include', '/sign-up')
  })
})
