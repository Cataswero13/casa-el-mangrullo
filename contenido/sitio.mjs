// =====================================================================
//  CASA EL MANGRULLO · CONTENIDO DEL SITIO
//  Aquí vive TODO lo editable: teléfono, precios, textos, reseñas, fotos
//  y videos. Cambia lo que necesites, guarda y sube a GitHub: el sitio
//  se vuelve a publicar solo. No hace falta tocar el diseño.
// =====================================================================

// ---------------------------------------------------------------------
// 1) WHATSAPP (provisional). Solo cambia este número.
//    Formato: 52 + 10 dígitos, sin espacios ni signos.
// ---------------------------------------------------------------------
export const WHATSAPP = "525639798703";
export const WHATSAPP_VISIBLE = "56 3979 8703"; // como se muestra en pantalla

// URL final del sitio (cámbiala cuando conectes el dominio propio)
export const SITIO_URL = "https://casa-el-mangrullo.vercel.app";

// ---------------------------------------------------------------------
// 2) MENSAJES PRELLENADOS DE WHATSAPP (uno por intención)
// ---------------------------------------------------------------------
export const mensajes = {
  general:
    "Hola Hugo, vi la página de Casa el Mangrullo y quiero reservar. Mis fechas son: ___ · Somos ___ personas.",
  cedro:
    "Hola Hugo, quiero reservar la habitación Cedro ($850 por noche). Llegada: ___ · Salida: ___ · Somos ___ personas.",
  encino:
    "Hola Hugo, quiero reservar la habitación Encino ($900 por noche). Llegada: ___ · Salida: ___ · Somos ___ personas.",
  evento:
    "Hola Hugo, quiero cotizar un evento en el jardín de Casa el Mangrullo. Tipo de evento: ___ · Fecha: ___ · Invitados aprox.: ___",
  descuento:
    "Hola Hugo, me interesa una estancia larga en Casa el Mangrullo (más de una semana / un mes). ¿Qué descuento me puedes dar? Fechas: ___ · Habitación: ___",
  extras:
    "Hola Hugo, quiero cotizar un servicio extra en Casa el Mangrullo: ___ (desayuno, comida, traslado, tour, noche de películas o fogata). Fechas: ___",
  halloween: "Hola Hugo, quiero información del evento de Halloween en Casa el Mangrullo.",
  navidad: "Hola Hugo, quiero información del evento de Navidad en Casa el Mangrullo.",
  sanvalentin: "Hola Hugo, quiero reservar la noche romántica de San Valentín en Casa el Mangrullo.",
};

// Texto del botón flotante según la sección en pantalla
export const botonFlotante = {
  general: "Reservar",
  descuento: "Reserva directo",
  evento: "Cotizar evento",
  extras: "Cotizar servicio",
};

// ---------------------------------------------------------------------
// 3) DATOS GENERALES
// ---------------------------------------------------------------------
export const casa = {
  nombre: "Casa el Mangrullo",
  lema: "Sal de tu rutina sin salir de la ciudad",
  descripcionSEO:
    "Casa con dos habitaciones y jardín para eventos en Tlalpan, al sur de la CDMX. Bosque, silencio, billar, fogata y animalitos. Pet friendly y ecológica. Reserva directo por WhatsApp desde $850 la noche.",
  anfitrion: "Hugo Enrique",
  calificacion: "4.71",
  totalResenas: 21,
  direccion: {
    calle: "CDA Camino Real 2B",
    colonia: "San Andrés Totoltepec",
    alcaldia: "Tlalpan",
    ciudad: "Ciudad de México",
    cp: "14400",
  },
  mapsUrl: "https://maps.app.goo.gl/zz1KWV5X1VqHafbE9",
  // Para el mapa incrustado (solo se carga si la persona lo pide)
  mapsEmbed:
    "https://www.google.com/maps?q=CDA+Camino+Real+2B,+San+Andr%C3%A9s+Totoltepec,+Tlalpan,+14400+CDMX&output=embed",
  llegada: "3:00 p.m.",
  salida: "12:00 p.m.",
  pagos: "Efectivo, transferencia o tarjeta",
  // Redes sociales: deja vacío lo que no exista todavía
  redes: { instagram: "", facebook: "", tiktok: "" },
};

