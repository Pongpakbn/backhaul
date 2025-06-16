<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <h2>ตรวจสอบรถในระบบ</h2>
    </div>
    <v-card class="mt-2" flat rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #[`item.status`]="{ item }">
          <v-chip :color="getStatusColor(item.status)" label variant="outlined">
            {{ item.status }}
          </v-chip>
        </template>
        <template #[`item.details`]>
          <v-btn
            color="primary"
            flat
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
        dialog: false,
        headers: [
          { title: 'ชื่อ - นามสกุล/ ชื่อบริษัท', value: 'name' },
          { title: 'ประเภทรถ', value: 'cartype' },
          { title: 'ทะเบียน', value: 'weight' },
          { title: 'สถานะ', value: 'status' },
          { title: 'จัดการข้อมูล', value: 'details', sortable: false },
          { title: 'วันครบกำหนด', value: 'date', sortable: false },
        ],
        items: [
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            weight: 'กข 4352',
            status: 'รอการอนุมัติ',
            date: '2025-06-15',
          },
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            weight: 'กข 4353',
            status: 'อนุมัติ',
            date: '2025-06-20',
          },
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            weight: 'กข 4354',
            status: 'ส่งกลับเพื่อแก้ไข',
            date: '2025-06-25',
          },
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            weight: 'กข 4355',
            status: 'รอการอนุมัติ',
            date: '2025-06-30',
          },
        ],
      };
    },
    methods: {
      viewStatus (item) {
        alert(`Status for ${item.weight}: ${item.status}`);
      },
      viewDetails () {
        this.$router.push('/admin/car/id')
      },
      getStatusColor (status) {
        switch (status) {
          case 'รอการอนุมัติ':
            return 'primary';
          case 'อนุมัติ':
            return 'green';
          case 'ส่งกลับเพื่อแก้ไข':
            return 'secondary';
          default:
            return 'grey';
        }
      },
    },
  };
</script>
