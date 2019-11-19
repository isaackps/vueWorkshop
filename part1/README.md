# vue Workshop

## Introduction to Vue.js

**What is Vue.js?**

Vue.js is a progressive framework for building user interfaces.

**Part 1**

We will go through and introduce the basics of vue js in this js fiddle.
https://jsfiddle.net/chrisvfritz/50wL7mdz/

1. Vue render data to the DOM using straightforward template syntax
 	- We can use the ```{{ message }}``` to define the template
	- Then use the key defined in the ```data: { message: 'hello world' }``` to display it in the DOM

2. Directives
	- Directives are prefixed with ```v-```
	E.g. v-if, v-else , v-bind, v-for 
	```
	v-if=”show”, show: true/false
	v-else
	v-bind:title=”title”, title=’abc’
	```
	
3. 2-way data binding
		- using ```v-model```
		- e.g. ```
			<input type=”text” v-model=”name”>
			<p>{{ name }}</p>
			data: {name: isaac}
		```

4. Listening to events 
	- Using ```v-on:click```
	```
	<button v-on:click=”increase”> click me </button>
	<p>{{ counter }} </p>
	data: { counter: 0 }
	methods: { increase() { return this.increase++ } }
	```
	- Methods are just normal functions

5. Computed 
	- Computed is also a function but vue sees it as a more intelligent object
	- Only activates when needed
	- When we use it we do not use the parentheses
	- E.g. ```{{ output }}```
	```
	computed: { 
		output() {
			Return this.counter > 5 ? ‘yes’ : ‘no’
		}
	}
	```
	- For computed property vue.js analyse the code and is aware when to use the function

Now, code along to build the mini game with the basics that you just learn
