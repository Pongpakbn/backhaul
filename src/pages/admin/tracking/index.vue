<template>
  <v-container>
    <h2>ติดตามการขนส่ง</h2>
    <v-card class="mt-2" flat rounded="md">
      <v-data-table
        :headers="headers"
        :items="items"
      >
        <template #[`item.status`]="{ item }">
          <v-btn
            class="text-capitalize"
            :color="getStatusColor(item.status)"
            size="small"
            variant="outlined"
            @click="viewStatus(item)"
          >
            {{ item.status }}
          </v-btn>
        </template>
        <template #[`item.details`]="{ item }">
          <v-btn
            color="primary"
            flat
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
            phone: 'มานะ (093-343-5345)',
            status: 'รอจัดส่ง',
          },
          {
            id: 'BH23143',
            cartype: 'รถ 6 ล้อ',
            phone: 'สมชาย (083-343-5345)',
            status: 'รอจัดส่ง',
          },
          {
            id: 'BH23144',
            cartype: 'รถกระบะ',
            phone: 'นัด (083-343-2564)',
            status: 'กำลังขนส่ง',
          },
          {
            id: 'BH23145',
            cartype: 'รถ 4 ล้อ',
            phone: 'มานพ (083-243-5343)',
            status: 'ขนส่งสำเร็จ',
          },
        ],
      };
    },
    methods: {
      getStatusColor (status) {
        switch (status) {
          case 'กำลังขนส่ง':
            return 'primary';
          case 'ขนส่งสำเร็จ':
            return 'success';
          default:
            return 'warning';
        }
      },
      viewStatus (item) {
        alert(`สถานะสำหรับ ${item.id}: ${item.status}`);
      },
      viewDetails () {
        this.$router.push(`/admin/tracking/id`);
      },
    },
  };
</script>
