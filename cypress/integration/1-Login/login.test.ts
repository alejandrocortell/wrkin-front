import cypress from 'cypress'

describe('Login invalid', () => {
    it('Login should not be fine', () => {
        cy.visit('localhost:3000')
        cy.get('[data-cy=user]').type('alejan')
        cy.get('[data-cy=password]').type('123456aA?')
        cy.get('[data-cy=login]').click()
        cy.intercept('POST', 'http://localhost:8080/auth', {
            statusCode: 204,
        })
        cy.contains('User or password do not match')
    })
})

describe('Login fine', () => {
    it('Login should not be fine', () => {
        cy.visit('localhost:3000')
        cy.get('[data-cy=user]').type('alejandroRRHH')
        cy.get('[data-cy=password]').type('123456aA?')
        cy.get('[data-cy=login]').click()
        cy.contains('alejandro')
        cy.contains('Punch ins')
    })
})
