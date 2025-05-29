<template>
  <v-container>
    <v-card class="mb-2 pa-0" flat>
      <v-card-title class="ma-2 d-flex justify-space-between">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" />
        <div class="d-flex align-center">
          <p class="me-2" style="color:#005eb8;">#BH4334513</p>
          <v-chip color="success" label text="ขนส่งสำเร็จ" variant="outlined" />
        </div>
      </v-card-title>
      <v-divider />
    </v-card>
    <v-card>
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

    <v-card class="mt-2">
      <v-card-title>
        <p>สถานะการจัดส่ง</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <!-- ต้นทาง -->
          <v-col cols="12" md="6">
            <v-card flat>
              <v-card-title>ต้นทาง</v-card-title>
              <v-card-text>
                <h3>มานะ ดีใจ</h3>
                <p>
                  123/45 ซอยสุขุมวิท 50 แขวงพระโขนง เขตคลองเตย กรุงเทพมหานคร 10110
                  089-123-4567
                </p>
              </v-card-text>
            </v-card>

            <v-card flat>
              <v-card-title>ปลายทาง</v-card-title>
              <v-card-text>
                <h3>มานะ ดีใจ</h3>
                <p>
                  123/45 ซอยสุขุมวิท 50 แขวงพระโขนง เขตคลองเตย กรุงเทพมหานคร 10110
                  089-123-4567
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-divider class="d-none d-md-flex" vertical />
          <v-divider class="d-flex d-md-none" />
          <!-- ไทม์ไลน์ -->
          <v-col cols="12" md="6">
            <v-card flat>
              <v-card-title class="text-h6">สถานะ</v-card-title>
              <v-card-text>
                <v-timeline align="start" density="compact" side="end" truncate-line="both">
                  <v-timeline-item
                    v-for="(item, index) in timelineItems"
                    :key="index"
                    :color="item.color"
                    small
                  >
                    <div class="d-flex flex-column flex-md-row mb-4">
                      <h3 class="me-4 mb-2 mb-md-0" style="min-width: 120px;">{{ item.date }}</h3>
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
      </v-card-text>
    </v-card>

    <v-card class="mt-2">
      <v-card-title>
        <p>สถานะการจัดส่ง</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="text">
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <p>ทำการจองเมื่อ :  20/02/2025, 11:00</p>
              </v-col>
              <v-col cols="12">
                <p>สถานะ :  สำเร็จ</p>
              </v-col>
              <v-col cols="12">
                <p>สถานะการชำระเงิน : ชำระเงินแล้ว</p>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <p>ประเภทการจอง : เหมาคัน</p>
              </v-col>
              <v-col cols="12">
                <p>ช่องทางการชำระเงิน : โอนเงินผ่านบัญชีธนาคาร</p>
              </v-col>
              <v-col cols="12">
                <p>จัดส่งสำเร็จเมื่อ :  22/02/2025, 15:00</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>

  <v-dialog v-model="dialog_img" width="1200">
    <v-card>
      <v-img src="https://i2.wp.com/static.wixstatic.com/media/48ce99_250322292d784dc19b2221057acb01b7~mv2.jpg/v1/fill/w_566,h_303,al_c,lg_1,q_90/48ce99_250322292d784dc19b2221057acb01b7~mv2.webp?w=1200&ssl=1" />
    </v-card>
  </v-dialog>
</template>
<script>
  export default{
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
            receive:'Max',
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
  }
</script>
<style scoped>
.text{
  font-size: 18px;
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
