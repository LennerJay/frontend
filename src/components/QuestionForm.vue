<template>
   <div>
        <hr class="h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
        <h1 class="font-bold"> {{ criteria.description }}</h1>
        <form :id="criteria.id">
            <input type="hidden" name="criteria_id" :value="criteria.id">
            <div v-for="(question,key) in criteria.questions">
                <p>{{  key+1}}. {{ question.question }}</p>
                <div class="flex justify-center" >
                    <div class="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]" v-for="(value,key) in values">
                        <input
                            type="radio"
                            :name="question.id"
                            :id="question.id"
                            v-model="radioButtonStates[key].rate"
                            />
                        <label
                            class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                            :for="question.id"
                            >{{ value }}
                        </label>
                    </div>
                </div>
            </div>
        </form>
   </div>
</template>

<script setup>
// import FormButtons from './FormButtons.vue';
import { ref } from 'vue';
const values = [1,2,3,4,5]

defineProps({
    criteria : Object,
    radioButtonStates: Object,
});
const emit = defineEmits(['selectedValue']);

let questions = ref({});

const selectedValue =(newVal)=>{
    emit('selectedValue',newVal);
};

</script>

<style lang="scss" scoped>

</style>