// ---------------------------------------------------------------------
// 4) PORTADA Y VIDEOS
//    Cuando tengas los videos, súbelos a assets/video/ y escribe aquí el
//    nombre del archivo. Mientras estén vacíos se muestran las fotos.
// ---------------------------------------------------------------------
export const videos = {
  // Portada: video horizontal corto (8–15 s, sin audio, en loop, < 4 MB)
  // Ej.: portadaMp4: "assets/video/portada.mp4"
  portadaMp4: "",
  portadaMp4Vertical: "", // opcional: versión 9:16 para celular
  // Recorrido narrado horizontal (16:9). Ej.: "assets/video/recorrido.mp4"
  recorridoMp4: "",
  recorridoPoster: "fachada-dia-torre-patio",
  // Si lo subes a YouTube, pega aquí el ID (lo que va después de v=) y se usa en vez del MP4
  recorridoYouTube: "",
  // Shorts verticales 9:16. Pon el archivo en mp4 cuando lo tengas.
  shorts: [
    { titulo: "Noche de luces", poster: "jardin-noche-luces", mp4: "" },
    { titulo: "Desayuno en el pasto", poster: "desayuno-jardin", mp4: "" },
    { titulo: "Tarde de billar", poster: "billar-atardecer-ventanal", mp4: "" },
    { titulo: "Los vecinos", poster: "gallinas-jacaranda", mp4: "" },
    { titulo: "Cedro", poster: "cedro-cama-tapanco", mp4: "" },
  ],
};

// ---------------------------------------------------------------------
// 5) LA HISTORIA (columna vertebral del sitio, por momentos del día)
// ---------------------------------------------------------------------
export const historia = {
  llegada: {
    hora: "3:00 p.m.",
    etiqueta: "La llegada",
    titulo: "Una torre amarilla entre cedros",
    parrafos: [
      "Un mangrullo es una torre de vigilancia, un lugar alto desde donde se mira lejos. Esta casa tiene la suya: una torre amarilla que se asoma entre cedros, como si cuidara el jardín.",
      "Llegas por un camino de ladrillo en curva y, de pronto, la ciudad se queda atrás. Estás en Tlalpan, al sur de la Ciudad de México, pero aquí el ruido no entra. Entra el olor a pino, a tierra mojada y a lavanda.",
    ],
  },
  manana: {
    hora: "8:00 a.m.",
    etiqueta: "La mañana",
    titulo: "Café en el pasto, sin prisa",
    parrafos: [
      "En la mañana, el sol pega en el patio de terracota y en el naranjo cargado de fruta. Dos gallinas pasean entre los pétalos morados de la jacaranda, un conejo se asoma desde su casita y una perrita juguetona viene a ver quién llegó.",
      "Te sirves un café y lo tomas en el pasto, sin prisa.",
    ],
  },
  tarde: {
    hora: "5:30 p.m.",
    etiqueta: "La tarde",
    titulo: "Nadie te apura",
    parrafos: [
      "Por la tarde, la luz dorada entra por los ventanales de la sala. Alguien acomoda las bolas del billar, otro se sienta al piano o toma la guitarra.",
      "Hay libros, cartas y dominó sobre la mesa. Nadie te apura.",
    ],
  },
  noche: {
    hora: "8:00 p.m.",
    etiqueta: "La noche",
    titulo: "Se encienden las luces",
    parrafos: [
      "Cuando cae la noche, se encienden las luces colgantes entre los árboles y los faroles de lámina del pórtico dibujan estrellitas en las paredes.",
      "Se prende la fogata, se calienta la parrilla y la plática se alarga bajo el cielo.",
    ],
  },
  dormir: {
    hora: "11:00 p.m.",
    etiqueta: "A dormir",
    titulo: "Dos refugios con nombre de árbol",
    parrafos: [
      "Cedro, rústica y cálida, toda de madera, con su tapanco y sus cuadros de maíz nativo. Encino, amplia y luminosa, pensada para grupos, con detalles de bienvenida esperándote.",
    ],
  },
  cierre: {
    titulo: "Vivir más despacio",
    parrafos: [
      "Aquí el agua de lluvia se guarda y se cuida, la basura se separa y la naturaleza se respeta. Porque descansar de verdad también es eso: vivir más despacio.",
    ],
  },
};

