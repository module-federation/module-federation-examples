import HomePage from 'home/home';
const Home = HomePage;
console.log(Home);
Home.getInitialPrrops = HomePage.gmetInitialProps;
export default Home;
//	function asyncOperation() {
// 			// This is just an example; replace it with your own logic.
// 			return new Promise((resolve) => {
// 				setTimeout(() => {
// 					console.log('init operation completed');
// 					resolve(__webpack_require__.I('default',[]));
// 				}, 1000);
// 			}).then((r) => {
// 				console.log('react loaded', __webpack_require__.S.default['react']['18.2.0']);
// 				if(__webpack_require__.S.default['react']['18.2.0'].loaded) return;
// 				console.log('loading react',r )
//
// 				return __webpack_require__.S.default['react']['18.2.0'].get().then(f=>{
// 					__webpack_require__.S.default['react']['18.2.0'].get = ()=>f
// 					__webpack_require__.S.default['react']['18.2.0'].loaded = true
// 				})
// 			}).then((r)=>{
// 				console.log(__webpack_require__.S);
// 			});
// 		}
// 		self["webpackChunkcheckout"] = {
// 			_array: self["webpackChunkcheckout"] || [],
//
// 			push: function() {
// 				var args = Array.prototype.slice.call(arguments);
// 				console.log('push', args);
// 				var self = this;
// 				asyncOperation(function() {
// 					Array.prototype.push.apply(self._array, args);
// 				});
// 			},
//
// 			forEach: function(callback, thisArg) {
// 				console.log('forEach', thisArg)
// 				var self = this;
// 				var i = 0;
// 				function next() {
// 					if (i < self._array.length) {
// 						asyncOperation(function() {
// 							callback.call(thisArg, self._array[i], i, self._array);
// 							i++;
// 							next();
// 						});
// 					}
// 				}
// 				next();
// 			}
// 		};
// 		/******/
// 		/******/ var chunkLoadingGlobal = self["webpackChunkcheckout"] || [];
// 		/******/ chunkLoadingGlobal.forEach(function (item, index) {
// 			/******/   console.log("forEach:", index, item);
// 			/******/   webpackJsonpCallback.call(null, 0, item);
// 			/******/ });
// 		/******/
// 		/******/ chunkLoadingGlobal.push = (function (originalPush) {
// 			/******/   return function () {
// 				/******/     console.log("push:", arguments[0][0], arguments[0][0].includes('main'));
//
// 				if(arguments[0][0].includes('main') || arguments[0][0].includes('/pages')) {
// 					console.log('running async ope', arguments[0][0]);
// 					asyncOperation().then(() => {
// 						/******/
// 						webpackJsonpCallback.apply(null, [null].concat(Array.prototype.slice.call(arguments)));
// 						/******/
// 						return originalPush.apply(chunkLoadingGlobal, arguments);
// 					})
// 				} else {
// 					/******/
// 					webpackJsonpCallback.apply(null, [null].concat(Array.prototype.slice.call(arguments)));
// 					/******/
// 					return originalPush.apply(chunkLoadingGlobal, arguments);
// 				}
// 				/******/   };
// 			/******/ })(chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
