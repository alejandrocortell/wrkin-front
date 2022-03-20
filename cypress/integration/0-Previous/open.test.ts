import cypress from 'cypress'

describe('Open site', () => {
    before(() => {
        cy.visit('localhost:3000')
    })

    it('Frontpage can be opened', () => {
        cy.contains('User')
    })

    it('Do login', () => {
        cy.get('[data-cy=user]').type('alejandro')
        cy.get('[data-cy=password]').type('123456aA?')
        cy.get('[data-cy=login]').click()
        cy.contains('My account')
    })
})