// ---------------------------------------------------------------------
// 6) FOTOS: nombre del archivo (sin tamaño ni extensión) + texto alternativo
//    Los archivos están en assets/img/web/  (nombre-480.webp y nombre-<ancho>.webp)
// ---------------------------------------------------------------------
export const fotos = {
  "picnic-luces-noche": "Mesa de picnic con mantel de cuadros sobre el pasto, bajo luces colgantes entre los árboles de noche",
  "casa-noche-torre": "La casa iluminada de noche: la torre amarilla, el pórtico de las habitaciones y el patio de terracota",
  "jardin-noche-luces": "Jardín de noche con luces colgantes entre árboles, gallinero verde y bancas curvas de ladrillo",
  "jardin-hora-azul": "Jardín amplio a la hora azul, con luces colgantes a lo largo del muro de ladrillo",
  "portico-noche-faroles": "Pórtico techado de noche con faroles de lámina perforada, mesa de tronco y sillones de mimbre",
  "portico-sillones-ajedrez": "Sillones de mimbre con cojines, mesa con ajedrez y geranios blancos bajo un farol",
  "portico-rincon-farol": "Rincón del pórtico de noche con una maceta bajo un farol y salida al jardín",
  "puerta-tapete-hi": "Puerta de una habitación con tapete de bienvenida, farol y maceta",
  "fachada-dia-torre-patio": "Vista de día del patio de terracota con lavanda, macetas, el naranjo y la torre amarilla de la casa",
  "camino-ladrillo-curva": "Camino de ladrillo en curva entre el pasto y árboles grandes",
  "camino-porton-entrada": "Camino de ladrillo hacia el portón de madera verde de la entrada",
  "jardin-pasto-arboles": "Jardín de pasto amplio rodeado de árboles grandes",
  "jardin-flores-lilas": "Jardín con un arbusto de flores lilas y árboles al fondo",
  "habitaciones-jacaranda": "Las habitaciones vistas desde el jardín, con la jacaranda en flor",
  "patio-terracota-estanque": "Patio de terracota con estanque pequeño, pérgola, plantas y gallinas paseando",
  "terraza-cedro": "Terraza de madera elevada junto a un cedro grande, con mesa y sillas bajo el sol de la mañana",
  "desayuno-jardin": "Desayuno servido en una mesa de madera al sol en el jardín, con café, licuado y platos de comida",
  "gallinas-jacaranda": "Dos gallinas blancas con negro caminando sobre el pasto lleno de pétalos de jacaranda",
  "conejo-casita": "Conejo blanco con negro en su casita bajo un árbol, junto al muro de ladrillo",
  "estancia-piano": "Estancia con muro rojo, techo de vigas, piano, guitarra, equipales y un barco decorativo colgante",
  "billar-atardecer-ventanal": "Mesa de billar frente a un ventanal con sombreros colgados y libreros, con luz de atardecer",
  "billar-lado-librero": "Mesa de billar con librero, cuadro enmarcado y rack de tacos, con luz de atardecer",
  "estancia-rincon-sofa": "Rincón de la estancia con sofá, cobijas de rayas, lámparas y un equipal",
  "estancia-juegos-mesa": "Mesa de centro con cartas, dominó y juegos de mesa, con el billar y el ventanal al fondo",
  "evento-cine-jardin": "Cine al aire libre: pantalla con proyector en el jardín de noche y una persona sentada con la perrita",
  "evento-dia-de-muertos": "Patio decorado para Día de Muertos con luces rojas y moradas y papel picado",
  "cedro-cama-tapanco": "Habitación Cedro: cama abajo y cama en el tapanco, alacena con loza de talavera y microondas",
  "cedro-general": "Habitación Cedro: vista general con tapanco, cama, sofá y cuadros de mazorcas de maíz nativo",
  "cedro-poster-banca": "Habitación Cedro: banca acolchonada, póster de barco vikingo y escalera al tapanco",
  "cedro-escritorio-ventana": "Habitación Cedro: escritorio con TV junto a la ventana y la puerta abierta al patio de terracota",
  "encino-general-tapanco": "Habitación Encino: tapanco suspendido, cama matrimonial con edredón blanco, sofá-cama de cuadros rojos y escritorio",
  "encino-bienvenida": "Habitación Encino: cómoda con textil típico, toallas, botellas de agua, cuadro de bienvenida y mapa antiguo de París",
  "encino-tv-microondas": "Habitación Encino: cama matrimonial bajo el tapanco, TV y microondas",
  "encino-bano-lavabo": "Baño de Encino: lavabo con cubierta de madera y ventana con cortina",
  "encino-bano-regadera": "Baño de Encino: regadera con azulejo terracota",
};

