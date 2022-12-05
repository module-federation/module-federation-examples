# vue3-demo-federation-with-vite

This project is a mix of `webpack-federation` and `vite-federation`

## vite-side

`vite` as a packaging tool, host uses `vite`, remote uses `webpack` project

## weboack-side

`webpack` as a packaging tool, host using `webpack`, remote uses `vite` project

## how to run

```shell
cd vue3-demo-federation-with-vite
pnpm install
pnpm build
pnpm serve
```

vite: http://localhost:5000/
<br>
webpack: http://localhost:5001/
