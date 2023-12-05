import { CheckIfNotEmpty } from "./utils";

export default {
    isAuthenticated: false,
    isLoggedIn() {
        return (
            this.isAuthenticated &&
            CheckIfNotEmpty(window.sessionStorage.authToken)
        );
    },
    authenticate(token) {
        if (CheckIfNotEmpty(token)) {
            this.isAuthenticated = true;
            window.sessionStorage.authToken = token;
        }
    },
    signOut() {
        this.isAuthenticated = false;
        window.sessionStorage.clear();
    }
};
