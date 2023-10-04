<a href="https://voby-toast.com/"><img alt="voby-toast - Try it out" src="https://github.com/timolins/voby-toast/raw/main/assets/header.svg"/></a>

<div align="center">
    <img src="https://badgen.net/npm/v/voby-toast" alt="NPM Version" />
  <img src="https://badgen.net/bundlephobia/minzip/voby-toast" alt="minzipped size"/>
    <img src="https://github.com/timolins/voby-toast/workflows/CI/badge.svg" alt="Build Status" />
</a>
</div>
<br />
<div align="center"><strong>Smoking hot  Notifications for React.</strong></div>
<div align="center"> Lightweight, customizable and beautiful by default.</div>
<br />
<div align="center">
<a href="https://voby-toast.com/">Website</a> 
<span> · </span>
<a href="https://voby-toast.com/docs">Documentation</a> 
<span> · </span>
<a href="https://twitter.com/timolins">Twitter</a>
</div>

<br />
<div align="center">
  <sub>Cooked by <a href="https://twitter.com/timolins">Timo Lins</a> 👨‍🍳</sub>
</div>

<br />

## Features

- 🔥 **Hot by default**
- 🔩 **Easily Customizable**
- ⏳ **Promise API** - _Automatic loader from a promise_
- 🕊 **Lightweight** - _less than 5kb including styles_
- ✅ **Accessible**
- 🤯 **Headless Hooks** - _Create your own with [`useToaster()`](https://voby-toast.com/docs/use-toaster)_

## Installation

#### With yarn

```sh
yarn add voby-toast
```

#### With NPM

```sh
npm install voby-toast
```

## Getting Started

Add the Toaster to your app first. It will take care of rendering all notifications emitted. Now you can trigger `toast()` from anywhere!

```jsx
import toast, { Toaster } from 'voby-toast';

const notify = () => toast('Here is your toast.');

const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
```

## Documentation

Find the full API reference on [official documentation](https://voby-toast.com/docs).
