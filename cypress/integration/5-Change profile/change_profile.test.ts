import cypress from 'cypress'

describe('Punch ins', () => {
    before(() => {
        cy.visit('localhost:3000')
        cy.get('[data-cy=user]').type('alejandro')
        cy.get('[data-cy=password]').type('123456aA?')
        cy.get('[data-cy=login]').click()
    })

    it('Change profile', () => {
        const firstname = `firstname${Date.now()}`
        const lastname = `lastname${Date.now()}`

        cy.contains('Calendar')
        cy.get('a[href*="/my-account"]').eq(0).click({ force: true })
        cy.get('[data-cy=update-account]').should('be.disabled')
        cy.get('[data-cy=firstname]').clear().type(firstname)
        cy.get('[data-cy=lastname]').clear().type(lastname)
        cy.get('[data-cy=update-account]').should('be.enabled')
        cy.get('[data-cy=update-account]').click()
        cy.visit('localhost:3000')
        cy.get('a[href*="/my-account"]').eq(0).click({ force: true })
        cy.get('[data-cy=firstname]').should('have.value', firstname)
        cy.get('[data-cy=firstname]').should('have.value', lastname)
    })
})
