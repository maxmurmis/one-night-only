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
          "label": "Dulce como yo",
          "emoji": "🍬"
        },
        {
          "value": "salado",
          "label": "Salado, como corresponde",
          "emoji": "🧂"
        },
        {
          "value": "mitad-y-mitad",
          "label": "Mitad y mitad, lo mejor de los dos mundos",
          "emoji": "🤝"
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
          "label": "Doblada, el cine es para mirar la pantalla",
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
      "prompt": "Confesá: ¿quién te hace comprar la entrada solo por estar en la peli?",
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
      "id": "peli-odiada",
      "section": "vibra",
      "prompt": "Salís del cine y la persona que te acompaña amó la película que vos odiaste. ¿Qué hacés?",
      "kind": "scale",
      "options": [],
      "scoringMode": "scale",
      "weight": 7,
      "revealCopy": "Manejan la sinceridad igual. Ninguno de los dos va a fingir que le gustó algo que no le gustó.",
      "clashCopy": "Uno banca la mentira piadosa y el otro la destroza en el lobby. Ojo con la charla de la salida.",
      "scaleLabels": [
        "Digo que estuvo buenísima y listo",
        "La destrozo ahí mismo, con argumentos"
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
    },
    {
      "id": "el-senor-de-los-anillos-las-dos-torres",
      "label": "El Señor de los Anillos: Las Dos Torres",
      "popularity": 5,
      "emoji": "🗡️",
      "meta": "2002",
      "search": "aventura fantasia",
      "tags": [
        "aventura",
        "fantasia"
      ]
    },
    {
      "id": "el-senor-de-los-anillos-el-retorno-del-rey",
      "label": "El Señor de los Anillos: El Retorno del Rey",
      "popularity": 5,
      "emoji": "👑",
      "meta": "2003",
      "search": "aventura fantasia",
      "tags": [
        "aventura",
        "fantasia"
      ]
    },
    {
      "id": "el-hobbit-un-viaje-inesperado",
      "label": "El Hobbit: Un Viaje Inesperado",
      "popularity": 4,
      "emoji": "🧝",
      "meta": "2012",
      "search": "aventura fantasia",
      "tags": [
        "aventura",
        "fantasia"
      ]
    },
    {
      "id": "harry-potter-y-la-camara-secreta",
      "label": "Harry Potter y la Cámara Secreta",
      "popularity": 4,
      "emoji": "🐍",
      "meta": "2002",
      "search": "fantasia aventura",
      "tags": [
        "fantasia",
        "aventura"
      ]
    },
    {
      "id": "harry-potter-y-el-prisionero-de-azkaban",
      "label": "Harry Potter y el Prisionero de Azkaban",
      "popularity": 4,
      "emoji": "🐺",
      "meta": "2004",
      "search": "fantasia aventura",
      "tags": [
        "fantasia",
        "aventura"
      ]
    },
    {
      "id": "harry-potter-y-el-caliz-de-fuego",
      "label": "Harry Potter y el Cáliz de Fuego",
      "popularity": 4,
      "emoji": "🔥",
      "meta": "2005",
      "search": "fantasia aventura",
      "tags": [
        "fantasia",
        "aventura"
      ]
    },
    {
      "id": "harry-potter-y-las-reliquias-de-la-muerte-parte-2",
      "label": "Harry Potter y las Reliquias de la Muerte: Parte 2",
      "popularity": 4,
      "emoji": "⚡",
      "meta": "2011",
      "search": "fantasia aventura",
      "tags": [
        "fantasia",
        "aventura"
      ]
    },
    {
      "id": "star-wars-el-imperio-contraataca",
      "label": "Star Wars: El Imperio Contraataca",
      "popularity": 4,
      "emoji": "❄️",
      "meta": "1980",
      "search": "ciencia-ficcion aventura",
      "tags": [
        "ciencia-ficcion",
        "aventura"
      ]
    },
    {
      "id": "star-wars-el-retorno-del-jedi",
      "label": "Star Wars: El Retorno del Jedi",
      "popularity": 4,
      "emoji": "🌕",
      "meta": "1983",
      "search": "ciencia-ficcion aventura",
      "tags": [
        "ciencia-ficcion",
        "aventura"
      ]
    },
    {
      "id": "star-wars-la-amenaza-fantasma",
      "label": "Star Wars: La Amenaza Fantasma",
      "popularity": 4,
      "emoji": "🤖",
      "meta": "1999",
      "search": "ciencia-ficcion aventura",
      "tags": [
        "ciencia-ficcion",
        "aventura"
      ]
    },
    {
      "id": "star-wars-el-despertar-de-la-fuerza",
      "label": "Star Wars: El Despertar de la Fuerza",
      "popularity": 4,
      "emoji": "✨",
      "meta": "2015",
      "search": "ciencia-ficcion aventura",
      "tags": [
        "ciencia-ficcion",
        "aventura"
      ]
    },
    {
      "id": "rogue-one-una-historia-de-star-wars",
      "label": "Rogue One: Una Historia de Star Wars",
      "popularity": 3,
      "emoji": "🌌",
      "meta": "2016",
      "search": "ciencia-ficcion accion",
      "tags": [
        "ciencia-ficcion",
        "accion"
      ]
    },
    {
      "id": "matrix-recargado",
      "label": "Matrix Recargado",
      "popularity": 3,
      "emoji": "🕶️",
      "meta": "2003",
      "search": "ciencia-ficcion accion",
      "tags": [
        "ciencia-ficcion",
        "accion"
      ]
    },
    {
      "id": "terminator-2-el-juicio-final",
      "label": "Terminator 2: El Juicio Final",
      "popularity": 4,
      "emoji": "🦾",
      "meta": "1991",
      "search": "ciencia-ficcion accion",
      "tags": [
        "ciencia-ficcion",
        "accion"
      ]
    },
    {
      "id": "terminator",
      "label": "Terminator",
      "popularity": 3,
      "emoji": "⏳",
      "meta": "1984",
      "search": "ciencia-ficcion accion",
      "tags": [
        "ciencia-ficcion",
        "accion"
      ]
    },
    {
      "id": "aliens-el-regreso",
      "label": "Aliens: El Regreso",
      "popularity": 3,
      "emoji": "👾",
      "meta": "1986",
      "search": "ciencia-ficcion accion",
      "tags": [
        "ciencia-ficcion",
        "accion"
      ]
    },
    {
      "id": "depredador",
      "label": "Depredador",
      "popularity": 3,
      "emoji": "🌴",
      "meta": "1987",
      "search": "accion ciencia-ficcion",
      "tags": [
        "accion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "duro-de-matar",
      "label": "Duro de Matar",
      "popularity": 4,
      "emoji": "🏢",
      "meta": "1988",
      "search": "accion thriller",
      "tags": [
        "accion",
        "thriller"
      ]
    },
    {
      "id": "volver-al-futuro-ii",
      "label": "Volver al Futuro II",
      "popularity": 4,
      "emoji": "🛹",
      "meta": "1989",
      "search": "ciencia-ficcion comedia",
      "tags": [
        "ciencia-ficcion",
        "comedia"
      ]
    },
    {
      "id": "indiana-jones-en-busca-del-arca-perdida",
      "label": "Indiana Jones: En Busca del Arca Perdida",
      "popularity": 4,
      "emoji": "🤠",
      "meta": "1981",
      "search": "aventura accion",
      "tags": [
        "aventura",
        "accion"
      ]
    },
    {
      "id": "indiana-jones-y-la-ultima-cruzada",
      "label": "Indiana Jones y la Última Cruzada",
      "popularity": 4,
      "emoji": "🏺",
      "meta": "1989",
      "search": "aventura accion",
      "tags": [
        "aventura",
        "accion"
      ]
    },
    {
      "id": "piratas-del-caribe-la-maldicion-del-perla-negra",
      "label": "Piratas del Caribe: La Maldición del Perla Negra",
      "popularity": 5,
      "emoji": "🏴‍☠️",
      "meta": "2003",
      "search": "aventura fantasia",
      "tags": [
        "aventura",
        "fantasia"
      ]
    },
    {
      "id": "mision-imposible",
      "label": "Misión Imposible",
      "popularity": 4,
      "emoji": "🕵️",
      "meta": "1996",
      "search": "accion thriller",
      "tags": [
        "accion",
        "thriller"
      ]
    },
    {
      "id": "mision-imposible-nacion-secreta",
      "label": "Misión Imposible: Nación Secreta",
      "popularity": 3,
      "emoji": "✈️",
      "meta": "2015",
      "search": "accion thriller",
      "tags": [
        "accion",
        "thriller"
      ]
    },
    {
      "id": "casino-royale",
      "label": "Casino Royale",
      "popularity": 4,
      "emoji": "🃏",
      "meta": "2006",
      "search": "accion thriller",
      "tags": [
        "accion",
        "thriller"
      ]
    },
    {
      "id": "skyfall",
      "label": "Skyfall",
      "popularity": 4,
      "emoji": "🔫",
      "meta": "2012",
      "search": "accion thriller",
      "tags": [
        "accion",
        "thriller"
      ]
    },
    {
      "id": "el-caso-bourne",
      "label": "El Caso Bourne",
      "popularity": 3,
      "emoji": "🎒",
      "meta": "2002",
      "search": "accion thriller",
      "tags": [
        "accion",
        "thriller"
      ]
    },
    {
      "id": "maxima-velocidad",
      "label": "Máxima Velocidad",
      "popularity": 3,
      "emoji": "🚌",
      "meta": "1994",
      "search": "accion thriller",
      "tags": [
        "accion",
        "thriller"
      ]
    },
    {
      "id": "punto-de-quiebre",
      "label": "Punto de Quiebre",
      "popularity": 2,
      "emoji": "🏄",
      "meta": "1991",
      "search": "accion crimen",
      "tags": [
        "accion",
        "crimen"
      ]
    },
    {
      "id": "rapidos-y-furiosos-7",
      "label": "Rápidos y Furiosos 7",
      "popularity": 4,
      "emoji": "🚗",
      "meta": "2015",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "john-wick",
      "label": "John Wick",
      "popularity": 4,
      "emoji": "🐕",
      "meta": "2014",
      "search": "accion crimen",
      "tags": [
        "accion",
        "crimen"
      ]
    },
    {
      "id": "john-wick-4",
      "label": "John Wick 4",
      "popularity": 3,
      "emoji": "🕴️",
      "meta": "2023",
      "search": "accion crimen",
      "tags": [
        "accion",
        "crimen"
      ]
    },
    {
      "id": "gladiador-ii",
      "label": "Gladiador II",
      "popularity": 3,
      "emoji": "🛡️",
      "meta": "2024",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "top-gun",
      "label": "Top Gun",
      "popularity": 4,
      "emoji": "🛩️",
      "meta": "1986",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "rocky-iv",
      "label": "Rocky IV",
      "popularity": 3,
      "emoji": "🥊",
      "meta": "1985",
      "search": "drama accion",
      "tags": [
        "drama",
        "accion"
      ]
    },
    {
      "id": "creed-corazon-de-campeon",
      "label": "Creed: Corazón de Campeón",
      "popularity": 3,
      "emoji": "🥊",
      "meta": "2015",
      "search": "drama accion",
      "tags": [
        "drama",
        "accion"
      ]
    },
    {
      "id": "karate-kid",
      "label": "Karate Kid",
      "popularity": 4,
      "emoji": "🥋",
      "meta": "1984",
      "search": "drama aventura",
      "tags": [
        "drama",
        "aventura"
      ]
    },
    {
      "id": "rambo",
      "label": "Rambo",
      "popularity": 3,
      "emoji": "🎯",
      "meta": "1982",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "el-quinto-elemento",
      "label": "El Quinto Elemento",
      "popularity": 3,
      "emoji": "🚕",
      "meta": "1997",
      "search": "ciencia-ficcion aventura",
      "tags": [
        "ciencia-ficcion",
        "aventura"
      ]
    },
    {
      "id": "dia-de-la-independencia",
      "label": "Día de la Independencia",
      "popularity": 4,
      "emoji": "🛸",
      "meta": "1996",
      "search": "ciencia-ficcion accion",
      "tags": [
        "ciencia-ficcion",
        "accion"
      ]
    },
    {
      "id": "armageddon",
      "label": "Armageddon",
      "popularity": 4,
      "emoji": "☄️",
      "meta": "1998",
      "search": "accion ciencia-ficcion",
      "tags": [
        "accion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "impacto-profundo",
      "label": "Impacto Profundo",
      "popularity": 2,
      "emoji": "🌊",
      "meta": "1998",
      "search": "drama ciencia-ficcion",
      "tags": [
        "drama",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "twister",
      "label": "Twister",
      "popularity": 3,
      "emoji": "🌪️",
      "meta": "1996",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "el-dia-despues-de-manana",
      "label": "El Día Después de Mañana",
      "popularity": 3,
      "emoji": "🧊",
      "meta": "2004",
      "search": "accion ciencia-ficcion",
      "tags": [
        "accion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "2012",
      "label": "2012",
      "popularity": 3,
      "emoji": "🌋",
      "meta": "2009",
      "search": "accion ciencia-ficcion",
      "tags": [
        "accion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "godzilla",
      "label": "Godzilla",
      "popularity": 3,
      "emoji": "🦖",
      "meta": "2014",
      "search": "accion ciencia-ficcion",
      "tags": [
        "accion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "king-kong",
      "label": "King Kong",
      "popularity": 3,
      "emoji": "🦍",
      "meta": "2005",
      "search": "aventura accion",
      "tags": [
        "aventura",
        "accion"
      ]
    },
    {
      "id": "jurassic-world",
      "label": "Jurassic World",
      "popularity": 4,
      "emoji": "🦕",
      "meta": "2015",
      "search": "aventura accion",
      "tags": [
        "aventura",
        "accion"
      ]
    },
    {
      "id": "el-mundo-perdido-jurassic-park",
      "label": "El Mundo Perdido: Jurassic Park",
      "popularity": 3,
      "emoji": "🌿",
      "meta": "1997",
      "search": "aventura accion",
      "tags": [
        "aventura",
        "accion"
      ]
    },
    {
      "id": "los-juegos-del-hambre",
      "label": "Los Juegos del Hambre",
      "popularity": 4,
      "emoji": "🏹",
      "meta": "2012",
      "search": "accion ciencia-ficcion",
      "tags": [
        "accion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "duna-parte-dos",
      "label": "Duna: Parte Dos",
      "popularity": 4,
      "emoji": "🏜️",
      "meta": "2024",
      "search": "ciencia-ficcion aventura",
      "tags": [
        "ciencia-ficcion",
        "aventura"
      ]
    },
    {
      "id": "godzilla-minus-one",
      "label": "Godzilla Minus One",
      "popularity": 2,
      "emoji": "🌊",
      "meta": "2023",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "iron-man",
      "label": "Iron Man",
      "popularity": 5,
      "emoji": "🦾",
      "meta": "2008",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "los-vengadores",
      "label": "Los Vengadores",
      "popularity": 5,
      "emoji": "🛡️",
      "meta": "2012",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "avengers-infinity-war",
      "label": "Avengers: Infinity War",
      "popularity": 5,
      "emoji": "💎",
      "meta": "2018",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "capitan-america-civil-war",
      "label": "Capitán América: Civil War",
      "popularity": 4,
      "emoji": "🇺🇸",
      "meta": "2016",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "guardianes-de-la-galaxia",
      "label": "Guardianes de la Galaxia",
      "popularity": 4,
      "emoji": "🎧",
      "meta": "2014",
      "search": "accion comedia",
      "tags": [
        "accion",
        "comedia"
      ]
    },
    {
      "id": "thor-ragnarok",
      "label": "Thor: Ragnarok",
      "popularity": 4,
      "emoji": "🔨",
      "meta": "2017",
      "search": "accion comedia",
      "tags": [
        "accion",
        "comedia"
      ]
    },
    {
      "id": "pantera-negra",
      "label": "Pantera Negra",
      "popularity": 4,
      "emoji": "🐈‍⬛",
      "meta": "2018",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "spider-man-sin-camino-a-casa",
      "label": "Spider-Man: Sin Camino a Casa",
      "popularity": 5,
      "emoji": "🕸️",
      "meta": "2021",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "el-hombre-arana",
      "label": "El Hombre Araña",
      "popularity": 4,
      "emoji": "🕷️",
      "meta": "2002",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "deadpool",
      "label": "Deadpool",
      "popularity": 4,
      "emoji": "🩸",
      "meta": "2016",
      "search": "accion comedia",
      "tags": [
        "accion",
        "comedia"
      ]
    },
    {
      "id": "deadpool-y-wolverine",
      "label": "Deadpool y Wolverine",
      "popularity": 4,
      "emoji": "🍻",
      "meta": "2024",
      "search": "accion comedia",
      "tags": [
        "accion",
        "comedia"
      ]
    },
    {
      "id": "logan",
      "label": "Logan",
      "popularity": 4,
      "emoji": "🥃",
      "meta": "2017",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "x-men",
      "label": "X-Men",
      "popularity": 3,
      "emoji": "🧬",
      "meta": "2000",
      "search": "accion ciencia-ficcion",
      "tags": [
        "accion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "batman-inicia",
      "label": "Batman Inicia",
      "popularity": 4,
      "emoji": "🦇",
      "meta": "2005",
      "search": "accion crimen",
      "tags": [
        "accion",
        "crimen"
      ]
    },
    {
      "id": "the-batman",
      "label": "The Batman",
      "popularity": 4,
      "emoji": "🌧️",
      "meta": "2022",
      "search": "crimen thriller",
      "tags": [
        "crimen",
        "thriller"
      ]
    },
    {
      "id": "batman-de-tim-burton",
      "label": "Batman de Tim Burton",
      "popularity": 3,
      "emoji": "🃏",
      "meta": "1989",
      "search": "accion crimen",
      "tags": [
        "accion",
        "crimen"
      ]
    },
    {
      "id": "el-hombre-de-acero",
      "label": "El Hombre de Acero",
      "popularity": 3,
      "emoji": "🦸",
      "meta": "2013",
      "search": "accion ciencia-ficcion",
      "tags": [
        "accion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "mujer-maravilla",
      "label": "Mujer Maravilla",
      "popularity": 4,
      "emoji": "🪢",
      "meta": "2017",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "superman",
      "label": "Superman",
      "popularity": 3,
      "emoji": "🧢",
      "meta": "1978",
      "search": "accion aventura",
      "tags": [
        "accion",
        "aventura"
      ]
    },
    {
      "id": "los-increibles",
      "label": "Los Increíbles",
      "popularity": 5,
      "emoji": "👨‍👩‍👧‍👦",
      "meta": "2004",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "watchmen",
      "label": "Watchmen",
      "popularity": 2,
      "emoji": "🕰️",
      "meta": "2009",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "buscando-a-nemo",
      "label": "Buscando a Nemo",
      "popularity": 5,
      "emoji": "🐠",
      "meta": "2003",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "buscando-a-dory",
      "label": "Buscando a Dory",
      "popularity": 4,
      "emoji": "🐟",
      "meta": "2016",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "monsters-inc",
      "label": "Monsters, Inc.",
      "popularity": 5,
      "emoji": "👹",
      "meta": "2001",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "ratatouille",
      "label": "Ratatouille",
      "popularity": 4,
      "emoji": "🐀",
      "meta": "2007",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "valiente",
      "label": "Valiente",
      "popularity": 3,
      "emoji": "🏹",
      "meta": "2012",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "frozen-una-aventura-congelada",
      "label": "Frozen: Una Aventura Congelada",
      "popularity": 5,
      "emoji": "⛄",
      "meta": "2013",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "frozen-ii",
      "label": "Frozen II",
      "popularity": 4,
      "emoji": "🌊",
      "meta": "2019",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "moana-un-mar-de-aventuras",
      "label": "Moana: Un Mar de Aventuras",
      "popularity": 4,
      "emoji": "🌺",
      "meta": "2016",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "encanto",
      "label": "Encanto",
      "popularity": 4,
      "emoji": "🦋",
      "meta": "2021",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "zootopia",
      "label": "Zootopia",
      "popularity": 4,
      "emoji": "🦊",
      "meta": "2016",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "enredados",
      "label": "Enredados",
      "popularity": 4,
      "emoji": "💇",
      "meta": "2010",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "la-sirenita",
      "label": "La Sirenita",
      "popularity": 4,
      "emoji": "🧜",
      "meta": "1989",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "la-bella-y-la-bestia",
      "label": "La Bella y la Bestia",
      "popularity": 4,
      "emoji": "🌹",
      "meta": "1991",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "aladdin",
      "label": "Aladdín",
      "popularity": 4,
      "emoji": "🧞",
      "meta": "1992",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "mulan",
      "label": "Mulán",
      "popularity": 4,
      "emoji": "⚔️",
      "meta": "1998",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "bambi",
      "label": "Bambi",
      "popularity": 3,
      "emoji": "🦌",
      "meta": "1942",
      "search": "animacion drama",
      "tags": [
        "animacion",
        "drama"
      ]
    },
    {
      "id": "dumbo",
      "label": "Dumbo",
      "popularity": 3,
      "emoji": "🐘",
      "meta": "1941",
      "search": "animacion drama",
      "tags": [
        "animacion",
        "drama"
      ]
    },
    {
      "id": "blancanieves-y-los-siete-enanitos",
      "label": "Blancanieves y los Siete Enanitos",
      "popularity": 3,
      "emoji": "🍎",
      "meta": "1937",
      "search": "animacion fantasia",
      "tags": [
        "animacion",
        "fantasia"
      ]
    },
    {
      "id": "la-dama-y-el-vagabundo",
      "label": "La Dama y el Vagabundo",
      "popularity": 3,
      "emoji": "🍝",
      "meta": "1955",
      "search": "animacion romance",
      "tags": [
        "animacion",
        "romance"
      ]
    },
    {
      "id": "el-jorobado-de-notre-dame",
      "label": "El Jorobado de Notre Dame",
      "popularity": 3,
      "emoji": "🔔",
      "meta": "1996",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "hercules",
      "label": "Hércules",
      "popularity": 3,
      "emoji": "⚡",
      "meta": "1997",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "tarzan",
      "label": "Tarzán",
      "popularity": 3,
      "emoji": "🌳",
      "meta": "1999",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "lilo-stitch",
      "label": "Lilo & Stitch",
      "popularity": 4,
      "emoji": "🌺",
      "meta": "2002",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "kung-fu-panda",
      "label": "Kung Fu Panda",
      "popularity": 4,
      "emoji": "🐼",
      "meta": "2008",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "como-entrenar-a-tu-dragon",
      "label": "Cómo Entrenar a tu Dragón",
      "popularity": 4,
      "emoji": "🐉",
      "meta": "2010",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "madagascar",
      "label": "Madagascar",
      "popularity": 4,
      "emoji": "🦓",
      "meta": "2005",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "la-era-de-hielo",
      "label": "La Era de Hielo",
      "popularity": 4,
      "emoji": "🦣",
      "meta": "2002",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "mi-villano-favorito",
      "label": "Mi Villano Favorito",
      "popularity": 4,
      "emoji": "🌙",
      "meta": "2010",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "minions",
      "label": "Minions",
      "popularity": 4,
      "emoji": "🍌",
      "meta": "2015",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "rio",
      "label": "Río",
      "popularity": 3,
      "emoji": "🦜",
      "meta": "2011",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "happy-feet-el-pinguino",
      "label": "Happy Feet: El Pingüino",
      "popularity": 3,
      "emoji": "🐧",
      "meta": "2006",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "soul",
      "label": "Soul",
      "popularity": 4,
      "emoji": "🎹",
      "meta": "2020",
      "search": "animacion drama",
      "tags": [
        "animacion",
        "drama"
      ]
    },
    {
      "id": "luca",
      "label": "Luca",
      "popularity": 3,
      "emoji": "🛵",
      "meta": "2021",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "red",
      "label": "Red",
      "popularity": 3,
      "emoji": "🐼",
      "meta": "2022",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "elementos",
      "label": "Elementos",
      "popularity": 3,
      "emoji": "🔥",
      "meta": "2023",
      "search": "animacion romance",
      "tags": [
        "animacion",
        "romance"
      ]
    },
    {
      "id": "intensamente-2",
      "label": "Intensamente 2",
      "popularity": 5,
      "emoji": "😰",
      "meta": "2024",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "spider-man-cruzando-el-multiverso",
      "label": "Spider-Man: Cruzando el Multiverso",
      "popularity": 4,
      "emoji": "🕸️",
      "meta": "2023",
      "search": "animacion accion",
      "tags": [
        "animacion",
        "accion"
      ]
    },
    {
      "id": "el-gato-con-botas-el-ultimo-deseo",
      "label": "El Gato con Botas: El Último Deseo",
      "popularity": 4,
      "emoji": "🐈",
      "meta": "2022",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "shrek-2",
      "label": "Shrek 2",
      "popularity": 5,
      "emoji": "🍸",
      "meta": "2004",
      "search": "animacion comedia",
      "tags": [
        "animacion",
        "comedia"
      ]
    },
    {
      "id": "robots",
      "label": "Robots",
      "popularity": 2,
      "emoji": "🔧",
      "meta": "2005",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "coraline-y-la-puerta-secreta",
      "label": "Coraline y la Puerta Secreta",
      "popularity": 3,
      "emoji": "🔘",
      "meta": "2009",
      "search": "animacion terror",
      "tags": [
        "animacion",
        "terror"
      ]
    },
    {
      "id": "el-extrano-mundo-de-jack",
      "label": "El Extraño Mundo de Jack",
      "popularity": 4,
      "emoji": "🎃",
      "meta": "1993",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "persepolis",
      "label": "Persépolis",
      "popularity": 2,
      "emoji": "✒️",
      "meta": "2007",
      "search": "animacion drama",
      "tags": [
        "animacion",
        "drama"
      ]
    },
    {
      "id": "vals-con-bashir",
      "label": "Vals con Bashir",
      "popularity": 1,
      "emoji": "🎖️",
      "meta": "2008",
      "search": "animacion documental",
      "tags": [
        "animacion",
        "documental"
      ]
    },
    {
      "id": "flow",
      "label": "Flow",
      "popularity": 3,
      "emoji": "🐈",
      "meta": "2024",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "la-princesa-mononoke",
      "label": "La Princesa Mononoke",
      "popularity": 3,
      "emoji": "🐗",
      "meta": "1997",
      "search": "animacion fantasia",
      "tags": [
        "animacion",
        "fantasia"
      ]
    },
    {
      "id": "mi-vecino-totoro",
      "label": "Mi Vecino Totoro",
      "popularity": 3,
      "emoji": "🌰",
      "meta": "1988",
      "search": "animacion fantasia",
      "tags": [
        "animacion",
        "fantasia"
      ]
    },
    {
      "id": "el-castillo-ambulante",
      "label": "El Castillo Ambulante",
      "popularity": 3,
      "emoji": "🏰",
      "meta": "2004",
      "search": "animacion fantasia",
      "tags": [
        "animacion",
        "fantasia"
      ]
    },
    {
      "id": "el-nino-y-la-garza",
      "label": "El Niño y la Garza",
      "popularity": 2,
      "emoji": "🪶",
      "meta": "2023",
      "search": "animacion fantasia",
      "tags": [
        "animacion",
        "fantasia"
      ]
    },
    {
      "id": "akira",
      "label": "Akira",
      "popularity": 2,
      "emoji": "🏍️",
      "meta": "1988",
      "search": "animacion ciencia-ficcion",
      "tags": [
        "animacion",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "perfect-blue",
      "label": "Perfect Blue",
      "popularity": 1,
      "emoji": "🎤",
      "meta": "1997",
      "search": "animacion thriller",
      "tags": [
        "animacion",
        "thriller"
      ]
    },
    {
      "id": "la-tumba-de-las-luciernagas",
      "label": "La Tumba de las Luciérnagas",
      "popularity": 2,
      "emoji": "🕯️",
      "meta": "1988",
      "search": "animacion drama",
      "tags": [
        "animacion",
        "drama"
      ]
    },
    {
      "id": "it-eso",
      "label": "It: Eso",
      "popularity": 4,
      "emoji": "🎈",
      "meta": "2017",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "el-conjuro",
      "label": "El Conjuro",
      "popularity": 4,
      "emoji": "🪆",
      "meta": "2013",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "actividad-paranormal",
      "label": "Actividad Paranormal",
      "popularity": 3,
      "emoji": "📹",
      "meta": "2007",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "el-aro",
      "label": "El Aro",
      "popularity": 3,
      "emoji": "📼",
      "meta": "2002",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "se-lo-que-hicieron-el-verano-pasado",
      "label": "Sé lo que Hicieron el Verano Pasado",
      "popularity": 3,
      "emoji": "🪝",
      "meta": "1997",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "halloween",
      "label": "Halloween",
      "popularity": 3,
      "emoji": "🔪",
      "meta": "1978",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "pesadilla-en-la-calle-elm",
      "label": "Pesadilla en la Calle Elm",
      "popularity": 3,
      "emoji": "😴",
      "meta": "1984",
      "search": "terror fantasia",
      "tags": [
        "terror",
        "fantasia"
      ]
    },
    {
      "id": "viernes-13",
      "label": "Viernes 13",
      "popularity": 3,
      "emoji": "🏕️",
      "meta": "1980",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "el-proyecto-blair-witch",
      "label": "El Proyecto Blair Witch",
      "popularity": 3,
      "emoji": "🌲",
      "meta": "1999",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "nosferatu",
      "label": "Nosferatu",
      "popularity": 2,
      "emoji": "🦇",
      "meta": "2024",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "el-bebe-de-rosemary",
      "label": "El Bebé de Rosemary",
      "popularity": 2,
      "emoji": "👶",
      "meta": "1968",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "carrie",
      "label": "Carrie",
      "popularity": 2,
      "emoji": "🩸",
      "meta": "1976",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "la-noche-de-los-muertos-vivientes",
      "label": "La Noche de los Muertos Vivientes",
      "popularity": 2,
      "emoji": "🧟",
      "meta": "1968",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "un-lugar-en-silencio",
      "label": "Un Lugar en Silencio",
      "popularity": 4,
      "emoji": "🤫",
      "meta": "2018",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "bird-box-a-ciegas",
      "label": "Bird Box: A Ciegas",
      "popularity": 3,
      "emoji": "🙈",
      "meta": "2018",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "nosotros",
      "label": "Nosotros",
      "popularity": 3,
      "emoji": "✂️",
      "meta": "2019",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "la-bruja",
      "label": "La Bruja",
      "popularity": 2,
      "emoji": "🐐",
      "meta": "2015",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "el-faro",
      "label": "El Faro",
      "popularity": 1,
      "emoji": "🗼",
      "meta": "2019",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "terrifier-3",
      "label": "Terrifier 3",
      "popularity": 2,
      "emoji": "🤡",
      "meta": "2024",
      "search": "terror",
      "tags": [
        "terror"
      ]
    },
    {
      "id": "los-otros",
      "label": "Los Otros",
      "popularity": 3,
      "emoji": "🕯️",
      "meta": "2001",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "el-orfanato",
      "label": "El Orfanato",
      "popularity": 3,
      "emoji": "🎭",
      "meta": "2007",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "rec",
      "label": "REC",
      "popularity": 2,
      "emoji": "📷",
      "meta": "2007",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "dejame-entrar",
      "label": "Déjame Entrar",
      "popularity": 1,
      "emoji": "❄️",
      "meta": "2008",
      "search": "terror romance",
      "tags": [
        "terror",
        "romance"
      ]
    },
    {
      "id": "longlegs",
      "label": "Longlegs",
      "popularity": 2,
      "emoji": "🪆",
      "meta": "2024",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "hablame",
      "label": "Háblame",
      "popularity": 2,
      "emoji": "🖐️",
      "meta": "2022",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "zombieland-tierra-de-zombies",
      "label": "Zombieland: Tierra de Zombies",
      "popularity": 3,
      "emoji": "🍰",
      "meta": "2009",
      "search": "terror comedia",
      "tags": [
        "terror",
        "comedia"
      ]
    },
    {
      "id": "guerra-mundial-z",
      "label": "Guerra Mundial Z",
      "popularity": 3,
      "emoji": "🚁",
      "meta": "2013",
      "search": "accion terror",
      "tags": [
        "accion",
        "terror"
      ]
    },
    {
      "id": "28-dias-despues",
      "label": "28 Días Después",
      "popularity": 3,
      "emoji": "🚴",
      "meta": "2002",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "saw-el-juego-del-miedo",
      "label": "Saw: El Juego del Miedo",
      "popularity": 3,
      "emoji": "🧩",
      "meta": "2004",
      "search": "terror thriller",
      "tags": [
        "terror",
        "thriller"
      ]
    },
    {
      "id": "superbad",
      "label": "Superbad",
      "popularity": 3,
      "emoji": "🍺",
      "meta": "2007",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "escuela-de-rock",
      "label": "Escuela de Rock",
      "popularity": 4,
      "emoji": "🎸",
      "meta": "2003",
      "search": "comedia musical",
      "tags": [
        "comedia",
        "musical"
      ]
    },
    {
      "id": "ace-ventura-un-detective-diferente",
      "label": "Ace Ventura: Un Detective Diferente",
      "popularity": 3,
      "emoji": "🦜",
      "meta": "1994",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "la-mascara",
      "label": "La Máscara",
      "popularity": 4,
      "emoji": "🟢",
      "meta": "1994",
      "search": "comedia fantasia",
      "tags": [
        "comedia",
        "fantasia"
      ]
    },
    {
      "id": "mi-pobre-angelito",
      "label": "Mi Pobre Angelito",
      "popularity": 5,
      "emoji": "🏠",
      "meta": "1990",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "elf-el-duende",
      "label": "Elf: El Duende",
      "popularity": 3,
      "emoji": "🍬",
      "meta": "2003",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "los-cazafantasmas",
      "label": "Los Cazafantasmas",
      "popularity": 4,
      "emoji": "👻",
      "meta": "1984",
      "search": "comedia fantasia",
      "tags": [
        "comedia",
        "fantasia"
      ]
    },
    {
      "id": "hombres-de-negro",
      "label": "Hombres de Negro",
      "popularity": 4,
      "emoji": "🕶️",
      "meta": "1997",
      "search": "comedia ciencia-ficcion",
      "tags": [
        "comedia",
        "ciencia-ficcion"
      ]
    },
    {
      "id": "el-show-de-truman",
      "label": "El Show de Truman",
      "popularity": 4,
      "emoji": "📺",
      "meta": "1998",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "mejor-imposible",
      "label": "Mejor Imposible",
      "popularity": 3,
      "emoji": "🐕",
      "meta": "1997",
      "search": "comedia romance",
      "tags": [
        "comedia",
        "romance"
      ]
    },
    {
      "id": "el-diario-de-bridget-jones",
      "label": "El Diario de Bridget Jones",
      "popularity": 4,
      "emoji": "📔",
      "meta": "2001",
      "search": "comedia romance",
      "tags": [
        "comedia",
        "romance"
      ]
    },
    {
      "id": "damas-en-guerra",
      "label": "Damas en Guerra",
      "popularity": 3,
      "emoji": "👰",
      "meta": "2011",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "todopoderoso",
      "label": "Todopoderoso",
      "popularity": 3,
      "emoji": "☁️",
      "meta": "2003",
      "search": "comedia fantasia",
      "tags": [
        "comedia",
        "fantasia"
      ]
    },
    {
      "id": "zoolander",
      "label": "Zoolander",
      "popularity": 3,
      "emoji": "💇",
      "meta": "2001",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "austin-powers",
      "label": "Austin Powers",
      "popularity": 3,
      "emoji": "🕺",
      "meta": "1997",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "loco-por-mary",
      "label": "Loco por Mary",
      "popularity": 3,
      "emoji": "🐶",
      "meta": "1998",
      "search": "comedia romance",
      "tags": [
        "comedia",
        "romance"
      ]
    },
    {
      "id": "ocho-apellidos-vascos",
      "label": "Ocho Apellidos Vascos",
      "popularity": 3,
      "emoji": "🇪🇸",
      "meta": "2014",
      "search": "comedia romance",
      "tags": [
        "comedia",
        "romance"
      ]
    },
    {
      "id": "toc-toc",
      "label": "Toc Toc",
      "popularity": 3,
      "emoji": "🚪",
      "meta": "2017",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "la-comunidad",
      "label": "La Comunidad",
      "popularity": 2,
      "emoji": "🏢",
      "meta": "2000",
      "search": "comedia thriller",
      "tags": [
        "comedia",
        "thriller"
      ]
    },
    {
      "id": "mujeres-al-borde-de-un-ataque-de-nervios",
      "label": "Mujeres al Borde de un Ataque de Nervios",
      "popularity": 2,
      "emoji": "☎️",
      "meta": "1988",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "el-hoyo",
      "label": "El Hoyo",
      "popularity": 3,
      "emoji": "🕳️",
      "meta": "2019",
      "search": "ciencia-ficcion thriller",
      "tags": [
        "ciencia-ficcion",
        "thriller"
      ]
    },
    {
      "id": "campeones",
      "label": "Campeones",
      "popularity": 2,
      "emoji": "🏀",
      "meta": "2018",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "perfectos-desconocidos",
      "label": "Perfectos Desconocidos",
      "popularity": 3,
      "emoji": "📱",
      "meta": "2016",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "una-noche-fuera-de-control",
      "label": "Una Noche Fuera de Control",
      "popularity": 2,
      "emoji": "🎲",
      "meta": "2009",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "ted",
      "label": "Ted",
      "popularity": 3,
      "emoji": "🧸",
      "meta": "2012",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "son-como-ninos",
      "label": "Son como Niños",
      "popularity": 3,
      "emoji": "🛶",
      "meta": "2010",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "chicas-malas",
      "label": "Chicas Malas",
      "popularity": 3,
      "emoji": "💅",
      "meta": "2024",
      "search": "comedia musical",
      "tags": [
        "comedia",
        "musical"
      ]
    },
    {
      "id": "luna-de-avellaneda",
      "label": "Luna de Avellaneda",
      "popularity": 4,
      "emoji": "🏟️",
      "meta": "2004",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "el-aura",
      "label": "El Aura",
      "popularity": 3,
      "emoji": "🦌",
      "meta": "2005",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "kamchatka",
      "label": "Kamchatka",
      "popularity": 3,
      "emoji": "🎲",
      "meta": "2002",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "un-cuento-chino",
      "label": "Un Cuento Chino",
      "popularity": 4,
      "emoji": "🐄",
      "meta": "2011",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "el-clan",
      "label": "El Clan",
      "popularity": 4,
      "emoji": "🏠",
      "meta": "2015",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "carancho",
      "label": "Carancho",
      "popularity": 3,
      "emoji": "🚑",
      "meta": "2010",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "leonera",
      "label": "Leonera",
      "popularity": 2,
      "emoji": "🍼",
      "meta": "2008",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "elefante-blanco",
      "label": "Elefante Blanco",
      "popularity": 3,
      "emoji": "⛪",
      "meta": "2012",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "tiempo-de-valientes",
      "label": "Tiempo de Valientes",
      "popularity": 3,
      "emoji": "🔫",
      "meta": "2005",
      "search": "comedia accion",
      "tags": [
        "comedia",
        "accion"
      ]
    },
    {
      "id": "papeles-en-el-viento",
      "label": "Papeles en el Viento",
      "popularity": 3,
      "emoji": "⚽",
      "meta": "2015",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "corazon-de-leon",
      "label": "Corazón de León",
      "popularity": 4,
      "emoji": "🦁",
      "meta": "2013",
      "search": "comedia romance",
      "tags": [
        "comedia",
        "romance"
      ]
    },
    {
      "id": "me-case-con-un-boludo",
      "label": "Me Casé con un Boludo",
      "popularity": 4,
      "emoji": "💍",
      "meta": "2016",
      "search": "comedia romance",
      "tags": [
        "comedia",
        "romance"
      ]
    },
    {
      "id": "el-futbol-o-yo",
      "label": "El Fútbol o Yo",
      "popularity": 3,
      "emoji": "📺",
      "meta": "2017",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "baneros-3-todopoderosos",
      "label": "Bañeros 3: Todopoderosos",
      "popularity": 3,
      "emoji": "🏖️",
      "meta": "2006",
      "search": "comedia",
      "tags": [
        "comedia"
      ]
    },
    {
      "id": "casi-leyendas",
      "label": "Casi Leyendas",
      "popularity": 2,
      "emoji": "🎸",
      "meta": "2017",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "el-raton-perez",
      "label": "El Ratón Pérez",
      "popularity": 3,
      "emoji": "🦷",
      "meta": "2006",
      "search": "animacion aventura",
      "tags": [
        "animacion",
        "aventura"
      ]
    },
    {
      "id": "anita",
      "label": "Anita",
      "popularity": 2,
      "emoji": "🧩",
      "meta": "2009",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "el-bonaerense",
      "label": "El Bonaerense",
      "popularity": 2,
      "emoji": "🚔",
      "meta": "2002",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "iluminados-por-el-fuego",
      "label": "Iluminados por el Fuego",
      "popularity": 2,
      "emoji": "🎖️",
      "meta": "2005",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "cronica-de-una-fuga",
      "label": "Crónica de una Fuga",
      "popularity": 2,
      "emoji": "🕳️",
      "meta": "2006",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "los-marziano",
      "label": "Los Marziano",
      "popularity": 2,
      "emoji": "🏡",
      "meta": "2011",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "las-viudas-de-los-jueves",
      "label": "Las Viudas de los Jueves",
      "popularity": 3,
      "emoji": "🏊",
      "meta": "2009",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "tesis-sobre-un-homicidio",
      "label": "Tesis sobre un Homicidio",
      "popularity": 3,
      "emoji": "⚖️",
      "meta": "2013",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "el-perro",
      "label": "El Perro",
      "popularity": 2,
      "emoji": "🐕",
      "meta": "2004",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "whisky-romeo-zulu",
      "label": "Whisky Romeo Zulu",
      "popularity": 2,
      "emoji": "✈️",
      "meta": "2004",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "aballay",
      "label": "Aballay",
      "popularity": 1,
      "emoji": "🐎",
      "meta": "2010",
      "search": "drama aventura",
      "tags": [
        "drama",
        "aventura"
      ]
    },
    {
      "id": "rojo",
      "label": "Rojo",
      "popularity": 2,
      "emoji": "🌒",
      "meta": "2018",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "la-patota",
      "label": "La Patota",
      "popularity": 2,
      "emoji": "🏫",
      "meta": "2015",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "los-delincuentes",
      "label": "Los Delincuentes",
      "popularity": 2,
      "emoji": "💼",
      "meta": "2023",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "trenque-lauquen",
      "label": "Trenque Lauquen",
      "popularity": 1,
      "emoji": "🌾",
      "meta": "2022",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "muchachos-la-pelicula-de-la-gente",
      "label": "Muchachos, la Película de la Gente",
      "popularity": 4,
      "emoji": "🏆",
      "meta": "2023",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "diego-maradona",
      "label": "Diego Maradona",
      "popularity": 3,
      "emoji": "⚽",
      "meta": "2019",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "4x4",
      "label": "4x4",
      "popularity": 2,
      "emoji": "🚙",
      "meta": "2019",
      "search": "thriller",
      "tags": [
        "thriller"
      ]
    },
    {
      "id": "yo-adolescente",
      "label": "Yo, Adolescente",
      "popularity": 2,
      "emoji": "📓",
      "meta": "2019",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "el-profugo",
      "label": "El Prófugo",
      "popularity": 1,
      "emoji": "🎼",
      "meta": "2020",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "nieve-negra",
      "label": "Nieve Negra",
      "popularity": 2,
      "emoji": "🏔️",
      "meta": "2017",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "que-sea-ley",
      "label": "Que Sea Ley",
      "popularity": 1,
      "emoji": "💚",
      "meta": "2019",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "despues-del-silencio",
      "label": "Después del Silencio",
      "popularity": 1,
      "emoji": "🎬",
      "meta": "2023",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "volver",
      "label": "Volver",
      "popularity": 3,
      "emoji": "🌬️",
      "meta": "2006",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "hable-con-ella",
      "label": "Hable con Ella",
      "popularity": 2,
      "emoji": "💃",
      "meta": "2002",
      "search": "drama romance",
      "tags": [
        "drama",
        "romance"
      ]
    },
    {
      "id": "dolor-y-gloria",
      "label": "Dolor y Gloria",
      "popularity": 2,
      "emoji": "🎞️",
      "meta": "2019",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "mar-adentro",
      "label": "Mar Adentro",
      "popularity": 3,
      "emoji": "🌊",
      "meta": "2004",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "celda-211",
      "label": "Celda 211",
      "popularity": 2,
      "emoji": "🔒",
      "meta": "2009",
      "search": "crimen thriller",
      "tags": [
        "crimen",
        "thriller"
      ]
    },
    {
      "id": "la-piel-que-habito",
      "label": "La Piel que Habito",
      "popularity": 2,
      "emoji": "🧵",
      "meta": "2011",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "biutiful",
      "label": "Biutiful",
      "popularity": 2,
      "emoji": "🕯️",
      "meta": "2010",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "babel",
      "label": "Babel",
      "popularity": 3,
      "emoji": "🌍",
      "meta": "2006",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "21-gramos",
      "label": "21 Gramos",
      "popularity": 2,
      "emoji": "⚖️",
      "meta": "2003",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "sin-nombre",
      "label": "Sin Nombre",
      "popularity": 1,
      "emoji": "🚂",
      "meta": "2009",
      "search": "drama crimen",
      "tags": [
        "drama",
        "crimen"
      ]
    },
    {
      "id": "la-jaula-de-oro",
      "label": "La Jaula de Oro",
      "popularity": 1,
      "emoji": "🚃",
      "meta": "2013",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "gueros",
      "label": "Güeros",
      "popularity": 1,
      "emoji": "📻",
      "meta": "2014",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "nuevo-orden",
      "label": "Nuevo Orden",
      "popularity": 1,
      "emoji": "🚨",
      "meta": "2020",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "bardo",
      "label": "Bardo",
      "popularity": 1,
      "emoji": "🪶",
      "meta": "2022",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "la-isla-minima",
      "label": "La Isla Mínima",
      "popularity": 2,
      "emoji": "🐦",
      "meta": "2014",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "contratiempo",
      "label": "Contratiempo",
      "popularity": 3,
      "emoji": "⏱️",
      "meta": "2016",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "el-laberinto-de-las-ovejas",
      "label": "El Laberinto de las Ovejas",
      "popularity": 1,
      "emoji": "🐑",
      "meta": "2019",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "pinocho-de-guillermo-del-toro",
      "label": "Pinocho de Guillermo del Toro",
      "popularity": 3,
      "emoji": "🪵",
      "meta": "2022",
      "search": "animacion fantasia",
      "tags": [
        "animacion",
        "fantasia"
      ]
    },
    {
      "id": "la-forma-del-agua",
      "label": "La Forma del Agua",
      "popularity": 3,
      "emoji": "🐟",
      "meta": "2017",
      "search": "fantasia romance",
      "tags": [
        "fantasia",
        "romance"
      ]
    },
    {
      "id": "el-espinazo-del-diablo",
      "label": "El Espinazo del Diablo",
      "popularity": 2,
      "emoji": "💣",
      "meta": "2001",
      "search": "terror drama",
      "tags": [
        "terror",
        "drama"
      ]
    },
    {
      "id": "cronos",
      "label": "Cronos",
      "popularity": 1,
      "emoji": "⏳",
      "meta": "1993",
      "search": "terror fantasia",
      "tags": [
        "terror",
        "fantasia"
      ]
    },
    {
      "id": "emilia-perez",
      "label": "Emilia Pérez",
      "popularity": 2,
      "emoji": "🎤",
      "meta": "2024",
      "search": "musical crimen",
      "tags": [
        "musical",
        "crimen"
      ]
    },
    {
      "id": "cadena-perpetua",
      "label": "Cadena Perpetua",
      "popularity": 5,
      "emoji": "🔨",
      "meta": "1994",
      "search": "drama crimen",
      "tags": [
        "drama",
        "crimen"
      ]
    },
    {
      "id": "buenos-muchachos",
      "label": "Buenos Muchachos",
      "popularity": 4,
      "emoji": "🍝",
      "meta": "1990",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "el-padrino-ii",
      "label": "El Padrino II",
      "popularity": 4,
      "emoji": "🍊",
      "meta": "1974",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "scarface",
      "label": "Scarface",
      "popularity": 4,
      "emoji": "🌴",
      "meta": "1983",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "casino",
      "label": "Casino",
      "popularity": 3,
      "emoji": "🎰",
      "meta": "1995",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "el-lobo-de-wall-street",
      "label": "El Lobo de Wall Street",
      "popularity": 5,
      "emoji": "💸",
      "meta": "2013",
      "search": "crimen comedia",
      "tags": [
        "crimen",
        "comedia"
      ]
    },
    {
      "id": "los-infiltrados",
      "label": "Los Infiltrados",
      "popularity": 4,
      "emoji": "🐀",
      "meta": "2006",
      "search": "crimen thriller",
      "tags": [
        "crimen",
        "thriller"
      ]
    },
    {
      "id": "el-aviador",
      "label": "El Aviador",
      "popularity": 3,
      "emoji": "✈️",
      "meta": "2004",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "bastardos-sin-gloria",
      "label": "Bastardos sin Gloria",
      "popularity": 4,
      "emoji": "🎬",
      "meta": "2009",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "django-sin-cadenas",
      "label": "Django sin Cadenas",
      "popularity": 4,
      "emoji": "🔗",
      "meta": "2012",
      "search": "accion drama",
      "tags": [
        "accion",
        "drama"
      ]
    },
    {
      "id": "habia-una-vez-en-hollywood",
      "label": "Había una Vez en Hollywood",
      "popularity": 4,
      "emoji": "📺",
      "meta": "2019",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "los-ocho-mas-odiados",
      "label": "Los Ocho Más Odiados",
      "popularity": 3,
      "emoji": "❄️",
      "meta": "2015",
      "search": "crimen thriller",
      "tags": [
        "crimen",
        "thriller"
      ]
    },
    {
      "id": "jackie-brown",
      "label": "Jackie Brown",
      "popularity": 2,
      "emoji": "✈️",
      "meta": "1997",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "sin-lugar-para-los-debiles",
      "label": "Sin Lugar para los Débiles",
      "popularity": 3,
      "emoji": "🪙",
      "meta": "2007",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "fargo",
      "label": "Fargo",
      "popularity": 3,
      "emoji": "🪓",
      "meta": "1996",
      "search": "crimen comedia",
      "tags": [
        "crimen",
        "comedia"
      ]
    },
    {
      "id": "doce-hombres-en-pugna",
      "label": "Doce Hombres en Pugna",
      "popularity": 3,
      "emoji": "⚖️",
      "meta": "1957",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "la-ventana-indiscreta",
      "label": "La Ventana Indiscreta",
      "popularity": 3,
      "emoji": "🪟",
      "meta": "1954",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "vertigo",
      "label": "Vértigo",
      "popularity": 3,
      "emoji": "🌀",
      "meta": "1958",
      "search": "thriller romance",
      "tags": [
        "thriller",
        "romance"
      ]
    },
    {
      "id": "el-ciudadano",
      "label": "El Ciudadano",
      "popularity": 3,
      "emoji": "🛷",
      "meta": "1941",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "el-ocaso-de-una-vida",
      "label": "El Ocaso de una Vida",
      "popularity": 2,
      "emoji": "🎞️",
      "meta": "1950",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "con-faldas-y-a-lo-loco",
      "label": "Con Faldas y a lo Loco",
      "popularity": 3,
      "emoji": "🎷",
      "meta": "1959",
      "search": "comedia romance",
      "tags": [
        "comedia",
        "romance"
      ]
    },
    {
      "id": "desayuno-con-diamantes",
      "label": "Desayuno con Diamantes",
      "popularity": 3,
      "emoji": "💎",
      "meta": "1961",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "lawrence-de-arabia",
      "label": "Lawrence de Arabia",
      "popularity": 2,
      "emoji": "🐪",
      "meta": "1962",
      "search": "aventura drama",
      "tags": [
        "aventura",
        "drama"
      ]
    },
    {
      "id": "2001-odisea-del-espacio",
      "label": "2001: Odisea del Espacio",
      "popularity": 3,
      "emoji": "🪐",
      "meta": "1968",
      "search": "ciencia-ficcion drama",
      "tags": [
        "ciencia-ficcion",
        "drama"
      ]
    },
    {
      "id": "apocalipsis-now",
      "label": "Apocalipsis Now",
      "popularity": 3,
      "emoji": "🚁",
      "meta": "1979",
      "search": "drama accion",
      "tags": [
        "drama",
        "accion"
      ]
    },
    {
      "id": "el-pianista",
      "label": "El Pianista",
      "popularity": 4,
      "emoji": "🎹",
      "meta": "2002",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "la-lista-de-schindler",
      "label": "La Lista de Schindler",
      "popularity": 4,
      "emoji": "🕯️",
      "meta": "1993",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "rescatando-al-soldado-ryan",
      "label": "Rescatando al Soldado Ryan",
      "popularity": 4,
      "emoji": "🪖",
      "meta": "1998",
      "search": "drama accion",
      "tags": [
        "drama",
        "accion"
      ]
    },
    {
      "id": "corazon-valiente",
      "label": "Corazón Valiente",
      "popularity": 4,
      "emoji": "🏴",
      "meta": "1995",
      "search": "drama accion",
      "tags": [
        "drama",
        "accion"
      ]
    },
    {
      "id": "naufrago",
      "label": "Náufrago",
      "popularity": 4,
      "emoji": "🏐",
      "meta": "2000",
      "search": "drama aventura",
      "tags": [
        "drama",
        "aventura"
      ]
    },
    {
      "id": "12-anos-de-esclavitud",
      "label": "12 Años de Esclavitud",
      "popularity": 3,
      "emoji": "⛓️",
      "meta": "2013",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "green-book-una-amistad-sin-fronteras",
      "label": "Green Book: Una Amistad sin Fronteras",
      "popularity": 4,
      "emoji": "🚗",
      "meta": "2018",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "el-discurso-del-rey",
      "label": "El Discurso del Rey",
      "popularity": 3,
      "emoji": "🎙️",
      "meta": "2010",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "una-mente-brillante",
      "label": "Una Mente Brillante",
      "popularity": 4,
      "emoji": "🧠",
      "meta": "2001",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "la-teoria-del-todo",
      "label": "La Teoría del Todo",
      "popularity": 3,
      "emoji": "🌌",
      "meta": "2014",
      "search": "drama romance",
      "tags": [
        "drama",
        "romance"
      ]
    },
    {
      "id": "tiempos-modernos",
      "label": "Tiempos Modernos",
      "popularity": 3,
      "emoji": "⚙️",
      "meta": "1936",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "luces-de-la-ciudad",
      "label": "Luces de la Ciudad",
      "popularity": 2,
      "emoji": "🌃",
      "meta": "1931",
      "search": "comedia romance",
      "tags": [
        "comedia",
        "romance"
      ]
    },
    {
      "id": "el-gran-dictador",
      "label": "El Gran Dictador",
      "popularity": 3,
      "emoji": "🌍",
      "meta": "1940",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "metropolis",
      "label": "Metrópolis",
      "popularity": 2,
      "emoji": "🏙️",
      "meta": "1927",
      "search": "ciencia-ficcion drama",
      "tags": [
        "ciencia-ficcion",
        "drama"
      ]
    },
    {
      "id": "ladron-de-bicicletas",
      "label": "Ladrón de Bicicletas",
      "popularity": 2,
      "emoji": "🚲",
      "meta": "1948",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "ocho-y-medio",
      "label": "Ocho y Medio",
      "popularity": 1,
      "emoji": "🎩",
      "meta": "1963",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "la-dolce-vita",
      "label": "La Dolce Vita",
      "popularity": 2,
      "emoji": "⛲",
      "meta": "1960",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "los-400-golpes",
      "label": "Los 400 Golpes",
      "popularity": 2,
      "emoji": "🏃",
      "meta": "1959",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "sin-aliento",
      "label": "Sin Aliento",
      "popularity": 1,
      "emoji": "🚬",
      "meta": "1960",
      "search": "drama crimen",
      "tags": [
        "drama",
        "crimen"
      ]
    },
    {
      "id": "rashomon",
      "label": "Rashomon",
      "popularity": 2,
      "emoji": "🌧️",
      "meta": "1950",
      "search": "drama crimen",
      "tags": [
        "drama",
        "crimen"
      ]
    },
    {
      "id": "los-siete-samurais",
      "label": "Los Siete Samuráis",
      "popularity": 2,
      "emoji": "🗡️",
      "meta": "1954",
      "search": "aventura drama",
      "tags": [
        "aventura",
        "drama"
      ]
    },
    {
      "id": "ran",
      "label": "Ran",
      "popularity": 1,
      "emoji": "🏯",
      "meta": "1985",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "yi-yi",
      "label": "Yi Yi",
      "popularity": 1,
      "emoji": "📷",
      "meta": "2000",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "memorias-de-un-asesino",
      "label": "Memorias de un Asesino",
      "popularity": 2,
      "emoji": "🌾",
      "meta": "2003",
      "search": "crimen thriller",
      "tags": [
        "crimen",
        "thriller"
      ]
    },
    {
      "id": "tren-bala-a-busan",
      "label": "Tren Bala a Busan",
      "popularity": 3,
      "emoji": "🚄",
      "meta": "2016",
      "search": "terror accion",
      "tags": [
        "terror",
        "accion"
      ]
    },
    {
      "id": "la-vida-de-los-otros",
      "label": "La Vida de los Otros",
      "popularity": 2,
      "emoji": "🎧",
      "meta": "2006",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "corre-lola-corre",
      "label": "Corre, Lola, Corre",
      "popularity": 2,
      "emoji": "🏃‍♀️",
      "meta": "1998",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "el-experimento",
      "label": "El Experimento",
      "popularity": 2,
      "emoji": "🔬",
      "meta": "2001",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "la-ola",
      "label": "La Ola",
      "popularity": 2,
      "emoji": "🌊",
      "meta": "2008",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "el-odio",
      "label": "El Odio",
      "popularity": 2,
      "emoji": "🏙️",
      "meta": "1995",
      "search": "drama crimen",
      "tags": [
        "drama",
        "crimen"
      ]
    },
    {
      "id": "intocables",
      "label": "Intocables",
      "popularity": 4,
      "emoji": "♿",
      "meta": "2011",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "la-gran-belleza",
      "label": "La Gran Belleza",
      "popularity": 1,
      "emoji": "🍸",
      "meta": "2013",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "cria-cuervos",
      "label": "Cría Cuervos",
      "popularity": 1,
      "emoji": "🐦",
      "meta": "1976",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "crimen-ferpecto",
      "label": "Crimen Ferpecto",
      "popularity": 1,
      "emoji": "🔪",
      "meta": "2004",
      "search": "comedia crimen",
      "tags": [
        "comedia",
        "crimen"
      ]
    },
    {
      "id": "bohemian-rhapsody",
      "label": "Bohemian Rhapsody",
      "popularity": 5,
      "emoji": "🎤",
      "meta": "2018",
      "search": "musical drama",
      "tags": [
        "musical",
        "drama"
      ]
    },
    {
      "id": "rocketman",
      "label": "Rocketman",
      "popularity": 3,
      "emoji": "🕶️",
      "meta": "2019",
      "search": "musical drama",
      "tags": [
        "musical",
        "drama"
      ]
    },
    {
      "id": "nace-una-estrella",
      "label": "Nace una Estrella",
      "popularity": 4,
      "emoji": "🎙️",
      "meta": "2018",
      "search": "musical romance",
      "tags": [
        "musical",
        "romance"
      ]
    },
    {
      "id": "los-miserables",
      "label": "Los Miserables",
      "popularity": 4,
      "emoji": "🥖",
      "meta": "2012",
      "search": "musical drama",
      "tags": [
        "musical",
        "drama"
      ]
    },
    {
      "id": "el-gran-showman",
      "label": "El Gran Showman",
      "popularity": 4,
      "emoji": "🎪",
      "meta": "2017",
      "search": "musical drama",
      "tags": [
        "musical",
        "drama"
      ]
    },
    {
      "id": "chicago",
      "label": "Chicago",
      "popularity": 3,
      "emoji": "🎩",
      "meta": "2002",
      "search": "musical crimen",
      "tags": [
        "musical",
        "crimen"
      ]
    },
    {
      "id": "moulin-rouge",
      "label": "Moulin Rouge",
      "popularity": 3,
      "emoji": "💃",
      "meta": "2001",
      "search": "musical romance",
      "tags": [
        "musical",
        "romance"
      ]
    },
    {
      "id": "wicked",
      "label": "Wicked",
      "popularity": 4,
      "emoji": "💚",
      "meta": "2024",
      "search": "musical fantasia",
      "tags": [
        "musical",
        "fantasia"
      ]
    },
    {
      "id": "un-completo-desconocido",
      "label": "Un Completo Desconocido",
      "popularity": 3,
      "emoji": "🎸",
      "meta": "2024",
      "search": "musical drama",
      "tags": [
        "musical",
        "drama"
      ]
    },
    {
      "id": "el-cisne-negro",
      "label": "El Cisne Negro",
      "popularity": 4,
      "emoji": "🦢",
      "meta": "2010",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "requiem-por-un-sueno",
      "label": "Réquiem por un Sueño",
      "popularity": 3,
      "emoji": "💊",
      "meta": "2000",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "amadeus",
      "label": "Amadeus",
      "popularity": 3,
      "emoji": "🎻",
      "meta": "1984",
      "search": "musical drama",
      "tags": [
        "musical",
        "drama"
      ]
    },
    {
      "id": "sonrisas-y-lagrimas",
      "label": "Sonrisas y Lágrimas",
      "popularity": 3,
      "emoji": "🎶",
      "meta": "1965",
      "search": "musical drama",
      "tags": [
        "musical",
        "drama"
      ]
    },
    {
      "id": "west-side-story",
      "label": "West Side Story",
      "popularity": 2,
      "emoji": "🔪",
      "meta": "1961",
      "search": "musical romance",
      "tags": [
        "musical",
        "romance"
      ]
    },
    {
      "id": "hairspray",
      "label": "Hairspray",
      "popularity": 3,
      "emoji": "💇",
      "meta": "2007",
      "search": "musical comedia",
      "tags": [
        "musical",
        "comedia"
      ]
    },
    {
      "id": "pitch-perfect",
      "label": "Pitch Perfect",
      "popularity": 3,
      "emoji": "🎤",
      "meta": "2012",
      "search": "musical comedia",
      "tags": [
        "musical",
        "comedia"
      ]
    },
    {
      "id": "high-school-musical",
      "label": "High School Musical",
      "popularity": 4,
      "emoji": "🏀",
      "meta": "2006",
      "search": "musical romance",
      "tags": [
        "musical",
        "romance"
      ]
    },
    {
      "id": "sing-ven-y-canta",
      "label": "Sing: ¡Ven y Canta!",
      "popularity": 3,
      "emoji": "🎙️",
      "meta": "2016",
      "search": "animacion musical",
      "tags": [
        "animacion",
        "musical"
      ]
    },
    {
      "id": "mystic-river",
      "label": "Mystic River",
      "popularity": 2,
      "emoji": "🌉",
      "meta": "2003",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "million-dollar-baby",
      "label": "Million Dollar Baby",
      "popularity": 3,
      "emoji": "🥊",
      "meta": "2004",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "gran-torino",
      "label": "Gran Torino",
      "popularity": 3,
      "emoji": "🚗",
      "meta": "2008",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "belleza-americana",
      "label": "Belleza Americana",
      "popularity": 3,
      "emoji": "🌹",
      "meta": "1999",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "el-sexto-sentido",
      "label": "El Sexto Sentido",
      "popularity": 4,
      "emoji": "👻",
      "meta": "1999",
      "search": "thriller terror",
      "tags": [
        "thriller",
        "terror"
      ]
    },
    {
      "id": "el-gran-truco",
      "label": "El Gran Truco",
      "popularity": 4,
      "emoji": "🎩",
      "meta": "2006",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "memento",
      "label": "Memento",
      "popularity": 3,
      "emoji": "📸",
      "meta": "2000",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "la-isla-siniestra",
      "label": "La Isla Siniestra",
      "popularity": 4,
      "emoji": "🌊",
      "meta": "2010",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "prisioneros",
      "label": "Prisioneros",
      "popularity": 3,
      "emoji": "🔦",
      "meta": "2013",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "sicario-tierra-de-nadie",
      "label": "Sicario: Tierra de Nadie",
      "popularity": 3,
      "emoji": "🚁",
      "meta": "2015",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "zodiaco",
      "label": "Zodíaco",
      "popularity": 3,
      "emoji": "✉️",
      "meta": "2007",
      "search": "crimen thriller",
      "tags": [
        "crimen",
        "thriller"
      ]
    },
    {
      "id": "los-hombres-que-no-amaban-a-las-mujeres",
      "label": "Los Hombres que no Amaban a las Mujeres",
      "popularity": 2,
      "emoji": "🖤",
      "meta": "2011",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "la-chica-del-tren",
      "label": "La Chica del Tren",
      "popularity": 3,
      "emoji": "🚆",
      "meta": "2016",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "busqueda-implacable",
      "label": "Búsqueda Implacable",
      "popularity": 4,
      "emoji": "📞",
      "meta": "2008",
      "search": "accion thriller",
      "tags": [
        "accion",
        "thriller"
      ]
    },
    {
      "id": "primicia-mortal",
      "label": "Primicia Mortal",
      "popularity": 3,
      "emoji": "📹",
      "meta": "2014",
      "search": "thriller crimen",
      "tags": [
        "thriller",
        "crimen"
      ]
    },
    {
      "id": "el-caso-sloane",
      "label": "El Caso Sloane",
      "popularity": 2,
      "emoji": "💼",
      "meta": "2016",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "la-red-social",
      "label": "La Red Social",
      "popularity": 4,
      "emoji": "💻",
      "meta": "2010",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "conclave",
      "label": "Cónclave",
      "popularity": 2,
      "emoji": "⛪",
      "meta": "2024",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "la-zona-de-interes",
      "label": "La Zona de Interés",
      "popularity": 1,
      "emoji": "🏡",
      "meta": "2023",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "el-renacido",
      "label": "El Renacido",
      "popularity": 4,
      "emoji": "🐻",
      "meta": "2015",
      "search": "aventura drama",
      "tags": [
        "aventura",
        "drama"
      ]
    },
    {
      "id": "birdman",
      "label": "Birdman",
      "popularity": 3,
      "emoji": "🪶",
      "meta": "2014",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "1917",
      "label": "1917",
      "popularity": 3,
      "emoji": "🕰️",
      "meta": "2019",
      "search": "drama accion",
      "tags": [
        "drama",
        "accion"
      ]
    },
    {
      "id": "dunkerque",
      "label": "Dunkerque",
      "popularity": 3,
      "emoji": "🛥️",
      "meta": "2017",
      "search": "drama accion",
      "tags": [
        "drama",
        "accion"
      ]
    },
    {
      "id": "fuego-contra-fuego",
      "label": "Fuego contra Fuego",
      "popularity": 3,
      "emoji": "🏦",
      "meta": "1995",
      "search": "crimen accion",
      "tags": [
        "crimen",
        "accion"
      ]
    },
    {
      "id": "el-fugitivo",
      "label": "El Fugitivo",
      "popularity": 3,
      "emoji": "🚂",
      "meta": "1993",
      "search": "accion thriller",
      "tags": [
        "accion",
        "thriller"
      ]
    },
    {
      "id": "traffic",
      "label": "Traffic",
      "popularity": 2,
      "emoji": "🚗",
      "meta": "2000",
      "search": "crimen drama",
      "tags": [
        "crimen",
        "drama"
      ]
    },
    {
      "id": "la-gran-apuesta",
      "label": "La Gran Apuesta",
      "popularity": 3,
      "emoji": "📉",
      "meta": "2015",
      "search": "drama comedia",
      "tags": [
        "drama",
        "comedia"
      ]
    },
    {
      "id": "contagio",
      "label": "Contagio",
      "popularity": 3,
      "emoji": "🦠",
      "meta": "2011",
      "search": "thriller drama",
      "tags": [
        "thriller",
        "drama"
      ]
    },
    {
      "id": "el-curioso-caso-de-benjamin-button",
      "label": "El Curioso Caso de Benjamin Button",
      "popularity": 4,
      "emoji": "⏳",
      "meta": "2008",
      "search": "drama romance",
      "tags": [
        "drama",
        "romance"
      ]
    },
    {
      "id": "un-amor-para-recordar",
      "label": "Un Amor para Recordar",
      "popularity": 4,
      "emoji": "🌟",
      "meta": "2002",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "como-si-fuera-la-primera-vez",
      "label": "Como Si Fuera la Primera Vez",
      "popularity": 4,
      "emoji": "🐧",
      "meta": "2004",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "sintonia-de-amor",
      "label": "Sintonía de Amor",
      "popularity": 3,
      "emoji": "📻",
      "meta": "1993",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "tienes-un-e-mail",
      "label": "Tienes un E-mail",
      "popularity": 3,
      "emoji": "📧",
      "meta": "1998",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "ghost-la-sombra-del-amor",
      "label": "Ghost: La Sombra del Amor",
      "popularity": 4,
      "emoji": "🏺",
      "meta": "1990",
      "search": "romance fantasia",
      "tags": [
        "romance",
        "fantasia"
      ]
    },
    {
      "id": "cuestion-de-tiempo",
      "label": "Cuestión de Tiempo",
      "popularity": 3,
      "emoji": "⌛",
      "meta": "2013",
      "search": "romance fantasia",
      "tags": [
        "romance",
        "fantasia"
      ]
    },
    {
      "id": "antes-del-atardecer",
      "label": "Antes del Atardecer",
      "popularity": 2,
      "emoji": "🌇",
      "meta": "2004",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "antes-de-la-medianoche",
      "label": "Antes de la Medianoche",
      "popularity": 2,
      "emoji": "🌙",
      "meta": "2013",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "blue-valentine",
      "label": "Blue Valentine",
      "popularity": 2,
      "emoji": "💔",
      "meta": "2010",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "historia-de-un-matrimonio",
      "label": "Historia de un Matrimonio",
      "popularity": 3,
      "emoji": "📄",
      "meta": "2019",
      "search": "drama romance",
      "tags": [
        "drama",
        "romance"
      ]
    },
    {
      "id": "kramer-vs-kramer",
      "label": "Kramer vs. Kramer",
      "popularity": 2,
      "emoji": "🍳",
      "meta": "1979",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "manchester-junto-al-mar",
      "label": "Manchester Junto al Mar",
      "popularity": 2,
      "emoji": "⚓",
      "meta": "2016",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "nomadland",
      "label": "Nomadland",
      "popularity": 2,
      "emoji": "🚐",
      "meta": "2020",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "coda-senales-del-corazon",
      "label": "CODA: Señales del Corazón",
      "popularity": 3,
      "emoji": "🤟",
      "meta": "2021",
      "search": "drama musical",
      "tags": [
        "drama",
        "musical"
      ]
    },
    {
      "id": "belfast",
      "label": "Belfast",
      "popularity": 2,
      "emoji": "🧱",
      "meta": "2021",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "minari",
      "label": "Minari",
      "popularity": 2,
      "emoji": "🌱",
      "meta": "2020",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "drive-my-car",
      "label": "Drive My Car",
      "popularity": 1,
      "emoji": "🚘",
      "meta": "2021",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "un-heroe",
      "label": "Un Héroe",
      "popularity": 1,
      "emoji": "🪙",
      "meta": "2021",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "la-separacion",
      "label": "La Separación",
      "popularity": 2,
      "emoji": "⚖️",
      "meta": "2011",
      "search": "drama",
      "tags": [
        "drama"
      ]
    },
    {
      "id": "toni-erdmann",
      "label": "Toni Erdmann",
      "popularity": 1,
      "emoji": "🦷",
      "meta": "2016",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "la-vida-de-adele",
      "label": "La Vida de Adèle",
      "popularity": 2,
      "emoji": "💙",
      "meta": "2013",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "amour",
      "label": "Amour",
      "popularity": 1,
      "emoji": "🕊️",
      "meta": "2012",
      "search": "drama romance",
      "tags": [
        "drama",
        "romance"
      ]
    },
    {
      "id": "la-cinta-blanca",
      "label": "La Cinta Blanca",
      "popularity": 1,
      "emoji": "🎀",
      "meta": "2009",
      "search": "drama thriller",
      "tags": [
        "drama",
        "thriller"
      ]
    },
    {
      "id": "los-puentes-de-madison",
      "label": "Los Puentes de Madison",
      "popularity": 3,
      "emoji": "🌉",
      "meta": "1995",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "casi-famosos",
      "label": "Casi Famosos",
      "popularity": 3,
      "emoji": "🎸",
      "meta": "2000",
      "search": "drama musical",
      "tags": [
        "drama",
        "musical"
      ]
    },
    {
      "id": "pequena-miss-sunshine",
      "label": "Pequeña Miss Sunshine",
      "popularity": 3,
      "emoji": "🚐",
      "meta": "2006",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "juno",
      "label": "Juno",
      "popularity": 3,
      "emoji": "🍔",
      "meta": "2007",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "las-ventajas-de-ser-invisible",
      "label": "Las Ventajas de Ser Invisible",
      "popularity": 3,
      "emoji": "📚",
      "meta": "2012",
      "search": "drama romance",
      "tags": [
        "drama",
        "romance"
      ]
    },
    {
      "id": "lady-bird",
      "label": "Lady Bird",
      "popularity": 3,
      "emoji": "🐦",
      "meta": "2017",
      "search": "comedia drama",
      "tags": [
        "comedia",
        "drama"
      ]
    },
    {
      "id": "mujercitas",
      "label": "Mujercitas",
      "popularity": 3,
      "emoji": "✒️",
      "meta": "2019",
      "search": "drama romance",
      "tags": [
        "drama",
        "romance"
      ]
    },
    {
      "id": "orgullo-y-prejuicio",
      "label": "Orgullo y Prejuicio",
      "popularity": 4,
      "emoji": "💐",
      "meta": "2005",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "sentido-y-sensibilidad",
      "label": "Sentido y Sensibilidad",
      "popularity": 2,
      "emoji": "🫖",
      "meta": "1995",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "el-paciente-ingles",
      "label": "El Paciente Inglés",
      "popularity": 2,
      "emoji": "🏜️",
      "meta": "1996",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "memorias-de-africa",
      "label": "Memorias de África",
      "popularity": 2,
      "emoji": "🦁",
      "meta": "1985",
      "search": "romance aventura",
      "tags": [
        "romance",
        "aventura"
      ]
    },
    {
      "id": "doctor-zhivago",
      "label": "Doctor Zhivago",
      "popularity": 2,
      "emoji": "❄️",
      "meta": "1965",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "lo-que-el-viento-se-llevo",
      "label": "Lo que el Viento se Llevó",
      "popularity": 3,
      "emoji": "🌾",
      "meta": "1939",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "todo-menos-tu",
      "label": "Todo Menos Tú",
      "popularity": 3,
      "emoji": "🏝️",
      "meta": "2023",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "culpa-mia",
      "label": "Culpa Mía",
      "popularity": 3,
      "emoji": "🏍️",
      "meta": "2023",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "a-todos-los-chicos-de-los-que-me-enamore",
      "label": "A Todos los Chicos de los que me Enamoré",
      "popularity": 3,
      "emoji": "💌",
      "meta": "2018",
      "search": "romance comedia",
      "tags": [
        "romance",
        "comedia"
      ]
    },
    {
      "id": "bajo-la-misma-estrella",
      "label": "Bajo la Misma Estrella",
      "popularity": 4,
      "emoji": "🌠",
      "meta": "2014",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "crepusculo",
      "label": "Crepúsculo",
      "popularity": 4,
      "emoji": "🧛",
      "meta": "2008",
      "search": "romance fantasia",
      "tags": [
        "romance",
        "fantasia"
      ]
    },
    {
      "id": "cincuenta-sombras-de-grey",
      "label": "Cincuenta Sombras de Grey",
      "popularity": 3,
      "emoji": "🪢",
      "meta": "2015",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "divergente",
      "label": "Divergente",
      "popularity": 3,
      "emoji": "🏙️",
      "meta": "2014",
      "search": "ciencia-ficcion accion",
      "tags": [
        "ciencia-ficcion",
        "accion"
      ]
    },
    {
      "id": "after-aqui-empieza-todo",
      "label": "After: Aquí Empieza Todo",
      "popularity": 3,
      "emoji": "📖",
      "meta": "2019",
      "search": "romance drama",
      "tags": [
        "romance",
        "drama"
      ]
    },
    {
      "id": "senna",
      "label": "Senna",
      "popularity": 2,
      "emoji": "🏎️",
      "meta": "2010",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "searching-for-sugar-man",
      "label": "Searching for Sugar Man",
      "popularity": 1,
      "emoji": "🎶",
      "meta": "2012",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "icarus",
      "label": "Icarus",
      "popularity": 1,
      "emoji": "🚴",
      "meta": "2017",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "blackfish",
      "label": "Blackfish",
      "popularity": 1,
      "emoji": "🐋",
      "meta": "2013",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "super-size-me",
      "label": "Super Size Me",
      "popularity": 2,
      "emoji": "🍔",
      "meta": "2004",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "bowling-for-columbine",
      "label": "Bowling for Columbine",
      "popularity": 2,
      "emoji": "🎳",
      "meta": "2002",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "amy",
      "label": "Amy",
      "popularity": 2,
      "emoji": "🎤",
      "meta": "2015",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "el-dilema-de-las-redes-sociales",
      "label": "El Dilema de las Redes Sociales",
      "popularity": 3,
      "emoji": "📱",
      "meta": "2020",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "mi-maestro-el-pulpo",
      "label": "Mi Maestro el Pulpo",
      "popularity": 3,
      "emoji": "🐙",
      "meta": "2020",
      "search": "documental",
      "tags": [
        "documental"
      ]
    },
    {
      "id": "won-t-you-be-my-neighbor",
      "label": "Won't You Be My Neighbor?",
      "popularity": 1,
      "emoji": "🧶",
      "meta": "2018",
      "search": "documental",
      "tags": [
        "documental"
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
      "onboardingDone": "Perfil armado. En la pantalla que sigue están tu código y tu QR: mostráselos a quien te dé curiosidad.",
      "emptyFeed": "Todavía no te comparaste con nadie. Mirá para los costados: la sala está llena de gente en la misma.",
      "compareCta": "Ver cuánto coincidimos",
      "codeExplainer": "Estos seis caracteres son tu credencial. Se los decís a alguien en la fila del candy, los tipea, y al toque ven cuánto coinciden. No lleva tu teléfono ni tus redes: si querés dar algo más, lo das vos.",
      "shareText": "Estoy en la función de One Night Only de Cinemark 🍿 Mi código de Movie Match es {code} — metelo y fijate cuánto coincidimos.",
      "likeSent": "Le llegó. Ahora la pelota está del otro lado.",
      "mutualMatch": "Es mutuo: los dos apretaron el mismo botón. Vayan juntos al candy a buscar lo que desbloquearon, que la función arranca."
    }
  }
};
