<template>
  <v-container>
    <h2>ติดตามการขนส่ง</h2>
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
            text="ดูรายละเอียด"
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
          { title: 'รหัสการจอง', value: 'id' },
          { title: 'ประเภทรถ', value: 'cartype' },
          { title: 'คนขับ(เบอร์โทรศัพท์)', value: 'phone' },
          { title: 'สถานะ', value: 'status' },
          { title: 'จัดการข้อมูล', value: 'details', sortable: false },
        ],
        items: [
          {
            id: 'BH23142',
            cartype: 'รถ 4 ล้อ (ตู้ทึบ)',
            phone: 'มานะ(093-343-5345)',
            status: 'รอจัดส่ง',
          },
          {
            id: 'บริษัท แอ๊ดวานซ์',
            cartype: '083-343-5345',
            phone: 'LSP',
            status: 'รอการอนุมัติ',
          },
          {
            id: 'คุณนัด',
            cartype: '083-343-2564',
            phone: 'มิลเลนเนียม',
            status: 'รอจัดส่ง',
          },
          {
            id: 'มูเน่ เมเนจเมน',
            cartype: '083-243-5343',
            phone: 'มิลเลนเนียม',
            status: 'สำเร็จแล้ว',
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
