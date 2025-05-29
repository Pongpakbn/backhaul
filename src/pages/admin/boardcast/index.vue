<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <h2>การจองที่ไม่พบรถ</h2>
    </div>
    <v-card class="mt-2" rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #item.details="{ item }">
          <v-btn
            color="primary"
            text="ตรวจสอบ"
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
        dialog:false,
        headers: [
          { title: 'หมายเลขการจอง', value: 'id' },
          { title: 'ประเภทรถ', value: 'cartype' },
          { title: 'เส้นทาง', value: 'route' },
          { title: 'เวลา', value: 'time' },
          { title: 'จัดการข้อมูล', value: 'details', sortable: false },
        ],
        items: [
          {
            id: 'BH3ac23',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            route: 'สงขลา → สมุทปราการ',
            time: '12/02-2568 ,13:00 น.',
          },
          {
            id: 'BH3ac23',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            route: 'สงขลา → สมุทปราการ',
            time: '12/02-2568 ,13:00 น.',
          },
          {
            id: 'BH3ac23',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            route: 'สงขลา → สมุทปราการ',
            time: '12/02-2568 ,13:00 น.',
          },
          {
            id: 'BH3ac23',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            route: 'สงขลา → สมุทปราการ',
            time: '12/02-2568 ,13:00 น.',
          },
        ],
      };
    },
    methods: {
      viewStatus (item) {
        alert(`Status for ${item.id}: ${item.status}`);
      },
      viewDetails (item) {
        alert(`Details for ${item.id}`);
      },
    },
  };
</script>
