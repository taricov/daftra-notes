# Daftra Notes Per Page 

[Daftra](https://daftra.com/) is an ERP system that helps SMEs to manage their resources and this app/extension is one of many tools I created to make it easier for you(Daftra's client) to deal w/ and to have better experience while you are doing your business. 

## Features

- ⚡️ Take notes **Per Page** - and get back to them whenever needed.
- 💬 Organize your ideas/workflow/tasks as you go for later and w/o having to leave the screen where you are doind work!

- 🦾 Pair [this tool](https://www.app.org/) w/ the other [Apps/Tools](https://www.app.org/) we developped to make your life easier.  
- 📦 [This tool](./src/components) is part of an open source set of tools and apps that enable you to be more effecient for that reason it was taken into considration and while development to provide a unique cohesive consistent experience.
- 🖥 It is conpatible w/ all devices that could use browser extensions.
- 🌍 And works on popular web browsers Google Chrome and Firefox.
- 📃 Login and get back to ur notes any time.

## Open Source

[This tool](./src/components) is part of an open source set of tools and apps, that you have the freedom, as a developer/having a developer, to re-use in development to your likings/your business needs.

## For Usage In Development

fork the repo and clone it to ur local machine and run:


```bash
pnpm install
```

This will install all the dependecies, then you could run:

```bash
pnpm dev
```

Then **load extension in browser with the `extension/` folder**.

For Firefox developers, you can run the following command instead:

```bash
pnpm start:firefox
```

### Build

To build the extension, run

```bash
pnpm build
```

And then pack files under `extension`, you can upload `extension.crx` or `extension.xpi` to appropriate extension store.