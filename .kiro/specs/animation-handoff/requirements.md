# Requirements Document

## Introduction

Este documento define los requerimientos para la interfaz de Handoff de Animaciones. El proyecto actual es un demo de UI con múltiples páginas (login, onboarding, signup-flow, dashboard, activation) que contiene animaciones aprobadas. El objetivo es crear una interfaz dedicada que sirva como herramienta de referencia para el equipo de desarrollo, permitiendo visualizar cada animación de forma aislada, con navegación por botones y URLs únicas compartibles.

## Glossary

- **Handoff_Interface**: La página principal que actúa como hub de navegación para visualizar las animaciones del proyecto
- **Animation_Panel**: El panel lateral o sección de navegación (botonera) que lista todas las animaciones disponibles
- **Animation_Viewer**: El área principal de visualización donde se reproduce la animación seleccionada dentro de un device frame
- **Animation_Entry**: Cada elemento individual en el catálogo de animaciones, compuesto por un nombre, una descripción y un enlace único
- **Device_Frame**: El contenedor visual que simula un dispositivo móvil para presentar las animaciones en contexto
- **Deep_Link**: La URL única asignada a cada animación que permite acceso directo y compartible (usando hash fragments o query params)

## Requirements

### Requirement 1: Página principal del Handoff

**User Story:** Como desarrollador del equipo, quiero acceder a una página principal de handoff, para poder ver el catálogo completo de animaciones disponibles para implementar.

#### Acceptance Criteria

1. THE Handoff_Interface SHALL presentar un encabezado con el texto "Animation Handoff" como título principal de la página
2. WHEN la Handoff_Interface carga inicialmente, THE Animation_Panel SHALL ser visible y mostrar la lista completa de las 10 animaciones definidas en el catálogo, cada una identificada por su nombre
3. THE Handoff_Interface SHALL utilizar el mismo stack tecnológico del proyecto existente (HTML, CSS y JavaScript vanilla) sin requerir pasos de compilación ni servidor de desarrollo
4. THE Handoff_Interface SHALL ser accesible desde un archivo HTML llamado "handoff.html" ubicado en la raíz del proyecto
5. WHEN la Handoff_Interface carga sin ninguna animación seleccionada, THE Animation_Viewer SHALL mostrar un estado vacío con un mensaje que indique al usuario que seleccione una animación del panel

### Requirement 2: Panel de navegación de animaciones (Botonera)

**User Story:** Como desarrollador del equipo, quiero un panel de navegación con botones para cada animación, para poder seleccionar y visualizar rápidamente la animación que necesito revisar.

#### Acceptance Criteria

1. THE Animation_Panel SHALL listar las siguientes 10 animaciones como botones seleccionables: Splash animation de entrada, Comportamiento de teclado en Forms, Animación Bottom Sheets, Animación Success, Animación Verified, Animación Stroke-Banner, Animación Highlight de botones, Animación Checklist Step, Animación Address, Animación Transición entre pantallas
2. WHEN el usuario hace clic en un botón del Animation_Panel, THE Animation_Viewer SHALL reproducir la animación correspondiente desde el inicio y de forma completa sin repetición automática
3. WHILE una animación está seleccionada, THE Animation_Panel SHALL aplicar al botón activo un estilo visual diferenciado del resto de botones (diferente color de fondo o borde) para indicar cuál animación se está mostrando
4. THE Animation_Panel SHALL permanecer visible en pantalla sin ser ocultado por el Animation_Viewer mientras se visualiza cualquier animación, permitiendo al usuario cambiar de animación en todo momento
5. WHEN el Animation_Panel se carga por primera vez, THE Animation_Panel SHALL mostrar todos los botones en estado no seleccionado y el Animation_Viewer SHALL permanecer vacío o mostrar un mensaje indicando que se debe seleccionar una animación
6. WHEN el usuario hace clic en el botón de la animación que ya está activa, THE Animation_Viewer SHALL reiniciar la reproducción de esa animación desde el inicio

### Requirement 3: Visualización de animaciones

**User Story:** Como desarrollador del equipo, quiero ver cada animación reproducida de forma aislada dentro de un device frame, para poder entender exactamente cómo debe comportarse en la implementación.

#### Acceptance Criteria

