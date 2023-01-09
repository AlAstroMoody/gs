<template>
  <main>
    <Renderer
      ref="renderer"
      resize
      antialias
      :orbit-ctrl="{
        autoRotate: true,
        dampingFactor: 0.05,
      }"
      pointer
    >
      <Camera :position="{ x: 0, y: 50, z: 10 }" />
      <Scene background="#000000">
        <!-- <PointLight
          ref="light"
          :intensity="0.4"
          :position="{ x: 20, y: 20, z: 30 }"
        >
          <Sphere :radius="0.3" />
        </PointLight> -->
        <PointLight
          ref="light"
          :intensity="0.4"
          :position="{ x: 0, y: 0, z: 0 }"
        >
          <Sphere :radius="0.3" />
        </PointLight>
        <Box
          :position="boxPosition(index)"
          :scale="{ x: 5, y: 5, z: 5 }"
          v-for="(goblin, index) in goblins"
          :key="index"
          @click="showInfo($event, goblin, index)"
          ref="box"
        >
          <BasicMaterial>
            <Texture :src="goblin.src" />
          </BasicMaterial>
        </Box>
      </Scene>
      <EffectComposer>
        <RenderPass />
        <UnrealBloomPass :strength="0.3" />
        <FXAAPass />
      </EffectComposer>
    </Renderer>
    <div class="absolute top-3 block w-full text-center font-medium lg:text-xl">
      {{ text }}
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'

import { useGoblinState } from '@/components/composibles/useGoblinState'
import { store } from '@/components/composibles/store.js'

import { RepeatWrapping } from 'three'
import {
  Box,
  BasicMaterial,
  CubeTexture,
  Camera,
  EffectComposer,
  FXAAPass,
  Group,
  Renderer,
  Plane,
  PointLight,
  RectAreaLight,
  RenderPass,
  Scene,
  Sphere,
  StandardMaterial,
  Texture,
  UnrealBloomPass,
} from 'troisjs'

const goblins = computed(() => store.entities.goblins)
if (!goblins.value.length) await store.setItems('goblins')

const texturesProps = {
  repeat: { x: 10, y: 10 },
  wrapS: RepeatWrapping,
  wrapT: RepeatWrapping,
}

const rectLightsProps = {
  rotation: { x: -Math.PI / 2 },
  lookAt: { x: 0, y: 0, z: 1 },
  intensity: 1,
  width: 5,
  height: 5,
  helper: true,
}

const renderer = ref(null)
const light = ref(null)
const box = ref(null)
const text = ref('')

const boxPosition = (index) => {
  const coord = { x: 0, y: 0, z: 0 }
  if ([0, 3, 6].includes(index)) {
    coord.x = -7
  } else if ([2, 5].includes(index)) {
    coord.x = 7
  }
  if ([0, 1, 2].includes(index)) {
    coord.z = 7
  } else if ([6, 7].includes(index)) {
    coord.z = -7
  }
  if (coord.x === 0 && coord.z === 0) {
    coord.x = 7
    coord.z = -7
  }
  return coord
}

onMounted(() => {
  console.log('mount')
  nextTick(() => {
    const pointerV3 = renderer.value.three.pointer.positionV3
    // renderer.value.onBeforeRender(() => {
    //   light.value.light.position.copy(pointerV3)
    // })
  })
})

const showInfo = (event, goblin, index) => {
  console.log(event)
  console.log(goblin, index)
  text.value = goblin.name

  console.log(box.value[index])

  // event.component.rotation.set({ x: 6, y: 4, z: 4 })
  // event.scale.set({ x: 6, y: 4, z: 4 })
}
</script>
