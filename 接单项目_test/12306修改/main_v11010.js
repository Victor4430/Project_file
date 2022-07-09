/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
*/

/*!
 * SuperSlide v2.1.2
 * 轻松解决网站大部分特效展示问题
 * 详尽信息请看官网：http://www.SuperSlide2.com/
 *
 * Copyright 2011-2015, 大话主席
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途

 * v2.1.1：修复当调用多个SuperSlide，并设置returnDefault:true 时返回defaultIndex索引错误
 * v2.1.2：增加参数设置vis:"auto"，解决左滚动自适应窗口宽度问题。适应情况：vis:"auto",scroll:1, effect:"left或leftLoop"（注：此为临时解决方案，日后版本可能变动）
 * v2.1.2：修复 mouseOverStop 和 autoPlay均为false下，点击切换按钮后会自动播放bug

 */

//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

function timeChangetype(e) {
    return Date.parse(new Date(e))
}

function GetDateStr(e) {
    var t = new Date;
    return t.setDate(t.getDate() + e),
    t.getFullYear() + "-" + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-" + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate())
}

function GetDateStr2(e, t) {
    var n = new Date;
    return n.setDate(n.getDate() + t),
    n.getFullYear() + "-" + (n.getMonth() + 1 < 10 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1) + "-" + (n.getDate() < 10 ? "0" + n.getDate() : n.getDate())
}

function setStorage(e, t) {
    e && ("string" != typeof t && (t = JSON.stringify(t)),
        window.sessionStorage.setItem(e, t))
}

function getStorage(e) {
    if (e)
        return window.sessionStorage.getItem(e)
}

function removeStore(e) {
    if (e)
        return window.sessionStorage.removeItem(e)
}

function setLocalStorage(e, t) {
    e && ("string" != typeof t && (t = JSON.stringify(t)),
        window.localStorage.setItem(e, t))
}

function getLocalStorage(e) {
    if (e)
        return window.localStorage.getItem(e)
}

function removeLocalStore(e) {
    e && window.localStorage.removeItem(e)
}

function noChoseCity(e, t, n, r) {
    r = r || "请选择出发城市",
        n = n || "347px",
        t = t || "0",
        e.parent().parent().append('<div class="tooltip-error" data-id=' + e.attr("id") + ' style="left:' + n + "; top: " + t + '; display: block;"><i class="icon icon-plaint-fill"></i>' + r + "</div>")
}

function footerFn() {
    $(".content").css("height", "auto");
    var e = $(window).height()
        , t = $(".footer").height()
        , n = $(".content").height()
        , r = e - 109 - t;
    n <= r && $(".content").height(r)
}

function getUrlParms(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)")
        , n = window.location.search.substr(1).match(t);
    return null != n ? unescape(n[2]) : null
}

function GetRequest() {
    var e = encodeURI(location.search)
        , t = new Object;
    if (-1 != e.indexOf("?")) {
        var n = e.substr(1);
        strs = n.split("&");
        for (var r = 0; r < strs.length; r++)
            t[strs[r].split("=")[0]] = unescape(strs[r].split("=")[1])
    }
    return t
}

function deepClone(e) {
    var t = JSON.stringify(e);
    return JSON.parse(t)
}

function getScSnameListFn() {
    $.ajax({
        url: getScSnameListpr,
        type: "POST",
        timeout: 1e4,
        dataType: "json",
        data: {
            station_telecode: $("#sale").val()
        },
        success: function (e) {
            var t = e.data;
            if ($(".content").height(""),
                $(".sale-list").empty(),
                e.data) {
                $("#ticket-box-tips").show();
                for (var n = 0; n < t.length; n++)
                    if (citys[t[n]]) {
                        var r = '<li><h3 class="sale-tit">' + t[n] + '</h3><div class="sale-time">' + (citys[t[n]] || "暂无") + "</div></li>";
                        $(".sale-list").append(r),
                            $(".result-none").hide()
                    }
            } else if (citys[$("#saleText").val()]) {
                var r = '<li><h3 class="sale-tit">' + $("#saleText").val() + '</h3><div class="sale-time">' + (citys[$("#saleText").val()] || "暂无") + "</div></li>";
                $(".sale-list").append(r),
                    $("#ticket-box-tips").show(),
                    $(".result-none").hide()
            } else
                $(".sale-list").empty(),
                    $("#ticket-box-tips").hide(),
                    $(".result-none").show();
            footerFn()
        },
        error: function (e) {
        }
    })
}

function loadingShow() {
    $(".mask").fadeIn()
}

function loadingHide() {
    $(".mask").fadeOut()
}

function _getStationEnNameByCode(e, t) {
    var n = "";
    return $.each(station_names.split("@"), function (r, i) {
        if (void 0 != i) {
            var a = i.split("|")
                , o = a[1]
                , s = a[2]
                , l = (a[3],
                arry_zh.indexOf(o));
            if (l > -1 && (o = arry_zh[l]),
            e === s)
                return n = t ? o + "(" + o + ")" : o,
                    !1
        }
    }),
    n.substring(0, 1).toUpperCase() + n.substring(1)
}

function _getStationNameByCode(e) {
    var t = "";
    return $.each(station_names.split("@"), function (n, r) {
        if (void 0 != r) {
            var i = r.split("|")
                , a = i[1]
                , o = i[2];
            if (e === o)
                return t = a,
                    !1
        }
    }),
        t
}

