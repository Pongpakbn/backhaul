<template>
  <v-container>
    <div class="d-flex justify-space-between mb-4">
      <h2>เรทราคา</h2>
      <v-btn
        color="primary"
        flat
        prepend-icon="mdi-tag-outline"
        size="large"
        text="เพิ่มเรทราคา"
        @click="openAddDialog"
      />
    </div>
    <v-card class="rounded-md" flat>
      <v-data-table
        class="elevation-1"
        :headers="headers"
        :items="items"
        :items-per-page="5"
      >
        <template #[`item.action`]="{ item }">
          <v-btn
            class="me-2"
            color="primary"
            flat
            prepend-icon="mdi-tag-outline"
            text="แก้ไข"
            @click="openEditDialog(item)"
          />
          <v-btn
            class="text-white"
            color="red"
            flat
            prepend-icon="mdi-delete"
            text="ลบ"
            @click="deleteRate(item)"
          />
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <p>{{ dialogMode === 'add' ? 'เพิ่มเรทราคา' : 'แก้ไขเรทราคา' }}</p>
          <v-btn icon="mdi-close" variant="text" @click="closeDialog" />
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <p>ชื่อโปรไฟล์</p>
              <v-text-field
                v-model="newRate.profile"
                density="comfortable"
                hide-details
                placeholder="ชื่อโปรไฟล์"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>ราคาเริ่มต้น (บาท)</p>
              <v-text-field
                v-model="newRate.price"
                density="comfortable"
                hide-details
                placeholder="ราคาเริ่มต้น"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>ราคา/หน่วย</p>
              <v-text-field
                v-model="newRate.rate"
                density="comfortable"
                hide-details
                placeholder="ราคา/หน่วย"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="4">
              <p>กม.</p>
              <v-select
                v-model="newRate.distance"
                density="comfortable"
                hide-details
                :items="distances"
                placeholder="เลือกระยะทาง"
                rounded="md"
                variant="outlined"
              />
            </v-col>
            <v-col class="d-flex justify-end" cols="12">
              <v-btn
                color="primary"
                prepend-icon="mdi-check"
                size="large"
                text="ยืนยัน"
                @click="saveRate"
              />
            </v-col>
          </v-row>
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
        dialogMode: 'add', // 'add' or 'edit'
        headers: [
          { title: '#', value: 'index', sortable: false },
          { title: 'ชื่อโปรไฟล์', value: 'profile' },
          { title: 'ราคาเริ่มต้น', value: 'price' },
          { title: 'ราคา/หน่วย', value: 'rate' },
          { title: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        ],
        items: [
          { index: 1, profile: 'Profile 1', price: '3,000', rate: '4,000/100 กม.' },
          { index: 2, profile: 'Profile 2', price: '3,500', rate: '4,500/200 กม.' },
          { index: 3, profile: 'Profile 3', price: '4,000', rate: '5,000/300 กม.' },
          { index: 4, profile: 'Profile 4', price: '4,500', rate: '5,500/400 กม.' },
        ],
        newRate: {
          index: null,
          profile: '',
          price: '',
          rate: '',
          distance: null,
        },
        distances: ['100 กม.', '200 กม.', '300 กม.', '400 กม.'],
      };
    },
    methods: {
      openAddDialog () {
        this.dialogMode = 'add';
        this.resetNewRate();
        this.dialog = true;
      },
      openEditDialog (item) {
        this.dialogMode = 'edit';
        this.newRate = {
          index: item.index,
          profile: item.profile,
          price: item.price.replace(/[^\d]/g, ''), // Remove commas for editing
          rate: item.rate.split('/')[0].replace(/[^\d]/g, ''), // Extract numeric part
          distance: item.rate.split('/')[1],
        };
        this.dialog = true;
      },
      closeDialog () {
        this.dialog = false;
        this.resetNewRate();
      },
      deleteRate (item) {
        if (confirm(`คุณแน่ใจหรือไม่ที่จะลบ ${item.profile}?`)) {
          this.items = this.items.filter(i => i.index !== item.index);
          console.log('Rate deleted:', item);
        }
      },
      saveRate () {
        if (this.newRate.profile && this.newRate.price && this.newRate.rate && this.newRate.distance) {
          const price = parseInt(this.newRate.price.replace(/[^\d]/g, '')).toLocaleString();
          const rate = parseInt(this.newRate.rate.replace(/[^\d]/g, '')).toLocaleString();
          if (this.dialogMode === 'add') {
            const newIndex = this.items.length + 1;
            this.items.push({
              index: newIndex,
              profile: this.newRate.profile,
              price,
              rate: `${rate}/${this.newRate.distance}`,
            });
          } else if (this.dialogMode === 'edit') {
            const itemIndex = this.items.findIndex(i => i.index === this.newRate.index);
            if (itemIndex !== -1) {
              this.items[itemIndex] = {
                index: this.newRate.index,
                profile: this.newRate.profile,
                price,
                rate: `${rate}/${this.newRate.distance}`,
              };
            }
          }
          this.dialog = false;
          this.resetNewRate();
          console.log('Rate saved:', this.newRate);
        } else {
          console.log('Please fill all fields');
        }
      },
      resetNewRate () {
        this.newRate = {
          index: null,
          profile: '',
          price: '',
          rate: '',
          distance: null,
        };
      },
    },
  };
</script>

<style scoped>
.rounded-md {
  border-radius: 8px;
}
</style>
