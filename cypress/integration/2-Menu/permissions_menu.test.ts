import cypress from 'cypress'

describe('Menu manage org not exists', () => {
    before(() => {
        cy.visit('localhost:3000')
        cy.get('[data-cy=user]').type('alejandroRRHH')
        cy.get('[data-cy=password]').type('123456aA?')
        cy.get('[data-cy=login]').click()
    })

    it('Menu not should contains manage', () => {
        cy.intercept('GET', 'http://localhost:8080/users/me', {
            fixture: 'user_employee.json',
        })
        cy.contains('alejandro')
        cy.contains('Manage org').should('not.exist')
    })
})

describe('Menu manage org exists', () => {
    before(() => {
        cy.visit('localhost:3000')
        cy.get('[data-cy=user]').type('alejandroRRHH')
        cy.get('[data-cy=password]').type('123456aA?')
        cy.get('[data-cy=login]').click()
    })

    it('Menu should contains manage', () => {
        cy.intercept('GET', 'http://localhost:8080/users/me', {
            fixture: 'user_rrhh.json',
        })
        cy.contains('alejandro')
        cy.contains('Manage org')
    })
})
