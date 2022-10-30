export class BasePage {
  static click(selector) {
    cy.get(selector).click();
  }

  static type(selector, text) {
    cy.get(selector).type(text);
  }

  static hasText(selector, text) {
    cy.get(selector).should("have.text", text);
  }

  static doesNotExist(selector) {
    cy.get(selector).should("not.exist");
  }

  static isVisible(selector) {
    cy.get(selector).should("be.visible");
  }

  static loginStandardUserWithoutUI(page) {
    //cy.loginStandartUser()
    cy.setCookie("session-username", "standard_user");
    cy.visit(page, { failOnStatusCode: false });
  }

  static clickFirst(selector) {
    cy.get(selector).first().click();
  }

  static saveFirstElementTextAsAlias(selector, alias) {
    cy.get(selector)
      .first()
      .then((product) => {
        cy.wrap(product.text()).as(alias);
      });
  }

  static validateFirstElementTextByAlias(selector, alias) {
    cy.get("@" + alias).then((lastAddedName) => {
      cy.get(selector)
        .first()
        .then((el) => {
          cy.wrap(lastAddedName).should("be.equal", el.text());
        });
    });
  }
}
