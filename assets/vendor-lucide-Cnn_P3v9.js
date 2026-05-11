var Mt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function nt(u){return u&&u.__esModule&&Object.prototype.hasOwnProperty.call(u,"default")?u.default:u}function At(u){if(Object.prototype.hasOwnProperty.call(u,"__esModule"))return u;var f=u.default;if(typeof f=="function"){var p=function l(){return this instanceof l?Reflect.construct(f,arguments,this.constructor):f.apply(this,arguments)};p.prototype=f.prototype}else p={};return Object.defineProperty(p,"__esModule",{value:!0}),Object.keys(u).forEach(function(l){var h=Object.getOwnPropertyDescriptor(u,l);Object.defineProperty(p,l,h.get?h:{enumerable:!0,get:function(){return u[l]}})}),p}var Y={exports:{}},n={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var G;function rt(){if(G)return n;G=1;var u=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),h=Symbol.for("react.profiler"),m=Symbol.for("react.consumer"),b=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),C=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),w=Symbol.iterator;function $(t){return t===null||typeof t!="object"?null:(t=w&&t[w]||t["@@iterator"],typeof t=="function"?t:null)}var T={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,A={};function v(t,e,o){this.props=t,this.context=e,this.refs=A,this.updater=o||T}v.prototype.isReactComponent={},v.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")},v.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function z(){}z.prototype=v.prototype;function N(t,e,o){this.props=t,this.context=e,this.refs=A,this.updater=o||T}var O=N.prototype=new z;O.constructor=N,M(O,v.prototype),O.isPureReactComponent=!0;var U=Array.isArray;function P(){}var i={H:null,A:null,T:null,S:null},D=Object.prototype.hasOwnProperty;function H(t,e,o){var r=o.ref;return{$$typeof:u,type:t,key:e,ref:r!==void 0?r:null,props:o}}function Q(t,e){return H(t.type,e,t.props)}function L(t){return typeof t=="object"&&t!==null&&t.$$typeof===u}function V(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(o){return e[o]})}var W=/\/+/g;function I(t,e){return typeof t=="object"&&t!==null&&t.key!=null?V(""+t.key):e.toString(36)}function J(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(P,P):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function k(t,e,o,r,s){var c=typeof t;(c==="undefined"||c==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(c){case"bigint":case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case u:case f:a=!0;break;case g:return a=t._init,k(a(t._payload),e,o,r,s)}}if(a)return s=s(t),a=r===""?"."+I(t,0):r,U(s)?(o="",a!=null&&(o=a.replace(W,"$&/")+"/"),k(s,e,o,"",function(et){return et})):s!=null&&(L(s)&&(s=Q(s,o+(s.key==null||t&&t.key===s.key?"":(""+s.key).replace(W,"$&/")+"/")+a)),e.push(s)),1;a=0;var _=r===""?".":r+":";if(U(t))for(var d=0;d<t.length;d++)r=t[d],c=_+I(r,d),a+=k(r,e,o,c,s);else if(d=$(t),typeof d=="function")for(t=d.call(t),d=0;!(r=t.next()).done;)r=r.value,c=_+I(r,d++),a+=k(r,e,o,c,s);else if(c==="object"){if(typeof t.then=="function")return k(J(t),e,o,r,s);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return a}function j(t,e,o){if(t==null)return t;var r=[],s=0;return k(t,r,"","",function(c){return e.call(o,c,s++)}),r}function F(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(o){(t._status===0||t._status===-1)&&(t._status=1,t._result=o)},function(o){(t._status===0||t._status===-1)&&(t._status=2,t._result=o)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var B=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},tt={map:j,forEach:function(t,e,o){j(t,function(){e.apply(this,arguments)},o)},count:function(t){var e=0;return j(t,function(){e++}),e},toArray:function(t){return j(t,function(e){return e})||[]},only:function(t){if(!L(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};return n.Activity=x,n.Children=tt,n.Component=v,n.Fragment=p,n.Profiler=h,n.PureComponent=N,n.StrictMode=l,n.Suspense=S,n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,n.__COMPILER_RUNTIME={__proto__:null,c:function(t){return i.H.useMemoCache(t)}},n.cache=function(t){return function(){return t.apply(null,arguments)}},n.cacheSignal=function(){return null},n.cloneElement=function(t,e,o){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var r=M({},t.props),s=t.key;if(e!=null)for(c in e.key!==void 0&&(s=""+e.key),e)!D.call(e,c)||c==="key"||c==="__self"||c==="__source"||c==="ref"&&e.ref===void 0||(r[c]=e[c]);var c=arguments.length-2;if(c===1)r.children=o;else if(1<c){for(var a=Array(c),_=0;_<c;_++)a[_]=arguments[_+2];r.children=a}return H(t.type,s,r)},n.createContext=function(t){return t={$$typeof:b,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:m,_context:t},t},n.createElement=function(t,e,o){var r,s={},c=null;if(e!=null)for(r in e.key!==void 0&&(c=""+e.key),e)D.call(e,r)&&r!=="key"&&r!=="__self"&&r!=="__source"&&(s[r]=e[r]);var a=arguments.length-2;if(a===1)s.children=o;else if(1<a){for(var _=Array(a),d=0;d<a;d++)_[d]=arguments[d+2];s.children=_}if(t&&t.defaultProps)for(r in a=t.defaultProps,a)s[r]===void 0&&(s[r]=a[r]);return H(t,c,s)},n.createRef=function(){return{current:null}},n.forwardRef=function(t){return{$$typeof:R,render:t}},n.isValidElement=L,n.lazy=function(t){return{$$typeof:g,_payload:{_status:-1,_result:t},_init:F}},n.memo=function(t,e){return{$$typeof:C,type:t,compare:e===void 0?null:e}},n.startTransition=function(t){var e=i.T,o={};i.T=o;try{var r=t(),s=i.S;s!==null&&s(o,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&r.then(P,B)}catch(c){B(c)}finally{e!==null&&o.types!==null&&(e.types=o.types),i.T=e}},n.unstable_useCacheRefresh=function(){return i.H.useCacheRefresh()},n.use=function(t){return i.H.use(t)},n.useActionState=function(t,e,o){return i.H.useActionState(t,e,o)},n.useCallback=function(t,e){return i.H.useCallback(t,e)},n.useContext=function(t){return i.H.useContext(t)},n.useDebugValue=function(){},n.useDeferredValue=function(t,e){return i.H.useDeferredValue(t,e)},n.useEffect=function(t,e){return i.H.useEffect(t,e)},n.useEffectEvent=function(t){return i.H.useEffectEvent(t)},n.useId=function(){return i.H.useId()},n.useImperativeHandle=function(t,e,o){return i.H.useImperativeHandle(t,e,o)},n.useInsertionEffect=function(t,e){return i.H.useInsertionEffect(t,e)},n.useLayoutEffect=function(t,e){return i.H.useLayoutEffect(t,e)},n.useMemo=function(t,e){return i.H.useMemo(t,e)},n.useOptimistic=function(t,e){return i.H.useOptimistic(t,e)},n.useReducer=function(t,e,o){return i.H.useReducer(t,e,o)},n.useRef=function(t){return i.H.useRef(t)},n.useState=function(t){return i.H.useState(t)},n.useSyncExternalStore=function(t,e,o){return i.H.useSyncExternalStore(t,e,o)},n.useTransition=function(){return i.H.useTransition()},n.version="19.2.6",n}var K;function ot(){return K||(K=1,Y.exports=rt()),Y.exports}var E=ot();const jt=nt(E);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=(...u)=>u.filter((f,p,l)=>!!f&&f.trim()!==""&&l.indexOf(f)===p).join(" ").trim();/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=u=>u.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=u=>u.replace(/^([A-Z])|[\s-_]+(\w)/g,(f,p,l)=>l?l.toUpperCase():p.toLowerCase());/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=u=>{const f=st(u);return f.charAt(0).toUpperCase()+f.slice(1)};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var q={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=u=>{for(const f in u)if(f.startsWith("aria-")||f==="role"||f==="title")return!0;return!1},it=E.createContext({}),at=()=>E.useContext(it),ft=E.forwardRef(({color:u,size:f,strokeWidth:p,absoluteStrokeWidth:l,className:h="",children:m,iconNode:b,...R},S)=>{const{size:C=24,strokeWidth:g=2,absoluteStrokeWidth:x=!1,color:w="currentColor",className:$=""}=at()??{},T=l??x?Number(p??g)*24/Number(f??C):p??g;return E.createElement("svg",{ref:S,...q,width:f??C??q.width,height:f??C??q.height,stroke:u??w,strokeWidth:T,className:X("lucide",$,h),...!m&&!ct(R)&&{"aria-hidden":"true"},...R},[...b.map(([M,A])=>E.createElement(M,A)),...Array.isArray(m)?m:[m]])});/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(u,f)=>{const p=E.forwardRef(({className:l,...h},m)=>E.createElement(ft,{ref:m,iconNode:f,className:X(`lucide-${ut(Z(u))}`,`lucide-${u}`,l),...h}));return p.displayName=Z(u),p};/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],bt=y("arrow-right",pt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],St=y("book-open",lt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],xt=y("briefcase",yt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],$t=y("check",dt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],Nt=y("clock",_t);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]],Ot=y("git-branch",ht);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Pt=y("globe",mt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],Ht=y("graduation-cap",Et);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],Lt=y("mail",vt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],It=y("map-pin",kt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],Yt=y("menu",Ct);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],qt=y("moon",gt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],zt=y("star",Rt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],Ut=y("sun",wt);/**
 * @license lucide-react v1.14.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Dt=y("x",Tt);export{bt as A,xt as B,Nt as C,Ht as G,qt as M,jt as R,Ut as S,Dt as X,E as a,At as b,Mt as c,Yt as d,It as e,$t as f,nt as g,St as h,zt as i,Lt as j,Pt as k,Ot as l,ot as r};
