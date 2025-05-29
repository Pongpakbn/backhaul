<template>
  <v-card
    class="pa-4 border-thin bg-white"
    flat
    max-height="auto"
    rounded="lg"
    style="overflow-y: auto"
    variant="outlined"
  >
    <v-timeline align="start" density="compact" side="end" truncate-line="both">
      <v-timeline-item
        v-for="(stop, index) in stops"
        :key="index"
        :color="getTimelineColor(index)"
        size="small"
        width="100%"
      >
        <!-- Custom Icon Slot for initials -->
        <template #icon>
          <v-avatar :color="getTimelineColor(index)" size="27">
            <!-- <span class="text-white">{{ index + 1 }}</span> -->
          </v-avatar>
        </template>

        <div class="d-flex align-center mb-2">
          <!-- ปุ่มเลือก Start ตามแบบเดิม -->
          <v-btn
            append-icon="mdi-swap-horizontal"
            class="me-3"
            :class="stops[index].type === 'pickup' ? 'selected-pickup' : ''"
            color="primary"
            rounded="lg"
            size="large"
            variant="outlined"
            @click="setStopType(index, 'pickup')"
          >
            จุดรับของ
          </v-btn>
          <!-- ปุ่มเลือก End ตามแบบเดิม -->
          <v-btn
            append-icon="mdi-swap-horizontal"
            :class="stops[index].type === 'dropoff' ? 'selected-drop' : ''"
            color="secondary"
            rounded="lg"
            size="large"
            variant="outlined"
            @click="setStopType(index, 'dropoff')"
          >
            จุดส่งของ
          </v-btn>
          <div class="d-flex justify-end align-center ml-auto">
            <v-btn
              v-if="stops.length > 1"
              color="grey"
              icon
              variant="text"
              @click="removeStop(index)"
            >
              <v-icon
                color="red"
                density="compact"
              >mdi-backspace-outline</v-icon>
            </v-btn>
          </div>
        </div>
        <v-card
          class="border-thin"
          rounded="lg"
          variant="outlined"
          @click="openDialog(index)"
        >
          <v-card-text>
            <h3>{{ address.name }}</h3>
            <p>{{ address.location }}</p>
            <p class="hightlight">
              {{ address.receiver }} | {{ address.phone }}
            </p>
            <v-card
              class="border-dashed mt-2"
              color="primary"
              rounded="lg"
              variant="outlined"
            >
              <p class="ma-2 pa-0">{{ address.detail }}</p>
            </v-card>
          </v-card-text>
        </v-card>
        <!-- <v-text-field
          v-model="stops[index].address"
          density="comfortable"
          hide-details
          placeholder="ระบุที่อยู่"
          variant="underlined"
          @click="openDialog(index)"
        /> -->
        <v-card
          class="mt-2 d-flex align-center"
          prepend-icon="mdi-calendar"
          rounded="md"
          @click="Datedialog()"
        >
          <p>ระบุเวลา</p>
        </v-card>
        <v-checkbox hide-details label="ต้องการคนยกของ" />
        <v-divider />
        <!-- <div class="mt-2">
          <v-text-field
            density="comfortable"
            hide-details
            prepend-inner-icon="mdi-calendar"
            readonly
            variant="outlined"
            @click="Datedialog()"
          />
        </div> -->
      </v-timeline-item>
    </v-timeline>

    <!-- Add Stop Button -->
    <v-row>
      <v-col class="text-start mt-2">
        <v-btn
          color="primary"
          :disabled="stops.length >= 20"
          prepend-icon="mdi-plus-circle-outline"
          size="x-large"
          text="เพิ่มจุดรับ/ส่งของ"
          variant="text"
          @click="addStop"
        />
      </v-col>
    </v-row>
  </v-card>

  <v-dialog v-model="dialog" max-width="600" transition="dialog-transition">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>รายละเอียดสถานที่</span>
        <v-btn
          v-model="time_select"
          density="comfortable"
          icon="mdi-close"
          variant="text"
          @click="dialog = false"
        />
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <p>ชื่อที่ตั้งสถานที่</p>
            <v-text-field
              density="comfortable"
              placeholder="กรอกชื่อที่ตั้งสถานที่"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>ผู้ติดต่อ</p>
            <v-text-field
              density="comfortable"
              placeholder="กรอกชื่อผู้ที่ติดต่อ"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>เบอร์โทรศัพท์</p>
            <v-text-field
              density="comfortable"
              placeholder="กรอกเบอร์โทรศัพท์"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="12">
            <p>รายละเอียดสถานที่</p>
            <v-text-field
              density="comfortable"
              placeholder="กรอกรายละเอียดสถานที่"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col class="text-end" cols="12">
            <v-btn color="primary" size="x-large" text="บันทึกข้อมูล" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- Date Dialog -->
  <v-dialog
    v-model="dialog_date"
    class="mx-auto"
    max-width="800"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span><v-icon class="me-2">mdi-calendar</v-icon>วันเวลาและวันที่</span>
        <v-btn
          density="comfortable"
          icon="mdi-close"
          variant="text"
          @click="dialog_date = false"
        />
      </v-card-title>
      <div>
        <v-date-picker
          v-model="picker"
          show-adjacent-months
          title="เลือกวันที่"
          width="auto"
        />
      </div>
      <div class="mt-2 pa-4 d-flex align-center justify-space-between">
        <!-- ปุ่ม toggle -->
        <v-btn-toggle
          v-model="driverType"
          class="border-thin"
          color="primary"
          density="compact"
          rounded="md"
          style="height: 40px"
        >
          <v-btn height="40" value="select_time">ช่วงเวลา</v-btn>
          <v-btn height="40" value="set_time">ระบุเวลา</v-btn>
        </v-btn-toggle>

        <!-- เมื่อเลือก "ช่วงเวลา" -->
        <v-select
          v-if="driverType === 'select_time'"
          v-model="selectedRange"
          density="compact"
          item-title="title"
          item-value="value"
          :items="timeRanges"
          placeholder="เลือกช่วงเวลา"
          style="max-width: 350px; height: 40px"
          variant="outlined"
        />

        <!-- เมื่อเลือก "ระบุเวลา" -->
        <div
          v-if="driverType === 'set_time'"
          class="d-flex align-center gap-2"
          style="max-width: 420px"
        >
          <v-select
            v-model="hours"
            class="me-2"
            density="compact"
            :items="hoursList"
            label="ชั่วโมง"
            style="width: 250px; height: 40px"
            variant="outlined"
          />
          <span>:</span>
          <v-select
            v-model="minutes"
            class="ml-2"
            density="compact"
            :items="minutesList"
            label="นาที"
            style="width: 250px; height: 40px"
            variant="outlined"
          />
        </div>
      </div>
      <div class="pa-4 d-flex align-center justify-space-between">
        <v-btn
          rounded="md"
          text="ยกเลิก"
          variant="outlined"
          @click="dialog_date = false"
        />
        <v-btn color="primary" rounded="md" text="ยืนยัน" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        hours: new Date().getHours(), // ตั้งค่าชั่วโมงเริ่มต้นเป็นเวลาปัจจุบัน
        minutes: new Date().getMinutes(), // ตั้งค่านาทีเริ่มต้นเป็นเวลาปัจจุบัน
        hoursList: Array.from({ length: 24 }, (_, i) => i),
        minutesList: Array.from({ length: 60 }, (_, i) => i),
        timeRanges: [
          { title: '06:00 - 09:00 (เช้า)', value: 'morning_early' },
          { title: '09:01 - 12:00 (สาย)', value: 'morning_late' },
          { title: '12:01 - 15:00 (บ่าย)', value: 'afternoon' },
          { title: '15:01 - 18:00 (เย็น)', value: 'evening' },
          { title: '18:01 - 21:00 (ค่ำ)', value: 'night' },
          { title: '21:01 - 23:59 (ดึก)', value: 'late_night' },
        ],
        selectedRange: null,
        time: null,
        menu2: false,
        modal2: false,
        driverType: 'select_time',
        address: {
          name: ' 2171 ถ. เพชรบุรีตัดใหม่',
          location:
            '2171 ถ. เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310 ประเทศไทย',
          receiver: 'นายสมชาย',
          phone: '0812345678',
          detail:
            'ตึก A ชั้น 2 ห้อง 201 หน้าร้านขายชานมไข่มุก โครงการมั่งมีศรีสุข มีแมว อยู่ 2 ตัว',
        },
        picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),

        stops: [],
        dialog: false,
        dialog_date: false,
        currentEditIndex: null,
      };
    },
    created () {
      // ตรวจสอบว่ามีอย่างน้อย 2 จุดเมื่อเริ่มต้น
      if (this.stops.length < 2) {
        this.initializeStops();
      }
    },
    methods: {
      initializeStops () {
        // เพิ่มจุดรับและจุดส่งเริ่มต้น
        this.stops = [
          {
            type: 'pickup', // จุดแรกเป็นจุดรับของ
          },
          {
            type: 'dropoff', // จุดที่สองเป็นจุดส่งของ
          },
        ];
      },
      getTimelineColor (index) {
        // เปลี่ยนสีตามประเภทของจุด
        return this.stops[index].type === 'pickup' ? 'primary' : 'secondary';
      },
      openDialog (index) {
        this.currentEditIndex = index;
        this.dialog = true;
      },
      Datedialog () {
        this.dialog_date = true;
      },
      addStop () {
        if (this.stops.length < 20) {
          // สร้างจุดใหม่ กำหนดเป็นจุดส่งค่าเริ่มต้น
          this.stops.push({
            address: '',
            type: 'dropoff', // กำหนดค่าเริ่มต้นให้จุดใหม่เป็นจุดส่ง
          });
        }
      },
      removeStop (index) {
        if (this.stops.length > 1) {
          this.stops.splice(index, 1);
        }
      },
      setStopType (index, type) {
        // กำหนดประเภทของจุด
        this.stops[index].type = type;
      },
    },
  };
</script>

<style scoped>
.selected-pickup {
  background-color: #005eb8 !important;
  color: white !important;
}

.selected-drop {
  background-color: #f2a900 !important;
  color: white !important;
}

.hightlight {
  color: #005eb8;
  font-weight: bold;
}
.force-white {
  color: white !important;
}
</style>
