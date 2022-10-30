describe("Test cases to showcase cypress functionalities in other pages", () => {
  it("Hovering on an element", () => {
    cy.viewport(1920, 1080);
    cy.visit(
      "http://automationpractice.pl/index.php?id_category=3&controller=category"
    );
    cy.get(".product-container")
      .filter(":visible")
      .first()
      .trigger("mouseover");
    cy.get(".button-container").should("be.visible");
    cy.get(".product-container").filter(":visible").first().trigger("mouseout");
    cy.get(".button-container").should("not.be.visible");
  });
});
