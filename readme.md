## Requisitos

- El SEO es importante; en la JSConf 2016 incluso se desarrolló una aplicación, y la gente buscaba las charlas en Google.
- Se necesitan componentes para mostrar las charlas.

## Decisiones de Arquitectura

### Tailwind + HTML

Para acelerar la entrega, hemos elegido Tailwind + HTML. De esta manera, todos pueden colaborar sin necesidad de tener mucha experiencia en diseño. Tailwind establece pautas que evitan que se cometan errores importantes en cuanto a estilos.

### Elección de Astro

**Rendimiento**: Astro se destaca por su enfoque en el rendimiento. Utiliza técnicas de renderizado en el servidor para generar páginas web altamente eficientes que cargan rápidamente. Esto es crucial para una conferencia en línea, donde los participantes deben acceder rápidamente a la información y los recursos.

**SEO**: Astro es amigable con los motores de búsqueda (SEO) porque genera contenido estático que es fácilmente indexable por los motores de búsqueda. Esto es importante si deseas que la información sobre tu conferencia sea fácilmente descubrible en línea.

**Experiencia del usuario**: La velocidad de carga rápida y la capacidad de carga progresiva de Astro contribuyen a una experiencia del usuario fluida. Los participantes de tu conferencia pueden acceder a la información de manera rápida y sin problemas.

**Reutilización de componentes**: Astro permite la reutilización de componentes en diferentes partes de tu sitio web. Esto facilita la creación de páginas coherentes y la gestión eficiente de contenido, horarios, perfiles de oradores y más.

### Source dinamico para la agenda

Para la agenda, vamos a utilizar un source dinamico. A menudo sucede que las charlas se retrasan y las agendas no se actualizan, por lo que no tienes idea de lo que está sucediendo.

Crearemos una API con un administrador muy simple para que se puedan modificar los horarios de las charlas sobre la marcha. Es algo relativamente fácil de hacer, pero no se suele hacer.
