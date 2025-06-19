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
            :class="stop.type === 'pickup' ? 'selected-pickup' : ''"
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
            :class="stop.type === 'dropoff' ? 'selected-drop' : ''"
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
              <v-icon color="red" density="compact">mdi-backspace-outline</v-icon>
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
            <div v-if="isAddressComplete(stop.address)">
              <h3>{{ stop.address.name }}</h3>
              <p>{{ stop.address.location }}</p>
              <p class="hightlight">
                {{ stop.address.receiver }} | {{ stop.address.phone }}
              </p>
              <v-card
                class="border-dashed mt-2"
                color="primary"
                rounded="lg"
                variant="outlined"
              >
                <p class="ma-2 pa-0">{{ stop.address.detail }}</p>
              </v-card>
            </div>
            <div v-else>
              <p>ที่อยู่</p>
            </div>
          </v-card-text>
        </v-card>
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
              v-model="tempAddress.name"
              density="comfortable"
              placeholder="กรอกชื่อที่ตั้งสถานที่"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>ผู้ติดต่อ</p>
            <v-text-field
              v-model="tempAddress.receiver"
              density="comfortable"
              placeholder="กรอกชื่อผู้ที่ติดต่อ"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <p>เบอร์โทรศัพท์</p>
            <v-text-field
              v-model="tempAddress.phone"
              density="comfortable"
              placeholder="กรอกเบอร์โทรศัพท์"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="12">
            <p>ที่อยู่</p>
            <v-text-field
              v-model="tempAddress.location"
              density="comfortable"
              placeholder="กรอกรายละเอียดที่อยู่"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="12">
            <p>รายละเอียดสถานที่</p>
            <v-text-field
              v-model="tempAddress.detail"
              density="comfortable"
              placeholder="กรอกรายละเอียดสถานที่"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col class="text-end" cols="12">
            <v-btn
              color="primary"
              size="x-large"
              text="บันทึกข้อมูล"
              @click="saveAddress"
            />
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
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
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
        driverType: 'select_time',
        tempAddress: {
          name: '',
          location: '',
          receiver: '',
          phone: '',
          detail: '',
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
      if (this.stops.length < 2) {
        this.initializeStops();
      }
    },
    methods: {
      initializeStops () {
        this.stops = [
          {
            type: 'pickup',
            address: {
              name: 'โกดังบางนา',
              location: '123 ถ.บางนา-ตราด แขวงบางนา เขตบางนา กรุงเทพมหานคร 10260',
              receiver: 'นายสมชาย สุขใจ',
              phone: '0812345678',
              detail: 'โกดัง A ด้านหน้าติดถนนใหญ่ มีป้ายชื่อชัดเจน',
            },
          },
          {
            type: 'dropoff',
            address: {
              name: 'ร้านมั่งมีศรีสุข',
              location: '2171 ถ.เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310',
              receiver: 'นางสาวสมหญิง สุขดี',
              phone: '0898765432',
              detail: 'ตึก A ชั้น 2 ห้อง 201 หน้าร้านขายชานมไข่มุก',
            },
          },
        ];
      },
      getTimelineColor (index) {
        return this.stops[index].type === 'pickup' ? 'primary' : 'secondary';
      },
      isAddressComplete (address) {
        if (!address) return false;
        return (
          address.name?.trim() &&
          address.location?.trim() &&
          address.receiver?.trim() &&
          address.phone?.trim() &&
          address.detail?.trim()
        );
      },
      openDialog (index) {
        this.currentEditIndex = index;
        this.tempAddress = {
          name: this.stops[index].address?.name || '',
          location: this.stops[index].address?.location || '',
          receiver: this.stops[index].address?.receiver || '',
          phone: this.stops[index].address?.phone || '',
          detail: this.stops[index].address?.detail || '',
        };
        this.dialog = true;
      },
      saveAddress () {
        this.stops[this.currentEditIndex].address = { ...this.tempAddress };
        this.dialog = false;
        this.tempAddress = {
          name: '',
          location: '',
          receiver: '',
          phone: '',
          detail: '',
        };
      },
      Datedialog () {
        this.dialog_date = true;
      },
      addStop () {
        if (this.stops.length < 20) {
          this.stops.push({
            type: 'dropoff',
          });
        }
      },
      removeStop (index) {
        if (this.stops.length > 1) {
          this.stops.splice(index, 1);
        }
      },
      setStopType (index, type) {
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
</style>