// Fotos de cada momento del día (en orden)
export const galerias = {
  llegada: ["fachada-dia-torre-patio", "camino-ladrillo-curva", "camino-porton-entrada", "jardin-pasto-arboles"],
  manana: ["patio-terracota-estanque", "gallinas-jacaranda", "conejo-casita", "desayuno-jardin", "terraza-cedro", "habitaciones-jacaranda", "jardin-flores-lilas"],
  tarde: ["billar-atardecer-ventanal", "estancia-juegos-mesa", "billar-lado-librero", "estancia-piano", "estancia-rincon-sofa"],
  noche: ["jardin-noche-luces", "casa-noche-torre", "portico-sillones-ajedrez", "portico-noche-faroles", "jardin-hora-azul", "portico-rincon-farol"],
};

// ---------------------------------------------------------------------
// 7) HABITACIONES
// ---------------------------------------------------------------------
export const habitaciones = [
  {
    id: "cedro",
    nombre: "Cedro",
    frase: "Rústica y cálida, toda de madera",
    precio: 850,
    personas: 5,
    camas: "6 camas, una en el tapanco (loft) con escalera de madera",
    bano: "Baño privado dentro de la habitación",
    detalles: [
      "Techo de vigas y piso de duela",
      "Cuadros de mazorcas de maíz nativo y alacena con loza de talavera",
      "Escritorio con TV junto a la ventana con vista al jardín",
      "Microondas, cafetera y dispensador de agua",
      "La puerta da directo al patio de terracota",
      "1 auto dentro de la propiedad",
    ],
    fotos: ["cedro-cama-tapanco", "cedro-general", "cedro-escritorio-ventana", "cedro-poster-banca"],
    airbnb: "https://www.airbnb.mx/rooms/1629353410426806989",
    calificacion: "4.67",
    resenas: 9,
  },
  {
    id: "encino",
    nombre: "Encino",
    frase: "Amplia y luminosa, pensada para grupos",
    precio: 900,
    personas: 6,
    camas: "3 camas matrimoniales y 2 sofás, una cama en el tapanco (loft)",
    bano: "Baño privado, a unos pasos de la habitación",
    detalles: [
      "La más grande de la casa",
      "Detalles de bienvenida: toallas, agua y una olla de barro",
      "Ventana grande hacia el patio y lámpara de mimbre",
      "Escritorio, TV y microondas",
      "Cafetera y agua para tu café de la mañana",
      "1 auto dentro de la propiedad",
    ],
    fotos: ["encino-general-tapanco", "encino-bienvenida", "encino-tv-microondas", "encino-bano-regadera"],
    airbnb: "https://www.airbnb.mx/rooms/1629761311669125578",
    calificacion: "4.75",
    resenas: 12,
  },
];

