<template>
  <v-container>
    <v-card class="mb-2 pl-0" flat>
      <v-card-title class="ma-2 pl-0 d-flex justify-space-between">
        <v-btn prepend-icon="mdi-chevron-left" text="ย้อนกลับ" variant="text" @click="$router.push('/partner/tracking')" />
      </v-card-title>
    </v-card>
    <v-card class="mt-2" flat>
      <v-card-title class="ma-2 d-flex justify-space-between">
        <p>แผนที่เส้นทาง</p>
        <h4 label style="color: #005eb8;">สงขลา - สมุทรสาคร</h4>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <Track />
      </v-card-text>
    </v-card>


    <v-row class="mt-2">
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title>
            คนขับ/รถ
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-card class="border-thin rounded-md" variant="outlined">
              <v-card-text
                class="d-flex justify-start align-center"
                :class="{
                  'flex-column align-center text-center': $vuetify.display.smAndDown,
                  'justify-start align-center': $vuetify.display.mdAndUp
                }"
              >
                <v-avatar class="mb-4" :class="{ 'me-6': $vuetify.display.mdAndUp }" size="60">
                  <v-img
                    alt="Profile Picture"
                    src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
                  />
                </v-avatar>
                <v-row class="w-100">
                  <v-col cols="12" md="6">
                    <p class="mb-0">พงศ์ภัค บุญนาม</p>
                    <p class="mb-0">099-712-5161</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="mb-0">รถ 4 ล้อ(ตู้ทึบปกติ)</p>
                    <p class="mb-0">กง 7777</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <!-- <v-card class="border-thin rounded-md" variant="outlined">
              <v-card-text class="d-flex justify-start align-center">
                <v-avatar class="me-6" size="60">
                  <v-img alt="Profile Picture" src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" />
                </v-avatar>
                <v-row>
                  <v-col cols="12" md="6">
                    <p>พงศ์ภัค บุญนาม</p>
                    <p>099-712-5161</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p>รถ 4 ล้อ(ตู้ทึบปกติ)</p>
                    <p>กง 7777</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card> -->
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card flat>
          <v-card-title>
            สถานะงาน : BH3ca75
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-timeline align="start" density="compact" side="end" truncate-line="both">
              <v-timeline-item
                v-for="(item, index) in timelineItems"
                :key="index"
                :color="item.color"
                size="small"
                width="100%"
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
  import Track from '@/components/Track.vue'
  import productImage from '@/assets/img/Product.png'
  export default {
    component:{
      Track,
    },
    data () {
      return {
        dialog_img:false,
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
        products: [
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
        ],
        locations: [
          {
            type: 'pickup',
            label: 'จุดรับสินค้า',
            address: '123 ถนนสุขุมวิท เขตคลองเตย กรุงเทพฯ 10110',
            date: 'รับสินค้า : 5 มกราคม 2568 10:00 น. - 12:00 น. ',
          },
          {
            type: 'dropoff',
            label: 'จุดส่งสินค้า',
            address: '456 ถนนพระราม 2 เขตบางขุนเทียน กรุงเทพฯ 10150',
            date: 'รับสินค้า : 5 มกราคม 2568 10:00 น. - 12:00 น. ',
          },
          {
            type: 'dropoff',
            label: 'จุดส่งสินค้า 2',
            address: '789 ถนนแจ้งวัฒนะ เขตหลักสี่ กรุงเทพฯ 10210',
            date: 'รับสินค้า : 5 มกราคม 2568 10:00 น. - 12:00 น. ',
          },
        ],
      };
    },
    methods: {
      getTimelineColor (type) {
        if (type === 'pickup') return 'primary';
        if (type === 'dropoff') return 'secondary';
        return 'grey';
      },
    },
  };
</script>
<style>
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
.blur{
  opacity: 0.5;
}
.text{
  font-size: 16px;
}
</style>
