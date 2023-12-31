<template>
  <div
    class="fixed inset-0 bg-sky-950 bg-opacity-5 items-center justify-center font-Times New Roman"
    style="z-index: 10000"
  >
    <div
      class="bg-white p-8 max-w-md mx-auto mt-48 border-4 border-sky-950 rounded-xl max-h-[26rem] overflow-y-auto"
    >
      <div class="relative">
        <button class="fixed left-2" @click="closeModal">
          <i class="bi bi-x-lg"></i>
          <span></span>
        </button>
      </div>

      <div class="bg-sky-900 text-white text-lg w-full">{{ evaluateeName }}</div>
      <div v-if="showDetail">
        <div class="flex flex-col w-full border border-gray-400 mb-4">
          <div class="grid gap-2 grid-cols-2 w-full border-b border-gray-400">
            <div class="text-left border-r border-gray-400">
              <div class="label">
                <p>
                  Title: <br class="md:hidden block" />
                  {{ questionaire.title }}
                </p>
              </div>
            </div>
            <div class="text-left">
              <div class="label">
                <p>
                  Description: <br class="md:hidden block" />
                  {{ questionaire.description }}
                </p>
              </div>
            </div>
          </div>
          <div class="grid gap-2 grid-cols-2 w-full border-gray-400">
            <div class="text-left border-r border-gray-400">
              <div class="label">
                <p>
                  Semester: <br class="md:hidden block" />
                  {{ questionaire.semester }}
                </p>
              </div>
            </div>
            <div class="text-left">
              <div class="label">
                <p>
                  School Year: <br class="md:hidden block" />
                  {{ questionaire.school_year }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table v-for="summary in ratingSummary" class="border border-gray-400 my-4">
            <caption
              class="bg-sky-900 text-white text-center font-medium capitalize text-md"
            >
              {{
                summary.criteria
              }}
            </caption>
            <thead class="border-b border-gray-400">
              <tr>
                <th class="border-r border-gray-400">Question</th>
                <th>Rated</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="infoSummary in summary.summary" class="border-b border-gray-400">
                <td class="text-left border-r border-gray-400">
                  {{ infoSummary.question }}
                </td>
                <td>{{ infoSummary.rating }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else-if="props.noData">No data Found</div>
      <div
        v-else
        class="bg-white p-[10px] pl-5 pr-32 max-w-md mx-auto mt-48 max-h-[26rem] flex"
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
    </div>
  </div>
</template>
<script setup>
const props = defineProps([
  "questionaire",
  "ratingSummary",
  "evaluateeName",
  "showDetail",
  "noData",
]);
const emits = defineEmits(["close-modal"]);

const closeModal = () => {
  emits("close-modal");
};
// console.log(props.ratingSummary)
</script>

<style scoped>
.loader {
  --path: #2f3545;
  --dot: #5628ee;
  --duration: 3s;
  width: 44px;
  height: 44px;
  position: relative;
  bottom: 100px;
  left: 50px;
}

.loader:before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--dot);
  top: 37px;
  left: 19px;
  transform: translate(-18px, -18px);
  animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader svg rect,
.loader svg polygon,
.loader svg circle {
  fill: none;
  stroke: var(--path);
  stroke-width: 10px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.loader svg polygon {
  stroke-dasharray: 145 76 145 76;
  stroke-dashoffset: 0;
  animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg rect {
  stroke-dasharray: 192 64 192 64;
  stroke-dashoffset: 0;
  animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader svg circle {
  stroke-dasharray: 150 50 150 50;
  stroke-dashoffset: 75;
  animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader.triangle {
  width: 48px;
}

.loader.triangle:before {
  left: 21px;
  transform: translate(-10px, -18px);
  animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 74;
  }

  66% {
    stroke-dashoffset: 147;
  }

  100% {
    stroke-dashoffset: 221;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }

  66% {
    transform: translate(10px, -18px);
  }

  100% {
    transform: translate(-10px, -18px);
  }
}

@keyframes pathRect {
  25% {
    stroke-dashoffset: 64;
  }

  50% {
    stroke-dashoffset: 128;
  }

  75% {
    stroke-dashoffset: 192;
  }

  100% {
    stroke-dashoffset: 256;
  }
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -36px);
  }

  100% {
    transform: translate(-18px, -18px);
  }
}

@keyframes pathCircle {
  25% {
    stroke-dashoffset: 125;
  }

  50% {
    stroke-dashoffset: 175;
  }

  75% {
    stroke-dashoffset: 225;
  }

  100% {
    stroke-dashoffset: 275;
  }
}

.loader {
  display: inline-block;
  margin: 0 16px;
}

button {
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

button span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 2px solid rgb(109, 109, 109);
}

button span::before {
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

button:hover span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background-color: rgba(7, 89, 133, 1);
}

button:hover {
  color: white;
}

button:active span::before {
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
