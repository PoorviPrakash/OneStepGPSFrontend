<script>
import DeviceItems from '@/components/DeviceItems.vue'
import GoogleMaps from './components/GoogleMaps.vue'
import NavBar from '@/components/NavBar.vue'
import { mapActions } from 'vuex'
import PrefSetterVue from './components/PrefSetter.vue'

export default {
  name: 'app',
  components: {
    DeviceItems,
    GoogleMaps,
    NavBar,
    PrefSetterVue
  },
  methods: {
    ...mapActions(['getDataFromServer']),
    ready: function () {
      setInterval(
        function () {
          this.getDataFromServer()
          console.log('last call : ' + new Date())
        }.bind(this),
        5000
      )
    }
  },
  mounted() {
    this.ready()
  }
}
</script>

<template>
  <div>
    <NavBar />
    <div class="container-fluid text-align">
      <div class="row">
        <div class="col m-5">
          <div class="card">
            <div class="card-body">
              <div class="row justify-content-end">
                <div class="col-10"></div>
                <div class="col-2">
                  <PrefSetterVue />
                </div>
              </div>
              <div class="row">
                <div class="col-4"><DeviceItems /></div>
                <div class="col-8">
                  <GoogleMaps />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
