<template>
  <v-container>
    <v-card class="mb-4 d-flex align-center justify-space-between" flat>
      <div class="d-flex align-center ma-4">
        <v-btn class="pl-0" prepend-icon="mdi-chevron-left" variant="text" @click="$router.push('/user/booking')">ย้อนกลับ</v-btn>
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
            <h3>{{ รายการ + (index + 1) }}</h3>
            <v-row class="d-flex align-center">
              <v-col cols="12" md="3">
                <v-card class="pa-2" flat>
                  <v-avatar size="150">
                    <v-img src="@/assets/img/Checking boxes-amico.png" />
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
                <v-row>
                  <v-col><v-btn color="primary" variant="text" @click="editItem(index)">แก้ไข</v-btn></v-col>
                  <v-col><v-btn color="secondary" variant="text" @click="deleteItem(index)">ลบ</v-btn></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-btn
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
          block
          class="mt-4"
          color="primary"
          size="x-large"
          text="ยืนยัน"
          @click="dialog_sum = true"
        />
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          {{ isEditing ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า' }}
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col class="d-flex align-center justify-center" cols="12" md="6">
              <v-img height="250" src="@/assets/img/Product.png" />
            </v-col>
            <v-col cols="12" md="6">
              <h3>ความกว้าง</h3>
              <v-text-field
                v-model="form.width"
                density="comfortable"
                placeholder="ความกว้าง"
                prepend-inner-icon="mdi mdi-border-top"
                rounded="lg"
                type="number"
                variant="outlined"
              />
              <h3>ความยาว</h3>
              <v-text-field
                v-model="form.length"
                density="comfortable"
                placeholder="ความยาว"
                prepend-inner-icon="mdi mdi-border-left"
                rounded="lg"
                type="number"
                variant="outlined"
              />
              <h3>ความสูง</h3>
              <v-text-field
                v-model="form.height"
                density="comfortable"
                placeholder="ความสูง"
                prepend-inner-icon="mdi mdi-border-vertical"
                rounded="lg"
                type="number"
                variant="outlined"
              />
              <h3>น้ำหนัก</h3>
              <v-text-field
                v-model="form.weight"
                density="comfortable"
                placeholder="น้ำหนัก"
                prepend-inner-icon="mdi mdi-weight"
                rounded="lg"
                type="number"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12">
              <v-file-upload
                v-model="form.imageFile"
                accept="image/*"
                density="comfortable"
                icon="mdi mdi-camera"
                title="กดเพื่อเลือกรูปภาพ(ขนาดไม่เกิน 20MB)"
                variant="comfortable"
                @change="handleImageUpload"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                rounded="lg"
                size="x-large"
                text="ยืนยัน"
                @click="saveItem"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_sum" max-width="800px">
      <v-card>
        <v-card-title>
          สรุปรายการ
        </v-card-title>
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
              <h3>{{ รายการ + (index + 1) }}</h3>
              <v-row class="d-flex align-center">
                <v-col cols="12" md="4">
                  <v-card class="pa-2" flat>
                    <v-avatar size="150">
                      <v-img src="@/assets/img/Checking boxes-amico.png" />
                    </v-avatar>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-row>
                    <v-col class="text-grey" cols="6"><p>ความกว้าง</p></v-col>
                    <v-col><p>{{ item.width }} cm.</p></v-col>
                    <v-col class="text-grey" cols="6"><p>ความสูง</p></v-col>
                    <v-col><p>{{ item.height }} cm.</p></v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="4">
                  <v-row>
                    <v-col class="text-grey" cols="6"><p>ความยาว</p></v-col>
                    <v-col><p>{{ item.length }} cm.</p></v-col>
                    <v-col class="text-grey" cols="6"><p>น้ำหนัก</p></v-col>
                    <v-col><p>{{ item.weight }} kg.</p></v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-btn
            block
            color="primary"
            flat
            size="large"
            text="ยืนยัน"
            @click="$router.push('/user/booking/route')"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        dialog_sum: false,
        isEditing: false,
        editIndex: null,
        รายการ: 'รายการที่ ',
        items: [
          { width: 40, length: 20, height: 60, weight: 3, image: null },
          { width: 40, length: 20, height: 60, weight: 3, image: null },
        ],
        form: {
          width: '',
          length: '',
          height: '',
          weight: '',
          image: null,
          imageFile: null,
        },
      };
    },
    methods: {
      openAddDialog () {
        this.isEditing = false;
        this.editIndex = null;
        this.form = { width: '', length: '', height: '', weight: '', image: null, imageFile: null };
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
      },
      saveItem () {
        const newItem = {
          width: parseFloat(this.form.width) || 0,
          length: parseFloat(this.form.length) || 0,
          height: parseFloat(this.form.height) || 0,
          weight: parseFloat(this.form.weight) || 0,
          image: this.form.image,
        };
        if (this.isEditing) {
          this.items[this.editIndex] = newItem;
        } else {
          this.items.push(newItem);
        }
        this.dialog = false;
        this.form = { width: '', length: '', height: '', weight: '', image: null, imageFile: null };
      },
      handleImageUpload (file) {
        if (file && file.size <= 20 * 1024 * 1024) { // Check if file size is under 20MB
          const reader = new FileReader();
          reader.onload = e => {
            this.form.image = e.target.result; // Store base64 image
          };
          reader.readAsDataURL(file);
        } else {
          // alert('ขนาดไฟล์ภาพต้องไม่เกิน 20MB');
        }
      },
    },
  };
</script>
