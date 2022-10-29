import {LoginPage} from "../../pageObjects/loginPage";
import {ProductsPage} from "../../pageObjects/productsPage";

describe("Adding and Removing items from the products screen" , () => {

    it("Adding first item visible to the cart" , () => {
        LoginPage.loginStandardUserWithoutUI()
        ProductsPage.addFirstItemToCart()
        ProductsPage.verifyAddedItemAmount(1)
        ProductsPage.openCart()
        ProductsPage.verifyLastAddedItemData()
    })

})