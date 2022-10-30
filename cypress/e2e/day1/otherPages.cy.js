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

  it("Mocking a failing request to force error state of the app", () => {
    cy.intercept("POST", "**protocol-v1-goerli**", {
      statusCode: 400,
      body: {
        message: "Oh no I couldn't fetch the details mate",
      },
    });
    cy.visit(
      "https://user-release-v0-24.dev.superfluid.dev/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26"
    );
    cy.contains("We are unable to fetch the stream details right now.");
  });

  it.only("Dynamicly changing Coingecko responses", () => {
    cy.fixture("currencies").then((fixture) => {
      cy.intercept("GET", "**markets**", (req) => {
        req.continue((response) => {
          response.body[0]["current_price"] =
            fixture.fiatValue[req.query["vs_currency"]].multiplier *
            fixture.tokenValues[req.query["ids"]];
        });
      }).as("coingeckoRequest");

      cy.visit(
        "https://user-release-v0-24.dev.superfluid.dev/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26"
      );
      let testTableCurrencies = ["USD", "GBP", "EUR"];
      testTableCurrencies.forEach((currency) => {
        cy.get("[data-cy=fiat_currency]").click();
        cy.get("[data-cy=item-" + currency + "-multi]")
          .filter(":visible")
          .click();
        cy.wait("@coingeckoRequest");
        let flowRate = 9645061728395;
        let secondsPerMonth = 2592000;
        let result = (
          ((flowRate * secondsPerMonth) / 1e18) *
          fixture.fiatValue[currency].multiplier
        ).toFixed(2);
        cy.get("[data-cy=per_month]").should(
          "have.text",
          result + " " + currency
        );
      });
    });
  });
});
