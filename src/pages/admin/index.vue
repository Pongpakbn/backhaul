<template>
  <v-container>
    <h2>ยืนยันผู้ใช้งาน</h2>
    <v-card class="mt-2" rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #item.status="{ item }">
          <v-btn
            class="text-capitalize"
            color="purple"
            size="small"
            variant="outlined"
            @click="viewStatus(item)"
          >
            {{ item.status || 'ไม่ระบุสถานะ' }}
          </v-btn>
        </template>

        <template #item.details="{ item }">
          <v-btn
            color="primary"
            small
            text="ยืนยัน"
            @click="viewDetails(item)"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { title: 'ชื่อ - นามสกุล/ ชื่อบริษัท', value: 'deliveryNumber' },
          { title: 'เลขที่ใบสั่ง', value: 'orderNumber' },
          { title: 'บริษัท', value: 'company' },
          { title: 'สถานะ', value: 'status' },
          { title: 'ข้อมูล', value: 'details', sortable: false },
        ],
        items: [
          {
            deliveryNumber: 'Something delivery',
            orderNumber: '083-343-5345',
            company: 'LSP',
            status: 'รอจัดส่ง',
          },
          {
            deliveryNumber: 'บริษัท แอ๊ดวานซ์',
            orderNumber: '083-343-5345',
            company: 'LSP',
            status: 'รอการอนุมัติ',
          },
          {
            deliveryNumber: 'คุณนัด',
            orderNumber: '083-343-2564',
            company: 'มิลเลนเนียม',
            status: 'รอจัดส่ง',
          },
          {
            deliveryNumber: 'มูเน่ เมเนจเมน',
            orderNumber: '083-243-5343',
            company: 'มิลเลนเนียม',
            status: 'สำเร็จแล้ว',
          },
        ],
      };
    },
    methods: {
      viewStatus (item) {
        alert(`Status for ${item.deliveryNumber}: ${item.status}`);
      },
      viewDetails (item) {
        alert(`Details for ${item.deliveryNumber}`);
      },
    },
  };
</script>
