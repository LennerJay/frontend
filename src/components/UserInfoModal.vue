<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-60 items-center justify-center font-poppins z-40"
  >
    <div class="relative bg-white md:max-w-lg max-w-sm mx-auto md:mt-20 mt-10 border-4 border-sky-950 rounded-xl max-h-[40rem] overflow-y-auto p-8">
      <button @click="emits('close')" id="close-btn">
          <i class="bi bi-x-lg"></i>
          <span></span>
        </button>
      <div class="flex mt-4">
        <div class="text-2xl font-semibold text-center bg-sky-950 text-white mb-2 w-full">
          <p>Student Details</p>
        </div>
      </div>
      <div v-if="showData" class="showdata-container">
        <div v-if="userInfo.length != 0">
          <div class="flex flex-col w-full h-full">
            <div class="grid gap-2 lg:grid-cols-2 sm-grid-cols-2">
              <div class="w-full text-left">
                <div class="label">
                  <p>Id number</p>
                </div>
                <div>
                  <p>{{ userInfo.id_number }}</p>
                </div>
              </div>
              <div class="w-full text-left">
                <div class="label">
                  <p>Fullname</p>
                </div>
                <div>
                  <p>{{ userInfo.fullname }}</p>
                </div>
              </div>
            </div>
            <hr class="bg-sky-950 w-full my-2">
            <div class="grid gap-2 lg:grid-cols-2 sm-grid-cols-2">
              <div class="w-full text-left">
                <div class="label">
                  <p>Course</p>
                </div>
                <div>
                  <p>{{ userInfo.course }}</p>
                </div>
              </div>
              <div class="w-full text-left">
                <div class="label">
                  <p>Status</p>
                </div>
                <div>
                  <p>{{ userInfo.section_years.length != 0 ? 'Irregular': 'Regular' }}</p>
                </div>
              </div>
            </div>
            <hr class="bg-sky-950 w-full my-2">
            <div class="grid gap-2 lg:grid-cols-2 sm-grid-cols-2">
              <div class="w-full text-left">
                <div class="label">
                  <p>Year & Sections</p>
                </div>
                <div>
                  <p>{{ userInfo.section_years.join(', ') }}</p>
                </div>
              </div>
              <div class="w-full text-left">
                <div class="label">
                  <p>Mobile Number</p>
                </div>
                <div>
                  <p>{{ userInfo.mobile_number }}</p>
                </div>
              </div>
            </div>
            <hr class="bg-sky-950 w-full my-2">
            <div class="grid gap-2 lg:grid-cols-2 sm-grid-cols-2">
              <div class="w-full text-left">
                <div class="label">
                  <p>Email</p>
                </div>
                <div>
                  <p>{{ userInfo.email }}</p>
                </div>
              </div>
              <div class="w-full text-left">
              </div>
            </div>
            <hr class="bg-sky-950 w-full my-2">
          </div>
        </div><!-- End of user-info length -->
        <div v-else>
          Student Info not yet updated
        </div>
        <div class="flex justify-end space-x-4 button-container mt-2">
          <button
            @click="emits('close')"
            class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
          <button
            @click="showWarningModal = true"
            class="bg-sky-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Remove
          </button>
        </div>
      </div>
      <div
      v-else
        class="bg-white p-[12px] px-16  max-w-lg mx-auto mt-32 max-h-[26rem] flex"
      >
        <div class="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
        </div>

        <div class="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div class="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
        </div>
      </div>
      <Transition name="fade" v-if="showActionModal">
          <ActionModal data="Removed" @closeAction="emits('close')" />
        </Transition>
        <Transition name="fade">
          <ActionSpinnerAnimation v-if="showActionSpinner" data="Removing" />
        </Transition>
        <Transition name="fade">
          <WarningModal
            v-if="showWarningModal"
            :data="'UserInfo'"
            @ClickDelete="handleRemove"
            @CancelDelete="showWarningModal = false"
          />
        </Transition>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import ActionSpinnerAnimation from "./ActionSpinnerAnimation.vue";
import ActionModal from "./ActionModal.vue";
import WarningModal from "./WarningModal.vue";

const props = defineProps(["userInfo","showData","showActionSpinner","showActionModal","actionModalData"]);
const emits = defineEmits([
  'close',
  'removeClick'
]);

const showWarningModal = ref(false)


const handleRemove = ()=>{
  showWarningModal.value = false;
  emits('removeClick',props.userInfo.userInfo_id)
}

</script>

<style scoped>
    .loader{
      left:72px
    }
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
      left: 94%;
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
