<template>
  <v-container>
    <v-row class="align-center mb-4">
      <!-- ฝั่งซ้ายทั้งหมด -->
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

      <!-- อีกฝั่ง (ปุ่มเพิ่มคนขับรถ) -->
      <v-col cols="12" md="6">
        <div class="d-flex justify-end">
          <v-btn
            color="primary"
            flat
            prepend-icon="mdi-account-plus"
            size="large"
            text="เพิ่มคนขับรถ"
            @click="dialog = true"
          />
        </div>
      </v-col>
    </v-row>
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

          <!-- <v-btn
            class="me-2"
            color="primary"
            flat
            prepend-icon="mdi-tag-outline"
            text="แก้ไข"
            @click="editDriver(item)"
          /> -->
          <!-- v-if="item.status !== 'ส่งกลับเพื่อแก้ไข'" -->

        </template>
      </v-data-table>
    </v-card>

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
                density="comfortable"
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
                density="comfortable"
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
                density="comfortable"
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
                density="comfortable"
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
              <v-select
                v-model="newDriver.licenseType"
                density="comfortable"
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
                v-model="newDriver.licenseExpiry"
                density="comfortable"
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
                density="comfortable"
                prepend-icon="mdi-camera"
                rounded="lg"
                title="กดเพื่อเลือกรูปภาพ (ขนาดไม่เกิน 20MB)"
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
  export default {
    data () {
      return {
        dialog: false,
        dialogMode: 'add', // 'add' or 'edit'
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
          { index: 4, name: 'สมบูรณ์ ซื่อสัตย์', licenseType: 'ใบขับขี่ชั่วคราว', licenseNumber: '789123456', status: 'รอการอนุมัติ' },
        ],
        newDriver: {
          index: null,
          name: '',
          province: null,
          district: null,
          subdistrict: null,
          address: '',
          licenseType: null,
          licenseNumber: '',
          licenseExpiry: null,
          image: null,
        },
        provinces: ['กรุงเทพมหานคร', 'เชียงใหม่', 'ขอนแก่น', 'สงขลา'],
        districts: ['เขตพระนคร', 'อำเภอเมือง', 'อำเภอเมือง', 'อำเภอเมือง'],
        subdistricts: ['บางรัก', 'ช้างม่อย', 'เมือง', 'เมือง'],
        licenseTypes: ['ใบขับขี่ชั่วคราว', 'ใบขับขี่ส่วนบุคคล', 'ใบขับขี่สาธารณะ'],
        expiryDates: ['15/06/2025', '15/12/2025', '15/06/2026', '15/12/2026'],
      };
    },
    computed: {
      filteredItems () {
        return this.items.filter(item =>
          item.name.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },
    methods: {
      getStatusColor (status) {
        switch (status) {
          case 'รอการอนุมัติ':
            return 'primary'; // Blue (#005eb8)
          case 'อนุมัติ':
            return 'success'; // Green (#4CAF50)
          case 'ส่งกลับเพื่อแก้ไข':
            return 'secondary'; // Orange (#f2a900)
          default:
            return 'grey'; // Default fallback
        }
      },
      openAddDialog () {
        this.dialogMode = 'add';
        this.resetNewDriver();
        this.dialog = true;
      },
      openEditDialog (item) {
        this.dialogMode = 'edit';
        this.newDriver = {
          index: item.index,
          name: item.name,
          province: item.province || null,
          district: item.district || null,
          subdistrict: item.subdistrict || null,
          address: item.address || '',
          licenseType: item.licenseType,
          licenseNumber: item.licenseNumber,
          licenseExpiry: item.licenseExpiry || null,
          image: null, // Reset image for edit
        };
        this.dialog = true;
      },
      closeDialog () {
        this.dialog = false;
        this.resetNewDriver();
      },
      deleteDriver (item) {
        if (confirm(`คุณแน่ใจหรือไม่ที่จะลบ ${item.name}?`)) {
          this.items = this.items.filter(i => i.index !== item.index);
          console.log('Driver deleted:', item);
        }
      },
      updateDriver (item) {
        this.openEditDialog(item); // Reuse edit dialog for update
      },
      editDriver (item) {
        this.openEditDialog(item);
      },
      saveDriver () {
        if (this.newDriver.name && this.newDriver.licenseType && this.newDriver.licenseNumber && this.newDriver.licenseExpiry) {
          if (this.dialogMode === 'add') {
            const newIndex = this.items.length + 1;
            this.items.push({
              index: newIndex,
              name: this.newDriver.name,
              province: this.newDriver.province,
              district: this.newDriver.district,
              subdistrict: this.newDriver.subdistrict,
              address: this.newDriver.address,
              licenseType: this.newDriver.licenseType,
              licenseNumber: this.newDriver.licenseNumber,
              licenseExpiry: this.newDriver.licenseExpiry,
              status: 'รอการอนุมัติ', // Default status for new drivers
              image: this.newDriver.image ? this.newDriver.image.name : null,
            });
          } else if (this.dialogMode === 'edit') {
            const itemIndex = this.items.findIndex(i => i.index === this.newDriver.index);
            if (itemIndex !== -1) {
              this.items[itemIndex] = {
                index: this.newDriver.index,
                name: this.newDriver.name,
                province: this.newDriver.province,
                district: this.newDriver.district,
                subdistrict: this.newDriver.subdistrict,
                address: this.newDriver.address,
                licenseType: this.newDriver.licenseType,
                licenseNumber: this.newDriver.licenseNumber,
                licenseExpiry: this.newDriver.licenseExpiry,
                status: this.items[itemIndex].status, // Retain original status
                image: this.newDriver.image ? this.newDriver.image.name : this.items[itemIndex].image,
              };
            }
          }
          this.dialog = false;
          this.resetNewDriver();
          console.log('Driver saved:', this.newDriver);
        } else {
          console.log('Please fill all required fields');
        }
      },
      resetNewDriver () {
        this.newDriver = {
          index: null,
          name: '',
          province: null,
          district: null,
          subdistrict: null,
          address: '',
          licenseType: null,
          licenseNumber: '',
          licenseExpiry: null,
          image: null,
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
