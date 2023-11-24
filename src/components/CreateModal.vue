<template>
      <!-- Modal container -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-sky-950 bg-opacity-5 items-center justify-center font-Times New Roman">
        <div class="bg-white p-8 max-w-md mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[26rem] overflow-y-auto">
            <button @click="handleClose" id="close-btn">
                <i class="bi bi-x-lg"></i>
                <span></span>
            </button>
            <div class="mb-4 flex flex-col">
                <h2 class="text-2xl font-semibold text-center bg-sky-950 text-white mb-2">Create Teacher</h2>
            </div>
            <!-- Modal body -->
            <div class="mb-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">Full Name</label>
                    <input v-model="name" class="border rounded w-full py-2 px-3" id="firstName" type="text" placeholder="Enter Full name">
                    <p v-if="errors.name">{{ errors.name }}</p>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">Shift</label>
                    <select v-model="shift" class="border rounded text-gray-700 w-full py-2 px-3" id="gender">
                        <option value=0>Part Time</option>
                        <option value=1>Full Time</option>
                    </select>
                </div>
                <div class="mb-4 flex">
                   <div class="mr-10">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">Personal Type</label>
                      <select v-model="personelType" class="border rounded text-gray-700 w-full py-2 px-3" id="gender">
                         <option v-for="entity in entities" :value="entity.id">{{ entity.entity_name }}</option>
                      </select>
                   </div>
                   <div v-if="personelType == 1">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">Department</label>
                    <select v-model="department" class="border rounded text-gray-700 w-full py-2 px-3" id="gender">
                        <option v-for="department in departments" :value="department.id">{{ department.department }}</option>
                    </select>
                   </div>
                </div>
            </div>
            <div class="mb-4 flex" v-if="personelType == 1">
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">Subject</label>
                <select v-model="subject" class="border rounded text-gray-700 w-full py-2 px-3" id="gender">
                    <option v-for="subject in subjects" :value="subject.id">{{ subject.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">Section & Year</label>
                <select v-model="sectionYear" class="border rounded text-gray-700 w-full py-2 px-3" id="gender">
                    <option v-for="sectionYear in sectionYears" :value="sectionYear.id">{{ sectionYear.year_section }}</option>
                </select>
              </div>
            </div>
            <div class="mb-4 flex" v-if="personelType == 1">
              <div>
                <label class=" text-gray-700 text-sm font-bold mb-2" for="firstName">Time</label>
                <input v-model="time" class="border rounded w-full py-2 px-3" id="firstName" type="text" placeholder="Eg. 1:00-2:30 PM">
                <p v-if="timeError">{{ timeError }}</p>
              </div>
              <div>
                <label class=" text-gray-700 text-sm font-bold mb-2" for="firstName">Schedule</label>
                <input v-model="schedule" class="border rounded w-full py-2 px-3" id="firstName" type="text" placeholder="Eg. MWF, TTH, SAT">
                <p v-if="sYError">{{ sYError }}</p>
              </div>
              
             <button @click="addClassBtn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Add Class</button>
            </div>
            <p v-if="dataExist">{{ dataExist }}</p>
            <table v-if="showTable">
              <thead>
                <th>Subject</th>
                <th>Sections</th>
                <th>Schedule</th>
                <th>Time</th>
                <th>Action</th>
              </thead>
              <tbody v-for="(klass,klassIndex) in classes" :key="klassIndex">
                <tr v-for="(sched,schedIndex) in klass.schedules ">
                  
                  <td v-if="schedIndex == 0" :rowspan="klass.schedules.length">{{ klass.subject.name }}</td>
                  <td>{{ sched.sectionYear.year_section }}</td>
                  <td>{{ sched.day }}</td>
                  <td>{{ sched.time }}</td>
                  <td>
                    <button @click="editData(klass.subject.id,sched.sectionYear.id,sched.day,sched.time,klassIndex,schedIndex)">Edit</button>
                    <button @click="removeRowData(klassIndex,schedIndex)">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-if="errors.class">{{ errors.class }}</p>
            <!-- Modal footer -->
            <div class="flex justify-end">
                <button @click="handleClickCreate" class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const timeError = ref('');
const sYError = ref('');
const dataExist = ref('');
const errors = ref({});
const name = ref('');
const shift = ref(0);
const department = ref(props.departments[0].id);
const personelType = ref(props.entities[0].id);
const subject = ref(props.subjects[0].id);
const sectionYear = ref(props.sectionYears[0].id);
const time = ref('');
const schedule = ref('');
const showTable = ref(false);
const classes = ref([]);
const props = defineProps([
    'showCreateModal',
    'entities',
    'departments',
    'subjects',
    'sectionYears'
]);
const emits = defineEmits(['handleCloseButton','handleCreateClick']);

const handleClose = () => {
  //  shift.value = ref(0)
  // department.value = ref(props.departments[0].id);
  // personelType.value = ref(props.entities[0].id)
  emits('handleCloseButton');
}

const editData = (subjectId,sectionYearId,scheduleData,timeData,parentIndex,childIndex) => {
  subject.value = subjectId
  sectionYear.value = sectionYearId
  schedule.value= scheduleData
  time.value = timeData
  removeRowData(parentIndex,childIndex)
}

const removeRowData = (parentIndex,childIndex) => {
  console.log(parentIndex,childIndex)
  classes.value[parentIndex].schedules.splice(childIndex,1)
}

const addClassBtn = ()=>{
  errors.value.class = ''
  let error = false
  if(time.value == ''){
    error = true
    timeError.value = 'Please enter a time'
  }
  if(schedule.value == ''){
    error = true
    sYError.value = 'Please input the schedule'
  }
  if(!error){
    sYError.value= ''
    timeError.value =''
    const findSY = props.sectionYears.find(sy => sy.id == sectionYear.value)
    const index = classes.value.findIndex(klass => klass.subject.id == subject.value )
    if(index != -1){// check if existing ang data
        if(!classes.value[index].schedules.some(sched => sched.sectionYear.id == sectionYear.value)){
          classes.value[index].schedules.push({
                              sectionYear: findSY,
                              day: schedule.value,
                              time: time.value
                            })
                            dataExist.value = ''
        }else{
          dataExist.value = 'The data already exists'
          console.log(dataExist.value)
        }
    }else{
      const findSub =  props.subjects.find(sub => sub.id == subject.value)
      classes.value.push({
                        subject: findSub,
                        schedules: [
                          {
                            sectionYear: findSY,
                            day: schedule.value,
                            time: time.value
                          }
                        ]
                      })
    }
    showTable.value = true
    console.log( classes.value)
  }
}



const handleClickCreate = ()=>{
  if(name.value !== ''){
    errors.value= {}
    const val = {
      name:name.value,
      entity_id:personelType.value,
      job_type: shift.value
    }
    if(personelType.value == 1 && classes.value.length != 0){
      errors.value= {}
      val.classes = classes.value
    }else{
      errors.value.class = 'Please Add a Class'
      console.log(errors.value.class)
    }

    if(errors.value.length != 0){
      emits('handleCreateClick',val)
    }
 
  }else{
    errors.value.name = 'name is required'
    console.log(errors.value)
  }



}
</script>
<style scoped>
#close-btn {
  border: none;
  display: block;
  position: relative;
  padding: 4px 8px;
  font-size: 12px;
  background: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  color: black;
  z-index: 1;
  font-family: inherit;
  font-weight: 1500;
  margin-bottom: 10px;
  left: 97%;
  bottom: 20px;
}

#close-btn span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 2px solid rgb(109, 109, 109);
}

#close-btn span::before {
  content: "";
  display: block;
  position: absolute;
  width: 8%;
  height: 500%;
  background: var(--lightgray);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-60deg);
  transition: all 0.3s;
}

#close-btn:hover span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background-color: rgba(7, 89, 133, 1);
}

#close-btn:hover {
  color: white;
}

#close-btn:active span::before {
  background: #2751cd;
}
.overflow-y-auto::-webkit-scrollbar {
  display: none;
  width: 0px;
}
.overflow-y-auto:hover::-webkit-scrollbar {
  display: block;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background-color: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(8, 47, 73, 1);
  border-radius: 8px;
  width: 4px;
}
</style>