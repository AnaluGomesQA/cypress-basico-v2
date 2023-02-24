/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {  
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'  
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('ana.gomes@email.com')
        cy.get('#open-text-area').type(longText, {delay:0}) 
        cy.get('button[type="submit"]').click()        
        cy.get('.success').should('be.visible')
        
    })

    it('exibe mensagem de erro ao submeter formulário com email inválido', function() {        
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('ana.gomes@email,com')
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').click() 
        cy.get('.error').should('be.visible')
    })

    it('valida campo telefone não aceita caracter não numérico', function() {        
        cy.get('#phone').type('teste').should('have.value','')       
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function() {        
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('anagomes@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').click() 
        cy.get('.error').should('be.visible')       
    })

    it('limpar campos', function() {        
        cy.get('#firstName').type('Ana').should('have.value','Ana')
        cy.get('#lastName').type('Gomes').should('have.value','Gomes')
        cy.get('#email').type('anagomes@email.com').should('have.value','anagomes@email.com') 
        cy.get('#phone').type('123456789').should('have.value','123456789')  
        cy.get('#firstName').clear().should('have.value','') 
        cy.get('#lastName').clear().should('have.value','')  
        cy.get('#email').clear().should('have.value','') 
        cy.get('#phone').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {        
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click() 
        cy.get('.error').should('be.visible')       
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {        
        cy.preencheCamposObrigatorioseEnvia() 
        cy.get('.success').should('be.visible')      
    })

    it('verificando comando contains', function() {        
        cy.get('#firstName').type('Ana')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('anagomes@email.com')
        cy.get('#open-text-area').type('Teste', {delay:100})
        cy.contains('button', 'Enviar').click()  
        cy.get('.success').should('be.visible')     
    })

    

    it('seleciona um produto (YouTube) por seu texto', function() {        
        cy.get('#product').select('YouTube').should('have.value', 'youtube')              
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {        
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')              
    })

    it('seleciona um produto (Blog) por seu índice', function() {        
        cy.get('#product').select(1).should('have.value', 'blog')              
    })

    it('marca o tipo de atendimento "Feedback"', function() {        
        cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')              
    })

    //selecionar radio button

    it('marca cada tipo de atendimento', function() {  
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })               
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('#email-checkbox').check().should('have.value', 'email')          
        cy.get('#phone-checkbox').check().should('have.value', 'phone').uncheck().should('not.be.checked')              
    })
//OU
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
        .check()
        .last()          
        .uncheck()
        .should('not.be.checked')              
    })

    //upload de arquivo pelo botão

    it('seleciona um arquivo da pasta fixtures', function() {        
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/teste.txt')
        .then((input) => {
            expect(input[0].files[0].name).to.equal('teste.txt')
        })      
    })

    //upload de arquivo arrastando e soltando

    it('seleciona um arquivo da pasta fixtures', function() {        
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
        .then(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })      
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('exemplo')        
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@exemplo')
        .then(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })      
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {        
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
           
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {        
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        //teste na pagina que abriu
        cy.contains('Talking About Testing')
        .should('be.visible')
           
    })

    it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {        
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
           
    })


  })
