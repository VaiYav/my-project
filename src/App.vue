<template>
  <div id="app">
    <div style="display: flex">
      <div>
        <h2>Value 1</h2>
        <input type="text" v-model.number="value1">
        <h2>Value 2</h2>
        <input type="text" v-model.number="value2">
      </div>
      <div>
        <h2>Result:</h2>
        {{result.toString() || 'None'}}
      </div>
    </div>
    <div>
      <h2>Execute</h2>
      <div
        style="display: flex; justify-content: center;"
      >
        <div
          v-for="(button, buttonIndex) in buttons.filter(b => b.show)"
          :key="buttonIndex">
          <button
            :disabled="!value1.toString() || !value2.toString()"
            @click="executeFunction(button.title)">{{button.title}}</button>
        </div>
      </div>
    </div>
    <div>
      <h2>Buttons manipulation</h2>
      <label v-for="(button, buttonIndex) in buttons" :key="buttonIndex">
        {{button.title}}
        <input type="checkbox" v-model="button.show">
      </label>
    </div>
  </div>
</template>

<script>
import configuration from '../configuration'
export default {
  name: 'App',
  data () {
    return {
      value1: '',
      value2: '',
      result: '',
      buttons: [
        {
          id: 0,
          title: 'sum',
          show: true,
          executeFunc: (value1, value2) => {
            return value1 + value2
          },
          checkErrors: () => {
            return true
          }
        }
      ]
    }
  },
  methods: {
    uniqBy (arr, predicate) {
      const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate]
      return [...arr.reduce((map, item) => {
        const key = (item === null || item === undefined)
          ? item : cb(item)
        map.has(key) || map.set(key, item)
        return map
      }, new Map()).values()]
    },
    sum (value1, value2) {
      return value1 + value2
    },
    executeFunction (name) {
      try {
        this[`${name}CheckErrors`] && this[`${name}CheckErrors`](this.value1, this.value2)
        this.result = this[name](this.value1, this.value2)
      } catch (e) {
        this.result = e
      }
    }
  },
  created () {
    this.buttons = this.uniqBy([...configuration.data, ...this.buttons], 'title')
    this.buttons.forEach(b => {
      this[b.title] = b.executeFunc
      this[`${b.title}CheckErrors`] = b.checkErrors
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
