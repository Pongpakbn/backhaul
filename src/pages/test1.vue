<template>
  <v-container>
    <v-btn class="mb-4" color="primary" @click="dialog = true">
      เพิ่มแบบประเมิน
    </v-btn>

    <!-- Dialog เพิ่มแบบประเมิน -->
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title>เพิ่มหัวข้อแบบประเมิน</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.question"
            dense
            label="หัวข้อแบบประเมิน"
            required
          />

          <v-row
            v-for="(choice, index) in form.choices"
            :key="index"
            class="mt-3"
          >
            <v-col cols="4">
              <v-text-field
                v-model="choice.label"
                dense
                label="ช้อย"
                required
              />
            </v-col>

            <v-col cols="2">
              <v-switch
                v-model="choice.hasInput"
                density="compact"
                hide-details
                label="TextField"
              />
            </v-col>

            <v-col v-if="choice.hasInput" cols="4">
              <v-text-field
                v-model="choice.inputLabel"
                dense
                label="คำหน้าช่องกรอก"
              />
            </v-col>

            <v-col cols="2">
              <v-btn icon @click="removeChoice(index)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-btn class="mt-2" variant="outlined" @click="addChoice">
            เพิ่มช้อย
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">ยกเลิก</v-btn>
          <v-btn color="primary" @click="submit">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- แสดงรายการที่เพิ่ม -->
    <v-card
      v-for="(evalItem, idx) in evaluations"
      :key="idx"
      class="mb-4"
      outlined
    >
      <v-card-title>{{ evalItem.question }}</v-card-title>
      <v-card-text>
        <v-list density="compact">
          <v-list-item
            v-for="(choice, cIdx) in evalItem.choices"
            :key="cIdx"
          >
            <v-row class="align-center" no-gutters>
              <v-col cols="4">
                <v-checkbox
                  v-model="choice.checked"
                  density="compact"
                  hide-details
                  :label="choice.label"
                />
              </v-col>

              <v-col v-if="choice.hasInput" cols="8">
                <v-text-field
                  v-model="choice.input"
                  density="compact"
                  :disabled="!choice.checked"
                  :label="choice.inputLabel || ('ระบุ: ' + choice.label)"
                />
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)
  const form = ref({
    question: '',
    choices: [
      { label: '', hasInput: false, inputLabel: '' },
    ],
  })

  const evaluations = ref([])

  const addChoice = () => {
    form.value.choices.push({ label: '', hasInput: false, inputLabel: '' })
  }

  const removeChoice = index => {
    form.value.choices.splice(index, 1)
  }

  const submit = () => {
    const newEval = {
      question: form.value.question,
      choices: form.value.choices.map(choice => ({
        label: choice.label,
        hasInput: choice.hasInput,
        inputLabel: choice.inputLabel || '',
        checked: false,
        input: '',
      })),
    }

    evaluations.value.push(newEval)

    // Reset form
    form.value = {
      question: '',
      choices: [{ label: '', hasInput: false, inputLabel: '' }],
    }

    dialog.value = false
  }
</script>
