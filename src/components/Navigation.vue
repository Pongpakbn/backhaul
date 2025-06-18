<template>
  <v-navigation-drawer
    v-if="showLayout"
    v-model="drawer"
    app
  >
    <v-card class="ma-2 rounded-lg" color="primary" flat>
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="white">mdi-chart-timeline-variant</v-icon>
        <div>
          <h3 class="white--text">Smart Backhaul</h3>
          <p class="white--text text-subtitle-2 mb-0">User</p>
        </div>
      </v-card-title>
    </v-card>
    <v-list color="primary" nav>
      <v-list-item
        v-for="(item, index) in menu_user"
        :key="index"
        :active="$route.path === item.route"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.route"
      />
    </v-list>
    <template #append>
      <div class="pa-2">
        <v-btn block prepend-icon="mdi-logout" variant="text">
          ออกจากระบบ
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-app-bar v-if="showLayout" app :elevation="0">
    <v-btn icon @click.stop="drawer = !drawer">
      <v-icon>
        {{ drawer ? 'mdi-dock-right' : 'mdi-dock-left' }}
      </v-icon>
    </v-btn>

    <v-toolbar-title />

    <v-btn append-icon="mdi-account" rounded="lg" style="background-color:#005eb8;color:white;">
      <p>USER</p>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'

  const drawer = ref(false)
  const route = useRoute()

  // เส้นทางที่ไม่ต้องการแสดง Drawer และ AppBar
  const hiddenPaths = ['/auth/login', '/auth/register', '/auth/shipper', '/auth/driver','/auth/lsp']

  // ตรวจสอบว่าควรแสดง layout หรือไม่
  const showLayout = computed(() => {
    return !hiddenPaths.includes(route.path)
  })

  const menu_partner = [
    { title: 'หน้าหลัก', icon: 'mdi-home-outline', route: '/partner' },
    { title: 'การจองในระบบ', icon: 'mdi-map-marker-plus-outline', route: '/partner/booking' },
    { title: 'ติดตาม', icon: 'mdi-crosshairs', route: '/partner/tracking' },
    { title: 'เรทราคา', icon: 'mdi-tag-outline', route: '/partner/pricerate' },
    { title: 'คนขับรถ', icon: 'mdi-card-account-details-outline', route: '/partner/driver' },
    { title: 'รถในระบบ', icon: 'mdi-truck-outline', route: '/partner/car' },
    { title: 'แผนการเดินรถ', icon: 'mdi-map-outline', route: '/partner/route' },
    { title: 'ค้นหางาน', icon: 'mdi-flag-outline', route: '/partner/findjob' },
    { title: 'งานของฉัน', icon: 'mdi-clipboard-text-outline', route: '/partner/myjob' },
    { title: 'ข้อมูลส่วนตัวและธุรกิจ', icon: 'mdi-account-outline', route: '/partner/profile' },
  ]
  const menu_user = [
    { title: 'หน้าหลัก', icon: 'mdi-home-outline', route: '/user' },
    { title: 'จองรถขนส่ง', icon: 'mdi-truck-outline', route: '/user/booking' },
    { title: 'เช็ครถว่าง', icon: 'mdi-car-search', route: '/user/checkcar' },
    { title: 'ติดตามการจัดส่ง', icon: 'mdi-target', route: '/user/tracking' },
    { title: 'การจองของฉัน', icon: 'mdi-file-document-multiple-outline', route: '/user/job' },
    { title: 'แจ้งชำระเงิน', icon: 'mdi-currency-thb', route: '/user/payment' },
    { title: 'ประวัติการจองรถ', icon: 'mdi-history', route: '/user/history' },
    { title: 'ข้อมูลส่วนตัวและธุรกิจ', icon: 'mdi-account-outline', route: '/user/profile' },
    { title: 'ติดต่อเรา', icon: 'mdi-message-text-outline', route: '/user/contact' },
    { title: 'แจ้งปัญหา', icon:'mdi-message-alert-outline',route: '/user/Complaint' },
  ]
  const menu_lspDriver = [
    { title: 'งานของฉัน', icon: 'mdi-map-outline', route: '/lspdriver' },
    { title: 'ช้อความ', icon: 'mdi-truck-outline', route: '/lspdriver/message' },
  ]
  const menu_admin = [
    { title: 'ยืนยันสิทธิ์การใช้งาน', icon: 'mdi-account-check', route: '/admin' },
    { title: 'ติดตามการขนส่ง', icon: 'mdi-target', route: '/admin/tracking' },
    { title: 'คนขับรถในระบบ', icon: 'mdi-car-seat', route: '/admin/driver' },
    { title: 'รถในระบบ', icon: 'mdi-truck', route: '/admin/cartype' },
    { title: 'ตรวจสอบรถในระบบ', icon: 'mdi-calendar-check', route: '/admin/car' },
    { title: 'ตรวจสอบแผนการเดินรถ', icon: 'mdi-map', route: '/admin/route' },
    { title: 'การจองที่ไม่พบรถ', icon: 'mdi-alert-outline', route: '/admin/boardcast' },
    { title: 'ประเภทเชื้อเพลิง', icon: 'mdi-fuel', route: '/admin/fuel' },
    { title: 'รายการประเมิน', icon: 'mdi-clipboard-text-outline', route: '/admin/evaluation' },
  ]
</script>
