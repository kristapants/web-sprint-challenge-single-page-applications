
describe('Ordering food app', () => {
    beforeEach(() => {
      // arbitrary code you want running
      // before each test
      cy.visit('http://localhost:3000')
    })

    const nameInput = () => cy.get('input[name=name]')
    const sizeInput = () => cy.get('select[name=size]')
    const submitBtn = () => cy.get('#submitBtn')
    const pepperoni = () => cy.get('[type="checkbox"][name="pepperoni"]')
    const chicken = () => cy.get('[type="checkbox"][name="chicken"]')
    const anchovies = () => cy.get('[type="checkbox"][name="anchovies"]')
    const additionalInstructions = () => cy.get('input[name=additionalInstructions]')

  
    // "it" is a test
    it('sanity check to make sure tests work', () => {
      // "expect" is an assertion
      // there can be several assertions per test
      expect(1 + 2).to.equal(3)
      expect(2 + 2).not.to.equal(5) // strict ===
      expect({}).not.to.equal({})   // strict ===
      expect({}).to.eql({})         // not strict
    })

    it('Can get to order form from home', () => {
      cy.get('#orderPizza')
        .click()
      cy.url().should('include','/orderform')
    })
  
    it('Inputs accept input and show what is entered', () => {
      cy.get('#orderPizza')
        .click()
      cy.url().should('include','/orderform')
      nameInput()      
        .should('have.value', '')
        .type('Myname')
        .should('have.value', 'Myname')
      sizeInput()
        .should('have.value', '')
        .select('large')
        .should('have.value', 'large')
    })

    it('Submit button is not active until name is 2+ characters AND size is selected', () => {
      cy.get('#orderPizza')
        .click()
      cy.url().should('include','/orderform')
      submitBtn()
        .should('be.disabled')
      nameInput()      
        .should('have.value', '')
        .type('X')
      submitBtn()
        .should('be.disabled')
      nameInput()
        .type('x')
      sizeInput()
        .should('have.value', '')
        .select('large')
      submitBtn()
        .should('not.be.disabled')
      nameInput()
        .clear()
      submitBtn()
        .should('be.disabled')
    })

    it('Order confirmation shows my order', () => {
      cy.get('#orderPizza')
        .click()
      cy.url().should('include','/orderform')
      nameInput().type('Ada')
      sizeInput().select('large')
      chicken().check()
      anchovies().check()
      additionalInstructions().type('Oh man, I am so hungry, just please get here as fast as possible.')
      submitBtn().click()
      cy.url().should('include', '/orderconfirmation')
      cy.contains('Ada').should('exist')
      cy.contains('large').should('exist')
      cy.contains('chicken').should('exist')
      cy.contains('anchovies').should('exist')
      cy.contains('Oh man, I am so hungry, just please get here as fast as possible.').should('exist')
    })
  
  })
  