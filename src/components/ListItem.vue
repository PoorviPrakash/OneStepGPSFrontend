<template>
  <a
    href="#"
    class="list-group-item list-group-item-action flex-column align-items-start mb-3"
    :class="anotherClassObject"
  >
    <div class="w-100 justify-content-between">
      <div class="row">
        <div class="col-10">
          <h5>{{ personName }}</h5>
          <small>{{ deviceId }}</small>
          <p>
            Drive Status : <span class="card-text" :class="classObject"> {{ driveStatus }}</span>
          </p>
        </div>
        <div class="col-2 align-self-center">
          <div>
            <img v-if="this.pinned" src="src/assets/push-pin-blue.png" />
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['personName', 'deviceId', 'driveStatus', 'pinned','i'],
  computed: {
    ...mapState(['deviceData']),
    classObject() {
      return {
        'text-success': this.driveStatus == 'driving',
        'text-danger': this.driveStatus == 'off',
        'text-warning': this.driveStatus == 'idle'
      }
    },
    anotherClassObject() {
      return {
        'border-success': this.driveStatus == 'driving',
        'border-danger': this.driveStatus == 'off',
        'border-warning': this.driveStatus == 'idle'
      }
    }
  }
}
</script>

<style scoped>
.blue-pin {
  background-color: #89cff0;
}
</style>
