<template>
  <v-container>
    <v-row class="align-center mb-4">
      <!-- ฝั่งซ้ายทั้งหมด -->
      <v-col class="d-flex align-center" cols="12" md="6">
        <div class="me-4">
          <h2 class="mb-1">แผนการเดินรถ</h2>
          <p class="opacity-50 mb-0">{{ filteredItems.length }} แผน</p>
        </div>

        <v-text-field
          v-model="searchText"
          density="compact"
          hide-details
          max-width="368"
          placeholder="Search by driver name"
          prepend-inner-icon="mdi-magnify"
          rounded="md"
          single-line
          style="background-color: white;"
          variant="outlined"
        />
      </v-col>

      <!-- อีกฝั่ง -->
      <v-col cols="12" md="6">
        <div class="d-flex justify-end">
          <v-btn
            color="primary"
            prepend-icon="mdi-map-legend"
            size="large"
            text="เพิ่มแผนการเดินรถ"
            @click="openDialog"
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
                v-if="['ส่งกลับเพื่อแก้ไข',''].includes(item.status)"
                class="me-2"
                flat
                prepend-icon="mdi-update"
                style="background-color: #f2a900; color: white;"
                text="อัพเดทข้อมูล"
                @click="$router.push(`/partner/booking/${item.id}`)"
              />
            </v-col>
            <v-col class="text-start">
              <v-btn
                class="text-white"
                color="red"
                prepend-icon="mdi-delete"
                text="ลบ"
                @click="cancelPlan(item)"
              />
            </v-col>
          </v-row>

        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="1000">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          {{ currentStep < 4 ? "เพิ่มแผนการเดินรถ" : "ตรวจสอบยานพาหนะ" }}
          <v-btn icon variant="text" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />

        <v-card-text class="pb-0">
          <!-- Vehicle Summary Card -->
          <v-card
            v-if="currentStep >= 1"
            border="thin"
            class="text-center mb-4"
            variant="outlined"
          >
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <h3>ชื่อ-นามสกุล: {{ planData.driverName }}</h3>
                </v-col>
                <v-col cols="12" md="4">
                  <h3>ประเภท: {{ planData.vehicleType }}</h3>
                </v-col>
                <v-col cols="12" md="4">
                  <h3>ป้ายทะเบียน: {{ planData.registrationPlate }}</h3>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Form Content -->
          <div>
            <div v-if="currentStep === 0">
              <p>เส้นทาง</p>
              <Addaddress />
              <v-row class="mt-2">
                <v-col cols="12" md="6">
                  <p>ชื่อคนขับ</p>
                  <v-select
                    density="comfortable"
                    hide-details
                    placeholder="เลือกคนขับ"
                    rounded="lg"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <p>รถ</p>
                  <v-select
                    density="comfortable"
                    hide-details
                    placeholder="เลือกรถ"
                    rounded="lg"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <p>จุดเริ่มต้น</p>
                  <v-text-field
                    density="comfortable"
                    hide-details
                    placeholder="จุดเริ่มต้น"
                    rounded="lg"
                    variant="outlined"
                    @click="starpoint = true"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <p>จุดสิ้นสุด</p>
                  <v-text-field
                    density="comfortable"
                    hide-details
                    placeholder="เลือกรถ"
                    rounded="lg"
                    variant="outlined"
                    @click="starpoint = true"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <p>วันที่ออกเดินทาง</p>
                  <v-date-input
                    density="comfortable"
                    hide-details
                    multiple="range"
                    rounded="lg"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <p>วันที่สิ้นสุดการเดินทาง</p>
                  <v-date-input
                    density="comfortable"
                    hide-details
                    multiple="range"
                    rounded="lg"
                    variant="outlined"
                  />
                </v-col>
              </v-row>
            </div>

            <div v-else-if="currentStep === 1">
              <div>
                <h3>1. ตรวจสอบระบบเบรก (BRAKE)</h3>
                <v-row dense>
                  <v-col cols="12">
                    <p>(ก) ระดับน้ำมันเบรก</p>
                    <v-radio-group v-model="brakeData.tankCondition" inline>
                      <v-radio label="สูงไป" value="ดี" />
                      <v-radio label="ปกติ" value="ชำรุด" />
                      <v-radio label="ต่ำไป" value="รั่ว" />
                      <v-radio label="สภาพใช้ได้" value="อื่นๆ" />
                      <v-radio label="ควรเปลี่ยน" value="ไม่ระบุ" />
                      <v-radio label="DOT 3" value="DOT 3" />
                      <v-radio label="DOT 4" value="DOT 4" />
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <p>(ข) ระดับน้ำมันคลัตช์</p>
                    <v-radio-group v-model="brakeData.clutchFluidLevel" inline>
                      <v-radio label="สูงไป" value="ดี" />
                      <v-radio label="ปกติ" value="ชำรุด" />
                      <v-radio label="ต่ำไป" value="รั่ว" />
                      <v-radio label="สภาพใช้ได้" value="อื่นๆ" />
                      <v-radio label="ควรเปลี่ยน" value="ไม่ระบุ" />
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <p>(ค) รอยรั่วซึมตามจุดต่างๆ</p>
                    <v-radio-group v-model="brakeData.pipeCondition" inline>
                      <v-radio label="ไม่มี" value="ดี" />
                      <v-radio label="มีรอยรั่ว: ระบุ" value="ชำรุด" />
                      <v-text-field
                        v-model="brakeData.pipeConditionDetails"
                        class="mx-4"
                        density="comfortable"
                        :disabled="brakeData.pipeCondition !== 'ชำรุด'"
                        max-width="368"
                        rounded="lg"
                        variant="underlined"
                      />
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <p>(ง) ถังลม/การเครนที่ทิ้ง</p>
                    <v-radio-group v-model="brakeData.oilLevel" inline>
                      <v-radio label="รั่ว" value="รั่ว" />
                      <v-radio label="ปกติ" value="ปกติ" />
                      <v-radio label="ทำการซ่อมแซม" value="อื่นๆ" />
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <p>(จ) สายลม/จุดเชื่อมต่อ</p>
                    <v-radio-group v-model="brakeData.pressureOperation" inline>
                      <v-radio label="รั่ว" value="รั่ว" />
                      <v-radio label="ปกติ" value="ปกติ" />
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <p>(ฉ) เบรกมือ/เบรกจอด</p>
                    <v-radio-group v-model="brakeData.leakOperation" inline>
                      <v-radio label="เสียงดัง" value="เสียงดัง" />
                      <v-text-field
                        v-model="brakeData.leakOperationDetails"
                        class="mx-1"
                        density="comfortable"
                        :disabled="brakeData.leakOperation !== 'เสียงดัง'"
                        max-width="200"
                        rounded="lg"
                        variant="underlined"
                      />
                      <v-radio label="คลิ๊ก" value="คลิ๊ก" />
                      <v-radio label="ใช้ได้" value="ใช้ได้" />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>
            </div>

            <div v-else-if="currentStep === 2">
              <div>
                <h3>2. ตรวจระบบไฟฟ้า (E = ELECTRICITY)</h3>
                <v-row dense>
                  <v-col cols="12">
                    <p>(ก) ระดับน้ำกลั่น</p>
                    <v-radio-group
                      v-model="electricityData.distilledWaterLevel"
                      inline
                    >
                      <v-radio label="สูงไป" value="สูงไป" />
                      <v-radio label="ปกติ" value="ปกติ" />
                      <v-radio label="ต่ำไป" value="ต่ำไป" />
                      <v-radio label="ควรเติม" value="ควรเติม" />
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <p>(ข) ระบบไฟหน้า</p>
                    <v-radio-group
                      v-model="electricityData.headlightCondition"
                      inline
                    >
                      <v-radio label="ปกติ" value="ปกติ" />
                      <v-radio label="ชำรุด" value="ชำรุด" />
                      <v-radio label="ต้องซ่อม" value="ต้องซ่อม" />
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <p>(ค) ระบบไฟท้าย</p>
                    <v-radio-group
                      v-model="electricityData.taillightCondition"
                      inline
                    >
                      <v-radio label="ปกติ" value="ปกติ" />
                      <v-radio label="ชำรุด" value="ชำรุด" />
                      <v-radio label="ต้องซ่อม" value="ต้องซ่อม" />
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <p>(ง) ระบบไฟเลี้ยว</p>
                    <v-radio-group
                      v-model="electricityData.turnSignalCondition"
                      inline
                    >
                      <v-radio label="ปกติ" value="ปกติ" />
                      <v-radio label="ชำรุด" value="ชำรุด" />
                      <v-radio label="ต้องซ่อม" value="ต้องซ่อม" />
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <p>(จ) แบตเตอรี่</p>
                    <v-radio-group
                      v-model="electricityData.batteryCondition"
                      inline
                    >
                      <v-radio label="ปกติ" value="ปกติ" />
                      <v-radio label="ชำรุด" value="ชำรุด" />
                      <v-radio label="ควรเปลี่ยน" value="ควรเปลี่ยน" />
                      <v-text-field
                        v-model="electricityData.batteryConditionDetails"
                        class="mx-4"
                        density="comfortable"
                        :disabled="electricityData.batteryCondition !== 'ชำรุด'"
                        max-width="368"
                        placeholder="ระบุรายละเอียด"
                        rounded="lg"
                        variant="underlined"
                      />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>
            </div>

            <div v-else-if="currentStep === 3">
              <div>
                <h3>3. ตรวจสอบยาง (TIRES)</h3>
                <v-row dense>
                  <v-col cols="12">
                    <p>สภาพยาง</p>
                    <v-radio-group v-model="tireData.tireCondition" inline>
                      <v-radio label="ดี" value="ดี" />
                      <v-radio label="สึก" value="สึก" />
                      <v-radio label="ต้องเปลี่ยน" value="ต้องเปลี่ยน" />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>
            </div>

            <div v-else-if="currentStep === 4">
              <div>
                <h3>4. ตรวจสอบเครื่องยนต์ (ENGINE)</h3>
                <v-row dense>
                  <v-col cols="12">
                    <p>สภาพเครื่องยนต์</p>
                    <v-radio-group v-model="engineData.engineCondition" inline>
                      <v-radio label="ปกติ" value="ปกติ" />
                      <v-radio label="มีปัญหา" value="มีปัญหา" />
                      <v-text-field
                        v-model="engineData.engineConditionDetails"
                        class="mx-4"
                        density="comfortable"
                        :disabled="engineData.engineCondition !== 'มีปัญหา'"
                        max-width="368"
                        placeholder="ระบุรายละเอียด"
                        rounded="lg"
                        variant="underlined"
                      />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>
            </div>

            <div v-else-if="currentStep === 5">
              <div>
                <h3>5. ตรวจสอบระบบกันสะเทือน (SUSPENSION)</h3>
                <v-row dense>
                  <v-col cols="12">
                    <p>สภาพโช้คอัพ</p>
                    <v-radio-group
                      v-model="suspensionData.shockAbsorberCondition"
                      inline
                    >
                      <v-radio label="ปกติ" value="ปกติ" />
                      <v-radio label="ชำรุด" value="ชำรุด" />
                      <v-radio label="ต้องเปลี่ยน" value="ต้องเปลี่ยน" />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>
            </div>

            <div v-else-if="currentStep === 6">
              <div>
                <h3>6. ตรวจสอบตัวถังรถ (BODY)</h3>
                <v-row dense>
                  <v-col cols="12">
                    <p>สภาพตัวถัง</p>
                    <v-radio-group v-model="bodyData.bodyCondition" inline>
                      <v-radio label="ดี" value="ดี" />
                      <v-radio label="มีรอย" value="มีรอย" />
                      <v-text-field
                        v-model="bodyData.bodyConditionDetails"
                        class="mx-4"
                        density="comfortable"
                        :disabled="bodyData.bodyCondition !== 'มีรอย'"
                        max-width="368"
                        placeholder="ระบุรายละเอียด"
                        rounded="lg"
                        variant="underlined"
                      />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>
            </div>

            <div v-else-if="currentStep === 7">
              <div>
                <h3>7. สรุปผลการตรวจสอบ (SUMMARY)</h3>
                <v-row dense>
                  <v-col cols="12">
                    <p>ผลการตรวจสอบโดยรวม</p>
                    <v-radio-group
                      v-model="summaryData.overallCondition"
                      inline
                    >
                      <v-radio label="ผ่าน" value="ผ่าน" />
                      <v-radio label="ไม่ผ่าน" value="ไม่ผ่าน" />
                      <v-text-field
                        v-model="summaryData.overallConditionDetails"
                        class="mx-4"
                        density="comfortable"
                        :disabled="summaryData.overallCondition !== 'ไม่ผ่าน'"
                        max-width="368"
                        placeholder="ระบุเหตุผลที่ไม่ผ่าน"
                        rounded="lg"
                        variant="underlined"
                      />
                    </v-radio-group>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>

          <v-divider class="mt-4 mb-6" />
          <v-row>
            <v-col class="pt-0">
              <v-btn
                v-if="currentStep > 0"
                class="mr-2"
                color="primary"
                size="large"
                variant="outlined"
                @click="prevStep"
              >
                ย้อนกลับ
              </v-btn>
            </v-col>
            <v-col class="pt-0 d-flex justify-end align-center">
              <span
                v-if="currentStep >= 4"
                class="mr-2 text-h6"
              >หน้า {{ currentStep - 3 }} / 7</span>
              <v-btn color="primary" size="large" @click="nextStep">
                {{ currentStep === 10 ? "ยืนยันและบันทึก" : "ถัดไป" }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- addMap -->
    <v-dialog v-model="starpoint" max-width="800">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          เลือกจุดเริ่มต้น
          <v-btn icon variant="text" @click="starpoint = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p>จุดเริ่มต้น</p>
          <v-text-field
            density="comfortable"
            placeholder="ค้นหาจุดเริ่มต้น"
            prepend-inner-icon="mdi-magnify"
            rounded="lg"
            variant="outlined"
          />
          <Addaddress />
          <div class="mt-4 d-flex justify-end">
            <v-btn
              color="primary"
              prepend-icon="mdi-check"
              text="ยืนยัน"
            /></div></v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { VDateInput } from 'vuetify/labs/VDateInput';
  import Addaddress from '@/components/Track.vue';

  export default {
    components: {
      Addaddress,
      VDateInput,
    },
    data () {
      return {
        currentStep: 0,
        starpoint: false,
        searchText: '',
        dialog: false,
        steps: [
          'เส้นทาง',
          'ข้อมูลคนขับ',
          'วันที่เดินทาง',
          'ยืนยันแผน',
          'ตรวจสอบระบบเบรก',
          'ตรวจสอบระบบไฟ',
          'ตรวจสอบยาง',
          'ตรวจสอบเครื่องยนต์',
          'ตรวจสอบระบบกันสะเทือน',
          'ตรวจสอบตัวถัง',
          'สรุปผลการตรวจสอบ',
        ],
        headers: [
          { title: '#', value: 'index', sortable: false },
          { title: 'ชื่อคนขับ', value: 'driverName' },
          { title: 'รถและทะเบียน', value: 'vehicleInfo' },
          { title: 'วันเริ่ม/สิ้นสุดวันที่', value: 'dateRange' },
          { title: 'พาเลททั้งหมด', value: 'pallets' },
          { title: 'สถานะ', value: 'status' },
          { title: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        ],
        items: [
          {
            id: 1,
            index: 1,
            driverName: 'เอ',
            vehicleInfo: 'รถ 4 ล้อ กง 777',
            dateRange: 'เริ่ม: 12/02/2568 - สิ้นสุด: 16/02/2568',
            pallets: '22/23',
            status: 'ประกาศแผน',
          },
          {
            id: 2,
            index: 2,
            driverName: 'บี',
            vehicleInfo: 'รถ 4 ล้อ กง 777',
            dateRange: 'เริ่ม: 12/02/2568 - สิ้นสุด: 16/02/2568',
            pallets: '22/22',
            status: 'รอตรวจสอบ',
          },
          {
            id: 3,
            index: 3,
            driverName: 'ซี',
            vehicleInfo: 'รถ 4 ล้อ',
            dateRange: 'เริ่ม: 12/02/2568 - สิ้นสุด: 16/02/2568',
            pallets: '2/24',
            status: 'ส่งกลับเพื่อแก้ไข',
          },
          {
            id: 4,
            index: 4,
            driverName: 'ดี',
            vehicleInfo: 'รถ 4 ล้อ',
            dateRange: 'เริ่ม: 12/02/2568 - สิ้นสุด: 16/02/2568',
            pallets: '0/0',
            status: 'ยกเลิกแผน',
          },
        ],
        planData: {
          visualisation: null,
          startPoint: '',
          endPoint: '',
          driverName: '',
          vehicleId: null,
          vehicleType: '',
          registrationPlate: '',
          startDate: null,
          endDate: null,
          status: 'ประกาศแผน',
        },
        brakeData: {
          tankCondition: '',
          clutchFluidLevel: '',
          pipeCondition: '',
          pipeConditionDetails: '',
          oilLevel: '',
          pressureOperation: '',
          leakOperation: '',
          leakOperationDetails: '',
        },
        electricityData: {
          distilledWaterLevel: '',
          headlightCondition: '',
          taillightCondition: '',
          turnSignalCondition: '',
          batteryCondition: '',
          batteryConditionDetails: '',
        },
        tireData: {
          tireCondition: '',
        },
        engineData: {
          engineCondition: '',
          engineConditionDetails: '',
        },
        suspensionData: {
          shockAbsorberCondition: '',
        },
        bodyData: {
          bodyCondition: '',
          bodyConditionDetails: '',
        },
        summaryData: {
          overallCondition: '',
          overallConditionDetails: '',
        },
        drivers: ['เอ', 'บี', 'ซี', 'ช'],
        vehicles: [
          { id: 1, name: 'รถ 4 ล้อ กง 777', type: 'รถ 4', plate: 'กง 777' },
          { id: 2, name: 'รถ 6 ล้อ ค่ำ 123', type: 'รถ 6', plate: 'ค่ำ 123' },
        ],
      };
    },
    computed: {
      filteredItems () {
        return this.items.filter(item =>
          item.driverName.toLowerCase().includes(this.searchText.toLowerCase())
        );
      },
    },
    methods: {
      openDialog () {
        this.currentStep = 0;
        this.resetForm();
        this.dialog = true;
      },
      closeDialog () {
        this.dialog = false;
        this.resetForm();
      },
      resetForm () {
        this.planData = {
          id: null,
          startPoint: '',
          endPoint: '',
          driverName: '',
          vehicleId: null,
          vehicleType: '',
          registrationPlate: '',
          startDate: null,
          endDate: null,
          status: 'ประกาศแผน',
        };
        this.brakeData = {
          tankCondition: '',
          clutchFluidLevel: '',
          pipeCondition: '',
          pipeConditionDetails: '',
          oilLevel: '',
          pressureOperation: '',
          leakOperation: '',
          leakOperationDetails: '',
        };
        this.electricityData = {
          distilledWaterLevel: '',
          headlightCondition: '',
          taillightCondition: '',
          turnSignalCondition: '',
          batteryCondition: '',
          batteryConditionDetails: '',
        };
        this.tireData = { tireCondition: '' };
        this.engineData = { engineCondition: '', engineConditionDetails: '' };
        this.suspensionData = { shockAbsorberCondition: '' };
        this.bodyData = { bodyCondition: '', bodyConditionDetails: '' };
        this.summaryData = { overallCondition: '', overallConditionDetails: '' };
      },
      updateVehicleDetails (vehicleId) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
          this.planData.vehicleType = vehicle.type;
          this.planData.registrationPlate = vehicle.plate;
        }
      },
      nextStep () {
        if (this.currentStep < 10) {
          this.currentStep++;
        } else {
          this.savePlan();
        }
      },
      prevStep () {
        if (this.currentStep > 0) {
          this.currentStep--;
        }
      },
      getStatusColor (status) {
        switch (status) {
          case 'ประกาศแผน':
            return 'success';
          case 'รอตรวจสอบ':
            return 'primary';
          case 'ส่งกลับเพื่อแก้ไข':
            return 'secondary';
          case 'ยกเลิกแผน':
            return 'red';
          default:
            return 'grey';
        }
      },
      getStepColor (index) {
        if (index < this.currentStep) {
          return { color: 'green', textColor: 'green' };
        }
        if (index === this.currentStep) {
          return { color: 'primary', textColor: '#005eb8' };
        }
        return { color: 'grey', textColor: 'grey' };
      },
      savePlan () {
        if (
          this.planData.startPoint &&
          this.planData.endPoint &&
          this.planData.driverName &&
          this.planData.vehicleId &&
          this.planData.startDate &&
          this.planData.endDate &&
          this.brakeData.tankCondition &&
          this.brakeData.clutchFluidLevel &&
          this.brakeData.pipeCondition &&
          this.brakeData.oilLevel &&
          this.brakeData.pressureOperation &&
          this.brakeData.leakOperation &&
          this.electricityData.distilledWaterLevel &&
          this.electricityData.headlightCondition &&
          this.electricityData.taillightCondition &&
          this.electricityData.turnSignalCondition &&
          this.electricityData.batteryCondition &&
          this.tireData.tireCondition &&
          this.engineData.engineCondition &&
          this.suspensionData.shockAbsorberCondition &&
          this.bodyData.bodyCondition &&
          this.summaryData.overallCondition
        ) {
          const newPlan = {
            id: this.planData.id || this.items.length + 1,
            index: this.items.length + 1,
            driverName: this.planData.driverName,
            vehicleInfo: `${this.planData.vehicleType} ${this.planData.registrationPlate}`,
            dateRange: `เริ่ม: ${this.formatDate(
              this.planData.startDate
            )} - สิ้นสุด: ${this.formatDate(this.planData.endDate)}`,
            pallets: '0/0',
            status: this.planData.status,
          };
          if (!this.planData.id) {
            this.items.push(newPlan);
          } else {
            const index = this.items.findIndex(i => i.id === this.planData.id);
            if (index !== -1) {
              this.items[index] = newPlan;
            }
          }
          this.dialog = false;
          this.resetForm();
        }
      },
      cancelPlan (item) {
        if (confirm(`คุณแน่ใจหรือไม่ที่จะยกเลิกแผนของ ${item.driverName}?`)) {
          const index = this.items.findIndex(i => i.id === item.id);
          if (index !== -1) {
            this.items[index].status = 'ยกเลิกแผน';
          }
        }
      },
      formatDate (date) {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${d.getFullYear() + 543}`;
      },
    },
  };
</script>

<style scoped>
.rounded-md {
  border-radius: 8px;
}
</style>
