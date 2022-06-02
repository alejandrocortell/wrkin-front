import cypress from 'cypress'

describe('Punch ins', () => {
    before(() => {
        cy.visit('localhost:3000')
        cy.get('[data-cy=user]').type('alejandroRRHH')
        cy.get('[data-cy=password]').type('123456aA?')
        cy.get('[data-cy=login]').click()
    })

    it('Create new request', () => {
        cy.contains('Calendar')
        cy.visit('localhost:3000/calendar')
        cy.get('[data-cy=do-request]').click({ force: true })
        cy.contains('Create new request')
        cy.get('.checkbox-field').click()
        cy.get('input[type="date"]').eq(0).type('2025-01-01')
        cy.get('input[type="date"]').eq(1).type('2025-02-01')
        cy.get('textarea').type('Message request')
        cy.get('[data-cy=send-request]').click()
        cy.intercept('POST', 'http://localhost:8080/requests-days-off', {
            statusCode: 201,
        })
        cy.contains('Create new request').should('not.exist')
    })
})
