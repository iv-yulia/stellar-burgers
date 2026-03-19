describe('Тест конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  describe('Тест открытия модального окна с описанием ингредиента', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4000');
    });

    it('Открытие модального окна по нажатию на конкретный ингридиент', () => {
      cy.get(`[data-cy='burger-ingredient']`).first().click();
      cy.get('#modals').contains('Краторная булка N-200i').should('exist');
    });

    it('Закрытие модального окна по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('#modals').contains('Краторная булка N-200i').should('exist');
      cy.get('#modals button').first().click();
      cy.get('#modals').children().should('not.exist');
    });

    it('Закрытие модального окна по клику на overlay', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('#modals').contains('Краторная булка N-200i').should('exist');
      cy.get(`[data-cy='modal-overlay']`).click({ force: true });
      cy.get('#modals').children().should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'auth.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

      localStorage.setItem('refreshToken', 'MockRefreshToken');
      cy.setCookie('accessToken', 'MockAccessToken');
      cy.visit('http://localhost:4000');
    });

    it('Добавление ингридиентов в конструктор, Оформление заказа', () => {
      cy.contains('Краторная булка N-200i').parent().find('button').click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .parent()
        .find('button')
        .click();
      cy.contains('Оформить заказ').click();

      cy.get('#modals').contains('123456').should('exist');

      cy.get('#modals').find('button').click();
      cy.get('#modals').children().should('have.length', 0);

      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
