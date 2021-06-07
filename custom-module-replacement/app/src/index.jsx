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
    return new Promise(res => {
      const params = new URLSearchParams(location.search);
      res(() => {
        return {
          hello: 'Test',
          name: params.get('name') || 'Unnamed'
        }
      })

    })
  }
}

import("./bootstrap");

// window.start = start;

