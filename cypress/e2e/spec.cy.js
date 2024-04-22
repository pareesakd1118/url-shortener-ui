describe('empty spec', () => {
  it('passes', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: { urls: [
          {
            id: 1,
            long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            short_url: 'http://localhost:3001/useshorturl/1',
            title: 'Awesome photo'
          }
        ]}
      })
    cy.visit('http://localhost:3000')
    cy.get('h1').contains('URL Shortener')
    cy.get('button').contains('Shorten Please!')
    cy.get('.url').should('have.length', 1)
    cy.get('.url').first().contains("h3",'Awesome photo');
    cy.get('.url').first().contains("p",'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');
    cy.get('.url').first().contains("a",'http://localhost:3001/useshorturl/1');
    cy.get('input[name="title"]').type("hello").should('have.value', "hello");
    cy.get('input[name="urlToShorten"]').type("https://shes-a-scientist.vercel.app/scientists").should('have.value', "https://shes-a-scientist.vercel.app/scientists");
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: { 
            long_url: 'https://shes-a-scientist.vercel.app/scientists',
            title: 'hello'
        }
      })
    cy.get("button").click()
    cy.get('.url').should('have.length', 2)
    cy.get('.url').last().contains("h3",'hello');
    cy.get('.url').last().contains("p",'https://shes-a-scientist.vercel.app/scientists');
  })
})