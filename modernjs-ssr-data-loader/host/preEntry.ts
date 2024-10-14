import {init} from '@modern-js/runtime/mf';
import router from '@modern-js/runtime/router';
console.log(33333);
init({
    name:'host',
    remotes:[],
    shared: {
        '@modern-js/runtime/router': {
            version: "2.60.2",
            scope: "default",
            lib: ()=> router,
            shareConfig: {
                singleton: true,
                requiredVersion: ">1"
            }
        }
    }
})