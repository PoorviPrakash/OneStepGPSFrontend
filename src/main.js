import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'

import './assets/main.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLocationPin, faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faLocationPin)

import axios from 'axios'
const store = createStore({
  state() {
    return {
      deviceData: []
    }
  },
  mutations: {
    addToList(state, payload) {
      state.deviceData = payload
      // console.log(state.deviceData)
    },
    resetAllHiddenDevices(state) {
      state.deviceData.forEach((device, index) => {
        device.hidden = false
      })
      // console.log(state.deviceData)
    },
    resetAllPinnedDevices(state) {
      state.deviceData.forEach((device, index) => {
        device.pinned = false
      })
      // console.log(state.deviceData)
    }
  },
  actions: {
    async getDataFromServer(context) {
      let data = await axios.get('http://0.0.0.0:8000/devices')
      //   console.log(data)
      if (data.status == 200) {
        context.commit('addToList', data.data.result_list)
      }
    },
    async postHiddenDevicesToServer() {
      let list = []
      let temp = {}
      this.state.deviceData.forEach((device, index) => {
        if (device.hidden) {
          temp = {}
          temp.Id = device.device_id
          temp.Name = device.display_name
          list.push(temp)
        }
      })
      console.log(list)
      let data = await axios.post('http://0.0.0.0:8000/hideDevice', list)
      if (data.status == 201) {
        console.log('Pushed Hidden Devices to DB')
      }
    },
    async postPinnedDevicesToServer() {
      let list = []
      let temp = {}
      this.state.deviceData.forEach((device) => {
        if (device.pinned) {
          temp = {}
          temp.Id = device.device_id
          temp.Name = device.display_name
          list.push(temp)
        }
      })
      console.log(list)
      let data = await axios.post('http://0.0.0.0:8000/pinDevice', list)
      if (data.status == 201) {
        console.log('Pushed Pinned Devices to DB')
      }
    }
  },
  getters: {
    getLocations: (state) => {
      let locations = []
      let temp = {}
      state.deviceData.forEach((device, index) => {
        temp = {}
        temp.lat = device.latest_accurate_device_point.lat
        temp.lng = device.latest_accurate_device_point.lng
        locations.push(temp)
      })
      //   console.log(locations)
      return locations
    },
    getTitles: (state) => {
      let titles = []
      state.deviceData.forEach((device, index) => {
        titles.push(device.display_name)
      })
      //   console.log(titles)
      return titles
    }
  }
})

const app = createApp(App)

app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
