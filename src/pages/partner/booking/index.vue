<template>
  <v-container>
    <v-row class="align-center mb-4">
      <!-- ซ้าย -->
      <v-col cols="12" md="8">
        <h2>การจองในระบบ</h2>
        <p class="opacity-50">{{ filteredItems.length }} รายการ</p>
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
        />
      </v-col>
    </v-row>

    <v-card class="mt-2 rounded-md" flat>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="filteredItems"
        :items-per-page="5"
      >
        <template #[`item.action`]>
          <v-btn
            color="primary"
            flat
            prepend-icon="mdi-tag-outline"
            text="รายละเอียด"
            @click="$router.push(`/partner/booking/id`)"
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
        search: '',
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
            id: 'b001',
            index: 1,
            name: 'สมชาย ใจดี',
            type: 'รถ 4 ล้อ(ตู้ทึบ)',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
          },
          {
            id: 'b002',
            index: 2,
            name: 'นภา สวยงาม',
            type: 'รถ 6 ล้อ',
            status: 'กำลังจัดส่ง',
            date: '23/02/2025',
          },
          {
            id: 'b003',
            index: 3,
            name: 'กิตติ พัฒนา',
            type: 'รถ 4 ล้อ',
            status: 'รอจัดส่ง',
            date: '24/02/2025',
          },
          {
            id: 'b004',
            index: 4,
            name: 'สุนันทา รักเรียน',
            type: 'รถ 6 ล้อ',
            status: 'จัดส่งสำเร็จ',
            date: '21/02/2025',
          },
          {
            id: 'b005',
            index: 5,
            name: 'วีระชัย กล้าหาญ',
            type: 'อุปกรณ์กีฬา',
            status: 'รอจัดส่ง',
            date: '25/02/2025',
          },
        ],
      };
    },
    computed: {
      filteredItems () {
        if (!this.search) return this.items;
        const keyword = this.search.toLowerCase();
        return this.items.filter(item => item.name.toLowerCase().includes(keyword));
      },
    },
  };
</script>
