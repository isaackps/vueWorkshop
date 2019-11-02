<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
       <div class="navbar-header">
        <router-link class="navbar-brand" to="/">Stock trader</router-link>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
          <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
        </ul>
        <strong class="navbar-text navbar-right">Funds: {{ funds | currency }}</strong>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#" @click="endDay">End day!</a></li>
          <li class="dropdown" :class="{open: isDropDownOpen}" @click="isDropDownOpen = !isDropDownOpen">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Save and Load<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#" @click="saveData">Save Data</a></li>
              <li><a href="#" @click="loadData">Load Data</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      isDropDownOpen: false
    }
  },
  computed: {
    ...mapGetters(['funds', 'stocksPortfolio', 'stocks'])
  },
  methods: {
    ...mapActions(['randomizeStocks', 'loadDataFromDB']),
    endDay() {
      this.randomizeStocks()
    },
    saveData() {
      const data = {
        funds: this.funds,
        stocksPortfolio: this.stocksPortfolio,
        stocks: this.stocks 
      }
      this.$http.put('data.json', data)
    },
    loadData() {
      this.loadDataFromDB()
    }
  }
}
</script>
