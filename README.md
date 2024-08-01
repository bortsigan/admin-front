# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash

# npm
npm install

or 
npm install --force 

or 

npm install --legacy-peer-deps
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```


PS: in the /plugins/axios.js
make sure you're using the correct localhost url 
example
```
axios.defaults.baseURL = 'http://localhost:8000'
```