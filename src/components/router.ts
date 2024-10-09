import '@pages';
import { AppConstants } from "@utils";

class Router {
    routes;

    constructor() {
        this.routes = AppConstants.Routes;
        window.addEventListener('popstate', this.handlePopState.bind(this));
        this.handlePopState();
    }

    handlePopState(): void {
        const { pathname } = window.location;
        let route = this.routes[pathname];

        if (!this.routes.hasOwnProperty(pathname)) {
            window.history.replaceState({}, '/', window.location.origin + '/');
            route = this.routes["/"];
        }

        document.getElementById('app').innerHTML = `<${route}></${route}>`;
    }
}

new Router();
