
describe('Ordering food app', () => {
    beforeEach(() => {
      // arbitrary code you want running
      // before each test
      cy.visit('http://localhost:3000')
    })

  
    // "it" is a test
    it('sanity check to make sure tests work', () => {
      // "expect" is an assertion
      // there can be several assertions per test
      expect(1 + 2).to.equal(3)
      expect(2 + 2).not.to.equal(5) // strict ===
      expect({}).not.to.equal({})   // strict ===
      expect({}).to.eql({})         // not strict
    })
  
  
  })
  