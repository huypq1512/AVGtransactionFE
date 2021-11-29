import { observable } from "mobx";
import { postRequest } from "../../api";
import { customHistory } from "../router/router";
import { notifiStore } from "../toastNotification/component";

class LoginStore {
    username?: string;
    password?: string;
    @observable errorLogin: boolean = false;
}
class LoginControl {
    store = new LoginStore();
    async login() {
        if (this.store.username && this.store.password) {
            try {
                const { status, body } = await postRequest("login", false, { username: this.store.username, password: this.store.password });
                if (status === 200) {
                    localStorage.setItem("token", body.token);
                    localStorage.setItem("username", this.store.username);
                    // localStorage.setItem("", this.store.username);
                    window.location.replace("/transactionorder");
                }
                else {
                    notifiStore.content = body.message;
                    notifiStore.type = "Error";
                }
            } catch (error) {
            }
        }
    }
    logout() {
        customHistory.replace("/login");
        localStorage.clear();
    }
}
export const control = new LoginControl();