// Comparación "Reserva directo y ahorra" (referencia real: Cedro, 6–11 dic, 5 noches)
export const ahorro = {
  habitacion: "Cedro",
  directoNoche: 850,
  airbnbNoche: 1113, // ≈ $5,566 por 5 noches con cargos de Airbnb
  noches: 5,
  airbnbTotal: 5566,
  nota: "Precio de Airbnb consultado para 5 noches (6–11 de diciembre), con cargos incluidos. Puede variar según fechas.",
};

// ---------------------------------------------------------------------
// 8) LA CASA: áreas comunes, amenidades y actividades
// ---------------------------------------------------------------------
export const areas = [
  { icono: "arbol", titulo: "Jardín con luces", texto: "Pasto amplio, jacarandas, cedros, un naranjo y luces colgantes entre los árboles." },
  { icono: "billar", titulo: "Sala de billar", texto: "Billar, piano, guitarras, libros, juegos de mesa y sistema de sonido. De 10 a.m. a 8 p.m." },
  { icono: "fuego", titulo: "Fogata y parrilla", texto: "Lugar para fogata, asador y comedor al aire libre bajo las luces." },
  { icono: "farol", titulo: "Pórtico de faroles", texto: "Sillones de mimbre, ajedrez y faroles que dibujan estrellitas en las paredes." },
  { icono: "terraza", titulo: "Terraza junto al cedro", texto: "Una terraza de madera para leer, trabajar, comer o platicar." },
  { icono: "pesa", titulo: "Gym al aire libre", texto: "Un pequeño gimnasio para no perder la rutina… la buena." },
  { icono: "conejo", titulo: "Los vecinos", texto: "Dos conejos, gallinas y una perrita juguetona que sale a recibirte." },
  { icono: "taza", titulo: "Café y algo rico", texto: "Cada cuarto tiene microondas y cafetera, hay agua purificada y, si se te antoja, te preparamos desayunos y comidas." },
];

export const amenidades = [
  "Wifi y área para trabajar",
  "Agua caliente, shampoo y jabón",
  "Toallas, sábanas y cobijas extra",
  "Microondas, cafetera y agua purificada",
  "TV en cada habitación",
  "Calentador portátil",
  "Estacionamiento gratis (1 auto por habitación)",
  "Cargador para auto eléctrico nivel 1 (110 V)",
  "Entrada privada y camino iluminado",
  "Cerradura en cada habitación",
  "Botiquín y extintor",
  "Juegos de mesa y libros",
];

export const actividades = [
  "Billar", "Piano y guitarras", "Juegos de mesa", "Rompecabezas", "Ping pong",
  "Futbol", "Voleibol", "Asador", "Fogata", "Gym al aire libre", "Convivir con los animales",
];

export const sellos = [
  { icono: "huella", titulo: "Pet friendly", texto: "Tu mascota es bienvenida sin costo extra (máximo 2)." },
  { icono: "hoja", titulo: "Casa ecológica", texto: "Captamos y purificamos agua de lluvia, hacemos composta y reciclamos." },
];

// ---------------------------------------------------------------------
// 9) EVENTOS EN EL JARDÍN
// ---------------------------------------------------------------------
export const eventos = {
  titulo: "Tu fiesta bajo las luces",
  intro:
    "Cumpleaños, bodas pequeñas, posadas, cine al aire libre o una reunión con los tuyos. Rentamos el jardín aparte, con anticipación y directo con Hugo.",
  capacidad: 130,
  horario: "Hasta las 2:00 a.m., según el evento",
  precios: [
    { rango: "1 a 50 personas", precio: 100 },
    { rango: "51 a 100 personas", precio: 80 },
    { rango: "Más de 100 personas", precio: 70 },
  ],
  incluye: ["Jardín", "Baños", "Sala de billar (hasta las 10 p.m.)"],
  aparte: "Mesas, lonas, comida y cualquier extra se cotizan según tu evento. También hay servicio de comida.",
  hospedaje: "¿Te quedas a dormir? Las habitaciones se rentan aparte, a su precio normal.",
  fotos: ["evento-cine-jardin", "evento-dia-de-muertos", "jardin-hora-azul"],
};

