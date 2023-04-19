<template>
  <div class="w-100">
    <GoogleMap
      ref="map"
      api-key="AIzaSyChj8PLgXcitZk67mAxJ4tBCE0_4uMmA5U"
      style="width: 100%; height: 550px"
      mapTypeId="roadmap"
      :center="center"
      :zoom="zoom"
    >
      <MarkerCluster>
        <Marker
          v-for="(location, i) in getLocations"
          :options="{
            position: location,
            icon: iconImage,
            Label: { text: getTitles[i], color: '#000000' }
          }"
          :key="i"
          @click="zoomToLocation(location, i)"
        >
          <InfoWindow>
            <div class="infoWindowText">{{ getTitles[i] }}</div>
          </InfoWindow>
        </Marker>
      </MarkerCluster>
    </GoogleMap>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map'
import { mapState, mapGetters } from 'vuex'

export default defineComponent({
  components: { GoogleMap, Marker, MarkerCluster, InfoWindow },
  data() {
    return {
      center: { lat: 37.0902, lng: -100.7129 },
      zoom: 4,
      iconImage: 'src/assets/location-arrow.svg'
    }
  },
  computed: {
    ...mapState(['selectedItem']),
    ...mapGetters(['getLocations', 'getTitles'])
  },
  methods: {
    zoomToLocation(clickedLocation, i) {
      // console.log(this.$refs.map)
      // this.center = clickedLocation
      // this.zoom = 15
      // console.log('center changed')
    }
  }
})
</script>

<style scoped>
.infoWindowText {
  color: black;
}
</style>
