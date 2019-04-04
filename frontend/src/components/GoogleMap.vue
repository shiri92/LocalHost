<template>
  <div class="google-map">
    <!-- <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete @place_changed="addMarker"></gmap-autocomplete>
      </label>
      <br>
    </div>
    <br>-->
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width: 100%; height: 275px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="setCenter(m.position)"
      />
      <!-- @click="center=m.position" -->
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 32.088007, lng: 34.8031678 },
      markers: [
        { position: { lat: 32.088007, lng: 34.8031678 } },
      ],
      places: [],
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // setPlace(place) {
    //   this.currentPlace = place;
    // },
    addMarker(place) {
      this.currentPlace = place;
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    setCenter(pos) {
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo(pos);
      });
    },
  }
};
</script>

<style scoped lang="scss">
.google-map {
  background-color: white;
}
</style>
