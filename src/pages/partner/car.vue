<template>
  <v-container>
    <v-row class="align-center mb-4">
      <!-- ฝั่งซ้ายทั้งหมด -->
      <v-col class="d-flex align-center" cols="12" md="6">
        <div class="me-4">
          <h2 class="mb-1">รถในระบบ</h2>
          <p class="opacity-50 mb-0">{{ filteredItems.length }} รายการ</p>
        </div>

        <v-text-field
          v-model="search"
          density="compact"
          hide-details
          max-width="368"
          placeholder="ค้นหาจากชื่อ"
          prepend-inner-icon="mdi-magnify"
          rounded="md"
          single-line
          style="background-color: white;"
          variant="outlined"
        />
      </v-col>

      <!-- อีกฝั่ง (ปุ่มเพิ่มรถ) -->
      <v-col cols="12" md="6">
        <div class="d-flex justify-end align-center">
          <v-btn
            color="primary"
            prepend-icon="mdi-truck"
            size="large"
            text="เพิ่มรถในระบบ"
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
                v-if="item.status === 'ส่งกลับเพื่อแก้ไข'"
                class="me-2"
                flat
                prepend-icon="mdi-update"
                style="background-color: #f2a900; color: white;"
                text="อัพเดทข้อมูล"
                @click="updateVehicle(item)"
              />
            </v-col>
            <v-col class="text-start">
              <v-btn
                class="text-white"
                color="red"
                flat
                prepend-icon="mdi-delete"
                text="ลบ"
                @click="deleteVehicle(item)"
              />
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="1000">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          {{ currentStep < 4 ? 'เพิ่มรถ' : 'ข้อมูลเพิ่มเติม' }}
          <v-btn icon variant="text" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />

        <v-card-text class="pb-0">
          <!-- Timeline Steps (hidden when currentStep >= 4) -->
          <v-timeline
            v-if="currentStep < 4"
            align="center"
            class="mb-8"
            density="comfortable"
            direction="horizontal"
            truncate-line="both"
          >
            <v-timeline-item
              v-for="(step, index) in steps"
              :key="index"
              :dot-color="getStepColor(index).color"
              fill-dot
            >
              <template #icon>
                <v-avatar :color="getStepColor(index).color" size="50">
                  <v-icon v-if="getStepColor(index).color === 'green'" class="text-white">mdi-check</v-icon>
                  <span v-else class="text-white text-h6">{{ index + 1 }}</span>
                </v-avatar>
              </template>
              <strong :style="{ color: getStepColor(index).textColor }">{{ step }}</strong>
            </v-timeline-item>
          </v-timeline>

          <!-- Vehicle Summary Card (shown for currentStep >= 4) -->
          <v-card v-if="currentStep >= 4" border="thin" class="text-center mb-4" variant="outlined">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <h3>ชื่อ-นามสกุล: {{ newVehicle.ownerName }}</h3>
                </v-col>
                <v-col cols="12" md="4">
                  <h3>ประเภท: {{ newVehicle.vehicleType }}</h3>
                </v-col>
                <v-col cols="12" md="4">
                  <h3>ป้ายทะเบียน: {{ newVehicle.registrationPlate }}</h3>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Form Content -->
          <div v-if="currentStep === 0">
            <v-row dense>
              <v-col cols="12" md="6">
                <p>ประเภทรถ</p>
                <v-text-field
                  v-model="newVehicle.vehicleType"
                  density="comfortable"
                  hide-details
                  placeholder="ประเภทรถ"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>ป้ายทะเบียน</p>
                <v-text-field
                  v-model="newVehicle.registrationPlate"
                  density="comfortable"
                  hide-details
                  placeholder="ป้ายทะเบียน"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4">
                <p>ยี่ห้อ</p>
                <v-text-field
                  v-model="newVehicle.brand"
                  density="comfortable"
                  hide-details
                  placeholder="ยี่ห้อ"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4">
                <p>รุ่น</p>
                <v-text-field
                  v-model="newVehicle.model"
                  density="comfortable"
                  hide-details
                  placeholder="รุ่น"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4">
                <p>ปีที่ผลิต</p>
                <v-text-field
                  v-model="newVehicle.manufactureYear"
                  density="comfortable"
                  hide-details
                  placeholder="ปีที่ผลิต"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <p>ขนาดเครื่องยนต์</p>
                <v-text-field
                  v-model="newVehicle.engineSize"
                  density="comfortable"
                  hide-details
                  placeholder="ขนาดเครื่องยนต์"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>ขนาดบรรทุก (หน่วย CBM)</p>
                <v-text-field
                  v-model="newVehicle.cargoCapacity"
                  density="comfortable"
                  hide-details
                  placeholder="ขนาดบรรทุก"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>วันหมดอายุภาษีรถ</p>
                <v-text-field
                  v-model="newVehicle.taxExpiry"
                  density="comfortable"
                  hide-details
                  placeholder="วว/ดด/ปปปป"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>วันหมดอายุพรบ</p>
                <v-text-field
                  v-model="newVehicle.insuranceExpiry"
                  density="comfortable"
                  hide-details
                  placeholder="วว/ดด/ปปปป"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>เรทราคา</p>
                <v-select
                  v-model="newVehicle.rate"
                  density="comfortable"
                  hide-details
                  :items="rates"
                  placeholder="เรทราคา"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </div>

          <div v-else-if="currentStep === 1">
            <v-row dense>
              <v-col cols="12" md="6">
                <p>ชื่อเจ้าของรถ</p>
                <v-text-field
                  v-model="newVehicle.ownerName"
                  density="comfortable"
                  hide-details
                  placeholder="ชื่อเจ้าของรถ"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>เบอร์โทรศัพท์</p>
                <v-text-field
                  v-model="newVehicle.phoneNumber"
                  density="comfortable"
                  hide-details
                  placeholder="เบอร์โทรศัพท์"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <p>ที่อยู่</p>
                <v-textarea
                  v-model="newVehicle.address"
                  auto-grow
                  density="comfortable"
                  hide-details
                  placeholder="ที่อยู่"
                  rounded="lg"
                  rows="3"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <p>แนบเอกสาร</p>
                <v-file-input
                  v-model="newVehicle.documents"
                  density="comfortable"
                  hide-details
                  prepend-icon="mdi-camera"
                  rounded="lg"
                  title="กดเพื่อเลือกรูปภาพ (ขนาดไม่เกิน 20MB)"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </div>

          <div v-else-if="currentStep === 2">
            <v-row dense>
              <v-col cols="12" md="4">
                <p>ประเภทใบขับขี่</p>
                <v-text-field
                  v-model="newVehicle.driverLicenseType"
                  density="comfortable"
                  hide-details
                  placeholder="ประเภทใบขับขี่"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4">
                <p>เลขใบขับขี่</p>
                <v-text-field
                  v-model="newVehicle.driverLicenseNumber"
                  density="comfortable"
                  hide-details
                  placeholder="เลขใบขับขี่"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="4">
                <p>วันหมดอายุ</p>
                <v-text-field
                  v-model="newVehicle.driverLicenseExpiry"
                  density="comfortable"
                  hide-details
                  placeholder="วันหมดอายุ"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </div>

          <div v-else-if="currentStep === 3">
            <p>ข้อมูลการทำประกันภัยขนส่ง</p>
            <v-divider />
            <v-row class="mt-1 mb-1">
              <v-col cols="12" md="6">
                <p>ชื่อบริษัทประกัน</p>
                <v-text-field
                  v-model="newVehicle.insuranceCompany"
                  density="comfortable"
                  hide-details
                  placeholder="ชื่อบริษัทประกัน"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>หมายเลขกรมธรรม์</p>
                <v-text-field
                  v-model="newVehicle.policyNumber"
                  density="comfortable"
                  hide-details
                  placeholder="หมายเลขกรมธรรม์"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>วันเริ่มต้นและสิ้นสุดการประกันภัย</p>
                <v-text-field
                  v-model="newVehicle.insurancePeriod"
                  density="comfortable"
                  hide-details
                  placeholder="วันเริ่มต้นและสิ้นสุดการประกันภัย"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>ความคุ้มครอง</p>
                <v-text-field
                  v-model="newVehicle.coverage"
                  density="comfortable"
                  hide-details
                  placeholder="ความคุ้มครอง"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <p>เงื่อนไขการชดเชย</p>
                <v-text-field
                  v-model="newVehicle.compensationTerms"
                  density="comfortable"
                  hide-details
                  placeholder="เงื่อนไขการชดเชย"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <p>ข้อมูลการประกันสินค้าขณะขนส่ง</p>
            <v-divider />
            <v-row class="mt-1">
              <v-col cols="12" md="6">
                <p>หมายเลขกรมธรรม์สินค้า</p>
                <v-text-field
                  v-model="newVehicle.cargoPolicyNumber"
                  density="comfortable"
                  hide-details
                  placeholder="หมายเลขกรมธรรม์สินค้า"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="6">
                <p>ความคุ้มครองประกันสินค้า</p>
                <v-text-field
                  v-model="newVehicle.cargoCoverage"
                  density="comfortable"
                  hide-details
                  placeholder="ความคุ้มครองประกันสินค้า"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <p>ระยะเวลาในการคุ้มครอง</p>
                <v-text-field
                  v-model="newVehicle.cargoCoveragePeriod"
                  density="comfortable"
                  hide-details
                  placeholder="ระยะเวลาในการคุ้มครอง"
                  rounded="lg"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </div>

          <div v-else-if="currentStep === 4">
            <div class="mt-4">
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

          <div v-else-if="currentStep === 5">
            <div class="mt-4">
              <h3>2. ตรวจระบบไฟฟ้า (E = ELECTRICITY)</h3>
              <v-row dense>
                <v-col cols="12">
                  <p>(ก) ระดับน้ำกลั่น</p>
                  <v-radio-group v-model="electricityData.distilledWaterLevel" inline>
                    <v-radio label="สูงไป" value="สูงไป" />
                    <v-radio label="ปกติ" value="ปกติ" />
                    <v-radio label="ต่ำไป" value="ต่ำไป" />
                    <v-radio label="ควรเติม" value="ควรเติม" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <p>(ข) ระบบไฟหน้า</p>
                  <v-radio-group v-model="electricityData.headlightCondition" inline>
                    <v-radio label="ปกติ" value="ปกติ" />
                    <v-radio label="ชำรุด" value="ชำรุด" />
                    <v-radio label="ต้องซ่อม" value="ต้องซ่อม" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <p>(ค) ระบบไฟท้าย</p>
                  <v-radio-group v-model="electricityData.taillightCondition" inline>
                    <v-radio label="ปกติ" value="ปกติ" />
                    <v-radio label="ชำรุด" value="ชำรุด" />
                    <v-radio label="ต้องซ่อม" value="ต้องซ่อม" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <p>(ง) ระบบไฟเลี้ยว</p>
                  <v-radio-group v-model="electricityData.turnSignalCondition" inline>
                    <v-radio label="ปกติ" value="ปกติ" />
                    <v-radio label="ชำรุด" value="ชำรุด" />
                    <v-radio label="ต้องซ่อม" value="ต้องซ่อม" />
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <p>(จ) แบตเตอรี่</p>
                  <v-radio-group v-model="electricityData.batteryCondition" inline>
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

          <div v-else-if="currentStep === 6">
            <div class="mt-4">
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

          <div v-else-if="currentStep === 7">
            <div class="mt-4">
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

          <div v-else-if="currentStep === 8">
            <div class="mt-4">
              <h3>5. ตรวจสอบระบบกันสะเทือน (SUSPENSION)</h3>
              <v-row dense>
                <v-col cols="12">
                  <p>สภาพโช้คอัพ</p>
                  <v-radio-group v-model="suspensionData.shockAbsorberCondition" inline>
                    <v-radio label="ปกติ" value="ปกติ" />
                    <v-radio label="ชำรุด" value="ชำรุด" />
                    <v-radio label="ต้องเปลี่ยน" value="ต้องเปลี่ยน" />
                  </v-radio-group>
                </v-col>
              </v-row>
            </div>
          </div>

          <div v-else-if="currentStep === 9">
            <div class="mt-4">
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

          <div v-else-if="currentStep === 10">
            <div class="mt-4">
              <h3>7. สรุปผลการตรวจสอบ (SUMMARY)</h3>
              <v-row dense>
                <v-col cols="12">
                  <p>ผลการตรวจสอบโดยรวม</p>
                  <v-radio-group v-model="summaryData.overallCondition" inline>
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
              <span v-if="currentStep >= 4" class="mr-2 text-h6">หน้า {{ currentStep - 3 }} / 7</span>
              <v-btn
                color="primary"
                size="large"
                @click="nextStep"
              >
                {{ currentStep === 10 ? 'ยืนยันและบันทึก' : 'ถัดไป' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        currentStep: 0,
        search: '',
        steps: ['ข้อมูลรถ', 'ข้อมูลเจ้าของรถ', 'ข้อมูลทางกฎหมาย', 'ข้อมูลการทำประกัน'],
        dialog: false,
        headers: [
          { title: '#', value: 'index', sortable: false },
          { title: 'ป้ายทะเบียน', value: 'registrationPlate' },
          { title: 'ประเภทรถ', value: 'vehicleType' },
          { title: 'ยี่ห้อ', value: 'brand' },
          { title: 'สถานะ', value: 'status' },
          { title: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        ],
        items: [
          {
            index: 1,
            registrationPlate: 'กท 1234',
            vehicleType: 'รถ 4 ล้อ',
            brand: 'Isuzu',
            model: 'D-Max',
            manufactureYear: '2020',
            engineSize: '2500cc',
            cargoCapacity: '10 CBM',
            taxExpiry: '15/12/2025',
            insuranceExpiry: '15/12/2025',
            rate: 'เรทราคา 1',
            ownerName: 'สมชาย ใจดี',
            phoneNumber: '0812345678',
            address: '123 หมู่ 4 ต.บางรัก',
            driverLicenseType: 'ใบขับขี่ส่วนบุคคล',
            driverLicenseNumber: '123456789',
            driverLicenseExpiry: '15/06/2026',
            insuranceCompany: 'วิริยะประกันภัย',
            policyNumber: 'POL123456',
            insurancePeriod: '01/01/2025-31/12/2025',
            coverage: '10 ล้านบาท',
            compensationTerms: 'ตามเงื่อนไข',
            cargoPolicyNumber: 'CARGO123',
            cargoCoverage: '5 ล้านบาท',
            cargoCoveragePeriod: '01/01/2025-31/12/2025',
            status: 'รอการอนุมัติ',
          },
          {
            index: 2,
            registrationPlate: 'กท 1234',
            vehicleType: 'รถ 4 ล้อ',
            brand: 'Isuzu',
            model: 'D-Max',
            manufactureYear: '2020',
            engineSize: '2500cc',
            cargoCapacity: '10 CBM',
            taxExpiry: '15/12/2025',
            insuranceExpiry: '15/12/2025',
            rate: 'เรทราคา 1',
            ownerName: 'สมชาย ใจดี',
            phoneNumber: '0812345678',
            address: '123 หมู่ 4 ต.บางรัก',
            driverLicenseType: 'ใบขับขี่ส่วนบุคคล',
            driverLicenseNumber: '123456789',
            driverLicenseExpiry: '15/06/2026',
            insuranceCompany: 'วิริยะประกันภัย',
            policyNumber: 'POL123456',
            insurancePeriod: '01/01/2025-31/12/2025',
            coverage: '10 ล้านบาท',
            compensationTerms: 'ตามเงื่อนไข',
            cargoPolicyNumber: 'CARGO123',
            cargoCoverage: '5 ล้านบาท',
            cargoCoveragePeriod: '01/01/2025-31/12/2025',
            status: 'อนุมัติ',
          },
          {
            index: 3,
            registrationPlate: 'กท 1234',
            vehicleType: 'รถ 4 ล้อ',
            brand: 'Isuzu',
            model: 'D-Max',
            manufactureYear: '2020',
            engineSize: '2500cc',
            cargoCapacity: '10 CBM',
            taxExpiry: '15/12/2025',
            insuranceExpiry: '15/12/2025',
            rate: 'เรทราคา 1',
            ownerName: 'สมชาย ใจดี',
            phoneNumber: '0812345678',
            address: '123 หมู่ 4 ต.บางรัก',
            driverLicenseType: 'ใบขับขี่ส่วนบุคคล',
            driverLicenseNumber: '123456789',
            driverLicenseExpiry: '15/06/2026',
            insuranceCompany: 'วิริยะประกันภัย',
            policyNumber: 'POL123456',
            insurancePeriod: '01/01/2025-31/12/2025',
            coverage: '10 ล้านบาท',
            compensationTerms: 'ตามเงื่อนไข',
            cargoPolicyNumber: 'CARGO123',
            cargoCoverage: '5 ล้านบาท',
            cargoCoveragePeriod: '01/01/2025-31/12/2025',
            status: 'ส่งกลับเพื่อแก้ไข',
          },
        // Other items omitted for brevity
        ],
        newVehicle: {
          index: null,
          vehicleType: '',
          registrationPlate: '',
          brand: '',
          model: '',
          manufactureYear: '',
          engineSize: '',
          cargoCapacity: '',
          taxExpiry: '',
          insuranceExpiry: '',
          rate: null,
          ownerName: '',
          phoneNumber: '',
          address: '',
          documents: null,
          driverLicenseType: '',
          driverLicenseNumber: '',
          driverLicenseExpiry: '',
          insuranceCompany: '',
          policyNumber: '',
          insurancePeriod: '',
          coverage: '',
          compensationTerms: '',
          cargoPolicyNumber: '',
          cargoCoverage: '',
          cargoCoveragePeriod: '',
          status: 'รอการอนุมัติ',
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
        rates: ['เรทราคา 1', 'เรทราคา 2'],
      };
    },
    computed: {
      filteredItems () {
        return this.items.filter(
          item =>
            item.registrationPlate.toLowerCase().includes(this.search.toLowerCase()) ||
            item.vehicleType.toLowerCase().includes(this.search.toLowerCase()) ||
            item.brand.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },
    methods: {
      openDialog () {
        this.currentStep = 0;
        this.resetNewVehicle();
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
        this.dialog = true;
      },
      updateVehicle (item) {
        this.currentStep = 0;
        this.newVehicle = { ...item };
        this.newVehicle.index = item.index;
        this.dialog = true;
      },
      closeDialog () {
        this.dialog = false;
        this.resetNewVehicle();
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
      deleteVehicle (item) {
        if (confirm(`คุณแน่ใจหรือไม่ที่จะลบ ${item.registrationPlate}?`)) {
          this.items = this.items.filter(i => i.index !== item.index);
        }
      },
      nextStep () {
        if (this.currentStep < 10) {
          this.currentStep++;
        } else {
          this.saveAll();
        }
      },
      prevStep () {
        if (this.currentStep > 0) {
          this.currentStep--;
        }
      },
      getStatusColor (status) {
        switch (status) {
          case 'รอการอนุมัติ':
            return 'primary';
          case 'อนุมัติ':
            return 'success';
          case 'ส่งกลับเพื่อแก้ไข':
            return 'secondary';
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
      saveVehicle () {
        if (
          this.newVehicle.vehicleType &&
          this.newVehicle.registrationPlate &&
          this.newVehicle.brand &&
          this.newVehicle.model &&
          this.newVehicle.manufactureYear &&
          this.newVehicle.engineSize &&
          this.newVehicle.cargoCapacity &&
          this.newVehicle.taxExpiry &&
          this.newVehicle.insuranceExpiry &&
          this.newVehicle.rate &&
          this.newVehicle.ownerName &&
          this.newVehicle.phoneNumber &&
          this.newVehicle.address &&
          this.newVehicle.driverLicenseType &&
          this.newVehicle.driverLicenseNumber &&
          this.newVehicle.driverLicenseExpiry &&
          this.newVehicle.insuranceCompany &&
          this.newVehicle.policyNumber &&
          this.newVehicle.insurancePeriod &&
          this.newVehicle.coverage &&
          this.newVehicle.compensationTerms &&
          this.newVehicle.cargoPolicyNumber &&
          this.newVehicle.cargoCoverage &&
          this.newVehicle.cargoCoveragePeriod
        ) {
          if (!this.newVehicle.index) {
            const newIndex = this.items.length + 1;
            this.items.push({ ...this.newVehicle, index: newIndex });
          } else {
            const itemIndex = this.items.findIndex(i => i.index === this.newVehicle.index);
            if (itemIndex !== -1) {
              this.items[itemIndex] = { ...this.newVehicle };
            }
          }
        }
      },
      saveAll () {
        this.saveVehicle();
        if (
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
          this.dialog = false;
          this.resetNewVehicle();
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
        }
      },
      resetNewVehicle () {
        this.newVehicle = {
          index: null,
          vehicleType: '',
          registrationPlate: '',
          brand: '',
          model: '',
          manufactureYear: '',
          engineSize: '',
          cargoCapacity: '',
          taxExpiry: '',
          insuranceExpiry: '',
          rate: null,
          ownerName: '',
          phoneNumber: '',
          address: '',
          documents: null,
          driverLicenseType: '',
          driverLicenseNumber: '',
          driverLicenseExpiry: '',
          insuranceCompany: '',
          policyNumber: '',
          insurancePeriod: '',
          coverage: '',
          compensationTerms: '',
          cargoPolicyNumber: '',
          cargoCoverage: '',
          cargoCoveragePeriod: '',
          status: 'รอการอนุมัติ',
        };
      },
    },
  };
</script>

<style scoped>
.rounded-md {
  border-radius: 8
}
</style>
