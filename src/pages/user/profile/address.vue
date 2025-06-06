<template>
  <v-container>
    <!-- ปุ่มย้อนกลับ + เพิ่มที่อยู่ -->
    <v-card class="mb-4 pa-0" flat rounded="md">
      <v-card-title class="pl-1 d-flex justify-space-between">
        <v-btn prepend-icon="mdi-chevron-left" variant="text" @click="$router.push('/user/profile/')">
          ย้อนกลับ
        </v-btn>
        <v-btn color="primary" variant="flat" @click="openDialog()">
          เพิ่มที่อยู่
        </v-btn>
      </v-card-title>
    </v-card>

    <!-- รายการที่อยู่ทั้งหมด -->
    <v-card
      v-for="(addr, index) in sortedAddresses"
      :key="index"
      class="pa-4 mb-4"
      flat
      rounded="md"
      @click="openDialog(index)"
    >
      <v-card-title class="text-h6 font-weight-bold d-flex justify-space-between align-center">
        <div class="d-flex align-center flex-wrap">
          <span>{{ addr.name }}</span>
          <v-chip
            v-if="addr.default"
            class="ml-3"
            color="red"
            label
            size="small"
            variant="outlined"
          >
            ค่าเริ่มต้น
          </v-chip>
        </div>
      </v-card-title>
      <v-card-text>
        <p class="text-body-1">{{ addr.address }}</p>
        <p class="text-body-1">{{ addr.phone }}</p>
      </v-card-text>
    </v-card>

    <!-- Dialog เพิ่ม/แก้ไขที่อยู่ -->
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title>ที่อยู่</v-card-title>
        <v-card-text>
          <p>ชื่อ-นามสกุล</p>
          <v-text-field v-model="form.name" density="comfortable" placeholder="กรอกชื่อ-นามสกุล" variant="outlined" />
          <p>เบอร์โทรศัพท์</p>
          <v-text-field v-model="form.phone" density="comfortable" placeholder="เบอร์โทรศัพท์" variant="outlined" />
          <p>รายละเอียดที่อยู่</p>
          <v-textarea
            v-model="form.address"
            auto-grow
            density="comfortable"
            placeholder="รายละเอียดที่อยู่"
            rows="4"
            variant="outlined"
          />
          <div class="d-flex justify-space-between align-center mt-4">
            <p>เลือกเป็นที่อยู่ตั้งต้น</p>
            <v-switch v-model="form.default" color="primary" inset />
          </div>

          <div class="d-flex justify-space-between align-center">
            <v-btn
              v-if="isEdit"
              class="mt-2"
              color="primary"
              :disabled="form.default"
              flat
              rounded="md"
              size="large"
              variant="outlined"
              @click="deleteAddress"
            >
              ลบที่อยู่
            </v-btn>

            <v-btn
              :block="!isEdit"
              class="mt-2"
              color="primary"
              :disabled="!isFormValid"
              flat
              rounded="md"
              size="large"
              @click="saveAddress"
            >
              ยืนยัน
            </v-btn>
          </div>
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
        isEdit: false,
        editIndex: null,
        addresses: [
          {
            name: 'พงศ์ภัค ใจดี',
            phone: '099-712-5161',
            address: '2171 ถ.เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310',
            default: true,
          },
          {
            name: 'ศิริพร ใจงาม',
            phone: '081-234-5678',
            address: '99/9 หมู่บ้านแสนสุข ซ.สุขุมวิท 101/1 เขตบางนา กรุงเทพฯ 10260',
            default: false,
          },
          {
            name: 'ณัฐวุฒิ มั่นคง',
            phone: '098-765-4321',
            address: '123 หมู่ 4 ต.บ้านเก่า อ.เมือง จ.เชียงใหม่ 50000',
            default: false,
          },
        ],
        form: {
          name: '',
          phone: '',
          address: '',
          default: false,
        },
      };
    },
    computed: {
      sortedAddresses () {
        // แสดงค่า default ไว้บนสุด
        return this.addresses.slice().sort((a, b) => {
          return (b.default === true) - (a.default === true);
        });
      },
      isFormValid () {
        // ตรวจสอบว่ากรอกครบทั้งชื่อ, เบอร์, ที่อยู่
        return (
          this.form.name.trim() !== '' &&
          this.form.phone.trim() !== '' &&
          this.form.address.trim() !== ''
        );
      },
    },
    methods: {
      openDialog (index = null) {
        this.dialog = true;

        if (index !== null) {
          const addr = this.sortedAddresses[index];
          const realIndex = this.addresses.findIndex(
            a =>
              a.name === addr.name &&
              a.phone === addr.phone &&
              a.address === addr.address
          );

          this.isEdit = true;
          this.editIndex = realIndex;
          this.form = { ...this.addresses[realIndex] };
        } else {
          this.isEdit = false;
          this.editIndex = null;
          this.form = {
            name: '',
            phone: '',
            address: '',
            default: false,
          };
        }
      },
      saveAddress () {
        // ตั้ง default ใหม่ต้องลบ default เดิมก่อน
        if (this.form.default) {
          this.addresses.forEach(a => (a.default = false));
        }

        if (this.isEdit) {
          this.addresses[this.editIndex] = { ...this.form };
        } else {
          this.addresses.push({ ...this.form });
        }

        this.dialog = false;
      },
      deleteAddress () {
        if (this.isEdit) {
          this.addresses.splice(this.editIndex, 1);
          this.dialog = false;
        }
      },
    },
  };
</script>
