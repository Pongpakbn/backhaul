```vue
<template>
  <v-container>
    <v-card class="mb-4 d-flex align-center justify-space-between" flat>
      <div class="d-flex align-center ma-4">
        <v-btn
          aria-label="ย้อนกลับไปหน้าจอง"
          class="pl-0"
          prepend-icon="mdi-chevron-left"
          variant="text"
          @click="$router.push('/user/booking')"
        >
          ย้อนกลับ
        </v-btn>
      </div>
      <v-chip class="me-4" color="secondary" label variant="outlined">
        รายชิ้น
      </v-chip>
    </v-card>

    <v-card flat>
      <v-card-title>สินค้า</v-card-title>
      <v-divider />
      <v-card-text>
        <v-card
          v-for="(item, index) in items"
          :key="index"
          border="thin"
          class="mb-4"
          variant="outlined"
        >
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <h3>{{ รายการ }} {{ index + 1 }}</h3>
              <div>
                <v-btn
                  aria-label="แก้ไขรายการ"
                  color="primary"
                  variant="text"
                  @click="editItem(index)"
                >
                  แก้ไข
                </v-btn>
                <v-btn
                  aria-label="ลบรายการ"
                  color="secondary"
                  variant="text"
                  @click="deleteItem(index)"
                >
                  ลบ
                </v-btn>
              </div>
            </div>
            <v-row class="d-flex align-center">
              <v-col cols="12" md="3">
                <v-card class="pa-2" flat>
                  <v-avatar rounded="0" size="150">
                    <v-img
                      alt="ภาพสินค้าหรือตัวอย่าง"
                      :src="item.image"
                    />
                  </v-avatar>
                </v-card>
              </v-col>
              <v-col cols="12" md="3">
                <v-row>
                  <v-col class="text-grey" cols="6"><p>ความกว้าง</p></v-col>
                  <v-col><p>{{ item.width }} cm.</p></v-col>
                  <v-col class="text-grey" cols="6"><p>ความสูง</p></v-col>
                  <v-col><p>{{ item.height }} cm.</p></v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="3">
                <v-row>
                  <v-col class="text-grey" cols="6"><p>ความยาว</p></v-col>
                  <v-col><p>{{ item.length }} cm.</p></v-col>
                  <v-col class="text-grey" cols="6"><p>น้ำหนัก</p></v-col>
                  <v-col><p>{{ item.weight }} kg.</p></v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="3">
                จำนวน {{ item.amount }} ชิ้น
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-btn
          aria-label="เพิ่มสินค้าใหม่"
          block
          border="thin"
          class="mt-4"
          prepend-icon="mdi-plus"
          size="x-large"
          text="เพิ่มสินค้า"
          variant="outlined"
          @click="openAddDialog"
        />
        <v-btn
          aria-label="ยืนยันรายการสินค้า"
          block
          class="mt-4"
          color="primary"
          :disabled="items.length === 0"
          size="x-large"
          text="ยืนยัน"
          @click="dialog_sum = true"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <p>{{ isEditing ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า' }}</p>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col class="d-flex align-center justify-center" cols="12" md="6">
                <v-img
                  alt="ตัวอย่างสินค้าหรือรูปที่อัปโหลด"
                  class="image-transition"
                  contain
                  height="250"
                  :src="displayImage"
                />
              </v-col>
              <v-col cols="12" md="6">
                <h3>ความกว้าง (ซม.)</h3>
                <v-text-field
                  v-model="form.width"
                  aria-label="ความกว้างของสินค้า"
                  density="comfortable"
                  placeholder="ความกว้าง"
                  prepend-inner-icon="mdi-border-top"
                  rounded="lg"
                  :rules="[
                    v => !!v || 'กรุณากรอกความกว้าง',
                    v => (v && v > 0) || 'ต้องมากกว่า 0',
                  ]"
                  type="number"
                  variant="outlined"
                />
                <h3>ความยาว (ซม.)</h3>
                <v-text-field
                  v-model="form.length"
                  aria-label="ความยาวของสินค้า"
                  density="comfortable"
                  placeholder="ความยาว"
                  prepend-inner-icon="mdi-border-left"
                  rounded="lg"
                  :rules="[
                    v => !!v || 'กรุณากรอกความยาว',
                    v => (v && v > 0) || 'ต้องมากกว่า 0',
                  ]"
                  type="number"
                  variant="outlined"
                />
                <h3>ความสูง (ซม.)</h3>
                <v-text-field
                  v-model="form.height"
                  aria-label="ความสูงของสินค้า"
                  density="comfortable"
                  placeholder="ความสูง"
                  prepend-inner-icon="mdi-border-vertical"
                  rounded="lg"
                  :rules="[
                    v => !!v || 'กรุณากรอกความสูง',
                    v => (v && v > 0) || 'ต้องมากกว่า 0',
                  ]"
                  type="number"
                  variant="outlined"
                />
                <h3>น้ำหนัก (กก.)</h3>
                <v-text-field
                  v-model="form.weight"
                  aria-label="น้ำหนักของสินค้า"
                  density="comfortable"
                  placeholder="น้ำหนัก"
                  prepend-inner-icon="mdi-weight"
                  rounded="lg"
                  :rules="[
                    v => !!v || 'กรุณากรอกน้ำหนัก',
                    v => (v && v > 0) || 'ต้องมากกว่า 0',
                  ]"
                  type="number"
                  variant="outlined"
                />
                <h3>จำนวน (ชิ้น)</h3>
                <v-text-field
                  v-model="form.amount"
                  aria-label="จำนวนสินค้า"
                  density="comfortable"
                  placeholder="จำนวน"
                  prepend-inner-icon="mdi-package-variant"
                  rounded="lg"
                  :rules="[
                    v => !!v || 'กรุณากรอกจำนวน',
                    v => (v && v > 0 && Number.isInteger(+v)) || 'ต้องเป็นจำนวนเต็มมากกว่า 0',
                  ]"
                  type="number"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="form.imageFile"
                  accept="image/*"
                  aria-label="อัปโหลดภาพสินค้า"
                  density="comfortable"
                  placeholder="เลือกภาพ (ขนาดไม่เกิน 20MB)"
                  prepend-icon="mdi-camera"
                  show-size
                  variant="outlined"
                  @update:model-value="handleImageUpload"
                />
              </v-col>
              <v-col class="d-flex justify-space-between" cols="12">
                <v-btn
                  aria-label="ยกเลิกการเพิ่มหรือแก้ไขสินค้า"
                  color="grey"
                  rounded="lg"
                  size="x-large"
                  text="ยกเลิก"
                  variant="outlined"
                  @click="dialog = false"
                />
                <v-btn
                  aria-label="ยืนยันการเพิ่มหรือแก้ไขสินค้า"
                  color="primary"
                  :disabled="!valid"
                  rounded="lg"
                  size="x-large"
                  text="ยืนยัน"
                  @click="saveItem"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_sum" max-width="800px" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>สรุปรายการ</v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <p><strong>จำนวนรายการ:</strong> {{ items.length }} รายการ</p>
              <p><strong>น้ำหนักรวม:</strong> {{ totalWeight }} กก.</p>
            </v-col>
            <v-col cols="12">
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="(item, index) in items"
                  :key="index"
                  :title="`${รายการ} ${index + 1}`"
                >
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-img
                          alt="ภาพสินค้าหรือตัวอย่าง"
                          contain
                          height="100"
                          :src="item.image"
                        />
                      </v-col>
                      <v-col cols="12" sm="8">
                        <p><strong>ความกว้าง:</strong> {{ item.width }} ซม.</p>
                        <p><strong>ความยาว:</strong> {{ item.length }} ซม.</p>
                        <p><strong>ความสูง:</strong> {{ item.height }} ซม.</p>
                        <p><strong>น้ำหนัก:</strong> {{ item.weight }} กก.</p>
                        <p><strong>จำนวน:</strong> {{ item.amount }} ชิ้น</p>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col class="d-flex justify-space-between" cols="12">
              <v-btn
                aria-label="ยกเลิกการยืนยัน"
                color="grey"
                rounded="lg"
                size="large"
                text="ยกเลิก"
                variant="outlined"
                @click="dialog_sum = false"
              />
              <v-btn
                aria-label="ยืนยันการจอง"
                color="primary"
                rounded="lg"
                size="large"
                text="ยืนยัน"
                @click="$router.push('/user/booking/route')"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import ProductImage from '@/assets/img/Product.png';
  import Swal from 'sweetalert2';

  export default {
    data () {
      return {
        dialog: false,
        dialog_sum: false,
        isEditing: false,
        editIndex: null,
        valid: true,
        รายการ: 'รายการที่',
        items: [
          { width: 40, length: 20, height: 60, weight: 3, amount: 3, image: ProductImage },
          { width: 40, length: 20, height: 60, weight: 3, amount: 5, image: ProductImage },
        ],
        form: {
          width: '',
          length: '',
          height: '',
          weight: '',
          amount: '',
          image: null,
          imageFile: null,
        },
      };
    },
    computed: {
      totalWeight () {
        return this.items.reduce((total, item) => total + (item.weight * item.amount), 0);
      },
      displayImage () {
        return this.form.image !== null ? this.form.image : ProductImage;
      },
    },
    methods: {
      openAddDialog () {
        this.isEditing = false;
        this.editIndex = null;
        this.form = { width: '', length: '', height: '', weight: '', amount: '', image: null, imageFile: null };
        this.dialog = true;
      },
      editItem (index) {
        this.isEditing = true;
        this.editIndex = index;
        this.form = { ...this.items[index], imageFile: null };
        this.dialog = true;
      },
      deleteItem (index) {
        this.items.splice(index, 1);
        Swal.fire({
          icon: 'success',
          title: 'ลบรายการสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      async saveItem () {
        const { valid } = await this.$refs.form.validate();
        if (!valid) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง',
          });
          return;
        }
        const newItem = {
          width: parseFloat(this.form.width) || 0,
          length: parseFloat(this.form.length) || 0,
          height: parseFloat(this.form.height) || 0,
          weight: parseFloat(this.form.weight) || 0,
          amount: parseInt(this.form.amount) || 0,
          image: this.form.image || ProductImage,
        };
        if (this.isEditing) {
          this.items[this.editIndex] = newItem;
          Swal.fire({
            icon: 'success',
            title: 'แก้ไขรายการสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.items.push(newItem);
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มรายการสำเร็จ',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        this.dialog = false;
      },
      handleImageUpload (file) {
        if (file && file.size > 20 * 1024 * 1024) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'ขนาดไฟล์ภาพต้องไม่เกิน 20MB',
          });
          this.form.imageFile = null;
          this.form.image = null;
          return;
        }
        if (file) {
          const reader = new FileReader();
          reader.onload = e => {
            this.form.image = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          this.form.image = null;
        }
      },
      clearImage () {
        this.form.image = null;
        this.form.imageFile = null;
      },
    },
  };
</script>

<style scoped>
.v-btn {
  transition: all 0.3s ease;
}
.image-transition {
  transition: all 0.3s ease;
}
</style>
```
