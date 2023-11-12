<template>
    <div class="md:ml-[250px w-full">
        <main class="flex items-center justify-center h-screen min-h-screen bg-sky-950 mix-blend-darken">
            <form @submit.prevent="handleSubmit">
                <div class="bg-sky-900 w-96 p-10 rounded-md shadow-sm">
                    <div class="flex items-center justify-center mb-6">
                        <img src="../assets/cpc_logo.png" class="h-32 pb-2.5 animate-bounce"/>
                    </div>
                    <input v-model="form.id_number" class="w-full py-2  bg-blue-50 text-zinc-600 px-1 rounded-md outline-none mb-6 text-center" :class="{'is-invalid':errors.id_number && errors.id_number[0] }" type="number" id="id_number" placeholder="Student ID"/>
                    <!-- <p v-if="errors.id_number && errors.id_number[0]" class="text-red-500 text-xs italic">{{ errors.id_number && errors.id_number[0] }}</p> -->
                    <input  v-model="form.password" class="w-full py-2  bg-blue-50 text-zinc-600 px-1 rounded-md outline-none mb-6 text-center" :class="{'is-invalid':errors.password && errors.password[0] }" type="password" id="password" autocomplete="on" placeholder="Password"/>
                    <!-- <p v-if="errors.password && errors.password[0]" class="text-red-500 text-xs italic">Please input a password.</p> -->
                    <button type="submit" class="bg-blue-500 py-2 w-full text-gray-100 rounded-md hover:bg-blue-600 transition-colors">Login
                    </button>
                </div>
            </form>
        </main>
        <hr>
        <FooterCard/>
    </div>
    
</template>


<script setup>
import FooterCard from '../components/FooterCard.vue';
import { ref,onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter,useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth'


const route = useRoute()
const router = useRouter()
const store = useAuthStore()
const { errors } = storeToRefs(store)
const { handleLogin} = store
const form = ref({
    id_number : null,
    password : '',
});


const handleSubmit = async () =>{
    await handleLogin(form.value)
        if(Object.keys(store.errors).length === 0){
            if(store.isLoggedIn){
                if(store.isAdminStaff){
                    router.push({name: 'admin'});
                }else{
                    router.push( {name:'dashboard'})
                }
            }
        }
};

onMounted(async()=>{
    const res = await store.testApi()
    console.log(res)
    // console.log(res.section_years)
    // let classesId = []
    // res.section_years.forEach(sy => {
    //     sy.klasses.forEach(klass => {
    //         classesId.push(klass.id)
    //     })
    // });
    // console.log(classesId)
})

</script>


<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
.is-invalid{
    @apply border-2 border-red-600
}
</style>