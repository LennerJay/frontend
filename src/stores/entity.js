import { defineStore } from "pinia";
import { ref ,watch} from "vue";
import { getAllEntity, addEntity, deleteEntity, updateEntity } from "../http/entity-api";
import { csrfCookie} from "../http/auth-api"

export const useEntityStore = defineStore('entityStore',()=>{
    const entities = ref([]);
    const errors = ref([]);
    const isSuccess = ref(false)
    const isResponseSuccess = ref(false)

    const fetchAllEntity = async()=>{
        try{
            const {data} = await getAllEntity();
            if(data.success){
                isSuccess.value = true;
                isResponseSuccess.value = true;
                entities.value = data.data
            }else{
                isSuccess.value = false;
                isResponseSuccess.value = false;
            }
            errors.value = [];
        }catch(e){
            entities.value = []
            errors.value = e.response;
        }
        
    }

    // if(localStorage.getItem('entities')){
    //     entities.value = JSON.parse(localStorage.getItem('entities'));
    // }

    // watch(
    //     entities,
    //     (entitiesVal)=>{
    //         localStorage.setItem('entities', JSON.stringify(entitiesVal))
    //     },
    //     {
    //         deep: true,
    //     }
    // );


    const saveEntity = async(val)=>{
        await csrfCookie()
        try {
            const { data } = await addEntity({entity_name: val});
            if(data.success){
                if(data.data){
                    isSuccess.value = true
                    isResponseSuccess.value = true
                    entities.value.unshift(data.data)
                }else{
                    isSuccess.value = false
                    isResponseSuccess.value = false
                }
            }
            errors.value = []
        } catch (error) {
             errors.value = error
        }

    }

    const saveUpdateEntity = async(id,val)=>{
        await csrfCookie()
        try {
            const {data} = await updateEntity(id,{entity_name:val})
            if(data.success) {
                if(data.data){
                    isSuccess.value = true
                    isResponseSuccess.value = true
                    entities.value.map(entity =>{
                        if(entity.id == id){
                            entity.entity_name = data.data.entity_name
                        }
                        return entity
                    })
                }else{
                    isSuccess.value = false
                    isResponseSuccess.value = false
                }

            }
            errors.value = []
        } catch (error) {
             errors.value = error
        }

    }

    const removeEntity = async(id) => {
        await csrfCookie()
        try {
            const {data} = await deleteEntity(id)
            if(data.success){
                isResponseSuccess.value = true;
                isSuccess.value = true;
                entities.value = entities.value.filter(entity => entity.id != id)
            }else{
                isResponseSuccess.value = false;
                isSuccess.value = false;
            }
            errors.value = []
        }catch(e){
            errors.value = e
            isSuccess.value =false
        }

    }

    return{
        entities,
        errors,
        fetchAllEntity,
        saveEntity,
        saveUpdateEntity,
        removeEntity,
        isResponseSuccess,
        isSuccess
    }
});