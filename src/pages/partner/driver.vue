<template>
  <v-container>
    <!-- Header -->
    <v-row class="align-center mb-4">
      <v-col class="d-flex align-center" cols="12" md="6">
        <div class="me-4">
          <h2 class="mb-1">คนขับรถ</h2>
          <p class="opacity-50 mb-0">{{ filteredItems.length }} รายการ</p>
        </div>
        <v-text-field
          v-model="search"
          density="compact"
          hide-details
          max-width="368"
          placeholder="ค้นหาจากชื่อ"
          prepend-inner-icon="mdi-magnify"
          rounded="md"
          single-line
          style="background-color: white;"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12" md="6">
        <div class="d-flex justify-end">
          <v-btn
            color="primary"
            flat
            prepend-icon="mdi-account-plus"
            size="large"
            text="เพิ่มคนขับรถ"
            @click="openAddDialog"
          />
        </div>
      </v-col>
    </v-row>

    <!-- Table -->
    <v-card class="rounded-md" flat>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="filteredItems"
        :items-per-page="5"
      >
        <template #[`item.status`]="{ item }">
          <v-chip
            class="font-weight-bold"
            :color="getStatusColor(item.status)"
            label
            variant="outlined"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template #[`item.action`]="{ item }">
          <v-row>
            <v-col class="text-end">
              <v-btn
                v-if="item.status === 'ส่งกลับเพื่อแก้ไข' || item.status === 'อนุมัติ'"
                class="me-2"
                flat
                prepend-icon="mdi-update"
                style="background-color: #f2a900; color: white;"
                text="อัพเดทข้อมูล"
                @click="updateDriver(item)"
              />
            </v-col>
            <v-col class="text-start">
              <v-btn
                class="text-white"
                color="red"
                flat
                prepend-icon="mdi-delete"
                text="ลบ"
                @click="deleteDriver(item)"
              />
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog -->
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <p>{{ dialogMode === 'add' ? 'เพิ่มคนขับรถ' : 'แก้ไขคนขับรถ' }}</p>
          <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <p>ชื่อคนขับ</p>
              <v-text-field
                v-model="newDriver.name"
                hide-details
                placeholder="ชื่อคนขับ"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>จังหวัด</p>
              <v-select
                v-model="newDriver.province"
                hide-details
                :items="provinces"
                placeholder="เลือกจังหวัด"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>อำเภอ</p>
              <v-select
                v-model="newDriver.district"
                hide-details
                :items="districts"
                placeholder="เลือกอำเภอ"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>ตำบล</p>
              <v-select
                v-model="newDriver.subdistrict"
                hide-details
                :items="subdistricts"
                placeholder="เลือกตำบล"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <p>ที่อยู่</p>
              <v-textarea
                v-model="newDriver.address"
                auto-grow
                hide-details
                placeholder="ที่อยู่"
                rounded="md"
                rows="3"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>ประเภทใบขับขี่</p>
              <v-select
                v-model="newDriver.licenseType"
                hide-details
                :items="licenseTypes"
                placeholder="เลือกประเภทใบขับขี่"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>เลขที่ใบขับขี่</p>
              <v-text-field
                v-model="newDriver.licenseNumber"
                hide-details
                placeholder="เลขที่ใบขับขี่"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>วันหมดอายุใบขับขี่</p>
              <v-select
                v-model="newDriver.licenseExpiry"
                hide-details
                :items="expiryDates"
                placeholder="เลือกวันหมดอายุ"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <p>อัปโหลดรูปภาพ</p>
              <v-file-input
                v-model="newDriver.image"
                hide-details
                prepend-icon="mdi-camera"
                rounded="lg"
                title="กดเพื่อเลือกรูปภาพ"
                variant="outlined"
              />
            </v-col>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn
                color="primary"
                prepend-icon="mdi-check"
                size="large"
                text="ยืนยัน"
                @click="saveDriver"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Swal from 'sweetalert2';

  export default {
    data () {
      return {
        dialog: false,
        dialogMode: 'add',
        search: '',
        headers: [
          { title: '#', value: 'index', sortable: false },
          { title: 'ชื่อคนขับ', value: 'name' },
          { title: 'ประเภทใบขับขี่', value: 'licenseType' },
          { title: 'เลขที่ใบขับขี่', value: 'licenseNumber' },
          { title: 'สถานะ', value: 'status' },
          { title: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        ],
        items: [
          { index: 1, name: 'สมชาย ใจดี', licenseType: 'ใบขับขี่ชั่วคราว', licenseNumber: '123456789', status: 'รอการอนุมัติ' },
          { index: 2, name: 'สมหญิง ร่าเริง', licenseType: 'ใบขับขี่ส่วนบุคคล', licenseNumber: '987654321', status: 'อนุมัติ' },
          { index: 3, name: 'สมศักดิ์ มั่นคง', licenseType: 'ใบขับขี่สาธารณะ', licenseNumber: '456789123', status: 'ส่งกลับเพื่อแก้ไข' },
        ],
        newDriver: {
          index: null, name: '', province: null, district: null, subdistrict: null,
          address: '', licenseType: null, licenseNumber: '', licenseExpiry: null, image: null,
        },
        provinces: ['กรุงเทพมหานคร', 'เชียงใหม่', 'ขอนแก่น', 'สงขลา'],
        districts: ['เขตพระนคร', 'อำเภอเมือง'],
        subdistricts: ['บางรัก', 'เมือง'],
        licenseTypes: ['ใบขับขี่ชั่วคราว', 'ใบขับขี่ส่วนบุคคล', 'ใบขับขี่สาธารณะ'],
        expiryDates: ['15/06/2025', '15/12/2025', '15/06/2026', '15/12/2026'],
      };
    },
    computed: {
      filteredItems () {
        return this.items.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
      },
    },
    methods: {
      getStatusColor (status) {
        switch (status) {
          case 'รอการอนุมัติ': return 'primary';
          case 'อนุมัติ': return 'success';
          case 'ส่งกลับเพื่อแก้ไข': return 'secondary';
          default: return 'grey';
        }
      },
      openAddDialog () {
        this.dialogMode = 'add';
        this.resetNewDriver();
        this.dialog = true;
      },
      openEditDialog (item) {
        this.dialogMode = 'edit';
        this.newDriver = { ...item, image: null };
        this.dialog = true;
      },
      closeDialog () {
        this.dialog = false;
        this.resetNewDriver();
      },
      async deleteDriver (item) {
        const result = await Swal.fire({
          title: `ลบ ${item.name}?`,
          text: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลคนขับนี้',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ใช่, ลบเลย',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#e53935',
        });
        if (result.isConfirmed) {
          this.items = this.items.filter(i => i.index !== item.index);
          Swal.fire('ลบแล้ว!', `${item.name} ถูกลบเรียบร้อย`, 'success');
        }
      },
      updateDriver (item) {
        this.openEditDialog(item);
      },
      async saveDriver () {
        this.dialog=false
        const { name, licenseType, licenseNumber, licenseExpiry } = this.newDriver;
        if (name && licenseType && licenseNumber && licenseExpiry) {
          if (this.dialogMode === 'add') {
            const newIndex = this.items.length + 1;
            this.items.push({
              ...this.newDriver,
              index: newIndex,
              status: 'รอการอนุมัติ',
              image: this.newDriver.image?.name || null,
            });
          } else {
            const idx = this.items.findIndex(i => i.index === this.newDriver.index);
            if (idx !== -1) {
              this.items[idx] = {
                ...this.newDriver,
                image: this.newDriver.image?.name || this.items[idx].image,
                status: this.items[idx].status,
              };
            }
          }
          this.dialog = false;
          Swal.fire('สำเร็จ!', 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success');
          this.resetNewDriver();
        } else {
          Swal.fire('ไม่สำเร็จ', 'กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        }
      },
      resetNewDriver () {
        this.newDriver = {
          index: null, name: '', province: null, district: null,
          subdistrict: null, address: '', licenseType: null,
          licenseNumber: '', licenseExpiry: null, image: null,
        };
      },
    },
  };
</script>

<style scoped>
.rounded-md {
  border-radius: 8px;
}
</style>
