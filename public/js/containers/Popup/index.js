import React, {Component} from 'react'
import R from 'ramda'

import Filter from '../../components/Filter'

import {
    fetchPonies,
    filterPonies
} from '../../actions'

class Popup extends Component {
    constructor (props) {
        super(props);

        this.state = {
            currentPage: 1,
            filterPonies: [],
            totalPonies: []
        };

        this.amountPoniesOnPage = 5;

        this.filterData = this.filterData.bind(this);
        this.renderPony = this.renderPony.bind(this);
        this.filterPonies = filterPonies.bind(this);
    }

    componentDidMount () {
        fetchPonies().then((ponies) => {
            const uniqPonies = R.uniq(ponies);

            this.setState({
                filterPonies: uniqPonies,
                totalPonies: uniqPonies
            })
        })
    }

    changePage (page) {
        this.setState({
            currentPage: page
        });
    }

    renderPony (pony, index) {
        return (
            <div key={index} className="popup__row">
                <div className="popup__col">{pony.name}</div>
                <div className="popup__col">{pony.color}</div>
                <div className="popup__col">{pony.kind}</div>
                <div className="popup__col">{pony.price}</div>
                <div className="popup__col">{pony[`is_new`] ? "Да" : "Нет"}</div>
            </div>
        )
    }

    renderPagination () {
        const { filterPonies } = this.state;
        const pages = filterPonies.length / this.amountPoniesOnPage;
        const pageCeil = Math.ceil(pages);
        let box =[];

        if (pages > 1) {
            for (let i = 0; i < pageCeil; i++) {box.push(i+1)}
            return (
                <div className="popup__pagination">
                    {box.map((page, index) => (
                        <div
                            onClick={this.changePage.bind(this, page)}
                            className={`popup__page ` + `${page === this.state.currentPage ? "popup__page--active" : ""}`}
                            key={index}>
                            {page}
                        </div>
                    ))}
                </div>
            )
        }
    }

    filterData (settings) {
        const filterPonies = this.filterPonies(this.state.totalPonies, settings);

        this.setState({
            filterPonies
        })
    }

    render() {
        const {filterPonies, currentPage} = this.state;
        const start = currentPage*this.amountPoniesOnPage - this.amountPoniesOnPage;
        const end = currentPage*this.amountPoniesOnPage;

        return (
            <div className="popup">
                <div className="popup__header">
                    <h2 className="popup__title">Пони</h2>
                    <div
                        onClick={this.props.togglePopup}
                        className="popup__close">
                    </div>
                </div>
                <div className="popup__filter">
                    <Filter filterData={this.filterData} />
                </div>
                <div className="popup__table">
                    <div className="popup__row">
                        <div className="popup__col">Имя</div>
                        <div className="popup__col">Цвет</div>
                        <div className="popup__col">Вид</div>
                        <div className="popup__col">Цена</div>
                        <div className="popup__col">Новый</div>
                    </div>
                    {filterPonies && filterPonies.slice(start, end).map((pony, index) => this.renderPony(pony, index))}
                    {!filterPonies.length &&
                        <div className="popup__row popup__row--empty">
                            Пони не найдены
                        </div>
                    }
                </div>
                {this.renderPagination()}
            </div>
        )
    }
}

export default Popup