import cypress from 'cypress'

describe('Punch ins', () => {
    before(() => {
        cy.visit('localhost:3000')
        cy.get('[data-cy=user]').type('alejandroRRHH')
        cy.get('[data-cy=password]').type('123456aA?')
        cy.get('[data-cy=login]').click()
    })

    it('Start-Stop punch in', () => {
        cy.get('[data-cy=start-stop]').contains('Start')
        cy.get('[data-cy=start-stop]').click().contains('Stop')
        cy.contains('Started')
        cy.contains('Current time')
        cy.get('[data-cy=start-stop]').click().contains('Start')
        cy.contains('Started').should('not.exist')
        cy.contains('Current time').should('not.exist')
    })
})
