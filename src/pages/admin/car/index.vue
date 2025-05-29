<template>
  <v-container>
    <div class="d-flex justify-space-between align-center ">
      <h2>ตรวจสอบรถในระบบ</h2>
    </div>
    <v-card class="mt-2" rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #item.status="{ item }">
          <v-btn
            color="primary"
            text="ตรวจสอบ"
            variant="outlined"
            @click="viewDetails(item)"
          />
        </template>
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
          { title: 'ชื่อ - นามสกุล/ ชื่อบริษัท', value: 'name' },
          { title: 'ประเภทรถ', value: 'cartype' },
          { title: 'ทะเบียน', value: 'weight' },
          { title: 'สถานะ', value: 'status' },
          { title: 'จัดการข้อมูล', value: 'details', sortable: false },
        ],
        items: [
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            weight: 'กข 4352',
            parent: '0/12',
          },
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            weight: 'กข 4352',
            parent: '0/22',
          },
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            weight: 'กข 4352',
            parent: '22/23',
          },
          {
            name: 'รถ 4 ล้อ (ตู้ทึบ)',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            weight: 'กข 4352',
            parent: '12/24',
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
