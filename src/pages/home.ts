import HomeStyles from "@styles/home.css?inline"
import HomeTemplate from "@templates/home.html?raw";
import getStyleElement from '@utils/getStyleElement';
import store, {Unsubscribe} from "@store/store";

class HomePage extends HTMLElement {
    private unsubscribe: Unsubscribe | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback(): Promise<void> {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = HomeTemplate;
            this.shadowRoot.appendChild(getStyleElement(HomeStyles));
        }

        this.unsubscribe = store.subscribe(() => {
            //TODO: Implement
        });
    }

    disconnectedCallback(): void {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

customElements.define('home-page', HomePage);

export default HomePage;
