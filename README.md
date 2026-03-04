# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

## 🧠 Multi-Agent Workflows

The application now supports building lightweight linear workflows that chain
existing agents together. A new workflow builder lives on the AI Studio page –
select multiple agents, provide an initial message, and the output of each
agent will be fed as the input to the next in sequence. Custom agents stored in
the database can be included alongside the built‑in roles.

An HTTP API is available at `POST /api/agents/workflow`:

```json
{
  "agentIds": ["architect","senior_se"],
  "message": "Design a scalable messaging system",
  "provider": "openai"
}
```

### Markdown import/export

Agents (built‑in and user‑created) can now be serialized to and from a
simple markdown format described by `src/lib/ai/markdown.ts`.  Each agent is a
YAML‑style document boundaries with `---` and includes metadata followed by a
fenced code block containing the `systemPrompt`.

- **Export**: `GET /api/agents/markdown` returns markdown for the current
  user’s agents.  Query parameters:
  - `ids` (comma list) – limit output to specific agents.
  - `presets=true` – include the built‑in roles as well.

- **Import**: `POST /api/agents/markdown` with `{ "markdown": "..." }`
  will parse and insert or update agents for the authenticated user.

Workflows may also be saved in markdown using a minimal key/value syntax and
can be imported directly in the front‑end (see the `MultiAgentWorkflow`
component).

```md
---
name: Code Review Chain
agents: senior_se, security, manager
---
```
The response contains a list of results from each agent in order.


Inside of your Astro project, you'll see the following folders and files:

```text
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
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
