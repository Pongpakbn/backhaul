<template>
  <v-container>
    <v-card class="mb-2 pa-0" flat>
      <v-card-title class="ma-2 d-flex   justify-space-between align-center ">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" />
        <div class="d-flex align-center mt-2 mt-md-0">
          <p class="me-2 text-primary">#BH4334513</p>
          <!-- <v-chip color="success" label text="ขนส่งสำเร็จ" variant="outlined" /> -->
        </div>
      </v-card-title>
    </v-card>

    <!-- สถานะการจัดส่ง -->
    <v-card flat>
      <v-card-title>
        <p>สถานะการจัดส่ง</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <div class="timeline-wrapper">
          <v-timeline
            direction="horizontal"
            dot-color="primary"
            side="end"
            truncate-line="both"
          >
            <v-timeline-item
              v-for="(item, index) in deliveryTimeline"
              :key="index"
              :color="item.color"
              :icon="item.icon"
            >
              <div class="text-center">
                <div class="font-weight-medium mb-1">{{ item.status }}</div>
                <div class="text-caption text-grey">{{ item.time }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-card-text>
    </v-card>

    <!-- แผนที่และตำแหน่งล่าสุด -->
    <v-row class="fill-height mt-2">
      <v-col class="d-flex flex-column" cols="12" md="6">
        <v-card class="fill-height d-flex flex-column" flat>
          <v-card-title>
            <p>ตำแหน่งบนแผนที่</p>
          </v-card-title>
          <v-divider />
          <v-card-text class="overflow-auto">
            <RouteMap />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="d-flex flex-column" cols="12" md="6">
        <v-card class="fill-height d-flex flex-column" flat>
          <v-card-title>
            <p>ตำแหน่งล่าสุด</p>
          </v-card-title>
          <v-divider />
          <v-card-text class="flex-grow-1 overflow-auto">
            <v-timeline align="start" density="compact" side="end" truncate-line="both">
              <v-timeline-item
                v-for="(item, index) in timelineItems"
                :key="index"
                :color="item.color"
                small
              >
                <div class="d-flex flex-column flex-md-row mb-4">
                  <h3 class="me-md-4 mb-2 mb-md-0 timeline-date">{{ item.date }}</h3>
                  <div>
                    <strong class="d-block mb-1">{{ item.status }}</strong>
                    <span class="d-block mb-2">{{ item.description }}</span>
                    <div class="d-flex flex-wrap align-center">
                      <p class="me-2 mb-1">{{ item.receive }}</p>
                      <v-btn
                        v-if="item.status === 'รถออกเดินทาง'"
                        class="mt-1"
                        color="black"
                        density="compact"
                        rounded="lg"
                        style="min-width: 180px; white-space: normal;"
                        text="หลักฐานการจัดส่งสินค้า"
                        @click="dialog_img = true"
                      />
                    </div>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- ข้อมูลรถ -->
    <v-card class="mt-2" flat>
      <v-card-title>
        <p>ข้อมูลรถ</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="text">
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <span class="blur">ประเภทรถ : </span><span>รถ 4 ล้อ</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">คนขับ : </span><span>พงศ์ศักดิ์</span>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <span class="blur">ป้ายทะเบียน : </span><span>กศ1111</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">เบอร์โทรศัพท์ : </span><span>099-134-4312</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Dialog รูปภาพ -->
    <v-dialog v-model="dialog_img" width="1200">
      <v-card>
        <v-img
          aspect-ratio="16/9"
          src="https://i2.wp.com/static.wixstatic.com/media/48ce99_250322292d784dc19b2221057acb01b7~mv2.jpg/v1/fill/w_566,h_303,al_c,lg_1,q_90/48ce99_250322292d784dc19b2221057acb01b7~mv2.webp?w=1200&ssl=1"
        />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import RouteMap from '@/components/Track.vue';

  export default {
    components: {
      RouteMap,
    },
    data () {
      return {
        dialog_img: false,
        deliveryTimeline: [
          {
            time: '12 เม.ย. 68 - 09:00 น.',
            status: 'เข้ารับพัสดุแล้ว',
            icon: 'mdi-truck',
            color: 'primary',
          },
          {
            time: '12 เม.ย. 68 - 13:00 น.',
            status: 'กำลังจัดส่ง',
            icon: 'mdi-package-variant-closed',
            color: 'info',
          },
          {
            time: '12 เม.ย. 68 - 16:00 น.',
            status: 'ใกล้ถึงจุดหมาย',
            icon: 'mdi-map-marker-radius',
            color: 'warning',
          },
          {
            time: '12 เม.ย. 68 - 17:30 น.',
            status: 'จัดส่งสำเร็จ',
            icon: 'mdi-check-circle',
            color: 'success',
          },
        ],
        timelineItems: [
          {
            date: '2025-02-22 09:00',
            status: 'รถออกเดินทาง',
            description: 'รถออกจากต้นทางเรียบร้อย',
            color: 'grey',
            receive: 'Max',
          },
          {
            date: '2025-02-21 14:00',
            status: 'ถึงสถานที่รับสินค้า',
            description: 'รถถึงสถานที่รับสินค้าสำเร็จ',
            color: 'grey',
          },
          {
            date: '2025-02-20 09:00',
            status: 'รถพร้อมใช้งาน',
            description: 'รถพร้อมให้บริการเรียบร้อย',
            color: 'grey',
          },
          {
            date: '2025-02-20 11:00',
            status: 'ออกใบแจ้งหนี้',
            description: 'ออกใบแจ้งหนี้สำเร็จ',
            color: 'grey',
          },
        ],
      };
    },
  };
</script>

<style scoped>
.text {
  font-size: 18px;
}
.blur {
  opacity: 0.4;
}
.timeline-date {
  min-width: 120px;
}

@media (max-width: 600px) {
  .text {
    font-size: 16px;
  }
  .timeline-date {
    min-width: 100px;
    margin-right: 8px;
  }
}

.timeline-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
}

.timeline-wrapper > * {
  min-width: max-content;
}
</style>
