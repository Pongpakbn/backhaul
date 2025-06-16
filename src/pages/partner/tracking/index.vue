<template><v-container>
  <h2>ติดตาม</h2>
  <v-card class="mt-2 rounded-md" flat>
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="items"
      :items-per-page="5"
    >
      <template #[`item.action`]="{ item }">
        <!-- <v-btn color="primary" prepend-icon="mdi-tag-outline" text="รายละเอียด" @click="$router.push(`/partner/tracking/id`)" /> -->
        <v-btn color="primary" prepend-icon="mdi-tag-outline" text="รายละเอียด" @click="$router.push(`/partner/tracking/${item.id}`)" />
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
          { title: 'หมายเลขงาน', value: 'index', sortable: false },
          { title: 'คนขับรถ', value: 'driver' },
          { title: 'ประเภทรถ', value: 'type' },
          { title: 'แผนการเดินรถ', value: 'route' },
          { title: 'วันที่', value: 'date' },
          { title: 'จัดการ', value: 'action', sortable: false },
        ],
        items: [
          {
            index: 1,
            driver: 'สมเกียรติ ศรีสุข',
            type: 'รถ 6 ล้อ',
            route: 'เชียงใหม่ - กรุงเทพฯ',
            date: '22/02/2025',
          },
          {
            index: 2,
            driver: 'ประวิทย์ จันทร์ดี',
            type: 'รถ 4 ล้อ',
            route: 'กรุงเทพฯ - พัทยา',
            date: '23/02/2025',
          },
          {
            index: 3,
            driver: 'นฤมล แสงดาว',
            type: 'รถ 10 ล้อ',
            route: 'ขอนแก่น - กรุงเทพฯ',
            date: '24/02/2025',
          },
          {
            index: 4,
            driver: 'ชัยวัฒน์ ทองคำ',
            type: 'รถ 6 ล้อ',
            route: 'กรุงเทพฯ - ภูเก็ต',
            date: '21/02/2025',
          },
          {
            index: 5,
            driver: 'สุรีย์พร ใจกล้า',
            type: 'รถกระบะตู้ทึบ',
            route: 'เชียงราย - กรุงเทพฯ',
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
