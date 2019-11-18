# exercise2done

In this exercise, you are tasked to build a trading app using what you have just learnt.

- The trading app will allow user to buy and sell stocks. 
- The user can select which stocks to buy in the stocks tab. 
- Once the user buys the stock, it will appear in the portfolio tab. 
- When the user sold all the stocks, it will disappear from the portfolio tab.
- The user cannot sell more stocks then he/she have already bought.
- The user cannot buy 0 stocks.
- The user will start the app with $10,000 capital.
- As the user buys the stocks the capital decreases.
- And if the user sells the stocks, the capital increases.
- There will be a "end the day" button that will end the day and recalcuate the stock price for the next day.

Bonus: User can save their progress and load their progress.
(require a database for this, e.g. firebase)


---

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
