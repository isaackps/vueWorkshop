# Using Vue.js in development

## Vue CLI

#### Install Vue CLI (npm not working)

``` yarn global add @vue/cli ```
*note: use node 8.12.0



#### create vue workfolder
``` vue create vue-example ```

1.  use default:
```
default(babel, eslint)
and follow the instructions
```

2. cd into the file:
  ``` cd vue-example ```

3. yarn serve
  ``` yarn serve ```

#### .vue file
inside the .vue file there will be 3 sections:
- template
  ```
  <template>
    <div id="app">
      <p>hello world!</p>
    </div>
  </template>
  ```
- script
  ```
  <script>
    export default {
      name: 'app',
      data() {
        return {
          msg: 'Welcome to Your vue.js App'
        }
      }
    }
  </script>
  ```
- style
  ```
  <style>
    #app {
      color: #123456;
      margin-top: 20px;
    }
  </style>
  ```

*Note the style can be in a scss or another css file

### Data() {}  will look different
*Note data() in the .vue file is slightly different because of the different instances that it create.

- it needs to return the different object stored in the different part of the memory. 
- If not, different places using the same component will have the same data.

### Create a new component
- Add a new file name home
  ```
  <template>
    <div>
      <p>Hi my name is: {{ name }}</p>
      <button @click="changeName">click me to change name</button>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          name: 'Isaac'
        }
      },
      methods: {
        changeName() {
          this.name = 'Esther';
        }
      }
    }
  </script>
  ```

- Add to main.js file
  ```
  import Home from './home'

  components: {
    Home
  }
  ```

### Passing data from parent to child
  - Firstly, in the parent file we need to specify the name to pass to the child
    ```
    <child :name="name"></child>
    ```
    ```
    <script>
      export default {
        data() {
          return {
            name: 'Esther'
          }
        }
      }
    </script>
    ```
  - Add type validation to props
    ```
    <script>
      export default {
        // change it from an array to an object
        props: {
          name: String
          // name: [String, Array] <---- can be of multiple type
        },
        data() {
          return {
            // remove this name data
            // name: 'Isaac'
          }
        }
      }
    </script>
    ```
  - Make it more strict
    ```
    <script>
      export default {
        props: {
          // String change to an object
          name: {
            type: String,
            required: true,
            default: 'Ruth'
          }
        },
        data() {
          return {
            description: 'CUTE!'
          }
        }
      }
    </script>
    ```
### Pass data from child to parent
  - We need to emit a custom event in the child component
  ```
  methods: {
    changeName() {
      this.$emit('changeName', 'Esther')
    }
    // Show the difference with this code
    // changeName() {
    //  this.name = 'Esther
    // }
  }
  ```
  - In the parent component
  ```
  // add the listener to the custom event
  <child :name='name' @changeName='name = $event'></child>

  ```
  ```
  // add
  <p>my child name is {{ name }}</p>
  ```

### Life cycle hooks
  1) beforeCreate
  2) created
  3) beforeMount
  4) mounted
  5) beforeUpdate
  6) updated
  7) beforeDestroy
  8) destroyed

### slots
- what are slots? 
- it is what vue js provides for passing content into component
- E.g. of slots:
  ```
  // in the parent file
  <child :name='name' @resetName='name = $event'>
    // add content to child
    <div>
      <p>Hello I am baby Ruth!</p>
    </div>
  </child>
  ```
  ```
  // in the child component
  <template>
      <p>Baby {{ name }} is so {{ description }}</p>
      // add slot (looks like a place holder)
      <slot></slot>
    </template>
  ```

## Router
  - install vue router:
    ```
    yarn add vue-router
    ```
  - add vue-router to applicaiton:
    ```
    // in main.js
    import VueRouter from 'vue-router';

    Vue.use(VueRouter);

    ```
  - create a routes.js file:
    ```
      import Home from './components/home.vue';

      export const routes = [ 
        { path: '/baby', component: Baby }
      ];
    ```
  - Use routes.js in main.js
    ```
    // add import
    import { routes } from './routes';

    Vue.use(vueRouter);

    // add a new router
    const router = new VueRouter({
      routes
    })

    new Vue({
      el: "#app",
      //add the new router into the instance
      router,
      render: h => h(App)
    })
    ```
  
  ### Add the ```<router-view></router-view>``` so vue will know where to change the component 
    ```
    // in the app.js we add the router view
    <router-view></router-view>
    ```

  - Change the mode from hash to history
    ```
    const router = new VueRouter({
      routes,
      //change it to history to remove the '#'
      mode: 'history'
    })
    ```
