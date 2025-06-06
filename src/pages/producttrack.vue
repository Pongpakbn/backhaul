<template>
  <v-container>
    <h1>ติดตาม</h1>
    <h3>กรอกหมายเลขพัสดุส่งของ.</h3>
    <div class="d-flex align-center mt-6 ga-4">
      <v-text-field
        density="comfortable"
        hide-details
        max-width="400px"
        style="background-color: white;"
        variant="outlined"
      />
      <v-btn color="primary" flat size="large" text="ค้นหา" />
    </div>
    <div class="d-flex justify-end">
      <v-btn
        color="primary"
        flat
        prepend-icon="mdi-printer"
        size="large"
        text="Print Invoice"
      />
    </div>
    <v-card class="mt-4" flat>
      <v-card-text>
        <v-img max-height="200" src="@/assets/img/Barcode.svg" />
        <v-row>
          <v-col cols="12" md="6">
            <h2>Shipper Information</h2>
            <v-divider class="mt-2 mb-2" />
            <div class="d-flex ga-4">
              <p>Firesun</p>
              <p>028889999</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <h2>Receiver Information</h2>
            <v-divider class="mt-2 mb-2" />
            <div class="d-flex ga-4">
              <p>LCB Port</p>
              <p>0863332332 nb.natthakrit@gmail.com</p>
            </div>
          </v-col>
        </v-row>
        <v-card class="mt-4 mb-4 text-center" flat style="background-color: #E5EEF8;">
          <v-card-text>
            <h3>Shipment Status: BKK Warehouse</h3>
          </v-card-text>
        </v-card>
        <h2>Shipment Information</h2>
        <v-divider class="mt-2 mb-2" />
        <v-row>
          <v-col cols="4">
            <p>Origin: Samut Sakhon</p>
          </v-col>
          <v-col cols="4">
            <p>Package: Pallet</p>
          </v-col>
          <v-col cols="4">
            <p>Status: BKK Warehouse</p>
          </v-col>
          <!-- sec 2 -->
          <v-col cols="4">
            <p>Destination: Chonburi</p>
          </v-col>
          <v-col cols="4">
            <p>Carrier: BKK</p>
          </v-col>
          <v-col cols="4">
            <p>Type of Shipment:Ship to Port</p>
          </v-col>
          <!-- sec 3 -->
          <v-col cols="4">
            <p>Weight: 1000</p>
          </v-col>
          <v-col cols="4">
            <p>Shipment Mode: Sea Transport</p>
          </v-col>
          <v-col cols="4">
            <p>Carrier Reference No. : BL12345678</p>
          </v-col>
          <!-- sec 4 -->
          <v-col cols="4">
            <p>Product: Fruit Frozen </p>
          </v-col>
          <v-col cols="4">
            <p>Qty: 100</p>
          </v-col>
          <v-col cols="4">
            <p>Payment Mode: CASH</p>
          </v-col>
          <!-- sec 5 -->
          <v-col cols="4">
            <p>Total Freight: </p>
          </v-col>
          <v-col cols="4">
            <p>Expected Delivery Date: 2023-07-03</p>
          </v-col>
          <v-col cols="4">
            <p>Departur Time:</p>
          </v-col>
          <!-- sec 6 -->
          <v-col cols="4">
            <p>Pickup Date : 30-05-2025 </p>
          </v-col>
          <v-col cols="4">
            <p>Pickup Time: 17:00 pm</p>
          </v-col>
          <v-col cols="12">
            <p>Comments:</p>
          </v-col>
        </v-row>
        <h3 class="mt-4">Packages</h3>
        <v-divider class="mt-2 mb-2" />
        <v-data-table
          class="mt-2"
          :headers="headers"
          hide-default-footer
          :items="items"
        />
        <v-card flat style="background-color: #E5EEF8;">
          <v-card-text>
            <v-row align="center" class="text-center">
              <v-col cols="12" md="4">
                <h4>Total Volumetric Weight : 0.0040g..</h4>
              </v-col>
              <v-col cols="12" md="4">
                <h4>Total Volume : 20.00cu. m.</h4>
              </v-col>
              <v-col cols="12" md="4">
                <h4>Total Actual Weight : 20.00g.</h4>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <h3 class="mt-4">Shipment History</h3>
        <v-divider class="mt-2 mb-2" />
        <v-data-tablea
          :headers="packageHeaders"
          hide-default-footer
          :items="packageItems"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          { title: 'Qty', value: 'qty' },
          { title: 'Piece Type', value: 'pieceType' },
          { title: 'Description', value: 'description' },
          { title: 'Length(m)', value: 'length' },
          { title: 'Width(m)', value: 'width' },
          { title: 'Height(m)', value: 'height' },
          { title: 'Weight(g)', value: 'weight' },
        ],
        items: [
          { qty: 10, pieceType: 'Pallet', description: 'Pine Apple', length: 1, width: 1, height: 2, weight: 2 },
        ],
        packageHeaders: [
          { title: 'Date', value: 'date' },
          { title: 'Time', value: 'time' },
          { title: 'Location', value: 'location' },
          { title: 'Status', value: 'status' },
          { title: 'Updated By', value: 'updatedBy' },
          { title: 'Remark', value: 'remark' },
        ],
        packageItems: [
          { date: '30-05-2025', time: '17:00 pm', location: 'BKK Warehouse', status: '', updatedBy: 'Admin', remark: '' },
        ],
      }
    },
  }
</script>
