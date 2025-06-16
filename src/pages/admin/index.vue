<template>
  <v-container>
    <h2>ยืนยันผู้ใช้งาน</h2>
    <v-card class="mt-2" flat rounded="md">
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
      >
        <template #[`item.status`]="{ item }">
          <v-btn
            class="text-capitalize"
            :color="item.status === 'อนุมัติ' ? 'green' : 'primary'"
            variant="outlined"
          >
            {{ item.status }}
          </v-btn>
        </template>
        <template #[`item.details`]="{ item }">
          <v-btn
            v-if="!item.confirmed && item.status !== 'อนุมัติ'"
            color="primary"
            flat
            text="ยืนยัน"
            @click="confirmItem(item)"
          />
          <v-icon v-if="item.status === 'อนุมัติ'" color="green">mdi-check</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import Swal from 'sweetalert2'

  export default {
    data () {
      return {
        headers: [
          { title: 'ชื่อ - นามสกุล/ ชื่อบริษัท', key: 'deliveryNumber' },
          { title: 'เบอร์โทร', key: 'orderNumber' },
          { title: 'ประเภท', key: 'company' },
          { title: 'สถานะ', key: 'status' },
          { title: 'ข้อมูล', key: 'details', sortable: false },
        ],
        items: [
          {
            deliveryNumber: 'Something delivery',
            orderNumber: '083-343-5345',
            company: 'LSP',
            status: 'อนุมัติ',
            confirmed: true,
          },
          {
            deliveryNumber: 'บริษัท แอ๊ดวานซ์',
            orderNumber: '083-343-5345',
            company: 'ผู้ใช้งาน',
            status: 'รอการอนุมัติ',
            confirmed: false,
          },
          {
            deliveryNumber: 'คุณนัด',
            orderNumber: '083-343-2564',
            company: 'คนขับรถ',
            status: 'อนุมัติ',
            confirmed: true,
          },
          {
            deliveryNumber: 'มูเน่ เมเนจเมน',
            orderNumber: '083-243-5343',
            company: 'LSP',
            status: 'รอการอนุมัติ',
            confirmed: false,
          },
        ],
      }
    },

    methods: {
      async confirmItem (item) {
        const result = await Swal.fire({
          title: 'ยืนยันการอนุมัติ',
          text: `คุณต้องการอนุมัติ ${item.deliveryNumber} หรือไม่?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })

        if (result.isConfirmed) {
          item.confirmed = true
          item.status = 'อนุมัติ'
          await Swal.fire({
            title: 'อนุมัติสำเร็จ',
            text: `${item.deliveryNumber} ได้รับการอนุมัติเรียบร้อย`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          })
        }
      },
    },
  }
</script>
