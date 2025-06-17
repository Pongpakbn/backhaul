<template>
  <v-container>
    <v-card class="mb-2 pa-0" flat>
      <v-card-title class="ma-2 d-flex   justify-space-between align-center ">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" @click="$router.push('/user/tracking')" />
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
              size="small"
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
                size="small"
              >
                <div class="d-flex flex-column flex-md-row mb-4">
                  <h3 class="me-md-4 mb-2 mb-md-0 timeline-date">{{ item.date }}</h3>
                  <div>
                    <strong class="d-block mb-1">{{ item.status }}</strong>
                    <span class="d-block mb-2">{{ item.description }}</span>
                    <p class=" mb-1">{{ item.receive }}</p>
                    <div class="d-flex flex-wrap align-center">
                      <v-btn
                        v-if="item.status === 'ถึงต้นทาง' || item.status === 'ลงสินค้าสำเร็จ'"
                        class=""
                        color="black"
                        density="comfortable"
                        rounded="lg"
                        :text="item.status === 'ถึงต้นทาง' ? 'ดูรูปสินค้า' : 'ดูหลักฐานการจัดส่ง'"
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
    <v-card class="mt-4" flat>
      <v-card-title>
        <p>ข้อมูลรถ</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="text">
          <v-col cols="12" md="2">
            <v-row>
              <v-col cols="12">
                <v-card border="thin" class="d-flex align-center justify-center" variant="outlined">
                  <img
                    alt="รถ"
                    height="120px"
                    src="@/assets/img/assd.png"
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12">
                <span class="blur">ประเภทรถ : </span><span>รถ 4 ล้อ</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">คนขับ : </span><span>พงศ์ศักดิ์</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">เบอร์โทรศัพท์ : </span><span>099-134-4312</span>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="5  ">
            <v-row>
              <v-col cols="12">
                <span class="blur">ป้ายทะเบียน : </span><span>กศ1111</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">ผู้ให้บริการ : </span><span>Triple S</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-4" flat>
      <v-card-title>
        <p>ข้อมูลสินค้า</p>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="text">
          <v-col cols="12" md="2">
            <v-row>
              <v-col cols="12">
                <v-card border="thin" class="d-flex align-center justify-center" variant="outlined">
                  <img
                    alt="รถ"
                    height="120px"
                    src="@/assets/img/box.svg"
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12">
                <span class="blur">ประเภทสินค้า : </span><span>เครื่องใช้ไฟฟ้า</span>
              </v-col>
              <v-col cols="12">
                <span class="blur">น้ำหนัก : </span><span>8 kg. </span>
              </v-col>
              <v-col cols="12">
                <span class="blur">มูลค่าสินค้า : </span><span>800 บาท</span>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="5">
            <v-row>
              <v-col cols="12">
                <span class="blur">รวมสินค้า : </span><span>800 บาท </span>
              </v-col>
              <v-col cols="12">
                <span class="blur">ค่าจัดส่ง : </span><span> 1,287.00 บาท </span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-text class="d-flex justify-end">
        <h2>รวม : 1,287.00 บาท </h2>
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
            status: 'ถึงต้นทาง',
            // icon: 'mdi-truck',
            color: 'primary',
          },
          {
            time: '12 เม.ย. 68 - 13:00 น.',
            status: 'อยู่ระหว่างการจัดส่ง',
            // icon: 'mdi-package-variant-closed',
            color: 'info',
          },
          {
            time: '12 เม.ย. 68 - 16:00 น.',
            status: 'ถึงปลายทาง',
            // icon: 'mdi-map-marker-radius',
            color: 'warning',
          },
          {
            time: '12 เม.ย. 68 - 17:30 น.',
            status: 'ลงสินค้าสำเร็จ',
            // icon: 'mdi-check-circle',
            color: 'success',
          },
        ],
        timelineItems: [
          {
            date: '2025-02-20 09:00',
            status: 'ถึงต้นทาง',
            description: 'สินค้าได้รับการนำขึ้นรถเรียบร้อยแล้ว',
            color: 'grey',
            receive: 'Max',
          },
          {
            date: '	2025-02-20 14:00',
            status: 'อยู่ระหว่างการจัดส่ง',
            description: 'สินค้าอยู่ระหว่างการจัดส่ง',
            color: 'grey',
          },
          {
            date: '2025-02-21 16:00',
            status: 'ถึงปลายทาง',
            description: 'สินค้ามาถึงจุดหมายปลายทางแล้ว',
            color: 'grey',
          },
          {
            date: '2025-02-21 20:00',
            status: 'ลงสินค้าสำเร็จ',
            description: 'ผู้รับ: สมชาย ใจดี ',
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
