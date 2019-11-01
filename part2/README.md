# Using Vue.js in development

## Vue CLI
``` sudo npm install -g vue-cli ```

Vue CLI comes with 4 different settings:
- simple
- webpack-simple
- webpack
- browsify/browsify-simple

#### Install Vue CLI
``` sudo npm install -g vue-cli ```

#### Initiate vue workfolder
``` vue init webpack-simple vue-cli ```

1. initiate accordingly:
```
project name: vue-cli
project description: vue project
project author: Isaac
```

2. cd into the file:
  ``` cd vue-cli ```

3. npm i
  ``` npm i ```

4. npm run dev
  ``` npm run dev ```

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

*Note data in the .vue file is slightly different because of the different instances that it create.

- it needs to return the different object stored in the different part of the memory. 
- If not, different places using the same component will have the same data.

### Create a new component
- Add a new file name home
  ```
  <template>
    <div>
      <p>Server status: {{ status }}</p>
      <hr>
      <button @click="changeStatus">Change Status</button>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          status: 'Critical'
        }
      },
      methods: {
        changeStatus() {
          this.status = 'Normal';
        }
      }
    }
  </script>
  ```

- Add to main.js file
  ```
  import Home from './home.vue'

  Vue.component('app-server-status', Home),
  ```

### Adding child component
  - Add a new file call child.vue
    ```
    <template>
      <p>Baby Ruth is so {{ description }}</p>
    </template>

    <script>
      export default {
        data() {
          return {
            description: 'CUTE!'
          }
        }
      }
    </script>
    ```

  - Add the component into the home.vue
    ```
    <template>
      <div>
        <p>Server status: {{ status }}</p>
        <hr>
        <button @click="changeStatus">Change Status</button>
        // Add the selector as a HTML tag
        <child></child>
      </div>
    </template>
    
    <script>
      // import the component
      import Child from './child.vue'

      export default {
        // declare the child with the selector
        components: {
          'child': Child
        },
        data() {
          return {
            status: 'Critical'
          }
        },
        methods: {
          changeStatus() {
            this.status = 'Normal';
          }
        }
      }
    </script>
    ```

### Passing data from parent to child
  - Add props property to child
    ```
    <template>
      // change Ruth to {{ name }}
      <p>Baby {{ name }} is so {{ description }}</p>
    </template>
    ```
    ```
    <script>
      export default {
        // add the props property
        props: ['name'],
        data() {
          return {
            description: 'CUTE!'
          }
        }
      }
    </script>
    ```
  - In the parent file we need to specify the name to pass to the child
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
            description: 'CUTE!'
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
  - We need to emit a custom event 
  ```
  methods: {
    resetName() {
      this.$emit('resetName', this.name)
    }
  }
  ```
  - In the parent component
  ```
  // add the listener to the custom event
  <child :name='name' @resetName='name = $event'></child>

  ```
  ```
  // add
  <p>my child name is {{ name }}</p>
  ```

### Life cycle hooks
  init with ```new Vue()```
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
      // add slot
      <slot></slot>
    </template>
  ```
- multiple slots
  ```
    // add name to slot
    <slot name="title"></slot>
  ```
  ```
    // in parent, add slot name to content
    <p slot="title">Hello I am baby Ruth!</p>
  ```

## Router
  - install vue router:
    ```
    npm install --save vue-router
    ```
  - add vue-router to applicaiton:
    ```
    // in main.js
    import VueRouter from 'vue-router';

    Vue.use(VueRouter);

    ```
  - create a routes.js file:
    ```
      import Baby from './components/baby/Baby.vue';

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
    // in the main.js we add the router view
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

## Exercise 2
 
