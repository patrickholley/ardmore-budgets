import store, { Unsubscribe } from '@store';
import HomeStyles from "@styles/home.css?inline"
import { HomeTemplate } from "@html";
import { getStyleElement } from "@utils";

export class HomePage extends HTMLElement {
    private unsubscribe: Unsubscribe | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback(): Promise<void> {
        this.shadowRoot.innerHTML = HomeTemplate;
        this.shadowRoot.appendChild(getStyleElement(HomeStyles));

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
