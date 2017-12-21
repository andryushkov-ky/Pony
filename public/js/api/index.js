import request from "superagent"

export const fetchPonies = () => {
    return new Promise((resolve, reject) => {
        request
            .get("http://www.mocky.io/v2/5a3b8cea300000641282d200")
            .then(({body}) => {
                resolve(body.ponies)
            })
            .catch(({message}) => {
                reject(message)
            })
    })
}