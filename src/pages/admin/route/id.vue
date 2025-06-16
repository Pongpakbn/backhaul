<template>
  <v-container>
    <!-- Back Button Card -->
    <v-card flat>
      <v-card-title>
        <v-btn
          aria-label="กลับไปหน้าการจัดการเส้นทาง"
          prepend-icon="mdi-chevron-left"
          text="ย้อนกลับ"
          variant="text"
          @click="$router.push('/admin/route')"
        />
      </v-card-title>
    </v-card>

    <!-- Announcement Date Card -->
    <v-card class="mt-2" flat>
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" sm="4">
            <h3>วันที่ประกาศแผน: {{ formattedCreateDate }}</h3>
          </v-col>

          <v-col cols="12" sm="4">
            <h3>
              วันหมดอายุของแผน:
              <span v-if="expireDate">{{ formatDate(expireDate) }}</span>
              <span v-else class="text-grey">ยังไม่กำหนด</span>
            </h3>
          </v-col>

          <v-col class="d-flex justify-end flex-column" cols="12" sm="4">
            <v-date-input
              v-model="date"
              hide-details
              label="เลือกช่วงวันที่"
              variant="outlined"
              @update:model-value="onDateChange"
            />
            <div class="d-flex justify-end">
              <v-btn
                v-if="date && !dateSaved"
                class="mt-2"
                color="primary"
                @click="saveDate"
              >
                บันทึก
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-2" flat title="ข้อมูลแผนการเดินรถ">
      <v-card-text>
        <v-row align="center">
          <v-col cols="6">
            <p>ชื่อคนขับรถ</p>
            <p>นายแกรป ไดร์เวอร์ </p>
          </v-col>
          <v-col cols="6">
            <p>รถ</p>
            <p>รถ 4 ล้อ (ตู้ทึบ)</p>
          </v-col>
          <v-col cols="6">
            <p>จุดเริ่มต้น</p>
            <p>สุราษฎร์ธานี</p>
          </v-col>
          <v-col cols="6">
            <p>จุดสิ้นสุด</p>
            <p>สมุทรสงคราม</p>
          </v-col>
          <v-col cols="6">
            <p>วันที่ออกเดินทาง</p>
            <p>27/6/2568 </p>
          </v-col>
          <v-col cols="6">
            <p>วันที่สิ้นสุดการเดินทาง</p>
            <p>30/6/2568</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-2" flat>
      <v-card-text>
        <v-row dense>
          <h3>1. ตรวจระบบเบรก (B = BRAKE)</h3>
          <v-col cols="12">
            <p>(ก) ระดับน้ำมันเบรก</p>
            <v-radio-group v-model="inspection.brake.tankCondition" color="green" inline>
              <v-radio label="สูงไป" value="สูงไป" />
              <v-radio label="ปกติ" value="ปกติ" />
              <v-radio label="ต่ำไป" value="ต่ำไป" />
              <v-radio checked label="สภาพใช้ได้" value="สภาพใช้ได้" />
              <v-radio label="ควรเปลี่ยน" value="ควรเปลี่ยน" />
              <v-radio label="DOT 3" value="DOT 3" />
              <v-radio label="DOT 4" value="DOT 4" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ข) ระดับน้ำมันคลัตช์</p>
            <v-radio-group v-model="inspection.brake.clutchFluidLevel" color="green" inline>
              <v-radio label="สูงไป" value="สูงไป" />
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="ต่ำไป" value="ต่ำไป" />
              <v-radio label="สภาพใช้ได้" value="สภาพใช้ได้" />
              <v-radio label="ควรเปลี่ยน" value="ควรเปลี่ยน" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ค) รอยรั่วซึมตามจุดต่างๆ</p>
            <v-radio-group v-model="inspection.brake.pipeCondition" color="green" inline>
              <v-radio checked label="ไม่มี" value="ไม่มี" />
              <v-radio label="มีรอยรั่ว: ระบุ" value="มีรอยรั่ว" />
              <v-text-field
                v-model="inspection.brake.pipeConditionDetails"
                class="mx-4"
                density="comfortable"
                :disabled="inspection.brake.pipeCondition !== 'มีรอยรั่ว'"
                max-width="368"
                placeholder="ระบุรายละเอียด"
                rounded="lg"
                variant="underlined"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ง) ถังลม/การเครนที่ทิ้ง</p>
            <v-radio-group v-model="inspection.brake.oilLevel" color="green" inline>
              <v-radio label="รั่ว" value="รั่ว" />
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="ทำการซ่อมแซม" value="ทำการซ่อมแซม" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(จ) สายลม/จุดเชื่อมต่อ</p>
            <v-radio-group v-model="inspection.brake.pressureOperation" color="green" inline>
              <v-radio label="รั่ว" value="รั่ว" />
              <v-radio checked label="ปกติ" value="ปกติ" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ฉ) เบรกมือ/เบรกจอด</p>
            <v-radio-group v-model="inspection.brake.leakOperation" color="green" inline>
              <v-radio label="เสียงดัง" value="เสียงดัง" />
              <v-text-field
                v-model="inspection.brake.leakOperationDetails"
                class="mx-1"
                density="comfortable"
                :disabled="inspection.brake.leakOperation !== 'เสียงดัง'"
                max-width="200"
                placeholder="ระบุรายละเอียด"
                rounded="lg"
                variant="underlined"
              />
              <v-radio label="คลิ๊ก" value="คลิ๊ก" />
              <v-radio checked label="ใช้ได้" value="ใช้ได้" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row dense>
          <h3>2. ตรวจระบบไฟฟ้า (E = ELECTRICITY)</h3>
          <v-col cols="12">
            <p>(ก) ระดับน้ำกลั่น</p>
            <v-radio-group v-model="inspection.electric.tankCondition" color="green" inline>
              <v-radio label="สูงไป" value="สูงไป" />
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="ต่ำไป" value="ต่ำไป" />
              <v-radio label="ควรเติม" value="ควรเติม" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ข) ขั้วแบตเตอรี่</p>
            <v-radio-group v-model="inspection.electric.clutchFluidLevel" color="green" inline>
              <v-radio checked label="แน่นและมีฉนวนหุ้ม" value="แน่นและมีฉนวนหุ้ม" />
              <v-radio label="ไม่แน่น" value="ไม่แน่น" />
              <v-radio label="แน่นและมีฉนวนบางรองรับ" value="แน่นและมีฉนวนบางรองรับ" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ค) สายรัด และแท่นรองแบตเตอรี่</p>
            <v-radio-group v-model="inspection.electric.pipeCondition" color="green" inline>
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="ไม่แน่น" value="ไม่แน่น" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ง) ไฟสูง - ต่ำ / ไฟท้าย / ไฟเลี้ยว / ไฟถอยหลัง / ไฟหัวเก๋ง</p>
            <v-radio-group v-model="inspection.electric.pressureOperation" color="green" inline>
              <v-radio checked label="ติดครบทุกดวง" value="ติดครบทุกดวง" />
              <v-radio label="ใช้ไม่ได้ ระบุจุด" value="ใช้ไม่ได้" />
              <v-text-field
                v-model="inspection.electric.pressureOperationDetails"
                class="mx-4"
                density="comfortable"
                :disabled="inspection.electric.pressureOperation !== 'ใช้ไม่ได้'"
                max-width="368"
                placeholder="ระบุรายละเอียด"
                rounded="lg"
                variant="underlined"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(จ) แตร / ที่ปัดน้ำฝน / ฉีดน้ำล้างกระจก</p>
            <v-radio-group v-model="inspection.electric.leakOperation" color="green" inline>
              <v-radio checked label="ใช้ได้" value="ใช้ได้" />
              <v-radio label="อื่นๆ" value="อื่นๆ" />
              <v-text-field
                v-model="inspection.electric.leakOperationDetails"
                class="mx-4"
                density="comfortable"
                :disabled="inspection.electric.leakOperation !== 'อื่นๆ'"
                max-width="368"
                placeholder="ระบุรายละเอียด"
                rounded="lg"
                variant="underlined"
              />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row dense>
          <h3>3. ตรวจระบบน้ำหล่อเย็น (W = WATER)</h3>
          <v-col cols="12">
            <p>(ก) ระบบน้ำในหม้อน้ำและถังพักน้ำสำรอง</p>
            <v-radio-group v-model="inspection.water.tankCondition" color="green" inline>
              <v-radio label="สูงไป" value="สูงไป" />
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="ต่ำไป" value="ต่ำไป" />
              <v-radio label="สภาพใช้ได้" value="สภาพใช้ได้" />
              <v-radio label="ควรเปลี่ยนใหม่" value="ควรเปลี่ยนใหม่" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ข) ระดับน้ำเช็ดกระจก</p>
            <v-radio-group v-model="inspection.water.clutchFluidLevel" color="green" inline>
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="พร่องควรเติม" value="พร่องควรเติม" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ค) ฝาปิดหม้อน้ำ</p>
            <v-radio-group v-model="inspection.water.pipeCondition" color="green" inline>
              <v-radio checked label="ใช้ได้" value="ใช้ได้" />
              <v-radio label="ควรเปลี่ยนใหม่" value="ควรเปลี่ยนใหม่" />
              <v-text-field
                v-model="inspection.water.pipeConditionDetails"
                class="mx-4"
                density="comfortable"
                :disabled="inspection.water.pipeCondition !== 'ควรเปลี่ยนใหม่'"
                max-width="368"
                placeholder="ความดันสปริงฝาหม้อน้ำ (กก./ซม.)"
                rounded="lg"
                variant="underlined"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ง) สายพานทุกเส้น</p>
            <v-radio-group v-model="inspection.water.pressureOperation" color="green" inline>
              <v-radio label="ตึงไป" value="ตึงไป" />
              <v-radio checked label="พอดี" value="พอดี" />
              <v-radio label="หย่อนไป" value="หย่อนไป" />
              <v-radio label="สภาพดี" value="สภาพดี" />
              <v-radio label="ควรเปลี่ยน" value="ควรเปลี่ยน" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(จ) ท่อยางหม้อน้ำ</p>
            <v-radio-group v-model="inspection.water.leakOperation" color="green" inline>
              <v-radio checked label="ใช้ได้" value="ใช้ได้" />
              <v-radio label="ใช้ไม่ได้" value="ใช้ไม่ได้" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row dense>
          <h3>4. ตรวจลมยางและกระทะล้อ (A = AIR)</h3>
          <v-col cols="12">
            <p>(ก) ขนาดยางที่ใช้ / ความเร็วสูงสุด</p>
            <v-radio-group v-model="inspection.air.tankCondition" color="green" inline>
              <v-radio checked label="ขนาดยางสูงสุด____ปอนด์ตารางนิ้ว  น้ำหนักบรรทุกสูงสุด____กิโลกรัม/เส้น" value="ขนาดยางสูงสุด" />
              <v-text-field
                v-model="inspection.air.tankConditionDetails"
                class="mx-4"
                density="comfortable"
                :disabled="inspection.air.tankCondition !== 'ขนาดยางสูงสุด'"
                max-width="368"
                placeholder="ระบุรายละเอียด"
                rounded="lg"
                value="200 ปอนด์ตารางนิ้ว, 1000 กิโลกรัม/เส้น"
                variant="underlined"
              />
              <v-radio label="____กม./ชม.  วันที่ผลิตยาง______" value="ความเร็วสูงสุด" />
              <v-text-field
                v-model="inspection.air.tankConditionSpeedDetails"
                class="mx-4"
                density="comfortable"
                :disabled="inspection.air.tankCondition !== 'ความเร็วสูงสุด'"
                max-width="368"
                placeholder="ระบุรายละเอียด"
                rounded="lg"
                variant="underlined"
              />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ข) ความลึกของดอกยาง</p>
            <v-radio-group v-model="inspection.air.clutchFluidLevel" color="green" inline>
              <v-radio checked label="มากกว่า 1.6 ม.ม." value="มากกว่า 1.6 ม.ม." />
              <v-radio label="น้อยกว่า 1.6 ม.ม." value="น้อยกว่า 1.6 ม.ม." />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ค) สภาพแก้มยาง</p>
            <v-radio-group v-model="inspection.air.pipeCondition" color="green" inline>
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="ผิดปกติ" value="ผิดปกติ" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ง) ความดันลมยาง</p>
            <v-radio-group v-model="inspection.air.pressureOperation" color="green" inline>
              <v-radio checked label="ถูกต้องตามคู่มือรถ" value="ถูกต้องตามคู่มือรถ" />
              <v-radio label="สูงไป" value="สูงไป" />
              <v-radio label="ต่ำไป" value="ต่ำไป" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(จ) ฝาปิดจุ๊บเติมลม</p>
            <v-radio-group v-model="inspection.air.leakOperation" color="green" inline>
              <v-radio checked label="มีครบ" value="มีครบ" />
              <v-radio label="ไม่มี" value="ไม่มี" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row dense>
          <h3>6. ตรวจระบบน้ำมันหล่อลื่นต่างๆ (O = OILS)</h3>
          <v-col cols="12">
            <p>(ก) ระดับน้ำมันเครื่อง</p>
            <v-radio-group v-model="inspection.oils.tankCondition" color="green" inline>
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="สูงไป" value="สูงไป" />
              <v-radio label="ต่ำไป" value="ต่ำไป" />
              <v-radio label="อยู่สภาพการใช้งาน" value="อยู่สภาพการใช้งาน" />
              <v-radio label="ควรเปลี่ยน" value="ควรเปลี่ยน" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ข) ระดับน้ำมันพวงมาลัยพาวเวอร์</p>
            <v-radio-group v-model="inspection.oils.clutchFluidLevel" color="green" inline>
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="สูงไป" value="สูงไป" />
              <v-radio label="ต่ำไป" value="ต่ำไป" />
              <v-radio label="อยู่สภาพการใช้งาน" value="อยู่สภาพการใช้งาน" />
              <v-radio label="ควรเปลี่ยน" value="ควรเปลี่ยน" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ค) ระดับน้ำมันเกียร์อัตโนมัติ</p>
            <v-radio-group v-model="inspection.oils.pipeCondition" color="green" inline>
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="สูงไป" value="สูงไป" />
              <v-radio label="ต่ำไป" value="ต่ำไป" />
              <v-radio label="อยู่สภาพการใช้งาน" value="อยู่สภาพการใช้งาน" />
              <v-radio label="ควรเปลี่ยน" value="ควรเปลี่ยน" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(ง) น้ำมันไฮดรอลิก (รถที่มีเท่านั้น)</p>
            <v-radio-group v-model="inspection.oils.oilLevel" color="green" inline>
              <v-radio checked label="ปกติ" value="ปกติ" />
              <v-radio label="สูงไป" value="สูงไป" />
              <v-radio label="ต่ำไป" value="ต่ำไป" />
              <v-radio label="อยู่สภาพการใช้งาน" value="อยู่สภาพการใช้งาน" />
              <v-radio label="ควรเปลี่ยน" value="ควรเปลี่ยน" />
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p>(จ) รอยรั่วซึมตามจุดต่างๆ</p>
            <v-radio-group v-model="inspection.oils.leakOperation" color="green" inline>
              <v-radio checked label="ไม่มี" value="ไม่มี" />
              <v-radio label="มีรอยรั่ว" value="มีรอยรั่ว" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row dense>
          <h3>8. ประเมินภาพรวมความพร้อมของรถ (โดยคนขับ)</h3>
          <v-col cols="12">
            <p>จากการตรวจสอบสภาพรถในวันนี้ ท่านให้ความพร้อมของรถใช้งานกี่เปอร์เซ็นต์</p>
            <v-slider
              v-model="inspection.readiness"
              class="align-center"
              color="primary"
              hide-details
              :max="max"
              :min="min"
              step="1"
            >
              <template #append>
                <p v-text="inspection.readiness" />%
              </template>
            </v-slider>
          </v-col>
          <v-col class="d-flex justify-end align-center ga-2" cols="12">
            <v-btn prepend-icon="mdi-close" text="ไม่อนุมัติ" variant="outlined" />
            <v-btn color="primary" prepend-icon="mdi-check" text="อนุมัติ" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { VDateInput } from 'vuetify/labs/VDateInput';

  export default {
    components: {
      VDateInput,
    },
    data () {
      return {
        date: null,
        expireDate: null,
        announcementDate: '2025-06-27',
        dateSaved: false,
        min: 0,
        max: 100,
        inspection: {
          brake: {
            tankCondition: 'สภาพใช้ได้',
            clutchFluidLevel: 'ปกติ',
            pipeCondition: 'ไม่มี',
            pipeConditionDetails: '',
            oilLevel: 'ปกติ',
            pressureOperation: 'ปกติ',
            leakOperation: 'ใช้ได้',
            leakOperationDetails: '',
          },
          electric: {
            tankCondition: 'ปกติ',
            clutchFluidLevel: 'แน่นและมีฉนวนหุ้ม',
            pipeCondition: 'ปกติ',
            pressureOperation: 'ติดครบทุกดวง',
            pressureOperationDetails: '',
            leakOperation: 'ใช้ได้',
            leakOperationDetails: '',
          },
          water: {
            tankCondition: 'ปกติ',
            clutchFluidLevel: 'ปกติ',
            pipeCondition: 'ใช้ได้',
            pipeConditionDetails: '',
            pressureOperation: 'พอดี',
            leakOperation: 'ใช้ได้',
          },
          air: {
            tankCondition: 'ขนาดยางสูงสุด',
            tankConditionDetails: '200 ปอนด์ตารางนิ้ว, 1000 กิโลกรัม/เส้น',
            tankConditionSpeedDetails: '',
            clutchFluidLevel: 'มากกว่า 1.6 ม.ม.',
            pipeCondition: 'ปกติ',
            pressureOperation: 'ถูกต้องตามคู่มือรถ',
            leakOperation: 'มีครบ',
          },
          oils: {
            tankCondition: 'ปกติ',
            clutchFluidLevel: 'ปกติ',
            pipeCondition: 'ปกติ',
            oilLevel: 'ปกติ',
            leakOperation: 'ไม่มี',
          },
          readiness: 80, // Default readiness percentage
        },
      };
    },
    computed: {
      formattedCreateDate () {
        return this.formatDate(new Date(this.announcementDate));
      },
    },
    methods: {
      formatDate (d) {
        if (!d) return '';
        const date = new Date(d);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
      saveDate () {
        if (Array.isArray(this.date)) {
          this.expireDate = this.date[1];
        } else {
          this.expireDate = this.date;
        }
        this.dateSaved = true;
        console.log('บันทึกวันหมดอายุ:', this.expireDate);
      },
      onDateChange () {
        this.dateSaved = false; // รีเซ็ตทุกครั้งที่เลือกวันที่ใหม่
      },
    },
  };
</script>