// ---------------------------------------------------------------------
// 10) SERVICIOS EXTRA (los precios se cotizan por WhatsApp) y FECHAS ESPECIALES
// ---------------------------------------------------------------------
export const extras = [
  { icono: "taza", titulo: "Desayunos y comidas", texto: "Pide tu desayuno servido en el jardín." },
  { icono: "auto", titulo: "Uber y traslados", texto: "A Xochimilco, Six Flags, el Estadio o el centro." },
  { icono: "mapa", titulo: "Tour por la ciudad", texto: "Conoce la ciudad con alguien que la vive." },
  { icono: "cine", titulo: "Noche de películas", texto: "Cine al aire libre en el jardín, con pantalla y proyector." },
  { icono: "fuego", titulo: "Fogata", texto: "En temporada de lluvias adaptamos el espacio para la fogata." },
  { icono: "plato", titulo: "Comida para eventos", texto: "Para que tú solo te ocupes de disfrutar." },
];

export const fechasEspeciales = [
  { clave: "halloween", titulo: "Halloween", texto: "Luces moradas, papel picado y una noche especial en el jardín." },
  { clave: "navidad", titulo: "Navidad", texto: "Una celebración para cerrar el año entre árboles y luces." },
  { clave: "sanvalentin", titulo: "San Valentín", texto: "Noche romántica en pareja." },
];

// ---------------------------------------------------------------------
// 11) RESEÑAS (reales, de Airbnb; solo se corrigió ortografía evidente)
// ---------------------------------------------------------------------
export const categorias = [
  { nombre: "Comunicación", valor: "4.9" },
  { nombre: "Exactitud", valor: "4.8" },
  { nombre: "Calidad-precio", valor: "4.8" },
  { nombre: "Llegada", valor: "4.7" },
];

export const frasesDestacadas = [
  "Un lugar increíble para estar desconectado en la CDMX",
  "No parecía la ciudad",
  "Como en casa",
];

export const resenas = [
  { nombre: "Gerardo", origen: "Coatepec", fecha: "oct 2026", tipo: "Viaje grupal", texto: "Un lugar increíble para estar desconectado en la CDMX, con una atención incomparable, gracias por todo Hugo." },
  { nombre: "Odalys Kali", origen: "CDMX", fecha: "nov 2026", tipo: "Viaje grupal", texto: "¡Excelente experiencia! El lugar es muy cómodo, agradable y está muy bien para pasar un buen rato. La sala de billar fue un gran plus, nos divertimos mucho. También había una perrita súper juguetona y muy bonita que hizo la estancia todavía más agradable." },
  { nombre: "Viridiana Abigail", origen: "Mérida", fecha: "ago 2026", texto: "Me encantó, 10 de 10 para descansar. Un buen lugar, no parecía la ciudad." },
  { nombre: "Mafer", fecha: "abr 2026", tipo: "Estancia con niños", texto: "Es un lugar lindo, tranquilo para pasar un fin de semana lejos del estrés y poder descansar. Todo está limpio, te reciben de la mejor manera y ponen a tu disposición todo lo que está en la casa. La atención es constante, respetuosa y amable. Es un excelente lugar, lo recomiendo 100% y sin duda será de mis lugares favoritos." },
  { nombre: "Susana", origen: "León", fecha: "ago 2026", tipo: "Estancia con niños", texto: "Si te gusta la naturaleza, este es el lugar ideal: es tranquilo, tiene áreas verdes con dos conejos, dos gallinas de kinoa, una perrita muy juguetona, el cuarto está muy bien distribuido. La verdad, regresaremos en la primera oportunidad que tengamos." },
  { nombre: "Miriam", fecha: "sep 2026", texto: "El lugar es realmente precioso, te sientes como en casa, hay diferentes opciones de entrenamiento, sin olvidar las mascotas que hay. Definitivamente volveré a ese lugar. Los anfitriones súper amables, atentos y demás. Cumplió mucho más de mis expectativas." },
  { nombre: "Alejandro", origen: "CDMX", fecha: "may 2026", tipo: "Viaje grupal", texto: "¡El lugar está increíble! Nos gustó mucho, es totalmente para ir a relajarte y desconectar de todo. Tienen 2 conejos hermosos y unas gallinas súper bonitas. Muy recomendable." },
  { nombre: "Martha", fecha: "nov 2026", texto: "Está limpio, buena gente, gran hospitalidad, lugar hermoso y familiar. Con agua caliente." },
  { nombre: "Fátima", origen: "San Miguel de Allende", fecha: "ago 2026", texto: "Es un lugar muy bonito, simple, pero tiene todo lo que necesitas: camas cómodas, baño con agua caliente y además una bonita vista con el patio y áreas comunes." },
  { nombre: "Ana", origen: "CDMX", fecha: "jul 2026", texto: "Desde que llegamos, muy atentos, nos recibieron excelente. Y son muy flexibles. El lugar muy limpio y cómodo." },
  { nombre: "Enrique", origen: "Puebla", fecha: "jul 2026", texto: "Excelente lugar para relajarse del estrés de la ciudad." },
  { nombre: "Fernando", origen: "Querétaro", fecha: "sep 2026", texto: "Excelente alojamiento y una zona muy tranquila." },
  { nombre: "Jose Octavio", fecha: "jul 2026", tipo: "Viaje grupal", texto: "Todo excelente, realmente nos sentimos a gusto." },
  { nombre: "Amneris", origen: "Querétaro", fecha: "abr 2026", tipo: "Estancia con mascota", texto: "Un espacio muy agradable y el anfitrión amable y atento :)" },
  { nombre: "Viridiana Dalila", origen: "Querétaro", fecha: "ago 2026", texto: "Como en casa." },
  { nombre: "Mario Gerardo", origen: "Ramos Arizpe", fecha: "ago 2026", texto: "Muy buen servicio." },
];

