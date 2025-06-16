```vue
<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <h2>ตรวจสอบแผนการเดินรถ</h2>
      <v-btn color="primary" variant="flat" @click="dialog = true">
        กำหนดวันหมดอายุแผน
      </v-btn>
    </div>
    <v-card class="mt-2" flat rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #[`item.status`]="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            label
            :text="item.status"
            variant="outlined"
          />
        </template>
        <template #[`item.details`]="{ item }">
          <v-btn
            color="primary"
            rounded="md"
            variant="flat"
            @click="viewDetails(item)"
          >
            ตรวจสอบ
          </v-btn>
        </template>
        <template #[`item.exp`]="{ item }">
          <span v-if="item.status === 'ยกเลิกแผน'">-</span>
          <span v-else-if="item.exp">{{ item.exp }}</span>
          <span v-else class="text-grey">ยังไม่กำหนด</span>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title>วันครบกำหนดแผน</v-card-title>
        <v-card-text>
          <h3>เลือกวัน</h3>
          <v-slider
            v-model="slider"
            class="align-center"
            color="primary"
            hide-details
            :max="max"
            :min="min"
            step="1"
          >
            <template #append>
              <span v-text="slider" />
              <span class="pl-2">วัน</span>
            </template>
          </v-slider>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text="ยืนยัน" variant="flat" @click="saveExpirationDate" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: 'RoutePlanChecker',
    data () {
      return {
        dialog: false,
        slider: 1, // Default to valid value within min-max
        min: 1,
        max: 30,
        headers: [
          { title: 'แผนการเดินทาง', key: 'route' },
          { title: 'วันที่เริ่มและสิ้นสุดแผน', key: 'date' },
          { title: 'พาเลทที่จอง/ทั้งหมด', key: 'pallet' },
          { title: 'สถานะ', key: 'status' },
          { title: 'จัดการข้อมูล', key: 'details', sortable: false },
          { title: 'วันหมดอายุของแผน', key: 'exp', sortable: false },
        ],
        items: [
          {
            id: 1,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'ประกาศแผน',
            verify: 'approve',
            exp: '1/7/2567',
          },
          {
            id: 5,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'ประกาศแผน',
            verify: 'approve',
            exp: '1/7/2567',
          },
          {
            id: 6,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'ประกาศแผน',
            verify: 'approve',
            exp: '1/7/2567',
          },
          {
            id: 2,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'รอการอนุมัติ',
            verify: 'wait',
            exp: '',
          },
          {
            id: 3,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'ส่งกลับเพื่อแก้ไข',
            verify: 'wait',
            exp: '',
          },
          {
            id: 4,
            route: 'เทศบาลนครภูเก็ต → ถนน สุขสวัสดิ์',
            date: '27/6/2567 - 27/6/2567',
            pallet: '0/12',
            status: 'ยกเลิกแผน',
            verify: 'approve',
            exp: '',
          },
        ],
      }
    },
    methods: {
      getStatusColor (status) {
        switch (status) {
          case 'ประกาศแผน':
            return 'green'
          case 'รอการอนุมัติ':
            return 'primary'
          case 'ส่งกลับเพื่อแก้ไข':
            return 'secondary'
          case 'ยกเลิกแผน':
            return 'red'
          default:
            return 'grey'
        }
      },
      viewDetails (item) {
        this.$router.push('/admin/route/id')
        console.log(`Viewing details of plan ${item.id}`)
      },
      validateSlider () {
        if (this.slider < this.min) this.slider = this.min
        if (this.slider > this.max) this.slider = this.max
      },
      formatDate (date) {
        if (!date) return ''
        const d = new Date(date)
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear() + 543 // Thai Buddhist calendar
        return `${day}/${month}/${year}`
      },
      saveExpirationDate () {
        this.dialog = false
        this.$swal
          .fire({
            title: 'ยืนยันการบันทึก',
            text: `คุณต้องการกำหนดวันหมดอายุแผนเป็น ${this.slider} วันหรือไม่?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          })
          .then(result => {
            if (result.isConfirmed) {
              // Calculate expiration date (today + slider days)
              const today = new Date()
              const expDate = new Date(today)
              expDate.setDate(today.getDate() + this.slider)
              const formattedExpDate = this.formatDate(expDate)

              // Update items with status 'ประกาศแผน' only
              this.items = this.items.map(item => {
                if (item.status === 'ประกาศแผน') {
                  return { ...item, exp: formattedExpDate }
                }
                return item
              })

              // Simulate API call
              Promise.resolve({
                data: {
                  success: true,
                  msg: 'กำหนดวันหมดอายุแผนสำเร็จ',
                },
              }).then(response => {
                this.dialog = false
                if (response.data.success) {
                  this.$swal.fire({
                    title: 'บันทึกสำเร็จ',
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
      },
    },
  }
</script>
```
