!(function () {
  var __webpack_modules__ = {
      271: function (r, c, s) {
        'use strict';
        var u = (function r(r) {
          return r && 'object' == typeof r && 'default' in r ? r : { default: r };
        })(s('519'));
        r.exports = u.default;
      },
      299: function (r, c, s) {
        'use strict';
        function u(r, c) {
          (null == c || c > r.length) && (c = r.length);
          for (var s = 0, u = Array(c); s < c; s++) u[s] = r[s];
          return u;
        }
        function l(r) {
          if (Array.isArray(r)) return u(r);
        }
        function h(r) {
          if (void 0 === r)
            throw ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r;
        }
        function m(r, c, s, u, l, h, m) {
          try {
            var S = r[h](m),
              E = S.value;
          } catch (r) {
            s(r);
            return;
          }
          S.done ? c(E) : Promise.resolve(E).then(u, l);
        }
        function S(r, c) {
          for (var s = 0; s < c.length; s++) {
            var u = c[s];
            (u.enumerable = u.enumerable || !1),
              (u.configurable = !0),
              'value' in u && (u.writable = !0),
              Object.defineProperty(r, u.key, u);
          }
        }
        function E(r) {
          return (E = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (r) {
                return r.__proto__ || Object.getPrototypeOf(r);
              })(r);
        }
        function O(r) {
          if (
            ('undefined' != typeof Symbol && null != r[Symbol.iterator]) ||
            null != r['@@iterator']
          )
            return Array.from(r);
        }
        function I() {
          throw TypeError(
            'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function A(r, c) {
          return c && ('object' === w(c) || 'function' == typeof c) ? c : h(r);
        }
        function R(r, c) {
          return (R =
            Object.setPrototypeOf ||
            function (r, c) {
              return (r.__proto__ = c), r;
            })(r, c);
        }
        function w(r) {
          return r && 'undefined' != typeof Symbol && r.constructor === Symbol
            ? 'symbol'
            : typeof r;
        }
        function N(r, c) {
          if (r) {
            if ('string' == typeof r) return u(r, c);
            var s = Object.prototype.toString.call(r).slice(8, -1);
            if (
              ('Object' === s && r.constructor && (s = r.constructor.name),
              'Map' === s || 'Set' === s)
            )
              return Array.from(s);
            if ('Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
              return u(r, c);
          }
        }
        function T() {
          if ('undefined' == typeof Reflect || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (r) {
            return !1;
          }
        }
        function P(r, c) {
          (null == c || c > r.length) && (c = r.length);
          for (var s = 0, u = Array(c); s < c; s++) u[s] = r[s];
          return u;
        }
        function M(r) {
          if (Array.isArray(r)) return P(r);
        }
        function j(r) {
          if (void 0 === r)
            throw ReferenceError("this hasn't been initialised - super() hasn't been called");
          return r;
        }
        function D(r, c, s, u, l, h, m) {
          try {
            var S = r[h](m),
              E = S.value;
          } catch (r) {
            s(r);
            return;
          }
          S.done ? c(E) : Promise.resolve(E).then(u, l);
        }
        function F(r) {
          return function () {
            var c = this,
              s = arguments;
            return new Promise(function (u, l) {
              var h = r.apply(c, s);
              function m(r) {
                D(h, u, l, m, S, 'next', r);
              }
              function S(r) {
                D(h, u, l, m, S, 'throw', r);
              }
              m(void 0);
            });
          };
        }
        function H(r, c) {
          if (!(r instanceof c)) throw TypeError('Cannot call a class as a function');
        }
        function L(r, c) {
          for (var s = 0; s < c.length; s++) {
            var u = c[s];
            (u.enumerable = u.enumerable || !1),
              (u.configurable = !0),
              'value' in u && (u.writable = !0),
              Object.defineProperty(r, u.key, u);
          }
        }
        function G(r, c, s) {
          return c && L(r.prototype, c), s && L(r, s), r;
        }
        function C(r, c, s) {
          return (
            c in r
              ? Object.defineProperty(r, c, {
                  value: s,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (r[c] = s),
            r
          );
        }
        function U(r) {
          return (U = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (r) {
                return r.__proto__ || Object.getPrototypeOf(r);
              })(r);
        }
        function B(r, c) {
          if ('function' != typeof c && null !== c)
            throw TypeError('Super expression must either be null or a function');
          (r.prototype = Object.create(c && c.prototype, {
            constructor: { value: r, writable: !0, configurable: !0 },
          })),
            c && Y(r, c);
        }
        function q(r, c) {
          return null != c && 'undefined' != typeof Symbol && c[Symbol.hasInstance]
            ? !!c[Symbol.hasInstance](r)
            : r instanceof c;
        }
        function W(r) {
          if (
            ('undefined' != typeof Symbol && null != r[Symbol.iterator]) ||
            null != r['@@iterator']
          )
            return Array.from(r);
        }
        function V() {
          throw TypeError(
            'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function $(r, c) {
          return c && ('object' === z(c) || 'function' == typeof c) ? c : j(r);
        }
        function Y(r, c) {
          return (Y =
            Object.setPrototypeOf ||
            function (r, c) {
              return (r.__proto__ = c), r;
            })(r, c);
        }
        function K(r) {
          return M(r) || W(r) || J(r) || V();
        }
        function z(r) {
          return r && 'undefined' != typeof Symbol && r.constructor === Symbol
            ? 'symbol'
            : typeof r;
        }
        function J(r, c) {
          if (r) {
            if ('string' == typeof r) return P(r, c);
            var s = Object.prototype.toString.call(r).slice(8, -1);
            if (
              ('Object' === s && r.constructor && (s = r.constructor.name),
              'Map' === s || 'Set' === s)
            )
              return Array.from(s);
            if ('Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
              return P(r, c);
          }
        }
        function X() {
          if ('undefined' == typeof Reflect || !Reflect.construct || Reflect.construct.sham)
            return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
            );
          } catch (r) {
            return !1;
          }
        }
        function Z(r) {
          var c = X();
          return function () {
            var s,
              u = U(r);
            if (c) {
              var l = U(this).constructor;
              s = Reflect.construct(u, arguments, l);
            } else s = u.apply(this, arguments);
            return $(this, s);
          };
        }
        function Q(r, c) {
          var s,
            u,
            l,
            h,
            m = {
              label: 0,
              sent: function () {
                if (1 & l[0]) throw l[1];
                return l[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (h = { next: S(0), throw: S(1), return: S(2) }),
            'function' == typeof Symbol &&
              (h[Symbol.iterator] = function () {
                return this;
              }),
            h
          );
          function S(r) {
            return function (c) {
              return E([r, c]);
            };
          }
          function E(h) {
            if (s) throw TypeError('Generator is already executing.');
            for (; m; )
              try {
                if (
                  ((s = 1),
                  u &&
                    (l =
                      2 & h[0]
                        ? u.return
                        : h[0]
                        ? u.throw || ((l = u.return) && l.call(u), 0)
                        : u.next) &&
                    !(l = l.call(u, h[1])).done)
                )
                  return l;
                switch (((u = 0), l && (h = [2 & h[0], l.value]), h[0])) {
                  case 0:
                  case 1:
                    l = h;
                    break;
                  case 4:
                    return m.label++, { value: h[1], done: !1 };
                  case 5:
                    m.label++, (u = h[1]), (h = [0]);
                    continue;
                  case 7:
                    (h = m.ops.pop()), m.trys.pop();
                    continue;
                  default:
                    if (
                      !(l = (l = m.trys).length > 0 && l[l.length - 1]) &&
                      (6 === h[0] || 2 === h[0])
                    ) {
                      m = 0;
                      continue;
                    }
                    if (3 === h[0] && (!l || (h[1] > l[0] && h[1] < l[3]))) {
                      m.label = h[1];
                      break;
                    }
                    if (6 === h[0] && m.label < l[1]) {
                      (m.label = l[1]), (l = h);
                      break;
                    }
                    if (l && m.label < l[2]) {
                      (m.label = l[2]), m.ops.push(h);
                      break;
                    }
                    l[2] && m.ops.pop(), m.trys.pop();
                    continue;
                }
                h = c.call(r, m);
              } catch (r) {
                (h = [6, r]), (u = 0);
              } finally {
                s = l = 0;
              }
            if (5 & h[0]) throw h[1];
            return { value: h[0] ? h[1] : void 0, done: !0 };
          }
        }
        Object.defineProperty(c, '__esModule', { value: !0 });
        var ee = s('595'),
          et = s('30');
        function en(r, c) {
          var s = !0,
            u = !1,
            l = void 0;
          try {
            for (var h, m = r[Symbol.iterator](); !(s = (h = m.next()).done); s = !0) {
              var S = h.value,
                E = c.startsWith(S.name),
                O = c.replace(S.name, '');
              if (E) {
                if (O.startsWith('/')) {
                  var I = S.name;
                  return (O = '.'.concat(O)), { pkgNameOrAlias: I, expose: O, remote: S };
                }
                if ('' === O) return { pkgNameOrAlias: S.name, expose: '.', remote: S };
              }
              var A = S.alias && c.startsWith(S.alias),
                R = S.alias && c.replace(S.alias, '');
              if (S.alias && A) {
                if (R && R.startsWith('/')) {
                  var w = S.alias;
                  return (R = '.'.concat(R)), { pkgNameOrAlias: w, expose: R, remote: S };
                }
                if ('' === R) return { pkgNameOrAlias: S.alias, expose: '.', remote: S };
              }
            }
          } catch (r) {
            (u = !0), (l = r);
          } finally {
            try {
              !s && null != m.return && m.return();
            } finally {
              if (u) throw l;
            }
          }
        }
        function er(r, c) {
          var s = !0,
            u = !1,
            l = void 0;
          try {
            for (var h, m = r[Symbol.iterator](); !(s = (h = m.next()).done); s = !0) {
              var S = h.value;
              if (c === S.name || (S.alias && c === S.alias)) return S;
            }
          } catch (r) {
            (u = !0), (l = r);
          } finally {
            try {
              !s && null != m.return && m.return();
            } finally {
              if (u) throw l;
            }
          }
        }
        function eo(r, c) {
          var s = ee.getGlobalHostPlugins();
          s.length > 0 &&
            s.forEach(function (c) {
              (null == r
                ? void 0
                : r.find(function (r) {
                    return r.name !== c.name;
                  })) && r.push(c);
            }),
            r &&
              r.length > 0 &&
              r.forEach(function (r) {
                c.forEach(function (c) {
                  c.usePlugin(r);
                });
              });
        }
        function ea() {
          return (ea =
            Object.assign ||
            function (r) {
              for (var c = 1; c < arguments.length; c++) {
                var s = arguments[c];
                for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (r[u] = s[u]);
              }
              return r;
            }).apply(this, arguments);
        }
        function ei(r) {
          return ec.apply(this, arguments);
        }
        function ec() {
          return (ec = F(function (r) {
            var c, s;
            return Q(this, function (u) {
              return (
                (c = r.entry),
                (s = r.remoteEntryExports),
                [
                  2,
                  new Promise(function (r, u) {
                    try {
                      s
                        ? r(s)
                        : Function(
                            'resolve',
                            'import("'.concat(
                              c,
                              '").then((res)=>{resolve(res);}, (error)=> reject(error))',
                            ),
                          )(r);
                    } catch (r) {
                      u(r);
                    }
                  }),
                ]
              );
            });
          })).apply(this, arguments);
        }
        function es(r) {
          return eu.apply(this, arguments);
        }
        function eu() {
          return (eu = F(function (r) {
            var c, s, u, l, h;
            return Q(this, function (m) {
              return ((c = r.name),
              (s = r.globalName),
              (u = r.entry),
              (l = r.createScriptHook),
              (h = ee.getRemoteEntryExports(c, s).entryExports))
                ? [2, h]
                : 'undefined' == typeof document
                ? [
                    2,
                    et
                      .loadScriptNode(u, { attrs: { name: c, globalName: s }, createScriptHook: l })
                      .then(function () {
                        var r = ee.getRemoteEntryExports(c, s),
                          l = r.remoteEntryKey,
                          h = r.entryExports;
                        return (
                          ee.assert(
                            h,
                            '\n        Unable to use the '
                              .concat(c, "'s '")
                              .concat(u, "' URL with ")
                              .concat(
                                l,
                                "'s globalName to get remoteEntry exports.\n        Possible reasons could be:\n\n        1. '",
                              )
                              .concat(
                                u,
                                "' is not the correct URL, or the remoteEntry resource or name is incorrect.\n\n        2. ",
                              )
                              .concat(
                                l,
                                ' cannot be used to get remoteEntry exports in the window object.\n      ',
                              ),
                          ),
                          h
                        );
                      }),
                  ]
                : [
                    2,
                    et.loadScript(u, { attrs: {}, createScriptHook: l }).then(function () {
                      var r = ee.getRemoteEntryExports(c, s),
                        l = r.remoteEntryKey,
                        h = r.entryExports;
                      return (
                        ee.assert(
                          h,
                          '\n      Unable to use the '
                            .concat(c, "'s '")
                            .concat(u, "' URL with ")
                            .concat(
                              l,
                              "'s globalName to get remoteEntry exports.\n      Possible reasons could be:\n\n      1. '",
                            )
                            .concat(
                              u,
                              "' is not the correct URL, or the remoteEntry resource or name is incorrect.\n\n      2. ",
                            )
                            .concat(
                              l,
                              ' cannot be used to get remoteEntry exports in the window object.\n    ',
                            ),
                        ),
                        h
                      );
                    }),
                  ];
            });
          })).apply(this, arguments);
        }
        function el(r) {
          return ef.apply(this, arguments);
        }
        function ef() {
          return (ef = F(function (r) {
            var c, s, u, l, h, m, S, E;
            return Q(this, function (O) {
              return ((c = r.remoteEntryExports),
              (s = r.remoteInfo),
              (u = r.createScriptHook),
              (l = s.entry),
              (h = s.name),
              (m = s.type),
              (S = s.entryGlobalName),
              (E = et.composeKeyWithSeparator(h, l)),
              c)
                ? [2, c]
                : (!ee.globalLoading[E] &&
                    ('esm' === m
                      ? (ee.globalLoading[E] = ei({ entry: l, remoteEntryExports: c }))
                      : (ee.globalLoading[E] = es({
                          name: h,
                          globalName: S,
                          entry: l,
                          createScriptHook: u,
                        }))),
                  [2, ee.globalLoading[E]]);
            });
          })).apply(this, arguments);
        }
        function ep(r) {
          return ea({}, r, {
            entry: 'entry' in r ? r.entry : '',
            type: r.type || ee.DEFAULT_REMOTE_TYPE,
            entryGlobalName: r.entryGlobalName || r.name,
            shareScope: r.shareScope || ee.DEFAULT_SCOPE,
          });
        }
        function eh() {
          return (eh =
            Object.assign ||
            function (r) {
              for (var c = 1; c < arguments.length; c++) {
                var s = arguments[c];
                for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (r[u] = s[u]);
              }
              return r;
            }).apply(this, arguments);
        }
        var ed = (function () {
            function r(c) {
              var s = c.hostInfo,
                u = c.remoteInfo,
                l = c.shared,
                h = c.loaderHook,
                m = c.shareScopeMap;
              H(this, r),
                (this.inited = !1),
                (this.shared = {}),
                (this.lib = void 0),
                (this.hostInfo = s),
                (this.remoteInfo = u),
                (this.shared = l),
                (this.loaderHook = h),
                (this.shareScopeMap = m);
            }
            return (
              G(r, [
                {
                  key: 'getEntry',
                  value: function () {
                    var r = this;
                    return F(function () {
                      var c;
                      return Q(this, function (s) {
                        switch (s.label) {
                          case 0:
                            if (r.remoteEntryExports) return [2, r.remoteEntryExports];
                            return [
                              4,
                              el({
                                remoteInfo: r.remoteInfo,
                                remoteEntryExports: r.remoteEntryExports,
                                createScriptHook: function (c) {
                                  var s = r.loaderHook.lifecycle.createScript.emit({ url: c });
                                  if ('undefined' == typeof document || q(s, HTMLScriptElement))
                                    return s;
                                },
                              }),
                            ];
                          case 1:
                            return (
                              (c = s.sent()),
                              ee.assert(
                                c,
                                'remoteEntryExports is undefined \n '.concat(
                                  ee.safeToString(r.remoteInfo),
                                ),
                              ),
                              (r.remoteEntryExports = c),
                              [2, r.remoteEntryExports]
                            );
                        }
                      });
                    })();
                  },
                },
                {
                  key: 'get',
                  value: function (r, c) {
                    var s = this;
                    return F(function () {
                      var u, l, h, m, S, E, O, I, A;
                      return Q(this, function (R) {
                        switch (R.label) {
                          case 0:
                            return (
                              (l = void 0 === (u = (c || { loadFactory: !0 }).loadFactory) || u),
                              s.hostInfo.name,
                              [4, s.getEntry()]
                            );
                          case 1:
                            return (
                              (h = R.sent()),
                              !s.inited &&
                                ((m = s.shareScopeMap),
                                !m[(S = s.remoteInfo.shareScope || 'default')] && (m[S] = {}),
                                (E = m[S]),
                                (O = {
                                  version: s.remoteInfo.version || '',
                                  region: s.hostInfo.region,
                                }),
                                h.init(E, [], O),
                                (I = ee.Global.__FEDERATION__.__INSTANCES__.find(function (r) {
                                  return (
                                    r.options.id ===
                                    et.composeKeyWithSeparator(
                                      s.remoteInfo.name,
                                      s.remoteInfo.buildVersion,
                                    )
                                  );
                                })) &&
                                  (!I.releaseNumber || 100 >= Number(I.releaseNumber)) &&
                                  (I.initOptions(
                                    eh({}, O, { remotes: [], name: s.remoteInfo.name }),
                                  ),
                                  !__FEDERATION__.__SHARE__.default &&
                                    s.shareScopeMap &&
                                    s.shareScopeMap.default &&
                                    (__FEDERATION__.__SHARE__.default = s.shareScopeMap.default))),
                              (s.lib = h),
                              (s.inited = !0),
                              [4, h.get(r)]
                            );
                          case 2:
                            if (
                              ((A = R.sent()),
                              ee.assert(
                                A,
                                ''
                                  .concat(ee.getFMId(s.remoteInfo), " remote don't export ")
                                  .concat(r, '.'),
                              ),
                              !l)
                            )
                              return [2, A];
                            return [4, A()];
                          case 3:
                            return [2, R.sent()];
                        }
                      });
                    })();
                  },
                },
              ]),
              r
            );
          })(),
          em = (function () {
            function r(c) {
              H(this, r), (this.type = ''), (this.listeners = new Set()), c && (this.type = c);
            }
            return (
              G(r, [
                {
                  key: 'on',
                  value: function (r) {
                    'function' == typeof r && this.listeners.add(r);
                  },
                },
                {
                  key: 'once',
                  value: function (r) {
                    var c = this;
                    this.on(function s() {
                      for (var u = arguments.length, l = Array(u), h = 0; h < u; h++)
                        l[h] = arguments[h];
                      return c.remove(s), r.apply(null, l);
                    });
                  },
                },
                {
                  key: 'emit',
                  value: function () {
                    for (var r, c = arguments.length, s = Array(c), u = 0; u < c; u++)
                      s[u] = arguments[u];
                    return (
                      this.listeners.size > 0 &&
                        this.listeners.forEach(function (c) {
                          r = c.apply(void 0, K(s));
                        }),
                      r
                    );
                  },
                },
                {
                  key: 'remove',
                  value: function (r) {
                    this.listeners.delete(r);
                  },
                },
                {
                  key: 'removeAll',
                  value: function () {
                    this.listeners.clear();
                  },
                },
              ]),
              r
            );
          })(),
          ey = (function (r) {
            B(s, r);
            var c = Z(s);
            function s() {
              return H(this, s), c.apply(this, arguments);
            }
            return (
              G(s, [
                {
                  key: 'emit',
                  value: function () {
                    for (var r, c = arguments.length, s = Array(c), u = 0; u < c; u++)
                      s[u] = arguments[u];
                    var l = Array.from(this.listeners);
                    if (l.length > 0) {
                      var h = 0,
                        m = function (r) {
                          return (
                            !1 !== r &&
                            (h < l.length ? Promise.resolve(l[h++].apply(null, s)).then(m) : r)
                          );
                        };
                      r = m();
                    }
                    return Promise.resolve(r);
                  },
                },
              ]),
              s
            );
          })(em);
        function ev(r, c) {
          if (!ee.isObject(c)) return !1;
          if (r !== c) {
            for (var s in r) if (!(s in c)) return !1;
          }
          return !0;
        }
        var eb = (function (r) {
            B(s, r);
            var c = Z(s);
            function s(r) {
              var u;
              return H(this, s), ((u = c.call(this)).onerror = ee.error), (u.type = r), u;
            }
            return (
              G(s, [
                {
                  key: 'emit',
                  value: function (r) {
                    !ee.isObject(r) &&
                      ee.error(
                        'The data for the "'.concat(this.type, '" hook should be an object.'),
                      );
                    var c = !0,
                      s = !1,
                      u = void 0;
                    try {
                      for (
                        var l, h = this.listeners[Symbol.iterator]();
                        !(c = (l = h.next()).done);
                        c = !0
                      ) {
                        var m = l.value;
                        try {
                          var S = m(r);
                          if (ev(r, S)) r = S;
                          else {
                            this.onerror(
                              'A plugin returned an unacceptable value for the "'.concat(
                                this.type,
                                '" type.',
                              ),
                            );
                            break;
                          }
                        } catch (r) {
                          ee.warn(r), this.onerror(r);
                        }
                      }
                    } catch (r) {
                      (s = !0), (u = r);
                    } finally {
                      try {
                        !c && null != h.return && h.return();
                      } finally {
                        if (s) throw u;
                      }
                    }
                    return r;
                  },
                },
              ]),
              s
            );
          })(em),
          eg = (function (r) {
            B(s, r);
            var c = Z(s);
            function s(r) {
              var u;
              return H(this, s), ((u = c.call(this)).onerror = ee.error), (u.type = r), u;
            }
            return (
              G(s, [
                {
                  key: 'emit',
                  value: function (r) {
                    var c = this;
                    !ee.isObject(r) &&
                      ee.error(
                        'The response data for the "'.concat(
                          this.type,
                          '" hook must be an object.',
                        ),
                      );
                    var s = Array.from(this.listeners);
                    if (s.length > 0) {
                      var u = 0,
                        l = function (s) {
                          return ee.warn(s), c.onerror(s), r;
                        },
                        h = function (m) {
                          if (ev(r, m)) {
                            if (((r = m), u < s.length))
                              try {
                                return Promise.resolve(s[u++](r)).then(h, l);
                              } catch (r) {
                                return l(r);
                              }
                          } else
                            c.onerror(
                              'A plugin returned an incorrect value for the "'.concat(
                                c.type,
                                '" type.',
                              ),
                            );
                          return r;
                        };
                      return Promise.resolve(h(r));
                    }
                    return Promise.resolve(r);
                  },
                },
              ]),
              s
            );
          })(em),
          e_ = (function () {
            function r(c) {
              H(this, r),
                (this.registerPlugins = {}),
                (this.lifecycle = c),
                (this.lifecycleKeys = Object.keys(c));
            }
            return (
              G(r, [
                {
                  key: 'usePlugin',
                  value: function (r) {
                    var c = this;
                    ee.assert(ee.isPlainObject(r), 'Plugin configuration is invalid.');
                    var s = r.name;
                    ee.assert(s, 'A name must be provided by the plugin.'),
                      !this.registerPlugins[s] &&
                        ((this.registerPlugins[s] = r),
                        Object.keys(this.lifecycle).forEach(function (s) {
                          var u = r[s];
                          u && c.lifecycle[s].on(u);
                        }));
                  },
                },
                {
                  key: 'removePlugin',
                  value: function (r) {
                    var c = this;
                    ee.assert(r, 'A name is required.');
                    var s = this.registerPlugins[r];
                    ee.assert(s, 'The plugin "'.concat(r, '" is not registered.')),
                      Object.keys(s).forEach(function (r) {
                        'name' !== r && c.lifecycle[r].remove(s[r]);
                      });
                  },
                },
                {
                  key: 'inherit',
                  value: function (r) {
                    var c = r.lifecycle,
                      s = r.registerPlugins,
                      u = this;
                    Object.keys(c).forEach(function (r) {
                      ee.assert(
                        !u.lifecycle[r],
                        'The hook "'.concat(r, '" has a conflict and cannot be inherited.'),
                      ),
                        (u.lifecycle[r] = c[r]);
                    }),
                      Object.keys(s).forEach(function (r) {
                        ee.assert(
                          !u.registerPlugins[r],
                          'The plugin "'.concat(r, '" has a conflict and cannot be inherited.'),
                        ),
                          u.usePlugin(s[r]);
                      });
                  },
                },
              ]),
              r
            );
          })();
        function eS() {
          return (eS =
            Object.assign ||
            function (r) {
              for (var c = 1; c < arguments.length; c++) {
                var s = arguments[c];
                for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (r[u] = s[u]);
              }
              return r;
            }).apply(this, arguments);
        }
        function eE(r) {
          return eS(
            { resourceCategory: 'sync', share: !0, depsRemote: !0, prefetchInterface: !1 },
            r,
          );
        }
        function eO(r, c) {
          return c.map(function (c) {
            var s = er(r, c.nameOrAlias);
            return (
              ee.assert(
                s,
                'Unable to preload '
                  .concat(c.nameOrAlias, ' as it is not included in ')
                  .concat(!s && ee.safeToString({ remoteInfo: s, remotes: r })),
              ),
              { remote: s, preloadConfig: eE(c) }
            );
          });
        }
        function eI(r) {
          return r
            ? r.map(function (r) {
                return '.' === r ? r : r.startsWith('./') ? r.replace('./', '') : r;
              })
            : [];
        }
        function eA(r, c, s) {
          var u = s.cssAssets,
            l = s.jsAssetsWithoutEntry,
            h = s.entryAssets;
          if (c.options.inBrowser) {
            h.forEach(function (s) {
              var u = s.moduleInfo,
                l = c.moduleCache.get(r.name);
              l
                ? el({
                    remoteInfo: u,
                    remoteEntryExports: l.remoteEntryExports,
                    createScriptHook: function (r) {
                      var s = c.loaderHook.lifecycle.createScript.emit({ url: r });
                      if (q(s, HTMLScriptElement)) return s;
                    },
                  })
                : el({
                    remoteInfo: u,
                    remoteEntryExports: void 0,
                    createScriptHook: function (r) {
                      var s = c.loaderHook.lifecycle.createScript.emit({ url: r });
                      if (q(s, HTMLScriptElement)) return s;
                    },
                  });
            });
            var m = document.createDocumentFragment();
            u.forEach(function (r) {
              var c = document.createElement('link');
              c.setAttribute('rel', 'preload'),
                c.setAttribute('href', r),
                c.setAttribute('as', 'style'),
                m.appendChild(c);
            }),
              document.head.appendChild(m),
              l.forEach(function (r) {
                var s = et.createScript(
                  r,
                  function () {},
                  {},
                  function (r) {
                    var s = c.loaderHook.lifecycle.createScript.emit({ url: r });
                    if (q(s, HTMLScriptElement)) return s;
                  },
                ).script;
                document.head.appendChild(s);
              });
          }
        }
        function eR() {
          return (eR =
            Object.assign ||
            function (r) {
              for (var c = 1; c < arguments.length; c++) {
                var s = arguments[c];
                for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (r[u] = s[u]);
              }
              return r;
            }).apply(this, arguments);
        }
        function ew(r, c) {
          (!('remoteEntry' in c) || !c.remoteEntry) &&
            ee.error('The attribute remoteEntry of '.concat(name, ' must not be undefined.'));
          var s = c.remoteEntry,
            u = et.getResourceUrl(c, s);
          (r.type = c.remoteEntryType),
            (r.entryGlobalName = c.globalName),
            (r.entry = u),
            (r.version = c.version),
            (r.buildVersion = c.buildVersion);
        }
        function eN() {
          return {
            name: 'snapshot-plugin',
            afterResolve: function (r) {
              return F(function () {
                var c, s, u, l, h, m, S, E, O, I;
                return Q(this, function (A) {
                  switch (A.label) {
                    case 0:
                      if (
                        ((c = r.remote),
                        (s = r.pkgNameOrAlias),
                        (u = r.expose),
                        (l = r.origin),
                        (h = r.remoteInfo),
                        !(!ee.isRemoteInfoWithEntry(c) || !ee.isPureRemoteEntry(c)))
                      )
                        return [3, 3];
                      return [4, l.snapshotHandler.loadRemoteSnapshotInfo(c)];
                    case 1:
                      return (
                        (S = (m = A.sent()).remoteSnapshot),
                        (E = m.globalSnapshot),
                        ew(h, S),
                        (O = {
                          remote: c,
                          preloadConfig: {
                            nameOrAlias: s,
                            exposes: [u],
                            resourceCategory: 'sync',
                            share: !1,
                            depsRemote: !1,
                          },
                        }),
                        [
                          4,
                          l.hooks.lifecycle.generatePreloadAssets.emit({
                            origin: l,
                            preloadOptions: O,
                            remoteInfo: h,
                            remote: c,
                            remoteSnapshot: S,
                            globalSnapshot: E,
                          }),
                        ]
                      );
                    case 2:
                      return (I = A.sent()) && eA(h, l, I), [2, eR({}, r, { remoteSnapshot: S })];
                    case 3:
                      return [2, r];
                  }
                });
              })();
            },
          };
        }
        function eT(r) {
          var c = r.split(':');
          return 1 === c.length
            ? { name: c[0], version: void 0 }
            : 2 === c.length
            ? { name: c[0], version: c[1] }
            : { name: c[1], version: c[2] };
        }
        function eP(r, c, s, u) {
          var l = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            h = arguments.length > 5 ? arguments[5] : void 0,
            m = arguments.length > 6 ? arguments[6] : void 0,
            S = ee.getFMId(c),
            E = ee.getInfoWithoutType(r, S, m).value,
            O = h || E;
          if (O && !et.isManifestProvider(O) && (s(O, c, u), O.remotesInfo)) {
            var I = Object.keys(O.remotesInfo),
              A = !0,
              R = !1,
              w = void 0;
            try {
              for (var N, T = I[Symbol.iterator](); !(A = (N = T.next()).done); A = !0) {
                var P = N.value;
                if (!l[P]) {
                  l[P] = !0;
                  var M = eT(P),
                    j = O.remotesInfo[P];
                  eP(r, { name: M.name, version: j.matchedVersion }, s, !1, l, void 0, m);
                }
              }
            } catch (r) {
              (R = !0), (w = r);
            } finally {
              try {
                !A && null != T.return && T.return();
              } finally {
                if (R) throw w;
              }
            }
          }
        }
        function ek(r, c, s, u, l) {
          var h = [],
            m = [],
            S = [],
            E = new Set(),
            O = new Set(),
            I = r.options,
            A = c.preloadConfig,
            R = A.depsRemote;
          eP(
            u,
            s,
            function (c, s, u) {
              var l = function (r) {
                var s = r.map(function (r) {
                  return et.getResourceUrl(c, r);
                });
                return P.filter ? s.filter(P.filter) : s;
              };
              if (u) P = A;
              else if (Array.isArray(R)) {
                var E = R.find(function (r) {
                  return r.nameOrAlias === s.name || r.nameOrAlias === s.alias || !1;
                });
                if (!E) return;
                P = eE(E);
              } else {
                if (!0 !== R) return;
                P = A;
              }
              var O = et.getResourceUrl(c, 'remoteEntry' in c ? c.remoteEntry : '');
              O &&
                S.push({
                  name: s.name,
                  moduleInfo: {
                    name: s.name,
                    entry: O,
                    type: 'remoteEntryType' in c ? c.remoteEntryType : 'global',
                    entryGlobalName: 'globalName' in c ? c.globalName : s.name,
                    shareScope: '',
                    version: 'version' in c ? c.version : void 0,
                  },
                  url: O,
                });
              var I = 'modules' in c ? c.modules : [],
                w = eI(P.exposes);
              if (
                (w.length &&
                  'modules' in c &&
                  (I =
                    null == c
                      ? void 0
                      : null == (M = c.modules)
                      ? void 0
                      : M.reduce(function (r, c) {
                          return (
                            (null == w ? void 0 : w.indexOf(c.moduleName)) !== -1 && r.push(c), r
                          );
                        }, [])),
                I)
              ) {
                for (var N = I.length, T = 0; T < N; T++) {
                  var P,
                    M,
                    j,
                    D,
                    F,
                    H,
                    L,
                    G,
                    C = I[T],
                    U = ''.concat(s.name, '/').concat(C.moduleName);
                  r.hooks.lifecycle.handlePreloadModule.emit({
                    id: '.' === C.moduleName ? s.name : U,
                    name: s.name,
                    remoteSnapshot: c,
                    preloadConfig: P,
                  }),
                    !ee.getPreloaded(U) &&
                      ('all' === P.resourceCategory
                        ? ((j = h).push.apply(j, K(l(C.assets.css.async))),
                          (D = h).push.apply(D, K(l(C.assets.css.sync))),
                          (F = m).push.apply(F, K(l(C.assets.js.async))),
                          (H = m).push.apply(H, K(l(C.assets.js.sync))))
                        : ((P.resourceCategory = 'sync'),
                          (L = h).push.apply(L, K(l(C.assets.css.sync))),
                          (G = m).push.apply(G, K(l(C.assets.js.sync)))),
                      ee.setPreloaded(U));
                }
              }
            },
            !0,
            {},
            l,
            function (c, s) {
              var u = r.loaderHook.lifecycle.getModuleInfo.emit({ target: c, key: s });
              if (u && !q(u, Promise)) return u;
            },
          ),
            l.shared &&
              l.shared.forEach(function (c) {
                var s,
                  u = null == (s = I.shared) ? void 0 : s[c.sharedName];
                if (u) {
                  var l = ee.getRegisteredShare(
                    r.shareScopeMap,
                    c.sharedName,
                    u,
                    r.hooks.lifecycle.resolveShare,
                  );
                  l &&
                    'function' == typeof l.lib &&
                    (c.assets.js.sync.forEach(function (r) {
                      E.add(r);
                    }),
                    c.assets.css.sync.forEach(function (r) {
                      O.add(r);
                    }));
                }
              });
          var w = m.filter(function (r) {
            return !E.has(r);
          });
          return {
            cssAssets: h.filter(function (r) {
              return !O.has(r);
            }),
            jsAssetsWithoutEntry: w,
            entryAssets: S,
          };
        }
        var eM = function () {
          return {
            name: 'generate-preload-assets-plugin',
            generatePreloadAssets: function (r) {
              return F(function () {
                var c, s, u, l, h, m;
                return Q(this, function (S) {
                  return ((c = r.origin),
                  (s = r.preloadOptions),
                  (u = r.remoteInfo),
                  (l = r.remote),
                  (h = r.globalSnapshot),
                  (m = r.remoteSnapshot),
                  ee.isRemoteInfoWithEntry(l) && ee.isPureRemoteEntry(l))
                    ? [
                        2,
                        {
                          cssAssets: [],
                          jsAssetsWithoutEntry: [],
                          entryAssets: [
                            {
                              name: l.name,
                              url: l.entry,
                              moduleInfo: {
                                name: u.name,
                                entry: l.entry,
                                type: 'global',
                                entryGlobalName: '',
                                shareScope: '',
                              },
                            },
                          ],
                        },
                      ]
                    : (ew(u, m), [2, ek(c, s, u, h, m)]);
                });
              })();
            },
          };
        };
        function ej() {
          return (ej =
            Object.assign ||
            function (r) {
              for (var c = 1; c < arguments.length; c++) {
                var s = arguments[c];
                for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (r[u] = s[u]);
              }
              return r;
            }).apply(this, arguments);
        }
        var eD = (function () {
          function r(c) {
            H(this, r),
              (this.loadingHostSnapshot = null),
              (this.manifestCache = new Map()),
              (this.hooks = new e_({
                beforeLoadRemoteSnapshot: new ey('beforeLoadRemoteSnapshot'),
                loadSnapshot: new eg('loadGlobalSnapshot'),
                loadRemoteSnapshot: new eg('loadRemoteSnapshot'),
              })),
              (this.manifestLoading = ee.Global.__FEDERATION__.__MANIFEST_LOADING__),
              (this.HostInstance = c),
              (this.loaderHook = c.loaderHook);
          }
          return (
            G(r, [
              {
                key: 'loadSnapshot',
                value: function (r) {
                  var c = this;
                  return F(function () {
                    var s, u, l, h, m, S, E;
                    return Q(this, function (O) {
                      switch (O.label) {
                        case 0:
                          return (
                            (s = c.HostInstance.options),
                            (l = (u = c.getGlobalRemoteInfo(r)).hostGlobalSnapshot),
                            (h = u.remoteSnapshot),
                            (m = u.globalSnapshot),
                            [
                              4,
                              c.hooks.lifecycle.loadSnapshot.emit({
                                options: s,
                                moduleInfo: r,
                                hostGlobalSnapshot: l,
                                remoteSnapshot: h,
                                globalSnapshot: m,
                              }),
                            ]
                          );
                        case 1:
                          return (
                            (E = (S = O.sent()).remoteSnapshot),
                            [2, { remoteSnapshot: E, globalSnapshot: S.globalSnapshot }]
                          );
                      }
                    });
                  })();
                },
              },
              {
                key: 'loadRemoteSnapshotInfo',
                value: function (r) {
                  var c = this;
                  return F(function () {
                    var s, u, l, h, m, S, E, O, I, A, R, w, N;
                    return Q(this, function (T) {
                      switch (T.label) {
                        case 0:
                          return (
                            (s = c.HostInstance.options),
                            (u = ee.getGlobalSnapshotInfoByModuleInfo(
                              {
                                name: c.HostInstance.options.name,
                                version: c.HostInstance.options.version,
                              },
                              {
                                getModuleInfoHook: function (r, s) {
                                  var u = c.HostInstance.loaderHook.lifecycle.getModuleInfo.emit({
                                    target: r,
                                    key: s,
                                  });
                                  if (u && !q(u, Promise)) return u;
                                },
                              },
                            )),
                            [
                              4,
                              c.hooks.lifecycle.beforeLoadRemoteSnapshot.emit({
                                options: s,
                                moduleInfo: r,
                              }),
                            ]
                          );
                        case 1:
                          return (
                            T.sent(),
                            u &&
                              'remotesInfo' in u &&
                              !ee.getInfoWithoutType(u.remotesInfo, r.name, function (r, s) {
                                var u = c.HostInstance.loaderHook.lifecycle.getModuleInfo.emit({
                                  target: r,
                                  key: s,
                                });
                                if (u && !q(u, Promise)) return u;
                              }).value &&
                              ('version' in r || 'entry' in r) &&
                              (u.remotesInfo = ej(
                                {},
                                null == u ? void 0 : u.remotesInfo,
                                C({}, r.name, {
                                  matchedVersion: 'version' in r ? r.version : r.entry,
                                }),
                              )),
                            (h = (l = c.getGlobalRemoteInfo(r)).hostGlobalSnapshot),
                            (m = l.remoteSnapshot),
                            (S = l.globalSnapshot),
                            [
                              4,
                              c.hooks.lifecycle.loadSnapshot.emit({
                                options: s,
                                moduleInfo: r,
                                hostGlobalSnapshot: h,
                                remoteSnapshot: m,
                                globalSnapshot: S,
                              }),
                            ]
                          );
                        case 2:
                          if (((O = (E = T.sent()).remoteSnapshot), (I = E.globalSnapshot), !O))
                            return [3, 7];
                          if (!et.isManifestProvider(O)) return [3, 4];
                          return [4, c.getManifestJson(O.remoteEntry, r, {})];
                        case 3:
                          return (
                            (A = T.sent()),
                            (R = ee.setGlobalSnapshotInfoByModuleInfo(ej({}, r), A)),
                            [2, { remoteSnapshot: A, globalSnapshot: R }]
                          );
                        case 4:
                          return [
                            4,
                            c.hooks.lifecycle.loadRemoteSnapshot.emit({
                              options: c.HostInstance.options,
                              moduleInfo: r,
                              remoteSnapshot: O,
                              from: 'global',
                            }),
                          ];
                        case 5:
                          return [
                            2,
                            { remoteSnapshot: T.sent().remoteSnapshot, globalSnapshot: I },
                          ];
                        case 6:
                          return [3, 11];
                        case 7:
                          if (!ee.isRemoteInfoWithEntry(r)) return [3, 10];
                          return [4, c.getManifestJson(r.entry, r, {})];
                        case 8:
                          return (
                            (w = T.sent()),
                            (N = ee.setGlobalSnapshotInfoByModuleInfo(r, w)),
                            [
                              4,
                              c.hooks.lifecycle.loadRemoteSnapshot.emit({
                                options: c.HostInstance.options,
                                moduleInfo: r,
                                remoteSnapshot: w,
                                from: 'global',
                              }),
                            ]
                          );
                        case 9:
                          return [
                            2,
                            { remoteSnapshot: T.sent().remoteSnapshot, globalSnapshot: N },
                          ];
                        case 10:
                          ee.error(
                            "\n          Cannot get remoteSnapshot with the name: '"
                              .concat(r.name, "', version: '")
                              .concat(
                                r.version,
                                "' from __FEDERATION__.moduleInfo. The following reasons may be causing the problem:\n\n          1. The Deploy platform did not deliver the correct data. You can use __FEDERATION__.moduleInfo to check the remoteInfo.\n\n          2. The remote '",
                              )
                              .concat(r.name, "' version '")
                              .concat(
                                r.version,
                                "' is not released.\n\n          The transformed module info: ",
                              )
                              .concat(JSON.stringify(I), '\n        '),
                          ),
                            (T.label = 11);
                        case 11:
                          return [2];
                      }
                    });
                  })();
                },
              },
              {
                key: 'getGlobalRemoteInfo',
                value: function (r) {
                  var c = this,
                    s = ee.getGlobalSnapshotInfoByModuleInfo(
                      {
                        name: this.HostInstance.options.name,
                        version: this.HostInstance.options.version,
                      },
                      {
                        getModuleInfoHook: function (r, s) {
                          var u = c.HostInstance.loaderHook.lifecycle.getModuleInfo.emit({
                            target: r,
                            key: s,
                          });
                          if (u && !q(u, Promise)) return u;
                        },
                      },
                    ),
                    u =
                      s &&
                      'remotesInfo' in s &&
                      s.remotesInfo &&
                      ee.getInfoWithoutType(s.remotesInfo, r.name, function (r, s) {
                        var u = c.HostInstance.loaderHook.lifecycle.getModuleInfo.emit({
                          target: r,
                          key: s,
                        });
                        if (u && !q(u, Promise)) return u;
                      }).value;
                  return u && u.matchedVersion
                    ? {
                        hostGlobalSnapshot: s,
                        globalSnapshot: ee.getGlobalSnapshot(),
                        remoteSnapshot: ee.getGlobalSnapshotInfoByModuleInfo(
                          { name: r.name, version: u.matchedVersion },
                          {
                            getModuleInfoHook: function (r, s) {
                              var u = c.HostInstance.loaderHook.lifecycle.getModuleInfo.emit({
                                target: r,
                                key: s,
                              });
                              if (u && !q(u, Promise)) return u;
                            },
                          },
                        ),
                      }
                    : {
                        hostGlobalSnapshot: void 0,
                        globalSnapshot: ee.getGlobalSnapshot(),
                        remoteSnapshot: ee.getGlobalSnapshotInfoByModuleInfo(
                          { name: r.name, version: 'version' in r ? r.version : void 0 },
                          {
                            getModuleInfoHook: function (r, s) {
                              var u = c.HostInstance.loaderHook.lifecycle.getModuleInfo.emit({
                                target: r,
                                key: s,
                              });
                              if (u && !q(u, Promise)) return u;
                            },
                          },
                        ),
                      };
                },
              },
              {
                key: 'getManifestJson',
                value: function (r, c, s) {
                  var u = this;
                  return F(function () {
                    var s, l;
                    return Q(this, function (h) {
                      return (
                        (s = (function () {
                          var s = F(function () {
                            var s, l, h;
                            return Q(this, function (m) {
                              switch (m.label) {
                                case 0:
                                  if ((s = u.manifestCache.get(r))) return [2, s];
                                  m.label = 1;
                                case 1:
                                  return (
                                    m.trys.push([1, 6, , 7]),
                                    [4, u.loaderHook.lifecycle.fetch.emit(r, {})]
                                  );
                                case 2:
                                  if (!(!(l = m.sent()) || !q(l, Response))) return [3, 4];
                                  return [4, fetch(r, {})];
                                case 3:
                                  (l = m.sent()), (m.label = 4);
                                case 4:
                                  return [4, l.json()];
                                case 5:
                                  return (
                                    (s = m.sent()),
                                    ee.assert(
                                      s.metaData && s.exposes && s.shared,
                                      ''.concat(r, ' is not a federation manifest'),
                                    ),
                                    u.manifestCache.set(r, s),
                                    [2, s]
                                  );
                                case 6:
                                  return (
                                    (h = m.sent()),
                                    ee.error(
                                      'Failed to get manifestJson for '
                                        .concat(c.name, '. The manifest URL is ')
                                        .concat(
                                          r,
                                          '. Please ensure that the manifestUrl is accessible.\n          \n Error message:\n          \n ',
                                        )
                                        .concat(h),
                                    ),
                                    [3, 7]
                                  );
                                case 7:
                                  return [2];
                              }
                            });
                          });
                          return function () {
                            return s.apply(this, arguments);
                          };
                        })()),
                        (l = (function () {
                          var l = F(function () {
                            var l, h;
                            return Q(this, function (m) {
                              switch (m.label) {
                                case 0:
                                  return [4, s()];
                                case 1:
                                  return (
                                    (l = m.sent()),
                                    (h = et.generateSnapshotFromManifest(l, { version: r })),
                                    [
                                      4,
                                      u.hooks.lifecycle.loadRemoteSnapshot.emit({
                                        options: u.HostInstance.options,
                                        moduleInfo: c,
                                        manifestJson: l,
                                        remoteSnapshot: h,
                                        manifestUrl: r,
                                        from: 'manifest',
                                      }),
                                    ]
                                  );
                                case 2:
                                  return [2, m.sent().remoteSnapshot];
                              }
                            });
                          });
                          return function () {
                            return l.apply(this, arguments);
                          };
                        })()),
                        !u.manifestLoading[r] &&
                          (u.manifestLoading[r] = l().then(function (r) {
                            return r;
                          })),
                        [2, u.manifestLoading[r]]
                      );
                    });
                  })();
                },
              },
            ]),
            r
          );
        })();
        function ex() {
          return (ex =
            Object.assign ||
            function (r) {
              for (var c = 1; c < arguments.length; c++) {
                var s = arguments[c];
                for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (r[u] = s[u]);
              }
              return r;
            }).apply(this, arguments);
        }
        function eF(r, c) {
          if (null == r) return {};
          var s,
            u,
            l = {},
            h = Object.keys(r);
          for (u = 0; u < h.length; u++) (s = h[u]), !(c.indexOf(s) >= 0) && (l[s] = r[s]);
          return l;
        }
        var eH = (function () {
            function r(c) {
              H(this, r),
                (this.hooks = new e_({
                  beforeInit: new eb('beforeInit'),
                  init: new em(),
                  beforeRequest: new eg('beforeRequest'),
                  afterResolve: new eg('afterResolve'),
                  onLoad: new ey('onLoad'),
                  handlePreloadModule: new em('handlePreloadModule'),
                  errorLoadRemote: new ey('errorLoadRemote'),
                  beforeLoadShare: new eg('beforeLoadShare'),
                  loadShare: new ey(),
                  resolveShare: new eb('resolveShare'),
                  beforePreloadRemote: new ey(),
                  generatePreloadAssets: new ey('generatePreloadAssets'),
                  afterPreloadRemote: new ey(),
                })),
                (this.releaseNumber = '4'),
                (this.version = '0.0.4'),
                (this.moduleCache = new Map()),
                (this.loaderHook = new e_({
                  getModuleInfo: new em(),
                  createScript: new em(),
                  fetch: new ey('fetch'),
                }));
              var s = {
                id: ee.getBuilderId(),
                name: c.name,
                plugins: [eN(), eM()],
                remotes: [],
                shared: {},
                inBrowser: ee.isBrowserEnv(),
              };
              (this.name = c.name),
                (this.options = s),
                (this.shareScopeMap = {}),
                this._setGlobalShareScopeMap(),
                (this.snapshotHandler = new eD(this)),
                this.registerPlugins(K(s.plugins).concat(K(c.plugins || []))),
                (this.options = this.formatOptions(s, c));
            }
            return (
              G(r, [
                {
                  key: '_setGlobalShareScopeMap',
                  value: function () {
                    var r = ee.getGlobalShareScope(),
                      c = this.options.id || this.options.name;
                    c && !r[c] && (r[c] = this.shareScopeMap);
                  },
                },
                {
                  key: 'initOptions',
                  value: function (r) {
                    this.registerPlugins(r.plugins);
                    var c = this.formatOptions(this.options, r);
                    return (this.options = c), c;
                  },
                },
                {
                  key: 'loadShare',
                  value: function (r, c) {
                    var s = this;
                    return F(function () {
                      var u, l, h, m, S, E, O, I;
                      return Q(this, function (A) {
                        switch (A.label) {
                          case 0:
                            return (
                              (null ==
                              (l = Object.assign(
                                {},
                                null == (u = s.options.shared) ? void 0 : u[r],
                                c,
                              ))
                                ? void 0
                                : l.scope) &&
                                l.scope.forEach(function (r) {
                                  s.initializeSharing(r, l.strategy);
                                }),
                              [
                                4,
                                s.hooks.lifecycle.beforeLoadShare.emit({
                                  pkgName: r,
                                  shareInfo: l,
                                  shared: s.options.shared,
                                  origin: s,
                                }),
                              ]
                            );
                          case 1:
                            if (
                              ((h = A.sent().shareInfo),
                              ee.assert(
                                h,
                                'Cannot find '
                                  .concat(r, ' Share in the ')
                                  .concat(s.options.name, '. Please ensure that the ')
                                  .concat(r, ' Share parameters have been injected'),
                              ),
                              (m = ee.getRegisteredShare(
                                s.shareScopeMap,
                                r,
                                h,
                                s.hooks.lifecycle.resolveShare,
                              )),
                              (S = function (r) {
                                !r.useIn && (r.useIn = []),
                                  ee.addUniqueItem(r.useIn, s.options.name);
                              }),
                              !(m && m.lib))
                            )
                              return [3, 2];
                            return S(m), [2, m.lib];
                          case 2:
                            if (!(m && m.loading && !m.loaded)) return [3, 4];
                            return [4, m.loading];
                          case 3:
                            return (
                              (E = A.sent()), (m.loaded = !0), !m.lib && (m.lib = E), S(m), [2, E]
                            );
                          case 4:
                            if (m)
                              return (
                                (O = (function () {
                                  var c = F(function () {
                                    var c, u;
                                    return Q(this, function (l) {
                                      switch (l.label) {
                                        case 0:
                                          return [4, m.get()];
                                        case 1:
                                          return (
                                            (c = l.sent()),
                                            (h.lib = c),
                                            (h.loaded = !0),
                                            S(h),
                                            (u = ee.getRegisteredShare(
                                              s.shareScopeMap,
                                              r,
                                              h,
                                              s.hooks.lifecycle.resolveShare,
                                            )) && ((u.lib = c), (u.loaded = !0)),
                                            [2, c]
                                          );
                                      }
                                    });
                                  });
                                  return function () {
                                    return c.apply(this, arguments);
                                  };
                                })()()),
                                s.setShared({
                                  pkgName: r,
                                  loaded: !1,
                                  shared: m,
                                  from: s.options.name,
                                  lib: null,
                                  loading: O,
                                }),
                                [2, O]
                              );
                            if (c) return [2, !1];
                            return (
                              (I = (function () {
                                var c = F(function () {
                                  var c, u;
                                  return Q(this, function (l) {
                                    switch (l.label) {
                                      case 0:
                                        return [4, h.get()];
                                      case 1:
                                        return (
                                          (c = l.sent()),
                                          (h.lib = c),
                                          (h.loaded = !0),
                                          S(h),
                                          (u = ee.getRegisteredShare(
                                            s.shareScopeMap,
                                            r,
                                            h,
                                            s.hooks.lifecycle.resolveShare,
                                          )) && ((u.lib = c), (u.loaded = !0)),
                                          [2, c]
                                        );
                                    }
                                  });
                                });
                                return function () {
                                  return c.apply(this, arguments);
                                };
                              })()()),
                              s.setShared({
                                pkgName: r,
                                loaded: !1,
                                shared: h,
                                from: s.options.name,
                                lib: null,
                                loading: I,
                              }),
                              [2, I]
                            );
                          case 5:
                            return [2];
                        }
                      });
                    })();
                  },
                },
                {
                  key: 'loadShareSync',
                  value: function (r) {
                    var c,
                      s = null == (c = this.options.shared) ? void 0 : c[r],
                      u = ee.getRegisteredShare(
                        this.shareScopeMap,
                        r,
                        s,
                        this.hooks.lifecycle.resolveShare,
                      );
                    if (u && 'function' == typeof u.lib)
                      return (
                        ee.addUniqueItem(u.useIn, this.options.name),
                        !u.loaded &&
                          ((u.loaded = !0), u.from === this.options.name && (s.loaded = !0)),
                        u.lib
                      );
                    if (s.lib) return !s.loaded && (s.loaded = !0), s.lib;
                    if (s.get) {
                      var l = s.get();
                      if (q(l, Promise))
                        throw Error(
                          '\n        The loadShareSync function was unable to load '
                            .concat(r, '. The ')
                            .concat(r, ' could not be found in ')
                            .concat(
                              this.options.name,
                              '.\n        Possible reasons for failure: \n\n        1. The ',
                            )
                            .concat(
                              r,
                              " share was registered with the 'get' attribute, but loadShare was not used beforehand.\n\n        2. The ",
                            )
                            .concat(
                              r,
                              " share was not registered with the 'lib' attribute.\n\n      ",
                            ),
                        );
                      return (
                        (s.lib = l),
                        this.setShared({
                          pkgName: r,
                          loaded: !0,
                          from: this.options.name,
                          lib: s.lib,
                          shared: s,
                        }),
                        s.lib
                      );
                    }
                    throw Error(
                      '\n        The loadShareSync function was unable to load '
                        .concat(r, '. The ')
                        .concat(r, ' could not be found in ')
                        .concat(
                          this.options.name,
                          '.\n        Possible reasons for failure: \n\n        1. The ',
                        )
                        .concat(
                          r,
                          " share was registered with the 'get' attribute, but loadShare was not used beforehand.\n\n        2. The ",
                        )
                        .concat(r, " share was not registered with the 'lib' attribute.\n\n      "),
                    );
                  },
                },
                {
                  key: '_getRemoteModuleAndOptions',
                  value: function (r) {
                    var c = this;
                    return F(function () {
                      var s, u, l, h, m, S, E, O;
                      return Q(this, function (I) {
                        switch (I.label) {
                          case 0:
                            return [
                              4,
                              c.hooks.lifecycle.beforeRequest.emit({
                                id: r,
                                options: c.options,
                                origin: c,
                              }),
                            ];
                          case 1:
                            return (
                              (s = I.sent().id),
                              (u = en(c.options.remotes, s)),
                              ee.assert(
                                u,
                                '\n        Unable to locate '
                                  .concat(s, ' in ')
                                  .concat(
                                    c.options.name,
                                    '. Potential reasons for failure include:\n\n        1. ',
                                  )
                                  .concat(s, " was not included in the 'remotes' parameter of ")
                                  .concat(c.options.name || 'the host', '.\n\n        2. ')
                                  .concat(s, " could not be found in the 'remotes' of ")
                                  .concat(
                                    c.options.name,
                                    " with either 'name' or 'alias' attributes.\n        3. ",
                                  )
                                  .concat(s, ' is not online, injected, or loaded.\n        4. ')
                                  .concat(
                                    s,
                                    "  cannot be accessed on the expected.\n        5. The 'beforeRequest' hook was provided but did not return the correct 'remoteInfo' when attempting to load ",
                                  )
                                  .concat(s, '.\n      '),
                              ),
                              (l = ep(u.remote)),
                              [
                                4,
                                c.hooks.lifecycle.afterResolve.emit(
                                  ex({ id: s }, u, {
                                    options: c.options,
                                    origin: c,
                                    remoteInfo: l,
                                  }),
                                ),
                              ]
                            );
                          case 2:
                            return (
                              (m = (h = I.sent()).remote),
                              (S = h.expose),
                              ee.assert(
                                m && S,
                                "The 'beforeRequest' hook was executed, but it failed to return the correct 'remote' and 'expose' values while loading ".concat(
                                  s,
                                  '.',
                                ),
                              ),
                              (E = c.moduleCache.get(m.name)),
                              (O = {
                                hostInfo: {
                                  name: c.options.name,
                                  version: c.options.version || 'custom',
                                },
                                remoteInfo: l,
                                shared: c.options.shared || {},
                                plugins: c.options.plugins,
                                loaderHook: c.loaderHook,
                                shareScopeMap: c.shareScopeMap,
                              }),
                              !E && ((E = new ed(O)), c.moduleCache.set(m.name, E)),
                              [2, { module: E, moduleOptions: O, remoteMatchInfo: h }]
                            );
                        }
                      });
                    })();
                  },
                },
                {
                  key: 'loadRemote',
                  value: function (r, c) {
                    var s = this;
                    return F(function () {
                      var u, l, h, m, S, E, O, I, A, R, w, N;
                      return Q(this, function (T) {
                        switch (T.label) {
                          case 0:
                            return (
                              T.trys.push([0, 4, , 5]),
                              (l = void 0 === (u = (c || { loadFactory: !0 }).loadFactory) || u),
                              [4, s._getRemoteModuleAndOptions(r)]
                            );
                          case 1:
                            return (
                              (m = (h = T.sent()).module),
                              (S = h.moduleOptions),
                              (O = (E = h.remoteMatchInfo).pkgNameOrAlias),
                              (I = E.remote),
                              (A = E.expose),
                              (R = E.id),
                              [4, m.get(A, c)]
                            );
                          case 2:
                            return (
                              (w = T.sent()),
                              [
                                4,
                                s.hooks.lifecycle.onLoad.emit({
                                  id: R,
                                  pkgNameOrAlias: O,
                                  expose: A,
                                  exposeModule: l ? w : void 0,
                                  exposeModuleFactory: l ? void 0 : w,
                                  remote: I,
                                  options: S,
                                  moduleInstance: m,
                                  origin: s,
                                }),
                              ]
                            );
                          case 3:
                            return T.sent(), [2, w];
                          case 4:
                            throw (
                              ((N = T.sent()),
                              s.hooks.lifecycle.errorLoadRemote.emit({ id: r, error: N }),
                              N)
                            );
                          case 5:
                            return [2];
                        }
                      });
                    })();
                  },
                },
                {
                  key: 'preloadRemote',
                  value: function (r) {
                    var c = this;
                    return F(function () {
                      return Q(this, function (s) {
                        switch (s.label) {
                          case 0:
                            return [
                              4,
                              c.hooks.lifecycle.beforePreloadRemote.emit({
                                preloadOptions: r,
                                options: c.options,
                                origin: c,
                              }),
                            ];
                          case 1:
                            return (
                              s.sent(),
                              [
                                4,
                                Promise.all(
                                  eO(c.options.remotes, r).map(
                                    (function () {
                                      var r = F(function (r) {
                                        var s, u, l, h, m, S;
                                        return Q(this, function (E) {
                                          switch (E.label) {
                                            case 0:
                                              return (
                                                (u = ep((s = r.remote))),
                                                [4, c.snapshotHandler.loadRemoteSnapshotInfo(s)]
                                              );
                                            case 1:
                                              return (
                                                (h = (l = E.sent()).globalSnapshot),
                                                (m = l.remoteSnapshot),
                                                [
                                                  4,
                                                  c.hooks.lifecycle.generatePreloadAssets.emit({
                                                    origin: c,
                                                    preloadOptions: r,
                                                    remote: s,
                                                    remoteInfo: u,
                                                    globalSnapshot: h,
                                                    remoteSnapshot: m,
                                                  }),
                                                ]
                                              );
                                            case 2:
                                              if (!(S = E.sent())) return [2];
                                              return eA(u, c, S), [2];
                                          }
                                        });
                                      });
                                      return function (c) {
                                        return r.apply(this, arguments);
                                      };
                                    })(),
                                  ),
                                ),
                              ]
                            );
                          case 2:
                            return s.sent(), [2];
                        }
                      });
                    })();
                  },
                },
                {
                  key: 'initializeSharing',
                  value: function () {
                    var r =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : ee.DEFAULT_SCOPE,
                      c = arguments.length > 1 ? arguments[1] : void 0,
                      s = this,
                      u = this.shareScopeMap,
                      l = this.options.name;
                    !u[r] && (u[r] = {});
                    var h = u[r],
                      m = function (r, c) {
                        var s,
                          u = c.version,
                          m = c.eager;
                        h[r] = h[r] || {};
                        var S = h[r],
                          E = S[u],
                          O = !!(
                            E &&
                            (E.eager || (null == (s = E.shareConfig) ? void 0 : s.eager))
                          );
                        (!E || (!E.loaded && (!m != !O ? m : l > E.from))) && (S[u] = c);
                      },
                      S = [],
                      E = function (c) {
                        return c && c.init && c.init(u[r]);
                      },
                      O = this,
                      I = (function () {
                        var r = F(function (r) {
                          var c, s;
                          return Q(this, function (u) {
                            switch (u.label) {
                              case 0:
                                return [4, O._getRemoteModuleAndOptions(r)];
                              case 1:
                                if (!(c = u.sent().module).getEntry) return [3, 3];
                                return [4, c.getEntry()];
                              case 2:
                                (s = u.sent()), !c.inited && (E(s), (c.inited = !0)), (u.label = 3);
                              case 3:
                                return [2];
                            }
                          });
                        });
                        return function (c) {
                          return r.apply(this, arguments);
                        };
                      })();
                    return (
                      Object.keys(this.options.shared).forEach(function (c) {
                        var u = s.options.shared[c];
                        u.scope.includes(r) && m(c, u);
                      }),
                      'version-first' === c &&
                        this.options.remotes.forEach(function (c) {
                          c.shareScope === r && S.push(I(c.name));
                        }),
                      S
                    );
                  },
                },
                {
                  key: 'initShareScopeMap',
                  value: function (r, c) {
                    this.shareScopeMap[r] = c;
                  },
                },
                {
                  key: 'formatOptions',
                  value: function (r, c) {
                    var s = this,
                      u = ee.formatShareConfigs(c.shared || {}, c.name),
                      l = ex({}, r.shared, u),
                      h = this.hooks.lifecycle.beforeInit.emit({
                        origin: this,
                        userOptions: c,
                        options: r,
                        shareInfo: l,
                      }),
                      m = h.userOptions,
                      S = h.options,
                      E = (m.remotes || []).reduce(function (r, c) {
                        if (
                          !r.find(function (r) {
                            return r.name === c.name;
                          })
                        ) {
                          if (c.alias) {
                            var s = r.find(function (r) {
                              var s;
                              return (
                                c.alias &&
                                (r.name.startsWith(c.alias) ||
                                  (null == (s = r.alias) ? void 0 : s.startsWith(c.alias)))
                              );
                            });
                            ee.assert(
                              !s,
                              'The alias '
                                .concat(c.alias, ' of remote ')
                                .concat(c.name, ' is not allowed to be the prefix of ')
                                .concat(s && s.name, ' name or alias'),
                            );
                          }
                          'entry' in c &&
                            ee.isBrowserEnv() &&
                            (c.entry = new URL(c.entry, window.location.origin).href),
                            !c.shareScope && (c.shareScope = ee.DEFAULT_SCOPE),
                            !c.type && (c.type = ee.DEFAULT_REMOTE_TYPE),
                            r.push(c);
                        }
                        return r;
                      }, S.remotes);
                    Object.keys(u).forEach(function (r) {
                      var l = u[r];
                      !ee.getRegisteredShare(
                        s.shareScopeMap,
                        r,
                        l,
                        s.hooks.lifecycle.resolveShare,
                      ) &&
                        l &&
                        l.lib &&
                        s.setShared({
                          pkgName: r,
                          lib: l.lib,
                          get: l.get,
                          loaded: !0,
                          shared: l,
                          from: c.name,
                        });
                    });
                    var O = K(S.plugins);
                    m.plugins &&
                      m.plugins.forEach(function (r) {
                        !O.includes(r) && O.push(r);
                      });
                    var I = ex({}, r, c, { plugins: O, remotes: E, shared: l });
                    return this.hooks.lifecycle.init.emit({ origin: this, options: I }), I;
                  },
                },
                {
                  key: 'registerPlugins',
                  value: function (r) {
                    eo(r, [this.hooks, this.snapshotHandler.hooks, this.loaderHook]);
                  },
                },
                {
                  key: 'setShared',
                  value: function (r) {
                    var c = r.pkgName,
                      s = r.shared,
                      u = (r.from, r.lib),
                      l = r.loading,
                      h = r.loaded,
                      m = r.get,
                      S = this,
                      E = s.version,
                      O = s.scope,
                      I = void 0 === O ? 'default' : O,
                      A = eF(s, ['version', 'scope']);
                    (Array.isArray(I) ? I : [I]).forEach(function (r) {
                      if (
                        (!S.shareScopeMap[r] && (S.shareScopeMap[r] = {}),
                        !S.shareScopeMap[r][c] && (S.shareScopeMap[r][c] = {}),
                        S.shareScopeMap[r][c][E])
                      ) {
                        ee.warn(
                          'The share \n '.concat(
                            ee.safeToString({
                              scope: r,
                              pkgName: c,
                              version: E,
                              from: S.shareScopeMap[r][c][E].from,
                            }),
                            ' has been registered',
                          ),
                        );
                        return;
                      }
                      (S.shareScopeMap[r][c][E] = ex({ version: E, scope: ['default'] }, A, {
                        lib: u,
                        loaded: h,
                        loading: l,
                      })),
                        m && (S.shareScopeMap[r][c][E].get = m);
                    });
                  },
                },
              ]),
              r
            );
          })(),
          eL = null;
        function eG(r) {
          var c = ee.getGlobalFederationInstance(r.name, r.version);
          return c
            ? (c.initOptions(r), c)
            : ((eL = new (ee.getGlobalFederationConstructor() || eH)(r)),
              ee.setGlobalFederationInstance(eL),
              eL);
        }
        function eC() {
          for (var r = arguments.length, c = Array(r), s = 0; s < r; s++) c[s] = arguments[s];
          return ee.assert(eL, 'Please call init first'), eL.loadRemote.apply(eL, c);
        }
        function eU() {
          for (var r = arguments.length, c = Array(r), s = 0; s < r; s++) c[s] = arguments[s];
          return ee.assert(eL, 'Please call init first'), eL.loadShare.apply(eL, c);
        }
        function eB() {
          for (var r = arguments.length, c = Array(r), s = 0; s < r; s++) c[s] = arguments[s];
          return ee.assert(eL, 'Please call init first'), eL.loadShareSync.apply(eL, c);
        }
        function eW() {
          for (var r = arguments.length, c = Array(r), s = 0; s < r; s++) c[s] = arguments[s];
          return ee.assert(eL, 'Please call init first'), eL.preloadRemote.apply(eL, c);
        }
        ee.setGlobalFederationConstructor(eH),
          (c.registerGlobalPlugins = ee.registerGlobalPlugins),
          Object.defineProperty(c, 'loadScript', {
            enumerable: !0,
            get: function () {
              return et.loadScript;
            },
          }),
          (c.FederationHost = eH),
          (c.init = eG),
          (c.loadRemote = eC),
          (c.loadShare = eU),
          (c.loadShareSync = eB),
          (c.preloadRemote = eW);
      },
      595: function (r, c, s) {
        'use strict';
        function u(r, c) {
          (null == c || c > r.length) && (c = r.length);
          for (var s = 0, u = Array(c); s < c; s++) u[s] = r[s];
          return u;
        }
        function l(r) {
          if (Array.isArray(r)) return r;
        }
        function h(r, c) {
          var s,
            u,
            l =
              null == r
                ? null
                : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
          if (null != l) {
            var h = [],
              m = !0,
              S = !1;
            try {
              for (
                l = l.call(r);
                !(m = (s = l.next()).done) && (h.push(s.value), !c || h.length !== c);
                m = !0
              );
            } catch (r) {
              (S = !0), (u = r);
            } finally {
              try {
                !m && null != l.return && l.return();
              } finally {
                if (S) throw u;
              }
            }
            return h;
          }
        }
        function m() {
          throw TypeError(
            'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function S(r, c) {
          if (r) {
            if ('string' == typeof r) return u(r, c);
            var s = Object.prototype.toString.call(r).slice(8, -1);
            if (
              ('Object' === s && r.constructor && (s = r.constructor.name),
              'Map' === s || 'Set' === s)
            )
              return Array.from(s);
            if ('Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
              return u(r, c);
          }
        }
        function E(r, c) {
          (null == c || c > r.length) && (c = r.length);
          for (var s = 0, u = Array(c); s < c; s++) u[s] = r[s];
          return u;
        }
        function O(r) {
          if (Array.isArray(r)) return r;
        }
        function I(r, c) {
          var s,
            u,
            l =
              null == r
                ? null
                : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
          if (null != l) {
            var h = [],
              m = !0,
              S = !1;
            try {
              for (
                l = l.call(r);
                !(m = (s = l.next()).done) && (h.push(s.value), !c || h.length !== c);
                m = !0
              );
            } catch (r) {
              (S = !0), (u = r);
            } finally {
              try {
                !m && null != l.return && l.return();
              } finally {
                if (S) throw u;
              }
            }
            return h;
          }
        }
        function A() {
          throw TypeError(
            'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function R(r, c) {
          return O(r) || I(r, c) || N(r, c) || A();
        }
        function w(r) {
          return r && 'undefined' != typeof Symbol && r.constructor === Symbol
            ? 'symbol'
            : typeof r;
        }
        function N(r, c) {
          if (r) {
            if ('string' == typeof r) return E(r, c);
            var s = Object.prototype.toString.call(r).slice(8, -1);
            if (
              ('Object' === s && r.constructor && (s = r.constructor.name),
              'Map' === s || 'Set' === s)
            )
              return Array.from(s);
            if ('Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
              return E(r, c);
          }
        }
        function T() {
          return 'undefined' != typeof FEDERATION_BUILD_IDENTIFIER
            ? FEDERATION_BUILD_IDENTIFIER
            : '';
        }
        function P() {
          return false;
        }
        function M() {
          return 'undefined' != typeof window;
        }
        var j,
          D,
          F,
          H,
          L,
          G,
          C,
          U,
          B,
          q,
          W,
          V,
          $ = '[ Federation Runtime ]';
        function Y(r, c) {
          !r && K(c);
        }
        function K(r) {
          throw Error(''.concat($, ': ').concat(r));
        }
        function z(r) {
          console.warn(''.concat($, ': ').concat(r));
        }
        function J(r, c) {
          return (
            -1 ===
              r.findIndex(function (r) {
                return r === c;
              }) && r.push(c),
            r
          );
        }
        function X(r) {
          return 'version' in r && r.version
            ? ''.concat(r.name, ':').concat(r.version)
            : 'entry' in r && r.entry
            ? ''.concat(r.name, ':').concat(r.entry)
            : ''.concat(r.name);
        }
        function Z(r) {
          return void 0 !== r.entry;
        }
        function Q(r) {
          return r.entry.endsWith('.js');
        }
        function ee(r) {
          try {
            return JSON.stringify(r, null, 2);
          } catch (r) {
            return '';
          }
        }
        function et(r) {
          return r && 'object' == typeof r;
        }
        var en = Object.prototype.toString;
        function er(r) {
          return '[object Object]' === en.call(r);
        }
        function eo() {
          return (eo =
            Object.assign ||
            function (r) {
              for (var c = 1; c < arguments.length; c++) {
                var s = arguments[c];
                for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (r[u] = s[u]);
              }
              return r;
            }).apply(this, arguments);
        }
        function ea(r, c) {
          if (null == r) return {};
          var s,
            u,
            l = {},
            h = Object.keys(r);
          for (u = 0; u < h.length; u++) (s = h[u]), !(c.indexOf(s) >= 0) && (l[s] = r[s]);
          return l;
        }
        var ei = Function('return this')();
        !Object.hasOwnProperty.call(globalThis, '__GLOBAL_LOADING_REMOTE_ENTRY__') &&
          Object.defineProperty(globalThis, '__GLOBAL_LOADING_REMOTE_ENTRY__', {
            value: {},
            configurable: !1,
          });
        var ec = globalThis.__GLOBAL_LOADING_REMOTE_ENTRY__;
        ei.__VMOK__
          ? (ei.__FEDERATION__ = ei.__VMOK__)
          : !ei.__FEDERATION__ &&
            ((ei.__FEDERATION__ = {
              __GLOBAL_PLUGIN__: [],
              __INSTANCES__: [],
              moduleInfo: {},
              __SHARE__: {},
              __MANIFEST_LOADING__: {},
              __PRELOADED_MAP__: new Map(),
            }),
            (ei.__VMOK__ = ei.__FEDERATION__)),
          null != (C = (j = ei.__FEDERATION__).__GLOBAL_PLUGIN__) || (j.__GLOBAL_PLUGIN__ = []),
          null != (U = (D = ei.__FEDERATION__).__INSTANCES__) || (D.__INSTANCES__ = []),
          null != (B = (F = ei.__FEDERATION__).moduleInfo) || (F.moduleInfo = {}),
          null != (q = (H = ei.__FEDERATION__).__SHARE__) || (H.__SHARE__ = {}),
          null != (W = (L = ei.__FEDERATION__).__MANIFEST_LOADING__) ||
            (L.__MANIFEST_LOADING__ = {}),
          null != (V = (G = ei.__FEDERATION__).__PRELOADED_MAP__) ||
            (G.__PRELOADED_MAP__ = new Map());
        var es = {
          get __FEDERATION__() {
            return Function('return globalThis')().__FEDERATION__;
          },
        };
        function eu() {
          (ei.__FEDERATION__.__GLOBAL_PLUGIN__ = []),
            (ei.__FEDERATION__.__INSTANCES__ = []),
            (ei.__FEDERATION__.moduleInfo = {}),
            (ei.__FEDERATION__.__SHARE__ = {}),
            (ei.__FEDERATION__.__MANIFEST_LOADING__ = {});
        }
        function el(r, c) {
          var s = T();
          return es.__FEDERATION__.__INSTANCES__.find(function (u) {
            return (
              (!!s && u.options.id === T()) ||
              (u.options.name === r && !c) ||
              (u.options.name === r && !!c && u.options.version === c) ||
              !1
            );
          });
        }
        function ef(r) {
          es.__FEDERATION__.__INSTANCES__.push(r);
        }
        function ep() {
          return es.__FEDERATION__.__DEBUG_CONSTRUCTOR__;
        }
        function eh(r) {
          P() &&
            ((es.__FEDERATION__.__DEBUG_CONSTRUCTOR__ = r),
            (es.__FEDERATION__.__DEBUG_CONSTRUCTOR_VERSION__ = '0.0.4'));
        }
        function ed(r, c, s) {
          var u = { value: r[c], key: c };
          return s && (u = s(r, c) || u), u;
        }
        var em = function () {
            return es.__FEDERATION__.moduleInfo;
          },
          ey = function (r, c, s) {
            var u = ed(c, X(r), s).value;
            if ((u && !u.version && 'version' in r && r.version && (u.version = r.version), u))
              return u;
            if ('version' in r && r.version) {
              var l = r.version,
                h = X(ea(r, ['version'])),
                m = ed(es.__FEDERATION__.moduleInfo, h, s).value;
              if ((null == m ? void 0 : m.version) === l) return m;
            }
          },
          ev = function (r, c) {
            return ey(r, es.__FEDERATION__.moduleInfo, null == c ? void 0 : c.getModuleInfoHook);
          },
          eb = function (r, c) {
            var s = X(r);
            return (es.__FEDERATION__.moduleInfo[s] = c), es.__FEDERATION__.moduleInfo;
          },
          eg = function (r) {
            return (
              (es.__FEDERATION__.moduleInfo = eo({}, es.__FEDERATION__.moduleInfo, r)),
              function () {
                var c = Object.keys(r),
                  s = !0,
                  u = !1,
                  l = void 0;
                try {
                  for (var h, m = c[Symbol.iterator](); !(s = (h = m.next()).done); s = !0) {
                    var S = h.value;
                    delete es.__FEDERATION__.moduleInfo[S];
                  }
                } catch (r) {
                  (u = !0), (l = r);
                } finally {
                  try {
                    !s && null != m.return && m.return();
                  } finally {
                    if (u) throw l;
                  }
                }
              }
            );
          },
          e_ = function (r, c) {
            var s = c || '__FEDERATION_'.concat(r, ':custom__'),
              u = globalThis[s];
            return { remoteEntryKey: s, entryExports: u };
          },
          eS = function (r) {
            var c = es.__FEDERATION__.__GLOBAL_PLUGIN__;
            r.forEach(function (r) {
              -1 ===
              c.findIndex(function (c) {
                return c.name === r.name;
              })
                ? c.push(r)
                : z('The plugin '.concat(r.name, ' has been registered.'));
            });
          },
          eE = function () {
            return es.__FEDERATION__.__GLOBAL_PLUGIN__;
          },
          eO = function (r) {
            return es.__FEDERATION__.__PRELOADED_MAP__.get(r);
          },
          eI = function (r) {
            return es.__FEDERATION__.__PRELOADED_MAP__.set(r, !0);
          },
          eA = 'default',
          eR = 'global',
          ew = '[0-9A-Za-z-]+',
          eN = '(?:\\+('.concat(ew, '(?:\\.').concat(ew, ')*))'),
          eT = '0|[1-9]\\d*',
          eP = '[0-9]+',
          ek = '\\d*[a-zA-Z-][a-zA-Z0-9-]*',
          eM = '(?:'.concat(eP, '|').concat(ek, ')'),
          ej = '(?:-?('.concat(eM, '(?:\\.').concat(eM, ')*))'),
          eD = '(?:'.concat(eT, '|').concat(ek, ')'),
          ex = '(?:-('.concat(eD, '(?:\\.').concat(eD, ')*))'),
          eF = ''.concat(eT, '|x|X|\\*'),
          eH = '[v=\\s]*('
            .concat(eF, ')(?:\\.(')
            .concat(eF, ')(?:\\.(')
            .concat(eF, ')(?:')
            .concat(ex, ')?')
            .concat(eN, '?)?)?'),
          eL = '^\\s*('.concat(eH, ')\\s+-\\s+(').concat(eH, ')\\s*$'),
          eG = '('.concat(eP, ')\\.(').concat(eP, ')\\.(').concat(eP, ')'),
          eC = '[v=\\s]*'.concat(eG).concat(ej, '?').concat(eN, '?'),
          eU = '((?:<|>)?=?)',
          eB = '(\\s*)'.concat(eU, '\\s*(').concat(eC, '|').concat(eH, ')'),
          eW = '(?:~>?)',
          eV = '(\\s*)'.concat(eW, '\\s+'),
          e$ = '(?:\\^)',
          eY = '(\\s*)'.concat(e$, '\\s+'),
          eK = '(<|>)?=?\\s*\\*',
          ez = '^'.concat(e$).concat(eH, '$'),
          eJ = '('.concat(eT, ')\\.(').concat(eT, ')\\.(').concat(eT, ')'),
          eX = 'v?'.concat(eJ).concat(ex, '?').concat(eN, '?'),
          eZ = '^'.concat(eW).concat(eH, '$'),
          eQ = '^'.concat(eU, '\\s*').concat(eH, '$'),
          e0 = '^'.concat(eU, '\\s*(').concat(eX, ')$|^$'),
          e1 = '^\\s*>=\\s*0.0.0\\s*$';
        function e2(r) {
          return new RegExp(r);
        }
        function e4(r) {
          return !r || 'x' === r.toLowerCase() || '*' === r;
        }
        function e3() {
          for (var r = arguments.length, c = Array(r), s = 0; s < r; s++) c[s] = arguments[s];
          return function (r) {
            return c.reduce(function (r, c) {
              return c(r);
            }, r);
          };
        }
        function e5(r) {
          return r.match(e2(e0));
        }
        function e6(r, c, s, u) {
          var l = ''.concat(r, '.').concat(c, '.').concat(s);
          return u ? ''.concat(l, '-').concat(u) : l;
        }
        function e8(r) {
          return r.replace(e2(eL), function (r, c, s, u, l, h, m, S, E, O, I, A) {
            return (
              (c = e4(s)
                ? ''
                : e4(u)
                ? '>='.concat(s, '.0.0')
                : e4(l)
                ? '>='.concat(s, '.').concat(u, '.0')
                : '>='.concat(c)),
              (S = e4(E)
                ? ''
                : e4(O)
                ? '<'.concat(Number(E) + 1, '.0.0-0')
                : e4(I)
                ? '<'.concat(E, '.').concat(Number(O) + 1, '.0-0')
                : A
                ? '<='.concat(E, '.').concat(O, '.').concat(I, '-').concat(A)
                : '<='.concat(S)),
              ''.concat(c, ' ').concat(S).trim()
            );
          });
        }
        function e7(r) {
          return r.replace(e2(eB), '$1$2$3');
        }
        function e9(r) {
          return r.replace(e2(eV), '$1~');
        }
        function te(r) {
          return r.replace(e2(eY), '$1^');
        }
        function tt(r) {
          return r
            .trim()
            .split(/\s+/)
            .map(function (r) {
              return r.replace(e2(ez), function (r, c, s, u, l) {
                if (e4(c)) return '';
                if (e4(s)) return '>='.concat(c, '.0.0 <').concat(Number(c) + 1, '.0.0-0');
                if (e4(u))
                  return '0' === c
                    ? '>='
                        .concat(c, '.')
                        .concat(s, '.0 <')
                        .concat(c, '.')
                        .concat(Number(s) + 1, '.0-0')
                    : '>='
                        .concat(c, '.')
                        .concat(s, '.0 <')
                        .concat(Number(c) + 1, '.0.0-0');
                else {
                  if (l)
                    return '0' !== c
                      ? '>='
                          .concat(c, '.')
                          .concat(s, '.')
                          .concat(u, '-')
                          .concat(l, ' <')
                          .concat(Number(c) + 1, '.0.0-0')
                      : '0' === s
                      ? '>='
                          .concat(c, '.')
                          .concat(s, '.')
                          .concat(u, '-')
                          .concat(l, ' <')
                          .concat(c, '.')
                          .concat(s, '.')
                          .concat(Number(u) + 1, '-0')
                      : '>='
                          .concat(c, '.')
                          .concat(s, '.')
                          .concat(u, '-')
                          .concat(l, ' <')
                          .concat(c, '.')
                          .concat(Number(s) + 1, '.0-0');
                  if ('0' === c)
                    return '0' === s
                      ? '>='
                          .concat(c, '.')
                          .concat(s, '.')
                          .concat(u, ' <')
                          .concat(c, '.')
                          .concat(s, '.')
                          .concat(Number(u) + 1, '-0')
                      : '>='
                          .concat(c, '.')
                          .concat(s, '.')
                          .concat(u, ' <')
                          .concat(c, '.')
                          .concat(Number(s) + 1, '.0-0');
                  return '>='
                    .concat(c, '.')
                    .concat(s, '.')
                    .concat(u, ' <')
                    .concat(Number(c) + 1, '.0.0-0');
                }
              });
            })
            .join(' ');
        }
        function tn(r) {
          return r
            .trim()
            .split(/\s+/)
            .map(function (r) {
              return r.replace(e2(eZ), function (r, c, s, u, l) {
                if (e4(c)) return '';
                if (e4(s)) return '>='.concat(c, '.0.0 <').concat(Number(c) + 1, '.0.0-0');
                if (e4(u))
                  return '>='
                    .concat(c, '.')
                    .concat(s, '.0 <')
                    .concat(c, '.')
                    .concat(Number(s) + 1, '.0-0');
                else if (l)
                  return '>='
                    .concat(c, '.')
                    .concat(s, '.')
                    .concat(u, '-')
                    .concat(l, ' <')
                    .concat(c, '.')
                    .concat(Number(s) + 1, '.0-0');
                return '>='
                  .concat(c, '.')
                  .concat(s, '.')
                  .concat(u, ' <')
                  .concat(c, '.')
                  .concat(Number(s) + 1, '.0-0');
              });
            })
            .join(' ');
        }
        function tr(r) {
          return r
            .split(/\s+/)
            .map(function (r) {
              return r.trim().replace(e2(eQ), function (r, c, s, u, l, h) {
                var m = e4(s),
                  S = m || e4(u),
                  E = S || e4(l);
                if (('=' === c && E && (c = ''), (h = ''), m))
                  return '>' === c || '<' === c ? '<0.0.0-0' : '*';
                if (c && E)
                  return (
                    S && (u = 0),
                    (l = 0),
                    '>' === c
                      ? ((c = '>='),
                        S ? ((s = Number(s) + 1), (u = 0)) : (u = Number(u) + 1),
                        (l = 0))
                      : '<=' === c && ((c = '<'), S ? (s = Number(s) + 1) : (u = Number(u) + 1)),
                    '<' === c && (h = '-0'),
                    ''
                      .concat(c + s, '.')
                      .concat(u, '.')
                      .concat(l)
                      .concat(h)
                  );
                if (S)
                  return '>='
                    .concat(s, '.0.0')
                    .concat(h, ' <')
                    .concat(Number(s) + 1, '.0.0-0');
                else if (E)
                  return '>='
                    .concat(s, '.')
                    .concat(u, '.0')
                    .concat(h, ' <')
                    .concat(s, '.')
                    .concat(Number(u) + 1, '.0-0');
                return r;
              });
            })
            .join(' ');
        }
        function ta(r) {
          return r.trim().replace(e2(eK), '');
        }
        function ti(r) {
          return r.trim().replace(e2(e1), '');
        }
        function tc(r, c) {
          return ((r = Number(r) || r), r > (c = Number(c) || c)) ? 1 : r === c ? 0 : -1;
        }
        function ts(r, c) {
          var s = r.preRelease,
            u = c.preRelease;
          if (void 0 === s && u) return 1;
          if (s && void 0 === u) return -1;
          if (void 0 === s && void 0 === u) return 0;
          for (var l = 0, h = s.length; l <= h; l++) {
            var m = s[l],
              S = u[l];
            if (m !== S) {
              if (void 0 === m && void 0 === S) return 0;
              if (!m) return 1;
              if (!S) return -1;
              return tc(m, S);
            }
          }
          return 0;
        }
        function tu(r, c) {
          return tc(r.major, c.major) || tc(r.minor, c.minor) || tc(r.patch, c.patch) || ts(r, c);
        }
        function tl(r, c) {
          return r.version === c.version;
        }
        function tf(r, c) {
          switch (r.operator) {
            case '':
            case '=':
              return tl(r, c);
            case '>':
              return 0 > tu(r, c);
            case '>=':
              return tl(r, c) || 0 > tu(r, c);
            case '<':
              return tu(r, c) > 0;
            case '<=':
              return tl(r, c) || tu(r, c) > 0;
            case void 0:
              return !0;
            default:
              return !1;
          }
        }
        function tp(r) {
          return e3(tt, tn, tr, ta)(r);
        }
        function th(r) {
          return e3(e8, e7, e9, te)(r.trim()).split(/\s+/).join(' ');
        }
        function td(r, c) {
          if (!r) return !1;
          var s = th(c)
              .split(' ')
              .map(function (r) {
                return tp(r);
              })
              .join(' ')
              .split(/\s+/)
              .map(function (r) {
                return ti(r);
              }),
            u = e5(r);
          if (!u) return !1;
          var l = R(u, 7),
            h = l[1],
            m = l[3],
            S = l[4],
            E = l[5],
            O = l[6],
            I = {
              operator: h,
              version: e6(m, S, E, O),
              major: m,
              minor: S,
              patch: E,
              preRelease: null == O ? void 0 : O.split('.'),
            },
            A = !0,
            w = !1,
            N = void 0;
          try {
            for (var T, P = s[Symbol.iterator](); !(A = (T = P.next()).done); A = !0) {
              var M = T.value,
                j = e5(M);
              if (!j) return !1;
              var D = R(j, 7),
                F = D[1],
                H = D[3],
                L = D[4],
                G = D[5],
                C = D[6],
                U = {
                  operator: F,
                  version: e6(H, L, G, C),
                  major: H,
                  minor: L,
                  patch: G,
                  preRelease: null == C ? void 0 : C.split('.'),
                };
              if (!tf(U, I)) return !1;
            }
          } catch (r) {
            (w = !0), (N = r);
          } finally {
            try {
              !A && null != P.return && P.return();
            } finally {
              if (w) throw N;
            }
          }
          return !0;
        }
        function tm() {
          return (tm =
            Object.assign ||
            function (r) {
              for (var c = 1; c < arguments.length; c++) {
                var s = arguments[c];
                for (var u in s) Object.prototype.hasOwnProperty.call(s, u) && (r[u] = s[u]);
              }
              return r;
            }).apply(this, arguments);
        }
        function ty(r, c) {
          var s;
          return (
            (s =
              'get' in r
                ? r.get
                : function () {
                    return Promise.resolve(r.lib);
                  }),
            tm({ deps: [], useIn: [], from: c, loading: null }, r, {
              shareConfig: tm(
                {
                  requiredVersion: '^'.concat(r.version),
                  singleton: !1,
                  eager: !1,
                  strictVersion: !1,
                },
                r.shareConfig,
              ),
              get: s,
              loaded: 'lib' in r || void 0,
              scope: Array.isArray(r.scope) ? r.scope : ['default'],
              strategy: r.strategy || 'version-first',
            })
          );
        }
        function tv(r, c) {
          return r
            ? Object.keys(r).reduce(function (s, u) {
                return (s[u] = ty(r[u], c)), s;
              }, {})
            : {};
        }
        function tb(r, c) {
          var s = function (r) {
            if (!Number.isNaN(Number(r))) {
              for (var c = r.split('.'), s = r, u = 0; u < 3 - c.length; u++) s += '.0';
              return s;
            }
            return r;
          };
          return !!td(s(r), '<='.concat(s(c))) || !1;
        }
        var tg = function (r, c, s, u) {
          var l = r[c][s],
            h =
              u ||
              function (r, c) {
                return tb(r, c);
              };
          return Object.keys(l).reduce(function (r, c) {
            return !r || h(r, c) || '0' === r ? c : r;
          }, 0);
        };
        function t_(r, c, s) {
          var u = r[c][s];
          return tg(r, c, s, function (r, c) {
            return !u[r].loaded && tb(r, c);
          });
        }
        function tS(r, c, s) {
          var u = r[c][s];
          return tg(r, c, s, function (r, c) {
            if (u[c].loaded) return !u[r].loaded || !!tb(r, c);
            return !u[r].loaded && tb(r, c);
          });
        }
        function tE(r) {
          return 'loaded-first' === r ? tS : t_;
        }
        function tO(r, c, s, u) {
          if (r) {
            var l = s.shareConfig,
              h = s.scope,
              m = void 0 === h ? eA : h,
              S = s.strategy,
              E = Array.isArray(m) ? m : [m],
              O = !0,
              I = !1,
              A = void 0;
            try {
              for (
                var N,
                  T = function () {
                    var h = N.value;
                    if (l && r[h] && r[h][c]) {
                      var m = l.requiredVersion,
                        E = tE(S)(r, h, c),
                        O = function () {
                          if (l.singleton) {
                            if ('string' == typeof m && !td(E, m)) {
                              var u = 'Version '
                                .concat(E, ' from ')
                                .concat(E && r[h][c][E].from, ' of shared singleton module ')
                                .concat(c, ' does not satisfy the requirement of ')
                                .concat(s.from, ' which needs ')
                                .concat(m, ')');
                              l.strictVersion ? K(u) : z(u);
                            }
                            return r[h][c][E];
                          }
                          if (!1 === m || '*' === m) return r[h][c][E];
                          var S = !0,
                            O = !1,
                            I = void 0;
                          try {
                            for (
                              var A, w = Object.entries(r[h][c])[Symbol.iterator]();
                              !(S = (A = w.next()).done);
                              S = !0
                            ) {
                              var N = R(A.value, 2),
                                T = N[0],
                                P = N[1];
                              if (td(T, m)) return P;
                            }
                          } catch (r) {
                            (O = !0), (I = r);
                          } finally {
                            try {
                              !S && null != w.return && w.return();
                            } finally {
                              if (O) throw I;
                            }
                          }
                        },
                        I = {
                          shareScopeMap: r,
                          scope: h,
                          pkgName: c,
                          version: E,
                          GlobalFederation: es.__FEDERATION__,
                          resolver: O,
                        };
                      return { v: (u.emit(I) || I).resolver() };
                    }
                  },
                  P = E[Symbol.iterator]();
                !(O = (N = P.next()).done);
                O = !0
              ) {
                var M = T();
                if ('object' === w(M)) return M.v;
              }
            } catch (r) {
              (I = !0), (A = r);
            } finally {
              try {
                !O && null != P.return && P.return();
              } finally {
                if (I) throw A;
              }
            }
          }
        }
        function tI() {
          return es.__FEDERATION__.__SHARE__;
        }
        (c.DEFAULT_REMOTE_TYPE = eR),
          (c.DEFAULT_SCOPE = eA),
          (c.Global = es),
          (c.addGlobalSnapshot = eg),
          (c.addUniqueItem = J),
          (c.assert = Y),
          (c.error = K),
          (c.formatShareConfigs = tv),
          (c.getBuilderId = T),
          (c.getFMId = X),
          (c.getGlobalFederationConstructor = ep),
          (c.getGlobalFederationInstance = el),
          (c.getGlobalHostPlugins = eE),
          (c.getGlobalShareScope = tI),
          (c.getGlobalSnapshot = em),
          (c.getGlobalSnapshotInfoByModuleInfo = ev),
          (c.getInfoWithoutType = ed),
          (c.getPreloaded = eO),
          (c.getRegisteredShare = tO),
          (c.getRemoteEntryExports = e_),
          (c.getTargetSnapshotInfoByModuleInfo = ey),
          (c.globalLoading = ec),
          (c.isBrowserEnv = M),
          (c.isObject = et),
          (c.isPlainObject = er),
          (c.isPureRemoteEntry = Q),
          (c.isRemoteInfoWithEntry = Z),
          (c.nativeGlobal = ei),
          (c.registerGlobalPlugins = eS),
          (c.resetFederationGlobalInfo = eu),
          (c.safeToString = ee),
          (c.setGlobalFederationConstructor = eh),
          (c.setGlobalFederationInstance = ef),
          (c.setGlobalSnapshotInfoByModuleInfo = eb),
          (c.setPreloaded = eI),
          (c.warn = z);
      },
      30: function (__unused_webpack_module, exports, __webpack_require__) {
        'use strict';
        function _instanceof2(r, c) {
          return null != c && 'undefined' != typeof Symbol && c[Symbol.hasInstance]
            ? !!c[Symbol.hasInstance](r)
            : r instanceof c;
        }
        function _instanceof1(r, c) {
          return null != c && 'undefined' != typeof Symbol && c[Symbol.hasInstance]
            ? !!c[Symbol.hasInstance](r)
            : r instanceof c;
        }
        function _define_property$2(r, c, s) {
          return (
            c in r
              ? Object.defineProperty(r, c, {
                  value: s,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (r[c] = s),
            r
          );
        }
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var _obj,
          _obj1,
          FederationModuleManifest = 'federation-manifest.json',
          MANIFEST_EXT = '.json',
          BROWSER_LOG_KEY = 'FEDERATION_DEBUG',
          BROWSER_LOG_VALUE = '1',
          NameTransformSymbol = { AT: '@', HYPHEN: '-', SLASH: '/' },
          NameTransformMap =
            ((_obj = {}),
            _define_property$2(_obj, NameTransformSymbol.AT, 'scope_'),
            _define_property$2(_obj, NameTransformSymbol.HYPHEN, '_'),
            _define_property$2(_obj, NameTransformSymbol.SLASH, '__'),
            _obj),
          EncodedNameTransformMap =
            ((_obj1 = {}),
            _define_property$2(
              _obj1,
              NameTransformMap[NameTransformSymbol.AT],
              NameTransformSymbol.AT,
            ),
            _define_property$2(
              _obj1,
              NameTransformMap[NameTransformSymbol.HYPHEN],
              NameTransformSymbol.HYPHEN,
            ),
            _define_property$2(
              _obj1,
              NameTransformMap[NameTransformSymbol.SLASH],
              NameTransformSymbol.SLASH,
            ),
            _obj1),
          SEPARATOR = ':';
        function isBrowserEnv() {
          return 'undefined' != typeof window;
        }
        function isDebugMode() {
          return 'undefined' != typeof process && process.env && process.env.FEDERATION_DEBUG
            ? !!process.env.FEDERATION_DEBUG
            : 'undefined' != typeof FEDERATION_DEBUG && !!FEDERATION_DEBUG;
        }
        var getProcessEnv = function () {
          return 'undefined' != typeof process && process.env ? process.env : {};
        };
        function _array_like_to_array$2(r, c) {
          (null == c || c > r.length) && (c = r.length);
          for (var s = 0, u = Array(c); s < c; s++) u[s] = r[s];
          return u;
        }
        function _array_without_holes(r) {
          if (Array.isArray(r)) return _array_like_to_array$2(r);
        }
        function _class_call_check(r, c) {
          if (!_instanceof1(r, c)) throw TypeError('Cannot call a class as a function');
        }
        function _defineProperties(r, c) {
          for (var s = 0; s < c.length; s++) {
            var u = c[s];
            (u.enumerable = u.enumerable || !1),
              (u.configurable = !0),
              'value' in u && (u.writable = !0),
              Object.defineProperty(r, u.key, u);
          }
        }
        function _create_class(r, c, s) {
          return c && _defineProperties(r.prototype, c), s && _defineProperties(r, s), r;
        }
        function _define_property$1(r, c, s) {
          return (
            c in r
              ? Object.defineProperty(r, c, {
                  value: s,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (r[c] = s),
            r
          );
        }
        function _iterable_to_array$1(r) {
          if (
            ('undefined' != typeof Symbol && null != r[Symbol.iterator]) ||
            null != r['@@iterator']
          )
            return Array.from(r);
        }
        function _non_iterable_spread() {
          throw TypeError(
            'Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function _to_consumable_array(r) {
          return (
            _array_without_holes(r) ||
            _iterable_to_array$1(r) ||
            _unsupported_iterable_to_array$2(r) ||
            _non_iterable_spread()
          );
        }
        function _unsupported_iterable_to_array$2(r, c) {
          if (r) {
            if ('string' == typeof r) return _array_like_to_array$2(r, c);
            var s = Object.prototype.toString.call(r).slice(8, -1);
            if (
              ('Object' === s && r.constructor && (s = r.constructor.name),
              'Map' === s || 'Set' === s)
            )
              return Array.from(s);
            if ('Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
              return _array_like_to_array$2(r, c);
          }
        }
        function safeToString(r) {
          try {
            return JSON.stringify(r, null, 2);
          } catch (r) {
            return '';
          }
        }
        var DEBUG_LOG = '[ FEDERATION DEBUG ]',
          Logger = (function () {
            function r(c) {
              _class_call_check(this, r),
                _define_property$1(this, 'enable', !1),
                _define_property$1(this, 'identifier', void 0),
                (this.identifier = c || DEBUG_LOG),
                isBrowserEnv() && localStorage.getItem(BROWSER_LOG_KEY) === BROWSER_LOG_VALUE
                  ? (this.enable = !0)
                  : isDebugMode() && (this.enable = !0);
            }
            return (
              _create_class(r, [
                {
                  key: 'info',
                  value: function (r, c) {
                    if (this.enable) {
                      var s = safeToString(c) || '';
                      isBrowserEnv()
                        ? console.info(
                            '%c '.concat(this.identifier, ': ').concat(r, ' ').concat(s),
                            'color:#3300CC',
                          )
                        : console.info(
                            '\x1b[34m%s',
                            ''
                              .concat(this.identifier, ': ')
                              .concat(r, ' ')
                              .concat(s ? '\n'.concat(s) : ''),
                          );
                    }
                  },
                },
                {
                  key: 'logOriginalInfo',
                  value: function () {
                    for (var r, c, s = arguments.length, u = Array(s), l = 0; l < s; l++)
                      u[l] = arguments[l];
                    this.enable &&
                      (isBrowserEnv()
                        ? (console.info(
                            '%c '.concat(this.identifier, ': OriginalInfo'),
                            'color:#3300CC',
                          ),
                          (r = console).log.apply(r, _to_consumable_array(u)))
                        : (console.info(
                            '%c '.concat(this.identifier, ': OriginalInfo'),
                            'color:#3300CC',
                          ),
                          (c = console).log.apply(c, _to_consumable_array(u))));
                  },
                },
              ]),
              r
            );
          })();
        function _array_like_to_array$1(r, c) {
          (null == c || c > r.length) && (c = r.length);
          for (var s = 0, u = Array(c); s < c; s++) u[s] = r[s];
          return u;
        }
        function _array_with_holes$1(r) {
          if (Array.isArray(r)) return r;
        }
        function _iterable_to_array(r) {
          if (
            ('undefined' != typeof Symbol && null != r[Symbol.iterator]) ||
            null != r['@@iterator']
          )
            return Array.from(r);
        }
        function _iterable_to_array_limit$1(r, c) {
          var s,
            u,
            l =
              null == r
                ? null
                : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
          if (null != l) {
            var h = [],
              m = !0,
              S = !1;
            try {
              for (
                l = l.call(r);
                !(m = (s = l.next()).done) && (h.push(s.value), !c || h.length !== c);
                m = !0
              );
            } catch (r) {
              (S = !0), (u = r);
            } finally {
              try {
                !m && null != l.return && l.return();
              } finally {
                if (S) throw u;
              }
            }
            return h;
          }
        }
        function _non_iterable_rest$1() {
          throw TypeError(
            'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function _sliced_to_array$1(r, c) {
          return (
            _array_with_holes$1(r) ||
            _iterable_to_array_limit$1(r, c) ||
            _unsupported_iterable_to_array$1(r, c) ||
            _non_iterable_rest$1()
          );
        }
        function _to_array(r) {
          return (
            _array_with_holes$1(r) ||
            _iterable_to_array(r) ||
            _unsupported_iterable_to_array$1(r) ||
            _non_iterable_rest$1()
          );
        }
        function _unsupported_iterable_to_array$1(r, c) {
          if (r) {
            if ('string' == typeof r) return _array_like_to_array$1(r, c);
            var s = Object.prototype.toString.call(r).slice(8, -1);
            if (
              ('Object' === s && r.constructor && (s = r.constructor.name),
              'Map' === s || 'Set' === s)
            )
              return Array.from(s);
            if ('Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
              return _array_like_to_array$1(r, c);
          }
        }
        var LOG_CATEGORY = '[ Federation Runtime ]',
          parseEntry = function (r, c) {
            var s = r.split(SEPARATOR),
              u = 'development' === getProcessEnv().NODE_ENV && c,
              l = '*',
              h = function (r) {
                return r.startsWith('http') || r.endsWith(MANIFEST_EXT);
              };
            if (s.length >= 2) {
              var m = _to_array(s),
                S = m[0],
                E = m.slice(1),
                O = u || E.join(SEPARATOR);
              return h(O) ? { name: S, entry: O } : { name: S, version: O || l };
            }
            if (1 === s.length) {
              var I = _sliced_to_array$1(s, 1)[0];
              return u && h(u) ? { name: I, entry: u } : { name: I, version: u || l };
            }
            throw 'Invalid entry value: '.concat(r);
          },
          logger = new Logger(),
          composeKeyWithSeparator = function () {
            for (var r = arguments.length, c = Array(r), s = 0; s < r; s++) c[s] = arguments[s];
            return c.length
              ? c.reduce(function (r, c) {
                  return c ? (r ? ''.concat(r).concat(SEPARATOR).concat(c) : c) : r;
                }, '')
              : '';
          },
          encodeName = function (r) {
            var c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
              s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            try {
              var u = s ? '.js' : '';
              return ''
                .concat(c)
                .concat(
                  r
                    .replace(
                      RegExp(''.concat(NameTransformSymbol.AT), 'g'),
                      NameTransformMap[NameTransformSymbol.AT],
                    )
                    .replace(
                      RegExp(''.concat(NameTransformSymbol.HYPHEN), 'g'),
                      NameTransformMap[NameTransformSymbol.HYPHEN],
                    )
                    .replace(
                      RegExp(''.concat(NameTransformSymbol.SLASH), 'g'),
                      NameTransformMap[NameTransformSymbol.SLASH],
                    ),
                )
                .concat(u);
            } catch (r) {
              throw r;
            }
          },
          decodeName = function (r, c, s) {
            try {
              var u = r;
              if (c) {
                if (!u.startsWith(c)) return u;
                u = u.replace(RegExp(c, 'g'), '');
              }
              return (
                (u = u
                  .replace(
                    RegExp(''.concat(NameTransformMap[NameTransformSymbol.AT]), 'g'),
                    EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.AT]],
                  )
                  .replace(
                    RegExp(''.concat(NameTransformMap[NameTransformSymbol.SLASH]), 'g'),
                    EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.SLASH]],
                  )
                  .replace(
                    RegExp(''.concat(NameTransformMap[NameTransformSymbol.HYPHEN]), 'g'),
                    EncodedNameTransformMap[NameTransformMap[NameTransformSymbol.HYPHEN]],
                  )),
                s && (u = u.replace('.js', '')),
                u
              );
            } catch (r) {
              throw r;
            }
          },
          generateExposeFilename = function (r, c) {
            if (!r) return '';
            var s = r;
            return (
              '.' === s && (s = 'default_export'),
              s.startsWith('./') && (s = s.replace('./', '')),
              encodeName(s, '__federation_expose_', c)
            );
          },
          generateShareFilename = function (r, c) {
            return r ? encodeName(r, '__federation_shared_', c) : '';
          },
          getResourceUrl = function (r, c) {
            if ('getPublicPath' in r) {
              var s = Function(r.getPublicPath)();
              return ''.concat(s).concat(c);
            }
            return 'publicPath' in r
              ? ''.concat(r.publicPath).concat(c)
              : (console.warn('Can not get resource url, if in debug mode, please ignore', r, c),
                '');
          },
          assert = function (r, c) {
            !r && error(c);
          },
          error = function (r) {
            throw Error(''.concat(LOG_CATEGORY, ': ').concat(r));
          },
          warn = function (r) {
            console.warn(''.concat(LOG_CATEGORY, ': ').concat(r));
          };
        function _define_property(r, c, s) {
          return (
            c in r
              ? Object.defineProperty(r, c, {
                  value: s,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (r[c] = s),
            r
          );
        }
        function _object_spread(r) {
          for (var c = 1; c < arguments.length; c++) {
            var s = null != arguments[c] ? arguments[c] : {},
              u = Object.keys(s);
            'function' == typeof Object.getOwnPropertySymbols &&
              (u = u.concat(
                Object.getOwnPropertySymbols(s).filter(function (r) {
                  return Object.getOwnPropertyDescriptor(s, r).enumerable;
                }),
              )),
              u.forEach(function (c) {
                _define_property(r, c, s[c]);
              });
          }
          return r;
        }
        function ownKeys(r, c) {
          var s = Object.keys(r);
          if (Object.getOwnPropertySymbols) {
            var u = Object.getOwnPropertySymbols(r);
            c &&
              (u = u.filter(function (c) {
                return Object.getOwnPropertyDescriptor(r, c).enumerable;
              })),
              s.push.apply(s, u);
          }
          return s;
        }
        function _object_spread_props(r, c) {
          return (
            (c = null != c ? c : {}),
            Object.getOwnPropertyDescriptors
              ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(c))
              : ownKeys(Object(c)).forEach(function (s) {
                  Object.defineProperty(r, s, Object.getOwnPropertyDescriptor(c, s));
                }),
            r
          );
        }
        var simpleJoinRemoteEntry = function (r, c) {
          if (!r) return c;
          var s = (function (r) {
            if ('.' === r) return '';
            if (r.startsWith('./')) return r.replace('./', '');
            if (r.startsWith('/')) {
              var c = r.slice(1);
              return c.endsWith('/') ? c.slice(0, -1) : c;
            }
            return r;
          })(r);
          return s ? (s.endsWith('/') ? ''.concat(s).concat(c) : ''.concat(s, '/').concat(c)) : c;
        };
        function generateSnapshotFromManifest(r) {
          var c,
            s,
            u,
            l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            h = l.remotes,
            m = void 0 === h ? {} : h,
            S = l.overrides,
            E = void 0 === S ? {} : S,
            O = l.version,
            I = function () {
              return 'publicPath' in r.metaData ? r.metaData.publicPath : r.metaData.getPublicPath;
            },
            A = Object.keys(E),
            R = {};
          !Object.keys(m).length &&
            (R =
              (null === (u = r.remotes) || void 0 === u
                ? void 0
                : u.reduce(function (r, c) {
                    var s,
                      u = c.federationContainerName;
                    return (
                      (s = A.includes(u) ? E[u] : 'version' in c ? c.version : c.entry),
                      (r[u] = { matchedVersion: s }),
                      r
                    );
                  }, {})) || {}),
            Object.keys(m).forEach(function (r) {
              return (R[r] = { matchedVersion: A.includes(r) ? E[r] : m[r] });
            });
          var w = r.metaData,
            N = w.remoteEntry,
            T = N.path,
            P = N.name,
            M = N.type,
            j = w.types,
            D = w.buildInfo.buildVersion,
            F = w.globalName,
            H = r.exposes,
            L = {
              version: O || '',
              buildVersion: D,
              globalName: F,
              remoteEntry: simpleJoinRemoteEntry(T, P),
              remoteEntryType: M,
              remoteTypes: simpleJoinRemoteEntry(j.path, j.name),
              remotesInfo: R,
              shared:
                null == r
                  ? void 0
                  : r.shared.map(function (r) {
                      return { assets: r.assets, sharedName: r.name };
                    }),
              modules:
                null == H
                  ? void 0
                  : H.map(function (r) {
                      return { moduleName: r.name, modulePath: r.path, assets: r.assets };
                    }),
            };
          if (null === (c = r.metaData) || void 0 === c ? void 0 : c.prefetchEntry) {
            var G = r.metaData.prefetchEntry,
              C = G.path,
              U = G.name,
              B = G.type;
            L = _object_spread_props(_object_spread({}, L), {
              prefetchEntry: simpleJoinRemoteEntry(C, U),
              prefetchEntryType: B,
            });
          }
          return (s =
            'publicPath' in r.metaData
              ? _object_spread_props(_object_spread({}, L), { publicPath: I() })
              : _object_spread_props(_object_spread({}, L), { getPublicPath: I() }));
        }
        function isManifestProvider(r) {
          return !!('remoteEntry' in r && r.remoteEntry.endsWith(MANIFEST_EXT)) || !1;
        }
        function asyncGeneratorStep$1(r, c, s, u, l, h, m) {
          try {
            var S = r[h](m),
              E = S.value;
          } catch (r) {
            s(r);
            return;
          }
          S.done ? c(E) : Promise.resolve(E).then(u, l);
        }
        function _async_to_generator$1(r) {
          return function () {
            var c = this,
              s = arguments;
            return new Promise(function (u, l) {
              var h = r.apply(c, s);
              function m(r) {
                asyncGeneratorStep$1(h, u, l, m, S, 'next', r);
              }
              function S(r) {
                asyncGeneratorStep$1(h, u, l, m, S, 'throw', r);
              }
              m(void 0);
            });
          };
        }
        function _instanceof(r, c) {
          return null != c && 'undefined' != typeof Symbol && c[Symbol.hasInstance]
            ? !!c[Symbol.hasInstance](r)
            : _instanceof1(r, c);
        }
        function _ts_generator$1(r, c) {
          var s,
            u,
            l,
            h,
            m = {
              label: 0,
              sent: function () {
                if (1 & l[0]) throw l[1];
                return l[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (h = { next: S(0), throw: S(1), return: S(2) }),
            'function' == typeof Symbol &&
              (h[Symbol.iterator] = function () {
                return this;
              }),
            h
          );
          function S(r) {
            return function (c) {
              return E([r, c]);
            };
          }
          function E(h) {
            if (s) throw TypeError('Generator is already executing.');
            for (; m; )
              try {
                if (
                  ((s = 1),
                  u &&
                    (l =
                      2 & h[0]
                        ? u.return
                        : h[0]
                        ? u.throw || ((l = u.return) && l.call(u), 0)
                        : u.next) &&
                    !(l = l.call(u, h[1])).done)
                )
                  return l;
                switch (((u = 0), l && (h = [2 & h[0], l.value]), h[0])) {
                  case 0:
                  case 1:
                    l = h;
                    break;
                  case 4:
                    return m.label++, { value: h[1], done: !1 };
                  case 5:
                    m.label++, (u = h[1]), (h = [0]);
                    continue;
                  case 7:
                    (h = m.ops.pop()), m.trys.pop();
                    continue;
                  default:
                    if (
                      !(l = (l = m.trys).length > 0 && l[l.length - 1]) &&
                      (6 === h[0] || 2 === h[0])
                    ) {
                      m = 0;
                      continue;
                    }
                    if (3 === h[0] && (!l || (h[1] > l[0] && h[1] < l[3]))) {
                      m.label = h[1];
                      break;
                    }
                    if (6 === h[0] && m.label < l[1]) {
                      (m.label = l[1]), (l = h);
                      break;
                    }
                    if (l && m.label < l[2]) {
                      (m.label = l[2]), m.ops.push(h);
                      break;
                    }
                    l[2] && m.ops.pop(), m.trys.pop();
                    continue;
                }
                h = c.call(r, m);
              } catch (r) {
                (h = [6, r]), (u = 0);
              } finally {
                s = l = 0;
              }
            if (5 & h[0]) throw h[1];
            return { value: h[0] ? h[1] : void 0, done: !0 };
          }
        }
        function safeWrapper(r, c) {
          return _safeWrapper.apply(this, arguments);
        }
        function _safeWrapper() {
          return (_safeWrapper = _async_to_generator$1(function (r, c) {
            var s;
            return _ts_generator$1(this, function (u) {
              switch (u.label) {
                case 0:
                  return u.trys.push([0, 2, , 3]), [4, r()];
                case 1:
                  return [2, u.sent()];
                case 2:
                  return (s = u.sent()), c || warn(s), [2];
                case 3:
                  return [2];
              }
            });
          })).apply(this, arguments);
        }
        function isStaticResourcesEqual(r, c) {
          var s = /^(https?:)?\/\//i;
          return r.replace(s, '').replace(/\/$/, '') === c.replace(s, '').replace(/\/$/, '');
        }
        function createScript(r, c, s, u) {
          for (
            var l = null, h = !0, m = document.getElementsByTagName('script'), S = 0;
            S < m.length;
            S++
          ) {
            var E = m[S],
              O = E.getAttribute('src');
            if (O && isStaticResourcesEqual(O, r)) {
              (l = E), (h = !1);
              break;
            }
          }
          if (
            !l &&
            (((l = document.createElement('script')).type = 'text/javascript'), (l.src = r), u)
          ) {
            var I = u(r);
            _instanceof(I, HTMLScriptElement) && (l = I);
          }
          s &&
            Object.keys(s).forEach(function (r) {
              l && ('async' === r || 'defer' === r ? (l[r] = s[r]) : l.setAttribute(r, s[r]));
            });
          var A = function (r, s) {
            if (
              l &&
              ((l.onerror = null),
              (l.onload = null),
              safeWrapper(function () {
                (null == l ? void 0 : l.parentNode) && l.parentNode.removeChild(l);
              }),
              r)
            ) {
              var u = r(s);
              return c(), u;
            }
            c();
          };
          return (
            (l.onerror = A.bind(null, l.onerror)),
            (l.onload = A.bind(null, l.onload)),
            { script: l, needAttach: h }
          );
        }
        function loadScript(r, c) {
          var s = c.attrs,
            u = c.createScriptHook;
          return new Promise(function (c, l) {
            var h = createScript(r, c, s, u),
              m = h.script;
            h.needAttach && document.getElementsByTagName('head')[0].appendChild(m);
          });
        }
        function _array_like_to_array(r, c) {
          (null == c || c > r.length) && (c = r.length);
          for (var s = 0, u = Array(c); s < c; s++) u[s] = r[s];
          return u;
        }
        function _array_with_holes(r) {
          if (Array.isArray(r)) return r;
        }
        function asyncGeneratorStep(r, c, s, u, l, h, m) {
          try {
            var S = r[h](m),
              E = S.value;
          } catch (r) {
            s(r);
            return;
          }
          S.done ? c(E) : Promise.resolve(E).then(u, l);
        }
        function _async_to_generator(r) {
          return function () {
            var c = this,
              s = arguments;
            return new Promise(function (u, l) {
              var h = r.apply(c, s);
              function m(r) {
                asyncGeneratorStep(h, u, l, m, S, 'next', r);
              }
              function S(r) {
                asyncGeneratorStep(h, u, l, m, S, 'throw', r);
              }
              m(void 0);
            });
          };
        }
        function _iterable_to_array_limit(r, c) {
          var s,
            u,
            l =
              null == r
                ? null
                : ('undefined' != typeof Symbol && r[Symbol.iterator]) || r['@@iterator'];
          if (null != l) {
            var h = [],
              m = !0,
              S = !1;
            try {
              for (
                l = l.call(r);
                !(m = (s = l.next()).done) && (h.push(s.value), !c || h.length !== c);
                m = !0
              );
            } catch (r) {
              (S = !0), (u = r);
            } finally {
              try {
                !m && null != l.return && l.return();
              } finally {
                if (S) throw u;
              }
            }
            return h;
          }
        }
        function _non_iterable_rest() {
          throw TypeError(
            'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
          );
        }
        function _sliced_to_array(r, c) {
          return (
            _array_with_holes(r) ||
            _iterable_to_array_limit(r, c) ||
            _unsupported_iterable_to_array(r, c) ||
            _non_iterable_rest()
          );
        }
        function _unsupported_iterable_to_array(r, c) {
          if (r) {
            if ('string' == typeof r) return _array_like_to_array(r, c);
            var s = Object.prototype.toString.call(r).slice(8, -1);
            if (
              ('Object' === s && r.constructor && (s = r.constructor.name),
              'Map' === s || 'Set' === s)
            )
              return Array.from(s);
            if ('Arguments' === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))
              return _array_like_to_array(r, c);
          }
        }
        function _ts_generator(r, c) {
          var s,
            u,
            l,
            h,
            m = {
              label: 0,
              sent: function () {
                if (1 & l[0]) throw l[1];
                return l[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (h = { next: S(0), throw: S(1), return: S(2) }),
            'function' == typeof Symbol &&
              (h[Symbol.iterator] = function () {
                return this;
              }),
            h
          );
          function S(r) {
            return function (c) {
              return E([r, c]);
            };
          }
          function E(h) {
            if (s) throw TypeError('Generator is already executing.');
            for (; m; )
              try {
                if (
                  ((s = 1),
                  u &&
                    (l =
                      2 & h[0]
                        ? u.return
                        : h[0]
                        ? u.throw || ((l = u.return) && l.call(u), 0)
                        : u.next) &&
                    !(l = l.call(u, h[1])).done)
                )
                  return l;
                switch (((u = 0), l && (h = [2 & h[0], l.value]), h[0])) {
                  case 0:
                  case 1:
                    l = h;
                    break;
                  case 4:
                    return m.label++, { value: h[1], done: !1 };
                  case 5:
                    m.label++, (u = h[1]), (h = [0]);
                    continue;
                  case 7:
                    (h = m.ops.pop()), m.trys.pop();
                    continue;
                  default:
                    if (
                      !(l = (l = m.trys).length > 0 && l[l.length - 1]) &&
                      (6 === h[0] || 2 === h[0])
                    ) {
                      m = 0;
                      continue;
                    }
                    if (3 === h[0] && (!l || (h[1] > l[0] && h[1] < l[3]))) {
                      m.label = h[1];
                      break;
                    }
                    if (6 === h[0] && m.label < l[1]) {
                      (m.label = l[1]), (l = h);
                      break;
                    }
                    if (l && m.label < l[2]) {
                      (m.label = l[2]), m.ops.push(h);
                      break;
                    }
                    l[2] && m.ops.pop(), m.trys.pop();
                    continue;
                }
                h = c.call(r, m);
              } catch (r) {
                (h = [6, r]), (u = 0);
              } finally {
                s = l = 0;
              }
            if (5 & h[0]) throw h[1];
            return { value: h[0] ? h[1] : void 0, done: !0 };
          }
        }
        function importNodeModule(r) {
          if (!r) throw Error('import specifier is required');
          return Function(
            'name',
            'return import(name)',
          )(r)
            .then(function (r) {
              return r.default;
            })
            .catch(function (c) {
              throw (console.error('Error importing module '.concat(r, ':'), c), c);
            });
        }
        function createScriptNode(url, cb, attrs, createScriptHook) {
          if (createScriptHook) {
            var urlObj,
              hookResult = createScriptHook(url);
            hookResult &&
              'object' == typeof hookResult &&
              'url' in hookResult &&
              (url = hookResult.url);
          }
          try {
            urlObj = new URL(url);
          } catch (e) {
            console.error('Error constructing URL:', e), cb(Error('Invalid URL: '.concat(e)));
            return;
          }
          var getFetch = (function () {
            var r = _async_to_generator(function () {
              var r;
              return _ts_generator(this, function (c) {
                switch (c.label) {
                  case 0:
                    if ('undefined' != typeof fetch) return [3, 2];
                    return [4, importNodeModule('node-fetch')];
                  case 1:
                    return [2, (null == (r = c.sent()) ? void 0 : r.default) || r];
                  case 2:
                    return [2, fetch];
                  case 3:
                    return [2];
                }
              });
            });
            return function () {
              return r.apply(this, arguments);
            };
          })();
          console.log('fetching', urlObj.href),
            getFetch().then(function (f) {
              f(urlObj.href)
                .then(function (r) {
                  return r.text();
                })
                .then(
                  (function () {
                    var _ref = _async_to_generator(function (data1) {
                      var _ref,
                        path,
                        vm,
                        scriptContext,
                        urlDirname,
                        filename,
                        script,
                        exportedInterface,
                        container;
                      return _ts_generator(this, function (_state) {
                        switch (_state.label) {
                          case 0:
                            return [
                              4,
                              Promise.all([importNodeModule('path'), importNodeModule('vm')]),
                            ];
                          case 1:
                            (_ref = _sliced_to_array.apply(void 0, [_state.sent(), 2])),
                              (path = _ref[0]),
                              (vm = _ref[1]),
                              (scriptContext = { exports: {}, module: { exports: {} } }),
                              (urlDirname = urlObj.pathname.split('/').slice(0, -1).join('/')),
                              (filename = path.basename(urlObj.pathname));
                            try {
                              if (
                                ((script = new vm.Script(
                                  '(function(exports, module, require, __dirname, __filename) {'.concat(
                                    data1,
                                    '\n})',
                                  ),
                                  { filename: filename },
                                )),
                                script.runInThisContext()(
                                  scriptContext.exports,
                                  scriptContext.module,
                                  eval('require'),
                                  urlDirname,
                                  filename,
                                ),
                                (exportedInterface =
                                  scriptContext.module.exports || scriptContext.exports),
                                attrs && exportedInterface && attrs.globalName)
                              )
                                return (
                                  (container = exportedInterface[attrs.globalName]),
                                  cb(void 0, container),
                                  [2]
                                );
                              cb(void 0, exportedInterface);
                            } catch (e) {
                              console.error('Error running script:', e),
                                cb(Error('Script execution error: '.concat(e)));
                            }
                            return [2];
                        }
                      });
                    });
                    return function (r) {
                      return _ref.apply(this, arguments);
                    };
                  })(),
                )
                .catch(function (r) {
                  console.error('Error fetching script:', r), cb(r);
                });
            });
        }
        function loadScriptNode(r, c) {
          return new Promise(function (s, u) {
            createScriptNode(
              r,
              function (r, l) {
                if (r) u(r);
                else {
                  var h,
                    m,
                    S =
                      (null == c
                        ? void 0
                        : null === (h = c.attrs) || void 0 === h
                        ? void 0
                        : h.globalName) ||
                      '__FEDERATION_'.concat(
                        null == c
                          ? void 0
                          : null === (m = c.attrs) || void 0 === m
                          ? void 0
                          : m.name,
                        ':custom__',
                      );
                  s((globalThis[S] = l));
                }
              },
              c.attrs,
              c.createScriptHook,
            );
          });
        }
        (exports.BROWSER_LOG_KEY = BROWSER_LOG_KEY),
          (exports.BROWSER_LOG_VALUE = BROWSER_LOG_VALUE),
          (exports.EncodedNameTransformMap = EncodedNameTransformMap),
          (exports.FederationModuleManifest = FederationModuleManifest),
          (exports.Logger = Logger),
          (exports.MANIFEST_EXT = MANIFEST_EXT),
          (exports.NameTransformMap = NameTransformMap),
          (exports.NameTransformSymbol = NameTransformSymbol),
          (exports.SEPARATOR = SEPARATOR),
          (exports.assert = assert),
          (exports.composeKeyWithSeparator = composeKeyWithSeparator),
          (exports.createScript = createScript),
          (exports.createScriptNode = createScriptNode),
          (exports.decodeName = decodeName),
          (exports.encodeName = encodeName),
          (exports.error = error),
          (exports.generateExposeFilename = generateExposeFilename),
          (exports.generateShareFilename = generateShareFilename),
          (exports.generateSnapshotFromManifest = generateSnapshotFromManifest),
          (exports.getProcessEnv = getProcessEnv),
          (exports.getResourceUrl = getResourceUrl),
          (exports.isBrowserEnv = isBrowserEnv),
          (exports.isDebugMode = isDebugMode),
          (exports.isManifestProvider = isManifestProvider),
          (exports.isStaticResourcesEqual = isStaticResourcesEqual),
          (exports.loadScript = loadScript),
          (exports.loadScriptNode = loadScriptNode),
          (exports.logger = logger),
          (exports.parseEntry = parseEntry),
          (exports.safeWrapper = safeWrapper),
          (exports.warn = warn);
      },
      414: function (r, c, s) {
        'use strict';
        Object.defineProperty(c, '__esModule', { value: !0 });
        var u = ['script'],
          l = 'ENCODE_NAME_PREFIX';
        (c.ENCODE_NAME_PREFIX = l), (c.FEDERATION_SUPPORTED_TYPES = u);
      },
      519: function (r, c, s) {
        'use strict';
        var u = s('299'),
          l = s('30'),
          h = s('414');
        function m(r) {
          r.S &&
            !r.federation.hasAttachShareScopeMap &&
            r.federation.instance &&
            r.federation.instance.shareScopeMap &&
            ((r.S = r.federation.instance.shareScopeMap),
            (r.federation.hasAttachShareScopeMap = !0));
        }
        function S(r) {
          var c = r.chunkId,
            s = r.promises,
            u = r.chunkMapping,
            S = r.idToExternalAndNameMapping,
            E = r.webpackRequire,
            O = r.idToRemoteMap;
          m(E),
            E.o(u, c) &&
              u[c].forEach(function (r) {
                var c = E.R;
                !c && (c = []);
                var u = S[r],
                  m = O[r];
                if (!(c.indexOf(u) >= 0)) {
                  if ((c.push(u), u.p)) return s.push(u.p);
                  var I = function (c) {
                      !c && (c = Error('Container missing')),
                        'string' == typeof c.message &&
                          (c.message += '\nwhile loading "'.concat(u[1], '" from ').concat(u[2])),
                        (E.m[r] = function () {
                          throw c;
                        }),
                        (u.p = 0);
                    },
                    A = function (r, c, l, h, m, S) {
                      try {
                        var E = r(c, l);
                        if (!E || !E.then) return m(E, h, S);
                        var O = E.then(function (r) {
                          return m(r, h);
                        }, I);
                        if (!S) return O;
                        s.push((u.p = O));
                      } catch (r) {
                        I(r);
                      }
                    },
                    R = function (r, c, s) {
                      return r ? A(E.I, u[0], 0, r, w, s) : I();
                    },
                    w = function (r, s, l) {
                      return A(s.get, u[1], c, 0, N, l);
                    },
                    N = function (c) {
                      (u.p = 1),
                        (E.m[r] = function (r) {
                          r.exports = c();
                        });
                    },
                    T = function () {
                      try {
                        var r = l.decodeName(m[0].name, h.ENCODE_NAME_PREFIX) + u[1].slice(1);
                        return E.federation.instance.loadRemote(r, { loadFactory: !1 });
                      } catch (r) {
                        I(r);
                      }
                    },
                    P = 1 === m.length && ['script'].includes(m[0].externalType) && m[0].name;
                  P ? A(T, u[2], 0, 0, N, 1) : A(E, u[2], 0, 0, R, 1);
                }
              });
        }
        function E(r) {
          var c = r.chunkId,
            s = r.promises,
            u = r.chunkMapping,
            l = r.installedModules,
            h = r.moduleToHandlerMapping,
            S = r.webpackRequire;
          m(S),
            S.o(u, c) &&
              u[c].forEach(function (r) {
                if (S.o(l, r)) return s.push(l[r]);
                var c = function (c) {
                    (l[r] = 0),
                      (S.m[r] = function (s) {
                        delete S.c[r], (s.exports = c());
                      });
                  },
                  u = function (c) {
                    delete l[r],
                      (S.m[r] = function (s) {
                        throw (delete S.c[r], c);
                      });
                  };
                try {
                  var m = S.federation.instance;
                  if (!m) throw Error('Federation instance not found!');
                  var E = h[r],
                    O = E.shareKey,
                    I = E.getter,
                    A = E.shareInfo,
                    R = m.loadShare(O, A).then(function (r) {
                      return !1 === r ? I() : r;
                    });
                  R.then ? s.push((l[r] = R.then(c).catch(u))) : c(R);
                } catch (r) {
                  u(r);
                }
              });
        }
        function O(r) {
          var c = r.shareScopeName,
            s = r.webpackRequire,
            u = r.initPromises,
            l = r.initTokens,
            S = r.initScope;
          !S && (S = []);
          var E = l[c];
          if ((!E && (E = l[c] = {}), !(S.indexOf(E) >= 0))) {
            S.push(E);
            var O = u[c];
            if (O) return O;
            var I = function (r) {
                return 'undefined' != typeof console && console.warn && console.warn(r);
              },
              A = function (r) {
                var u = function (r) {
                  return I('Initialization of sharing external failed: ' + r);
                };
                try {
                  var l = s(r);
                  if (!l) return;
                  var h = function (r) {
                    return r && r.init && r.init(s.S[c], S);
                  };
                  if (l.then) return R.push(l.then(h, u));
                  var m = h(l);
                  if (m && 'boolean' != typeof m && m.then) return R.push(m.catch(u));
                } catch (r) {
                  u(r);
                }
              },
              R = s.federation.instance.initializeSharing(c);
            m(s);
            var w = s.federation.bundlerRuntimeOptions.remotes;
            return (w &&
              Object.keys(w.idToRemoteMap).forEach(function (r) {
                var c = w.idToRemoteMap[r],
                  s = w.idToExternalAndNameMapping[r][2];
                if (c.length > 1) A(s);
                else if (1 === c.length) {
                  var u = c[0];
                  !h.FEDERATION_SUPPORTED_TYPES.includes(u.externalType) && A(s);
                }
              }),
            R.length)
              ? (u[c] = Promise.all(R).then(function () {
                  return (u[c] = !0);
                }))
              : (u[c] = !0);
          }
        }
        function I(r) {
          var c = r.moduleId,
            s = r.moduleToHandlerMapping,
            u = r.webpackRequire.federation.instance;
          if (!u) throw Error('Federation instance not found!');
          var l = s[c],
            h = l.shareKey;
          if (!l.shareInfo.shareConfig.eager)
            throw Error(
              'Shared: "'.concat(
                h,
                '" cannot be loaded synchronously unless "eager:true" is set or async entry is enabled.',
              ),
            );
          return u.loadShareSync(h);
        }
        function A(r) {
          var c = r.moduleToHandlerMapping,
            s = r.webpackRequire,
            u = r.installedModules;
          r.initialConsumes.forEach(function (r) {
            s.m[r] = function (l) {
              (u[r] = 0), delete s.c[r];
              var h = I({ moduleId: r, moduleToHandlerMapping: c, webpackRequire: s });
              if ('function' != typeof h)
                throw Error('Shared module is not available for eager consumption: '.concat(r));
              l.exports = h();
            };
          });
        }
        function R(r) {
          return (
            ('version' in r && 'object' != typeof r.version) ||
            ('region' in r && 'object' != typeof r.region) ||
            !1
          );
        }
        function w(r) {
          var c = r.webpackRequire,
            s = r.shareScope,
            u = r.initScope,
            l = r.shareScopeKey;
          if (!!c.S) {
            if (c.federation && c.federation.instance && c.federation.initOptions) {
              var h = l || 'default';
              if (
                (c.federation.instance.initOptions({
                  name: c.federation.initOptions.name,
                  remotes: [],
                }),
                R(s))
              ) {
                var m = globalThis.__FEDERATION__.__SHARE__.default;
                m && c.federation.instance.initShareScopeMap(h, m);
              } else c.federation.instance.initShareScopeMap(h, s);
              return (
                (c.S[h] = s),
                c.federation.attachShareScopeMap && c.federation.attachShareScopeMap(c),
                c.I(h, u)
              );
            }
          }
        }
        var N = {
          runtime: (function r(r) {
            if (r && r.__esModule) return r;
            var c = Object.create(null);
            return (
              r &&
                Object.keys(r).forEach(function (s) {
                  if ('default' !== s) {
                    var u = Object.getOwnPropertyDescriptor(r, s);
                    Object.defineProperty(
                      c,
                      s,
                      u.get
                        ? u
                        : {
                            enumerable: !0,
                            get: function () {
                              return r[s];
                            },
                          },
                    );
                  }
                }),
              (c.default = r),
              Object.freeze(c)
            );
          })(u),
          instance: void 0,
          initOptions: void 0,
          bundlerRuntime: {
            remotes: S,
            consumes: E,
            I: O,
            S: {},
            installInitialConsumes: A,
            initContainerEntry: w,
          },
          attachShareScopeMap: m,
          bundlerRuntimeOptions: {},
        };
        r.exports = N;
      },
      871: function (r, c, s) {
        'use strict';
        s.r(c);
        var u,
          l,
          h,
          m,
          S,
          E,
          O,
          I,
          A,
          R,
          w,
          N,
          T = s('271');
        let P = [],
          M = {};
        if (s.initializeSharingData || s.initializeExposesData) {
          let r = (r, c, s) => {
              r && r[c] && (r[c] = s);
            },
            c = (r, c, s) => {
              var u, l;
              let h = s();
              Array.isArray(h)
                ? ((null !== (u = r[c]) && void 0 !== u) || (r[c] = []), r[c].push(...h))
                : 'object' == typeof h &&
                  null !== h &&
                  ((null !== (l = r[c]) && void 0 !== l) || (r[c] = {}), Object.assign(r[c], h));
            },
            j = (r, c, s) => {
              var u;
              (null !== (u = r[c]) && void 0 !== u) || (r[c] = s());
            },
            D =
              null !==
                (l =
                  null === (u = s.remotesLoadingData) || void 0 === u ? void 0 : u.chunkMapping) &&
              void 0 !== l
                ? l
                : {},
            F =
              null !==
                (m =
                  null === (h = s.remotesLoadingData) || void 0 === h
                    ? void 0
                    : h.moduleIdToRemoteDataMapping) && void 0 !== m
                ? m
                : {},
            H =
              null !==
                (E =
                  null === (S = s.initializeSharingData) || void 0 === S
                    ? void 0
                    : S.scopeToSharingDataMapping) && void 0 !== E
                ? E
                : {},
            L =
              null !==
                (I =
                  null === (O = s.consumesLoadingData) || void 0 === O ? void 0 : O.chunkMapping) &&
              void 0 !== I
                ? I
                : {},
            G =
              null !==
                (R =
                  null === (A = s.consumesLoadingData) || void 0 === A
                    ? void 0
                    : A.moduleIdToConsumeDataMapping) && void 0 !== R
                ? R
                : {},
            C = {},
            U = [],
            B = [],
            q =
              null === (w = s.initializeExposesData) || void 0 === w
                ? void 0
                : w.containerShareScope;
          j(s, 'federation', () => T),
            j(s.federation, 'consumesLoadingModuleToHandlerMapping', () => {
              let r = {};
              for (let [c, s] of Object.entries(G))
                r[c] = {
                  getter: s.fallback,
                  shareInfo: {
                    shareConfig: {
                      fixedDependencies: !1,
                      requiredVersion: s.requiredVersion,
                      strictVersion: s.strictVersion,
                      singleton: s.singleton,
                      eager: s.eager,
                    },
                    scope: [s.shareScope],
                  },
                  shareKey: s.shareKey,
                };
              return r;
            }),
            j(s.federation, 'initOptions', () => ({})),
            j(s.federation.initOptions, 'name', () => {
              var r;
              return null === (r = s.initializeSharingData) || void 0 === r ? void 0 : r.uniqueName;
            }),
            j(s.federation.initOptions, 'shared', () => {
              let r = {};
              for (let [c, s] of Object.entries(H))
                for (let u of s)
                  if ('object' == typeof u && null !== u) {
                    let { name: s, version: l, factory: h, eager: m } = u;
                    r[s] ? r[s].scope.push(c) : (r[s] = { version: l, get: h, scope: [c] });
                  }
              return r;
            }),
            c(s.federation.initOptions, 'remotes', () =>
              Object.values(M)
                .flat()
                .filter(r => 'script' === r.externalType),
            ),
            c(s.federation.initOptions, 'plugins', () => P),
            j(s.federation, 'bundlerRuntimeOptions', () => ({})),
            j(s.federation.bundlerRuntimeOptions, 'remotes', () => ({})),
            j(s.federation.bundlerRuntimeOptions.remotes, 'chunkMapping', () => D),
            j(s.federation.bundlerRuntimeOptions.remotes, 'idToExternalAndNameMapping', () => {
              let r = {};
              for (let [c, s] of Object.entries(F))
                r[c] = [s.shareScope, s.name, s.externalModuleId, s.remoteName];
              return r;
            }),
            j(s.federation.bundlerRuntimeOptions.remotes, 'webpackRequire', () => s),
            c(s.federation.bundlerRuntimeOptions.remotes, 'idToRemoteMap', () => {
              let r = {};
              for (let [c, s] of Object.entries(F)) {
                let u = M[s.remoteName];
                u && (r[c] = u);
              }
              return r;
            }),
            r(s, 'S', () => T.bundlerRuntime.S),
            r(s.f, 'remotes', (r, c) =>
              T.bundlerRuntime.remotes({
                chunkId: r,
                promises: c,
                chunkMapping: D,
                idToExternalAndNameMapping:
                  s.federation.bundlerRuntimeOptions.remotes.idToExternalAndNameMapping,
                idToRemoteMap: s.federation.bundlerRuntimeOptions.remotes.idToRemoteMap,
                webpackRequire: s,
              }),
            ),
            r(s.f, 'consumes', (r, c) =>
              T.bundlerRuntime.consumes({
                chunkId: r,
                promises: c,
                chunkMapping: L,
                moduleToHandlerMapping: s.federation.consumesLoadingModuleToHandlerMapping,
                installedModules: C,
                webpackRequire: s,
              }),
            ),
            r(s, 'I', (r, c) =>
              T.bundlerRuntime.I({
                shareScopeName: r,
                initScope: c,
                initPromises: U,
                initTokens: B,
                webpackRequire: s,
              }),
            ),
            r(s, 'initContainer', (r, c) =>
              T.bundlerRuntime.initContainerEntry({
                shareScope: r,
                initScope: c,
                shareScopeKey: q,
                webpackRequire: s,
              }),
            ),
            r(s, 'getContainer', (r, c) => {
              var u = s.initializeExposesData.moduleMap;
              return (
                (s.R = c),
                (c = Object.prototype.hasOwnProperty.call(u, r)
                  ? u[r]()
                  : Promise.resolve().then(() => {
                      throw Error('Module "' + r + '" does not exist in container.');
                    })),
                (s.R = void 0),
                c
              );
            }),
            (s.federation.instance = s.federation.runtime.init(s.federation.initOptions)),
            (null === (N = s.consumesLoadingData) || void 0 === N ? void 0 : N.initialConsumes) &&
              s.federation.bundlerRuntime.installInitialConsumes({
                webpackRequire: s,
                installedModules: C,
                initialConsumes: s.consumesLoadingData.initialConsumes,
                moduleToHandlerMapping: s.federation.consumesLoadingModuleToHandlerMapping,
              });
        }
      },
      325: function (r, c, s) {
        throw Error('Failed to resolve ./src/index.ts in project root');
      },
    },
    __webpack_module_cache__ = {};
  function __webpack_require__(r) {
    var c = __webpack_module_cache__[r];
    if (void 0 !== c) return c.exports;
    var s = (__webpack_module_cache__[r] = { exports: {} });
    return __webpack_modules__[r](s, s.exports, __webpack_require__), s.exports;
  }
  (__webpack_require__.m = __webpack_modules__),
    (__webpack_require__.c = __webpack_module_cache__),
    !(function () {
      __webpack_require__.o = function (r, c) {
        return Object.prototype.hasOwnProperty.call(r, c);
      };
    })(),
    !(function () {
      __webpack_require__.r = function (r) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(r, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(r, '__esModule', { value: !0 });
      };
    })(),
    !(function () {
      (__webpack_require__.S = {}),
        (__webpack_require__.initializeSharingData = {
          scopeToSharingDataMapping: {},
          uniqueName: 'comprehensive-demo-react16_app-04',
        }),
        (__webpack_require__.I = function () {
          throw Error('should have __webpack_require__.I');
        });
    })(),
    __webpack_require__('871');
  var __webpack_exports__ = __webpack_require__('325');
})();
//# sourceMappingURL=main.js.map
