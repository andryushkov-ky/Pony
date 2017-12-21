import React, {Component} from 'react'

import Popup from '../Popup'

class App extends Component {
    constructor (props) {
        super (props);

        this.state = {
            openPopup: false
        };

    }

    togglePopup (status, e) {
        e && e.preventDefault();

        this.setState({
            openPopup: status
        });
    }

    render () {
        return (
            <div className="main">
                <div className="main__wrap-link">
                    <a href="#" onClick={this.togglePopup.bind(this, true)} className="main__link">Открыть фильтр</a>
                </div>
                {this.state.openPopup &&
                    <Popup togglePopup={this.togglePopup.bind(this, false)} />
                }
                <div
                    onClick={this.togglePopup.bind(this, false)}
                    className="shadow">
                </div>
            </div>
        )
    }
}

export default App