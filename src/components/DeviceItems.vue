<template>
  <div class="list-group">
    <!-- <section v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment, please try back
        later
      </p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div> -->
    <div v-for="(data,i) in deviceData" :key="data.id" :value="i">
      <ListItem
        v-if="!data.hidden"
        :person-name="data.display_name"
        :device-id="data.device_id"
        :drive-status="data.latest_accurate_device_point.device_state.drive_status"
        :pinned="data.pinned"
      />
    </div>
    <!-- </section> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ListItem from './ListItem.vue'

export default {
  name: 'DeviceItems',
  computed: {
    ...mapState(['deviceData'])
  },
  methods: {
    ...mapActions(['getDataFromServer'])
  },
  mounted() {
    this.getDataFromServer()
  },
  components: { ListItem  }
}
</script>

<style scoped>
.list-group {
  max-height: 550px;
  background-color: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
