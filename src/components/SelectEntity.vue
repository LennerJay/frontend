<template>
  <div>
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
      class="focus:outline-none rounded-2xl text-black text-center "
    >
      <option value="All">All</option>
      <option
        v-for="(entity, entityIndex) in entities"
        :key="entityIndex"
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
  entities:Object
});

const entity = ref(props.entity);
const isEvaluateeRoute = computed(() => route.name === "evaluatees");


</script>

<style lang="scss" scoped></style>
