<script setup>
import BaseLink from '@/components/BaseLink.vue'
</script>

<template>
  <div class="fixed top-0 z-20 flex items-start">
    <img src="/images/t1.png" style="margin-left: -512px" class="pointer-events-none" />
    <img src="/images/t1.png" class="pointer-events-none" />
    <img src="/images/t2.png" class="pointer-events-none" />
    <img src="/images/t3.png" class="pointer-events-none" />
    <img src="/images/t4.png" class="pointer-events-none" />
    <img
      src="/images/t1.png"
      style="margin-right: -512px; height: 61px"
      class="pointer-events-none"
    />

    <!-- Основное меню -->
    <div class="absolute w-lg">
      <BaseLink title="Главная" link="/" class="absolute left-10 top-2 z-1" />
      <BaseLink title="Крафт" link="/craft" class="absolute top-2 z-1 left-56" />
      <BaseLink title="Боссы" link="/boss" class="absolute right-12 top-2 z-1" />
    </div>

    <!-- Дополнительное меню -->
    <div class="absolute ml-128 w-lg">
      <BaseLink title="Квесты" link="/quest" class="absolute left-12 top-2 z-1" />
      <BaseLink title="О проекте" link="/about" class="absolute -right-4 top-2 z-1" />
    </div>

    <!-- Информационная панель -->
    <div class="absolute ml-256 w-lg">
      <div class="absolute left-20 top-2 text-orange font-extrabold text-xl">Version 1.5b3+</div>
      <a
        href="https://discord.gg/3rhvtTWU"
        target="_blank"
        class="absolute -right-13 my-3 font-medium text-link transition-all hover:scale-110 hover:text-active"
      >
        Гоблины в Discord
      </a>
    </div>
  </div>
</template>
