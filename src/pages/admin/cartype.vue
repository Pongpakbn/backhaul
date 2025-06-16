```vue
<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <h2>ประเภทรถ</h2>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="md"
        text="เพิ่มประเภทรถ"
        @click="openDialog"
      />
    </div>
    <v-card class="mt-2" flat rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #[`item.details`]="{ item }">
          <v-btn
            color="secondary"
            icon="mdi-square-edit-outline"
            variant="text"
            @click="editItem(item)"
          />
          <v-btn
            color="red"
            icon="mdi-delete"
            variant="text"
            @click="deleteItem(item)"
          />
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <p>{{ formTitle }}</p>
          <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-label>ประเภทรถ</v-label>
                <v-text-field
                  v-model="form.type"
                  class="mt-2"
                  placeholder="ระบุประเภทรถ"
                  rounded="md"
                  :rules="[v => !!v || 'กรุณากรอกประเภทรถ']"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-label>ความกว้าง</v-label>
                <v-text-field
                  v-model="form.width"
                  class="mt-2"
                  placeholder="ระบุความกว้าง"
                  rounded="md"
                  :rules="[v => !!v || 'กรุณากรอกความกว้าง']"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-label>ความยาว</v-label>
                <v-text-field
                  v-model="form.length"
                  class="mt-2"
                  placeholder="ระบุความยาว"
                  rounded="md"
                  :rules="[v => !!v || 'กรุณากรอกความยาว']"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-label>ความสูง</v-label>
                <v-text-field
                  v-model="form.height"
                  class="mt-2"
                  placeholder="ระบุความสูง"
                  rounded="md"
                  :rules="[v => !!v || 'กรุณากรอกความสูง']"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-label>น้ำหนัก</v-label>
                <v-text-field
                  v-model="form.weight"
                  class="mt-2"
                  placeholder="ระบุน้ำหนัก"
                  rounded="md"
                  :rules="[v => !!v || 'กรุณากรอกน้ำหนัก']"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-label>พาเลท</v-label>
                <v-text-field
                  v-model="form.pallet"
                  class="mt-2"
                  placeholder="ระบุพาเลท"
                  rounded="md"
                  :rules="[v => !!v || 'กรุณากรอกพาเลท']"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-end align-center">
                  <v-btn class="me-4" text="ยกเลิก" variant="outlined" @click="closeDialog" />
                  <v-btn color="primary" :text="editedIndex === -1 ? 'เพิ่มประเภทรถ' : 'บันทึก'" @click="submit" />
                </div>
              </v-col>
            </v-row>
          </v-form>
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
        valid: true,
        editedIndex: -1,
        form: {
          type: '',
          width: '',
          length: '',
          height: '',
          weight: '',
          pallet: '',
        },
        defaultForm: {
          type: '',
          width: '',
          length: '',
          height: '',
          weight: '',
          pallet: '',
        },
        headers: [
          { title: 'ประเภทรถ', key: 'type' },
          { title: 'ขนาดบรรจุ', key: 'cap' },
          { title: 'น้ำหนักที่สามารถบรรจุ(กก.)', key: 'weight' },
          { title: 'พาเลทที่บรรจุ', key: 'parent' },
          { title: 'จัดการข้อมูล', key: 'details', sortable: false },
        ],
        items: [
          {
            id: 1,
            type: 'รถ 4 ล้อ (ตู้ทึบ)',
            cap: 'กว้าง: 170-1.8 ยาว: 3.0-3.2 สูง: 1.7-2.0 เมตร',
            weight: '500kg',
            parent: '0/12',
          },
          {
            id: 2,
            type: 'รถ 4 ล้อ (ตู้ทึบ)',
            cap: 'กว้าง: 170-1.8 ยาว: 3.0-3.2 สูง: 1.7-2.0 เมตร',
            weight: '600kg',
            parent: '0/22',
          },
          {
            id: 3,
            type: 'รถ 4 ล้อ (ตู้ทึบ)',
            cap: 'กว้าง: 170-1.8 ยาว: 3.0-3.2 สูง: 1.7-2.0 เมตร',
            weight: '600kg',
            parent: '22/23',
          },
          {
            id: 4,
            type: 'รถ 4 ล้อ (ตู้ทึบ)',
            cap: 'กว้าง: 170-1.8 ยาว: 3.0-3.2 สูง: 1.7-2.0 เมตร',
            weight: '600kg',
            parent: '12/24',
          },
        ],
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'เพิ่มประเภทรถ' : 'แก้ไขประเภทรถ'
      },
    },

    methods: {
      openDialog () {
        this.form = { ...this.defaultForm }
        this.editedIndex = -1
        this.dialog = true
      },

      closeDialog () {
        this.dialog = false
        this.form = { ...this.defaultForm }
        this.editedIndex = -1
        this.$refs.form.resetValidation()
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        const [width, length, height] = item.cap.match(/กว้าง: ([\d.-]+).*ยาว: ([\d.-]+).*สูง: ([\d.-]+)/).slice(1)
        this.form = {
          type: item.type,
          width,
          length,
          height,
          weight: item.weight,
          pallet: item.parent,
        }
        this.dialog = true
      },

      async deleteItem (item) {

        const result = await this.$swal.fire({
          title: 'ยืนยันการลบ',
          text: `คุณต้องการลบประเภทรถ ${item.type} หรือไม่?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ลบ',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
        })

        if (result.isConfirmed) {
          const index = this.items.indexOf(item)
          this.items.splice(index, 1)
          await this.$swal.fire({
            title: 'ลบสำเร็จ',
            text: `ประเภทรถ ${item.type} ถูกลบเรียบร้อย`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          })
        }
      },

      addVehicleType () {
        const newItem = {
          id: this.items.length + 1,
          type: this.form.type,
          cap: `กว้าง: ${this.form.width} ยาว: ${this.form.length} สูง: ${this.form.height} เมตร`,
          weight: this.form.weight,
          parent: this.form.pallet,
        }
        this.items.push(newItem)

        this.dialog = false
        this.form = { ...this.defaultForm }
        this.editedIndex = -1
        this.$refs.form.resetValidation()

        // Simulate API response
        return Promise.resolve({
          data: {
            success: true,
            msg: 'ประเภทรถถูกเพิ่มเรียบร้อย',
          },
        })
      },

      editVehicleType () {
        const newItem = {
          id: this.items[this.editedIndex].id,
          type: this.form.type,
          cap: `กว้าง: ${this.form.width} ยาว: ${this.form.length} สูง: ${this.form.height} เมตร`,
          weight: this.form.weight,
          parent: this.form.pallet,
        }
        Object.assign(this.items[this.editedIndex], newItem)

        this.dialog = false
        this.form = { ...this.defaultForm }
        this.editedIndex = -1
        this.$refs.form.resetValidation()

        // Simulate API response
        return Promise.resolve({
          data: {
            success: true,
            msg: 'ประเภทรถได้รับการแก้ไขเรียบร้อย',
          },
        })
      },

      submit () {
        this.$refs.form.validate().then(({ valid }) => {
          if (!valid) {
            this.dialog = false
            this.$swal.fire({
              title: 'ข้อมูลไม่ครบถ้วน',
              text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
              icon: 'error',
              timer: 1500,
              showConfirmButton: false,
            })
            return
          }
          this.dialog = false
          this.$swal
            .fire({
              title: 'ยืนยันการบันทึก',
              text: `คุณต้องการ${this.editedIndex === -1 ? 'เพิ่ม' : 'แก้ไข'}ประเภทรถนี้หรือไม่?`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'บันทึก',
              cancelButtonText: 'ยกเลิก',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
            })
            .then(result => {
              if (result.isConfirmed) {
                const action = this.editedIndex === -1 ? this.addVehicleType() : this.editVehicleType()
                action.then(response => {
                  this.dialog = false // Already closed in add/edit, but ensure here for safety
                  if (response.data.success) {
                    this.$swal.fire({
                      title: this.editedIndex === -1 ? 'เพิ่มสำเร็จ' : 'แก้ไขสำเร็จ',
                      text: response.data.msg,
                      confirmButtonText: 'ตกลง',
                      icon: 'success',
                      timer: 1500,
                      showConfirmButton: false,
                    })
                  } else {
                    this.$swal.fire({
                      title: 'เกิดข้อผิดพลาด',
                      text: response.data.msg,
                      confirmButtonText: 'ตกลง',
                      icon: 'error',
                      timer: 1500,
                      showConfirmButton: false,
                    })
                  }
                })
              }
            })
        })
      },
    },
  }
</script>

<style scoped>
.v-label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
}
</style>
```
