import {BasePage} from "./basePage";

const USER_NAME_FIELD = "#user-name"
const PASSWORD_FIELD = "[data-test=password]"
const LOGIN_BUTTON = "[data-test=login-button]"
const ERROR_MESSAGE = "[data-test=error]"
const CLOSE_ERROR_BUTTON = ".error-button"

export class LoginPage extends BasePage {

    static inputLoginDataAndLogin(username,password) {
        this.type(USER_NAME_FIELD,username)
        this.type(PASSWORD_FIELD,password)
        this.click(LOGIN_BUTTON)
    }

    static verifyErrorMessage(error) {
        this.hasText(ERROR_MESSAGE,error)
    }

    static clickLoginButton() {
        this.click(LOGIN_BUTTON)
    }

    static inputPassword(password) {
        this.type(PASSWORD_FIELD,password)
    }

    static inputUsername(username) {
        this.type(USER_NAME_FIELD,username)
    }

    static closeAndVerifyErrorMessage() {
        this.click(CLOSE_ERROR_BUTTON)
        this.doesNotExist(ERROR_MESSAGE)
    }

}