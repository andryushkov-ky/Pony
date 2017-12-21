import R from 'ramda'

import {
    fetchPonies as fetchPoniesApi
} from '../api'

const kindMap = {
    "Аликорн": "alikornPony",
    "Пегас": "pegasPony",
    "Единорог": "singleHornPony",
    "Земная пони": "earthPony"
}

export const fetchPonies = async (settings) => {
    try {
        let ponies = await fetchPoniesApi();

        return ponies
    } catch (error) {

        return {
            error
        }
    }
}

export const filterPonies = (total, settings) => {
    return R.filter((pony) => {
        return (
            (settings.isNew === null || pony["is_new"] === settings.isNew) &&
            (settings.color === '' || pony.color === settings.color) &&
            (settings.price.min <= pony.price && pony.price <= settings.price.max) &&
            (!Object.keys(settings.kind).length || settings.kind[kindMap[pony.kind]])
        )
    }, total)
}