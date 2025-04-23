<h1 align="center">
PWA Vite React/Shadcn/Tailwind Template
</h1>

<div>&nbsp</div><div>&nbsp</div><div>&nbsp</div>

# Boilerplate Techstack

This boilerplate is already preinstalled with:

- _[Vite Plugin PWA](https://vite-plugin-pwa.netlify.app/)_ to generate the manifest JSON for _[progressive web app (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)_.
- _[Vite.js](https://vitejs.dev/)_ frontend tooling to build for production.
- _[React.js](https://reactjs.org/)_ with TypeScript support.
- _[Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite)_ CSS.
- _[Shadcn/ui](https://ui.shadcn.com/docs/installation/vite)_ Component library.

<div>&nbsp</div><div>&nbsp</div><div>&nbsp</div>

# How To Use

## Generate GitHub repository

1. Generate your repository from this template: _[Click Here](https://github.com/void314/react-pwa-template/generate)_
2. Clone code to your to remote repository: `git clone https://github.com/user-name/repository-name`

Note: supply your GitHub user-name and repository-name.

## Development

The following terminal commands are from _[Vite.js command line interface](https://vitejs.dev/guide/#command-line-interface)_. 
Also check the _[package.json](https://github.com/void314/react-pwa-template/blob/main/package.json)_ file "scripts" section for all command line scripts.

Note: _[npm](https://www.npmjs.com/)_ can also be replaced with _[yarn](https://yarnpkg.com/)_ or _[pnpm](https://pnpm.io/)_...

### Run development website locally

```
npm run dev
```

- There is no PWA functionality in development mode.

### Build production files - to "dist" folder

```
npm run build
```

- Ensure there are no TypeScript errors, otherwise complilation will be aborted.
- Build files will be placed in the "dist" folder by default.
- To change build folder, add this line to _[vite.config.ts](https://github.com/void314/react-pwa-template/blob/main/vite.config.ts)_ `defineConfig`:

```javascript
build: {
  outDir: './build-directory'
},
```

### Run production build website locally

```
npm run start
```
