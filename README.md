# Woby-Toast

## Ported from [react-hot-toast](https://react-hot-toast.com/)

<br />
<div align="center"><strong>Smoking hot  Notifications for React.</strong></div>
<div align="center"> Lightweight, customizable and beautiful by default.</div>

<br />

## Features

- 🔥 **Hot by default**
- 🔩 **Easily Customizable**
- ⏳ **Promise API** - _Automatic loader from a promise_
- 🕊 **Lightweight** - _less than 5kb including styles_
- ✅ **Accessible**
- 🤯 **Headless Hooks** - _Create your own with [`useToaster()`](https://woby-toast.com/docs/use-toaster)_

## Installation

#### With yarn

```sh
yarn add woby-toast
```

#### With NPM

```sh
npm install woby-toast
```

## Getting Started

Add the Toaster to your app first. It will take care of rendering all notifications emitted. Now you can trigger `toast()` from anywhere!

```jsx
import { toast, Toaster } from 'woby-toast';

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
