<template>
  <v-container>
    <div class="d-flex justify-space-between mb-4">
      <h2>เรทราคา</h2>
      <v-btn
        color="primary"
        prepend-icon="mdi-tag-outline"
        size="large"
        text="เพิ่มเรทราคา"
      />
    </div>
    <v-card class="rounded-md" flat>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
        :items-per-page="5"
      >
        <template #[`item.action`]="{ item }">
          <v-btn
            class="me-2"
            color="primary"
            prepend-icon="mdi-tag-outline"
            text="แก้ไข"
            @click="$router.push(`/partner/booking/${item.id}`)"
          />
          <v-btn
            class="text-white"
            color="#f2a900"
            prepend-icon="mdi-delete"
            text="รายละเอียด"
            @click="$router.push(`/partner/booking/${item.id}`)"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog" width="800">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <p>เพิ่มเรทราคา</p>
        <v-btn icon="mdi-close" variant="text" />
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p>ชื่อโปรไฟล์</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="ชื่อโปรไฟล์"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>ราคาเริ่มต้น (บาท)</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="ราคาเริ่มต้น"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>ราคา/หน่วย</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="ราคา/หน่วย"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>กม.</p>
            <v-select
              density="comfortable"
              hide-details
              placeholder="ชื่อโปรไฟล์"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col class="d-flex justify-end" cols="12">
            <v-btn color="primary" prepend-icon="mdi-check" size="large" text="ยืนยัน" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dialog: true,
        headers: [
          { title: '#', value: 'index', sortable: false },
          { title: 'ชื่อโปรไฟล์', value: 'profile' },
          { title: 'ราคาเริ่มต้น', value: 'price' },
          { title: 'ราคา/หน่วย', value: 'rate' },
          { title: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        ],
        items: [
          {
            index: 1,
            profile: 'Profile 1 ',
            price: '3,000',
            rate:'4000/กม',
          },
          {
            index: 1,
            profile: 'Profile 1 ',
            price: '3,000',
            rate:'4000/กม',
          },
          {
            index: 1,
            profile: 'Profile 1 ',
            price: '3,000',
            rate:'4000/กม',
          },
          {
            index: 1,
            profile: 'Profile 1 ',
            price: '3,000',
            rate:'4000/กม',
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