!function (e, t) {
    function n(e) {
        var t = e.length
            , n = ue.type(e);
        return !ue.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)))
    }

    function r(e) {
        var t = Ce[e] = {};
        return ue.each(e.match(fe) || [], function (e, n) {
            t[n] = !0
        }),
            t
    }

    function i(e, n, r, i) {
        if (ue.acceptData(e)) {
            var a, o, s = ue.expando, l = e.nodeType, c = l ? ue.cache : e, u = l ? e[s] : e[s] && s;
            if (u && c[u] && (i || c[u].data) || r !== t || "string" != typeof n)
                return u || (u = l ? e[s] = te.pop() || ue.guid++ : s),
                c[u] || (c[u] = l ? {} : {
                    toJSON: ue.noop
                }),
                ("object" == typeof n || "function" == typeof n) && (i ? c[u] = ue.extend(c[u], n) : c[u].data = ue.extend(c[u].data, n)),
                    o = c[u],
                i || (o.data || (o.data = {}),
                    o = o.data),
                r !== t && (o[ue.camelCase(n)] = r),
                    "string" == typeof n ? null == (a = o[n]) && (a = o[ue.camelCase(n)]) : a = o,
                    a
        }
    }

    function a(e, t, n) {
        if (ue.acceptData(e)) {
            var r, i, a = e.nodeType, o = a ? ue.cache : e, l = a ? e[ue.expando] : ue.expando;
            if (o[l]) {
                if (t && (r = n ? o[l] : o[l].data)) {
                    ue.isArray(t) ? t = t.concat(ue.map(t, ue.camelCase)) : t in r ? t = [t] : (t = ue.camelCase(t),
                        t = t in r ? [t] : t.split(" ")),
                        i = t.length;
                    for (; i--;)
                        delete r[t[i]];
                    if (n ? !s(r) : !ue.isEmptyObject(r))
                        return
                }
                (n || (delete o[l].data,
                    s(o[l]))) && (a ? ue.cleanData([e], !0) : ue.support.deleteExpando || o != o.window ? delete o[l] : o[l] = null)
            }
        }
    }

    function o(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var i = "data-" + n.replace(Se, "-$1").toLowerCase();
            if ("string" == typeof (r = e.getAttribute(i))) {
                try {
                    r = "true" === r || "false" !== r && ("null" === r ? null : +r + "" === r ? +r : De.test(r) ? ue.parseJSON(r) : r)
                } catch (e) {
                }
                ue.data(e, n, r)
            } else
                r = t
        }
        return r
    }

    function s(e) {
        var t;
        for (t in e)
            if (("data" !== t || !ue.isEmptyObject(e[t])) && "toJSON" !== t)
                return !1;
        return !0
    }

    function l() {
        return !0
    }

    function c() {
        return !1
    }

    function u() {
        try {
            return G.activeElement
        } catch (e) {
        }
    }

    function d(e, t) {
        do {
            e = e[t]
        } while (e && 1 !== e.nodeType);
        return e
    }

    function f(e, t, n) {
        if (ue.isFunction(t))
            return ue.grep(e, function (e, r) {
                return !!t.call(e, r, e) !== n
            });
        if (t.nodeType)
            return ue.grep(e, function (e) {
                return e === t !== n
            });
        if ("string" == typeof t) {
            if (Re.test(t))
                return ue.filter(t, e, n);
            t = ue.filter(t, e)
        }
        return ue.grep(e, function (e) {
            return ue.inArray(e, t) >= 0 !== n
        })
    }

    function p(e) {
        var t = Qe.split("|")
            , n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;)
                n.createElement(t.pop());
        return n
    }

    function h(e, t) {
        return ue.nodeName(e, "table") && ue.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function y(e) {
        return e.type = (null !== ue.find.attr(e, "type")) + "/" + e.type,
            e
    }

    function m(e) {
        var t = it.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
            e
    }

    function g(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++)
            ue._data(n, "globalEval", !t || ue._data(t[r], "globalEval"))
    }

    function v(e, t) {
        if (1 === t.nodeType && ue.hasData(e)) {
            var n, r, i, a = ue._data(e), o = ue._data(t, a), s = a.events;
            if (s) {
                delete o.handle,
                    o.events = {};
                for (n in s)
                    for (r = 0,
                             i = s[n].length; i > r; r++)
                        ue.event.add(t, n, s[n][r])
            }
            o.data && (o.data = ue.extend({}, o.data))
        }
    }

    function _(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(),
            !ue.support.noCloneEvent && t[ue.expando]) {
                i = ue._data(t);
                for (r in i.events)
                    ue.removeEvent(t, r, i.handle);
                t.removeAttribute(ue.expando)
            }
            "script" === n && t.text !== e.text ? (y(t).text = e.text,
                m(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
            ue.support.html5Clone && e.innerHTML && !ue.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tt.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
            t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function w(e, n) {
        var r, i, a = 0,
            o = typeof e.getElementsByTagName !== J ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== J ? e.querySelectorAll(n || "*") : t;
        if (!o)
            for (o = [],
                     r = e.childNodes || e; null != (i = r[a]); a++)
                !n || ue.nodeName(i, n) ? o.push(i) : ue.merge(o, w(i, n));
        return n === t || n && ue.nodeName(e, n) ? ue.merge([e], o) : o
    }

    function b(e) {
        tt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function x(e, t) {
        if (t in e)
            return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Tt.length; i--;)
            if ((t = Tt[i] + n) in e)
                return t;
        return r
    }

    function k(e, t) {
        return e = t || e,
        "none" === ue.css(e, "display") || !ue.contains(e.ownerDocument, e)
    }

    function T(e, t) {
        for (var n, r, i, a = [], o = 0, s = e.length; s > o; o++)
            r = e[o],
            r.style && (a[o] = ue._data(r, "olddisplay"),
                n = r.style.display,
                t ? (a[o] || "none" !== n || (r.style.display = ""),
                "" === r.style.display && k(r) && (a[o] = ue._data(r, "olddisplay", N(r.nodeName)))) : a[o] || (i = k(r),
                (n && "none" !== n || !i) && ue._data(r, "olddisplay", i ? n : ue.css(r, "display"))));
        for (o = 0; s > o; o++)
            r = e[o],
            r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? a[o] || "" : "none"));
        return e
    }

    function C(e, t, n) {
        var r = gt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function D(e, t, n, r, i) {
        for (var a = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > a; a += 2)
            "margin" === n && (o += ue.css(e, n + kt[a], !0, i)),
                r ? ("content" === n && (o -= ue.css(e, "padding" + kt[a], !0, i)),
                "margin" !== n && (o -= ue.css(e, "border" + kt[a] + "Width", !0, i))) : (o += ue.css(e, "padding" + kt[a], !0, i),
                "padding" !== n && (o += ue.css(e, "border" + kt[a] + "Width", !0, i)));
        return o
    }

    function S(e, t, n) {
        var r = !0
            , i = "width" === t ? e.offsetWidth : e.offsetHeight
            , a = ut(e)
            , o = ue.support.boxSizing && "border-box" === ue.css(e, "boxSizing", !1, a);
        if (0 >= i || null == i) {
            if (i = dt(e, t, a),
            (0 > i || null == i) && (i = e.style[t]),
                vt.test(i))
                return i;
            r = o && (ue.support.boxSizingReliable || i === e.style[t]),
                i = parseFloat(i) || 0
        }
        return i + D(e, t, n || (o ? "border" : "content"), r, a) + "px"
    }

    function N(e) {
        var t = G
            , n = wt[e];
        return n || (n = j(e, t),
        "none" !== n && n || (ct = (ct || ue("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement),
            t = (ct[0].contentWindow || ct[0].contentDocument).document,
            t.write("<!doctype html><html><body>"),
            t.close(),
            n = j(e, t),
            ct.detach()),
            wt[e] = n),
            n
    }

    function j(e, t) {
        var n = ue(t.createElement(e)).appendTo(t.body)
            , r = ue.css(n[0], "display");
        return n.remove(),
            r
    }

    function M(e, t, n, r) {
        var i;
        if (ue.isArray(t))
            ue.each(t, function (t, i) {
                n || Dt.test(e) ? r(e, i) : M(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
            });
        else if (n || "object" !== ue.type(t))
            r(e, t);
        else
            for (i in t)
                M(e + "[" + i + "]", t[i], n, r)
    }

    function O(e) {
        return function (t, n) {
            "string" != typeof t && (n = t,
                t = "*");
            var r, i = 0, a = t.toLowerCase().match(fe) || [];
            if (ue.isFunction(n))
                for (; r = a[i++];)
                    "+" === r[0] ? (r = r.slice(1) || "*",
                        (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function E(e, n, r, i) {
        function a(l) {
            var c;
            return o[l] = !0,
                ue.each(e[l] || [], function (e, l) {
                    var u = l(n, r, i);
                    return "string" != typeof u || s || o[u] ? s ? !(c = u) : t : (n.dataTypes.unshift(u),
                        a(u),
                        !1)
                }),
                c
        }

        var o = {}
            , s = e === Wt;
        return a(n.dataTypes[0]) || !o["*"] && a("*")
    }

    function q(e, n) {
        var r, i, a = ue.ajaxSettings.flatOptions || {};
        for (i in n)
            n[i] !== t && ((a[i] ? e : r || (r = {}))[i] = n[i]);
        return r && ue.extend(!0, e, r),
            e
    }

    function A(e, n, r) {
        for (var i, a, o, s, l = e.contents, c = e.dataTypes; "*" === c[0];)
            c.shift(),
            a === t && (a = e.mimeType || n.getResponseHeader("Content-Type"));
        if (a)
            for (s in l)
                if (l[s] && l[s].test(a)) {
                    c.unshift(s);
                    break
                }
        if (c[0] in r)
            o = c[0];
        else {
            for (s in r) {
                if (!c[0] || e.converters[s + " " + c[0]]) {
                    o = s;
                    break
                }
                i || (i = s)
            }
            o = o || i
        }
        return o ? (o !== c[0] && c.unshift(o),
            r[o]) : t
    }

    function I(e, t, n, r) {
        var i, a, o, s, l, c = {}, u = e.dataTypes.slice();
        if (u[1])
            for (o in e.converters)
                c[o.toLowerCase()] = e.converters[o];
        for (a = u.shift(); a;)
            if (e.responseFields[a] && (n[e.responseFields[a]] = t),
            !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                l = a,
                a = u.shift())
                if ("*" === a)
                    a = l;
                else if ("*" !== l && l !== a) {
                    if (!(o = c[l + " " + a] || c["* " + a]))
                        for (i in c)
                            if (s = i.split(" "),
                            s[1] === a && (o = c[l + " " + s[0]] || c["* " + s[0]])) {
                                !0 === o ? o = c[i] : !0 !== c[i] && (a = s[0],
                                    u.unshift(s[1]));
                                break
                            }
                    if (!0 !== o)
                        if (o && e.throws)
                            t = o(t);
                        else
                            try {
                                t = o(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: o ? e : "No conversion from " + l + " to " + a
                                }
                            }
                }
        return {
            state: "success",
            data: t
        }
    }

    function L() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {
        }
    }

    function F() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
        }
    }

    function H() {
        return setTimeout(function () {
            Xt = t
        }),
            Xt = ue.now()
    }

    function P(e, t, n) {
        for (var r, i = (rn[t] || []).concat(rn["*"]), a = 0, o = i.length; o > a; a++)
            if (r = i[a].call(n, t, e))
                return r
    }

    function U(e, t, n) {
        var r, i, a = 0, o = nn.length, s = ue.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (i)
                return !1;
            for (var t = Xt || H(), n = Math.max(0, c.startTime + c.duration - t), r = n / c.duration || 0, a = 1 - r, o = 0, l = c.tweens.length; l > o; o++)
                c.tweens[o].run(a);
            return s.notifyWith(e, [c, a, n]),
                1 > a && l ? n : (s.resolveWith(e, [c]),
                    !1)
        }, c = s.promise({
            elem: e,
            props: ue.extend({}, t),
            opts: ue.extend(!0, {
                specialEasing: {}
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Xt || H(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var r = ue.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                return c.tweens.push(r),
                    r
            },
            stop: function (t) {
                var n = 0
                    , r = t ? c.tweens.length : 0;
                if (i)
                    return this;
                for (i = !0; r > n; n++)
                    c.tweens[n].run(1);
                return t ? s.resolveWith(e, [c, t]) : s.rejectWith(e, [c, t]),
                    this
            }
        }), u = c.props;
        for (B(u, c.opts.specialEasing); o > a; a++)
            if (r = nn[a].call(c, e, u, c.opts))
                return r;
        return ue.map(u, P, c),
        ue.isFunction(c.opts.start) && c.opts.start.call(e, c),
            ue.fx.timer(ue.extend(l, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })),
            c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
    }

    function B(e, t) {
        var n, r, i, a, o;
        for (n in e)
            if (r = ue.camelCase(n),
                i = t[r],
                a = e[n],
            ue.isArray(a) && (i = a[1],
                a = e[n] = a[0]),
            n !== r && (e[r] = a,
                delete e[n]),
            (o = ue.cssHooks[r]) && "expand" in o) {
                a = o.expand(a),
                    delete e[r];
                for (n in a)
                    n in e || (e[n] = a[n],
                        t[n] = i)
            } else
                t[r] = i
    }

    function R(e, t, n) {
        var r, i, a, o, s, l, c = this, u = {}, d = e.style, f = e.nodeType && k(e), p = ue._data(e, "fxshow");
        n.queue || (s = ue._queueHooks(e, "fx"),
        null == s.unqueued && (s.unqueued = 0,
                l = s.empty.fire,
                s.empty.fire = function () {
                    s.unqueued || l()
                }
        ),
            s.unqueued++,
            c.always(function () {
                c.always(function () {
                    s.unqueued--,
                    ue.queue(e, "fx").length || s.empty.fire()
                })
            })),
        1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY],
        "inline" === ue.css(e, "display") && "none" === ue.css(e, "float") && (ue.support.inlineBlockNeedsLayout && "inline" !== N(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")),
        n.overflow && (d.overflow = "hidden",
        ue.support.shrinkWrapBlocks || c.always(function () {
            d.overflow = n.overflow[0],
                d.overflowX = n.overflow[1],
                d.overflowY = n.overflow[2]
        }));
        for (r in t)
            if (i = t[r],
                Kt.exec(i)) {
                if (delete t[r],
                    a = a || "toggle" === i,
                i === (f ? "hide" : "show"))
                    continue;
                u[r] = p && p[r] || ue.style(e, r)
            }
        if (!ue.isEmptyObject(u)) {
            p ? "hidden" in p && (f = p.hidden) : p = ue._data(e, "fxshow", {}),
            a && (p.hidden = !f),
                f ? ue(e).show() : c.done(function () {
                    ue(e).hide()
                }),
                c.done(function () {
                    var t;
                    ue._removeData(e, "fxshow");
                    for (t in u)
                        ue.style(e, t, u[t])
                });
            for (r in u)
                o = P(f ? p[r] : 0, r, c),
                r in p || (p[r] = o.start,
                f && (o.end = o.start,
                    o.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function W(e, t, n, r, i) {
        return new W.prototype.init(e, t, n, r, i)
    }

    function $(e, t) {
        var n, r = {
            height: e
        }, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t)
            n = kt[i],
                r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
            r
    }

    function z(e) {
        return ue.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }

    var Q, Y, J = typeof t, Z = e.location, G = e.document, X = G.documentElement, V = e.jQuery, K = e.$, ee = {},
        te = [], ne = "1.10.2", re = te.concat, ie = te.push, ae = te.slice, oe = te.indexOf, se = ee.toString,
        le = ee.hasOwnProperty, ce = ne.trim, ue = function (e, t) {
            return new ue.fn.init(e, t, Y)
        }, de = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, fe = /\S+/g, pe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        he = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ye = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, me = /^[\],:{}\s]*$/,
        ge = /(?:^|:|,)(?:\s*\[)+/g, ve = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        _e = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, we = /^-ms-/, be = /-([\da-z])/gi,
        xe = function (e, t) {
            return t.toUpperCase()
        }, ke = function (e) {
            (G.addEventListener || "load" === e.type || "complete" === G.readyState) && (Te(),
                ue.ready())
        }, Te = function () {
            G.addEventListener ? (G.removeEventListener("DOMContentLoaded", ke, !1),
                e.removeEventListener("load", ke, !1)) : (G.detachEvent("onreadystatechange", ke),
                e.detachEvent("onload", ke))
        };
    ue.fn = ue.prototype = {
        jquery: ne,
        constructor: ue,
        init: function (e, n, r) {
            var i, a;
            if (!e)
                return this;
            if ("string" == typeof e) {
                if (!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : he.exec(e)) || !i[1] && n)
                    return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                if (i[1]) {
                    if (n = n instanceof ue ? n[0] : n,
                        ue.merge(this, ue.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : G, !0)),
                    ye.test(i[1]) && ue.isPlainObject(n))
                        for (i in n)
                            ue.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                    return this
                }
                if ((a = G.getElementById(i[2])) && a.parentNode) {
                    if (a.id !== i[2])
                        return r.find(e);
                    this.length = 1,
                        this[0] = a
                }
                return this.context = G,
                    this.selector = e,
                    this
            }
            return e.nodeType ? (this.context = this[0] = e,
                this.length = 1,
                this) : ue.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector,
                this.context = e.context),
                ue.makeArray(e, this))
        },
        selector: "",
        length: 0,
        toArray: function () {
            return ae.call(this)
        },
        get: function (e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function (e) {
            var t = ue.merge(this.constructor(), e);
            return t.prevObject = this,
                t.context = this.context,
                t
        },
        each: function (e, t) {
            return ue.each(this, e, t)
        },
        ready: function (e) {
            return ue.ready.promise().done(e),
                this
        },
        slice: function () {
            return this.pushStack(ae.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length
                , n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        map: function (e) {
            return this.pushStack(ue.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: ie,
        sort: [].sort,
        splice: [].splice
    },
        ue.fn.init.prototype = ue.fn,
        ue.extend = ue.fn.extend = function () {
            var e, n, r, i, a, o, s = arguments[0] || {}, l = 1, c = arguments.length, u = !1;
            for ("boolean" == typeof s && (u = s,
                s = arguments[1] || {},
                l = 2),
                 "object" == typeof s || ue.isFunction(s) || (s = {}),
                 c === l && (s = this,
                     --l); c > l; l++)
                if (null != (a = arguments[l]))
                    for (i in a)
                        e = s[i],
                            r = a[i],
                        s !== r && (u && r && (ue.isPlainObject(r) || (n = ue.isArray(r))) ? (n ? (n = !1,
                            o = e && ue.isArray(e) ? e : []) : o = e && ue.isPlainObject(e) ? e : {},
                            s[i] = ue.extend(u, o, r)) : r !== t && (s[i] = r));
            return s
        }
        ,
        ue.extend({
            expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
            noConflict: function (t) {
                return e.$ === ue && (e.$ = K),
                t && e.jQuery === ue && (e.jQuery = V),
                    ue
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function (e) {
                e ? ue.readyWait++ : ue.ready(!0)
            },
            ready: function (e) {
                if (!0 === e ? !--ue.readyWait : !ue.isReady) {
                    if (!G.body)
                        return setTimeout(ue.ready);
                    ue.isReady = !0,
                    !0 !== e && --ue.readyWait > 0 || (Q.resolveWith(G, [ue]),
                    ue.fn.trigger && ue(G).trigger("ready").off("ready"))
                }
            },
            isFunction: function (e) {
                return "function" === ue.type(e)
            },
            isArray: Array.isArray || function (e) {
                return "array" === ue.type(e)
            }
            ,
            isWindow: function (e) {
                return null != e && e == e.window
            },
            isNumeric: function (e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function (e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? ee[se.call(e)] || "object" : typeof e
            },
            isPlainObject: function (e) {
                var n;
                if (!e || "object" !== ue.type(e) || e.nodeType || ue.isWindow(e))
                    return !1;
                try {
                    if (e.constructor && !le.call(e, "constructor") && !le.call(e.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (e) {
                    return !1
                }
                if (ue.support.ownLast)
                    for (n in e)
                        return le.call(e, n);
                for (n in e)
                    ;
                return n === t || le.call(e, n)
            },
            isEmptyObject: function (e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            error: function (e) {
                throw Error(e)
            },
            parseHTML: function (e, t, n) {
                if (!e || "string" != typeof e)
                    return null;
                "boolean" == typeof t && (n = t,
                    t = !1),
                    t = t || G;
                var r = ye.exec(e)
                    , i = !n && [];
                return r ? [t.createElement(r[1])] : (r = ue.buildFragment([e], t, i),
                i && ue(i).remove(),
                    ue.merge([], r.childNodes))
            },
            parseJSON: function (n) {
                return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = ue.trim(n)) && me.test(n.replace(ve, "@").replace(_e, "]").replace(ge, "")) ? Function("return " + n)() : (ue.error("Invalid JSON: " + n),
                    t)
            },
            parseXML: function (n) {
                var r, i;
                if (!n || "string" != typeof n)
                    return null;
                try {
                    e.DOMParser ? (i = new DOMParser,
                        r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"),
                        r.async = "false",
                        r.loadXML(n))
                } catch (e) {
                    r = t
                }
                return r && r.documentElement && !r.getElementsByTagName("parsererror").length || ue.error("Invalid XML: " + n),
                    r
            },
            noop: function () {
            },
            globalEval: function (t) {
                t && ue.trim(t) && (e.execScript || function (t) {
                        e.eval.call(e, t)
                    }
                )(t)
            },
            camelCase: function (e) {
                return e.replace(we, "ms-").replace(be, xe)
            },
            nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function (e, t, r) {
                var i = 0
                    , a = e.length
                    , o = n(e);
                if (r) {
                    if (o)
                        for (; a > i && !1 !== t.apply(e[i], r); i++)
                            ;
                    else
                        for (i in e)
                            if (!1 === t.apply(e[i], r))
                                break
                } else if (o)
                    for (; a > i && !1 !== t.call(e[i], i, e[i]); i++)
                        ;
                else
                    for (i in e)
                        if (!1 === t.call(e[i], i, e[i]))
                            break;
                return e
            },
            trim: ce && !ce.call("\ufeff ") ? function (e) {
                    return null == e ? "" : ce.call(e)
                }
                : function (e) {
                    return null == e ? "" : (e + "").replace(pe, "")
                }
            ,
            makeArray: function (e, t) {
                var r = t || [];
                return null != e && (n(Object(e)) ? ue.merge(r, "string" == typeof e ? [e] : e) : ie.call(r, e)),
                    r
            },
            inArray: function (e, t, n) {
                var r;
                if (t) {
                    if (oe)
                        return oe.call(t, e, n);
                    for (r = t.length,
                             n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)
                        if (n in t && t[n] === e)
                            return n
                }
                return -1
            },
            merge: function (e, n) {
                var r = n.length
                    , i = e.length
                    , a = 0;
                if ("number" == typeof r)
                    for (; r > a; a++)
                        e[i++] = n[a];
                else
                    for (; n[a] !== t;)
                        e[i++] = n[a++];
                return e.length = i,
                    e
            },
            grep: function (e, t, n) {
                var r, i = [], a = 0, o = e.length;
                for (n = !!n; o > a; a++)
                    r = !!t(e[a], a),
                    n !== r && i.push(e[a]);
                return i
            },
            map: function (e, t, r) {
                var i, a = 0, o = e.length, s = n(e), l = [];
                if (s)
                    for (; o > a; a++)
                        null != (i = t(e[a], a, r)) && (l[l.length] = i);
                else
                    for (a in e)
                        null != (i = t(e[a], a, r)) && (l[l.length] = i);
                return re.apply([], l)
            },
            guid: 1,
            proxy: function (e, n) {
                var r, i, a;
                return "string" == typeof n && (a = e[n],
                    n = e,
                    e = a),
                    ue.isFunction(e) ? (r = ae.call(arguments, 2),
                        i = function () {
                            return e.apply(n || this, r.concat(ae.call(arguments)))
                        }
                        ,
                        i.guid = e.guid = e.guid || ue.guid++,
                        i) : t
            },
            access: function (e, n, r, i, a, o, s) {
                var l = 0
                    , c = e.length
                    , u = null == r;
                if ("object" === ue.type(r)) {
                    a = !0;
                    for (l in r)
                        ue.access(e, n, l, r[l], !0, o, s)
                } else if (i !== t && (a = !0,
                ue.isFunction(i) || (s = !0),
                u && (s ? (n.call(e, i),
                    n = null) : (u = n,
                        n = function (e, t, n) {
                            return u.call(ue(e), n)
                        }
                )),
                    n))
                    for (; c > l; l++)
                        n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r)));
                return a ? e : u ? n.call(e) : c ? n(e[0], r) : o
            },
            now: function () {
                return (new Date).getTime()
            },
            swap: function (e, t, n, r) {
                var i, a, o = {};
                for (a in t)
                    o[a] = e.style[a],
                        e.style[a] = t[a];
                i = n.apply(e, r || []);
                for (a in t)
                    e.style[a] = o[a];
                return i
            }
        }),
        ue.ready.promise = function (t) {
            if (!Q)
                if (Q = ue.Deferred(),
                "complete" === G.readyState)
                    setTimeout(ue.ready);
                else if (G.addEventListener)
                    G.addEventListener("DOMContentLoaded", ke, !1),
                        e.addEventListener("load", ke, !1);
                else {
                    G.attachEvent("onreadystatechange", ke),
                        e.attachEvent("onload", ke);
                    var n = !1;
                    try {
                        n = null == e.frameElement && G.documentElement
                    } catch (e) {
                    }
                    n && n.doScroll && function e() {
                        if (!ue.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (t) {
                                return setTimeout(e, 50)
                            }
                            Te(),
                                ue.ready()
                        }
                    }()
                }
            return Q.promise(t)
        }
        ,
        ue.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
            ee["[object " + t + "]"] = t.toLowerCase()
        }),
        Y = ue(G),
        function (e, t) {
            function n(e, t, n, r) {
                var i, a, o, s, l, c, f, p, h, y;
                if ((t ? t.ownerDocument || t : H) !== M && j(t),
                    t = t || M,
                    n = n || [],
                !e || "string" != typeof e)
                    return n;
                if (1 !== (s = t.nodeType) && 9 !== s)
                    return [];
                if (E && !r) {
                    if (i = ge.exec(e))
                        if (o = i[1]) {
                            if (9 === s) {
                                if (!(a = t.getElementById(o)) || !a.parentNode)
                                    return n;
                                if (a.id === o)
                                    return n.push(a),
                                        n
                            } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(o)) && L(t, a) && a.id === o)
                                return n.push(a),
                                    n
                        } else {
                            if (i[2])
                                return V.apply(n, t.getElementsByTagName(e)),
                                    n;
                            if ((o = i[3]) && b.getElementsByClassName && t.getElementsByClassName)
                                return V.apply(n, t.getElementsByClassName(o)),
                                    n
                        }
                    if (b.qsa && (!q || !q.test(e))) {
                        if (p = f = F,
                            h = t,
                            y = 9 === s && e,
                        1 === s && "object" !== t.nodeName.toLowerCase()) {
                            for (c = u(e),
                                     (f = t.getAttribute("id")) ? p = f.replace(we, "\\$&") : t.setAttribute("id", p),
                                     p = "[id='" + p + "'] ",
                                     l = c.length; l--;)
                                c[l] = p + d(c[l]);
                            h = de.test(e) && t.parentNode || t,
                                y = c.join(",")
                        }
                        if (y)
                            try {
                                return V.apply(n, h.querySelectorAll(y)),
                                    n
                            } catch (e) {
                            } finally {
                                f || t.removeAttribute("id")
                            }
                    }
                }
                return _(e.replace(se, "$1"), t, n, r)
            }

            function r() {
                function e(n, r) {
                    return t.push(n += " ") > k.cacheLength && delete e[t.shift()],
                        e[n] = r
                }

                var t = [];
                return e
            }

            function i(e) {
                return e[F] = !0,
                    e
            }

            function a(e) {
                var t = M.createElement("div");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t),
                        t = null
                }
            }

            function o(e, t) {
                for (var n = e.split("|"), r = e.length; r--;)
                    k.attrHandle[n[r]] = t
            }

            function s(e, t) {
                var n = t && e
                    , r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
                if (r)
                    return r;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t)
                            return -1;
                return e ? 1 : -1
            }

            function l(e) {
                return i(function (t) {
                    return t = +t,
                        i(function (n, r) {
                            for (var i, a = e([], n.length, t), o = a.length; o--;)
                                n[i = a[o]] && (n[i] = !(r[i] = n[i]))
                        })
                })
            }

            function c() {
            }

            function u(e, t) {
                var r, i, a, o, s, l, c, u = R[e + " "];
                if (u)
                    return t ? 0 : u.slice(0);
                for (s = e,
                         l = [],
                         c = k.preFilter; s;) {
                    (!r || (i = le.exec(s))) && (i && (s = s.slice(i[0].length) || s),
                        l.push(a = [])),
                        r = !1,
                    (i = ce.exec(s)) && (r = i.shift(),
                        a.push({
                            value: r,
                            type: i[0].replace(se, " ")
                        }),
                        s = s.slice(r.length));
                    for (o in k.filter)
                        !(i = ye[o].exec(s)) || c[o] && !(i = c[o](i)) || (r = i.shift(),
                            a.push({
                                value: r,
                                type: o,
                                matches: i
                            }),
                            s = s.slice(r.length));
                    if (!r)
                        break
                }
                return t ? s.length : s ? n.error(e) : R(e, l).slice(0)
            }

            function d(e) {
                for (var t = 0, n = e.length, r = ""; n > t; t++)
                    r += e[t].value;
                return r
            }

            function f(e, t, n) {
                var r = t.dir
                    , i = n && "parentNode" === r
                    , a = U++;
                return t.first ? function (t, n, a) {
                        for (; t = t[r];)
                            if (1 === t.nodeType || i)
                                return e(t, n, a)
                    }
                    : function (t, n, o) {
                        var s, l, c, u = P + " " + a;
                        if (o) {
                            for (; t = t[r];)
                                if ((1 === t.nodeType || i) && e(t, n, o))
                                    return !0
                        } else
                            for (; t = t[r];)
                                if (1 === t.nodeType || i)
                                    if (c = t[F] || (t[F] = {}),
                                    (l = c[r]) && l[0] === u) {
                                        if (!0 === (s = l[1]) || s === x)
                                            return !0 === s
                                    } else if (l = c[r] = [u],
                                        l[1] = e(t, n, o) || x,
                                    !0 === l[1])
                                        return !0
                    }
            }

            function p(e) {
                return e.length > 1 ? function (t, n, r) {
                        for (var i = e.length; i--;)
                            if (!e[i](t, n, r))
                                return !1;
                        return !0
                    }
                    : e[0]
            }

            function h(e, t, n, r, i) {
                for (var a, o = [], s = 0, l = e.length, c = null != t; l > s; s++)
                    (a = e[s]) && (!n || n(a, r, i)) && (o.push(a),
                    c && t.push(s));
                return o
            }

            function y(e, t, n, r, a, o) {
                return r && !r[F] && (r = y(r)),
                a && !a[F] && (a = y(a, o)),
                    i(function (i, o, s, l) {
                        var c, u, d, f = [], p = [], y = o.length, m = i || v(t || "*", s.nodeType ? [s] : s, []),
                            g = !e || !i && t ? m : h(m, f, e, s, l), _ = n ? a || (i ? e : y || r) ? [] : o : g;
                        if (n && n(g, _, s, l),
                            r)
                            for (c = h(_, p),
                                     r(c, [], s, l),
                                     u = c.length; u--;)
                                (d = c[u]) && (_[p[u]] = !(g[p[u]] = d));
                        if (i) {
                            if (a || e) {
                                if (a) {
                                    for (c = [],
                                             u = _.length; u--;)
                                        (d = _[u]) && c.push(g[u] = d);
                                    a(null, _ = [], c, l)
                                }
                                for (u = _.length; u--;)
                                    (d = _[u]) && (c = a ? ee.call(i, d) : f[u]) > -1 && (i[c] = !(o[c] = d))
                            }
                        } else
                            _ = h(_ === o ? _.splice(y, _.length) : _),
                                a ? a(null, o, _, l) : V.apply(o, _)
                    })
            }

            function m(e) {
                for (var t, n, r, i = e.length, a = k.relative[e[0].type], o = a || k.relative[" "], s = a ? 1 : 0, l = f(function (e) {
                    return e === t
                }, o, !0), c = f(function (e) {
                    return ee.call(t, e) > -1
                }, o, !0), u = [function (e, n, r) {
                    return !a && (r || n !== S) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
                }
                ]; i > s; s++)
                    if (n = k.relative[e[s].type])
                        u = [f(p(u), n)];
                    else {
                        if (n = k.filter[e[s].type].apply(null, e[s].matches),
                            n[F]) {
                            for (r = ++s; i > r && !k.relative[e[r].type]; r++)
                                ;
                            return y(s > 1 && p(u), s > 1 && d(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace(se, "$1"), n, r > s && m(e.slice(s, r)), i > r && m(e = e.slice(r)), i > r && d(e))
                        }
                        u.push(n)
                    }
                return p(u)
            }

            function g(e, t) {
                var r = 0
                    , a = t.length > 0
                    , o = e.length > 0
                    , s = function (i, s, l, c, u) {
                    var d, f, p, y = [], m = 0, g = "0", v = i && [], _ = null != u, w = S,
                        b = i || o && k.find.TAG("*", u && s.parentNode || s),
                        T = P += null == w ? 1 : Math.random() || .1;
                    for (_ && (S = s !== M && s,
                        x = r); null != (d = b[g]); g++) {
                        if (o && d) {
                            for (f = 0; p = e[f++];)
                                if (p(d, s, l)) {
                                    c.push(d);
                                    break
                                }
                            _ && (P = T,
                                x = ++r)
                        }
                        a && ((d = !p && d) && m--,
                        i && v.push(d))
                    }
                    if (m += g,
                    a && g !== m) {
                        for (f = 0; p = t[f++];)
                            p(v, y, s, l);
                        if (i) {
                            if (m > 0)
                                for (; g--;)
                                    v[g] || y[g] || (y[g] = G.call(c));
                            y = h(y)
                        }
                        V.apply(c, y),
                        _ && !i && y.length > 0 && m + t.length > 1 && n.uniqueSort(c)
                    }
                    return _ && (P = T,
                        S = w),
                        v
                };
                return a ? i(s) : s
            }

            function v(e, t, r) {
                for (var i = 0, a = t.length; a > i; i++)
                    n(e, t[i], r);
                return r
            }

            function _(e, t, n, r) {
                var i, a, o, s, l, c = u(e);
                if (!r && 1 === c.length) {
                    if (a = c[0] = c[0].slice(0),
                    a.length > 2 && "ID" === (o = a[0]).type && b.getById && 9 === t.nodeType && E && k.relative[a[1].type]) {
                        if (!(t = (k.find.ID(o.matches[0].replace(be, xe), t) || [])[0]))
                            return n;
                        e = e.slice(a.shift().value.length)
                    }
                    for (i = ye.needsContext.test(e) ? 0 : a.length; i-- && (o = a[i],
                        !k.relative[s = o.type]);)
                        if ((l = k.find[s]) && (r = l(o.matches[0].replace(be, xe), de.test(a[0].type) && t.parentNode || t))) {
                            if (a.splice(i, 1),
                                !(e = r.length && d(a)))
                                return V.apply(n, r),
                                    n;
                            break
                        }
                }
                return D(e, c)(r, t, !E, n, de.test(e)),
                    n
            }

            var w, b, x, k, T, C, D, S, N, j, M, O, E, q, A, I, L, F = "sizzle" + -new Date, H = e.document, P = 0,
                U = 0, B = r(), R = r(), W = r(), $ = !1, z = function (e, t) {
                    return e === t ? ($ = !0,
                        0) : 0
                }, Q = typeof t, Y = 1 << 31, J = {}.hasOwnProperty, Z = [], G = Z.pop, X = Z.push, V = Z.push, K = Z.slice,
                ee = Z.indexOf || function (e) {
                    for (var t = 0, n = this.length; n > t; t++)
                        if (this[t] === e)
                            return t;
                    return -1
                }
                ,
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ie = re.replace("w", "w#"),
                ae = "\\[" + ne + "*(" + re + ")" + ne + "*(?:([*^$|!~]?=)" + ne + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ie + ")|)|)" + ne + "*\\]",
                oe = ":(" + re + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ae.replace(3, 8) + ")*)|.*)\\)|)",
                se = RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                le = RegExp("^" + ne + "*," + ne + "*"), ce = RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                de = RegExp(ne + "*[+~]"), fe = RegExp("=" + ne + "*([^\\]'\"]*)" + ne + "*\\]", "g"), pe = RegExp(oe),
                he = RegExp("^" + ie + "$"), ye = {
                    ID: RegExp("^#(" + re + ")"),
                    CLASS: RegExp("^\\.(" + re + ")"),
                    TAG: RegExp("^(" + re.replace("w", "w*") + ")"),
                    ATTR: RegExp("^" + ae),
                    PSEUDO: RegExp("^" + oe),
                    CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: RegExp("^(?:" + te + ")$", "i"),
                    needsContext: RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                }, me = /^[^{]+\{\s*\[native \w/, ge = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ve = /^(?:input|select|textarea|button)$/i, _e = /^h\d$/i, we = /'|\\/g,
                be = RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), xe = function (e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
                };
            try {
                V.apply(Z = K.call(H.childNodes), H.childNodes),
                    Z[H.childNodes.length].nodeType
            } catch (e) {
                V = {
                    apply: Z.length ? function (e, t) {
                            X.apply(e, K.call(t))
                        }
                        : function (e, t) {
                            for (var n = e.length, r = 0; e[n++] = t[r++];)
                                ;
                            e.length = n - 1
                        }
                }
            }
            C = n.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }
                ,
                b = n.support = {},
                j = n.setDocument = function (e) {
                    var n = e ? e.ownerDocument || e : H
                        , r = n.defaultView;
                    return n !== M && 9 === n.nodeType && n.documentElement ? (M = n,
                        O = n.documentElement,
                        E = !C(n),
                    r && r.attachEvent && r !== r.top && r.attachEvent("onbeforeunload", function () {
                        j()
                    }),
                        b.attributes = a(function (e) {
                            return e.className = "i",
                                !e.getAttribute("className")
                        }),
                        b.getElementsByTagName = a(function (e) {
                            return e.appendChild(n.createComment("")),
                                !e.getElementsByTagName("*").length
                        }),
                        b.getElementsByClassName = a(function (e) {
                            return e.innerHTML = "<div class='a'></div><div class='a i'></div>",
                                e.firstChild.className = "i",
                            2 === e.getElementsByClassName("i").length
                        }),
                        b.getById = a(function (e) {
                            return O.appendChild(e).id = F,
                            !n.getElementsByName || !n.getElementsByName(F).length
                        }),
                        b.getById ? (k.find.ID = function (e, t) {
                                if (typeof t.getElementById !== Q && E) {
                                    var n = t.getElementById(e);
                                    return n && n.parentNode ? [n] : []
                                }
                            }
                                ,
                                k.filter.ID = function (e) {
                                    var t = e.replace(be, xe);
                                    return function (e) {
                                        return e.getAttribute("id") === t
                                    }
                                }
                        ) : (delete k.find.ID,
                                k.filter.ID = function (e) {
                                    var t = e.replace(be, xe);
                                    return function (e) {
                                        var n = typeof e.getAttributeNode !== Q && e.getAttributeNode("id");
                                        return n && n.value === t
                                    }
                                }
                        ),
                        k.find.TAG = b.getElementsByTagName ? function (e, n) {
                                return typeof n.getElementsByTagName !== Q ? n.getElementsByTagName(e) : t
                            }
                            : function (e, t) {
                                var n, r = [], i = 0, a = t.getElementsByTagName(e);
                                if ("*" === e) {
                                    for (; n = a[i++];)
                                        1 === n.nodeType && r.push(n);
                                    return r
                                }
                                return a
                            }
                        ,
                        k.find.CLASS = b.getElementsByClassName && function (e, n) {
                            return typeof n.getElementsByClassName !== Q && E ? n.getElementsByClassName(e) : t
                        }
                        ,
                        A = [],
                        q = [],
                    (b.qsa = me.test(n.querySelectorAll)) && (a(function (e) {
                        e.innerHTML = "<select><option selected=''></option></select>",
                        e.querySelectorAll("[selected]").length || q.push("\\[" + ne + "*(?:value|" + te + ")"),
                        e.querySelectorAll(":checked").length || q.push(":checked")
                    }),
                        a(function (e) {
                            var t = n.createElement("input");
                            t.setAttribute("type", "hidden"),
                                e.appendChild(t).setAttribute("t", ""),
                            e.querySelectorAll("[t^='']").length && q.push("[*^$]=" + ne + "*(?:''|\"\")"),
                            e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"),
                                e.querySelectorAll("*,:x"),
                                q.push(",.*:")
                        })),
                    (b.matchesSelector = me.test(I = O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && a(function (e) {
                        b.disconnectedMatch = I.call(e, "div"),
                            I.call(e, "[s!='']:x"),
                            A.push("!=", oe)
                    }),
                        q = q.length && RegExp(q.join("|")),
                        A = A.length && RegExp(A.join("|")),
                        L = me.test(O.contains) || O.compareDocumentPosition ? function (e, t) {
                                var n = 9 === e.nodeType ? e.documentElement : e
                                    , r = t && t.parentNode;
                                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                            }
                            : function (e, t) {
                                if (t)
                                    for (; t = t.parentNode;)
                                        if (t === e)
                                            return !0;
                                return !1
                            }
                        ,
                        z = O.compareDocumentPosition ? function (e, t) {
                                if (e === t)
                                    return $ = !0,
                                        0;
                                var r = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
                                return r ? 1 & r || !b.sortDetached && t.compareDocumentPosition(e) === r ? e === n || L(H, e) ? -1 : t === n || L(H, t) ? 1 : N ? ee.call(N, e) - ee.call(N, t) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                            }
                            : function (e, t) {
                                var r, i = 0, a = e.parentNode, o = t.parentNode, l = [e], c = [t];
                                if (e === t)
                                    return $ = !0,
                                        0;
                                if (!a || !o)
                                    return e === n ? -1 : t === n ? 1 : a ? -1 : o ? 1 : N ? ee.call(N, e) - ee.call(N, t) : 0;
                                if (a === o)
                                    return s(e, t);
                                for (r = e; r = r.parentNode;)
                                    l.unshift(r);
                                for (r = t; r = r.parentNode;)
                                    c.unshift(r);
                                for (; l[i] === c[i];)
                                    i++;
                                return i ? s(l[i], c[i]) : l[i] === H ? -1 : c[i] === H ? 1 : 0
                            }
                        ,
                        n) : M
                }
                ,
                n.matches = function (e, t) {
                    return n(e, null, null, t)
                }
                ,
                n.matchesSelector = function (e, t) {
                    if ((e.ownerDocument || e) !== M && j(e),
                        t = t.replace(fe, "='$1']"),
                        !(!b.matchesSelector || !E || A && A.test(t) || q && q.test(t)))
                        try {
                            var r = I.call(e, t);
                            if (r || b.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                                return r
                        } catch (e) {
                        }
                    return n(t, M, null, [e]).length > 0
                }
                ,
                n.contains = function (e, t) {
                    return (e.ownerDocument || e) !== M && j(e),
                        L(e, t)
                }
                ,
                n.attr = function (e, n) {
                    (e.ownerDocument || e) !== M && j(e);
                    var r = k.attrHandle[n.toLowerCase()]
                        , i = r && J.call(k.attrHandle, n.toLowerCase()) ? r(e, n, !E) : t;
                    return i === t ? b.attributes || !E ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null : i
                }
                ,
                n.error = function (e) {
                    throw Error("Syntax error, unrecognized expression: " + e)
                }
                ,
                n.uniqueSort = function (e) {
                    var t, n = [], r = 0, i = 0;
                    if ($ = !b.detectDuplicates,
                        N = !b.sortStable && e.slice(0),
                        e.sort(z),
                        $) {
                        for (; t = e[i++];)
                            t === e[i] && (r = n.push(i));
                        for (; r--;)
                            e.splice(n[r], 1)
                    }
                    return e
                }
                ,
                T = n.getText = function (e) {
                    var t, n = "", r = 0, i = e.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof e.textContent)
                                return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling)
                                n += T(e)
                        } else if (3 === i || 4 === i)
                            return e.nodeValue
                    } else
                        for (; t = e[r]; r++)
                            n += T(t);
                    return n
                }
                ,
                k = n.selectors = {
                    cacheLength: 50,
                    createPseudo: i,
                    match: ye,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function (e) {
                            return e[1] = e[1].replace(be, xe),
                                e[3] = (e[4] || e[5] || "").replace(be, xe),
                            "~=" === e[2] && (e[3] = " " + e[3] + " "),
                                e.slice(0, 4)
                        },
                        CHILD: function (e) {
                            return e[1] = e[1].toLowerCase(),
                                "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]),
                                    e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                                    e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]),
                                e
                        },
                        PSEUDO: function (e) {
                            var n, r = !e[5] && e[2];
                            return ye.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && pe.test(r) && (n = u(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n),
                                e[2] = r.slice(0, n)),
                                e.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function (e) {
                            var t = e.replace(be, xe).toLowerCase();
                            return "*" === e ? function () {
                                    return !0
                                }
                                : function (e) {
                                    return e.nodeName && e.nodeName.toLowerCase() === t
                                }
                        },
                        CLASS: function (e) {
                            var t = B[e + " "];
                            return t || (t = RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && B(e, function (e) {
                                return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Q && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function (e, t, r) {
                            return function (i) {
                                var a = n.attr(i, e);
                                return null == a ? "!=" === t : !t || (a += "",
                                    "=" === t ? a === r : "!=" === t ? a !== r : "^=" === t ? r && 0 === a.indexOf(r) : "*=" === t ? r && a.indexOf(r) > -1 : "$=" === t ? r && a.slice(-r.length) === r : "~=" === t ? (" " + a + " ").indexOf(r) > -1 : "|=" === t && (a === r || a.slice(0, r.length + 1) === r + "-"))
                            }
                        },
                        CHILD: function (e, t, n, r, i) {
                            var a = "nth" !== e.slice(0, 3)
                                , o = "last" !== e.slice(-4)
                                , s = "of-type" === t;
                            return 1 === r && 0 === i ? function (e) {
                                    return !!e.parentNode
                                }
                                : function (t, n, l) {
                                    var c, u, d, f, p, h, y = a !== o ? "nextSibling" : "previousSibling",
                                        m = t.parentNode, g = s && t.nodeName.toLowerCase(), v = !l && !s;
                                    if (m) {
                                        if (a) {
                                            for (; y;) {
                                                for (d = t; d = d[y];)
                                                    if (s ? d.nodeName.toLowerCase() === g : 1 === d.nodeType)
                                                        return !1;
                                                h = y = "only" === e && !h && "nextSibling"
                                            }
                                            return !0
                                        }
                                        if (h = [o ? m.firstChild : m.lastChild],
                                        o && v) {
                                            for (u = m[F] || (m[F] = {}),
                                                     c = u[e] || [],
                                                     p = c[0] === P && c[1],
                                                     f = c[0] === P && c[2],
                                                     d = p && m.childNodes[p]; d = ++p && d && d[y] || (f = p = 0) || h.pop();)
                                                if (1 === d.nodeType && ++f && d === t) {
                                                    u[e] = [P, p, f];
                                                    break
                                                }
                                        } else if (v && (c = (t[F] || (t[F] = {}))[e]) && c[0] === P)
                                            f = c[1];
                                        else
                                            for (; (d = ++p && d && d[y] || (f = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== g : 1 !== d.nodeType) || !++f || (v && ((d[F] || (d[F] = {}))[e] = [P, f]),
                                            d !== t));)
                                                ;
                                        return (f -= i) === r || 0 == f % r && f / r >= 0
                                    }
                                }
                        },
                        PSEUDO: function (e, t) {
                            var r,
                                a = k.pseudos[e] || k.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                            return a[F] ? a(t) : a.length > 1 ? (r = [e, e, "", t],
                                    k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, n) {
                                        for (var r, i = a(e, t), o = i.length; o--;)
                                            r = ee.call(e, i[o]),
                                                e[r] = !(n[r] = i[o])
                                    }) : function (e) {
                                        return a(e, 0, r)
                                    }
                            ) : a
                        }
                    },
                    pseudos: {
                        not: i(function (e) {
                            var t = []
                                , n = []
                                , r = D(e.replace(se, "$1"));
                            return r[F] ? i(function (e, t, n, i) {
                                for (var a, o = r(e, null, i, []), s = e.length; s--;)
                                    (a = o[s]) && (e[s] = !(t[s] = a))
                            }) : function (e, i, a) {
                                return t[0] = e,
                                    r(t, null, a, n),
                                    !n.pop()
                            }
                        }),
                        has: i(function (e) {
                            return function (t) {
                                return n(e, t).length > 0
                            }
                        }),
                        contains: i(function (e) {
                            return function (t) {
                                return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                            }
                        }),
                        lang: i(function (e) {
                            return he.test(e || "") || n.error("unsupported lang: " + e),
                                e = e.replace(be, xe).toLowerCase(),
                                function (t) {
                                    var n;
                                    do {
                                        if (n = E ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                            return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function (t) {
                            var n = e.location && e.location.hash;
                            return n && n.slice(1) === t.id
                        },
                        root: function (e) {
                            return e === O
                        },
                        focus: function (e) {
                            return e === M.activeElement && (!M.hasFocus || M.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        enabled: function (e) {
                            return !1 === e.disabled
                        },
                        disabled: function (e) {
                            return !0 === e.disabled
                        },
                        checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && !!e.checked || "option" === t && !!e.selected
                        },
                        selected: function (e) {
                            return e.parentNode && e.parentNode.selectedIndex,
                            !0 === e.selected
                        },
                        empty: function (e) {
                            for (e = e.firstChild; e; e = e.nextSibling)
                                if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType)
                                    return !1;
                            return !0
                        },
                        parent: function (e) {
                            return !k.pseudos.empty(e)
                        },
                        header: function (e) {
                            return _e.test(e.nodeName)
                        },
                        input: function (e) {
                            return ve.test(e.nodeName)
                        },
                        button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return "input" === t && "button" === e.type || "button" === t
                        },
                        text: function (e) {
                            var t;
                            return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                        },
                        first: l(function () {
                            return [0]
                        }),
                        last: l(function (e, t) {
                            return [t - 1]
                        }),
                        eq: l(function (e, t, n) {
                            return [0 > n ? n + t : n]
                        }),
                        even: l(function (e, t) {
                            for (var n = 0; t > n; n += 2)
                                e.push(n);
                            return e
                        }),
                        odd: l(function (e, t) {
                            for (var n = 1; t > n; n += 2)
                                e.push(n);
                            return e
                        }),
                        lt: l(function (e, t, n) {
                            for (var r = 0 > n ? n + t : n; --r >= 0;)
                                e.push(r);
                            return e
                        }),
                        gt: l(function (e, t, n) {
                            for (var r = 0 > n ? n + t : n; t > ++r;)
                                e.push(r);
                            return e
                        })
                    }
                },
                k.pseudos.nth = k.pseudos.eq;
            for (w in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
                k.pseudos[w] = function (e) {
                    return function (t) {
                        return "input" === t.nodeName.toLowerCase() && t.type === e
                    }
                }(w);
            for (w in {
                submit: !0,
                reset: !0
            })
                k.pseudos[w] = function (e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }(w);
            c.prototype = k.filters = k.pseudos,
                k.setFilters = new c,
                D = n.compile = function (e, t) {
                    var n, r = [], i = [], a = W[e + " "];
                    if (!a) {
                        for (t || (t = u(e)),
                                 n = t.length; n--;)
                            a = m(t[n]),
                                a[F] ? r.push(a) : i.push(a);
                        a = W(e, g(i, r))
                    }
                    return a
                }
                ,
                b.sortStable = F.split("").sort(z).join("") === F,
                b.detectDuplicates = $,
                j(),
                b.sortDetached = a(function (e) {
                    return 1 & e.compareDocumentPosition(M.createElement("div"))
                }),
            a(function (e) {
                return e.innerHTML = "<a href='#'></a>",
                "#" === e.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function (e, n, r) {
                return r ? t : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2)
            }),
            b.attributes && a(function (e) {
                return e.innerHTML = "<input/>",
                    e.firstChild.setAttribute("value", ""),
                "" === e.firstChild.getAttribute("value")
            }) || o("value", function (e, n, r) {
                return r || "input" !== e.nodeName.toLowerCase() ? t : e.defaultValue
            }),
            a(function (e) {
                return null == e.getAttribute("disabled")
            }) || o(te, function (e, n, r) {
                var i;
                return r ? t : (i = e.getAttributeNode(n)) && i.specified ? i.value : !0 === e[n] ? n.toLowerCase() : null
            }),
                ue.find = n,
                ue.expr = n.selectors,
                ue.expr[":"] = ue.expr.pseudos,
                ue.unique = n.uniqueSort,
                ue.text = n.getText,
                ue.isXMLDoc = n.isXML,
                ue.contains = n.contains
        }(e);
    var Ce = {};
    ue.Callbacks = function (e) {
        e = "string" == typeof e ? Ce[e] || r(e) : ue.extend({}, e);
        var n, i, a, o, s, l, c = [], u = !e.once && [], d = function (t) {
            for (i = e.memory && t,
                     a = !0,
                     s = l || 0,
                     l = 0,
                     o = c.length,
                     n = !0; c && o > s; s++)
                if (!1 === c[s].apply(t[0], t[1]) && e.stopOnFalse) {
                    i = !1;
                    break
                }
            n = !1,
            c && (u ? u.length && d(u.shift()) : i ? c = [] : f.disable())
        }, f = {
            add: function () {
                if (c) {
                    var t = c.length;
                    (function t(n) {
                            ue.each(n, function (n, r) {
                                var i = ue.type(r);
                                "function" === i ? e.unique && f.has(r) || c.push(r) : r && r.length && "string" !== i && t(r)
                            })
                        }
                    )(arguments),
                        n ? o = c.length : i && (l = t,
                            d(i))
                }
                return this
            },
            remove: function () {
                return c && ue.each(arguments, function (e, t) {
                    for (var r; (r = ue.inArray(t, c, r)) > -1;)
                        c.splice(r, 1),
                        n && (o >= r && o--,
                        s >= r && s--)
                }),
                    this
            },
            has: function (e) {
                return e ? ue.inArray(e, c) > -1 : !(!c || !c.length)
            },
            empty: function () {
                return c = [],
                    o = 0,
                    this
            },
            disable: function () {
                return c = u = i = t,
                    this
            },
            disabled: function () {
                return !c
            },
            lock: function () {
                return u = t,
                i || f.disable(),
                    this
            },
            locked: function () {
                return !u
            },
            fireWith: function (e, t) {
                return !c || a && !u || (t = t || [],
                    t = [e, t.slice ? t.slice() : t],
                    n ? u.push(t) : d(t)),
                    this
            },
            fire: function () {
                return f.fireWith(this, arguments),
                    this
            },
            fired: function () {
                return !!a
            }
        };
        return f
    }
        ,
        ue.extend({
            Deferred: function (e) {
                var t = [["resolve", "done", ue.Callbacks("once memory"), "resolved"], ["reject", "fail", ue.Callbacks("once memory"), "rejected"], ["notify", "progress", ue.Callbacks("memory")]]
                    , n = "pending"
                    , r = {
                    state: function () {
                        return n
                    },
                    always: function () {
                        return i.done(arguments).fail(arguments),
                            this
                    },
                    then: function () {
                        var e = arguments;
                        return ue.Deferred(function (n) {
                            ue.each(t, function (t, a) {
                                var o = a[0]
                                    , s = ue.isFunction(e[t]) && e[t];
                                i[a[1]](function () {
                                    var e = s && s.apply(this, arguments);
                                    e && ue.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                                })
                            }),
                                e = null
                        }).promise()
                    },
                    promise: function (e) {
                        return null != e ? ue.extend(e, r) : r
                    }
                }
                    , i = {};
                return r.pipe = r.then,
                    ue.each(t, function (e, a) {
                        var o = a[2]
                            , s = a[3];
                        r[a[1]] = o.add,
                        s && o.add(function () {
                            n = s
                        }, t[1 ^ e][2].disable, t[2][2].lock),
                            i[a[0]] = function () {
                                return i[a[0] + "With"](this === i ? r : this, arguments),
                                    this
                            }
                            ,
                            i[a[0] + "With"] = o.fireWith
                    }),
                    r.promise(i),
                e && e.call(i, i),
                    i
            },
            when: function (e) {
                var t, n, r, i = 0, a = ae.call(arguments), o = a.length,
                    s = 1 !== o || e && ue.isFunction(e.promise) ? o : 0, l = 1 === s ? e : ue.Deferred(),
                    c = function (e, n, r) {
                        return function (i) {
                            n[e] = this,
                                r[e] = arguments.length > 1 ? ae.call(arguments) : i,
                                r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                        }
                    };
                if (o > 1)
                    for (t = Array(o),
                             n = Array(o),
                             r = Array(o); o > i; i++)
                        a[i] && ue.isFunction(a[i].promise) ? a[i].promise().done(c(i, r, a)).fail(l.reject).progress(c(i, n, t)) : --s;
                return s || l.resolveWith(r, a),
                    l.promise()
            }
        }),
        ue.support = function (t) {
            var n, r, i, a, o, s, l, c, u, d = G.createElement("div");
            if (d.setAttribute("className", "t"),
                d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                n = d.getElementsByTagName("*") || [],
            !(r = d.getElementsByTagName("a")[0]) || !r.style || !n.length)
                return t;
            a = G.createElement("select"),
                s = a.appendChild(G.createElement("option")),
                i = d.getElementsByTagName("input")[0],
                r.style.cssText = "top:1px;float:left;opacity:.5",
                t.getSetAttribute = "t" !== d.className,
                t.leadingWhitespace = 3 === d.firstChild.nodeType,
                t.tbody = !d.getElementsByTagName("tbody").length,
                t.htmlSerialize = !!d.getElementsByTagName("link").length,
                t.style = /top/.test(r.getAttribute("style")),
                t.hrefNormalized = "/a" === r.getAttribute("href"),
                t.opacity = /^0.5/.test(r.style.opacity),
                t.cssFloat = !!r.style.cssFloat,
                t.checkOn = !!i.value,
                t.optSelected = s.selected,
                t.enctype = !!G.createElement("form").enctype,
                t.html5Clone = "<:nav></:nav>" !== G.createElement("nav").cloneNode(!0).outerHTML,
                t.inlineBlockNeedsLayout = !1,
                t.shrinkWrapBlocks = !1,
                t.pixelPosition = !1,
                t.deleteExpando = !0,
                t.noCloneEvent = !0,
                t.reliableMarginRight = !0,
                t.boxSizingReliable = !0,
                i.checked = !0,
                t.noCloneChecked = i.cloneNode(!0).checked,
                a.disabled = !0,
                t.optDisabled = !s.disabled;
            try {
                delete d.test
            } catch (e) {
                t.deleteExpando = !1
            }
            i = G.createElement("input"),
                i.setAttribute("value", ""),
                t.input = "" === i.getAttribute("value"),
                i.value = "t",
                i.setAttribute("type", "radio"),
                t.radioValue = "t" === i.value,
                i.setAttribute("checked", "t"),
                i.setAttribute("name", "t"),
                o = G.createDocumentFragment(),
                o.appendChild(i),
                t.appendChecked = i.checked,
                t.checkClone = o.cloneNode(!0).cloneNode(!0).lastChild.checked,
            d.attachEvent && (d.attachEvent("onclick", function () {
                t.noCloneEvent = !1
            }),
                d.cloneNode(!0).click());
            for (u in {
                submit: !0,
                change: !0,
                focusin: !0
            })
                d.setAttribute(l = "on" + u, "t"),
                    t[u + "Bubbles"] = l in e || !1 === d.attributes[l].expando;
            d.style.backgroundClip = "content-box",
                d.cloneNode(!0).style.backgroundClip = "",
                t.clearCloneStyle = "content-box" === d.style.backgroundClip;
            for (u in ue(t))
                break;
            return t.ownLast = "0" !== u,
                ue(function () {
                    var n, r, i,
                        a = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                        o = G.getElementsByTagName("body")[0];
                    o && (n = G.createElement("div"),
                        n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",
                        o.appendChild(n).appendChild(d),
                        d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                        i = d.getElementsByTagName("td"),
                        i[0].style.cssText = "padding:0;margin:0;border:0;display:none",
                        c = 0 === i[0].offsetHeight,
                        i[0].style.display = "",
                        i[1].style.display = "none",
                        t.reliableHiddenOffsets = c && 0 === i[0].offsetHeight,
                        d.innerHTML = "",
                        d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
                        ue.swap(o, null != o.style.zoom ? {
                            zoom: 1
                        } : {}, function () {
                            t.boxSizing = 4 === d.offsetWidth
                        }),
                    e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top,
                        t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
                            width: "4px"
                        }).width,
                        r = d.appendChild(G.createElement("div")),
                        r.style.cssText = d.style.cssText = a,
                        r.style.marginRight = r.style.width = "0",
                        d.style.width = "1px",
                        t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)),
                    typeof d.style.zoom !== J && (d.innerHTML = "",
                        d.style.cssText = a + "width:1px;padding:1px;display:inline;zoom:1",
                        t.inlineBlockNeedsLayout = 3 === d.offsetWidth,
                        d.style.display = "block",
                        d.innerHTML = "<div></div>",
                        d.firstChild.style.width = "5px",
                        t.shrinkWrapBlocks = 3 !== d.offsetWidth,
                    t.inlineBlockNeedsLayout && (o.style.zoom = 1)),
                        o.removeChild(n),
                        n = d = i = r = null)
                }),
                n = a = o = s = r = i = null,
                t
        }({});
    var De = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
        , Se = /([A-Z])/g;
    ue.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function (e) {
            return !!(e = e.nodeType ? ue.cache[e[ue.expando]] : e[ue.expando]) && !s(e)
        },
        data: function (e, t, n) {
            return i(e, t, n)
        },
        removeData: function (e, t) {
            return a(e, t)
        },
        _data: function (e, t, n) {
            return i(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return a(e, t, !0)
        },
        acceptData: function (e) {
            if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType)
                return !1;
            var t = e.nodeName && ue.noData[e.nodeName.toLowerCase()];
            return !t || !0 !== t && e.getAttribute("classid") === t
        }
    }),
        ue.fn.extend({
            data: function (e, n) {
                var r, i, a = null, s = 0, l = this[0];
                if (e === t) {
                    if (this.length && (a = ue.data(l),
                    1 === l.nodeType && !ue._data(l, "parsedAttrs"))) {
                        for (r = l.attributes; r.length > s; s++)
                            i = r[s].name,
                            0 === i.indexOf("data-") && (i = ue.camelCase(i.slice(5)),
                                o(l, i, a[i]));
                        ue._data(l, "parsedAttrs", !0)
                    }
                    return a
                }
                return "object" == typeof e ? this.each(function () {
                    ue.data(this, e)
                }) : arguments.length > 1 ? this.each(function () {
                    ue.data(this, e, n)
                }) : l ? o(l, e, ue.data(l, e)) : null
            },
            removeData: function (e) {
                return this.each(function () {
                    ue.removeData(this, e)
                })
            }
        }),
        ue.extend({
            queue: function (e, n, r) {
                var i;
                return e ? (n = (n || "fx") + "queue",
                    i = ue._data(e, n),
                r && (!i || ue.isArray(r) ? i = ue._data(e, n, ue.makeArray(r)) : i.push(r)),
                i || []) : t
            },
            dequeue: function (e, t) {
                t = t || "fx";
                var n = ue.queue(e, t)
                    , r = n.length
                    , i = n.shift()
                    , a = ue._queueHooks(e, t)
                    , o = function () {
                    ue.dequeue(e, t)
                };
                "inprogress" === i && (i = n.shift(),
                    r--),
                i && ("fx" === t && n.unshift("inprogress"),
                    delete a.stop,
                    i.call(e, o, a)),
                !r && a && a.empty.fire()
            },
            _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return ue._data(e, n) || ue._data(e, n, {
                    empty: ue.Callbacks("once memory").add(function () {
                        ue._removeData(e, t + "queue"),
                            ue._removeData(e, n)
                    })
                })
            }
        }),
        ue.fn.extend({
            queue: function (e, n) {
                var r = 2;
                return "string" != typeof e && (n = e,
                    e = "fx",
                    r--),
                    r > arguments.length ? ue.queue(this[0], e) : n === t ? this : this.each(function () {
                        var t = ue.queue(this, e, n);
                        ue._queueHooks(this, e),
                        "fx" === e && "inprogress" !== t[0] && ue.dequeue(this, e)
                    })
            },
            dequeue: function (e) {
                return this.each(function () {
                    ue.dequeue(this, e)
                })
            },
            delay: function (e, t) {
                return e = ue.fx ? ue.fx.speeds[e] || e : e,
                    t = t || "fx",
                    this.queue(t, function (t, n) {
                        var r = setTimeout(t, e);
                        n.stop = function () {
                            clearTimeout(r)
                        }
                    })
            },
            clearQueue: function (e) {
                return this.queue(e || "fx", [])
            },
            promise: function (e, n) {
                var r, i = 1, a = ue.Deferred(), o = this, s = this.length, l = function () {
                    --i || a.resolveWith(o, [o])
                };
                for ("string" != typeof e && (n = e,
                    e = t),
                         e = e || "fx"; s--;)
                    (r = ue._data(o[s], e + "queueHooks")) && r.empty && (i++,
                        r.empty.add(l));
                return l(),
                    a.promise(n)
            }
        });
    var Ne, je, Me = /[\t\r\n\f]/g, Oe = /\r/g, Ee = /^(?:input|select|textarea|button|object)$/i, qe = /^(?:a|area)$/i,
        Ae = /^(?:checked|selected)$/i, Ie = ue.support.getSetAttribute, Le = ue.support.input;
    ue.fn.extend({
        attr: function (e, t) {
            return ue.access(this, ue.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each(function () {
                ue.removeAttr(this, e)
            })
        },
        prop: function (e, t) {
            return ue.access(this, ue.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return e = ue.propFix[e] || e,
                this.each(function () {
                    try {
                        this[e] = t,
                            delete this[e]
                    } catch (e) {
                    }
                })
        },
        addClass: function (e) {
            var t, n, r, i, a, o = 0, s = this.length, l = "string" == typeof e && e;
            if (ue.isFunction(e))
                return this.each(function (t) {
                    ue(this).addClass(e.call(this, t, this.className))
                });
            if (l)
                for (t = (e || "").match(fe) || []; s > o; o++)
                    if (n = this[o],
                        r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Me, " ") : " ")) {
                        for (a = 0; i = t[a++];)
                            0 > r.indexOf(" " + i + " ") && (r += i + " ");
                        n.className = ue.trim(r)
                    }
            return this
        },
        removeClass: function (e) {
            var t, n, r, i, a, o = 0, s = this.length, l = 0 === arguments.length || "string" == typeof e && e;
            if (ue.isFunction(e))
                return this.each(function (t) {
                    ue(this).removeClass(e.call(this, t, this.className))
                });
            if (l)
                for (t = (e || "").match(fe) || []; s > o; o++)
                    if (n = this[o],
                        r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Me, " ") : "")) {
                        for (a = 0; i = t[a++];)
                            for (; r.indexOf(" " + i + " ") >= 0;)
                                r = r.replace(" " + i + " ", " ");
                        n.className = e ? ue.trim(r) : ""
                    }
            return this
        },
        toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : ue.isFunction(e) ? this.each(function (n) {
                ue(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function () {
                if ("string" === n)
                    for (var t, r = 0, i = ue(this), a = e.match(fe) || []; t = a[r++];)
                        i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else
                    (n === J || "boolean" === n) && (this.className && ue._data(this, "__className__", this.className),
                        this.className = this.className || !1 === e ? "" : ue._data(this, "__className__") || "")
            })
        },
        hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Me, " ").indexOf(t) >= 0)
                    return !0;
            return !1
        },
        val: function (e) {
            var n, r, i, a = this[0];
            return arguments.length ? (i = ue.isFunction(e),
                this.each(function (n) {
                    var a;
                    1 === this.nodeType && (a = i ? e.call(this, n, ue(this).val()) : e,
                        null == a ? a = "" : "number" == typeof a ? a += "" : ue.isArray(a) && (a = ue.map(a, function (e) {
                            return null == e ? "" : e + ""
                        })),
                    (r = ue.valHooks[this.type] || ue.valHooks[this.nodeName.toLowerCase()]) && "set" in r && r.set(this, a, "value") !== t || (this.value = a))
                })) : a ? (r = ue.valHooks[a.type] || ue.valHooks[a.nodeName.toLowerCase()],
                r && "get" in r && (n = r.get(a, "value")) !== t ? n : (n = a.value,
                    "string" == typeof n ? n.replace(Oe, "") : null == n ? "" : n)) : void 0
        }
    }),
        ue.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = ue.find.attr(e, "value");
                        return null != t ? t : e.text
                    }
                },
                select: {
                    get: function (e) {
                        for (var t, n, r = e.options, i = e.selectedIndex, a = "select-one" === e.type || 0 > i, o = a ? null : [], s = a ? i + 1 : r.length, l = 0 > i ? s : a ? i : 0; s > l; l++)
                            if (n = r[l],
                                !(!n.selected && l !== i || (ue.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ue.nodeName(n.parentNode, "optgroup"))) {
                                if (t = ue(n).val(),
                                    a)
                                    return t;
                                o.push(t)
                            }
                        return o
                    },
                    set: function (e, t) {
                        for (var n, r, i = e.options, a = ue.makeArray(t), o = i.length; o--;)
                            r = i[o],
                            (r.selected = ue.inArray(ue(r).val(), a) >= 0) && (n = !0);
                        return n || (e.selectedIndex = -1),
                            a
                    }
                }
            },
            attr: function (e, n, r) {
                var i, a, o = e.nodeType;
                if (e && 3 !== o && 8 !== o && 2 !== o)
                    return typeof e.getAttribute === J ? ue.prop(e, n, r) : (1 === o && ue.isXMLDoc(e) || (n = n.toLowerCase(),
                        i = ue.attrHooks[n] || (ue.expr.match.bool.test(n) ? je : Ne)),
                        r === t ? i && "get" in i && null !== (a = i.get(e, n)) ? a : (a = ue.find.attr(e, n),
                            null == a ? t : a) : null !== r ? i && "set" in i && (a = i.set(e, r, n)) !== t ? a : (e.setAttribute(n, r + ""),
                            r) : (ue.removeAttr(e, n),
                            t))
            },
            removeAttr: function (e, t) {
                var n, r, i = 0, a = t && t.match(fe);
                if (a && 1 === e.nodeType)
                    for (; n = a[i++];)
                        r = ue.propFix[n] || n,
                            ue.expr.match.bool.test(n) ? Le && Ie || !Ae.test(n) ? e[r] = !1 : e[ue.camelCase("default-" + n)] = e[r] = !1 : ue.attr(e, n, ""),
                            e.removeAttribute(Ie ? n : r)
            },
            attrHooks: {
                type: {
                    set: function (e, t) {
                        if (!ue.support.radioValue && "radio" === t && ue.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t),
                            n && (e.value = n),
                                t
                        }
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            },
            prop: function (e, n, r) {
                var i, a, o, s = e.nodeType;
                if (e && 3 !== s && 8 !== s && 2 !== s)
                    return o = 1 !== s || !ue.isXMLDoc(e),
                    o && (n = ue.propFix[n] || n,
                        a = ue.propHooks[n]),
                        r !== t ? a && "set" in a && (i = a.set(e, r, n)) !== t ? i : e[n] = r : a && "get" in a && null !== (i = a.get(e, n)) ? i : e[n]
            },
            propHooks: {
                tabIndex: {
                    get: function (e) {
                        var t = ue.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : Ee.test(e.nodeName) || qe.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            }
        }),
        je = {
            set: function (e, t, n) {
                return !1 === t ? ue.removeAttr(e, n) : Le && Ie || !Ae.test(n) ? e.setAttribute(!Ie && ue.propFix[n] || n, n) : e[ue.camelCase("default-" + n)] = e[n] = !0,
                    n
            }
        },
        ue.each(ue.expr.match.bool.source.match(/\w+/g), function (e, n) {
            var r = ue.expr.attrHandle[n] || ue.find.attr;
            ue.expr.attrHandle[n] = Le && Ie || !Ae.test(n) ? function (e, n, i) {
                    var a = ue.expr.attrHandle[n]
                        , o = i ? t : (ue.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
                    return ue.expr.attrHandle[n] = a,
                        o
                }
                : function (e, n, r) {
                    return r ? t : e[ue.camelCase("default-" + n)] ? n.toLowerCase() : null
                }
        }),
    Le && Ie || (ue.attrHooks.value = {
        set: function (e, n, r) {
            return ue.nodeName(e, "input") ? (e.defaultValue = n,
                t) : Ne && Ne.set(e, n, r)
        }
    }),
    Ie || (Ne = {
        set: function (e, n, r) {
            var i = e.getAttributeNode(r);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)),
                i.value = n += "",
                "value" === r || n === e.getAttribute(r) ? n : t
        }
    },
        ue.expr.attrHandle.id = ue.expr.attrHandle.name = ue.expr.attrHandle.coords = function (e, n, r) {
            var i;
            return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null
        }
        ,
        ue.valHooks.button = {
            get: function (e, n) {
                var r = e.getAttributeNode(n);
                return r && r.specified ? r.value : t
            },
            set: Ne.set
        },
        ue.attrHooks.contenteditable = {
            set: function (e, t, n) {
                Ne.set(e, "" !== t && t, n)
            }
        },
        ue.each(["width", "height"], function (e, n) {
            ue.attrHooks[n] = {
                set: function (e, r) {
                    return "" === r ? (e.setAttribute(n, "auto"),
                        r) : t
                }
            }
        })),
    ue.support.hrefNormalized || ue.each(["href", "src"], function (e, t) {
        ue.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    }),
    ue.support.style || (ue.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || t
        },
        set: function (e, t) {
            return e.style.cssText = t + ""
        }
    }),
    ue.support.optSelected || (ue.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex,
            t.parentNode && t.parentNode.selectedIndex),
                null
        }
    }),
        ue.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            ue.propFix[this.toLowerCase()] = this
        }),
    ue.support.enctype || (ue.propFix.enctype = "encoding"),
        ue.each(["radio", "checkbox"], function () {
            ue.valHooks[this] = {
                set: function (e, n) {
                    return ue.isArray(n) ? e.checked = ue.inArray(ue(e).val(), n) >= 0 : t
                }
            },
            ue.support.checkOn || (ue.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                }
            )
        });
    var Fe = /^(?:input|select|textarea)$/i
        , He = /^key/
        , Pe = /^(?:mouse|contextmenu)|click/
        , Ue = /^(?:focusinfocus|focusoutblur)$/
        , Be = /^([^.]*)(?:\.(.+)|)$/;
    ue.event = {
        global: {},
        add: function (e, n, r, i, a) {
            var o, s, l, c, u, d, f, p, h, y, m, g = ue._data(e);
            if (g) {
                for (r.handler && (c = r,
                    r = c.handler,
                    a = c.selector),
                     r.guid || (r.guid = ue.guid++),
                     (s = g.events) || (s = g.events = {}),
                     (d = g.handle) || (d = g.handle = function (e) {
                         return typeof ue === J || e && ue.event.triggered === e.type ? t : ue.event.dispatch.apply(d.elem, arguments)
                     }
                         ,
                         d.elem = e),
                         n = (n || "").match(fe) || [""],
                         l = n.length; l--;)
                    o = Be.exec(n[l]) || [],
                        h = m = o[1],
                        y = (o[2] || "").split(".").sort(),
                    h && (u = ue.event.special[h] || {},
                        h = (a ? u.delegateType : u.bindType) || h,
                        u = ue.event.special[h] || {},
                        f = ue.extend({
                            type: h,
                            origType: m,
                            data: i,
                            handler: r,
                            guid: r.guid,
                            selector: a,
                            needsContext: a && ue.expr.match.needsContext.test(a),
                            namespace: y.join(".")
                        }, c),
                    (p = s[h]) || (p = s[h] = [],
                        p.delegateCount = 0,
                    u.setup && !1 !== u.setup.call(e, i, y, d) || (e.addEventListener ? e.addEventListener(h, d, !1) : e.attachEvent && e.attachEvent("on" + h, d))),
                    u.add && (u.add.call(e, f),
                    f.handler.guid || (f.handler.guid = r.guid)),
                        a ? p.splice(p.delegateCount++, 0, f) : p.push(f),
                        ue.event.global[h] = !0);
                e = null
            }
        },
        remove: function (e, t, n, r, i) {
            var a, o, s, l, c, u, d, f, p, h, y, m = ue.hasData(e) && ue._data(e);
            if (m && (u = m.events)) {
                for (t = (t || "").match(fe) || [""],
                         c = t.length; c--;)
                    if (s = Be.exec(t[c]) || [],
                        p = y = s[1],
                        h = (s[2] || "").split(".").sort(),
                        p) {
                        for (d = ue.event.special[p] || {},
                                 p = (r ? d.delegateType : d.bindType) || p,
                                 f = u[p] || [],
                                 s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                 l = a = f.length; a--;)
                            o = f[a],
                            !i && y !== o.origType || n && n.guid !== o.guid || s && !s.test(o.namespace) || r && r !== o.selector && ("**" !== r || !o.selector) || (f.splice(a, 1),
                            o.selector && f.delegateCount--,
                            d.remove && d.remove.call(e, o));
                        l && !f.length && (d.teardown && !1 !== d.teardown.call(e, h, m.handle) || ue.removeEvent(e, p, m.handle),
                            delete u[p])
                    } else
                        for (p in u)
                            ue.event.remove(e, p + t[c], n, r, !0);
                ue.isEmptyObject(u) && (delete m.handle,
                    ue._removeData(e, "events"))
            }
        },
        trigger: function (n, r, i, a) {
            var o, s, l, c, u, d, f, p = [i || G], h = le.call(n, "type") ? n.type : n,
                y = le.call(n, "namespace") ? n.namespace.split(".") : [];
            if (l = d = i = i || G,
            3 !== i.nodeType && 8 !== i.nodeType && !Ue.test(h + ue.event.triggered) && (h.indexOf(".") >= 0 && (y = h.split("."),
                h = y.shift(),
                y.sort()),
                s = 0 > h.indexOf(":") && "on" + h,
                n = n[ue.expando] ? n : new ue.Event(h, "object" == typeof n && n),
                n.isTrigger = a ? 2 : 3,
                n.namespace = y.join("."),
                n.namespace_re = n.namespace ? RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                n.result = t,
            n.target || (n.target = i),
                r = null == r ? [n] : ue.makeArray(r, [n]),
                u = ue.event.special[h] || {},
            a || !u.trigger || !1 !== u.trigger.apply(i, r))) {
                if (!a && !u.noBubble && !ue.isWindow(i)) {
                    for (c = u.delegateType || h,
                         Ue.test(c + h) || (l = l.parentNode); l; l = l.parentNode)
                        p.push(l),
                            d = l;
                    d === (i.ownerDocument || G) && p.push(d.defaultView || d.parentWindow || e)
                }
                for (f = 0; (l = p[f++]) && !n.isPropagationStopped();)
                    n.type = f > 1 ? c : u.bindType || h,
                        o = (ue._data(l, "events") || {})[n.type] && ue._data(l, "handle"),
                    o && o.apply(l, r),
                    (o = s && l[s]) && ue.acceptData(l) && o.apply && !1 === o.apply(l, r) && n.preventDefault();
                if (n.type = h,
                !a && !n.isDefaultPrevented() && (!u._default || !1 === u._default.apply(p.pop(), r)) && ue.acceptData(i) && s && i[h] && !ue.isWindow(i)) {
                    d = i[s],
                    d && (i[s] = null),
                        ue.event.triggered = h;
                    try {
                        i[h]()
                    } catch (e) {
                    }
                    ue.event.triggered = t,
                    d && (i[s] = d)
                }
                return n.result
            }
        },
        dispatch: function (e) {
            e = ue.event.fix(e);
            var n, r, i, a, o, s = [], l = ae.call(arguments), c = (ue._data(this, "events") || {})[e.type] || [],
                u = ue.event.special[e.type] || {};
            if (l[0] = e,
                e.delegateTarget = this,
            !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                for (s = ue.event.handlers.call(this, e, c),
                         n = 0; (a = s[n++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = a.elem,
                             o = 0; (i = a.handlers[o++]) && !e.isImmediatePropagationStopped();)
                        (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i,
                            e.data = i.data,
                        (r = ((ue.event.special[i.origType] || {}).handle || i.handler).apply(a.elem, l)) !== t && !1 === (e.result = r) && (e.preventDefault(),
                            e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e),
                    e.result
            }
        },
        handlers: function (e, n) {
            var r, i, a, o, s = [], l = n.delegateCount, c = e.target;
            if (l && c.nodeType && (!e.button || "click" !== e.type))
                for (; c != this; c = c.parentNode || this)
                    if (1 === c.nodeType && (!0 !== c.disabled || "click" !== e.type)) {
                        for (a = [],
                                 o = 0; l > o; o++)
                            i = n[o],
                                r = i.selector + " ",
                            a[r] === t && (a[r] = i.needsContext ? ue(r, this).index(c) >= 0 : ue.find(r, this, null, [c]).length),
                            a[r] && a.push(i);
                        a.length && s.push({
                            elem: c,
                            handlers: a
                        })
                    }
            return n.length > l && s.push({
                elem: this,
                handlers: n.slice(l)
            }),
                s
        },
        fix: function (e) {
            if (e[ue.expando])
                return e;
            var t, n, r, i = e.type, a = e, o = this.fixHooks[i];
            for (o || (this.fixHooks[i] = o = Pe.test(i) ? this.mouseHooks : He.test(i) ? this.keyHooks : {}),
                     r = o.props ? this.props.concat(o.props) : this.props,
                     e = new ue.Event(a),
                     t = r.length; t--;)
                n = r[t],
                    e[n] = a[n];
            return e.target || (e.target = a.srcElement || G),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
                e.metaKey = !!e.metaKey,
                o.filter ? o.filter(e, a) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                    e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, n) {
                var r, i, a, o = n.button, s = n.fromElement;
                return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || G,
                    a = i.documentElement,
                    r = i.body,
                    e.pageX = n.clientX + (a && a.scrollLeft || r && r.scrollLeft || 0) - (a && a.clientLeft || r && r.clientLeft || 0),
                    e.pageY = n.clientY + (a && a.scrollTop || r && r.scrollTop || 0) - (a && a.clientTop || r && r.clientTop || 0)),
                !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s),
                e.which || o === t || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                    e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    if (this !== u() && this.focus)
                        try {
                            return this.focus(),
                                !1
                        } catch (e) {
                        }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    return this === u() && this.blur ? (this.blur(),
                        !1) : t
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    return ue.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                        !1) : t
                },
                _default: function (e) {
                    return ue.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = ue.extend(new ue.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? ue.event.trigger(i, null, t) : ue.event.dispatch.call(t, i),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
        ue.removeEvent = G.removeEventListener ? function (e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n, !1)
            }
            : function (e, t, n) {
                var r = "on" + t;
                e.detachEvent && (typeof e[r] === J && (e[r] = null),
                    e.detachEvent(r, n))
            }
        ,
        ue.Event = function (e, n) {
            return this instanceof ue.Event ? (e && e.type ? (this.originalEvent = e,
                this.type = e.type,
                this.isDefaultPrevented = e.defaultPrevented || !1 === e.returnValue || e.getPreventDefault && e.getPreventDefault() ? l : c) : this.type = e,
            n && ue.extend(this, n),
                this.timeStamp = e && e.timeStamp || ue.now(),
                this[ue.expando] = !0,
                t) : new ue.Event(e, n)
        }
        ,
        ue.Event.prototype = {
            isDefaultPrevented: c,
            isPropagationStopped: c,
            isImmediatePropagationStopped: c,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = l,
                e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = l,
                e && (e.stopPropagation && e.stopPropagation(),
                    e.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                this.isImmediatePropagationStopped = l,
                    this.stopPropagation()
            }
        },
        ue.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function (e, t) {
            ue.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function (e) {
                    var n, r = this, i = e.relatedTarget, a = e.handleObj;
                    return (!i || i !== r && !ue.contains(r, i)) && (e.type = a.origType,
                        n = a.handler.apply(this, arguments),
                        e.type = t),
                        n
                }
            }
        }),
    ue.support.submitBubbles || (ue.event.special.submit = {
        setup: function () {
            return !ue.nodeName(this, "form") && (ue.event.add(this, "click._submit keypress._submit", function (e) {
                var n = e.target
                    , r = ue.nodeName(n, "input") || ue.nodeName(n, "button") ? n.form : t;
                r && !ue._data(r, "submitBubbles") && (ue.event.add(r, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }),
                    ue._data(r, "submitBubbles", !0))
            }),
                t)
        },
        postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble,
            this.parentNode && !e.isTrigger && ue.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function () {
            return !ue.nodeName(this, "form") && (ue.event.remove(this, "._submit"),
                t)
        }
    }),
    ue.support.changeBubbles || (ue.event.special.change = {
        setup: function () {
            return Fe.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ue.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }),
                ue.event.add(this, "click._change", function (e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1),
                        ue.event.simulate("change", this, e, !0)
                })),
                !1) : (ue.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                Fe.test(t.nodeName) && !ue._data(t, "changeBubbles") && (ue.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ue.event.simulate("change", this.parentNode, e, !0)
                }),
                    ue._data(t, "changeBubbles", !0))
            }),
                t)
        },
        handle: function (e) {
            var n = e.target;
            return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t
        },
        teardown: function () {
            return ue.event.remove(this, "._change"),
                !Fe.test(this.nodeName)
        }
    }),
    ue.support.focusinBubbles || ue.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, t) {
        var n = 0
            , r = function (e) {
            ue.event.simulate(t, e.target, ue.event.fix(e), !0)
        };
        ue.event.special[t] = {
            setup: function () {
                0 == n++ && G.addEventListener(e, r, !0)
            },
            teardown: function () {
                0 == --n && G.removeEventListener(e, r, !0)
            }
        }
    }),
        ue.fn.extend({
            on: function (e, n, r, i, a) {
                var o, s;
                if ("object" == typeof e) {
                    "string" != typeof n && (r = r || n,
                        n = t);
                    for (o in e)
                        this.on(o, n, r, e[o], a);
                    return this
                }
                if (null == r && null == i ? (i = n,
                    r = n = t) : null == i && ("string" == typeof n ? (i = r,
                    r = t) : (i = r,
                    r = n,
                    n = t)),
                !1 === i)
                    i = c;
                else if (!i)
                    return this;
                return 1 === a && (s = i,
                    i = function (e) {
                        return ue().off(e),
                            s.apply(this, arguments)
                    }
                    ,
                    i.guid = s.guid || (s.guid = ue.guid++)),
                    this.each(function () {
                        ue.event.add(this, e, i, r, n)
                    })
            },
            one: function (e, t, n, r) {
                return this.on(e, t, n, r, 1)
            },
            off: function (e, n, r) {
                var i, a;
                if (e && e.preventDefault && e.handleObj)
                    return i = e.handleObj,
                        ue(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler),
                        this;
                if ("object" == typeof e) {
                    for (a in e)
                        this.off(a, n, e[a]);
                    return this
                }
                return (!1 === n || "function" == typeof n) && (r = n,
                    n = t),
                !1 === r && (r = c),
                    this.each(function () {
                        ue.event.remove(this, e, r, n)
                    })
            },
            trigger: function (e, t) {
                return this.each(function () {
                    ue.event.trigger(e, t, this)
                })
            },
            triggerHandler: function (e, n) {
                var r = this[0];
                return r ? ue.event.trigger(e, n, r, !0) : t
            }
        });
    var Re = /^.[^:#\[\.,]*$/
        , We = /^(?:parents|prev(?:Until|All))/
        , $e = ue.expr.match.needsContext
        , ze = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    ue.fn.extend({
        find: function (e) {
            var t, n = [], r = this, i = r.length;
            if ("string" != typeof e)
                return this.pushStack(ue(e).filter(function () {
                    for (t = 0; i > t; t++)
                        if (ue.contains(r[t], this))
                            return !0
                }));
            for (t = 0; i > t; t++)
                ue.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? ue.unique(n) : n),
                n.selector = this.selector ? this.selector + " " + e : e,
                n
        },
        has: function (e) {
            var t, n = ue(e, this), r = n.length;
            return this.filter(function () {
                for (t = 0; r > t; t++)
                    if (ue.contains(this, n[t]))
                        return !0
            })
        },
        not: function (e) {
            return this.pushStack(f(this, e || [], !0))
        },
        filter: function (e) {
            return this.pushStack(f(this, e || [], !1))
        },
        is: function (e) {
            return !!f(this, "string" == typeof e && $e.test(e) ? ue(e) : e || [], !1).length
        },
        closest: function (e, t) {
            for (var n, r = 0, i = this.length, a = [], o = $e.test(e) || "string" != typeof e ? ue(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (11 > n.nodeType && (o ? o.index(n) > -1 : 1 === n.nodeType && ue.find.matchesSelector(n, e))) {
                        n = a.push(n);
                        break
                    }
            return this.pushStack(a.length > 1 ? ue.unique(a) : a)
        },
        index: function (e) {
            return e ? "string" == typeof e ? ue.inArray(this[0], ue(e)) : ue.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
            var n = "string" == typeof e ? ue(e, t) : ue.makeArray(e && e.nodeType ? [e] : e)
                , r = ue.merge(this.get(), n);
            return this.pushStack(ue.unique(r))
        },
        addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
        ue.each({
            parent: function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function (e) {
                return ue.dir(e, "parentNode")
            },
            parentsUntil: function (e, t, n) {
                return ue.dir(e, "parentNode", n)
            },
            next: function (e) {
                return d(e, "nextSibling")
            },
            prev: function (e) {
                return d(e, "previousSibling")
            },
            nextAll: function (e) {
                return ue.dir(e, "nextSibling")
            },
            prevAll: function (e) {
                return ue.dir(e, "previousSibling")
            },
            nextUntil: function (e, t, n) {
                return ue.dir(e, "nextSibling", n)
            },
            prevUntil: function (e, t, n) {
                return ue.dir(e, "previousSibling", n)
            },
            siblings: function (e) {
                return ue.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function (e) {
                return ue.sibling(e.firstChild)
            },
            contents: function (e) {
                return ue.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ue.merge([], e.childNodes)
            }
        }, function (e, t) {
            ue.fn[e] = function (n, r) {
                var i = ue.map(this, t, n);
                return "Until" !== e.slice(-5) && (r = n),
                r && "string" == typeof r && (i = ue.filter(r, i)),
                this.length > 1 && (ze[e] || (i = ue.unique(i)),
                We.test(e) && (i = i.reverse())),
                    this.pushStack(i)
            }
        }),
        ue.extend({
            filter: function (e, t, n) {
                var r = t[0];
                return n && (e = ":not(" + e + ")"),
                    1 === t.length && 1 === r.nodeType ? ue.find.matchesSelector(r, e) ? [r] : [] : ue.find.matches(e, ue.grep(t, function (e) {
                        return 1 === e.nodeType
                    }))
            },
            dir: function (e, n, r) {
                for (var i = [], a = e[n]; a && 9 !== a.nodeType && (r === t || 1 !== a.nodeType || !ue(a).is(r));)
                    1 === a.nodeType && i.push(a),
                        a = a[n];
                return i
            },
            sibling: function (e, t) {
                for (var n = []; e; e = e.nextSibling)
                    1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        });
    var Qe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
        , Ye = / jQuery\d+="(?:null|\d+)"/g
        , Je = RegExp("<(?:" + Qe + ")[\\s/>]", "i")
        , Ze = /^\s+/
        , Ge = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
        , Xe = /<([\w:]+)/
        , Ve = /<tbody/i
        , Ke = /<|&#?\w+;/
        , et = /<(?:script|style|link)/i
        , tt = /^(?:checkbox|radio)$/i
        , nt = /checked\s*(?:[^=]|=\s*.checked.)/i
        , rt = /^$|\/(?:java|ecma)script/i
        , it = /^true\/(.*)/
        , at = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
        , ot = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: ue.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }
        , st = p(G)
        , lt = st.appendChild(G.createElement("div"));
    ot.optgroup = ot.option,
        ot.tbody = ot.tfoot = ot.colgroup = ot.caption = ot.thead,
        ot.th = ot.td,
        ue.fn.extend({
            text: function (e) {
                return ue.access(this, function (e) {
                    return e === t ? ue.text(this) : this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(e))
                }, null, e, arguments.length)
            },
            append: function () {
                return this.domManip(arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        h(this, e).appendChild(e)
                    }
                })
            },
            prepend: function () {
                return this.domManip(arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = h(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            remove: function (e, t) {
                for (var n, r = e ? ue.filter(e, this) : this, i = 0; null != (n = r[i]); i++)
                    t || 1 !== n.nodeType || ue.cleanData(w(n)),
                    n.parentNode && (t && ue.contains(n.ownerDocument, n) && g(w(n, "script")),
                        n.parentNode.removeChild(n));
                return this
            },
            empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && ue.cleanData(w(e, !1)); e.firstChild;)
                        e.removeChild(e.firstChild);
                    e.options && ue.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            },
            clone: function (e, t) {
                return e = null != e && e,
                    t = null == t ? e : t,
                    this.map(function () {
                        return ue.clone(this, e, t)
                    })
            },
            html: function (e) {
                return ue.access(this, function (e) {
                    var n = this[0] || {}
                        , r = 0
                        , i = this.length;
                    if (e === t)
                        return 1 === n.nodeType ? n.innerHTML.replace(Ye, "") : t;
                    if (!("string" != typeof e || et.test(e) || !ue.support.htmlSerialize && Je.test(e) || !ue.support.leadingWhitespace && Ze.test(e) || ot[(Xe.exec(e) || ["", ""])[1].toLowerCase()])) {
                        e = e.replace(Ge, "<$1></$2>");
                        try {
                            for (; i > r; r++)
                                n = this[r] || {},
                                1 === n.nodeType && (ue.cleanData(w(n, !1)),
                                    n.innerHTML = e);
                            n = 0
                        } catch (e) {
                        }
                    }
                    n && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function () {
                var e = ue.map(this, function (e) {
                    return [e.nextSibling, e.parentNode]
                })
                    , t = 0;
                return this.domManip(arguments, function (n) {
                    var r = e[t++]
                        , i = e[t++];
                    i && (r && r.parentNode !== i && (r = this.nextSibling),
                        ue(this).remove(),
                        i.insertBefore(n, r))
                }, !0),
                    t ? this : this.remove()
            },
            detach: function (e) {
                return this.remove(e, !0)
            },
            domManip: function (e, t, n) {
                e = re.apply([], e);
                var r, i, a, o, s, l, c = 0, u = this.length, d = this, f = u - 1, p = e[0], h = ue.isFunction(p);
                if (h || !(1 >= u || "string" != typeof p || ue.support.checkClone) && nt.test(p))
                    return this.each(function (r) {
                        var i = d.eq(r);
                        h && (e[0] = p.call(this, r, i.html())),
                            i.domManip(e, t, n)
                    });
                if (u && (l = ue.buildFragment(e, this[0].ownerDocument, !1, !n && this),
                    r = l.firstChild,
                1 === l.childNodes.length && (l = r),
                    r)) {
                    for (o = ue.map(w(l, "script"), y),
                             a = o.length; u > c; c++)
                        i = l,
                        c !== f && (i = ue.clone(i, !0, !0),
                        a && ue.merge(o, w(i, "script"))),
                            t.call(this[c], i, c);
                    if (a)
                        for (s = o[o.length - 1].ownerDocument,
                                 ue.map(o, m),
                                 c = 0; a > c; c++)
                            i = o[c],
                            rt.test(i.type || "") && !ue._data(i, "globalEval") && ue.contains(s, i) && (i.src ? ue._evalUrl(i.src) : ue.globalEval((i.text || i.textContent || i.innerHTML || "").replace(at, "")));
                    l = r = null
                }
                return this
            }
        }),
        ue.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (e, t) {
            ue.fn[e] = function (e) {
                for (var n, r = 0, i = [], a = ue(e), o = a.length - 1; o >= r; r++)
                    n = r === o ? this : this.clone(!0),
                        ue(a[r])[t](n),
                        ie.apply(i, n.get());
                return this.pushStack(i)
            }
        }),
        ue.extend({
            clone: function (e, t, n) {
                var r, i, a, o, s, l = ue.contains(e.ownerDocument, e);
                if (ue.support.html5Clone || ue.isXMLDoc(e) || !Je.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (lt.innerHTML = e.outerHTML,
                    lt.removeChild(a = lt.firstChild)),
                    !(ue.support.noCloneEvent && ue.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ue.isXMLDoc(e)))
                    for (r = w(a),
                             s = w(e),
                             o = 0; null != (i = s[o]); ++o)
                        r[o] && _(i, r[o]);
                if (t)
                    if (n)
                        for (s = s || w(e),
                                 r = r || w(a),
                                 o = 0; null != (i = s[o]); o++)
                            v(i, r[o]);
                    else
                        v(e, a);
                return r = w(a, "script"),
                r.length > 0 && g(r, !l && w(e, "script")),
                    r = s = i = null,
                    a
            },
            buildFragment: function (e, t, n, r) {
                for (var i, a, o, s, l, c, u, d = e.length, f = p(t), h = [], y = 0; d > y; y++)
                    if ((a = e[y]) || 0 === a)
                        if ("object" === ue.type(a))
                            ue.merge(h, a.nodeType ? [a] : a);
                        else if (Ke.test(a)) {
                            for (s = s || f.appendChild(t.createElement("div")),
                                     l = (Xe.exec(a) || ["", ""])[1].toLowerCase(),
                                     u = ot[l] || ot._default,
                                     s.innerHTML = u[1] + a.replace(Ge, "<$1></$2>") + u[2],
                                     i = u[0]; i--;)
                                s = s.lastChild;
                            if (!ue.support.leadingWhitespace && Ze.test(a) && h.push(t.createTextNode(Ze.exec(a)[0])),
                                !ue.support.tbody)
                                for (a = "table" !== l || Ve.test(a) ? "<table>" !== u[1] || Ve.test(a) ? 0 : s : s.firstChild,
                                         i = a && a.childNodes.length; i--;)
                                    ue.nodeName(c = a.childNodes[i], "tbody") && !c.childNodes.length && a.removeChild(c);
                            for (ue.merge(h, s.childNodes),
                                     s.textContent = ""; s.firstChild;)
                                s.removeChild(s.firstChild);
                            s = f.lastChild
                        } else
                            h.push(t.createTextNode(a));
                for (s && f.removeChild(s),
                     ue.support.appendChecked || ue.grep(w(h, "input"), b),
                         y = 0; a = h[y++];)
                    if ((!r || -1 === ue.inArray(a, r)) && (o = ue.contains(a.ownerDocument, a),
                        s = w(f.appendChild(a), "script"),
                    o && g(s),
                        n))
                        for (i = 0; a = s[i++];)
                            rt.test(a.type || "") && n.push(a);
                return s = null,
                    f
            },
            cleanData: function (e, t) {
                for (var n, r, i, a, o = 0, s = ue.expando, l = ue.cache, c = ue.support.deleteExpando, u = ue.event.special; null != (n = e[o]); o++)
                    if ((t || ue.acceptData(n)) && (i = n[s],
                        a = i && l[i])) {
                        if (a.events)
                            for (r in a.events)
                                u[r] ? ue.event.remove(n, r) : ue.removeEvent(n, r, a.handle);
                        l[i] && (delete l[i],
                            c ? delete n[s] : typeof n.removeAttribute !== J ? n.removeAttribute(s) : n[s] = null,
                            te.push(i))
                    }
            },
            _evalUrl: function (e) {
                return ue.ajax({
                    url: e,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    throws: !0
                })
            }
        }),
        ue.fn.extend({
            wrapAll: function (e) {
                if (ue.isFunction(e))
                    return this.each(function (t) {
                        ue(this).wrapAll(e.call(this, t))
                    });
                if (this[0]) {
                    var t = ue(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]),
                        t.map(function () {
                            for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)
                                e = e.firstChild;
                            return e
                        }).append(this)
                }
                return this
            },
            wrapInner: function (e) {
                return ue.isFunction(e) ? this.each(function (t) {
                    ue(this).wrapInner(e.call(this, t))
                }) : this.each(function () {
                    var t = ue(this)
                        , n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function (e) {
                var t = ue.isFunction(e);
                return this.each(function (n) {
                    ue(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    ue.nodeName(this, "body") || ue(this).replaceWith(this.childNodes)
                }).end()
            }
        });
    var ct, ut, dt, ft = /alpha\([^)]*\)/i, pt = /opacity\s*=\s*([^)]*)/, ht = /^(top|right|bottom|left)$/,
        yt = /^(none|table(?!-c[ea]).+)/, mt = /^margin/, gt = RegExp("^(" + de + ")(.*)$", "i"),
        vt = RegExp("^(" + de + ")(?!px)[a-z%]+$", "i"), _t = RegExp("^([+-])=(" + de + ")", "i"), wt = {
            BODY: "block"
        }, bt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, xt = {
            letterSpacing: 0,
            fontWeight: 400
        }, kt = ["Top", "Right", "Bottom", "Left"], Tt = ["Webkit", "O", "Moz", "ms"];
    ue.fn.extend({
        css: function (e, n) {
            return ue.access(this, function (e, n, r) {
                var i, a, o = {}, s = 0;
                if (ue.isArray(n)) {
                    for (a = ut(e),
                             i = n.length; i > s; s++)
                        o[n[s]] = ue.css(e, n[s], !1, a);
                    return o
                }
                return r !== t ? ue.style(e, n, r) : ue.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function () {
            return T(this, !0)
        },
        hide: function () {
            return T(this)
        },
        toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                k(this) ? ue(this).show() : ue(this).hide()
            })
        }
    }),
        ue.extend({
            cssHooks: {
                opacity: {
                    get: function (e, t) {
                        if (t) {
                            var n = dt(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                float: ue.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function (e, n, r, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var a, o, s, l = ue.camelCase(n), c = e.style;
                    if (n = ue.cssProps[l] || (ue.cssProps[l] = x(c, l)),
                        s = ue.cssHooks[n] || ue.cssHooks[l],
                    r === t)
                        return s && "get" in s && (a = s.get(e, !1, i)) !== t ? a : c[n];
                    if (o = typeof r,
                    "string" === o && (a = _t.exec(r)) && (r = (a[1] + 1) * a[2] + parseFloat(ue.css(e, n)),
                        o = "number"),
                        !(null == r || "number" === o && isNaN(r) || ("number" !== o || ue.cssNumber[l] || (r += "px"),
                        ue.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (c[n] = "inherit"),
                        s && "set" in s && (r = s.set(e, r, i)) === t)))
                        try {
                            c[n] = r
                        } catch (e) {
                        }
                }
            },
            css: function (e, n, r, i) {
                var a, o, s, l = ue.camelCase(n);
                return n = ue.cssProps[l] || (ue.cssProps[l] = x(e.style, l)),
                    s = ue.cssHooks[n] || ue.cssHooks[l],
                s && "get" in s && (o = s.get(e, !0, r)),
                o === t && (o = dt(e, n, i)),
                "normal" === o && n in xt && (o = xt[n]),
                    "" === r || r ? (a = parseFloat(o),
                        !0 === r || ue.isNumeric(a) ? a || 0 : o) : o
            }
        }),
        e.getComputedStyle ? (ut = function (t) {
                return e.getComputedStyle(t, null)
            }
                ,
                dt = function (e, n, r) {
                    var i, a, o, s = r || ut(e), l = s ? s.getPropertyValue(n) || s[n] : t, c = e.style;
                    return s && ("" !== l || ue.contains(e.ownerDocument, e) || (l = ue.style(e, n)),
                    vt.test(l) && mt.test(n) && (i = c.width,
                        a = c.minWidth,
                        o = c.maxWidth,
                        c.minWidth = c.maxWidth = c.width = l,
                        l = s.width,
                        c.width = i,
                        c.minWidth = a,
                        c.maxWidth = o)),
                        l
                }
        ) : G.documentElement.currentStyle && (ut = function (e) {
                return e.currentStyle
            }
                ,
                dt = function (e, n, r) {
                    var i, a, o, s = r || ut(e), l = s ? s[n] : t, c = e.style;
                    return null == l && c && c[n] && (l = c[n]),
                    vt.test(l) && !ht.test(n) && (i = c.left,
                        a = e.runtimeStyle,
                        o = a && a.left,
                    o && (a.left = e.currentStyle.left),
                        c.left = "fontSize" === n ? "1em" : l,
                        l = c.pixelLeft + "px",
                        c.left = i,
                    o && (a.left = o)),
                        "" === l ? "auto" : l
                }
        ),
        ue.each(["height", "width"], function (e, n) {
            ue.cssHooks[n] = {
                get: function (e, r, i) {
                    return r ? 0 === e.offsetWidth && yt.test(ue.css(e, "display")) ? ue.swap(e, bt, function () {
                        return S(e, n, i)
                    }) : S(e, n, i) : t
                },
                set: function (e, t, r) {
                    var i = r && ut(e);
                    return C(e, t, r ? D(e, n, r, ue.support.boxSizing && "border-box" === ue.css(e, "boxSizing", !1, i), i) : 0)
                }
            }
        }),
    ue.support.opacity || (ue.cssHooks.opacity = {
        get: function (e, t) {
            return pt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function (e, t) {
            var n = e.style
                , r = e.currentStyle
                , i = ue.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
                , a = r && r.filter || n.filter || "";
            n.zoom = 1,
            (t >= 1 || "" === t) && "" === ue.trim(a.replace(ft, "")) && n.removeAttribute && (n.removeAttribute("filter"),
            "" === t || r && !r.filter) || (n.filter = ft.test(a) ? a.replace(ft, i) : a + " " + i)
        }
    }),
        ue(function () {
            ue.support.reliableMarginRight || (ue.cssHooks.marginRight = {
                get: function (e, n) {
                    return n ? ue.swap(e, {
                        display: "inline-block"
                    }, dt, [e, "marginRight"]) : t
                }
            }),
            !ue.support.pixelPosition && ue.fn.position && ue.each(["top", "left"], function (e, n) {
                ue.cssHooks[n] = {
                    get: function (e, r) {
                        return r ? (r = dt(e, n),
                            vt.test(r) ? ue(e).position()[n] + "px" : r) : t
                    }
                }
            })
        }),
    ue.expr && ue.expr.filters && (ue.expr.filters.hidden = function (e) {
            return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !ue.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ue.css(e, "display"))
        }
            ,
            ue.expr.filters.visible = function (e) {
                return !ue.expr.filters.hidden(e)
            }
    ),
        ue.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (e, t) {
            ue.cssHooks[e + t] = {
                expand: function (n) {
                    for (var r = 0, i = {}, a = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)
                        i[e + kt[r] + t] = a[r] || a[r - 2] || a[0];
                    return i
                }
            },
            mt.test(e) || (ue.cssHooks[e + t].set = C)
        });
    var Ct = /%20/g
        , Dt = /\[\]$/
        , St = /\r?\n/g
        , Nt = /^(?:submit|button|image|reset|file)$/i
        , jt = /^(?:input|select|textarea|keygen)/i;
    ue.fn.extend({
        serialize: function () {
            return ue.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var e = ue.prop(this, "elements");
                return e ? ue.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !ue(this).is(":disabled") && jt.test(this.nodeName) && !Nt.test(e) && (this.checked || !tt.test(e))
            }).map(function (e, t) {
                var n = ue(this).val();
                return null == n ? null : ue.isArray(n) ? ue.map(n, function (e) {
                    return {
                        name: t.name,
                        value: e.replace(St, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(St, "\r\n")
                }
            }).get()
        }
    }),
        ue.param = function (e, n) {
            var r, i = [], a = function (e, t) {
                t = ue.isFunction(t) ? t() : null == t ? "" : t,
                    i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
            if (n === t && (n = ue.ajaxSettings && ue.ajaxSettings.traditional),
            ue.isArray(e) || e.jquery && !ue.isPlainObject(e))
                ue.each(e, function () {
                    a(this.name, this.value)
                });
            else
                for (r in e)
                    M(r, e[r], n, a);
            return i.join("&").replace(Ct, "+")
        }
        ,
        ue.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
            ue.fn[t] = function (e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }),
        ue.fn.extend({
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            },
            bind: function (e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function (e, t) {
                return this.off(e, null, t)
            },
            delegate: function (e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        });
    var Mt, Ot, Et = ue.now(), qt = /\?/, At = /#.*$/, It = /([?&])_=[^&]*/, Lt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ht = /^(?:GET|HEAD)$/, Pt = /^\/\//,
        Ut = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Bt = ue.fn.load, Rt = {}, Wt = {}, $t = "*/".concat("*");
    try {
        Ot = Z.href
    } catch (e) {
        Ot = G.createElement("a"),
            Ot.href = "",
            Ot = Ot.href
    }
    Mt = Ut.exec(Ot.toLowerCase()) || [],
        ue.fn.load = function (e, n, r) {
            if ("string" != typeof e && Bt)
                return Bt.apply(this, arguments);
            var i, a, o, s = this, l = e.indexOf(" ");
            return l >= 0 && (i = e.slice(l, e.length),
                e = e.slice(0, l)),
                ue.isFunction(n) ? (r = n,
                    n = t) : n && "object" == typeof n && (o = "POST"),
            s.length > 0 && ue.ajax({
                url: e,
                type: o,
                dataType: "html",
                data: n
            }).done(function (e) {
                a = arguments,
                    s.html(i ? ue("<div>").append(ue.parseHTML(e)).find(i) : e)
            }).complete(r && function (e, t) {
                s.each(r, a || [e.responseText, t, e])
            }
            ),
                this
        }
        ,
        ue.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
            ue.fn[t] = function (e) {
                return this.on(t, e)
            }
        }),
        ue.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Ot,
                type: "GET",
                isLocal: Ft.test(Mt[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": $t,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": ue.parseJSON,
                    "text xml": ue.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function (e, t) {
                return t ? q(q(e, ue.ajaxSettings), t) : q(ue.ajaxSettings, e)
            },
            ajaxPrefilter: O(Rt),
            ajaxTransport: O(Wt),
            ajax: function (e, n) {
                function r(e, n, r, i) {
                    var a, d, v, _, b, k = n;
                    2 !== w && (w = 2,
                    l && clearTimeout(l),
                        u = t,
                        s = i || "",
                        x.readyState = e > 0 ? 4 : 0,
                        a = e >= 200 && 300 > e || 304 === e,
                    r && (_ = A(f, x, r)),
                        _ = I(f, _, x, a),
                        a ? (f.ifModified && (b = x.getResponseHeader("Last-Modified"),
                        b && (ue.lastModified[o] = b),
                        (b = x.getResponseHeader("etag")) && (ue.etag[o] = b)),
                            204 === e || "HEAD" === f.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = _.state,
                                d = _.data,
                                v = _.error,
                                a = !v)) : (v = k,
                        (e || !k) && (k = "error",
                        0 > e && (e = 0))),
                        x.status = e,
                        x.statusText = (n || k) + "",
                        a ? y.resolveWith(p, [d, k, x]) : y.rejectWith(p, [x, k, v]),
                        x.statusCode(g),
                        g = t,
                    c && h.trigger(a ? "ajaxSuccess" : "ajaxError", [x, f, a ? d : v]),
                        m.fireWith(p, [x, k]),
                    c && (h.trigger("ajaxComplete", [x, f]),
                    --ue.active || ue.event.trigger("ajaxStop")))
                }

                "object" == typeof e && (n = e,
                    e = t),
                    n = n || {};
                var i, a, o, s, l, c, u, d, f = ue.ajaxSetup({}, n), p = f.context || f,
                    h = f.context && (p.nodeType || p.jquery) ? ue(p) : ue.event, y = ue.Deferred(),
                    m = ue.Callbacks("once memory"), g = f.statusCode || {}, v = {}, _ = {}, w = 0, b = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function (e) {
                            var t;
                            if (2 === w) {
                                if (!d)
                                    for (d = {}; t = Lt.exec(s);)
                                        d[t[1].toLowerCase()] = t[2];
                                t = d[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function () {
                            return 2 === w ? s : null
                        },
                        setRequestHeader: function (e, t) {
                            var n = e.toLowerCase();
                            return w || (e = _[n] = _[n] || e,
                                v[e] = t),
                                this
                        },
                        overrideMimeType: function (e) {
                            return w || (f.mimeType = e),
                                this
                        },
                        statusCode: function (e) {
                            var t;
                            if (e)
                                if (2 > w)
                                    for (t in e)
                                        g[t] = [g[t], e[t]];
                                else
                                    x.always(e[x.status]);
                            return this
                        },
                        abort: function (e) {
                            var t = e || b;
                            return u && u.abort(t),
                                r(0, t),
                                this
                        }
                    };
                if (y.promise(x).complete = m.add,
                    x.success = x.done,
                    x.error = x.fail,
                    f.url = ((e || f.url || Ot) + "").replace(At, "").replace(Pt, Mt[1] + "//"),
                    f.type = n.method || n.type || f.method || f.type,
                    f.dataTypes = ue.trim(f.dataType || "*").toLowerCase().match(fe) || [""],
                null == f.crossDomain && (i = Ut.exec(f.url.toLowerCase()),
                    f.crossDomain = !(!i || i[1] === Mt[1] && i[2] === Mt[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Mt[3] || ("http:" === Mt[1] ? "80" : "443")))),
                f.data && f.processData && "string" != typeof f.data && (f.data = ue.param(f.data, f.traditional)),
                    E(Rt, f, n, x),
                2 === w)
                    return x;
                c = f.global,
                c && 0 == ue.active++ && ue.event.trigger("ajaxStart"),
                    f.type = f.type.toUpperCase(),
                    f.hasContent = !Ht.test(f.type),
                    o = f.url,
                f.hasContent || (f.data && (o = f.url += (qt.test(o) ? "&" : "?") + f.data,
                    delete f.data),
                !1 === f.cache && (f.url = It.test(o) ? o.replace(It, "$1_=" + Et++) : o + (qt.test(o) ? "&" : "?") + "_=" + Et++)),
                f.ifModified && (ue.lastModified[o] && x.setRequestHeader("If-Modified-Since", ue.lastModified[o]),
                ue.etag[o] && x.setRequestHeader("If-None-Match", ue.etag[o])),
                (f.data && f.hasContent && !1 !== f.contentType || n.contentType) && x.setRequestHeader("Content-Type", f.contentType),
                    x.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : f.accepts["*"]);
                for (a in f.headers)
                    x.setRequestHeader(a, f.headers[a]);
                if (f.beforeSend && (!1 === f.beforeSend.call(p, x, f) || 2 === w))
                    return x.abort();
                b = "abort";
                for (a in {
                    success: 1,
                    error: 1,
                    complete: 1
                })
                    x[a](f[a]);
                if (u = E(Wt, f, n, x)) {
                    x.readyState = 1,
                    c && h.trigger("ajaxSend", [x, f]),
                    f.async && f.timeout > 0 && (l = setTimeout(function () {
                        x.abort("timeout")
                    }, f.timeout));
                    try {
                        w = 1,
                            u.send(v, r)
                    } catch (e) {
                        if (!(2 > w))
                            throw e;
                        r(-1, e)
                    }
                } else
                    r(-1, "No Transport");
                return x
            },
            getJSON: function (e, t, n) {
                return ue.get(e, t, n, "json")
            },
            getScript: function (e, n) {
                return ue.get(e, t, n, "script")
            }
        }),
        ue.each(["get", "post"], function (e, n) {
            ue[n] = function (e, r, i, a) {
                return ue.isFunction(r) && (a = a || i,
                    i = r,
                    r = t),
                    ue.ajax({
                        url: e,
                        type: n,
                        dataType: a,
                        data: r,
                        success: i
                    })
            }
        }),
        ue.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function (e) {
                    return ue.globalEval(e),
                        e
                }
            }
        }),
        ue.ajaxPrefilter("script", function (e) {
            e.cache === t && (e.cache = !1),
            e.crossDomain && (e.type = "GET",
                e.global = !1)
        }),
        ue.ajaxTransport("script", function (e) {
            if (e.crossDomain) {
                var n, r = G.head || ue("head")[0] || G.documentElement;
                return {
                    send: function (t, i) {
                        n = G.createElement("script"),
                            n.async = !0,
                        e.scriptCharset && (n.charset = e.scriptCharset),
                            n.src = e.url,
                            n.onload = n.onreadystatechange = function (e, t) {
                                (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null,
                                n.parentNode && n.parentNode.removeChild(n),
                                    n = null,
                                t || i(200, "success"))
                            }
                            ,
                            r.insertBefore(n, r.firstChild)
                    },
                    abort: function () {
                        n && n.onload(t, !0)
                    }
                }
            }
        });
    var zt = []
        , Qt = /(=)\?(?=&|$)|\?\?/;
    ue.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = zt.pop() || ue.expando + "_" + Et++;
            return this[e] = !0,
                e
        }
    }),
        ue.ajaxPrefilter("json jsonp", function (n, r, i) {
            var a, o, s,
                l = !1 !== n.jsonp && (Qt.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Qt.test(n.data) && "data");
            return l || "jsonp" === n.dataTypes[0] ? (a = n.jsonpCallback = ue.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback,
                l ? n[l] = n[l].replace(Qt, "$1" + a) : !1 !== n.jsonp && (n.url += (qt.test(n.url) ? "&" : "?") + n.jsonp + "=" + a),
                n.converters["script json"] = function () {
                    return s || ue.error(a + " was not called"),
                        s[0]
                }
                ,
                n.dataTypes[0] = "json",
                o = e[a],
                e[a] = function () {
                    s = arguments
                }
                ,
                i.always(function () {
                    e[a] = o,
                    n[a] && (n.jsonpCallback = r.jsonpCallback,
                        zt.push(a)),
                    s && ue.isFunction(o) && o(s[0]),
                        s = o = t
                }),
                "script") : t
        });
    var Yt, Jt, Zt = 0, Gt = e.ActiveXObject && function () {
            var e;
            for (e in Yt)
                Yt[e](t, !0)
        }
    ;
    ue.ajaxSettings.xhr = e.ActiveXObject ? function () {
            return !this.isLocal && L() || F()
        }
        : L,
        Jt = ue.ajaxSettings.xhr(),
        ue.support.cors = !!Jt && "withCredentials" in Jt,
    (Jt = ue.support.ajax = !!Jt) && ue.ajaxTransport(function (n) {
        if (!n.crossDomain || ue.support.cors) {
            var r;
            return {
                send: function (i, a) {
                    var o, s, l = n.xhr();
                    if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async),
                        n.xhrFields)
                        for (s in n.xhrFields)
                            l[s] = n.xhrFields[s];
                    n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType),
                    n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (s in i)
                            l.setRequestHeader(s, i[s])
                    } catch (e) {
                    }
                    l.send(n.hasContent && n.data || null),
                        r = function (e, i) {
                            var s, c, u, d;
                            try {
                                if (r && (i || 4 === l.readyState))
                                    if (r = t,
                                    o && (l.onreadystatechange = ue.noop,
                                    Gt && delete Yt[o]),
                                        i)
                                        4 !== l.readyState && l.abort();
                                    else {
                                        d = {},
                                            s = l.status,
                                            c = l.getAllResponseHeaders(),
                                        "string" == typeof l.responseText && (d.text = l.responseText);
                                        try {
                                            u = l.statusText
                                        } catch (e) {
                                            u = ""
                                        }
                                        s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
                                    }
                            } catch (e) {
                                i || a(-1, e)
                            }
                            d && a(s, u, d, c)
                        }
                        ,
                        n.async ? 4 === l.readyState ? setTimeout(r) : (o = ++Zt,
                        Gt && (Yt || (Yt = {},
                            ue(e).unload(Gt)),
                            Yt[o] = r),
                            l.onreadystatechange = r) : r()
                },
                abort: function () {
                    r && r(t, !0)
                }
            }
        }
    });
    var Xt, Vt, Kt = /^(?:toggle|show|hide)$/, en = RegExp("^(?:([+-])=|)(" + de + ")([a-z%]*)$", "i"),
        tn = /queueHooks$/, nn = [R], rn = {
            "*": [function (e, t) {
                var n = this.createTween(e, t)
                    , r = n.cur()
                    , i = en.exec(t)
                    , a = i && i[3] || (ue.cssNumber[e] ? "" : "px")
                    , o = (ue.cssNumber[e] || "px" !== a && +r) && en.exec(ue.css(n.elem, e))
                    , s = 1
                    , l = 20;
                if (o && o[3] !== a) {
                    a = a || o[3],
                        i = i || [],
                        o = +r || 1;
                    do {
                        s = s || ".5",
                            o /= s,
                            ue.style(n.elem, e, o + a)
                    } while (s !== (s = n.cur() / r) && 1 !== s && --l)
                }
                return i && (o = n.start = +o || +r || 0,
                    n.unit = a,
                    n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]),
                    n
            }
            ]
        };
    ue.Animation = ue.extend(U, {
        tweener: function (e, t) {
            ue.isFunction(e) ? (t = e,
                e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++)
                n = e[r],
                    rn[n] = rn[n] || [],
                    rn[n].unshift(t)
        },
        prefilter: function (e, t) {
            t ? nn.unshift(e) : nn.push(e)
        }
    }),
        ue.Tween = W,
        W.prototype = {
            constructor: W,
            init: function (e, t, n, r, i, a) {
                this.elem = e,
                    this.prop = n,
                    this.easing = i || "swing",
                    this.options = t,
                    this.start = this.now = this.cur(),
                    this.end = r,
                    this.unit = a || (ue.cssNumber[n] ? "" : "px")
            },
            cur: function () {
                var e = W.propHooks[this.prop];
                return e && e.get ? e.get(this) : W.propHooks._default.get(this)
            },
            run: function (e) {
                var t, n = W.propHooks[this.prop];
                return this.pos = t = this.options.duration ? ue.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
                    this.now = (this.end - this.start) * t + this.start,
                this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : W.propHooks._default.set(this),
                    this
            }
        },
        W.prototype.init.prototype = W.prototype,
        W.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ue.css(e.elem, e.prop, ""),
                        t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },
                set: function (e) {
                    ue.fx.step[e.prop] ? ue.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ue.cssProps[e.prop]] || ue.cssHooks[e.prop]) ? ue.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        },
        W.propHooks.scrollTop = W.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        ue.each(["toggle", "show", "hide"], function (e, t) {
            var n = ue.fn[t];
            ue.fn[t] = function (e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate($(t, !0), e, r, i)
            }
        }),
        ue.fn.extend({
            fadeTo: function (e, t, n, r) {
                return this.filter(k).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function (e, t, n, r) {
                var i = ue.isEmptyObject(e)
                    , a = ue.speed(t, n, r)
                    , o = function () {
                    var t = U(this, ue.extend({}, e), a);
                    (i || ue._data(this, "finish")) && t.stop(!0)
                };
                return o.finish = o,
                    i || !1 === a.queue ? this.each(o) : this.queue(a.queue, o)
            },
            stop: function (e, n, r) {
                var i = function (e) {
                    var t = e.stop;
                    delete e.stop,
                        t(r)
                };
                return "string" != typeof e && (r = n,
                    n = e,
                    e = t),
                n && !1 !== e && this.queue(e || "fx", []),
                    this.each(function () {
                        var t = !0
                            , n = null != e && e + "queueHooks"
                            , a = ue.timers
                            , o = ue._data(this);
                        if (n)
                            o[n] && o[n].stop && i(o[n]);
                        else
                            for (n in o)
                                o[n] && o[n].stop && tn.test(n) && i(o[n]);
                        for (n = a.length; n--;)
                            a[n].elem !== this || null != e && a[n].queue !== e || (a[n].anim.stop(r),
                                t = !1,
                                a.splice(n, 1));
                        (t || !r) && ue.dequeue(this, e)
                    })
            },
            finish: function (e) {
                return !1 !== e && (e = e || "fx"),
                    this.each(function () {
                        var t, n = ue._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], a = ue.timers,
                            o = r ? r.length : 0;
                        for (n.finish = !0,
                                 ue.queue(this, e, []),
                             i && i.stop && i.stop.call(this, !0),
                                 t = a.length; t--;)
                            a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0),
                                a.splice(t, 1));
                        for (t = 0; o > t; t++)
                            r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    })
            }
        }),
        ue.each({
            slideDown: $("show"),
            slideUp: $("hide"),
            slideToggle: $("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function (e, t) {
            ue.fn[e] = function (e, n, r) {
                return this.animate(t, e, n, r)
            }
        }),
        ue.speed = function (e, t, n) {
            var r = e && "object" == typeof e ? ue.extend({}, e) : {
                complete: n || !n && t || ue.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !ue.isFunction(t) && t
            };
            return r.duration = ue.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ue.fx.speeds ? ue.fx.speeds[r.duration] : ue.fx.speeds._default,
            (null == r.queue || !0 === r.queue) && (r.queue = "fx"),
                r.old = r.complete,
                r.complete = function () {
                    ue.isFunction(r.old) && r.old.call(this),
                    r.queue && ue.dequeue(this, r.queue)
                }
                ,
                r
        }
        ,
        ue.easing = {
            linear: function (e) {
                return e
            },
            swing: function (e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        },
        ue.timers = [],
        ue.fx = W.prototype.init,
        ue.fx.tick = function () {
            var e, n = ue.timers, r = 0;
            for (Xt = ue.now(); n.length > r; r++)
                (e = n[r])() || n[r] !== e || n.splice(r--, 1);
            n.length || ue.fx.stop(),
                Xt = t
        }
        ,
        ue.fx.timer = function (e) {
            e() && ue.timers.push(e) && ue.fx.start()
        }
        ,
        ue.fx.interval = 13,
        ue.fx.start = function () {
            Vt || (Vt = setInterval(ue.fx.tick, ue.fx.interval))
        }
        ,
        ue.fx.stop = function () {
            clearInterval(Vt),
                Vt = null
        }
        ,
        ue.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        ue.fx.step = {},
    ue.expr && ue.expr.filters && (ue.expr.filters.animated = function (e) {
            return ue.grep(ue.timers, function (t) {
                return e === t.elem
            }).length
        }
    ),
        ue.fn.offset = function (e) {
            if (arguments.length)
                return e === t ? this : this.each(function (t) {
                    ue.offset.setOffset(this, e, t)
                });
            var n, r, i = {
                top: 0,
                left: 0
            }, a = this[0], o = a && a.ownerDocument;
            return o ? (n = o.documentElement,
                ue.contains(n, a) ? (typeof a.getBoundingClientRect !== J && (i = a.getBoundingClientRect()),
                    r = z(o),
                    {
                        top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                        left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
                    }) : i) : void 0
        }
        ,
        ue.offset = {
            setOffset: function (e, t, n) {
                var r = ue.css(e, "position");
                "static" === r && (e.style.position = "relative");
                var i, a, o = ue(e), s = o.offset(), l = ue.css(e, "top"), c = ue.css(e, "left"),
                    u = ("absolute" === r || "fixed" === r) && ue.inArray("auto", [l, c]) > -1, d = {}, f = {};
                u ? (f = o.position(),
                    i = f.top,
                    a = f.left) : (i = parseFloat(l) || 0,
                    a = parseFloat(c) || 0),
                ue.isFunction(t) && (t = t.call(e, n, s)),
                null != t.top && (d.top = t.top - s.top + i),
                null != t.left && (d.left = t.left - s.left + a),
                    "using" in t ? t.using.call(e, d) : o.css(d)
            }
        },
        ue.fn.extend({
            position: function () {
                if (this[0]) {
                    var e, t, n = {
                        top: 0,
                        left: 0
                    }, r = this[0];
                    return "fixed" === ue.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(),
                        t = this.offset(),
                    ue.nodeName(e[0], "html") || (n = e.offset()),
                        n.top += ue.css(e[0], "borderTopWidth", !0),
                        n.left += ue.css(e[0], "borderLeftWidth", !0)),
                        {
                            top: t.top - n.top - ue.css(r, "marginTop", !0),
                            left: t.left - n.left - ue.css(r, "marginLeft", !0)
                        }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var e = this.offsetParent || X; e && !ue.nodeName(e, "html") && "static" === ue.css(e, "position");)
                        e = e.offsetParent;
                    return e || X
                })
            }
        }),
        ue.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function (e, n) {
            var r = /Y/.test(n);
            ue.fn[e] = function (i) {
                return ue.access(this, function (e, i, a) {
                    var o = z(e);
                    return a === t ? o ? n in o ? o[n] : o.document.documentElement[i] : e[i] : (o ? o.scrollTo(r ? ue(o).scrollLeft() : a, r ? a : ue(o).scrollTop()) : e[i] = a,
                        t)
                }, e, i, arguments.length, null)
            }
        }),
        ue.each({
            Height: "height",
            Width: "width"
        }, function (e, n) {
            ue.each({
                padding: "inner" + e,
                content: n,
                "": "outer" + e
            }, function (r, i) {
                ue.fn[i] = function (i, a) {
                    var o = arguments.length && (r || "boolean" != typeof i)
                        , s = r || (!0 === i || !0 === a ? "margin" : "border");
                    return ue.access(this, function (n, r, i) {
                        var a;
                        return ue.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (a = n.documentElement,
                            Math.max(n.body["scroll" + e], a["scroll" + e], n.body["offset" + e], a["offset" + e], a["client" + e])) : i === t ? ue.css(n, r, s) : ue.style(n, r, i, s)
                    }, n, o ? i : t, o, null)
                }
            })
        }),
        ue.fn.size = function () {
            return this.length
        }
        ,
        ue.fn.andSelf = ue.fn.addBack,
        "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ue : (e.jQuery = e.$ = ue,
        "function" == typeof define && define.amd && define("jquery", [], function () {
            return ue
        }))
}(window),
    define("g/g-header", ["jquery"], function (e) {
        function t() {
            function t(e) {
                e[0].indexOf(e[1]) > -1 && (e[0] = e[0].replace(e[1], '<span style="color:red;">' + e[1] + "</span>"));
                var t = e[2];
                return e[4] += "<li url=" + e[3] + '><i class="icon icon-' + t + ' "> </i>' + e[0] + '<span class="list-txt"></span></li>',
                    resList = e[4],
                    resList
            }

            function r(n) {
                e.ajax({
                    url: getSearchUrl,
                    method: "GET",
                    timeout: 1e4,
                    data: {
                        keyword: n,
                        suorce: "",
                        action: ""
                    },
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    success: function (r) {
                        var s = JSON.stringify(r.data);
                        localStorage.setItem("common_search_firstData", s),
                            f = localStorage.getItem("common_search_firstData");
                        var d = r.data.length;
                        if (0 == d) {
                            for (var p = [{
                                value: "城市",
                                ico: "place",
                                url: turnToCity
                            }, {
                                value: "车票",
                                ico: "jianpiao",
                                url: turnToTicket
                            }, {
                                value: "正晚点",
                                ico: "time",
                                url: turnToZwd
                            }, {
                                value: "起（止）售时间",
                                ico: "selltime",
                                url: turnToSaletime
                            }, {
                                value: "检票口",
                                ico: "jianpiao",
                                url: turnToTicketcheck
                            }, {
                                value: "时刻表",
                                ico: "date",
                                url: turnToTrainInfo
                            }, {
                                value: "代售点",
                                ico: "train",
                                url: turnToAgencySellTicket
                            }, {
                                value: "交通查询",
                                ico: "zhanche",
                                url: turnToTraffic
                            }, {
                                value: "天气",
                                ico: "weather",
                                url: turnToWeather
                            }, {
                                value: "问答",
                                ico: "wenda",
                                url: turnToAnswer
                            }, {
                                value: "服务",
                                ico: "fuwu",
                                url: turnToService
                            }, {
                                value: "订单",
                                ico: "dingdanchaxun",
                                url: turnToOrder
                            }], d = p.length, h = "", y = 0; y <= d - 1; y++)
                                h += "<li" + p[y].url + '><i class="icon icon-' + p[y].ico + ' "> </i>' + p[y].value + '<span class="list-txt"></span></li>';
                            return e(".search-down-list").html(h),
                                e(".search-down").fadeIn(),
                                l = "noresults",
                                e(".search-down-list").off("click", "li").on("click", "li", function () {
                                    "" != e(this)[0].getAttribute("url") && void 0 != e(this)[0].getAttribute("url") && null != e(this)[0].getAttribute("url") && window.open(e(this)[0].getAttribute("url"))
                                }),
                                void e(".search-down").fadeOut()
                        }
                        for (var m = "", y = 0; y <= d - 1; y++)
                            if ("001" == r.data[y].type) {
                                var g = "huochepiao";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("view" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("002" == r.data[y].type) {
                                var g = "selltime";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("003" == r.data[y].type) {
                                var g = "time";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("004" == r.data[y].type) {
                                var g = "selltime";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("006" == r.data[y].type) {
                                var g = "yupiao";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("100" == r.data[y].type) {
                                var g = "train";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("101" == r.data[y].type) {
                                var g = "huochepiao";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("102" == r.data[y].type) {
                                var g = "dingdanchaxun";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("103" == r.data[y].type) {
                                var g = "dingdanchaxun";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("104" == r.data[y].type) {
                                var g = "user";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("105" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("106" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("107" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("108" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("109" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("110" == r.data[y].type) {
                                var g = "dingcan";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("111" == r.data[y].type) {
                                var g = "user";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("112" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("113" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("114" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("115" == r.data[y].type) {
                                var g = "fuwu";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("116" == r.data[y].type) {
                                var g = "fuwu";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("117" == r.data[y].type) {
                                var g = "fuwu";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("118" == r.data[y].type) {
                                var g = "fuwu";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("119" == r.data[y].type) {
                                var g = "dingdanchaxun";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("120" == r.data[y].type) {
                                var g = "xiangdao";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("121" == r.data[y].type) {
                                var g = "shanglv";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("122" == r.data[y].type) {
                                var g = "user";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("123" == r.data[y].type) {
                                var g = "user";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("124" == r.data[y].type) {
                                var g = "user";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("125" == r.data[y].type) {
                                var g = "fuwu";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("126" == r.data[y].type) {
                                var g = "wenda";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("127" == r.data[y].type) {
                                var g = "dingdanchaxun";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("128" == r.data[y].type) {
                                var g = "dingcan";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("129" == r.data[y].type) {
                                var g = "fuwu";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("130" == r.data[y].type) {
                                var g = "user";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            } else if ("131" == r.data[y].type) {
                                var g = "dingdanchaxun";
                                m = t([r.data[y].word, n, g, r.data[y].url, m])
                            }
                        e(".search-down-list").html(m),
                            e(".search-down").fadeIn(),
                            e(".search-down-list").off("click", "li").on("click", "li", function () {
                                var t = {
                                    innerText: e(this)[0].innerText,
                                    url: e(this)[0].getAttribute("url")
                                };
                                if ("" != t.url && void 0 != t.url && null != t.url) {
                                    window.open(e(this).attr("url")),
                                        c.unshift(t);
                                    var n = c.slice(0, 10);
                                    a("searchHistory", JSON.stringify(n), 60),
                                        o = JSON.parse(i("searchHistory")),
                                        u = o;
                                    for (var r = "", s = 0; s <= u.length - 1; s++)
                                        r += "<li url=" + u[s].url + ">" + u[s].innerText + "</li>";
                                    e(".search-history-list").html(r)
                                }
                            })
                    },
                    error: function (e) {
                    }
                })
            }

            function i(e) {
                var t = document.cookie.indexOf(e)
                    , n = document.cookie.indexOf(";", t);
                return -1 == t ? "" : unescape(document.cookie.substring(t + e.length + 1, n > t ? n : document.cookie.length))
            }

            function a(e, t, n, r, i, a) {
                var o = document.domain;
                o = o.substring(o.indexOf(".") + 1, o.length);
                var s = new Date;
                s.setTime(s.getTime() + 1e3 * n),
                    document.cookie = escape(e) + "=" + escape(t) + (r ? "; path=" + r : ";path=/") + "; domain=" + o + (a ? "; secure" : "") + ";expires=" + s
            }

            jQuery.support.cors = !0;
            var o, s, l, c = [], u = [], d = !0;
            e(".header-search .search-input").on("focus", function () {
                if (d = !0,
                    p.splice(0, p.length),
                    e(this).addClass("focus"),
                    e(".search-btn").css({
                        background: "#2676E3"
                    }),
                    e(".search-down").fadeOut(),
                    e(".search-input").val(""),
                "" == e(".search-input").val() && (b = 0),
                    i("searchHistory"))
                    if (o = JSON.parse(i("searchHistory")),
                        u = o,
                        c = u,
                    0 != u.length) {
                        for (var t = "", n = 0; n <= u.length - 1; n++)
                            t += "<li url=" + u[n].url + ">" + u[n].innerText + "</li>";
                        e(".search-history-list").html(t),
                            e(".search-history").fadeIn()
                    } else
                        e(".search-history").fadeOut();
                else
                    "" != u ? e(".search-history").fadeIn() : e(".search-history").fadeOut();
                e(".search-btn")[0].onclick = function () {
                    var t = e(".header-search .search-input").val();
                    if (t = t.replace(/^ +| +$/g, ""),
                        !(t.length <= 0)) {
                        for (var n = e(".search-input").val(), f = "[@`~!#$^&*()=|{}':;',\\[\\].<>《》/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘’", p = n.length, h = 0; h <= p - 1; h++)
                            if (f.indexOf(n[h]) > -1)
                                return;
                        1 == d && r(n);
                        var y = e(".search-down-list li");
                        if ("noresults" == l)
                            ;
                        else {
                            if (0 == y.length)
                                return;
                            window.open(y.eq(0).attr("url"))
                        }
                        var m = {
                            innerText: n,
                            url: y.eq(0).attr("url")
                        };
                        c.unshift(m),
                            s = c.slice(0, 10),
                            a("searchHistory", JSON.stringify(s), 60),
                            o = JSON.parse(i("searchHistory")),
                            u = o,
                            e(".search-input").val("");
                        for (var g = "", h = 0; h <= u.length; h++) {
                            for (var h = 0; h <= u.length - 1; h++)
                                g += "<li url=" + u[h].url + ">" + u[h].innerText + "</li>";
                            e(".search-history-list").html(g)
                        }
                    }
                }
                    ,
                    e(".search-history-list")[0].onclick = function (t) {
                        var t = t || window.event
                            , n = t.target || t.srcElement;
                        if ("li" === n.nodeName.toLowerCase()) {
                            if ("undefined" == n.getAttribute("url"))
                                return;
                            e(".search-down-list li");
                            window.open(n.getAttribute("url"))
                        }
                    }
                    ,
                    e(".history-clear").on("click", function () {
                        c.splice(0, c.length),
                            s = c.slice(0, 10),
                            a("searchHistory", JSON.stringify(s), 60),
                            o = JSON.parse(i("searchHistory")),
                            u = o,
                            list = "",
                            e(".search-history-list").html(u)
                    })
            });
            var f, p = [];
            if (navigator.userAgent.indexOf("Trident") > -1) {
                var h = (navigator.appName,
                    navigator.appVersion)
                    , y = h.split(";")
                    , m = y && y.length > 1
                    , g = m ? y[1].replace(/[ ]/g, "") : "";
                document.onmousedown = function (t) {
                    var t = t || window.event;
                    if ("MSIE8.0" == g || "MSIE9.0" == g || "MSIE10.0" == g || "WOW64" == g) {
                        var n = t.clientX
                            , r = t.clientY
                            , i = e("#search-input").offset().left
                            ,
                            a = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                            i + e("#search-input").outerWidth())
                            , o = e("#search-input").offset().top
                            , s = e("#search-input").outerHeight()
                            , l = o + s + 204;
                        (n < i || n > a || r < o || r > l) && (e(".search-down").fadeOut(),
                            e(".search-history").fadeOut(),
                            p.splice(0, p.length))
                    }
                }
            } else
                e(".header-search .search-input").on("blur", function () {
                    e(".search-history").fadeOut(),
                        e(this).removeClass("focus"),
                        e(".search-btn").css({
                            "background-color": "#3B99FC"
                        }),
                        e(".search-down").fadeOut(),
                        p.splice(0, p.length)
                });
            var v, _, w, b = 0;
            e(".header-search .search-input").on("keyup", function (t) {
                function n(e) {
                    void 0 !== e && "" !== e && window.open(e)
                }

                8 == t.keyCode && (b = 0),
                    e(".search-history").fadeOut();
                v = t.timeStamp,
                16 != t.keyCode && 38 != t.keyCode && 40 != t.keyCode && 37 != t.keyCode && 39 != t.keyCode && setTimeout(function () {
                    try {
                        if (v - t.timeStamp == 0) {
                            k = e(".search-input").val().toUpperCase(),
                            "" == k && (e(".search-down-list").html(""),
                                e(".search-down").fadeOut()),
                                p.push(k);
                            for (var n = "[@`~!#$^&*()=|{}':;',\\[\\].<>《》/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘’", i = k.length, a = 0; a <= i - 1; a++) {
                                if (n.indexOf(k[a]) > -1)
                                    return e(".search-down-list").html(""),
                                        e(".search-down").fadeOut(),
                                        void (d = !1);
                                d = !0
                            }
                            var o = p.length;
                            if ("" != k)
                                if (k.indexOf(p[o - 2]) > -1) {
                                    e(".search-down-list").html(""),
                                        _ = JSON.parse(f),
                                        w = _.length;
                                    for (var s = "", l = 0, a = 0; a <= w - 1; a++)
                                        if (_[a].word.indexOf(k) > -1 && "001" == _[a].type) {
                                            l++,
                                                _[a].word = _[a].word.replace(k, '<span style="color:red;">' + k + "</span>");
                                            s += "<li url=" + _[a].url + '><i class="icon icon-huochepiao "> </i>' + _[a].word + '<span class="list-txt"></span></li>'
                                        }
                                    0 == l && 1 == d && r(k),
                                        e(".search-down-list").html(s)
                                } else
                                    1 == d && r(k)
                        }
                    } catch (t) {
                        k = e(".search-input").val().toUpperCase();
                        for (var n = "[@`~!#$^&*()=|{}':;',\\[\\].<>《》/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘’", i = k.length, a = 0; a <= i - 1; a++) {
                            if (n.indexOf(k[a]) > -1)
                                return e(".search-down-list").html(""),
                                    e(".search-down").fadeOut(),
                                    void (d = !1);
                            d = !0
                        }
                        "" != k && 1 == d && r(k)
                    }
                }, 500);
                var l = e(".search-down-list li");
                if (1 == b && 40 != t.keyCode && (b = 0),
                40 == t.keyCode && b <= l.length - 1) {
                    b++;
                    for (var h = 0; h <= l.length - 1; h++)
                        l.eq(h).css({
                            background: "",
                            color: "black"
                        }),
                            l.eq(h).children().eq(0).css({
                                color: "#3B99FC"
                            });
                    if (l.eq(b - 1).css({
                        background: "#3B99FC",
                        color: "white"
                    }),
                        l.eq(b - 1).children().eq(0).css({
                            color: "white"
                        }),
                        e("#search-input").val(l.eq(b - 1)[0].innerText),
                    b >= 0 && b < 7)
                        e(".search-down-list").scrollTop(0);
                    else if (6 != b && parseInt(b / 6) >= 1) {
                        var y = parseInt(b / 6) + 1
                            , m = 204 * (y - 1) - 30;
                        e(".search-down-list").scrollTop(m)
                    }
                    l.eq(b - 1).click(function () {
                        window.open(l.eq(b - 1).attr("url"))
                    })
                }
                if (38 == t.keyCode && b > 0) {
                    b--;
                    for (var h = 0; h <= l.length - 1; h++)
                        l.eq(h).css({
                            background: "",
                            color: "black"
                        }),
                            l.eq(h).children().eq(0).css({
                                color: "#3B99FC"
                            });
                    if (l.eq(b - 1).css({
                        background: "#3B99FC",
                        color: "white"
                    }),
                        l.eq(b - 1).children().eq(0).css({
                            color: "white"
                        }),
                        e("#search-input").val(l.eq(b - 1)[0].innerText),
                    b >= 0 && b < 7)
                        e(".search-down-list").scrollTop(0),
                        0 == b && (b = 1);
                    else if (6 != b && parseInt(b / 6) >= 1) {
                        var y = parseInt(b / 6) + 1
                            , m = 203.5 * (y - 1) - 30;
                        e(".search-down-list").scrollTop(m)
                    }
                    l.eq(b - 1).on("click", function () {
                        window.open(l.eq(b).attr("url"))
                    })
                }
                if (13 == t.keyCode) {
                    var g, x = e(".header-search .search-input").val();
                    if (x = x.replace(/^ +| +$/g, ""),
                    x.length <= 0)
                        return;
                    var k = e(".search-input").val();
                    0 == b ? (n(l.eq(0).attr("url")),
                        g = l.eq(0).attr("url")) : (n(l.eq(b - 1).attr("url")),
                        g = l.eq(b - 1).attr("url"));
                    for (var T = {
                        innerText: k,
                        url: g
                    }, C = "[@`~!#$^&*()=|{}':;',\\[\\].<>《》/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘’", D = k.length, h = 0; h <= D - 1; h++)
                        if (C.indexOf(k[h]) > -1)
                            return;
                    c.unshift(T),
                        s = c.slice(0, 10),
                        a("searchHistory", JSON.stringify(s), 60),
                        o = JSON.parse(i("searchHistory")),
                        u = o,
                        e(".search-input").val("")
                }
                for (var S = "", h = 0; h <= u.length - 1; h++)
                    S += "<li url=" + u[h].url + ">" + u[h].innerText + "</li>";
                e(".search-history-list").html(S)
            }),
                e(".search-down .close").on("click", function () {
                    e(".search-input").val(""),
                        e(this).parent().fadeOut(),
                        p.splice(0, p.length)
                }),
                n()
        }

        function n() {
            var t;
            i(),
                e.ajax({
                    url: loginConf,
                    type: "POST",
                    timeout: 1e4,
                    async: !1,
                    success: function (n) {
                        if (n.data) {
                            if (window.otherMaxdate = n.data.other_control && "" != n.data.other_control ? GetDateStr(n.data.other_control - 1) : "15",
                                window.otherMindate = n.data.otherMindate && "" != n.data.otherMindate ? n.data.otherMindate : GetDateStr(0),
                                window.queryUrl = n.data.queryUrl && "" != n.data.queryUrl ? static_url_path + "/" + n.data.queryUrl : queryLeftTicketsUrl,
                                window.psr_qr_code_result = n.data.psr_qr_code_result,
                                window.hb_qr_code_result = n.data.hb_qr_code_result,
                                window.getUserName = n.data.user_name,
                                window.nowTime = n.data.now,
                                stu_control = n.data.stu_control,
                                other_control = n.data.other_control,
                                window.studentDates = n.data.studentDate,
                                n.data.isCheckLanguage) {
                                var i = navigator.language || navigator.userLanguage;
                                console.log(i),
                                    i = i.substr(0, 2),
                                "en" == i && (window.location.href = "https://www.12306.cn/en/index.html")
                            }
                            if ("Y" == n.data.is_login)
                                t = "Y",
                                    window.isLogin = t,
                                    window.ajaxLogin_flag = !0,
                                    a(),
                                    e("#J-header-logout a.txt-primary").html(n.data.name),
                                    e("#J-header-logout a.logout").attr("href", logout);
                            else {
                                var l = ["emailSuccess", "emailError", "registGeneral", "zwdch", "queryTrainInfo"]
                                    , c = r(document.URL);
                                -1 == l.indexOf(c) && ("Y" === n.data.is_uam_login ? o(n.data) : (isOver = !isOver,
                                    s(static_url_path + "/" + n.data.login_url)))
                            }
                        }
                    },
                    error: function (e) {
                        window.ajaxLogin_flag = !0
                    }
                })
        }

        function r(e) {
            var t = /(.*\/)*([^.]+).*/gi;
            return e.replace(t, "$2")
        }

        function i() {
            e("#J-header-login").show(),
                e("#J-header-logout").hide()
        }

        function a() {
            e("#J-header-login").hide(),
                e("#J-header-logout").show()
        }

        function o(t) {
            e.ajax({
                url: passport_apptk_static,
                data: {
                    appid: passport_appId
                },
                xhrFields: {
                    withCredentials: !0
                },
                type: "POST",
                timeout: 1e4,
                async: !1,
                success: function (e) {
                    "0" == e.result_code ? (isLogin = "Y",
                        window.isLogin = isLogin,
                        window.ajaxLogin = (new Date).getTime(),
                        isOver = !isOver,
                        s(userLogin_url)) : (isLogin = "N",
                        window.isLogin = isLogin,
                        window.ajaxLogin = (new Date).getTime(),
                        isOver = !isOver,
                        s(static_url_path + "/" + t.login_url)),
                        window.ajaxLogin_flag = !0
                },
                error: function (e) {
                    window.ajaxLogin_flag = !0
                }
            })
        }

        function s(e) {
            window.location.href = e
        }

        return window.isLogin = "N",
            window.ajaxLogin_flag = !1,
            e("#index_ads") && e("#index_ads").length > 0 ? e("#gLink").click(function () {
                return e("html, body").animate({
                    scrollTop: e("#index_ads").offset().top
                }, {
                    duration: 500,
                    easing: "swing"
                }),
                    !1
            }) : e("#gLink").click(function () {
                e("#gLink").attr("href", ggHtml)
            }),
            {
                initialize: function () {
                    t(),
                        window.gHeader = (new Date).getTime()
                }
            }
    }),
    define("g/g-footer", ["jquery"], function (e) {
        function t() {
            var t = e(window).height()
                , n = e(".footer").height()
                , r = e(".content").height()
                , i = t - 109 - n;
            r <= i && e(".content").css({
                "min-height": i
            })
        }

        return {
            initialize: function () {
                t(),
                    window.gFooter = (new Date).getTime()
            }
        }
    }),
    define("g/g-href", ["jquery"], function (e) {
        function t() {
            e('a[name="g_href"]').click(function () {
                var t = e(this).attr("data-redirect")
                    , n = e(this).attr("data-type")
                    , r = e(this).attr("data-href")
                    , i = e(this).attr("data-target");
                "Y" == t ? "_blank" == i ? 1 == n ? window.open(href_baseUrl_1 + href_path_1 + r) : 2 == n ? window.open(href_baseUrl_2 + href_path_2 + r) : 3 == n ? window.open(href_baseUrl_3 + href_path_3 + r) : 4 == n ? window.open(href_baseUrl_4 + href_path_4 + r) : 5 == n ? window.open(href_baseUrl_5 + href_path_5 + r) : 6 == n ? window.open(href_baseUrl_6 + href_path_6 + r) : 10 == n && window.open(href_baseUrl_10 + href_path_10 + r) : 1 == n ? window.location.href = href_baseUrl_1 + href_path_1 + r : 2 == n ? window.location.href = href_baseUrl_2 + href_path_2 + r : 3 == n ? window.location.href = href_baseUrl_3 + href_path_3 + r : 4 == n ? window.location.href = href_baseUrl_4 + href_path_4 + r : 5 == n ? window.location.href = href_baseUrl_5 + href_path_5 + r : 6 == n ? window.location.href = href_baseUrl_6 + href_path_6 + r : 10 == n && (window.location.href = href_baseUrl_10 + href_path_10 + r) : "_blank" == i ? window.open(r) : window.location.href = r
            })
        }

        return {
            initialize: function () {
                t()
            }
        }
    }),
    function (e) {
        "function" == typeof define && define.amd ? define("core/common/jquery.SuperSlide", ["jquery"], e) : e(jQuery)
    }(function (e) {
        !function (e) {
            e.fn.slide = function (t) {
                return e.fn.slide.defaults = {
                    type: "slide",
                    effect: "fade",
                    autoPlay: !1,
                    delayTime: 500,
                    interTime: 2500,
                    triggerTime: 150,
                    defaultIndex: 0,
                    titCell: ".hd li",
                    mainCell: ".bd",
                    targetCell: null,
                    trigger: "mouseover",
                    scroll: 1,
                    vis: 1,
                    titOnClassName: "on",
                    autoPage: !1,
                    prevCell: ".prev",
                    nextCell: ".next",
                    pageStateCell: ".pageState",
                    opp: !1,
                    pnLoop: !0,
                    easing: "swing",
                    startFun: null,
                    endFun: null,
                    switchLoad: null,
                    playStateCell: ".playState",
                    mouseOverStop: !0,
                    defaultPlay: !0,
                    returnDefault: !1
                },
                    this.each(function () {
                        var n, r = e.extend({}, e.fn.slide.defaults, t), i = e(this), a = r.effect,
                            o = e(r.prevCell, i), s = e(r.nextCell, i), l = e(r.pageStateCell, i),
                            c = e(r.playStateCell, i), u = e(r.titCell, i), d = u.size(), f = e(r.mainCell, i),
                            p = f.children().size(), h = r.switchLoad, y = e(r.targetCell, i),
                            m = parseInt(r.defaultIndex), g = parseInt(r.delayTime), v = parseInt(r.interTime),
                            _ = (parseInt(r.triggerTime),
                                parseInt(r.scroll)), w = "false" != r.autoPlay && 0 != r.autoPlay,
                            b = "false" != r.opp && 0 != r.opp, x = "false" != r.autoPage && 0 != r.autoPage,
                            k = "false" != r.pnLoop && 0 != r.pnLoop,
                            T = "false" != r.mouseOverStop && 0 != r.mouseOverStop,
                            C = "false" != r.defaultPlay && 0 != r.defaultPlay,
                            D = "false" != r.returnDefault && 0 != r.returnDefault,
                            S = isNaN(r.vis) ? 1 : parseInt(r.vis), N = !-[1] && !window.XMLHttpRequest, j = 0, M = 0,
                            O = 0, E = 0, q = r.easing, A = null, I = null, L = null, F = r.titOnClassName,
                            H = u.index(i.find("." + F)), P = m = -1 == H ? m : H, U = m, B = m,
                            R = p >= S ? p % _ != 0 ? p % _ : _ : 0, W = "leftMarquee" == a || "topMarquee" == a,
                            $ = function () {
                                e.isFunction(r.startFun) && r.startFun(m, d, i, e(r.titCell, i), f, y, o, s)
                            }, z = function () {
                                e.isFunction(r.endFun) && r.endFun(m, d, i, e(r.titCell, i), f, y, o, s)
                            }, Q = function () {
                                u.removeClass(F),
                                C && u.eq(U).addClass(F)
                            };
                        if ("menu" == r.type)
                            return C && u.removeClass(F).eq(m).addClass(F),
                                u.hover(function () {
                                    n = e(this).find(r.targetCell);
                                    var t = u.index(e(this));
                                    I = setTimeout(function () {
                                        switch (m = t,
                                            u.removeClass(F).eq(m).addClass(F),
                                            $(),
                                            a) {
                                            case "fade":
                                                n.stop(!0, !0).animate({
                                                    opacity: "show"
                                                }, g, q, z);
                                                break;
                                            case "slideDown":
                                                n.stop(!0, !0).animate({
                                                    height: "show"
                                                }, g, q, z)
                                        }
                                    }, r.triggerTime)
                                }, function () {
                                    switch (clearTimeout(I),
                                        a) {
                                        case "fade":
                                            n.animate({
                                                opacity: "hide"
                                            }, g, q);
                                            break;
                                        case "slideDown":
                                            n.animate({
                                                height: "hide"
                                            }, g, q)
                                    }
                                }),
                                void (D && i.hover(function () {
                                    clearTimeout(L)
                                }, function () {
                                    L = setTimeout(Q, g)
                                }));
                        if (0 == d && (d = p),
                        W && (d = 2),
                            x) {
                            if (p >= S)
                                if ("leftLoop" == a || "topLoop" == a)
                                    d = p % _ != 0 ? 1 + (p / _ ^ 0) : p / _;
                                else {
                                    var Y = p - S;
                                    d = 1 + parseInt(Y % _ != 0 ? Y / _ + 1 : Y / _),
                                    d <= 0 && (d = 1)
                                }
                            else
                                d = 1;
                            u.html("");
                            var J = "";
                            if (1 == r.autoPage || "true" == r.autoPage)
                                for (var Z = 0; Z < d; Z++)
                                    J += "<li>" + (Z + 1) + "</li>";
                            else
                                for (var Z = 0; Z < d; Z++)
                                    J += r.autoPage.replace("$", Z + 1);
                            u.html(J);
                            var u = u.children()
                        }
                        if (p >= S) {
                            f.children().each(function () {
                                e(this).width() > O && (O = e(this).width(),
                                    M = e(this).outerWidth(!0)),
                                e(this).height() > E && (E = e(this).height(),
                                    j = e(this).outerHeight(!0))
                            });
                            var G = f.children()
                                , X = function () {
                                for (var e = 0; e < S; e++)
                                    G.eq(e).clone().addClass("clone").appendTo(f);
                                for (var e = 0; e < R; e++)
                                    G.eq(p - e - 1).clone().addClass("clone").prependTo(f)
                            };
                            switch (a) {
                                case "fold":
                                    f.css({
                                        position: "relative",
                                        width: M,
                                        height: j
                                    }).children().css({
                                        position: "absolute",
                                        width: O,
                                        left: 0,
                                        top: 0,
                                        display: "none"
                                    });
                                    break;
                                case "top":
                                    f.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + S * j + 'px"></div>').css({
                                        top: -m * _ * j,
                                        position: "relative",
                                        padding: "0",
                                        margin: "0"
                                    }).children().css({
                                        height: E
                                    });
                                    break;
                                case "left":
                                    f.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + S * M + 'px"></div>').css({
                                        width: p * M,
                                        left: -m * _ * M,
                                        position: "relative",
                                        overflow: "hidden",
                                        padding: "0",
                                        margin: "0"
                                    }).children().css({
                                        float: "left",
                                        width: O
                                    });
                                    break;
                                case "leftLoop":
                                case "leftMarquee":
                                    X(),
                                        f.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + S * M + 'px"></div>').css({
                                            width: (p + S + R) * M,
                                            position: "relative",
                                            overflow: "hidden",
                                            padding: "0",
                                            margin: "0",
                                            left: -(R + m * _) * M
                                        }).children().css({
                                            float: "left",
                                            width: O
                                        });
                                    break;
                                case "topLoop":
                                case "topMarquee":
                                    X(),
                                        f.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + S * j + 'px"></div>').css({
                                            height: (p + S + R) * j,
                                            position: "relative",
                                            padding: "0",
                                            margin: "0",
                                            top: -(R + m * _) * j
                                        }).children().css({
                                            height: E
                                        })
                            }
                        }
                        var V = function (e) {
                            var t = e * _;
                            return e == d ? t = p : -1 == e && p % _ != 0 && (t = -p % _),
                                t
                        }
                            , K = function (t) {
                            var n = function (n) {
                                for (var r = n; r < S + n; r++)
                                    t.eq(r).find("img[" + h + "]").each(function () {
                                        var t = e(this);
                                        if (t.attr("src", t.attr(h)).removeAttr(h),
                                            f.find(".clone")[0])
                                            for (var n = f.children(), r = 0; r < n.size(); r++)
                                                n.eq(r).find("img[" + h + "]").each(function () {
                                                    e(this).attr(h) == t.attr("src") && e(this).attr("src", e(this).attr(h)).removeAttr(h)
                                                })
                                    })
                            };
                            switch (a) {
                                case "fade":
                                case "fold":
                                case "top":
                                case "left":
                                case "slideDown":
                                    n(m * _);
                                    break;
                                case "leftLoop":
                                case "topLoop":
                                    n(R + V(B));
                                    break;
                                case "leftMarquee":
                                case "topMarquee":
                                    var r = "leftMarquee" == a ? f.css("left").replace("px", "") : f.css("top").replace("px", "")
                                        , i = "leftMarquee" == a ? M : j
                                        , o = R;
                                    if (r % i != 0) {
                                        var s = Math.abs(r / i ^ 0);
                                        o = 1 == m ? R + s : R + s - 1
                                    }
                                    n(o)
                            }
                        }
                            , ee = function (e) {
                            if (!C || P != m || e || W) {
                                if (W ? m >= 1 ? m = 1 : m <= 0 && (m = 0) : (B = m,
                                    m >= d ? m = 0 : m < 0 && (m = d - 1)),
                                    $(),
                                null != h && K(f.children()),
                                y[0] && (n = y.eq(m),
                                null != h && K(y),
                                    "slideDown" == a ? (y.not(n).stop(!0, !0).slideUp(g),
                                        n.slideDown(g, q, function () {
                                            f[0] || z()
                                        })) : (y.not(n).stop(!0, !0).hide(),
                                        n.animate({
                                            opacity: "show"
                                        }, g, function () {
                                            f[0] || z()
                                        }))),
                                p >= S)
                                    switch (a) {
                                        case "fade":
                                            f.children().stop(!0, !0).eq(m).animate({
                                                opacity: "show"
                                            }, g, q, function () {
                                                z()
                                            }).siblings().hide();
                                            break;
                                        case "fold":
                                            f.children().stop(!0, !0).eq(m).animate({
                                                opacity: "show"
                                            }, g, q, function () {
                                                z()
                                            }).siblings().animate({
                                                opacity: "hide"
                                            }, g, q);
                                            break;
                                        case "top":
                                            f.stop(!0, !1).animate({
                                                top: -m * _ * j
                                            }, g, q, function () {
                                                z()
                                            });
                                            break;
                                        case "left":
                                            f.stop(!0, !1).animate({
                                                left: -m * _ * M
                                            }, g, q, function () {
                                                z()
                                            });
                                            break;
                                        case "leftLoop":
                                            var t = B;
                                            f.stop(!0, !0).animate({
                                                left: -(V(B) + R) * M
                                            }, g, q, function () {
                                                t <= -1 ? f.css("left", -(R + (d - 1) * _) * M) : t >= d && f.css("left", -R * M),
                                                    z()
                                            });
                                            break;
                                        case "topLoop":
                                            var t = B;
                                            f.stop(!0, !0).animate({
                                                top: -(V(B) + R) * j
                                            }, g, q, function () {
                                                t <= -1 ? f.css("top", -(R + (d - 1) * _) * j) : t >= d && f.css("top", -R * j),
                                                    z()
                                            });
                                            break;
                                        case "leftMarquee":
                                            var r = f.css("left").replace("px", "");
                                            0 == m ? f.animate({
                                                left: ++r
                                            }, 0, function () {
                                                f.css("left").replace("px", "") >= 0 && f.css("left", -p * M)
                                            }) : f.animate({
                                                left: --r
                                            }, 0, function () {
                                                f.css("left").replace("px", "") <= -(p + R) * M && f.css("left", -R * M)
                                            });
                                            break;
                                        case "topMarquee":
                                            var i = f.css("top").replace("px", "");
                                            0 == m ? f.animate({
                                                top: ++i
                                            }, 0, function () {
                                                f.css("top").replace("px", "") >= 0 && f.css("top", -p * j)
                                            }) : f.animate({
                                                top: --i
                                            }, 0, function () {
                                                f.css("top").replace("px", "") <= -(p + R) * j && f.css("top", -R * j)
                                            })
                                    }
                                u.removeClass(F).eq(m).addClass(F),
                                    P = m,
                                k || (s.removeClass("nextStop"),
                                    o.removeClass("prevStop"),
                                0 == m && o.addClass("prevStop"),
                                m == d - 1 && s.addClass("nextStop")),
                                    l.html("<span>" + (m + 1) + "</span>/" + d)
                            }
                        };
                        C && ee(!0),
                        D && i.hover(function () {
                            clearTimeout(L)
                        }, function () {
                            L = setTimeout(function () {
                                m = U,
                                    C ? ee() : "slideDown" == a ? n.slideUp(g, Q) : n.animate({
                                        opacity: "hide"
                                    }, g, Q),
                                    P = m
                            }, 300)
                        });
                        var te = function (e) {
                            A = setInterval(function () {
                                b ? m-- : m++,
                                    ee()
                            }, e || v)
                        }
                            , ne = function (e) {
                            A = setInterval(ee, e || v)
                        }
                            , re = function () {
                            T || !w || c.hasClass("pauseState") || (clearInterval(A),
                                te())
                        }
                            , ie = function () {
                            (k || m != d - 1) && (m++,
                                ee(),
                            W || re())
                        }
                            , ae = function () {
                            (k || 0 != m) && (m--,
                                ee(),
                            W || re())
                        }
                            , oe = function () {
                            clearInterval(A),
                                W ? ne() : te(),
                                c.removeClass("pauseState")
                        }
                            , se = function () {
                            clearInterval(A),
                                c.addClass("pauseState")
                        };
                        if (w ? W ? (b ? m-- : m++,
                            ne(),
                        T && f.hover(se, oe)) : (te(),
                        T && i.hover(se, oe)) : (W && (b ? m-- : m++),
                            c.addClass("pauseState")),
                            c.click(function () {
                                c.hasClass("pauseState") ? oe() : se()
                            }),
                            "mouseover" == r.trigger ? u.hover(function () {
                                var e = u.index(this);
                                I = setTimeout(function () {
                                    m = e,
                                        ee(),
                                        re()
                                }, r.triggerTime)
                            }, function () {
                                clearTimeout(I)
                            }) : u.click(function () {
                                m = u.index(this),
                                    ee(),
                                    re()
                            }),
                            W) {
                            if (s.mousedown(ie),
                                o.mousedown(ae),
                                k) {
                                var le, ce = function () {
                                    le = setTimeout(function () {
                                        clearInterval(A),
                                            ne(v / 10 ^ 0)
                                    }, 150)
                                }, ue = function () {
                                    clearTimeout(le),
                                        clearInterval(A),
                                        ne()
                                };
                                s.mousedown(ce),
                                    s.mouseup(ue),
                                    o.mousedown(ce),
                                    o.mouseup(ue)
                            }
                            "mouseover" == r.trigger && (s.hover(ie, function () {
                            }),
                                o.hover(ae, function () {
                                }))
                        } else
                            s.click(ie),
                                o.click(ae);
                        if ("auto" == r.vis && 1 == _ && ("left" == a || "leftLoop" == a)) {
                            var de, fe = function () {
                                N && (f.width("auto"),
                                    f.children().width("auto")),
                                    f.parent().width("auto"),
                                    M = f.parent().width(),
                                N && f.parent().width(M),
                                    f.children().width(M),
                                    "left" == a ? (f.width(M * p),
                                        f.stop(!0, !1).animate({
                                            left: -m * M
                                        }, 0)) : (f.width(M * (p + 2)),
                                        f.stop(!0, !1).animate({
                                            left: -(m + 1) * M
                                        }, 0)),
                                N || M == f.parent().width() || fe()
                            };
                            e(window).resize(function () {
                                clearTimeout(de),
                                    de = setTimeout(fe, 100)
                            }),
                                fe()
                        }
                    })
            }
        }(jQuery),
            jQuery.easing.jswing = jQuery.easing.swing,
            jQuery.extend(jQuery.easing, {
                def: "easeOutQuad",
                swing: function (e, t, n, r, i) {
                    return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
                },
                easeInQuad: function (e, t, n, r, i) {
                    return r * (t /= i) * t + n
                },
                easeOutQuad: function (e, t, n, r, i) {
                    return -r * (t /= i) * (t - 2) + n
                },
                easeInOutQuad: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
                },
                easeInCubic: function (e, t, n, r, i) {
                    return r * (t /= i) * t * t + n
                },
                easeOutCubic: function (e, t, n, r, i) {
                    return r * ((t = t / i - 1) * t * t + 1) + n
                },
                easeInOutCubic: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
                },
                easeInQuart: function (e, t, n, r, i) {
                    return r * (t /= i) * t * t * t + n
                },
                easeOutQuart: function (e, t, n, r, i) {
                    return -r * ((t = t / i - 1) * t * t * t - 1) + n
                },
                easeInOutQuart: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
                },
                easeInQuint: function (e, t, n, r, i) {
                    return r * (t /= i) * t * t * t * t + n
                },
                easeOutQuint: function (e, t, n, r, i) {
                    return r * ((t = t / i - 1) * t * t * t * t + 1) + n
                },
                easeInOutQuint: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n
                },
                easeInSine: function (e, t, n, r, i) {
                    return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
                },
                easeOutSine: function (e, t, n, r, i) {
                    return r * Math.sin(t / i * (Math.PI / 2)) + n
                },
                easeInOutSine: function (e, t, n, r, i) {
                    return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
                },
                easeInExpo: function (e, t, n, r, i) {
                    return 0 == t ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
                },
                easeOutExpo: function (e, t, n, r, i) {
                    return t == i ? n + r : r * (1 - Math.pow(2, -10 * t / i)) + n
                },
                easeInOutExpo: function (e, t, n, r, i) {
                    return 0 == t ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r / 2 * (2 - Math.pow(2, -10 * --t)) + n
                },
                easeInCirc: function (e, t, n, r, i) {
                    return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
                },
                easeOutCirc: function (e, t, n, r, i) {
                    return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
                },
                easeInOutCirc: function (e, t, n, r, i) {
                    return (t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
                },
                easeInElastic: function (e, t, n, r, i) {
                    var a = 1.70158
                        , o = 0
                        , s = r;
                    if (0 == t)
                        return n;
                    if (1 == (t /= i))
                        return n + r;
                    if (o || (o = .3 * i),
                    s < Math.abs(r)) {
                        s = r;
                        var a = o / 4
                    } else
                        var a = o / (2 * Math.PI) * Math.asin(r / s);
                    return -s * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - a) * (2 * Math.PI) / o) + n
                },
                easeOutElastic: function (e, t, n, r, i) {
                    var a = 1.70158
                        , o = 0
                        , s = r;
                    if (0 == t)
                        return n;
                    if (1 == (t /= i))
                        return n + r;
                    if (o || (o = .3 * i),
                    s < Math.abs(r)) {
                        s = r;
                        var a = o / 4
                    } else
                        var a = o / (2 * Math.PI) * Math.asin(r / s);
                    return s * Math.pow(2, -10 * t) * Math.sin((t * i - a) * (2 * Math.PI) / o) + r + n
                },
                easeInOutElastic: function (e, t, n, r, i) {
                    var a = 1.70158
                        , o = 0
                        , s = r;
                    if (0 == t)
                        return n;
                    if (2 == (t /= i / 2))
                        return n + r;
                    if (o || (o = i * (.3 * 1.5)),
                    s < Math.abs(r)) {
                        s = r;
                        var a = o / 4
                    } else
                        var a = o / (2 * Math.PI) * Math.asin(r / s);
                    return t < 1 ? s * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - a) * (2 * Math.PI) / o) * -.5 + n : s * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - a) * (2 * Math.PI) / o) * .5 + r + n
                },
                easeInBack: function (e, t, n, r, i, a) {
                    return void 0 == a && (a = 1.70158),
                    r * (t /= i) * t * ((a + 1) * t - a) + n
                },
                easeOutBack: function (e, t, n, r, i, a) {
                    return void 0 == a && (a = 1.70158),
                    r * ((t = t / i - 1) * t * ((a + 1) * t + a) + 1) + n
                },
                easeInOutBack: function (e, t, n, r, i, a) {
                    return void 0 == a && (a = 1.70158),
                        (t /= i / 2) < 1 ? r / 2 * (t * t * ((1 + (a *= 1.525)) * t - a)) + n : r / 2 * ((t -= 2) * t * ((1 + (a *= 1.525)) * t + a) + 2) + n
                },
                easeInBounce: function (e, t, n, r, i) {
                    return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
                },
                easeOutBounce: function (e, t, n, r, i) {
                    return (t /= i) < 1 / 2.75 ? r * (7.5625 * t * t) + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
                },
                easeInOutBounce: function (e, t, n, r, i) {
                    return t < i / 2 ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, r, i) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - i, 0, r, i) + .5 * r + n
                }
            })
    });
var seatsInfoList = [{
    seat_type_detail: "商务座",
    seat_type_name: "商务座",
    seat_type_code: "9",
    seat_type_index: "32"
}, {
    seat_type_detail: "特等座",
    seat_type_name: "特等座",
    seat_type_code: "P",
    seat_type_index: "25"
}, {
    seat_type_detail: "一等座",
    seat_type_name: "一等座",
    seat_type_code: "M",
    seat_type_index: "31"
}, {
    seat_type_detail: "二等座",
    seat_type_name: "二等座",
    seat_type_code: "O",
    seat_type_index: "30"
}, {
    seat_type_detail: "高级软卧",
    seat_type_name: "高级软卧",
    seat_type_code: "6",
    seat_type_index: "21"
}, {
    seat_type_detail: "软卧",
    seat_type_name: "软卧",
    seat_type_code: "4",
    seat_type_index: "23"
}, {
    seat_type_detail: "一等卧",
    seat_type_name: "一等卧",
    seat_type_code: "I",
    seat_type_index: "22"
}, {
    seat_type_detail: "动卧",
    seat_type_name: "动卧",
    seat_type_code: "F",
    seat_type_index: "33"
}, {
    seat_type_detail: "硬卧",
    seat_type_name: "硬卧",
    seat_type_code: "3",
    seat_type_index: "28"
}, {
    seat_type_detail: "二等卧",
    seat_type_name: "二等卧",
    seat_type_code: "J",
    seat_type_index: "22"
}, {
    seat_type_detail: "软座",
    seat_type_name: "软座",
    seat_type_code: "2",
    seat_type_index: "24"
}, {
    seat_type_detail: "硬座",
    seat_type_name: "硬座",
    seat_type_code: "1",
    seat_type_index: "29"
}, {
    seat_type_detail: "高级动卧",
    seat_type_name: "高级动卧",
    seat_type_code: "A",
    seat_type_index: "27"
}, {
    seat_type_detail: "包厢硬卧",
    seat_type_name: "包厢硬卧",
    seat_type_code: "5",
    seat_type_index: "22"
}, {
    seat_type_detail: "一等软座",
    seat_type_name: "一等软座",
    seat_type_code: "7",
    seat_type_index: "22"
}, {
    seat_type_detail: "二等软座",
    seat_type_name: "二等软座",
    seat_type_code: "8",
    seat_type_index: "22"
}, {
    seat_type_detail: "特等软座",
    seat_type_name: "特等软座",
    seat_type_code: "E",
    seat_type_index: "22"
}, {
    seat_type_detail: "一人软包",
    seat_type_name: "一人软包",
    seat_type_code: "H",
    seat_type_index: "22"
}, {
    seat_type_detail: "多功能座",
    seat_type_name: "多功能座",
    seat_type_code: "Q",
    seat_type_index: "22"
}, {
    seat_type_detail: "二等包座",
    seat_type_name: "二等包座",
    seat_type_code: "S",
    seat_type_index: "22"
}, {
    seat_type_detail: "无座",
    seat_type_name: "无座",
    seat_type_code: "W",
    seat_type_index: "26"
}]
    , GetStrDateSubtract = function (e, t) {
    e = new Date(e.replace(/-/g, "/")),
        t = new Date(t.replace(/-/g, "/"));
    var n = t.getTime() - e.getTime();
    return parseInt(n / 864e5)
}
    , formatDate = function (e) {
    var t = e.getFullYear()
        , n = e.getMonth() + 1;
    n = n < 10 ? "0" + n : n;
    var r = e.getDate();
    return r = r < 10 ? "0" + r : r,
    t + "-" + n + "-" + r
};
Array.prototype.distinct = function () {
    var e, t, n = this, r = n.length;
    for (e = 0; e < r; e++)
        for (t = e + 1; t < r; t++)
            n[e] == n[t] && (n.splice(t, 1),
                r--,
                t--);
    return n
}
;
var formatDateNextMonth = function (e) {
    var t = new Date
        , n = new Date(t);
    return n.setDate(t.getDate() + 29),
    n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate()
}
    , userinfo_messages = {
    "userinfo_message.confirm_info": "您确认吗？",
    "userinfo_message.title_info": "信息提示",
    "userinfo_message.error_info": "错误提示",
    "userinfo_button.ok_info": "确认",
    "userinfo_phone.null_error": "请输入手机号！",
    "userinfo_phone.ismobile_error": "您输入的手机号码不是有效的格式！",
    "userinfo_email.null_error": "请输入电子邮件地址！",
    "userinfo_email.isemail_error": "请输入有效的电子邮件地址！",
    "userinfo_email.remote_error": "电子邮件地址已被注册，请使用其他email！",
    "userinfo_name.null_error": "请输入您的姓名！",
    "userinfo_name.range_length_error": "允许输入的字符串在3-30个字符之间！",
    "userinfo_name.:char_blank_error": "姓名只能包含中文或者英文，如有生僻字或繁体字参见姓名填写规则进行填写！",
    "userinfo_sex.:null_error": "请选择性别！",
    "userinfo_password.null_error": "请输入密码！",
    "userinfo_password.length_error": "密码长度不能少于6个字符！",
    "userinfo_telephone.pattern_error": "固定电话格式错误",
    "userinfo_idtype.null_error": "请选择证件类型！",
    "userinfo_bornDate.null_error": "请选择出生日期！",
    "userinfo_youxiaoDate.null_error": "请选择有效截止日期！",
    "userinfo_idno.null_error": "请输入证件号码！",
    "userinfo_idno.id_valid_error": "输入的证件号码中包含中文信息或特殊字符！",
    "userinfo_idno.sec_id_card_error": "请正确输入18位的证件号码！",
    "userinfo_idno.fir_id_card_error": "请正确输入15或者18位的证件号码！",
    "userinfo_idno.check_Hkmacao_error": "请输入有效的港澳居民通行证号码！",
    "userinfo_idno.check_taiw_error": "请输入有效的台湾居民通行证号码！",
    "userinfo_idno.check_passport_error": "请输入有效的护照号码！",
    "userinfo_idno.check_work_error": "请输入有效的外国人居留证号码！",
    "userinfo_student.province_name_error": "请输入省份！",
    "userinfo_student.school_name_error": "请输入学校！",
    "userinfo_student.student_no_error": "请输入学号！",
    "userinfo_student.school_system_error": "请选择学制！",
    "userinfo_student.enter_year_error": "请选择入学年份！"
}
    , arry_zh = []
    , arry_en = [];
define("core/common/mUtils", function () {
}),
    function (e) {
        "function" == typeof define && define.amd ? define("core/common/common", ["jquery"], e) : e(jQuery)
    }(function (e) {
        var t = function () {
            e(".js-gotop").on("click", function (t) {
                return t.preventDefault(),
                    e("html, body").animate({
                        scrollTop: e("html").offset().top
                    }, 500, "easeInOutExpo"),
                    !1
            }),
                e(window).scroll(function () {
                    e(window).scrollTop() > 200 ? e(".js-top").addClass("active") : e(".js-top").removeClass("active")
                })
        }
            , n = function () {
            var t = t || event;
            e("#topMenu").on("focus", "li", function () {
                e(this).children(".item").attr("aria-expanded", "true"),
                    e(this).children("ul").show(),
                    e(this).siblings().children("ul").hide(),
                    e(this).siblings().children(".item").attr("aria-expanded", "false")
            }),
                e("#topMenu").on("mouseover", "li", function () {
                    e(this).children("ul").show(),
                        e(this).siblings().children("ul").hide()
                }),
                e(document).on("keydown", function (t) {
                    "9" == t.keyCode && e(this).click(function (t) {
                        var n = e(t.target);
                        0 == n.closest(".nav").length && (e(".nav-bd").css("display", "none"),
                            e("#wbomeal .item").attr("aria-expanded", "false")),
                        0 == n.closest("#topMenu").length && (e(".menu-nav-bd").css("display", "none"),
                            e("#topMenu .item").attr("aria-expanded", "false"))
                    })
                });
            var n = "true";
            e("#wbomeal").on("keydown", "li", function (t) {
                "13" == t.keyCode ? "true" == n ? (e(this).children("div").show(),
                    e(this).children(".item").attr("aria-expanded", "true"),
                    n = "false",
                    e(this).siblings().children("div").hide(),
                    e(this).siblings().children("a").attr("aria-expanded", "false")) : (e(this).children("div").hide(),
                    e(this).children(".item").attr("aria-expanded", "false"),
                    n = "true") : "9" == t.keyCode && (n = "true",
                t.shiftKey && (n = "false"))
            }),
                e("#wbomeal").on("mouseover", "li", function () {
                    e(this).children("div").show(),
                        e(this).siblings().children("div").hide()
                }),
                e("#wbomeal").on("mouseleave", "li", function () {
                    e(this).children("div").hide()
                })
        }
            , r = function () {
            var t = e(window).height() - e(".header").outerHeight(!0) - e(".footer").outerHeight(!0);
            e(".content").css("min-height", t)
        };
        e(function () {
            t(),
                n(),
                r()
        }),
            e(window).on("resize", function () {
                r()
            });
        e(".center-menu .icon-switch").on("click", function () {
            var t = e(this)
                , n = t.parent().next();
            if (n.is(".menu-sub") && n.is(":visible"))
                n.slideUp(300, function () {
                    n.parent("li").addClass("menu-less")
                });
            else if (n.is(".menu-sub") && !n.is(":visible")) {
                var r = t.parents(".menu-item");
                n.slideDown(300, function () {
                    r.removeClass("menu-less")
                })
            }
        }),
            e("body").on("click", ".order-panel .icon-fold", function () {
                var t = e(this)
                    , n = t.parent().next();
                if (n.is(".order-item-bd") && n.is(":visible"))
                    n.slideUp(300, function () {
                        n.parents(".order-item").addClass("show-less")
                    });
                else if (n.is(".order-item-bd") && !n.is(":visible")) {
                    var r = t.parents(".order-item");
                    n.slideDown(300, function () {
                        r.removeClass("show-less")
                    })
                }
            }),
            e("#js-minHeight").css("minHeight", e(".center-menu").outerHeight()),
            e(".center-main .tab-item").css("minHeight", e(".center-menu").outerHeight() - 42),
            e("body").on("click", function (t) {
                e(".sel").removeClass("active")
            }),
            e("body").on("click", ".sel .sel-hd", function (t) {
                t.stopPropagation(),
                    e(".sel").removeClass("active"),
                e(this).children().hasClass("form-bd-txt") || e(this).parent().addClass("active")
            }),
            e("body").on("click", '.sel .sel-list li:not(".disabled")', function (t) {
                t.stopPropagation();
                var n = e(this).html()
                    , r = e(this).parents(".sel");
                e(this).addClass("selected").siblings().removeClass("selected"),
                    r.find(".sel-inner").html(n),
                    r.removeClass("active")
            })
    }),
    function (e) {
        "function" == typeof define && define.amd ? define("core/common/data.jcokies", ["jquery"], e) : e(jQuery)
    }(function (e) {
        jQuery.extend({
            jc_getFromStation: function () {
                return e.jc_getcookie("_jc_save_fromStation")
            },
            jc_setFromStation: function (t, n) {
                if (void 0 === t || void 0 === n || "" == t || "" == n)
                    throw "参数错误";
                var r = t + "," + n;
                e.jc_setcookie("_jc_save_fromStation", r, 10)
            },
            jc_getToStation: function () {
                return e.jc_getcookie("_jc_save_toStation")
            },
            jc_setToStation: function (t, n) {
                if (void 0 === t || void 0 === n || "" == t || "" == n)
                    throw "参数错误";
                var r = t + "," + n;
                e.jc_setcookie("_jc_save_toStation", r, 10)
            },
            jc_getFromDate: function () {
                return e.jc_getcookie("_jc_save_fromDate")
            },
            jc_setFromDate: function (t) {
                void 0 === t && (t = "");
                var n = t;
                e.jc_setcookie("_jc_save_fromDate", n, 10)
            },
            jc_getTrainNumber: function () {
                return e.jc_getcookie("_jc_save_trainNumber")
            },
            jc_setTrainNumber: function (t) {
                void 0 === t && (t = "");
                var n = t;
                e.jc_setcookie("_jc_save_trainNumber", n, 10)
            },
            jc_zGetTrainStition: function () {
                return e.jc_getcookie("_jc_save_zwdch_fromStation")
            },
            jc_zSetTrainStition: function (t, n) {
                if (void 0 === t || void 0 === n || "" == t || "" == n)
                    throw "参数错误";
                var r = t + "," + n;
                e.jc_setcookie("_jc_save_zwdch_fromStation", r, 10)
            },
            jc_zGetTrainNumber: function () {
                return e.jc_getcookie("_jc_save_zwdch_cc")
            },
            jc_zSetTrainNumber: function (t) {
                void 0 === t && (t = "");
                var n = t;
                e.jc_setcookie("_jc_save_zwdch_cc", n, 10)
            },
            jc_getIsStudent: function () {
                return e.jc_getcookie("_jc_save_stuFlag_flag")
            },
            jc_setIsStudent: function (t) {
                void 0 === t && (t = "");
                var n = t;
                e.jc_setcookie("_jc_save_stuFlag_flag", n, 10)
            },
            jc_setIsGD: function () {
                return e.jc_getcookie("_jc_save_gdFlag_flag")
            },
            jc_setIsGD: function (t) {
                void 0 === t && (t = "");
                var n = t;
                e.jc_setcookie("_jc_save_gdFlag_flag", n, 10)
            },
            jc_setPageFrom: function () {
                return e.jc_getcookie("jc_setPageFrom")
            },
            jc_setPageFrom: function (t) {
                void 0 === t && (t = "");
                var n = t;
                e.jc_setcookie("jc_setPageFrom", n, 10)
            },
            jc_saveZzwdch: function (t) {
                void 0 === t && (t = "");
                var n = t;
                e.jc_setcookie("_jc_save_zwdch_cxlx", n, 10)
            },
            jc_getToDate: function () {
                return e.jc_getcookie("_jc_save_toDate")
            },
            jc_setToDate: function (t) {
                void 0 === t && (t = "");
                var n = t;
                e.jc_setcookie("_jc_save_toDate", n, 10)
            },
            jc_getWfOrDc: function () {
                return e.jc_getcookie("_jc_save_wfdc_flag")
            },
            jc_setWfOrDc: function (t) {
                if (void 0 === t)
                    throw "参数错误";
                var n = t;
                e.jc_setcookie("_jc_save_wfdc_flag", n, 10)
            },
            jc_getcookie: function (e) {
                var t = document.cookie.indexOf(e)
                    , n = document.cookie.indexOf(";", t);
                return -1 == t ? "" : unescape(document.cookie.substring(t + e.length + 1, n > t ? n : document.cookie.length))
            },
            jc_setcookie: function (e, t, n, r, i, a) {
                var o = document.domain;
                o = o.substring(o.indexOf(".") + 1, o.length);
                var s = new Date;
                s.setTime(s.getTime() + 1e3 * n),
                    document.cookie = escape(e) + "=" + escape(t) + (r ? "; path=" + r : ";path=/") + "; domain=" + o + (a ? "; secure" : "") + ";expires=" + s
            }
        })
    });
var static_url = "https://kyfw.12306.cn"
    , search_base_url = "https://search.12306.cn"
    , send_url = "https://tj.12306.cn"
    , qr_code = "https://kyfw.12306.cn"
    , path = "/otn"
    , static_url_path = static_url + path
    , getSearchUrl = search_base_url + "/search/v1/h5/search"
    , getNotTripUrl = static_url_path + "/queryOrder/queryMyOrder"
    , getNotCompleteUrl = static_url_path + "/queryOrder/queryMyOrderNoComplete"
    , iscantuipiao = static_url_path + "/queryOrder/returnTicketAffirm"
    , order_url = static_url_path + "/psr/query"
    , qxyyUrl = static_url_path + "/icentre/qxyyApi"
    , stopTrainUrl = static_url_path + "/icentre/stopTrain"
    , isRepeatSubmitUrl = static_url_path + "/icentre/isRepeatSubmit"
    , addQxyyUrl = static_url_path + "/icentre/addQxyy"
    , lostItemsApiUrl = static_url_path + "/icentre/lostItemsApi"
    , addLostItemsUrl = static_url_path + "/icentre/addLostItems"
    , lostItemsUrl = static_url_path + "/icentre/lostItems"
    , serviceQueryHtml = static_url_path + "/view/icentre_serviceQuery.html"
    , orderInit = static_url_path + "/orderdetail/initApi"
    , queryOrderDetail = static_url_path + "/orderdetail/queryOrderDetail"
    , checkBeforeReturnIsu = static_url_path + "/orderdetail/checkBeforeReturnIsu"
    , queryRefundInfo = static_url_path + "/orderdetail/queryRefundInfo"
    , returnIsu = static_url_path + "/orderdetail/returnIsu"
    , payfinishApi = static_url_path + "/orderdetail/payfinishApi"
    , paycheckNew = static_url_path + "/orderdetail/paycheckNew"
    , queryMyIns = static_url_path + "/insurance/queryMyIns"
    , queryOrderForQii = static_url_path + "/orderdetail/queryOrderForQii"
    , initQueryUserInfoApi = static_url_path + "/modifyUser/initQueryUserInfoApi"
    , intelligenceUrl = static_url_path + "/psr/queryStudentInfo"
    , saveModifyUserInfo = static_url_path + "/modifyUser/saveModifyUserInfo"
    , cancelDeliveryUrl = static_url_path + "/queryOrder/cancelDelivery"
    , queryDeliverInfo = static_url_path + "/orderdetail/queryDeliverInfo"
    , initServiceQuery = static_url_path + "/icentre/initServiceQuery"
    , trackDeliveryDetailUrl = static_url_path + "/queryOrder/trackDeliveryDetail"
    , stopTrain = static_url_path + "/icentre/stopTrain"
    , adviceApi = static_url_path + "/advice/adviceApi"
    , addAdvice = static_url_path + "/advice/addAdvice"
    , complaintApi = static_url_path + "/advice/complaintApi"
    , initcomplaintService = static_url_path + "/advice/initcomplaintService"
    , addServiceQuality = static_url_path + "/advice/addServiceQuality"
    , initcomplaintNet = static_url_path + "/advice/initcomplaintNet"
    , addNetSale = static_url_path + "/advice/addNetSale"
    , uploading = static_url_path + "/advice/uploading"
    , userSecurityInitApi = static_url_path + "/userSecurity/initApi"
    , userSecurityDoEditSafeEmail = static_url_path + "/userSecurity/doEditSafeEmail"
    , userSecurityCheckUserIsActive = static_url_path + "/userSecurity/checkUserIsActive"
    , userSecuritySafeEmailApi = static_url_path + "/userSecurity/safeEmailApi"
    , resulttUrl = static_url_path + "/passengers/result"
    , addressInitApi = static_url_path + "/address/initApi"
    , addressAddInitApi = static_url_path + "/address/addInitApi"
    , addressEditApi = static_url_path + "/address/edit"
    , addressDeleteApi = static_url_path + "/address/delete"
    , addressAddApi = static_url_path + "/address/add"
    , addressList = static_url_path + "/index12306/addressList"
    , addressGetProvince = static_url_path + "/address/getProvince"
    , addressGetCity = static_url_path + "/address/getCity"
    , addressGetCountry = static_url_path + "/address/getCountry"
    , addressGetTown = static_url_path + "/address/getTown"
    , addressGetStreet = static_url_path + "/address/getStreet"
    , userLogin_url = static_url_path + "/login/userLogin"
    , ticket_notice_url = static_url_path + "/psr/getItineraryNotice"
    , personal_welcome_url = static_url_path + "/index/initMy12306Api"
    , refundUrl = static_url_path + "/queryOrder/returnTicketAffirm"
    , returnUrl = static_url_path + "/queryOrder/returnTicket"
    , turnUrl = static_url_path + "/queryOrder/returnTicketRedirect"
    , resginUrl = static_url_path + "/queryOrder/resginTicket"
    , cateringUrl = static_url_path + "/queryOrder/queryCateringParams"
    , noticeUrl = static_url_path + "/view/userSecurity_accountBindInfo.html"
    , downUrl = static_url_path + "/psr/downloadItineraryNotice"
    , loginConf = static_url_path + "/login/conf"
    , passport_appId = "otn"
    , passport_apptk_static = static_url + "/passport/web/auth/uamtk"
    , qr_codeurl = static_url + "/passport/web/create-verifyqr64"
    , success_qrcode_url = static_url_path + "/psr/checkVerifyqr"
    , late_url = static_url_path + "/zwdch/init"
    , logout = static_url_path + "/login/loginOut"
    , getMobileCode4pwdemail = static_url_path + "/userSecurity/getMobileCode4pwdemail"
    , safeEmail = static_url_path + "/userSecurity/safeEmailApi"
    , passwordChange = static_url_path + "/userSecurity/loginPwdApi"
    , confirmChangePassword = static_url_path + "/userSecurity/editLoginPwd"
    , userSecurityInit = static_url_path + "userSecurity/init"
    , noticeSetting = static_url_path + "/userSecurity/accountBindInfoApi"
    , updateSendMsgType = static_url_path + "/userSecurity/updateSendMsgType"
    , accountUnbind = static_url_path + "/userSecurity/accountUnbind"
    , requestAliQr = static_url_path + "/index/requestAliQr"
    , requestWechatQr = static_url_path + "/index/requestWechatQr"
    , accountBindInfo = static_url_path + "/userSecurity/accountBindInfo"
    , userSecurity = static_url_path + "/view/userSecurity.html"
    , turnToIndex = "https://www.12306.cn/index/index.html"
    , checkMobileCode = static_url_path + "/userSecurity/checkMobileCode"
    , initQueryUserInfo = static_url_path + "/view/information.html"
    , doEditTel = static_url_path + "/userSecurity/doEditTel"
    , checkMobileCode = static_url_path + "/userSecurity/checkMobileCode"
    , bindTelApi = static_url_path + "/userSecurity/bindTelApi"
    , payOrderInit = static_url_path + "/afterNatePay/payOrderInit"
    , cancelNotComplete = static_url_path + "/afterNateOrder/cancelNotComplete"
    , paycheck = static_url_path + "/afterNatePay/paycheck"
    , payFinishInitApi = static_url_path + "/afterNatePay/payFinishInitApi"
    , paySuccessInitApi = static_url_path + "/afterNatePay/paySuccessInitApi"
    , stu_control = 60
    , other_control = 30
    , isOver = !0
    , SM4_key = "tiekeyuankp12306"
    , saveDeliverOrderUrl = static_url_path + "/index12306/saveDeliverOrder"
    , querySkiUrl = static_url_path + "/index12306/querySki"
    , htmlHref = {
    orderDetail: static_url_path + "/view/order.html#DETAIL",
    orderRefund: static_url_path + "/view/order.html#REFUND",
    orderDeliver: static_url_path + "/view/order.html#DELIVER",
    orderInsurance: static_url_path + "/view/order.html#INSURANCE",
    advice: static_url_path + "/view/advice_advice.html",
    complaint: static_url_path + "/view/advice_complaint.html",
    addressInit: static_url_path + "/view/address_init.html",
    userSecurity: static_url_path + "/view/userSecurity.html",
    userSecurityAccountBindInfo: static_url_path + "/view/userSecurity_accountBindInfo.html",
    passengers: static_url_path + "/view/passengers.html",
    index: static_url_path + "/view/index.html",
    leftTicketInit: static_url_path + "/leftTicket/init",
    browserForie: href_baseUrl_1 + href_path_1 + "view/forie.html",
    lineUpPayConfirm: static_url_path + "/view/lineUp_payConfirm.html",
    lineUpOrder: static_url_path + "/view/lineUp_order.html",
    lineUpOrder2: static_url_path + "/view/lineUp_order.html?type=2",
    lineUpOrder3: static_url_path + "/view/lineUp_order.html?type=3",
    lineUpPaySuccess: static_url_path + "/view/lineUp_paySuccess.html",
    lineUpRefundFailed: static_url_path + "/view/lineUp_refundSuccess.html",
    verification: static_url_path + "/view/verification.html",
    emailSuccess: static_url_path + "/view/emailSuccess.html",
    emailError: static_url_path + "/view/emailError.html",
    zwdch: static_url_path + "/view/zwdch.html",
    queryTrainInfo: static_url_path + "/view/queryTrainInfo.html",
    publicPrice: static_url_path + "/view/publicPrice.html"
}
    , href_baseUrl_1 = "https://www.12306.cn/"
    , href_path_1 = "index/"
    , href_baseUrl_2 = "https://kyfw.12306.cn/"
    , href_path_2 = "otn/"
    , href_baseUrl_3 = "https://cx.12306.cn/"
    , href_path_3 = "tlcx/"
    , href_baseUrl_4 = "https://www.12306.cn/"
    , href_path_4 = "mormhweb/"
    , href_baseUrl_5 = "https://travel.12306.cn/"
    , href_path_5 = "portal/"
    , href_baseUrl_6 = "https://dynamic.12306.cn/"
    , href_path_6 = "otn/"
    , href_baseUrl_10 = "https://exservice.12306.cn/"
    , href_path_10 = "excater/"
    , ggHtml = href_baseUrl_1 + href_path_1 + "index.html#index_ads"
    , oneTopContactsUrl = static_url_path + "/passengers/showApi"
    , topContactsUrl = static_url_path + "/passengers/query"
    , deleteContactUrl = static_url_path + "/passengers/delete"
    , editContactUrl = static_url_path + "/passengers/edit"
    , addContactUrl = static_url_path + "/passengers/add"
    , getSchoolUrl = static_url_path + "/userCommon/schoolNames"
    , getCityUrl = static_url_path + "/userCommon/allCitys"
    , toPassengers = static_url_path + "/view/passengers.html"
    , toPassengerEdit = static_url_path + "/view/passenger_edit.html?type=edit"
    , toPassengerAdd = static_url_path + "/view/passenger_edit.html?type=add"
    , getQueryRefundInfo = static_url_path + "/queryRefund/queryRefundInfo"
    , toleftTicketInit = static_url_path + "/leftTicket/init"
    , getinitNoCompleteQueueApi = static_url_path + "/queryOrder/initNoCompleteQueueApi"
    , getcancelNoCompleteMyOrder = static_url_path + "/queryOrder/cancelNoCompleteMyOrder"
    , getcontinuePayNoCompleteMyOrder = static_url_path + "/queryOrder/continuePayNoCompleteMyOrder"
    , getpayOrderInit = static_url_path + "/payOrder/init"
    , getconfirmPassengerReport = static_url_path + "/confirmPassenger/report"
    , getinitNoComplete = static_url_path + "/view/train_order.html"
    , getinitNoComplete2 = static_url_path + "/view/train_order.html?type=2"
    , getcancelQueueNoCompleteMyOrder = static_url_path + "/queryOrder/cancelQueueNoCompleteMyOrder"
    , getPassengerDTOsUrl = static_url_path + "/confirmPassenger/getPassengerDTOs"
    , getpassengerInitApiUrl = static_url_path + "/afterNate/passengerInitApi"
    , queryQueueUrl = static_url_path + "/afterNateOrder/queryQueue"
    , queryNotCompleteUrl = static_url_path + "/afterNateOrder/queryNotComplete"
    , cancelNotCompleteUrl = static_url_path + "/afterNateOrder/cancelNotComplete"
    , initUrl = static_url_path + "/afterNateOrder/init"
    , continuePayNoCompleteMyOrderUrl = static_url_path + "/afterNateOrder/continuePayNoCompleteMyOrder"
    , cancelWaitingHOrderUrl = static_url_path + "/afterNateOrder/cancelWaitingHOrder"
    , queryUnHonourHOrderUrl = static_url_path + "/afterNateOrder/queryUnHonourHOrder"
    , queryProcessedHOrderUrl = static_url_path + "/afterNateOrder/queryProcessedHOrder"
    , reserveReturnCheckUrl = static_url_path + "/afterNateOrder/reserveReturnCheck"
    , reserveReturnUrl = static_url_path + "/afterNateOrder/reserveReturn"
    , queryProcessedHOrderUrl = static_url_path + "/afterNateOrder/queryProcessedHOrder"
    , pay_success_qrcode_url = static_url_path + "/afterNateQRCode/checkVerifyqr"
    , saveRelationUrl = static_url_path + "/afterNateOrder/saveRelation"
    , getMaxRealizeLimitTime = static_url_path + "/afterNateOrder/getMaxRealizeLimitTime"
    , updateRealizeLimitTime = static_url_path + "/afterNateOrder/updateRealizeLimitTime"
    , payOrderInit = static_url_path + "/afterNatePay/payOrderInit"
    , cancelNotComplete = static_url_path + "/afterNateOrder/cancelNotComplete"
    , paycheck = static_url_path + "/afterNatePay/paycheck"
    , payFinishInit = static_url_path + "/afterNatePay/payFinishInit"
    , reserveReturnSuccessApi = static_url_path + "/afterNateOrder/reserveReturnSuccessApi"
    , getQueueNum = static_url_path + "/afterNate/getQueueNum"
    , queryStationUrl = static_url_path + "/npQuery/queryRouteStationInfo"
    , queryFavorUrl = static_url_path + "/npQuery/queryFavorInfo"
    , queryFavorOrderUrl = static_url_path + "/npQuery/queryFavorOrderInfo"
    , queryRouteInfoUrl = static_url_path + "/npQuery/queryRouteInfoByType"
    , queryConfirmUrl = static_url_path + "/npQuery/confirm"
    , travelUrl = static_url_path + "/npQuery/travelFavorFetch"
    , queryOrderInfoUrl = static_url_path + "/npQuery/queryReserveOrderInfo"
    , queryFavorMergeInfoUrl = static_url_path + "/npQuery/queryFavorOrderMergeInfoNew"
    , queryFavorOrderStatusUrl = static_url_path + "/npQuery/completePayWithChannel"
    , queryLeftTicketsUrl = static_url_path + "/leftTicket/query"
    , queryByTrainNoUrl = static_url_path + "/czxx/queryByTrainNo"
    , queryConfirmOrderUrl = static_url_path + "/npQuery/confirmOrder"
    , queryFavorTrainDefineUrl = static_url_path + "/npQuery/queryFavorTrainDefine"
    , queryCancelOrderUrl = static_url_path + "/npQuery/cancelNPOrder"
    , queryReturnOrderUrl = static_url_path + "/npQuery/returnNP"
    , queryPayCheckNewUrl = static_url_path + "/npQuery/payCheckNew"
    , npTicketRefundUrl = static_url_path + "/npQuery/npTicketRefund"
    , zwdchQueryCC = static_url_path + "/zwdch/queryCC"
    , zwdchQuery = static_url_path + "/zwdch/query"
    , slideCheckSlide = static_url_path + "/slide/checkSlide"
    , getPassCodeNew = static_url_path + "/passcodeNew/getPassCodeNew"
    , queryTrainInfoQuery = static_url_path + "/queryTrainInfo/query"
    , queryStopStations = static_url_path + "/index12306/queryStopStations"
    , queryAllPublicPrice = static_url_path + "/leftTicketPrice/queryAllPublicPrice"
    , queryByTrainNo = static_url_path + "/czxx/queryByTrainNo"
    , queryDishonest = static_url_path + "/queryDishonest/query"
    , getOne = static_url_path + "/queryDishonest/getOne"
    , queryTrainStatusUrl = static_url_path + "/index12306/queryTrainStatus"
    , queryLoss = static_url_path + "/index12306/queryLoss"
    , fromSn = {
    "兰州": {
        msg: "您乘坐的列车始发站为兰州站，兰州西站不停车，请不要到兰州西站乘车。祝您旅途愉快！",
        limit: ["D2753", "D2755", "D2747", "D2749", "D2725"]
    },
    "重庆北": {
        msg: "请购买“G、D、C字头及Z4、Z50、Z49、Z258、K504、K503次列车”的旅客，到重庆北站北广场进站上车；请购买“T、K字头、数字开头、Z96、Z223次及普通列车”的旅客，到重庆北站南广场进站上车。目前，重庆北站南、北广场没有连通，两地之间的距离较远。请您务必注意进站地点，并预留充足时间进站，以免耽误您的行程。",
        limit: []
    },
    "香港西九龙": {
        msg: "跨境车票必须换取纸质车票",
        limit: []
    },
    "昭化": {
        msg: "受广元站施工影响，本次列车改停昭化站，昭化站位于宝轮镇。因乘车站变化，请您预留充足时间抵达车站，以免耽误您的行程。",
        limit: []
    },
    "广元南": {
        msg: "受广元站施工影响，本次列车改停广元南站，广元南站位于下西坝。因乘车站变化，请您预留充足时间抵达车站，以免耽误您的行程。",
        limit: []
    },
    "龙洞堡": {
        msg: "龙洞堡站为地下车站，地面设有两处进口。一处由T2航站楼11号到达口下行至-2F层，一处临近机场1号停车场北出口，请您关注相关引导标识并预留充足时间抵达车站，以免耽误您的行程。",
        limit: []
    }
}
    , toSn = {
    "昭化": {
        msg: "受广元站施工影响，本次列车改停昭化站，昭化站位于宝轮镇。请您注意到站信息，以免下错站或让亲友错误接车。",
        limit: []
    },
    "香港西九龙": {
        msg: "跨境车票必须换取纸质车票",
        limit: []
    },
    "广元南": {
        msg: "受广元站施工影响，本次列车改停广元南站，广元南站位于下西坝。请您注意到站信息，以免下错站或让亲友错误接车。",
        limit: []
    }
};
define("core/common/url_config", function () {
}),
    function (e) {
        "use strict";
        var t = !0
            ,
            n = e('<div class="cal-wrap" style="z-index:30000;display:none;position: absolute;left: 23px;top: 23px; "><div class="cal"><div class="cal-top"><a href="javascript:void(0);" class="first"></a><a href="javascript:void(0);" class="prev"></a><div class="month"><input type="text" value="" readonly="readonly" disabled="disabled"/><ul class="time-list"><li>一月</li><li>二月</li><li>三月</li><li>四月</li><li>五月</li><li>六月</li><li>七月</li><li>八月</li><li>九月</li><li>十月</li><li>十一月</li><li>十二月</li></ul></div><div class="year"><input type="text" value="" readonly="readonly" disabled="disabled"/><div class="time-list"><ul class="clearfix"><li>2016</li></ul><div class="time-list-ft"><a href="javascript:void(0);" class="fl">←</a><a href="javascript:void(0);" class="fr">→</a><a href="javascript:void(0);" class="close">×</a></div></div></div><a href="javascript:void(0);" class="last"></a><a href="javascript:void(0);" class="next"></a></div><ul class="cal-week"><li><b>日</b></li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li><b>六</b></li></ul><div class="cal-cm"></div></div><div class="cal cal-right"><div class="cal-top"><a href="javascript:void(0);" class="last"></a><a href="javascript:void(0);" class="next"></a><div class="year"><input type="text" value="" readonly="readonly" disabled="disabled"/><div class="time-list"><ul class="clearfix"><li>2016</li></ul><div class="time-list-ft"><a href="javascript:void(0);" class="fl">←</a><a href="javascript:void(0);" class="fr">→</a><a href="javascript:void(0);" class="close">×</a></div></div></div><div class="month"><input type="text" value="" readonly="readonly" disabled="disabled"/><ul class="time-list"><li>一月</li><li>二月</li><li>三月</li><li>四月</li><li>五月</li><li>六月</li><li>七月</li><li>八月</li><li>九月</li><li>十月</li><li>十一月</li><li>十二月</li></ul></div></div><ul class="cal-week"><li><b>日</b></li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li><b>六</b></li></ul><div class="cal-cm"></div></div><div class="cal-ft"><a href="javascript:void(0);" class="cal-btn">今天</a></div></div>')
            , r = e(n);
        e(document.body).append(r);
        var i = r.find("div")
            , a = r.find("a")
            , o = r.find("input")
            , s = r.find("ul");
        e.jcalendar = function (n, l) {
            function c(e) {
                return document.createElement(e)
            }

            function u(e, t, n, r) {
                var i = new w(new Date(e, t, 1))
                    , a = new w(new Date(n, r, 1));
                X.init(i, 0),
                    V.draw(1),
                    X.init(a, 1),
                    V.draw(0),
                    V.resetYM(i, a)
            }

            function d(e) {
                e = S ? e.replace(S, "") : e,
                    e = N ? e.replace(N, "") : e;
                var t = f()
                    , n = e.replace("-", "").replace("-", "").replace("/", "").replace("/", "");
                return n.match("^[0-9]*$") && 8 == n.length ? n.substring(0, 4) + "-" + n.substring(4, 6) + "-" + n.substring(6, 8) : t
            }

            function f() {
                var e = new Date
                    , t = e.getFullYear()
                    , n = e.getMonth() + 1;
                n >= 1 && n <= 9 && (n = "0" + n);
                var r = e.getDate();
                r >= 0 && r <= 9 && (r = "0" + r);
                var i = t + "-" + n + "-" + r
                    , a = D ? i : i + " " + R[e.getDay()];
                return a = S ? S + a : a,
                    a = N ? a + N : a
            }

            function p() {
                U[0] && e(U[1]).attr("class") == U[2] && y(r, U[3], !1),
                    h() ? r[0].children[2].children[0].style.color = q : r[0].children[2].children[0].style.color = "#297405",
                    m(r, e(x).val())
            }

            function h() {
                var e = new Date(j)
                    , t = new Date(M)
                    , n = new Date
                    , r = new Date(n.getFullYear(), n.getMonth(), n.getDate());
                return r > t || r < e
            }

            function y(e, t, n) {
                t = d(t);
                var r = e[0].children[0].children[0].children[3].children[0].value
                    , i = g(e[0].children[0].children[0].children[2].children[0].value)
                    , a = e[0].children[0].children[2].children
                    , o = e[0].children[1].children[2].children;
                for (var s in a)
                    if (a[s].children) {
                        var l = a[s].children[0].numHTML
                            , c = new Date(r, i - 1, l)
                            , u = new Date(t.substring(0, 4), t.substring(5, 7) - 1, t.substring(8, 10))
                            , f = n ? c < u : c > u;
                        f && (a[s].children[0].style.color = q,
                        "2" == H && (a[s].children[1].style.color = q),
                            a[s].onclick = null,
                            a[s].style.cursor = "auto")
                    }
                for (var s in o)
                    if (o[s].children) {
                        var l = o[s].children[0].numHTML
                            , c = new Date(r, i, l)
                            , u = new Date(t.substring(0, 4), t.substring(5, 7) - 1, t.substring(8, 10))
                            , f = n ? c < u : c > u;
                        f && (o[s].children[0].style.color = q,
                        "2" == H && (a[s].children[1].style.color = q),
                            o[s].onclick = null,
                            o[s].style.cursor = "auto")
                    }
            }

            function m(e, t) {
                if ((t = d(t)) && t.length >= 10) {
                    t = t.substring(0, 10);
                    var n = e[0].children[0].children[0].children[3].children[0].value
                        , r = g(e[0].children[0].children[0].children[2].children[0].value)
                        , i = e[0].children[0].children[2].children
                        , a = e[0].children[1].children[2].children;
                    for (var o in i)
                        if (i[o].children) {
                            var s = i[o].children[0].numHTML
                                , l = new Date(n, r - 1, s)
                                , c = new Date(t.substring(0, 4), t.substring(5, 7) - 1, t.substring(8, 10));
                            l.getTime() == c.getTime() ? (i[o].style.border = "1px solid #a5b9da",
                                i[o].style.background = E) : (i[o].style.border = "",
                                i[o].style.background = "")
                        }
                    for (var o in a)
                        if (a[o].children) {
                            var s = a[o].children[0].numHTML
                                , l = new Date(n, r, s)
                                , c = new Date(t.substring(0, 4), t.substring(5, 7) - 1, t.substring(8, 10));
                            l.getTime() == c.getTime() ? (a[o].style.border = "1px solid #a5b9da",
                                a[o].style.background = E) : (a[o].style.border = "",
                                a[o].style.background = "")
                        }
                }
            }

            function g(e) {
                return "一月" == e ? 1 : "二月" == e ? 2 : "三月" == e ? 3 : "四月" == e ? 4 : "五月" == e ? 5 : "六月" == e ? 6 : "七月" == e ? 7 : "八月" == e ? 8 : "九月" == e ? 9 : "十月" == e ? 10 : "十一月" == e ? 11 : "十二月" == e ? 12 : e
            }

            function v(e) {
                var t = s[e].children;
                for (var n in t)
                    if (t[n].innerHTML) {
                        var r = 0 == e ? o[1].value : o[2].value
                            , i = g(t[n].innerHTML)
                            , a = j.substring(0, 4)
                            , l = Number(j.substring(5, 7))
                            , c = M.substring(0, 4)
                            , u = Number(M.substring(5, 7));
                        r < a || r > c || r == a && i < l || r == c && i > u ? (t[n].style.color = q,
                            t[n].style.cursor = "auto") : (t[n].style.color = L,
                            t[n].style.cursor = "pointer")
                    }
            }

            function _(e, t) {
                s[e].innerHTML = "";
                for (var n = "", r = t - 5; r <= t + 4; r++)
                    r < j.substring(0, 4) || r > M.substring(0, 4) ? n += '<li style="color: ' + q + ';cursor:auto;">' + r + "</li>" : n += '<li style="color: ' + L + ';cursor:pointer;">' + r + "</li>";
                s[e].innerHTML = n;
                var a = 1 == e ? i[5] : i[11];
                if (Number(s[e].children[0].innerHTML) - 1 < j.substring(0, 4) ? (a.children[0].style.color = q,
                    a.children[0].style.cursor = "auto") : (a.children[0].style.color = L,
                    a.children[0].style.cursor = "pointer"),
                    Number(s[e].children[9].innerHTML) + 1 > M.substring(0, 4) ? (a.children[1].style.color = q,
                        a.children[1].style.cursor = "auto") : (a.children[1].style.color = L,
                        a.children[1].style.cursor = "pointer"),
                3 == e)
                    var l = s[3].parentElement.getElementsByTagName("li");
                else if (1 == e)
                    var l = i[4].getElementsByTagName("li");
                for (var c = 0; c < l.length; c++)
                    l[c].innerHTML < j.substring(0, 4) || l[c].innerHTML > M.substring(0, 4) ? l[c].onclick = function () {
                            i[4].style.display = "none",
                                i[10].style.display = "none"
                        }
                        : l[c].onclick = function () {
                            var t = this.innerHTML
                                , n = 3 == e ? g(o[3].value) + "" : g(o[0].value) + "";
                            n = 1 == n.length ? "0" + n : n,
                                3 == e ? (u(t, n - 2, t, n - 1),
                                    s[3].parentElement.style.display = "none") : 1 == e && (u(t, n - 1, t, n),
                                    i[4].style.display = "none"),
                                p()
                        }
            }

            function w(e) {
                function t(e, t) {
                    return new Date(31556925974.7 * (e - 1900) + 6e4 * z[t] + Date.UTC(1900, 0, 6, 2, 5)).getUTCDate()
                }

                function n(e) {
                    var t, n = 348;
                    for (t = 32768; t > 8; t >>= 1)
                        n += W[e - 1900] & t ? 1 : 0;
                    return n + r(e)
                }

                function r(e) {
                    return i(e) ? 65536 & W[e - 1900] ? 30 : 29 : 0
                }

                function i(e) {
                    return 15 & W[e - 1900]
                }

                function a(e, t) {
                    return W[e - 1900] & 65536 >> t ? 30 : 29
                }

                function o(e) {
                    var t, o = 0, s = 0, l = new Date(1900, 0, 31), c = (e - l) / 864e5;
                    for (this.dayCyl = c + 40,
                             this.monCyl = 14,
                             t = 1900; t < 2050 && c > 0; t++)
                        s = n(t),
                            c -= s,
                            this.monCyl += 12;
                    for (c < 0 && (c += s,
                        t--,
                        this.monCyl -= 12),
                             this.year = t,
                             this.yearCyl = t - 1864,
                             o = i(t),
                             this.isLeap = !1,
                             t = 1; t < 13 && c > 0; t++)
                        o > 0 && t == o + 1 && 0 == this.isLeap ? (--t,
                            this.isLeap = !0,
                            s = r(this.year)) : s = a(this.year, t),
                        1 == this.isLeap && t == o + 1 && (this.isLeap = !1),
                            c -= s,
                        0 == this.isLeap && this.monCyl++;
                    0 == c && o > 0 && t == o + 1 && (this.isLeap ? this.isLeap = !1 : (this.isLeap = !0,
                        --t,
                        --this.monCyl)),
                    c < 0 && (c += s,
                        --t,
                        --this.monCyl),
                        this.month = t,
                        this.day = c + 1
                }

                function s(e) {
                    return e < 10 ? "0" + e : e
                }

                function l(e, t) {
                    var n = e;
                    return t.replace(/dd?d?d?|MM?M?M?|yy?y?y?/g, function (e) {
                        switch (e) {
                            case "yyyy":
                                var t = "000" + n.getFullYear();
                                return t.substring(t.length - 4);
                            case "dd":
                                return s(n.getDate());
                            case "d":
                                return 1 == n.getDate().toString().length ? "0" + n.getDate().toString() : n.getDate().toString();
                            case "MM":
                                return s(n.getMonth() + 1);
                            case "M":
                                return 1 == (n.getMonth() + 1).toString().length ? "0" + (n.getMonth() + 1).toString() : (n.getMonth() + 1).toString()
                        }
                    })
                }

                this.date = e,
                    this.isToday = !1,
                    this.isRestDay = !1,
                    this.solarYear = l(e, "yyyy"),
                    this.solarMonth = l(e, "MM"),
                    this.solarDate = l(e, "dd"),
                    this.calendarDate = new Date(this.solarYear, this.solarMonth - 1, this.solarDate),
                    this.solarWeekDay = e.getDay(),
                    this.solarWeekDayInChinese = "星期" + Q.charAt(this.solarWeekDay);
                var c = new o(e);
                this.lunarYear = c.year,
                    this.lunarMonth = c.month,
                    this.lunarIsLeapMonth = c.isLeap,
                    this.lunarMonthInChinese = this.lunarIsLeapMonth ? "闰" + Y[c.month - 1] : Y[c.month - 1],
                    this.lunarDate = c.day,
                    this.showInLunar = this.lunarDateInChinese = function (e, t) {
                        var n;
                        switch (t) {
                            case 10:
                                n = "初十";
                                break;
                            case 20:
                                n = "二十";
                                break;
                            case 30:
                                n = "三十";
                                break;
                            default:
                                n = J.charAt(Math.floor(t / 10)),
                                    n += Q.charAt(t % 10)
                        }
                        return n
                    }(this.lunarMonth, this.lunarDate),
                1 == this.lunarDate && (this.showInLunar = this.lunarMonthInChinese + "月"),
                    this.jieqi = "",
                    this.restDays = 0,
                t(this.solarYear, 2 * (this.solarMonth - 1)) == l(e, "d") && (this.showInLunar = this.jieqi = $[2 * (this.solarMonth - 1)]),
                t(this.solarYear, 2 * (this.solarMonth - 1) + 1) == l(e, "d") && (this.showInLunar = this.jieqi = $[2 * (this.solarMonth - 1) + 1]),
                "清明" == this.showInLunar && (this.showInLunar = "清明",
                    this.restDays = 1),
                    this.solarFestival = Z[l(e, "MM") + l(e, "dd")],
                    void 0 === this.solarFestival ? this.solarFestival = "" : /\*(\d)/.test(this.solarFestival) && (this.restDays = parseInt(RegExp.$1),
                        this.solarFestival = this.solarFestival.replace(/\*\d/, "")),
                    this.showInLunar = "" == this.solarFestival ? this.showInLunar : this.solarFestival,
                    this.lunarFestival = G[this.lunarIsLeapMonth ? "00" : s(this.lunarMonth) + s(this.lunarDate)],
                    void 0 === this.lunarFestival ? this.lunarFestival = "" : /\*(\d)/.test(this.lunarFestival) && (this.restDays = this.restDays > parseInt(RegExp.$1) ? this.restDays : parseInt(RegExp.$1),
                        this.lunarFestival = this.lunarFestival.replace(/\*\d/, "")),
                12 == this.lunarMonth && this.lunarDate == a(this.lunarYear, 12) && (this.lunarFestival = G["0100"],
                    this.restDays = 1),
                    this.showInLunar = "" == this.lunarFestival ? this.showInLunar : this.lunarFestival,
                    this.showInLunar = this.showInLunar.length > 4 ? this.showInLunar.substr(0, 2) + "..." : this.showInLunar,
                "清明" == this.showInLunar && (this.solarFestival = "清明")
            }

            var b = this;
            b.$el = e(n),
                b.el = n,
                b.options = e.extend({}, e.jcalendar.defaultOptions, l);
            var x = b.el.selector
                , k = {
                closeView: b.options.closeCalendar
            }
                , T = b.options.onpicked;
            e(x)[0].onchange = T;
            var C = b.options.isSingle
                , D = b.options.showFormat
                , S = b.options.formatBeforeInfo
                , N = b.options.formatAfterInfo
                , j = b.options.startDate;
            j = j || "1901-01-01";
            var M = b.options.endDate;
            M = M || "2050-12-31",
                j = j.substring(0, 4) + "/" + j.substring(5, 7) + "/" + j.substring(8, 10),
                M = M.substring(0, 4) + "/" + M.substring(5, 7) + "/" + M.substring(8, 10);
            var O = b.options.isTodayBlock
                , E = b.options.todayClickColor
                , q = b.options.noClickColor
                , A = b.options.restColor
                , I = b.options.noRestColor
                , L = b.options.clickByYearMonth
                , F = b.options.lunarColor
                , H = b.options.isTwoRows
                , P = b.options.isYearMonthDisabled
                , U = b.options.condition;
            if ("1" == b.options.isFocus)
                return void e(x).unbind("keydown.cars").bind("keydown.cars", function (t) {
                    if (9 == t.keyCode) {
                        var n = e(x).val().replace("-", "").replace("-", "").replace("/", "").replace("/", "").replace("年", "").replace("月", "").replace("日", "");
                        if (!/^(\d{8})$/.test(n)) {
                            e(x).prev() && "carsdateerror" == e(x).prev().attr("name") || e(x).before('<a name="carsdateerror" href="javascript:void(0)" class="esdNavLink esdNavLinkFirst esdHBG ESDAssetsTextCon" tabindex="0" target="_self" style="max-width: 1px !important; float: left !important; border: 0px !important; padding: 0px !important; margin: 0px !important; width: 1px !important; height: 1px !important; overflow: hidden !important; display: block !important; position: absolute !important;">提示：您输入的日期格式不正确,已重置成今天，按TAB键重新输入。</a>'),
                                e('a[name="carsdateerror"]').unbind("blur").bind("blur", function () {
                                    var t = e(x).prev();
                                    t && "carsdateerror" == t.attr("name") && e(x).prev().remove()
                                }),
                                e(x).val(f());
                            try {
                                setTimeout(function () {
                                    e(x).prev().focus()
                                }, 500)
                            } catch (t) {
                            }
                            return r.hide(),
                                !1
                        }
                        e(x).val(n.substring(0, 4) + "-" + n.substring(4, 6) + "-" + n.substring(6, 8)),
                            r.hide()
                    }
                });
            document.onclick = function (e) {
                t || (r.hide(),
                    k.closeView())
            }
                ,
                e(x).mouseout(function () {
                    t = !1
                }),
                e(x).mouseover(function () {
                    t = !0
                }),
                e(x).off("change").on("change", function () {
                }),
                r.mouseover(function () {
                    e(x).unbind("blur")
                }),
                r.click(function (e) {
                    e.stopPropagation(),
                        t = !1
                }),
                r.mouseout(function () {
                    e(x).unbind("blur").bind("blur", function () {
                        r.hide()
                    })
                }),
                i[14].onclick = function () {
                    if (!h()) {
                        var t = f();
                        e(x).val(t),
                            e(x).change(),
                            r.hide()
                    }
                }
                ,
                a[0].onclick = function () {
                    var e = o[1].value
                        , t = g(o[0].value)
                        , n = new Date(e - 1, t, 1)
                        , r = new Date(n.getTime() - 864e5);
                    if (new Date(r.getFullYear(), Number(r.getMonth()), r.getDate()) >= new Date(j))
                        u(e - 1, t - 1, e - 1, t);
                    else {
                        var n = new Date(j);
                        u(n.getFullYear(), n.getMonth(), n.getFullYear(), n.getMonth() + 1)
                    }
                    p()
                }
                ,
                a[1].onclick = function () {
                    var e = o[1].value
                        , t = g(o[0].value)
                        , n = new Date(e, t - 1, 1)
                        , r = new Date(n.getTime() - 864e5);
                    new Date(r.getFullYear(), Number(r.getMonth()), r.getDate()) >= new Date(j) && u(e, t - 2, e, t - 1),
                        p()
                }
                ,
                a[6].onclick = function () {
                    var e = o[1].value
                        , t = g(o[0].value);
                    e == M.substring(0, 4) && t == M.substring(5, 7) || u(e, t, e, Number(t) + 1),
                        p()
                }
                ,
                a[5].onclick = function () {
                    var e = o[1].value
                        , t = g(o[0].value);
                    if (e < M.substring(0, 4))
                        u(Number(e) + 1, t - 1, Number(e) + 1, t);
                    else {
                        var n = new Date(M);
                        u(n.getFullYear(), n.getMonth(), n.getFullYear(), n.getMonth() + 1)
                    }
                    p()
                }
                ,
                a[8].onclick = function () {
                    var e = o[2].value
                        , t = g(o[3].value);
                    new Date(e, t - 1, 1) <= new Date(M) && u(e, t - 1, e, t),
                        p()
                }
                ,
                a[7].onclick = function () {
                    var e = o[1].value
                        , t = g(o[0].value);
                    if (e < M.substring(0, 4))
                        u(Number(e) + 1, t - 1, Number(e) + 1, t);
                    else {
                        var n = new Date(M);
                        u(n.getFullYear(), n.getMonth(), n.getFullYear(), n.getMonth() + 1)
                    }
                    p()
                }
            ;
            var B = new Array("", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", "一月")
                , R = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")
                , W = (-1 != navigator.userAgent.indexOf("MSIE") && window.opera,
                    [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42448, 83315, 21200, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46496, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448])
                ,
                $ = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"]
                ,
                z = [0, 21208, 43467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758]
                , Q = "日一二三四五六七八九十"
                , Y = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"]
                , J = "初十廿卅"
                , Z = {
                    "0101": "*1元旦",
                    "0501": "*1劳动",
                    1001: "*7国庆"
                }
                , G = {
                    "0101": "*6春节",
                    "0115": "*1元宵",
                    "0505": "*1端午",
                    "0815": "*1中秋",
                    "0100": "除夕"
                }
                , X = function () {
                    function e(e) {
                        return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
                    }

                    function t(t, n) {
                        return [31, e(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n]
                    }

                    function n(e, t) {
                        return e.setDate(e.getDate() + t),
                            e
                    }

                    function r(e, r) {
                        var a = e.solarMonth - 2;
                        0 == e.solarMonth ? a = 11 : 1 == e.solarMonth && (a = 10);
                        var o = new w(new Date(e.solarYear, a, 1))
                            , s = o.solarWeekDay
                            , l = new w(new Date(e.solarYear, e.solarMonth, 1))
                            , c = l.solarWeekDay
                            , u = 0
                            , d = new w(new Date(e.solarYear, e.solarMonth - 1, 1))
                            , f = d.solarWeekDay;
                        if (C)
                            i.lines = Math.ceil((f + t(e.solarYear, e.solarMonth - 1)) / 7);
                        else if (0 == r) {
                            var p = Math.ceil((f + t(e.solarYear, e.solarMonth - 1)) / 7)
                                ,
                                h = Math.ceil((c + t(e.solarYear, 12 == Number(e.solarMonth) ? 0 : Number(e.solarMonth))) / 7);
                            i.lines = p > h ? p : h
                        } else if (1 == r) {
                            var p = Math.ceil((f + t(e.solarYear, e.solarMonth - 1)) / 7)
                                , h = Math.ceil((s + t(e.solarYear, a)) / 7);
                            i.lines = p > h ? p : h
                        } else
                            i.lines = 6;
                        for (var y = 0; y < i.dateArray.length; y++)
                            if (0 != d.restDays && (u = d.restDays),
                            u > 0 && (d.isRest = !0),
                            f-- > 0 || d.solarMonth != e.solarMonth)
                                i.dateArray[y] = null;
                            else {
                                var r = new w(new Date);
                                d.solarYear == r.solarYear && d.solarMonth == r.solarMonth && d.solarDate == r.solarDate && (d.isToday = !0),
                                    i.dateArray[y] = d,
                                    d = new w(n(d.date, 1)),
                                    u--
                            }
                    }

                    var i = {};
                    return i.lines = 0,
                        i.dateArray = new Array(42),
                        {
                            init: function (e, t) {
                                r(e, t)
                            },
                            getJson: function () {
                                return i
                            }
                        }
                }()
                , V = function () {
                    function t(t) {
                        var n = 1 == t ? i[6] : i[13]
                            , a = X.getJson()
                            , o = a.dateArray
                            , s = "2" == H ? 38 : 22;
                        n.style.height = a.lines * s + 2 + "px",
                            n.innerHTML = "";
                        for (var l = 0; l < o.length; l++)
                            if (null != o[l]) {
                                var u = o[l].solarYear + "-" + o[l].solarMonth + "-" + o[l].solarDate
                                    , d = D ? u : u + " " + o[l].solarWeekDayInChinese;
                                d = S ? S + d : d,
                                    d = N ? d + N : d;
                                var f = c("DIV");
                                o[l].isToday && (f.style.border = "1px solid #a5b9da",
                                    f.style.background = E),
                                    f.className = "cell",
                                "2" == H && (f.style.height = "36px"),
                                    f.style.left = l % 7 == 0 ? "0px" : l % 7 * 36 + 3 + "px",
                                    f.style.top = Math.floor(l / 7) * s + 5 + "px",
                                o[l].calendarDate >= new Date(j) && o[l].calendarDate <= new Date(M) && (f.onclick = function (t) {
                                    return function () {
                                        e(x).val(t),
                                            r.hide(),
                                            e(x).change()
                                    }
                                }(d),
                                    f.style.cursor = "pointer");
                                var p = c("DIV");
                                if (p.className = "so",
                                    p.style.color = l % 7 == 0 || l % 7 == 6 || o[l].isRest || o[l].isToday ? A : I,
                                o[l].calendarDate >= new Date(j) && o[l].calendarDate <= new Date(M) || (p.style.color = q),
                                    "3" == H ? (o[l].solarFestival ? p.innerHTML = o[l].solarFestival : o[l].lunarFestival ? p.innerHTML = o[l].lunarFestival : o[l].isToday ? p.innerHTML = "今天" : p.innerHTML = "0" == o[l].solarDate.substring(0, 1) ? o[l].solarDate.substring(1) : o[l].solarDate,
                                        p.numHTML = "0" == o[l].solarDate.substring(0, 1) ? o[l].solarDate.substring(1) : o[l].solarDate) : (p.innerHTML = "0" == o[l].solarDate.substring(0, 1) ? o[l].solarDate.substring(1) : o[l].solarDate,
                                        p.numHTML = "0" == o[l].solarDate.substring(0, 1) ? o[l].solarDate.substring(1) : o[l].solarDate),
                                    f.appendChild(p),
                                "2" == H) {
                                    var h = c("DIV");
                                    o[l].calendarDate >= new Date(j) && o[l].calendarDate <= new Date(M) ? h.style.color = F : h.style.color = q,
                                        h.innerHTML = o[l].showInLunar,
                                        f.appendChild(h)
                                }
                                n.appendChild(f)
                            }
                    }

                    return {
                        draw: function (e) {
                            0 == e ? t(e) : 1 == e ? t(1) : (t(e),
                                t(1))
                        },
                        resetYM: function (e, t) {
                            o[0].value = B[Number(e.solarMonth)],
                                o[1].value = e.solarYear,
                                o[2].value = t.solarYear,
                                o[3].value = B[Number(t.solarMonth)]
                        }
                    }
                }()
                , K = new w(new Date);
            if (X.init(K, 0),
                V.draw(1),
                C)
                r[0].className = "cal-wrap cal-one";
            else {
                a[6].style.display = "none",
                    a[5].style.display = "none";
                var ee = new Date
                    , te = new w(new Date(ee.getFullYear(), ee.getMonth() + 1, ee.getDate()));
                X.init(te, 1),
                    V.draw(0)
            }
            if (O || (i[14].style.display = "none"),
                P) {
                a[2].onclick = function () {
                    if (s[1].getElementsByTagName("li")[0].innerHTML < 1902 || "auto" == this.style.cursor)
                        return void (i[4].style.display = "none");
                    _(1, s[1].getElementsByTagName("li")[0].innerHTML - 5)
                }
                    ,
                    a[3].onclick = function () {
                        if (s[1].getElementsByTagName("li")[0].innerHTML > 2040 || "auto" == this.style.cursor)
                            return void (i[4].style.display = "none");
                        _(1, Number(s[1].getElementsByTagName("li")[0].innerHTML) + 15)
                    }
                    ,
                    a[4].onclick = function () {
                        s[1].parentElement.style.display = "none"
                    }
                    ,
                    a[9].onclick = function () {
                        if (s[3].getElementsByTagName("li")[0].innerHTML < 1902 || "auto" == this.style.cursor)
                            return void (i[10].style.display = "none");
                        _(3, s[3].getElementsByTagName("li")[0].innerHTML - 5)
                    }
                    ,
                    a[10].onclick = function () {
                        if (s[3].getElementsByTagName("li")[0].innerHTML > 2040 || "auto" == this.style.cursor)
                            return void (i[10].style.display = "none");
                        _(3, Number(s[3].getElementsByTagName("li")[0].innerHTML) + 15)
                    }
                    ,
                    a[11].onclick = function () {
                        s[3].parentElement.style.display = "none"
                    }
                    ,
                    o[0].onfocus = function () {
                        s[0].style.display = "block",
                            v(0),
                            i[4].style.display = "none"
                    }
                    ,
                    o[0].onblur = function () {
                        s[0].style.display = "none"
                    }
                ;
                for (var ne = s[0].getElementsByTagName("li"), re = 0; re < ne.length; re++)
                    ne[re].onclick = function () {
                        if ("auto" == this.style.cursor)
                            return s[0].style.display = "none",
                                void (s[4].style.display = "none");
                        var e = o[1].value
                            , t = g(this.innerHTML) + "";
                        t = 1 == t.length ? "0" + t : t,
                            u(e, t - 1, e, t),
                            s[0].style.display = "none",
                            p()
                    }
                    ;
                v(0),
                    o[1].onfocus = function () {
                        _(1, Number(o[1].value)),
                            i[4].style.display = "block"
                    }
                    ,
                    o[1].onblur = function () {
                        i[4].style.display = "none"
                    }
                    ,
                    i[4].onmouseover = function () {
                        o[1].onblur = function () {
                        }
                    }
                    ,
                    i[4].onmouseout = function () {
                        o[1].onblur = function () {
                            i[4].style.display = "none"
                        }
                    }
                    ,
                    s[0].onmouseover = function () {
                        o[0].onblur = function () {
                        }
                    }
                    ,
                    s[0].onmouseout = function () {
                        o[0].onblur = function () {
                            s[0].style.display = "none"
                        }
                    }
                    ,
                    o[3].onfocus = function () {
                        v(4),
                            s[4].style.display = "block",
                            i[10].style.display = "none"
                    }
                    ,
                    o[3].onblur = function () {
                        s[4].style.display = "none"
                    }
                ;
                for (var ie = s[4].getElementsByTagName("li"), re = 0; re < ie.length; re++)
                    ie[re].onclick = function () {
                        if ("auto" == this.style.cursor)
                            return s[0].style.display = "none",
                                void (s[4].style.display = "none");
                        var e = o[2].value
                            , t = g(this.innerHTML) + "";
                        t = 1 == t.length ? "0" + t : t,
                            u(e, t - 2, e, t - 1),
                            s[4].style.display = "none",
                            p()
                    }
                    ;
                v(4),
                    o[2].onfocus = function () {
                        _(3, Number(o[2].value)),
                            i[10].style.display = "block"
                    }
                    ,
                    o[2].onblur = function () {
                        i[10].style.display = "none"
                    }
                    ,
                    i[10].onmouseover = function () {
                        o[2].onblur = function () {
                        }
                    }
                    ,
                    i[10].onmouseout = function () {
                        o[2].onblur = function () {
                            i[10].style.display = "none"
                        }
                    }
                    ,
                    s[4].onmouseover = function () {
                        o[3].onblur = function () {
                        }
                    }
                    ,
                    s[4].onmouseout = function () {
                        o[3].onblur = function () {
                            s[4].style.display = "none"
                        }
                    }
                ;
                for (var re = 0; re < 4; re++)
                    o[re].disabled = !1,
                        o[re].style.cursor = "pointer"
            }
            var ae = new Date;
            o[0].value = B[ae.getMonth() + 1],
                o[1].value = ae.getFullYear(),
                o[2].value = 11 == ae.getMonth() ? ae.getFullYear() + 1 : ae.getFullYear(),
                o[3].value = B[ae.getMonth() + 2],
                function () {
                    i[4].style.display = "none",
                        t = !0;
                    var n = C ? 261 : 522
                        , a = document.body.clientWidth - n - 10
                        , o = e(x).offset().top
                        , s = e(x).offset().left;
                    s = s >= a ? a : s;
                    var l = e(x).innerHeight();
                    r.css("left", s),
                        r.css("top", o + l);
                    var c = d(e(x).val());
                    c && c.length > 4 && c.substring(0, 4) > 1900 && c.substring(0, 4) < 2051 && u(c.substring(0, 4), c.substring(5, 7) - 1, c.substring(0, 4), c.substring(5, 7)),
                        p(),
                        r.show()
                }()
        }
            ,
            e.jcalendar.defaultOptions = {
                isSingle: !0,
                showFormat: !0,
                formatBeforeInfo: "",
                formatAfterInfo: "",
                startDate: "1901-01-01",
                endDate: "2050-12-31",
                isTwoRows: "3",
                isTodayBlock: !0,
                isYearMonthDisabled: !0,
                condition: [!1, "#query_H", "active", "2050-12-31"],
                restColor: "#c60b02",
                noRestColor: "#313131",
                todayClickColor: "#c1d9ff",
                noClickColor: "#aaa",
                clickByYearMonth: "#003784",
                lunarColor: "#666",
                isFocus: "0",
                closeCalendar: function () {
                },
                onpicked: function () {
                }
            },
            e.fn.jcalendar = function () {
                var t = Array.prototype.slice.call(arguments);
                return new e.jcalendar(this, t[0])
            }
    }(jQuery),
    define("core/common/data.jcalendar", function () {
    }),
    function (e) {
        "function" == typeof define && define.amd ? define("core/common/date", ["jquery"], e) : e(jQuery)
    }(function (e) {
        e(".icon-date").each(function (t, n) {
            e(this).click(function (t) {
                e("#" + e(this).attr("data-click")).focus()
            })
        }),
            jQuery.extend({
                datepicker: function (t, n, r) {
                    e(t).click(function () {
                        e(t).jcalendar({
                            isSingle: !0,
                            startDate: n,
                            endDate: r,
                            onpicked: function () {
                                e(t).blur(),
                                e(t).hasClass("inp-txt_select") || e(t).addClass("inp-txt_select"),
                                e(t).hasClass("error") && e(t).removeClass("error")
                            }
                        })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                datepickericentre: function (t) {
                    e(t).click(function () {
                        e(t).jcalendar({
                            isSingle: !0,
                            endDate: GetDateStr(0),
                            onpicked: function () {
                                e(t).blur(),
                                e(t).hasClass("inp-txt_select") || e(t).addClass("inp-txt_select"),
                                e(t).hasClass("error") && e(t).removeClass("error")
                            }
                        })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                datepickerSnow: function (t, n, r, i) {
                    e(t).click(function () {
                        e(this).parent().next().hide(),
                            e(t).jcalendar({
                                isSingle: !0,
                                startDate: n,
                                endDate: r,
                                onpicked: function () {
                                    e(t).blur(),
                                        e("#pickUpTime").val(e("#pickUpTime").val() + "（上门前会有专人进行联系）");
                                    var n = new Date
                                        , r = n.getHours()
                                        , i = n.getFullYear()
                                        , a = n.getMonth() + 1 < 10 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1
                                        , o = n.getDate() + 1 < 10 ? "0" + n.getDate() : n.getDate()
                                        , s = i + a + o;
                                    if ("1" == window.extractorDate) {
                                        if (r > 18 && s == e("#pickUpTime").val().split("-").join("").replace(/[^0-9]/gi, ""))
                                            return window.DZP.confirm("", window.DZP.confirm.typeEnum.confirm, {
                                                title: "温馨提示",
                                                msg: {
                                                    info: "次日达产品下单时间需在寄送日期18点以前，逾期将无法配送。您可调整寄送日期或选择其他类型产品。"
                                                },
                                                btn: 1
                                            }),
                                                !1
                                    } else if (r > 11 && s == e("#pickUpTime").val().split("-").join("").replace(/[^0-9]/gi, ""))
                                        return window.DZP.confirm("", window.DZP.confirm.typeEnum.confirm, {
                                            title: "温馨提示",
                                            msg: {
                                                info: "当日达产品下单时间需在8点-11点前，逾期将无法配送。您可调整寄送日期或选择其他类型产品。"
                                            },
                                            btn: 1
                                        }),
                                            !1;
                                    e(t).hasClass("inp-txt_select") || e(t).addClass("inp-txt_select"),
                                    e(t).hasClass("error") && e(t).removeClass("error")
                                }
                            })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                dateTrain: function (t, n, r, i) {
                    e(t).click(function () {
                        e(t).jcalendar({
                            isSingle: !1,
                            startDate: n,
                            endDate: r,
                            onpicked: function () {
                                "#go_date" == t && e("#from_date").val(e("#go_date").val()),
                                    e(t).blur(),
                                e(t).hasClass("inp-txt_select") || e(t).addClass("inp-txt_select"),
                                e(t).hasClass("error") && e(t).removeClass("error")
                            }
                        })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                GetDateStr: function (e) {
                    var t = new Date;
                    return t.setDate(t.getDate() + e),
                    t.getFullYear() + "-" + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-" + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate())
                },
                dianzifromStr: function (t, n, r) {
                    e(t).click(function () {
                        e(t).jcalendar({
                            isSingle: !1,
                            startDate: null,
                            endDate: null,
                            onpicked: function () {
                                timeChangetype(e("#travelFromDate").val().replace(/-/g, "/")) > timeChangetype(e("#travelToDate").val().replace(/-/g, "/")) && e("#travelToDate").val(e("#travelFromDate").val()),
                                    e(t).blur()
                            }
                        })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                dianzitoStr: function (t, n, r) {
                    e(t).click(function () {
                        e(t).jcalendar({
                            isSingle: !1,
                            startDate: e("#travelFromDate").val() || GetDateStr(0),
                            endDate: null,
                            onpicked: function () {
                                e(t).blur()
                            }
                        })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                dateRefundDingStr: function (n, r) {
                    e(n).click(function () {
                        t = !0,
                            e(n).jcalendar({
                                isSingle: !1,
                                startDate: formatDate(new Date),
                                onpicked: function () {
                                    if (e("#noTripFromDate").val()) {
                                        timeChangetype(e("#noTripFromDate").val().replace(/-/g, "/")) > timeChangetype(e("#noTripToDate").val().replace(/-/g, "/")) && e("#noTripToDate").val(e("#noTripFromDate").val())
                                    }
                                    e(n).blur(),
                                    e(n).hasClass("inp-txt_select") || e(n).addClass("inp-txt_select"),
                                    e(n).hasClass("error") && e(n).removeClass("error")
                                }
                            })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                dateCommutationgStr: function (n, r) {
                    e(n).click(function () {
                        t = !0,
                            e(n).jcalendar({
                                isSingle: !1,
                                startDate: GetDateStr(-180),
                                onpicked: function () {
                                    if (e("#com_history_fromDate").val()) {
                                        timeChangetype(e("#com_history_fromDate").val().replace(/-/g, "/")) > timeChangetype(e("#com_history_toDate").val().replace(/-/g, "/")) && e("#com_history_toDate").val(e("#com_history_fromDate").val())
                                    }
                                    e(n).blur(),
                                    e(n).hasClass("inp-txt_select") || e(n).addClass("inp-txt_select"),
                                    e(n).hasClass("error") && e(n).removeClass("error")
                                }
                            })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                dateRefundDingEnd: function (n, r) {
                    e(n).click(function () {
                        t = !0,
                            e(n).jcalendar({
                                isSingle: !1,
                                startDate: formatDate(new Date),
                                onpicked: function () {
                                    e(n).blur(),
                                    e(n).hasClass("inp-txt_select") || e(n).addClass("inp-txt_select"),
                                    e(n).hasClass("error") && e(n).removeClass("error"),
                                    timeChangetype(e("#noTripFromDate").val().replace(/-/g, "/")) > timeChangetype(e("#noTripToDate").val().replace(/-/g, "/")) && e("#noTripFromDate").val(e("#noTripToDate").val())
                                }
                            })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                dateHistoryStr: function (n, r) {
                    e(n).click(function () {
                        t = !0,
                            e(n).jcalendar({
                                isSingle: !1,
                                startDate: GetDateStr(r ? -29 : -1),
                                endDate: GetDateStr(r ? -1 : 29),
                                onpicked: function () {
                                    if (e("#historyFromDate").val()) {
                                        timeChangetype(e("#historyFromDate").val().replace(/-/g, "/")) > timeChangetype(e("#historyToDate").val().replace(/-/g, "/")) && e("#historyToDate").val(e("#historyFromDate").val())
                                    }
                                    e(n).blur(),
                                    e(n).hasClass("inp-txt_select") || e(n).addClass("inp-txt_select"),
                                    e(n).hasClass("error") && e(n).removeClass("error")
                                }
                            })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                dateHistoryEnd: function (n, r) {
                    e(n).click(function () {
                        t = !0,
                            e(n).jcalendar({
                                isSingle: !1,
                                startDate: r ? e("#historyFromDate").val() || GetDateStr(-29) : e("#historyFromDate").val() || GetDateStr(-1),
                                endDate: GetDateStr(r ? -1 : 29),
                                onpicked: function () {
                                }
                            })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                },
                noTripDPStr: function (t, n, r) {
                    e(t).click(function () {
                        e(t).jcalendar({
                            isSingle: !1,
                            endDate: GetDateStr(0),
                            onpicked: function () {
                                if ("#noTripToDate" == t) {
                                    var n = timeChangetype(e("#noTripFromDate").val().replace(/-/g, "/"))
                                        , r = timeChangetype(e("#noTripToDate").val().replace(/-/g, "/"));
                                    n > r && e("#noTripFromDate").val(e("#noTripToDate").val())
                                }
                                if ("#noTripFromDate" == t) {
                                    var n = timeChangetype(e("#noTripFromDate").val().replace(/-/g, "/"))
                                        , r = timeChangetype(e("#noTripToDate").val().replace(/-/g, "/"));
                                    n > r && e("#noTripToDate").val(e("#noTripFromDate").val())
                                }
                                e(t).blur(),
                                e(t).hasClass("inp-txt_select") || e(t).addClass("inp-txt_select"),
                                e(t).hasClass("error") && e(t).removeClass("error")
                            }
                        })
                    }).blur(function () {
                        e(".cal-wrap").hide()
                    })
                }
            });
        var t = !1
    }),
    function (e) {
        "function" == typeof define && define.amd ? define("core/plugin/confirm", ["jquery"], e) : e(jQuery)
    }(function (e) {
        window.DZP = window.DZP || {},
            window.DZP.confirm = function (t, n, r) {
                function i() {
                    y.showClsBtn ? C.append(F.append(H)).append(D.append(g)).append(S.append(m)).append(c(b)).append(A) : C.append(D.append(g)).append(S.append(m)).append(c(b)).append(A),
                        k.attr("id", x).append(T).append(C),
                        e("body").append(k);
                    var t = navigator.appName
                        , n = navigator.appVersion
                        , r = n.split(";");
                    if (r[1]) {
                        var i = r[1].replace(/[ ]/g, "");
                        "Microsoft Internet Explorer" == t && "MSIE8.0" == i && C.css({
                            "margin-left": -C.outerWidth() / 2 + "px",
                            "margin-top": -C.outerHeight() / 2 + "px"
                        })
                    }
                    "系统繁忙，请稍后重试！" == y.msg.tit && L.click(function () {
                        window.location.href = htmlHref.index
                    })
                }

                function a() {
                    L.click(o),
                        e(window).bind("keydown", function (t) {
                            13 == t.keyCode && 1 == e("#" + x).length && o()
                        }),
                        I.click(s),
                        F.click(l)
                }

                function o() {
                    e(this);
                    y.onOk(),
                        e("#" + x).remove(),
                        y.onClose(f.ok)
                }

                function s() {
                    e(this);
                    y.onCancel(),
                        e("#" + x).remove(),
                        y.onClose(f.cancel)
                }

                function l() {
                    e("#" + x).remove(),
                        y.onClose(f.close),
                        e(window).unbind("keydown")
                }

                function c(t) {
                    var n = N;
                    return e.each(P, function (e, r) {
                        d[e] == (t & d[e]) && n.append(r)
                    }),
                        n
                }

                function u() {
                    var t = "pop_" + (new Date).getTime() + parseInt(1e5 * Math.random());
                    return e("#" + t).length > 0 ? u() : t
                }

                var d = window.DZP.confirm.btnEnum
                    , f = window.DZP.confirm.eventEnum
                    , p = {
                    info: {
                        title: "信息",
                        icon: "",
                        btn: d.ok
                    },
                    success: {
                        title: "成功",
                        icon: "success",
                        btn: d.ok
                    },
                    error: {
                        title: "错误",
                        icon: "error",
                        btn: d.ok
                    },
                    confirm: {
                        title: "提示",
                        icon: "plaint-fill",
                        btn: d.okcancel
                    },
                    warning: {
                        title: "警告",
                        icon: "doubt",
                        btn: d.ok
                    },
                    custom: {
                        title: "",
                        icon: "",
                        btn: d.ok
                    }
                }
                    , h = n ? n instanceof Object ? n : p[n] || {} : {}
                    , y = e.extend(!0, {
                    showClsBtn: !0,
                    width: "440",
                    isScroll: !1,
                    title: "",
                    icon: "",
                    iconUrl: "",
                    msg: {
                        tit: "",
                        info: "",
                        tips: ""
                    },
                    ft: "",
                    btn: d.ok,
                    ok: "确定",
                    cancel: "取消",
                    onOk: e.noop,
                    onCancel: e.noop,
                    onClose: e.noop
                }, h, r)
                    , m = t || ""
                    , g = e("<div>").addClass("modal-tit").text(y.title)
                    , v = y.icon
                    , _ = y.iconUrl
                    , w = _ || (v ? e("<i>").addClass("icon").addClass("icon-" + v) : "")
                    , b = y.btn
                    , x = u()
                    , k = e("<div>").addClass("dzp-confirm")
                    , T = e("<div>").addClass("mask")
                    , C = e("<div role='alertdialog' tabindex='-1' aria-label='提示框'>").addClass("modal");
                y.isScroll ? C.css({
                    display: "block",
                    width: y.width + "px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    "-webkit-transform": "translate(-50%, -50%)"
                }) : C.css({
                    display: "block",
                    position: "fixed",
                    width: y.width + "px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    "-webkit-transform": "translate(-50%, -50%)"
                });
                try {
                    setTimeout(function () {
                        C.focus()
                    }, 1e3)
                } catch (e) {
                }
                var D = e("<div>").addClass("modal-hd")
                    , S = e("<div>").addClass("modal-bd")
                    , N = e("<div>").addClass("modal-ft")
                    , j = e("<div>").addClass("message")
                    , M = e("<div>").addClass("msg-ico")
                    , O = e("<div>").addClass("msg-con")
                    , E = e("<h2>").addClass("msg-tit").html(y.msg.tit)
                    , q = e("<div>").addClass("msg-info").html(y.msg.info)
                    , A = y.ft ? e("<div>").addClass("modal-ft-tips").html(y.ft) : ""
                    , I = e("<a>").attr("href", "javascript:;").addClass("btn").addClass("cancel").text(y.cancel)
                    ,
                    L = e("<a>").attr("href", "javascript:;").addClass("btn").addClass("btn-primary").addClass("ok").text(y.ok)
                    , F = e("<a>").attr("href", "javascript:;").attr("title", "关闭").addClass("modal-close")
                    , H = e("<i>").addClass("icon").addClass("icon-close");
                S = v ? S.append(j.append(M.append(w)).append(O.append(E).append(q))).append(y.msg.tips) : S.append(y.msg.tips);
                var P = {
                    cancel: I,
                    ok: L
                };
                !function () {
                    e(".modal").attr("role", "alertdialog"),
                        e(".modal").attr("tabindex", "-1"),
                        e(".modal").attr("aria-label", "提示框"),
                        e(".dzp-confirm").remove(),
                        i(),
                        a()
                }()
            }
            ,
            window.DZP.confirm.btnEnum = {
                ok: parseInt("0001", 2),
                cancel: parseInt("0010", 2),
                okcancel: parseInt("0011", 2)
            },
            window.DZP.confirm.eventEnum = {
                ok: 1,
                cancel: 2,
                close: 3
            },
            window.DZP.confirm.typeEnum = {
                info: "info",
                success: "success",
                error: "error",
                confirm: "confirm",
                warning: "warning",
                custom: "custom"
            }
    }),
    function () {
        var e = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global || this || {}
            , t = e._
            , n = Array.prototype
            , r = Object.prototype
            , i = "undefined" != typeof Symbol ? Symbol.prototype : null
            , a = n.push
            , o = n.slice
            , s = r.toString
            , l = r.hasOwnProperty
            , c = Array.isArray
            , u = Object.keys
            , d = Object.create
            , f = function () {
        }
            , p = function (e) {
            return e instanceof p ? e : this instanceof p ? void (this._wrapped = e) : new p(e)
        };
        "undefined" == typeof exports || exports.nodeType ? e._ = p : ("undefined" != typeof module && !module.nodeType && module.exports && (exports = module.exports = p),
            exports._ = p),
            p.VERSION = "1.9.1";
        var h, y = function (e, t, n) {
            if (void 0 === t)
                return e;
            switch (null == n ? 3 : n) {
                case 1:
                    return function (n) {
                        return e.call(t, n)
                    }
                        ;
                case 3:
                    return function (n, r, i) {
                        return e.call(t, n, r, i)
                    }
                        ;
                case 4:
                    return function (n, r, i, a) {
                        return e.call(t, n, r, i, a)
                    }
            }
            return function () {
                return e.apply(t, arguments)
            }
        }, m = function (e, t, n) {
            return p.iteratee !== h ? p.iteratee(e, t) : null == e ? p.identity : p.isFunction(e) ? y(e, t, n) : p.isObject(e) && !p.isArray(e) ? p.matcher(e) : p.property(e)
        };
        p.iteratee = h = function (e, t) {
            return m(e, t, 1 / 0)
        }
        ;
        var g = function (e, t) {
            return t = null == t ? e.length - 1 : +t,
                function () {
                    for (var n = Math.max(arguments.length - t, 0), r = Array(n), i = 0; i < n; i++)
                        r[i] = arguments[i + t];
                    switch (t) {
                        case 0:
                            return e.call(this, r);
                        case 1:
                            return e.call(this, arguments[0], r);
                        case 2:
                            return e.call(this, arguments[0], arguments[1], r)
                    }
                    var a = Array(t + 1);
                    for (i = 0; i < t; i++)
                        a[i] = arguments[i];
                    return a[t] = r,
                        e.apply(this, a)
                }
        }
            , v = function (e) {
            if (!p.isObject(e))
                return {};
            if (d)
                return d(e);
            f.prototype = e;
            var t = new f;
            return f.prototype = null,
                t
        }
            , _ = function (e) {
            return function (t) {
                return null == t ? void 0 : t[e]
            }
        }
            , w = function (e, t) {
            return null != e && l.call(e, t)
        }
            , b = function (e, t) {
            for (var n = t.length, r = 0; r < n; r++) {
                if (null == e)
                    return;
                e = e[t[r]]
            }
            return n ? e : void 0
        }
            , x = Math.pow(2, 53) - 1
            , k = _("length")
            , T = function (e) {
            var t = k(e);
            return "number" == typeof t && 0 <= t && t <= x
        };
        p.each = p.forEach = function (e, t, n) {
            var r, i;
            if (t = y(t, n),
                T(e))
                for (r = 0,
                         i = e.length; r < i; r++)
                    t(e[r], r, e);
            else {
                var a = p.keys(e);
                for (r = 0,
                         i = a.length; r < i; r++)
                    t(e[a[r]], a[r], e)
            }
            return e
        }
            ,
            p.map = p.collect = function (e, t, n) {
                t = m(t, n);
                for (var r = !T(e) && p.keys(e), i = (r || e).length, a = Array(i), o = 0; o < i; o++) {
                    var s = r ? r[o] : o;
                    a[o] = t(e[s], s, e)
                }
                return a
            }
        ;
        var C = function (e) {
            return function (t, n, r, i) {
                var a = 3 <= arguments.length;
                return function (t, n, r, i) {
                    var a = !T(t) && p.keys(t)
                        , o = (a || t).length
                        , s = 0 < e ? 0 : o - 1;
                    for (i || (r = t[a ? a[s] : s],
                        s += e); 0 <= s && s < o; s += e) {
                        var l = a ? a[s] : s;
                        r = n(r, t[l], l, t)
                    }
                    return r
                }(t, y(n, i, 4), r, a)
            }
        };
        p.reduce = p.foldl = p.inject = C(1),
            p.reduceRight = p.foldr = C(-1),
            p.find = p.detect = function (e, t, n) {
                var r = (T(e) ? p.findIndex : p.findKey)(e, t, n);
                if (void 0 !== r && -1 !== r)
                    return e[r]
            }
            ,
            p.filter = p.select = function (e, t, n) {
                var r = [];
                return t = m(t, n),
                    p.each(e, function (e, n, i) {
                        t(e, n, i) && r.push(e)
                    }),
                    r
            }
            ,
            p.reject = function (e, t, n) {
                return p.filter(e, p.negate(m(t)), n)
            }
            ,
            p.every = p.all = function (e, t, n) {
                t = m(t, n);
                for (var r = !T(e) && p.keys(e), i = (r || e).length, a = 0; a < i; a++) {
                    var o = r ? r[a] : a;
                    if (!t(e[o], o, e))
                        return !1
                }
                return !0
            }
            ,
            p.some = p.any = function (e, t, n) {
                t = m(t, n);
                for (var r = !T(e) && p.keys(e), i = (r || e).length, a = 0; a < i; a++) {
                    var o = r ? r[a] : a;
                    if (t(e[o], o, e))
                        return !0
                }
                return !1
            }
            ,
            p.contains = p.includes = p.include = function (e, t, n, r) {
                return T(e) || (e = p.values(e)),
                ("number" != typeof n || r) && (n = 0),
                0 <= p.indexOf(e, t, n)
            }
            ,
            p.invoke = g(function (e, t, n) {
                var r, i;
                return p.isFunction(t) ? i = t : p.isArray(t) && (r = t.slice(0, -1),
                    t = t[t.length - 1]),
                    p.map(e, function (e) {
                        var a = i;
                        if (!a) {
                            if (r && r.length && (e = b(e, r)),
                            null == e)
                                return;
                            a = e[t]
                        }
                        return null == a ? a : a.apply(e, n)
                    })
            }),
            p.pluck = function (e, t) {
                return p.map(e, p.property(t))
            }
            ,
            p.where = function (e, t) {
                return p.filter(e, p.matcher(t))
            }
            ,
            p.findWhere = function (e, t) {
                return p.find(e, p.matcher(t))
            }
            ,
            p.max = function (e, t, n) {
                var r, i, a = -1 / 0, o = -1 / 0;
                if (null == t || "number" == typeof t && "object" != typeof e[0] && null != e)
                    for (var s = 0, l = (e = T(e) ? e : p.values(e)).length; s < l; s++)
                        null != (r = e[s]) && a < r && (a = r);
                else
                    t = m(t, n),
                        p.each(e, function (e, n, r) {
                            i = t(e, n, r),
                            (o < i || i === -1 / 0 && a === -1 / 0) && (a = e,
                                o = i)
                        });
                return a
            }
            ,
            p.min = function (e, t, n) {
                var r, i, a = 1 / 0, o = 1 / 0;
                if (null == t || "number" == typeof t && "object" != typeof e[0] && null != e)
                    for (var s = 0, l = (e = T(e) ? e : p.values(e)).length; s < l; s++)
                        null != (r = e[s]) && r < a && (a = r);
                else
                    t = m(t, n),
                        p.each(e, function (e, n, r) {
                            ((i = t(e, n, r)) < o || i === 1 / 0 && a === 1 / 0) && (a = e,
                                o = i)
                        });
                return a
            }
            ,
            p.shuffle = function (e) {
                return p.sample(e, 1 / 0)
            }
            ,
            p.sample = function (e, t, n) {
                if (null == t || n)
                    return T(e) || (e = p.values(e)),
                        e[p.random(e.length - 1)];
                var r = T(e) ? p.clone(e) : p.values(e)
                    , i = k(r);
                t = Math.max(Math.min(t, i), 0);
                for (var a = i - 1, o = 0; o < t; o++) {
                    var s = p.random(o, a)
                        , l = r[o];
                    r[o] = r[s],
                        r[s] = l
                }
                return r.slice(0, t)
            }
            ,
            p.sortBy = function (e, t, n) {
                var r = 0;
                return t = m(t, n),
                    p.pluck(p.map(e, function (e, n, i) {
                        return {
                            value: e,
                            index: r++,
                            criteria: t(e, n, i)
                        }
                    }).sort(function (e, t) {
                        var n = e.criteria
                            , r = t.criteria;
                        if (n !== r) {
                            if (r < n || void 0 === n)
                                return 1;
                            if (n < r || void 0 === r)
                                return -1
                        }
                        return e.index - t.index
                    }), "value")
            }
        ;
        var D = function (e, t) {
            return function (n, r, i) {
                var a = t ? [[], []] : {};
                return r = m(r, i),
                    p.each(n, function (t, i) {
                        var o = r(t, i, n);
                        e(a, t, o)
                    }),
                    a
            }
        };
        p.groupBy = D(function (e, t, n) {
            w(e, n) ? e[n].push(t) : e[n] = [t]
        }),
            p.indexBy = D(function (e, t, n) {
                e[n] = t
            }),
            p.countBy = D(function (e, t, n) {
                w(e, n) ? e[n]++ : e[n] = 1
            });
        var S = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
        p.toArray = function (e) {
            return e ? p.isArray(e) ? o.call(e) : p.isString(e) ? e.match(S) : T(e) ? p.map(e, p.identity) : p.values(e) : []
        }
            ,
            p.size = function (e) {
                return null == e ? 0 : T(e) ? e.length : p.keys(e).length
            }
            ,
            p.partition = D(function (e, t, n) {
                e[n ? 0 : 1].push(t)
            }, !0),
            p.first = p.head = p.take = function (e, t, n) {
                return null == e || e.length < 1 ? null == t ? void 0 : [] : null == t || n ? e[0] : p.initial(e, e.length - t)
            }
            ,
            p.initial = function (e, t, n) {
                return o.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
            }
            ,
            p.last = function (e, t, n) {
                return null == e || e.length < 1 ? null == t ? void 0 : [] : null == t || n ? e[e.length - 1] : p.rest(e, Math.max(0, e.length - t))
            }
            ,
            p.rest = p.tail = p.drop = function (e, t, n) {
                return o.call(e, null == t || n ? 1 : t)
            }
            ,
            p.compact = function (e) {
                return p.filter(e, Boolean)
            }
        ;
        var N = function (e, t, n, r) {
            for (var i = (r = r || []).length, a = 0, o = k(e); a < o; a++) {
                var s = e[a];
                if (T(s) && (p.isArray(s) || p.isArguments(s)))
                    if (t)
                        for (var l = 0, c = s.length; l < c;)
                            r[i++] = s[l++];
                    else
                        N(s, t, n, r),
                            i = r.length;
                else
                    n || (r[i++] = s)
            }
            return r
        };
        p.flatten = function (e, t) {
            return N(e, t, !1)
        }
            ,
            p.without = g(function (e, t) {
                return p.difference(e, t)
            }),
            p.uniq = p.unique = function (e, t, n, r) {
                p.isBoolean(t) || (r = n,
                    n = t,
                    t = !1),
                null != n && (n = m(n, r));
                for (var i = [], a = [], o = 0, s = k(e); o < s; o++) {
                    var l = e[o]
                        , c = n ? n(l, o, e) : l;
                    t && !n ? (o && a === c || i.push(l),
                        a = c) : n ? p.contains(a, c) || (a.push(c),
                        i.push(l)) : p.contains(i, l) || i.push(l)
                }
                return i
            }
            ,
            p.union = g(function (e) {
                return p.uniq(N(e, !0, !0))
            }),
            p.intersection = function (e) {
                for (var t = [], n = arguments.length, r = 0, i = k(e); r < i; r++) {
                    var a = e[r];
                    if (!p.contains(t, a)) {
                        var o;
                        for (o = 1; o < n && p.contains(arguments[o], a); o++)
                            ;
                        o === n && t.push(a)
                    }
                }
                return t
            }
            ,
            p.difference = g(function (e, t) {
                return t = N(t, !0, !0),
                    p.filter(e, function (e) {
                        return !p.contains(t, e)
                    })
            }),
            p.unzip = function (e) {
                for (var t = e && p.max(e, k).length || 0, n = Array(t), r = 0; r < t; r++)
                    n[r] = p.pluck(e, r);
                return n
            }
            ,
            p.zip = g(p.unzip),
            p.object = function (e, t) {
                for (var n = {}, r = 0, i = k(e); r < i; r++)
                    t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
                return n
            }
        ;
        var j = function (e) {
            return function (t, n, r) {
                n = m(n, r);
                for (var i = k(t), a = 0 < e ? 0 : i - 1; 0 <= a && a < i; a += e)
                    if (n(t[a], a, t))
                        return a;
                return -1
            }
        };
        p.findIndex = j(1),
            p.findLastIndex = j(-1),
            p.sortedIndex = function (e, t, n, r) {
                for (var i = (n = m(n, r, 1))(t), a = 0, o = k(e); a < o;) {
                    var s = Math.floor((a + o) / 2);
                    n(e[s]) < i ? a = s + 1 : o = s
                }
                return a
            }
        ;
        var M = function (e, t, n) {
            return function (r, i, a) {
                var s = 0
                    , l = k(r);
                if ("number" == typeof a)
                    0 < e ? s = 0 <= a ? a : Math.max(a + l, s) : l = 0 <= a ? Math.min(a + 1, l) : a + l + 1;
                else if (n && a && l)
                    return r[a = n(r, i)] === i ? a : -1;
                if (i != i)
                    return 0 <= (a = t(o.call(r, s, l), p.isNaN)) ? a + s : -1;
                for (a = 0 < e ? s : l - 1; 0 <= a && a < l; a += e)
                    if (r[a] === i)
                        return a;
                return -1
            }
        };
        p.indexOf = M(1, p.findIndex, p.sortedIndex),
            p.lastIndexOf = M(-1, p.findLastIndex),
            p.range = function (e, t, n) {
                null == t && (t = e || 0,
                    e = 0),
                n || (n = t < e ? -1 : 1);
                for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), a = 0; a < r; a++,
                    e += n)
                    i[a] = e;
                return i
            }
            ,
            p.chunk = function (e, t) {
                if (null == t || t < 1)
                    return [];
                for (var n = [], r = 0, i = e.length; r < i;)
                    n.push(o.call(e, r, r += t));
                return n
            }
        ;
        var O = function (e, t, n, r, i) {
            if (!(r instanceof t))
                return e.apply(n, i);
            var a = v(e.prototype)
                , o = e.apply(a, i);
            return p.isObject(o) ? o : a
        };
        p.bind = g(function (e, t, n) {
            if (!p.isFunction(e))
                throw new TypeError("Bind must be called on a function");
            var r = g(function (i) {
                return O(e, r, t, this, n.concat(i))
            });
            return r
        }),
            p.partial = g(function (e, t) {
                var n = p.partial.placeholder
                    , r = function () {
                    for (var i = 0, a = t.length, o = Array(a), s = 0; s < a; s++)
                        o[s] = t[s] === n ? arguments[i++] : t[s];
                    for (; i < arguments.length;)
                        o.push(arguments[i++]);
                    return O(e, r, this, this, o)
                };
                return r
            }),
            (p.partial.placeholder = p).bindAll = g(function (e, t) {
                var n = (t = N(t, !1, !1)).length;
                if (n < 1)
                    throw new Error("bindAll must be passed function names");
                for (; n--;) {
                    var r = t[n];
                    e[r] = p.bind(e[r], e)
                }
            }),
            p.memoize = function (e, t) {
                var n = function (r) {
                    var i = n.cache
                        , a = "" + (t ? t.apply(this, arguments) : r);
                    return w(i, a) || (i[a] = e.apply(this, arguments)),
                        i[a]
                };
                return n.cache = {},
                    n
            }
            ,
            p.delay = g(function (e, t, n) {
                return setTimeout(function () {
                    return e.apply(null, n)
                }, t)
            }),
            p.defer = p.partial(p.delay, p, 1),
            p.throttle = function (e, t, n) {
                var r, i, a, o, s = 0;
                n || (n = {});
                var l = function () {
                    s = !1 === n.leading ? 0 : p.now(),
                        r = null,
                        o = e.apply(i, a),
                    r || (i = a = null)
                }
                    , c = function () {
                    var c = p.now();
                    s || !1 !== n.leading || (s = c);
                    var u = t - (c - s);
                    return i = this,
                        a = arguments,
                        u <= 0 || t < u ? (r && (clearTimeout(r),
                            r = null),
                            s = c,
                            o = e.apply(i, a),
                        r || (i = a = null)) : r || !1 === n.trailing || (r = setTimeout(l, u)),
                        o
                };
                return c.cancel = function () {
                    clearTimeout(r),
                        s = 0,
                        r = i = a = null
                }
                    ,
                    c
            }
            ,
            p.debounce = function (e, t, n) {
                var r, i, a = function (t, n) {
                    r = null,
                    n && (i = e.apply(t, n))
                }, o = g(function (o) {
                    if (r && clearTimeout(r),
                        n) {
                        var s = !r;
                        r = setTimeout(a, t),
                        s && (i = e.apply(this, o))
                    } else
                        r = p.delay(a, t, this, o);
                    return i
                });
                return o.cancel = function () {
                    clearTimeout(r),
                        r = null
                }
                    ,
                    o
            }
            ,
            p.wrap = function (e, t) {
                return p.partial(t, e)
            }
            ,
            p.negate = function (e) {
                return function () {
                    return !e.apply(this, arguments)
                }
            }
            ,
            p.compose = function () {
                var e = arguments
                    , t = e.length - 1;
                return function () {
                    for (var n = t, r = e[t].apply(this, arguments); n--;)
                        r = e[n].call(this, r);
                    return r
                }
            }
            ,
            p.after = function (e, t) {
                return function () {
                    if (--e < 1)
                        return t.apply(this, arguments)
                }
            }
            ,
            p.before = function (e, t) {
                var n;
                return function () {
                    return 0 < --e && (n = t.apply(this, arguments)),
                    e <= 1 && (t = null),
                        n
                }
            }
            ,
            p.once = p.partial(p.before, 2),
            p.restArguments = g;
        var E = !{
            toString: null
        }.propertyIsEnumerable("toString")
            , q = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"]
            , A = function (e, t) {
            var n = q.length
                , i = e.constructor
                , a = p.isFunction(i) && i.prototype || r
                , o = "constructor";
            for (w(e, o) && !p.contains(t, o) && t.push(o); n--;)
                (o = q[n]) in e && e[o] !== a[o] && !p.contains(t, o) && t.push(o)
        };
        p.keys = function (e) {
            if (!p.isObject(e))
                return [];
            if (u)
                return u(e);
            var t = [];
            for (var n in e)
                w(e, n) && t.push(n);
            return E && A(e, t),
                t
        }
            ,
            p.allKeys = function (e) {
                if (!p.isObject(e))
                    return [];
                var t = [];
                for (var n in e)
                    t.push(n);
                return E && A(e, t),
                    t
            }
            ,
            p.values = function (e) {
                for (var t = p.keys(e), n = t.length, r = Array(n), i = 0; i < n; i++)
                    r[i] = e[t[i]];
                return r
            }
            ,
            p.mapObject = function (e, t, n) {
                t = m(t, n);
                for (var r = p.keys(e), i = r.length, a = {}, o = 0; o < i; o++) {
                    var s = r[o];
                    a[s] = t(e[s], s, e)
                }
                return a
            }
            ,
            p.pairs = function (e) {
                for (var t = p.keys(e), n = t.length, r = Array(n), i = 0; i < n; i++)
                    r[i] = [t[i], e[t[i]]];
                return r
            }
            ,
            p.invert = function (e) {
                for (var t = {}, n = p.keys(e), r = 0, i = n.length; r < i; r++)
                    t[e[n[r]]] = n[r];
                return t
            }
            ,
            p.functions = p.methods = function (e) {
                var t = [];
                for (var n in e)
                    p.isFunction(e[n]) && t.push(n);
                return t.sort()
            }
        ;
        var I = function (e, t) {
            return function (n) {
                var r = arguments.length;
                if (t && (n = Object(n)),
                r < 2 || null == n)
                    return n;
                for (var i = 1; i < r; i++)
                    for (var a = arguments[i], o = e(a), s = o.length, l = 0; l < s; l++) {
                        var c = o[l];
                        t && void 0 !== n[c] || (n[c] = a[c])
                    }
                return n
            }
        };
        p.extend = I(p.allKeys),
            p.extendOwn = p.assign = I(p.keys),
            p.findKey = function (e, t, n) {
                t = m(t, n);
                for (var r, i = p.keys(e), a = 0, o = i.length; a < o; a++)
                    if (t(e[r = i[a]], r, e))
                        return r
            }
        ;
        var L, F, H = function (e, t, n) {
            return t in n
        };
        p.pick = g(function (e, t) {
            var n = {}
                , r = t[0];
            if (null == e)
                return n;
            p.isFunction(r) ? (1 < t.length && (r = y(r, t[1])),
                t = p.allKeys(e)) : (r = H,
                t = N(t, !1, !1),
                e = Object(e));
            for (var i = 0, a = t.length; i < a; i++) {
                var o = t[i]
                    , s = e[o];
                r(s, o, e) && (n[o] = s)
            }
            return n
        }),
            p.omit = g(function (e, t) {
                var n, r = t[0];
                return p.isFunction(r) ? (r = p.negate(r),
                1 < t.length && (n = t[1])) : (t = p.map(N(t, !1, !1), String),
                        r = function (e, n) {
                            return !p.contains(t, n)
                        }
                ),
                    p.pick(e, r, n)
            }),
            p.defaults = I(p.allKeys, !0),
            p.create = function (e, t) {
                var n = v(e);
                return t && p.extendOwn(n, t),
                    n
            }
            ,
            p.clone = function (e) {
                return p.isObject(e) ? p.isArray(e) ? e.slice() : p.extend({}, e) : e
            }
            ,
            p.tap = function (e, t) {
                return t(e),
                    e
            }
            ,
            p.isMatch = function (e, t) {
                var n = p.keys(t)
                    , r = n.length;
                if (null == e)
                    return !r;
                for (var i = Object(e), a = 0; a < r; a++) {
                    var o = n[a];
                    if (t[o] !== i[o] || !(o in i))
                        return !1
                }
                return !0
            }
            ,
            L = function (e, t, n, r) {
                if (e === t)
                    return 0 !== e || 1 / e == 1 / t;
                if (null == e || null == t)
                    return !1;
                if (e != e)
                    return t != t;
                var i = typeof e;
                return ("function" === i || "object" === i || "object" == typeof t) && F(e, t, n, r)
            }
            ,
            F = function (e, t, n, r) {
                e instanceof p && (e = e._wrapped),
                t instanceof p && (t = t._wrapped);
                var a = s.call(e);
                if (a !== s.call(t))
                    return !1;
                switch (a) {
                    case "[object RegExp]":
                    case "[object String]":
                        return "" + e == "" + t;
                    case "[object Number]":
                        return +e != +e ? +t != +t : 0 == +e ? 1 / +e == 1 / t : +e == +t;
                    case "[object Date]":
                    case "[object Boolean]":
                        return +e == +t;
                    case "[object Symbol]":
                        return i.valueOf.call(e) === i.valueOf.call(t)
                }
                var o = "[object Array]" === a;
                if (!o) {
                    if ("object" != typeof e || "object" != typeof t)
                        return !1;
                    var l = e.constructor
                        , c = t.constructor;
                    if (l !== c && !(p.isFunction(l) && l instanceof l && p.isFunction(c) && c instanceof c) && "constructor" in e && "constructor" in t)
                        return !1
                }
                r = r || [];
                for (var u = (n = n || []).length; u--;)
                    if (n[u] === e)
                        return r[u] === t;
                if (n.push(e),
                    r.push(t),
                    o) {
                    if ((u = e.length) !== t.length)
                        return !1;
                    for (; u--;)
                        if (!L(e[u], t[u], n, r))
                            return !1
                } else {
                    var d, f = p.keys(e);
                    if (u = f.length,
                    p.keys(t).length !== u)
                        return !1;
                    for (; u--;)
                        if (d = f[u],
                        !w(t, d) || !L(e[d], t[d], n, r))
                            return !1
                }
                return n.pop(),
                    r.pop(),
                    !0
            }
            ,
            p.isEqual = function (e, t) {
                return L(e, t)
            }
            ,
            p.isEmpty = function (e) {
                return null == e || (T(e) && (p.isArray(e) || p.isString(e) || p.isArguments(e)) ? 0 === e.length : 0 === p.keys(e).length)
            }
            ,
            p.isElement = function (e) {
                return !(!e || 1 !== e.nodeType)
            }
            ,
            p.isArray = c || function (e) {
                return "[object Array]" === s.call(e)
            }
            ,
            p.isObject = function (e) {
                var t = typeof e;
                return "function" === t || "object" === t && !!e
            }
            ,
            p.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"], function (e) {
                p["is" + e] = function (t) {
                    return s.call(t) === "[object " + e + "]"
                }
            }),
        p.isArguments(arguments) || (p.isArguments = function (e) {
                return w(e, "callee")
            }
        );
        var P = e.document && e.document.childNodes;
        "function" != typeof /./ && "object" != typeof Int8Array && "function" != typeof P && (p.isFunction = function (e) {
                return "function" == typeof e || !1
            }
        ),
            p.isFinite = function (e) {
                return !p.isSymbol(e) && isFinite(e) && !isNaN(parseFloat(e))
            }
            ,
            p.isNaN = function (e) {
                return p.isNumber(e) && isNaN(e)
            }
            ,
            p.isBoolean = function (e) {
                return !0 === e || !1 === e || "[object Boolean]" === s.call(e)
            }
            ,
            p.isNull = function (e) {
                return null === e
            }
            ,
            p.isUndefined = function (e) {
                return void 0 === e
            }
            ,
            p.has = function (e, t) {
                if (!p.isArray(t))
                    return w(e, t);
                for (var n = t.length, r = 0; r < n; r++) {
                    var i = t[r];
                    if (null == e || !l.call(e, i))
                        return !1;
                    e = e[i]
                }
                return !!n
            }
            ,
            p.noConflict = function () {
                return e._ = t,
                    this
            }
            ,
            p.identity = function (e) {
                return e
            }
            ,
            p.constant = function (e) {
                return function () {
                    return e
                }
            }
            ,
            p.noop = function () {
            }
            ,
            p.property = function (e) {
                return p.isArray(e) ? function (t) {
                        return b(t, e)
                    }
                    : _(e)
            }
            ,
            p.propertyOf = function (e) {
                return null == e ? function () {
                    }
                    : function (t) {
                        return p.isArray(t) ? b(e, t) : e[t]
                    }
            }
            ,
            p.matcher = p.matches = function (e) {
                return e = p.extendOwn({}, e),
                    function (t) {
                        return p.isMatch(t, e)
                    }
            }
            ,
            p.times = function (e, t, n) {
                var r = Array(Math.max(0, e));
                t = y(t, n, 1);
                for (var i = 0; i < e; i++)
                    r[i] = t(i);
                return r
            }
            ,
            p.random = function (e, t) {
                return null == t && (t = e,
                    e = 0),
                e + Math.floor(Math.random() * (t - e + 1))
            }
            ,
            p.now = Date.now || function () {
                return (new Date).getTime()
            }
        ;
        var U = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }
            , B = p.invert(U)
            , R = function (e) {
            var t = function (t) {
                return e[t]
            }
                , n = "(?:" + p.keys(e).join("|") + ")"
                , r = RegExp(n)
                , i = RegExp(n, "g");
            return function (e) {
                return e = null == e ? "" : "" + e,
                    r.test(e) ? e.replace(i, t) : e
            }
        };
        p.escape = R(U),
            p.unescape = R(B),
            p.result = function (e, t, n) {
                p.isArray(t) || (t = [t]);
                var r = t.length;
                if (!r)
                    return p.isFunction(n) ? n.call(e) : n;
                for (var i = 0; i < r; i++) {
                    var a = null == e ? void 0 : e[t[i]];
                    void 0 === a && (a = n,
                        i = r),
                        e = p.isFunction(a) ? a.call(e) : a
                }
                return e
            }
        ;
        var W = 0;
        p.uniqueId = function (e) {
            var t = ++W + "";
            return e ? e + t : t
        }
            ,
            p.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
        var $ = /(.)^/
            , z = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }
            , Q = /\\|'|\r|\n|\u2028|\u2029/g
            , Y = function (e) {
            return "\\" + z[e]
        };
        p.template = function (e, t, n) {
            !t && n && (t = n),
                t = p.defaults({}, t, p.templateSettings);
            var r,
                i = RegExp([(t.escape || $).source, (t.interpolate || $).source, (t.evaluate || $).source].join("|") + "|$", "g"),
                a = 0, o = "__p+='";
            e.replace(i, function (t, n, r, i, s) {
                return o += e.slice(a, s).replace(Q, Y),
                    a = s + t.length,
                    n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : i && (o += "';\n" + i + "\n__p+='"),
                    t
            }),
                o += "';\n",
            t.variable || (o = "with(obj||{}){\n" + o + "}\n"),
                o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
            try {
                r = new Function(t.variable || "obj", "_", o)
            } catch (t) {
                throw t.source = o,
                    t
            }
            var s = function (e) {
                return r.call(this, e, p)
            };
            return s.source = "function(" + (t.variable || "obj") + "){\n" + o + "}",
                s
        }
            ,
            p.chain = function (e) {
                var t = p(e);
                return t._chain = !0,
                    t
            }
        ;
        var J = function (e, t) {
            return e._chain ? p(t).chain() : t
        };
        p.mixin = function (e) {
            return p.each(p.functions(e), function (t) {
                var n = p[t] = e[t];
                p.prototype[t] = function () {
                    var e = [this._wrapped];
                    return a.apply(e, arguments),
                        J(this, n.apply(p, e))
                }
            }),
                p
        }
            ,
            p.mixin(p),
            p.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
                var t = n[e];
                p.prototype[e] = function () {
                    var n = this._wrapped;
                    return t.apply(n, arguments),
                    "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0],
                        J(this, n)
                }
            }),
            p.each(["concat", "join", "slice"], function (e) {
                var t = n[e];
                p.prototype[e] = function () {
                    return J(this, t.apply(this._wrapped, arguments))
                }
            }),
            p.prototype.value = function () {
                return this._wrapped
            }
            ,
            p.prototype.valueOf = p.prototype.toJSON = p.prototype.value,
            p.prototype.toString = function () {
                return String(this._wrapped)
            }
            ,
        "function" == typeof define && define.amd && define("underscore", [], function () {
            return p
        })
    }(),
    define("index/index_init", ["jquery"], function (e) {
        function t() {
            var t = navigator.appName
                , r = navigator.appVersion
                , i = r.split(";");
            if (i[1]) {
                var a = i[1].replace(/[ ]/g, "");
                "Microsoft Internet Explorer" == t && "MSIE7.0" == a ? window.location.href = htmlHref.browserForie : "Microsoft Internet Explorer" == t && "MSIE6.0" == a && (window.location.href = htmlHref.browserForie)
            }
            jQuery.support.cors = !0,
                n(),
                e(".index_notice").on("click", function () {
                    e(".index_notice").attr("href", noticeUrl)
                })
        }

        function n() {
            loadingShow(),
                e.ajax({
                    url: personal_welcome_url,
                    type: "POST",
                    timeout: 1e4,
                    success: function (t) {
                        if (loadingHide(),
                            t.data) {
                            window.DZP.confirm("", window.DZP.confirm.typeEnum.confirm, {
                                width: "666",
                                title: "提示",
                                msg: {
                                    tit: '根据有关部门要求，为加强新型冠状病毒感染的肺炎疫情防控工作，购买火车票时请提供每一名乘车旅客本人使用的手机号码，以便在需要时及时联系乘车旅客。为了方便您为他人购票，请您提前填报并通知乘车旅客协助核验。对于未成年人、老年人等重点旅客以及无手机的旅客，可提供监护人或能及时联系的亲友手机号码，港澳台旅客、外籍旅客可提供电子邮箱。铁路部门将依法保护旅客个人信息安全。<br/><a style="color: #0077FF;font-size: 16px;" href="' + toPassengers + '">立即填写联系方式信息</a>'
                                },
                                btn: 1
                            });
                            var n = JSON.parse(JSON.stringify(t.data));
                            if (n.user_name && n.user_regard) {
                                var r = '<div class="welcome-tit"><img src="../images/center/noticepic.png" alt="" class="welcome-notice"><strong class="welcome-name">' + n.user_name + "</strong><span>" + n.user_regard + "</span></div>";
                                if (r += '<div class="welcome-con"><p>欢迎您登录中国铁路客户服务中心网站。',
                                    "B" != t.data.id_type_code ? "2" == t.data.user_status ? r += '<span style="color: red;">您的身份核验状态为：待核验，请稍后查询核验结果。</span><br />' : "4" == t.data.user_status || "6" == t.data.user_status ? r += '<span style="color: red;">您的身份核验状态为：未通过，请核查您填写的<a class="txt-primary underline" href="' + static_url_path + '/view/information.html" >个人信息</a>。</span><br />' : r += "<br />" : r += "<br />",
                                    r += '<span style="color: red;">如果您的密码在其他网站也使用，建议您修改本网站密码。</span><br />',
                                    r += '<span style="color: red;">根据有关部门要求，为加强新型冠状病毒感染的肺炎疫情防控工作，购买火车票时请提供每一名乘车旅客本人使用的手机号码，以便在需要时及时联系乘车旅客。为了方便您为他人购票，请您提前填报并通知乘车旅客协助核验。对于未成年人、老年人等重点旅客以及无手机的旅客，可提供监护人或能及时联系的亲友手机号码，港澳台旅客、外籍旅客可提供电子邮箱。铁路部门将依法保护旅客个人信息安全。',
                                    r += '</span><a style="color: #0077FF;" href="' + toPassengers + '">立即填写联系方式信息</a><br />',
                                n._is_active && "N" == n._is_active && (r += "如果您要接收12306的服务邮件，请<a id='link_for_reSendEmail' href='javascript:;' class = 'txt-primary underline'>验证邮箱</a>。<br />"),
                                "Y" == n._is_needModifyPassword && (r += "您设置的密码安全级别较低，强烈建议您<a id='link_for_changePassword' href='javascript:;' class = 'txt-primary underline'>修改密码</a>。<br/>"),
                                n.notify_SESSION && "Y" == n.notify_SESSION && (r += "<span>本次登录成功！该用户已在其他地点登录，前次登录将被强制退出。</span><br />"),
                                n.isCanRegistMember && (r += '点击<a id="isStationMember" href="javascript:;" class = "txt-primary underline">成为会员</a><br />'),
                                n.notify_TWO_2 && "" != n.notify_TWO_2) {
                                    if ("完成手机双向核验，即可使用手机号码直接登录的新服务，解除您遗忘用户名的烦恼。" != n.notify_TWO_2) {
                                        var i = n.notify_TWO_2;
                                        window.DZP.confirm(i, window.DZP.confirm.typeEnum.info, {
                                            width: "440",
                                            height: "160",
                                            title: "温馨提示"
                                        })
                                    }
                                    r += "<span style='color:red;'>",
                                        r += n.notify_TWO_2,
                                        r += "</span><br />"
                                } else
                                    r += "如果您需要预订车票，请您点击<a id='link_for_ticket' class = 'txt-primary underline' href='javascript:;'>车票预订</a>。";
                                "Y" == n.to_12306 && (r += '<div><br></br>恭喜您在铁路旅客服务质量问卷调查活动中获奖，为确保您的奖励积分使用安全，请您点击<a id="link_for_needKnow" href="javascript:;" class="txt-primary underline"><span>兑奖须知</span></a>补充并确认相关信息。</div>'),
                                "Y" == n.resetMemberPwd && (r += '<div><br></br>您好，原积分用户需重置交易密码，请您点击<a id="resetMemberPwd" href="javascript:;" class="txt-primary underline"><span>重置密码</span></a></div>'),
                                "YN" == n.isSuperUser && (r += "<div>S</div>"),
                                    r += "</p></div>",
                                    e(".welcome_data").html(r),
                                    e(".tips-box").show()
                            }
                            if (n.qr_code_url) {
                                var a = static_url_path + "/index/requestWechatQr?w=mypage";
                                e("#weixinImg").html('<div class="code-pic"><img src=' + a + '></div><div class="code-txt">使用微信扫一扫，可通过<br>微信公众号接收12306行程通知</div>')
                            }
                            if (n.if_show_ali_qr_code) {
                                var a = static_url_path + "/index/requestAliQr?w=mypage";
                                e("#aliImg").html('<div class="code-pic"><img src=' + a + '></div><div class="code-txt">使用支付宝扫一扫，可通过<br>支付宝通知提醒接收12306行程通知</div>')
                            }
                        }
                        e("#link_for_reSendEmail").on("click", function () {
                            e.ajax({
                                url: static_url_path + "/index/reSendEmail",
                                type: "post",
                                success: function (e) {
                                    if (e.data) {
                                        var t = e.data._email ? e.data._email : "";
                                        window.DZP.confirm("", window.DZP.confirm.typeEnum.confirm, {
                                            height: "190",
                                            title: "验证邮箱",
                                            msg: {
                                                tit: "验证邮件已发送，请您登录邮箱<br>" + t + "完成验证！"
                                            },
                                            onOk: function () {
                                                window.location.href = static_url_path + "/view/information.html"
                                            }
                                        })
                                    } else {
                                        window.DZP.confirm("验证邮件发送失败！", window.DZP.confirm.typeEnum.confirm, {
                                            title: "验证邮箱",
                                            width: "400",
                                            height: "150",
                                            onOk: function () {
                                                window.location.href = static_url_path + "/view/information.html"
                                            }
                                        })
                                    }
                                },
                                error: function () {
                                }
                            })
                        }),
                            e("#link_for_changePassword").on("click", function () {
                                window.location.href = static_url_path + "/userSecurity/loginPwd?req_flag=init"
                            }),
                            e("#isStationMember").click(function () {
                                e.ajax({
                                    url: static_url_path + "/index/isStationMember",
                                    type: "post",
                                    success: function (t) {
                                        var n = t.data;
                                        n ? "1" == n.flag ? (e("#isStationMember").attr("target", "_blank"),
                                            window.location.href = "https://cx.12306.cn/tlcx/register.html?id=1") : (e("#isStationMember").attr("target", "_blank"),
                                            window.location.href = "https://cx.12306.cn/tlcx/register.html?id=0") : window.DZP.confirm("", window.DZP.confirm.typeEnum.confirm, {
                                            title: "提示",
                                            msg: {
                                                tit: "系统繁忙,请稍后再试"
                                            },
                                            btn: 1
                                        })
                                    },
                                    error: function () {
                                        window.DZP.confirm("", window.DZP.confirm.typeEnum.confirm, {
                                            title: "提示",
                                            msg: {
                                                tit: "系统繁忙,请稍后再试"
                                            },
                                            btn: 1
                                        })
                                    }
                                })
                            }),
                            e("#link_for_ticket").on("click", function () {
                                window.location.href = static_url_path + "/leftTicket/init"
                            }),
                            e("#link_for_needKnow").on("click", function () {
                                e.ajax({
                                    url: static_url_path + "/index/checkIsOrNotMember",
                                    type: "post",
                                    success: function (e) {
                                        if (e.data.flag)
                                            window.location.href = static_url_path + "/index/preAddMember";
                                        else {
                                            var t = e.data.message;
                                            window.DZP.confirm(t, window.DZP.confirm.typeEnum.confirm, {
                                                title: "积分兑换",
                                                width: "400",
                                                height: "150"
                                            })
                                        }
                                    },
                                    error: function () {
                                        window.DZP.confirm("积分兑换失败！", window.DZP.confirm.typeEnum.confirm, {
                                            title: "积分兑换",
                                            width: "400",
                                            height: "150"
                                        })
                                    }
                                })
                            }),
                            e("#resetMemberPwd").on("click", function () {
                                window.location.href = static_url_path + "/userIntegration/gotoResetMemPwd"
                            })
                    },
                    error: function (e) {
                        loadingHide(),
                            window.DZP.confirm("", window.DZP.confirm.typeEnum.confirm, {
                                title: "提示",
                                msg: {
                                    tit: "系统繁忙,请稍后再试"
                                },
                                btn: 1
                            })
                    }
                })
        }

        return {
            initialize: function () {
                t()
            }
        }
    }),
    define("index/app", ["jquery", "g/g-header", "g/g-footer", "g/g-href", "core/common/jquery.SuperSlide", "core/common/mUtils", "core/common/common", "core/common/data.jcokies", "core/common/url_config", "core/common/data.jcalendar", "core/common/date", "core/plugin/confirm", "underscore", "index/index_init"], function (e, t, n, r, i, a, o, s, l, c, u, d, f, p) {
        function h() {
            t.initialize(),
                e("#J-index").removeClass("active"),
                e("#J-chepiao").addClass("active"),
                e("#gerenzhongxin h2").addClass("active"),
            isOver && (p.initialize(),
                n.initialize(),
                r.initialize())
        }

        return {
            initialize: h
        }
    }),
    require.config({
        baseUrl: "../personalJS/",
        shim: {
            jquery: {
                exports: "$"
            },
            underscore: {
                exports: "underscore"
            }
        },
        paths: {
            jquery: "core/lib/jquery.min",
            underscore: "core/lib/underscore"
        },
        waitSeconds: 0
    }),
    require(["index/app"], function (e) {
        new e.initialize
    }),
    define("index/main", function () {
    });
