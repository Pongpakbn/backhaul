<template>
  <v-container>
    <div class="d-flex justify-end">
      <v-btn
        color="primary"
        flat
        prepend-icon="mdi-tag"
        rounded="md"
        size="large"
        text="Account Copy"
      />
    </div>
    <v-card v-for="n in 3" :key="n" class="border-thin rounded-lg mt-6" flat>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-img src="@/assets/img/Barcode.svg" />
          </v-col>
          <v-col class="d-flex flex-column justify-center align-certer" cols="4">
            <h3>Pickup Date:  30-05-2025</h3>
          </v-col>
          <v-col class="d-flex flex-column justify-center align-certer" cols="4">
            <h3>Pickup Time:  14:30 pm</h3>
          </v-col>
          <v-col class="d-flex justify-center" cols="4">
            <h3>Account Copy</h3>
          </v-col>
          <v-col cols="4">
            <h3>Delivery Date:  30-05-2025</h3>
          </v-col>
        </v-row>
        <v-divider class="mt-5 mb-5" />
        <v-row>
          <v-col cols="4">
            <h3>Origin : Samut Sakhon</h3>
          </v-col>
          <v-col cols="4">
            <h3>Destination: Chonburi</h3>
          </v-col>
          <v-col cols="4">
            <h3>Courier: FPS</h3>
          </v-col>
          <v-col cols="4">
            <h3>Carrier: BKK</h3>
          </v-col>
          <v-col cols="4">
            <h3>Carrier Reference No: BL12345678</h3>
          </v-col>
          <v-col cols="4">
            <h3>Departure Time:</h3>
          </v-col>
          <v-col cols="4">
            <h3>Shipper</h3>
          </v-col>
          <v-col cols="4">
            <h3>Firesun : 028889999</h3>
          </v-col>
          <v-col cols="4">
            <h3>Consignee</h3>
          </v-col>
        </v-row>
        <v-divider class="mt-5 mb-5" />
        <v-row>
          <v-col cols="12">
            <h3>LCB Port : 0863332332 (nb.natthakrit@gmail.com)</h3>
          </v-col>
          <v-col cols="4">
            <h3>Status: BKK Warehouse</h3>
          </v-col>
          <v-col cols="4">
            <h3>Type of Shipment: Ship to Port</h3>
          </v-col>
          <v-col cols="4">
            <h3>Packages: Pallet</h3>
          </v-col>
          <v-col cols="4">
            <h3>Product: Fruit Frozen</h3>
          </v-col>
          <v-col cols="4">
            <h3>Weight: 1000</h3>
          </v-col>
          <v-col cols="4">
            <h3>Quanity: 100</h3>
          </v-col>
          <v-col cols="4">
            <h3>Payment Mode: CASH</h3>
          </v-col>
          <v-col cols="4">
            <h3>Mode: Sea Transport</h3>
          </v-col>
          <v-col cols="12">
            <h3>Comment:</h3>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
