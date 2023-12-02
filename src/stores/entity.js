import { defineStore } from "pinia";
import { getAllEntity } from "../http/entity-api";
import { ref ,watch} from "vue";

export const useEntityStore = defineStore('entityStore',()=>{
    const entities = ref([]);
    const errors = ref([]);

    const fetchAllEntity = async()=>{
        try{
            const {data} = await getAllEntity();
            console.log(data);
            entities.value = data.data
            errors.value = [];
        }catch(e){
            entities.value = []
            errors.value = e.response;
        }
        
    }

    if(localStorage.getItem('entities')){
        entities.value = JSON.parse(localStorage.getItem('entities'));
    }

    watch(
        entities,
        (entitiesVal)=>{
            localStorage.setItem('entities', JSON.stringify(entitiesVal))
        },
        {
            deep: true,
        }
    );
    return{
        entities,
        errors,
        fetchAllEntity
    }
});