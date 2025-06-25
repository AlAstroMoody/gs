<script setup></script>
<template>
  <div class="absolute inset-0 flex h-screen flex-col bg-opacity-75 z-20">
    <div
      class="fixed left-0 top-0 z-10 flex w-fit flex-col gap-2 rounded-sm bg-silver p-2 text-purple max-w-80"
    >
      Точки:
      <br />
      Оранжевый – местоположение табличек
      <br />
      Зелёный – местоположение кобольда
      <br />
      Красный – местоположение бочек со взрывчаткой попса
      <br />
      <br />
      Области:
      <br />
      Белый контур – где необходимо использовать стабилизаторы после расширения дыры
    </div>
    <img src="/images/map.webp" />
  </div>
</template>
