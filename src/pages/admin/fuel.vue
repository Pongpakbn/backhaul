```vue
<template>
  <v-container>
    <div class="d-flex justify-space-between mb-4">
      <h2>ประเภทเชื้อเพลิง</h2>
      <v-btn color="primary" @click="openAddDialog">เพิ่มประเภท</v-btn>
    </div>

    <v-card flat>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        :items-per-page-options="[5, 10, 15, -1]"
      >
        <template #[`item.action`]="{ item }">
          <v-row>
            <v-col class="text-end">
              <v-btn
                flat
                style="background-color: #f2a900; color: white"
                text="แก้ไข"
                @click.stop="editFuel(item)"
              />
            </v-col>
            <v-col class="text-start">
              <v-btn
                color="red"
                flat
                text="ลบ"
                @click.stop="deleteFuel(item)"
              />
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog for adding/editing fuel type -->
    <v-dialog v-model="dialog" max-width="900px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            isEditing ? "แก้ไขประเภทเชื้อเพลิง" : "เพิ่มประเภทเชื้อเพลิง"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <p>ชื่อเชื้อเพลิง(TH)</p>
              <v-text-field
                v-model="newFuel.tho"
                :error-messages="errors.tho"
                placeholder="ชื่อ (TH)"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <p>ชื่อเชื้อเพลิง(EN)</p>
              <v-text-field
                v-model="newFuel.eni"
                :error-messages="errors.eni"
                placeholder="ชื่อ (EN)"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <p>การปล่อยมลพิษ(kg, CO2)</p>
              <v-text-field
                v-model.number="newFuel.co2"
                :error-messages="errors.co2"
                placeholder="CO2 (kg ต่อหน่วย)"
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <div class="d-flex justify-end ga-3">
                <v-btn color="primary" flat text="เพิ่ม" @click="saveFuel" />
                <v-btn color="grey" text="ยกเลิก" variant="outlined" @click="closeDialog" />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog for viewing details -->
    <v-dialog v-model="detailDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ selectedItem.fuel }}</span>
        </v-card-title>
        <v-card-text>
          <p>THO: {{ selectedItem.tho }}</p>
          <p>ENI: {{ selectedItem.eni }}</p>
          <p>CO2: {{ selectedItem.co2 }} kg CO2 per unit</p>
          <p>Status: {{ selectedItem.status }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="detailDialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Swal from 'sweetalert2';

  export default {
    data: () => ({
      dialog: false,
      detailDialog: false,
      isEditing: false,
      editingIndex: -1,
      selectedItem: {},
      newFuel: { tho: '', eni: '', co2: null },
      errors: { tho: '', eni: '', co2: '' },
      headers: [
        { title: '#', value: 'no' },
        { title: 'รหัสเชื้อเพลิง', value: 'fuel' },
        { title: 'ชื่อเชื้อเพลิง (TH)', value: 'tho' },
        { title: 'ชื่อเชื้อเพลิง (EN)', value: 'eni' },
        { title: 'ปัจจัยการปล่อยมลพิษ (kg CO2 per unit)', value: 'co2' },
        { title: 'จัดการ', value: 'action', align: 'center' },
      ],
      items: [
        { no: 1, fuel: 'DIESEL', tho: 'ดีเซล', eni: 'diesel', co2: 2.68, status: 'สูง' },
        { no: 2, fuel: 'Biodiesel B10', tho: 'ไบโอดีเซล B10', eni: 'biodiesel B10', co2: 2.51, status: 'สูง' },
        { no: 3, fuel: 'Biodiesel B20', tho: 'ไบโอดีเซล B20', eni: 'biodiesel B20', co2: 2.36, status: 'สูง' },
        { no: 4, fuel: 'Natural Gas', tho: 'ก๊าซธรรมชาติ', eni: 'natural gas', co2: 2.75, status: 'สูง' },
        { no: 5, fuel: 'LPG', tho: 'ก๊าซ LPG', eni: 'lpg', co2: 1.51, status: 'ปานกลาง' },
        { no: 6, fuel: 'Gasohol 95', tho: 'แก๊สโซฮอล์ 95', eni: 'gasohol 95', co2: 2.31, status: 'สูง' },
        { no: 7, fuel: 'Gasohol E20', tho: 'แก๊สโซฮอล์ E20', eni: 'gasohol E20', co2: 2.1, status: 'สูง' },
        { no: 8, fuel: 'Gasohol E85', tho: 'แก๊สโซฮอล์ E85', eni: 'gasohol E85', co2: 1.9, status: 'ปานกลาง' },
        { no: 9, fuel: 'Electricity', tho: 'ไฟฟ้า', eni: 'electricity', co2: 0.418, status: 'ต่ำ' },
        { no: 10, fuel: 'Hybrid', tho: 'ไฮบริด', eni: 'hybrid', co2: 1.4, status: 'ปานกลาง' },
      ],
    }),
    methods: {
      openDetailDialog (item) {
        if (!item) return;
        this.selectedItem = { ...item };
        this.detailDialog = true;
      },
      openAddDialog () {
        this.isEditing = false;
        this.newFuel = { tho: '', eni: '', co2: null };
        this.errors = { tho: '', eni: '', co2: '' };
        this.dialog = true;
      },
      editFuel (item) {
        this.isEditing = true;
        this.editingIndex = this.items.findIndex(i => i.no === item.no);
        this.newFuel = { ...item, co2: Number(item.co2) };
        this.errors = { tho: '', eni: '', co2: '' };
        this.dialog = true;
      },
      closeDialog () {
        this.dialog = false;
        this.newFuel = { tho: '', eni: '', co2: null };
        this.errors = { tho: '', eni: '', co2: '' };
        this.isEditing = false;
        this.editingIndex = -1;
      },
      validateFuel () {
        this.errors = { tho: '', eni: '', co2: '' };
        let isValid = true;

        if (!this.newFuel.tho) {
          this.errors.tho = 'กรุณากรอกชื่อ (TH)';
          isValid = false;
        }
        if (!this.newFuel.eni) {
          this.errors.eni = 'กรุณากรอกชื่อ (EN)';
          isValid = false;
        }
        if (this.newFuel.co2 === null || this.newFuel.co2 === '' || isNaN(this.newFuel.co2)) {
          this.errors.co2 = 'กรุณากรอก CO2 เป็นตัวเลข';
          isValid = false;
        } else if (this.newFuel.co2 < 0) {
          this.errors.co2 = 'CO2 ต้องไม่เป็นค่าติดลบ';
          isValid = false;
        }

        // ตรวจสอบรหัสเชื้อเพลิง (fuel) ว่าซ้ำหรือไม่
        if (!this.isEditing && this.items.some(item => item.fuel.toLowerCase() === this.newFuel.eni.toLowerCase())) {
          this.errors.eni = 'รหัสเชื้อเพลิงนี้มีอยู่แล้ว';
          isValid = false;
        }

        return isValid;
      },
      saveFuel () {
        if (!this.validateFuel()) {
          this.showAlert('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง', 'error');
          return;
        }

        const status = this.newFuel.co2 > 2.5 ? 'สูง' : this.newFuel.co2 > 1.5 ? 'ปานกลาง' : 'ต่ำ';
        const fuelData = {
          fuel: this.newFuel.eni,
          tho: this.newFuel.tho,
          eni: this.newFuel.eni,
          co2: Number(this.newFuel.co2),
          status,
        };

        if (this.isEditing) {
          // อัปเดตข้อมูล
          this.items[this.editingIndex] = { ...fuelData, no: this.items[this.editingIndex].no };
          this.showAlert('แก้ไขประเภทเชื้อเพลิงสำเร็จ', 'success');
        } else {
          // เพิ่มข้อมูลใหม่
          const newNo = this.items.length + 1;
          this.items.push({ ...fuelData, no: newNo });
          this.showAlert('เพิ่มประเภทเชื้อเพลิงสำเร็จ', 'success');
        }

        this.closeDialog();
      },
      deleteFuel (item) {
        const index = this.items.findIndex(i => i.no === item.no);
        if (index !== -1) {
          this.items.splice(index, 1);
          // อัปเดตหมายเลข (no) ให้เรียงลำดับใหม่
          this.items.forEach((item, i) => {
            item.no = i + 1;
          });
          this.showAlert('ลบประเภทเชื้อเพลิงสำเร็จ', 'success');
        }
      },
      showAlert (message, type) {
        Swal.fire({
          icon: type,
          title: type === 'success' ? 'สำเร็จ' : 'ข้อผิดพลาด',
          text: message,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });
      },
    },
  };
</script>
