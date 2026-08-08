/**
 * CONTENIDO DE LA CAMPAÑA — este es el único archivo que hay que tocar para
 * cambiar preguntas, catálogo, escalones o textos. No tiene lógica.
 *
 *  · questions — el cuestionario. `weight` es el peso relativo en el score y
 *    `scoringMode` decide cómo se compara (ver src/lib/scoring.ts).
 *  · movies / people — catálogo de las dos preguntas de elección múltiple.
 *    `popularity` 1 = de nicho, 5 = masiva: coincidir en algo de nicho suma
 *    mucho más.
 *  · tiers — escalones de premios, ordenados de mayor a menor.
 *  · copy — textos de la landing y microcopy.
 *
 * Agregar o sacar una pregunta no rompe los perfiles ya cargados: el motor sólo
 * puntúa lo que contestaron las dos personas.
 */
import type { CatalogItem, Question, Tier } from "./types";

export const CONTENT: {
  questions: Question[];
  movies: CatalogItem[];
  people: CatalogItem[];
  tiers: Tier[];
  copy: {
    landing: { hero: string; sub: string; cta: string; steps: { title: string; text: string; emoji: string }[] };
    micro: Record<string, string>;
  };
} = {
  "questions": [
    {
      "id": "pochoclo",
      "section": "sala",
      "prompt": "Pochoclo: ¿de qué lado estás?",
      "kind": "single",
      "options": [
        {
          "value": "dulce",
          "label": "Dulce, sin culpa",
          "emoji": "🍬"
        },
        {
          "value": "salado",
          "label": "Salado, es lo único serio",
          "emoji": "🧂"
        },
        {
          "value": "mitad-y-mitad",
          "label": "Mitad y mitad, soy diplomático",
          "emoji": "🤝"
        },
        {
          "value": "nachos",
          "label": "Nachos con cheddar, otra liga",
          "emoji": "🧀"
        },
        {
          "value": "nada",
          "label": "Nada, vine a ver la peli",
          "emoji": "🚫"
        }
      ],
      "scoringMode": "complement",
      "weight": 9,
      "revealCopy": "Lo que pide uno no es lo que pide el otro: eso no es una diferencia, es un balde compartido y la mano cruzada toda la función.",
      "clashCopy": "No se complementan: lo que uno quiere del candy, el otro ni lo mira. Cada uno con su balde.",
      "help": "Ojo que acá conviene NO coincidir. Después entendés por qué.",
      "complementPairs": [
        [
          "dulce",
          "salado"
        ],
        [
          "dulce",
          "nachos"
        ],
        [
          "salado",
          "nachos"
        ]
      ],
      "sameCopy": "Los dos quieren exactamente lo mismo y hay un solo balde. Va a haber forcejeo."
    },
    {
      "id": "genero-favorito",
      "section": "cine",
      "prompt": "Cartelera llena y tenés que elegir una sola. ¿Con qué género te vas?",
      "kind": "single",
      "options": [
        {
          "value": "comedia-romantica",
          "label": "Comedia romántica, sin culpa",
          "emoji": "💘"
        },
        {
          "value": "terror-suspenso",
          "label": "Terror del que no te deja dormir",
          "emoji": "😱"
        },
        {
          "value": "accion-blockbuster",
          "label": "Acción, explosiones y capas",
          "emoji": "💥"
        },
        {
          "value": "drama-autor",
          "label": "Drama de esos que te dejan mudo",
          "emoji": "🎭"
        },
        {
          "value": "animacion",
          "label": "Animada (y sí, lloro)",
          "emoji": "🧸"
        },
        {
          "value": "documental-true-crime",
          "label": "Documental o true crime",
          "emoji": "🔎"
        }
      ],
      "scoringMode": "match",
      "weight": 9,
      "revealCopy": "Entran a la misma sala sin discutir en la boletería. Raro y hermoso.",
      "clashCopy": "Uno quiere llorar y el otro quiere gritar. Igual la butaca es la misma.",
      "help": "La que elegirías de verdad, no la que queda bien decir."
    },
    {
      "id": "ubicacion-sala",
      "section": "sala",
      "prompt": "La sala está vacía y podés elegir. ¿Dónde te sentás?",
      "kind": "single",
      "options": [
        {
          "value": "centro-exacto",
          "label": "Centro exacto, fila del medio, es ciencia",
          "emoji": "🎯"
        },
        {
          "value": "ultima-fila",
          "label": "Última fila, panorámica total",
          "emoji": "🌚"
        },
        {
          "value": "primeras-filas",
          "label": "Adelante, que la pantalla me tape todo",
          "emoji": "🔭"
        },
        {
          "value": "pasillo",
          "label": "Pasillo, salida rápida garantizada",
          "emoji": "🚶"
        },
        {
          "value": "donde-caiga",
          "label": "Donde caiga, no hago drama por una butaca",
          "emoji": "🎲"
        }
      ],
      "scoringMode": "match",
      "weight": 8,
      "revealCopy": "Eligen la misma butaca. Ahora el único problema es cuál de las dos.",
      "clashCopy": "Uno reservó el centro y el otro ya está en la última fila. Larga distancia dentro de la misma sala.",
      "help": "La butaca que reservás antes de que te la saquen."
    },
    {
      "id": "subtitulos-doblaje",
      "section": "cine",
      "prompt": "Subtitulada o doblada. Contestá con el corazón.",
      "kind": "single",
      "options": [
        {
          "value": "subtitulada",
          "label": "Subtitulada siempre, aunque sea en islandés",
          "emoji": "📖"
        },
        {
          "value": "doblada",
          "label": "Doblada y sin culpa, vengo a descansar",
          "emoji": "🔊"
        },
        {
          "value": "depende",
          "label": "Sub para todo, doblada solo la animada",
          "emoji": "⚖️"
        },
        {
          "value": "me-da-igual",
          "label": "Me da igual, esa no es una batalla mía",
          "emoji": "😌"
        }
      ],
      "scoringMode": "match",
      "weight": 5,
      "revealCopy": "Misma postura en la guerra santa del doblaje. Media discusión menos en la fila.",
      "clashCopy": "Uno lee y el otro escucha. Es la grieta más vieja del cine argentino.",
      "help": "Acá no hay opción cheta: las cuatro valen."
    },
    {
      "id": "llegada-trailers",
      "section": "sala",
      "prompt": "La función es a las 22:00. ¿A qué hora estás sentado?",
      "kind": "single",
      "options": [
        {
          "value": "media-hora-antes",
          "label": "21:30, elijo butaca y me instalo",
          "emoji": "⏰"
        },
        {
          "value": "para-los-trailers",
          "label": "Justo para los trailers, son parte del ritual",
          "emoji": "🎞️"
        },
        {
          "value": "con-la-luz-apagada",
          "label": "Cuando ya está oscuro, pidiendo permiso",
          "emoji": "🌑"
        },
        {
          "value": "siempre-tarde",
          "label": "Diez minutos tarde. Siempre.",
          "emoji": "😬"
        }
      ],
      "scoringMode": "match",
      "weight": 4,
      "revealCopy": "Llegan a la misma hora. Cero mensajes de \"¿dónde estás?\" con la peli empezada.",
      "clashCopy": "Uno ya vio tres trailers y el otro sigue buscando estacionamiento."
    },
    {
      "id": "peli-primera-cita",
      "section": "gustos",
      "prompt": "Elegís vos la peli de la primera cita. ¿Cuáles ponés sobre la mesa?",
      "kind": "multi",
      "options": [],
      "scoringMode": "jaccard",
      "weight": 10,
      "revealCopy": "Coinciden en la peli de la primera cita. Media cita ya está resuelta.",
      "clashCopy": "Cero coincidencias. La primera cita arranca con una negociación en la fila del ticket.",
      "help": "Hasta tres. Esto dice más de vos que tu foto de perfil.",
      "catalog": "movies",
      "maxSelect": 3
    },
    {
      "id": "crush-cine",
      "section": "gustos",
      "prompt": "Confesá: ¿quién te hace comprar la entrada solo por estar en el reparto?",
      "kind": "multi",
      "options": [],
      "scoringMode": "jaccard",
      "weight": 5,
      "revealCopy": "Mismo crush de cartelera. Eso es peligroso y hermoso a la vez.",
      "clashCopy": "Cero coincidencias de reparto. Buenísimo: nadie va a mirar la pantalla con demasiado interés.",
      "help": "Hasta tres. Nadie te juzga. Bueno, un poco.",
      "catalog": "people",
      "maxSelect": 3
    },
    {
      "id": "charla-en-sala",
      "section": "sala",
      "prompt": "Durante la peli, ¿cuánto hablás?",
      "kind": "single",
      "options": [
        {
          "value": "shusher",
          "label": "Hago shhh y no me tiembla la voz",
          "emoji": "🤫"
        },
        {
          "value": "mudo",
          "label": "No digo una palabra, pero tampoco callo a nadie",
          "emoji": "🔇"
        },
        {
          "value": "bajito",
          "label": "Un comentario al oído cada tanto",
          "emoji": "👂"
        },
        {
          "value": "pregunton",
          "label": "¿Quién es ese? ¿Ya lo vimos? ¿Es el malo?",
          "emoji": "❓"
        },
        {
          "value": "narrador",
          "label": "Adivino el final en voz alta, es mi don",
          "emoji": "📣"
        }
      ],
      "scoringMode": "dealbreaker",
      "weight": 9,
      "revealCopy": "Mismo volumen en la sala. Nadie va a hacer shhh esta noche.",
      "clashCopy": "Uno adivina el final en voz alta y el otro hace shhh. Esa función no termina bien.",
      "help": "Contestá la verdad, se nota a los diez minutos.",
      "clashPairs": [
        [
          "shusher",
          "narrador"
        ],
        [
          "shusher",
          "pregunton"
        ],
        [
          "mudo",
          "narrador"
        ]
      ]
    },
    {
      "id": "spoilers",
      "section": "cine",
      "prompt": "Vos ya la viste y la otra persona no. ¿Qué hacés?",
      "kind": "single",
      "options": [
        {
          "value": "ni-el-genero",
          "label": "No suelto ni el género, es sagrado",
          "emoji": "🤐"
        },
        {
          "value": "pistas-sutiles",
          "label": "Tiro alguna pista y disfruto la cara",
          "emoji": "👀"
        },
        {
          "value": "cara-de-todo",
          "label": "No spoileo, pero mi cara cuenta todo",
          "emoji": "😬"
        },
        {
          "value": "cuento-el-final",
          "label": "Le cuento el final así lo disfruta tranquilo",
          "emoji": "🗣️"
        }
      ],
      "scoringMode": "dealbreaker",
      "weight": 7,
      "revealCopy": "Tratan la trama con el mismo respeto. Se puede ir al cine sin firmar un contrato.",
      "clashCopy": "Uno se guarda hasta el género y el otro ya contó el final. Eso tarda en perdonarse.",
      "clashPairs": [
        [
          "ni-el-genero",
          "cuento-el-final"
        ],
        [
          "ni-el-genero",
          "pistas-sutiles"
        ],
        [
          "cara-de-todo",
          "cuento-el-final"
        ]
      ]
    },
    {
      "id": "peli-mala",
      "section": "cine",
      "prompt": "Van veinte minutos y la peli es un plomo. ¿Qué hacés?",
      "kind": "single",
      "options": [
        {
          "value": "la-aguanto",
          "label": "Me la banco hasta el final, pagué la entrada",
          "emoji": "⏳"
        },
        {
          "value": "propongo-irnos",
          "label": "Propongo irnos y salvamos la noche",
          "emoji": "🏃"
        },
        {
          "value": "me-duermo",
          "label": "Me duermo sin una gota de culpa",
          "emoji": "😴"
        },
        {
          "value": "la-destrozo-despues",
          "label": "Me quedo solo para destrozarla después",
          "emoji": "🔪"
        },
        {
          "value": "tan-mala-que-buena",
          "label": "Es tan mala que se pone buena, la amo",
          "emoji": "🏆"
        }
      ],
      "scoringMode": "match",
      "weight": 7,
      "revealCopy": "Reaccionan igual cuando la peli se cae. No va a haber codazos en la butaca.",
      "clashCopy": "Uno se levanta a los veinte minutos y el otro se queda hasta el último crédito. Alguien espera en el hall."
    },
    {
      "id": "quien-elige",
      "section": "vibra",
      "prompt": "Hay que decidir qué van a ver. ¿Qué rol te toca siempre?",
      "kind": "single",
      "options": [
        {
          "value": "tengo-la-lista",
          "label": "Tengo la lista armada hace meses",
          "emoji": "📋"
        },
        {
          "value": "propongo-tres",
          "label": "Propongo tres y que elija el otro",
          "emoji": "🃏"
        },
        {
          "value": "me-dejo-llevar",
          "label": "Que elija el otro, yo me dejo llevar",
          "emoji": "🎈"
        },
        {
          "value": "scroll-eterno",
          "label": "Scrolleo cuarenta minutos y no elijo nunca",
          "emoji": "📱"
        }
      ],
      "scoringMode": "complement",
      "weight": 6,
      "revealCopy": "Uno decide y el otro se deja llevar. Se terminaron los cuarenta minutos de scroll.",
      "clashCopy": "No se complementan: o los dos quieren decidir, o ninguno quiere. Van a perder unos minutos en “vos elegí”.",
      "help": "Acá también conviene ser distintos.",
      "complementPairs": [
        [
          "tengo-la-lista",
          "me-dejo-llevar"
        ],
        [
          "tengo-la-lista",
          "scroll-eterno"
        ],
        [
          "propongo-tres",
          "me-dejo-llevar"
        ],
        [
          "propongo-tres",
          "scroll-eterno"
        ]
      ],
      "sameCopy": "Los dos encaran la elección igual. O se ponen de acuerdo en dos minutos, o no eligen nunca."
    },
    {
      "id": "despues-de-la-funcion",
      "section": "vibra",
      "prompt": "Se prenden las luces. Son las 22:30. ¿Qué pasa?",
      "kind": "single",
      "options": [
        {
          "value": "bar",
          "label": "Bar cerca y la destrozamos dos horas",
          "emoji": "🍻"
        },
        {
          "value": "caminar",
          "label": "Caminar sin rumbo hablando de cualquier cosa",
          "emoji": "🌃"
        },
        {
          "value": "segunda-funcion",
          "label": "Segunda función, ya que estamos",
          "emoji": "🎬"
        },
        {
          "value": "procesar-en-silencio",
          "label": "Silencio un rato, necesito procesar",
          "emoji": "🌙"
        },
        {
          "value": "cada-uno-a-su-casa",
          "label": "Cada uno a su casa, estuvo lindo",
          "emoji": "🚕"
        }
      ],
      "scoringMode": "match",
      "weight": 8,
      "revealCopy": "Quieren lo mismo cuando se prenden las luces. Ahí se define una cita, no en la peli.",
      "clashCopy": "Uno arranca para el bar y el otro ya pidió el auto. Timing distinto, nada personal."
    },
    {
      "id": "silencio",
      "section": "vibra",
      "prompt": "Se hace un silencio de treinta segundos en la mesa. ¿Cómo lo llevás?",
      "kind": "scale",
      "options": [],
      "scoringMode": "scale",
      "weight": 7,
      "revealCopy": "Manejan el silencio igual. Eso es más raro y más valioso que compartir género favorito.",
      "clashCopy": "Uno necesita llenar el aire y el otro necesita que no se lo llenen. Ojo con eso.",
      "scaleLabels": [
        "Me muero, lo tapo con cualquier cosa",
        "Lo disfruto, el silencio también es charla"
      ]
    },
    {
      "id": "llanto-en-cine",
      "section": "vibra",
      "prompt": "Del 1 al 5: ¿qué tan fácil llorás en el cine?",
      "kind": "scale",
      "options": [],
      "scoringMode": "scale",
      "weight": 3,
      "revealCopy": "Mismo umbral de lágrima. Nadie va a tener que disimular con el pochoclo.",
      "clashCopy": "Uno se seca la cara y el otro pregunta qué pasó. Llevá pañuelos, por las dudas.",
      "scaleLabels": [
        "Ni con la escena del perro",
        "Lloro en el trailer y sigo en el hall"
      ]
    }
  ],
  "movies": [
    {
      "id": "titanic",
      "label": "Titanic",
      "popularity": 5,
      "emoji": "🚢",
      "meta": "1997",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "el-padrino",
      "label": "El Padrino",
      "popularity": 5,
      "emoji": "🕴️",
      "meta": "1972",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "pulp-fiction",
      "label": "Pulp Fiction",
      "popularity": 5,
      "emoji": "🍔",
      "meta": "1994",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "el-club-de-la-pelea",
      "label": "El Club de la Pelea",
      "popularity": 5,
      "emoji": "🧼",
      "meta": "1999",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "matrix",
      "label": "Matrix",
      "popularity": 5,
      "emoji": "💊",
      "meta": "1999",
      "search": "ciencia-ficcion accion",
      "tags": [
        "ciencia-ficcion",
        "accion"
      ]
    },
    {
      "id": "el-origen",
      "label": "El Origen",
      "popularity": 5,
      "emoji": "💤",
      "meta": "2010",
      "search": "ciencia-ficcion thriller",
      "tags": [
        "ciencia-ficcion",
        "thriller"
      ]
    },
    {
      "id": "interestelar",
      "label": "Interestelar",
      "popularity": 5,
      "emoji": "🪐",
      "meta": "2014",
      "search": "ciencia-ficcion drama",
      "tags": [
        "ciencia-ficcion",
        "drama"
      ]
    },
    {
      "id": "batman-el-caballero-de-la-noche",
      "label": "Batman: El Caballero de la Noche",
      "popularity": 5,
      "emoji": "🌃",
      "meta": "2008",
      "search": "accion crimen",
      "tags": [
        "accion",
        "crimen"
      ]
    },
    {
      "id": "forrest-gump",
      "label": "Forrest Gump",
      "popularity": 5,
      "emoji": "🍫",
      "meta": "1994",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "volver-al-futuro",
      "label": "Volver al Futuro",
      "popularity": 5,
      "emoji": "🚗",
      "meta": "1985",
      "search": "ciencia-ficcion comedia",
      "tags": [
        "ciencia-ficcion",
        "comedia"
      ]
    },
    {
      "id": "star-wars-una-nueva-esperanza",
      "label": "Star Wars: Una Nueva Esperanza",
      "popularity": 5,
      "emoji": "⭐",
      "meta": "1977",
      "search": "ciencia-ficcion aventura",
      "tags": [
        "ciencia-ficcion",
        "aventura"
      ]
    },
    {
      "id": "el-senor-de-los-anillos-la-comunidad-del-anillo",
      "label": "El Señor de los Anillos: La Comunidad del Anillo",
      "popularity": 5,
      "emoji": "💍",
      "meta": "2001",
      "search": "fantasia aventura",
      "tags": [
        "fantasia",
        "aventura"
      ]
    },
    {
      "id": "harry-potter-y-la-piedra-filosofal",
      "label": "Harry Potter y la Piedra Filosofal",
      "popularity": 5,
      "emoji": "⚡",
      "meta": "2001",
      "search": "fantasia aventura",
      "tags": [
        "fantasia",
        "aventura"
      ]
    },
    {
      "id": "jurassic-park",
      "label": "Jurassic Park",
      "popularity": 5,
      "emoji": "🦖",
      "meta": "1993",
      "search": "aventura ciencia-ficcion",
      "tags": [
        "aventura",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "avengers-endgame",
      "label": "Avengers: Endgame",
      "popularity": 5,
      "emoji": "🦸",
      "meta": "2019",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "gladiador",
      "label": "Gladiador",
      "popularity": 5,
      "emoji": "🗡️",
      "meta": "2000",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "rapido-y-furioso",
      "label": "Rápido y Furioso",
      "popularity": 5,
      "emoji": "🏎️",
      "meta": "2001",
      "search": "accion crimen",
      "tags": [
        "accion",
        "crimen"
      ]
    },
    {
      "id": "top-gun-maverick",
      "label": "Top Gun: Maverick",
      "popularity": 5,
      "emoji": "✈️",
      "meta": "2022",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "mad-max-furia-en-el-camino",
      "label": "Mad Max: Furia en el Camino",
      "popularity": 4,
      "emoji": "🚙",
      "meta": "2015",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "kill-bill",
      "label": "Kill Bill",
      "popularity": 4,
      "emoji": "👰",
      "meta": "2003",
      "search": "accion crimen",
      "tags": [
        "accion",
        "crimen"
      ]
    },
    {
      "id": "et-el-extraterrestre",
      "label": "E.T. el Extraterrestre",
      "popularity": 4,
      "emoji": "🚲",
      "meta": "1982",
      "search": "ciencia-ficcion aventura",
      "tags": [
        "ciencia-ficcion",
        "aventura"
      ]
    },
    {
      "id": "tiburon",
      "label": "Tiburón",
      "popularity": 4,
      "emoji": "🦈",
      "meta": "1975",
      "search": "terror aventura",
      "tags": [
        "terror",
        "aventura"
      ]
    },
    {
      "id": "alien-el-octavo-pasajero",
      "label": "Alien: el Octavo Pasajero",
      "popularity": 4,
      "emoji": "👽",
      "meta": "1979",
      "search": "terror ciencia-ficcion",
      "tags": [
        "terror",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "blade-runner",
      "label": "Blade Runner",
      "popularity": 3,
      "emoji": "🌧️",
      "meta": "1982",
      "search": "ciencia-ficcion drama",
      "tags": [
        "ciencia-ficcion",
        "drama"
      ]
    },
    {
      "id": "la-llegada",
      "label": "La Llegada",
      "popularity": 3,
      "emoji": "🛸",
      "meta": "2016",
      "search": "ciencia-ficcion drama",
      "tags": [
        "ciencia-ficcion",
        "drama"
      ]
    },
    {
      "id": "dune",
      "label": "Duna",
      "popularity": 4,
      "emoji": "🏜️",
      "meta": "2021",
      "search": "ciencia-ficcion aventura",
      "tags": [
        "ciencia-ficcion",
        "aventura"
      ]
    },
    {
      "id": "todo-en-todas-partes-al-mismo-tiempo",
      "label": "Todo en Todas Partes al Mismo Tiempo",
      "popularity": 4,
      "emoji": "🥯",
      "meta": "2022",
      "search": "ciencia-ficcion comedia accion",
      "tags": [
        "ciencia-ficcion",
        "comedia",
        "accion"
      ]
    },
    {
      "id": "barbie",
      "label": "Barbie",
      "popularity": 5,
      "emoji": "🎀",
      "meta": "2023",
      "search": "comedia fantasia",
      "tags": [
        "comedia",
        "fantasia"
      ]
    },
    {
      "id": "oppenheimer",
      "label": "Oppenheimer",
      "popularity": 5,
      "emoji": "💥",
      "meta": "2023",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "joker",
      "label": "Joker",
      "popularity": 5,
      "emoji": "🃏",
      "meta": "2019",
      "search": "drama crimen",
      "tags": [
        "drama",
        "crimen"
      ]
    },
    {
      "id": "parasitos",
      "label": "Parásitos",
      "popularity": 4,
      "emoji": "🏚️",
      "meta": "2019",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "la-la-land",
      "label": "La La Land",
      "popularity": 5,
      "emoji": "🎷",
      "meta": "2016",
      "search": "musical romance",
      "tags": [
        "musical",
        "romance"
      ]
    },
    {
      "id": "el-gran-hotel-budapest",
      "label": "El Gran Hotel Budapest",
      "popularity": 4,
      "emoji": "🛎️",
      "meta": "2014",
      "search": "comedia aventura",
      "tags": [
        "comedia",
        "aventura"
      ]
    },
    {
      "id": "whiplash",
      "label": "Whiplash: Música y Obsesión",
      "popularity": 4,
      "emoji": "🥁",
      "meta": "2014",
      "search": "drama musical",
      "tags": [
        "drama",
        "musical"
      ]
    },
    {
      "id": "pobres-criaturas",
      "label": "Pobres Criaturas",
      "popularity": 3,
      "emoji": "🦆",
      "meta": "2023",
      "search": "comedia drama fantasia",
      "tags": [
        "comedia",
        "drama",
        "fantasia"
      ]
    },
    {
      "id": "anora",
      "label": "Anora",
      "popularity": 3,
      "emoji": "🍒",
      "meta": "2024",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "seven-pecados-capitales",
      "label": "Seven: Pecados Capitales",
      "popularity": 4,
      "emoji": "📦",
      "meta": "1995",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "el-silencio-de-los-inocentes",
      "label": "El Silencio de los Inocentes",
      "popularity": 4,
      "emoji": "🦋",
      "meta": "1991",
      "search": "thriller terror",
      "tags": [
        "thriller",
        "terror"
      ]
    },
    {
      "id": "perdida",
      "label": "Perdida",
      "popularity": 4,
      "emoji": "📰",
      "meta": "2014",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "taxi-driver",
      "label": "Taxi Driver",
      "popularity": 3,
      "emoji": "🚕",
      "meta": "1976",
      "search": "drama crimen",
      "tags": [
        "drama",
        "crimen"
      ]
    },
    {
      "id": "drive",
      "label": "Drive",
      "popularity": 3,
      "emoji": "🧥",
      "meta": "2011",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "old-boy",
      "label": "Oldboy",
      "popularity": 2,
      "emoji": "🔨",
      "meta": "2003",
      "search": "thriller accion",
      "tags": [
        "thriller",
        "accion"
      ]
    },
    {
      "id": "anatomia-de-una-caida",
      "label": "Anatomía de una Caída",
      "popularity": 2,
      "emoji": "⛷️",
      "meta": "2023",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "mulholland-drive",
      "label": "Mulholland Drive",
      "popularity": 1,
      "emoji": "🔑",
      "meta": "2001",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "donnie-darko",
      "label": "Donnie Darko",
      "popularity": 2,
      "emoji": "🐰",
      "meta": "2001",
      "search": "ciencia-ficcion thriller",
      "tags": [
        "ciencia-ficcion",
        "thriller"
      ]
    },
    {
      "id": "el-gran-lebowski",
      "label": "El Gran Lebowski",
      "popularity": 3,
      "emoji": "🎳",
      "meta": "1998",
      "search": "comedia crimen",
      "tags": [
        "comedia",
        "crimen"
      ]
    },
    {
      "id": "trainspotting",
      "label": "Trainspotting",
      "popularity": 3,
      "emoji": "🎧",
      "meta": "1996",
      "search": "drama crimen",
      "tags": [
        "drama",
        "crimen"
      ]
    },
    {
      "id": "la-naranja-mecanica",
      "label": "La Naranja Mecánica",
      "popularity": 3,
      "emoji": "🍊",
      "meta": "1971",
      "search": "ciencia-ficcion crimen",
      "tags": [
        "ciencia-ficcion",
        "crimen"
      ]
    },
    {
      "id": "rocky-horror-picture-show",
      "label": "The Rocky Horror Picture Show",
      "popularity": 2,
      "emoji": "👄",
      "meta": "1975",
      "search": "musical comedia",
      "tags": [
        "musical",
        "comedia"
      ]
    },
    {
      "id": "stalker",
      "label": "Stalker",
      "popularity": 1,
      "emoji": "🚞",
      "meta": "1979",
      "search": "ciencia-ficcion drama",
      "tags": [
        "ciencia-ficcion",
        "drama"
      ]
    },
    {
      "id": "el-resplandor",
      "label": "El Resplandor",
      "popularity": 4,
      "emoji": "🪓",
      "meta": "1980",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "psicosis",
      "label": "Psicosis",
      "popularity": 4,
      "emoji": "🚿",
      "meta": "1960",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "el-exorcista",
      "label": "El Exorcista",
      "popularity": 4,
      "emoji": "😈",
      "meta": "1973",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "scream",
      "label": "Scream",
      "popularity": 4,
      "emoji": "😱",
      "meta": "1996",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "huye",
      "label": "¡Huye!",
      "popularity": 4,
      "emoji": "🫖",
      "meta": "2017",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "hereditary",
      "label": "Hereditary: El Legado del Diablo",
      "popularity": 3,
      "emoji": "🐜",
      "meta": "2018",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "midsommar",
      "label": "Midsommar",
      "popularity": 2,
      "emoji": "🌼",
      "meta": "2019",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "la-sustancia",
      "label": "La Sustancia",
      "popularity": 3,
      "emoji": "🧪",
      "meta": "2024",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "suspiria",
      "label": "Suspiria",
      "popularity": 1,
      "emoji": "🩰",
      "meta": "1977",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "aterrados",
      "label": "Aterrados",
      "popularity": 2,
      "emoji": "👻",
      "meta": "2017",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "cuando-acecha-la-maldad",
      "label": "Cuando Acecha la Maldad",
      "popularity": 2,
      "emoji": "🐐",
      "meta": "2023",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "relatos-salvajes",
      "label": "Relatos Salvajes",
      "popularity": 5,
      "emoji": "💣",
      "meta": "2014",
      "search": "comedia drama thriller",
      "tags": [
        "comedia",
        "drama",
        "thriller"
      ]
    },
    {
      "id": "el-secreto-de-sus-ojos",
      "label": "El Secreto de sus Ojos",
      "popularity": 5,
      "emoji": "👁️",
      "meta": "2009",
      "search": "crimen drama romance",
      "tags": [
        "crimen",
        "drama",
        "romance"
      ]
    },
    {
      "id": "nueve-reinas",
      "label": "Nueve Reinas",
      "popularity": 5,
      "emoji": "🎴",
      "meta": "2000",
      "search": "crimen thriller",
      "tags": [
        "crimen",
        "thriller"
      ]
    },
    {
      "id": "el-hijo-de-la-novia",
      "label": "El Hijo de la Novia",
      "popularity": 5,
      "emoji": "💒",
      "meta": "2001",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "argentina-1985",
      "label": "Argentina, 1985",
      "popularity": 5,
      "emoji": "⚖️",
      "meta": "2022",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "el-angel",
      "label": "El Ángel",
      "popularity": 4,
      "emoji": "😇",
      "meta": "2018",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "el-ciudadano-ilustre",
      "label": "El Ciudadano Ilustre",
      "popularity": 4,
      "emoji": "🏆",
      "meta": "2016",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "la-odisea-de-los-giles",
      "label": "La Odisea de los Giles",
      "popularity": 4,
      "emoji": "💰",
      "meta": "2019",
      "search": "comedia crimen",
      "tags": [
        "comedia",
        "crimen"
      ]
    },
    {
      "id": "el-robo-del-siglo",
      "label": "El Robo del Siglo",
      "popularity": 4,
      "emoji": "🏦",
      "meta": "2020",
      "search": "crimen comedia",
      "tags": [
        "crimen",
        "comedia"
      ]
    },
    {
      "id": "esperando-la-carroza",
      "label": "Esperando la Carroza",
      "popularity": 4,
      "emoji": "🍝",
      "meta": "1985",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "la-historia-oficial",
      "label": "La Historia Oficial",
      "popularity": 3,
      "emoji": "🕊️",
      "meta": "1985",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "un-novio-para-mi-mujer",
      "label": "Un Novio para mi Mujer",
      "popularity": 4,
      "emoji": "💐",
      "meta": "2008",
      "search": "comedia romance",
      "tags": [
        "comedia",
        "romance"
      ]
    },
    {
      "id": "medianeras",
      "label": "Medianeras",
      "popularity": 3,
      "emoji": "🏙️",
      "meta": "2011",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "mi-obra-maestra",
      "label": "Mi Obra Maestra",
      "popularity": 3,
      "emoji": "🎨",
      "meta": "2018",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "el-estudiante",
      "label": "El Estudiante",
      "popularity": 2,
      "emoji": "🎓",
      "meta": "2011",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "un-oso-rojo",
      "label": "Un Oso Rojo",
      "popularity": 2,
      "emoji": "🐻",
      "meta": "2002",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "pizza-birra-faso",
      "label": "Pizza, Birra, Faso",
      "popularity": 2,
      "emoji": "🍕",
      "meta": "1998",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "la-cienaga",
      "label": "La Ciénaga",
      "popularity": 2,
      "emoji": "🏊",
      "meta": "2001",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "la-mujer-sin-cabeza",
      "label": "La Mujer sin Cabeza",
      "popularity": 1,
      "emoji": "🌫️",
      "meta": "2008",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "zama",
      "label": "Zama",
      "popularity": 1,
      "emoji": "🌾",
      "meta": "2017",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "historias-minimas",
      "label": "Historias Mínimas",
      "popularity": 2,
      "emoji": "🛣️",
      "meta": "2002",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "puan",
      "label": "Puan",
      "popularity": 2,
      "emoji": "📖",
      "meta": "2023",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "metegol",
      "label": "Metegol",
      "popularity": 4,
      "emoji": "⚽",
      "meta": "2013",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "diarios-de-motocicleta",
      "label": "Diarios de Motocicleta",
      "popularity": 4,
      "emoji": "🛵",
      "meta": "2004",
      "search": "drama aventura",
      "tags": [
        "drama",
        "aventura"
      ]
    },
    {
      "id": "la-sociedad-de-la-nieve",
      "label": "La Sociedad de la Nieve",
      "popularity": 4,
      "emoji": "🏔️",
      "meta": "2023",
      "search": "drama aventura",
      "tags": [
        "drama",
        "aventura"
      ]
    },
    {
      "id": "roma",
      "label": "Roma",
      "popularity": 4,
      "emoji": "🌊",
      "meta": "2018",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "amores-perros",
      "label": "Amores Perros",
      "popularity": 3,
      "emoji": "🐕",
      "meta": "2000",
      "search": "drama crimen",
      "tags": [
        "drama",
        "crimen"
      ]
    },
    {
      "id": "y-tu-mama-tambien",
      "label": "Y tu Mamá También",
      "popularity": 3,
      "emoji": "🏖️",
      "meta": "2001",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "ciudad-de-dios",
      "label": "Ciudad de Dios",
      "popularity": 4,
      "emoji": "🔫",
      "meta": "2002",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "el-laberinto-del-fauno",
      "label": "El Laberinto del Fauno",
      "popularity": 4,
      "emoji": "🌿",
      "meta": "2006",
      "search": "fantasia drama",
      "tags": [
        "fantasia",
        "drama"
      ]
    },
    {
      "id": "todo-sobre-mi-madre",
      "label": "Todo sobre mi Madre",
      "popularity": 3,
      "emoji": "💄",
      "meta": "1999",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "coco",
      "label": "Coco",
      "popularity": 5,
      "emoji": "💀",
      "meta": "2017",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "el-rey-leon",
      "label": "El Rey León",
      "popularity": 5,
      "emoji": "🦁",
      "meta": "1994",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "toy-story",
      "label": "Toy Story",
      "popularity": 5,
      "emoji": "🤠",
      "meta": "1995",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "shrek",
      "label": "Shrek",
      "popularity": 5,
      "emoji": "🧅",
      "meta": "2001",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "up-una-aventura-de-altura",
      "label": "Up: Una Aventura de Altura",
      "popularity": 5,
      "emoji": "🎈",
      "meta": "2009",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "intensamente",
      "label": "Intensamente",
      "popularity": 5,
      "emoji": "😊",
      "meta": "2015",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "wall-e",
      "label": "WALL·E",
      "popularity": 4,
      "emoji": "🤖",
      "meta": "2008",
      "search": "animacion ciencia-ficcion",
      "tags": [
        "animacion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "spider-man-un-nuevo-universo",
      "label": "Spider-Man: Un Nuevo Universo",
      "popularity": 4,
      "emoji": "🕷️",
      "meta": "2018",
      "search": "animacion accion",
      "tags": [
        "animacion",
        "accion"
      ]
    },
    {
      "id": "el-viaje-de-chihiro",
      "label": "El Viaje de Chihiro",
      "popularity": 4,
      "emoji": "🐉",
      "meta": "2001",
      "search": "animacion fantasia",
      "tags": [
        "animacion",
        "fantasia"
      ]
    },
    {
      "id": "your-name",
      "label": "Your Name",
      "popularity": 3,
      "emoji": "☄️",
      "meta": "2016",
      "search": "animacion romance",
      "tags": [
        "animacion",
        "romance"
      ]
    },
    {
      "id": "mujer-bonita",
      "label": "Mujer Bonita",
      "popularity": 5,
      "emoji": "👗",
      "meta": "1990",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "diario-de-una-pasion",
      "label": "Diario de una Pasión",
      "popularity": 4,
      "emoji": "🛶",
      "meta": "2004",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "realmente-amor",
      "label": "Realmente Amor",
      "popularity": 4,
      "emoji": "💌",
      "meta": "2003",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "notting-hill",
      "label": "Notting Hill",
      "popularity": 4,
      "emoji": "📚",
      "meta": "1999",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "cuando-harry-conocio-a-sally",
      "label": "Cuando Harry Conoció a Sally",
      "popularity": 4,
      "emoji": "🥪",
      "meta": "1989",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "10-cosas-que-odio-de-ti",
      "label": "10 Cosas que Odio de Ti",
      "popularity": 4,
      "emoji": "💔",
      "meta": "1999",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "500-dias-con-ella",
      "label": "(500) Días con Ella",
      "popularity": 4,
      "emoji": "☀️",
      "meta": "2009",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "amelie",
      "label": "Amélie",
      "popularity": 4,
      "emoji": "🥄",
      "meta": "2001",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "eterno-resplandor-de-una-mente-sin-recuerdos",
      "label": "Eterno Resplandor de una Mente sin Recuerdos",
      "popularity": 4,
      "emoji": "🧠",
      "meta": "2004",
      "search": "romance ciencia-ficcion drama",
      "tags": [
        "romance",
        "ciencia-ficcion",
        "drama"
      ]
    },
    {
      "id": "antes-del-amanecer",
      "label": "Antes del Amanecer",
      "popularity": 3,
      "emoji": "🚆",
      "meta": "1995",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "her",
      "label": "Her",
      "popularity": 3,
      "emoji": "📱",
      "meta": "2013",
      "search": "romance ciencia-ficcion drama",
      "tags": [
        "romance",
        "ciencia-ficcion",
        "drama"
      ]
    },
    {
      "id": "llamame-por-tu-nombre",
      "label": "Llámame por tu Nombre",
      "popularity": 3,
      "emoji": "🍑",
      "meta": "2017",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "in-the-mood-for-love",
      "label": "In the Mood for Love",
      "popularity": 1,
      "emoji": "🕰️",
      "meta": "2000",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "vidas-pasadas",
      "label": "Vidas Pasadas",
      "popularity": 2,
      "emoji": "🪞",
      "meta": "2023",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "retrato-de-una-mujer-en-llamas",
      "label": "Retrato de una Mujer en Llamas",
      "popularity": 2,
      "emoji": "🔥",
      "meta": "2019",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "secreto-en-la-montana",
      "label": "Secreto en la Montaña",
      "popularity": 3,
      "emoji": "🐑",
      "meta": "2005",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "moonlight",
      "label": "Moonlight",
      "popularity": 2,
      "emoji": "🌙",
      "meta": "2016",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "casablanca",
      "label": "Casablanca",
      "popularity": 4,
      "emoji": "🥂",
      "meta": "1942",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "cinema-paradiso",
      "label": "Cinema Paradiso",
      "popularity": 3,
      "emoji": "🎞️",
      "meta": "1988",
      "search": "drama romance",
      "tags": [
        "drama",
        "romance"
      ]
    },
    {
      "id": "la-vida-es-bella",
      "label": "La Vida es Bella",
      "popularity": 4,
      "emoji": "🎪",
      "meta": "1997",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "el-mago-de-oz",
      "label": "El Mago de Oz",
      "popularity": 4,
      "emoji": "🌪️",
      "meta": "1939",
      "search": "fantasia musical",
      "tags": [
        "fantasia",
        "musical"
      ]
    },
    {
      "id": "cantando-bajo-la-lluvia",
      "label": "Cantando bajo la Lluvia",
      "popularity": 3,
      "emoji": "☔",
      "meta": "1952",
      "search": "musical romance",
      "tags": [
        "musical",
        "romance"
      ]
    },
    {
      "id": "el-bueno-el-malo-y-el-feo",
      "label": "El Bueno, el Malo y el Feo",
      "popularity": 3,
      "emoji": "🐎",
      "meta": "1966",
      "search": "aventura accion",
      "tags": [
        "aventura",
        "accion"
      ]
    },
    {
      "id": "atrapado-sin-salida",
      "label": "Atrapado sin Salida",
      "popularity": 3,
      "emoji": "🪶",
      "meta": "1975",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "rocky",
      "label": "Rocky",
      "popularity": 4,
      "emoji": "🥊",
      "meta": "1976",
      "search": "drama accion",
      "tags": [
        "drama",
        "accion"
      ]
    },
    {
      "id": "grease",
      "label": "Grease",
      "popularity": 4,
      "emoji": "🕺",
      "meta": "1978",
      "search": "musical romance",
      "tags": [
        "musical",
        "romance"
      ]
    },
    {
      "id": "dirty-dancing",
      "label": "Dirty Dancing",
      "popularity": 4,
      "emoji": "💃",
      "meta": "1987",
      "search": "romance musical",
      "tags": [
        "romance",
        "musical"
      ]
    },
    {
      "id": "el-club-de-los-cinco",
      "label": "El Club de los Cinco",
      "popularity": 3,
      "emoji": "✊",
      "meta": "1985",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "chicas-pesadas",
      "label": "Chicas Pesadas",
      "popularity": 4,
      "emoji": "💗",
      "meta": "2004",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "legalmente-rubia",
      "label": "Legalmente Rubia",
      "popularity": 4,
      "emoji": "💅",
      "meta": "2001",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "el-diablo-viste-a-la-moda",
      "label": "El Diablo Viste a la Moda",
      "popularity": 5,
      "emoji": "👠",
      "meta": "2006",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "que-paso-ayer",
      "label": "¿Qué Pasó Ayer?",
      "popularity": 4,
      "emoji": "🐯",
      "meta": "2009",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "mamma-mia",
      "label": "Mamma Mia!",
      "popularity": 4,
      "emoji": "🎶",
      "meta": "2008",
      "search": "musical comedia",
      "tags": [
        "musical",
        "comedia"
      ]
    },
    {
      "id": "aftersun",
      "label": "Aftersun",
      "popularity": 1,
      "emoji": "📼",
      "meta": "2022",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "lost-in-translation",
      "label": "Lost in Translation (Perdidos en Tokio)",
      "popularity": 3,
      "emoji": "🗼",
      "meta": "2003",
      "search": "drama romance",
      "tags": [
        "drama",
        "romance"
      ]
    },
    {
      "id": "perfect-days",
      "label": "Perfect Days",
      "popularity": 2,
      "emoji": "🌳",
      "meta": "2023",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "chungking-express",
      "label": "Chungking Express",
      "popularity": 1,
      "emoji": "🍍",
      "meta": "1994",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "free-solo",
      "label": "Free Solo",
      "popularity": 3,
      "emoji": "🧗",
      "meta": "2018",
      "search": "documental aventura",
      "tags": [
        "documental",
        "aventura"
      ]
    }
  ],
  "people": [
    {
      "id": "ricardo-darin",
      "label": "Ricardo Darín",
      "popularity": 5,
      "emoji": "🇦🇷",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "guillermo-francella",
      "label": "Guillermo Francella",
      "popularity": 5,
      "emoji": "🥸",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "dolores-fonzi",
      "label": "Dolores Fonzi",
      "popularity": 4,
      "emoji": "💫",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "lali-esposito",
      "label": "Lali Espósito",
      "popularity": 5,
      "emoji": "✨",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "peter-lanzani",
      "label": "Peter Lanzani",
      "popularity": 4,
      "emoji": "😇",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "erica-rivas",
      "label": "Érica Rivas",
      "popularity": 4,
      "emoji": "👰",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "cecilia-roth",
      "label": "Cecilia Roth",
      "popularity": 3,
      "emoji": "💄",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "leonardo-sbaraglia",
      "label": "Leonardo Sbaraglia",
      "popularity": 4,
      "emoji": "🎭",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "norma-aleandro",
      "label": "Norma Aleandro",
      "popularity": 3,
      "emoji": "🕊️",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "griselda-siciliani",
      "label": "Griselda Siciliani",
      "popularity": 4,
      "emoji": "💅",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "rodrigo-de-la-serna",
      "label": "Rodrigo de la Serna",
      "popularity": 4,
      "emoji": "🛵",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "chino-darin",
      "label": "Chino Darín",
      "popularity": 4,
      "emoji": "🧢",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "mercedes-moran",
      "label": "Mercedes Morán",
      "popularity": 3,
      "emoji": "🌺",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "oscar-martinez",
      "label": "Oscar Martínez",
      "popularity": 3,
      "emoji": "🏆",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "nahuel-perez-biscayart",
      "label": "Nahuel Pérez Biscayart",
      "popularity": 3,
      "emoji": "🌀",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "natalia-oreiro",
      "label": "Natalia Oreiro",
      "popularity": 5,
      "emoji": "🎤",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "leonardo-dicaprio",
      "label": "Leonardo DiCaprio",
      "popularity": 5,
      "emoji": "🚢",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "brad-pitt",
      "label": "Brad Pitt",
      "popularity": 5,
      "emoji": "😎",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "keanu-reeves",
      "label": "Keanu Reeves",
      "popularity": 5,
      "emoji": "🕶️",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "tom-cruise",
      "label": "Tom Cruise",
      "popularity": 5,
      "emoji": "✈️",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "meryl-streep",
      "label": "Meryl Streep",
      "popularity": 4,
      "emoji": "🎖️",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "cate-blanchett",
      "label": "Cate Blanchett",
      "popularity": 4,
      "emoji": "🎻",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "julia-roberts",
      "label": "Julia Roberts",
      "popularity": 4,
      "emoji": "😁",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "scarlett-johansson",
      "label": "Scarlett Johansson",
      "popularity": 5,
      "emoji": "💋",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "margot-robbie",
      "label": "Margot Robbie",
      "popularity": 5,
      "emoji": "🎀",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "ryan-gosling",
      "label": "Ryan Gosling",
      "popularity": 5,
      "emoji": "🧥",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "emma-stone",
      "label": "Emma Stone",
      "popularity": 4,
      "emoji": "🍋",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "timothee-chalamet",
      "label": "Timothée Chalamet",
      "popularity": 5,
      "emoji": "👑",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "zendaya",
      "label": "Zendaya",
      "popularity": 5,
      "emoji": "🕷️",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "pedro-pascal",
      "label": "Pedro Pascal",
      "popularity": 5,
      "emoji": "🌵",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "florence-pugh",
      "label": "Florence Pugh",
      "popularity": 4,
      "emoji": "🎪",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "paul-mescal",
      "label": "Paul Mescal",
      "popularity": 3,
      "emoji": "📼",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "anya-taylor-joy",
      "label": "Anya Taylor-Joy",
      "popularity": 4,
      "emoji": "♟️",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "michelle-yeoh",
      "label": "Michelle Yeoh",
      "popularity": 4,
      "emoji": "🥋",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "robert-pattinson",
      "label": "Robert Pattinson",
      "popularity": 4,
      "emoji": "🦇",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "jenna-ortega",
      "label": "Jenna Ortega",
      "popularity": 4,
      "emoji": "🖤",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "cillian-murphy",
      "label": "Cillian Murphy",
      "popularity": 4,
      "emoji": "💥",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "penelope-cruz",
      "label": "Penélope Cruz",
      "popularity": 4,
      "emoji": "💃",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "gael-garcia-bernal",
      "label": "Gael García Bernal",
      "popularity": 3,
      "emoji": "🏍️",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "tilda-swinton",
      "label": "Tilda Swinton",
      "popularity": 2,
      "emoji": "❄️",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "song-kang-ho",
      "label": "Song Kang-ho",
      "popularity": 2,
      "emoji": "🍜",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "tony-leung",
      "label": "Tony Leung",
      "popularity": 1,
      "emoji": "🚬",
      "meta": "",
      "search": "actor"
    },
    {
      "id": "juan-jose-campanella",
      "label": "Juan José Campanella",
      "popularity": 5,
      "emoji": "👁️",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "damian-szifron",
      "label": "Damián Szifron",
      "popularity": 5,
      "emoji": "💣",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "fabian-bielinsky",
      "label": "Fabián Bielinsky",
      "popularity": 3,
      "emoji": "🎴",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "santiago-mitre",
      "label": "Santiago Mitre",
      "popularity": 3,
      "emoji": "⚖️",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "lucrecia-martel",
      "label": "Lucrecia Martel",
      "popularity": 2,
      "emoji": "🏊",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "demian-rugna",
      "label": "Demián Rugna",
      "popularity": 2,
      "emoji": "👻",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "lisandro-alonso",
      "label": "Lisandro Alonso",
      "popularity": 1,
      "emoji": "🌾",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "mariano-llinas",
      "label": "Mariano Llinás",
      "popularity": 1,
      "emoji": "🎬",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "christopher-nolan",
      "label": "Christopher Nolan",
      "popularity": 5,
      "emoji": "⏳",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "quentin-tarantino",
      "label": "Quentin Tarantino",
      "popularity": 5,
      "emoji": "🎞️",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "steven-spielberg",
      "label": "Steven Spielberg",
      "popularity": 5,
      "emoji": "🦖",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "martin-scorsese",
      "label": "Martin Scorsese",
      "popularity": 4,
      "emoji": "🎥",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "greta-gerwig",
      "label": "Greta Gerwig",
      "popularity": 4,
      "emoji": "🌸",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "jordan-peele",
      "label": "Jordan Peele",
      "popularity": 4,
      "emoji": "🫖",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "denis-villeneuve",
      "label": "Denis Villeneuve",
      "popularity": 4,
      "emoji": "🏜️",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "wes-anderson",
      "label": "Wes Anderson",
      "popularity": 4,
      "emoji": "🛎️",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "guillermo-del-toro",
      "label": "Guillermo del Toro",
      "popularity": 4,
      "emoji": "🐟",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "alfonso-cuaron",
      "label": "Alfonso Cuarón",
      "popularity": 4,
      "emoji": "🌊",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "bong-joon-ho",
      "label": "Bong Joon-ho",
      "popularity": 4,
      "emoji": "🏚️",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "hayao-miyazaki",
      "label": "Hayao Miyazaki",
      "popularity": 4,
      "emoji": "🐉",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "sofia-coppola",
      "label": "Sofia Coppola",
      "popularity": 3,
      "emoji": "🗼",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "pedro-almodovar",
      "label": "Pedro Almodóvar",
      "popularity": 3,
      "emoji": "🌶️",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "david-lynch",
      "label": "David Lynch",
      "popularity": 3,
      "emoji": "🔑",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "ari-aster",
      "label": "Ari Aster",
      "popularity": 3,
      "emoji": "🌼",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "damien-chazelle",
      "label": "Damien Chazelle",
      "popularity": 3,
      "emoji": "🥁",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "yorgos-lanthimos",
      "label": "Yorgos Lanthimos",
      "popularity": 3,
      "emoji": "🦞",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "celine-sciamma",
      "label": "Céline Sciamma",
      "popularity": 1,
      "emoji": "🔥",
      "meta": "director",
      "search": "director"
    },
    {
      "id": "wong-kar-wai",
      "label": "Wong Kar-wai",
      "popularity": 1,
      "emoji": "🕰️",
      "meta": "director",
      "search": "director"
    }
  ],
  "tiers": [
    {
      "min": 88,
      "name": "Estreno a sala llena",
      "tagline": "Coinciden en todo, hasta en la butaca. Esto no pasa seguido: no lo dejen en el trailer.",
      "perk": "Dos entradas a la función exclusiva de One Night Only, combo grande gratis y un mes de Tinder Gold para los dos.",
      "emoji": "🎬"
    },
    {
      "min": 72,
      "name": "Doble función",
      "tagline": "Una sola película se les va a hacer corta. Vayan pensando cuál sigue.",
      "perk": "Dos entradas a la función exclusiva de One Night Only y un combo grande gratis para compartir.",
      "emoji": "🍿"
    },
    {
      "min": 55,
      "name": "Secuela confirmada",
      "tagline": "La primera parte les salió bien, y ustedes ya saben que a veces la segunda es mejor.",
      "perk": "2x1 en entradas y combo grande gratis.",
      "emoji": "🎟️"
    },
    {
      "min": 38,
      "name": "Trailer prometedor",
      "tagline": "Todavía no vieron la película entera, pero el trailer engancha bastante.",
      "perk": "2x1 en entradas y 30% off en candy.",
      "emoji": "🎞️"
    },
    {
      "min": 18,
      "name": "Matiné de domingo",
      "tagline": "Sin apuro, con luz de día y pochoclos de por medio. Se empieza así.",
      "perk": "30% off en candy.",
      "emoji": "🥤"
    },
    {
      "min": 0,
      "name": "Créditos iniciales",
      "tagline": "Cero en común, por ahora. Todas las comedias románticas arrancan exactamente así y después no los separa nadie.",
      "perk": "20% off en candy: un pochoclo grande y media hora para descubrir en qué sí coinciden.",
      "emoji": "✨"
    }
  ],
  "copy": {
    "landing": {
      "hero": "Una noche. Una función. Un match.",
      "sub": "Cinemark arma una función solo para solteros de One Night Only. Contestás un cuestionario de cine, te comparás con quien quieras de la sala y lo que coinciden lo desbloquean juntos.",
      "cta": "Entrá con Google",
      "steps": [
        {
          "title": "Contestá el cuestionario",
          "text": "Pochoclo dulce o salado, tu género, dónde te gusta sentarte y qué película elegirías para una primera cita. Dos minutos, sin vueltas.",
          "emoji": "🍿"
        },
        {
          "title": "Llevate tu código",
          "text": "Te damos seis caracteres. Esa es tu credencial: no lleva tu teléfono, ni tu Instagram, ni nada que no quieras dar.",
          "emoji": "🎟️"
        },
        {
          "title": "Comparate en la sala",
          "text": "Escaneás el QR de la otra persona o tipeás su código, y en dos segundos saben cuánto tienen en común.",
          "emoji": "📲"
        },
        {
          "title": "Desbloqueen el beneficio",
          "text": "Cuanto más alto el match, mejor lo que se llevan. Pero se retira de a dos: solo no vale.",
          "emoji": "🎬"
        }
      ]
    },
    "micro": {
      "onboardingIntro": "Unas preguntas sobre cine y una sobre pochoclos, que es la que más pesa. Contestá lo que de verdad mirás, no lo que queda bien.",
      "onboardingDone": "Perfil armado. Ese código de arriba es tuyo: decíselo a quien te dé curiosidad.",
      "emptyFeed": "Todavía no te comparaste con nadie. Mirá para los costados: la sala está llena de gente en la misma.",
      "compareCta": "Ver cuánto coincidimos",
      "codeExplainer": "Estos seis caracteres son tu credencial. Se los decís a alguien en la fila del candy, los tipea, y al toque ven cuánto coinciden. No lleva tu teléfono ni tus redes: si querés dar algo más, lo das vos.",
      "shareText": "Estoy en la función de One Night Only de Cinemark 🍿 Mi código de Movie Match es {code} — metelo y fijate cuánto coincidimos.",
      "likeSent": "Le llegó. Ahora la pelota está del otro lado.",
      "mutualMatch": "Es mutuo: los dos apretaron el mismo botón. Vayan juntos al candy a buscar lo que desbloquearon, que la función arranca."
    }
  }
};
