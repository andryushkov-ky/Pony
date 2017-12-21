import React, {Component} from 'react'
import InputRange from 'react-input-range';
import R from 'ramda';

const colors = ["Фиолетовый", "Зеленый", "Синий", "Красный"];

const FilterWrapCheckbox = ({name, label, checked, toggleKind}) => {
    return (
        <div className="filter__wrap-checkbox">
            <label className="filter__label-checkbox" htmlFor={name}>{label}</label>
            <input name={name} id={name} type="checkbox" className="filter__checkbox" checked={checked} onChange={toggleKind.bind(this, name)}/>
        </div>
    )
};

class Filter extends Component {
    constructor (props) {
        super(props);

        this.state = {
            color: '',
            kind: {
                singleHornPony: true,
                earthPony: true,
                pegasPony: true,
                alikornPony: true
            },
            price: { min: 0, max: 100 },
            isNew: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleKind = this.toggleKind.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();

        this.props.filterData(this.state);
    }

    toggleKind (name, {target}) {
        const kind = {
            [name]: target.checked
        };

        this.setState((prevState, props) => {
            return {
                kind: R.merge(prevState.kind, kind)
            }
        })
    }

    render () {
        return (
            <form className="filter" onSubmit={ this.handleSubmit }>
                <div className="filter__settings">
                    <div className="filter__type">
                        <h4 className="filter__title">Цвет пони</h4>
                        <div className="filter__body">
                            <select value={this.state.color} className="filter__select" onChange={({target}) => {this.setState({ color: target.value })}}>
                                <option value="">- - -</option>
                                {colors.map((color, index) => {return (<option key={index} value={color}>{color}</option>)})}
                            </select>
                        </div>
                    </div>
                    <div className="filter__type">
                        <h4 className="filter__title">Вид</h4>
                        <div className="filter__body">
                            <FilterWrapCheckbox name="earthPony" label="Земная пони" checked={this.state.kind.earthPony} toggleKind={this.toggleKind} />
                            <FilterWrapCheckbox name="singleHornPony" label="Единорог" checked={this.state.kind.singleHornPony} toggleKind={this.toggleKind} />
                            <FilterWrapCheckbox name="pegasPony" label="Пегас" checked={this.state.kind.pegasPony} toggleKind={this.toggleKind} />
                            <FilterWrapCheckbox name="alikornPony" label="Аликорн" checked={this.state.kind.alikornPony} toggleKind={this.toggleKind} />
                        </div>
                    </div>
                    <div className="filter__type filter__type--price">
                        <h4 className="filter__title">Цена</h4>
                        <div className="filter__body">
                            <div className="filter__range-wrap">
                                <InputRange
                                    maxValue={100}
                                    minValue={0}
                                    value={this.state.price}
                                    onChange={price => this.setState({ price })} />
                            </div>
                        </div>
                    </div>
                    <div className="filter__type">
                        <h4 className="filter__title">Новинка</h4>
                        <div className="filter__body">
                            <div className="filter__wrap-checkbox filter__wrap-checkbox--nova">
                                <label className="filter__label-checkbox" htmlFor="isNew">Да/Нет</label>
                                <input name="isNew" id="isNew" type="checkbox" className="filter__checkbox" onChange={({target}) => { this.setState({ isNew: target.checked })}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter__wrap-btn">
                    <button className="filter__btn" type="submit">Найти</button>
                </div>
            </form>
        )
    }
}

export default Filter;