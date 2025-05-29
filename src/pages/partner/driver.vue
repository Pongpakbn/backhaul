<template>
  <v-container>
    <v-row class="align-center mb-4">
      <!-- ฝั่งซ้ายทั้งหมด -->
      <v-col class="d-flex align-center" cols="12" md="6">
        <div class="me-4">
          <h2 class="mb-1">คนขับรถ</h2>
          <p class="opacity-50 mb-0">4 รายการ</p>
        </div>

        <v-text-field
          v-model="search"
          density="compact"
          hide-details
          placeholder="ค้นหาจากชื่อ"
          prepend-inner-icon="mdi-magnify"
          rounded="md"
          single-line
          style="width: 250px;"
          variant="solo"
        />
      </v-col>

      <!-- อีกฝั่งเปล่า (ลบทิ้งได้ถ้าไม่ใช้) -->
      <v-col cols="12" md="6">
        <div class="d-flex justify-end">
          <v-btn color="primary" prepend-icon="mdi-account-plus" rounded="md" text="เพิ่มคนขับรถ" />
        </div>
      </v-col>
    </v-row>
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
            text="ลบ"
            @click="$router.push(`/partner/booking/${item.id}`)"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
  <v-dialog v-model="dialog" width="800">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <p>เพิ่มคนขับรถ</p>
        <v-btn icon="mdi-close" variant="text" />
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <p>ชื่อคนขับ</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="ชื่อคนขับ"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>จังหวัด</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="จังหวัด"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>อำเภอ</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="อำเภอ"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>ตำบล</p>
            <v-select
              density="comfortable"
              hide-details
              placeholder="ตำบล"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <p>ที่อยู่</p>
            <v-textarea
              auto-grow
              density="comfortable"
              hide-details
              placeholder="ที่อยู่"
              rounded="md"
              rows="3"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>ประเภทใบขับขี่</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="ประเภทใบขับขี่"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>เลขที่ใบขับขี่</p>
            <v-text-field
              density="comfortable"
              hide-details
              placeholder="เลขที่ใบขับขี่"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>วันหมดอายุใบขับขี่</p>
            <v-select
              density="comfortable"
              hide-details
              placeholder="วันหมดอายุใบขับขี่"
              rounded="md"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <p>อัปโหลดรูปภาพ</p>
            <v-file-upload
              density="comfortable"
              icon="mdi mdi-camera"
              rounded="lg"
              title="กดเพื่อเลือกรูปภาพ(ขนาดไม่เกิน 20MB)"
              variant="comfortable"
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
          { title: 'เลขที่ใบเสร็จ', value: 'receiptNumber' },
          { title: 'จำนวน', value: 'quantity' },
          { title: 'สถานะ', value: 'status' },
          { title: 'วันที่', value: 'date' },
          { title: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        ],
        items: [
          {
            index: 1,
            receiptNumber: 'ใบเสร็จรอ',
            quantity: '4 ชิ้น',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
          },
          {
            index: 1,
            receiptNumber: 'ใบเสร็จรอ',
            quantity: '4 ชิ้น',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
          },
          {
            index: 1,
            receiptNumber: 'ใบเสร็จรอ',
            quantity: '4 ชิ้น',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
          },
          {
            index: 1,
            receiptNumber: 'ใบเสร็จรอ',
            quantity: '4 ชิ้น',
            status: 'รอจัดส่ง',
            date: '22/02/2025',
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
