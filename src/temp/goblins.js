export const goblins = {
  data: {
    data: [
      {
        id: 1,
        attributes: {
          name: 'Cталкер',
          description:
            'Этот гоблин помешан на нестабильных электрических приспособлениях и нередко пользуется ими для устранения особенно надоедливых врагов, которых он любит подпустить поближе, прежде, чем поджарить. А на случай, если электричество его подведёт - у него всегда есть его любимый дробовик.',
          mainParam: 'Сила',
          src: {
            data: {
              id: 1,
              attributes: {
                name: 'gunner.png',
                alternativeText: 'gunner.png',
                caption: 'gunner.png',
                width: 64,
                height: 64,
                formats: null,
                hash: 'gunner_b3e456982c',
                ext: '.png',
                mime: 'image/png',
                size: 4.19,
                url: '/uploads/gunner_b3e456982c.png',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
              },
            },
          },
          stats: {
            id: 1,
            strength: 20,
            agility: 10,
            intelligence: 10,
          },
          items: {
            data: [
              {
                id: 15,
                attributes: {
                  name: 'Арканитовое ружье',
                  level: 0,
                  description:
                    '5% шанс оглушить цель и нанести 120 урона <br/> 5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 18,
                attributes: {
                  name: 'Арканитовая снайперка',
                  level: 20,
                  description:
                    '5% шанс оглушить цель и нанести 120 урона <br/> 5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 25,
                attributes: {
                  name: 'Самозарядный дробовик',
                  level: null,
                  description:
                    'Стан (5%, 0,5с, 1500) <br/> 5% шанс нанести двойной урон',
                  craft: null,
                },
              },
              {
                id: 29,
                attributes: {
                  name: 'Каратель',
                  level: 50,
                  description:
                    ' 5% шанс на стан (0,5с, 5000 урона), <br/> 5% шанс на крит (х4), <br/> 30% при убийстве снизить защиту ближайших врагов на 30 на 10с',
                  craft: null,
                },
              },
              {
                id: 31,
                attributes: {
                  name: 'Пронзающий душу',
                  level: 50,
                  description:
                    '5% шанс нанести (Ловкость) урона,<br/> 5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 32,
                attributes: {
                  name: 'Охотник',
                  level: 70,
                  description:
                    '5% шанс нанести х4 урона<br/>30% при убийстве снизить защиту ближайших врагов на 65 на 5с',
                  craft: null,
                },
              },
              {
                id: 250,
                attributes: {
                  name: 'Колючий Преградитель',
                  level: 70,
                  description:
                    '60% шанс на блок 400 урона<br/>Возвращает 700 урона',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 300,
                attributes: {
                  name: 'Алла',
                  level: 40,
                  description: 'Шанс на стан 4% (1с, 2500 урона)',
                  craft: 'Великая кузница',
                },
              },
            ],
          },
          stats_increase: {
            id: 8,
            strength: 2.5,
            agility: 1.2,
            intelligence: 1,
            ms: 270,
            as: 0.59,
            as_max: 2.950000000000001,
          },
        },
      },
      {
        id: 2,
        attributes: {
          name: 'Пироманьяк',
          description:
            'Многие гоблины любят всё подрывать. Но не этот. Пироманьяк любит когда вещи медленно сгорают в пламени, и не имеет значения, живое оно, или нет, дружелюбное, или враждебное. Пусть горит! Огонь сам разберется. Специализируется на сжигании масс врагов и восстановлении здоровья при убийстве.',
          mainParam: 'Сила',
          src: {
            data: {
              id: 2,
              attributes: {
                name: 'piro.png',
                alternativeText: 'piro.png',
                caption: 'piro.png',
                width: 64,
                height: 64,
                formats: null,
                hash: 'piro_5f9f888259',
                ext: '.png',
                mime: 'image/png',
                size: 4.69,
                url: '/uploads/piro_5f9f888259.png',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
              },
            },
          },
          stats: {
            id: 2,
            strength: 20,
            agility: 10,
            intelligence: 10,
          },
          items: {
            data: [
              {
                id: 305,
                attributes: {
                  name: 'Зажигалка',
                  level: 10,
                  description: 'При убийстве +50 здоровья',
                  craft: null,
                },
              },
              {
                id: 306,
                attributes: {
                  name: 'Огнемёт',
                  level: null,
                  description: null,
                  craft: null,
                },
              },
              {
                id: 327,
                attributes: {
                  name: 'Прожигатель',
                  level: 50,
                  description:
                    '5% шанс сжечь 500 маны и 250 хп<br/>5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 342,
                attributes: {
                  name: 'Пугающий тулуп',
                  level: 60,
                  description: '20% шанс на блок 800 урона.',
                  craft: null,
                },
              },
            ],
          },
          stats_increase: {
            id: 6,
            strength: 2.5,
            agility: 1,
            intelligence: 1.2,
            ms: 230,
            as: 1.2500000000000002,
            as_max: 6.249999999999995,
          },
        },
      },
      {
        id: 3,
        attributes: {
          name: 'Ракетчик',
          description:
            'Вот пример истинного гоблинского духа. В руках ракетница, за спиной бочка с порохом, в глазах желание всё взрывать. Специализируется на оглушении больших масс врагов.',
          mainParam: 'Сила',
          src: {
            data: {
              id: 3,
              attributes: {
                name: 'gunner.png',
                alternativeText: 'gunner.png',
                caption: 'gunner.png',
                width: 64,
                height: 64,
                formats: null,
                hash: 'gunner_a49f4c80b6',
                ext: '.png',
                mime: 'image/png',
                size: 4.19,
                url: '/uploads/gunner_a49f4c80b6.png',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
              },
            },
          },
          stats: {
            id: 3,
            strength: 20,
            agility: 10,
            intelligence: 10,
          },
          items: {
            data: [
              {
                id: 206,
                attributes: {
                  name: 'Сет Бомбса',
                  level: 35,
                  description: 'Шанс 2% на стан (1сек, 3500 урона)',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 209,
                attributes: {
                  name: 'Базука',
                  level: null,
                  description: null,
                  craft: null,
                },
              },
              {
                id: 210,
                attributes: {
                  name: 'Железная базука',
                  level: null,
                  description: '5% шанс оглушить цель и нанести 20 урона',
                  craft: null,
                },
              },
              {
                id: 211,
                attributes: {
                  name: 'Железная гаубица',
                  level: 20,
                  description: '2% шанс на стан (1с и 1500 урона)',
                  craft: null,
                },
              },
              {
                id: 219,
                attributes: {
                  name: 'Сет Бомбса v2.0',
                  level: 40,
                  description: 'Шанс 2% на стан (1сек, 10000 урона)',
                  craft: 'Ангельская кузница',
                },
              },
              {
                id: 220,
                attributes: {
                  name: 'Сет Бомбса v3.0',
                  level: 200,
                  description: '2% шанс на стан (2с, 10000 урона)',
                  craft: 'Вневременная кузня',
                },
              },
              {
                id: 295,
                attributes: {
                  name: 'Разрушитель материи',
                  level: 50,
                  description:
                    '5% шанс нанести 600 АОЕ урона<br/>5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 299,
                attributes: {
                  name: 'Жажда наживы',
                  level: 40,
                  description:
                    'После убийства врага во все стороны разлетаются осколки, наносящие 400 урона, и оглушающие на 0,5с<br/>5% шанс нанести тройной урон',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 304,
                attributes: {
                  name: 'Бум-Стик А-2',
                  level: 10,
                  description:
                    '35% шанс, что при смерти цель взорвется, нанеся 50 урона всем юнитам вокруг.<br/>5% шанс нанести двойной урон',
                  craft: null,
                },
              },
              {
                id: 342,
                attributes: {
                  name: 'Пугающий тулуп',
                  level: 60,
                  description: '20% шанс на блок 800 урона.',
                  craft: null,
                },
              },
            ],
          },
          stats_increase: {
            id: 7,
            strength: 2.5,
            agility: 1,
            intelligence: 1.2,
            ms: 200,
            as: 0.59,
            as_max: 2.95,
          },
        },
      },
      {
        id: 4,
        attributes: {
          name: 'Инженер',
          description:
            'Ни у кого не вызывает сомнения, что гоблины - лучшие инженеры во всём Азероте. Но настоящего мастерства в этом деле добиваются лишь те гоблины, которые посвящают ему всю жизнь. Ни одна экспедиция не начинается без инженера, однако в бою он значительно слабее других классов.',
          mainParam: 'Интеллект',
          src: {
            data: {
              id: 4,
              attributes: {
                name: 'gunner.png',
                alternativeText: 'gunner.png',
                caption: 'gunner.png',
                width: 64,
                height: 64,
                formats: null,
                hash: 'gunner_893a237162',
                ext: '.png',
                mime: 'image/png',
                size: 4.19,
                url: '/uploads/gunner_893a237162.png',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
              },
            },
          },
          stats: {
            id: 4,
            strength: 10,
            agility: 10,
            intelligence: 15,
          },
          items: {
            data: [
              {
                id: 34,
                attributes: {
                  name: 'Кирка рабовладельца',
                  level: 10,
                  description: 'Аккуратная добыча руды (+1)',
                  craft: null,
                },
              },
              {
                id: 36,
                attributes: {
                  name: 'Сет Рабовладельца',
                  level: 15,
                  description: 'Аккуратная добыча руды (+2)',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 38,
                attributes: {
                  name: 'Сет Рабовладельца v2.0',
                  level: 20,
                  description: 'Аккуратная добыча руды (+4)',
                  craft: 'Ангельская кузница',
                },
              },
              {
                id: 40,
                attributes: {
                  name: 'Сет Рабовладельца v3.0',
                  level: 200,
                  description: 'Вневременная добыча руды (+7)',
                  craft: 'Вневременная кузня',
                },
              },
              {
                id: 111,
                attributes: {
                  name: 'Демоническая кирка',
                  level: 25,
                  description:
                    'Аккуратная добыча руды (+4), Шанс оглушить цель 5%',
                  craft: null,
                },
              },
              {
                id: 194,
                attributes: {
                  name: 'Душеглот',
                  level: 50,
                  description:
                    '80% шанс при убийстве получить 100 маны|n5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 255,
                attributes: {
                  name: 'Повреждённый техно-модуль',
                  level: 35,
                  description: 'Двойной Ремонт<br/>Микро-обработка руды (+4)',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 257,
                attributes: {
                  name: 'Техно-модуль',
                  level: 45,
                  description: 'Тройной Ремонт<br/>Микро-обработка руды (+5)',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 258,
                attributes: {
                  name: 'Нано-кирка',
                  level: 50,
                  description:
                    'Ремонт усилен в 5 раз<br/>Нано-обработка руды (+6)',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 259,
                attributes: {
                  name: 'Алхимические когти',
                  level: 65,
                  description:
                    '5% шанс при атаке нанести дополнительно (ЗОЛОТО) урона<br/>Нано-обработка руды (+6)<br/>Шанс при добыче дополнительно добыть золото',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 260,
                attributes: {
                  name: 'Смертельная Кирка',
                  level: 100,
                  description:
                    '2% шанс при атаке (СИЛ х1 + ЛОВК х1 + Золото х0.2) урона<br/>5% шанс при получении урона (Золото х1) урона, +200хп и мп<br/>Нано-обработка руды (+6)',
                  craft: 'Великая кузница',
                },
              },
            ],
          },
          stats_increase: {
            id: 2,
            strength: 1,
            agility: 1.2,
            intelligence: 2.5,
            ms: 270,
            as: 0.6699999999999997,
            as_max: 3.3499999999999925,
          },
        },
      },
      {
        id: 5,
        attributes: {
          name: 'Медик',
          description:
            'Как известно, некоторые гоблины занимаются алхимией. В основном их зелья взрываются при определенных обстоятельствах, но иногда полученные субстанции дают и положительные исцеляющие эффекты. Но даже тогда не факт, что исцеляющее зелье не взорвется внутри выпившего...',
          mainParam: 'Интеллект',
          src: {
            data: {
              id: 5,
              attributes: {
                name: 'medic.png',
                alternativeText: 'medic.png',
                caption: 'medic.png',
                width: 64,
                height: 64,
                formats: null,
                hash: 'medic_2eaa6aea81',
                ext: '.png',
                mime: 'image/png',
                size: 4.82,
                url: '/uploads/medic_2eaa6aea81.png',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
              },
            },
          },
          stats: {
            id: 5,
            strength: 10,
            agility: 10,
            intelligence: 20,
          },
          items: {
            data: [
              {
                id: 43,
                attributes: {
                  name: 'Шарострел',
                  level: null,
                  description: null,
                  craft: null,
                },
              },
              {
                id: 44,
                attributes: {
                  name: 'Мед-Протез',
                  level: 10,
                  description:
                    'Автолечение (75 хп, раз в 5 секунд).,<br/> 30% шанс при атаке нанести урон врагу, равный интеллекту.,<br/> 5% шанс нанести в 2 раза больше урона',
                  craft: null,
                },
              },
              {
                id: 189,
                attributes: {
                  name: 'Нейро-балон',
                  level: 25,
                  description:
                    'При убийстве врага 15% шанс восстановить союзникам вокруг 60 маны',
                  craft: null,
                },
              },
              {
                id: 190,
                attributes: {
                  name: 'Нейрохилотрон-500',
                  level: 80,
                  description: 'При убийстве восстанавливает 50мп союзникам',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 192,
                attributes: {
                  name: 'Царская Любовь',
                  level: 45,
                  description:
                    'Хим-выстрел +30%: 30% шанс заглушить вражескую цель на 10 сек',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 194,
                attributes: {
                  name: 'Душеглот',
                  level: 50,
                  description:
                    '80% шанс при убийстве получить 100 маны|n5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 195,
                attributes: {
                  name: 'Непрощающий',
                  level: 85,
                  description:
                    '10% шанс при получении урона от демона нанести 10000 урона<br/>10% шанс при убийстве восстановить 2500 мп',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 197,
                attributes: {
                  name: 'Кровавый Пакт',
                  level: 100,
                  description:
                    '5% шанс при касте Хим-выстрела призвать Кровавого прислужника на 30с, предотвращая произнесение заклинаний ближайшими врагами на 3с',
                  craft: 'Великая кузница',
                },
              },
            ],
          },
          stats_increase: {
            id: 5,
            strength: 1,
            agility: 1.2,
            intelligence: 2.5,
            ms: 270,
            as: 0.49999999999999956,
            as_max: 2.5000000000000107,
          },
        },
      },
      {
        id: 6,
        attributes: {
          name: 'Подрывник',
          description:
            'Эта гоблинша начинала как инженер по телепортам. Но когда выяснилось, что взрывать подопытных у неё получается лучше, чем телепортировать - она решила, что нашла своё призвание.',
          mainParam: 'Интеллект',
          src: {
            data: {
              id: 6,
              attributes: {
                name: 'exploder.png',
                alternativeText: 'exploder.png',
                caption: 'exploder.png',
                width: 64,
                height: 64,
                formats: null,
                hash: 'exploder_676cbcae40',
                ext: '.png',
                mime: 'image/png',
                size: 4.81,
                url: '/uploads/exploder_676cbcae40.png',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
              },
            },
          },
          stats: {
            id: 6,
            strength: 10,
            agility: 10,
            intelligence: 15,
          },
          items: {
            data: [
              {
                id: 214,
                attributes: {
                  name: 'Мешок взрывчатки',
                  level: 20,
                  description: null,
                  craft: null,
                },
              },
              {
                id: 215,
                attributes: {
                  name: 'Сет Сапёра',
                  level: 35,
                  description: null,
                  craft: 'Великая кузница',
                },
              },
              {
                id: 221,
                attributes: {
                  name: 'Сет Сапёра v2.0',
                  level: 40,
                  description: null,
                  craft: 'Ангельская кузница',
                },
              },
              {
                id: 222,
                attributes: {
                  name: 'Сет Сапёра v3.0',
                  level: 200,
                  description: null,
                  craft: 'Вневременная кузня',
                },
              },
              {
                id: 292,
                attributes: {
                  name: 'Питарды',
                  level: null,
                  description: null,
                  craft: null,
                },
              },
              {
                id: 293,
                attributes: {
                  name: 'Осколочный миноукладчик',
                  level: 25,
                  description:
                    '50% шанс при убийстве минным полем: стан на 3 сек в АОЕ, +500 урона от взрыва',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 294,
                attributes: {
                  name: 'Кислобум-8000',
                  level: 30,
                  description:
                    'При использовании способностей подрывника (кроме самоподрыва) с шансом 20% Самоподрыв восстанавливается.',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 295,
                attributes: {
                  name: 'Разрушитель материи',
                  level: 50,
                  description:
                    '5% шанс нанести 600 АОЕ урона<br/>5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 296,
                attributes: {
                  name: 'Эксперимент-ХВ00-М',
                  level: 80,
                  description:
                    'Раз в 5 секунд наносит 12000 урона<br/>50% шанс при убийстве +100мп и АОЕ стан (3с)<br/>При использовании магии с шансом 40% "Самоподрыв" перезаряжается.',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 297,
                attributes: {
                  name: 'Глотатель Страха',
                  level: 60,
                  description:
                    '7% шанс при касте и 7% при убийстве восстановить ману, равную Разум*1,5',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 328,
                attributes: {
                  name: 'Повреждённый реактор',
                  level: 35,
                  description: 'Самоподрыв наносит удвоенный урон',
                  craft: null,
                },
              },
              {
                id: 329,
                attributes: {
                  name: 'Броня Смертника',
                  level: 100,
                  description: 'Самоподрыв восстанавливает 10% здоровья',
                  craft: 'Демоническая кузница',
                },
              },
              {
                id: 330,
                attributes: {
                  name: 'Ядерный реактор',
                  level: 48,
                  description: 'Самоподрыв наносит утроенный урон',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 334,
                attributes: {
                  name: 'Разрушитель Времени',
                  level: 160,
                  description:
                    'Раз в 5 секунд 25000 урона<br/>Урон от Самоподрыва + (МП + РАЗх10) урона, +5%хп<br/>При использовании способностей с шансом 60% Самоподрыв перезаряжается',
                  craft: 'Вневременная кузня',
                },
              },
            ],
          },
          stats_increase: {
            id: 4,
            strength: 1.2,
            agility: 1,
            intelligence: 2.5,
            ms: 250,
            as: 0.67,
            as_max: 3.35,
          },
        },
      },
      {
        id: 7,
        attributes: {
          name: 'Снайпер',
          description:
            'Некоторые гоблины предпочитают оставаться вдали от уничтожаемых жертв. Гоблин-снайпер - отличный тому пример. Искусно сделанная винтовка с невероятно точным прицелом позволяет ему вести стрельбу на огромном расстоянии.',
          mainParam: 'Ловкость',
          src: {
            data: {
              id: 7,
              attributes: {
                name: 'sniper.png',
                alternativeText: 'sniper.png',
                caption: 'sniper.png',
                width: 64,
                height: 64,
                formats: null,
                hash: 'sniper_478d18b712',
                ext: '.png',
                mime: 'image/png',
                size: 4.11,
                url: '/uploads/sniper_478d18b712.png',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
              },
            },
          },
          stats: {
            id: 7,
            strength: 10,
            agility: 25,
            intelligence: 10,
          },
          items: {
            data: [
              {
                id: 15,
                attributes: {
                  name: 'Арканитовое ружье',
                  level: 0,
                  description:
                    '5% шанс оглушить цель и нанести 120 урона <br/> 5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 18,
                attributes: {
                  name: 'Арканитовая снайперка',
                  level: 20,
                  description:
                    '5% шанс оглушить цель и нанести 120 урона <br/> 5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 31,
                attributes: {
                  name: 'Пронзающий душу',
                  level: 50,
                  description:
                    '5% шанс нанести (Ловкость) урона,<br/> 5% шанс нанести тройной урон',
                  craft: null,
                },
              },
              {
                id: 300,
                attributes: {
                  name: 'Алла',
                  level: 40,
                  description: 'Шанс на стан 4% (1с, 2500 урона)',
                  craft: 'Великая кузница',
                },
              },
            ],
          },
          stats_increase: {
            id: 3,
            strength: 1,
            agility: 2.5,
            intelligence: 1.2,
            ms: 270,
            as: 0.25,
            as_max: 1.25,
          },
        },
      },
      {
        id: 8,
        attributes: {
          name: 'Пулемётчик',
          description:
            'Гоблин-пулеметчик - отличный стрелок, а также очень опытный командир. Он вдохновляет своих товарищей веселыми шутками, и стратегически распределяет силы гоблинов для обороны базы. Но также он может стать очень замкнутым и заботиться лишь о себе, забыв о товарищах.',
          mainParam: 'Ловкость',
          src: {
            data: {
              id: 8,
              attributes: {
                name: 'gunner.png',
                alternativeText: 'gunner.png',
                caption: 'gunner.png',
                width: 64,
                height: 64,
                formats: null,
                hash: 'gunner_5f48236512',
                ext: '.png',
                mime: 'image/png',
                size: 4.19,
                url: '/uploads/gunner_5f48236512.png',
                previewUrl: null,
                provider: 'local',
                provider_metadata: null,
              },
            },
          },
          stats: {
            id: 8,
            strength: 15,
            agility: 15,
            intelligence: 10,
          },
          items: {
            data: [
              {
                id: 261,
                attributes: {
                  name: 'Пылающий пронзатель',
                  level: 65,
                  description:
                    'Крит (5%, x5)<br/>5% шанс на прострел (47000 урона)',
                  craft: 'Великая кузница',
                },
              },
              {
                id: 327,
                attributes: {
                  name: 'Прожигатель',
                  level: 50,
                  description:
                    '5% шанс сжечь 500 маны и 250 хп<br/>5% шанс нанести тройной урон',
                  craft: null,
                },
              },
            ],
          },
          stats_increase: {
            id: 1,
            strength: 1,
            agility: 2.5,
            intelligence: 1.2,
            ms: 270,
            as: 1.11,
            as_max: 5.55,
          },
        },
      },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 500,
        pageCount: 1,
        total: 8,
      },
    },
  },
}
