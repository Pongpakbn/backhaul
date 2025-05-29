<template>
  <v-card flat rounded="lg">
    <GoogleMap :center="center" style="width: 100%; height: 400px" :zoom="13">
      <Marker :options="{ position: center }" />
      <InfoWindow :options="{ position: center, content: 'Test Map!' }" />
    </GoogleMap>
  </v-card>
</template>

<script setup>
  import { GoogleMap, InfoWindow, Marker } from 'vue3-google-map';
  const center = { lat: 13.736717, lng: 100.523186 };
</script>
