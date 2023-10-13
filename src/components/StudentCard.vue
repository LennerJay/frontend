<template>
    <div class="bg-gradient-to-r from-blue-800 to-cyan-500">
        <div class="container mx-auto p-4 mt-4 mb-4 bg-white">
            <form @submit.prevent="editProfile">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-4 text-center">
              <div class="profile-img">
                <img src="../assets/idpicture.jpg" alt="" class="w-3/4 h-auto mx-auto">
              </div>
            </div>
            <div class="md:col-span-6 p-10">
              <div class="profile-head">
                <h5 class="text-gray-800">{{ profileName }}</h5>
                <h6 class="text-blue-600">{{ profileTitle }}</h6>
                <p class="proile-rating text-sm text-gray-600">Department : <span class="font-semibold">{{ department }}</span></p>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item">
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:col-span-2 pt-10 pl-10">
              <button type="submit" class="profile-edit-btn bg-blue-300 text-gray-700 rounded-lg py-1 px-2 font-semibold w-3/4 mx-auto">Edit Profile</button>
            </div>
                </div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
            <div class="md:col-span-4">
              <div class="profile-work p-14 -mt-15">
                <p class="text-sm text-gray-600 font-semibold">WORK LINK</p>
                <a v-for="link in workLinks" :key="link" class="block text-blue-600 font-semibold mt-1">{{ link }}</a>
                <p class="text-sm text-gray-600 font-semibold mt-10">SKILLS</p>
                <a v-for="skill in skills" :key="skill" class="block text-blue-600 font-semibold mt-1">{{ skill }}</a>
              </div>
            </div>
          </div>
            </form>
        </div>
    </div>
</template>

<script setup>
const activeTab = 'About'
const profileName = 'Kshiti Ghelani'
const profileTitle = 'Web Developer and Designer'
const department = 'BSIT'
const workLinks = ['Website Link', 'Bootsnipp Profile', 'Bootply Profile']
const skills = ['Web Designer', 'Web Developer', 'WordPress', 'WooCommerce', 'PHP, .Net']
const editProfile = () => {

}
</script>