/// <reference types="Cypress" />
export {};

describe('Enter Homepage', () => {
  it('Visit Homepage', () => {
    cy.visit('/')
    cy.get('[data-cy="new_recipes"]').contains('สูตรอาหารใหม่ล่าสุด')
  })
})