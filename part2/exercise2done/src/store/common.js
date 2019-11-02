import Vue from 'vue'

export const loadDataFromDB = ({ commit }) => {
  Vue.http.get('data.json').then(response => response.json()).then(data => {
    if (data) {
      const stocks = data.stocks
      const funds = data.funds
      const stocksPortfolio = data.stocksPortfolio

      const portfolio = {
        stocksPortfolio,
        funds
      }
      commit('SET_STOCKS', stocks)
      commit('SET_PORTFOLIO', portfolio)
    }
  })
}