### add links
  - Add router links ```<router-link></router-link>```
    ```
    <router-link to="/">Home</router-link>
    ```

## Vuex
  - install Vuex
    ```
    yarn add vuex
    ```
  - create store folder and store.js
    ```
    src > store > store.js
    ```
  - Set up the store in store.js
    ```
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex)

    export const store = new Vuex.Store({
      state: {
        name: ''
      }
    })
    ```
  - Add the store to the root vue instance in main.js
    ```
    import { store } from './store/store'

    new Vue({
      router,
      //add the store inside the Vue instance
      store,
      render: h => h(App),
    }).$mount('#app')
    ```
  - Use the state stored in store in the component
    ```
    //create a new component and in the component
    import { mapState } from 'vuex'

    computed: {
      ...mapState(['name'])
    }
    ```
    ```
    //to show it in the dom in template
    <template>
      <div>
      <p>{{ name }}</p>
      </div>
    </template>
    ```
  #### Actions and Mutations
  - To change a state in the store we need a mutation
  - To make fire the mutation we need to dispatch an action
    ```
    // Lets start with mutaion
    // in store.js file we add the mutations: {} after the state: {}
    // we want to change the name in the store so our mutation should set the name

    mutations: {
      setName: (state, payload) => {
        state.name = payload
      }
    }

    ```
  - Next we add the actions
    ```
    actions: {
      setName: ({ commit }, payload) => {
        commit('setName', payload)
      }
    }
    ```
  - Link up the actions with the component using mapActions
    ```
    // in the component
    import { mapActions } from 'vuex'

    methods: {
      ...mapActions(['setName']),
      changeName() {
        this.setName('Jonathan')
      }
    }

    ```
    ```
    // in the template

    <button @click="changeName">change name</button>
    ```
  ### Getters
  - Add Getters
    ```
    get the state from the store and perform any calculations it should preform and return as the new state.

    in the store
    state: {
      name: 'Isaac Koh',
      //add age
      age: 21
    }
    getters: {
      ageAddTen: (state) => {
        return state.age + 10
      }
    }

    ```
  - in the component we use mapGetters like mapState to get the calculated state
    ```
    import { mapGetters } from 'vuex

    computed: {
      ...mapGetters(['ageAddTen'])
    }

    ```
    ```
    // use it in template

    <p>{{ name }} {{ ageAddTen }} {{ age }}</p>

    ```
  

## Exercise 2 Start
  - First we install the dependencies
    ```
    yarn install
    ```
  
  - Run the app
  ```
  yarn serve
  ```

### Create the components with the template first
  - In components folder we create:
    - Home.vue
    - Header.vue
    - stocks folder
      - Stock.vue
      - Stocks.vue
    - portfolio folder
      - Portfolio.vue
      - Stock.vue
  ```
  // all the template will look something like this:
  <template>
    <h1>The Home Component</h1>
  </template>
  ```

### Create the routes
  - Add routes to the router.index file
  ```
  // add imports for the components
  import Home from '../components/Home.vue'
  import Portfolio from '../components/portfolio/Portfolio.vue'
  import Stocks from '../components/stocks/Stocks.vue'

  // reconstruct the routes so its simplier like this 
  const routes = [
    { path: "/", component: Home},
    { path: "/portfolio", component: Portfolio},
    { path: "/stocks", component: Stocks}
  ]
  ```
  - Add ``` <router-view></router-view> ``` to App.vue to display the components

### Create Header and Navigation
  - go to: https://getbootstrap.com/docs/3.4/components/#navbar for the bootstrap navbar
  - paste the code in to Header.vue && strip out all the unneccessary codes
  ```
  // in the navbar-header we remove the button and replace the <a> to a <router-link>
  <div class="navbar-header">
    <router-link class="navbar-brand" to="/">Stock trader</router-link>
  </div>
  ```
  ```
  // remove the dropdown 
  // Replace the <li></li> links with:
  <router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
  <router-link to="/stocks" activeClass="active" tag="li"><a>Stocks</a></router-link>
  ```
  ```
  // remove the <form>
  ```
  ```
  // leave the link and change the text in the link to "End day!"
  ```
  ```
  // in the dropdown section change the label to 'Save and Load'
  // change the dropdown menu to 'Save Date' and 'Load Data'
  <li><a href="#">Save Data</a></li>
  <li><a href="#">Load Data</a></li>
  ```
  end product should look like this:
  ```
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
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">End day!</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Save and Load<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Save Data</a></li>
                <li><a href="#">Load Data</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  ```
  - In App.vue
  ```
  import Header from './components/Header'

  //add the component to the file
  components: {
    Header
  }
  ```
  ```
  <div class="container">
      // in the template section
      <Header></Header>
      <router-view></router-view>
    </div>
  ```
  - Style it alittle nicer
  ```
  <template>
    <div id="app">
      <div class="container">
        <Header></Header>
        <div class="row">
          <div class="col-xs-12">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </template>
  ```
