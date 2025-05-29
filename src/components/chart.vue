<template>
  <apexchart height="350" :options="chartOptions" :series="series" type="bar" />
</template>

<script setup>
  import ApexCharts from 'vue3-apexcharts'
  defineExpose({ ApexCharts })

  const series = [
    {
      name: 'รายได้ (บาท)',
      data: [12000, 15000, 18000, 13000, 22000, 25000, 21000, 23000, 20000, 27000, 30000, 32000],
    },
  ]

  const chartOptions = {
    chart: { id: 'income-chart' },
    xaxis: {
      categories: [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
      ],
    },
    title: {
      text: 'รายได้รายเดือน',
      align: 'center',
    },
    colors: ['#000080','#f2a900'],
    stroke: {
      curve: 'smooth',
    },
  }
</script>
