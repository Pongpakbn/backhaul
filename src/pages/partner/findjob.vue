<template>
  <v-container>
    <v-row class="align-center mb-2">
      <v-col class="d-flex align-center" cols="12">
        <div class="me-4">
          <h2 class="mb-1">ค้นหางาน</h2>
          <p class="opacity-50 mb-0">ค้นหาและรับงานได้ทันที</p>
        </div>
      </v-col>
    </v-row>
    <v-card flat rounded="lg">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <p>ต้นทาง</p>
            <v-select
              density="comfortable"
              hide-details
              placeholder="จังหวัดต้นทาง"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>ปลายทาง</p>
            <v-select
              density="comfortable"
              hide-details
              placeholder="ปลายทาง"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="4">
            <p>ระบุประเภทรถ</p>
            <v-select
              density="comfortable"
              hide-details
              placeholder="ระบุประเภทรถ"
              rounded="lg"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12">
            <v-btn block color="primary" size="large" text="ค้นหางาน" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card
      v-for="(intem, index) in 3"
      :key="index"
      class="mt-4"
      flat
      rounded="lg"
    >
      <v-card-title>
        หมายเลขงาน : BH3ca75
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="6">
                <p>งานเริ่ม</p>
              </v-col>
              <v-col cols="6">
                <p>6 มีนาคม 2568 10:00 น.</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>ประเภทรถบรรทุก</p>
              </v-col>
              <v-col cols="6">
                <p>รถ 4 ล้อ(ตู้ทึบปกติ)</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>ประเภทการจอง</p>
              </v-col>
              <v-col cols="6">
                <p>เหมาคัน</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>ประเภทสินค้า</p>
              </v-col>
              <v-col cols="6">
                <p>สินค้าทั่วไป</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>รายละเอียดสินค้า</p>
              </v-col>
              <v-col cols="6">
                <p style="text-decoration: underline;color: #000080;cursor: pointer;" @click="dialog_product =true">ดูรายละเอียดสินค้า</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>แผนการเดินรถ</p>
              </v-col>
              <v-col cols="6">
                <p>ภูเก็ต ->กรุงเทพ</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>ระยะทาง</p>
              </v-col>
              <v-col cols="6">
                <p>892 กิโลเมตร</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p>จุดรับส่งสินค้า</p>
              </v-col>
              <v-col cols="6">
                <v-btn color="primary" density="compact" text="รายละเอียดจุดรับ-ส่ง" @click="openImgae()" />
              </v-col>
            </v-row>
          </v-col>
          <!-- right -->
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <p>รายละเอียดเพิ่มเติม</p>
                <p>ต้องการรถกระบะพื้นเรียบ หรือ รถกระบะตอนเดียว (ที่ไม่มีแคป) ขอรถที่มีสายรัดสินค้า และ ขอคนขับรถที่มีความระมัดระวังในการขับขี่ ไม่ขับเร็ว เนื่องจากเคยมีคนขับทำสินค้าล่วงจากพาเลท ทำให้ของเสียหาย</p>
              </v-col>
              <v-col cols="12">
                <v-card
                  class="rounded-lg border-dashed"
                  color="primary"
                  variant="outlined"
                >
                  <v-card-text class="d-flex justify-space-between">
                    <h3>ข้อเสนอที่ผู้จองต้องการ :</h3>
                    <h3>ราคา 1,200 บาท</h3>
                  </v-card-text>
                </v-card>
                <v-card
                  class="rounded-lg border-dashed mt-2"
                  color="secondary"
                  variant="outlined"
                >
                  <v-card-text class="d-flex justify-space-between">
                    <h3>ข้อเสนอที่ผู้จองต้องการ :</h3>
                    <h3>ราคา 1,200 บาท</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-2 mb-2" />
        <p>ค่าสำหรับงานนี้</p>
        <div class="d-flex justify-space-between">
          <p style="opacity: 0.4;">ค่าขนส่ง (ต่อคัน) </p>
          <p>1,452 บาท/คัน</p>
        </div>
        <v-divider class="mt-2 mb-2" />
        <v-card flat style="background-color: #f2f2f9;">
          <v-card-text class="d-flex justify-space-between ma-2" style="color: #000080;">
            <h2>ยอดที่คุณจะได้รับ</h2>
            <h2>1,200 บาท</h2>
          </v-card-text>
        </v-card>
        <v-divider class="mt-2 mb-2" />
        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              block
              color="#009688"
              rounded="lg"
              size="large"
              text="ปฏิเสธ"
              variant="outlined"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              block
              color="primary"
              rounded="lg"
              size="large"
              text="สนใจงานนี้"
              @click="offer=true"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <!-- location -->
  <v-dialog v-model="dialog_location" max-width="600px">
    <v-card>
      <v-card-title
        class="bg-primary text-white text-h6 d-flex align-center justify-space-between"
      >
        <p>รายละเอียดจุดรับ - ส่ง</p>
        <v-btn
          icon
          variant="text"
          @click="dialog_location = false"
        ><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>

      <v-card-text>
        <v-timeline
          align="start"
          density="compact"
          side="end"
          truncate-line="both"
        >
          <v-timeline-item
            v-for="(location, index) in locations"
            :key="index"
            :color="getTimelineColor(location.type)"
            size="small"
            width="100%"
          >
            <template #icon>
              <v-avatar :color="getTimelineColor(location.type)" size="27">
                <!-- <span class="text-white">{{ index + 1 }}</span> -->
              </v-avatar>
            </template>
            <div>
              <div class="font-weight-medium">{{ location.label }}</div>
              <div class="text-subtitle text-grey-darken-1">
                {{ location.address }}
              </div>
              <div style="color: #005eb8">{{ location.date }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>

    </v-card>
  </v-dialog>
  <!-- prodect -->
  <v-dialog v-model="dialog_product" max-width="600px">
    <v-card>
      <v-card-title
        class="bg-primary text-white text-h6 d-flex align-center justify-space-between"
      >
        <p>ช้อมูลสินค้า</p>
        <v-btn
          icon
          variant="text"
          @click="dialog_product = false"
        ><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <p>ประเภทสินค้า : สินค้าทั่วไป</p>
        <p>รายละเอียดสินค้า : เครื่องแต่งกาย เสื้อผ้า แว่น กระเป๋า</p>
        <p>บรรจุภัณฑ์ : กล่องกระดาษ</p>
        <p>น้ำหนัก : 3.00 กิโลกรัม</p>
        <p>มูลค่าสินค้า  : 245 บาท</p>
        <p>รูปสินค้า</p>
        <v-row>
          <v-col
            v-for="(product, index) in products"
            :key="index"
            class="text-center"
            cols="12"
            lg="4"
            md="4"
            sm="6"
          >
            <v-img
              :alt="product.name"
              cover
              height="180"
              :src="product.image"
              width="180"
            />
            <p class="mt-2">{{ product.name }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!-- offer -->
  <v-dialog v-model="offer" max-width="800">
    <v-card>
      <v-card-title class="text-h6 d-flex align-center">
        <p class="flex-grow-1 text-center">หมายเลขงาน : BH3ca75</p>
        <v-btn
          icon
          variant="text"
          @click="dialog_product = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card border="thin" rounded="lg" variant="outlined">
          <v-card-text>
            <p>เริ่มงาน : 6 มีนาคม 2568 10:00 น.</p>
            <p>ประเภทรถ : รถ 4 ล้อ(ตู้ทึบปกติ)</p>
            <p>ระยะทาง : 892 กิโลเมตร </p>
          </v-card-text>
        </v-card>
        <v-card
          class="rounded-lg border-dashed mt-4 mb-4"
          color="primary"
          variant="outlined"
        >
          <v-card-text class="d-flex justify-space-between">
            <h3>ข้อเสนอที่ผู้จองต้องการ :</h3>
            <h3>ราคา 1,200 บาท</h3>
          </v-card-text>
        </v-card>
        <p>เสนอราคาที่คุณต้องการ</p>
        <v-card border="thin" rounded="lg" variant="outlined">
          <v-card-text>
            <p>ราคาค่าขนส่ง</p>
            <v-text-field density="comfortable" placeholder="1,200" rounded="lg" variant="outlined" />
          </v-card-text>
        </v-card>
        <div class="mt-4">
          <v-btn
            block
            class="mb-4"
            color="primary"
            density="comfortable"
            size="large"
            text="ยืนยันเสนอราคา"
          />
          <v-btn
            block
            color="#FF0004"
            density="comfortable"
            size="large"
            text="ยกเลิก"
            variant="outlined"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import productImage from '@/assets/img/Product.png'
  export default {
    data () {
      return {
        products: [
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
          { image:productImage },
        ],
        dialog_location:false,
        dialog_product:false,
        offer:false,
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
      openImgae (){
        this.dialog_location = true;
      },
      getTimelineColor (type) {
        if (type === 'pickup') return 'primary';
        if (type === 'dropoff') return 'secondary';
        return 'grey';
      },
    },
  }
</script>
