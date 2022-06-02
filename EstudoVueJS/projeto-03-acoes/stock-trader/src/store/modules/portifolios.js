export default {
    state: {
        funds: 10000,
        stocks: []
    },
    mutations: {
        buyStock(state, { stockId, stockPrice, quantity, name }) {           
            const record = state.stocks.find(element => element.id == stockId)
            if (record) {
                record.quantity += quantity
            } else {
                state.stocks.push({
                    id: stockId,
                    quantity: quantity,
                    price: stockPrice,
                    name: name
                })
            }
            state.funds -= stockPrice * quantity
        },
        sellStock(state, { stockId, quantity, stockPrice }) {
            var record = state.stocks.find(element => element.id == stockId)
            if (record.quantity > quantity) {
                record.quantity -= quantity
            }
            else {
                state.stocks.splice(state.stocks.indexOf(record), 1)
            }          
            state.funds += stockPrice * quantity
        }
    },
    actions: {
        sellStock({ commit }, order) {
            commit('sellStock', order)
        }
    },
    getters: {
        stockPortifolio(state, getters) {
            return state.stocks.map(stock => {
                 const record = getters.stocks.find(element => element.id = stock.id)                               
                return {
                    id: stock.id,
                    quantity: stock.quantity,
                    name: stock.name,
                    price: stock.price
                }
            })
        }
    }
}