### Creating Stocks components
  - First we go into Stocks.js
  - we create stocks data
  ```
  <script>
  export default {
    data() {
      return {
        stocks: [
          { id: 1, name: 'BMW', price: 110 },
          { id: 2, name: 'Google', price: 200 },
          { id: 3, name: 'Apple', price: 250 },
          { id: 4, name: 'Twitter', price: 80 },
        ]
      }
    }
  }
  </script>
  ``` 
  - Next we need to loop through the stocks and display them
  - So we go into stock.js in stocks folder
  ```
  // build it according to this:
  <template>
    <div class="col-sm-6 col-md-4">
      <div class="panel panel-success">
        <div class="panel-heading">
          <h3 class="panel-title">
            NAme
            <small>(Price: Price)</small>
          </h3>
        </div>

        <div class="panel-body">
          <div class="pull-left">
            <input type="number" class="form-control" placeholder="Quantity">
          </div>
          <div class="pull-right">
            <button class="btn btn-success">Buy</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  ```
  - integrate with stocks.js without passing data
  ```
  import Stock from './Stock'

  components: {
    Stock
  }
  ```
  ```
  <div>
    <Stock v-for="(stock, i) in stocks" :key="i"></Stock>
  </div>
  ```
  - Pass stocks to stock using props
  ```
  // we add the :stock="stock" so that the Stock can take it as the prop.
  <Stock v-for="(stock, i) in stocks" :key="i" :stock="stock"></Stock>
  ```
  ```
  // In the stock.vue we use the prop that is being passed in 

  props: ['stock']

  //and replace the 'name' and 'price' with {{stock.name}} and {{stock.price}}
  ```
  - Next we bind the quantity
  ```
  data() {
    return (
      quantity: 0
    )
  }

  // and bind it to the input
  <input type="number" class="form-control" placeholder="Quantity" v-model="quantity">
  ```
  - Next, we create a buy stock method without connecting to vuex
  ```
  // we add the @click="buyStock"
  <button class="btn btn-success" @click="buyStock">Buy</button>

  // we create the methods
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      }
      console.log(order)
      this.quantity = 0;
    }
  }

  ```
  - Next we want to disable the button when quantity is smaller then 0
  ```
  // we add it to the button
  :disabled="quantity <= 0"
  ```
  ### Generate Data
  - before we integrate with vuex we need some data for the stocks
  - so we will create a data folder in src
  - and in the data folder we create a file name stocks.js
  ```
  export default [
    { id: 1, name: 'BMW', price: 110 },
    { id: 2, name: 'Google', price: 200 },
    { id: 3, name: 'Apple', price: 250 },
    { id: 4, name: 'Twitter', price: 80 }
  ]
  ```

  ### Intgrate vuex
  - we seperate the component into modules in the store
  - so we create a store.js file and a portfolio.js in store folder
  In store.js file
  ```
  import stocks from '../data/stocks'

  const state = {
    stocks: []
  }

  const mutations = {
    'SET_STOCKS' (state, stocks) {
      state.stocks = stocks
    },
    'RND_STOCKS' (state) {

    }
  }

  const actions = {
    initStocks: ({ commit }) => {
      commit('SET_STOCKS', stocks)
    },
    randomizeStocks: ({ commit }) => {
      commit('RND_STOCKS')
    }
  }

  const getters = {
    stocks: state => {
      return state.stocks
    }
  }

  export default {
    state,
    actions,
    mutations,
    getters
  }
  ```
  - Back at the store > index.js file
  ```
  // we import the module store
  import Vue from "vue";
  import Vuex from "vuex";

  import stocks from './stocks'

  Vue.use(Vuex);

  export default new Vuex.Store({
    modules: {
      stocks
    }
  });
  ```

  ### Add portfolio
  - Next we go to portfolio.js in the store folder
  ```
  const state = {
    funds: 10000,
    stocks: []
  }

  const mutations = {
    'BUY_STOCKS' (state, { stockId, stockPrice, quantity }) {
      const record = state.stocks.find(element => element.id === stockId)
      if (record) {
        record.quantity += quantity
      } else {
        state.stocks.push({
          id: stockId,
          quantity: quantity
        })
      }
      state.funds -= stockPrice * quantity
    },
    'SELL_STOCK' (state, { stockId, stockPrice, quantity }) {
      const record = state.stocks.find(element => element.id === stockId)
      if (record.quantity > quantity) {
        record.quantity -= quantity
      } else {
        state.stocks.splice(state.stocks.indexOf(record), 1)
      }
      state.funds += stockPrice * quantity
    }
  }

  const actions = {
    buyStocks: ({ commit }, order) => {
      commit('BUY_STOCKS', order)
    },
    sellStocks: ({ commit }, order) => {
      commit('SELL_STOCK', order)
    }
  }

  const getters = {
    stock (state, getters) {
      return state.stocks.map(stock => {
        const record = getters.stocks.find(element => element.id === stock.id)
        return {
          id: stock.id,
          quantity: stock.quantity,
          name: record.name,
          price: record.price
        }
      })
    },
    funds (state) {
      return state.funds
    }
  }

  export default {
    state,
    actions,
    mutations,
    getters
  }
  ```
