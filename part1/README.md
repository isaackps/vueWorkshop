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
	- https://marozed.ma/vue-cheatsheet/
	- Directives are prefixed with ```v-```
	E.g. v-if, v-else , v-bind, v-for 
	```
	v-if=”show”, show: true/false
	v-else

	// one-way data binding
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
	- Computed properties are cached based on their reactive dependencies.
	- A computed property will only re-evaluate when some of its reactive dependencies have changed.
	- Thus, we do not need to use the parentheses when calling the function
	- E.g. ```use {{ output }}, not {{ output() }}```
	```
	computed: { 
		output() {
			Return this.counter > 5 ? ‘yes’ : ‘no’
		}
	}
	```

Now, code along to build the mini game with the basics that you just learn
