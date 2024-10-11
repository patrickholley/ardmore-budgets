import BudgetTemplate from "@templates/budget.html?raw";
//import getStyleElement from '@utils/getStyleElement';
import store, {Unsubscribe} from "@store/store";

class Budget extends HTMLElement {
    private unsubscribe: Unsubscribe | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback(): Promise<void> {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = BudgetTemplate;
            //this.shadowRoot.appendChild(getStyleElement(HomeStyles));
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

customElements.define('ard-budge', Budget);

export default Budget;
