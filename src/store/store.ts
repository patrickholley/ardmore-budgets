type Subscriber = () => void;
export type Unsubscribe = () => void;

interface State {
    [key: string]: any;
}

interface Action {
    type: string;
    payload?: any;
}

class Store {
    private state: State = {};
    private subscribers: Subscriber[] = [];

    getState(): State {
        return this.state;
    }

    subscribe(subscriber: Subscriber): Unsubscribe {
        this.subscribers.push(subscriber);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
        };
    }

    dispatch(action: Action): void {
        this.state = this.reducer(this.state, action);
        this.subscribers.forEach(sub => sub());
    }

    private reducer(state: State, action: Action): State {
        switch (action.type) {
            case 'SET':
                return { ...state, ...action.payload };
            default:
                return state;
        }
    }
}

const store = new Store();

export default store;