- hook up the portfolio store module
  ```
  // in store > index.js

  import portfolio from './portfolio'

  modules: {
      stocks,
      // add it in
      portfolio
    }
  ```
  - hook up the buy button
  ```
  // in the Stock.vue file in stocks import actions and update buyStocks method
  import { mapActions } from 'vuex'

  methods: {
      ...mapActions(['buyStocks']),
      buyStock() {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        }
        this.buyStocks(order)
        this.quantity = 0;
      }
    }
  ```
### Display portfolio
  - First copy the stock.vue file in Stocks and paste it into the portfolio stocks.vue file
  - Remove buyStock method keep the mapActions
  - Add a quantity so quantity can be shown
  ```
    <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
  ```
  - Change the color of the box to blue
  ```
  <div class="panel panel-info">
  .
  .
  . 
  </div>
  ```
  - Change the buy button to sell && add a sellStock method
  - Change the mapActions to link with portfolio sellStock action
  ```
  ...mapActions(['sellStocks'])
  sellStock() {
    const order = {
      stockId: this.stock.id,
      stockPrice: this.stock.price,
      quantity: this.quantity
    }
    this.sellStocks(order)
    this.quantity = 0
  }
  ```
### connecting portfolio to portfolio-stocks
  - Add Stock component
  ```
  <div>
    <Stock v-for="(stock, i) in stocks" :key="i" :stock="stock"></Stock>
  </div>
  ```
  ```
  // import the component
  import Stock from './Stock'

  components: {
    Stock
  }
  ```
  - Add getter to get the stock from store
  ```
  import { mapGetters } from 'vuex'

  computed: {
    ...mapGetters(['stocks'])
  }
  ```

### display funds
  - First, we will display it at the home page
  ```
  <template>
    <div>
      <h1>Trade or view your Portfolio</h1>
      <h6>You may Save & Load your Data</h6>
      <h6>Click on 'End Day' to begin a New Day!</h6>
      <hr>
      <p>Your Funds: {{ funds }}</p>
    </div>
  </template>

  <script>
  // add mapGetters to get the funds
  import { mapGetters } from 'vuex'

  export default {
    computed:{
      ...mapGetters(['funds'])
    }
  }
  </script>
  ```
  - Add funds to header
  ```
  // add above navbar-right
  <strong class="navbar-text navbar-right">Funds: {{ funds }}</strong>
  ```
  ```
  // add the script block for funds
  <script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['funds'])
    }
  }
  </script>
  ```