// ---------------------------------------------------------------------
// 12) ALREDEDORES (distancias aproximadas en línea recta)
// ---------------------------------------------------------------------
export const alrededores = {
  frase: "En pueblo, junto al bosque, a minutos del sur de la ciudad",
  grupos: [
    {
      id: "pie",
      titulo: "A pie",
      lugares: [
        { nombre: "Las Cazuelas", dist: "100 m", nota: "Comida corrida y guisados del día." },
        { nombre: "Mercado de San Andrés Totoltepec", dist: "200 m", nota: "Fruta, verdura y tacos de carnitas y suadero. Los jueves, tianguis." },
        { nombre: "Don Fercho Restaurante", dist: "200 m", nota: "Familiar, ★4.7, a veces con música en vivo." },
        { nombre: "Farmamedic", dist: "200 m", nota: "Farmacia, 9 a.m.–9 p.m." },
        { nombre: "Tienda 3B y Súper Barato", dist: "300 m", nota: "Para lo que se te haya olvidado." },
        { nombre: "Clínica de Dios", dist: "500 m", nota: "Clínica y farmacia abiertas 24 horas." },
        { nombre: "Origen Verde", dist: "800 m", nota: "Desayunos, tlayudas y cochinita." },
        { nombre: "El Rincón de María", dist: "900 m", nota: "Comida casera, ★4.6." },
      ],
    },
    {
      id: "naturaleza",
      titulo: "Naturaleza",
      lugares: [
        { nombre: "Parque Ecológico de la CDMX (Xitle)", dist: "2.1 km", nota: "Senderismo, bici y vistas." },
        { nombre: "Piedra Encantada de Tlalpan", dist: "3.7 km", nota: "Lago con patos y tortugas. Entrada libre." },
        { nombre: "Loreto y Peña Pobre", dist: "4.8 km", nota: "Talleres y restaurantes, ideal en familia." },
        { nombre: "Bosque de Tlalpan", dist: "5 km", nota: "Para caminar o correr." },
        { nombre: "Cumbres del Ajusco", dist: "9.5 km", nota: "Montaña, bosque y senderos." },
      ],
    },
    {
      id: "cultura",
      titulo: "Cultura",
      lugares: [
        { nombre: "Centro histórico de Tlalpan", dist: "3.9 km", nota: "Casonas, cafés, plaza, mercado y museos." },
        { nombre: "Casa de Cultura Frissac", dist: "3.9 km", nota: "Exposiciones y eventos gratuitos." },
        { nombre: "Zona arqueológica de Cuicuilco", dist: "5.4 km", nota: "Pirámide circular prehispánica, entrada gratuita." },
        { nombre: "Trajineras de Xochimilco (Cuemanco)", dist: "8.5 km", nota: "Te llevamos con el servicio de traslado." },
      ],
    },
    {
      id: "diversion",
      titulo: "Diversión",
      lugares: [
        { nombre: "Six Flags México", dist: "6 km", nota: "Un día completo de juegos." },
        { nombre: "Estadio Banorte (Azteca)", dist: "6.3 km", nota: "Partidos y conciertos." },
        { nombre: "Perisur", dist: "6 km", nota: "Centro comercial." },
        { nombre: "Cafetería Melk", dist: "2 km", nota: "★4.9, buen café cerca." },
        { nombre: "Restaurante Arenal", dist: "2.6 km", nota: "Comida con mirador rumbo al Ajusco." },
      ],
    },
  ],
};

