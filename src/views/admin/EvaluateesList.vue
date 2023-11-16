<template>
    <div class="content">
        <TableForm :title="title"></TableForm>



    </div>
</template>

<script setup>
import { ref , onMounted,on} from 'vue';
import TableForm from '../../components/TableForm.vue';

const title = "Evaluatee List"

on('selectValue',(payload)=>{
    console.log(payload)
})



</script>

<style lang="scss" scoped>

</style>