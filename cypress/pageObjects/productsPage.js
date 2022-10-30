import { BasePage } from "./basePage";

const INVENTORY_CONTAINER = ".inventory_container";
const ADD_TO_CART_BUTTONS = "[data-test^=add-to-cart]";
const CART_BUTTON = "#shopping_cart_container";
const PRODUCT_CONTAINER = ".inventory_item_description";
const REMOVE_BUTTONS = "[data-test^=remove]";
const PRODUCT_NAMES = ".inventory_item_name";
const CART_BADGE = ".shopping_cart_badge";
const PRODUCT_DESCRIPTIONS = ".inventory_item_desc";
const PRODUCT_PRICES = ".inventory_item_price";
const ALL_BUTTONS = PRODUCT_CONTAINER + " button";
const CART_ITEMS = ".cart_item";

export class ProductsPage extends BasePage {
  static checkIfContainerVisible() {
    this.isVisible(INVENTORY_CONTAINER);
  }

  static verifyContainerNotExisting() {
    this.doesNotExist(INVENTORY_CONTAINER);
  }

  static addFirstItemToCart() {
    cy.get(ALL_BUTTONS)
      .first()
      .should("have.text", "Add to cart")
      .and("have.css", "color", "rgb(226, 35, 26)");
    this.clickFirst(ADD_TO_CART_BUTTONS);
    //Verify that the first item containers button changes to remove
    cy.get(PRODUCT_CONTAINER).first().find(REMOVE_BUTTONS).should("be.visible");
    this.saveFirstElementTextAsAlias(PRODUCT_NAMES, "productName");
    this.saveFirstElementTextAsAlias(
      PRODUCT_DESCRIPTIONS,
      "productDescription"
    );
    this.saveFirstElementTextAsAlias(PRODUCT_PRICES, "productPrice");
    cy.get(ALL_BUTTONS)
      .first()
      .should("have.text", "Remove")
      .and("have.css", "color", "rgb(71, 76, 85)");
  }

  static verifyLastAddedItemData() {
    this.validateFirstElementTextByAlias(PRODUCT_NAMES, "productName");
    this.validateFirstElementTextByAlias(
      PRODUCT_DESCRIPTIONS,
      "productDescription"
    );
    this.validateFirstElementTextByAlias(PRODUCT_PRICES, "productPrice");
  }

  static openCart() {
    this.click(CART_BUTTON);
  }

  static verifyAddedItemAmount(amount) {
    this.hasText(CART_BADGE, amount);
  }

  static setupCartForTests() {
    window.localStorage.setItem("cart-contents", "[0,1,2,3,4,5]");
  }

  static removeAllCartItems() {
    cy.get(REMOVE_BUTTONS).click({ multiple: true });
  }

  static verifyEmptyCart() {
    this.doesNotExist(CART_ITEMS);
    this.doesNotExist(CART_BADGE);
  }
}
