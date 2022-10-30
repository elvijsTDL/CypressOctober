import { LoginPage } from "../../pageObjects/loginPage";
import { ProductsPage } from "../../pageObjects/productsPage";

describe("Adding and Removing items from the products screen", () => {
  it("Adding first item visible to the cart", () => {
    LoginPage.loginStandardUserWithoutUI("/inventory.html");
    ProductsPage.addFirstItemToCart();
    ProductsPage.verifyAddedItemAmount(1);
    ProductsPage.openCart();
    ProductsPage.verifyLastAddedItemData();
  });

  it.only("Removing items from the cart", () => {
    ProductsPage.setupCartForTests();
    LoginPage.loginStandardUserWithoutUI("/cart.html");
    ProductsPage.removeAllCartItems();
    ProductsPage.verifyEmptyCart();
  });
});
