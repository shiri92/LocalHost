<template>
  <div class="google-map">
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="4.5"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker"
        :clickable="true"
        :draggable="false"
        @click="panLocation(marker)"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: ['responses'],
  data() {
    return {
      center: {},
      markers: [],
    };
  },
  created() {
    let places = this.responses.map(response => response.source.placeDetails.mapAddress);
    this.markers = places.map(place => ({
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng
    }));
    this.setCenter(this.markers[0]);
    // this.panCurrLocation();
  },
  methods: {
    setCenter(pos) {
      this.center = pos;
    },

    async panLocation(pos) {
      const map = await this.$refs.mapRef.$mapPromise;
      map.panTo(pos);
    },

    panCurrLocation() {
      navigator.geolocation.getCurrentPosition(position =>
        this.panLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }));
    },
  }
};
</script>