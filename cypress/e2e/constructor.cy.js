beforeEach(() => {
  window.localStorage.setItem(
    "refreshToken",
    JSON.stringify("test-refreshToken")
  );
  cy.setCookie('accessToken', 'test-accessToken')

  cy.visit('/');
  cy.intercept("GET", "ingredients", {fixture: "ingredients.json"});
});

afterEach(function () {
  cy.clearCookies();
})

describe('service is available', function () {

  it('should be available on localhost:3000', function () {
    cy.visit('/');
  });

  it('should open ingredient modal', function () {
    cy.get('img[alt="Краторная булка N-200i"]').click();
    cy.get('[data-madal=modal]').should('have.text', 'Краторная булка N-200i');
  });

  it('should create order', function () {
    cy.get('img[alt="Краторная булка N-200i"]').trigger('dragstart');
    cy.get('.bun-field').trigger('drop');

    cy.get('img[alt="Филе Люминесцентного тетраодонтимформа"]').trigger('dragstart');
    cy.get('.ingredient-field').trigger('drop');

    cy.get('button[type="submit"]').click();
    cy.get('[data-login-page=login]').should('have.text', 'Вход');

    cy.get('input[name="email"]').type(`ProtosZergFight@gmail.com{enter}`);
    cy.get('input[name="password"]').type(`Protos-Protos{enter}`);

    cy.get('button[type="submit"]').click();
    cy.intercept("GET", "login", {fixture: "user.json"});

    cy.get('[data-ingredients-list=ingredients-list]').should('have.text', 'Соберите бургер');
    cy.get('button[type="submit').click();
    cy.intercept("POST", "api/orders", {fixture: "order.json"})
  });
});
