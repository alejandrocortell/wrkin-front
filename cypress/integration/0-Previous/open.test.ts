import cypress from 'cypress'

describe('Open site', () => {
    it('Frontpage can be opened', () => {
        cy.visit('localhost:3000')
        cy.contains('User')
    })

    it('Do login', () => {
        cy.visit('localhost:3000')
        cy.get('.button.primary').click()
        cy.contains('My account')
    })
})
