<template>
  <v-container>
    <v-card class="invoice-container" elevation="3">
      <!-- Header -->
      <div class="invoice-header">
        <v-row align="center">
          <v-col cols="auto">
            <div class="company-logo">
              <i class="fas fa-building" />
            </div>
          </v-col>
          <v-col>
            <h1 class="text-h4 font-weight-bold mb-2">ใบเสร็จรับเงิน</h1>
            <p class="text-subtitle1 mb-0">เลขที่ RT-20250600001</p>
          </v-col>
          <v-col cols="auto">
            <v-btn color="white" prepend-icon="mdi-printer" variant="outlined">
              พิมพ์ใบเสนอราคา
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <v-card-text>
        <!-- Company & Customer Info -->
        <v-row>
          <v-col cols="12" md="6">
            <div class="info-section">
              <h3 class="text-h6 mb-3 text-primary">ผู้ขาย:</h3>
              <div class="mb-2">
                <span class="info-label">บริษัท:</span>
                บริษัท นิรันดร์ แท็กซี่ จำกัด บิ๊กไบค์
              </div>
              <div class="mb-2">
                <span class="info-label">ที่อยู่:</span>
                เลขที่ 253/12 หมู่ 2 ซอย บ่อนาค
                ตำบลบางกะต้าน อำเภอบ้านโป่ง
                จังหวัดราชบุรี 70110
              </div>
              <div class="mb-2">
                <span class="info-label">เลขประจำตัว:</span>
                0105520200623 (สำนักงานใหญ่)
              </div>
              <div class="mb-2">
                <span class="info-label">โทร:</span>
                096-4200621
              </div>
              <div class="mb-2">
                <span class="info-label">อีเมล:</span>
                bkk_solution@gmail.com
              </div>
              <div>
                <span class="info-label">เว็บไซต์:</span>
                www.bkk_solution.co.th
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="info-section">
              <h3 class="text-h6 mb-3 text-primary">ลูกค้า:</h3>
              <div class="mb-2">
                <span class="info-label">บริษัท:</span>
                COOKIE บริษัท ชาวดิน จำกัด(มหาชน) อำเภอ
              </div>
              <div class="mb-2">
                <span class="info-label">ที่อยู่:</span>
                เลขที่ 79 ซอย พญาไท 7-9 ถนน ซอย
                เขต 35 กรุงเทพฯ
                ประเทศไทย กรุงเทพฯ
                กรุงเทพมหานคร 10110
              </div>
              <div class="mb-2">
                <span class="info-label">เลขประจำตัว:</span>
                0105530407779
              </div>
            </div>

            <div class="info-section mt-4">
              <v-row>
                <v-col cols="6">
                  <div class="mb-2">
                    <span class="info-label">เลขที่เอกสาร:</span>
                    RT-20250600001
                  </div>
                  <div class="mb-2">
                    <span class="info-label">วันที่ออก:</span>
                    06/06/2025
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="mb-2">
                    <span class="info-label">หมายเลข:</span>
                    IV-20250600002
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <!-- Items Table -->
        <v-table class="mt-6">
          <thead>
            <tr class="table-header">
              <th>ลำดับ</th>
              <th>รายการ</th>
              <th class="text-center">จำนวน</th>
              <th class="text-center">ราคา</th>
              <th class="text-center">ส่วนลด</th>
              <th class="text-center">VAT</th>
              <th class="text-right">ยอดรวมสุทธิ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div>ค่าบริการ (P00001)</div>
                <div class="text-caption text-grey">Transportation for 01 - 30 April 2025</div>
                <div class="text-caption text-grey">ใบลาพักร้อน</div>
              </td>
              <td class="text-center">100</td>
              <td class="text-center">14,100.00</td>
              <td class="text-center">0.00</td>
              <td class="text-center">ไม่</td>
              <td class="text-right font-weight-bold">14,100.00</td>
            </tr>
          </tbody>
        </v-table>

        <!-- Summary -->
        <v-row class="mt-6">
          <v-col cols="12" md="6">
            <div class="payment-info">
              <h4 class="text-h6 mb-2">รายละเอียดการชำระเงิน</h4>
              <div class="mb-1"><strong>ยอดเงินที่ต้องชำระเงิน:</strong> 14,100.00 บาท</div>
              <div class="mb-1"><strong>ค่าขนส่งสินค้า:</strong> หน้างานต้องชำระค่าส่งเอง</div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="amount-summary">
              <v-row align="center">
                <v-col>
                  <div class="text-h6 mb-2">ยอดเงินรวมสินค้า</div>
                  <div class="total-amount">14,100.00 บาท</div>
                </v-col>
              </v-row>

              <v-divider class="my-3" />

              <v-row>
                <v-col cols="6">
                  <div class="mb-1">ค่าบริการ จำนวน:</div>
                  <div class="mb-1">วันที่ออก: จ่ายภายใน:</div>
                  <div class="mb-1">ค่าขนส่งสินค้า:</div>
                </v-col>
                <v-col class="text-right" cols="6">
                  <div class="mb-1">06/06/2025</div>
                  <div class="mb-1">141.00 บาท</div>
                  <div class="mb-1">14,100.00 บาท</div>
                </v-col>
              </v-row>

              <v-row class="mt-3">
                <v-col cols="6">
                  <div class="text-orange font-weight-bold">
                    ยอดเงินค้างที่ยังไม่ได้รับค่า 564.2-644814-0
                  </div>
                </v-col>
                <v-col class="text-right" cols="6">
                  <div class="font-weight-bold">13,959.00 บาท</div>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <div>จำกัด จำนวน รายงาน ก็ยัง</div>
                  <div>ภาวการณ์ ยอด รถ ชำระ</div>
                </v-col>
                <v-col class="text-right" cols="6">
                  <div>141.00 บาท</div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <!-- Footer with QR Codes -->
        <v-row class="mt-6">
          <v-col cols="12">
            <h4 class="text-h6 mb-3">หมายเหตุ</h4>
            <div class="text-body-2 mb-4">
              ชำระเงินให้เสร็จสิ้นภายใน กำหนดการส่ง (ชิ้น) ชำระเงินหลาก (ชิ้น) ภาษีและใบ (หน้าที่)
              ผู้จัดส่งหลาก (หน้าที่) ภาระท่าน (หน้าที่)
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12" md="4">
            <v-card class="text-center pa-4" variant="outlined">
              <div class="qr-code mb-2">
                <i class="fas fa-qrcode fa-2x" />
              </div>
              <div class="text-caption">ชำระเงิน เครดิตการ์ด</div>
              <div class="text-caption">13/05/2025</div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="text-center pa-4" variant="outlined">
              <div class="qr-code mb-2">
                <i class="fas fa-qrcode fa-2x" />
              </div>
              <div class="text-caption">พร้อมเพย์ เครดิตการ์ด</div>
              <div class="text-caption">13/05/2025</div>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="text-center pa-4" variant="outlined">
              <div class="text-body-2 font-weight-bold">บริษัท ชาวดิน จำกัด(มหาชน) ริ่ง</div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Contact Info -->
        <v-row class="mt-4">
          <v-col cols="12">
            <v-card class="pa-3" color="blue-grey" variant="tonal">
              <v-row align="center">
                <v-col cols="auto">
                  <v-icon color="red" size="20">mdi-map-marker</v-icon>
                </v-col>
                <v-col>
                  <div class="text-body-2">
                    ช.เวลาสั่งซื้อ: กรุงเทพฯ อ.หาดใหญ่ จ.สงขลา ร.อ.บ้านโป่ง จ.ราชบุรี เบอร์โทร 564.2-644814-0
                    เมื่อจำกิด สั่งสถาน 7กิโล สำเหตุ ผ่าน ท่าน ร.ป. ท่าม. ท. ที่ ส่งออกตามที่เจ้าชำระ arnk70225538@gmail.com
                  </div>
                </v-col>
                <v-col cols="auto">
                  <div class="text-right">
                    <div class="font-weight-bold">13,959.00 บาท</div>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
   <style>
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');

        body {
            font-family: 'Sarabun', sans-serif;
            background-color: #f5f5f5;
        }

        .invoice-container {
            max-width: 800px;
            margin: 20px auto;
            background: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .company-logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, #1976d2, #42a5f5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
        }

        .invoice-header {
            background: linear-gradient(135deg, #1976d2, #1565c0);
            color: white;
            padding: 20px;
        }

        .info-section {
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 15px;
            margin: 10px 0;
        }

        .info-label {
            font-weight: 600;
            color: #424242;
            min-width: 100px;
            display: inline-block;
        }

        .table-header {
            background-color: #f8f9fa;
            font-weight: 600;
        }

        .amount-summary {
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }

        .total-amount {
            font-size: 24px;
            font-weight: 700;
            color: #1976d2;
        }

        .qr-code {
            width: 100px;
            height: 100px;
            background: #f5f5f5;
            border: 2px solid #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #666;
        }

        .payment-info {
            background: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 15px 0;
        }
    </style>
