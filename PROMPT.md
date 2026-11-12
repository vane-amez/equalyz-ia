PROMPT PARA LOVABLE — "Equalyz: Market Intelligence & Comparador de Precios"

    Copia todo este documento y pégalo en Lovable como primer mensaje. Está dividido por secciones para que Lovable construya la app completa, funcional y con el mismo diseño. Si Lovable te pide aclaraciones, las respuestas ya están aquí.

0. ROL Y OBJETIVO

Actúa como un desarrollador full-stack senior y diseñador de producto. Construye Equalyz, una aplicación web en español (Colombia) que ayuda a personas y emprendedores colombianos a decidir si les conviene importar un producto desde EE. UU. por courier o comprarlo en una tienda de Colombia, calculando el costo real con flete, arancel e IVA de la DIAN, usando la TRM (dólar oficial) del día.

La app debe ser 100 % funcional: nada de botones decorativos. Cada botón, formulario, selector, interruptor y enlace debe hacer algo real y dar retroalimentación visible (aviso tipo "toast").

Lema: "Compara precios reales, impuestos y fletes sin sesgos." Subtítulo de marca: "Market Intelligence". Público: compradores colombianos de tecnología y pequeños emprendedores que revenden productos importados.

1. ESTRUCTURA GENERAL

Una sola aplicación con 6 vistas y navegación sin recargar la página:

    Inicio
    Comparador ("Comparador Cara a Cara")
    Emprendedor B2B ("Panel Emprendedor B2B")
    Comunidad ("Comunidad Transparente")
    Alertas ("Configuración de Alertas")
    Acceso (iniciar sesión / crear cuenta)

