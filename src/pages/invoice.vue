<template>
  <v-container fluid>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-primary">ใบเสร็จรับเงิน เลขที่ IV-20250400002</h1>
      <v-btn
        color="primary"
        prepend-icon="mdi-printer"
        rounded="md"
        size="large"
        text="พิมพ์เอกสาร"
      />
    </div>
    <v-card flat>
      <v-card-text>
        <v-row>
          <v-col class="d-flex justify-start" cols="8">
            <v-avatar rounded="0" size="120">
              <v-img contain src="@/assets/img/Box.svg" />
            </v-avatar>
          </v-col>
          <v-col class="d-flex justify-end align-end" cols="4">
            <h1 class="text-secondary">ใบเสร็จรับเงิน</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-row>
              <v-col cols="3">
                <p>ผู้ขาย :</p>
              </v-col>
              <v-col cols="9">
                <p>บริษัท บีเคเค เซอร์วิส โซลูชั่น จำกัด</p>
              </v-col>
              <v-col cols="3">
                <p>ที่อยู่:</p>
              </v-col>
              <v-col cols="9">
                <p>
                  เลขที่ 223/112 หมู่ที่ 2 ถนน ปานวิถี ตำบลบางเพรียง อำเภอบางบ่อ
                  จังหวัดสมุทรปราการ 10560
                </p>
              </v-col>
              <v-col cols="3">
                <p>เลขที่ภาษี :</p>
              </v-col>
              <v-col cols="9">
                <p>0115557020623 (สำนักงานใหญ่)</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="3">
                <v-icon>mdi-phone</v-icon>
              </v-col>
              <v-col cols="9">
                <p>096-4106621</p>
              </v-col>
              <v-col cols="3">
                <v-icon>mdi-email</v-icon>
              </v-col>
              <v-col cols="9">
                <p>bkk_solution@gmail.com</p>
              </v-col>
              <v-col cols="3">
                <v-icon>mdi-web</v-icon>
              </v-col>
              <v-col cols="9">
                <p>www.bkk_solution.co.th</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-card flat style="background-color: #fef6e5;">
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <p>เลขที่เอกสาร :</p>
                  </v-col>
                  <v-col cols="8">
                    <p>RT-20250600001</p>
                  </v-col>
                  <v-col cols="4">
                    <p>วันที่ออก :</p>
                  </v-col>
                  <v-col cols="8">
                    <p>06/06/2025</p>
                  </v-col>
                  <v-col cols="4">
                    <p>เครดิต</p>
                  </v-col>
                  <v-col cols="8">
                    <p>-</p>
                  </v-col>
                  <v-col cols="4">
                    <p>วันที่ครบกำหนด</p>
                  </v-col>
                  <v-col cols="8">
                    <p>06/06/2025</p>
                  </v-col>
                  <v-col cols="4">
                    <p>อ้างอิง :</p>
                  </v-col>
                  <v-col cols="8">
                    <p>-</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="mt-4 mb-4" />
        <v-row>
          <v-col cols="4">
            <v-row>
              <v-col cols="3">
                <p>ผู้ขาย :</p>
              </v-col>
              <v-col cols="9">
                <p>บริษัท บีเคเค เซอร์วิส โซลูชั่น จำกัด</p>
              </v-col>
              <v-col cols="3">
                <p>ที่อยู่:</p>
              </v-col>
              <v-col cols="9">
                <p>
                  เลขที่ 223/112 หมู่ที่ 2 ถนน ปานวิถี ตำบลบางเพรียง อำเภอบางบ่อ
                  จังหวัดสมุทรปราการ 10560
                </p>
              </v-col>
              <v-col cols="3">
                <p>เลขที่ภาษี :</p>
              </v-col>
              <v-col cols="9">
                <p>0115557020623 (สำนักงานใหญ่)</p>
              </v-col>
              <v-col cols="3">
                <p>เรียน :</p>
              </v-col>
              <v-col cols="9">
                <p>-</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="3">
                <v-icon>mdi-phone</v-icon>
              </v-col>
              <v-col cols="9">
                <p>-</p>
              </v-col>
              <v-col cols="3">
                <v-icon>mdi-email</v-icon>
              </v-col>
              <v-col cols="9">
                <p>-</p>
              </v-col>
              <v-col cols="3">
                <v-icon>mdi-web</v-icon>
              </v-col>
              <v-col cols="9">
                <p>-</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="12">
                <h3>ติดต่อกลับที่ :</h3>
              </v-col>
              <v-col class="d-flex justify-start" cols="2">
                <v-icon>mdi-account</v-icon>
              </v-col>
              <v-col class="d-flex justify-start" cols="10">
                <p>จันทร์จิรา นาครอด</p>
              </v-col>
              <v-col cols="2">
                <v-icon>mdi-phone</v-icon>
              </v-col>
              <v-col cols="10">
                <p>0627795707</p>
              </v-col>
              <v-col cols="2">
                <v-icon>mdi-email</v-icon>
              </v-col>
              <v-col cols="10">
                <p>ann19022533@gmail.com</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-data-table
          class="mt-6"
          disable-pagination
          :headers="headers"
          hide-default-footer
          item-key="id"
          :items="items"
        >
          <template #[`item.price`]="{ item }">
            {{ item.price }}
          </template>

          <template #[`item.quantity`]="{ item }">
            {{ item.quantity }}
          </template>

          <template #[`item.discount`]="{ item }">
            {{ item.discount }}
          </template>

          <template #[`item.vat`]="{ item }">
            {{ item.vat }}
          </template>

          <template #[`item.total`]="{ item }">
            {{ item.total }}
          </template>

          <template #[`item.description`]="{ item }">
            {{ item.description.title }}
            <div class="text-caption text-grey">
              {{ item.description.subTitle1 }}
            </div>
            <div class="text-caption text-grey">
              {{ item.description.subTitle2 }}
            </div>
          </template>
        </v-data-table>
        <v-card class="mt-4" flat style="background-color: #f5f5f5;">
          <v-card-text>
            <p>รายงานการลดการปล่อยคาร์บอน (Carbon Footprint) จากการใช้บบริการขนส่งเที่ยวกลับ(Smart Backhaul)</p>
            <p>-คุณสามารถใช้ข้อมูลนี้ในการขอรับ Carbon Credit ได้ตามหลักเกณฑ์ที่กฎหมายกำหนด</p>
            <p>-ปริมาณการลดการปล่อย CO₂ : 92.50 กิโลกรัม</p>
            <div class="mt-4"><b>หมายเหตุ:</b> ค่าลดคาร์บอนที่แสดงในใบแจ้งหนี้นี้เป็นการประเมินจากระบบ AI ที่พัฒนาโดย Smart Backhaul Platform และอาจมีความคลาดเคลื่อนตามปัจจัยภายนอก</div>
          </v-card-text>
        </v-card>
        <v-divider class="mt-4 mb-4" />
        <v-row>
          <v-col cols="6">
            <v-row>
              <v-col cols="2">
                <h3>สรุป</h3>
              </v-col>
              <v-col cols="5">
                <p>มูลค่าไม่มีหรือยกเว้นภาษี</p>
              </v-col>

              <v-col cols="5">
                <p>14,100.00 บาท</p>
              </v-col>
              <v-col cols="2" />
              <v-col cols="5">
                <p>จำนวนทั้งสิ้น</p>
              </v-col>
              <v-col cols="5">
                <p>หนึ่งหมื่นสี่พันหนึ่งร้อยบาทถ้วน</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="pl-0" cols="6">
            <v-card flat style="background-color: #fef6e5">
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <h3>จำนวนเงินทั้งสิ้น</h3>
                  </v-col>
                  <v-col class="text-end" cols="6">
                    <h2 class="text-primary">14,100.00 บาท</h2>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-row class="mt-2" dense>
              <v-col class="text-end" cols="8">
                <h3>จำนวนเงินที่ถูกหัก ณ ที่จ่าย</h3>
              </v-col>
              <v-col class="text-end" cols="4">
                <h2>141.00 บาท</h2>
              </v-col>
              <v-col class="text-end" cols="8">
                <h3>จำนวนเงินที่ชำระ</h3>
              </v-col>
              <v-col class="text-end" cols="4">
                <h2>14,100.00 บาท</h2>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-4 mb-4" />
        <v-row dense>
          <v-col cols="6">
            <v-row>
              <v-col cols="2">
                <h3>ชำระเงิน</h3>
              </v-col>
              <v-col cols="1">
                <v-avatar size="x-small">
                  <v-img
                    src="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
                  />
                </v-avatar>
              </v-col>
              <v-col cols="5">
                <p>ธ.กสิกรไทย</p>
              </v-col>
              <v-col class="text-end" cols="4">
                <p>13,959.00 บาท</p>
              </v-col>
              <v-col cols="2" />
              <v-col cols="1" />
              <v-col class="text-start" cols="9">
                <h3>ออมทรัพย์ 564-2-64848-0</h3>
              </v-col>
              <v-col cols="2" />
              <v-col cols="1" />
              <v-col class="text-start mt-0" cols="9">
                <p>บีเคเค เซอร์วิส โซลูชั่น จำกัด</p>
              </v-col>
              <v-col cols="2" />
              <v-col cols="1" />
              <v-col cols="5"><p>ภาษีหัก ณ ที่จ่าย</p></v-col>
              <v-col class="text-end " cols="4">
                <p>141.00 บาท</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-4 mb-4" />
        <v-row>
          <v-col>
            <h3>หมายเหตุ</h3>
          </v-col>
        </v-row>
        <v-divider class="mt-4 mb-4" />
        <v-row>
          <v-col class="d-flex align-center" cols="1">
            <h3>รับรอง</h3>
          </v-col>
          <v-col class="d-flex align-center" cols="2">
            <p>สแกนเพื่อเปิดด้วยเว็บไซต์</p>
          </v-col>
          <v-col class="d-flex text-center align-center" cols="2">
            <p>ผู้ออกเอกสาร (ผู้ขาย)</p>
          </v-col>
          <v-col class="d-flex align-center" cols="2">
            <p>ผู้ออกเอกสาร (ผู้ขาย)</p>
          </v-col>
          <v-col class="d-flex align-center" cols="2">
            <p>ตราประทับ (ผู้ขาย)</p>
          </v-col>
          <v-col class="d-flex align-center" cols="2">
            <p>ผู้ออกเอกสาร (ผู้ขาย)</p>
          </v-col>
          <v-col class="d-flex align-center" cols="1">
            <p>ตราประทับ (ลูกค้า)</p>
          </v-col>
          <v-col class="d-flex align-center" cols="1" />
          <v-col class="pl-0" cols="2">
            <v-avatar size="160px" tile>
              <v-img src="@/assets/img/QRcode.svg" />
            </v-avatar>
          </v-col>
          <v-col class="d-flex justify-end text-center flex-column" cols="1">
            <p>จันทร์จิรา นาครอด</p>
            <p>13/05/2025</p>
          </v-col>
          <v-col class="d-flex text-center justify-end flex-column" cols="3">
            <p>จันทร์จิรา นาครอด</p>
            <p>13/05/2025</p>
          </v-col>
          <v-col class="d-flex justify-end flex-column" cols="2" />
          <v-col class="d-flex justify-end text-start flex-column" cols="2">
            <p>__________________________</p>
            <p>บริษัท ลาซาด้า เอ็กซ์เพรส จำกัด</p>
          </v-col>
          <v-col class="d-flex " cols="1">
            <v-card border="dashed" variant="outlined" width="120">
              <v-card-text />
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          { title: 'คำอธิบาย', value: 'id' },
          { title: 'จำนวน', value: 'quantity', align: 'end' },
          { title: 'ราคา', value: 'price', align: 'end' },
          { title: 'ส่วนลด', value: 'discount', align: 'end' },
          { title: 'VAT', value: 'vat', align: 'end' },
          { title: 'ยอดรวมสุทธิ', value: 'total', align: 'end' },
        ],
        items: [
          {
            id: '1.ค่าขนส่ง (P00001)Transportation fee of 1- 30 April 2025-Pickup',
            quantity: 100,
            price: '14,100.00',
            discount: '0.00',
            vat: 'ไม่',
            total: '14,100.00',
          },
        ],
      };
    },
  };
</script>
<style scoped>
.table-header {
  background-color: #e5edf6;
  font-weight: 600;
}
</style>
