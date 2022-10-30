import { LoginPage } from "../../pageObjects/loginPage";
import { ProductsPage } from "../../pageObjects/productsPage";

after(() => {
  //DON'T LEAVE WEBHOOK LINKS IN PUBLIC REPOSITORIES , USE SECRETS FOR THIS
  cy.request("POST","https://discord.com/api/webhooks/955086226547965952/WuaK1GMcRDVkOexPEz60OETIorJOvQeX4L1ftw7jDn_NuDM_g5J20FkMAcY_mMoUmXPr",
      {
        username: "Elvijs Webhook",
        content: "Mister, the products page test cases are done"
      })
})

describe("Adding and Removing items from the products screen", () => {
  it("Adding first item visible to the cart", () => {
    LoginPage.loginStandardUserWithoutUI("/inventory.html");
    ProductsPage.addFirstItemToCart();
    ProductsPage.verifyAddedItemAmount(1);
    ProductsPage.openCart();
    ProductsPage.verifyLastAddedItemData();
  });

  it("Removing items from the cart", () => {
    ProductsPage.setupCartForTests();
    LoginPage.loginStandardUserWithoutUI("/cart.html");
    ProductsPage.removeAllCartItems();
    ProductsPage.verifyEmptyCart();
  });

  it("Sorting items visible in the products screen - Low To High" , () => {
    LoginPage.loginStandardUserWithoutUI("/inventory.html");
    ProductsPage.selectSortingOption("lohi")
    ProductsPage.verifyLowToHighPrices()
  })

  it("Sorting items visible in the products screen - High to low" , () => {
    LoginPage.loginStandardUserWithoutUI("/inventory.html");
    ProductsPage.selectSortingOption("hilo")
    //Mini task to see if you understood whats going on in this course
    ProductsPage.verifyHighToLowPrices()
  })

  it("Checking out with some items added to the cart" , () => {
    ProductsPage.setupCartForTests();
    LoginPage.loginStandardUserWithoutUI("/cart.html");
    ProductsPage.clickOnCheckoutButton()
    ProductsPage.inputShippingDetails("bob")
    ProductsPage.clickOnContinueButton()
    ProductsPage.clickOnFinishButton()
    ProductsPage.verifyThankYouScreen()
  })

  it("Postal code is required error during checkout" , () => {
    ProductsPage.setupCartForTests();
    LoginPage.loginStandardUserWithoutUI("/cart.html");
    ProductsPage.clickOnCheckoutButton()
    ProductsPage.inputShippingDetails("alice")
    ProductsPage.clickOnContinueButton()
    LoginPage.verifyErrorMessage("Error: Postal Code is required")
  })

});
