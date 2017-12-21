import '../css/style.pcss'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './containers/App'

class Main {
    constructor () {
        this.renderApp()
    }

    renderApp() {
        const container = document.getElementById("app");

        ReactDOM.unmountComponentAtNode(container);
        ReactDOM.render(
            <App />,
            container
        );
    }
}

new Main();