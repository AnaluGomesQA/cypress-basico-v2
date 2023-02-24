Cypress.Commands.add('preencheCamposObrigatorioseEnvia', function(){
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('ana.gomes@email.com')
    cy.get('#open-text-area').type('Teste') 
    cy.get('button[type="submit"]').click()    

})
