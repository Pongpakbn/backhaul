<template>
  <v-container>
    <h2>ตรวจสอบคนขับรถ</h2>
    <v-card class="mt-2" flat rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #[`item.status`]="{ item }">
          <v-chip
            :color="item.status === 'อนุมัติ' ? 'green' : item.status === 'ส่งกลับเพื่อแก้ไข' ? 'secondary' : 'primary'"
            label
            variant="outlined"
          >
            {{ item.status }}
          </v-chip>
        </template>
        <template #[`item.details`]="{ item }">
          <v-btn
            color="primary"
            flat
            text="ดูรายละเอียด"
            @click="openDialog(item)"
          />
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          ข้อมูลคนขับ
          <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <p>ชื่อคนขับ :</p>
            </v-col>
            <v-col cols="12" md="9">
              <p>ทดสอบ</p>
            </v-col>
            <v-col cols="12" md="3">
              <p>จังหวัด :</p>
            </v-col>
            <v-col cols="12" md="9">
              <p>สมุทรสาคร</p>
            </v-col>
            <v-col cols="12" md="3">
              <p>อำเภอ :</p>
            </v-col>
            <v-col cols="12" md="9">
              <p>พันท้ายนรสิงห์</p>
            </v-col>
            <v-col cols="12" md="3">
              <p>ที่อยู่ :</p>
            </v-col>
            <v-col cols="12" md="9">
              <p>2171 ถ. เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310 ประเทศไทย</p>
            </v-col>
            <v-col cols="12" md="3">
              <p>ประเภทใบขับขี่ :</p>
            </v-col>
            <v-col cols="12" md="9">
              <p>ใบขับขี่ ท.1</p>
            </v-col>
            <v-col cols="12" md="3">
              <p>เลขที่ใบขับขี่ :</p>
            </v-col>
            <v-col class="text-start" cols="12" md="9">
              <p>53095345</p>
            </v-col>
            <v-col cols="12" md="3">
              <p>วันหมดอายุใบขับขี่ :</p>
            </v-col>
            <v-col class="text-start" cols="12" md="9">
              <p>25/10/2568</p>
            </v-col>
            <v-col cols="12" md="3">
              <p>รูปภาพ :</p>
            </v-col>
            <v-col class="text-start" cols="12" md="9">
              <v-img aspect-ratio="16/9" src="@/assets/img/driver.jpg" :width="298" />
            </v-col>
            <v-col class="d-flex justify-end ga-4">
              <v-btn
                flat
                prepend-icon="mdi-close"
                text="ไม่อนุมัติ"
                variant="outlined"
                @click="rejectDriver"
              />
              <v-btn
                color="primary"
                flat
                prepend-icon="mdi-check"
                text="อนุมัติ"
                @click="approveDriver"
              />
            </v-col>
          </v-row>
        </v-card-text>
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
        selectedDriver: null,
        headers: [
          { title: '#', key: 'id' },
          { title: 'ชื่อคนขับ', key: 'deliveryNumber' },
          { title: 'ประเภทใบขับขี่', key: 'orderNumber' },
          { title: 'เลขที่ใบขับขี่', key: 'company' },
          { title: 'สถานะ', key: 'status' },
          { title: 'จัดการ', key: 'details', sortable: false },
        ],
        items: [
          {
            id: 1,
            deliveryNumber: 'น้าสู',
            orderNumber: 'ใบที่ 1',
            company: '5550345',
            status: 'อนุมัติ',
            confirmed: true,
          },
          {
            id: 2,
            deliveryNumber: 'น้าชัย',
            orderNumber: 'ใบที่ 2',
            company: '5550346',
            status: 'รอการอนุมัติ',
            confirmed: false,
          },
          {
            id: 3,
            deliveryNumber: 'น้าต้น',
            orderNumber: 'ใบที่ 3',
            company: '5550347',
            status: 'ส่งกลับเพื่อแก้ไข',
            confirmed: false,
          },
          {
            id: 4,
            deliveryNumber: 'น้าสมชาย',
            orderNumber: 'ใบที่ 4',
            company: '5550348',
            status: 'รอการอนุมัติ',
            confirmed: false,
          },
        ],
      }
    },

    methods: {
      openDialog (item) {
        this.selectedDriver = { ...item }
        this.dialog = true
      },

      closeDialog () {
        this.dialog = false
        this.selectedDriver = null
      },

      async approveDriver () {
        if (!this.selectedDriver) return

        const index = this.items.findIndex(item => item.id === this.selectedDriver.id)
        if (index !== -1) {
          this.items[index].status = 'อนุมัติ'
          this.items[index].confirmed = true
        }

        this.closeDialog()
        await Swal.fire({
          title: 'อนุมัติสำเร็จ',
          text: 'ข้อมูลคนขับได้รับการอนุมัติเรียบร้อย',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        })
      },

      async rejectDriver () {
        if (!this.selectedDriver) return

        const index = this.items.findIndex(item => item.id === this.selectedDriver.id)
        if (index !== -1) {
          this.items[index].status = 'ส่งกลับเพื่อแก้ไข'
          this.items[index].confirmed = false
        }

        this.closeDialog()
        await Swal.fire({
          title: 'ไม่อนุมัติ',
          text: 'ข้อมูลคนขับถูกส่งกลับเพื่อแก้ไขเรียบร้อย',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        })
      },
    },
  }
</script>
