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
const SELECT_CONTAINER = "[data-test=product_sort_container]"
const CHECKOUT_BUTTON = "[data-test=checkout]"
const FIRST_NAME_FIELD = "[data-test=firstName]"
const LAST_NAME_FIELD = "[data-test=lastName]"
const POSTAL_CODE_FIELD = "[data-test=postalCode]"
const CONTINUE_BUTTON = "[data-test=continue]"
const FINISH_BUTTON = "[data-test=finish]"
const THANK_YOU_HEADER = ".complete-header"
const THANK_YOU_IMAGE = "img.pony_express"
const BACK_TO_PRODUCTS_BUTTON = "[data-test=back-to-products]"

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

    static selectSortingOption(option) {
      cy.get(SELECT_CONTAINER).select(option)
    }

  static verifyLowToHighPrices() {
    let actualArray = [];
    cy.get(PRODUCT_PRICES).each(el => {
      actualArray.push(el.text().replace("$",""))
    })
    cy.wrap(actualArray).then(actual =>{
      let expectedArray = [...actual].sort((a,b) => a - b)
      expect(actual).to.deep.eq(expectedArray)
    })
  }

  static verifyHighToLowPrices() {
    let actualArray = [];
    cy.get(PRODUCT_PRICES).each(el => {
      actualArray.push(el.text().replace("$",""))
    })
    cy.wrap(actualArray).then(actual =>{
      let expectedArray = [...actual].sort((a,b) => b - a)
      expect(actual).to.deep.eq(expectedArray)
    })
  }

  static clickOnCheckoutButton() {
    this.click(CHECKOUT_BUTTON)
  }

  static inputShippingDetails(user) {
    cy.fixture("users").then(users => {
      let chosenUser = users[user]
      this.type(FIRST_NAME_FIELD,chosenUser.firstName)
      this.type(LAST_NAME_FIELD,chosenUser.lastName)
      if(chosenUser.postCode){
        this.type(POSTAL_CODE_FIELD,chosenUser.postCode)
      }
    })
  }

  static clickOnContinueButton() {
    this.click(CONTINUE_BUTTON)
  }

  static clickOnFinishButton() {
    this.click(FINISH_BUTTON)
  }

  static verifyThankYouScreen() {
    this.isVisible(THANK_YOU_IMAGE)
    this.hasText(THANK_YOU_HEADER,"THANK YOU FOR YOUR ORDER")
    this.isVisible(BACK_TO_PRODUCTS_BUTTON)
  }
}