Requisitos de navegación:

    Cada vista tiene su propia dirección en el navegador (por ejemplo #comparador o /comparador). Los botones Atrás/Adelante del navegador deben funcionar, y al recargar la página se debe quedar en la misma vista.
    Al cambiar de vista, subir suavemente al inicio de la página.
    Si el usuario ya inició sesión y va a "Acceso", mandarlo a Inicio.
    La pestaña activa se resalta (texto ámbar, fondo vino translúcido y borde ámbar suave).

1.1 Encabezado fijo (escritorio y tablet)

    Altura 64 px, fijo arriba, fondo azul noche con transparencia y desenfoque, borde inferior.
    Izquierda: logotipo de texto "Equalyz" (extra negrita, se vuelve ámbar al pasar el mouse) + separador vertical + "MARKET INTELLIGENCE" en mayúsculas pequeñas grises.
    Centro: menú con Inicio · Comparador · Emprendedor B2B · Comunidad · Alertas (se oculta en celular).
    Derecha:
        Botón de moneda "🇨🇴 COP" ↔ "🇺🇸 USD": cambia TODOS los precios de la app entre pesos y dólares. La elección se recuerda.
        Indicador de TRM con un punto que parpadea: verde si el dato está al día, ámbar si se usa un valor guardado o el de respaldo. Muestra "TRM $3.xxx". Al pasar el mouse dice "TRM oficial vigente desde AAAA-MM-DD" o "Sin conexión: usando último valor conocido".
        Zona de cuenta: si no hay sesión, botón "Acceder". Si hay sesión, nombre del usuario + etiqueta "Verificado B2B" en ámbar + círculo con la inicial y borde degradado; al tocarlo pregunta "¿Deseas cerrar tu sesión en Equalyz?" y cierra la sesión.

1.2 Barra inferior en celular

    Solo en pantallas pequeñas: barra fija abajo de 68 px con 5 pestañas con icono + texto: Inicio, Comparar, B2B, Comunidad, Alertas. La activa en ámbar.
    Dejar espacio inferior en el contenido para que la barra no tape nada.

1.3 Pie de página

    Izquierda: "Equalyz · Asistente de compra inteligente y transparente".
    Derecha: "© {año actual} Equalyz. Todos los derechos reservados."

1.4 Avisos (toast)

    Aparecen arriba a la derecha, con icono (✓, ⚠️, 🔥, 📋, 🔒, etc.) y mensaje corto; entran deslizando y desaparecen solos a los ~3 segundos. Un aviso nuevo reemplaza al anterior.

1.5 Ventanas emergentes (modales)

    Fondo negro al 70 % con desenfoque, caja centrada con bordes redondeados.
    Se cierran con la X, con "Cancelar", con la tecla Escape o tocando fuera de la caja.
    Al abrirse, el cursor va al primer campo.

2. DISEÑO VISUAL (OBLIGATORIO)

Estilo: tablero financiero oscuro, elegante, tipo "terminal de inteligencia de mercado", con acentos cálidos de fuego (ámbar → naranja → rojo). Nada de morado ni fondos blancos.
2.1 Colores
Uso	Color
Fondo general	#0c1229 (azul noche)
Tarjetas / superficie más profunda	#070c24
Superficie secundaria (campos, chips)	#151a32
Bordes y líneas	#333851
Rojo principal	#dc2f02
Naranja de acento	#f48c06
Ámbar	#ffba08
Vino (pestaña activa)	#370617 / #6a040f
Texto principal	casi blanco #f8fafc
Texto secundario	gris pizarra
Éxito / ahorro / verificado	verde esmeralda
Peligro / pérdida	rojo

    Degradado de marca: ámbar → naranja → rojo, usado en botones principales y en la palabra destacada de cada título (texto con degradado).
    Resplandor: la tarjeta ganadora del comparador tiene un brillo naranja suave alrededor.
    Selección de texto: fondo ámbar con letra negra.
    Barras de desplazamiento delgadas (6 px) y oscuras.

2.2 Tipografía

    Texto general: Plus Jakarta Sans (400–800).
    Números, precios, porcentajes y códigos: JetBrains Mono (500–700).

2.3 Componentes

    Tarjetas con bordes redondeados grandes (16 px), borde fino gris azulado.
    Cada vista abre con una cabecera: una línea pequeña en ámbar y mayúsculas con un punto ("• RADAR COMPARATIVO ACTIVO") y debajo el título grande en blanco con la segunda parte en degradado ("Comparador Cara a Cara"). Botones de acción a la derecha. Línea divisoria debajo.
    Botón principal: degradado de fuego, texto blanco negrita.
    Botón secundario: fondo #151a32, borde, texto gris que se aclara al pasar el mouse.
    Campos de texto: fondo #151a32, borde gris; borde ámbar al escribir.
    Etiquetas pequeñas tipo "pastilla" para estados (verde = verificado/exento, ámbar = aviso).
    Todo adaptable a celular, tablet y escritorio. Ancho máximo del contenido: 1280 px.

3. REGLAS DE NEGOCIO Y FÓRMULAS (EXACTAS)
3.1 Constantes

    TRM de respaldo: 4.120 COP por dólar (solo si no hay internet ni valor guardado).
    Flete courier: US$4,50 por libra.
    Exención DIAN: compras de hasta US$200 (precio del producto) no pagan arancel ni IVA.
    Arancel: 10 % sobre (precio + flete), solo si el precio supera US$200.
    IVA: 19 % sobre (precio + flete + arancel), solo si el precio supera US$200.
    Motor de alertas: revisa cada 45 segundos.

3.2 Costo desembarcado ("landed") de una importación

flete     = peso_lb × 4,50
exento    = precio_usd ≤ 200
arancel   = exento ? 0 : (precio_usd + flete) × 0,10
iva       = exento ? 0 : (precio_usd + flete + arancel) × 0,19
total_usd = precio_usd + flete + arancel + iva
total_cop = redondear(total_usd × TRM)

3.3 Puntaje Equalyz (0 a 98)

Para cada opción (importada y local):

mejor_precio = mínimo(landed, precio_local)
ratio        = mínimo(1, mejor_precio / precio_de_esta_opción)
puntos_precio    = 55 × ratio²
puntos_rapidez   = 20 × máximo(0, 1 − (días_entrega − 1) / 14)
puntos_garantía  = local ? 15 : 7
puntos_factura   = local ? 8 : 4
puntaje = redondear(suma)

    Ganador: la opción local si su puntaje es mayor o igual al de la importada; si no, la importada.

3.4 Formato de dinero

    En COP: $1.489.000 COP (separador de miles con punto, sin decimales).
    En USD: US$451,23 (dos decimales). La conversión usa la TRM del día.
    Todos los precios de la app se recalculan al cambiar de moneda o al llegar una TRM nueva.

3.5 TRM en vivo

    Obtener el dólar oficial de Colombia desde los datos abiertos del gobierno: https://www.datos.gov.co/resource/32sa-8pi3.json?$order=vigenciadesde%20DESC&$limit=1 (campo valor = TRM, campo vigenciadesde = fecha).
    Guardarla una vez por día; si ya se consultó hoy, usar la guardada.
    Esperar máximo 8 segundos; si falla, usar la última guardada (punto ámbar) o la de respaldo.

4. CATÁLOGO DE PRODUCTOS DE EJEMPLO (11)

    Los precios son de ejemplo; reemplázalos por precios reales cuando los tengas.

id	Producto	Marca	Categoría	Precio EE. UU. (US$)	Peso (lb)	Precio Colombia (COP)	Tienda en Colombia	Días importado	Días local	Palabras clave
sony-xm5	Sony WH-1000XM5 Noise Canceling	Sony	Audio Hi-Fi	329	2	1.489.000	Sony Store Colombia	7	1	sony, xm5, wh-1000, wh1000
bose-qcu	Bose QuietComfort Ultra	Bose	Audio Hi-Fi	379	2,2	1.790.000	Bose Colombia	8	2	bose, quietcomfort, qc ultra
airpods-pro2	Apple AirPods Pro 2 (USB-C)	Apple	Audio Hi-Fi	189	1	1.199.000	iShop Colombia	6	1	airpods, airpod
galaxy-s24	Samsung Galaxy S24 5G 256GB	Samsung	Smartphones 5G	799	1	3.899.000	Samsung Colombia	7	1	galaxy, s24, samsung
iphone-15	Apple iPhone 15 128GB	Apple	Smartphones 5G	699	1	3.799.000	iShop Colombia	7	1	iphone
dji-mini4	DJI Mini 4 Pro Fly More	DJI	Drones 4K	1.099	4	5.290.000	DJI Store Bogotá	9	2	dji, mini 4, mini4, drone, dron
rog-g14	ASUS ROG Zephyrus G14 RTX 4060	ASUS	Laptops Gaming	1.499	5	8.499.000	ASUS Store Colombia	9	2	asus, rog, zephyrus, g14
macbook-air	MacBook Air M3 13" 16GB	Apple	Laptops Gaming	1.099	3	6.299.000	iShop Colombia	8	1	macbook, mac book, air m3, air m2
sony-a6400	Sony Alpha a6400 + 16-50mm	Sony	Cámaras Mirrorless	899	2	4.599.000	Sony Store Colombia	8	2	a6400, alpha, mirrorless
garmin-265	Garmin Forerunner 265 GPS	Garmin	Wearables Salud	349	1	1.950.000	Garmin Colombia	6	1	garmin, forerunner
ps5-slim	PlayStation 5 Slim 1TB	Sony	Consolas Next-Gen	449	10	2.699.000	Alkosto	9	1	ps5, playstation

Categorías de alertas (7): Smartphones 5G, Audio Hi-Fi, Drones 4K, Laptops Gaming, Cámaras Mirrorless, Wearables Salud, Consolas Next-Gen.
5. VISTA 1 — INICIO
5.1 Portada

    Pastilla ámbar: "● Decisiones de compra inteligentes y transparentes".
    Título grande: "Compara precios reales, impuestos y fletes sin sesgos." ("sin sesgos" con degradado).
    Texto: "Análisis multifuente neutral. Calculamos aranceles DIAN, costos courier y reputación comprobada en Colombia."
    Buscador: campo "Pega enlace de Amazon, Mercado Libre, Éxito..." + botón degradado "Analizar Enlace →". Enter también busca.

Comportamiento del buscador:

    Si está vacío: aviso "Por favor pega un enlace o nombre de producto".
    Mostrar aviso "Analizando estructura arancelaria y flete..." y esperar ~0,6 s.
    Si es un enlace, leer el dominio y la ruta del enlace como texto (cambiando guiones, barras y signos por espacios). Si no, usar el texto en minúsculas.
    Buscar en el catálogo el producto con más palabras clave coincidentes.
    Si lo encuentra: abrir el Comparador con ese producto y aviso "Encontrado: {nombre}".
    Si no: crear un producto personalizado con el nombre escrito (máx. 60 caracteres; sin el dominio si era enlace), precio EE. UU. US$250, 2 lb, precio Colombia $1.500.000, 7 días importado, 2 días local; abrir el Comparador, avisar "No está en el catálogo: ajusta los precios para comparar" y poner el cursor en el precio en dólares.

5.2 Cuatro indicadores (2 columnas en celular, 4 en escritorio)

    Ahorro Promedio: promedio, entre los 11 productos, de (precio local − mejor precio) / precio local, en %. Formato "+18,4 %". Subtexto "vs. retail local estándar".
    Monitoreo DIAN: "<$200 USD" en ámbar. Subtexto "Exención arancel 0% activa".
    Facturas Auditadas: parte de 12.400 y suma 1 por cada reporte nuevo publicado por la comunidad; se muestra como "12.4K". Subtexto verde "98.6% validadas con CUFE".
    Latencia Push: "< 3.0s" en ámbar. Subtexto "Telegram & app push".

5.3 Duelo de la semana

    Etiqueta ámbar "DUELO ACÚSTICO FLAGSHIP DE LA SEMANA", título "Sony WH-1000XM5 vs. Bose QC Ultra", enlace "Abrir análisis completo en Comparador →".
    Dos tarjetas que se pueden tocar (Sony y Bose). Cada una muestra el precio de la opción ganadora del producto, el detalle ("Entrega 24h • Garantía Colombia" si gana local, o "Importación 7 días • Impuestos incluidos / Exento DIAN" si gana importado, en verde cuando es local) y a la derecha el puntaje grande ("87%") con "SCORE LOCAL" o "SCORE IMPORT".
    Tocar una tarjeta abre el Comparador con ese producto.

6. VISTA 2 — COMPARADOR CARA A CARA

    Cabecera: "• RADAR COMPARATIVO ACTIVO" / "Comparador Cara a Cara". A la derecha: "TRM Oficial: $3.xxx COP".

6.1 Panel de ajustes

    Producto a comparar (lista con los 11 productos; si hay uno personalizado aparece de primero como "✎ {nombre} (personalizado)").
    Precio en USA (USD), Peso (libras) (pasos de 0,5), Precio en Colombia (COP) (pasos de 10.000).
    Al elegir un producto se llenan los 3 campos. Al cambiar cualquier campo, todo se recalcula al instante (sin botón).
    Nota: "Flete courier US$4.50/lb. Compras de hasta US$200 están exentas; por encima se cobra arancel 10% + IVA 19%."
    El último producto visto se recuerda al volver a abrir la app.

6.2 Dos tarjetas lado a lado (una debajo de otra en celular)

Tarjeta Importado — "🇺🇸 Amazon USA Courier" + pastilla "{n} días hábiles"; título "{Producto} (Importado)".

    Caja: "Costo Desembarcado Total (Landed)" con el precio grande y debajo "FOB US$x + Flete US$y + Impuestos US$z" (sin impuestos si es exento). A la derecha el puntaje "xx/100".
    Lista: "Impuestos DIAN:" → verde "Exento (≤ US$200 base aduanal)" o ámbar "Arancel US$x + IVA US$y"; "Garantía:" → "1 año internacional (trámite en USA)"; "Retorno / Devolución:" → ámbar "Costeado por usuario internacional".
    Botón "Ver Oferta en Amazon ↗": abre en pestaña nueva la búsqueda de Amazon con el nombre del producto.

Tarjeta Local — "🇨🇴 {Tienda en Colombia}" + pastilla verde "Entrega Inmediata (24h)" o "Entrega {n} días"; título "{Producto} Oficial Colombia".

    Caja: "Precio Final Facturado con IVA" + precio + verde "Envío asegurado nacional incluido"; puntaje a la derecha.
    Lista: "Facturación:" → verde "Factura Electrónica DIAN con CUFE"; "Garantía:" → verde "12 meses directa con {Marca} Colombia"; "Retorno / Devolución:" → "Derecho de retracto (5 días hábiles)".
    Botón "Comprar con Garantía Nacional →": abre en pestaña nueva la búsqueda de Mercado Libre Colombia con el nombre del producto.

La ganadora lleva borde ámbar grueso, resplandor naranja, una cinta arriba "★ RECOMENDACIÓN EQUALYZ", puntaje en verde con "SCORE ÓPTIMO" y su botón en degradado. La perdedora: borde normal, puntaje ámbar "SCORE EQUALYZ" y botón secundario.
6.3 Veredicto

Barra con pastilla "VEREDICTO" y una frase que cambia según el resultado:

    Gana local y es más caro: "Por solo +$X (+Y%) recibes en 24h / N días, aseguras factura DIAN y soporte técnico local."
    Gana local y es más barato: "Comprar en Colombia es $X más barato (Y%) y además incluye garantía local y entrega rápida."
    Gana importado: "Importar te ahorra $X (Y%) incluso con flete [e impuestos]; espera N días y asume la garantía internacional."

Botón "Copiar resumen 📋": copia al portapapeles "Equalyz Radar: {producto}. Nacional ($X) vs. Importado ($Y). Recomendación: comprar en Colombia / importar. {veredicto}" y avisa "Resumen copiado al portapapeles" (con plan B si el navegador bloquea el portapapeles).

7. VISTA 3 — PANEL EMPRENDEDOR B2B

    Cabecera: "• TELEMETRÍA DE ARBITRAJE COMERCIAL" / "Panel Emprendedor B2B". Botones: "Descargar CSV 📥" y "+ Nuevo SKU".

7.1 Simulador de Desembarco & Margen

    Título con pastilla verde "DIAN <$200 Activa"; a la derecha "Tarifa Courier: $4.50 USD/lb".
    Campos: Precio FOB Origen (USD) (inicial 120), Peso Estimado (Libras) (inicial 2,0), Precio Venta Local (COP) (inicial 790.000).
    Cuadro de resultado: "Margen Bruto Proyectado".
        ganancia = venta − costo landed; margen = ganancia / venta × 100 (1 decimal).
        Si hay ganancia: verde "+48,2 %" y "+$258.000 COP netos". Si hay pérdida: rojo "−12,0 %" y "−$X déficit".
    Línea de detalle: "Flete US$9 · Impuestos: exento · Costo landed $xxx" (o "Arancel US$x + IVA US$y").
    Se recalcula al escribir.
    "Guardar como SKU →": si falta FOB o precio de venta, avisar "Completa precio FOB y precio de venta"; si no, abrir el formulario de nuevo SKU con costo y precio ya llenos.

7.2 Tabla "Oportunidades de Arbitraje Monitoreadas"

    Contador a la derecha: "3 SKUs activos" (singular si es 1).
    Columnas: SKU / Producto · Origen · Costo Landed · PVP Sugerido · Spread Margen · Acción.
    Spread = (PVP − landed) / PVP × 100, con 1 decimal y signo "+". Verde si es positivo, rojo si es negativo.
    Acción: botón "✕" para eliminar (pide confirmación "¿Eliminar "{nombre}" del panel?"; aviso "SKU eliminado del panel").
    Tabla vacía: mensaje "No hay SKUs registrados. Haz clic en "+ Nuevo SKU"."
    Con desplazamiento horizontal en celular.

Datos iniciales:
Producto	Origen	Landed (COP)	PVP (COP)	Spread
Sony WH-1000XM5 ANC	Amazon USA (MIA)	1.479.000	2.150.000	31,2 %
DJI Mini 3 Pro Fly More	B&H Photo (NYC)	2.890.000	3.750.000	22,9 %
Garmin Forerunner 265 GPS	Amazon USA (MIA)	1.280.000	1.950.000	34,4 %
7.3 Ventana "Registrar Nuevo SKU de Arbitraje"

    Campos obligatorios: Nombre o Modelo del Producto, Origen / Proveedor, Costo Landed Total (COP), PVP Sugerido Colombia (COP).
    Validar que los valores sean mayores a cero ("Los valores deben ser mayores a cero").
    Al guardar: queda de primero en la tabla, aviso "SKU "{nombre}" añadido al radar" y se va al Panel B2B si no estaba ahí.

7.4 Descargar CSV

    Archivo Equalyz_Arbitraje_B2B_AAAA-MM-DD.csv, separado por punto y coma, con tildes correctas al abrir en Excel.
    Columnas: ID;Nombre;Origen;CostoLandedCOP;PVPSugeridoCOP;SpreadPorcentaje.
    Si no hay SKUs: "No hay SKUs para exportar".

8. VISTA 4 — COMUNIDAD TRANSPARENTE

    Cabecera: "• RESEÑAS VERIFICADAS & AUDITORÍA" / "Comunidad Transparente". Botón "+ Publicar Reporte con Factura".
    Distribución: lista de reportes (2/3 del ancho) + columna lateral (1/3). En celular, una debajo de otra.

8.1 Tarjeta de reporte

    Nombre del usuario + pastilla verde "✓ CUFE Auditado (fe29...a8b1)"; a la derecha "N días de entrega" (singular si es 1).
    "{Producto} • {Tienda}" y el comentario.
    Abajo: "Score Experiencia: 98%" y botón "👍 Útil (42)".
    Voto: un voto por persona y por reporte; tocarlo de nuevo lo retira ("Voto retirado"). Si ya votó, el botón queda ámbar con "👍 Te pareció útil".
    Sin reportes: "Aún no hay reportes. ¡Publica el primero!"

Reportes iniciales:

    David M. (Bogotá) — Sony WH-1000XM5 — Mercado Libre Oficial — 1 día — 98 % — CUFE fe29...a8b1 — "Llegó en menos de 24 horas. Factura legal verificada en DIAN y garantía activa con Sony Colombia." — 42 votos.
    Valentina R. (Medellín) — MacBook Air M2 16GB — Amazon USA Courier — 7 días — 86 % — CUFE a19c...883e — "Sin cobros sorpresa de arancel. Flete courier cobrado tal cual lo proyectó Equalyz." — 29 votos.

8.2 Ventana "Publicar Reporte de Compra Real"

    Requiere sesión: si no ha iniciado sesión, avisar "Inicia sesión para publicar un reporte", llevar a Acceso y, después de entrar, devolverlo a Comunidad.
    Campos obligatorios: Producto Adquirido, Tienda, Días de Entrega (mínimo 1), Código CUFE / Hash Factura DIAN, Comentario.
    Validar el CUFE: quitar todo lo que no sea hexadecimal (0-9, a-f); debe quedar con al menos 8 caracteres. Si no: "El CUFE debe tener al menos 8 caracteres hexadecimales".
    Mostrar el CUFE abreviado: primeros 4 + "..." + últimos 4.
    Score de experiencia = máximo(60, 100 − (días − 1) × 3).
    El reporte se publica de primero con el nombre del usuario, 0 votos, y aviso "Reporte publicado y auditado". Se actualiza el indicador de facturas del Inicio.

8.3 Columna lateral "Semáforo de Cumplimiento"

Barras de progreso:

    Mercado Libre Platinium — 96 % (verde)
    Amazon USA Prime Direct — 88 % (ámbar)
    AliExpress Choice Standard — 64 % (rojo) Nota inferior: "Basado en 12,480 guías de rastreo y CUFE verificados."

9. VISTA 5 — ALERTAS

    Cabecera: "• MOTOR PUSH DE PRECIOS & OPORTUNIDADES" / "Configuración de Alertas". Botón "Guardar Parámetros de Alerta".

9.1 Panel "Etiquetas de Categorías Monitoreadas"

    Texto: "Selecciona los rubros que deseas escanear cada 45 segundos:".
    Las 7 categorías como chips que se prenden/apagan al tocarlos y se guardan al instante (prendido = fondo vino, texto ámbar y "✓"; apagado = gris con "+").
    Activas al inicio: Smartphones 5G, Audio Hi-Fi, Laptops Gaming.

9.2 Panel "Canales y Umbral de Disparo"

    Deslizador "Descuento / Spread mínimo para notificar:" de 5 % a 40 % (inicial 15 %), con el valor en ámbar.
    Interruptores: "Notificaciones Push de Navegador" (prendido), "Bot de Telegram Instantáneo" (prendido), "Resumen Matutino por Correo" (apagado).

9.3 Guardar parámetros

    Guarda umbral y canales; aviso "Reglas guardadas: descuento mínimo 15% · motor activo".
    Si el canal Push está prendido, pedir permiso de notificaciones al navegador.
    Al guardar, activar el motor automáticamente.

9.4 Panel "Historial de Alertas" y motor

    Estado debajo del título: "Motor detenido · guarda tus parámetros para activarlo" o "Motor activo · próximo escaneo en 32 s" (cuenta regresiva en vivo).
    Botones: "Probar alerta ahora ⚡", "Activar motor" / "Pausar motor", "Limpiar".
    Cada escaneo (cada 45 s con el motor activo, o al probar):
        Si no hay categorías activas: "Activa al menos una categoría para escanear". Si no hay canales: "Activa al menos un canal de notificación" (estos avisos solo al probar a mano).
        Elegir al azar un producto del catálogo de las categorías activas.
        Descuento = umbral + número al azar entre 0 y 11.
        Precio antes = mejor precio del producto; precio ahora = antes × (1 − descuento/100).
        Guardar la alerta (máximo 20 en el historial, la más nueva arriba) con fecha, producto, categoría, descuento, precios y canales.
        Aviso "🔥 −22 % en {producto}: $X". Si Push está prendido y hay permiso, mostrar notificación del navegador "Equalyz · Oportunidad detectada".
    Cada alerta del historial muestra: pastilla "−22%", producto, "categoría · fecha y hora · vía Push, Telegram", precio antes tachado, precio ahora en verde y botón "Comparar →" que abre ese producto en el Comparador.
    Historial vacío: "Aún no hay alertas. Usa "Probar alerta ahora" para ver una."
    "Limpiar" borra el historial con aviso "Historial limpio".
    El estado del motor (prendido/apagado) se recuerda al recargar.

10. VISTA 6 — ACCESO (INICIAR SESIÓN / CREAR CUENTA)

    Tarjeta centrada: "Acceso a Equalyz" / "Tu radar neutral de precios y telemetría de arbitraje".
    Dos pestañas: "Iniciar Sesión" (activa: fondo ámbar, letra negra) y "Crear Cuenta".
    Botones "Google" y "Apple ID", separador "O CORPORATIVO".
    Formulario: Nombre Completo (solo al crear cuenta), Correo Electrónico, Contraseña.
    Botón: "INGRESAR AL RADAR →" o "CREAR CUENTA VERIFICADA →".

Reglas:

    Contraseña de al menos 6 caracteres.
    Crear cuenta: exige nombre; si el correo ya existe, avisar "Ese correo ya tiene cuenta. Inicia sesión." y cambiar a esa pestaña. Si todo bien: "Cuenta creada. ¡Bienvenido, {nombre}!".
    Iniciar sesión: si el correo no existe, "No existe una cuenta con ese correo. Crea una." y cambiar de pestaña; si la contraseña no coincide, "Contraseña incorrecta"; si todo bien, "Bienvenido de nuevo, {nombre}".
    Correo sin mayúsculas ni espacios. La contraseña nunca se guarda en texto plano.
    Después de entrar, volver a la vista desde la que lo mandaron a iniciar sesión (o Inicio).
    La sesión se mantiene al recargar.

11. GUARDADO DE DATOS

Todo lo siguiente debe guardarse y seguir ahí al recargar:

    Sesión actual y cuentas creadas.
    SKUs del Panel B2B.
    Reportes de la comunidad y votos del usuario.
    Categorías, umbral y canales de alertas; historial de alertas; estado del motor.
    TRM del día, moneda elegida (COP/USD) y último producto del comparador.

La primera vez que alguien abre la app, cargar los datos iniciales (3 SKUs, 2 reportes, 3 categorías activas, canales por defecto).

Opción A (sencilla): guardar todo en el navegador de cada persona (no se comparte entre usuarios). Opción B (recomendada para producción): usar Lovable Cloud para cuentas reales (correo y contraseña, Google y Apple), y guardar SKUs (privados de cada usuario), reportes y votos (públicos para leer, solo el autor publica; un voto por usuario) en la base de datos, con permisos para que nadie pueda editar lo de otro.

    Indica a Lovable cuál opción quieres. Si no dices nada, que empiece con la Opción A.

12. SEGURIDAD Y CALIDAD

    Todo texto escrito por usuarios (nombres, reportes, SKUs) se muestra como texto, nunca como código (evitar inyección de HTML).
    Validar todos los números: nada negativo, campos vacíos cuentan como 0.
    Si falla internet, la app sigue funcionando con la TRM guardada.
    Sin errores en la consola del navegador.
    Accesible: etiquetas en los campos, foco visible, se puede usar con teclado, Enter envía formularios y Escape cierra ventanas.

13. TEXTOS PARA BUSCADORES Y REDES

    Título: "Equalyz — Market Intelligence & Comparador de Precios".
    Descripción: "Compara precios reales en Colombia: importación con flete e impuestos DIAN vs. compra local, panel B2B, comunidad y alertas."
    Idioma de la página: español.

14. CRITERIOS DE ACEPTACIÓN (LISTA DE PRUEBA)

Lovable debe probar cada punto antes de dar por terminado:

    Escribir "airpods" en el buscador del Inicio abre el Comparador con los AirPods Pro 2.
    Pegar https://www.amazon.com/Sony-WH-1000XM5/dp/B09XS7JWHH abre los Sony WH-1000XM5.
    Escribir "licuadora oster" abre un producto personalizado editable.
    En el Comparador, AirPods (US$189, 1 lb) aparece "Exento"; Galaxy S24 (US$799) muestra arancel + IVA.
    Cambiar el precio en dólares recalcula precio, puntajes, ganador, cinta de recomendación y veredicto al instante.
    "Copiar resumen" deja el texto en el portapapeles.
    El botón COP/USD cambia todos los precios de la app y se recuerda al recargar.
    La TRM real aparece en el encabezado con punto verde.
    Simulador con 120 / 2 / 790.000 muestra margen positivo en verde; con venta 100.000 muestra déficit en rojo.
    "Guardar como SKU" abre el formulario con valores llenos; al guardar aparece de primero en la tabla.
    El botón ✕ de una fila pide confirmación y quita la fila. "Descargar CSV" baja un archivo que abre bien en Excel.
    Publicar reporte sin sesión lleva a Acceso; después de crear cuenta vuelve a Comunidad.
    Un CUFE como "xyz" es rechazado; "fe29a8b1c3d4" es aceptado y se muestra "fe29...c3d4".
    Votar suma 1; votar otra vez resta 1.
    Crear cuenta con contraseña de 5 caracteres es rechazado; correo repetido es rechazado; contraseña equivocada es rechazada.
    "Probar alerta ahora" agrega una alerta al historial y muestra el aviso 🔥; con el motor activo llega otra cada 45 s y se ve la cuenta regresiva.
    Quitar todas las categorías y probar alerta muestra el aviso de advertencia.
    Las ventanas se cierran con Escape y tocando fuera.
    En celular (390 px de ancho) se ve la barra inferior, nada se corta y la tabla se desplaza de lado.
    Recargar la página conserva vista actual, sesión, SKUs, reportes, votos, alertas y moneda.

15. LO QUE NO DEBES HACER

    No dejar botones sin función ni textos de relleno tipo "Lorem ipsum".
    No usar fondos blancos, morados ni tipografías genéricas.
    No cambiar las fórmulas, constantes ni textos indicados arriba sin preguntar.
    No mostrar precios sin formato colombiano.
    No pedir datos de tarjetas ni pagos.

16. MEJORAS OPCIONALES (PARA DESPUÉS)

Pídeselas a Lovable en mensajes aparte una vez esté lista la base:

    Precios reales consultados automáticamente desde tiendas.
    Bot de Telegram y resumen por correo que se envíen de verdad.
    Gráfica del historial de precios de cada producto.
    Panel de administración para editar el catálogo.
    Modo claro.
