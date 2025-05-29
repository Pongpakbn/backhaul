<template>
  <v-container>
    <div class="d-flex justify-space-between align-center ">
      <h2>ตรวจสอบแผนการเดินรถ</h2>
    </div>
    <v-card class="mt-2" rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #item.status="{ item }">
          <v-btn
            :color="getStatusColor(item.status)"
            rounded="md"
            :text="item.status"
            variant="outlined"
            @click="viewStatus(item)"
          />
        </template>

        <template #item.details="{ item }">
          <v-btn
            v-if="item.verify === 'wait'"
            color="primary"
            rounded="md"
            text="อนุมัติ"
            @click="viewDetails(item)"
          />
          <v-btn
            v-if="item.verify === 'approve'"
            color="success"
            prepend-icon="mdi-check"
            text="ได้รับการอนุมัติ"
            variant="text"
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
          { title: 'แผนการเดินทาง', value: 'route' },
          { title: 'วันที่เริ่มและสิ้นสุดแผน', value: 'date' },
          { title: 'พาเลทที่จอง/ทั้งหมด', value: 'pallet' },
          { title: 'สถานะ', value: 'status' },
          { title: 'จัดการข้อมูล', value: 'details', sortable: false },
        ],
        items: [
          {
            id: 1,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'ประกาศแผน',
            verify:'approve',
          },
          {
            id: 2,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'อนุมัติ',
            verify:'wait',
          },
          {
            id: 3,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'รอดำเนินการ',
            verify:'wait',
          },
          {
            id: 4,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'ยกเลิก',
            verify:'approve',
          },
        ],
      };
    },
    methods: {
      getStatusColor (status) {
        switch (status) {
          case 'ประกาศแผน':
            return 'blue';
          case 'อนุมัติ':
            return 'green';
          case 'รอดำเนินการ':
            return 'orange';
          case 'ยกเลิก':
            return 'red';
          default:
            return 'grey';
        }
      },
      viewStatus (item) {
        alert(`สถานะ: ${item.status}`);
      },
      viewDetails (item) {
        alert(`รายละเอียดของแผน ${item.id}`);
      },
    },
  };
</script>
