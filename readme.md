# Astro Starter Kit: Basics

```
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

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
