import { defineStore } from 'pinia'

import { goblinClass, MainParams } from '@/common/enums'
import type { GoblinsInterface } from '@/common/interfaces'


export const useGoblinsStore = defineStore({
  id: 'goblins',
  state: () => ({
    goblins: <GoblinsInterface[]>[
      // temporary data, delete later
      {
        name: goblinClass.STALKER,
        src: '/src/assets/images/armor.png',
        id: 0,
        mainParam: MainParams.STRENGTH,
        stats: { strength: 15, agility: 20, intelligence: 10 },
        description: 'Этот гоблин помешан на нестабильных электрических приспособлениях и нередко пользуется ими для ' +
          'устранения особенно надоедливых врагов, которых он любит подпустить поближе, прежде, чем поджарить. ' +
          'А на случай ,если электричество его подведёт - у него всегда есть его любимый дробовик.'
      },
      {
        name: goblinClass.PYROMANIAC,
        src: '/src/assets/images/testGoblins/piro.png',
        id: 1,
        mainParam: MainParams.STRENGTH,
        stats: { strength: 15, agility: 10, intelligence: 20 },
        description: 'Многие гоблины любят всё подрывать. Но не этот. Пироманьяк любит когда вещи медленно сгорают в ' +
          'пламени, и не имеет значения, живое оно, или нет, дружелюбное, или враждебное. Пусть горит! Огонь сам ' +
          'разберется. Специализируется на сжигании масс врагов и восстановлении здоровья при убийстве.',
      },
      {
        name: goblinClass.ROCKET,
        src: '/src/assets/images/armor.png',
        id: 2,
        mainParam: MainParams.STRENGTH,
        stats: { strength: 20, agility: 10, intelligence: 10 },
        description: 'Вот пример истинного гоблинского духа. В руках ракетница, за спиной бочка с порохом, в глазах ' +
          'желание всё взрывать. Специализируется на оглушении больших масс врагов.',
      },
      {
        name: goblinClass.ENGINEER,
        src: '/src/assets/images/armor.png',
        id: 3,
        mainParam: MainParams.INTELLIGENCE,
        stats: { strength: 15, agility: 20, intelligence: 10 },
        description: 'Ни у кого не вызывает сомнения, что гоблины - лучшие инженеры во всём Азероте. Но настоящего ' +
          'мастерства в этом деле добиваются лишь те гоблины, которые посвящают ему всю жизнь. Ни одна экспедиция ' +
          'не начинается без инженера, однако в бою он значительно слабее других классов.'
      },
      {
        name: goblinClass.MEDIC,
        src: '/src/assets/images/testGoblins/medic.png',
        id: 4,
        mainParam: MainParams.INTELLIGENCE,
        stats: { strength: 20, agility: 10, intelligence: 10 },
        description: 'Как известно, некоторые гоблины занимаются алхимией. В основном их зелья взрываются при ' +
          'определенных обстоятельствах, но иногда полученные субстанции дают и положительные исцеляющие эффекты. ' +
          'Но даже тогда не факт, что исцеляющее зелье не взорвется внутри выпившего...',
      },
      {
        name: goblinClass.EXPLODER,
        src: '/src/assets/images/testGoblins/exploder.png',
        id: 5,
        mainParam: MainParams.INTELLIGENCE,
        stats: { strength: 15, agility: 20, intelligence: 10 },
        description: 'Эта гоблинша начинала как инженер по телепортам. Но когда выяснилось, что взрывать подопытных ' +
          'у неё получается лучше, чем телепортировать - она решила, что нашла своё призвание.'
      },
      {
        name: goblinClass.SNIPER,
        src: '/src/assets/images/testGoblins/sniper.png',
        id: 6,
        mainParam: MainParams.AGILITY,
        stats: { strength: 15, agility: 10, intelligence: 20 },
        description: 'Некоторые гоблины предпочитают оставаться вдали от уничтожаемых жертв. Гоблин-снайпер - ' +
          'отличный тому пример. Искусно сделанная винтовка с невероятно точным прицелом позволяет ему ' +
          'вести стрельбу на огромном расстоянии.',
      },
      {
        name: goblinClass.GUNNER,
        src: '/src/assets/images/testGoblins/gunner.png',
        id: 7,
        mainParam: MainParams.AGILITY,
        stats: { strength: 15, agility: 20, intelligence: 10 },
        description: 'Гоблин-пулеметчик - отличный стрелок, а также очень опытный командир. Он вдохновляет своих ' +
          'товарищей веселыми шутками, и стратегически распределяет силы гоблинов для обороны базы. Но также он ' +
          'может стать очень замкнутым и заботиться лишь о себе, забыв о товарищах.'
      },
    ],
  }),
  getters: {
    allGoblins: (state) => state.goblins,
  },
  actions: {
    getGoblins() {
      // here will receive data from server
    },
  },
})
