// window.getFoo = () =>  {
//   return new Promise(res => {
//     res({
//       init: () => {
//         console.log('init called')
//       },
//       get: () => {
//         console.log('get called')

//       }
//     })
//   });
// }

window.getFoo = {
  hello: "Testing",
  get: (
    data,
    getScope,
  ) => {
    console.log(data);
    console.log(getScope);
    return new Promise(res => {

      res(() => {
        return {
          hello: 'Test'
        }
      })

    })
  }
}

function start() {
  import("./bootstrap");
}

window.start = start;

