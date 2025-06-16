<template><v-container>
  <v-row class="align-center mb-4">
    <!-- ซ้าย -->
    <v-col cols="12" md="8">
      <h2>การจองในระบบ</h2>
      <p class="opacity-50">4 รายการ</p>
    </v-col>

    <!-- ขวา -->
    <v-col class="d-flex justify-end" cols="12" md="4">
      <v-text-field
        v-model="search"
        density="compact"
        hide-details
        placeholder="ค้นหาจากชื่อ"
        prepend-inner-icon="mdi-magnify"
        rounded="md"
        single-line
        style="background-color: white;"
        variant="outlined"
        width="200px"
      />
    </v-col>
  </v-row>

  <v-card class="mt-2 rounded-md" flat>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="items"
      :items-per-page="5"
    >
      <template #[`item.action`]="{ item }">
        <v-btn color="primary" prepend-icon="mdi-tag-outline" text="รายละเอียด" @click="$router.push(`/partner/booking/${item.id}`)" />
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
          { title: '#', value: 'index', sortable: false },
          { title: 'ชื่อผู้จอง', value: 'name' },
          { title: 'ประเภทรถ', value: 'type' },
          { title: 'สถานะ', value: 'status' },
          { title: 'วันที่', value: 'date' },
          { title: 'จัดการ', value: 'action', sortable: false },
        ],
        items: [
          {
            index: 1,
            name: 'สมชาย ใจดี',
            type: 'รถ 4 ล้อ(ตู้ทึบ)',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
          },
          {
            index: 2,
            name: 'นภา สวยงาม',
            type: 'รถ 6 ล้อ',
            status: 'กำลังจัดส่ง',
            date: '23/02/2025',
          },
          {
            index: 3,
            name: 'กิตติ พัฒนา',
            type: 'เรถ 4 ล้อ',
            status: 'รอจัดส่ง',
            date: '24/02/2025',
          },
          {
            index: 4,
            name: 'สุนันทา รักเรียน',
            type: 'รถ 6 ล้อ',
            status: 'จัดส่งสำเร็จ',
            date: '21/02/2025',
          },
          {
            index: 5,
            name: 'วีระชัย กล้าหาญ',
            type: 'อุปกรณ์กีฬา',
            status: 'รอจัดส่ง',
            date: '25/02/2025',
          },
        ],
      };
    },
    methods: {
      viewReceipt (item) {
        // Add logic to view the receipt, e.g., open a dialog or navigate to a new page
        console.log('View receipt for:', item);
      },
    },
  };
</script>
