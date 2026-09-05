var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-ay2izr/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/pages-XKmWJs/bundledWorker-0.6434480965388047.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name2(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name2((_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name2((_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name2((_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[/* @__PURE__ */ Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name2(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name2((_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name2((_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name2((_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var se = Object.create;
var H = Object.defineProperty;
var ne = Object.getOwnPropertyDescriptor;
var ae = Object.getOwnPropertyNames;
var oe = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var C = /* @__PURE__ */ __name2((e, t) => () => (e && (t = e(e = 0)), t), "C");
var U = /* @__PURE__ */ __name2((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "U");
var ce = /* @__PURE__ */ __name2((e, t, s, r) => {
  if (t && typeof t == "object" || typeof t == "function") for (let a of ae(t)) !ie.call(e, a) && a !== s && H(e, a, { get: /* @__PURE__ */ __name2(() => t[a], "get"), enumerable: !(r = ne(t, a)) || r.enumerable });
  return e;
}, "ce");
var V = /* @__PURE__ */ __name2((e, t, s) => (s = e != null ? se(oe(e)) : {}, ce(t || !e || !e.__esModule ? H(s, "default", { value: e, enumerable: true }) : s, e)), "V");
var m;
var _ = C(() => {
  m = { collectedLocales: [] };
});
var h;
var p = C(() => {
  h = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "b9af595afc9fb2de520e39e723bcba16" }], middlewarePath: "middleware", middlewareRawSrc: ["/admin/:path*"], override: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "b9af595afc9fb2de520e39e723bcba16" }], middlewarePath: "middleware", middlewareRawSrc: ["/api/:path*"], override: true }, { src: "^/(?<path>.+?)(?:/)?$", dest: "/$path.segments/$segmentPath.segment.rsc", has: [{ type: "header", key: "rsc", value: "1" }, { type: "header", key: "next-router-prefetch", value: "1" }, { type: "header", key: "next-router-segment-prefetch", value: "/(?<segmentPath>.+)" }], continue: true, override: true }, { src: "^/?$", dest: "/index.segments/$segmentPath.segment.rsc", has: [{ type: "header", key: "rsc", value: "1" }, { type: "header", key: "next-router-prefetch", value: "1" }, { type: "header", key: "next-router-segment-prefetch", value: "/(?<segmentPath>.+)" }], continue: true, override: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }, { src: "^/(?<path>.+)(?<rscSuffix>\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/$path.rsc", check: true }], rewrite: [{ src: "^/(?<path>.+)(?<rscSuffix>\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/$path.rsc", check: true, override: true }, { src: "^/product/(?<nxtPid>[^/]+?)(?<rscSuffix>\\.rsc|\\.prefetch\\.rsc|\\.segments/.+\\.segment\\.rsc)(?:/)?$", dest: "/product/[id]$rscSuffix?nxtPid=$nxtPid", check: true, override: true }, { src: "^/product/(?<nxtPid>[^/]+?)(?:/)?$", dest: "/product/[id]?nxtPid=$nxtPid", check: true, override: true }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|OE8YSdxjsLV68xF7\\-iCr6)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404, headers: { "x-next-error-status": "404" } }, { src: "^/.*$", dest: "/500", status: 500, headers: { "x-next-error-status": "500" } }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 32, 48, 64, 96, 128, 256, 384], qualities: [75], remotePatterns: [], localPatterns: [{ pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$", search: "" }], minimumCacheTTL: 14400, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "404.segments/_tree.segment.rsc.json": { path: "404.segments/_tree.segment.rsc", contentType: "application/json" }, "500.rsc.json": { path: "500.rsc", contentType: "application/json" }, "500.segments/_tree.segment.rsc.json": { path: "500.segments/_tree.segment.rsc", contentType: "application/json" }, "favicon.ico": { contentType: "image/x-icon" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { slug: "nextjs", version: "16.3.4" }, crons: [] };
});
var x;
var u = C(() => {
  x = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/404.segments/_tree.segment.rsc.json": { type: "override", path: "/404.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500.rsc.json": { type: "override", path: "/500.rsc.json", headers: { "content-type": "application/json" } }, "/500.segments/_tree.segment.rsc.json": { type: "override", path: "/500.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/OE8YSdxjsLV68xF7-iCr6/_buildManifest.js": { type: "static" }, "/_next/static/OE8YSdxjsLV68xF7-iCr6/_clientMiddlewareManifest.js": { type: "static" }, "/_next/static/OE8YSdxjsLV68xF7-iCr6/_ssgManifest.js": { type: "static" }, "/_next/static/chunks/04vhd8ukv1sr9.js": { type: "static" }, "/_next/static/chunks/0cz1d0mv5g_q7.js": { type: "static" }, "/_next/static/chunks/0oik52ytccmnw.js": { type: "static" }, "/_next/static/chunks/0pmzv5j_d9ump.js": { type: "static" }, "/_next/static/chunks/1l3skm7e7j9ho.js": { type: "static" }, "/_next/static/chunks/1o9s54v51dn16.js": { type: "static" }, "/_next/static/chunks/1x0k-mlkr9-ql.css": { type: "static" }, "/_next/static/chunks/1zc960uy2fqdq.js": { type: "static" }, "/_next/static/chunks/28hqdyr7b85ph.js": { type: "static" }, "/_next/static/chunks/2e0rg1tw0ufyd.js": { type: "static" }, "/_next/static/chunks/2o3ejia3gydtx.js": { type: "static" }, "/_next/static/chunks/2rt0fykc7yo7j.js": { type: "static" }, "/_next/static/chunks/2s4e2_vbscdrd.js": { type: "static" }, "/_next/static/chunks/2xaikkau38d1b.js": { type: "static" }, "/_next/static/chunks/2yepiy9ikofg_.js": { type: "static" }, "/_next/static/chunks/310vm2bl3xxpt.js": { type: "static" }, "/_next/static/chunks/39w_2c7r99zo7.js": { type: "static" }, "/_next/static/chunks/3b0j51sw894hv.js": { type: "static" }, "/_next/static/chunks/3dp1amj7l35rn.js": { type: "static" }, "/_next/static/chunks/3xd0r4zygzrg5.js": { type: "static" }, "/_next/static/chunks/turbopack-43u8d5hebv81-.js": { type: "static" }, "/_next/static/media/5c285b27cdda1fe8-s.p.2_mbdogr7ni8i.woff2": { type: "static" }, "/_next/static/media/c3cb240f9c892514-s.3z_x6eowsw16y.woff2": { type: "static" }, "/_next/static/media/favicon.2vob68tjqpejf.ico": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/favicon.ico": { type: "override", path: "/favicon.ico", headers: { "content-type": "image/x-icon" } }, "/file.svg": { type: "static" }, "/globe.svg": { type: "static" }, "/next.svg": { type: "static" }, "/vercel.svg": { type: "static" }, "/window.svg": { type: "static" }, "/api/categories": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/categories.func.js" }, "/api/categories.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/categories.func.js" }, "/api/products": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/products.func.js" }, "/api/products.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/products.func.js" }, "/api/settings": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/settings.func.js" }, "/api/settings.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/settings.func.js" }, "/api/upload-url": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/upload-url.func.js" }, "/api/upload-url.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/upload-url.func.js" }, "/index": { type: "function", entrypoint: "__next-on-pages-dist__/functions/index.func.js" }, "/": { type: "override", path: "/favicon.ico", headers: { "content-type": "image/x-icon" } }, "/index.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/index.func.js" }, "/product/[id]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/product/[id].func.js" }, "/product/[id].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/product/[id].func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/404.segments/_tree.segment.rsc": { type: "override", path: "/404.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/500.rsc": { type: "override", path: "/500.rsc.json", headers: { "content-type": "application/json" } }, "/500.segments/_tree.segment.rsc": { type: "override", path: "/500.segments/_tree.segment.rsc.json", headers: { "content-type": "application/json" } }, "/_global-error.html": { type: "override", path: "/_global-error.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_global-error": { type: "override", path: "/_global-error.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_global-error.rsc": { type: "override", path: "/_global-error.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/_global-error.segments/__PAGE__.segment.rsc": { type: "override", path: "/_global-error.segments/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_full.segment.rsc": { type: "override", path: "/_global-error.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_global-error.segments/_tree.segment.rsc": { type: "override", path: "/_global-error.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_global-error/layout,_N_T_/_global-error/page,_N_T_/_global-error", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.html": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found": { type: "override", path: "/_not-found.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/_not-found.rsc": { type: "override", path: "/_not-found.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/_not-found.segments/_full.segment.rsc": { type: "override", path: "/_not-found.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_not-found/__PAGE__.segment.rsc": { type: "override", path: "/_not-found.segments/_not-found/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/_not-found.segments/_tree.segment.rsc": { type: "override", path: "/_not-found.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/_not-found/layout,_N_T_/_not-found/page,_N_T_/_not-found", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/add.html": { type: "override", path: "/admin/add.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/add/layout,_N_T_/admin/add/page,_N_T_/admin/add", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/add": { type: "override", path: "/admin/add.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/add/layout,_N_T_/admin/add/page,_N_T_/admin/add", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/add.rsc": { type: "override", path: "/admin/add.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/add/layout,_N_T_/admin/add/page,_N_T_/admin/add", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/admin/add.segments/_full.segment.rsc": { type: "override", path: "/admin/add.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/add/layout,_N_T_/admin/add/page,_N_T_/admin/add", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/add.segments/_tree.segment.rsc": { type: "override", path: "/admin/add.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/add/layout,_N_T_/admin/add/page,_N_T_/admin/add", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/add.segments/admin/add/__PAGE__.segment.rsc": { type: "override", path: "/admin/add.segments/admin/add/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/add/layout,_N_T_/admin/add/page,_N_T_/admin/add", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/categories.html": { type: "override", path: "/admin/categories.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/categories/layout,_N_T_/admin/categories/page,_N_T_/admin/categories", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/categories": { type: "override", path: "/admin/categories.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/categories/layout,_N_T_/admin/categories/page,_N_T_/admin/categories", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/categories.rsc": { type: "override", path: "/admin/categories.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/categories/layout,_N_T_/admin/categories/page,_N_T_/admin/categories", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/admin/categories.segments/_full.segment.rsc": { type: "override", path: "/admin/categories.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/categories/layout,_N_T_/admin/categories/page,_N_T_/admin/categories", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/categories.segments/_tree.segment.rsc": { type: "override", path: "/admin/categories.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/categories/layout,_N_T_/admin/categories/page,_N_T_/admin/categories", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/categories.segments/admin/categories/__PAGE__.segment.rsc": { type: "override", path: "/admin/categories.segments/admin/categories/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/categories/layout,_N_T_/admin/categories/page,_N_T_/admin/categories", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/checkout.html": { type: "override", path: "/admin/checkout.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/checkout/layout,_N_T_/admin/checkout/page,_N_T_/admin/checkout", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/checkout": { type: "override", path: "/admin/checkout.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/checkout/layout,_N_T_/admin/checkout/page,_N_T_/admin/checkout", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/checkout.rsc": { type: "override", path: "/admin/checkout.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/checkout/layout,_N_T_/admin/checkout/page,_N_T_/admin/checkout", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/admin/checkout.segments/_full.segment.rsc": { type: "override", path: "/admin/checkout.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/checkout/layout,_N_T_/admin/checkout/page,_N_T_/admin/checkout", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/checkout.segments/_tree.segment.rsc": { type: "override", path: "/admin/checkout.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/checkout/layout,_N_T_/admin/checkout/page,_N_T_/admin/checkout", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/checkout.segments/admin/checkout/__PAGE__.segment.rsc": { type: "override", path: "/admin/checkout.segments/admin/checkout/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/checkout/layout,_N_T_/admin/checkout/page,_N_T_/admin/checkout", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/promos.html": { type: "override", path: "/admin/promos.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/promos/layout,_N_T_/admin/promos/page,_N_T_/admin/promos", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/promos": { type: "override", path: "/admin/promos.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/promos/layout,_N_T_/admin/promos/page,_N_T_/admin/promos", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/promos.rsc": { type: "override", path: "/admin/promos.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/promos/layout,_N_T_/admin/promos/page,_N_T_/admin/promos", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/admin/promos.segments/_full.segment.rsc": { type: "override", path: "/admin/promos.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/promos/layout,_N_T_/admin/promos/page,_N_T_/admin/promos", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/promos.segments/_tree.segment.rsc": { type: "override", path: "/admin/promos.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/promos/layout,_N_T_/admin/promos/page,_N_T_/admin/promos", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/promos.segments/admin/promos/__PAGE__.segment.rsc": { type: "override", path: "/admin/promos.segments/admin/promos/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/promos/layout,_N_T_/admin/promos/page,_N_T_/admin/promos", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.html": { type: "override", path: "/admin/settings.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/settings": { type: "override", path: "/admin/settings.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin/settings.rsc": { type: "override", path: "/admin/settings.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/admin/settings.segments/_full.segment.rsc": { type: "override", path: "/admin/settings.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.segments/_tree.segment.rsc": { type: "override", path: "/admin/settings.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin/settings.segments/admin/settings/__PAGE__.segment.rsc": { type: "override", path: "/admin/settings.segments/admin/settings/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/settings/layout,_N_T_/admin/settings/page,_N_T_/admin/settings", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin.html": { type: "override", path: "/admin.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin": { type: "override", path: "/admin.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/admin.rsc": { type: "override", path: "/admin.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/admin.segments/_full.segment.rsc": { type: "override", path: "/admin.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin.segments/_tree.segment.rsc": { type: "override", path: "/admin.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/admin.segments/admin/__PAGE__.segment.rsc": { type: "override", path: "/admin.segments/admin/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/admin/layout,_N_T_/admin/page,_N_T_/admin", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/cart.html": { type: "override", path: "/cart.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/cart/layout,_N_T_/cart/page,_N_T_/cart", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/cart": { type: "override", path: "/cart.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/cart/layout,_N_T_/cart/page,_N_T_/cart", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/cart.rsc": { type: "override", path: "/cart.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/cart/layout,_N_T_/cart/page,_N_T_/cart", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/cart.segments/_full.segment.rsc": { type: "override", path: "/cart.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/cart/layout,_N_T_/cart/page,_N_T_/cart", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/cart.segments/_tree.segment.rsc": { type: "override", path: "/cart.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/cart/layout,_N_T_/cart/page,_N_T_/cart", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/cart.segments/cart/__PAGE__.segment.rsc": { type: "override", path: "/cart.segments/cart/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/cart/layout,_N_T_/cart/page,_N_T_/cart", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/contact.html": { type: "override", path: "/contact.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/contact/layout,_N_T_/contact/page,_N_T_/contact", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/contact": { type: "override", path: "/contact.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/contact/layout,_N_T_/contact/page,_N_T_/contact", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/contact.rsc": { type: "override", path: "/contact.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/contact/layout,_N_T_/contact/page,_N_T_/contact", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/contact.segments/_full.segment.rsc": { type: "override", path: "/contact.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/contact/layout,_N_T_/contact/page,_N_T_/contact", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/contact.segments/_tree.segment.rsc": { type: "override", path: "/contact.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/contact/layout,_N_T_/contact/page,_N_T_/contact", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/contact.segments/contact/__PAGE__.segment.rsc": { type: "override", path: "/contact.segments/contact/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/contact/layout,_N_T_/contact/page,_N_T_/contact", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/faq.html": { type: "override", path: "/faq.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/faq/layout,_N_T_/faq/page,_N_T_/faq", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/faq": { type: "override", path: "/faq.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/faq/layout,_N_T_/faq/page,_N_T_/faq", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/faq.rsc": { type: "override", path: "/faq.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/faq/layout,_N_T_/faq/page,_N_T_/faq", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/faq.segments/_full.segment.rsc": { type: "override", path: "/faq.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/faq/layout,_N_T_/faq/page,_N_T_/faq", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/faq.segments/_tree.segment.rsc": { type: "override", path: "/faq.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/faq/layout,_N_T_/faq/page,_N_T_/faq", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/faq.segments/faq/__PAGE__.segment.rsc": { type: "override", path: "/faq.segments/faq/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/faq/layout,_N_T_/faq/page,_N_T_/faq", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/privacy.html": { type: "override", path: "/privacy.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/privacy/layout,_N_T_/privacy/page,_N_T_/privacy", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/privacy": { type: "override", path: "/privacy.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/privacy/layout,_N_T_/privacy/page,_N_T_/privacy", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/privacy.rsc": { type: "override", path: "/privacy.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/privacy/layout,_N_T_/privacy/page,_N_T_/privacy", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/privacy.segments/_full.segment.rsc": { type: "override", path: "/privacy.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/privacy/layout,_N_T_/privacy/page,_N_T_/privacy", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/privacy.segments/_tree.segment.rsc": { type: "override", path: "/privacy.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/privacy/layout,_N_T_/privacy/page,_N_T_/privacy", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/privacy.segments/privacy/__PAGE__.segment.rsc": { type: "override", path: "/privacy.segments/privacy/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/privacy/layout,_N_T_/privacy/page,_N_T_/privacy", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/terms.html": { type: "override", path: "/terms.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/terms/layout,_N_T_/terms/page,_N_T_/terms", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/terms": { type: "override", path: "/terms.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/terms/layout,_N_T_/terms/page,_N_T_/terms", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/terms.rsc": { type: "override", path: "/terms.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/terms/layout,_N_T_/terms/page,_N_T_/terms", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/terms.segments/_full.segment.rsc": { type: "override", path: "/terms.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/terms/layout,_N_T_/terms/page,_N_T_/terms", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/terms.segments/_tree.segment.rsc": { type: "override", path: "/terms.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/terms/layout,_N_T_/terms/page,_N_T_/terms", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/terms.segments/terms/__PAGE__.segment.rsc": { type: "override", path: "/terms.segments/terms/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/terms/layout,_N_T_/terms/page,_N_T_/terms", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/wishlist.html": { type: "override", path: "/wishlist.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/wishlist/layout,_N_T_/wishlist/page,_N_T_/wishlist", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/wishlist": { type: "override", path: "/wishlist.html", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/wishlist/layout,_N_T_/wishlist/page,_N_T_/wishlist", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch" } }, "/wishlist.rsc": { type: "override", path: "/wishlist.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/wishlist/layout,_N_T_/wishlist/page,_N_T_/wishlist", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component" } }, "/wishlist.segments/_full.segment.rsc": { type: "override", path: "/wishlist.segments/_full.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/wishlist/layout,_N_T_/wishlist/page,_N_T_/wishlist", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/wishlist.segments/_tree.segment.rsc": { type: "override", path: "/wishlist.segments/_tree.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/wishlist/layout,_N_T_/wishlist/page,_N_T_/wishlist", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, "/wishlist.segments/wishlist/__PAGE__.segment.rsc": { type: "override", path: "/wishlist.segments/wishlist/__PAGE__.segment.rsc", headers: { "x-nextjs-stale-time": "300", "x-nextjs-prerender": "1", "x-next-cache-tags": "_N_T_/layout,_N_T_/wishlist/layout,_N_T_/wishlist/page,_N_T_/wishlist", vary: "rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch", "content-type": "text/x-component", "x-nextjs-postponed": "2" } }, middleware: { type: "middleware", entrypoint: "__next-on-pages-dist__/functions/middleware.func.js" } };
});
var $ = U((We, F) => {
  "use strict";
  _();
  p();
  u();
  function T(e, t) {
    e = String(e || "").trim();
    let s = e, r, a = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      r = e[0];
      let i = e.lastIndexOf(r);
      a += e.substring(i + 1), e = e.substring(1, i);
    }
    let n = 0;
    return e = ue(e, (i) => {
      if (/^\(\?[P<']/.test(i)) {
        let c = /^\(\?P?[<']([^>']+)[>']/.exec(i);
        if (!c) throw new Error(`Failed to extract named captures from ${JSON.stringify(i)}`);
        let d = i.substring(c[0].length, i.length - 1);
        return t && (t[n] = c[1]), n++, `(${d})`;
      }
      return i.substring(0, 3) === "(?:" || n++, i;
    }), e = e.replace(/\[:([^:]+):\]/g, (i, c) => T.characterClasses[c] || i), new T.PCRE(e, a, s, a, r);
  }
  __name(T, "T");
  __name2(T, "T");
  function ue(e, t) {
    let s = 0, r = 0, a = false;
    for (let o = 0; o < e.length; o++) {
      let n = e[o];
      if (a) {
        a = false;
        continue;
      }
      switch (n) {
        case "(":
          r === 0 && (s = o), r++;
          break;
        case ")":
          if (r > 0 && (r--, r === 0)) {
            let i = o + 1, c = s === 0 ? "" : e.substring(0, s), d = e.substring(i), l = String(t(e.substring(s, i)));
            e = c + l + d, o = s;
          }
          break;
        case "\\":
          a = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(ue, "ue");
  __name2(ue, "ue");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      static {
        __name2(this, "t");
      }
      constructor(r, a, o, n, i) {
        super(r, a), this.pcrePattern = o, this.pcreFlags = n, this.delimiter = i;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(T || (T = {}));
  T.prototype = T.PCRE.prototype;
  F.exports = T;
});
var Y = U((O) => {
  "use strict";
  _();
  p();
  u();
  O.parse = je;
  O.serialize = we;
  var ve = Object.prototype.toString, S = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function je(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var s = {}, r = t || {}, a = r.decode || Re, o = 0; o < e.length; ) {
      var n = e.indexOf("=", o);
      if (n === -1) break;
      var i = e.indexOf(";", o);
      if (i === -1) i = e.length;
      else if (i < n) {
        o = e.lastIndexOf(";", n - 1) + 1;
        continue;
      }
      var c = e.slice(o, n).trim();
      if (s[c] === void 0) {
        var d = e.slice(n + 1, i).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), s[c] = ke(d, a);
      }
      o = i + 1;
    }
    return s;
  }
  __name(je, "je");
  __name2(je, "je");
  function we(e, t, s) {
    var r = s || {}, a = r.encode || Pe;
    if (typeof a != "function") throw new TypeError("option encode is invalid");
    if (!S.test(e)) throw new TypeError("argument name is invalid");
    var o = a(t);
    if (o && !S.test(o)) throw new TypeError("argument val is invalid");
    var n = e + "=" + o;
    if (r.maxAge != null) {
      var i = r.maxAge - 0;
      if (isNaN(i) || !isFinite(i)) throw new TypeError("option maxAge is invalid");
      n += "; Max-Age=" + Math.floor(i);
    }
    if (r.domain) {
      if (!S.test(r.domain)) throw new TypeError("option domain is invalid");
      n += "; Domain=" + r.domain;
    }
    if (r.path) {
      if (!S.test(r.path)) throw new TypeError("option path is invalid");
      n += "; Path=" + r.path;
    }
    if (r.expires) {
      var c = r.expires;
      if (!be(c) || isNaN(c.valueOf())) throw new TypeError("option expires is invalid");
      n += "; Expires=" + c.toUTCString();
    }
    if (r.httpOnly && (n += "; HttpOnly"), r.secure && (n += "; Secure"), r.priority) {
      var d = typeof r.priority == "string" ? r.priority.toLowerCase() : r.priority;
      switch (d) {
        case "low":
          n += "; Priority=Low";
          break;
        case "medium":
          n += "; Priority=Medium";
          break;
        case "high":
          n += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (r.sameSite) {
      var l = typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite;
      switch (l) {
        case true:
          n += "; SameSite=Strict";
          break;
        case "lax":
          n += "; SameSite=Lax";
          break;
        case "strict":
          n += "; SameSite=Strict";
          break;
        case "none":
          n += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return n;
  }
  __name(we, "we");
  __name2(we, "we");
  function Re(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(Re, "Re");
  __name2(Re, "Re");
  function Pe(e) {
    return encodeURIComponent(e);
  }
  __name(Pe, "Pe");
  __name2(Pe, "Pe");
  function be(e) {
    return ve.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(be, "be");
  __name2(be, "be");
  function ke(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(ke, "ke");
  __name2(ke, "ke");
});
_();
p();
u();
_();
p();
u();
_();
p();
u();
var v = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
_();
p();
u();
_();
p();
u();
_();
p();
u();
_();
p();
u();
var G = V($());
function P(e, t, s) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let r = s ? "" : "i", a = [];
  return { match: (0, G.default)(`%${e}%${r}`, a).exec(t), captureGroupKeys: a };
}
__name(P, "P");
__name2(P, "P");
function j(e, t, s, { namedOnly: r } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (a, o) => {
    let n = s.indexOf(o);
    return r && n === -1 ? a : (n === -1 ? t[parseInt(o, 10)] : t[n + 1]) || "";
  });
}
__name(j, "j");
__name2(j, "j");
function M(e, { url: t, cookies: s, headers: r, routeDest: a }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? A(e.value, r.get(e.key), a) : { valid: r.has(e.key) };
    case "cookie": {
      let o = s[e.key];
      return o && e.value !== void 0 ? A(e.value, o, a) : { valid: o !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? A(e.value, t.searchParams.get(e.key), a) : { valid: t.searchParams.has(e.key) };
  }
}
__name(M, "M");
__name2(M, "M");
function A(e, t, s) {
  let { match: r, captureGroupKeys: a } = P(e, t);
  return s && r && a.length ? { valid: !!r, newRouteDest: j(s, r, a, { namedOnly: true }) } : { valid: !!r };
}
__name(A, "A");
__name2(A, "A");
_();
p();
u();
function D(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", v), new Request(e, { headers: t });
}
__name(D, "D");
__name2(D, "D");
_();
p();
u();
function y(e, t, s) {
  let r = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [a, o] of r) {
    let n = a.toLowerCase(), i = s?.match ? j(o, s.match, s.captureGroupKeys) : o;
    n === "set-cookie" ? e.append(n, i) : e.set(n, i);
  }
}
__name(y, "y");
__name2(y, "y");
function w(e) {
  return /^https?:\/\//.test(e);
}
__name(w, "w");
__name2(w, "w");
function f(e, t) {
  for (let [s, r] of t.entries()) {
    let a = /^nxtP(.+)$/.exec(s), o = /^nxtI(.+)$/.exec(s);
    a?.[1] ? (e.set(s, r), e.set(a[1], r)) : o?.[1] ? e.set(o[1], r.replace(/(\(\.+\))+/, "")) : (!e.has(s) || !!r && !e.getAll(s).includes(r)) && e.append(s, r);
  }
}
__name(f, "f");
__name2(f, "f");
function q(e, t) {
  let s = new URL(t, e.url);
  return f(s.searchParams, new URL(e.url).searchParams), s.pathname = s.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(s, e);
}
__name(q, "q");
__name2(q, "q");
function R(e) {
  return new Response(e.body, e);
}
__name(R, "R");
__name2(R, "R");
function I(e) {
  return e.split(",").map((t) => {
    let [s, r] = t.split(";"), a = parseFloat((r ?? "q=1").replace(/q *= */gi, ""));
    return [s.trim(), isNaN(a) ? 1 : a];
  }).sort((t, s) => s[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(I, "I");
__name2(I, "I");
_();
p();
u();
function L(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(L, "L");
__name2(L, "L");
async function b(e, { request: t, assetsFetcher: s, ctx: r }, { path: a, searchParams: o }) {
  let n, i = new URL(t.url);
  f(i.searchParams, o);
  let c = new Request(i, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let d = await import(e.entrypoint);
        try {
          n = await d.default(c, r);
        } catch (l) {
          let g = l;
          throw g.name === "TypeError" && g.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : l;
        }
        break;
      }
      case "override": {
        n = R(await s.fetch(q(c, e.path ?? a))), e.headers && y(n.headers, e.headers);
        break;
      }
      case "static": {
        n = await s.fetch(q(c, a));
        break;
      }
      default:
        n = new Response("Not Found", { status: 404 });
    }
  } catch (d) {
    return console.error(d), new Response("Internal Server Error", { status: 500 });
  }
  return R(n);
}
__name(b, "b");
__name2(b, "b");
function B(e, t) {
  let s = "^//?(?:", r = ")/(.*)$";
  return !e.startsWith(s) || !e.endsWith(r) ? false : e.slice(s.length, -r.length).split("|").every((o) => t.has(o));
}
__name(B, "B");
__name2(B, "B");
_();
p();
u();
function de(e, { protocol: t, hostname: s, port: r, pathname: a }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(s).test(e.hostname) || r && !new RegExp(r).test(e.port) || a && !new RegExp(a).test(e.pathname));
}
__name(de, "de");
__name2(de, "de");
function le(e, t) {
  if (e.method !== "GET") return;
  let { origin: s, searchParams: r } = new URL(e.url), a = r.get("url"), o = Number.parseInt(r.get("w") ?? "", 10), n = Number.parseInt(r.get("q") ?? "75", 10);
  if (!a || Number.isNaN(o) || Number.isNaN(n) || !t?.sizes?.includes(o) || n < 0 || n > 100) return;
  let i = new URL(a, s);
  if (i.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let c = a.startsWith("//"), d = a.startsWith("/") && !c;
  if (!d && !t?.domains?.includes(i.hostname) && !t?.remotePatterns?.find((N) => de(i, N))) return;
  let l = e.headers.get("Accept") ?? "", g = t?.formats?.find((N) => l.includes(N))?.replace("image/", "");
  return { isRelative: d, imageUrl: i, options: { width: o, quality: n, format: g } };
}
__name(le, "le");
__name2(le, "le");
function he(e, t, s) {
  let r = new Headers();
  if (s?.contentSecurityPolicy && r.set("Content-Security-Policy", s.contentSecurityPolicy), s?.contentDispositionType) {
    let o = t.pathname.split("/").pop(), n = o ? `${s.contentDispositionType}; filename="${o}"` : s.contentDispositionType;
    r.set("Content-Disposition", n);
  }
  e.headers.has("Cache-Control") || r.set("Cache-Control", `public, max-age=${s?.minimumCacheTTL ?? 60}`);
  let a = R(e);
  return y(a.headers, r), a;
}
__name(he, "he");
__name2(he, "he");
async function z(e, { buildOutput: t, assetsFetcher: s, imagesConfig: r }) {
  let a = le(e, r);
  if (!a) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: o, imageUrl: n } = a, c = await (o && n.pathname in t ? s.fetch.bind(s) : fetch)(n);
  return he(c, n, r);
}
__name(z, "z");
__name2(z, "z");
_();
p();
u();
_();
p();
u();
_();
p();
u();
async function k(e) {
  return import(e);
}
__name(k, "k");
__name2(k, "k");
var xe = "x-vercel-cache-tags";
var me = "x-next-cache-soft-tags";
var ge = /* @__PURE__ */ Symbol.for("__cloudflare-request-context__");
async function J(e) {
  let t = `https://${v}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let s = new URL(e.url), r = await ye();
    if (s.pathname === "/v1/suspense-cache/revalidate") {
      let o = s.searchParams.get("tags")?.split(",") ?? [];
      for (let n of o) await r.revalidateTag(n);
      return new Response(null, { status: 200 });
    }
    let a = s.pathname.replace("/v1/suspense-cache/", "");
    if (!a.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let o = W(e, me), n = await r.get(a, { softTags: o });
        return n ? new Response(JSON.stringify(n.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (n.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let o = globalThis[ge], n = /* @__PURE__ */ __name2(async () => {
          let i = await e.json();
          i.data.tags === void 0 && (i.tags ??= W(e, xe) ?? []), await r.set(a, i);
        }, "n");
        return o ? o.ctx.waitUntil(n()) : await n(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (s) {
    return console.error(s), new Response("Error handling cache request", { status: 500 });
  }
}
__name(J, "J");
__name2(J, "J");
async function ye() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? K("kv") : K("cache-api");
}
__name(ye, "ye");
__name2(ye, "ye");
async function K(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, s = await k(t);
  return new s.default();
}
__name(K, "K");
__name2(K, "K");
function W(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(W, "W");
__name2(W, "W");
function X() {
  globalThis[Z] || (fe(), globalThis[Z] = true);
}
__name(X, "X");
__name2(X, "X");
function fe() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let s = new Request(...t), r = await Te(s);
    return r || (r = await J(s), r) ? r : (Ne(s), e(s));
  };
}
__name(fe, "fe");
__name2(fe, "fe");
async function Te(e) {
  if (e.url.startsWith("blob:")) try {
    let s = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, r = (await k(s)).default, a = { async arrayBuffer() {
      return r;
    }, get body() {
      return new ReadableStream({ start(o) {
        let n = Buffer.from(r);
        o.enqueue(n), o.close();
      } });
    }, async text() {
      return Buffer.from(r).toString();
    }, async json() {
      let o = Buffer.from(r);
      return JSON.stringify(o.toString());
    }, async blob() {
      return new Blob(r);
    } };
    return a.clone = () => ({ ...a }), a;
  } catch {
  }
  return null;
}
__name(Te, "Te");
__name2(Te, "Te");
function Ne(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(Ne, "Ne");
__name2(Ne, "Ne");
var Z = /* @__PURE__ */ Symbol.for("next-on-pages fetch patch");
_();
p();
u();
var Q = V(Y());
var E = class {
  static {
    __name(this, "E");
  }
  static {
    __name2(this, "E");
  }
  constructor(t, s, r, a, o) {
    this.routes = t;
    this.output = s;
    this.reqCtx = r;
    this.url = new URL(r.request.url), this.cookies = (0, Q.parse)(r.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), f(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = o?.find((n) => n.domain === this.url.hostname), this.locales = new Set(a.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: s, checkIntercept: r }) {
    let a = P(t.src, this.path, t.caseSensitive);
    if (!a.match || t.methods && !t.methods.map((n) => n.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let o = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((n) => {
      let i = M(n, o);
      return i.newRouteDest && (o.routeDest = i.newRouteDest), !i.valid;
    }) && !t.missing?.find((n) => M(n, o).valid) && !(s && t.status !== this.status)) {
      if (r && t.dest) {
        let n = /\/(\(\.+\))+/, i = n.test(t.dest), c = n.test(this.path);
        if (i && !c) return;
      }
      return { routeMatch: a, routeDest: o.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let s = "x-middleware-override-headers", r = t.headers.get(s);
    if (r) {
      let c = new Set(r.split(",").map((d) => d.trim()));
      for (let d of c.keys()) {
        let l = `x-middleware-request-${d}`, g = t.headers.get(l);
        this.reqCtx.request.headers.get(d) !== g && (g ? this.reqCtx.request.headers.set(d, g) : this.reqCtx.request.headers.delete(d)), t.headers.delete(l);
      }
      t.headers.delete(s);
    }
    let a = "x-middleware-rewrite", o = t.headers.get(a);
    if (o) {
      let c = new URL(o, this.url), d = this.url.hostname !== c.hostname;
      this.path = d ? `${c}` : c.pathname, f(this.searchParams, c.searchParams), t.headers.delete(a);
    }
    let n = "x-middleware-next";
    t.headers.get(n) ? t.headers.delete(n) : !o && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), y(this.reqCtx.request.headers, t.headers), y(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let s = t && this.output[t];
    if (!s || s.type !== "middleware") return this.status = 500, false;
    let r = await b(s, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), r.status === 500 ? (this.status = r.status, false) : (this.processMiddlewareResp(r), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, s, r) {
    !t.headers || (y(this.headers.normal, t.headers, { match: s, captureGroupKeys: r }), t.important && y(this.headers.important, t.headers, { match: s, captureGroupKeys: r }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, s, r) {
    if (!t.dest) return this.path;
    let a = this.path, o = t.dest;
    this.wildcardMatch && /\$wildcard/.test(o) && (o = o.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = j(o, s, r);
    let n = /\/index\.rsc$/i.test(this.path), i = /^\/(?:index)?$/i.test(a), c = /^\/__index\.prefetch\.rsc$/i.test(a);
    n && !i && !c && (this.path = a);
    let d = /\.rsc$/i.test(this.path), l = /\.prefetch\.rsc$/i.test(this.path), g = this.path in this.output;
    d && !l && !g && (this.path = this.path.replace(/\.rsc/i, ""));
    let N = new URL(this.path, this.url);
    return f(this.searchParams, N.searchParams), w(this.path) || (this.path = N.pathname), a;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: r, cookie: a } } = t, o = a && this.cookies[a], n = I(o ?? ""), i = I(this.reqCtx.request.headers.get("accept-language") ?? ""), l = [...n, ...i].map((g) => r[g]).filter(Boolean)[0];
    if (l) {
      !this.path.startsWith(l) && (this.headers.normal.set("location", l), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, s) {
    return !this.locales || s !== "miss" ? t : B(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, s) {
    let r = this.getLocaleFriendlyRoute(s, t), { routeMatch: a, routeDest: o } = this.checkRouteMatch(r, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, n = { ...r, dest: o };
    if (!a?.match || n.middlewarePath && this.middlewareInvoked.includes(n.middlewarePath)) return "skip";
    let { match: i, captureGroupKeys: c } = a;
    if (this.applyRouteOverrides(n), this.applyLocaleRedirects(n), !await this.runRouteMiddleware(n.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(n, i, c), this.applyRouteStatus(n);
    let l = this.applyRouteDest(n, i, c);
    if (n.check && !w(this.path)) if (l === this.path) {
      if (t !== "miss") return this.checkPhase(L(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !n.continue || n.status && n.status >= 300 && n.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let s = true;
    for (let o of this.routes[t]) {
      let n = await this.checkRoute(t, o);
      if (n === "error") return "error";
      if (n === "done") {
        s = false;
        break;
      }
    }
    if (t === "hit" || w(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let o of this.locales) {
      let n = new RegExp(`/${o}(/.*)`), c = this.path.match(n)?.[1];
      if (c && c in this.output) {
        this.path = c;
        break;
      }
    }
    let r = this.path in this.output;
    if (!r && this.path.endsWith("/")) {
      let o = this.path.replace(/\/$/, "");
      r = o in this.output, r && (this.path = o);
    }
    if (t === "miss" && !r) {
      let o = !this.status || this.status < 400;
      this.status = o ? 404 : this.status;
    }
    let a = "miss";
    return r || t === "miss" || t === "error" ? a = "hit" : s && (a = L(t)), this.checkPhase(a);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let s = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), s;
  }
};
async function ee(e, t, s, r) {
  let a = new E(t.routes, s, e, r, t.wildcard), o = await te(a);
  return Se(e, o, s);
}
__name(ee, "ee");
__name2(ee, "ee");
async function te(e, t = "none", s = false) {
  return await e.run(t) === "error" || !s && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
__name2(te, "te");
async function Se(e, { path: t = "/404", status: s, headers: r, searchParams: a, body: o }, n) {
  let i = r.normal.get("location");
  if (i) {
    if (i !== r.middlewareLocation) {
      let l = [...a.keys()].length ? `?${a.toString()}` : "";
      r.normal.set("location", `${i ?? "/"}${l}`);
    }
    return new Response(null, { status: s, headers: r.normal });
  }
  let c;
  if (o !== void 0) c = new Response(o, { status: s });
  else if (w(t)) {
    let l = new URL(t);
    f(l.searchParams, a), c = await fetch(l, e.request);
  } else c = await b(n[t], e, { path: t, status: s, headers: r, searchParams: a });
  let d = r.normal;
  return y(d, c.headers), y(d, r.important), c = new Response(c.body, { ...c, status: s || c.status, headers: d }), c;
}
__name(Se, "Se");
__name2(Se, "Se");
_();
p();
u();
function re() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ee };
}
__name(re, "re");
__name2(re, "re");
function Ee(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let s = Ce();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, s), s;
}
__name(Ee, "Ee");
__name2(Ee, "Ee");
function Ce() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name2((t, s) => e.has(s) ? e.get(s) : Reflect.get(globalThis, s), "get"), set: /* @__PURE__ */ __name2((t, s, r) => Ae.has(s) ? Reflect.set(globalThis, s, r) : (e.set(s, r), true), "set") });
}
__name(Ce, "Ce");
__name2(Ce, "Ce");
var Ae = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Me = Object.defineProperty;
var qe = /* @__PURE__ */ __name2((...e) => {
  let t = e[0], s = e[1], r = "__import_unsupported";
  if (!(s === r && typeof t == "object" && t !== null && r in t)) return Me(...e);
}, "qe");
globalThis.Object.defineProperty = qe;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name2(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name2(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var Rr = { async fetch(e, t, s) {
  re(), X();
  let r = await __ALSes_PROMISE__;
  if (!r) {
    let n = new URL(e.url), i = await t.ASSETS.fetch(`${n.protocol}//${n.host}/cdn-cgi/errors/no-nodejs_compat.html`), c = i.ok ? i.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(c, { status: 503 });
  }
  let { envAsyncLocalStorage: a, requestContextAsyncLocalStorage: o } = r;
  return a.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: v }, async () => o.run({ env: t, ctx: s, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return z(e, { buildOutput: x, assetsFetcher: t.ASSETS, imagesConfig: h.images });
    let i = D(e);
    return ee({ request: i, ctx: s, assetsFetcher: t.ASSETS }, h, x, m);
  }));
} };

// node_modules/wrangler/templates/pages-dev-util.ts
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-XKmWJs/upd0onnwon.js
var define_ROUTES_default = { version: 1, description: "Built with @cloudflare/next-on-pages@1.13.16.", include: ["/*"], exclude: ["/_next/static/*"] };
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = Rr;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-ay2izr/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_dev_pipeline_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-ay2izr/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=upd0onnwon.js.map
