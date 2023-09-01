describe('template spec', () => {
  beforeEach(() => {
    // configure port address accordingly(Mine always gets changed lol)
    cy.visit('http://localhost:3003')
  })

  it("should render the landing page and display a message", () => {
    cy.get("h2").contains("WELCOME TO 360 REVIEW");
  })

  it("should navigate to the dashboard when 'Go to dashboard' button is clicked", () => {
    cy.contains("Go to dashboard").click();
    cy.url().should("include", "/dashboard");
  })

  it("should navigate to the manager panel when 'Go to managerpanel' button is clicked", () => {
    cy.contains("Go to managerpanel").click()
    cy.url().should("include", "/managerpanel")
  })
})