### Add logic for funds so that we cannot buy more then the funds we have and sell more then the stocks we have
  - in stocks/Stock.vue
  ```
  // add a computed function to check for the funds
  // import mapGetters also
  computed: {
    ...mapGetters(['funds']),
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds
    }
  },
  ```
  ```
  // add the insufficientFunds function to the disabled condition for the button
  <button class="btn btn-success" 
  @click="buyStock" 
  :disabled="quantity <= 0 || insufficientFunds"
  >
  // change the text to display conditionally
    {{ insufficientFunds ? 'Not Enough' : 'Buy'}}
  </button>
  ```
  ```
  // add a red boarder around the input field when there is insufficient funds
  <input type="number" class="form-control" placeholder="Quantity" v-model="quantity" :class="{danger: insufficientFunds}">
  ```
  ```
  // add a style block for the danger
  <style scoped> //the scoped is only for this component
    .danger {
      border: 1px solid red;
    }
  </style>
  ```
  - Next we need to add for portfolio/stocks.vue so we cannot sell more than what we have
  ```
  // Add computed function
  computed: {
    insufficientQuantity() {
      return this.quantity > this.stock.quantity
    }
  },
  ```
  ```
  // add the insufficientQuantity to the button check
  <button class="btn btn-success" 
    @click="sellStock" 
    :disabled="quantity <= 0 || insufficientQuantity"
    >
  ```
  ```
  // change the text depending on the quantity
  {{ insufficientQuantity ? 'Not Enough' : 'Sell' }}
  ```
  ```
  // add  and bind the danger class 
  <input type="number" class="form-control" placeholder="Quantity" v-model="quantity" :class="{danger: insufficientQuantity}">
  ```
  ```
  // copy the same scoped style for danger class
  <style scoped> //the scoped is only for this component
    .danger {
      border: 1px solid red;
    }
  </style>
  ```
### Add filter to make funds look better
  - go to main.js and add the global filter
  ```
  Vue.filter('currency', (value) => {
    return '$' + value.toLocaleString()
  })
  ```
  - go to the 2 place to update the funds
  ```
  // in header.vue
  Funds: {{ funds | currency }}
  ```
  ```
  // in home.vue
  Your Funds: {{ funds | currency }}
  ```
### Add end the day function
  - Add the end day method in header.vue
  ```
  // import mapActions
  // add in the method that will call randomizeStocks action

  methods: {
    ...mapActions(['randomizeStocks']),
    endDay() {
      this.randomizeStocks()
    }
  }
  ```
  - In the randomizeStocks mutation we need to update it
  ```
  'RND_STOCKS' (state) {
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5))
    })
  }
  ```
  - Go back to Header.vue and hook up the button witht the endDay method
  ```
  // add the @click="endDay"
  <li><a href="#" @click="endDay">End day!</a></li>
  ```
### Add transition animation for routing
  - App.vue we add a transition tag
  ```
  <div class="col-xs-12">
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
  ```
  ```
  // in styles we add in the animation using keyframes

  .slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }

  .slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
  ```
### Adding a dropdown for saving and loading data
  - In Header.vue we add some data() {} for the drop down
  ```
  data() {
    return {
      isDropDownOpen: false
    }
  }
  ```
  ```
  // we add a click event and bind the class as shown
  <li class="dropdown" :class="{open: isDropDownOpen}" @click="isDropDownOpen = !isDropDownOpen">
  ```
### Set up vue-resource and firebase for saving and loading
  - First we add the vue-resource dependency ``` yarn add vue-resource ```
  - Then we add it in the main.js
  ```
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  ```
  - We go to firebase and set up a project
  - follow the instruction and set up a project
  - once its setup, go to develop > database
  - Set up test server in your desired location
  - change it to realtime database
  - Go to rules tab and set read and write to true
  - copy the url at the top
  - go back to main.js and add the url
  ```
  Vue.http.options.root = 'https://vueworkshop-c3d6c.firebaseio.com/'
  ```
###  start storing data
  - Go back to header and add saveData() method 
  ```
  saveData() {
    const data = {
      funds: this.funds,
      stocksPortfolio: this.stocksPortfolio,
      stocks: this.stocks 
    }
    this.$http.put('data.json', data)
  }
  ```
  - hook up with the save data dropdown selection
  ```
  <li><a href="#" @click="saveData">Save Data</a></li>
  ```
### load the data that was save into firebase
  - Add a click listener in the dropdown selector to load data
  ```
  <li><a href="#" @click="loadData">Load Data</a></li>
  ```
  - Create a new action file name common.js in the store folder
  - Add the action for the common.js
  ```
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
  ```
  - Go to portfolio.js and add in the 'SET_PORTFOLIO' mutation
  ```
  'SET_PORTFOLIO' (state, portfolio) {
    state.funds = portfolio.funds
    state.stocks = portfolio.stocksPortfolio ? portfolio.stocksPortfolio : []
  }
  ```
  - Go to Header.vue and link it all up
  ```
  // import action 'loadDataFromDB'
  
  loadData() {
    this.loadDataFromDB()
  }
  ```
  - Go to store > index.js and import common actions in
  ```
  import * as actions from './common'

    export default new Vuex.Store({
    modules: {
      stocks,
      portfolio
      
    },
    // add it in as actions
    actions
  });
  ```

## DONE!! MISSION COMPLETE!!
