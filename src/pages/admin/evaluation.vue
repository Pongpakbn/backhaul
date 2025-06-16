<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h2>รายการประเมิน</h2>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openDialog">
        เพิ่มแบบประเมิน
      </v-btn>
    </div>

    <v-card class="mt-2" flat>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #[`item.car`]="{ item }">
          <v-checkbox
            v-model="item.car"
            color="primary"
            hide-details
          />
        </template>
        <template #[`item.plan`]="{ item }">
          <v-checkbox
            v-model="item.plan"
            color="primary"
            hide-details
          />
        </template>
        <template #[`item.action`]="{ item }">
          <v-row justify="center" no-gutters>
            <v-col cols="auto">
              <v-btn
                class="ma-1"
                style="background-color: #f2a900; color: white"
                variant="flat"
                @click="editItem(item)"
              >
                แก้ไข
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn
                class="ma-1"
                color="red"
                variant="flat"
                @click="deleteItem(item)"
              >
                ลบ
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog for adding/editing -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-label>หมวด</v-label>
            <v-text-field
              v-model="form.type"
              class="mt-2"
              placeholder="หมวด"
              required
              :rules="[v => !!v || 'กรุณากรอกหมวด']"
              variant="outlined"
            />
            <v-label>ข้อคำถาม</v-label>
            <v-text-field
              v-model="form.question"
              class="mt-2"
              placeholder="ระบุคำถาม"
              :rules="[v => !!v || 'กรุณากรอกคำถาม']"
              variant="outlined"
            />
            <v-label>ช้อยประเมิน</v-label>
            <v-row
              v-for="(choice, index) in form.choices"
              :key="index"
              align="center"
              class="mt-3"
            >
              <v-col cols="4">
                <v-text-field
                  v-model="choice.label"
                  placeholder="ช้อย"
                  :rules="[v => !!v || 'กรุณากรอกช้อย']"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="3">
                <v-switch
                  v-model="choice.hasInput"
                  color="primary"
                  hide-details
                  inset
                  label="ข้อความ"
                />
              </v-col>
              <v-col v-if="choice.hasInput" cols="4">
                <v-text-field
                  v-model="choice.inputLabel"
                  placeholder="ระบุข้อความ"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="1">
                <v-btn
                  :disabled="form.choices.length <= 1"
                  icon
                  variant="text"
                  @click="removeChoice(index)"
                >
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-btn
              class="mt-4"
              color="primary"
              variant="outlined"
              @click="addChoice"
            >
              เพิ่มช้อย
            </v-btn>
            <v-row class="mt-4">
              <v-col cols="6">
                <v-checkbox
                  v-model="form.car"
                  color="primary"
                  hide-details
                  label="บังคับทำ (เพิ่มรถ)"
                />
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="form.plan"
                  color="primary"
                  hide-details
                  label="บังคับทำ (เพิ่มแผน)"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" variant="text" @click="closeDialog">ยกเลิก</v-btn>
          <v-btn color="primary" variant="flat" @click="submit">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Swal from 'sweetalert2'

  export default {
    data () {
      return {
        dialog: false,
        valid: true,
        editedIndex: -1,
        form: {
          type: '',
          question: '',
          choices: [{ label: '', hasInput: false, inputLabel: '' }],
          car: false,
          plan: false,
        },
        defaultForm: {
          type: '',
          question: '',
          choices: [{ label: '', hasInput: false, inputLabel: '' }],
          car: false,
          plan: false,
        },
        headers: [
          { title: '#', key: 'no', align: 'start' },
          { title: 'หมวด', key: 'type' },
          { title: 'ชื่อคำถาม', key: 'question', align: 'center' },
          { title: 'ช้อยประเมิน', key: 'choice', align: 'center' },
          { title: 'บังคับทำ (เพิ่มรถ)', key: 'car', align: 'start' },
          { title: 'บังคับทำ (เพิ่มแผน)', key: 'plan', align: 'start' },
          { title: 'จัดการ', key: 'action', align: 'center', sortable: false },
        ],
        items: [
          {
            no: 1,
            type: 'ตรวจสอบน้ำมันเบรก',
            question: 'ระดับน้ำมันเบรก',
            choice: 'สูงไป,ปกติ,ต่ำไป,สภาพใช้ได้,ควรเปลี่ยน,DOT 3,DOT 4',
            car: true,
            plan: false,
          },
          {
            no: 2,
            type: 'ตรวจสอบยาง',
            question: 'สภาพยางรถยนต์',
            choice: 'ปกติ,สึกหรอ,ต้องเปลี่ยน,ความดันลมยางปกติ,ความดันลมยางต่ำ',
            car: false,
            plan: true,
          },
          {
            no: 3,
            type: 'ระบบเบรก',
            question: 'ประสิทธิภาพการเบรก',
            choice: 'ปกติ,เบรกไม่สนิท,มีเสียงดัง,ต้องปรับแต่ง',
            car: true,
            plan: true,
          },
          {
            no: 4,
            type: 'ระบบไฟ',
            question: 'การทำงานของไฟหน้า',
            choice: 'ปกติ,ไฟขวาดับ,ไฟซ้ายดับ,กระพริบไม่ปกติ',
            car: false,
            plan: false,
          },
        ],
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'เพิ่มแบบประเมิน' : 'แก้ไขแบบประเมิน'
      },
    },

    methods: {
      openDialog () {
        this.form = JSON.parse(JSON.stringify(this.defaultForm))
        this.editedIndex = -1
        this.dialog = true
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        const choices = item.choice.split(',').map(label => ({
          label: label.trim(),
          hasInput: false,
          inputLabel: '',
        }))
        this.form = {
          type: item.type,
          question: item.question,
          choices,
          car: item.car,
          plan: item.plan,
        }
        this.dialog = true
      },

      async deleteItem (item) {
        const result = await Swal.fire({
          title: 'ยืนยันการลบ',
          text: 'คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?',
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
          this.items.forEach((item, index) => {
            item.no = index + 1
          })
          Swal.fire({
            title: 'ลบสำเร็จ',
            text: 'รายการถูกลบเรียบร้อยแล้ว',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          })
        }
      },

      closeDialog () {
        this.dialog = false
        this.form = JSON.parse(JSON.stringify(this.defaultForm))
        this.editedIndex = -1
        this.$refs.form.resetValidation()
      },

      addChoice () {
        this.form.choices.push({ label: '', hasInput: false, inputLabel: '' })
      },

      async removeChoice (index) {
        if (this.form.choices.length <= 1) {
          await Swal.fire({
            title: 'ไม่สามารถลบได้',
            text: 'ต้องมีอย่างน้อย 1 ช้อย',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          })
          return
        }
        this.form.choices.splice(index, 1)
      },

      async submit () {
        const { valid } = await this.$refs.form.validate()
        if (!valid) {
          await Swal.fire({
            title: 'ข้อมูลไม่ครบถ้วน',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
          })
          return
        }

        const choiceString = this.form.choices
          .filter(choice => choice.label)
          .map(choice => choice.label)
          .join(',')

        const newItem = {
          type: this.form.type,
          question: this.form.question,
          choice: choiceString,
          car: this.form.car,
          plan: this.form.plan,
        }

        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], { ...newItem, no: this.items[this.editedIndex].no })
          Swal.fire({
            title: 'แก้ไขสำเร็จ',
            text: 'รายการได้รับการแก้ไขเรียบร้อยแล้ว',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          })
        } else {
          newItem.no = this.items.length + 1
          this.items.push(newItem)
          Swal.fire({
            title: 'เพิ่มสำเร็จ',
            text: 'รายการถูกเพิ่มเรียบร้อยแล้ว',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          })
        }

        this.closeDialog()
      },
    },
  }
</script>

<style scoped>
.v-btn {
  text-transform: none;
}
.v-label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
}
</style>
