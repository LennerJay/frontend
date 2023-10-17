<template>
   <div>
        <hr class="h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
        <h1 class="font-bold"> {{ criteria.description }}</h1>
        <form :id="criteria.id">
            <input type="hidden" name="criteria_id" :value="criteria.id">
            <div v-for="(question,key) in criteria.questions" :key="key">
                <p>{{  key+1}}. {{ question.question }}</p>
                <div class="mb-2" >
                    <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]" v-for="value in values" :key="value">
                        <!-- @click="handleClick(question.id,value,criteria.id)" -->
                        <input
                            type="radio"
                            :name="question.id"
                            :id="'criteria'+ criteria.id +'question' + question.id + 'rating'+ value"
                            :checked="value == getValue(question.id)"
                            :value="value"
                            @input="ratingSelected(question.id,value,`criteria`.id )"
                      
                            />
                        <label
                            class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            :for="'criteria'+ criteria.id +'question' + question.id + 'rating'+ value"
                            >{{ value }}
                        </label>
                    </div>
                </div>
            </div>
            <button type="submit" @click.prevent="$emit('handleSubmit')">Submit</button>
        </form>
   </div>
</template>

<script setup>
// import FormButtons from './FormButtons.vue';
import {useLocalStorageStore} from '../stores/localStorage.js';

defineProps({
    criteria : Object,
});

const values = [1,2,3,4,5]
const store = useLocalStorageStore()
const emit = defineEmits(['ratingSelected','handleSubmit'])
const ratingSelected =  (id,rating) => {
    localStorage.setItem(id,rating)
    emit('ratingSelected',{id:id,rating:rating})
};
const getValue = (id)=>{
    return localStorage.getItem(id)
};
</script>

<style lang="scss" scoped>

</style>