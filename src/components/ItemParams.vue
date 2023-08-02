<template>
  <li>
    <div v-if="equalityParams && param === 'strength'">
      все статы: {{ item.params.strength }}
    </div>
    <div v-else-if="item.params[param] && itemParams[param]">
      <span v-if="param === 'manaburn'">
        {{ itemParams[param] }} {{ item.params[param] }} маны противнику
      </span>
      <span v-else-if="param === 'critical_chance'">
        {{ itemParams[param] }} {{ item.params[param] }}% на x{{
          item.params.critical_value
        }}
      </span>
      <span v-else-if="param === 'block_chance'">
        {{ item.params[param] }}% на блок {{ item.params.block_value }} урона
      </span>
      <span v-else> {{ itemParams[param] }}: {{ item.params[param] }} </span>
      <span
        v-if="
          [
            'as',
            'mp_regeneration',
            'resist',
            'distant_resist',
            'evade',
          ].includes(param)
        "
      >
        %
      </span>
    </div>
  </li>
</template>
<script setup>
import { toRefs } from 'vue'

import { itemParams } from '@/common/itemParams'

const props = defineProps({
  item: {
    default: () => {},
    type: Object,
  },
  param: {
    default: '',
    type: String,
  },
  equalityParams: {
    default: false,
    type: Boolean,
  },
})
const { item, param, equalityParams } = toRefs(props)
</script>