1. WHEN una animación es seleccionada, THE Animation_Viewer SHALL iniciar automáticamente la reproducción de la animación dentro de un Device_Frame que simule un dispositivo móvil, sin requerir interacción adicional del usuario
2. THE Animation_Viewer SHALL reproducir únicamente la animación seleccionada, sin renderizar ni ejecutar otros elementos o animaciones del proyecto de forma concurrente dentro del mismo Device_Frame
3. WHEN una animación de duración finita finaliza su ciclo, THE Animation_Viewer SHALL mostrar un botón de replay visible que permita reiniciar la reproducción desde el inicio
4. IF la animación seleccionada es de tipo loop continuo (CSS infinite o video loop), THEN THE Animation_Viewer SHALL mostrar el botón de replay permanentemente visible, permitiendo reiniciar la animación desde el fotograma inicial en cualquier momento
5. THE Device_Frame SHALL mantener las dimensiones de 360px de ancho y 780px de alto, con un border-radius de 40px, fondo negro (#000), y padding interno de 12px, consistente con el device-frame del proyecto existente

### Requirement 4: Enlaces únicos por animación (Deep Links)

**User Story:** Como desarrollador del equipo, quiero que cada animación tenga una URL única, para poder compartir el enlace directo con otros miembros del equipo y que accedan directamente a la animación específica.

#### Acceptance Criteria

1. THE Handoff_Interface SHALL asignar un Deep_Link único a cada Animation_Entry utilizando hash fragments en la URL con formato kebab-case derivado del nombre de la animación (ejemplo: handoff.html#splash-animation)
2. WHEN un usuario accede a la Handoff_Interface mediante un Deep_Link válido, THE Animation_Viewer SHALL cargar y reproducir la animación correspondiente y el Animation_Panel SHALL resaltar el botón asociado como activo
3. WHEN el usuario selecciona una animación desde el Animation_Panel, THE Handoff_Interface SHALL actualizar la URL del navegador con el Deep_Link correspondiente sin recargar la página
4. WHEN el usuario hace clic en el botón de copiar enlace de una Animation_Entry, THE Handoff_Interface SHALL copiar la URL completa con el Deep_Link al portapapeles del sistema y mostrar una confirmación visual temporal durante 2 segundos indicando que el enlace fue copiado
5. IF un usuario accede a la Handoff_Interface mediante un Deep_Link que no corresponde a ninguna Animation_Entry registrada, THEN THE Handoff_Interface SHALL mostrar el estado por defecto del Animation_Panel sin ninguna animación seleccionada

### Requirement 5: Catálogo de animaciones con metadatos

**User Story:** Como desarrollador del equipo, quiero ver información descriptiva de cada animación, para entender su contexto y dónde se aplica dentro del flujo de la aplicación.

#### Acceptance Criteria

1. THE Animation_Entry SHALL mostrar el nombre de la animación con mayor peso visual que los demás elementos del entry (tamaño de fuente superior al de la descripción y estilo bold)
2. THE Animation_Entry SHALL incluir una descripción de máximo 120 caracteres que indique la pantalla o flujo específico donde se utiliza la animación (ejemplo: "Pantalla de Login - animación de entrada del formulario")
3. THE Animation_Entry SHALL mostrar la ruta relativa del archivo fuente donde la animación está implementada en el proyecto (ejemplo: "js/main.js"), presentada como texto monoespaciado para distinguirla del resto del contenido
4. IF el archivo fuente referenciado en una Animation_Entry no existe en el proyecto, THEN THE Animation_Entry SHALL mostrar un indicador visual que señale que la referencia es inválida

### Requirement 6: Diseño visual coherente

**User Story:** Como desarrollador del equipo, quiero que la interfaz de handoff mantenga coherencia visual con el proyecto existente, para tener una experiencia unificada al navegar entre el handoff y las demos.

#### Acceptance Criteria

1. THE Handoff_Interface SHALL cargar la tipografía General Sans desde la misma fuente del proyecto (api.fontshare.com) incluyendo los pesos 400, 500, 600 y 700
2. THE Handoff_Interface SHALL utilizar la paleta de colores definida en las variables CSS del proyecto (purple-primary, purple-dark, bg-page, text-white)
3. THE Handoff_Interface SHALL presentar todo su contenido visible sin scroll horizontal y con elementos interactivos accesibles en viewports de escritorio con un ancho mínimo de 1024px
4. THE Handoff_Interface SHALL incluir el logo de Ontop en el encabezado, visible al cargar la página sin necesidad de scroll
5. IF el viewport tiene un ancho menor a 1024px, THEN THE Handoff_Interface SHALL reorganizar su contenido en una sola columna manteniendo la legibilidad del texto y la accesibilidad de los enlaces

### Requirement 7: Accesibilidad de la interfaz

**User Story:** Como miembro del equipo, quiero que la interfaz de handoff sea accesible mediante teclado, para poder navegar entre animaciones sin depender exclusivamente del mouse.

#### Acceptance Criteria

1. THE Animation_Panel SHALL ser navegable mediante teclado (Tab para moverse entre botones, Enter para seleccionar)
2. WHEN un botón del Animation_Panel recibe foco mediante teclado, THE Animation_Panel SHALL mostrar un indicador visual de foco con un outline de al menos 2px de contraste visible contra el fondo
3. THE Handoff_Interface SHALL utilizar role="navigation" en el Animation_Panel, role="tablist" en el contenedor de botones, role="tab" en cada botón, y aria-selected="true" en el botón activo para describir la estructura de navegación y el estado activo
4. WHEN el usuario presiona las teclas de flecha (ArrowUp/ArrowDown) dentro del Animation_Panel, THE Animation_Panel SHALL mover el foco al botón anterior o siguiente respectivamente