// ---------------------------------------------------------------------
// 13) REGLAS Y POLÍTICAS (acordeón)
// ---------------------------------------------------------------------
export const reglas = [
  {
    titulo: "Llegada y salida",
    puntos: [
      "Llegada a partir de las 3:00 p.m.",
      "Salida antes de las 12:00 p.m.",
      "Formas de pago: efectivo, transferencia o tarjeta (con tarjeta se suma la comisión de la terminal).",
    ],
  },
  {
    titulo: "Reglas de la casa",
    puntos: [
      "Cedro: hasta 5 personas. Encino: hasta 6 personas.",
      "Mascotas bienvenidas, máximo 2, sin costo extra. Sus gracias y travesuras corren por tu cuenta.",
      "1 auto por habitación dentro de la propiedad; los demás se quedan afuera.",
      "Visitas solo si las acordaste antes con el anfitrión. No se permiten fiestas en el hospedaje.",
      "No se fuma dentro de los cuartos (afuera sí).",
      "Billar de 10:00 a.m. a 8:00 p.m. El jardín no tiene horario, pero es compartido.",
      "Horas de silencio: 11:00 p.m. a 8:00 a.m.",
      "Cuidamos el agua y separamos la basura: orgánica a la composta, inorgánica al reciclaje.",
      "Puedes usar todo lo de las áreas comunes; solo devuélvelo como lo encontraste.",
    ],
  },
  {
    titulo: "Reservas y cancelación (hasta 1 semana)",
    puntos: [
      "Apartas con el 50% de anticipo y el resto lo pagas al llegar.",
      "Cancelas con 7 días o más: te devolvemos todo el anticipo.",
      "Cancelas entre 6 y 3 días antes: te devolvemos el 50% del anticipo, o cambias la fecha una vez sin costo.",
      "Cancelas con menos de 72 horas o no llegas: el anticipo no se devuelve.",
      "Si te vas antes, las noches no usadas no se reembolsan.",
    ],
  },
  {
    titulo: "Estancias largas (más de una semana o un mes)",
    puntos: [
      "Hay descuento: se platica por WhatsApp antes de reservar.",
      "Anticipo: 1 semana de renta.",
      "Cancelas con 15 días o más: te devolvemos el anticipo. Con menos de 15 días, no se devuelve.",
    ],
  },
  {
    titulo: "Eventos en el jardín",
    puntos: [
      "Apartas la fecha con el 50% de anticipo.",
      "Cancelas con 15 días o más: te devolvemos el anticipo. Con menos, no se devuelve (o puedes mover la fecha una vez).",
      "Cuéntanos qué tipo de evento es y cómo va a funcionar.",
    ],
  },
  {
    titulo: "Si nosotros cancelamos",
    puntos: ["Te devolvemos todo. Sin letras chiquitas."],
  },
];
