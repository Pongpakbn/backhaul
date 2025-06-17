<template>
  <v-container>
    <h2 class="mb-4">งานของฉัน</h2>
    <v-row class="flex-nowrap" no-gutters style="overflow-x: auto">
      <v-col
        v-for="(label, i) in ['รอยืนยัน', 'รอเริ่มงาน', 'กำลังขนส่ง', 'ขนส่งสำเร็จ']"
        :key="i"
        class="flex-grow-0 flex-shrink-0"
      >
        <v-btn
          :aria-label="`เลือกแท็บ ${label}`"
          class="mx-2 ma-1"
          :color="activeTab === i ? 'primary' : 'white'"
          elevation="0"
          rounded="md"
          @click="activeTab = i"
        >
          {{ label }}
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-card class="mt-2" rounded="lg" variant="text">
      <v-card-text class="pl-0">

      </v-card-text>
    </v-card> -->
    <v-card
      v-for="(job, index) in filteredJobs"
      :key="index"
      class="mt-4"
      flat
      rounded="lg"
    >
      <v-card-title class="d-flex align-center">
        หมายเลขงาน: {{ job.jobId }}
        <v-chip
          class="ml-2"
          :color="getChipColor(job.status)"
          label
          :text="job.status"
        />
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">งานเริ่ม</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.startDate }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">ประเภทรถบรรทุก</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.vehicleType }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">ประเภทการจอง</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.bookingType }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">ประเภทสินค้า</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.productType }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">รายละเอียดสินค้า</p>
              </v-col>
              <v-col cols="6">
                <p
                  aria-label="ดูรายละเอียดสินค้า"
                  style="text-decoration: underline; color: #000080; cursor: pointer;"
                  @click="openProductDialog(index)"
                >
                  ดูรายละเอียดสินค้า
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">แผนการเดินรถ</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.route }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">ระยะทาง</p>
              </v-col>
              <v-col cols="6">
                <p>{{ job.distance }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <p class="text-body-1">จุดรับส่งสินค้า</p>
              </v-col>
              <v-col cols="6">
                <v-btn
                  aria-label="รายละเอียดจุดรับ-ส่ง"
                  color="primary"
                  density="compact"
                  text="รายละเอียดจุดรับ-ส่ง"
                  @click="openImage(index)"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <p class="text-body-1">รายละเอียดเพิ่มเติม</p>
                <p>{{ job.additionalDetails }}</p>
              </v-col>
              <v-col cols="12">
                <v-card
                  class="rounded-lg border-dashed"
                  color="primary"
                  variant="outlined"
                >
                  <v-card-text class="d-flex justify-space-between">
                    <h3>ข้อเสนอที่ผู้จองต้องการ:</h3>
                    <h3>ราคา {{ job.offerPrice }} บาท</h3>
                  </v-card-text>
                </v-card>
                <v-card
                  class="rounded-lg border-dashed mt-2"
                  color="secondary"
                  variant="outlined"
                >
                  <v-card-text class="d-flex justify-space-between">
                    <h3>ข้อเสนอที่ผู้จองต้องการ:</h3>
                    <h3>ราคา {{ job.offerPrice }} บาท</h3>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-4 mb-4" />
        <p class="text-body-1">ค่าสำหรับงานนี้</p>
        <div class="d-flex justify-space-between">
          <p class="text-grey-darken-1">ค่าขนส่ง (ต่อคัน)</p>
          <p>{{ job.transportCost }} บาท/คัน</p>
        </div>
        <v-divider class="mt-4 mb-4" />
        <v-card flat style="background-color: #f2f2f9;">
          <v-card-text class="d-flex justify-space-between ma-2" style="color: #000080;">
            <h2>ยอดที่คุณจะได้รับ</h2>
            <h2>{{ job.finalPrice }} บาท</h2>
          </v-card-text>
        </v-card>
        <v-divider class="mt-4 mb-4" />
        <v-row>
          <v-col cols="12">
            <v-btn
              :aria-label="`ดูรายละเอียดงาน ${job.jobId}`"
              block
              color="primary"
              prepend-icon="mdi-magnify"
              rounded="lg"
              size="large"
              text="ดูรายละเอียด"
              @click="viewJobDetails(index)"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Product Dialog -->
    <v-dialog v-model="dialog_product" max-width="600px">
      <v-card>
        <v-card-title
          class="bg-primary text-white text-h6 d-flex align-center justify-space-between"
        >
          <p>ข้อมูลสินค้า</p>
          <v-btn
            aria-label="ปิดหน้าต่างข้อมูลสินค้า"
            icon
            variant="text"
            @click="dialog_product = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p>ประเภทสินค้า: {{ selectedJob.productType }}</p>
          <p>รายละเอียดสินค้า: {{ selectedJob.productDetails }}</p>
          <p>บรรจุภัณฑ์: {{ selectedJob.packaging }}</p>
          <p>น้ำหนัก: {{ selectedJob.weight }} กิโลกรัม</p>
          <p>มูลค่าสินค้า: {{ selectedJob.value }} บาท</p>
          <p>รูปสินค้า</p>
          <v-row>
            <v-col
              v-for="(product, index) in selectedJob.products"
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

    <!-- Location Dialog -->
    <v-dialog v-model="dialog_location" max-width="600px">
      <v-card>
        <v-card-title
          class="bg-primary text-white text-h6 d-flex align-center justify-space-between"
        >
          <p>รายละเอียดจุดรับ - ส่ง</p>
          <v-btn
            aria-label="ปิดหน้าต่างจุดรับ-ส่ง"
            icon
            variant="text"
            @click="dialog_location = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-timeline align="start" density="compact" side="end" truncate-line="both">
            <v-timeline-item
              v-for="(location, index) in selectedJobLocations"
              :key="index"
              :color="getTimelineColor(location.type)"
              size="small"
              width="100%"
            >
              <template #icon>
                <v-avatar :color="getTimelineColor(location.type)" size="27">
                  <span class="text-white">{{ index + 1 }}</span>
                </v-avatar>
              </template>
              <div>
                <div class="font-weight-medium">{{ location.label }}</div>
                <div class="text-subtitle-1 text-grey-darken-1">{{ location.address }}</div>
                <div class="hightlight">{{ location.date }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import productImage from '@/assets/img/Product.png';

  export default {
    data () {
      return {
        activeTab: 0,
        dialog_product: false,
        dialog_location: false,
        selectedJob: {},
        jobs: [
          {
            jobId: 'BH3ca75',
            status: 'รอเริ่มงาน',
            startDate: '6 มีนาคม 2568 10:00 น.',
            vehicleType: 'รถ 4 ล้อ (ตู้ทึบปกติ)',
            bookingType: 'เหมาคัน',
            productType: 'สินค้าทั่วไป',
            productDetails: 'เครื่องแต่งกาย เสื้อผ้า แว่น กระเป๋า',
            packaging: 'กล่องกระดาษ',
            weight: '3.00',
            value: '245',
            products: [
              { image: productImage, name: 'สินค้า 1' },
              { image: productImage, name: 'สินค้า 2' },
              { image: productImage, name: 'สินค้า 3' },
              { image: productImage, name: 'สินค้า 4' },
              { image: productImage, name: 'สินค้า 5' },
              { image: productImage, name: 'สินค้า 6' },
            ],
            route: 'ภูเก็ต -> กรุงเทพ',
            distance: '892 กิโลเมตร',
            additionalDetails:
              'ต้องการรถกระบะพื้นเรียบ หรือ รถกระบะตอนเดียว (ที่ไม่มีแคป) ขอรถที่มีสายรัดสินค้า และ ขอคนขับรถที่มีความระมัดระวังในการขับขี่ ไม่ขับเร็ว เนื่องจากเคยมีคนขับทำสินค้าล่วงจากพาเลท ทำให้ของเสียหาย',
            offerPrice: '1,200',
            transportCost: '1,452',
            finalPrice: '1,200',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '123 ถนนสุขุมวิท เขตคลองเตย กรุงเทพฯ 10110',
                date: '6 มีนาคม 2568 10:00 น. - 12:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '456 ถนนพระราม 2 เขตบางขุนเทียน กรุงเทพฯ 10150',
                date: '6 มีนาคม 2568 14:00 น. - 16:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า 2',
                address: '789 ถนนแจ้งวัฒนะ เขตหลักสี่ กรุงเทพฯ 10210',
                date: '6 มีนาคม 2568 16:00 น. - 18:00 น.',
              },
            ],
          },
          {
            jobId: 'AX4db89',
            status: 'รอยืนยัน',
            startDate: '7 มีนาคม 2568 09:00 น.',
            vehicleType: 'รถกระบะพื้นเรียบ',
            bookingType: 'เหมาคัน',
            productType: 'สินค้าอิเล็กทรอนิกส์',
            productDetails: 'โทรศัพท์มือถือและอุปกรณ์เสริม',
            packaging: 'กล่องโฟม',
            weight: '5.00',
            value: '10,000',
            products: [
              { image: productImage, name: 'โทรศัพท์ 1' },
              { image: productImage, name: 'โทรศัพท์ 2' },
              { image: productImage, name: 'อุปกรณ์เสริม' },
            ],
            route: 'เชียงใหม่ -> กรุงเทพ',
            distance: '700 กิโลเมตร',
            additionalDetails:
              'ต้องการรถที่มีระบบกันกระแทก และคนขับที่ชำนาญเส้นทางภาคเหนือ',
            offerPrice: '1,500',
            transportCost: '1,800',
            finalPrice: '1,500',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '456 ถนนนิมมานเหมินทร์ อ.เมือง เชียงใหม่ 50200',
                date: '7 มีนาคม 2568 09:00 น. - 11:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '789 ถนนสีลม เขตบางรัก กรุงเทพฯ 10500',
                date: '7 มีนาคม 2568 15:00 น. - 17:00 น.',
              },
            ],
          },
          {
            jobId: 'CY5ef12',
            status: 'กำลังขนส่ง',
            startDate: '8 มีนาคม 2568 08:00 น.',
            vehicleType: 'รถ 6 ล้อ',
            bookingType: 'เหมาคัน',
            productType: 'สินค้าเกษตร',
            productDetails: 'ผลไม้สด (มะม่วง, ทุเรียน)',
            packaging: 'ตะกร้าพลาสติก',
            weight: '1000.00',
            value: '50,000',
            products: [
              { image: productImage, name: 'มะม่วง' },
              { image: productImage, name: 'ทุเรียน' },
            ],
            route: 'ระยอง -> กรุงเทพ',
            distance: '180 กิโลเมตร',
            additionalDetails:
              'ต้องการรถห้องเย็นเพื่อรักษาความสดของผลไม้ และคนขับที่ระวังการกระแทก',
            offerPrice: '3,000',
            transportCost: '3,500',
            finalPrice: '3,000',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '123 ถนนสุขุมวิท อ.เมือง ระยอง 21000',
                date: '8 มีนาคม 2568 08:00 น. - 10:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '456 ถนนพระราม 4 เขตคลองเตย กรุงเทพฯ 10110',
                date: '8 มีนาคม 2568 11:00 น. - 13:00 น.',
              },
            ],
          },
          {
            jobId: 'DZ6gh34',
            status: 'ขนส่งสำเร็จ',
            startDate: '5 มีนาคม 2568 07:00 น.',
            vehicleType: 'รถ 4 ล้อ',
            bookingType: 'เหมาคัน',
            productType: 'สินค้าทั่วไป',
            productDetails: 'เฟอร์นิเจอร์ขนาดเล็ก',
            packaging: 'ห่อบับเบิ้ล',
            weight: '50.00',
            value: '5,000',
            products: [
              { image: productImage, name: 'โต๊ะเล็ก' },
              { image: productImage, name: 'เก้าอี้' },
            ],
            route: 'กรุงเทพ -> นครปฐม',
            distance: '60 กิโลเมตร',
            additionalDetails:
              'ต้องการรถที่มีผ้าใบคลุมกันฝน และคนขับที่ระวังการขีดข่วนสินค้า',
            offerPrice: '800',
            transportCost: '1,000',
            finalPrice: '800',
            locations: [
              {
                type: 'pickup',
                label: 'จุดรับสินค้า',
                address: '789 ถนนลาดพร้าว เขตจตุจักร กรุงเทพฯ 10900',
                date: '5 มีนาคม 2568 07:00 น. - 09:00 น.',
              },
              {
                type: 'dropoff',
                label: 'จุดส่งสินค้า',
                address: '123 ถนนเพชรเกษม อ.เมือง นครปฐม 73000',
                date: '5 มีนาคม 2568 10:00 น. - 12:00 น.',
              },
            ],
          },
        ],
      };
    },
    computed: {
      filteredJobs () {
        const statuses = ['รอยืนยัน', 'รอเริ่มงาน', 'กำลังขนส่ง', 'ขนส่งสำเร็จ'];
        return this.jobs.filter(job => job.status === statuses[this.activeTab]);
      },
      selectedJobLocations () {
        return this.selectedJob.locations || [];
      },
    },
    methods: {
      openImage (index) {
        this.selectedJob = this.filteredJobs[index];
        this.dialog_location = true;
      },
      openProductDialog (index) {
        this.selectedJob = this.filteredJobs[index];
        this.dialog_product = true;
      },
      viewJobDetails () {
        // const jobId = this.filteredJobs[index].jobId;
        this.$router.push(`/partner/myjob/id`);
      },
      getTimelineColor (type) {
        if (type === 'pickup') return '#005eb8';
        if (type === 'dropoff') return '#f2a900';
        return 'grey';
      },
      getChipColor (status) {
        switch (status) {
          case 'รอยืนยัน': return '#FBBA52';
          case 'รอเริ่มงาน': return '#FBBA52';
          case 'กำลังขนส่ง': return '#36B7D4';
          case 'ขนส่งสำเร็จ': return '#4CAF50';
          default: return 'grey';
        }
      },
    },
  };
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}
.v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.hightlight {
  color: #005eb8;
  font-weight: bold;
}
</style>
