# Vite Plugin Federation

This example demos using @originjs/vite-plugin-federation in 2 variants.

- `vite-to-webpack` is the example for  `vite as remote and webpack as host`.
- `webpack-to-vite` is the example for  `webpack as remote and vite as host`.


# Running each Demo

1. vite-to-webpack,  
  - cd vite-remote, yarn start 
  - cd webpack-host, yarn start

2. webpack-to-vite,  
  - cd vite-host, yarn start 
  - cd webpack-remote, yarn start

commands will run host or remote `http://localhost:3000/` and `http://localhost:5000/`


- [localhost:3000](http://localhost:3000/) (Webpack)
- [localhost:5000](http://localhost:5000/) (Vite)