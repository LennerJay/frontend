<template>
  <div class="flex">
    <div class="md:ml-[250px] h-screen w-screen">
      <div class="header-container">
        <header id="main-header">
          <h1>Advance Options</h1>
          <h2>Cordova Public College</h2>
        </header>
        <div class="objects">
          <div class="object-content">
            <ul>
              <li>
                <button @click="changeOption('Departments')" type="button" id="department" name="department">Departments</button>
              </li>
              <li>
                <button  @click="changeOption('Year & Sections')" type="button" id="year-sec" name="year_sec">Year & Sections</button>
              </li>
              <li><button  @click="changeOption('Entities')" type="button" id="entities" name="entities">Entities</button></li>
              <li><button  @click="changeOption('Subjects')" type="button" id="subject" name="subject">Subjects</button></li>
            </ul>
          </div>
        </div>
      </div>
      <button @click="showOptionModal = true">Add {{ currentOption }}</button>
      <!-- End of header-container -->

    
      <OptionTable
        :datas="datas"
        :name="currentOption"
        :showLoadingAnimations="showLoadingAnimations"
        :isNoData="isNoData"
      
      />
 
      <FooterCard />
    
    </div>
 
   <!-- End of main-container -->
  </div>
</template>

<script setup>
import {ref,onMounted} from "vue"
import { useSubjectStore } from "../../stores/subject";
import { useSectionYearStore } from "../../stores/sectionYear";
import { useDepartmentStore } from "../../stores/department"
import { useEntityStore } from "../../stores/entity"
import OptionModal from "../../components/OptionTable.vue"
import OptionTable from '../../components/OptionTable.vue';
import FooterCard from "../../components/FooterCard.vue";

const sectionYear = useSectionYearStore()
const subjectStore = useSubjectStore();
const entityStore = useEntityStore();
const departmentStore = useDepartmentStore()
const currentOption = ref('Departments')
const datas = ref([])
const showLoadingAnimations = ref(false)
const isNoData = ref(false)
const showOptionModal = ref(false)

const addOption = ()=>{
  if(currentOption.value == 'Departments'){
    addDepartment();
  }else if(currentOption.value == 'Year & Sections'){
    addSectionYear();
  }else if(currentOption.value == 'Entities'){
    addEntity();
  }else if(currentOption.value == 'Subjects'){
    addSubject();
  }
}

const addEntity = ()=>{

}

const addSubject = ()=>{

}

const addSectionYear = ()=>{

}

const addDepartment = () =>{

}

const changeOption = async (value)=>{
  showLoadingAnimations.value = true;
  currentOption.value = value;
  localStorage.setItem('currentOption', value);
  await fetchOptions();
  if(datas.value.length > 0){
    showLoadingAnimations.value = false;
  }else{
    isNoData.value = true;
  }

}

const fetchOptions = async()=>{
  if(currentOption.value == 'Departments'){
    if(departmentStore.departments.length == 0){
        await departmentStore.getDepartments()
    }
    datas.value = departmentStore.departments
  }

  if(currentOption.value == 'Entities'){
    if(entityStore.entities.length == 0){
        await entityStore.fetchAllEntity()
    }
    datas.value =  entityStore.entities.map(item => {
                    return { id: item.id, name: item.entity_name };
                  });
    
  }

  if(currentOption.value == 'Year & Sections'){
    if(sectionYear.sectionYears.length == 0){
        await sectionYear.fetchAllSectionYears()
    }
    datas.value =  sectionYear.sectionYears.map(item => {
                    return { id: item.id, name: item.year_section };
                  });
  }

  if(currentOption.value == 'Subjects'){
    if(subjectStore.subjects.length == 0){
        await subjectStore.fetchAllSubjects()
    }
    datas.value =  subjectStore.subjects
  }
}

onMounted(async()=>{
  showLoadingAnimations.value = true;
  if(localStorage.getItem('currentOption')){
    currentOption.value = localStorage.getItem('currentOption')
  }
  await fetchOptions();
  if(datas.value.length > 0){
    showLoadingAnimations.value = false;
  }else{
    isNoData.value = true;
  }

})
</script>

<style scoped>
/* Code Blocks Here */

.main-container {
  overflow-y: scroll;
}

.header-container {
  width: 100%;
  margin: auto auto 40px auto;
  position: sticky;
  top: 0;
}

.header-container #main-header {
  background-color: #0c4a6e;
  padding: 15px 0 15px 0;
  color: #ffffff;
  text-align: center;
}

#main-header h1 {
  color: #ffffff;
  font-size: 18px;
  font-family: Verdana;
  font-weight: bold;
}

#main-header h2 {
  color: #ffffff;
  font-size: 16px;
  font-family: Verdana;
}

.header-container .objects {
  background-color: #e6e6e6;
  width: 100%;
  margin: auto;
}

.objects .object-content {
  color: #000000;
  padding: 20px 15px;
  width: 80%;
  margin: auto;
}

.objects .object-content ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.objects .object-content ul li {
  display: inline;
}

.objects .object-content ul li button {
  display: block;
  background-color: #0c4a6e;
  color: #ffffff;
  padding: 10px 18px;
  border: none;
  outline: none;
  font-family: Helvetica;
  border-radius: 35px;
  font-size: 13.5px;
}

.objects .object-content ul li button:hover {
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}
</style>
