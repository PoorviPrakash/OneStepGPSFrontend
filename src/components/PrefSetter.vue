<template>
  <div class="float-right">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-dark mt-3 mb-3 ml-3 mr-0"
      data-toggle="modal"
      data-target="#prefModal"
    >
      Set Preferences
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="prefModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="prefModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="prefModalLabel">Set Preferences</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col"><h6>Select all devices to hide :</h6></div>
              <div class="col">
                <select
                  class="form-select w-100"
                  multiple
                  aria-label="multiple select example"
                  v-model="selected"
                >
                  <option v-for="(data, i) in deviceData" :key="data.id" :value="i">
                    {{ data.display_name }}
                  </option>
                </select>
              </div>
            </div>
            <br />
            <!-- <div class="row">
              <div class="col"><h6>Select Display Order:</h6></div>
              <div class="col">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="aToZ" />
                  <label class="form-check-label" for="flexRadioDefault1"> A -> Z </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="zToA" />
                  <label class="form-check-label" for="flexRadioDefault1"> Z -> A </label>
                </div>
              </div>
            </div>
            <br/> -->
            <div class="row">
              <div class="col"><h6>Select all devices to pin :</h6></div>
              <div class="col">
                <select
                  class="form-select w-100"
                  multiple
                  aria-label="multiple select example"
                  v-model="pinSelected"
                >
                  <option v-for="(data, i) in deviceData" :key="data.id" :value="i">
                    {{ data.display_name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-dark"
              @click="onSaveChange()"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'PrefSetter',
  data() {
    return {
      selected: [],
      pinSelected: []
    }
  },
  computed: {
    ...mapState(['deviceData'])
  },
  methods: {
    ...mapActions(['getDataFromServer', 'postHiddenDevicesToServer', 'postPinnedDevicesToServer']),
    ...mapMutations(['resetAllHiddenDevices', 'resetAllPinnedDevices']),
    onSaveChange() {
      this.resetAllPinnedDevices()
      console.log(this.pinSelected)
      this.pinSelected.forEach((element) => {
        this.deviceData[element].pinned = true
      })
      console.log(this.deviceData)
      this.postPinnedDevicesToServer()
      this.resetAllHiddenDevices()
      this.selected.forEach((element) => {
        this.deviceData[element].hidden = true
      })
      console.log(this.deviceData)
      this.postHiddenDevicesToServer()
    }
  }
}
</script>

<style scoped></style>
