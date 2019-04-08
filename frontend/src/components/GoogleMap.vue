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
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
      />
      <!-- @click="setCenter(m.position)" -->
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
      places: [],
    };
  },
  mounted() {
    // this.geolocate();
  },
  created() {
    let places = this.responses.map(response => {
      return response.source.placeDetails.mapAddress;
    })
    this.addMarkers(places);
  },
  methods: {
    addMarkers(locations) {
      locations.forEach(location => {
        const marker = {
          lat: location.geometry.location.lat,
          lng: location.geometry.location.lng
        };
        this.markers.push({ position: marker });
        this.places.push(location);
      });
      this.center = this.markers[0].position;
      console.log('center: ', this.center);
      
    },
    // geolocate() {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.center = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };
    //   });
    // },
    // setCenter(pos) {
    //   this.$refs.mapRef.$mapPromise.then(map => {
    //     map.panTo(pos);
    //   });
    // },
  }
};
</script>

<style scoped lang="scss">
.google-map {
  background-color: white;
}
</style>
