!(function () {
  function e(e, t) {
    var n = new XMLHttpRequest();
    (n.onreadystatechange = function () {
      4 === n.readyState && t(n.responseText);
    }),
      n.open("GET", e, !0),
      n.send();
  }
  function t(e, t, n) {
    Object.defineProperty ? Object.defineProperty(e, t, n) : (e[t] = n.get());
  }
  var n;
  window.CSS || (window.CSS = {}),
    "paintWorklet" in window.CSS ||
      t(window.CSS, "paintWorklet", {
        get: function () {
          return n || (n = new F());
        },
      });
  var r = "css-paint-polyfill",
    i = document.createElement(r);
  (i.style.cssText = "display: none;"), document.documentElement.appendChild(i);
  var o = document.createElement("iframe");
  (o.style.cssText =
    "position:absolute; left:0; top:-999px; width:1px; height:1px;"),
    i.appendChild(o);
  var a = document.createElement("style");
  (a.id = r), (a.$$isPaint = !0), i.appendChild(a);
  var s = a.sheet,
    l = i.style,
    c = [],
    p =
      /(paint\(|-moz-element\(#paint-|-webkit-canvas\(paint-|[('"]blob:[^'"#]+#paint=|[('"]data:image\/paint-)/,
    u = "getCSSCanvasContext" in document,
    d = (l.backgroundImage = "-moz-element(#" + r + ")") === l.backgroundImage,
    h = "function" == typeof Promise;
  l.cssText = "";
  var f = window.requestAnimationFrame || setTimeout,
    v = h ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout,
    g = function () {
      return window.devicePixelRatio || 1;
    },
    m = {},
    y = {},
    b = 0;
  function $(e) {
    var t = (e.bit ^= 1);
    return e.instances[t] || (e.instances[t] = new e.Painter());
  }
  function P(e, t) {
    var n = e.cssText;
    !0 === t.isNew &&
      p.test(n) &&
      n !== (n = T(n)) &&
      (e = (function (e, t) {
        for (
          var n = e.parentStyleSheet,
            r = e.parentRule,
            i = (r || n).cssRules,
            o = i.length - 1,
            a = 0;
          a <= o;
          a++
        )
          if (i[a] === e) {
            (r || n).deleteRule(a), (o = a);
            break;
          }
        if (null != t) {
          if (r) {
            var s = r.appendRule(t);
            return r.cssRules[s];
          }
          return n.insertRule(t, o), n.cssRules[o];
        }
      })(e, n));
    var r,
      i,
      o,
      a = e.selectorText,
      s = z(e.style);
    if (
      ((r = null == t.counters[a] ? (t.counters[a] = 1) : ++t.counters[a]),
      null != y[(i = "sheet" + t.sheetId + "\n" + a + "\n" + r)])
    ) {
      if ((o = y[i]).selector === a)
        return (o.rule = e), void (o.cssText !== s && t.toProcess.push(o));
      t.toRemove.push(o);
    } else
      (o = y[i] = { key: i, selector: a, cssText: s, properties: {}, rule: e }),
        t.toProcess.push(o.selector);
  }
  function w(e, t) {
    if (!("ownerSVGElement" in e)) {
      t(e);
      for (var n = e.firstElementChild; n; )
        w(n, t), (n = n.nextElementSibling);
    }
  }
  function x() {
    for (
      var e = [].slice.call(document.styleSheets),
        t = {
          toProcess: [],
          toRemove: [],
          counters: {},
          isNew: !1,
          sheetId: null,
        },
        n = 0;
      n < e.length;
      n++
    ) {
      var r = e[n].ownerNode;
      if (!r.$$isPaint) {
        try {
          r.sheet.cssRules;
        } catch (e) {
          continue;
        }
        (t.sheetId = r.$$paintid),
          (t.isNew = null == t.sheetId),
          (t.isNew && ((t.sheetId = r.$$paintid = ++b), !1 === C(r))) ||
            S(r.sheet, P, t);
      }
    }
    for (var i = t.toRemove.length; i--; ) delete y[t.toRemove[i].key];
    t.toProcess.length > 0 && L(t.toProcess.join(", "));
  }
  function S(e, t, n) {
    var r = [[0, e.cssRules]],
      i = r[0],
      o = i[1];
    if (o)
      for (var a = 0; r.length > 0; a++)
        if (a >= o.length) {
          r.pop();
          var s = r.length;
          s > 0 && ((o = (i = r[s - 1])[1]), (a = i[0]));
        } else {
          i[0] = a;
          var l = o[a];
          if (1 === l.type) {
            var c = t(l, n);
            void 0 !== c && (n = c);
          } else l.cssRules && l.cssRules.length > 0 && r.push([0, l.cssRules]);
        }
    return n;
  }
  function C(t) {
    if (!t.$$isPaint) {
      if (t.href) return e(t.href, R), !1;
      for (var n = t.childNodes.length; n--; ) {
        var r = t.childNodes[n].nodeValue,
          i = T(r);
        i !== r && (t.childNodes[n].nodeValue = i);
      }
    }
  }
  function R(e) {
    var t = o.contentWindow.document.body,
      n = document.createElement("style");
    (n.media = "print"),
      (n.$$paintid = ++b),
      n.appendChild(document.createTextNode(T(e))),
      t.appendChild(n);
    var r = "";
    if (
      (S(n.sheet, function (e) {
        if (1 === e.type) {
          for (var t = "", n = 0; n < e.style.length; n++) {
            var i = e.style.item(n),
              o = e.style.getPropertyValue(i);
            p.test(o) &&
              (t = i + ": " + o + e.style.getPropertyPriority(i) + ";");
          }
          if (t) {
            t = e.selectorText + "{" + t + "}";
            for (var a = e; (a = a.parentRule); )
              t = "" + a.cssText.match(/^[\s\S]+?\{/)[0] + t + "}";
            r += t;
          }
        }
      }),
      t.removeChild(n),
      r)
    ) {
      var a = document.createElement("style");
      (a.$$paintid = b),
        a.appendChild(document.createTextNode(r)),
        i.appendChild(a);
    }
    x();
  }
  function T(e) {
    return e.replace(
      /(;|,|\b)paint\s*\(\s*(['"]?)(.+?)\2\s*\)(;|,|!|\b)/g,
      "$1url(data:image/paint-$3,=)$4"
    );
  }
  addEventListener("resize", function () {
    L("[data-css-paint]", !0);
  });
  var E,
    O,
    k = [];
  function N(e, t) {
    t && (e.$$paintObservedProperties = null),
      !0 !== e.$$paintPending &&
        ((e.$$paintPending = !0),
        -1 === k.indexOf(e) && 1 === k.push(e) && v(I));
  }
  function I() {
    for (var e; (e = k.pop()); ) A(e);
  }
  function L(e, t) {
    try {
      for (var n = document.querySelectorAll(e), r = 0; r < n.length; r++)
        N(n[r], t);
    } catch (e) {}
  }
  function V(e, t, n) {
    for (
      var r = e.length,
        i = function () {
          --r || t.apply(null, n || c);
        },
        o = 0;
      o < e.length;
      o++
    ) {
      var a = new Image();
      (a.onload = i), (a.onerror = onerror), (a.src = e[o]);
    }
  }
  function j(e) {
    var t = e.$$paintId;
    return null == t && (t = e.$$paintId = ++U), t;
  }
  function D(e) {
    var t = e.$$paintRule,
      n = j(e);
    if (null == t) {
      e.hasAttribute("data-css-paint") || e.setAttribute("data-css-paint", n);
      var r = s.insertRule(
        '[data-css-paint="' + U + '"] {}',
        s.cssRules.length
      );
      t = e.$$paintRule = s.cssRules[r];
    }
    return t;
  }
  function z(e) {
    var t = e.cssText;
    if (t) return t;
    t = "";
    for (var n = 0, r = void 0; n < e.length; n++)
      (r = e[n]),
        0 !== n && (t += " "),
        (t += r),
        (t += ":"),
        (t += e.getPropertyValue(r)),
        (t += ";");
    return t;
  }
  function A(e) {
    var t = getComputedStyle(e);
    if (e.$$paintObservedProperties)
      for (var n = 0; n < e.$$paintObservedProperties.length; n++) {
        var r = e.$$paintObservedProperties[n];
        if (
          t.getPropertyValue(r).trim() !== e.$$paintedPropertyValues[r].trim()
        ) {
          W(e, t);
          break;
        }
      }
    else if (e.$$paintId || p.test(z(t))) return void W(e, t);
    e.$$paintPending = !1;
  }
  var M = {
      get: function (e) {
        return e in O ? O[e] : (O[e] = E.getPropertyValue(e));
      },
    },
    U = 0;
  function W(e, t) {
    a.disabled = !0;
    var n,
      r = (E = null == t ? getComputedStyle(e) : t);
    O = {};
    var o = [];
    e.$$paintPending = !1;
    for (
      var s = { width: e.clientWidth, height: e.clientHeight },
        l = g(),
        c = e.$$paintedProperties,
        p = 0;
      p < r.length;
      p++
    ) {
      var h = r[p],
        f = M.get(h),
        v =
          /(,|\b|^)url\((['"]?)((?:-moz-element\(#|-webkit-canvas\()paint-\d+-([^;,]+)\)|(?:data:image\/paint-|blob:[^'"#]+#paint=)([^"';, ]+)(?:[;,].*?)?)\2\)(;|,|\s|\b|$)/g,
        y = "",
        b = 0,
        P = [],
        w = !1,
        x = !1,
        S = void 0,
        C = void 0,
        R = s;
      if (/border-image/.test(h)) {
        var T = R.width,
          k = R.height,
          N = G(
            M.get("border-image-slice")
              .replace(/\sfill/, "")
              .split(" ")
          );
        (T -= B(T, N.left) + B(T, N.right)),
          (k -= B(k, N.top) + B(k, N.bottom));
        var I = G(M.get("border-image-outset").split(" "));
        R = {
          width: (T = B(B(T, I.left), I.right)),
          height: (k = B(B(k, I.top), I.bottom)),
        };
      }
      for (; (C = v.exec(f)); ) {
        !1 === x && (S = j(e)), (x = !0), (y += f.substring(0, C.index));
        var L = C[4] || C[5],
          z = C[3],
          A = m[L],
          U = (A && A.Painter.contextOptions) || {},
          W = !1 === U.scaling ? 1 : l,
          F = void 0;
        A &&
          (A.Painter.inputProperties &&
            o.push.apply(o, A.Painter.inputProperties),
          (F = $(A))),
          !0 === U.nativePixels && ((R.width *= l), (R.height *= l), (W = 1));
        var X = W * R.width,
          J = W * R.height,
          K = e.$$paintContext,
          Q = "paint-" + S + "-" + L;
        if (K && K.canvas && K.canvas.width == X && K.canvas.height == J)
          K.clearRect(0, 0, X, J);
        else {
          if (!0 === u) K = document.getCSSCanvasContext("2d", Q, X, J);
          else {
            var Y = K && K.canvas,
              Z = !1;
            Y || (((Y = document.createElement("canvas")).id = Q), (Z = d)),
              (Y.width = X),
              (Y.height = J),
              Z && ((Y.style.display = "none"), i.appendChild(Y)),
              (K = Y.getContext("2d"));
          }
          (e.$$paintContext = K),
            (K.imageSmoothingEnabled = !1),
            1 !== W && K.scale(W, W);
        }
        if (
          (F &&
            (K.save(),
            K.beginPath(),
            F.paint(K, R, M),
            K.closePath(),
            K.restore(),
            !1 === u && "resetTransform" in K && K.resetTransform()),
          (y += C[1]),
          !0 === u)
        )
          (y += "-webkit-canvas(" + Q + ")"), (w = null == C[4]);
        else if (!0 === d)
          (y += "-moz-element(#" + Q + ")"), (w = null == C[4]);
        else {
          var _ = K.canvas
            .toDataURL("image/png")
            .replace("/png", "/paint-" + L);
          if (
            ("function" == typeof MSBlobBuilder && (_ = H(_, L)),
            P.push(_),
            (y += 'url("' + _ + '")'),
            _ !== z || !n)
          ) {
            var ee = z ? z.indexOf("#") : -1;
            ~ee && URL.revokeObjectURL(z.substring(0, ee)), (w = !0);
          }
          z = _;
        }
        (y += C[6]), (b = C.index + C[0].length);
      }
      !1 !== x || null == c || null == c[h]
        ? ((y += f.substring(b)),
          w &&
            (n || (n = D(e)),
            null == c && (c = e.$$paintedProperties = {}),
            (c[h] = !0),
            "background" === h.substring(0, 10) &&
              1 !== l &&
              q(n.style, "background-size", R.width + "px " + R.height + "px"),
            0 === P.length ? q(n.style, h, y) : V(P, q, [n.style, h, y])))
        : (n || (n = D(e)), n.style.removeProperty(h));
    }
    e.$$paintObservedProperties = 0 === o.length ? null : o;
    for (
      var te = (e.$$paintedPropertyValues = {}), ne = 0;
      ne < o.length;
      ne++
    ) {
      var re = o[ne];
      te[re] = M.get(re);
    }
    a.disabled = !1;
  }
  function H(e, t) {
    for (
      var n = atob(e.split(",")[1]), r = new Uint8Array(n.length), i = 0;
      i < n.length;
      i++
    )
      r[i] = n.charCodeAt(i);
    return URL.createObjectURL(new Blob([r])) + "#paint=" + t;
  }
  function q(e, t, n) {
    e.setProperty(t, n, "important");
  }
  function B(e, t) {
    var n = parseFloat(t);
    return t
      ? t.match("px")
        ? e + n
        : (t.match("%") && (n /= 100), e * n)
      : e;
  }
  function G(e) {
    return {
      top: e[0],
      bottom: e[2] || e[0],
      left: e[3] || e[1] || e[0],
      right: e[1] || e[0],
    };
  }
  var F = function () {
    f(x);
    var e = document.createElement("x-a");
    document.body.appendChild(e);
    var n = !1,
      r = !1;
    new MutationObserver(function (t) {
      if (!0 !== r) {
        r = !0;
        for (var i = 0; i < t.length; i++) {
          var o = t[i],
            a = void 0;
          if (!(o.target && "ownerSVGElement" in o.target))
            if ("childList" === o.type && (a = o.addedNodes))
              for (var s = 0; s < a.length; s++) 1 === a[s].nodeType && N(a[s]);
            else
              "attributes" === o.type &&
                1 === o.target.nodeType &&
                (o.target === e ? (n = !0) : w(o.target, N));
        }
        r = !1;
      }
    }).observe(document.body, { childList: !0, attributes: !0, subtree: !0 }),
      (e.style.cssText = "color: red;"),
      setTimeout(function () {
        if ((document.body.removeChild(e), !n)) {
          var r = Object.getOwnPropertyDescriptor(
              HTMLElement.prototype,
              "style"
            ),
            i = r.get;
          (r.get = function () {
            var e = i.call(this);
            return (e.ownerElement = this), e;
          }),
            t(HTMLElement.prototype, "style", r);
          var o = Object.getOwnPropertyDescriptor(
              CSSStyleDeclaration.prototype,
              "cssText"
            ),
            a = o.set;
          (o.set = function (e) {
            return this.ownerElement && N(this.ownerElement), a.call(this, e);
          }),
            t(CSSStyleDeclaration.prototype, "cssText", o);
          var s = Object.getOwnPropertyDescriptor(
              CSSStyleDeclaration.prototype,
              "setProperty"
            ),
            l = s.value;
          (s.value = function (e, t, n) {
            this.ownerElement && N(this.ownerElement), l.call(this, e, t, n);
          }),
            t(CSSStyleDeclaration.prototype, "setProperty", s);
        }
      });
  };
  F.prototype.addModule = function (n) {
    var r,
      o,
      a = this;
    return (
      h &&
        (r = new Promise(function (e) {
          return (o = e);
        })),
      e(n, function (e) {
        var n = {
          registerPaint: function (e, t) {
            !(function (e, t, n) {
              (m[e] = {
                worklet: n,
                Painter: t,
                properties: t.inputProperties
                  ? [].slice.call(t.inputProperties)
                  : [],
                bit: 0,
                instances: [],
              }),
                x();
            })(e, t, { context: n, realm: r });
          },
        };
        t(n, "devicePixelRatio", { get: g }), (n.self = n);
        var r = new (function (e, t) {
          var n = document.createElement("iframe");
          (n.style.cssText =
            "position:absolute; left:0; top:-999px; width:1px; height:1px;"),
            t.appendChild(n);
          var r = n.contentWindow,
            i = r.document,
            o = "var window,$hook";
          for (var a in r) a in e || "eval" === a || ((o += ","), (o += a));
          for (var s in e) (o += ","), (o += s), (o += "=self."), (o += s);
          var l = i.createElement("script");
          l.appendChild(
            i.createTextNode(
              'function $hook(self,console) {"use strict";\n\t\t' +
                o +
                ";return function() {return eval(arguments[0])}}"
            )
          ),
            i.body.appendChild(l),
            (this.exec = r.$hook(e, console));
        })(n, i);
        (e = (a.transpile || String)(e)), r.exec(e), o && o();
      }),
      r
    );
  };
})();
//# sourceMappingURL=css-paint-polyfill.js.map
