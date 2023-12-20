<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-50"
  >
    <div
      class="relative p-5 bg-white md:max-w-lg max-w-sm mx-auto md:mt-20 border-4 border-sky-950 rounded-xl max-h-[50rem] min-h-[30rem] overflow-y-auto"
    >
    <div>
        <h1>Department : {{ department.name }} </h1>
        <h1>Year & Sections: {{ sectionYear.year_section }}</h1>
    </div>
    <div>
        <table>
            <thead>
                <th>Id Numbers</th>
            </thead>
            <tbody>
                <tr v-for="idNumber in idNumbers">
                    <td>{{ idNumber }}</td>
                </tr>
            </tbody>
        </table>
    
    </div>
    <div class="flex justify-end mt-4 items-center gap-5">
        <button
          @click="emits('closePreview')"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          back
        </button>
        <button
          @click="handleSave"
          class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save 
        </button>
      </div>
      <Transition name="fade" v-if="showActionModal">
        <ActionModal data="Saved" @closeAction="showActionModal = false" />
      </Transition>
      <Transition name="fade">
        <ActionSpinnerAnimation v-if="showActionSpinner" data="Saving" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import { useUserStore } from "../stores/users";
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";

const store = useUserStore()

const showActionModal = ref(false);
const showActionSpinner = ref(false);

const props = defineProps([
    'department',
    'sectionYear',
    'idNumbers',
    'role_id'
])

const emits = defineEmits([
    'closePreview','success'
])

const handleSave = async()=>{
    const data = {
        department_id: props.department.id,
        s_y_id:props.sectionYear.id,
        role_id:props.role_id,
        ids:props.idNumbers
    }
    showActionSpinner.value = true
    await store.saveUsers(data)
    showActionSpinner.value = false
    if(store.isSuccess){
        showActionModal.value = true
        setTimeout(()=>{
            showActionModal.value = false
            emits('success')
        },2000)
    }else{
        alert('Something went wrong')
    }
}


</script>

<style lang="scss" scoped></style>
