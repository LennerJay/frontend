<template>
  <div class="flex md:pb-0 pb-2">
    <label
      for="entity"
      class="block{{ isEvaluateeRoute ? 'text-white' : 'text-black' }} mr-2"
      >Filter:
    </label>
    <select
      v-model="entity"
      name="entity"
      id="entity"
      @change="$emit('handleSelect', entity)"
      class="focus:outline-none md:w-44 h-6 text-center border text-black border-gray-300 rounded-md"
    >
      <option value="All">All</option>
      <option
        v-for="(entity, entityIndex) in entities"
        :key="entity + entityIndex"
        :value="entity.entity_name"
      >
        {{ entity.entity_name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  entity: String,
  entities: Object,
});

const entity = ref(props.entity);
const isEvaluateeRoute = computed(() => route.name === "evaluatees");
</script>

<style lang="scss" scoped></style>
