<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    :center="center"
    style="width: 100%; height: 100vh"
    :zoom="10"
  >
    <Marker :options="{ position: center }" />
    <InfoWindow :options="{ position: center, content: 'Test Map!' }" />
  </GoogleMap>
</template>

<script setup>
  import { GoogleMap, InfoWindow, Marker } from 'vue3-google-map';
  const center = { lat: 13.736717, lng: 100.523186 };
</script>
