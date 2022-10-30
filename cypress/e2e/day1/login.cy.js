import { ProductsPage } from "../../pageObjects/productsPage";
import { LoginPage } from "../../pageObjects/loginPage";
import { BasePage } from "../../pageObjects/basePage";

describe("Login test cases", () => {
  before(() => {
    cy.log(
      "Starting all the test cases and doing something before all of them - !!!ONCE!!!"
    );
  });

  after(() => {
    cy.log("All test cases have ran , lets do something !!!!ONCE!!!!");
  });

  beforeEach(() => {
    //Ids should be unique in the web page, best bet for a good CSS selector in pages
    //Where you don't have access to the source code and can't add attributes yourself
    cy.visit("/");
  });

  afterEach(() => {
    cy.log("Running after each of the test cases inside the describe block");
  });

  it("Logging in with a valid user", () => {
    LoginPage.inputLoginDataAndLogin("standard_user", "secret_sauce");
    ProductsPage.checkIfContainerVisible();
  });

  it("Logging in with incorrect login details", () => {
    LoginPage.inputLoginDataAndLogin("standard_user", "skdfjghjshdfgkjhsdfgk");
    LoginPage.verifyErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Logging in with a locked user", () => {
    LoginPage.inputLoginDataAndLogin("locked_out_user", "secret_sauce");
    LoginPage.verifyErrorMessage(
      "Epic sadface: Sorry, this user has been locked out."
    );
    ProductsPage.verifyContainerNotExisting();
  });

  it("Trying to log in without a password", () => {
    LoginPage.inputUsername("locked_out_user");
    LoginPage.clickLoginButton();
    LoginPage.verifyErrorMessage("Epic sadface: Password is required");
  });

  it("Trying to log in without a username", () => {
    LoginPage.inputPassword("password");
    LoginPage.clickLoginButton();
    LoginPage.verifyErrorMessage("Epic sadface: Username is required");
  });

  it("Closing the error message", () => {
    LoginPage.inputPassword("password");
    LoginPage.clickLoginButton();
    LoginPage.closeAndVerifyErrorMessage();
  });

  it("Logging in without using the UI and just using the cookies", () => {
    BasePage.loginStandardUserWithoutUI("/inventory.html");
    ProductsPage.checkIfContainerVisible();
  });
});
