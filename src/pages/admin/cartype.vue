<template>
  <v-container>
    <div class="d-flex justify-space-between align-center ">
      <h2>ประเถทรภ</h2>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="md"
        text="เพิ่มประเภทรถ"
        @click="dialog = true"
      />
    </div>
    <v-card class="mt-2" rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >

        <template #item.details="{ item }">
          <v-btn
            color="secondary"
            icon="mdi-square-edit-outline"
            variant="text"
            @click="viewDetails(item)"
          />
          <v-btn
            color="red"
            icon="mdi-delete"
            variant="text"
            @click="viewDetails(item)"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog" width="800">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <p>เพิ่มประเภทรถ</p>
        <v-btn icon="mdi-close" variant="text" @click="dialog=fasle" />
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p>ประเภทรถ</p>
            <v-text-field density="comfortable" placeholder="ระบุประเภทรถ" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" md="4">
            <p>ความกว้าง</p>
            <v-text-field density="comfortable" placeholder="ระบุความกว้าง" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" md="4">
            <p>ความยาว</p>
            <v-text-field density="comfortable" placeholder="ระบุความยาว" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" md="4">
            <p>ความสูง</p>
            <v-text-field density="comfortable" placeholder="ระบุความสูง" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" md="6">
            <p>น้ำหนัก</p>
            <v-text-field density="comfortable" placeholder="ระบุน้ำหนัก" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12" md="6">
            <p>พาเลท</p>
            <v-text-field density="comfortable" placeholder="ระบุพาเลท" rounded="md" variant="outlined" />
          </v-col>
          <v-col cols="12">
            <div class="d-flex justify-end align-center">
              <v-btn class="me-4" text="ยกเลิก" variant="outlined" />
              <v-btn color="primary" text="เพิ่มประเภทรถ" />
            </div>
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
        dialog:false,
        headers: [
          { title: 'ประเภทรถ', value: 'type' },
          { title: 'ขนาดบรรจุ', value: 'cap' },
          { title: 'น้ำหนักที่สามารถบรรจุ(กก.)', value: 'weight' },
          { title: 'พาเลทที่บรรจุ', value: 'parent' },
          { title: 'จัดการข้อมูล', value: 'details', sortable: false },
        ],
        items: [
          {
            type: 'รถ 4 ล้อ (ตู้ทึบ)',
            cap: 'กว้าง: 170-1.8 ยาว: 3.0-3.2 สูง: 1.7-2.0 เมตร',
            weight: 'มานะ(093-343-5345)',
            parent: '0/12',
          },
          {
            type: 'รถ 4 ล้อ (ตู้ทึบ)',
            cap: 'กว้าง: 170-1.8 ยาว: 3.0-3.2 สูง: 1.7-2.0 เมตร',
            weight: 'มานะ(093-343-5345)',
            parent: '0/22',
          },
          {
            type: 'รถ 4 ล้อ (ตู้ทึบ)',
            cap: 'กว้าง: 170-1.8 ยาว: 3.0-3.2 สูง: 1.7-2.0 เมตร',
            weight: 'มานะ(093-343-5345)',
            parent: '22/23',
          },
          {
            type: 'รถ 4 ล้อ (ตู้ทึบ)',
            cap: 'กว้าง: 170-1.8 ยาว: 3.0-3.2 สูง: 1.7-2.0 เมตร',
            weight: 'มานะ(093-343-5345)',
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
