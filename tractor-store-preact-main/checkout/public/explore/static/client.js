(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var o;
  var r;
  var f;
  var e;
  var c;
  var s;
  var a;
  var h = {};
  var p = [];
  var v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var y = Array.isArray;
  function d(n2, l5) {
    for (var u4 in l5) n2[u4] = l5[u4];
    return n2;
  }
  function w(n2) {
    var l5 = n2.parentNode;
    l5 && l5.removeChild(n2);
  }
  function _(l5, u4, t3) {
    var i4, o3, r4, f3 = {};
    for (r4 in u4) "key" == r4 ? i4 = u4[r4] : "ref" == r4 ? o3 = u4[r4] : f3[r4] = u4[r4];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l5 && null != l5.defaultProps) for (r4 in l5.defaultProps) void 0 === f3[r4] && (f3[r4] = l5.defaultProps[r4]);
    return g(l5, f3, i4, o3, null);
  }
  function g(n2, t3, i4, o3, r4) {
    var f3 = { type: n2, props: t3, key: i4, ref: o3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: null == r4 ? ++u : r4, __i: -1, __u: 0 };
    return null == r4 && null != l.vnode && l.vnode(f3), f3;
  }
  function k(n2) {
    return n2.children;
  }
  function b(n2, l5) {
    this.props = n2, this.context = l5;
  }
  function x(n2, l5) {
    if (null == l5) return n2.__ ? x(n2.__, n2.__i + 1) : null;
    for (var u4; l5 < n2.__k.length; l5++) if (null != (u4 = n2.__k[l5]) && null != u4.__e) return u4.__e;
    return "function" == typeof n2.type ? x(n2) : null;
  }
  function C(n2) {
    var l5, u4;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l5 = 0; l5 < n2.__k.length; l5++) if (null != (u4 = n2.__k[l5]) && null != u4.__e) {
        n2.__e = n2.__c.base = u4.__e;
        break;
      }
      return C(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !P.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(P);
  }
  function P() {
    var n2, u4, t3, o3, r4, e3, c5, s5;
    for (i.sort(f); n2 = i.shift(); ) n2.__d && (u4 = i.length, o3 = void 0, e3 = (r4 = (t3 = n2).__v).__e, c5 = [], s5 = [], t3.__P && ((o3 = d({}, r4)).__v = r4.__v + 1, l.vnode && l.vnode(o3), O(t3.__P, o3, r4, t3.__n, t3.__P.namespaceURI, 32 & r4.__u ? [e3] : null, c5, null == e3 ? x(r4) : e3, !!(32 & r4.__u), s5), o3.__v = r4.__v, o3.__.__k[o3.__i] = o3, j(c5, o3, s5), o3.__e != e3 && C(o3)), i.length > u4 && i.sort(f));
    P.__r = 0;
  }
  function S(n2, l5, u4, t3, i4, o3, r4, f3, e3, c5, s5) {
    var a5, v4, y4, d4, w4, _3 = t3 && t3.__k || p, g3 = l5.length;
    for (u4.__d = e3, $(u4, l5, _3), e3 = u4.__d, a5 = 0; a5 < g3; a5++) null != (y4 = u4.__k[a5]) && "boolean" != typeof y4 && "function" != typeof y4 && (v4 = -1 === y4.__i ? h : _3[y4.__i] || h, y4.__i = a5, O(n2, y4, v4, i4, o3, r4, f3, e3, c5, s5), d4 = y4.__e, y4.ref && v4.ref != y4.ref && (v4.ref && N(v4.ref, null, y4), s5.push(y4.ref, y4.__c || d4, y4)), null == w4 && null != d4 && (w4 = d4), 65536 & y4.__u || v4.__k === y4.__k ? (e3 && !e3.isConnected && (e3 = x(v4)), e3 = I(y4, e3, n2)) : "function" == typeof y4.type && void 0 !== y4.__d ? e3 = y4.__d : d4 && (e3 = d4.nextSibling), y4.__d = void 0, y4.__u &= -196609);
    u4.__d = e3, u4.__e = w4;
  }
  function $(n2, l5, u4) {
    var t3, i4, o3, r4, f3, e3 = l5.length, c5 = u4.length, s5 = c5, a5 = 0;
    for (n2.__k = [], t3 = 0; t3 < e3; t3++) r4 = t3 + a5, null != (i4 = n2.__k[t3] = null == (i4 = l5[t3]) || "boolean" == typeof i4 || "function" == typeof i4 ? null : "string" == typeof i4 || "number" == typeof i4 || "bigint" == typeof i4 || i4.constructor == String ? g(null, i4, null, null, null) : y(i4) ? g(k, { children: i4 }, null, null, null) : void 0 === i4.constructor && i4.__b > 0 ? g(i4.type, i4.props, i4.key, i4.ref ? i4.ref : null, i4.__v) : i4) ? (i4.__ = n2, i4.__b = n2.__b + 1, f3 = L(i4, u4, r4, s5), i4.__i = f3, o3 = null, -1 !== f3 && (s5--, (o3 = u4[f3]) && (o3.__u |= 131072)), null == o3 || null === o3.__v ? (-1 == f3 && a5--, "function" != typeof i4.type && (i4.__u |= 65536)) : f3 !== r4 && (f3 === r4 + 1 ? a5++ : f3 > r4 ? s5 > e3 - r4 ? a5 += f3 - r4 : a5-- : f3 < r4 ? f3 == r4 - 1 && (a5 = f3 - r4) : a5 = 0, f3 !== t3 + a5 && (i4.__u |= 65536))) : (o3 = u4[r4]) && null == o3.key && o3.__e && 0 == (131072 & o3.__u) && (o3.__e == n2.__d && (n2.__d = x(o3)), V(o3, o3, false), u4[r4] = null, s5--);
    if (s5) for (t3 = 0; t3 < c5; t3++) null != (o3 = u4[t3]) && 0 == (131072 & o3.__u) && (o3.__e == n2.__d && (n2.__d = x(o3)), V(o3, o3));
  }
  function I(n2, l5, u4) {
    var t3, i4;
    if ("function" == typeof n2.type) {
      for (t3 = n2.__k, i4 = 0; t3 && i4 < t3.length; i4++) t3[i4] && (t3[i4].__ = n2, l5 = I(t3[i4], l5, u4));
      return l5;
    }
    n2.__e != l5 && (u4.insertBefore(n2.__e, l5 || null), l5 = n2.__e);
    do {
      l5 = l5 && l5.nextSibling;
    } while (null != l5 && 8 === l5.nodeType);
    return l5;
  }
  function H(n2, l5) {
    return l5 = l5 || [], null == n2 || "boolean" == typeof n2 || (y(n2) ? n2.some(function(n3) {
      H(n3, l5);
    }) : l5.push(n2)), l5;
  }
  function L(n2, l5, u4, t3) {
    var i4 = n2.key, o3 = n2.type, r4 = u4 - 1, f3 = u4 + 1, e3 = l5[u4];
    if (null === e3 || e3 && i4 == e3.key && o3 === e3.type && 0 == (131072 & e3.__u)) return u4;
    if (t3 > (null != e3 && 0 == (131072 & e3.__u) ? 1 : 0)) for (; r4 >= 0 || f3 < l5.length; ) {
      if (r4 >= 0) {
        if ((e3 = l5[r4]) && 0 == (131072 & e3.__u) && i4 == e3.key && o3 === e3.type) return r4;
        r4--;
      }
      if (f3 < l5.length) {
        if ((e3 = l5[f3]) && 0 == (131072 & e3.__u) && i4 == e3.key && o3 === e3.type) return f3;
        f3++;
      }
    }
    return -1;
  }
  function T(n2, l5, u4) {
    "-" === l5[0] ? n2.setProperty(l5, null == u4 ? "" : u4) : n2[l5] = null == u4 ? "" : "number" != typeof u4 || v.test(l5) ? u4 : u4 + "px";
  }
  function A(n2, l5, u4, t3, i4) {
    var o3;
    n: if ("style" === l5) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l5 in t3) u4 && l5 in u4 || T(n2.style, l5, "");
      if (u4) for (l5 in u4) t3 && u4[l5] === t3[l5] || T(n2.style, l5, u4[l5]);
    }
    else if ("o" === l5[0] && "n" === l5[1]) o3 = l5 !== (l5 = l5.replace(/(PointerCapture)$|Capture$/i, "$1")), l5 = l5.toLowerCase() in n2 || "onFocusOut" === l5 || "onFocusIn" === l5 ? l5.toLowerCase().slice(2) : l5.slice(2), n2.l || (n2.l = {}), n2.l[l5 + o3] = u4, u4 ? t3 ? u4.u = t3.u : (u4.u = e, n2.addEventListener(l5, o3 ? s : c, o3)) : n2.removeEventListener(l5, o3 ? s : c, o3);
    else {
      if ("http://www.w3.org/2000/svg" == i4) l5 = l5.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l5 && "height" != l5 && "href" != l5 && "list" != l5 && "form" != l5 && "tabIndex" != l5 && "download" != l5 && "rowSpan" != l5 && "colSpan" != l5 && "role" != l5 && l5 in n2) try {
        n2[l5] = null == u4 ? "" : u4;
        break n;
      } catch (n3) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" !== l5[4] ? n2.removeAttribute(l5) : n2.setAttribute(l5, u4));
    }
  }
  function F(n2) {
    return function(u4) {
      if (this.l) {
        var t3 = this.l[u4.type + n2];
        if (null == u4.t) u4.t = e++;
        else if (u4.t < t3.u) return;
        return t3(l.event ? l.event(u4) : u4);
      }
    };
  }
  function O(n2, u4, t3, i4, o3, r4, f3, e3, c5, s5) {
    var a5, h4, p5, v4, w4, _3, g3, m3, x3, C3, M3, P3, $3, I3, H2, L2 = u4.type;
    if (void 0 !== u4.constructor) return null;
    128 & t3.__u && (c5 = !!(32 & t3.__u), r4 = [e3 = u4.__e = t3.__e]), (a5 = l.__b) && a5(u4);
    n: if ("function" == typeof L2) try {
      if (m3 = u4.props, x3 = (a5 = L2.contextType) && i4[a5.__c], C3 = a5 ? x3 ? x3.props.value : a5.__ : i4, t3.__c ? g3 = (h4 = u4.__c = t3.__c).__ = h4.__E : ("prototype" in L2 && L2.prototype.render ? u4.__c = h4 = new L2(m3, C3) : (u4.__c = h4 = new b(m3, C3), h4.constructor = L2, h4.render = q), x3 && x3.sub(h4), h4.props = m3, h4.state || (h4.state = {}), h4.context = C3, h4.__n = i4, p5 = h4.__d = true, h4.__h = [], h4._sb = []), null == h4.__s && (h4.__s = h4.state), null != L2.getDerivedStateFromProps && (h4.__s == h4.state && (h4.__s = d({}, h4.__s)), d(h4.__s, L2.getDerivedStateFromProps(m3, h4.__s))), v4 = h4.props, w4 = h4.state, h4.__v = u4, p5) null == L2.getDerivedStateFromProps && null != h4.componentWillMount && h4.componentWillMount(), null != h4.componentDidMount && h4.__h.push(h4.componentDidMount);
      else {
        if (null == L2.getDerivedStateFromProps && m3 !== v4 && null != h4.componentWillReceiveProps && h4.componentWillReceiveProps(m3, C3), !h4.__e && (null != h4.shouldComponentUpdate && false === h4.shouldComponentUpdate(m3, h4.__s, C3) || u4.__v === t3.__v)) {
          for (u4.__v !== t3.__v && (h4.props = m3, h4.state = h4.__s, h4.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.forEach(function(n3) {
            n3 && (n3.__ = u4);
          }), M3 = 0; M3 < h4._sb.length; M3++) h4.__h.push(h4._sb[M3]);
          h4._sb = [], h4.__h.length && f3.push(h4);
          break n;
        }
        null != h4.componentWillUpdate && h4.componentWillUpdate(m3, h4.__s, C3), null != h4.componentDidUpdate && h4.__h.push(function() {
          h4.componentDidUpdate(v4, w4, _3);
        });
      }
      if (h4.context = C3, h4.props = m3, h4.__P = n2, h4.__e = false, P3 = l.__r, $3 = 0, "prototype" in L2 && L2.prototype.render) {
        for (h4.state = h4.__s, h4.__d = false, P3 && P3(u4), a5 = h4.render(h4.props, h4.state, h4.context), I3 = 0; I3 < h4._sb.length; I3++) h4.__h.push(h4._sb[I3]);
        h4._sb = [];
      } else do {
        h4.__d = false, P3 && P3(u4), a5 = h4.render(h4.props, h4.state, h4.context), h4.state = h4.__s;
      } while (h4.__d && ++$3 < 25);
      h4.state = h4.__s, null != h4.getChildContext && (i4 = d(d({}, i4), h4.getChildContext())), p5 || null == h4.getSnapshotBeforeUpdate || (_3 = h4.getSnapshotBeforeUpdate(v4, w4)), S(n2, y(H2 = null != a5 && a5.type === k && null == a5.key ? a5.props.children : a5) ? H2 : [H2], u4, t3, i4, o3, r4, f3, e3, c5, s5), h4.base = u4.__e, u4.__u &= -161, h4.__h.length && f3.push(h4), g3 && (h4.__E = h4.__ = null);
    } catch (n3) {
      u4.__v = null, c5 || null != r4 ? (u4.__e = e3, u4.__u |= c5 ? 160 : 32, r4[r4.indexOf(e3)] = null) : (u4.__e = t3.__e, u4.__k = t3.__k), l.__e(n3, u4, t3);
    }
    else null == r4 && u4.__v === t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : u4.__e = z(t3.__e, u4, t3, i4, o3, r4, f3, c5, s5);
    (a5 = l.diffed) && a5(u4);
  }
  function j(n2, u4, t3) {
    u4.__d = void 0;
    for (var i4 = 0; i4 < t3.length; i4++) N(t3[i4], t3[++i4], t3[++i4]);
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function z(l5, u4, t3, i4, o3, r4, f3, e3, c5) {
    var s5, a5, p5, v4, d4, _3, g3, m3 = t3.props, k4 = u4.props, b3 = u4.type;
    if ("svg" === b3 ? o3 = "http://www.w3.org/2000/svg" : "math" === b3 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != r4) {
      for (s5 = 0; s5 < r4.length; s5++) if ((d4 = r4[s5]) && "setAttribute" in d4 == !!b3 && (b3 ? d4.localName === b3 : 3 === d4.nodeType)) {
        l5 = d4, r4[s5] = null;
        break;
      }
    }
    if (null == l5) {
      if (null === b3) return document.createTextNode(k4);
      l5 = document.createElementNS(o3, b3, k4.is && k4), r4 = null, e3 = false;
    }
    if (null === b3) m3 === k4 || e3 && l5.data === k4 || (l5.data = k4);
    else {
      if (r4 = r4 && n.call(l5.childNodes), m3 = t3.props || h, !e3 && null != r4) for (m3 = {}, s5 = 0; s5 < l5.attributes.length; s5++) m3[(d4 = l5.attributes[s5]).name] = d4.value;
      for (s5 in m3) if (d4 = m3[s5], "children" == s5) ;
      else if ("dangerouslySetInnerHTML" == s5) p5 = d4;
      else if ("key" !== s5 && !(s5 in k4)) {
        if ("value" == s5 && "defaultValue" in k4 || "checked" == s5 && "defaultChecked" in k4) continue;
        A(l5, s5, null, d4, o3);
      }
      for (s5 in k4) d4 = k4[s5], "children" == s5 ? v4 = d4 : "dangerouslySetInnerHTML" == s5 ? a5 = d4 : "value" == s5 ? _3 = d4 : "checked" == s5 ? g3 = d4 : "key" === s5 || e3 && "function" != typeof d4 || m3[s5] === d4 || A(l5, s5, d4, m3[s5], o3);
      if (a5) e3 || p5 && (a5.__html === p5.__html || a5.__html === l5.innerHTML) || (l5.innerHTML = a5.__html), u4.__k = [];
      else if (p5 && (l5.innerHTML = ""), S(l5, y(v4) ? v4 : [v4], u4, t3, i4, "foreignObject" === b3 ? "http://www.w3.org/1999/xhtml" : o3, r4, f3, r4 ? r4[0] : t3.__k && x(t3, 0), e3, c5), null != r4) for (s5 = r4.length; s5--; ) null != r4[s5] && w(r4[s5]);
      e3 || (s5 = "value", void 0 !== _3 && (_3 !== l5[s5] || "progress" === b3 && !_3 || "option" === b3 && _3 !== m3[s5]) && A(l5, s5, _3, m3[s5], o3), s5 = "checked", void 0 !== g3 && g3 !== l5[s5] && A(l5, s5, g3, m3[s5], o3));
    }
    return l5;
  }
  function N(n2, u4, t3) {
    try {
      "function" == typeof n2 ? n2(u4) : n2.current = u4;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function V(n2, u4, t3) {
    var i4, o3;
    if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current !== n2.__e || N(i4, null, u4)), null != (i4 = n2.__c)) {
      if (i4.componentWillUnmount) try {
        i4.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i4.base = i4.__P = null;
    }
    if (i4 = n2.__k) for (o3 = 0; o3 < i4.length; o3++) i4[o3] && V(i4[o3], u4, t3 || "function" != typeof n2.type);
    t3 || null == n2.__e || w(n2.__e), n2.__c = n2.__ = n2.__e = n2.__d = void 0;
  }
  function q(n2, l5, u4) {
    return this.constructor(n2, u4);
  }
  function B(u4, t3, i4) {
    var o3, r4, f3, e3;
    l.__ && l.__(u4, t3), r4 = (o3 = "function" == typeof i4) ? null : i4 && i4.__k || t3.__k, f3 = [], e3 = [], O(t3, u4 = (!o3 && i4 || t3).__k = _(k, null, [u4]), r4 || h, h, t3.namespaceURI, !o3 && i4 ? [i4] : r4 ? null : t3.firstChild ? n.call(t3.childNodes) : null, f3, !o3 && i4 ? i4 : r4 ? r4.__e : t3.firstChild, o3, e3), j(f3, u4, e3);
  }
  function D(n2, l5) {
    B(n2, l5, D);
  }
  function E(l5, u4, t3) {
    var i4, o3, r4, f3, e3 = d({}, l5.props);
    for (r4 in l5.type && l5.type.defaultProps && (f3 = l5.type.defaultProps), u4) "key" == r4 ? i4 = u4[r4] : "ref" == r4 ? o3 = u4[r4] : e3[r4] = void 0 === u4[r4] && void 0 !== f3 ? f3[r4] : u4[r4];
    return arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), g(l5.type, e3, i4 || l5.key, o3 || l5.ref, null);
  }
  function G(n2, l5) {
    var u4 = { __c: l5 = "__cC" + a++, __: n2, Consumer: function(n3, l6) {
      return n3.children(l6);
    }, Provider: function(n3) {
      var u5, t3;
      return this.getChildContext || (u5 = [], (t3 = {})[l5] = this, this.getChildContext = function() {
        return t3;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && u5.some(function(n5) {
          n5.__e = true, M(n5);
        });
      }, this.sub = function(n4) {
        u5.push(n4);
        var l6 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u5.splice(u5.indexOf(n4), 1), l6 && l6.call(n4);
        };
      }), n3.children;
    } };
    return u4.Provider.__ = u4.Consumer.contextType = u4;
  }
  n = p.slice, l = { __e: function(n2, l5, u4, t3) {
    for (var i4, o3, r4; l5 = l5.__; ) if ((i4 = l5.__c) && !i4.__) try {
      if ((o3 = i4.constructor) && null != o3.getDerivedStateFromError && (i4.setState(o3.getDerivedStateFromError(n2)), r4 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, t3 || {}), r4 = i4.__d), r4) return i4.__E = i4;
    } catch (l6) {
      n2 = l6;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && null == n2.constructor;
  }, b.prototype.setState = function(n2, l5) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n2 && (n2 = n2(d({}, u4), this.props)), n2 && d(u4, n2), null != n2 && this.__v && (l5 && this._sb.push(l5), M(this));
  }, b.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, b.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n2, l5) {
    return n2.__v.__b - l5.__v.__b;
  }, P.__r = 0, e = 0, c = F(false), s = F(true), a = 0;

  // node_modules/preact-custom-element/dist/preact-custom-element.esm.js
  function r2() {
    return (r2 = Object.assign ? Object.assign.bind() : function(t3) {
      for (var e3 = 1; e3 < arguments.length; e3++) {
        var n2 = arguments[e3];
        for (var o3 in n2) Object.prototype.hasOwnProperty.call(n2, o3) && (t3[o3] = n2[o3]);
      }
      return t3;
    }).apply(this, arguments);
  }
  var i2 = ["context", "children"];
  function a2(t3) {
    this.getChildContext = function() {
      return t3.context;
    };
    var e3 = t3.children, n2 = function(t4, e4) {
      if (null == t4) return {};
      var n3, o3, r4 = {}, i4 = Object.keys(t4);
      for (o3 = 0; o3 < i4.length; o3++) e4.indexOf(n3 = i4[o3]) >= 0 || (r4[n3] = t4[n3]);
      return r4;
    }(t3, i2);
    return E(e3, n2);
  }
  function s2() {
    var o3 = new CustomEvent("_preact", { detail: {}, bubbles: true, cancelable: true });
    this.dispatchEvent(o3), this._vdom = _(a2, r2({}, this._props, { context: o3.detail.context }), function e3(n2, o4) {
      if (3 === n2.nodeType) return n2.data;
      if (1 !== n2.nodeType) return null;
      var r4 = [], i4 = {}, a5 = 0, s5 = n2.attributes, l5 = n2.childNodes;
      for (a5 = s5.length; a5--; ) "slot" !== s5[a5].name && (i4[s5[a5].name] = s5[a5].value, i4[c2(s5[a5].name)] = s5[a5].value);
      for (a5 = l5.length; a5--; ) {
        var u4 = e3(l5[a5], null), d4 = l5[a5].slot;
        d4 ? i4[d4] = _(p2, { name: d4 }, u4) : r4[a5] = u4;
      }
      var h4 = o4 ? _(p2, null, r4) : r4;
      return _(o4 || n2.nodeName.toLowerCase(), i4, h4);
    }(this, this._vdomComponent)), (this.hasAttribute("hydrate") ? D : B)(this._vdom, this._root);
  }
  function c2(t3) {
    return t3.replace(/-(\w)/g, function(t4, e3) {
      return e3 ? e3.toUpperCase() : "";
    });
  }
  function l2(t3, e3, r4) {
    if (this._vdom) {
      var i4 = {};
      i4[t3] = r4 = null == r4 ? void 0 : r4, i4[c2(t3)] = r4, this._vdom = E(this._vdom, i4), B(this._vdom, this._root);
    }
  }
  function u2() {
    B(this._vdom = null, this._root);
  }
  function p2(e3, n2) {
    var o3 = this;
    return _("slot", r2({}, e3, { ref: function(t3) {
      t3 ? (o3.ref = t3, o3._listener || (o3._listener = function(t4) {
        t4.stopPropagation(), t4.detail.context = n2;
      }, t3.addEventListener("_preact", o3._listener))) : o3.ref.removeEventListener("_preact", o3._listener);
    } }));
  }
  function preact_custom_element_esm_default(t3, e3, n2, o3) {
    function r4() {
      var e4 = Reflect.construct(HTMLElement, [], r4);
      return e4._vdomComponent = t3, e4._root = o3 && o3.shadow ? e4.attachShadow({ mode: o3.mode || "open" }) : e4, e4;
    }
    return (r4.prototype = Object.create(HTMLElement.prototype)).constructor = r4, r4.prototype.connectedCallback = s2, r4.prototype.attributeChangedCallback = l2, r4.prototype.disconnectedCallback = u2, n2 = n2 || t3.observedAttributes || Object.keys(t3.propTypes || {}), r4.observedAttributes = n2, n2.forEach(function(t4) {
      Object.defineProperty(r4.prototype, t4, { get: function() {
        return this._vdom.props[t4];
      }, set: function(e4) {
        this._vdom ? this.attributeChangedCallback(t4, null, e4) : (this._props || (this._props = {}), this._props[t4] = e4, this.connectedCallback());
        var n3 = typeof e4;
        null != e4 && "string" !== n3 && "boolean" !== n3 && "number" !== n3 || this.setAttribute(t4, e4);
      } });
    }), customElements.define(e3 || t3.tagName || t3.displayName || t3.name, r4);
  }

  // src/components/Navigation.module.css
  var result = { "navigation": "ex_navigation--h1138", "list": "ex_list--hf58f", "item": "ex_item--hab80" };
  var Navigation_default = result;

  // src/components/Navigation.jsx
  var Navigation = () => {
    return /* @__PURE__ */ _("nav", { class: Navigation_default.navigation }, /* @__PURE__ */ _("ul", { class: Navigation_default.list }, /* @__PURE__ */ _("li", { class: Navigation_default.item }, /* @__PURE__ */ _("a", { href: "/products" }, "Machines")), /* @__PURE__ */ _("li", { class: Navigation_default.item }, /* @__PURE__ */ _("a", { href: "/stores" }, "Stores"))));
  };
  var Navigation_default2 = Navigation;

  // src/components/Fragment.jsx
  var isServer = typeof window === "undefined";
  var esiPrefix = (team) => {
    const urls = {
      explore: process.env.EXPLORE_URL
    };
    return `${urls[team]}/${team}/esi`;
  };
  var Fragment = ({ team, name, ...props }) => {
    let esi = null;
    if (isServer) {
      const query = new URLSearchParams(props).toString();
      const url = `${esiPrefix(team)}/${name}?${query}`;
      esi = /* @__PURE__ */ _("esi:include", { src: url });
    }
    return _(`${team}-${name}`, props, esi);
  };
  var Fragment_default = Fragment;

  // src/utils.js
  var html = String.raw;
  var IMAGE_SERVER = typeof process === "undefined" || process.env.USE_LOCAL_IMAGES !== "true" ? "https://cdn.the-tractor.store" : "";
  function src(image, size) {
    return IMAGE_SERVER + image.replace("[size]", `${size}`);
  }
  function srcset(image, sizes = []) {
    return sizes.map((size) => `${src(image, size)} ${size}w`).join(", ");
  }
  function fmtprice(price) {
    return `${price},00 \xD8`;
  }

  // src/components/Header.module.css
  var result2 = { "header": "ex_header--he236", "cutter": "ex_cutter--he77d", "inner": "ex_inner--h0d78", "logo": "ex_logo--hd0fd", "link": "ex_link--h0153", "cart": "ex_cart--h271c", "navigation": "ex_navigation--heaed" };
  var Header_default = result2;

  // src/components/Header.jsx
  var Header_default2 = () => {
    return /* @__PURE__ */ _("header", { class: Header_default.header, "data-boundary": "explore-header" }, /* @__PURE__ */ _("link", { rel: "stylesheet", href: "/explore/static/client.css" }), /* @__PURE__ */ _("div", { class: Header_default.cutter }, /* @__PURE__ */ _("div", { class: Header_default.inner }, /* @__PURE__ */ _("a", { class: Header_default.link, href: "/" }, /* @__PURE__ */ _(
      "img",
      {
        class: Header_default.logo,
        src: `${IMAGE_SERVER}/cdn/img/logo.svg`,
        alt: "Micro Frontends - Tractor Store"
      }
    )), /* @__PURE__ */ _("div", { class: Header_default.navigation }, /* @__PURE__ */ _(Navigation_default2, null)), /* @__PURE__ */ _("div", { class: Header_default.cart }, /* @__PURE__ */ _(Fragment_default, { team: "checkout", name: "minicart" })))));
  };

  // src/client/fragments/HeaderCe.jsx
  var HeaderCe = () => {
    console.log("explore-header hydrated");
    return /* @__PURE__ */ _(Header_default2, null);
  };
  HeaderCe.propTypes = {};
  var HeaderCe_default = HeaderCe;

  // src/components/Footer.module.css
  var result3 = { "footer": "ex_footer--hd453", "cutter": "ex_cutter--ha57a", "inner": "ex_inner--h5b70", "initiative": "ex_initiative--h613b", "credits": "ex_credits--h7878" };
  var Footer_default = result3;

  // src/components/Footer.jsx
  var Footer_default2 = () => {
    return /* @__PURE__ */ _("footer", { class: Footer_default.footer, "data-boundary": "explore-footer" }, /* @__PURE__ */ _("link", { rel: "stylesheet", href: "/explore/static/client.css" }), /* @__PURE__ */ _("div", { class: Footer_default.cutter }, /* @__PURE__ */ _("div", { class: Footer_default.inner }, /* @__PURE__ */ _("div", { class: Footer_default.initiative }, /* @__PURE__ */ _(
      "img",
      {
        src: `${IMAGE_SERVER}/cdn/img/neulandlogo.svg`,
        alt: "neuland - B\xFCro f\xFCr Informatik"
      }
    ), /* @__PURE__ */ _("p", null, "based on", " ", /* @__PURE__ */ _(
      "a",
      {
        href: "https://micro-frontends.org/tractor-store/",
        target: "_blank"
      },
      "the tractor store 2.0"
    ), /* @__PURE__ */ _("br", null), "a", " ", /* @__PURE__ */ _("a", { href: "https://neuland-bfi.de", target: "_blank" }, "neuland"), " ", "project")), /* @__PURE__ */ _("div", { class: Footer_default.credits }, /* @__PURE__ */ _("h4", null, "techstack"), /* @__PURE__ */ _("p", null, "ssr, esi, custom elements, declarative shadow dom, preact, css-modules, mpa, no app shell"), /* @__PURE__ */ _("p", null, "build by", " ", /* @__PURE__ */ _(
      "img",
      {
        src: `${IMAGE_SERVER}/cdn/img/neulandlogo.svg`,
        alt: "neuland - B\xFCro f\xFCr Informatik"
      }
    ), " ", /* @__PURE__ */ _("a", { href: "https://neuland-bfi.de", target: "_blank" }, "neuland"), " / ", /* @__PURE__ */ _(
      "a",
      {
        href: "https://github.com/neuland/tractor-store-preact",
        target: "_blank"
      },
      "github"
    ))))));
  };

  // src/client/fragments/FooterCe.jsx
  var FooterCe = () => {
    console.log("explore-footer hydrated");
    return /* @__PURE__ */ _(Footer_default2, null);
  };
  FooterCe.propTypes = {};
  var FooterCe_default = FooterCe;

  // src/components/Recommendation.module.css
  var result4 = { "recommendation": "ex_recommendation--h1b1b", "link": "ex_link--hc05f", "image": "ex_image--hffa9", "name": "ex_name--he718" };
  var Recommendation_default = result4;

  // src/components/Recommendation.jsx
  var Recommendation_default2 = ({ image, url, name }) => {
    return /* @__PURE__ */ _("li", { class: Recommendation_default.recommendation }, /* @__PURE__ */ _("a", { class: Recommendation_default.link, href: url }, /* @__PURE__ */ _(
      "img",
      {
        class: Recommendation_default.image,
        src: src(image, 200),
        srcet: srcset(image, [200, 400]),
        sizes: "200px",
        width: "200",
        height: "200"
      }
    ), /* @__PURE__ */ _("span", { class: Recommendation_default.name }, name)));
  };

  // src/components/Recommendations.module.css
  var result5 = { "recommendations": "ex_recommendations--h81ff", "list": "ex_list--h7801" };
  var Recommendations_default = result5;

  // src/components/Recommendations.jsx
  var Recommendations = ({ recommendations }) => {
    return recommendations.length ? /* @__PURE__ */ _("div", { class: Recommendations_default.recommendations, "data-boundary": "explore-recommendations" }, /* @__PURE__ */ _("link", { rel: "stylesheet", href: "/explore/static/client.css" }), /* @__PURE__ */ _("h2", null, "Recommendations"), /* @__PURE__ */ _("ul", { class: Recommendations_default.list }, recommendations.map(Recommendation_default2))) : null;
  };
  Recommendations.api = "/recommendations";
  var Recommendations_default2 = Recommendations;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r3;
  var u3;
  var i3;
  var o2 = 0;
  var f2 = [];
  var c3 = [];
  var e2 = l;
  var a3 = e2.__b;
  var v2 = e2.__r;
  var l3 = e2.diffed;
  var m = e2.__c;
  var s3 = e2.unmount;
  var d2 = e2.__;
  function h2(n2, t3) {
    e2.__h && e2.__h(r3, n2, o2 || t3), o2 = 0;
    var u4 = r3.__H || (r3.__H = { __: [], __h: [] });
    return n2 >= u4.__.length && u4.__.push({ __V: c3 }), u4.__[n2];
  }
  function p3(n2) {
    return o2 = 1, y2(D2, n2);
  }
  function y2(n2, u4, i4) {
    var o3 = h2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i4 ? i4(u4) : D2(void 0, u4), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r4 = o3.t(t3, n3);
      t3 !== r4 && (o3.__N = [r4, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r3, !r3.u)) {
      var f3 = function(n3, t3, r4) {
        if (!o3.__c.__H) return true;
        var u5 = o3.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u5.every(function(n4) {
          return !n4.__N;
        })) return !c5 || c5.call(this, n3, t3, r4);
        var i5 = false;
        return u5.forEach(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i5 = true);
          }
        }), !(!i5 && o3.__c.props === n3) && (!c5 || c5.call(this, n3, t3, r4));
      };
      r3.u = true;
      var c5 = r3.shouldComponentUpdate, e3 = r3.componentWillUpdate;
      r3.componentWillUpdate = function(n3, t3, r4) {
        if (this.__e) {
          var u5 = c5;
          c5 = void 0, f3(n3, t3, r4), c5 = u5;
        }
        e3 && e3.call(this, n3, t3, r4);
      }, r3.shouldComponentUpdate = f3;
    }
    return o3.__N || o3.__;
  }
  function _2(n2, u4) {
    var i4 = h2(t2++, 3);
    !e2.__s && C2(i4.__H, u4) && (i4.__ = n2, i4.i = u4, r3.__H.__h.push(i4));
  }
  function F2(n2) {
    return o2 = 5, q2(function() {
      return { current: n2 };
    }, []);
  }
  function q2(n2, r4) {
    var u4 = h2(t2++, 7);
    return C2(u4.__H, r4) ? (u4.__V = n2(), u4.i = r4, u4.__h = n2, u4.__V) : u4.__;
  }
  function x2(n2, t3) {
    return o2 = 8, q2(function() {
      return n2;
    }, t3);
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
    } catch (t3) {
      n2.__H.__h = [], e2.__e(t3, n2.__v);
    }
  }
  e2.__b = function(n2) {
    r3 = null, a3 && a3(n2);
  }, e2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), d2 && d2(n2, t3);
  }, e2.__r = function(n2) {
    v2 && v2(n2), t2 = 0;
    var i4 = (r3 = n2.__c).__H;
    i4 && (u3 === r3 ? (i4.__h = [], r3.__h = [], i4.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.__V = c3, n3.__N = n3.i = void 0;
    })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t2 = 0)), u3 = r3;
  }, e2.diffed = function(n2) {
    l3 && l3(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i3 === e2.requestAnimationFrame || ((i3 = e2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
      n3.i && (n3.__H = n3.i), n3.__V !== c3 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = c3;
    })), u3 = r3 = null;
  }, e2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r4) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], e2.__e(r4, n3.__v);
      }
    }), m && m(n2, t3);
  }, e2.unmount = function(n2) {
    s3 && s3(n2);
    var t3, r4 = n2.__c;
    r4 && r4.__H && (r4.__H.__.forEach(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r4.__H = void 0, t3 && e2.__e(t3, r4.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r4 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u4 = setTimeout(r4, 100);
    k2 && (t3 = requestAnimationFrame(r4));
  }
  function z2(n2) {
    var t3 = r3, u4 = n2.__c;
    "function" == typeof u4 && (n2.__c = void 0, u4()), r3 = t3;
  }
  function B2(n2) {
    var t3 = r3;
    n2.__c = n2.__(), r3 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r4) {
      return t4 !== n2[r4];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // src/fetchData.js
  var isServer2 = typeof window === "undefined";
  async function fetchData_default(path, opts = {}) {
    const prefix = isServer2 ? process.env.EXPLORE_URL : "";
    let url = `${prefix}/explore/api${path}`;
    if (opts.query) {
      url += `?${new URLSearchParams(opts.query).toString()}`;
    }
    return await fetch(url, opts).then((res) => res.json());
  }

  // src/client/fragments/RecommendationsCe.jsx
  var RecommendationsCe = ({ skus }, initialState) => {
    const [state, setState] = p3(initialState);
    const isInitialRender = F2(true);
    _2(async () => {
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }
      if (!skus) return;
      const data = await fetchData_default(Recommendations_default2.api, { skus });
      setState(data);
    }, [skus]);
    return /* @__PURE__ */ _(Recommendations_default2, { ...state });
  };
  RecommendationsCe.propTypes = {
    skus: String
  };
  var RecommendationsCe_default = RecommendationsCe;

  // node_modules/preact-router/dist/preact-router.mjs
  var a4 = {};
  function c4(n2, t3) {
    for (var r4 in t3) n2[r4] = t3[r4];
    return n2;
  }
  function s4(n2, t3, r4) {
    var i4, o3 = /(?:\?([^#]*))?(#.*)?$/, e3 = n2.match(o3), u4 = {};
    if (e3 && e3[1]) for (var f3 = e3[1].split("&"), c5 = 0; c5 < f3.length; c5++) {
      var s5 = f3[c5].split("=");
      u4[decodeURIComponent(s5[0])] = decodeURIComponent(s5.slice(1).join("="));
    }
    n2 = d3(n2.replace(o3, "")), t3 = d3(t3 || "");
    for (var h4 = Math.max(n2.length, t3.length), v4 = 0; v4 < h4; v4++) if (t3[v4] && ":" === t3[v4].charAt(0)) {
      var l5 = t3[v4].replace(/(^:|[+*?]+$)/g, ""), p5 = (t3[v4].match(/[+*?]+$/) || a4)[0] || "", m3 = ~p5.indexOf("+"), y4 = ~p5.indexOf("*"), U2 = n2[v4] || "";
      if (!U2 && !y4 && (p5.indexOf("?") < 0 || m3)) {
        i4 = false;
        break;
      }
      if (u4[l5] = decodeURIComponent(U2), m3 || y4) {
        u4[l5] = n2.slice(v4).map(decodeURIComponent).join("/");
        break;
      }
    } else if (t3[v4] !== n2[v4]) {
      i4 = false;
      break;
    }
    return (true === r4.default || false !== i4) && u4;
  }
  function h3(n2, t3) {
    return n2.rank < t3.rank ? 1 : n2.rank > t3.rank ? -1 : n2.index - t3.index;
  }
  function v3(n2, t3) {
    return n2.index = t3, n2.rank = function(n3) {
      return n3.props.default ? 0 : d3(n3.props.path).map(l4).join("");
    }(n2), n2.props;
  }
  function d3(n2) {
    return n2.replace(/(^\/+|\/+$)/g, "").split("/");
  }
  function l4(n2) {
    return ":" == n2.charAt(0) ? 1 + "*+?".indexOf(n2.charAt(n2.length - 1)) || 4 : 5;
  }
  var p4 = {};
  var m2 = [];
  var y3 = [];
  var U = null;
  var g2 = { url: R() };
  var k3 = G(g2);
  function R() {
    var n2;
    return "" + ((n2 = U && U.location ? U.location : U && U.getCurrentLocation ? U.getCurrentLocation() : "undefined" != typeof location ? location : p4).pathname || "") + (n2.search || "");
  }
  function $2(n2, t3) {
    return void 0 === t3 && (t3 = false), "string" != typeof n2 && n2.url && (t3 = n2.replace, n2 = n2.url), function(n3) {
      for (var t4 = m2.length; t4--; ) if (m2[t4].canRoute(n3)) return true;
      return false;
    }(n2) && function(n3, t4) {
      void 0 === t4 && (t4 = "push"), U && U[t4] ? U[t4](n3) : "undefined" != typeof history && history[t4 + "State"] && history[t4 + "State"](null, null, n3);
    }(n2, t3 ? "replace" : "push"), I2(n2);
  }
  function I2(n2) {
    for (var t3 = false, r4 = 0; r4 < m2.length; r4++) m2[r4].routeTo(n2) && (t3 = true);
    return t3;
  }
  function M2(n2) {
    if (n2 && n2.getAttribute) {
      var t3 = n2.getAttribute("href"), r4 = n2.getAttribute("target");
      if (t3 && t3.match(/^\//g) && (!r4 || r4.match(/^_?self$/i))) return $2(t3);
    }
  }
  function b2(n2) {
    return n2.stopImmediatePropagation && n2.stopImmediatePropagation(), n2.stopPropagation && n2.stopPropagation(), n2.preventDefault(), false;
  }
  function W(n2) {
    if (!(n2.ctrlKey || n2.metaKey || n2.altKey || n2.shiftKey || n2.button)) {
      var t3 = n2.target;
      do {
        if ("a" === t3.localName && t3.getAttribute("href")) {
          if (t3.hasAttribute("data-native") || t3.hasAttribute("native")) return;
          if (M2(t3)) return b2(n2);
        }
      } while (t3 = t3.parentNode);
    }
  }
  var w3 = false;
  function D3(n2) {
    n2.history && (U = n2.history), this.state = { url: n2.url || R() };
  }
  c4(D3.prototype = new b(), { shouldComponentUpdate: function(n2) {
    return true !== n2.static || n2.url !== this.props.url || n2.onChange !== this.props.onChange;
  }, canRoute: function(n2) {
    var t3 = H(this.props.children);
    return void 0 !== this.g(t3, n2);
  }, routeTo: function(n2) {
    this.setState({ url: n2 });
    var t3 = this.canRoute(n2);
    return this.p || this.forceUpdate(), t3;
  }, componentWillMount: function() {
    this.p = true;
  }, componentDidMount: function() {
    var n2 = this;
    w3 || (w3 = true, U || addEventListener("popstate", function() {
      I2(R());
    }), addEventListener("click", W)), m2.push(this), U && (this.u = U.listen(function(t3) {
      var r4 = t3.location || t3;
      n2.routeTo("" + (r4.pathname || "") + (r4.search || ""));
    })), this.p = false;
  }, componentWillUnmount: function() {
    "function" == typeof this.u && this.u(), m2.splice(m2.indexOf(this), 1);
  }, componentWillUpdate: function() {
    this.p = true;
  }, componentDidUpdate: function() {
    this.p = false;
  }, g: function(n2, t3) {
    n2 = n2.filter(v3).sort(h3);
    for (var r4 = 0; r4 < n2.length; r4++) {
      var i4 = n2[r4], o3 = s4(t3, i4.props.path, i4.props);
      if (o3) return [i4, o3];
    }
  }, render: function(n2, t3) {
    var e3, u4, f3 = n2.onChange, a5 = t3.url, s5 = this.c, h4 = this.g(H(n2.children), a5);
    if (h4 && (u4 = E(h4[0], c4(c4({ url: a5, matches: e3 = h4[1] }, e3), { key: void 0, ref: void 0 }))), a5 !== (s5 && s5.url)) {
      c4(g2, s5 = this.c = { url: a5, previous: s5 && s5.url, current: u4, path: u4 ? u4.props.path : null, matches: e3 }), s5.router = this, s5.active = u4 ? [u4] : [];
      for (var v4 = y3.length; v4--; ) y3[v4]({});
      "function" == typeof f3 && f3(s5);
    }
    return _(k3.Provider, { value: s5 }, u4);
  } });

  // src/components/Filter.module.css
  var result6 = { "filter": "ex_filter--hf73d", "active": "ex_active--hf749" };
  var Filter_default = result6;

  // src/components/Filter.jsx
  var Filter_default2 = ({ filters }) => {
    return /* @__PURE__ */ _("div", { class: Filter_default.filter }, "Filter:", /* @__PURE__ */ _("ul", null, filters.map(
      (f3) => f3.active ? /* @__PURE__ */ _("li", { class: Filter_default.active }, f3.name) : /* @__PURE__ */ _("li", null, /* @__PURE__ */ _("a", { href: f3.url }, f3.name))
    )));
  };

  // src/components/Product.module.css
  var result7 = { "product": "ex_product--h2174", "link": "ex_link--h1ba3", "image": "ex_image--h4919", "name": "ex_name--h86d8", "price": "ex_price--hda46" };
  var Product_default = result7;

  // src/components/Product.jsx
  var Product_default2 = ({ name, url, image, startPrice }) => {
    return /* @__PURE__ */ _("li", { class: Product_default.product }, /* @__PURE__ */ _("a", { class: Product_default.link, href: url }, /* @__PURE__ */ _(
      "img",
      {
        class: Product_default.image,
        src: src(image, 200),
        srcset: srcset(image, [200, 400, 800]),
        sizes: "300px",
        width: "200",
        height: "200"
      }
    ), /* @__PURE__ */ _("span", { class: Product_default.name }, name), /* @__PURE__ */ _("span", { class: Product_default.price }, fmtprice(startPrice))));
  };

  // src/pages/CategoryPage.module.css
  var result8 = { "page": "ex_page--h9de5", "list": "ex_list--hd7c2", "subline": "ex_subline--h740d" };
  var CategoryPage_default = result8;

  // src/pages/CategoryPage.jsx
  var CategoryPage = ({ title = "", products = [], filters = [] }) => {
    return /* @__PURE__ */ _("main", { class: CategoryPage_default.page }, /* @__PURE__ */ _("h2", null, title), /* @__PURE__ */ _("div", { class: CategoryPage_default.subline }, /* @__PURE__ */ _("p", null, products.length, " products"), /* @__PURE__ */ _(Filter_default2, { filters })), /* @__PURE__ */ _("ul", { class: CategoryPage_default.list }, products.map(Product_default2)));
  };
  CategoryPage.api = "/category";
  var CategoryPage_default2 = CategoryPage;

  // src/pages/HomePage.module.css
  var result9 = { "page": "ex_page--h6487", "categoryLink": "ex_categoryLink--he75e", "recommendations": "ex_recommendations--h3b3a" };
  var HomePage_default = result9;

  // src/pages/HomePage.jsx
  var HomePage = ({ teaser = [] }) => {
    return /* @__PURE__ */ _("main", { class: HomePage_default.page }, teaser.map(({ title, image, url }) => /* @__PURE__ */ _("a", { class: HomePage_default.categoryLink, href: url }, /* @__PURE__ */ _(
      "img",
      {
        src: src(image, 500),
        srcet: srcset(image, [500, 1e3]),
        sizes: "100vw, (min-width: 500px) 50vw",
        alt: title
      }
    ), title)), /* @__PURE__ */ _("div", { class: HomePage_default.recommendations }, /* @__PURE__ */ _(
      Fragment_default,
      {
        team: "explore",
        name: "recommendations",
        skus: "CL-06-MT,AU-02-OG"
      }
    )));
  };
  HomePage.api = "/home";
  var HomePage_default2 = HomePage;

  // src/components/Store.jsx
  var Store_default = ({ name, image, street, city }) => {
    return /* @__PURE__ */ _("li", { class: "e_Store" }, /* @__PURE__ */ _("div", { class: "e_Store_content" }, /* @__PURE__ */ _(
      "img",
      {
        class: "e_Store_image",
        src: src(image, 200),
        srcset: srcset(image, [200, 400]),
        width: "200",
        height: "200"
      }
    ), /* @__PURE__ */ _("p", { class: "e_Store_address" }, name, /* @__PURE__ */ _("br", null), street, /* @__PURE__ */ _("br", null), city)));
  };

  // src/pages/StoresPage.module.css
  var result10 = { "page": "ex_page--h3cb6", "list": "ex_list--h7823" };
  var StoresPage_default = result10;

  // src/pages/StoresPage.jsx
  var StoresPage = ({ stores = [] }) => {
    return /* @__PURE__ */ _("main", { class: StoresPage_default.page }, /* @__PURE__ */ _("h2", null, "Our Stores"), /* @__PURE__ */ _("p", null, "Want to see our products in person? Visit one of our stores to see our products up close and talk to our experts. We have stores in the following locations:"), /* @__PURE__ */ _("ul", { class: StoresPage_default.list }, stores.map(Store_default)));
  };
  StoresPage.api = "/stores";
  var StoresPage_default2 = StoresPage;

  // src/App.jsx
  var App = ({ path, data }) => {
    const [state, update] = p3(data);
    const [initial, setInitial] = p3(true);
    const updateData = x2(
      async (url) => {
        if (initial) {
          setInitial(false);
          return;
        }
        const api = url.current.type.api;
        const query = url.matches;
        const newData = await fetchData_default(api, { query });
        update(newData);
      },
      [initial]
    );
    return /* @__PURE__ */ _("div", { "data-boundary": "explore-page" }, /* @__PURE__ */ _(Fragment_default, { team: "explore", name: "header" }), /* @__PURE__ */ _(D3, { url: path, onChange: updateData }, /* @__PURE__ */ _(HomePage_default2, { path: "/", ...state }), /* @__PURE__ */ _(CategoryPage_default2, { path: "/products/:filter?", ...state }), /* @__PURE__ */ _(StoresPage_default2, { path: "/stores", ...state }), /* @__PURE__ */ _("div", { default: true }, /* @__PURE__ */ _("h1", null, "404 Not Found ", path))), /* @__PURE__ */ _(Fragment_default, { team: "explore", name: "footer" }));
  };
  var App_default = App;

  // src/client/index.jsx
  function hydrateApp() {
    const $app = document.getElementById("explore-app");
    if ($app) {
      const state = JSON.parse($app.nextElementSibling.textContent || "{}");
      D(/* @__PURE__ */ _(App_default, { data: state }), $app);
    }
  }
  window.addEventListener(
    "_preact",
    (event) => {
      const $el = event.target;
      const tagName = $el.tagName.toLowerCase();
      if (tagName.startsWith("explore-") && $el.shadowRoot) {
        const $state = $el.querySelector("script[data-state]");
        const state = JSON.parse($state?.textContent || "{}");
        event.detail.context = state;
        $el.setAttribute("hydate", true);
      }
    },
    { capture: true }
  );
  preact_custom_element_esm_default(HeaderCe_default, "explore-header", null, { shadow: true });
  preact_custom_element_esm_default(FooterCe_default, "explore-footer", null, { shadow: true });
  preact_custom_element_esm_default(RecommendationsCe_default, "explore-recommendations", null, { shadow: true });
  hydrateApp();
  console.log("explore client ready");
})();
