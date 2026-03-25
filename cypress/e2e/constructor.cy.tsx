const testUrl = 'http://localhost:4000';

const SELECTORS = {
  modal: '#modals',
  ingredient: `[data-cy='burger-ingredient']`,
  modalOverlay: `[data-cy='modal-overlay']`
};

const CONSTANTS = {
  bunName: 'Краторная булка N-200i'
};

describe('Тест конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testUrl);
  });

  describe('Тест открытия модального окна с описанием ингредиента', () => {
    beforeEach(() => {
      cy.visit(testUrl);
    });

    it('Открытие модального окна по нажатию на конкретный ингридиент', () => {
      cy.get(SELECTORS.ingredient).first().click();
      cy.get(SELECTORS.modal).contains(CONSTANTS.bunName).should('exist');
    });

    it('Закрытие модального окна по клику на крестик', () => {
      cy.contains(CONSTANTS.bunName).click();
      cy.get(SELECTORS.modal).contains(CONSTANTS.bunName).should('exist');
      cy.get(`${SELECTORS.modal} button`).first().click();
      cy.get(SELECTORS.modal).children().should('not.exist');
    });

    it('Закрытие модального окна по клику на overlay', () => {
      cy.contains(CONSTANTS.bunName).click();
      cy.get(SELECTORS.modal).contains(CONSTANTS.bunName).should('exist');
      cy.get(SELECTORS.modalOverlay).click({ force: true });
      cy.get(SELECTORS.modal).children().should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'auth.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

      localStorage.setItem('refreshToken', 'MockRefreshToken');
      cy.setCookie('accessToken', 'MockAccessToken');
      cy.visit(testUrl);
    });

    it('Добавление ингридиентов в конструктор, Оформление заказа', () => {
      cy.contains(CONSTANTS.bunName).parent().find('button').click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .parent()
        .find('button')
        .click();
      cy.contains('Оформить заказ').click();

      cy.get(SELECTORS.modal).contains('123456').should('exist');

      cy.get(SELECTORS.modal).find('button').click();
      cy.get(SELECTORS.modal).children().should('have.length', 0);

      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
