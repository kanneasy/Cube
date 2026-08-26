(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();var lh={exports:{}},xl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sv;function v1(){if(sv)return xl;sv=1;var a=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(r,o,c){var f=null;if(c!==void 0&&(f=""+c),o.key!==void 0&&(f=""+o.key),"key"in o){c={};for(var h in o)h!=="key"&&(c[h]=o[h])}else c=o;return o=c.ref,{$$typeof:a,type:r,key:f,ref:o!==void 0?o:null,props:c}}return xl.Fragment=e,xl.jsx=n,xl.jsxs=n,xl}var ov;function _1(){return ov||(ov=1,lh.exports=v1()),lh.exports}var he=_1(),ch={exports:{}},lt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lv;function S1(){if(lv)return lt;lv=1;var a=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),v=Symbol.iterator;function y(U){return U===null||typeof U!="object"?null:(U=v&&U[v]||U["@@iterator"],typeof U=="function"?U:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,b={};function S(U,K,ye){this.props=U,this.context=K,this.refs=b,this.updater=ye||M}S.prototype.isReactComponent={},S.prototype.setState=function(U,K){if(typeof U!="object"&&typeof U!="function"&&U!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,U,K,"setState")},S.prototype.forceUpdate=function(U){this.updater.enqueueForceUpdate(this,U,"forceUpdate")};function z(){}z.prototype=S.prototype;function N(U,K,ye){this.props=U,this.context=K,this.refs=b,this.updater=ye||M}var D=N.prototype=new z;D.constructor=N,A(D,S.prototype),D.isPureReactComponent=!0;var G=Array.isArray;function L(){}var F={H:null,A:null,T:null,S:null},Z=Object.prototype.hasOwnProperty;function C(U,K,ye){var Ae=ye.ref;return{$$typeof:a,type:U,key:K,ref:Ae!==void 0?Ae:null,props:ye}}function w(U,K){return C(U.type,K,U.props)}function k(U){return typeof U=="object"&&U!==null&&U.$$typeof===a}function ne(U){var K={"=":"=0",":":"=2"};return"$"+U.replace(/[=:]/g,function(ye){return K[ye]})}var le=/\/+/g;function fe(U,K){return typeof U=="object"&&U!==null&&U.key!=null?ne(""+U.key):K.toString(36)}function pe(U){switch(U.status){case"fulfilled":return U.value;case"rejected":throw U.reason;default:switch(typeof U.status=="string"?U.then(L,L):(U.status="pending",U.then(function(K){U.status==="pending"&&(U.status="fulfilled",U.value=K)},function(K){U.status==="pending"&&(U.status="rejected",U.reason=K)})),U.status){case"fulfilled":return U.value;case"rejected":throw U.reason}}throw U}function P(U,K,ye,Ae,Fe){var ie=typeof U;(ie==="undefined"||ie==="boolean")&&(U=null);var ce=!1;if(U===null)ce=!0;else switch(ie){case"bigint":case"string":case"number":ce=!0;break;case"object":switch(U.$$typeof){case a:case e:ce=!0;break;case x:return ce=U._init,P(ce(U._payload),K,ye,Ae,Fe)}}if(ce)return Fe=Fe(U),ce=Ae===""?"."+fe(U,0):Ae,G(Fe)?(ye="",ce!=null&&(ye=ce.replace(le,"$&/")+"/"),P(Fe,K,ye,"",function(We){return We})):Fe!=null&&(k(Fe)&&(Fe=w(Fe,ye+(Fe.key==null||U&&U.key===Fe.key?"":(""+Fe.key).replace(le,"$&/")+"/")+ce)),K.push(Fe)),1;ce=0;var we=Ae===""?".":Ae+":";if(G(U))for(var He=0;He<U.length;He++)Ae=U[He],ie=we+fe(Ae,He),ce+=P(Ae,K,ye,ie,Fe);else if(He=y(U),typeof He=="function")for(U=He.call(U),He=0;!(Ae=U.next()).done;)Ae=Ae.value,ie=we+fe(Ae,He++),ce+=P(Ae,K,ye,ie,Fe);else if(ie==="object"){if(typeof U.then=="function")return P(pe(U),K,ye,Ae,Fe);throw K=String(U),Error("Objects are not valid as a React child (found: "+(K==="[object Object]"?"object with keys {"+Object.keys(U).join(", ")+"}":K)+"). If you meant to render a collection of children, use an array instead.")}return ce}function te(U,K,ye){if(U==null)return U;var Ae=[],Fe=0;return P(U,Ae,"","",function(ie){return K.call(ye,ie,Fe++)}),Ae}function j(U){if(U._status===-1){var K=U._result;K=K(),K.then(function(ye){(U._status===0||U._status===-1)&&(U._status=1,U._result=ye)},function(ye){(U._status===0||U._status===-1)&&(U._status=2,U._result=ye)}),U._status===-1&&(U._status=0,U._result=K)}if(U._status===1)return U._result.default;throw U._result}var ve=typeof reportError=="function"?reportError:function(U){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var K=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof U=="object"&&U!==null&&typeof U.message=="string"?String(U.message):String(U),error:U});if(!window.dispatchEvent(K))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",U);return}console.error(U)},Se={map:te,forEach:function(U,K,ye){te(U,function(){K.apply(this,arguments)},ye)},count:function(U){var K=0;return te(U,function(){K++}),K},toArray:function(U){return te(U,function(K){return K})||[]},only:function(U){if(!k(U))throw Error("React.Children.only expected to receive a single React element child.");return U}};return lt.Activity=g,lt.Children=Se,lt.Component=S,lt.Fragment=n,lt.Profiler=o,lt.PureComponent=N,lt.StrictMode=r,lt.Suspense=m,lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=F,lt.__COMPILER_RUNTIME={__proto__:null,c:function(U){return F.H.useMemoCache(U)}},lt.cache=function(U){return function(){return U.apply(null,arguments)}},lt.cacheSignal=function(){return null},lt.cloneElement=function(U,K,ye){if(U==null)throw Error("The argument must be a React element, but you passed "+U+".");var Ae=A({},U.props),Fe=U.key;if(K!=null)for(ie in K.key!==void 0&&(Fe=""+K.key),K)!Z.call(K,ie)||ie==="key"||ie==="__self"||ie==="__source"||ie==="ref"&&K.ref===void 0||(Ae[ie]=K[ie]);var ie=arguments.length-2;if(ie===1)Ae.children=ye;else if(1<ie){for(var ce=Array(ie),we=0;we<ie;we++)ce[we]=arguments[we+2];Ae.children=ce}return C(U.type,Fe,Ae)},lt.createContext=function(U){return U={$$typeof:f,_currentValue:U,_currentValue2:U,_threadCount:0,Provider:null,Consumer:null},U.Provider=U,U.Consumer={$$typeof:c,_context:U},U},lt.createElement=function(U,K,ye){var Ae,Fe={},ie=null;if(K!=null)for(Ae in K.key!==void 0&&(ie=""+K.key),K)Z.call(K,Ae)&&Ae!=="key"&&Ae!=="__self"&&Ae!=="__source"&&(Fe[Ae]=K[Ae]);var ce=arguments.length-2;if(ce===1)Fe.children=ye;else if(1<ce){for(var we=Array(ce),He=0;He<ce;He++)we[He]=arguments[He+2];Fe.children=we}if(U&&U.defaultProps)for(Ae in ce=U.defaultProps,ce)Fe[Ae]===void 0&&(Fe[Ae]=ce[Ae]);return C(U,ie,Fe)},lt.createRef=function(){return{current:null}},lt.forwardRef=function(U){return{$$typeof:h,render:U}},lt.isValidElement=k,lt.lazy=function(U){return{$$typeof:x,_payload:{_status:-1,_result:U},_init:j}},lt.memo=function(U,K){return{$$typeof:p,type:U,compare:K===void 0?null:K}},lt.startTransition=function(U){var K=F.T,ye={};F.T=ye;try{var Ae=U(),Fe=F.S;Fe!==null&&Fe(ye,Ae),typeof Ae=="object"&&Ae!==null&&typeof Ae.then=="function"&&Ae.then(L,ve)}catch(ie){ve(ie)}finally{K!==null&&ye.types!==null&&(K.types=ye.types),F.T=K}},lt.unstable_useCacheRefresh=function(){return F.H.useCacheRefresh()},lt.use=function(U){return F.H.use(U)},lt.useActionState=function(U,K,ye){return F.H.useActionState(U,K,ye)},lt.useCallback=function(U,K){return F.H.useCallback(U,K)},lt.useContext=function(U){return F.H.useContext(U)},lt.useDebugValue=function(){},lt.useDeferredValue=function(U,K){return F.H.useDeferredValue(U,K)},lt.useEffect=function(U,K){return F.H.useEffect(U,K)},lt.useEffectEvent=function(U){return F.H.useEffectEvent(U)},lt.useId=function(){return F.H.useId()},lt.useImperativeHandle=function(U,K,ye){return F.H.useImperativeHandle(U,K,ye)},lt.useInsertionEffect=function(U,K){return F.H.useInsertionEffect(U,K)},lt.useLayoutEffect=function(U,K){return F.H.useLayoutEffect(U,K)},lt.useMemo=function(U,K){return F.H.useMemo(U,K)},lt.useOptimistic=function(U,K){return F.H.useOptimistic(U,K)},lt.useReducer=function(U,K,ye){return F.H.useReducer(U,K,ye)},lt.useRef=function(U){return F.H.useRef(U)},lt.useState=function(U){return F.H.useState(U)},lt.useSyncExternalStore=function(U,K,ye){return F.H.useSyncExternalStore(U,K,ye)},lt.useTransition=function(){return F.H.useTransition()},lt.version="19.2.8",lt}var cv;function Zp(){return cv||(cv=1,ch.exports=S1()),ch.exports}var $e=Zp(),uh={exports:{}},gl={},fh={exports:{}},dh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uv;function y1(){return uv||(uv=1,(function(a){function e(P,te){var j=P.length;P.push(te);e:for(;0<j;){var ve=j-1>>>1,Se=P[ve];if(0<o(Se,te))P[ve]=te,P[j]=Se,j=ve;else break e}}function n(P){return P.length===0?null:P[0]}function r(P){if(P.length===0)return null;var te=P[0],j=P.pop();if(j!==te){P[0]=j;e:for(var ve=0,Se=P.length,U=Se>>>1;ve<U;){var K=2*(ve+1)-1,ye=P[K],Ae=K+1,Fe=P[Ae];if(0>o(ye,j))Ae<Se&&0>o(Fe,ye)?(P[ve]=Fe,P[Ae]=j,ve=Ae):(P[ve]=ye,P[K]=j,ve=K);else if(Ae<Se&&0>o(Fe,j))P[ve]=Fe,P[Ae]=j,ve=Ae;else break e}}return te}function o(P,te){var j=P.sortIndex-te.sortIndex;return j!==0?j:P.id-te.id}if(a.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;a.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();a.unstable_now=function(){return f.now()-h}}var m=[],p=[],x=1,g=null,v=3,y=!1,M=!1,A=!1,b=!1,S=typeof setTimeout=="function"?setTimeout:null,z=typeof clearTimeout=="function"?clearTimeout:null,N=typeof setImmediate<"u"?setImmediate:null;function D(P){for(var te=n(p);te!==null;){if(te.callback===null)r(p);else if(te.startTime<=P)r(p),te.sortIndex=te.expirationTime,e(m,te);else break;te=n(p)}}function G(P){if(A=!1,D(P),!M)if(n(m)!==null)M=!0,L||(L=!0,ne());else{var te=n(p);te!==null&&pe(G,te.startTime-P)}}var L=!1,F=-1,Z=5,C=-1;function w(){return b?!0:!(a.unstable_now()-C<Z)}function k(){if(b=!1,L){var P=a.unstable_now();C=P;var te=!0;try{e:{M=!1,A&&(A=!1,z(F),F=-1),y=!0;var j=v;try{t:{for(D(P),g=n(m);g!==null&&!(g.expirationTime>P&&w());){var ve=g.callback;if(typeof ve=="function"){g.callback=null,v=g.priorityLevel;var Se=ve(g.expirationTime<=P);if(P=a.unstable_now(),typeof Se=="function"){g.callback=Se,D(P),te=!0;break t}g===n(m)&&r(m),D(P)}else r(m);g=n(m)}if(g!==null)te=!0;else{var U=n(p);U!==null&&pe(G,U.startTime-P),te=!1}}break e}finally{g=null,v=j,y=!1}te=void 0}}finally{te?ne():L=!1}}}var ne;if(typeof N=="function")ne=function(){N(k)};else if(typeof MessageChannel<"u"){var le=new MessageChannel,fe=le.port2;le.port1.onmessage=k,ne=function(){fe.postMessage(null)}}else ne=function(){S(k,0)};function pe(P,te){F=S(function(){P(a.unstable_now())},te)}a.unstable_IdlePriority=5,a.unstable_ImmediatePriority=1,a.unstable_LowPriority=4,a.unstable_NormalPriority=3,a.unstable_Profiling=null,a.unstable_UserBlockingPriority=2,a.unstable_cancelCallback=function(P){P.callback=null},a.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Z=0<P?Math.floor(1e3/P):5},a.unstable_getCurrentPriorityLevel=function(){return v},a.unstable_next=function(P){switch(v){case 1:case 2:case 3:var te=3;break;default:te=v}var j=v;v=te;try{return P()}finally{v=j}},a.unstable_requestPaint=function(){b=!0},a.unstable_runWithPriority=function(P,te){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var j=v;v=P;try{return te()}finally{v=j}},a.unstable_scheduleCallback=function(P,te,j){var ve=a.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?ve+j:ve):j=ve,P){case 1:var Se=-1;break;case 2:Se=250;break;case 5:Se=1073741823;break;case 4:Se=1e4;break;default:Se=5e3}return Se=j+Se,P={id:x++,callback:te,priorityLevel:P,startTime:j,expirationTime:Se,sortIndex:-1},j>ve?(P.sortIndex=j,e(p,P),n(m)===null&&P===n(p)&&(A?(z(F),F=-1):A=!0,pe(G,j-ve))):(P.sortIndex=Se,e(m,P),M||y||(M=!0,L||(L=!0,ne()))),P},a.unstable_shouldYield=w,a.unstable_wrapCallback=function(P){var te=v;return function(){var j=v;v=te;try{return P.apply(this,arguments)}finally{v=j}}}})(dh)),dh}var fv;function b1(){return fv||(fv=1,fh.exports=y1()),fh.exports}var hh={exports:{}},Fn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dv;function M1(){if(dv)return Fn;dv=1;var a=Zp();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)p+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var r={d:{f:n,r:function(){throw Error(e(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},o=Symbol.for("react.portal");function c(m,p,x){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:o,key:g==null?null:""+g,children:m,containerInfo:p,implementation:x}}var f=a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,Fn.createPortal=function(m,p){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,x)},Fn.flushSync=function(m){var p=f.T,x=r.p;try{if(f.T=null,r.p=2,m)return m()}finally{f.T=p,r.p=x,r.d.f()}},Fn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,r.d.C(m,p))},Fn.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},Fn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var x=p.as,g=h(x,p.crossOrigin),v=typeof p.integrity=="string"?p.integrity:void 0,y=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;x==="style"?r.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:g,integrity:v,fetchPriority:y}):x==="script"&&r.d.X(m,{crossOrigin:g,integrity:v,fetchPriority:y,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Fn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var x=h(p.as,p.crossOrigin);r.d.M(m,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&r.d.M(m)},Fn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var x=p.as,g=h(x,p.crossOrigin);r.d.L(m,x,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Fn.preloadModule=function(m,p){if(typeof m=="string")if(p){var x=h(p.as,p.crossOrigin);r.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else r.d.m(m)},Fn.requestFormReset=function(m){r.d.r(m)},Fn.unstable_batchedUpdates=function(m,p){return m(p)},Fn.useFormState=function(m,p,x){return f.H.useFormState(m,p,x)},Fn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Fn.version="19.2.8",Fn}var hv;function E1(){if(hv)return hh.exports;hv=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(e){console.error(e)}}return a(),hh.exports=M1(),hh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pv;function T1(){if(pv)return gl;pv=1;var a=b1(),e=Zp(),n=E1();function r(t){var i="https://react.dev/errors/"+t;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var i=t,s=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(s=i.return),t=i.return;while(t)}return i.tag===3?s:null}function f(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function h(t){if(t.tag===31){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(r(188))}function p(t){var i=t.alternate;if(!i){if(i=c(t),i===null)throw Error(r(188));return i!==t?null:t}for(var s=t,l=i;;){var u=s.return;if(u===null)break;var d=u.alternate;if(d===null){if(l=u.return,l!==null){s=l;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===s)return m(u),t;if(d===l)return m(u),i;d=d.sibling}throw Error(r(188))}if(s.return!==l.return)s=u,l=d;else{for(var _=!1,T=u.child;T;){if(T===s){_=!0,s=u,l=d;break}if(T===l){_=!0,l=u,s=d;break}T=T.sibling}if(!_){for(T=d.child;T;){if(T===s){_=!0,s=d,l=u;break}if(T===l){_=!0,l=d,s=u;break}T=T.sibling}if(!_)throw Error(r(189))}}if(s.alternate!==l)throw Error(r(190))}if(s.tag!==3)throw Error(r(188));return s.stateNode.current===s?t:i}function x(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t;for(t=t.child;t!==null;){if(i=x(t),i!==null)return i;t=t.sibling}return null}var g=Object.assign,v=Symbol.for("react.element"),y=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),b=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),z=Symbol.for("react.consumer"),N=Symbol.for("react.context"),D=Symbol.for("react.forward_ref"),G=Symbol.for("react.suspense"),L=Symbol.for("react.suspense_list"),F=Symbol.for("react.memo"),Z=Symbol.for("react.lazy"),C=Symbol.for("react.activity"),w=Symbol.for("react.memo_cache_sentinel"),k=Symbol.iterator;function ne(t){return t===null||typeof t!="object"?null:(t=k&&t[k]||t["@@iterator"],typeof t=="function"?t:null)}var le=Symbol.for("react.client.reference");function fe(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===le?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case A:return"Fragment";case S:return"Profiler";case b:return"StrictMode";case G:return"Suspense";case L:return"SuspenseList";case C:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case M:return"Portal";case N:return t.displayName||"Context";case z:return(t._context.displayName||"Context")+".Consumer";case D:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case F:return i=t.displayName||null,i!==null?i:fe(t.type)||"Memo";case Z:i=t._payload,t=t._init;try{return fe(t(i))}catch{}}return null}var pe=Array.isArray,P=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,te=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j={pending:!1,data:null,method:null,action:null},ve=[],Se=-1;function U(t){return{current:t}}function K(t){0>Se||(t.current=ve[Se],ve[Se]=null,Se--)}function ye(t,i){Se++,ve[Se]=t.current,t.current=i}var Ae=U(null),Fe=U(null),ie=U(null),ce=U(null);function we(t,i){switch(ye(ie,i),ye(Fe,t),ye(Ae,null),i.nodeType){case 9:case 11:t=(t=i.documentElement)&&(t=t.namespaceURI)?Cg(t):0;break;default:if(t=i.tagName,i=i.namespaceURI)i=Cg(i),t=Dg(i,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}K(Ae),ye(Ae,t)}function He(){K(Ae),K(Fe),K(ie)}function We(t){t.memoizedState!==null&&ye(ce,t);var i=Ae.current,s=Dg(i,t.type);i!==s&&(ye(Fe,t),ye(Ae,s))}function ft(t){Fe.current===t&&(K(Ae),K(Fe)),ce.current===t&&(K(ce),dl._currentValue=j)}var an,mt;function wt(t){if(an===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);an=i&&i[1]||"",mt=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+an+t+mt}var I=!1;function xt(t,i){if(!t||I)return"";I=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(i){var ge=function(){throw Error()};if(Object.defineProperty(ge.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ge,[])}catch(oe){var ae=oe}Reflect.construct(t,[],ge)}else{try{ge.call()}catch(oe){ae=oe}t.call(ge.prototype)}}else{try{throw Error()}catch(oe){ae=oe}(ge=t())&&typeof ge.catch=="function"&&ge.catch(function(){})}}catch(oe){if(oe&&ae&&typeof oe.stack=="string")return[oe.stack,ae.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=l.DetermineComponentFrameRoot(),_=d[0],T=d[1];if(_&&T){var B=_.split(`
`),$=T.split(`
`);for(u=l=0;l<B.length&&!B[l].includes("DetermineComponentFrameRoot");)l++;for(;u<$.length&&!$[u].includes("DetermineComponentFrameRoot");)u++;if(l===B.length||u===$.length)for(l=B.length-1,u=$.length-1;1<=l&&0<=u&&B[l]!==$[u];)u--;for(;1<=l&&0<=u;l--,u--)if(B[l]!==$[u]){if(l!==1||u!==1)do if(l--,u--,0>u||B[l]!==$[u]){var de=`
`+B[l].replace(" at new "," at ");return t.displayName&&de.includes("<anonymous>")&&(de=de.replace("<anonymous>",t.displayName)),de}while(1<=l&&0<=u);break}}}finally{I=!1,Error.prepareStackTrace=s}return(s=t?t.displayName||t.name:"")?wt(s):""}function vt(t,i){switch(t.tag){case 26:case 27:case 5:return wt(t.type);case 16:return wt("Lazy");case 13:return t.child!==i&&i!==null?wt("Suspense Fallback"):wt("Suspense");case 19:return wt("SuspenseList");case 0:case 15:return xt(t.type,!1);case 11:return xt(t.type.render,!1);case 1:return xt(t.type,!0);case 31:return wt("Activity");default:return""}}function Bt(t){try{var i="",s=null;do i+=vt(t,s),s=t,t=t.return;while(t);return i}catch(l){return`
Error generating stack: `+l.message+`
`+l.stack}}var Ve=Object.prototype.hasOwnProperty,qt=a.unstable_scheduleCallback,Ze=a.unstable_cancelCallback,ot=a.unstable_shouldYield,O=a.unstable_requestPaint,E=a.unstable_now,J=a.unstable_getCurrentPriorityLevel,xe=a.unstable_ImmediatePriority,be=a.unstable_UserBlockingPriority,ue=a.unstable_NormalPriority,je=a.unstable_LowPriority,Ne=a.unstable_IdlePriority,et=a.log,qe=a.unstable_setDisableYieldValue,Me=null,Te=null;function Ke(t){if(typeof et=="function"&&qe(t),Te&&typeof Te.setStrictMode=="function")try{Te.setStrictMode(Me,t)}catch{}}var ke=Math.clz32?Math.clz32:H,Pe=Math.log,rt=Math.LN2;function H(t){return t>>>=0,t===0?32:31-(Pe(t)/rt|0)|0}var Le=256,Ce=262144,De=4194304;function Ee(t){var i=t&42;if(i!==0)return i;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function _e(t,i,s){var l=t.pendingLanes;if(l===0)return 0;var u=0,d=t.suspendedLanes,_=t.pingedLanes;t=t.warmLanes;var T=l&134217727;return T!==0?(l=T&~d,l!==0?u=Ee(l):(_&=T,_!==0?u=Ee(_):s||(s=T&~t,s!==0&&(u=Ee(s))))):(T=l&~d,T!==0?u=Ee(T):_!==0?u=Ee(_):s||(s=l&~t,s!==0&&(u=Ee(s)))),u===0?0:i!==0&&i!==u&&(i&d)===0&&(d=u&-u,s=i&-i,d>=s||d===32&&(s&4194048)!==0)?i:u}function Be(t,i){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&i)===0}function st(t,i){switch(t){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ht(){var t=De;return De<<=1,(De&62914560)===0&&(De=4194304),t}function Ct(t){for(var i=[],s=0;31>s;s++)i.push(t);return i}function On(t,i){t.pendingLanes|=i,i!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Zn(t,i,s,l,u,d){var _=t.pendingLanes;t.pendingLanes=s,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=s,t.entangledLanes&=s,t.errorRecoveryDisabledLanes&=s,t.shellSuspendCounter=0;var T=t.entanglements,B=t.expirationTimes,$=t.hiddenUpdates;for(s=_&~s;0<s;){var de=31-ke(s),ge=1<<de;T[de]=0,B[de]=-1;var ae=$[de];if(ae!==null)for($[de]=null,de=0;de<ae.length;de++){var oe=ae[de];oe!==null&&(oe.lane&=-536870913)}s&=~ge}l!==0&&ql(t,l,0),d!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=d&~(_&~i))}function ql(t,i,s){t.pendingLanes|=i,t.suspendedLanes&=~i;var l=31-ke(i);t.entangledLanes|=i,t.entanglements[l]=t.entanglements[l]|1073741824|s&261930}function Eo(t,i){var s=t.entangledLanes|=i;for(t=t.entanglements;s;){var l=31-ke(s),u=1<<l;u&i|t[l]&i&&(t[l]|=i),s&=~u}}function To(t,i){var s=i&-i;return s=(s&42)!==0?1:Ei(s),(s&(t.suspendedLanes|i))!==0?0:s}function Ei(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function hr(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Ao(){var t=te.p;return t!==0?t:(t=window.event,t===void 0?32:$g(t.type))}function Ro(t,i){var s=te.p;try{return te.p=t,i()}finally{te.p=s}}var Qn=Math.random().toString(36).slice(2),un="__reactFiber$"+Qn,xn="__reactProps$"+Qn,qi="__reactContainer$"+Qn,es="__reactEvents$"+Qn,tf="__reactListeners$"+Qn,nf="__reactHandles$"+Qn,Yl="__reactResources$"+Qn,pr="__reactMarker$"+Qn;function wo(t){delete t[un],delete t[xn],delete t[es],delete t[tf],delete t[nf]}function Da(t){var i=t[un];if(i)return i;for(var s=t.parentNode;s;){if(i=s[qi]||s[un]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(t=zg(t);t!==null;){if(s=t[un])return s;t=zg(t)}return i}t=s,s=t.parentNode}return null}function R(t){if(t=t[un]||t[qi]){var i=t.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return t}return null}function W(t){var i=t.tag;if(i===5||i===26||i===27||i===6)return t.stateNode;throw Error(r(33))}function re(t){var i=t[Yl];return i||(i=t[Yl]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function ee(t){t[pr]=!0}var Y=new Set,Re={};function Ue(t,i){ze(t,i),ze(t+"Capture",i)}function ze(t,i){for(Re[t]=i,t=0;t<i.length;t++)Y.add(i[t])}var Ie=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),nt={},at={};function Qe(t){return Ve.call(at,t)?!0:Ve.call(nt,t)?!1:Ie.test(t)?at[t]=!0:(nt[t]=!0,!1)}function dt(t,i,s){if(Qe(i))if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":t.removeAttribute(i);return;case"boolean":var l=i.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(i);return}}t.setAttribute(i,""+s)}}function Rt(t,i,s){if(s===null)t.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(i);return}t.setAttribute(i,""+s)}}function Dt(t,i,s,l){if(l===null)t.removeAttribute(s);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(s);return}t.setAttributeNS(i,s,""+l)}}function Et(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ft(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function tt(t,i,s){var l=Object.getOwnPropertyDescriptor(t.constructor.prototype,i);if(!t.hasOwnProperty(i)&&typeof l<"u"&&typeof l.get=="function"&&typeof l.set=="function"){var u=l.get,d=l.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return u.call(this)},set:function(_){s=""+_,d.call(this,_)}}),Object.defineProperty(t,i,{enumerable:l.enumerable}),{getValue:function(){return s},setValue:function(_){s=""+_},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function Yt(t){if(!t._valueTracker){var i=Ft(t)?"checked":"value";t._valueTracker=tt(t,i,""+t[i])}}function Tt(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var s=i.getValue(),l="";return t&&(l=Ft(t)?t.checked?"true":"false":t.value),t=l,t!==s?(i.setValue(t),!0):!1}function yn(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var La=/[\n"\\]/g;function Kt(t){return t.replace(La,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Yi(t,i,s,l,u,d,_,T){t.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?t.type=_:t.removeAttribute("type"),i!=null?_==="number"?(i===0&&t.value===""||t.value!=i)&&(t.value=""+Et(i)):t.value!==""+Et(i)&&(t.value=""+Et(i)):_!=="submit"&&_!=="reset"||t.removeAttribute("value"),i!=null?bn(t,_,Et(i)):s!=null?bn(t,_,Et(s)):l!=null&&t.removeAttribute("value"),u==null&&d!=null&&(t.defaultChecked=!!d),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),T!=null&&typeof T!="function"&&typeof T!="symbol"&&typeof T!="boolean"?t.name=""+Et(T):t.removeAttribute("name")}function Zt(t,i,s,l,u,d,_,T){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),i!=null||s!=null){if(!(d!=="submit"&&d!=="reset"||i!=null)){Yt(t);return}s=s!=null?""+Et(s):"",i=i!=null?""+Et(i):s,T||i===t.value||(t.value=i),t.defaultValue=i}l=l??u,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=T?t.checked:!!l,t.defaultChecked=!!l,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(t.name=_),Yt(t)}function bn(t,i,s){i==="number"&&yn(t.ownerDocument)===t||t.defaultValue===""+s||(t.defaultValue=""+s)}function gn(t,i,s,l){if(t=t.options,i){i={};for(var u=0;u<s.length;u++)i["$"+s[u]]=!0;for(s=0;s<t.length;s++)u=i.hasOwnProperty("$"+t[s].value),t[s].selected!==u&&(t[s].selected=u),u&&l&&(t[s].defaultSelected=!0)}else{for(s=""+Et(s),i=null,u=0;u<t.length;u++){if(t[u].value===s){t[u].selected=!0,l&&(t[u].defaultSelected=!0);return}i!==null||t[u].disabled||(i=t[u])}i!==null&&(i.selected=!0)}}function Mn(t,i,s){if(i!=null&&(i=""+Et(i),i!==t.value&&(t.value=i),s==null)){t.defaultValue!==i&&(t.defaultValue=i);return}t.defaultValue=s!=null?""+Et(s):""}function Cn(t,i,s,l){if(i==null){if(l!=null){if(s!=null)throw Error(r(92));if(pe(l)){if(1<l.length)throw Error(r(93));l=l[0]}s=l}s==null&&(s=""),i=s}s=Et(i),t.defaultValue=s,l=t.textContent,l===s&&l!==""&&l!==null&&(t.value=l),Yt(t)}function Fi(t,i){if(i){var s=t.firstChild;if(s&&s===t.lastChild&&s.nodeType===3){s.nodeValue=i;return}}t.textContent=i}var ji=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Am(t,i,s){var l=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?l?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="":l?t.setProperty(i,s):typeof s!="number"||s===0||ji.has(i)?i==="float"?t.cssFloat=s:t[i]=(""+s).trim():t[i]=s+"px"}function Rm(t,i,s){if(i!=null&&typeof i!="object")throw Error(r(62));if(t=t.style,s!=null){for(var l in s)!s.hasOwnProperty(l)||i!=null&&i.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var u in i)l=i[u],i.hasOwnProperty(u)&&s[u]!==l&&Am(t,u,l)}else for(var d in i)i.hasOwnProperty(d)&&Am(t,d,i[d])}function af(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var py=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),my=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function jl(t){return my.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ki(){}var rf=null;function sf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ts=null,ns=null;function wm(t){var i=R(t);if(i&&(t=i.stateNode)){var s=t[xn]||null;e:switch(t=i.stateNode,i.type){case"input":if(Yi(t,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=t;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+Kt(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var l=s[i];if(l!==t&&l.form===t.form){var u=l[xn]||null;if(!u)throw Error(r(90));Yi(l,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<s.length;i++)l=s[i],l.form===t.form&&Tt(l)}break e;case"textarea":Mn(t,s.value,s.defaultValue);break e;case"select":i=s.value,i!=null&&gn(t,!!s.multiple,i,!1)}}}var of=!1;function Cm(t,i,s){if(of)return t(i,s);of=!0;try{var l=t(i);return l}finally{if(of=!1,(ts!==null||ns!==null)&&(Fc(),ts&&(i=ts,t=ns,ns=ts=null,wm(i),t)))for(i=0;i<t.length;i++)wm(t[i])}}function Co(t,i){var s=t.stateNode;if(s===null)return null;var l=s[xn]||null;if(l===null)return null;s=l[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break e;default:t=!1}if(t)return null;if(s&&typeof s!="function")throw Error(r(231,i,typeof s));return s}var Zi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),lf=!1;if(Zi)try{var Do={};Object.defineProperty(Do,"passive",{get:function(){lf=!0}}),window.addEventListener("test",Do,Do),window.removeEventListener("test",Do,Do)}catch{lf=!1}var Ua=null,cf=null,Kl=null;function Dm(){if(Kl)return Kl;var t,i=cf,s=i.length,l,u="value"in Ua?Ua.value:Ua.textContent,d=u.length;for(t=0;t<s&&i[t]===u[t];t++);var _=s-t;for(l=1;l<=_&&i[s-l]===u[d-l];l++);return Kl=u.slice(t,1<l?1-l:void 0)}function Zl(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function Ql(){return!0}function Lm(){return!1}function kn(t){function i(s,l,u,d,_){this._reactName=s,this._targetInst=u,this.type=l,this.nativeEvent=d,this.target=_,this.currentTarget=null;for(var T in t)t.hasOwnProperty(T)&&(s=t[T],this[T]=s?s(d):d[T]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Ql:Lm,this.isPropagationStopped=Lm,this}return g(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=Ql)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=Ql)},persist:function(){},isPersistent:Ql}),i}var mr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=kn(mr),Lo=g({},mr,{view:0,detail:0}),xy=kn(Lo),uf,ff,Uo,$l=g({},Lo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:hf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Uo&&(Uo&&t.type==="mousemove"?(uf=t.screenX-Uo.screenX,ff=t.screenY-Uo.screenY):ff=uf=0,Uo=t),uf)},movementY:function(t){return"movementY"in t?t.movementY:ff}}),Um=kn($l),gy=g({},$l,{dataTransfer:0}),vy=kn(gy),_y=g({},Lo,{relatedTarget:0}),df=kn(_y),Sy=g({},mr,{animationName:0,elapsedTime:0,pseudoElement:0}),yy=kn(Sy),by=g({},mr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),My=kn(by),Ey=g({},mr,{data:0}),Nm=kn(Ey),Ty={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ay={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ry={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function wy(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=Ry[t])?!!i[t]:!1}function hf(){return wy}var Cy=g({},Lo,{key:function(t){if(t.key){var i=Ty[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=Zl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ay[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:hf,charCode:function(t){return t.type==="keypress"?Zl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Dy=kn(Cy),Ly=g({},$l,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Om=kn(Ly),Uy=g({},Lo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:hf}),Ny=kn(Uy),Oy=g({},mr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Fy=kn(Oy),Py=g({},$l,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),zy=kn(Py),By=g({},mr,{newState:0,oldState:0}),Iy=kn(By),Gy=[9,13,27,32],pf=Zi&&"CompositionEvent"in window,No=null;Zi&&"documentMode"in document&&(No=document.documentMode);var Hy=Zi&&"TextEvent"in window&&!No,Fm=Zi&&(!pf||No&&8<No&&11>=No),Pm=" ",zm=!1;function Bm(t,i){switch(t){case"keyup":return Gy.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Im(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var is=!1;function Vy(t,i){switch(t){case"compositionend":return Im(i);case"keypress":return i.which!==32?null:(zm=!0,Pm);case"textInput":return t=i.data,t===Pm&&zm?null:t;default:return null}}function ky(t,i){if(is)return t==="compositionend"||!pf&&Bm(t,i)?(t=Dm(),Kl=cf=Ua=null,is=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Fm&&i.locale!=="ko"?null:i.data;default:return null}}var Xy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Gm(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!Xy[t.type]:i==="textarea"}function Hm(t,i,s,l){ts?ns?ns.push(l):ns=[l]:ts=l,i=Vc(i,"onChange"),0<i.length&&(s=new Jl("onChange","change",null,s,l),t.push({event:s,listeners:i}))}var Oo=null,Fo=null;function Wy(t){Mg(t,0)}function ec(t){var i=W(t);if(Tt(i))return t}function Vm(t,i){if(t==="change")return i}var km=!1;if(Zi){var mf;if(Zi){var xf="oninput"in document;if(!xf){var Xm=document.createElement("div");Xm.setAttribute("oninput","return;"),xf=typeof Xm.oninput=="function"}mf=xf}else mf=!1;km=mf&&(!document.documentMode||9<document.documentMode)}function Wm(){Oo&&(Oo.detachEvent("onpropertychange",qm),Fo=Oo=null)}function qm(t){if(t.propertyName==="value"&&ec(Fo)){var i=[];Hm(i,Fo,t,sf(t)),Cm(Wy,i)}}function qy(t,i,s){t==="focusin"?(Wm(),Oo=i,Fo=s,Oo.attachEvent("onpropertychange",qm)):t==="focusout"&&Wm()}function Yy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ec(Fo)}function jy(t,i){if(t==="click")return ec(i)}function Ky(t,i){if(t==="input"||t==="change")return ec(i)}function Zy(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var Jn=typeof Object.is=="function"?Object.is:Zy;function Po(t,i){if(Jn(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var s=Object.keys(t),l=Object.keys(i);if(s.length!==l.length)return!1;for(l=0;l<s.length;l++){var u=s[l];if(!Ve.call(i,u)||!Jn(t[u],i[u]))return!1}return!0}function Ym(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function jm(t,i){var s=Ym(t);t=0;for(var l;s;){if(s.nodeType===3){if(l=t+s.textContent.length,t<=i&&l>=i)return{node:s,offset:i-t};t=l}e:{for(;s;){if(s.nextSibling){s=s.nextSibling;break e}s=s.parentNode}s=void 0}s=Ym(s)}}function Km(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?Km(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function Zm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var i=yn(t.document);i instanceof t.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)t=i.contentWindow;else break;i=yn(t.document)}return i}function gf(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}var Qy=Zi&&"documentMode"in document&&11>=document.documentMode,as=null,vf=null,zo=null,_f=!1;function Qm(t,i,s){var l=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;_f||as==null||as!==yn(l)||(l=as,"selectionStart"in l&&gf(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),zo&&Po(zo,l)||(zo=l,l=Vc(vf,"onSelect"),0<l.length&&(i=new Jl("onSelect","select",null,i,s),t.push({event:i,listeners:l}),i.target=as)))}function xr(t,i){var s={};return s[t.toLowerCase()]=i.toLowerCase(),s["Webkit"+t]="webkit"+i,s["Moz"+t]="moz"+i,s}var rs={animationend:xr("Animation","AnimationEnd"),animationiteration:xr("Animation","AnimationIteration"),animationstart:xr("Animation","AnimationStart"),transitionrun:xr("Transition","TransitionRun"),transitionstart:xr("Transition","TransitionStart"),transitioncancel:xr("Transition","TransitionCancel"),transitionend:xr("Transition","TransitionEnd")},Sf={},Jm={};Zi&&(Jm=document.createElement("div").style,"AnimationEvent"in window||(delete rs.animationend.animation,delete rs.animationiteration.animation,delete rs.animationstart.animation),"TransitionEvent"in window||delete rs.transitionend.transition);function gr(t){if(Sf[t])return Sf[t];if(!rs[t])return t;var i=rs[t],s;for(s in i)if(i.hasOwnProperty(s)&&s in Jm)return Sf[t]=i[s];return t}var $m=gr("animationend"),e0=gr("animationiteration"),t0=gr("animationstart"),Jy=gr("transitionrun"),$y=gr("transitionstart"),eb=gr("transitioncancel"),n0=gr("transitionend"),i0=new Map,yf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");yf.push("scrollEnd");function Ti(t,i){i0.set(t,i),Ue(i,[t])}var tc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},di=[],ss=0,bf=0;function nc(){for(var t=ss,i=bf=ss=0;i<t;){var s=di[i];di[i++]=null;var l=di[i];di[i++]=null;var u=di[i];di[i++]=null;var d=di[i];if(di[i++]=null,l!==null&&u!==null){var _=l.pending;_===null?u.next=u:(u.next=_.next,_.next=u),l.pending=u}d!==0&&a0(s,u,d)}}function ic(t,i,s,l){di[ss++]=t,di[ss++]=i,di[ss++]=s,di[ss++]=l,bf|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function Mf(t,i,s,l){return ic(t,i,s,l),ac(t)}function vr(t,i){return ic(t,null,null,i),ac(t)}function a0(t,i,s){t.lanes|=s;var l=t.alternate;l!==null&&(l.lanes|=s);for(var u=!1,d=t.return;d!==null;)d.childLanes|=s,l=d.alternate,l!==null&&(l.childLanes|=s),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(u=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,u&&i!==null&&(u=31-ke(s),t=d.hiddenUpdates,l=t[u],l===null?t[u]=[i]:l.push(i),i.lane=s|536870912),d):null}function ac(t){if(50<rl)throw rl=0,Ud=null,Error(r(185));for(var i=t.return;i!==null;)t=i,i=t.return;return t.tag===3?t.stateNode:null}var os={};function tb(t,i,s,l){this.tag=t,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $n(t,i,s,l){return new tb(t,i,s,l)}function Ef(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Qi(t,i){var s=t.alternate;return s===null?(s=$n(t.tag,i,t.key,t.mode),s.elementType=t.elementType,s.type=t.type,s.stateNode=t.stateNode,s.alternate=t,t.alternate=s):(s.pendingProps=i,s.type=t.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=t.flags&65011712,s.childLanes=t.childLanes,s.lanes=t.lanes,s.child=t.child,s.memoizedProps=t.memoizedProps,s.memoizedState=t.memoizedState,s.updateQueue=t.updateQueue,i=t.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=t.sibling,s.index=t.index,s.ref=t.ref,s.refCleanup=t.refCleanup,s}function r0(t,i){t.flags&=65011714;var s=t.alternate;return s===null?(t.childLanes=0,t.lanes=i,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=s.childLanes,t.lanes=s.lanes,t.child=s.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=s.memoizedProps,t.memoizedState=s.memoizedState,t.updateQueue=s.updateQueue,t.type=s.type,i=s.dependencies,t.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),t}function rc(t,i,s,l,u,d){var _=0;if(l=t,typeof t=="function")Ef(t)&&(_=1);else if(typeof t=="string")_=s1(t,s,Ae.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case C:return t=$n(31,s,i,u),t.elementType=C,t.lanes=d,t;case A:return _r(s.children,u,d,i);case b:_=8,u|=24;break;case S:return t=$n(12,s,i,u|2),t.elementType=S,t.lanes=d,t;case G:return t=$n(13,s,i,u),t.elementType=G,t.lanes=d,t;case L:return t=$n(19,s,i,u),t.elementType=L,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case N:_=10;break e;case z:_=9;break e;case D:_=11;break e;case F:_=14;break e;case Z:_=16,l=null;break e}_=29,s=Error(r(130,t===null?"null":typeof t,"")),l=null}return i=$n(_,s,i,u),i.elementType=t,i.type=l,i.lanes=d,i}function _r(t,i,s,l){return t=$n(7,t,l,i),t.lanes=s,t}function Tf(t,i,s){return t=$n(6,t,null,i),t.lanes=s,t}function s0(t){var i=$n(18,null,null,0);return i.stateNode=t,i}function Af(t,i,s){return i=$n(4,t.children!==null?t.children:[],t.key,i),i.lanes=s,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}var o0=new WeakMap;function hi(t,i){if(typeof t=="object"&&t!==null){var s=o0.get(t);return s!==void 0?s:(i={value:t,source:i,stack:Bt(i)},o0.set(t,i),i)}return{value:t,source:i,stack:Bt(i)}}var ls=[],cs=0,sc=null,Bo=0,pi=[],mi=0,Na=null,Pi=1,zi="";function Ji(t,i){ls[cs++]=Bo,ls[cs++]=sc,sc=t,Bo=i}function l0(t,i,s){pi[mi++]=Pi,pi[mi++]=zi,pi[mi++]=Na,Na=t;var l=Pi;t=zi;var u=32-ke(l)-1;l&=~(1<<u),s+=1;var d=32-ke(i)+u;if(30<d){var _=u-u%5;d=(l&(1<<_)-1).toString(32),l>>=_,u-=_,Pi=1<<32-ke(i)+u|s<<u|l,zi=d+t}else Pi=1<<d|s<<u|l,zi=t}function Rf(t){t.return!==null&&(Ji(t,1),l0(t,1,0))}function wf(t){for(;t===sc;)sc=ls[--cs],ls[cs]=null,Bo=ls[--cs],ls[cs]=null;for(;t===Na;)Na=pi[--mi],pi[mi]=null,zi=pi[--mi],pi[mi]=null,Pi=pi[--mi],pi[mi]=null}function c0(t,i){pi[mi++]=Pi,pi[mi++]=zi,pi[mi++]=Na,Pi=i.id,zi=i.overflow,Na=t}var Dn=null,Qt=null,At=!1,Oa=null,xi=!1,Cf=Error(r(519));function Fa(t){var i=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Io(hi(i,t)),Cf}function u0(t){var i=t.stateNode,s=t.type,l=t.memoizedProps;switch(i[un]=t,i[xn]=l,s){case"dialog":St("cancel",i),St("close",i);break;case"iframe":case"object":case"embed":St("load",i);break;case"video":case"audio":for(s=0;s<ol.length;s++)St(ol[s],i);break;case"source":St("error",i);break;case"img":case"image":case"link":St("error",i),St("load",i);break;case"details":St("toggle",i);break;case"input":St("invalid",i),Zt(i,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0);break;case"select":St("invalid",i);break;case"textarea":St("invalid",i),Cn(i,l.value,l.defaultValue,l.children)}s=l.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||l.suppressHydrationWarning===!0||Rg(i.textContent,s)?(l.popover!=null&&(St("beforetoggle",i),St("toggle",i)),l.onScroll!=null&&St("scroll",i),l.onScrollEnd!=null&&St("scrollend",i),l.onClick!=null&&(i.onclick=Ki),i=!0):i=!1,i||Fa(t,!0)}function f0(t){for(Dn=t.return;Dn;)switch(Dn.tag){case 5:case 31:case 13:xi=!1;return;case 27:case 3:xi=!0;return;default:Dn=Dn.return}}function us(t){if(t!==Dn)return!1;if(!At)return f0(t),At=!0,!1;var i=t.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=t.type,s=!(s!=="form"&&s!=="button")||Yd(t.type,t.memoizedProps)),s=!s),s&&Qt&&Fa(t),f0(t),i===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Qt=Pg(t)}else if(i===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(317));Qt=Pg(t)}else i===27?(i=Qt,Ka(t.type)?(t=Jd,Jd=null,Qt=t):Qt=i):Qt=Dn?vi(t.stateNode.nextSibling):null;return!0}function Sr(){Qt=Dn=null,At=!1}function Df(){var t=Oa;return t!==null&&(Yn===null?Yn=t:Yn.push.apply(Yn,t),Oa=null),t}function Io(t){Oa===null?Oa=[t]:Oa.push(t)}var Lf=U(null),yr=null,$i=null;function Pa(t,i,s){ye(Lf,i._currentValue),i._currentValue=s}function ea(t){t._currentValue=Lf.current,K(Lf)}function Uf(t,i,s){for(;t!==null;){var l=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,l!==null&&(l.childLanes|=i)):l!==null&&(l.childLanes&i)!==i&&(l.childLanes|=i),t===s)break;t=t.return}}function Nf(t,i,s,l){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var d=u.dependencies;if(d!==null){var _=u.child;d=d.firstContext;e:for(;d!==null;){var T=d;d=u;for(var B=0;B<i.length;B++)if(T.context===i[B]){d.lanes|=s,T=d.alternate,T!==null&&(T.lanes|=s),Uf(d.return,s,t),l||(_=null);break e}d=T.next}}else if(u.tag===18){if(_=u.return,_===null)throw Error(r(341));_.lanes|=s,d=_.alternate,d!==null&&(d.lanes|=s),Uf(_,s,t),_=null}else _=u.child;if(_!==null)_.return=u;else for(_=u;_!==null;){if(_===t){_=null;break}if(u=_.sibling,u!==null){u.return=_.return,_=u;break}_=_.return}u=_}}function fs(t,i,s,l){t=null;for(var u=i,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var _=u.alternate;if(_===null)throw Error(r(387));if(_=_.memoizedProps,_!==null){var T=u.type;Jn(u.pendingProps.value,_.value)||(t!==null?t.push(T):t=[T])}}else if(u===ce.current){if(_=u.alternate,_===null)throw Error(r(387));_.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(dl):t=[dl])}u=u.return}t!==null&&Nf(i,t,s,l),i.flags|=262144}function oc(t){for(t=t.firstContext;t!==null;){if(!Jn(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function br(t){yr=t,$i=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Ln(t){return d0(yr,t)}function lc(t,i){return yr===null&&br(t),d0(t,i)}function d0(t,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},$i===null){if(t===null)throw Error(r(308));$i=i,t.dependencies={lanes:0,firstContext:i},t.flags|=524288}else $i=$i.next=i;return s}var nb=typeof AbortController<"u"?AbortController:function(){var t=[],i=this.signal={aborted:!1,addEventListener:function(s,l){t.push(l)}};this.abort=function(){i.aborted=!0,t.forEach(function(s){return s()})}},ib=a.unstable_scheduleCallback,ab=a.unstable_NormalPriority,fn={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Of(){return{controller:new nb,data:new Map,refCount:0}}function Go(t){t.refCount--,t.refCount===0&&ib(ab,function(){t.controller.abort()})}var Ho=null,Ff=0,ds=0,hs=null;function rb(t,i){if(Ho===null){var s=Ho=[];Ff=0,ds=Bd(),hs={status:"pending",value:void 0,then:function(l){s.push(l)}}}return Ff++,i.then(h0,h0),i}function h0(){if(--Ff===0&&Ho!==null){hs!==null&&(hs.status="fulfilled");var t=Ho;Ho=null,ds=0,hs=null;for(var i=0;i<t.length;i++)(0,t[i])()}}function sb(t,i){var s=[],l={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return t.then(function(){l.status="fulfilled",l.value=i;for(var u=0;u<s.length;u++)(0,s[u])(i)},function(u){for(l.status="rejected",l.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),l}var p0=P.S;P.S=function(t,i){Qx=E(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&rb(t,i),p0!==null&&p0(t,i)};var Mr=U(null);function Pf(){var t=Mr.current;return t!==null?t:jt.pooledCache}function cc(t,i){i===null?ye(Mr,Mr.current):ye(Mr,i.pool)}function m0(){var t=Pf();return t===null?null:{parent:fn._currentValue,pool:t}}var ps=Error(r(460)),zf=Error(r(474)),uc=Error(r(542)),fc={then:function(){}};function x0(t){return t=t.status,t==="fulfilled"||t==="rejected"}function g0(t,i,s){switch(s=t[s],s===void 0?t.push(i):s!==i&&(i.then(Ki,Ki),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,_0(t),t;default:if(typeof i.status=="string")i.then(Ki,Ki);else{if(t=jt,t!==null&&100<t.shellSuspendCounter)throw Error(r(482));t=i,t.status="pending",t.then(function(l){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=l}},function(l){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=l}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw t=i.reason,_0(t),t}throw Tr=i,ps}}function Er(t){try{var i=t._init;return i(t._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(Tr=s,ps):s}}var Tr=null;function v0(){if(Tr===null)throw Error(r(459));var t=Tr;return Tr=null,t}function _0(t){if(t===ps||t===uc)throw Error(r(483))}var ms=null,Vo=0;function dc(t){var i=Vo;return Vo+=1,ms===null&&(ms=[]),g0(ms,t,i)}function ko(t,i){i=i.props.ref,t.ref=i!==void 0?i:null}function hc(t,i){throw i.$$typeof===v?Error(r(525)):(t=Object.prototype.toString.call(i),Error(r(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t)))}function S0(t){function i(q,V){if(t){var Q=q.deletions;Q===null?(q.deletions=[V],q.flags|=16):Q.push(V)}}function s(q,V){if(!t)return null;for(;V!==null;)i(q,V),V=V.sibling;return null}function l(q){for(var V=new Map;q!==null;)q.key!==null?V.set(q.key,q):V.set(q.index,q),q=q.sibling;return V}function u(q,V){return q=Qi(q,V),q.index=0,q.sibling=null,q}function d(q,V,Q){return q.index=Q,t?(Q=q.alternate,Q!==null?(Q=Q.index,Q<V?(q.flags|=67108866,V):Q):(q.flags|=67108866,V)):(q.flags|=1048576,V)}function _(q){return t&&q.alternate===null&&(q.flags|=67108866),q}function T(q,V,Q,me){return V===null||V.tag!==6?(V=Tf(Q,q.mode,me),V.return=q,V):(V=u(V,Q),V.return=q,V)}function B(q,V,Q,me){var Je=Q.type;return Je===A?de(q,V,Q.props.children,me,Q.key):V!==null&&(V.elementType===Je||typeof Je=="object"&&Je!==null&&Je.$$typeof===Z&&Er(Je)===V.type)?(V=u(V,Q.props),ko(V,Q),V.return=q,V):(V=rc(Q.type,Q.key,Q.props,null,q.mode,me),ko(V,Q),V.return=q,V)}function $(q,V,Q,me){return V===null||V.tag!==4||V.stateNode.containerInfo!==Q.containerInfo||V.stateNode.implementation!==Q.implementation?(V=Af(Q,q.mode,me),V.return=q,V):(V=u(V,Q.children||[]),V.return=q,V)}function de(q,V,Q,me,Je){return V===null||V.tag!==7?(V=_r(Q,q.mode,me,Je),V.return=q,V):(V=u(V,Q),V.return=q,V)}function ge(q,V,Q){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return V=Tf(""+V,q.mode,Q),V.return=q,V;if(typeof V=="object"&&V!==null){switch(V.$$typeof){case y:return Q=rc(V.type,V.key,V.props,null,q.mode,Q),ko(Q,V),Q.return=q,Q;case M:return V=Af(V,q.mode,Q),V.return=q,V;case Z:return V=Er(V),ge(q,V,Q)}if(pe(V)||ne(V))return V=_r(V,q.mode,Q,null),V.return=q,V;if(typeof V.then=="function")return ge(q,dc(V),Q);if(V.$$typeof===N)return ge(q,lc(q,V),Q);hc(q,V)}return null}function ae(q,V,Q,me){var Je=V!==null?V.key:null;if(typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint")return Je!==null?null:T(q,V,""+Q,me);if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case y:return Q.key===Je?B(q,V,Q,me):null;case M:return Q.key===Je?$(q,V,Q,me):null;case Z:return Q=Er(Q),ae(q,V,Q,me)}if(pe(Q)||ne(Q))return Je!==null?null:de(q,V,Q,me,null);if(typeof Q.then=="function")return ae(q,V,dc(Q),me);if(Q.$$typeof===N)return ae(q,V,lc(q,Q),me);hc(q,Q)}return null}function oe(q,V,Q,me,Je){if(typeof me=="string"&&me!==""||typeof me=="number"||typeof me=="bigint")return q=q.get(Q)||null,T(V,q,""+me,Je);if(typeof me=="object"&&me!==null){switch(me.$$typeof){case y:return q=q.get(me.key===null?Q:me.key)||null,B(V,q,me,Je);case M:return q=q.get(me.key===null?Q:me.key)||null,$(V,q,me,Je);case Z:return me=Er(me),oe(q,V,Q,me,Je)}if(pe(me)||ne(me))return q=q.get(Q)||null,de(V,q,me,Je,null);if(typeof me.then=="function")return oe(q,V,Q,dc(me),Je);if(me.$$typeof===N)return oe(q,V,Q,lc(V,me),Je);hc(V,me)}return null}function Ge(q,V,Q,me){for(var Je=null,Lt=null,Xe=V,ht=V=0,bt=null;Xe!==null&&ht<Q.length;ht++){Xe.index>ht?(bt=Xe,Xe=null):bt=Xe.sibling;var Ut=ae(q,Xe,Q[ht],me);if(Ut===null){Xe===null&&(Xe=bt);break}t&&Xe&&Ut.alternate===null&&i(q,Xe),V=d(Ut,V,ht),Lt===null?Je=Ut:Lt.sibling=Ut,Lt=Ut,Xe=bt}if(ht===Q.length)return s(q,Xe),At&&Ji(q,ht),Je;if(Xe===null){for(;ht<Q.length;ht++)Xe=ge(q,Q[ht],me),Xe!==null&&(V=d(Xe,V,ht),Lt===null?Je=Xe:Lt.sibling=Xe,Lt=Xe);return At&&Ji(q,ht),Je}for(Xe=l(Xe);ht<Q.length;ht++)bt=oe(Xe,q,ht,Q[ht],me),bt!==null&&(t&&bt.alternate!==null&&Xe.delete(bt.key===null?ht:bt.key),V=d(bt,V,ht),Lt===null?Je=bt:Lt.sibling=bt,Lt=bt);return t&&Xe.forEach(function(er){return i(q,er)}),At&&Ji(q,ht),Je}function it(q,V,Q,me){if(Q==null)throw Error(r(151));for(var Je=null,Lt=null,Xe=V,ht=V=0,bt=null,Ut=Q.next();Xe!==null&&!Ut.done;ht++,Ut=Q.next()){Xe.index>ht?(bt=Xe,Xe=null):bt=Xe.sibling;var er=ae(q,Xe,Ut.value,me);if(er===null){Xe===null&&(Xe=bt);break}t&&Xe&&er.alternate===null&&i(q,Xe),V=d(er,V,ht),Lt===null?Je=er:Lt.sibling=er,Lt=er,Xe=bt}if(Ut.done)return s(q,Xe),At&&Ji(q,ht),Je;if(Xe===null){for(;!Ut.done;ht++,Ut=Q.next())Ut=ge(q,Ut.value,me),Ut!==null&&(V=d(Ut,V,ht),Lt===null?Je=Ut:Lt.sibling=Ut,Lt=Ut);return At&&Ji(q,ht),Je}for(Xe=l(Xe);!Ut.done;ht++,Ut=Q.next())Ut=oe(Xe,q,ht,Ut.value,me),Ut!==null&&(t&&Ut.alternate!==null&&Xe.delete(Ut.key===null?ht:Ut.key),V=d(Ut,V,ht),Lt===null?Je=Ut:Lt.sibling=Ut,Lt=Ut);return t&&Xe.forEach(function(g1){return i(q,g1)}),At&&Ji(q,ht),Je}function Xt(q,V,Q,me){if(typeof Q=="object"&&Q!==null&&Q.type===A&&Q.key===null&&(Q=Q.props.children),typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case y:e:{for(var Je=Q.key;V!==null;){if(V.key===Je){if(Je=Q.type,Je===A){if(V.tag===7){s(q,V.sibling),me=u(V,Q.props.children),me.return=q,q=me;break e}}else if(V.elementType===Je||typeof Je=="object"&&Je!==null&&Je.$$typeof===Z&&Er(Je)===V.type){s(q,V.sibling),me=u(V,Q.props),ko(me,Q),me.return=q,q=me;break e}s(q,V);break}else i(q,V);V=V.sibling}Q.type===A?(me=_r(Q.props.children,q.mode,me,Q.key),me.return=q,q=me):(me=rc(Q.type,Q.key,Q.props,null,q.mode,me),ko(me,Q),me.return=q,q=me)}return _(q);case M:e:{for(Je=Q.key;V!==null;){if(V.key===Je)if(V.tag===4&&V.stateNode.containerInfo===Q.containerInfo&&V.stateNode.implementation===Q.implementation){s(q,V.sibling),me=u(V,Q.children||[]),me.return=q,q=me;break e}else{s(q,V);break}else i(q,V);V=V.sibling}me=Af(Q,q.mode,me),me.return=q,q=me}return _(q);case Z:return Q=Er(Q),Xt(q,V,Q,me)}if(pe(Q))return Ge(q,V,Q,me);if(ne(Q)){if(Je=ne(Q),typeof Je!="function")throw Error(r(150));return Q=Je.call(Q),it(q,V,Q,me)}if(typeof Q.then=="function")return Xt(q,V,dc(Q),me);if(Q.$$typeof===N)return Xt(q,V,lc(q,Q),me);hc(q,Q)}return typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint"?(Q=""+Q,V!==null&&V.tag===6?(s(q,V.sibling),me=u(V,Q),me.return=q,q=me):(s(q,V),me=Tf(Q,q.mode,me),me.return=q,q=me),_(q)):s(q,V)}return function(q,V,Q,me){try{Vo=0;var Je=Xt(q,V,Q,me);return ms=null,Je}catch(Xe){if(Xe===ps||Xe===uc)throw Xe;var Lt=$n(29,Xe,null,q.mode);return Lt.lanes=me,Lt.return=q,Lt}finally{}}}var Ar=S0(!0),y0=S0(!1),za=!1;function Bf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function If(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ba(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ia(t,i,s){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(Ot&2)!==0){var u=l.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),l.pending=i,i=ac(t),a0(t,null,s),i}return ic(t,l,i,s),ac(t)}function Xo(t,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,Eo(t,s)}}function Gf(t,i){var s=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,s===l)){var u=null,d=null;if(s=s.firstBaseUpdate,s!==null){do{var _={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};d===null?u=d=_:d=d.next=_,s=s.next}while(s!==null);d===null?u=d=i:d=d.next=i}else u=d=i;s={baseState:l.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:l.shared,callbacks:l.callbacks},t.updateQueue=s;return}t=s.lastBaseUpdate,t===null?s.firstBaseUpdate=i:t.next=i,s.lastBaseUpdate=i}var Hf=!1;function Wo(){if(Hf){var t=hs;if(t!==null)throw t}}function qo(t,i,s,l){Hf=!1;var u=t.updateQueue;za=!1;var d=u.firstBaseUpdate,_=u.lastBaseUpdate,T=u.shared.pending;if(T!==null){u.shared.pending=null;var B=T,$=B.next;B.next=null,_===null?d=$:_.next=$,_=B;var de=t.alternate;de!==null&&(de=de.updateQueue,T=de.lastBaseUpdate,T!==_&&(T===null?de.firstBaseUpdate=$:T.next=$,de.lastBaseUpdate=B))}if(d!==null){var ge=u.baseState;_=0,de=$=B=null,T=d;do{var ae=T.lane&-536870913,oe=ae!==T.lane;if(oe?(yt&ae)===ae:(l&ae)===ae){ae!==0&&ae===ds&&(Hf=!0),de!==null&&(de=de.next={lane:0,tag:T.tag,payload:T.payload,callback:null,next:null});e:{var Ge=t,it=T;ae=i;var Xt=s;switch(it.tag){case 1:if(Ge=it.payload,typeof Ge=="function"){ge=Ge.call(Xt,ge,ae);break e}ge=Ge;break e;case 3:Ge.flags=Ge.flags&-65537|128;case 0:if(Ge=it.payload,ae=typeof Ge=="function"?Ge.call(Xt,ge,ae):Ge,ae==null)break e;ge=g({},ge,ae);break e;case 2:za=!0}}ae=T.callback,ae!==null&&(t.flags|=64,oe&&(t.flags|=8192),oe=u.callbacks,oe===null?u.callbacks=[ae]:oe.push(ae))}else oe={lane:ae,tag:T.tag,payload:T.payload,callback:T.callback,next:null},de===null?($=de=oe,B=ge):de=de.next=oe,_|=ae;if(T=T.next,T===null){if(T=u.shared.pending,T===null)break;oe=T,T=oe.next,oe.next=null,u.lastBaseUpdate=oe,u.shared.pending=null}}while(!0);de===null&&(B=ge),u.baseState=B,u.firstBaseUpdate=$,u.lastBaseUpdate=de,d===null&&(u.shared.lanes=0),Xa|=_,t.lanes=_,t.memoizedState=ge}}function b0(t,i){if(typeof t!="function")throw Error(r(191,t));t.call(i)}function M0(t,i){var s=t.callbacks;if(s!==null)for(t.callbacks=null,t=0;t<s.length;t++)b0(s[t],i)}var xs=U(null),pc=U(0);function E0(t,i){t=ca,ye(pc,t),ye(xs,i),ca=t|i.baseLanes}function Vf(){ye(pc,ca),ye(xs,xs.current)}function kf(){ca=pc.current,K(xs),K(pc)}var ei=U(null),gi=null;function Ga(t){var i=t.alternate;ye(rn,rn.current&1),ye(ei,t),gi===null&&(i===null||xs.current!==null||i.memoizedState!==null)&&(gi=t)}function Xf(t){ye(rn,rn.current),ye(ei,t),gi===null&&(gi=t)}function T0(t){t.tag===22?(ye(rn,rn.current),ye(ei,t),gi===null&&(gi=t)):Ha()}function Ha(){ye(rn,rn.current),ye(ei,ei.current)}function ti(t){K(ei),gi===t&&(gi=null),K(rn)}var rn=U(0);function mc(t){for(var i=t;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||Zd(s)||Qd(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var ta=0,ut=null,Vt=null,dn=null,xc=!1,gs=!1,Rr=!1,gc=0,Yo=0,vs=null,ob=0;function en(){throw Error(r(321))}function Wf(t,i){if(i===null)return!1;for(var s=0;s<i.length&&s<t.length;s++)if(!Jn(t[s],i[s]))return!1;return!0}function qf(t,i,s,l,u,d){return ta=d,ut=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,P.H=t===null||t.memoizedState===null?lx:od,Rr=!1,d=s(l,u),Rr=!1,gs&&(d=R0(i,s,l,u)),A0(t),d}function A0(t){P.H=Zo;var i=Vt!==null&&Vt.next!==null;if(ta=0,dn=Vt=ut=null,xc=!1,Yo=0,vs=null,i)throw Error(r(300));t===null||hn||(t=t.dependencies,t!==null&&oc(t)&&(hn=!0))}function R0(t,i,s,l){ut=t;var u=0;do{if(gs&&(vs=null),Yo=0,gs=!1,25<=u)throw Error(r(301));if(u+=1,dn=Vt=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}P.H=cx,d=i(s,l)}while(gs);return d}function lb(){var t=P.H,i=t.useState()[0];return i=typeof i.then=="function"?jo(i):i,t=t.useState()[0],(Vt!==null?Vt.memoizedState:null)!==t&&(ut.flags|=1024),i}function Yf(){var t=gc!==0;return gc=0,t}function jf(t,i,s){i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~s}function Kf(t){if(xc){for(t=t.memoizedState;t!==null;){var i=t.queue;i!==null&&(i.pending=null),t=t.next}xc=!1}ta=0,dn=Vt=ut=null,gs=!1,Yo=gc=0,vs=null}function In(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dn===null?ut.memoizedState=dn=t:dn=dn.next=t,dn}function sn(){if(Vt===null){var t=ut.alternate;t=t!==null?t.memoizedState:null}else t=Vt.next;var i=dn===null?ut.memoizedState:dn.next;if(i!==null)dn=i,Vt=t;else{if(t===null)throw ut.alternate===null?Error(r(467)):Error(r(310));Vt=t,t={memoizedState:Vt.memoizedState,baseState:Vt.baseState,baseQueue:Vt.baseQueue,queue:Vt.queue,next:null},dn===null?ut.memoizedState=dn=t:dn=dn.next=t}return dn}function vc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function jo(t){var i=Yo;return Yo+=1,vs===null&&(vs=[]),t=g0(vs,t,i),i=ut,(dn===null?i.memoizedState:dn.next)===null&&(i=i.alternate,P.H=i===null||i.memoizedState===null?lx:od),t}function _c(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return jo(t);if(t.$$typeof===N)return Ln(t)}throw Error(r(438,String(t)))}function Zf(t){var i=null,s=ut.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var l=ut.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(i={data:l.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=vc(),ut.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(t),l=0;l<t;l++)s[l]=w;return i.index++,s}function na(t,i){return typeof i=="function"?i(t):i}function Sc(t){var i=sn();return Qf(i,Vt,t)}function Qf(t,i,s){var l=t.queue;if(l===null)throw Error(r(311));l.lastRenderedReducer=s;var u=t.baseQueue,d=l.pending;if(d!==null){if(u!==null){var _=u.next;u.next=d.next,d.next=_}i.baseQueue=u=d,l.pending=null}if(d=t.baseState,u===null)t.memoizedState=d;else{i=u.next;var T=_=null,B=null,$=i,de=!1;do{var ge=$.lane&-536870913;if(ge!==$.lane?(yt&ge)===ge:(ta&ge)===ge){var ae=$.revertLane;if(ae===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null}),ge===ds&&(de=!0);else if((ta&ae)===ae){$=$.next,ae===ds&&(de=!0);continue}else ge={lane:0,revertLane:$.revertLane,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},B===null?(T=B=ge,_=d):B=B.next=ge,ut.lanes|=ae,Xa|=ae;ge=$.action,Rr&&s(d,ge),d=$.hasEagerState?$.eagerState:s(d,ge)}else ae={lane:ge,revertLane:$.revertLane,gesture:$.gesture,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},B===null?(T=B=ae,_=d):B=B.next=ae,ut.lanes|=ge,Xa|=ge;$=$.next}while($!==null&&$!==i);if(B===null?_=d:B.next=T,!Jn(d,t.memoizedState)&&(hn=!0,de&&(s=hs,s!==null)))throw s;t.memoizedState=d,t.baseState=_,t.baseQueue=B,l.lastRenderedState=d}return u===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Jf(t){var i=sn(),s=i.queue;if(s===null)throw Error(r(311));s.lastRenderedReducer=t;var l=s.dispatch,u=s.pending,d=i.memoizedState;if(u!==null){s.pending=null;var _=u=u.next;do d=t(d,_.action),_=_.next;while(_!==u);Jn(d,i.memoizedState)||(hn=!0),i.memoizedState=d,i.baseQueue===null&&(i.baseState=d),s.lastRenderedState=d}return[d,l]}function w0(t,i,s){var l=ut,u=sn(),d=At;if(d){if(s===void 0)throw Error(r(407));s=s()}else s=i();var _=!Jn((Vt||u).memoizedState,s);if(_&&(u.memoizedState=s,hn=!0),u=u.queue,td(L0.bind(null,l,u,t),[t]),u.getSnapshot!==i||_||dn!==null&&dn.memoizedState.tag&1){if(l.flags|=2048,_s(9,{destroy:void 0},D0.bind(null,l,u,s,i),null),jt===null)throw Error(r(349));d||(ta&127)!==0||C0(l,i,s)}return s}function C0(t,i,s){t.flags|=16384,t={getSnapshot:i,value:s},i=ut.updateQueue,i===null?(i=vc(),ut.updateQueue=i,i.stores=[t]):(s=i.stores,s===null?i.stores=[t]:s.push(t))}function D0(t,i,s,l){i.value=s,i.getSnapshot=l,U0(i)&&N0(t)}function L0(t,i,s){return s(function(){U0(i)&&N0(t)})}function U0(t){var i=t.getSnapshot;t=t.value;try{var s=i();return!Jn(t,s)}catch{return!0}}function N0(t){var i=vr(t,2);i!==null&&jn(i,t,2)}function $f(t){var i=In();if(typeof t=="function"){var s=t;if(t=s(),Rr){Ke(!0);try{s()}finally{Ke(!1)}}}return i.memoizedState=i.baseState=t,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:t},i}function O0(t,i,s,l){return t.baseState=s,Qf(t,Vt,typeof l=="function"?l:na)}function cb(t,i,s,l,u){if(Mc(t))throw Error(r(485));if(t=i.action,t!==null){var d={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){d.listeners.push(_)}};P.T!==null?s(!0):d.isTransition=!1,l(d),s=i.pending,s===null?(d.next=i.pending=d,F0(i,d)):(d.next=s.next,i.pending=s.next=d)}}function F0(t,i){var s=i.action,l=i.payload,u=t.state;if(i.isTransition){var d=P.T,_={};P.T=_;try{var T=s(u,l),B=P.S;B!==null&&B(_,T),P0(t,i,T)}catch($){ed(t,i,$)}finally{d!==null&&_.types!==null&&(d.types=_.types),P.T=d}}else try{d=s(u,l),P0(t,i,d)}catch($){ed(t,i,$)}}function P0(t,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(l){z0(t,i,l)},function(l){return ed(t,i,l)}):z0(t,i,s)}function z0(t,i,s){i.status="fulfilled",i.value=s,B0(i),t.state=s,i=t.pending,i!==null&&(s=i.next,s===i?t.pending=null:(s=s.next,i.next=s,F0(t,s)))}function ed(t,i,s){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do i.status="rejected",i.reason=s,B0(i),i=i.next;while(i!==l)}t.action=null}function B0(t){t=t.listeners;for(var i=0;i<t.length;i++)(0,t[i])()}function I0(t,i){return i}function G0(t,i){if(At){var s=jt.formState;if(s!==null){e:{var l=ut;if(At){if(Qt){t:{for(var u=Qt,d=xi;u.nodeType!==8;){if(!d){u=null;break t}if(u=vi(u.nextSibling),u===null){u=null;break t}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){Qt=vi(u.nextSibling),l=u.data==="F!";break e}}Fa(l)}l=!1}l&&(i=s[0])}}return s=In(),s.memoizedState=s.baseState=i,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:I0,lastRenderedState:i},s.queue=l,s=rx.bind(null,ut,l),l.dispatch=s,l=$f(!1),d=sd.bind(null,ut,!1,l.queue),l=In(),u={state:i,dispatch:null,action:t,pending:null},l.queue=u,s=cb.bind(null,ut,u,d,s),u.dispatch=s,l.memoizedState=t,[i,s,!1]}function H0(t){var i=sn();return V0(i,Vt,t)}function V0(t,i,s){if(i=Qf(t,i,I0)[0],t=Sc(na)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var l=jo(i)}catch(_){throw _===ps?uc:_}else l=i;i=sn();var u=i.queue,d=u.dispatch;return s!==i.memoizedState&&(ut.flags|=2048,_s(9,{destroy:void 0},ub.bind(null,u,s),null)),[l,d,t]}function ub(t,i){t.action=i}function k0(t){var i=sn(),s=Vt;if(s!==null)return V0(i,s,t);sn(),i=i.memoizedState,s=sn();var l=s.queue.dispatch;return s.memoizedState=t,[i,l,!1]}function _s(t,i,s,l){return t={tag:t,create:s,deps:l,inst:i,next:null},i=ut.updateQueue,i===null&&(i=vc(),ut.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=t.next=t:(l=s.next,s.next=t,t.next=l,i.lastEffect=t),t}function X0(){return sn().memoizedState}function yc(t,i,s,l){var u=In();ut.flags|=t,u.memoizedState=_s(1|i,{destroy:void 0},s,l===void 0?null:l)}function bc(t,i,s,l){var u=sn();l=l===void 0?null:l;var d=u.memoizedState.inst;Vt!==null&&l!==null&&Wf(l,Vt.memoizedState.deps)?u.memoizedState=_s(i,d,s,l):(ut.flags|=t,u.memoizedState=_s(1|i,d,s,l))}function W0(t,i){yc(8390656,8,t,i)}function td(t,i){bc(2048,8,t,i)}function fb(t){ut.flags|=4;var i=ut.updateQueue;if(i===null)i=vc(),ut.updateQueue=i,i.events=[t];else{var s=i.events;s===null?i.events=[t]:s.push(t)}}function q0(t){var i=sn().memoizedState;return fb({ref:i,nextImpl:t}),function(){if((Ot&2)!==0)throw Error(r(440));return i.impl.apply(void 0,arguments)}}function Y0(t,i){return bc(4,2,t,i)}function j0(t,i){return bc(4,4,t,i)}function K0(t,i){if(typeof i=="function"){t=t();var s=i(t);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function Z0(t,i,s){s=s!=null?s.concat([t]):null,bc(4,4,K0.bind(null,i,t),s)}function nd(){}function Q0(t,i){var s=sn();i=i===void 0?null:i;var l=s.memoizedState;return i!==null&&Wf(i,l[1])?l[0]:(s.memoizedState=[t,i],t)}function J0(t,i){var s=sn();i=i===void 0?null:i;var l=s.memoizedState;if(i!==null&&Wf(i,l[1]))return l[0];if(l=t(),Rr){Ke(!0);try{t()}finally{Ke(!1)}}return s.memoizedState=[l,i],l}function id(t,i,s){return s===void 0||(ta&1073741824)!==0&&(yt&261930)===0?t.memoizedState=i:(t.memoizedState=s,t=$x(),ut.lanes|=t,Xa|=t,s)}function $0(t,i,s,l){return Jn(s,i)?s:xs.current!==null?(t=id(t,s,l),Jn(t,i)||(hn=!0),t):(ta&42)===0||(ta&1073741824)!==0&&(yt&261930)===0?(hn=!0,t.memoizedState=s):(t=$x(),ut.lanes|=t,Xa|=t,i)}function ex(t,i,s,l,u){var d=te.p;te.p=d!==0&&8>d?d:8;var _=P.T,T={};P.T=T,sd(t,!1,i,s);try{var B=u(),$=P.S;if($!==null&&$(T,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var de=sb(B,l);Ko(t,i,de,ai(t))}else Ko(t,i,l,ai(t))}catch(ge){Ko(t,i,{then:function(){},status:"rejected",reason:ge},ai())}finally{te.p=d,_!==null&&T.types!==null&&(_.types=T.types),P.T=_}}function db(){}function ad(t,i,s,l){if(t.tag!==5)throw Error(r(476));var u=tx(t).queue;ex(t,u,i,j,s===null?db:function(){return nx(t),s(l)})}function tx(t){var i=t.memoizedState;if(i!==null)return i;i={memoizedState:j,baseState:j,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:j},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:na,lastRenderedState:s},next:null},t.memoizedState=i,t=t.alternate,t!==null&&(t.memoizedState=i),i}function nx(t){var i=tx(t);i.next===null&&(i=t.alternate.memoizedState),Ko(t,i.next.queue,{},ai())}function rd(){return Ln(dl)}function ix(){return sn().memoizedState}function ax(){return sn().memoizedState}function hb(t){for(var i=t.return;i!==null;){switch(i.tag){case 24:case 3:var s=ai();t=Ba(s);var l=Ia(i,t,s);l!==null&&(jn(l,i,s),Xo(l,i,s)),i={cache:Of()},t.payload=i;return}i=i.return}}function pb(t,i,s){var l=ai();s={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Mc(t)?sx(i,s):(s=Mf(t,i,s,l),s!==null&&(jn(s,t,l),ox(s,i,l)))}function rx(t,i,s){var l=ai();Ko(t,i,s,l)}function Ko(t,i,s,l){var u={lane:l,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Mc(t))sx(i,u);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=i.lastRenderedReducer,d!==null))try{var _=i.lastRenderedState,T=d(_,s);if(u.hasEagerState=!0,u.eagerState=T,Jn(T,_))return ic(t,i,u,0),jt===null&&nc(),!1}catch{}finally{}if(s=Mf(t,i,u,l),s!==null)return jn(s,t,l),ox(s,i,l),!0}return!1}function sd(t,i,s,l){if(l={lane:2,revertLane:Bd(),gesture:null,action:l,hasEagerState:!1,eagerState:null,next:null},Mc(t)){if(i)throw Error(r(479))}else i=Mf(t,s,l,2),i!==null&&jn(i,t,2)}function Mc(t){var i=t.alternate;return t===ut||i!==null&&i===ut}function sx(t,i){gs=xc=!0;var s=t.pending;s===null?i.next=i:(i.next=s.next,s.next=i),t.pending=i}function ox(t,i,s){if((s&4194048)!==0){var l=i.lanes;l&=t.pendingLanes,s|=l,i.lanes=s,Eo(t,s)}}var Zo={readContext:Ln,use:_c,useCallback:en,useContext:en,useEffect:en,useImperativeHandle:en,useLayoutEffect:en,useInsertionEffect:en,useMemo:en,useReducer:en,useRef:en,useState:en,useDebugValue:en,useDeferredValue:en,useTransition:en,useSyncExternalStore:en,useId:en,useHostTransitionStatus:en,useFormState:en,useActionState:en,useOptimistic:en,useMemoCache:en,useCacheRefresh:en};Zo.useEffectEvent=en;var lx={readContext:Ln,use:_c,useCallback:function(t,i){return In().memoizedState=[t,i===void 0?null:i],t},useContext:Ln,useEffect:W0,useImperativeHandle:function(t,i,s){s=s!=null?s.concat([t]):null,yc(4194308,4,K0.bind(null,i,t),s)},useLayoutEffect:function(t,i){return yc(4194308,4,t,i)},useInsertionEffect:function(t,i){yc(4,2,t,i)},useMemo:function(t,i){var s=In();i=i===void 0?null:i;var l=t();if(Rr){Ke(!0);try{t()}finally{Ke(!1)}}return s.memoizedState=[l,i],l},useReducer:function(t,i,s){var l=In();if(s!==void 0){var u=s(i);if(Rr){Ke(!0);try{s(i)}finally{Ke(!1)}}}else u=i;return l.memoizedState=l.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},l.queue=t,t=t.dispatch=pb.bind(null,ut,t),[l.memoizedState,t]},useRef:function(t){var i=In();return t={current:t},i.memoizedState=t},useState:function(t){t=$f(t);var i=t.queue,s=rx.bind(null,ut,i);return i.dispatch=s,[t.memoizedState,s]},useDebugValue:nd,useDeferredValue:function(t,i){var s=In();return id(s,t,i)},useTransition:function(){var t=$f(!1);return t=ex.bind(null,ut,t.queue,!0,!1),In().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,i,s){var l=ut,u=In();if(At){if(s===void 0)throw Error(r(407));s=s()}else{if(s=i(),jt===null)throw Error(r(349));(yt&127)!==0||C0(l,i,s)}u.memoizedState=s;var d={value:s,getSnapshot:i};return u.queue=d,W0(L0.bind(null,l,d,t),[t]),l.flags|=2048,_s(9,{destroy:void 0},D0.bind(null,l,d,s,i),null),s},useId:function(){var t=In(),i=jt.identifierPrefix;if(At){var s=zi,l=Pi;s=(l&~(1<<32-ke(l)-1)).toString(32)+s,i="_"+i+"R_"+s,s=gc++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=ob++,i="_"+i+"r_"+s.toString(32)+"_";return t.memoizedState=i},useHostTransitionStatus:rd,useFormState:G0,useActionState:G0,useOptimistic:function(t){var i=In();i.memoizedState=i.baseState=t;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=sd.bind(null,ut,!0,s),s.dispatch=i,[t,i]},useMemoCache:Zf,useCacheRefresh:function(){return In().memoizedState=hb.bind(null,ut)},useEffectEvent:function(t){var i=In(),s={impl:t};return i.memoizedState=s,function(){if((Ot&2)!==0)throw Error(r(440));return s.impl.apply(void 0,arguments)}}},od={readContext:Ln,use:_c,useCallback:Q0,useContext:Ln,useEffect:td,useImperativeHandle:Z0,useInsertionEffect:Y0,useLayoutEffect:j0,useMemo:J0,useReducer:Sc,useRef:X0,useState:function(){return Sc(na)},useDebugValue:nd,useDeferredValue:function(t,i){var s=sn();return $0(s,Vt.memoizedState,t,i)},useTransition:function(){var t=Sc(na)[0],i=sn().memoizedState;return[typeof t=="boolean"?t:jo(t),i]},useSyncExternalStore:w0,useId:ix,useHostTransitionStatus:rd,useFormState:H0,useActionState:H0,useOptimistic:function(t,i){var s=sn();return O0(s,Vt,t,i)},useMemoCache:Zf,useCacheRefresh:ax};od.useEffectEvent=q0;var cx={readContext:Ln,use:_c,useCallback:Q0,useContext:Ln,useEffect:td,useImperativeHandle:Z0,useInsertionEffect:Y0,useLayoutEffect:j0,useMemo:J0,useReducer:Jf,useRef:X0,useState:function(){return Jf(na)},useDebugValue:nd,useDeferredValue:function(t,i){var s=sn();return Vt===null?id(s,t,i):$0(s,Vt.memoizedState,t,i)},useTransition:function(){var t=Jf(na)[0],i=sn().memoizedState;return[typeof t=="boolean"?t:jo(t),i]},useSyncExternalStore:w0,useId:ix,useHostTransitionStatus:rd,useFormState:k0,useActionState:k0,useOptimistic:function(t,i){var s=sn();return Vt!==null?O0(s,Vt,t,i):(s.baseState=t,[t,s.queue.dispatch])},useMemoCache:Zf,useCacheRefresh:ax};cx.useEffectEvent=q0;function ld(t,i,s,l){i=t.memoizedState,s=s(l,i),s=s==null?i:g({},i,s),t.memoizedState=s,t.lanes===0&&(t.updateQueue.baseState=s)}var cd={enqueueSetState:function(t,i,s){t=t._reactInternals;var l=ai(),u=Ba(l);u.payload=i,s!=null&&(u.callback=s),i=Ia(t,u,l),i!==null&&(jn(i,t,l),Xo(i,t,l))},enqueueReplaceState:function(t,i,s){t=t._reactInternals;var l=ai(),u=Ba(l);u.tag=1,u.payload=i,s!=null&&(u.callback=s),i=Ia(t,u,l),i!==null&&(jn(i,t,l),Xo(i,t,l))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var s=ai(),l=Ba(s);l.tag=2,i!=null&&(l.callback=i),i=Ia(t,l,s),i!==null&&(jn(i,t,s),Xo(i,t,s))}};function ux(t,i,s,l,u,d,_){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,d,_):i.prototype&&i.prototype.isPureReactComponent?!Po(s,l)||!Po(u,d):!0}function fx(t,i,s,l){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,l),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,l),i.state!==t&&cd.enqueueReplaceState(i,i.state,null)}function wr(t,i){var s=i;if("ref"in i){s={};for(var l in i)l!=="ref"&&(s[l]=i[l])}if(t=t.defaultProps){s===i&&(s=g({},s));for(var u in t)s[u]===void 0&&(s[u]=t[u])}return s}function dx(t){tc(t)}function hx(t){console.error(t)}function px(t){tc(t)}function Ec(t,i){try{var s=t.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(l){setTimeout(function(){throw l})}}function mx(t,i,s){try{var l=t.onCaughtError;l(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function ud(t,i,s){return s=Ba(s),s.tag=3,s.payload={element:null},s.callback=function(){Ec(t,i)},s}function xx(t){return t=Ba(t),t.tag=3,t}function gx(t,i,s,l){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var d=l.value;t.payload=function(){return u(d)},t.callback=function(){mx(i,s,l)}}var _=s.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(t.callback=function(){mx(i,s,l),typeof u!="function"&&(Wa===null?Wa=new Set([this]):Wa.add(this));var T=l.stack;this.componentDidCatch(l.value,{componentStack:T!==null?T:""})})}function mb(t,i,s,l,u){if(s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(i=s.alternate,i!==null&&fs(i,s,u,!0),s=ei.current,s!==null){switch(s.tag){case 31:case 13:return gi===null?Pc():s.alternate===null&&tn===0&&(tn=3),s.flags&=-257,s.flags|=65536,s.lanes=u,l===fc?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([l]):i.add(l),Fd(t,l,u)),!1;case 22:return s.flags|=65536,l===fc?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([l])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([l]):s.add(l)),Fd(t,l,u)),!1}throw Error(r(435,s.tag))}return Fd(t,l,u),Pc(),!1}if(At)return i=ei.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,l!==Cf&&(t=Error(r(422),{cause:l}),Io(hi(t,s)))):(l!==Cf&&(i=Error(r(423),{cause:l}),Io(hi(i,s))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,l=hi(l,s),u=ud(t.stateNode,l,u),Gf(t,u),tn!==4&&(tn=2)),!1;var d=Error(r(520),{cause:l});if(d=hi(d,s),al===null?al=[d]:al.push(d),tn!==4&&(tn=2),i===null)return!0;l=hi(l,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,t=u&-u,s.lanes|=t,t=ud(s.stateNode,l,t),Gf(s,t),!1;case 1:if(i=s.type,d=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(Wa===null||!Wa.has(d))))return s.flags|=65536,u&=-u,s.lanes|=u,u=xx(u),gx(u,t,s,l),Gf(s,u),!1}s=s.return}while(s!==null);return!1}var fd=Error(r(461)),hn=!1;function Un(t,i,s,l){i.child=t===null?y0(i,null,s,l):Ar(i,t.child,s,l)}function vx(t,i,s,l,u){s=s.render;var d=i.ref;if("ref"in l){var _={};for(var T in l)T!=="ref"&&(_[T]=l[T])}else _=l;return br(i),l=qf(t,i,s,_,d,u),T=Yf(),t!==null&&!hn?(jf(t,i,u),ia(t,i,u)):(At&&T&&Rf(i),i.flags|=1,Un(t,i,l,u),i.child)}function _x(t,i,s,l,u){if(t===null){var d=s.type;return typeof d=="function"&&!Ef(d)&&d.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=d,Sx(t,i,d,l,u)):(t=rc(s.type,null,l,i,i.mode,u),t.ref=i.ref,t.return=i,i.child=t)}if(d=t.child,!_d(t,u)){var _=d.memoizedProps;if(s=s.compare,s=s!==null?s:Po,s(_,l)&&t.ref===i.ref)return ia(t,i,u)}return i.flags|=1,t=Qi(d,l),t.ref=i.ref,t.return=i,i.child=t}function Sx(t,i,s,l,u){if(t!==null){var d=t.memoizedProps;if(Po(d,l)&&t.ref===i.ref)if(hn=!1,i.pendingProps=l=d,_d(t,u))(t.flags&131072)!==0&&(hn=!0);else return i.lanes=t.lanes,ia(t,i,u)}return dd(t,i,s,l,u)}function yx(t,i,s,l){var u=l.children,d=t!==null?t.memoizedState:null;if(t===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),l.mode==="hidden"){if((i.flags&128)!==0){if(d=d!==null?d.baseLanes|s:s,t!==null){for(l=i.child=t.child,u=0;l!==null;)u=u|l.lanes|l.childLanes,l=l.sibling;l=u&~d}else l=0,i.child=null;return bx(t,i,d,s,l)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},t!==null&&cc(i,d!==null?d.cachePool:null),d!==null?E0(i,d):Vf(),T0(i);else return l=i.lanes=536870912,bx(t,i,d!==null?d.baseLanes|s:s,s,l)}else d!==null?(cc(i,d.cachePool),E0(i,d),Ha(),i.memoizedState=null):(t!==null&&cc(i,null),Vf(),Ha());return Un(t,i,u,s),i.child}function Qo(t,i){return t!==null&&t.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function bx(t,i,s,l,u){var d=Pf();return d=d===null?null:{parent:fn._currentValue,pool:d},i.memoizedState={baseLanes:s,cachePool:d},t!==null&&cc(i,null),Vf(),T0(i),t!==null&&fs(t,i,l,!0),i.childLanes=u,null}function Tc(t,i){return i=Rc({mode:i.mode,children:i.children},t.mode),i.ref=t.ref,t.child=i,i.return=t,i}function Mx(t,i,s){return Ar(i,t.child,null,s),t=Tc(i,i.pendingProps),t.flags|=2,ti(i),i.memoizedState=null,t}function xb(t,i,s){var l=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,t===null){if(At){if(l.mode==="hidden")return t=Tc(i,l),i.lanes=536870912,Qo(null,t);if(Xf(i),(t=Qt)?(t=Fg(t,xi),t=t!==null&&t.data==="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:Na!==null?{id:Pi,overflow:zi}:null,retryLane:536870912,hydrationErrors:null},s=s0(t),s.return=i,i.child=s,Dn=i,Qt=null)):t=null,t===null)throw Fa(i);return i.lanes=536870912,null}return Tc(i,l)}var d=t.memoizedState;if(d!==null){var _=d.dehydrated;if(Xf(i),u)if(i.flags&256)i.flags&=-257,i=Mx(t,i,s);else if(i.memoizedState!==null)i.child=t.child,i.flags|=128,i=null;else throw Error(r(558));else if(hn||fs(t,i,s,!1),u=(s&t.childLanes)!==0,hn||u){if(l=jt,l!==null&&(_=To(l,s),_!==0&&_!==d.retryLane))throw d.retryLane=_,vr(t,_),jn(l,t,_),fd;Pc(),i=Mx(t,i,s)}else t=d.treeContext,Qt=vi(_.nextSibling),Dn=i,At=!0,Oa=null,xi=!1,t!==null&&c0(i,t),i=Tc(i,l),i.flags|=4096;return i}return t=Qi(t.child,{mode:l.mode,children:l.children}),t.ref=i.ref,i.child=t,t.return=i,t}function Ac(t,i){var s=i.ref;if(s===null)t!==null&&t.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(r(284));(t===null||t.ref!==s)&&(i.flags|=4194816)}}function dd(t,i,s,l,u){return br(i),s=qf(t,i,s,l,void 0,u),l=Yf(),t!==null&&!hn?(jf(t,i,u),ia(t,i,u)):(At&&l&&Rf(i),i.flags|=1,Un(t,i,s,u),i.child)}function Ex(t,i,s,l,u,d){return br(i),i.updateQueue=null,s=R0(i,l,s,u),A0(t),l=Yf(),t!==null&&!hn?(jf(t,i,d),ia(t,i,d)):(At&&l&&Rf(i),i.flags|=1,Un(t,i,s,d),i.child)}function Tx(t,i,s,l,u){if(br(i),i.stateNode===null){var d=os,_=s.contextType;typeof _=="object"&&_!==null&&(d=Ln(_)),d=new s(l,d),i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=cd,i.stateNode=d,d._reactInternals=i,d=i.stateNode,d.props=l,d.state=i.memoizedState,d.refs={},Bf(i),_=s.contextType,d.context=typeof _=="object"&&_!==null?Ln(_):os,d.state=i.memoizedState,_=s.getDerivedStateFromProps,typeof _=="function"&&(ld(i,s,_,l),d.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(_=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),_!==d.state&&cd.enqueueReplaceState(d,d.state,null),qo(i,l,d,u),Wo(),d.state=i.memoizedState),typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!0}else if(t===null){d=i.stateNode;var T=i.memoizedProps,B=wr(s,T);d.props=B;var $=d.context,de=s.contextType;_=os,typeof de=="object"&&de!==null&&(_=Ln(de));var ge=s.getDerivedStateFromProps;de=typeof ge=="function"||typeof d.getSnapshotBeforeUpdate=="function",T=i.pendingProps!==T,de||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(T||$!==_)&&fx(i,d,l,_),za=!1;var ae=i.memoizedState;d.state=ae,qo(i,l,d,u),Wo(),$=i.memoizedState,T||ae!==$||za?(typeof ge=="function"&&(ld(i,s,ge,l),$=i.memoizedState),(B=za||ux(i,s,B,l,ae,$,_))?(de||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(i.flags|=4194308)):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=l,i.memoizedState=$),d.props=l,d.state=$,d.context=_,l=B):(typeof d.componentDidMount=="function"&&(i.flags|=4194308),l=!1)}else{d=i.stateNode,If(t,i),_=i.memoizedProps,de=wr(s,_),d.props=de,ge=i.pendingProps,ae=d.context,$=s.contextType,B=os,typeof $=="object"&&$!==null&&(B=Ln($)),T=s.getDerivedStateFromProps,($=typeof T=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(_!==ge||ae!==B)&&fx(i,d,l,B),za=!1,ae=i.memoizedState,d.state=ae,qo(i,l,d,u),Wo();var oe=i.memoizedState;_!==ge||ae!==oe||za||t!==null&&t.dependencies!==null&&oc(t.dependencies)?(typeof T=="function"&&(ld(i,s,T,l),oe=i.memoizedState),(de=za||ux(i,s,de,l,ae,oe,B)||t!==null&&t.dependencies!==null&&oc(t.dependencies))?($||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(l,oe,B),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(l,oe,B)),typeof d.componentDidUpdate=="function"&&(i.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof d.componentDidUpdate!="function"||_===t.memoizedProps&&ae===t.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&ae===t.memoizedState||(i.flags|=1024),i.memoizedProps=l,i.memoizedState=oe),d.props=l,d.state=oe,d.context=B,l=de):(typeof d.componentDidUpdate!="function"||_===t.memoizedProps&&ae===t.memoizedState||(i.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&ae===t.memoizedState||(i.flags|=1024),l=!1)}return d=l,Ac(t,i),l=(i.flags&128)!==0,d||l?(d=i.stateNode,s=l&&typeof s.getDerivedStateFromError!="function"?null:d.render(),i.flags|=1,t!==null&&l?(i.child=Ar(i,t.child,null,u),i.child=Ar(i,null,s,u)):Un(t,i,s,u),i.memoizedState=d.state,t=i.child):t=ia(t,i,u),t}function Ax(t,i,s,l){return Sr(),i.flags|=256,Un(t,i,s,l),i.child}var hd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function pd(t){return{baseLanes:t,cachePool:m0()}}function md(t,i,s){return t=t!==null?t.childLanes&~s:0,i&&(t|=ii),t}function Rx(t,i,s){var l=i.pendingProps,u=!1,d=(i.flags&128)!==0,_;if((_=d)||(_=t!==null&&t.memoizedState===null?!1:(rn.current&2)!==0),_&&(u=!0,i.flags&=-129),_=(i.flags&32)!==0,i.flags&=-33,t===null){if(At){if(u?Ga(i):Ha(),(t=Qt)?(t=Fg(t,xi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(i.memoizedState={dehydrated:t,treeContext:Na!==null?{id:Pi,overflow:zi}:null,retryLane:536870912,hydrationErrors:null},s=s0(t),s.return=i,i.child=s,Dn=i,Qt=null)):t=null,t===null)throw Fa(i);return Qd(t)?i.lanes=32:i.lanes=536870912,null}var T=l.children;return l=l.fallback,u?(Ha(),u=i.mode,T=Rc({mode:"hidden",children:T},u),l=_r(l,u,s,null),T.return=i,l.return=i,T.sibling=l,i.child=T,l=i.child,l.memoizedState=pd(s),l.childLanes=md(t,_,s),i.memoizedState=hd,Qo(null,l)):(Ga(i),xd(i,T))}var B=t.memoizedState;if(B!==null&&(T=B.dehydrated,T!==null)){if(d)i.flags&256?(Ga(i),i.flags&=-257,i=gd(t,i,s)):i.memoizedState!==null?(Ha(),i.child=t.child,i.flags|=128,i=null):(Ha(),T=l.fallback,u=i.mode,l=Rc({mode:"visible",children:l.children},u),T=_r(T,u,s,null),T.flags|=2,l.return=i,T.return=i,l.sibling=T,i.child=l,Ar(i,t.child,null,s),l=i.child,l.memoizedState=pd(s),l.childLanes=md(t,_,s),i.memoizedState=hd,i=Qo(null,l));else if(Ga(i),Qd(T)){if(_=T.nextSibling&&T.nextSibling.dataset,_)var $=_.dgst;_=$,l=Error(r(419)),l.stack="",l.digest=_,Io({value:l,source:null,stack:null}),i=gd(t,i,s)}else if(hn||fs(t,i,s,!1),_=(s&t.childLanes)!==0,hn||_){if(_=jt,_!==null&&(l=To(_,s),l!==0&&l!==B.retryLane))throw B.retryLane=l,vr(t,l),jn(_,t,l),fd;Zd(T)||Pc(),i=gd(t,i,s)}else Zd(T)?(i.flags|=192,i.child=t.child,i=null):(t=B.treeContext,Qt=vi(T.nextSibling),Dn=i,At=!0,Oa=null,xi=!1,t!==null&&c0(i,t),i=xd(i,l.children),i.flags|=4096);return i}return u?(Ha(),T=l.fallback,u=i.mode,B=t.child,$=B.sibling,l=Qi(B,{mode:"hidden",children:l.children}),l.subtreeFlags=B.subtreeFlags&65011712,$!==null?T=Qi($,T):(T=_r(T,u,s,null),T.flags|=2),T.return=i,l.return=i,l.sibling=T,i.child=l,Qo(null,l),l=i.child,T=t.child.memoizedState,T===null?T=pd(s):(u=T.cachePool,u!==null?(B=fn._currentValue,u=u.parent!==B?{parent:B,pool:B}:u):u=m0(),T={baseLanes:T.baseLanes|s,cachePool:u}),l.memoizedState=T,l.childLanes=md(t,_,s),i.memoizedState=hd,Qo(t.child,l)):(Ga(i),s=t.child,t=s.sibling,s=Qi(s,{mode:"visible",children:l.children}),s.return=i,s.sibling=null,t!==null&&(_=i.deletions,_===null?(i.deletions=[t],i.flags|=16):_.push(t)),i.child=s,i.memoizedState=null,s)}function xd(t,i){return i=Rc({mode:"visible",children:i},t.mode),i.return=t,t.child=i}function Rc(t,i){return t=$n(22,t,null,i),t.lanes=0,t}function gd(t,i,s){return Ar(i,t.child,null,s),t=xd(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function wx(t,i,s){t.lanes|=i;var l=t.alternate;l!==null&&(l.lanes|=i),Uf(t.return,i,s)}function vd(t,i,s,l,u,d){var _=t.memoizedState;_===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:l,tail:s,tailMode:u,treeForkCount:d}:(_.isBackwards=i,_.rendering=null,_.renderingStartTime=0,_.last=l,_.tail=s,_.tailMode=u,_.treeForkCount=d)}function Cx(t,i,s){var l=i.pendingProps,u=l.revealOrder,d=l.tail;l=l.children;var _=rn.current,T=(_&2)!==0;if(T?(_=_&1|2,i.flags|=128):_&=1,ye(rn,_),Un(t,i,l,s),l=At?Bo:0,!T&&t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&wx(t,s,i);else if(t.tag===19)wx(t,s,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(s=i.child,u=null;s!==null;)t=s.alternate,t!==null&&mc(t)===null&&(u=s),s=s.sibling;s=u,s===null?(u=i.child,i.child=null):(u=s.sibling,s.sibling=null),vd(i,!1,u,s,d,l);break;case"backwards":case"unstable_legacy-backwards":for(s=null,u=i.child,i.child=null;u!==null;){if(t=u.alternate,t!==null&&mc(t)===null){i.child=u;break}t=u.sibling,u.sibling=s,s=u,u=t}vd(i,!0,s,null,d,l);break;case"together":vd(i,!1,null,null,void 0,l);break;default:i.memoizedState=null}return i.child}function ia(t,i,s){if(t!==null&&(i.dependencies=t.dependencies),Xa|=i.lanes,(s&i.childLanes)===0)if(t!==null){if(fs(t,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(t!==null&&i.child!==t.child)throw Error(r(153));if(i.child!==null){for(t=i.child,s=Qi(t,t.pendingProps),i.child=s,s.return=i;t.sibling!==null;)t=t.sibling,s=s.sibling=Qi(t,t.pendingProps),s.return=i;s.sibling=null}return i.child}function _d(t,i){return(t.lanes&i)!==0?!0:(t=t.dependencies,!!(t!==null&&oc(t)))}function gb(t,i,s){switch(i.tag){case 3:we(i,i.stateNode.containerInfo),Pa(i,fn,t.memoizedState.cache),Sr();break;case 27:case 5:We(i);break;case 4:we(i,i.stateNode.containerInfo);break;case 10:Pa(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,Xf(i),null;break;case 13:var l=i.memoizedState;if(l!==null)return l.dehydrated!==null?(Ga(i),i.flags|=128,null):(s&i.child.childLanes)!==0?Rx(t,i,s):(Ga(i),t=ia(t,i,s),t!==null?t.sibling:null);Ga(i);break;case 19:var u=(t.flags&128)!==0;if(l=(s&i.childLanes)!==0,l||(fs(t,i,s,!1),l=(s&i.childLanes)!==0),u){if(l)return Cx(t,i,s);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),ye(rn,rn.current),l)break;return null;case 22:return i.lanes=0,yx(t,i,s,i.pendingProps);case 24:Pa(i,fn,t.memoizedState.cache)}return ia(t,i,s)}function Dx(t,i,s){if(t!==null)if(t.memoizedProps!==i.pendingProps)hn=!0;else{if(!_d(t,s)&&(i.flags&128)===0)return hn=!1,gb(t,i,s);hn=(t.flags&131072)!==0}else hn=!1,At&&(i.flags&1048576)!==0&&l0(i,Bo,i.index);switch(i.lanes=0,i.tag){case 16:e:{var l=i.pendingProps;if(t=Er(i.elementType),i.type=t,typeof t=="function")Ef(t)?(l=wr(t,l),i.tag=1,i=Tx(null,i,t,l,s)):(i.tag=0,i=dd(null,i,t,l,s));else{if(t!=null){var u=t.$$typeof;if(u===D){i.tag=11,i=vx(null,i,t,l,s);break e}else if(u===F){i.tag=14,i=_x(null,i,t,l,s);break e}}throw i=fe(t)||t,Error(r(306,i,""))}}return i;case 0:return dd(t,i,i.type,i.pendingProps,s);case 1:return l=i.type,u=wr(l,i.pendingProps),Tx(t,i,l,u,s);case 3:e:{if(we(i,i.stateNode.containerInfo),t===null)throw Error(r(387));l=i.pendingProps;var d=i.memoizedState;u=d.element,If(t,i),qo(i,l,null,s);var _=i.memoizedState;if(l=_.cache,Pa(i,fn,l),l!==d.cache&&Nf(i,[fn],s,!0),Wo(),l=_.element,d.isDehydrated)if(d={element:l,isDehydrated:!1,cache:_.cache},i.updateQueue.baseState=d,i.memoizedState=d,i.flags&256){i=Ax(t,i,l,s);break e}else if(l!==u){u=hi(Error(r(424)),i),Io(u),i=Ax(t,i,l,s);break e}else{switch(t=i.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Qt=vi(t.firstChild),Dn=i,At=!0,Oa=null,xi=!0,s=y0(i,null,l,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(Sr(),l===u){i=ia(t,i,s);break e}Un(t,i,l,s)}i=i.child}return i;case 26:return Ac(t,i),t===null?(s=Hg(i.type,null,i.pendingProps,null))?i.memoizedState=s:At||(s=i.type,t=i.pendingProps,l=kc(ie.current).createElement(s),l[un]=i,l[xn]=t,Nn(l,s,t),ee(l),i.stateNode=l):i.memoizedState=Hg(i.type,t.memoizedProps,i.pendingProps,t.memoizedState),null;case 27:return We(i),t===null&&At&&(l=i.stateNode=Bg(i.type,i.pendingProps,ie.current),Dn=i,xi=!0,u=Qt,Ka(i.type)?(Jd=u,Qt=vi(l.firstChild)):Qt=u),Un(t,i,i.pendingProps.children,s),Ac(t,i),t===null&&(i.flags|=4194304),i.child;case 5:return t===null&&At&&((u=l=Qt)&&(l=Yb(l,i.type,i.pendingProps,xi),l!==null?(i.stateNode=l,Dn=i,Qt=vi(l.firstChild),xi=!1,u=!0):u=!1),u||Fa(i)),We(i),u=i.type,d=i.pendingProps,_=t!==null?t.memoizedProps:null,l=d.children,Yd(u,d)?l=null:_!==null&&Yd(u,_)&&(i.flags|=32),i.memoizedState!==null&&(u=qf(t,i,lb,null,null,s),dl._currentValue=u),Ac(t,i),Un(t,i,l,s),i.child;case 6:return t===null&&At&&((t=s=Qt)&&(s=jb(s,i.pendingProps,xi),s!==null?(i.stateNode=s,Dn=i,Qt=null,t=!0):t=!1),t||Fa(i)),null;case 13:return Rx(t,i,s);case 4:return we(i,i.stateNode.containerInfo),l=i.pendingProps,t===null?i.child=Ar(i,null,l,s):Un(t,i,l,s),i.child;case 11:return vx(t,i,i.type,i.pendingProps,s);case 7:return Un(t,i,i.pendingProps,s),i.child;case 8:return Un(t,i,i.pendingProps.children,s),i.child;case 12:return Un(t,i,i.pendingProps.children,s),i.child;case 10:return l=i.pendingProps,Pa(i,i.type,l.value),Un(t,i,l.children,s),i.child;case 9:return u=i.type._context,l=i.pendingProps.children,br(i),u=Ln(u),l=l(u),i.flags|=1,Un(t,i,l,s),i.child;case 14:return _x(t,i,i.type,i.pendingProps,s);case 15:return Sx(t,i,i.type,i.pendingProps,s);case 19:return Cx(t,i,s);case 31:return xb(t,i,s);case 22:return yx(t,i,s,i.pendingProps);case 24:return br(i),l=Ln(fn),t===null?(u=Pf(),u===null&&(u=jt,d=Of(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=s),u=d),i.memoizedState={parent:l,cache:u},Bf(i),Pa(i,fn,u)):((t.lanes&s)!==0&&(If(t,i),qo(i,null,null,s),Wo()),u=t.memoizedState,d=i.memoizedState,u.parent!==l?(u={parent:l,cache:l},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),Pa(i,fn,l)):(l=d.cache,Pa(i,fn,l),l!==u.cache&&Nf(i,[fn],s,!0))),Un(t,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(r(156,i.tag))}function aa(t){t.flags|=4}function Sd(t,i,s,l,u){if((i=(t.mode&32)!==0)&&(i=!1),i){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(ig())t.flags|=8192;else throw Tr=fc,zf}else t.flags&=-16777217}function Lx(t,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!qg(i))if(ig())t.flags|=8192;else throw Tr=fc,zf}function wc(t,i){i!==null&&(t.flags|=4),t.flags&16384&&(i=t.tag!==22?Ht():536870912,t.lanes|=i,Ms|=i)}function Jo(t,i){if(!At)switch(t.tailMode){case"hidden":i=t.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?t.tail=null:s.sibling=null;break;case"collapsed":s=t.tail;for(var l=null;s!==null;)s.alternate!==null&&(l=s),s=s.sibling;l===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function Jt(t){var i=t.alternate!==null&&t.alternate.child===t.child,s=0,l=0;if(i)for(var u=t.child;u!==null;)s|=u.lanes|u.childLanes,l|=u.subtreeFlags&65011712,l|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)s|=u.lanes|u.childLanes,l|=u.subtreeFlags,l|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=l,t.childLanes=s,i}function vb(t,i,s){var l=i.pendingProps;switch(wf(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Jt(i),null;case 1:return Jt(i),null;case 3:return s=i.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),i.memoizedState.cache!==l&&(i.flags|=2048),ea(fn),He(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(t===null||t.child===null)&&(us(i)?aa(i):t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Df())),Jt(i),null;case 26:var u=i.type,d=i.memoizedState;return t===null?(aa(i),d!==null?(Jt(i),Lx(i,d)):(Jt(i),Sd(i,u,null,l,s))):d?d!==t.memoizedState?(aa(i),Jt(i),Lx(i,d)):(Jt(i),i.flags&=-16777217):(t=t.memoizedProps,t!==l&&aa(i),Jt(i),Sd(i,u,t,l,s)),null;case 27:if(ft(i),s=ie.current,u=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==l&&aa(i);else{if(!l){if(i.stateNode===null)throw Error(r(166));return Jt(i),null}t=Ae.current,us(i)?u0(i):(t=Bg(u,l,s),i.stateNode=t,aa(i))}return Jt(i),null;case 5:if(ft(i),u=i.type,t!==null&&i.stateNode!=null)t.memoizedProps!==l&&aa(i);else{if(!l){if(i.stateNode===null)throw Error(r(166));return Jt(i),null}if(d=Ae.current,us(i))u0(i);else{var _=kc(ie.current);switch(d){case 1:d=_.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=_.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=_.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=_.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof l.is=="string"?_.createElement("select",{is:l.is}):_.createElement("select"),l.multiple?d.multiple=!0:l.size&&(d.size=l.size);break;default:d=typeof l.is=="string"?_.createElement(u,{is:l.is}):_.createElement(u)}}d[un]=i,d[xn]=l;e:for(_=i.child;_!==null;){if(_.tag===5||_.tag===6)d.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===i)break e;for(;_.sibling===null;){if(_.return===null||_.return===i)break e;_=_.return}_.sibling.return=_.return,_=_.sibling}i.stateNode=d;e:switch(Nn(d,u,l),u){case"button":case"input":case"select":case"textarea":l=!!l.autoFocus;break e;case"img":l=!0;break e;default:l=!1}l&&aa(i)}}return Jt(i),Sd(i,i.type,t===null?null:t.memoizedProps,i.pendingProps,s),null;case 6:if(t&&i.stateNode!=null)t.memoizedProps!==l&&aa(i);else{if(typeof l!="string"&&i.stateNode===null)throw Error(r(166));if(t=ie.current,us(i)){if(t=i.stateNode,s=i.memoizedProps,l=null,u=Dn,u!==null)switch(u.tag){case 27:case 5:l=u.memoizedProps}t[un]=i,t=!!(t.nodeValue===s||l!==null&&l.suppressHydrationWarning===!0||Rg(t.nodeValue,s)),t||Fa(i,!0)}else t=kc(t).createTextNode(l),t[un]=i,i.stateNode=t}return Jt(i),null;case 31:if(s=i.memoizedState,t===null||t.memoizedState!==null){if(l=us(i),s!==null){if(t===null){if(!l)throw Error(r(318));if(t=i.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(r(557));t[un]=i}else Sr(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Jt(i),t=!1}else s=Df(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=s),t=!0;if(!t)return i.flags&256?(ti(i),i):(ti(i),null);if((i.flags&128)!==0)throw Error(r(558))}return Jt(i),null;case 13:if(l=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=us(i),l!==null&&l.dehydrated!==null){if(t===null){if(!u)throw Error(r(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[un]=i}else Sr(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Jt(i),u=!1}else u=Df(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(ti(i),i):(ti(i),null)}return ti(i),(i.flags&128)!==0?(i.lanes=s,i):(s=l!==null,t=t!==null&&t.memoizedState!==null,s&&(l=i.child,u=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(u=l.alternate.memoizedState.cachePool.pool),d=null,l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(d=l.memoizedState.cachePool.pool),d!==u&&(l.flags|=2048)),s!==t&&s&&(i.child.flags|=8192),wc(i,i.updateQueue),Jt(i),null);case 4:return He(),t===null&&Vd(i.stateNode.containerInfo),Jt(i),null;case 10:return ea(i.type),Jt(i),null;case 19:if(K(rn),l=i.memoizedState,l===null)return Jt(i),null;if(u=(i.flags&128)!==0,d=l.rendering,d===null)if(u)Jo(l,!1);else{if(tn!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(d=mc(t),d!==null){for(i.flags|=128,Jo(l,!1),t=d.updateQueue,i.updateQueue=t,wc(i,t),i.subtreeFlags=0,t=s,s=i.child;s!==null;)r0(s,t),s=s.sibling;return ye(rn,rn.current&1|2),At&&Ji(i,l.treeForkCount),i.child}t=t.sibling}l.tail!==null&&E()>Nc&&(i.flags|=128,u=!0,Jo(l,!1),i.lanes=4194304)}else{if(!u)if(t=mc(d),t!==null){if(i.flags|=128,u=!0,t=t.updateQueue,i.updateQueue=t,wc(i,t),Jo(l,!0),l.tail===null&&l.tailMode==="hidden"&&!d.alternate&&!At)return Jt(i),null}else 2*E()-l.renderingStartTime>Nc&&s!==536870912&&(i.flags|=128,u=!0,Jo(l,!1),i.lanes=4194304);l.isBackwards?(d.sibling=i.child,i.child=d):(t=l.last,t!==null?t.sibling=d:i.child=d,l.last=d)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=E(),t.sibling=null,s=rn.current,ye(rn,u?s&1|2:s&1),At&&Ji(i,l.treeForkCount),t):(Jt(i),null);case 22:case 23:return ti(i),kf(),l=i.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(i.flags|=8192):l&&(i.flags|=8192),l?(s&536870912)!==0&&(i.flags&128)===0&&(Jt(i),i.subtreeFlags&6&&(i.flags|=8192)):Jt(i),s=i.updateQueue,s!==null&&wc(i,s.retryQueue),s=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),l=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(l=i.memoizedState.cachePool.pool),l!==s&&(i.flags|=2048),t!==null&&K(Mr),null;case 24:return s=null,t!==null&&(s=t.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),ea(fn),Jt(i),null;case 25:return null;case 30:return null}throw Error(r(156,i.tag))}function _b(t,i){switch(wf(i),i.tag){case 1:return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return ea(fn),He(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 26:case 27:case 5:return ft(i),null;case 31:if(i.memoizedState!==null){if(ti(i),i.alternate===null)throw Error(r(340));Sr()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 13:if(ti(i),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(r(340));Sr()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return K(rn),null;case 4:return He(),null;case 10:return ea(i.type),null;case 22:case 23:return ti(i),kf(),t!==null&&K(Mr),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 24:return ea(fn),null;case 25:return null;default:return null}}function Ux(t,i){switch(wf(i),i.tag){case 3:ea(fn),He();break;case 26:case 27:case 5:ft(i);break;case 4:He();break;case 31:i.memoizedState!==null&&ti(i);break;case 13:ti(i);break;case 19:K(rn);break;case 10:ea(i.type);break;case 22:case 23:ti(i),kf(),t!==null&&K(Mr);break;case 24:ea(fn)}}function $o(t,i){try{var s=i.updateQueue,l=s!==null?s.lastEffect:null;if(l!==null){var u=l.next;s=u;do{if((s.tag&t)===t){l=void 0;var d=s.create,_=s.inst;l=d(),_.destroy=l}s=s.next}while(s!==u)}}catch(T){Gt(i,i.return,T)}}function Va(t,i,s){try{var l=i.updateQueue,u=l!==null?l.lastEffect:null;if(u!==null){var d=u.next;l=d;do{if((l.tag&t)===t){var _=l.inst,T=_.destroy;if(T!==void 0){_.destroy=void 0,u=i;var B=s,$=T;try{$()}catch(de){Gt(u,B,de)}}}l=l.next}while(l!==d)}}catch(de){Gt(i,i.return,de)}}function Nx(t){var i=t.updateQueue;if(i!==null){var s=t.stateNode;try{M0(i,s)}catch(l){Gt(t,t.return,l)}}}function Ox(t,i,s){s.props=wr(t.type,t.memoizedProps),s.state=t.memoizedState;try{s.componentWillUnmount()}catch(l){Gt(t,i,l)}}function el(t,i){try{var s=t.ref;if(s!==null){switch(t.tag){case 26:case 27:case 5:var l=t.stateNode;break;case 30:l=t.stateNode;break;default:l=t.stateNode}typeof s=="function"?t.refCleanup=s(l):s.current=l}}catch(u){Gt(t,i,u)}}function Bi(t,i){var s=t.ref,l=t.refCleanup;if(s!==null)if(typeof l=="function")try{l()}catch(u){Gt(t,i,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){Gt(t,i,u)}else s.current=null}function Fx(t){var i=t.type,s=t.memoizedProps,l=t.stateNode;try{e:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&l.focus();break e;case"img":s.src?l.src=s.src:s.srcSet&&(l.srcset=s.srcSet)}}catch(u){Gt(t,t.return,u)}}function yd(t,i,s){try{var l=t.stateNode;Hb(l,t.type,s,i),l[xn]=i}catch(u){Gt(t,t.return,u)}}function Px(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ka(t.type)||t.tag===4}function bd(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Px(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ka(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Md(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(t,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(t),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=Ki));else if(l!==4&&(l===27&&Ka(t.type)&&(s=t.stateNode,i=null),t=t.child,t!==null))for(Md(t,i,s),t=t.sibling;t!==null;)Md(t,i,s),t=t.sibling}function Cc(t,i,s){var l=t.tag;if(l===5||l===6)t=t.stateNode,i?s.insertBefore(t,i):s.appendChild(t);else if(l!==4&&(l===27&&Ka(t.type)&&(s=t.stateNode),t=t.child,t!==null))for(Cc(t,i,s),t=t.sibling;t!==null;)Cc(t,i,s),t=t.sibling}function zx(t){var i=t.stateNode,s=t.memoizedProps;try{for(var l=t.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Nn(i,l,s),i[un]=t,i[xn]=s}catch(d){Gt(t,t.return,d)}}var ra=!1,pn=!1,Ed=!1,Bx=typeof WeakSet=="function"?WeakSet:Set,En=null;function Sb(t,i){if(t=t.containerInfo,Wd=Zc,t=Zm(t),gf(t)){if("selectionStart"in t)var s={start:t.selectionStart,end:t.selectionEnd};else e:{s=(s=t.ownerDocument)&&s.defaultView||window;var l=s.getSelection&&s.getSelection();if(l&&l.rangeCount!==0){s=l.anchorNode;var u=l.anchorOffset,d=l.focusNode;l=l.focusOffset;try{s.nodeType,d.nodeType}catch{s=null;break e}var _=0,T=-1,B=-1,$=0,de=0,ge=t,ae=null;t:for(;;){for(var oe;ge!==s||u!==0&&ge.nodeType!==3||(T=_+u),ge!==d||l!==0&&ge.nodeType!==3||(B=_+l),ge.nodeType===3&&(_+=ge.nodeValue.length),(oe=ge.firstChild)!==null;)ae=ge,ge=oe;for(;;){if(ge===t)break t;if(ae===s&&++$===u&&(T=_),ae===d&&++de===l&&(B=_),(oe=ge.nextSibling)!==null)break;ge=ae,ae=ge.parentNode}ge=oe}s=T===-1||B===-1?null:{start:T,end:B}}else s=null}s=s||{start:0,end:0}}else s=null;for(qd={focusedElem:t,selectionRange:s},Zc=!1,En=i;En!==null;)if(i=En,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,En=t;else for(;En!==null;){switch(i=En,d=i.alternate,t=i.flags,i.tag){case 0:if((t&4)!==0&&(t=i.updateQueue,t=t!==null?t.events:null,t!==null))for(s=0;s<t.length;s++)u=t[s],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,s=i,u=d.memoizedProps,d=d.memoizedState,l=s.stateNode;try{var Ge=wr(s.type,u);t=l.getSnapshotBeforeUpdate(Ge,d),l.__reactInternalSnapshotBeforeUpdate=t}catch(it){Gt(s,s.return,it)}}break;case 3:if((t&1024)!==0){if(t=i.stateNode.containerInfo,s=t.nodeType,s===9)Kd(t);else if(s===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Kd(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(r(163))}if(t=i.sibling,t!==null){t.return=i.return,En=t;break}En=i.return}}function Ix(t,i,s){var l=s.flags;switch(s.tag){case 0:case 11:case 15:oa(t,s),l&4&&$o(5,s);break;case 1:if(oa(t,s),l&4)if(t=s.stateNode,i===null)try{t.componentDidMount()}catch(_){Gt(s,s.return,_)}else{var u=wr(s.type,i.memoizedProps);i=i.memoizedState;try{t.componentDidUpdate(u,i,t.__reactInternalSnapshotBeforeUpdate)}catch(_){Gt(s,s.return,_)}}l&64&&Nx(s),l&512&&el(s,s.return);break;case 3:if(oa(t,s),l&64&&(t=s.updateQueue,t!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{M0(t,i)}catch(_){Gt(s,s.return,_)}}break;case 27:i===null&&l&4&&zx(s);case 26:case 5:oa(t,s),i===null&&l&4&&Fx(s),l&512&&el(s,s.return);break;case 12:oa(t,s);break;case 31:oa(t,s),l&4&&Vx(t,s);break;case 13:oa(t,s),l&4&&kx(t,s),l&64&&(t=s.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(s=Cb.bind(null,s),Kb(t,s))));break;case 22:if(l=s.memoizedState!==null||ra,!l){i=i!==null&&i.memoizedState!==null||pn,u=ra;var d=pn;ra=l,(pn=i)&&!d?la(t,s,(s.subtreeFlags&8772)!==0):oa(t,s),ra=u,pn=d}break;case 30:break;default:oa(t,s)}}function Gx(t){var i=t.alternate;i!==null&&(t.alternate=null,Gx(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&wo(i)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var $t=null,Xn=!1;function sa(t,i,s){for(s=s.child;s!==null;)Hx(t,i,s),s=s.sibling}function Hx(t,i,s){if(Te&&typeof Te.onCommitFiberUnmount=="function")try{Te.onCommitFiberUnmount(Me,s)}catch{}switch(s.tag){case 26:pn||Bi(s,i),sa(t,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:pn||Bi(s,i);var l=$t,u=Xn;Ka(s.type)&&($t=s.stateNode,Xn=!1),sa(t,i,s),cl(s.stateNode),$t=l,Xn=u;break;case 5:pn||Bi(s,i);case 6:if(l=$t,u=Xn,$t=null,sa(t,i,s),$t=l,Xn=u,$t!==null)if(Xn)try{($t.nodeType===9?$t.body:$t.nodeName==="HTML"?$t.ownerDocument.body:$t).removeChild(s.stateNode)}catch(d){Gt(s,i,d)}else try{$t.removeChild(s.stateNode)}catch(d){Gt(s,i,d)}break;case 18:$t!==null&&(Xn?(t=$t,Ng(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,s.stateNode),Ls(t)):Ng($t,s.stateNode));break;case 4:l=$t,u=Xn,$t=s.stateNode.containerInfo,Xn=!0,sa(t,i,s),$t=l,Xn=u;break;case 0:case 11:case 14:case 15:Va(2,s,i),pn||Va(4,s,i),sa(t,i,s);break;case 1:pn||(Bi(s,i),l=s.stateNode,typeof l.componentWillUnmount=="function"&&Ox(s,i,l)),sa(t,i,s);break;case 21:sa(t,i,s);break;case 22:pn=(l=pn)||s.memoizedState!==null,sa(t,i,s),pn=l;break;default:sa(t,i,s)}}function Vx(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Ls(t)}catch(s){Gt(i,i.return,s)}}}function kx(t,i){if(i.memoizedState===null&&(t=i.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Ls(t)}catch(s){Gt(i,i.return,s)}}function yb(t){switch(t.tag){case 31:case 13:case 19:var i=t.stateNode;return i===null&&(i=t.stateNode=new Bx),i;case 22:return t=t.stateNode,i=t._retryCache,i===null&&(i=t._retryCache=new Bx),i;default:throw Error(r(435,t.tag))}}function Dc(t,i){var s=yb(t);i.forEach(function(l){if(!s.has(l)){s.add(l);var u=Db.bind(null,t,l);l.then(u,u)}})}function Wn(t,i){var s=i.deletions;if(s!==null)for(var l=0;l<s.length;l++){var u=s[l],d=t,_=i,T=_;e:for(;T!==null;){switch(T.tag){case 27:if(Ka(T.type)){$t=T.stateNode,Xn=!1;break e}break;case 5:$t=T.stateNode,Xn=!1;break e;case 3:case 4:$t=T.stateNode.containerInfo,Xn=!0;break e}T=T.return}if($t===null)throw Error(r(160));Hx(d,_,u),$t=null,Xn=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)Xx(i,t),i=i.sibling}var Ai=null;function Xx(t,i){var s=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Wn(i,t),qn(t),l&4&&(Va(3,t,t.return),$o(3,t),Va(5,t,t.return));break;case 1:Wn(i,t),qn(t),l&512&&(pn||s===null||Bi(s,s.return)),l&64&&ra&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(s=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=s===null?l:s.concat(l))));break;case 26:var u=Ai;if(Wn(i,t),qn(t),l&512&&(pn||s===null||Bi(s,s.return)),l&4){var d=s!==null?s.memoizedState:null;if(l=t.memoizedState,s===null)if(l===null)if(t.stateNode===null){e:{l=t.type,s=t.memoizedProps,u=u.ownerDocument||u;t:switch(l){case"title":d=u.getElementsByTagName("title")[0],(!d||d[pr]||d[un]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(l),u.head.insertBefore(d,u.querySelector("head > title"))),Nn(d,l,s),d[un]=t,ee(d),l=d;break e;case"link":var _=Xg("link","href",u).get(l+(s.href||""));if(_){for(var T=0;T<_.length;T++)if(d=_[T],d.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&d.getAttribute("rel")===(s.rel==null?null:s.rel)&&d.getAttribute("title")===(s.title==null?null:s.title)&&d.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){_.splice(T,1);break t}}d=u.createElement(l),Nn(d,l,s),u.head.appendChild(d);break;case"meta":if(_=Xg("meta","content",u).get(l+(s.content||""))){for(T=0;T<_.length;T++)if(d=_[T],d.getAttribute("content")===(s.content==null?null:""+s.content)&&d.getAttribute("name")===(s.name==null?null:s.name)&&d.getAttribute("property")===(s.property==null?null:s.property)&&d.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&d.getAttribute("charset")===(s.charSet==null?null:s.charSet)){_.splice(T,1);break t}}d=u.createElement(l),Nn(d,l,s),u.head.appendChild(d);break;default:throw Error(r(468,l))}d[un]=t,ee(d),l=d}t.stateNode=l}else Wg(u,t.type,t.stateNode);else t.stateNode=kg(u,l,t.memoizedProps);else d!==l?(d===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):d.count--,l===null?Wg(u,t.type,t.stateNode):kg(u,l,t.memoizedProps)):l===null&&t.stateNode!==null&&yd(t,t.memoizedProps,s.memoizedProps)}break;case 27:Wn(i,t),qn(t),l&512&&(pn||s===null||Bi(s,s.return)),s!==null&&l&4&&yd(t,t.memoizedProps,s.memoizedProps);break;case 5:if(Wn(i,t),qn(t),l&512&&(pn||s===null||Bi(s,s.return)),t.flags&32){u=t.stateNode;try{Fi(u,"")}catch(Ge){Gt(t,t.return,Ge)}}l&4&&t.stateNode!=null&&(u=t.memoizedProps,yd(t,u,s!==null?s.memoizedProps:u)),l&1024&&(Ed=!0);break;case 6:if(Wn(i,t),qn(t),l&4){if(t.stateNode===null)throw Error(r(162));l=t.memoizedProps,s=t.stateNode;try{s.nodeValue=l}catch(Ge){Gt(t,t.return,Ge)}}break;case 3:if(qc=null,u=Ai,Ai=Xc(i.containerInfo),Wn(i,t),Ai=u,qn(t),l&4&&s!==null&&s.memoizedState.isDehydrated)try{Ls(i.containerInfo)}catch(Ge){Gt(t,t.return,Ge)}Ed&&(Ed=!1,Wx(t));break;case 4:l=Ai,Ai=Xc(t.stateNode.containerInfo),Wn(i,t),qn(t),Ai=l;break;case 12:Wn(i,t),qn(t);break;case 31:Wn(i,t),qn(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Dc(t,l)));break;case 13:Wn(i,t),qn(t),t.child.flags&8192&&t.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(Uc=E()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Dc(t,l)));break;case 22:u=t.memoizedState!==null;var B=s!==null&&s.memoizedState!==null,$=ra,de=pn;if(ra=$||u,pn=de||B,Wn(i,t),pn=de,ra=$,qn(t),l&8192)e:for(i=t.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(s===null||B||ra||pn||Cr(t)),s=null,i=t;;){if(i.tag===5||i.tag===26){if(s===null){B=s=i;try{if(d=B.stateNode,u)_=d.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none";else{T=B.stateNode;var ge=B.memoizedProps.style,ae=ge!=null&&ge.hasOwnProperty("display")?ge.display:null;T.style.display=ae==null||typeof ae=="boolean"?"":(""+ae).trim()}}catch(Ge){Gt(B,B.return,Ge)}}}else if(i.tag===6){if(s===null){B=i;try{B.stateNode.nodeValue=u?"":B.memoizedProps}catch(Ge){Gt(B,B.return,Ge)}}}else if(i.tag===18){if(s===null){B=i;try{var oe=B.stateNode;u?Og(oe,!0):Og(B.stateNode,!1)}catch(Ge){Gt(B,B.return,Ge)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===t)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break e;for(;i.sibling===null;){if(i.return===null||i.return===t)break e;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}l&4&&(l=t.updateQueue,l!==null&&(s=l.retryQueue,s!==null&&(l.retryQueue=null,Dc(t,s))));break;case 19:Wn(i,t),qn(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,Dc(t,l)));break;case 30:break;case 21:break;default:Wn(i,t),qn(t)}}function qn(t){var i=t.flags;if(i&2){try{for(var s,l=t.return;l!==null;){if(Px(l)){s=l;break}l=l.return}if(s==null)throw Error(r(160));switch(s.tag){case 27:var u=s.stateNode,d=bd(t);Cc(t,d,u);break;case 5:var _=s.stateNode;s.flags&32&&(Fi(_,""),s.flags&=-33);var T=bd(t);Cc(t,T,_);break;case 3:case 4:var B=s.stateNode.containerInfo,$=bd(t);Md(t,$,B);break;default:throw Error(r(161))}}catch(de){Gt(t,t.return,de)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function Wx(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var i=t;Wx(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),t=t.sibling}}function oa(t,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)Ix(t,i.alternate,i),i=i.sibling}function Cr(t){for(t=t.child;t!==null;){var i=t;switch(i.tag){case 0:case 11:case 14:case 15:Va(4,i,i.return),Cr(i);break;case 1:Bi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&Ox(i,i.return,s),Cr(i);break;case 27:cl(i.stateNode);case 26:case 5:Bi(i,i.return),Cr(i);break;case 22:i.memoizedState===null&&Cr(i);break;case 30:Cr(i);break;default:Cr(i)}t=t.sibling}}function la(t,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var l=i.alternate,u=t,d=i,_=d.flags;switch(d.tag){case 0:case 11:case 15:la(u,d,s),$o(4,d);break;case 1:if(la(u,d,s),l=d,u=l.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch($){Gt(l,l.return,$)}if(l=d,u=l.updateQueue,u!==null){var T=l.stateNode;try{var B=u.shared.hiddenCallbacks;if(B!==null)for(u.shared.hiddenCallbacks=null,u=0;u<B.length;u++)b0(B[u],T)}catch($){Gt(l,l.return,$)}}s&&_&64&&Nx(d),el(d,d.return);break;case 27:zx(d);case 26:case 5:la(u,d,s),s&&l===null&&_&4&&Fx(d),el(d,d.return);break;case 12:la(u,d,s);break;case 31:la(u,d,s),s&&_&4&&Vx(u,d);break;case 13:la(u,d,s),s&&_&4&&kx(u,d);break;case 22:d.memoizedState===null&&la(u,d,s),el(d,d.return);break;case 30:break;default:la(u,d,s)}i=i.sibling}}function Td(t,i){var s=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(s=t.memoizedState.cachePool.pool),t=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(t=i.memoizedState.cachePool.pool),t!==s&&(t!=null&&t.refCount++,s!=null&&Go(s))}function Ad(t,i){t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&Go(t))}function Ri(t,i,s,l){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)qx(t,i,s,l),i=i.sibling}function qx(t,i,s,l){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Ri(t,i,s,l),u&2048&&$o(9,i);break;case 1:Ri(t,i,s,l);break;case 3:Ri(t,i,s,l),u&2048&&(t=null,i.alternate!==null&&(t=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==t&&(i.refCount++,t!=null&&Go(t)));break;case 12:if(u&2048){Ri(t,i,s,l),t=i.stateNode;try{var d=i.memoizedProps,_=d.id,T=d.onPostCommit;typeof T=="function"&&T(_,i.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(B){Gt(i,i.return,B)}}else Ri(t,i,s,l);break;case 31:Ri(t,i,s,l);break;case 13:Ri(t,i,s,l);break;case 23:break;case 22:d=i.stateNode,_=i.alternate,i.memoizedState!==null?d._visibility&2?Ri(t,i,s,l):tl(t,i):d._visibility&2?Ri(t,i,s,l):(d._visibility|=2,Ss(t,i,s,l,(i.subtreeFlags&10256)!==0||!1)),u&2048&&Td(_,i);break;case 24:Ri(t,i,s,l),u&2048&&Ad(i.alternate,i);break;default:Ri(t,i,s,l)}}function Ss(t,i,s,l,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var d=t,_=i,T=s,B=l,$=_.flags;switch(_.tag){case 0:case 11:case 15:Ss(d,_,T,B,u),$o(8,_);break;case 23:break;case 22:var de=_.stateNode;_.memoizedState!==null?de._visibility&2?Ss(d,_,T,B,u):tl(d,_):(de._visibility|=2,Ss(d,_,T,B,u)),u&&$&2048&&Td(_.alternate,_);break;case 24:Ss(d,_,T,B,u),u&&$&2048&&Ad(_.alternate,_);break;default:Ss(d,_,T,B,u)}i=i.sibling}}function tl(t,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=t,l=i,u=l.flags;switch(l.tag){case 22:tl(s,l),u&2048&&Td(l.alternate,l);break;case 24:tl(s,l),u&2048&&Ad(l.alternate,l);break;default:tl(s,l)}i=i.sibling}}var nl=8192;function ys(t,i,s){if(t.subtreeFlags&nl)for(t=t.child;t!==null;)Yx(t,i,s),t=t.sibling}function Yx(t,i,s){switch(t.tag){case 26:ys(t,i,s),t.flags&nl&&t.memoizedState!==null&&o1(s,Ai,t.memoizedState,t.memoizedProps);break;case 5:ys(t,i,s);break;case 3:case 4:var l=Ai;Ai=Xc(t.stateNode.containerInfo),ys(t,i,s),Ai=l;break;case 22:t.memoizedState===null&&(l=t.alternate,l!==null&&l.memoizedState!==null?(l=nl,nl=16777216,ys(t,i,s),nl=l):ys(t,i,s));break;default:ys(t,i,s)}}function jx(t){var i=t.alternate;if(i!==null&&(t=i.child,t!==null)){i.child=null;do i=t.sibling,t.sibling=null,t=i;while(t!==null)}}function il(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];En=l,Zx(l,t)}jx(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Kx(t),t=t.sibling}function Kx(t){switch(t.tag){case 0:case 11:case 15:il(t),t.flags&2048&&Va(9,t,t.return);break;case 3:il(t);break;case 12:il(t);break;case 22:var i=t.stateNode;t.memoizedState!==null&&i._visibility&2&&(t.return===null||t.return.tag!==13)?(i._visibility&=-3,Lc(t)):il(t);break;default:il(t)}}function Lc(t){var i=t.deletions;if((t.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var l=i[s];En=l,Zx(l,t)}jx(t)}for(t=t.child;t!==null;){switch(i=t,i.tag){case 0:case 11:case 15:Va(8,i,i.return),Lc(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,Lc(i));break;default:Lc(i)}t=t.sibling}}function Zx(t,i){for(;En!==null;){var s=En;switch(s.tag){case 0:case 11:case 15:Va(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var l=s.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:Go(s.memoizedState.cache)}if(l=s.child,l!==null)l.return=s,En=l;else e:for(s=t;En!==null;){l=En;var u=l.sibling,d=l.return;if(Gx(l),l===s){En=null;break e}if(u!==null){u.return=d,En=u;break e}En=d}}}var bb={getCacheForType:function(t){var i=Ln(fn),s=i.data.get(t);return s===void 0&&(s=t(),i.data.set(t,s)),s},cacheSignal:function(){return Ln(fn).controller.signal}},Mb=typeof WeakMap=="function"?WeakMap:Map,Ot=0,jt=null,_t=null,yt=0,It=0,ni=null,ka=!1,bs=!1,Rd=!1,ca=0,tn=0,Xa=0,Dr=0,wd=0,ii=0,Ms=0,al=null,Yn=null,Cd=!1,Uc=0,Qx=0,Nc=1/0,Oc=null,Wa=null,vn=0,qa=null,Es=null,ua=0,Dd=0,Ld=null,Jx=null,rl=0,Ud=null;function ai(){return(Ot&2)!==0&&yt!==0?yt&-yt:P.T!==null?Bd():Ao()}function $x(){if(ii===0)if((yt&536870912)===0||At){var t=Ce;Ce<<=1,(Ce&3932160)===0&&(Ce=262144),ii=t}else ii=536870912;return t=ei.current,t!==null&&(t.flags|=32),ii}function jn(t,i,s){(t===jt&&(It===2||It===9)||t.cancelPendingCommit!==null)&&(Ts(t,0),Ya(t,yt,ii,!1)),On(t,s),((Ot&2)===0||t!==jt)&&(t===jt&&((Ot&2)===0&&(Dr|=s),tn===4&&Ya(t,yt,ii,!1)),Ii(t))}function eg(t,i,s){if((Ot&6)!==0)throw Error(r(327));var l=!s&&(i&127)===0&&(i&t.expiredLanes)===0||Be(t,i),u=l?Ab(t,i):Od(t,i,!0),d=l;do{if(u===0){bs&&!l&&Ya(t,i,0,!1);break}else{if(s=t.current.alternate,d&&!Eb(s)){u=Od(t,i,!1),d=!1;continue}if(u===2){if(d=i,t.errorRecoveryDisabledLanes&d)var _=0;else _=t.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){i=_;e:{var T=t;u=al;var B=T.current.memoizedState.isDehydrated;if(B&&(Ts(T,_).flags|=256),_=Od(T,_,!1),_!==2){if(Rd&&!B){T.errorRecoveryDisabledLanes|=d,Dr|=d,u=4;break e}d=Yn,Yn=u,d!==null&&(Yn===null?Yn=d:Yn.push.apply(Yn,d))}u=_}if(d=!1,u!==2)continue}}if(u===1){Ts(t,0),Ya(t,i,0,!0);break}e:{switch(l=t,d=u,d){case 0:case 1:throw Error(r(345));case 4:if((i&4194048)!==i)break;case 6:Ya(l,i,ii,!ka);break e;case 2:Yn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((i&62914560)===i&&(u=Uc+300-E(),10<u)){if(Ya(l,i,ii,!ka),_e(l,0,!0)!==0)break e;ua=i,l.timeoutHandle=Lg(tg.bind(null,l,s,Yn,Oc,Cd,i,ii,Dr,Ms,ka,d,"Throttled",-0,0),u);break e}tg(l,s,Yn,Oc,Cd,i,ii,Dr,Ms,ka,d,null,-0,0)}}break}while(!0);Ii(t)}function tg(t,i,s,l,u,d,_,T,B,$,de,ge,ae,oe){if(t.timeoutHandle=-1,ge=i.subtreeFlags,ge&8192||(ge&16785408)===16785408){ge={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ki},Yx(i,d,ge);var Ge=(d&62914560)===d?Uc-E():(d&4194048)===d?Qx-E():0;if(Ge=l1(ge,Ge),Ge!==null){ua=d,t.cancelPendingCommit=Ge(cg.bind(null,t,i,d,s,l,u,_,T,B,de,ge,null,ae,oe)),Ya(t,d,_,!$);return}}cg(t,i,d,s,l,u,_,T,B)}function Eb(t){for(var i=t;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var l=0;l<s.length;l++){var u=s[l],d=u.getSnapshot;u=u.value;try{if(!Jn(d(),u))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Ya(t,i,s,l){i&=~wd,i&=~Dr,t.suspendedLanes|=i,t.pingedLanes&=~i,l&&(t.warmLanes|=i),l=t.expirationTimes;for(var u=i;0<u;){var d=31-ke(u),_=1<<d;l[d]=-1,u&=~_}s!==0&&ql(t,s,i)}function Fc(){return(Ot&6)===0?(sl(0),!1):!0}function Nd(){if(_t!==null){if(It===0)var t=_t.return;else t=_t,$i=yr=null,Kf(t),ms=null,Vo=0,t=_t;for(;t!==null;)Ux(t.alternate,t),t=t.return;_t=null}}function Ts(t,i){var s=t.timeoutHandle;s!==-1&&(t.timeoutHandle=-1,Xb(s)),s=t.cancelPendingCommit,s!==null&&(t.cancelPendingCommit=null,s()),ua=0,Nd(),jt=t,_t=s=Qi(t.current,null),yt=i,It=0,ni=null,ka=!1,bs=Be(t,i),Rd=!1,Ms=ii=wd=Dr=Xa=tn=0,Yn=al=null,Cd=!1,(i&8)!==0&&(i|=i&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=i;0<l;){var u=31-ke(l),d=1<<u;i|=t[u],l&=~d}return ca=i,nc(),s}function ng(t,i){ut=null,P.H=Zo,i===ps||i===uc?(i=v0(),It=3):i===zf?(i=v0(),It=4):It=i===fd?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,ni=i,_t===null&&(tn=1,Ec(t,hi(i,t.current)))}function ig(){var t=ei.current;return t===null?!0:(yt&4194048)===yt?gi===null:(yt&62914560)===yt||(yt&536870912)!==0?t===gi:!1}function ag(){var t=P.H;return P.H=Zo,t===null?Zo:t}function rg(){var t=P.A;return P.A=bb,t}function Pc(){tn=4,ka||(yt&4194048)!==yt&&ei.current!==null||(bs=!0),(Xa&134217727)===0&&(Dr&134217727)===0||jt===null||Ya(jt,yt,ii,!1)}function Od(t,i,s){var l=Ot;Ot|=2;var u=ag(),d=rg();(jt!==t||yt!==i)&&(Oc=null,Ts(t,i)),i=!1;var _=tn;e:do try{if(It!==0&&_t!==null){var T=_t,B=ni;switch(It){case 8:Nd(),_=6;break e;case 3:case 2:case 9:case 6:ei.current===null&&(i=!0);var $=It;if(It=0,ni=null,As(t,T,B,$),s&&bs){_=0;break e}break;default:$=It,It=0,ni=null,As(t,T,B,$)}}Tb(),_=tn;break}catch(de){ng(t,de)}while(!0);return i&&t.shellSuspendCounter++,$i=yr=null,Ot=l,P.H=u,P.A=d,_t===null&&(jt=null,yt=0,nc()),_}function Tb(){for(;_t!==null;)sg(_t)}function Ab(t,i){var s=Ot;Ot|=2;var l=ag(),u=rg();jt!==t||yt!==i?(Oc=null,Nc=E()+500,Ts(t,i)):bs=Be(t,i);e:do try{if(It!==0&&_t!==null){i=_t;var d=ni;t:switch(It){case 1:It=0,ni=null,As(t,i,d,1);break;case 2:case 9:if(x0(d)){It=0,ni=null,og(i);break}i=function(){It!==2&&It!==9||jt!==t||(It=7),Ii(t)},d.then(i,i);break e;case 3:It=7;break e;case 4:It=5;break e;case 7:x0(d)?(It=0,ni=null,og(i)):(It=0,ni=null,As(t,i,d,7));break;case 5:var _=null;switch(_t.tag){case 26:_=_t.memoizedState;case 5:case 27:var T=_t;if(_?qg(_):T.stateNode.complete){It=0,ni=null;var B=T.sibling;if(B!==null)_t=B;else{var $=T.return;$!==null?(_t=$,zc($)):_t=null}break t}}It=0,ni=null,As(t,i,d,5);break;case 6:It=0,ni=null,As(t,i,d,6);break;case 8:Nd(),tn=6;break e;default:throw Error(r(462))}}Rb();break}catch(de){ng(t,de)}while(!0);return $i=yr=null,P.H=l,P.A=u,Ot=s,_t!==null?0:(jt=null,yt=0,nc(),tn)}function Rb(){for(;_t!==null&&!ot();)sg(_t)}function sg(t){var i=Dx(t.alternate,t,ca);t.memoizedProps=t.pendingProps,i===null?zc(t):_t=i}function og(t){var i=t,s=i.alternate;switch(i.tag){case 15:case 0:i=Ex(s,i,i.pendingProps,i.type,void 0,yt);break;case 11:i=Ex(s,i,i.pendingProps,i.type.render,i.ref,yt);break;case 5:Kf(i);default:Ux(s,i),i=_t=r0(i,ca),i=Dx(s,i,ca)}t.memoizedProps=t.pendingProps,i===null?zc(t):_t=i}function As(t,i,s,l){$i=yr=null,Kf(i),ms=null,Vo=0;var u=i.return;try{if(mb(t,u,i,s,yt)){tn=1,Ec(t,hi(s,t.current)),_t=null;return}}catch(d){if(u!==null)throw _t=u,d;tn=1,Ec(t,hi(s,t.current)),_t=null;return}i.flags&32768?(At||l===1?t=!0:bs||(yt&536870912)!==0?t=!1:(ka=t=!0,(l===2||l===9||l===3||l===6)&&(l=ei.current,l!==null&&l.tag===13&&(l.flags|=16384))),lg(i,t)):zc(i)}function zc(t){var i=t;do{if((i.flags&32768)!==0){lg(i,ka);return}t=i.return;var s=vb(i.alternate,i,ca);if(s!==null){_t=s;return}if(i=i.sibling,i!==null){_t=i;return}_t=i=t}while(i!==null);tn===0&&(tn=5)}function lg(t,i){do{var s=_b(t.alternate,t);if(s!==null){s.flags&=32767,_t=s;return}if(s=t.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(t=t.sibling,t!==null)){_t=t;return}_t=t=s}while(t!==null);tn=6,_t=null}function cg(t,i,s,l,u,d,_,T,B){t.cancelPendingCommit=null;do Bc();while(vn!==0);if((Ot&6)!==0)throw Error(r(327));if(i!==null){if(i===t.current)throw Error(r(177));if(d=i.lanes|i.childLanes,d|=bf,Zn(t,s,d,_,T,B),t===jt&&(_t=jt=null,yt=0),Es=i,qa=t,ua=s,Dd=d,Ld=u,Jx=l,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,Lb(ue,function(){return pg(),null})):(t.callbackNode=null,t.callbackPriority=0),l=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||l){l=P.T,P.T=null,u=te.p,te.p=2,_=Ot,Ot|=4;try{Sb(t,i,s)}finally{Ot=_,te.p=u,P.T=l}}vn=1,ug(),fg(),dg()}}function ug(){if(vn===1){vn=0;var t=qa,i=Es,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=P.T,P.T=null;var l=te.p;te.p=2;var u=Ot;Ot|=4;try{Xx(i,t);var d=qd,_=Zm(t.containerInfo),T=d.focusedElem,B=d.selectionRange;if(_!==T&&T&&T.ownerDocument&&Km(T.ownerDocument.documentElement,T)){if(B!==null&&gf(T)){var $=B.start,de=B.end;if(de===void 0&&(de=$),"selectionStart"in T)T.selectionStart=$,T.selectionEnd=Math.min(de,T.value.length);else{var ge=T.ownerDocument||document,ae=ge&&ge.defaultView||window;if(ae.getSelection){var oe=ae.getSelection(),Ge=T.textContent.length,it=Math.min(B.start,Ge),Xt=B.end===void 0?it:Math.min(B.end,Ge);!oe.extend&&it>Xt&&(_=Xt,Xt=it,it=_);var q=jm(T,it),V=jm(T,Xt);if(q&&V&&(oe.rangeCount!==1||oe.anchorNode!==q.node||oe.anchorOffset!==q.offset||oe.focusNode!==V.node||oe.focusOffset!==V.offset)){var Q=ge.createRange();Q.setStart(q.node,q.offset),oe.removeAllRanges(),it>Xt?(oe.addRange(Q),oe.extend(V.node,V.offset)):(Q.setEnd(V.node,V.offset),oe.addRange(Q))}}}}for(ge=[],oe=T;oe=oe.parentNode;)oe.nodeType===1&&ge.push({element:oe,left:oe.scrollLeft,top:oe.scrollTop});for(typeof T.focus=="function"&&T.focus(),T=0;T<ge.length;T++){var me=ge[T];me.element.scrollLeft=me.left,me.element.scrollTop=me.top}}Zc=!!Wd,qd=Wd=null}finally{Ot=u,te.p=l,P.T=s}}t.current=i,vn=2}}function fg(){if(vn===2){vn=0;var t=qa,i=Es,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=P.T,P.T=null;var l=te.p;te.p=2;var u=Ot;Ot|=4;try{Ix(t,i.alternate,i)}finally{Ot=u,te.p=l,P.T=s}}vn=3}}function dg(){if(vn===4||vn===3){vn=0,O();var t=qa,i=Es,s=ua,l=Jx;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?vn=5:(vn=0,Es=qa=null,hg(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(Wa=null),hr(s),i=i.stateNode,Te&&typeof Te.onCommitFiberRoot=="function")try{Te.onCommitFiberRoot(Me,i,void 0,(i.current.flags&128)===128)}catch{}if(l!==null){i=P.T,u=te.p,te.p=2,P.T=null;try{for(var d=t.onRecoverableError,_=0;_<l.length;_++){var T=l[_];d(T.value,{componentStack:T.stack})}}finally{P.T=i,te.p=u}}(ua&3)!==0&&Bc(),Ii(t),u=t.pendingLanes,(s&261930)!==0&&(u&42)!==0?t===Ud?rl++:(rl=0,Ud=t):rl=0,sl(0)}}function hg(t,i){(t.pooledCacheLanes&=i)===0&&(i=t.pooledCache,i!=null&&(t.pooledCache=null,Go(i)))}function Bc(){return ug(),fg(),dg(),pg()}function pg(){if(vn!==5)return!1;var t=qa,i=Dd;Dd=0;var s=hr(ua),l=P.T,u=te.p;try{te.p=32>s?32:s,P.T=null,s=Ld,Ld=null;var d=qa,_=ua;if(vn=0,Es=qa=null,ua=0,(Ot&6)!==0)throw Error(r(331));var T=Ot;if(Ot|=4,Kx(d.current),qx(d,d.current,_,s),Ot=T,sl(0,!1),Te&&typeof Te.onPostCommitFiberRoot=="function")try{Te.onPostCommitFiberRoot(Me,d)}catch{}return!0}finally{te.p=u,P.T=l,hg(t,i)}}function mg(t,i,s){i=hi(s,i),i=ud(t.stateNode,i,2),t=Ia(t,i,2),t!==null&&(On(t,2),Ii(t))}function Gt(t,i,s){if(t.tag===3)mg(t,t,s);else for(;i!==null;){if(i.tag===3){mg(i,t,s);break}else if(i.tag===1){var l=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Wa===null||!Wa.has(l))){t=hi(s,t),s=xx(2),l=Ia(i,s,2),l!==null&&(gx(s,l,i,t),On(l,2),Ii(l));break}}i=i.return}}function Fd(t,i,s){var l=t.pingCache;if(l===null){l=t.pingCache=new Mb;var u=new Set;l.set(i,u)}else u=l.get(i),u===void 0&&(u=new Set,l.set(i,u));u.has(s)||(Rd=!0,u.add(s),t=wb.bind(null,t,i,s),i.then(t,t))}function wb(t,i,s){var l=t.pingCache;l!==null&&l.delete(i),t.pingedLanes|=t.suspendedLanes&s,t.warmLanes&=~s,jt===t&&(yt&s)===s&&(tn===4||tn===3&&(yt&62914560)===yt&&300>E()-Uc?(Ot&2)===0&&Ts(t,0):wd|=s,Ms===yt&&(Ms=0)),Ii(t)}function xg(t,i){i===0&&(i=Ht()),t=vr(t,i),t!==null&&(On(t,i),Ii(t))}function Cb(t){var i=t.memoizedState,s=0;i!==null&&(s=i.retryLane),xg(t,s)}function Db(t,i){var s=0;switch(t.tag){case 31:case 13:var l=t.stateNode,u=t.memoizedState;u!==null&&(s=u.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(r(314))}l!==null&&l.delete(i),xg(t,s)}function Lb(t,i){return qt(t,i)}var Ic=null,Rs=null,Pd=!1,Gc=!1,zd=!1,ja=0;function Ii(t){t!==Rs&&t.next===null&&(Rs===null?Ic=Rs=t:Rs=Rs.next=t),Gc=!0,Pd||(Pd=!0,Nb())}function sl(t,i){if(!zd&&Gc){zd=!0;do for(var s=!1,l=Ic;l!==null;){if(t!==0){var u=l.pendingLanes;if(u===0)var d=0;else{var _=l.suspendedLanes,T=l.pingedLanes;d=(1<<31-ke(42|t)+1)-1,d&=u&~(_&~T),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(s=!0,Sg(l,d))}else d=yt,d=_e(l,l===jt?d:0,l.cancelPendingCommit!==null||l.timeoutHandle!==-1),(d&3)===0||Be(l,d)||(s=!0,Sg(l,d));l=l.next}while(s);zd=!1}}function Ub(){gg()}function gg(){Gc=Pd=!1;var t=0;ja!==0&&kb()&&(t=ja);for(var i=E(),s=null,l=Ic;l!==null;){var u=l.next,d=vg(l,i);d===0?(l.next=null,s===null?Ic=u:s.next=u,u===null&&(Rs=s)):(s=l,(t!==0||(d&3)!==0)&&(Gc=!0)),l=u}vn!==0&&vn!==5||sl(t),ja!==0&&(ja=0)}function vg(t,i){for(var s=t.suspendedLanes,l=t.pingedLanes,u=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var _=31-ke(d),T=1<<_,B=u[_];B===-1?((T&s)===0||(T&l)!==0)&&(u[_]=st(T,i)):B<=i&&(t.expiredLanes|=T),d&=~T}if(i=jt,s=yt,s=_e(t,t===i?s:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l=t.callbackNode,s===0||t===i&&(It===2||It===9)||t.cancelPendingCommit!==null)return l!==null&&l!==null&&Ze(l),t.callbackNode=null,t.callbackPriority=0;if((s&3)===0||Be(t,s)){if(i=s&-s,i===t.callbackPriority)return i;switch(l!==null&&Ze(l),hr(s)){case 2:case 8:s=be;break;case 32:s=ue;break;case 268435456:s=Ne;break;default:s=ue}return l=_g.bind(null,t),s=qt(s,l),t.callbackPriority=i,t.callbackNode=s,i}return l!==null&&l!==null&&Ze(l),t.callbackPriority=2,t.callbackNode=null,2}function _g(t,i){if(vn!==0&&vn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var s=t.callbackNode;if(Bc()&&t.callbackNode!==s)return null;var l=yt;return l=_e(t,t===jt?l:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),l===0?null:(eg(t,l,i),vg(t,E()),t.callbackNode!=null&&t.callbackNode===s?_g.bind(null,t):null)}function Sg(t,i){if(Bc())return null;eg(t,i,!0)}function Nb(){Wb(function(){(Ot&6)!==0?qt(xe,Ub):gg()})}function Bd(){if(ja===0){var t=ds;t===0&&(t=Le,Le<<=1,(Le&261888)===0&&(Le=256)),ja=t}return ja}function yg(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:jl(""+t)}function bg(t,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,t.id&&s.setAttribute("form",t.id),i.parentNode.insertBefore(s,i),t=new FormData(t),s.parentNode.removeChild(s),t}function Ob(t,i,s,l,u){if(i==="submit"&&s&&s.stateNode===u){var d=yg((u[xn]||null).action),_=l.submitter;_&&(i=(i=_[xn]||null)?yg(i.formAction):_.getAttribute("formAction"),i!==null&&(d=i,_=null));var T=new Jl("action","action",null,l,u);t.push({event:T,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(ja!==0){var B=_?bg(u,_):new FormData(u);ad(s,{pending:!0,data:B,method:u.method,action:d},null,B)}}else typeof d=="function"&&(T.preventDefault(),B=_?bg(u,_):new FormData(u),ad(s,{pending:!0,data:B,method:u.method,action:d},d,B))},currentTarget:u}]})}}for(var Id=0;Id<yf.length;Id++){var Gd=yf[Id],Fb=Gd.toLowerCase(),Pb=Gd[0].toUpperCase()+Gd.slice(1);Ti(Fb,"on"+Pb)}Ti($m,"onAnimationEnd"),Ti(e0,"onAnimationIteration"),Ti(t0,"onAnimationStart"),Ti("dblclick","onDoubleClick"),Ti("focusin","onFocus"),Ti("focusout","onBlur"),Ti(Jy,"onTransitionRun"),Ti($y,"onTransitionStart"),Ti(eb,"onTransitionCancel"),Ti(n0,"onTransitionEnd"),ze("onMouseEnter",["mouseout","mouseover"]),ze("onMouseLeave",["mouseout","mouseover"]),ze("onPointerEnter",["pointerout","pointerover"]),ze("onPointerLeave",["pointerout","pointerover"]),Ue("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ue("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ue("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ue("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ue("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ue("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ol="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),zb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ol));function Mg(t,i){i=(i&4)!==0;for(var s=0;s<t.length;s++){var l=t[s],u=l.event;l=l.listeners;e:{var d=void 0;if(i)for(var _=l.length-1;0<=_;_--){var T=l[_],B=T.instance,$=T.currentTarget;if(T=T.listener,B!==d&&u.isPropagationStopped())break e;d=T,u.currentTarget=$;try{d(u)}catch(de){tc(de)}u.currentTarget=null,d=B}else for(_=0;_<l.length;_++){if(T=l[_],B=T.instance,$=T.currentTarget,T=T.listener,B!==d&&u.isPropagationStopped())break e;d=T,u.currentTarget=$;try{d(u)}catch(de){tc(de)}u.currentTarget=null,d=B}}}}function St(t,i){var s=i[es];s===void 0&&(s=i[es]=new Set);var l=t+"__bubble";s.has(l)||(Eg(i,t,2,!1),s.add(l))}function Hd(t,i,s){var l=0;i&&(l|=4),Eg(s,t,l,i)}var Hc="_reactListening"+Math.random().toString(36).slice(2);function Vd(t){if(!t[Hc]){t[Hc]=!0,Y.forEach(function(s){s!=="selectionchange"&&(zb.has(s)||Hd(s,!1,t),Hd(s,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[Hc]||(i[Hc]=!0,Hd("selectionchange",!1,i))}}function Eg(t,i,s,l){switch($g(i)){case 2:var u=f1;break;case 8:u=d1;break;default:u=ih}s=u.bind(null,i,s,t),u=void 0,!lf||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),l?u!==void 0?t.addEventListener(i,s,{capture:!0,passive:u}):t.addEventListener(i,s,!0):u!==void 0?t.addEventListener(i,s,{passive:u}):t.addEventListener(i,s,!1)}function kd(t,i,s,l,u){var d=l;if((i&1)===0&&(i&2)===0&&l!==null)e:for(;;){if(l===null)return;var _=l.tag;if(_===3||_===4){var T=l.stateNode.containerInfo;if(T===u)break;if(_===4)for(_=l.return;_!==null;){var B=_.tag;if((B===3||B===4)&&_.stateNode.containerInfo===u)return;_=_.return}for(;T!==null;){if(_=Da(T),_===null)return;if(B=_.tag,B===5||B===6||B===26||B===27){l=d=_;continue e}T=T.parentNode}}l=l.return}Cm(function(){var $=d,de=sf(s),ge=[];e:{var ae=i0.get(t);if(ae!==void 0){var oe=Jl,Ge=t;switch(t){case"keypress":if(Zl(s)===0)break e;case"keydown":case"keyup":oe=Dy;break;case"focusin":Ge="focus",oe=df;break;case"focusout":Ge="blur",oe=df;break;case"beforeblur":case"afterblur":oe=df;break;case"click":if(s.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":oe=Um;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":oe=vy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":oe=Ny;break;case $m:case e0:case t0:oe=yy;break;case n0:oe=Fy;break;case"scroll":case"scrollend":oe=xy;break;case"wheel":oe=zy;break;case"copy":case"cut":case"paste":oe=My;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":oe=Om;break;case"toggle":case"beforetoggle":oe=Iy}var it=(i&4)!==0,Xt=!it&&(t==="scroll"||t==="scrollend"),q=it?ae!==null?ae+"Capture":null:ae;it=[];for(var V=$,Q;V!==null;){var me=V;if(Q=me.stateNode,me=me.tag,me!==5&&me!==26&&me!==27||Q===null||q===null||(me=Co(V,q),me!=null&&it.push(ll(V,me,Q))),Xt)break;V=V.return}0<it.length&&(ae=new oe(ae,Ge,null,s,de),ge.push({event:ae,listeners:it}))}}if((i&7)===0){e:{if(ae=t==="mouseover"||t==="pointerover",oe=t==="mouseout"||t==="pointerout",ae&&s!==rf&&(Ge=s.relatedTarget||s.fromElement)&&(Da(Ge)||Ge[qi]))break e;if((oe||ae)&&(ae=de.window===de?de:(ae=de.ownerDocument)?ae.defaultView||ae.parentWindow:window,oe?(Ge=s.relatedTarget||s.toElement,oe=$,Ge=Ge?Da(Ge):null,Ge!==null&&(Xt=c(Ge),it=Ge.tag,Ge!==Xt||it!==5&&it!==27&&it!==6)&&(Ge=null)):(oe=null,Ge=$),oe!==Ge)){if(it=Um,me="onMouseLeave",q="onMouseEnter",V="mouse",(t==="pointerout"||t==="pointerover")&&(it=Om,me="onPointerLeave",q="onPointerEnter",V="pointer"),Xt=oe==null?ae:W(oe),Q=Ge==null?ae:W(Ge),ae=new it(me,V+"leave",oe,s,de),ae.target=Xt,ae.relatedTarget=Q,me=null,Da(de)===$&&(it=new it(q,V+"enter",Ge,s,de),it.target=Q,it.relatedTarget=Xt,me=it),Xt=me,oe&&Ge)t:{for(it=Bb,q=oe,V=Ge,Q=0,me=q;me;me=it(me))Q++;me=0;for(var Je=V;Je;Je=it(Je))me++;for(;0<Q-me;)q=it(q),Q--;for(;0<me-Q;)V=it(V),me--;for(;Q--;){if(q===V||V!==null&&q===V.alternate){it=q;break t}q=it(q),V=it(V)}it=null}else it=null;oe!==null&&Tg(ge,ae,oe,it,!1),Ge!==null&&Xt!==null&&Tg(ge,Xt,Ge,it,!0)}}e:{if(ae=$?W($):window,oe=ae.nodeName&&ae.nodeName.toLowerCase(),oe==="select"||oe==="input"&&ae.type==="file")var Lt=Vm;else if(Gm(ae))if(km)Lt=Ky;else{Lt=Yy;var Xe=qy}else oe=ae.nodeName,!oe||oe.toLowerCase()!=="input"||ae.type!=="checkbox"&&ae.type!=="radio"?$&&af($.elementType)&&(Lt=Vm):Lt=jy;if(Lt&&(Lt=Lt(t,$))){Hm(ge,Lt,s,de);break e}Xe&&Xe(t,ae,$),t==="focusout"&&$&&ae.type==="number"&&$.memoizedProps.value!=null&&bn(ae,"number",ae.value)}switch(Xe=$?W($):window,t){case"focusin":(Gm(Xe)||Xe.contentEditable==="true")&&(as=Xe,vf=$,zo=null);break;case"focusout":zo=vf=as=null;break;case"mousedown":_f=!0;break;case"contextmenu":case"mouseup":case"dragend":_f=!1,Qm(ge,s,de);break;case"selectionchange":if(Qy)break;case"keydown":case"keyup":Qm(ge,s,de)}var ht;if(pf)e:{switch(t){case"compositionstart":var bt="onCompositionStart";break e;case"compositionend":bt="onCompositionEnd";break e;case"compositionupdate":bt="onCompositionUpdate";break e}bt=void 0}else is?Bm(t,s)&&(bt="onCompositionEnd"):t==="keydown"&&s.keyCode===229&&(bt="onCompositionStart");bt&&(Fm&&s.locale!=="ko"&&(is||bt!=="onCompositionStart"?bt==="onCompositionEnd"&&is&&(ht=Dm()):(Ua=de,cf="value"in Ua?Ua.value:Ua.textContent,is=!0)),Xe=Vc($,bt),0<Xe.length&&(bt=new Nm(bt,t,null,s,de),ge.push({event:bt,listeners:Xe}),ht?bt.data=ht:(ht=Im(s),ht!==null&&(bt.data=ht)))),(ht=Hy?Vy(t,s):ky(t,s))&&(bt=Vc($,"onBeforeInput"),0<bt.length&&(Xe=new Nm("onBeforeInput","beforeinput",null,s,de),ge.push({event:Xe,listeners:bt}),Xe.data=ht)),Ob(ge,t,$,s,de)}Mg(ge,i)})}function ll(t,i,s){return{instance:t,listener:i,currentTarget:s}}function Vc(t,i){for(var s=i+"Capture",l=[];t!==null;){var u=t,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=Co(t,s),u!=null&&l.unshift(ll(t,u,d)),u=Co(t,i),u!=null&&l.push(ll(t,u,d))),t.tag===3)return l;t=t.return}return[]}function Bb(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Tg(t,i,s,l,u){for(var d=i._reactName,_=[];s!==null&&s!==l;){var T=s,B=T.alternate,$=T.stateNode;if(T=T.tag,B!==null&&B===l)break;T!==5&&T!==26&&T!==27||$===null||(B=$,u?($=Co(s,d),$!=null&&_.unshift(ll(s,$,B))):u||($=Co(s,d),$!=null&&_.push(ll(s,$,B)))),s=s.return}_.length!==0&&t.push({event:i,listeners:_})}var Ib=/\r\n?/g,Gb=/\u0000|\uFFFD/g;function Ag(t){return(typeof t=="string"?t:""+t).replace(Ib,`
`).replace(Gb,"")}function Rg(t,i){return i=Ag(i),Ag(t)===i}function kt(t,i,s,l,u,d){switch(s){case"children":typeof l=="string"?i==="body"||i==="textarea"&&l===""||Fi(t,l):(typeof l=="number"||typeof l=="bigint")&&i!=="body"&&Fi(t,""+l);break;case"className":Rt(t,"class",l);break;case"tabIndex":Rt(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":Rt(t,s,l);break;case"style":Rm(t,l,d);break;case"data":if(i!=="object"){Rt(t,"data",l);break}case"src":case"href":if(l===""&&(i!=="a"||s!=="href")){t.removeAttribute(s);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=jl(""+l),t.setAttribute(s,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(s==="formAction"?(i!=="input"&&kt(t,i,"name",u.name,u,null),kt(t,i,"formEncType",u.formEncType,u,null),kt(t,i,"formMethod",u.formMethod,u,null),kt(t,i,"formTarget",u.formTarget,u,null)):(kt(t,i,"encType",u.encType,u,null),kt(t,i,"method",u.method,u,null),kt(t,i,"target",u.target,u,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(s);break}l=jl(""+l),t.setAttribute(s,l);break;case"onClick":l!=null&&(t.onclick=Ki);break;case"onScroll":l!=null&&St("scroll",t);break;case"onScrollEnd":l!=null&&St("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(r(61));if(s=l.__html,s!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=s}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}s=jl(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""+l):t.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,""):t.removeAttribute(s);break;case"capture":case"download":l===!0?t.setAttribute(s,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(s,l):t.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(s,l):t.removeAttribute(s);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(s):t.setAttribute(s,l);break;case"popover":St("beforetoggle",t),St("toggle",t),dt(t,"popover",l);break;case"xlinkActuate":Dt(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":Dt(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":Dt(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":Dt(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":Dt(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":Dt(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":Dt(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":Dt(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":Dt(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":dt(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=py.get(s)||s,dt(t,s,l))}}function Xd(t,i,s,l,u,d){switch(s){case"style":Rm(t,l,d);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(r(61));if(s=l.__html,s!=null){if(u.children!=null)throw Error(r(60));t.innerHTML=s}}break;case"children":typeof l=="string"?Fi(t,l):(typeof l=="number"||typeof l=="bigint")&&Fi(t,""+l);break;case"onScroll":l!=null&&St("scroll",t);break;case"onScrollEnd":l!=null&&St("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Ki);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Re.hasOwnProperty(s))e:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),i=s.slice(2,u?s.length-7:void 0),d=t[xn]||null,d=d!=null?d[s]:null,typeof d=="function"&&t.removeEventListener(i,d,u),typeof l=="function")){typeof d!="function"&&d!==null&&(s in t?t[s]=null:t.hasAttribute(s)&&t.removeAttribute(s)),t.addEventListener(i,l,u);break e}s in t?t[s]=l:l===!0?t.setAttribute(s,""):dt(t,s,l)}}}function Nn(t,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":St("error",t),St("load",t);var l=!1,u=!1,d;for(d in s)if(s.hasOwnProperty(d)){var _=s[d];if(_!=null)switch(d){case"src":l=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,i));default:kt(t,i,d,_,s,null)}}u&&kt(t,i,"srcSet",s.srcSet,s,null),l&&kt(t,i,"src",s.src,s,null);return;case"input":St("invalid",t);var T=d=_=u=null,B=null,$=null;for(l in s)if(s.hasOwnProperty(l)){var de=s[l];if(de!=null)switch(l){case"name":u=de;break;case"type":_=de;break;case"checked":B=de;break;case"defaultChecked":$=de;break;case"value":d=de;break;case"defaultValue":T=de;break;case"children":case"dangerouslySetInnerHTML":if(de!=null)throw Error(r(137,i));break;default:kt(t,i,l,de,s,null)}}Zt(t,d,T,B,$,_,u,!1);return;case"select":St("invalid",t),l=_=d=null;for(u in s)if(s.hasOwnProperty(u)&&(T=s[u],T!=null))switch(u){case"value":d=T;break;case"defaultValue":_=T;break;case"multiple":l=T;default:kt(t,i,u,T,s,null)}i=d,s=_,t.multiple=!!l,i!=null?gn(t,!!l,i,!1):s!=null&&gn(t,!!l,s,!0);return;case"textarea":St("invalid",t),d=u=l=null;for(_ in s)if(s.hasOwnProperty(_)&&(T=s[_],T!=null))switch(_){case"value":l=T;break;case"defaultValue":u=T;break;case"children":d=T;break;case"dangerouslySetInnerHTML":if(T!=null)throw Error(r(91));break;default:kt(t,i,_,T,s,null)}Cn(t,l,u,d);return;case"option":for(B in s)if(s.hasOwnProperty(B)&&(l=s[B],l!=null))switch(B){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:kt(t,i,B,l,s,null)}return;case"dialog":St("beforetoggle",t),St("toggle",t),St("cancel",t),St("close",t);break;case"iframe":case"object":St("load",t);break;case"video":case"audio":for(l=0;l<ol.length;l++)St(ol[l],t);break;case"image":St("error",t),St("load",t);break;case"details":St("toggle",t);break;case"embed":case"source":case"link":St("error",t),St("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for($ in s)if(s.hasOwnProperty($)&&(l=s[$],l!=null))switch($){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,i));default:kt(t,i,$,l,s,null)}return;default:if(af(i)){for(de in s)s.hasOwnProperty(de)&&(l=s[de],l!==void 0&&Xd(t,i,de,l,s,void 0));return}}for(T in s)s.hasOwnProperty(T)&&(l=s[T],l!=null&&kt(t,i,T,l,s,null))}function Hb(t,i,s,l){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,_=null,T=null,B=null,$=null,de=null;for(oe in s){var ge=s[oe];if(s.hasOwnProperty(oe)&&ge!=null)switch(oe){case"checked":break;case"value":break;case"defaultValue":B=ge;default:l.hasOwnProperty(oe)||kt(t,i,oe,null,l,ge)}}for(var ae in l){var oe=l[ae];if(ge=s[ae],l.hasOwnProperty(ae)&&(oe!=null||ge!=null))switch(ae){case"type":d=oe;break;case"name":u=oe;break;case"checked":$=oe;break;case"defaultChecked":de=oe;break;case"value":_=oe;break;case"defaultValue":T=oe;break;case"children":case"dangerouslySetInnerHTML":if(oe!=null)throw Error(r(137,i));break;default:oe!==ge&&kt(t,i,ae,oe,l,ge)}}Yi(t,_,T,B,$,de,d,u);return;case"select":oe=_=T=ae=null;for(d in s)if(B=s[d],s.hasOwnProperty(d)&&B!=null)switch(d){case"value":break;case"multiple":oe=B;default:l.hasOwnProperty(d)||kt(t,i,d,null,l,B)}for(u in l)if(d=l[u],B=s[u],l.hasOwnProperty(u)&&(d!=null||B!=null))switch(u){case"value":ae=d;break;case"defaultValue":T=d;break;case"multiple":_=d;default:d!==B&&kt(t,i,u,d,l,B)}i=T,s=_,l=oe,ae!=null?gn(t,!!s,ae,!1):!!l!=!!s&&(i!=null?gn(t,!!s,i,!0):gn(t,!!s,s?[]:"",!1));return;case"textarea":oe=ae=null;for(T in s)if(u=s[T],s.hasOwnProperty(T)&&u!=null&&!l.hasOwnProperty(T))switch(T){case"value":break;case"children":break;default:kt(t,i,T,null,l,u)}for(_ in l)if(u=l[_],d=s[_],l.hasOwnProperty(_)&&(u!=null||d!=null))switch(_){case"value":ae=u;break;case"defaultValue":oe=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==d&&kt(t,i,_,u,l,d)}Mn(t,ae,oe);return;case"option":for(var Ge in s)if(ae=s[Ge],s.hasOwnProperty(Ge)&&ae!=null&&!l.hasOwnProperty(Ge))switch(Ge){case"selected":t.selected=!1;break;default:kt(t,i,Ge,null,l,ae)}for(B in l)if(ae=l[B],oe=s[B],l.hasOwnProperty(B)&&ae!==oe&&(ae!=null||oe!=null))switch(B){case"selected":t.selected=ae&&typeof ae!="function"&&typeof ae!="symbol";break;default:kt(t,i,B,ae,l,oe)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var it in s)ae=s[it],s.hasOwnProperty(it)&&ae!=null&&!l.hasOwnProperty(it)&&kt(t,i,it,null,l,ae);for($ in l)if(ae=l[$],oe=s[$],l.hasOwnProperty($)&&ae!==oe&&(ae!=null||oe!=null))switch($){case"children":case"dangerouslySetInnerHTML":if(ae!=null)throw Error(r(137,i));break;default:kt(t,i,$,ae,l,oe)}return;default:if(af(i)){for(var Xt in s)ae=s[Xt],s.hasOwnProperty(Xt)&&ae!==void 0&&!l.hasOwnProperty(Xt)&&Xd(t,i,Xt,void 0,l,ae);for(de in l)ae=l[de],oe=s[de],!l.hasOwnProperty(de)||ae===oe||ae===void 0&&oe===void 0||Xd(t,i,de,ae,l,oe);return}}for(var q in s)ae=s[q],s.hasOwnProperty(q)&&ae!=null&&!l.hasOwnProperty(q)&&kt(t,i,q,null,l,ae);for(ge in l)ae=l[ge],oe=s[ge],!l.hasOwnProperty(ge)||ae===oe||ae==null&&oe==null||kt(t,i,ge,ae,l,oe)}function wg(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Vb(){if(typeof performance.getEntriesByType=="function"){for(var t=0,i=0,s=performance.getEntriesByType("resource"),l=0;l<s.length;l++){var u=s[l],d=u.transferSize,_=u.initiatorType,T=u.duration;if(d&&T&&wg(_)){for(_=0,T=u.responseEnd,l+=1;l<s.length;l++){var B=s[l],$=B.startTime;if($>T)break;var de=B.transferSize,ge=B.initiatorType;de&&wg(ge)&&(B=B.responseEnd,_+=de*(B<T?1:(T-$)/(B-$)))}if(--l,i+=8*(d+_)/(u.duration/1e3),t++,10<t)break}}if(0<t)return i/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Wd=null,qd=null;function kc(t){return t.nodeType===9?t:t.ownerDocument}function Cg(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Dg(t,i){if(t===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&i==="foreignObject"?0:t}function Yd(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var jd=null;function kb(){var t=window.event;return t&&t.type==="popstate"?t===jd?!1:(jd=t,!0):(jd=null,!1)}var Lg=typeof setTimeout=="function"?setTimeout:void 0,Xb=typeof clearTimeout=="function"?clearTimeout:void 0,Ug=typeof Promise=="function"?Promise:void 0,Wb=typeof queueMicrotask=="function"?queueMicrotask:typeof Ug<"u"?function(t){return Ug.resolve(null).then(t).catch(qb)}:Lg;function qb(t){setTimeout(function(){throw t})}function Ka(t){return t==="head"}function Ng(t,i){var s=i,l=0;do{var u=s.nextSibling;if(t.removeChild(s),u&&u.nodeType===8)if(s=u.data,s==="/$"||s==="/&"){if(l===0){t.removeChild(u),Ls(i);return}l--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")l++;else if(s==="html")cl(t.ownerDocument.documentElement);else if(s==="head"){s=t.ownerDocument.head,cl(s);for(var d=s.firstChild;d;){var _=d.nextSibling,T=d.nodeName;d[pr]||T==="SCRIPT"||T==="STYLE"||T==="LINK"&&d.rel.toLowerCase()==="stylesheet"||s.removeChild(d),d=_}}else s==="body"&&cl(t.ownerDocument.body);s=u}while(s);Ls(i)}function Og(t,i){var s=t;t=0;do{var l=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),l&&l.nodeType===8)if(s=l.data,s==="/$"){if(t===0)break;t--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||t++;s=l}while(s)}function Kd(t){var i=t.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":Kd(s),wo(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}t.removeChild(s)}}function Yb(t,i,s,l){for(;t.nodeType===1;){var u=s;if(t.nodeName.toLowerCase()!==i.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[pr])switch(i){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(i==="input"&&t.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=vi(t.nextSibling),t===null)break}return null}function jb(t,i,s){if(i==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!s||(t=vi(t.nextSibling),t===null))return null;return t}function Fg(t,i){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!i||(t=vi(t.nextSibling),t===null))return null;return t}function Zd(t){return t.data==="$?"||t.data==="$~"}function Qd(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Kb(t,i){var s=t.ownerDocument;if(t.data==="$~")t._reactRetry=i;else if(t.data!=="$?"||s.readyState!=="loading")i();else{var l=function(){i(),s.removeEventListener("DOMContentLoaded",l)};s.addEventListener("DOMContentLoaded",l),t._reactRetry=l}}function vi(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return t}var Jd=null;function Pg(t){t=t.nextSibling;for(var i=0;t;){if(t.nodeType===8){var s=t.data;if(s==="/$"||s==="/&"){if(i===0)return vi(t.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}t=t.nextSibling}return null}function zg(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var s=t.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return t;i--}else s!=="/$"&&s!=="/&"||i++}t=t.previousSibling}return null}function Bg(t,i,s){switch(i=kc(s),t){case"html":if(t=i.documentElement,!t)throw Error(r(452));return t;case"head":if(t=i.head,!t)throw Error(r(453));return t;case"body":if(t=i.body,!t)throw Error(r(454));return t;default:throw Error(r(451))}}function cl(t){for(var i=t.attributes;i.length;)t.removeAttributeNode(i[0]);wo(t)}var _i=new Map,Ig=new Set;function Xc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var fa=te.d;te.d={f:Zb,r:Qb,D:Jb,C:$b,L:e1,m:t1,X:i1,S:n1,M:a1};function Zb(){var t=fa.f(),i=Fc();return t||i}function Qb(t){var i=R(t);i!==null&&i.tag===5&&i.type==="form"?nx(i):fa.r(t)}var ws=typeof document>"u"?null:document;function Gg(t,i,s){var l=ws;if(l&&typeof i=="string"&&i){var u=Kt(i);u='link[rel="'+t+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),Ig.has(u)||(Ig.add(u),t={rel:t,crossOrigin:s,href:i},l.querySelector(u)===null&&(i=l.createElement("link"),Nn(i,"link",t),ee(i),l.head.appendChild(i)))}}function Jb(t){fa.D(t),Gg("dns-prefetch",t,null)}function $b(t,i){fa.C(t,i),Gg("preconnect",t,i)}function e1(t,i,s){fa.L(t,i,s);var l=ws;if(l&&t&&i){var u='link[rel="preload"][as="'+Kt(i)+'"]';i==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+Kt(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+Kt(s.imageSizes)+'"]')):u+='[href="'+Kt(t)+'"]';var d=u;switch(i){case"style":d=Cs(t);break;case"script":d=Ds(t)}_i.has(d)||(t=g({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:t,as:i},s),_i.set(d,t),l.querySelector(u)!==null||i==="style"&&l.querySelector(ul(d))||i==="script"&&l.querySelector(fl(d))||(i=l.createElement("link"),Nn(i,"link",t),ee(i),l.head.appendChild(i)))}}function t1(t,i){fa.m(t,i);var s=ws;if(s&&t){var l=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+Kt(l)+'"][href="'+Kt(t)+'"]',d=u;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=Ds(t)}if(!_i.has(d)&&(t=g({rel:"modulepreload",href:t},i),_i.set(d,t),s.querySelector(u)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(fl(d)))return}l=s.createElement("link"),Nn(l,"link",t),ee(l),s.head.appendChild(l)}}}function n1(t,i,s){fa.S(t,i,s);var l=ws;if(l&&t){var u=re(l).hoistableStyles,d=Cs(t);i=i||"default";var _=u.get(d);if(!_){var T={loading:0,preload:null};if(_=l.querySelector(ul(d)))T.loading=5;else{t=g({rel:"stylesheet",href:t,"data-precedence":i},s),(s=_i.get(d))&&$d(t,s);var B=_=l.createElement("link");ee(B),Nn(B,"link",t),B._p=new Promise(function($,de){B.onload=$,B.onerror=de}),B.addEventListener("load",function(){T.loading|=1}),B.addEventListener("error",function(){T.loading|=2}),T.loading|=4,Wc(_,i,l)}_={type:"stylesheet",instance:_,count:1,state:T},u.set(d,_)}}}function i1(t,i){fa.X(t,i);var s=ws;if(s&&t){var l=re(s).hoistableScripts,u=Ds(t),d=l.get(u);d||(d=s.querySelector(fl(u)),d||(t=g({src:t,async:!0},i),(i=_i.get(u))&&eh(t,i),d=s.createElement("script"),ee(d),Nn(d,"link",t),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(u,d))}}function a1(t,i){fa.M(t,i);var s=ws;if(s&&t){var l=re(s).hoistableScripts,u=Ds(t),d=l.get(u);d||(d=s.querySelector(fl(u)),d||(t=g({src:t,async:!0,type:"module"},i),(i=_i.get(u))&&eh(t,i),d=s.createElement("script"),ee(d),Nn(d,"link",t),s.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},l.set(u,d))}}function Hg(t,i,s,l){var u=(u=ie.current)?Xc(u):null;if(!u)throw Error(r(446));switch(t){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Cs(s.href),s=re(u).hoistableStyles,l=s.get(i),l||(l={type:"style",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){t=Cs(s.href);var d=re(u).hoistableStyles,_=d.get(t);if(_||(u=u.ownerDocument||u,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,_),(d=u.querySelector(ul(t)))&&!d._p&&(_.instance=d,_.state.loading=5),_i.has(t)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},_i.set(t,s),d||r1(u,t,s,_.state))),i&&l===null)throw Error(r(528,""));return _}if(i&&l!==null)throw Error(r(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Ds(s),s=re(u).hoistableScripts,l=s.get(i),l||(l={type:"script",instance:null,count:0,state:null},s.set(i,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,t))}}function Cs(t){return'href="'+Kt(t)+'"'}function ul(t){return'link[rel="stylesheet"]['+t+"]"}function Vg(t){return g({},t,{"data-precedence":t.precedence,precedence:null})}function r1(t,i,s,l){t.querySelector('link[rel="preload"][as="style"]['+i+"]")?l.loading=1:(i=t.createElement("link"),l.preload=i,i.addEventListener("load",function(){return l.loading|=1}),i.addEventListener("error",function(){return l.loading|=2}),Nn(i,"link",s),ee(i),t.head.appendChild(i))}function Ds(t){return'[src="'+Kt(t)+'"]'}function fl(t){return"script[async]"+t}function kg(t,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var l=t.querySelector('style[data-href~="'+Kt(s.href)+'"]');if(l)return i.instance=l,ee(l),l;var u=g({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),ee(l),Nn(l,"style",u),Wc(l,s.precedence,t),i.instance=l;case"stylesheet":u=Cs(s.href);var d=t.querySelector(ul(u));if(d)return i.state.loading|=4,i.instance=d,ee(d),d;l=Vg(s),(u=_i.get(u))&&$d(l,u),d=(t.ownerDocument||t).createElement("link"),ee(d);var _=d;return _._p=new Promise(function(T,B){_.onload=T,_.onerror=B}),Nn(d,"link",l),i.state.loading|=4,Wc(d,s.precedence,t),i.instance=d;case"script":return d=Ds(s.src),(u=t.querySelector(fl(d)))?(i.instance=u,ee(u),u):(l=s,(u=_i.get(d))&&(l=g({},s),eh(l,u)),t=t.ownerDocument||t,u=t.createElement("script"),ee(u),Nn(u,"link",l),t.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(r(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(l=i.instance,i.state.loading|=4,Wc(l,s.precedence,t));return i.instance}function Wc(t,i,s){for(var l=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=l.length?l[l.length-1]:null,d=u,_=0;_<l.length;_++){var T=l[_];if(T.dataset.precedence===i)d=T;else if(d!==u)break}d?d.parentNode.insertBefore(t,d.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(t,i.firstChild))}function $d(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.title==null&&(t.title=i.title)}function eh(t,i){t.crossOrigin==null&&(t.crossOrigin=i.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=i.referrerPolicy),t.integrity==null&&(t.integrity=i.integrity)}var qc=null;function Xg(t,i,s){if(qc===null){var l=new Map,u=qc=new Map;u.set(s,l)}else u=qc,l=u.get(s),l||(l=new Map,u.set(s,l));if(l.has(t))return l;for(l.set(t,null),s=s.getElementsByTagName(t),u=0;u<s.length;u++){var d=s[u];if(!(d[pr]||d[un]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var _=d.getAttribute(i)||"";_=t+_;var T=l.get(_);T?T.push(d):l.set(_,[d])}}return l}function Wg(t,i,s){t=t.ownerDocument||t,t.head.insertBefore(s,i==="title"?t.querySelector("head > title"):null)}function s1(t,i,s){if(s===1||i.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return t=i.disabled,typeof i.precedence=="string"&&t==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function qg(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function o1(t,i,s,l){if(s.type==="stylesheet"&&(typeof l.media!="string"||matchMedia(l.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var u=Cs(l.href),d=i.querySelector(ul(u));if(d){i=d._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(t.count++,t=Yc.bind(t),i.then(t,t)),s.state.loading|=4,s.instance=d,ee(d);return}d=i.ownerDocument||i,l=Vg(l),(u=_i.get(u))&&$d(l,u),d=d.createElement("link"),ee(d);var _=d;_._p=new Promise(function(T,B){_.onload=T,_.onerror=B}),Nn(d,"link",l),s.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(t.count++,s=Yc.bind(t),i.addEventListener("load",s),i.addEventListener("error",s))}}var th=0;function l1(t,i){return t.stylesheets&&t.count===0&&Kc(t,t.stylesheets),0<t.count||0<t.imgCount?function(s){var l=setTimeout(function(){if(t.stylesheets&&Kc(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+i);0<t.imgBytes&&th===0&&(th=62500*Vb());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Kc(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>th?50:800)+i);return t.unsuspend=s,function(){t.unsuspend=null,clearTimeout(l),clearTimeout(u)}}:null}function Yc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Kc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var jc=null;function Kc(t,i){t.stylesheets=null,t.unsuspend!==null&&(t.count++,jc=new Map,i.forEach(c1,t),jc=null,Yc.call(t))}function c1(t,i){if(!(i.state.loading&4)){var s=jc.get(t);if(s)var l=s.get(null);else{s=new Map,jc.set(t,s);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var _=u[d];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(s.set(_.dataset.precedence,_),l=_)}l&&s.set(null,l)}u=i.instance,_=u.getAttribute("data-precedence"),d=s.get(_)||l,d===l&&s.set(null,u),s.set(_,u),this.count++,l=Yc.bind(this),u.addEventListener("load",l),u.addEventListener("error",l),d?d.parentNode.insertBefore(u,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),i.state.loading|=4}}var dl={$$typeof:N,Provider:null,Consumer:null,_currentValue:j,_currentValue2:j,_threadCount:0};function u1(t,i,s,l,u,d,_,T,B){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ct(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ct(0),this.hiddenUpdates=Ct(null),this.identifierPrefix=l,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.incompleteTransitions=new Map}function Yg(t,i,s,l,u,d,_,T,B,$,de,ge){return t=new u1(t,i,s,_,B,$,de,ge,T),i=1,d===!0&&(i|=24),d=$n(3,null,null,i),t.current=d,d.stateNode=t,i=Of(),i.refCount++,t.pooledCache=i,i.refCount++,d.memoizedState={element:l,isDehydrated:s,cache:i},Bf(d),t}function jg(t){return t?(t=os,t):os}function Kg(t,i,s,l,u,d){u=jg(u),l.context===null?l.context=u:l.pendingContext=u,l=Ba(i),l.payload={element:s},d=d===void 0?null:d,d!==null&&(l.callback=d),s=Ia(t,l,i),s!==null&&(jn(s,t,i),Xo(s,t,i))}function Zg(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var s=t.retryLane;t.retryLane=s!==0&&s<i?s:i}}function nh(t,i){Zg(t,i),(t=t.alternate)&&Zg(t,i)}function Qg(t){if(t.tag===13||t.tag===31){var i=vr(t,67108864);i!==null&&jn(i,t,67108864),nh(t,67108864)}}function Jg(t){if(t.tag===13||t.tag===31){var i=ai();i=Ei(i);var s=vr(t,i);s!==null&&jn(s,t,i),nh(t,i)}}var Zc=!0;function f1(t,i,s,l){var u=P.T;P.T=null;var d=te.p;try{te.p=2,ih(t,i,s,l)}finally{te.p=d,P.T=u}}function d1(t,i,s,l){var u=P.T;P.T=null;var d=te.p;try{te.p=8,ih(t,i,s,l)}finally{te.p=d,P.T=u}}function ih(t,i,s,l){if(Zc){var u=ah(l);if(u===null)kd(t,i,l,Qc,s),ev(t,l);else if(p1(u,t,i,s,l))l.stopPropagation();else if(ev(t,l),i&4&&-1<h1.indexOf(t)){for(;u!==null;){var d=R(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var _=Ee(d.pendingLanes);if(_!==0){var T=d;for(T.pendingLanes|=2,T.entangledLanes|=2;_;){var B=1<<31-ke(_);T.entanglements[1]|=B,_&=~B}Ii(d),(Ot&6)===0&&(Nc=E()+500,sl(0))}}break;case 31:case 13:T=vr(d,2),T!==null&&jn(T,d,2),Fc(),nh(d,2)}if(d=ah(l),d===null&&kd(t,i,l,Qc,s),d===u)break;u=d}u!==null&&l.stopPropagation()}else kd(t,i,l,null,s)}}function ah(t){return t=sf(t),rh(t)}var Qc=null;function rh(t){if(Qc=null,t=Da(t),t!==null){var i=c(t);if(i===null)t=null;else{var s=i.tag;if(s===13){if(t=f(i),t!==null)return t;t=null}else if(s===31){if(t=h(i),t!==null)return t;t=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null)}}return Qc=t,null}function $g(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(J()){case xe:return 2;case be:return 8;case ue:case je:return 32;case Ne:return 268435456;default:return 32}default:return 32}}var sh=!1,Za=null,Qa=null,Ja=null,hl=new Map,pl=new Map,$a=[],h1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function ev(t,i){switch(t){case"focusin":case"focusout":Za=null;break;case"dragenter":case"dragleave":Qa=null;break;case"mouseover":case"mouseout":Ja=null;break;case"pointerover":case"pointerout":hl.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":pl.delete(i.pointerId)}}function ml(t,i,s,l,u,d){return t===null||t.nativeEvent!==d?(t={blockedOn:i,domEventName:s,eventSystemFlags:l,nativeEvent:d,targetContainers:[u]},i!==null&&(i=R(i),i!==null&&Qg(i)),t):(t.eventSystemFlags|=l,i=t.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),t)}function p1(t,i,s,l,u){switch(i){case"focusin":return Za=ml(Za,t,i,s,l,u),!0;case"dragenter":return Qa=ml(Qa,t,i,s,l,u),!0;case"mouseover":return Ja=ml(Ja,t,i,s,l,u),!0;case"pointerover":var d=u.pointerId;return hl.set(d,ml(hl.get(d)||null,t,i,s,l,u)),!0;case"gotpointercapture":return d=u.pointerId,pl.set(d,ml(pl.get(d)||null,t,i,s,l,u)),!0}return!1}function tv(t){var i=Da(t.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=f(s),i!==null){t.blockedOn=i,Ro(t.priority,function(){Jg(s)});return}}else if(i===31){if(i=h(s),i!==null){t.blockedOn=i,Ro(t.priority,function(){Jg(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){t.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Jc(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var s=ah(t.nativeEvent);if(s===null){s=t.nativeEvent;var l=new s.constructor(s.type,s);rf=l,s.target.dispatchEvent(l),rf=null}else return i=R(s),i!==null&&Qg(i),t.blockedOn=s,!1;i.shift()}return!0}function nv(t,i,s){Jc(t)&&s.delete(i)}function m1(){sh=!1,Za!==null&&Jc(Za)&&(Za=null),Qa!==null&&Jc(Qa)&&(Qa=null),Ja!==null&&Jc(Ja)&&(Ja=null),hl.forEach(nv),pl.forEach(nv)}function $c(t,i){t.blockedOn===i&&(t.blockedOn=null,sh||(sh=!0,a.unstable_scheduleCallback(a.unstable_NormalPriority,m1)))}var eu=null;function iv(t){eu!==t&&(eu=t,a.unstable_scheduleCallback(a.unstable_NormalPriority,function(){eu===t&&(eu=null);for(var i=0;i<t.length;i+=3){var s=t[i],l=t[i+1],u=t[i+2];if(typeof l!="function"){if(rh(l||s)===null)continue;break}var d=R(s);d!==null&&(t.splice(i,3),i-=3,ad(d,{pending:!0,data:u,method:s.method,action:l},l,u))}}))}function Ls(t){function i(B){return $c(B,t)}Za!==null&&$c(Za,t),Qa!==null&&$c(Qa,t),Ja!==null&&$c(Ja,t),hl.forEach(i),pl.forEach(i);for(var s=0;s<$a.length;s++){var l=$a[s];l.blockedOn===t&&(l.blockedOn=null)}for(;0<$a.length&&(s=$a[0],s.blockedOn===null);)tv(s),s.blockedOn===null&&$a.shift();if(s=(t.ownerDocument||t).$$reactFormReplay,s!=null)for(l=0;l<s.length;l+=3){var u=s[l],d=s[l+1],_=u[xn]||null;if(typeof d=="function")_||iv(s);else if(_){var T=null;if(d&&d.hasAttribute("formAction")){if(u=d,_=d[xn]||null)T=_.formAction;else if(rh(u)!==null)continue}else T=_.action;typeof T=="function"?s[l+1]=T:(s.splice(l,3),l-=3),iv(s)}}}function av(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(_){return u=_})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),l||setTimeout(s,20)}function s(){if(!l&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var l=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){l=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function oh(t){this._internalRoot=t}tu.prototype.render=oh.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(r(409));var s=i.current,l=ai();Kg(s,l,t,i,null,null)},tu.prototype.unmount=oh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Kg(t.current,2,null,t,null,null),Fc(),i[qi]=null}};function tu(t){this._internalRoot=t}tu.prototype.unstable_scheduleHydration=function(t){if(t){var i=Ao();t={blockedOn:null,target:t,priority:i};for(var s=0;s<$a.length&&i!==0&&i<$a[s].priority;s++);$a.splice(s,0,t),s===0&&tv(t)}};var rv=e.version;if(rv!=="19.2.8")throw Error(r(527,rv,"19.2.8"));te.findDOMNode=function(t){var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(r(188)):(t=Object.keys(t).join(","),Error(r(268,t)));return t=p(i),t=t!==null?x(t):null,t=t===null?null:t.stateNode,t};var x1={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var nu=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!nu.isDisabled&&nu.supportsFiber)try{Me=nu.inject(x1),Te=nu}catch{}}return gl.createRoot=function(t,i){if(!o(t))throw Error(r(299));var s=!1,l="",u=dx,d=hx,_=px;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(l=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(d=i.onCaughtError),i.onRecoverableError!==void 0&&(_=i.onRecoverableError)),i=Yg(t,1,!1,null,null,s,l,null,u,d,_,av),t[qi]=i.current,Vd(t),new oh(i)},gl.hydrateRoot=function(t,i,s){if(!o(t))throw Error(r(299));var l=!1,u="",d=dx,_=hx,T=px,B=null;return s!=null&&(s.unstable_strictMode===!0&&(l=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(d=s.onUncaughtError),s.onCaughtError!==void 0&&(_=s.onCaughtError),s.onRecoverableError!==void 0&&(T=s.onRecoverableError),s.formState!==void 0&&(B=s.formState)),i=Yg(t,1,!0,i,s??null,l,u,B,d,_,T,av),i.context=jg(null),s=i.current,l=ai(),l=Ei(l),u=Ba(l),u.callback=null,Ia(s,u,l),s=l,i.current.lanes=s,On(i,s),Ii(i),t[qi]=i.current,Vd(t),new tu(i)},gl.version="19.2.8",gl}var mv;function A1(){if(mv)return uh.exports;mv=1;function a(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)}catch(e){console.error(e)}}return a(),uh.exports=T1(),uh.exports}var R1=A1();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qp="181",w1=0,xv=1,C1=2,H_=1,D1=2,va=3,Aa=0,Kn=1,Sa=2,Ma=0,ro=1,gv=2,vv=3,_v=4,L1=5,Vr=100,U1=101,N1=102,O1=103,F1=104,P1=200,z1=201,B1=202,I1=203,Yh=204,jh=205,G1=206,H1=207,V1=208,k1=209,X1=210,W1=211,q1=212,Y1=213,j1=214,Kh=0,Zh=1,Qh=2,lo=3,Jh=4,$h=5,ep=6,tp=7,V_=0,K1=1,Z1=2,ur=0,Q1=1,J1=2,$1=3,eM=4,tM=5,nM=6,iM=7,k_=300,co=301,uo=302,np=303,ip=304,Wu=306,ap=1e3,ya=1001,rp=1002,ci=1003,aM=1004,iu=1005,Mi=1006,ph=1007,Wr=1008,Ra=1009,X_=1010,W_=1011,Nl=1012,Jp=1013,jr=1014,ba=1015,go=1016,$p=1017,em=1018,Ol=1020,q_=35902,Y_=35899,j_=1021,K_=1022,Ni=1023,Fl=1026,Pl=1027,Z_=1028,tm=1029,nm=1030,im=1031,am=1033,Au=33776,Ru=33777,wu=33778,Cu=33779,sp=35840,op=35841,lp=35842,cp=35843,up=36196,fp=37492,dp=37496,hp=37808,pp=37809,mp=37810,xp=37811,gp=37812,vp=37813,_p=37814,Sp=37815,yp=37816,bp=37817,Mp=37818,Ep=37819,Tp=37820,Ap=37821,Rp=36492,wp=36494,Cp=36495,Dp=36283,Lp=36284,Up=36285,Np=36286,rM=3200,sM=3201,oM=0,lM=1,lr="",yi="srgb",fo="srgb-linear",Fu="linear",Wt="srgb",Us=7680,Sv=519,cM=512,uM=513,fM=514,Q_=515,dM=516,hM=517,pM=518,mM=519,yv=35044,bv="300 es",Vi=2e3,Pu=2001;function J_(a){for(let e=a.length-1;e>=0;--e)if(a[e]>=65535)return!0;return!1}function zu(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function xM(){const a=zu("canvas");return a.style.display="block",a}const Mv={};function Ev(...a){const e="THREE."+a.shift();console.log(e,...a)}function ct(...a){const e="THREE."+a.shift();console.warn(e,...a)}function nn(...a){const e="THREE."+a.shift();console.error(e,...a)}function zl(...a){const e=a.join(" ");e in Mv||(Mv[e]=!0,ct(...a))}function gM(a,e,n){return new Promise(function(r,o){function c(){switch(a.clientWaitSync(e,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:o();break;case a.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:r()}}setTimeout(c,n)})}class vo{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(n)===-1&&r[e].push(n)}hasEventListener(e,n){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(n)!==-1}removeEventListener(e,n){const r=this._listeners;if(r===void 0)return;const o=r[e];if(o!==void 0){const c=o.indexOf(n);c!==-1&&o.splice(c,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const r=n[e.type];if(r!==void 0){e.target=this;const o=r.slice(0);for(let c=0,f=o.length;c<f;c++)o[c].call(this,e);e.target=null}}}const Pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tv=1234567;const Rl=Math.PI/180,Bl=180/Math.PI;function _o(){const a=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Pn[a&255]+Pn[a>>8&255]+Pn[a>>16&255]+Pn[a>>24&255]+"-"+Pn[e&255]+Pn[e>>8&255]+"-"+Pn[e>>16&15|64]+Pn[e>>24&255]+"-"+Pn[n&63|128]+Pn[n>>8&255]+"-"+Pn[n>>16&255]+Pn[n>>24&255]+Pn[r&255]+Pn[r>>8&255]+Pn[r>>16&255]+Pn[r>>24&255]).toLowerCase()}function Mt(a,e,n){return Math.max(e,Math.min(n,a))}function rm(a,e){return(a%e+e)%e}function vM(a,e,n,r,o){return r+(a-e)*(o-r)/(n-e)}function _M(a,e,n){return a!==e?(n-a)/(e-a):0}function wl(a,e,n){return(1-n)*a+n*e}function SM(a,e,n,r){return wl(a,e,1-Math.exp(-n*r))}function yM(a,e=1){return e-Math.abs(rm(a,e*2)-e)}function bM(a,e,n){return a<=e?0:a>=n?1:(a=(a-e)/(n-e),a*a*(3-2*a))}function MM(a,e,n){return a<=e?0:a>=n?1:(a=(a-e)/(n-e),a*a*a*(a*(a*6-15)+10))}function EM(a,e){return a+Math.floor(Math.random()*(e-a+1))}function TM(a,e){return a+Math.random()*(e-a)}function AM(a){return a*(.5-Math.random())}function RM(a){a!==void 0&&(Tv=a);let e=Tv+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function wM(a){return a*Rl}function CM(a){return a*Bl}function DM(a){return(a&a-1)===0&&a!==0}function LM(a){return Math.pow(2,Math.ceil(Math.log(a)/Math.LN2))}function UM(a){return Math.pow(2,Math.floor(Math.log(a)/Math.LN2))}function NM(a,e,n,r,o){const c=Math.cos,f=Math.sin,h=c(n/2),m=f(n/2),p=c((e+r)/2),x=f((e+r)/2),g=c((e-r)/2),v=f((e-r)/2),y=c((r-e)/2),M=f((r-e)/2);switch(o){case"XYX":a.set(h*x,m*g,m*v,h*p);break;case"YZY":a.set(m*v,h*x,m*g,h*p);break;case"ZXZ":a.set(m*g,m*v,h*x,h*p);break;case"XZX":a.set(h*x,m*M,m*y,h*p);break;case"YXY":a.set(m*y,h*x,m*M,h*p);break;case"ZYZ":a.set(m*M,m*y,h*x,h*p);break;default:ct("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+o)}}function Qs(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function Gn(a,e){switch(e.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}const OM={DEG2RAD:Rl,RAD2DEG:Bl,generateUUID:_o,clamp:Mt,euclideanModulo:rm,mapLinear:vM,inverseLerp:_M,lerp:wl,damp:SM,pingpong:yM,smoothstep:bM,smootherstep:MM,randInt:EM,randFloat:TM,randFloatSpread:AM,seededRandom:RM,degToRad:wM,radToDeg:CM,isPowerOfTwo:DM,ceilPowerOfTwo:LM,floorPowerOfTwo:UM,setQuaternionFromProperEuler:NM,normalize:Gn,denormalize:Qs};class zt{constructor(e=0,n=0){zt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,r=this.y,o=e.elements;return this.x=o[0]*n+o[3]*r+o[6],this.y=o[1]*n+o[4]*r+o[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Mt(this.x,e.x,n.x),this.y=Mt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Mt(this.x,e,n),this.y=Mt(this.y,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Mt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(Mt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y;return n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const r=Math.cos(n),o=Math.sin(n),c=this.x-e.x,f=this.y-e.y;return this.x=c*r-f*o+e.x,this.y=c*o+f*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kr{constructor(e=0,n=0,r=0,o=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=r,this._w=o}static slerpFlat(e,n,r,o,c,f,h){let m=r[o+0],p=r[o+1],x=r[o+2],g=r[o+3],v=c[f+0],y=c[f+1],M=c[f+2],A=c[f+3];if(h<=0){e[n+0]=m,e[n+1]=p,e[n+2]=x,e[n+3]=g;return}if(h>=1){e[n+0]=v,e[n+1]=y,e[n+2]=M,e[n+3]=A;return}if(g!==A||m!==v||p!==y||x!==M){let b=m*v+p*y+x*M+g*A;b<0&&(v=-v,y=-y,M=-M,A=-A,b=-b);let S=1-h;if(b<.9995){const z=Math.acos(b),N=Math.sin(z);S=Math.sin(S*z)/N,h=Math.sin(h*z)/N,m=m*S+v*h,p=p*S+y*h,x=x*S+M*h,g=g*S+A*h}else{m=m*S+v*h,p=p*S+y*h,x=x*S+M*h,g=g*S+A*h;const z=1/Math.sqrt(m*m+p*p+x*x+g*g);m*=z,p*=z,x*=z,g*=z}}e[n]=m,e[n+1]=p,e[n+2]=x,e[n+3]=g}static multiplyQuaternionsFlat(e,n,r,o,c,f){const h=r[o],m=r[o+1],p=r[o+2],x=r[o+3],g=c[f],v=c[f+1],y=c[f+2],M=c[f+3];return e[n]=h*M+x*g+m*y-p*v,e[n+1]=m*M+x*v+p*g-h*y,e[n+2]=p*M+x*y+h*v-m*g,e[n+3]=x*M-h*g-m*v-p*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,r,o){return this._x=e,this._y=n,this._z=r,this._w=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const r=e._x,o=e._y,c=e._z,f=e._order,h=Math.cos,m=Math.sin,p=h(r/2),x=h(o/2),g=h(c/2),v=m(r/2),y=m(o/2),M=m(c/2);switch(f){case"XYZ":this._x=v*x*g+p*y*M,this._y=p*y*g-v*x*M,this._z=p*x*M+v*y*g,this._w=p*x*g-v*y*M;break;case"YXZ":this._x=v*x*g+p*y*M,this._y=p*y*g-v*x*M,this._z=p*x*M-v*y*g,this._w=p*x*g+v*y*M;break;case"ZXY":this._x=v*x*g-p*y*M,this._y=p*y*g+v*x*M,this._z=p*x*M+v*y*g,this._w=p*x*g-v*y*M;break;case"ZYX":this._x=v*x*g-p*y*M,this._y=p*y*g+v*x*M,this._z=p*x*M-v*y*g,this._w=p*x*g+v*y*M;break;case"YZX":this._x=v*x*g+p*y*M,this._y=p*y*g+v*x*M,this._z=p*x*M-v*y*g,this._w=p*x*g-v*y*M;break;case"XZY":this._x=v*x*g-p*y*M,this._y=p*y*g-v*x*M,this._z=p*x*M+v*y*g,this._w=p*x*g+v*y*M;break;default:ct("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const r=n/2,o=Math.sin(r);return this._x=e.x*o,this._y=e.y*o,this._z=e.z*o,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,r=n[0],o=n[4],c=n[8],f=n[1],h=n[5],m=n[9],p=n[2],x=n[6],g=n[10],v=r+h+g;if(v>0){const y=.5/Math.sqrt(v+1);this._w=.25/y,this._x=(x-m)*y,this._y=(c-p)*y,this._z=(f-o)*y}else if(r>h&&r>g){const y=2*Math.sqrt(1+r-h-g);this._w=(x-m)/y,this._x=.25*y,this._y=(o+f)/y,this._z=(c+p)/y}else if(h>g){const y=2*Math.sqrt(1+h-r-g);this._w=(c-p)/y,this._x=(o+f)/y,this._y=.25*y,this._z=(m+x)/y}else{const y=2*Math.sqrt(1+g-r-h);this._w=(f-o)/y,this._x=(c+p)/y,this._y=(m+x)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let r=e.dot(n)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,n){const r=this.angleTo(e);if(r===0)return this;const o=Math.min(1,n/r);return this.slerp(e,o),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const r=e._x,o=e._y,c=e._z,f=e._w,h=n._x,m=n._y,p=n._z,x=n._w;return this._x=r*x+f*h+o*p-c*m,this._y=o*x+f*m+c*h-r*p,this._z=c*x+f*p+r*m-o*h,this._w=f*x-r*h-o*m-c*p,this._onChangeCallback(),this}slerp(e,n){if(n<=0)return this;if(n>=1)return this.copy(e);let r=e._x,o=e._y,c=e._z,f=e._w,h=this.dot(e);h<0&&(r=-r,o=-o,c=-c,f=-f,h=-h);let m=1-n;if(h<.9995){const p=Math.acos(h),x=Math.sin(p);m=Math.sin(m*p)/x,n=Math.sin(n*p)/x,this._x=this._x*m+r*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+f*n,this._onChangeCallback()}else this._x=this._x*m+r*n,this._y=this._y*m+o*n,this._z=this._z*m+c*n,this._w=this._w*m+f*n,this.normalize();return this}slerpQuaternions(e,n,r){return this.copy(e).slerp(n,r)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),r=Math.random(),o=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(o*Math.sin(e),o*Math.cos(e),c*Math.sin(n),c*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class se{constructor(e=0,n=0,r=0){se.prototype.isVector3=!0,this.x=e,this.y=n,this.z=r}set(e,n,r){return r===void 0&&(r=this.z),this.x=e,this.y=n,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Av.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Av.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,r=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[3]*r+c[6]*o,this.y=c[1]*n+c[4]*r+c[7]*o,this.z=c[2]*n+c[5]*r+c[8]*o,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,r=this.y,o=this.z,c=e.elements,f=1/(c[3]*n+c[7]*r+c[11]*o+c[15]);return this.x=(c[0]*n+c[4]*r+c[8]*o+c[12])*f,this.y=(c[1]*n+c[5]*r+c[9]*o+c[13])*f,this.z=(c[2]*n+c[6]*r+c[10]*o+c[14])*f,this}applyQuaternion(e){const n=this.x,r=this.y,o=this.z,c=e.x,f=e.y,h=e.z,m=e.w,p=2*(f*o-h*r),x=2*(h*n-c*o),g=2*(c*r-f*n);return this.x=n+m*p+f*g-h*x,this.y=r+m*x+h*p-c*g,this.z=o+m*g+c*x-f*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,r=this.y,o=this.z,c=e.elements;return this.x=c[0]*n+c[4]*r+c[8]*o,this.y=c[1]*n+c[5]*r+c[9]*o,this.z=c[2]*n+c[6]*r+c[10]*o,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Mt(this.x,e.x,n.x),this.y=Mt(this.y,e.y,n.y),this.z=Mt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Mt(this.x,e,n),this.y=Mt(this.y,e,n),this.z=Mt(this.z,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Mt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const r=e.x,o=e.y,c=e.z,f=n.x,h=n.y,m=n.z;return this.x=o*m-c*h,this.y=c*f-r*m,this.z=r*h-o*f,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const r=e.dot(this)/n;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return mh.copy(this).projectOnVector(e),this.sub(mh)}reflect(e){return this.sub(mh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const r=this.dot(e)/n;return Math.acos(Mt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,r=this.y-e.y,o=this.z-e.z;return n*n+r*r+o*o}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,r){const o=Math.sin(n)*e;return this.x=o*Math.sin(r),this.y=Math.cos(n)*e,this.z=o*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,r){return this.x=e*Math.sin(n),this.y=r,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),o=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=r,this.z=o,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,r=Math.sqrt(1-n*n);return this.x=r*Math.cos(e),this.y=n,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const mh=new se,Av=new Kr;class pt{constructor(e,n,r,o,c,f,h,m,p){pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,r,o,c,f,h,m,p)}set(e,n,r,o,c,f,h,m,p){const x=this.elements;return x[0]=e,x[1]=o,x[2]=h,x[3]=n,x[4]=c,x[5]=m,x[6]=r,x[7]=f,x[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],this}extractBasis(e,n,r){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,o=n.elements,c=this.elements,f=r[0],h=r[3],m=r[6],p=r[1],x=r[4],g=r[7],v=r[2],y=r[5],M=r[8],A=o[0],b=o[3],S=o[6],z=o[1],N=o[4],D=o[7],G=o[2],L=o[5],F=o[8];return c[0]=f*A+h*z+m*G,c[3]=f*b+h*N+m*L,c[6]=f*S+h*D+m*F,c[1]=p*A+x*z+g*G,c[4]=p*b+x*N+g*L,c[7]=p*S+x*D+g*F,c[2]=v*A+y*z+M*G,c[5]=v*b+y*N+M*L,c[8]=v*S+y*D+M*F,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[1],o=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],x=e[8];return n*f*x-n*h*p-r*c*x+r*h*m+o*c*p-o*f*m}invert(){const e=this.elements,n=e[0],r=e[1],o=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],x=e[8],g=x*f-h*p,v=h*m-x*c,y=p*c-f*m,M=n*g+r*v+o*y;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/M;return e[0]=g*A,e[1]=(o*p-x*r)*A,e[2]=(h*r-o*f)*A,e[3]=v*A,e[4]=(x*n-o*m)*A,e[5]=(o*c-h*n)*A,e[6]=y*A,e[7]=(r*m-p*n)*A,e[8]=(f*n-r*c)*A,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,r,o,c,f,h){const m=Math.cos(c),p=Math.sin(c);return this.set(r*m,r*p,-r*(m*f+p*h)+f+e,-o*p,o*m,-o*(-p*f+m*h)+h+n,0,0,1),this}scale(e,n){return this.premultiply(xh.makeScale(e,n)),this}rotate(e){return this.premultiply(xh.makeRotation(-e)),this}translate(e,n){return this.premultiply(xh.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,r,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,r=e.elements;for(let o=0;o<9;o++)if(n[o]!==r[o])return!1;return!0}fromArray(e,n=0){for(let r=0;r<9;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const xh=new pt,Rv=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wv=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function FM(){const a={enabled:!0,workingColorSpace:fo,spaces:{},convert:function(o,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===Wt&&(o.r=Ea(o.r),o.g=Ea(o.g),o.b=Ea(o.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(o.applyMatrix3(this.spaces[c].toXYZ),o.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===Wt&&(o.r=so(o.r),o.g=so(o.g),o.b=so(o.b))),o},workingToColorSpace:function(o,c){return this.convert(o,this.workingColorSpace,c)},colorSpaceToWorking:function(o,c){return this.convert(o,c,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===lr?Fu:this.spaces[o].transfer},getToneMappingMode:function(o){return this.spaces[o].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(o,c=this.workingColorSpace){return o.fromArray(this.spaces[c].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,c,f){return o.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(o,c){return zl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),a.workingToColorSpace(o,c)},toWorkingColorSpace:function(o,c){return zl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),a.colorSpaceToWorking(o,c)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return a.define({[fo]:{primaries:e,whitePoint:r,transfer:Fu,toXYZ:Rv,fromXYZ:wv,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:yi},outputColorSpaceConfig:{drawingBufferColorSpace:yi}},[yi]:{primaries:e,whitePoint:r,transfer:Wt,toXYZ:Rv,fromXYZ:wv,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:yi}}}),a}const Nt=FM();function Ea(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function so(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let Ns;class PM{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Ns===void 0&&(Ns=zu("canvas")),Ns.width=e.width,Ns.height=e.height;const o=Ns.getContext("2d");e instanceof ImageData?o.putImageData(e,0,0):o.drawImage(e,0,0,e.width,e.height),r=Ns}return r.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=zu("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const o=r.getImageData(0,0,e.width,e.height),c=o.data;for(let f=0;f<c.length;f++)c[f]=Ea(c[f]/255)*255;return r.putImageData(o,0,0),n}else if(e.data){const n=e.data.slice(0);for(let r=0;r<n.length;r++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[r]=Math.floor(Ea(n[r]/255)*255):n[r]=Ea(n[r]);return{data:n,width:e.width,height:e.height}}else return ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zM=0;class sm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zM++}),this.uuid=_o(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},o=this.data;if(o!==null){let c;if(Array.isArray(o)){c=[];for(let f=0,h=o.length;f<h;f++)o[f].isDataTexture?c.push(gh(o[f].image)):c.push(gh(o[f]))}else c=gh(o);r.url=c}return n||(e.images[this.uuid]=r),r}}function gh(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?PM.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(ct("Texture: Unable to serialize Texture."),{})}let BM=0;const vh=new se;class Vn extends vo{constructor(e=Vn.DEFAULT_IMAGE,n=Vn.DEFAULT_MAPPING,r=ya,o=ya,c=Mi,f=Wr,h=Ni,m=Ra,p=Vn.DEFAULT_ANISOTROPY,x=lr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BM++}),this.uuid=_o(),this.name="",this.source=new sm(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=o,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=x,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vh).x}get height(){return this.source.getSize(vh).y}get depth(){return this.source.getSize(vh).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const r=e[n];if(r===void 0){ct(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){ct(`Texture.setValues(): property '${n}' does not exist.`);continue}o&&r&&o.isVector2&&r.isVector2||o&&r&&o.isVector3&&r.isVector3||o&&r&&o.isMatrix3&&r.isMatrix3?o.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),n||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==k_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ap:e.x=e.x-Math.floor(e.x);break;case ya:e.x=e.x<0?0:1;break;case rp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ap:e.y=e.y-Math.floor(e.y);break;case ya:e.y=e.y<0?0:1;break;case rp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Vn.DEFAULT_IMAGE=null;Vn.DEFAULT_MAPPING=k_;Vn.DEFAULT_ANISOTROPY=1;class ln{constructor(e=0,n=0,r=0,o=1){ln.prototype.isVector4=!0,this.x=e,this.y=n,this.z=r,this.w=o}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,r,o){return this.x=e,this.y=n,this.z=r,this.w=o,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,r=this.y,o=this.z,c=this.w,f=e.elements;return this.x=f[0]*n+f[4]*r+f[8]*o+f[12]*c,this.y=f[1]*n+f[5]*r+f[9]*o+f[13]*c,this.z=f[2]*n+f[6]*r+f[10]*o+f[14]*c,this.w=f[3]*n+f[7]*r+f[11]*o+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,r,o,c;const m=e.elements,p=m[0],x=m[4],g=m[8],v=m[1],y=m[5],M=m[9],A=m[2],b=m[6],S=m[10];if(Math.abs(x-v)<.01&&Math.abs(g-A)<.01&&Math.abs(M-b)<.01){if(Math.abs(x+v)<.1&&Math.abs(g+A)<.1&&Math.abs(M+b)<.1&&Math.abs(p+y+S-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const N=(p+1)/2,D=(y+1)/2,G=(S+1)/2,L=(x+v)/4,F=(g+A)/4,Z=(M+b)/4;return N>D&&N>G?N<.01?(r=0,o=.707106781,c=.707106781):(r=Math.sqrt(N),o=L/r,c=F/r):D>G?D<.01?(r=.707106781,o=0,c=.707106781):(o=Math.sqrt(D),r=L/o,c=Z/o):G<.01?(r=.707106781,o=.707106781,c=0):(c=Math.sqrt(G),r=F/c,o=Z/c),this.set(r,o,c,n),this}let z=Math.sqrt((b-M)*(b-M)+(g-A)*(g-A)+(v-x)*(v-x));return Math.abs(z)<.001&&(z=1),this.x=(b-M)/z,this.y=(g-A)/z,this.z=(v-x)/z,this.w=Math.acos((p+y+S-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Mt(this.x,e.x,n.x),this.y=Mt(this.y,e.y,n.y),this.z=Mt(this.z,e.z,n.z),this.w=Mt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Mt(this.x,e,n),this.y=Mt(this.y,e,n),this.z=Mt(this.z,e,n),this.w=Mt(this.w,e,n),this}clampLength(e,n){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Mt(r,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,r){return this.x=e.x+(n.x-e.x)*r,this.y=e.y+(n.y-e.y)*r,this.z=e.z+(n.z-e.z)*r,this.w=e.w+(n.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class IM extends vo{constructor(e=1,n=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=r.depth,this.scissor=new ln(0,0,e,n),this.scissorTest=!1,this.viewport=new ln(0,0,e,n);const o={width:e,height:n,depth:r.depth},c=new Vn(o);this.textures=[];const f=r.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const n={minFilter:Mi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,r=1){if(this.width!==e||this.height!==n||this.depth!==r){this.width=e,this.height=n,this.depth=r;for(let o=0,c=this.textures.length;o<c;o++)this.textures[o].image.width=e,this.textures[o].image.height=n,this.textures[o].image.depth=r,this.textures[o].isData3DTexture!==!0&&(this.textures[o].isArrayTexture=this.textures[o].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const o=Object.assign({},e.textures[n].image);this.textures[n].source=new sm(o)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zr extends IM{constructor(e=1,n=1,r={}){super(e,n,r),this.isWebGLRenderTarget=!0}}class $_ extends Vn{constructor(e=null,n=1,r=1,o=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:r,depth:o},this.magFilter=ci,this.minFilter=ci,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class GM extends Vn{constructor(e=null,n=1,r=1,o=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:r,depth:o},this.magFilter=ci,this.minFilter=ci,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xl{constructor(e=new se(1/0,1/0,1/0),n=new se(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n+=3)this.expandByPoint(wi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,r=e.count;n<r;n++)this.expandByPoint(wi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,r=e.length;n<r;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const r=wi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const c=r.getAttribute("position");if(n===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,wi):wi.fromBufferAttribute(c,f),wi.applyMatrix4(e.matrixWorld),this.expandByPoint(wi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),au.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),au.copy(r.boundingBox)),au.applyMatrix4(e.matrixWorld),this.union(au)}const o=e.children;for(let c=0,f=o.length;c<f;c++)this.expandByObject(o[c],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wi),wi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,r;return e.normal.x>0?(n=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),n<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vl),ru.subVectors(this.max,vl),Os.subVectors(e.a,vl),Fs.subVectors(e.b,vl),Ps.subVectors(e.c,vl),tr.subVectors(Fs,Os),nr.subVectors(Ps,Fs),Lr.subVectors(Os,Ps);let n=[0,-tr.z,tr.y,0,-nr.z,nr.y,0,-Lr.z,Lr.y,tr.z,0,-tr.x,nr.z,0,-nr.x,Lr.z,0,-Lr.x,-tr.y,tr.x,0,-nr.y,nr.x,0,-Lr.y,Lr.x,0];return!_h(n,Os,Fs,Ps,ru)||(n=[1,0,0,0,1,0,0,0,1],!_h(n,Os,Fs,Ps,ru))?!1:(su.crossVectors(tr,nr),n=[su.x,su.y,su.z],_h(n,Os,Fs,Ps,ru))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(da[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),da[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),da[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),da[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),da[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),da[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),da[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),da[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(da),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const da=[new se,new se,new se,new se,new se,new se,new se,new se],wi=new se,au=new Xl,Os=new se,Fs=new se,Ps=new se,tr=new se,nr=new se,Lr=new se,vl=new se,ru=new se,su=new se,Ur=new se;function _h(a,e,n,r,o){for(let c=0,f=a.length-3;c<=f;c+=3){Ur.fromArray(a,c);const h=o.x*Math.abs(Ur.x)+o.y*Math.abs(Ur.y)+o.z*Math.abs(Ur.z),m=e.dot(Ur),p=n.dot(Ur),x=r.dot(Ur);if(Math.max(-Math.max(m,p,x),Math.min(m,p,x))>h)return!1}return!0}const HM=new Xl,_l=new se,Sh=new se;class om{constructor(e=new se,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const r=this.center;n!==void 0?r.copy(n):HM.setFromPoints(e).getCenter(r);let o=0;for(let c=0,f=e.length;c<f;c++)o=Math.max(o,r.distanceToSquared(e[c]));return this.radius=Math.sqrt(o),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const r=this.center.distanceToSquared(e);return n.copy(e),r>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_l.subVectors(e,this.center);const n=_l.lengthSq();if(n>this.radius*this.radius){const r=Math.sqrt(n),o=(r-this.radius)*.5;this.center.addScaledVector(_l,o/r),this.radius+=o}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Sh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_l.copy(e.center).add(Sh)),this.expandByPoint(_l.copy(e.center).sub(Sh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ha=new se,yh=new se,ou=new se,ir=new se,bh=new se,lu=new se,Mh=new se;class eS{constructor(e=new se,n=new se(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ha)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const r=n.dot(this.direction);return r<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ha.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ha.copy(this.origin).addScaledVector(this.direction,n),ha.distanceToSquared(e))}distanceSqToSegment(e,n,r,o){yh.copy(e).add(n).multiplyScalar(.5),ou.copy(n).sub(e).normalize(),ir.copy(this.origin).sub(yh);const c=e.distanceTo(n)*.5,f=-this.direction.dot(ou),h=ir.dot(this.direction),m=-ir.dot(ou),p=ir.lengthSq(),x=Math.abs(1-f*f);let g,v,y,M;if(x>0)if(g=f*m-h,v=f*h-m,M=c*x,g>=0)if(v>=-M)if(v<=M){const A=1/x;g*=A,v*=A,y=g*(g+f*v+2*h)+v*(f*g+v+2*m)+p}else v=c,g=Math.max(0,-(f*v+h)),y=-g*g+v*(v+2*m)+p;else v=-c,g=Math.max(0,-(f*v+h)),y=-g*g+v*(v+2*m)+p;else v<=-M?(g=Math.max(0,-(-f*c+h)),v=g>0?-c:Math.min(Math.max(-c,-m),c),y=-g*g+v*(v+2*m)+p):v<=M?(g=0,v=Math.min(Math.max(-c,-m),c),y=v*(v+2*m)+p):(g=Math.max(0,-(f*c+h)),v=g>0?c:Math.min(Math.max(-c,-m),c),y=-g*g+v*(v+2*m)+p);else v=f>0?-c:c,g=Math.max(0,-(f*v+h)),y=-g*g+v*(v+2*m)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,g),o&&o.copy(yh).addScaledVector(ou,v),y}intersectSphere(e,n){ha.subVectors(e.center,this.origin);const r=ha.dot(this.direction),o=ha.dot(ha)-r*r,c=e.radius*e.radius;if(o>c)return null;const f=Math.sqrt(c-o),h=r-f,m=r+f;return m<0?null:h<0?this.at(m,n):this.at(h,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/n;return r>=0?r:null}intersectPlane(e,n){const r=this.distanceToPlane(e);return r===null?null:this.at(r,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let r,o,c,f,h,m;const p=1/this.direction.x,x=1/this.direction.y,g=1/this.direction.z,v=this.origin;return p>=0?(r=(e.min.x-v.x)*p,o=(e.max.x-v.x)*p):(r=(e.max.x-v.x)*p,o=(e.min.x-v.x)*p),x>=0?(c=(e.min.y-v.y)*x,f=(e.max.y-v.y)*x):(c=(e.max.y-v.y)*x,f=(e.min.y-v.y)*x),r>f||c>o||((c>r||isNaN(r))&&(r=c),(f<o||isNaN(o))&&(o=f),g>=0?(h=(e.min.z-v.z)*g,m=(e.max.z-v.z)*g):(h=(e.max.z-v.z)*g,m=(e.min.z-v.z)*g),r>m||h>o)||((h>r||r!==r)&&(r=h),(m<o||o!==o)&&(o=m),o<0)?null:this.at(r>=0?r:o,n)}intersectsBox(e){return this.intersectBox(e,ha)!==null}intersectTriangle(e,n,r,o,c){bh.subVectors(n,e),lu.subVectors(r,e),Mh.crossVectors(bh,lu);let f=this.direction.dot(Mh),h;if(f>0){if(o)return null;h=1}else if(f<0)h=-1,f=-f;else return null;ir.subVectors(this.origin,e);const m=h*this.direction.dot(lu.crossVectors(ir,lu));if(m<0)return null;const p=h*this.direction.dot(bh.cross(ir));if(p<0||m+p>f)return null;const x=-h*ir.dot(Mh);return x<0?null:this.at(x/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class cn{constructor(e,n,r,o,c,f,h,m,p,x,g,v,y,M,A,b){cn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,r,o,c,f,h,m,p,x,g,v,y,M,A,b)}set(e,n,r,o,c,f,h,m,p,x,g,v,y,M,A,b){const S=this.elements;return S[0]=e,S[4]=n,S[8]=r,S[12]=o,S[1]=c,S[5]=f,S[9]=h,S[13]=m,S[2]=p,S[6]=x,S[10]=g,S[14]=v,S[3]=y,S[7]=M,S[11]=A,S[15]=b,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new cn().fromArray(this.elements)}copy(e){const n=this.elements,r=e.elements;return n[0]=r[0],n[1]=r[1],n[2]=r[2],n[3]=r[3],n[4]=r[4],n[5]=r[5],n[6]=r[6],n[7]=r[7],n[8]=r[8],n[9]=r[9],n[10]=r[10],n[11]=r[11],n[12]=r[12],n[13]=r[13],n[14]=r[14],n[15]=r[15],this}copyPosition(e){const n=this.elements,r=e.elements;return n[12]=r[12],n[13]=r[13],n[14]=r[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,r){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,n,r){return this.set(e.x,n.x,r.x,0,e.y,n.y,r.y,0,e.z,n.z,r.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,r=e.elements,o=1/zs.setFromMatrixColumn(e,0).length(),c=1/zs.setFromMatrixColumn(e,1).length(),f=1/zs.setFromMatrixColumn(e,2).length();return n[0]=r[0]*o,n[1]=r[1]*o,n[2]=r[2]*o,n[3]=0,n[4]=r[4]*c,n[5]=r[5]*c,n[6]=r[6]*c,n[7]=0,n[8]=r[8]*f,n[9]=r[9]*f,n[10]=r[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,r=e.x,o=e.y,c=e.z,f=Math.cos(r),h=Math.sin(r),m=Math.cos(o),p=Math.sin(o),x=Math.cos(c),g=Math.sin(c);if(e.order==="XYZ"){const v=f*x,y=f*g,M=h*x,A=h*g;n[0]=m*x,n[4]=-m*g,n[8]=p,n[1]=y+M*p,n[5]=v-A*p,n[9]=-h*m,n[2]=A-v*p,n[6]=M+y*p,n[10]=f*m}else if(e.order==="YXZ"){const v=m*x,y=m*g,M=p*x,A=p*g;n[0]=v+A*h,n[4]=M*h-y,n[8]=f*p,n[1]=f*g,n[5]=f*x,n[9]=-h,n[2]=y*h-M,n[6]=A+v*h,n[10]=f*m}else if(e.order==="ZXY"){const v=m*x,y=m*g,M=p*x,A=p*g;n[0]=v-A*h,n[4]=-f*g,n[8]=M+y*h,n[1]=y+M*h,n[5]=f*x,n[9]=A-v*h,n[2]=-f*p,n[6]=h,n[10]=f*m}else if(e.order==="ZYX"){const v=f*x,y=f*g,M=h*x,A=h*g;n[0]=m*x,n[4]=M*p-y,n[8]=v*p+A,n[1]=m*g,n[5]=A*p+v,n[9]=y*p-M,n[2]=-p,n[6]=h*m,n[10]=f*m}else if(e.order==="YZX"){const v=f*m,y=f*p,M=h*m,A=h*p;n[0]=m*x,n[4]=A-v*g,n[8]=M*g+y,n[1]=g,n[5]=f*x,n[9]=-h*x,n[2]=-p*x,n[6]=y*g+M,n[10]=v-A*g}else if(e.order==="XZY"){const v=f*m,y=f*p,M=h*m,A=h*p;n[0]=m*x,n[4]=-g,n[8]=p*x,n[1]=v*g+A,n[5]=f*x,n[9]=y*g-M,n[2]=M*g-y,n[6]=h*x,n[10]=A*g+v}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(VM,e,kM)}lookAt(e,n,r){const o=this.elements;return ri.subVectors(e,n),ri.lengthSq()===0&&(ri.z=1),ri.normalize(),ar.crossVectors(r,ri),ar.lengthSq()===0&&(Math.abs(r.z)===1?ri.x+=1e-4:ri.z+=1e-4,ri.normalize(),ar.crossVectors(r,ri)),ar.normalize(),cu.crossVectors(ri,ar),o[0]=ar.x,o[4]=cu.x,o[8]=ri.x,o[1]=ar.y,o[5]=cu.y,o[9]=ri.y,o[2]=ar.z,o[6]=cu.z,o[10]=ri.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const r=e.elements,o=n.elements,c=this.elements,f=r[0],h=r[4],m=r[8],p=r[12],x=r[1],g=r[5],v=r[9],y=r[13],M=r[2],A=r[6],b=r[10],S=r[14],z=r[3],N=r[7],D=r[11],G=r[15],L=o[0],F=o[4],Z=o[8],C=o[12],w=o[1],k=o[5],ne=o[9],le=o[13],fe=o[2],pe=o[6],P=o[10],te=o[14],j=o[3],ve=o[7],Se=o[11],U=o[15];return c[0]=f*L+h*w+m*fe+p*j,c[4]=f*F+h*k+m*pe+p*ve,c[8]=f*Z+h*ne+m*P+p*Se,c[12]=f*C+h*le+m*te+p*U,c[1]=x*L+g*w+v*fe+y*j,c[5]=x*F+g*k+v*pe+y*ve,c[9]=x*Z+g*ne+v*P+y*Se,c[13]=x*C+g*le+v*te+y*U,c[2]=M*L+A*w+b*fe+S*j,c[6]=M*F+A*k+b*pe+S*ve,c[10]=M*Z+A*ne+b*P+S*Se,c[14]=M*C+A*le+b*te+S*U,c[3]=z*L+N*w+D*fe+G*j,c[7]=z*F+N*k+D*pe+G*ve,c[11]=z*Z+N*ne+D*P+G*Se,c[15]=z*C+N*le+D*te+G*U,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],r=e[4],o=e[8],c=e[12],f=e[1],h=e[5],m=e[9],p=e[13],x=e[2],g=e[6],v=e[10],y=e[14],M=e[3],A=e[7],b=e[11],S=e[15];return M*(+c*m*g-o*p*g-c*h*v+r*p*v+o*h*y-r*m*y)+A*(+n*m*y-n*p*v+c*f*v-o*f*y+o*p*x-c*m*x)+b*(+n*p*g-n*h*y-c*f*g+r*f*y+c*h*x-r*p*x)+S*(-o*h*x-n*m*g+n*h*v+o*f*g-r*f*v+r*m*x)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,r){const o=this.elements;return e.isVector3?(o[12]=e.x,o[13]=e.y,o[14]=e.z):(o[12]=e,o[13]=n,o[14]=r),this}invert(){const e=this.elements,n=e[0],r=e[1],o=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],x=e[8],g=e[9],v=e[10],y=e[11],M=e[12],A=e[13],b=e[14],S=e[15],z=g*b*p-A*v*p+A*m*y-h*b*y-g*m*S+h*v*S,N=M*v*p-x*b*p-M*m*y+f*b*y+x*m*S-f*v*S,D=x*A*p-M*g*p+M*h*y-f*A*y-x*h*S+f*g*S,G=M*g*m-x*A*m-M*h*v+f*A*v+x*h*b-f*g*b,L=n*z+r*N+o*D+c*G;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/L;return e[0]=z*F,e[1]=(A*v*c-g*b*c-A*o*y+r*b*y+g*o*S-r*v*S)*F,e[2]=(h*b*c-A*m*c+A*o*p-r*b*p-h*o*S+r*m*S)*F,e[3]=(g*m*c-h*v*c-g*o*p+r*v*p+h*o*y-r*m*y)*F,e[4]=N*F,e[5]=(x*b*c-M*v*c+M*o*y-n*b*y-x*o*S+n*v*S)*F,e[6]=(M*m*c-f*b*c-M*o*p+n*b*p+f*o*S-n*m*S)*F,e[7]=(f*v*c-x*m*c+x*o*p-n*v*p-f*o*y+n*m*y)*F,e[8]=D*F,e[9]=(M*g*c-x*A*c-M*r*y+n*A*y+x*r*S-n*g*S)*F,e[10]=(f*A*c-M*h*c+M*r*p-n*A*p-f*r*S+n*h*S)*F,e[11]=(x*h*c-f*g*c-x*r*p+n*g*p+f*r*y-n*h*y)*F,e[12]=G*F,e[13]=(x*A*o-M*g*o+M*r*v-n*A*v-x*r*b+n*g*b)*F,e[14]=(M*h*o-f*A*o-M*r*m+n*A*m+f*r*b-n*h*b)*F,e[15]=(f*g*o-x*h*o+x*r*m-n*g*m-f*r*v+n*h*v)*F,this}scale(e){const n=this.elements,r=e.x,o=e.y,c=e.z;return n[0]*=r,n[4]*=o,n[8]*=c,n[1]*=r,n[5]*=o,n[9]*=c,n[2]*=r,n[6]*=o,n[10]*=c,n[3]*=r,n[7]*=o,n[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],o=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,r,o))}makeTranslation(e,n,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,r,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,n,-r,0,0,r,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,0,r,0,0,1,0,0,-r,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),r=Math.sin(e);return this.set(n,-r,0,0,r,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const r=Math.cos(n),o=Math.sin(n),c=1-r,f=e.x,h=e.y,m=e.z,p=c*f,x=c*h;return this.set(p*f+r,p*h-o*m,p*m+o*h,0,p*h+o*m,x*h+r,x*m-o*f,0,p*m-o*h,x*m+o*f,c*m*m+r,0,0,0,0,1),this}makeScale(e,n,r){return this.set(e,0,0,0,0,n,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,n,r,o,c,f){return this.set(1,r,c,0,e,1,f,0,n,o,1,0,0,0,0,1),this}compose(e,n,r){const o=this.elements,c=n._x,f=n._y,h=n._z,m=n._w,p=c+c,x=f+f,g=h+h,v=c*p,y=c*x,M=c*g,A=f*x,b=f*g,S=h*g,z=m*p,N=m*x,D=m*g,G=r.x,L=r.y,F=r.z;return o[0]=(1-(A+S))*G,o[1]=(y+D)*G,o[2]=(M-N)*G,o[3]=0,o[4]=(y-D)*L,o[5]=(1-(v+S))*L,o[6]=(b+z)*L,o[7]=0,o[8]=(M+N)*F,o[9]=(b-z)*F,o[10]=(1-(v+A))*F,o[11]=0,o[12]=e.x,o[13]=e.y,o[14]=e.z,o[15]=1,this}decompose(e,n,r){const o=this.elements;let c=zs.set(o[0],o[1],o[2]).length();const f=zs.set(o[4],o[5],o[6]).length(),h=zs.set(o[8],o[9],o[10]).length();this.determinant()<0&&(c=-c),e.x=o[12],e.y=o[13],e.z=o[14],Ci.copy(this);const p=1/c,x=1/f,g=1/h;return Ci.elements[0]*=p,Ci.elements[1]*=p,Ci.elements[2]*=p,Ci.elements[4]*=x,Ci.elements[5]*=x,Ci.elements[6]*=x,Ci.elements[8]*=g,Ci.elements[9]*=g,Ci.elements[10]*=g,n.setFromRotationMatrix(Ci),r.x=c,r.y=f,r.z=h,this}makePerspective(e,n,r,o,c,f,h=Vi,m=!1){const p=this.elements,x=2*c/(n-e),g=2*c/(r-o),v=(n+e)/(n-e),y=(r+o)/(r-o);let M,A;if(m)M=c/(f-c),A=f*c/(f-c);else if(h===Vi)M=-(f+c)/(f-c),A=-2*f*c/(f-c);else if(h===Pu)M=-f/(f-c),A=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=x,p[4]=0,p[8]=v,p[12]=0,p[1]=0,p[5]=g,p[9]=y,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,n,r,o,c,f,h=Vi,m=!1){const p=this.elements,x=2/(n-e),g=2/(r-o),v=-(n+e)/(n-e),y=-(r+o)/(r-o);let M,A;if(m)M=1/(f-c),A=f/(f-c);else if(h===Vi)M=-2/(f-c),A=-(f+c)/(f-c);else if(h===Pu)M=-1/(f-c),A=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=x,p[4]=0,p[8]=0,p[12]=v,p[1]=0,p[5]=g,p[9]=0,p[13]=y,p[2]=0,p[6]=0,p[10]=M,p[14]=A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const n=this.elements,r=e.elements;for(let o=0;o<16;o++)if(n[o]!==r[o])return!1;return!0}fromArray(e,n=0){for(let r=0;r<16;r++)this.elements[r]=e[r+n];return this}toArray(e=[],n=0){const r=this.elements;return e[n]=r[0],e[n+1]=r[1],e[n+2]=r[2],e[n+3]=r[3],e[n+4]=r[4],e[n+5]=r[5],e[n+6]=r[6],e[n+7]=r[7],e[n+8]=r[8],e[n+9]=r[9],e[n+10]=r[10],e[n+11]=r[11],e[n+12]=r[12],e[n+13]=r[13],e[n+14]=r[14],e[n+15]=r[15],e}}const zs=new se,Ci=new cn,VM=new se(0,0,0),kM=new se(1,1,1),ar=new se,cu=new se,ri=new se,Cv=new cn,Dv=new Kr;class wa{constructor(e=0,n=0,r=0,o=wa.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=r,this._order=o}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,r,o=this._order){return this._x=e,this._y=n,this._z=r,this._order=o,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,r=!0){const o=e.elements,c=o[0],f=o[4],h=o[8],m=o[1],p=o[5],x=o[9],g=o[2],v=o[6],y=o[10];switch(n){case"XYZ":this._y=Math.asin(Mt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-x,y),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(v,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(h,y),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-g,c),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-g,y),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Mt(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(v,y),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(Mt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-x,p),this._y=Math.atan2(-g,c)):(this._x=0,this._y=Math.atan2(h,y));break;case"XZY":this._z=Math.asin(-Mt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(v,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-x,y),this._y=0);break;default:ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,r){return Cv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cv,n,r)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Dv.setFromEuler(this),this.setFromQuaternion(Dv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wa.DEFAULT_ORDER="XYZ";class lm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let XM=0;const Lv=new se,Bs=new Kr,pa=new cn,uu=new se,Sl=new se,WM=new se,qM=new Kr,Uv=new se(1,0,0),Nv=new se(0,1,0),Ov=new se(0,0,1),Fv={type:"added"},YM={type:"removed"},Is={type:"childadded",child:null},Eh={type:"childremoved",child:null};class ui extends vo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:XM++}),this.uuid=_o(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ui.DEFAULT_UP.clone();const e=new se,n=new wa,r=new Kr,o=new se(1,1,1);function c(){r.setFromEuler(n,!1)}function f(){n.setFromQuaternion(r,void 0,!1)}n._onChange(c),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:o},modelViewMatrix:{value:new cn},normalMatrix:{value:new pt}}),this.matrix=new cn,this.matrixWorld=new cn,this.matrixAutoUpdate=ui.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Bs.setFromAxisAngle(e,n),this.quaternion.multiply(Bs),this}rotateOnWorldAxis(e,n){return Bs.setFromAxisAngle(e,n),this.quaternion.premultiply(Bs),this}rotateX(e){return this.rotateOnAxis(Uv,e)}rotateY(e){return this.rotateOnAxis(Nv,e)}rotateZ(e){return this.rotateOnAxis(Ov,e)}translateOnAxis(e,n){return Lv.copy(e).applyQuaternion(this.quaternion),this.position.add(Lv.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Uv,e)}translateY(e){return this.translateOnAxis(Nv,e)}translateZ(e){return this.translateOnAxis(Ov,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pa.copy(this.matrixWorld).invert())}lookAt(e,n,r){e.isVector3?uu.copy(e):uu.set(e,n,r);const o=this.parent;this.updateWorldMatrix(!0,!1),Sl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pa.lookAt(Sl,uu,this.up):pa.lookAt(uu,Sl,this.up),this.quaternion.setFromRotationMatrix(pa),o&&(pa.extractRotation(o.matrixWorld),Bs.setFromRotationMatrix(pa),this.quaternion.premultiply(Bs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(nn("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fv),Is.child=e,this.dispatchEvent(Is),Is.child=null):nn("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(YM),Eh.child=e,this.dispatchEvent(Eh),Eh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pa.multiply(e.parent.matrixWorld)),e.applyMatrix4(pa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fv),Is.child=e,this.dispatchEvent(Is),Is.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let r=0,o=this.children.length;r<o;r++){const f=this.children[r].getObjectByProperty(e,n);if(f!==void 0)return f}}getObjectsByProperty(e,n,r=[]){this[e]===n&&r.push(this);const o=this.children;for(let c=0,f=o.length;c<f;c++)o[c].getObjectsByProperty(e,n,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sl,e,WM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sl,qM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].updateMatrixWorld(e)}updateWorldMatrix(e,n){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const o=this.children;for(let c=0,f=o.length;c<f;c++)o[c].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",r={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const o={};o.uuid=this.uuid,o.type=this.type,this.name!==""&&(o.name=this.name),this.castShadow===!0&&(o.castShadow=!0),this.receiveShadow===!0&&(o.receiveShadow=!0),this.visible===!1&&(o.visible=!1),this.frustumCulled===!1&&(o.frustumCulled=!1),this.renderOrder!==0&&(o.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(o.userData=this.userData),o.layers=this.layers.mask,o.matrix=this.matrix.toArray(),o.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(o.matrixAutoUpdate=!1),this.isInstancedMesh&&(o.type="InstancedMesh",o.count=this.count,o.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(o.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(o.type="BatchedMesh",o.perObjectFrustumCulled=this.perObjectFrustumCulled,o.sortObjects=this.sortObjects,o.drawRanges=this._drawRanges,o.reservedRanges=this._reservedRanges,o.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),o.instanceInfo=this._instanceInfo.map(h=>({...h})),o.availableInstanceIds=this._availableInstanceIds.slice(),o.availableGeometryIds=this._availableGeometryIds.slice(),o.nextIndexStart=this._nextIndexStart,o.nextVertexStart=this._nextVertexStart,o.geometryCount=this._geometryCount,o.maxInstanceCount=this._maxInstanceCount,o.maxVertexCount=this._maxVertexCount,o.maxIndexCount=this._maxIndexCount,o.geometryInitialized=this._geometryInitialized,o.matricesTexture=this._matricesTexture.toJSON(e),o.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(o.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(o.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(o.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?o.background=this.background.toJSON():this.background.isTexture&&(o.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(o.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){o.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,x=m.length;p<x;p++){const g=m[p];c(e.shapes,g)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(o.bindMode=this.bindMode,o.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),o.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(e.materials,this.material[m]));o.material=h}else o.material=c(e.materials,this.material);if(this.children.length>0){o.children=[];for(let h=0;h<this.children.length;h++)o.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){o.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];o.animations.push(c(e.animations,m))}}if(n){const h=f(e.geometries),m=f(e.materials),p=f(e.textures),x=f(e.images),g=f(e.shapes),v=f(e.skeletons),y=f(e.animations),M=f(e.nodes);h.length>0&&(r.geometries=h),m.length>0&&(r.materials=m),p.length>0&&(r.textures=p),x.length>0&&(r.images=x),g.length>0&&(r.shapes=g),v.length>0&&(r.skeletons=v),y.length>0&&(r.animations=y),M.length>0&&(r.nodes=M)}return r.object=o,r;function f(h){const m=[];for(const p in h){const x=h[p];delete x.metadata,m.push(x)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let r=0;r<e.children.length;r++){const o=e.children[r];this.add(o.clone())}return this}}ui.DEFAULT_UP=new se(0,1,0);ui.DEFAULT_MATRIX_AUTO_UPDATE=!0;ui.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Di=new se,ma=new se,Th=new se,xa=new se,Gs=new se,Hs=new se,Pv=new se,Ah=new se,Rh=new se,wh=new se,Ch=new ln,Dh=new ln,Lh=new ln;class Ui{constructor(e=new se,n=new se,r=new se){this.a=e,this.b=n,this.c=r}static getNormal(e,n,r,o){o.subVectors(r,n),Di.subVectors(e,n),o.cross(Di);const c=o.lengthSq();return c>0?o.multiplyScalar(1/Math.sqrt(c)):o.set(0,0,0)}static getBarycoord(e,n,r,o,c){Di.subVectors(o,n),ma.subVectors(r,n),Th.subVectors(e,n);const f=Di.dot(Di),h=Di.dot(ma),m=Di.dot(Th),p=ma.dot(ma),x=ma.dot(Th),g=f*p-h*h;if(g===0)return c.set(0,0,0),null;const v=1/g,y=(p*m-h*x)*v,M=(f*x-h*m)*v;return c.set(1-y-M,M,y)}static containsPoint(e,n,r,o){return this.getBarycoord(e,n,r,o,xa)===null?!1:xa.x>=0&&xa.y>=0&&xa.x+xa.y<=1}static getInterpolation(e,n,r,o,c,f,h,m){return this.getBarycoord(e,n,r,o,xa)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,xa.x),m.addScaledVector(f,xa.y),m.addScaledVector(h,xa.z),m)}static getInterpolatedAttribute(e,n,r,o,c,f){return Ch.setScalar(0),Dh.setScalar(0),Lh.setScalar(0),Ch.fromBufferAttribute(e,n),Dh.fromBufferAttribute(e,r),Lh.fromBufferAttribute(e,o),f.setScalar(0),f.addScaledVector(Ch,c.x),f.addScaledVector(Dh,c.y),f.addScaledVector(Lh,c.z),f}static isFrontFacing(e,n,r,o){return Di.subVectors(r,n),ma.subVectors(e,n),Di.cross(ma).dot(o)<0}set(e,n,r){return this.a.copy(e),this.b.copy(n),this.c.copy(r),this}setFromPointsAndIndices(e,n,r,o){return this.a.copy(e[n]),this.b.copy(e[r]),this.c.copy(e[o]),this}setFromAttributeAndIndices(e,n,r,o){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,o),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Di.subVectors(this.c,this.b),ma.subVectors(this.a,this.b),Di.cross(ma).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ui.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Ui.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,r,o,c){return Ui.getInterpolation(e,this.a,this.b,this.c,n,r,o,c)}containsPoint(e){return Ui.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ui.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const r=this.a,o=this.b,c=this.c;let f,h;Gs.subVectors(o,r),Hs.subVectors(c,r),Ah.subVectors(e,r);const m=Gs.dot(Ah),p=Hs.dot(Ah);if(m<=0&&p<=0)return n.copy(r);Rh.subVectors(e,o);const x=Gs.dot(Rh),g=Hs.dot(Rh);if(x>=0&&g<=x)return n.copy(o);const v=m*g-x*p;if(v<=0&&m>=0&&x<=0)return f=m/(m-x),n.copy(r).addScaledVector(Gs,f);wh.subVectors(e,c);const y=Gs.dot(wh),M=Hs.dot(wh);if(M>=0&&y<=M)return n.copy(c);const A=y*p-m*M;if(A<=0&&p>=0&&M<=0)return h=p/(p-M),n.copy(r).addScaledVector(Hs,h);const b=x*M-y*g;if(b<=0&&g-x>=0&&y-M>=0)return Pv.subVectors(c,o),h=(g-x)/(g-x+(y-M)),n.copy(o).addScaledVector(Pv,h);const S=1/(b+A+v);return f=A*S,h=v*S,n.copy(r).addScaledVector(Gs,f).addScaledVector(Hs,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const tS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rr={h:0,s:0,l:0},fu={h:0,s:0,l:0};function Uh(a,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?a+(e-a)*6*n:n<1/2?e:n<2/3?a+(e-a)*6*(2/3-n):a}class Pt{constructor(e,n,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,r)}set(e,n,r){if(n===void 0&&r===void 0){const o=e;o&&o.isColor?this.copy(o):typeof o=="number"?this.setHex(o):typeof o=="string"&&this.setStyle(o)}else this.setRGB(e,n,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=yi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.colorSpaceToWorking(this,n),this}setRGB(e,n,r,o=Nt.workingColorSpace){return this.r=e,this.g=n,this.b=r,Nt.colorSpaceToWorking(this,o),this}setHSL(e,n,r,o=Nt.workingColorSpace){if(e=rm(e,1),n=Mt(n,0,1),r=Mt(r,0,1),n===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+n):r+n-r*n,f=2*r-c;this.r=Uh(f,c,e+1/3),this.g=Uh(f,c,e),this.b=Uh(f,c,e-1/3)}return Nt.colorSpaceToWorking(this,o),this}setStyle(e,n=yi){function r(c){c!==void 0&&parseFloat(c)<1&&ct("Color: Alpha component of "+e+" will be ignored.")}let o;if(o=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=o[1],h=o[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:ct("Color: Unknown color model "+e)}}else if(o=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=o[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);ct("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=yi){const r=tS[e.toLowerCase()];return r!==void 0?this.setHex(r,n):ct("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ea(e.r),this.g=Ea(e.g),this.b=Ea(e.b),this}copyLinearToSRGB(e){return this.r=so(e.r),this.g=so(e.g),this.b=so(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yi){return Nt.workingToColorSpace(zn.copy(this),e),Math.round(Mt(zn.r*255,0,255))*65536+Math.round(Mt(zn.g*255,0,255))*256+Math.round(Mt(zn.b*255,0,255))}getHexString(e=yi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Nt.workingColorSpace){Nt.workingToColorSpace(zn.copy(this),n);const r=zn.r,o=zn.g,c=zn.b,f=Math.max(r,o,c),h=Math.min(r,o,c);let m,p;const x=(h+f)/2;if(h===f)m=0,p=0;else{const g=f-h;switch(p=x<=.5?g/(f+h):g/(2-f-h),f){case r:m=(o-c)/g+(o<c?6:0);break;case o:m=(c-r)/g+2;break;case c:m=(r-o)/g+4;break}m/=6}return e.h=m,e.s=p,e.l=x,e}getRGB(e,n=Nt.workingColorSpace){return Nt.workingToColorSpace(zn.copy(this),n),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=yi){Nt.workingToColorSpace(zn.copy(this),e);const n=zn.r,r=zn.g,o=zn.b;return e!==yi?`color(${e} ${n.toFixed(3)} ${r.toFixed(3)} ${o.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(r*255)},${Math.round(o*255)})`}offsetHSL(e,n,r){return this.getHSL(rr),this.setHSL(rr.h+e,rr.s+n,rr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,r){return this.r=e.r+(n.r-e.r)*r,this.g=e.g+(n.g-e.g)*r,this.b=e.b+(n.b-e.b)*r,this}lerpHSL(e,n){this.getHSL(rr),e.getHSL(fu);const r=wl(rr.h,fu.h,n),o=wl(rr.s,fu.s,n),c=wl(rr.l,fu.l,n);return this.setHSL(r,o,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,r=this.g,o=this.b,c=e.elements;return this.r=c[0]*n+c[3]*r+c[6]*o,this.g=c[1]*n+c[4]*r+c[7]*o,this.b=c[2]*n+c[5]*r+c[8]*o,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zn=new Pt;Pt.NAMES=tS;let jM=0;class qu extends vo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jM++}),this.uuid=_o(),this.name="",this.type="Material",this.blending=ro,this.side=Aa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yh,this.blendDst=jh,this.blendEquation=Vr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const r=e[n];if(r===void 0){ct(`Material: parameter '${n}' has value of undefined.`);continue}const o=this[n];if(o===void 0){ct(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}o&&o.isColor?o.set(r):o&&o.isVector3&&r&&r.isVector3?o.copy(r):this[n]=r}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==ro&&(r.blending=this.blending),this.side!==Aa&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Yh&&(r.blendSrc=this.blendSrc),this.blendDst!==jh&&(r.blendDst=this.blendDst),this.blendEquation!==Vr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==lo&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sv&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function o(c){const f=[];for(const h in c){const m=c[h];delete m.metadata,f.push(m)}return f}if(n){const c=o(e.textures),f=o(e.images);c.length>0&&(r.textures=c),f.length>0&&(r.images=f)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let r=null;if(n!==null){const o=n.length;r=new Array(o);for(let c=0;c!==o;++c)r[c]=n[c].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Bu extends qu{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wa,this.combine=V_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mn=new se,du=new zt;let KM=0;class ki{constructor(e,n,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:KM++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=r,this.usage=yv,this.updateRanges=[],this.gpuType=ba,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,r){e*=this.itemSize,r*=n.itemSize;for(let o=0,c=this.itemSize;o<c;o++)this.array[e+o]=n.array[r+o];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,r=this.count;n<r;n++)du.fromBufferAttribute(this,n),du.applyMatrix3(e),this.setXY(n,du.x,du.y);else if(this.itemSize===3)for(let n=0,r=this.count;n<r;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix3(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyMatrix4(e){for(let n=0,r=this.count;n<r;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix4(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let n=0,r=this.count;n<r;n++)mn.fromBufferAttribute(this,n),mn.applyNormalMatrix(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let n=0,r=this.count;n<r;n++)mn.fromBufferAttribute(this,n),mn.transformDirection(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let r=this.array[e*this.itemSize+n];return this.normalized&&(r=Qs(r,this.array)),r}setComponent(e,n,r){return this.normalized&&(r=Gn(r,this.array)),this.array[e*this.itemSize+n]=r,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Qs(n,this.array)),n}setX(e,n){return this.normalized&&(n=Gn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Qs(n,this.array)),n}setY(e,n){return this.normalized&&(n=Gn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Qs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Gn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Qs(n,this.array)),n}setW(e,n){return this.normalized&&(n=Gn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,r){return e*=this.itemSize,this.normalized&&(n=Gn(n,this.array),r=Gn(r,this.array)),this.array[e+0]=n,this.array[e+1]=r,this}setXYZ(e,n,r,o){return e*=this.itemSize,this.normalized&&(n=Gn(n,this.array),r=Gn(r,this.array),o=Gn(o,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=o,this}setXYZW(e,n,r,o,c){return e*=this.itemSize,this.normalized&&(n=Gn(n,this.array),r=Gn(r,this.array),o=Gn(o,this.array),c=Gn(c,this.array)),this.array[e+0]=n,this.array[e+1]=r,this.array[e+2]=o,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==yv&&(e.usage=this.usage),e}}class nS extends ki{constructor(e,n,r){super(new Uint16Array(e),n,r)}}class iS extends ki{constructor(e,n,r){super(new Uint32Array(e),n,r)}}class qr extends ki{constructor(e,n,r){super(new Float32Array(e),n,r)}}let ZM=0;const Si=new cn,Nh=new ui,Vs=new se,si=new Xl,yl=new Xl,Tn=new se;class fr extends vo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ZM++}),this.uuid=_o(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(J_(e)?iS:nS)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,r=0){this.groups.push({start:e,count:n,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new pt().getNormalMatrix(e);r.applyNormalMatrix(c),r.needsUpdate=!0}const o=this.attributes.tangent;return o!==void 0&&(o.transformDirection(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Si.makeRotationFromQuaternion(e),this.applyMatrix4(Si),this}rotateX(e){return Si.makeRotationX(e),this.applyMatrix4(Si),this}rotateY(e){return Si.makeRotationY(e),this.applyMatrix4(Si),this}rotateZ(e){return Si.makeRotationZ(e),this.applyMatrix4(Si),this}translate(e,n,r){return Si.makeTranslation(e,n,r),this.applyMatrix4(Si),this}scale(e,n,r){return Si.makeScale(e,n,r),this.applyMatrix4(Si),this}lookAt(e){return Nh.lookAt(e),Nh.updateMatrix(),this.applyMatrix4(Nh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const r=[];for(let o=0,c=e.length;o<c;o++){const f=e[o];r.push(f.x,f.y,f.z||0)}this.setAttribute("position",new qr(r,3))}else{const r=Math.min(e.length,n.count);for(let o=0;o<r;o++){const c=e[o];n.setXYZ(o,c.x,c.y,c.z||0)}e.length>n.count&&ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xl);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nn("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new se(-1/0,-1/0,-1/0),new se(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let r=0,o=n.length;r<o;r++){const c=n[r];si.setFromBufferAttribute(c),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,si.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,si.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(si.min),this.boundingBox.expandByPoint(si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nn('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new om);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nn("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new se,1/0);return}if(e){const r=this.boundingSphere.center;if(si.setFromBufferAttribute(e),n)for(let c=0,f=n.length;c<f;c++){const h=n[c];yl.setFromBufferAttribute(h),this.morphTargetsRelative?(Tn.addVectors(si.min,yl.min),si.expandByPoint(Tn),Tn.addVectors(si.max,yl.max),si.expandByPoint(Tn)):(si.expandByPoint(yl.min),si.expandByPoint(yl.max))}si.getCenter(r);let o=0;for(let c=0,f=e.count;c<f;c++)Tn.fromBufferAttribute(e,c),o=Math.max(o,r.distanceToSquared(Tn));if(n)for(let c=0,f=n.length;c<f;c++){const h=n[c],m=this.morphTargetsRelative;for(let p=0,x=h.count;p<x;p++)Tn.fromBufferAttribute(h,p),m&&(Vs.fromBufferAttribute(e,p),Tn.add(Vs)),o=Math.max(o,r.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(o),isNaN(this.boundingSphere.radius)&&nn('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){nn("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=n.position,o=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ki(new Float32Array(4*r.count),4));const f=this.getAttribute("tangent"),h=[],m=[];for(let Z=0;Z<r.count;Z++)h[Z]=new se,m[Z]=new se;const p=new se,x=new se,g=new se,v=new zt,y=new zt,M=new zt,A=new se,b=new se;function S(Z,C,w){p.fromBufferAttribute(r,Z),x.fromBufferAttribute(r,C),g.fromBufferAttribute(r,w),v.fromBufferAttribute(c,Z),y.fromBufferAttribute(c,C),M.fromBufferAttribute(c,w),x.sub(p),g.sub(p),y.sub(v),M.sub(v);const k=1/(y.x*M.y-M.x*y.y);isFinite(k)&&(A.copy(x).multiplyScalar(M.y).addScaledVector(g,-y.y).multiplyScalar(k),b.copy(g).multiplyScalar(y.x).addScaledVector(x,-M.x).multiplyScalar(k),h[Z].add(A),h[C].add(A),h[w].add(A),m[Z].add(b),m[C].add(b),m[w].add(b))}let z=this.groups;z.length===0&&(z=[{start:0,count:e.count}]);for(let Z=0,C=z.length;Z<C;++Z){const w=z[Z],k=w.start,ne=w.count;for(let le=k,fe=k+ne;le<fe;le+=3)S(e.getX(le+0),e.getX(le+1),e.getX(le+2))}const N=new se,D=new se,G=new se,L=new se;function F(Z){G.fromBufferAttribute(o,Z),L.copy(G);const C=h[Z];N.copy(C),N.sub(G.multiplyScalar(G.dot(C))).normalize(),D.crossVectors(L,C);const k=D.dot(m[Z])<0?-1:1;f.setXYZW(Z,N.x,N.y,N.z,k)}for(let Z=0,C=z.length;Z<C;++Z){const w=z[Z],k=w.start,ne=w.count;for(let le=k,fe=k+ne;le<fe;le+=3)F(e.getX(le+0)),F(e.getX(le+1)),F(e.getX(le+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new ki(new Float32Array(n.count*3),3),this.setAttribute("normal",r);else for(let v=0,y=r.count;v<y;v++)r.setXYZ(v,0,0,0);const o=new se,c=new se,f=new se,h=new se,m=new se,p=new se,x=new se,g=new se;if(e)for(let v=0,y=e.count;v<y;v+=3){const M=e.getX(v+0),A=e.getX(v+1),b=e.getX(v+2);o.fromBufferAttribute(n,M),c.fromBufferAttribute(n,A),f.fromBufferAttribute(n,b),x.subVectors(f,c),g.subVectors(o,c),x.cross(g),h.fromBufferAttribute(r,M),m.fromBufferAttribute(r,A),p.fromBufferAttribute(r,b),h.add(x),m.add(x),p.add(x),r.setXYZ(M,h.x,h.y,h.z),r.setXYZ(A,m.x,m.y,m.z),r.setXYZ(b,p.x,p.y,p.z)}else for(let v=0,y=n.count;v<y;v+=3)o.fromBufferAttribute(n,v+0),c.fromBufferAttribute(n,v+1),f.fromBufferAttribute(n,v+2),x.subVectors(f,c),g.subVectors(o,c),x.cross(g),r.setXYZ(v+0,x.x,x.y,x.z),r.setXYZ(v+1,x.x,x.y,x.z),r.setXYZ(v+2,x.x,x.y,x.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,r=e.count;n<r;n++)Tn.fromBufferAttribute(e,n),Tn.normalize(),e.setXYZ(n,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function e(h,m){const p=h.array,x=h.itemSize,g=h.normalized,v=new p.constructor(m.length*x);let y=0,M=0;for(let A=0,b=m.length;A<b;A++){h.isInterleavedBufferAttribute?y=m[A]*h.data.stride+h.offset:y=m[A]*x;for(let S=0;S<x;S++)v[M++]=p[y++]}return new ki(v,x,g)}if(this.index===null)return ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new fr,r=this.index.array,o=this.attributes;for(const h in o){const m=o[h],p=e(m,r);n.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let x=0,g=p.length;x<g;x++){const v=p[x],y=e(v,r);m.push(y)}n.morphAttributes[h]=m}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,m=f.length;h<m;h++){const p=f[h];n.addGroup(p.start,p.count,p.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const r=this.attributes;for(const m in r){const p=r[m];e.data.attributes[m]=p.toJSON(e.data)}const o={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],x=[];for(let g=0,v=p.length;g<v;g++){const y=p[g];x.push(y.toJSON(e.data))}x.length>0&&(o[m]=x,c=!0)}c&&(e.data.morphAttributes=o,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const o=e.attributes;for(const p in o){const x=o[p];this.setAttribute(p,x.clone(n))}const c=e.morphAttributes;for(const p in c){const x=[],g=c[p];for(let v=0,y=g.length;v<y;v++)x.push(g[v].clone(n));this.morphAttributes[p]=x}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let p=0,x=f.length;p<x;p++){const g=f[p];this.addGroup(g.start,g.count,g.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zv=new cn,Nr=new eS,hu=new om,Bv=new se,pu=new se,mu=new se,xu=new se,Oh=new se,gu=new se,Iv=new se,vu=new se;class Wi extends ui{constructor(e=new fr,n=new Bu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,r=Object.keys(n);if(r.length>0){const o=n[r[0]];if(o!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=o.length;c<f;c++){const h=o[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,n){const r=this.geometry,o=r.attributes.position,c=r.morphAttributes.position,f=r.morphTargetsRelative;n.fromBufferAttribute(o,e);const h=this.morphTargetInfluences;if(c&&h){gu.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const x=h[m],g=c[m];x!==0&&(Oh.fromBufferAttribute(g,e),f?gu.addScaledVector(Oh,x):gu.addScaledVector(Oh.sub(n),x))}n.add(gu)}return n}raycast(e,n){const r=this.geometry,o=this.material,c=this.matrixWorld;o!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),hu.copy(r.boundingSphere),hu.applyMatrix4(c),Nr.copy(e.ray).recast(e.near),!(hu.containsPoint(Nr.origin)===!1&&(Nr.intersectSphere(hu,Bv)===null||Nr.origin.distanceToSquared(Bv)>(e.far-e.near)**2))&&(zv.copy(c).invert(),Nr.copy(e.ray).applyMatrix4(zv),!(r.boundingBox!==null&&Nr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,n,Nr)))}_computeIntersections(e,n,r){let o;const c=this.geometry,f=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,x=c.attributes.uv1,g=c.attributes.normal,v=c.groups,y=c.drawRange;if(h!==null)if(Array.isArray(f))for(let M=0,A=v.length;M<A;M++){const b=v[M],S=f[b.materialIndex],z=Math.max(b.start,y.start),N=Math.min(h.count,Math.min(b.start+b.count,y.start+y.count));for(let D=z,G=N;D<G;D+=3){const L=h.getX(D),F=h.getX(D+1),Z=h.getX(D+2);o=_u(this,S,e,r,p,x,g,L,F,Z),o&&(o.faceIndex=Math.floor(D/3),o.face.materialIndex=b.materialIndex,n.push(o))}}else{const M=Math.max(0,y.start),A=Math.min(h.count,y.start+y.count);for(let b=M,S=A;b<S;b+=3){const z=h.getX(b),N=h.getX(b+1),D=h.getX(b+2);o=_u(this,f,e,r,p,x,g,z,N,D),o&&(o.faceIndex=Math.floor(b/3),n.push(o))}}else if(m!==void 0)if(Array.isArray(f))for(let M=0,A=v.length;M<A;M++){const b=v[M],S=f[b.materialIndex],z=Math.max(b.start,y.start),N=Math.min(m.count,Math.min(b.start+b.count,y.start+y.count));for(let D=z,G=N;D<G;D+=3){const L=D,F=D+1,Z=D+2;o=_u(this,S,e,r,p,x,g,L,F,Z),o&&(o.faceIndex=Math.floor(D/3),o.face.materialIndex=b.materialIndex,n.push(o))}}else{const M=Math.max(0,y.start),A=Math.min(m.count,y.start+y.count);for(let b=M,S=A;b<S;b+=3){const z=b,N=b+1,D=b+2;o=_u(this,f,e,r,p,x,g,z,N,D),o&&(o.faceIndex=Math.floor(b/3),n.push(o))}}}}function QM(a,e,n,r,o,c,f,h){let m;if(e.side===Kn?m=r.intersectTriangle(f,c,o,!0,h):m=r.intersectTriangle(o,c,f,e.side===Aa,h),m===null)return null;vu.copy(h),vu.applyMatrix4(a.matrixWorld);const p=n.ray.origin.distanceTo(vu);return p<n.near||p>n.far?null:{distance:p,point:vu.clone(),object:a}}function _u(a,e,n,r,o,c,f,h,m,p){a.getVertexPosition(h,pu),a.getVertexPosition(m,mu),a.getVertexPosition(p,xu);const x=QM(a,e,n,r,pu,mu,xu,Iv);if(x){const g=new se;Ui.getBarycoord(Iv,pu,mu,xu,g),o&&(x.uv=Ui.getInterpolatedAttribute(o,h,m,p,g,new zt)),c&&(x.uv1=Ui.getInterpolatedAttribute(c,h,m,p,g,new zt)),f&&(x.normal=Ui.getInterpolatedAttribute(f,h,m,p,g,new se),x.normal.dot(r.direction)>0&&x.normal.multiplyScalar(-1));const v={a:h,b:m,c:p,normal:new se,materialIndex:0};Ui.getNormal(pu,mu,xu,v.normal),x.face=v,x.barycoord=g}return x}class So extends fr{constructor(e=1,n=1,r=1,o=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:r,widthSegments:o,heightSegments:c,depthSegments:f};const h=this;o=Math.floor(o),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],x=[],g=[];let v=0,y=0;M("z","y","x",-1,-1,r,n,e,f,c,0),M("z","y","x",1,-1,r,n,-e,f,c,1),M("x","z","y",1,1,e,r,n,o,f,2),M("x","z","y",1,-1,e,r,-n,o,f,3),M("x","y","z",1,-1,e,n,r,o,c,4),M("x","y","z",-1,-1,e,n,-r,o,c,5),this.setIndex(m),this.setAttribute("position",new qr(p,3)),this.setAttribute("normal",new qr(x,3)),this.setAttribute("uv",new qr(g,2));function M(A,b,S,z,N,D,G,L,F,Z,C){const w=D/F,k=G/Z,ne=D/2,le=G/2,fe=L/2,pe=F+1,P=Z+1;let te=0,j=0;const ve=new se;for(let Se=0;Se<P;Se++){const U=Se*k-le;for(let K=0;K<pe;K++){const ye=K*w-ne;ve[A]=ye*z,ve[b]=U*N,ve[S]=fe,p.push(ve.x,ve.y,ve.z),ve[A]=0,ve[b]=0,ve[S]=L>0?1:-1,x.push(ve.x,ve.y,ve.z),g.push(K/F),g.push(1-Se/Z),te+=1}}for(let Se=0;Se<Z;Se++)for(let U=0;U<F;U++){const K=v+U+pe*Se,ye=v+U+pe*(Se+1),Ae=v+(U+1)+pe*(Se+1),Fe=v+(U+1)+pe*Se;m.push(K,ye,Fe),m.push(ye,Ae,Fe),j+=6}h.addGroup(y,j,C),y+=j,v+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new So(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ho(a){const e={};for(const n in a){e[n]={};for(const r in a[n]){const o=a[n][r];o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)?o.isRenderTargetTexture?(ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][r]=null):e[n][r]=o.clone():Array.isArray(o)?e[n][r]=o.slice():e[n][r]=o}}return e}function Hn(a){const e={};for(let n=0;n<a.length;n++){const r=ho(a[n]);for(const o in r)e[o]=r[o]}return e}function JM(a){const e=[];for(let n=0;n<a.length;n++)e.push(a[n].clone());return e}function aS(a){const e=a.getRenderTarget();return e===null?a.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Nt.workingColorSpace}const $M={clone:ho,merge:Hn};var eE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ca extends qu{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eE,this.fragmentShader=tE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ho(e.uniforms),this.uniformsGroups=JM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const o in this.uniforms){const f=this.uniforms[o].value;f&&f.isTexture?n.uniforms[o]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?n.uniforms[o]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[o]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[o]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[o]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[o]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[o]={type:"m4",value:f.toArray()}:n.uniforms[o]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const r={};for(const o in this.extensions)this.extensions[o]===!0&&(r[o]=!0);return Object.keys(r).length>0&&(n.extensions=r),n}}class rS extends ui{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new cn,this.projectionMatrix=new cn,this.projectionMatrixInverse=new cn,this.coordinateSystem=Vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const sr=new se,Gv=new zt,Hv=new zt;class bi extends rS{constructor(e=50,n=1,r=.1,o=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=o,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Bl*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bl*2*Math.atan(Math.tan(Rl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,r){sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(sr.x,sr.y).multiplyScalar(-e/sr.z),sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(sr.x,sr.y).multiplyScalar(-e/sr.z)}getViewSize(e,n){return this.getViewBounds(e,Gv,Hv),n.subVectors(Hv,Gv)}setViewOffset(e,n,r,o,c,f){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=o,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Rl*.5*this.fov)/this.zoom,r=2*n,o=this.aspect*r,c=-.5*o;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*o/m,n-=f.offsetY*r/p,o*=f.width/m,r*=f.height/p}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+o,n,n-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const ks=-90,Xs=1;class nE extends ui{constructor(e,n,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const o=new bi(ks,Xs,e,n);o.layers=this.layers,this.add(o);const c=new bi(ks,Xs,e,n);c.layers=this.layers,this.add(c);const f=new bi(ks,Xs,e,n);f.layers=this.layers,this.add(f);const h=new bi(ks,Xs,e,n);h.layers=this.layers,this.add(h);const m=new bi(ks,Xs,e,n);m.layers=this.layers,this.add(m);const p=new bi(ks,Xs,e,n);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[r,o,c,f,h,m]=n;for(const p of n)this.remove(p);if(e===Vi)r.up.set(0,1,0),r.lookAt(1,0,0),o.up.set(0,1,0),o.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Pu)r.up.set(0,-1,0),r.lookAt(-1,0,0),o.up.set(0,-1,0),o.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of n)this.add(p),p.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:o}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,m,p,x]=this.children,g=e.getRenderTarget(),v=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,o),e.render(n,c),e.setRenderTarget(r,1,o),e.render(n,f),e.setRenderTarget(r,2,o),e.render(n,h),e.setRenderTarget(r,3,o),e.render(n,m),e.setRenderTarget(r,4,o),e.render(n,p),r.texture.generateMipmaps=A,e.setRenderTarget(r,5,o),e.render(n,x),e.setRenderTarget(g,v,y),e.xr.enabled=M,r.texture.needsPMREMUpdate=!0}}class sS extends Vn{constructor(e=[],n=co,r,o,c,f,h,m,p,x){super(e,n,r,o,c,f,h,m,p,x),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class iE extends Zr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},o=[r,r,r,r,r,r];this.texture=new sS(o),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},o=new So(5,5,5),c=new Ca({name:"CubemapFromEquirect",uniforms:ho(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Kn,blending:Ma});c.uniforms.tEquirect.value=n;const f=new Wi(o,c),h=n.minFilter;return n.minFilter===Wr&&(n.minFilter=Mi),new nE(1,10,this).update(e,f),n.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,n=!0,r=!0,o=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(n,r,o);e.setRenderTarget(c)}}class no extends ui{constructor(){super(),this.isGroup=!0,this.type="Group"}}const aE={type:"move"};class Fh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new no,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new no,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new se,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new se),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new no,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new se,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new se),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const r of e.hand.values())this._getHandJoint(n,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,r){let o=null,c=null,f=null;const h=this._targetRay,m=this._grip,p=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(p&&e.hand){f=!0;for(const A of e.hand.values()){const b=n.getJointPose(A,r),S=this._getHandJoint(p,A);b!==null&&(S.matrix.fromArray(b.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=b.radius),S.visible=b!==null}const x=p.joints["index-finger-tip"],g=p.joints["thumb-tip"],v=x.position.distanceTo(g.position),y=.02,M=.005;p.inputState.pinching&&v>y+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&v<=y-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=n.getPose(e.gripSpace,r),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));h!==null&&(o=n.getPose(e.targetRaySpace,r),o===null&&c!==null&&(o=c),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(aE)))}return h!==null&&(h.visible=o!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const r=new no;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[n.jointName]=r,e.add(r)}return e.joints[n.jointName]}}class rE extends ui{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wa,this.environmentIntensity=1,this.environmentRotation=new wa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class sE extends Vn{constructor(e=null,n=1,r=1,o,c,f,h,m,p=ci,x=ci,g,v){super(null,f,h,m,p,x,o,c,g,v),this.isDataTexture=!0,this.image={data:e,width:n,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ph=new se,oE=new se,lE=new pt;class Ir{constructor(e=new se(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,r,o){return this.normal.set(e,n,r),this.constant=o,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,r){const o=Ph.subVectors(r,n).cross(oE.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(o,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const r=e.delta(Ph),o=this.normal.dot(r);if(o===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/o;return c<0||c>1?null:n.copy(e.start).addScaledVector(r,c)}intersectsLine(e){const n=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return n<0&&r>0||r<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const r=n||lE.getNormalMatrix(e),o=this.coplanarPoint(Ph).applyMatrix4(e),c=this.normal.applyMatrix3(r).normalize();return this.constant=-o.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Or=new om,cE=new zt(.5,.5),Su=new se;class oS{constructor(e=new Ir,n=new Ir,r=new Ir,o=new Ir,c=new Ir,f=new Ir){this.planes=[e,n,r,o,c,f]}set(e,n,r,o,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(n),h[2].copy(r),h[3].copy(o),h[4].copy(c),h[5].copy(f),this}copy(e){const n=this.planes;for(let r=0;r<6;r++)n[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,n=Vi,r=!1){const o=this.planes,c=e.elements,f=c[0],h=c[1],m=c[2],p=c[3],x=c[4],g=c[5],v=c[6],y=c[7],M=c[8],A=c[9],b=c[10],S=c[11],z=c[12],N=c[13],D=c[14],G=c[15];if(o[0].setComponents(p-f,y-x,S-M,G-z).normalize(),o[1].setComponents(p+f,y+x,S+M,G+z).normalize(),o[2].setComponents(p+h,y+g,S+A,G+N).normalize(),o[3].setComponents(p-h,y-g,S-A,G-N).normalize(),r)o[4].setComponents(m,v,b,D).normalize(),o[5].setComponents(p-m,y-v,S-b,G-D).normalize();else if(o[4].setComponents(p-m,y-v,S-b,G-D).normalize(),n===Vi)o[5].setComponents(p+m,y+v,S+b,G+D).normalize();else if(n===Pu)o[5].setComponents(m,v,b,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Or)}intersectsSprite(e){Or.center.set(0,0,0);const n=cE.distanceTo(e.center);return Or.radius=.7071067811865476+n,Or.applyMatrix4(e.matrixWorld),this.intersectsSphere(Or)}intersectsSphere(e){const n=this.planes,r=e.center,o=-e.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(r)<o)return!1;return!0}intersectsBox(e){const n=this.planes;for(let r=0;r<6;r++){const o=n[r];if(Su.x=o.normal.x>0?e.max.x:e.min.x,Su.y=o.normal.y>0?e.max.y:e.min.y,Su.z=o.normal.z>0?e.max.z:e.min.z,o.distanceToPoint(Su)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let r=0;r<6;r++)if(n[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lS extends Vn{constructor(e,n,r=jr,o,c,f,h=ci,m=ci,p,x=Fl,g=1){if(x!==Fl&&x!==Pl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:e,height:n,depth:g};super(v,o,c,f,h,m,x,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new sm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class cS extends Vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class po extends fr{constructor(e=1,n=1,r=1,o=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:r,heightSegments:o};const c=e/2,f=n/2,h=Math.floor(r),m=Math.floor(o),p=h+1,x=m+1,g=e/h,v=n/m,y=[],M=[],A=[],b=[];for(let S=0;S<x;S++){const z=S*v-f;for(let N=0;N<p;N++){const D=N*g-c;M.push(D,-z,0),A.push(0,0,1),b.push(N/h),b.push(1-S/m)}}for(let S=0;S<m;S++)for(let z=0;z<h;z++){const N=z+p*S,D=z+p*(S+1),G=z+1+p*(S+1),L=z+1+p*S;y.push(N,D,L),y.push(D,G,L)}this.setIndex(y),this.setAttribute("position",new qr(M,3)),this.setAttribute("normal",new qr(A,3)),this.setAttribute("uv",new qr(b,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new po(e.width,e.height,e.widthSegments,e.heightSegments)}}class uE extends qu{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fE extends qu{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class dE extends rS{constructor(e=-1,n=1,r=1,o=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=r,this.bottom=o,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,r,o,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=r,this.view.offsetY=o,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,o=(this.top+this.bottom)/2;let c=r-e,f=r+e,h=o+n,m=o-n;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,x=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,h-=x*this.view.offsetY,m=h-x*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class hE extends bi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Vv=new cn;class pE{constructor(e,n,r=0,o=1/0){this.ray=new eS(e,n),this.near=r,this.far=o,this.camera=null,this.layers=new lm,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):nn("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return Vv.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vv),this}intersectObject(e,n=!0,r=[]){return Op(e,this,r,n),r.sort(kv),r}intersectObjects(e,n=!0,r=[]){for(let o=0,c=e.length;o<c;o++)Op(e[o],this,r,n);return r.sort(kv),r}}function kv(a,e){return a.distance-e.distance}function Op(a,e,n,r){let o=!0;if(a.layers.test(e.layers)&&a.raycast(e,n)===!1&&(o=!1),o===!0&&r===!0){const c=a.children;for(let f=0,h=c.length;f<h;f++)Op(c[f],e,n,!0)}}function Xv(a,e,n,r){const o=mE(r);switch(n){case j_:return a*e;case Z_:return a*e/o.components*o.byteLength;case tm:return a*e/o.components*o.byteLength;case nm:return a*e*2/o.components*o.byteLength;case im:return a*e*2/o.components*o.byteLength;case K_:return a*e*3/o.components*o.byteLength;case Ni:return a*e*4/o.components*o.byteLength;case am:return a*e*4/o.components*o.byteLength;case Au:case Ru:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case wu:case Cu:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case op:case cp:return Math.max(a,16)*Math.max(e,8)/4;case sp:case lp:return Math.max(a,8)*Math.max(e,8)/2;case up:case fp:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*8;case dp:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case hp:return Math.floor((a+3)/4)*Math.floor((e+3)/4)*16;case pp:return Math.floor((a+4)/5)*Math.floor((e+3)/4)*16;case mp:return Math.floor((a+4)/5)*Math.floor((e+4)/5)*16;case xp:return Math.floor((a+5)/6)*Math.floor((e+4)/5)*16;case gp:return Math.floor((a+5)/6)*Math.floor((e+5)/6)*16;case vp:return Math.floor((a+7)/8)*Math.floor((e+4)/5)*16;case _p:return Math.floor((a+7)/8)*Math.floor((e+5)/6)*16;case Sp:return Math.floor((a+7)/8)*Math.floor((e+7)/8)*16;case yp:return Math.floor((a+9)/10)*Math.floor((e+4)/5)*16;case bp:return Math.floor((a+9)/10)*Math.floor((e+5)/6)*16;case Mp:return Math.floor((a+9)/10)*Math.floor((e+7)/8)*16;case Ep:return Math.floor((a+9)/10)*Math.floor((e+9)/10)*16;case Tp:return Math.floor((a+11)/12)*Math.floor((e+9)/10)*16;case Ap:return Math.floor((a+11)/12)*Math.floor((e+11)/12)*16;case Rp:case wp:case Cp:return Math.ceil(a/4)*Math.ceil(e/4)*16;case Dp:case Lp:return Math.ceil(a/4)*Math.ceil(e/4)*8;case Up:case Np:return Math.ceil(a/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function mE(a){switch(a){case Ra:case X_:return{byteLength:1,components:1};case Nl:case W_:case go:return{byteLength:2,components:1};case $p:case em:return{byteLength:2,components:4};case jr:case Jp:case ba:return{byteLength:4,components:1};case q_:case Y_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qp}}));typeof window<"u"&&(window.__THREE__?ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qp);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function uS(){let a=null,e=!1,n=null,r=null;function o(c,f){n(c,f),r=a.requestAnimationFrame(o)}return{start:function(){e!==!0&&n!==null&&(r=a.requestAnimationFrame(o),e=!0)},stop:function(){a.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(c){n=c},setContext:function(c){a=c}}}function xE(a){const e=new WeakMap;function n(h,m){const p=h.array,x=h.usage,g=p.byteLength,v=a.createBuffer();a.bindBuffer(m,v),a.bufferData(m,p,x),h.onUploadCallback();let y;if(p instanceof Float32Array)y=a.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)y=a.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?y=a.HALF_FLOAT:y=a.UNSIGNED_SHORT;else if(p instanceof Int16Array)y=a.SHORT;else if(p instanceof Uint32Array)y=a.UNSIGNED_INT;else if(p instanceof Int32Array)y=a.INT;else if(p instanceof Int8Array)y=a.BYTE;else if(p instanceof Uint8Array)y=a.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)y=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:v,type:y,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:g}}function r(h,m,p){const x=m.array,g=m.updateRanges;if(a.bindBuffer(p,h),g.length===0)a.bufferSubData(p,0,x);else{g.sort((y,M)=>y.start-M.start);let v=0;for(let y=1;y<g.length;y++){const M=g[v],A=g[y];A.start<=M.start+M.count+1?M.count=Math.max(M.count,A.start+A.count-M.start):(++v,g[v]=A)}g.length=v+1;for(let y=0,M=g.length;y<M;y++){const A=g[y];a.bufferSubData(p,A.start*x.BYTES_PER_ELEMENT,x,A.start,A.count)}m.clearUpdateRanges()}m.onUploadCallback()}function o(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=e.get(h);m&&(a.deleteBuffer(m.buffer),e.delete(h))}function f(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const x=e.get(h);(!x||x.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=e.get(h);if(p===void 0)e.set(h,n(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,h,m),p.version=h.version}}return{get:o,remove:c,update:f}}var gE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_E=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,SE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ME=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,EE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,TE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,AE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,RE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,CE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,DE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,LE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,UE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,NE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,OE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,FE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,PE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,BE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,IE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,GE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,HE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,VE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,XE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,YE="gl_FragColor = linearToOutputTexel( gl_FragColor );",jE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,KE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ZE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,QE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,JE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$E=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,e3=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,t3=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n3=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i3=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,a3=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,r3=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,s3=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,o3=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,l3=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,c3=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,u3=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,f3=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,d3=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,h3=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,p3=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,m3=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,x3=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,g3=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,v3=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_3=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,S3=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y3=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b3=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,M3=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,E3=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,T3=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,A3=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,R3=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,w3=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,C3=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,D3=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,L3=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U3=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,N3=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O3=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,F3=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,P3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,z3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B3=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,I3=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,G3=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,H3=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,V3=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,k3=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,X3=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,W3=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,q3=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Y3=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,j3=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,K3=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Z3=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Q3=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,J3=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$3=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,e2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,t2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,n2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,a2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,r2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,s2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,o2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,l2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,c2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,u2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,f2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,d2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,h2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,p2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,m2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const x2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,g2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_2=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,y2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,M2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,E2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,T2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,A2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,R2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,C2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,D2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,L2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,F2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,z2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,B2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,G2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,H2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,k2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,W2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,q2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,j2=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,K2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gt={alphahash_fragment:gE,alphahash_pars_fragment:vE,alphamap_fragment:_E,alphamap_pars_fragment:SE,alphatest_fragment:yE,alphatest_pars_fragment:bE,aomap_fragment:ME,aomap_pars_fragment:EE,batching_pars_vertex:TE,batching_vertex:AE,begin_vertex:RE,beginnormal_vertex:wE,bsdfs:CE,iridescence_fragment:DE,bumpmap_pars_fragment:LE,clipping_planes_fragment:UE,clipping_planes_pars_fragment:NE,clipping_planes_pars_vertex:OE,clipping_planes_vertex:FE,color_fragment:PE,color_pars_fragment:zE,color_pars_vertex:BE,color_vertex:IE,common:GE,cube_uv_reflection_fragment:HE,defaultnormal_vertex:VE,displacementmap_pars_vertex:kE,displacementmap_vertex:XE,emissivemap_fragment:WE,emissivemap_pars_fragment:qE,colorspace_fragment:YE,colorspace_pars_fragment:jE,envmap_fragment:KE,envmap_common_pars_fragment:ZE,envmap_pars_fragment:QE,envmap_pars_vertex:JE,envmap_physical_pars_fragment:c3,envmap_vertex:$E,fog_vertex:e3,fog_pars_vertex:t3,fog_fragment:n3,fog_pars_fragment:i3,gradientmap_pars_fragment:a3,lightmap_pars_fragment:r3,lights_lambert_fragment:s3,lights_lambert_pars_fragment:o3,lights_pars_begin:l3,lights_toon_fragment:u3,lights_toon_pars_fragment:f3,lights_phong_fragment:d3,lights_phong_pars_fragment:h3,lights_physical_fragment:p3,lights_physical_pars_fragment:m3,lights_fragment_begin:x3,lights_fragment_maps:g3,lights_fragment_end:v3,logdepthbuf_fragment:_3,logdepthbuf_pars_fragment:S3,logdepthbuf_pars_vertex:y3,logdepthbuf_vertex:b3,map_fragment:M3,map_pars_fragment:E3,map_particle_fragment:T3,map_particle_pars_fragment:A3,metalnessmap_fragment:R3,metalnessmap_pars_fragment:w3,morphinstance_vertex:C3,morphcolor_vertex:D3,morphnormal_vertex:L3,morphtarget_pars_vertex:U3,morphtarget_vertex:N3,normal_fragment_begin:O3,normal_fragment_maps:F3,normal_pars_fragment:P3,normal_pars_vertex:z3,normal_vertex:B3,normalmap_pars_fragment:I3,clearcoat_normal_fragment_begin:G3,clearcoat_normal_fragment_maps:H3,clearcoat_pars_fragment:V3,iridescence_pars_fragment:k3,opaque_fragment:X3,packing:W3,premultiplied_alpha_fragment:q3,project_vertex:Y3,dithering_fragment:j3,dithering_pars_fragment:K3,roughnessmap_fragment:Z3,roughnessmap_pars_fragment:Q3,shadowmap_pars_fragment:J3,shadowmap_pars_vertex:$3,shadowmap_vertex:e2,shadowmask_pars_fragment:t2,skinbase_vertex:n2,skinning_pars_vertex:i2,skinning_vertex:a2,skinnormal_vertex:r2,specularmap_fragment:s2,specularmap_pars_fragment:o2,tonemapping_fragment:l2,tonemapping_pars_fragment:c2,transmission_fragment:u2,transmission_pars_fragment:f2,uv_pars_fragment:d2,uv_pars_vertex:h2,uv_vertex:p2,worldpos_vertex:m2,background_vert:x2,background_frag:g2,backgroundCube_vert:v2,backgroundCube_frag:_2,cube_vert:S2,cube_frag:y2,depth_vert:b2,depth_frag:M2,distanceRGBA_vert:E2,distanceRGBA_frag:T2,equirect_vert:A2,equirect_frag:R2,linedashed_vert:w2,linedashed_frag:C2,meshbasic_vert:D2,meshbasic_frag:L2,meshlambert_vert:U2,meshlambert_frag:N2,meshmatcap_vert:O2,meshmatcap_frag:F2,meshnormal_vert:P2,meshnormal_frag:z2,meshphong_vert:B2,meshphong_frag:I2,meshphysical_vert:G2,meshphysical_frag:H2,meshtoon_vert:V2,meshtoon_frag:k2,points_vert:X2,points_frag:W2,shadow_vert:q2,shadow_frag:Y2,sprite_vert:j2,sprite_frag:K2},Oe={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},Hi={basic:{uniforms:Hn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.fog]),vertexShader:gt.meshbasic_vert,fragmentShader:gt.meshbasic_frag},lambert:{uniforms:Hn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Pt(0)}}]),vertexShader:gt.meshlambert_vert,fragmentShader:gt.meshlambert_frag},phong:{uniforms:Hn([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:gt.meshphong_vert,fragmentShader:gt.meshphong_frag},standard:{uniforms:Hn([Oe.common,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.roughnessmap,Oe.metalnessmap,Oe.fog,Oe.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag},toon:{uniforms:Hn([Oe.common,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.gradientmap,Oe.fog,Oe.lights,{emissive:{value:new Pt(0)}}]),vertexShader:gt.meshtoon_vert,fragmentShader:gt.meshtoon_frag},matcap:{uniforms:Hn([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,{matcap:{value:null}}]),vertexShader:gt.meshmatcap_vert,fragmentShader:gt.meshmatcap_frag},points:{uniforms:Hn([Oe.points,Oe.fog]),vertexShader:gt.points_vert,fragmentShader:gt.points_frag},dashed:{uniforms:Hn([Oe.common,Oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:gt.linedashed_vert,fragmentShader:gt.linedashed_frag},depth:{uniforms:Hn([Oe.common,Oe.displacementmap]),vertexShader:gt.depth_vert,fragmentShader:gt.depth_frag},normal:{uniforms:Hn([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,{opacity:{value:1}}]),vertexShader:gt.meshnormal_vert,fragmentShader:gt.meshnormal_frag},sprite:{uniforms:Hn([Oe.sprite,Oe.fog]),vertexShader:gt.sprite_vert,fragmentShader:gt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:gt.background_vert,fragmentShader:gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:gt.backgroundCube_vert,fragmentShader:gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:gt.cube_vert,fragmentShader:gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:gt.equirect_vert,fragmentShader:gt.equirect_frag},distanceRGBA:{uniforms:Hn([Oe.common,Oe.displacementmap,{referencePosition:{value:new se},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:gt.distanceRGBA_vert,fragmentShader:gt.distanceRGBA_frag},shadow:{uniforms:Hn([Oe.lights,Oe.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:gt.shadow_vert,fragmentShader:gt.shadow_frag}};Hi.physical={uniforms:Hn([Hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag};const yu={r:0,b:0,g:0},Fr=new wa,Z2=new cn;function Q2(a,e,n,r,o,c,f){const h=new Pt(0);let m=c===!0?0:1,p,x,g=null,v=0,y=null;function M(N){let D=N.isScene===!0?N.background:null;return D&&D.isTexture&&(D=(N.backgroundBlurriness>0?n:e).get(D)),D}function A(N){let D=!1;const G=M(N);G===null?S(h,m):G&&G.isColor&&(S(G,1),D=!0);const L=a.xr.getEnvironmentBlendMode();L==="additive"?r.buffers.color.setClear(0,0,0,1,f):L==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,f),(a.autoClear||D)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function b(N,D){const G=M(D);G&&(G.isCubeTexture||G.mapping===Wu)?(x===void 0&&(x=new Wi(new So(1,1,1),new Ca({name:"BackgroundCubeMaterial",uniforms:ho(Hi.backgroundCube.uniforms),vertexShader:Hi.backgroundCube.vertexShader,fragmentShader:Hi.backgroundCube.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),x.geometry.deleteAttribute("normal"),x.geometry.deleteAttribute("uv"),x.onBeforeRender=function(L,F,Z){this.matrixWorld.copyPosition(Z.matrixWorld)},Object.defineProperty(x.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),o.update(x)),Fr.copy(D.backgroundRotation),Fr.x*=-1,Fr.y*=-1,Fr.z*=-1,G.isCubeTexture&&G.isRenderTargetTexture===!1&&(Fr.y*=-1,Fr.z*=-1),x.material.uniforms.envMap.value=G,x.material.uniforms.flipEnvMap.value=G.isCubeTexture&&G.isRenderTargetTexture===!1?-1:1,x.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,x.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,x.material.uniforms.backgroundRotation.value.setFromMatrix4(Z2.makeRotationFromEuler(Fr)),x.material.toneMapped=Nt.getTransfer(G.colorSpace)!==Wt,(g!==G||v!==G.version||y!==a.toneMapping)&&(x.material.needsUpdate=!0,g=G,v=G.version,y=a.toneMapping),x.layers.enableAll(),N.unshift(x,x.geometry,x.material,0,0,null)):G&&G.isTexture&&(p===void 0&&(p=new Wi(new po(2,2),new Ca({name:"BackgroundMaterial",uniforms:ho(Hi.background.uniforms),vertexShader:Hi.background.vertexShader,fragmentShader:Hi.background.fragmentShader,side:Aa,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),o.update(p)),p.material.uniforms.t2D.value=G,p.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,p.material.toneMapped=Nt.getTransfer(G.colorSpace)!==Wt,G.matrixAutoUpdate===!0&&G.updateMatrix(),p.material.uniforms.uvTransform.value.copy(G.matrix),(g!==G||v!==G.version||y!==a.toneMapping)&&(p.material.needsUpdate=!0,g=G,v=G.version,y=a.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null))}function S(N,D){N.getRGB(yu,aS(a)),r.buffers.color.setClear(yu.r,yu.g,yu.b,D,f)}function z(){x!==void 0&&(x.geometry.dispose(),x.material.dispose(),x=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return h},setClearColor:function(N,D=1){h.set(N),m=D,S(h,m)},getClearAlpha:function(){return m},setClearAlpha:function(N){m=N,S(h,m)},render:A,addToRenderList:b,dispose:z}}function J2(a,e){const n=a.getParameter(a.MAX_VERTEX_ATTRIBS),r={},o=v(null);let c=o,f=!1;function h(w,k,ne,le,fe){let pe=!1;const P=g(le,ne,k);c!==P&&(c=P,p(c.object)),pe=y(w,le,ne,fe),pe&&M(w,le,ne,fe),fe!==null&&e.update(fe,a.ELEMENT_ARRAY_BUFFER),(pe||f)&&(f=!1,D(w,k,ne,le),fe!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,e.get(fe).buffer))}function m(){return a.createVertexArray()}function p(w){return a.bindVertexArray(w)}function x(w){return a.deleteVertexArray(w)}function g(w,k,ne){const le=ne.wireframe===!0;let fe=r[w.id];fe===void 0&&(fe={},r[w.id]=fe);let pe=fe[k.id];pe===void 0&&(pe={},fe[k.id]=pe);let P=pe[le];return P===void 0&&(P=v(m()),pe[le]=P),P}function v(w){const k=[],ne=[],le=[];for(let fe=0;fe<n;fe++)k[fe]=0,ne[fe]=0,le[fe]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:ne,attributeDivisors:le,object:w,attributes:{},index:null}}function y(w,k,ne,le){const fe=c.attributes,pe=k.attributes;let P=0;const te=ne.getAttributes();for(const j in te)if(te[j].location>=0){const Se=fe[j];let U=pe[j];if(U===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(U=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(U=w.instanceColor)),Se===void 0||Se.attribute!==U||U&&Se.data!==U.data)return!0;P++}return c.attributesNum!==P||c.index!==le}function M(w,k,ne,le){const fe={},pe=k.attributes;let P=0;const te=ne.getAttributes();for(const j in te)if(te[j].location>=0){let Se=pe[j];Se===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(Se=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(Se=w.instanceColor));const U={};U.attribute=Se,Se&&Se.data&&(U.data=Se.data),fe[j]=U,P++}c.attributes=fe,c.attributesNum=P,c.index=le}function A(){const w=c.newAttributes;for(let k=0,ne=w.length;k<ne;k++)w[k]=0}function b(w){S(w,0)}function S(w,k){const ne=c.newAttributes,le=c.enabledAttributes,fe=c.attributeDivisors;ne[w]=1,le[w]===0&&(a.enableVertexAttribArray(w),le[w]=1),fe[w]!==k&&(a.vertexAttribDivisor(w,k),fe[w]=k)}function z(){const w=c.newAttributes,k=c.enabledAttributes;for(let ne=0,le=k.length;ne<le;ne++)k[ne]!==w[ne]&&(a.disableVertexAttribArray(ne),k[ne]=0)}function N(w,k,ne,le,fe,pe,P){P===!0?a.vertexAttribIPointer(w,k,ne,fe,pe):a.vertexAttribPointer(w,k,ne,le,fe,pe)}function D(w,k,ne,le){A();const fe=le.attributes,pe=ne.getAttributes(),P=k.defaultAttributeValues;for(const te in pe){const j=pe[te];if(j.location>=0){let ve=fe[te];if(ve===void 0&&(te==="instanceMatrix"&&w.instanceMatrix&&(ve=w.instanceMatrix),te==="instanceColor"&&w.instanceColor&&(ve=w.instanceColor)),ve!==void 0){const Se=ve.normalized,U=ve.itemSize,K=e.get(ve);if(K===void 0)continue;const ye=K.buffer,Ae=K.type,Fe=K.bytesPerElement,ie=Ae===a.INT||Ae===a.UNSIGNED_INT||ve.gpuType===Jp;if(ve.isInterleavedBufferAttribute){const ce=ve.data,we=ce.stride,He=ve.offset;if(ce.isInstancedInterleavedBuffer){for(let We=0;We<j.locationSize;We++)S(j.location+We,ce.meshPerAttribute);w.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let We=0;We<j.locationSize;We++)b(j.location+We);a.bindBuffer(a.ARRAY_BUFFER,ye);for(let We=0;We<j.locationSize;We++)N(j.location+We,U/j.locationSize,Ae,Se,we*Fe,(He+U/j.locationSize*We)*Fe,ie)}else{if(ve.isInstancedBufferAttribute){for(let ce=0;ce<j.locationSize;ce++)S(j.location+ce,ve.meshPerAttribute);w.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let ce=0;ce<j.locationSize;ce++)b(j.location+ce);a.bindBuffer(a.ARRAY_BUFFER,ye);for(let ce=0;ce<j.locationSize;ce++)N(j.location+ce,U/j.locationSize,Ae,Se,U*Fe,U/j.locationSize*ce*Fe,ie)}}else if(P!==void 0){const Se=P[te];if(Se!==void 0)switch(Se.length){case 2:a.vertexAttrib2fv(j.location,Se);break;case 3:a.vertexAttrib3fv(j.location,Se);break;case 4:a.vertexAttrib4fv(j.location,Se);break;default:a.vertexAttrib1fv(j.location,Se)}}}}z()}function G(){Z();for(const w in r){const k=r[w];for(const ne in k){const le=k[ne];for(const fe in le)x(le[fe].object),delete le[fe];delete k[ne]}delete r[w]}}function L(w){if(r[w.id]===void 0)return;const k=r[w.id];for(const ne in k){const le=k[ne];for(const fe in le)x(le[fe].object),delete le[fe];delete k[ne]}delete r[w.id]}function F(w){for(const k in r){const ne=r[k];if(ne[w.id]===void 0)continue;const le=ne[w.id];for(const fe in le)x(le[fe].object),delete le[fe];delete ne[w.id]}}function Z(){C(),f=!0,c!==o&&(c=o,p(c.object))}function C(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:h,reset:Z,resetDefaultState:C,dispose:G,releaseStatesOfGeometry:L,releaseStatesOfProgram:F,initAttributes:A,enableAttribute:b,disableUnusedAttributes:z}}function $2(a,e,n){let r;function o(p){r=p}function c(p,x){a.drawArrays(r,p,x),n.update(x,r,1)}function f(p,x,g){g!==0&&(a.drawArraysInstanced(r,p,x,g),n.update(x,r,g))}function h(p,x,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,x,0,g);let y=0;for(let M=0;M<g;M++)y+=x[M];n.update(y,r,1)}function m(p,x,g,v){if(g===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let M=0;M<p.length;M++)f(p[M],x[M],v[M]);else{y.multiDrawArraysInstancedWEBGL(r,p,0,x,0,v,0,g);let M=0;for(let A=0;A<g;A++)M+=x[A]*v[A];n.update(M,r,1)}}this.setMode=o,this.render=c,this.renderInstances=f,this.renderMultiDraw=h,this.renderMultiDrawInstances=m}function eT(a,e,n,r){let o;function c(){if(o!==void 0)return o;if(e.has("EXT_texture_filter_anisotropic")===!0){const F=e.get("EXT_texture_filter_anisotropic");o=a.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else o=0;return o}function f(F){return!(F!==Ni&&r.convert(F)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(F){const Z=F===go&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(F!==Ra&&r.convert(F)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&F!==ba&&!Z)}function m(F){if(F==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=n.precision!==void 0?n.precision:"highp";const x=m(p);x!==p&&(ct("WebGLRenderer:",p,"not supported, using",x,"instead."),p=x);const g=n.logarithmicDepthBuffer===!0,v=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),y=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),M=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=a.getParameter(a.MAX_TEXTURE_SIZE),b=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),S=a.getParameter(a.MAX_VERTEX_ATTRIBS),z=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),N=a.getParameter(a.MAX_VARYING_VECTORS),D=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),G=M>0,L=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:g,reversedDepthBuffer:v,maxTextures:y,maxVertexTextures:M,maxTextureSize:A,maxCubemapSize:b,maxAttributes:S,maxVertexUniforms:z,maxVaryings:N,maxFragmentUniforms:D,vertexTextures:G,maxSamples:L}}function tT(a){const e=this;let n=null,r=0,o=!1,c=!1;const f=new Ir,h=new pt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(g,v){const y=g.length!==0||v||r!==0||o;return o=v,r=g.length,y},this.beginShadows=function(){c=!0,x(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(g,v){n=x(g,v,0)},this.setState=function(g,v,y){const M=g.clippingPlanes,A=g.clipIntersection,b=g.clipShadows,S=a.get(g);if(!o||M===null||M.length===0||c&&!b)c?x(null):p();else{const z=c?0:r,N=z*4;let D=S.clippingState||null;m.value=D,D=x(M,v,N,y);for(let G=0;G!==N;++G)D[G]=n[G];S.clippingState=D,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=z}};function p(){m.value!==n&&(m.value=n,m.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function x(g,v,y,M){const A=g!==null?g.length:0;let b=null;if(A!==0){if(b=m.value,M!==!0||b===null){const S=y+A*4,z=v.matrixWorldInverse;h.getNormalMatrix(z),(b===null||b.length<S)&&(b=new Float32Array(S));for(let N=0,D=y;N!==A;++N,D+=4)f.copy(g[N]).applyMatrix4(z,h),f.normal.toArray(b,D),b[D+3]=f.constant}m.value=b,m.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,b}}function nT(a){let e=new WeakMap;function n(f,h){return h===np?f.mapping=co:h===ip&&(f.mapping=uo),f}function r(f){if(f&&f.isTexture){const h=f.mapping;if(h===np||h===ip)if(e.has(f)){const m=e.get(f).texture;return n(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const p=new iE(m.height);return p.fromEquirectangularTexture(a,f),e.set(f,p),f.addEventListener("dispose",o),n(p.texture,f.mapping)}else return null}}return f}function o(f){const h=f.target;h.removeEventListener("dispose",o);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function c(){e=new WeakMap}return{get:r,dispose:c}}const cr=4,Wv=[.125,.215,.35,.446,.526,.582],kr=20,iT=256,bl=new dE,qv=new Pt;let zh=null,Bh=0,Ih=0,Gh=!1;const aT=new se;class Yv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,r=.1,o=100,c={}){const{size:f=256,position:h=aT}=c;zh=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),Ih=this._renderer.getActiveMipmapLevel(),Gh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,r,o,m,h),n>0&&this._blur(m,0,0,n),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(zh,Bh,Ih),this._renderer.xr.enabled=Gh,e.scissorTest=!1,Ws(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===co||e.mapping===uo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zh=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),Ih=this._renderer.getActiveMipmapLevel(),Gh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=n||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,r={magFilter:Mi,minFilter:Mi,generateMipmaps:!1,type:go,format:Ni,colorSpace:fo,depthBuffer:!1},o=jv(e,n,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jv(e,n,r);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=rT(c)),this._blurMaterial=oT(c,e,n),this._ggxMaterial=sT(c,e,n)}return o}_compileMaterial(e){const n=new Wi(new fr,e);this._renderer.compile(n,bl)}_sceneToCubeUV(e,n,r,o,c){const m=new bi(90,1,n,r),p=[1,-1,1,1,1,1],x=[1,1,1,-1,-1,-1],g=this._renderer,v=g.autoClear,y=g.toneMapping;g.getClearColor(qv),g.toneMapping=ur,g.autoClear=!1,g.state.buffers.depth.getReversed()&&(g.setRenderTarget(o),g.clearDepth(),g.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Wi(new So,new Bu({name:"PMREM.Background",side:Kn,depthWrite:!1,depthTest:!1})));const A=this._backgroundBox,b=A.material;let S=!1;const z=e.background;z?z.isColor&&(b.color.copy(z),e.background=null,S=!0):(b.color.copy(qv),S=!0);for(let N=0;N<6;N++){const D=N%3;D===0?(m.up.set(0,p[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+x[N],c.y,c.z)):D===1?(m.up.set(0,0,p[N]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+x[N],c.z)):(m.up.set(0,p[N],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+x[N]));const G=this._cubeSize;Ws(o,D*G,N>2?G:0,G,G),g.setRenderTarget(o),S&&g.render(A,m),g.render(e,m)}g.toneMapping=y,g.autoClear=v,e.background=z}_textureToCubeUV(e,n){const r=this._renderer,o=e.mapping===co||e.mapping===uo;o?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kv());const c=o?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=e;const m=this._cubeSize;Ws(n,0,0,3*m,2*m),r.setRenderTarget(n),r.render(f,bl)}_applyPMREM(e){const n=this._renderer,r=n.autoClear;n.autoClear=!1;const o=this._lodMeshes.length;for(let c=1;c<o;c++)this._applyGGXFilter(e,c-1,c);n.autoClear=r}_applyGGXFilter(e,n,r){const o=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[r];h.material=f;const m=f.uniforms,p=r/(this._lodMeshes.length-1),x=n/(this._lodMeshes.length-1),g=Math.sqrt(p*p-x*x),v=.05+p*.95,y=g*v,{_lodMax:M}=this,A=this._sizeLods[r],b=3*A*(r>M-cr?r-M+cr:0),S=4*(this._cubeSize-A);m.envMap.value=e.texture,m.roughness.value=y,m.mipInt.value=M-n,Ws(c,b,S,3*A,2*A),o.setRenderTarget(c),o.render(h,bl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=M-r,Ws(e,b,S,3*A,2*A),o.setRenderTarget(e),o.render(h,bl)}_blur(e,n,r,o,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,n,r,o,"latitudinal",c),this._halfBlur(f,e,r,r,o,"longitudinal",c)}_halfBlur(e,n,r,o,c,f,h){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&nn("blur direction must be either latitudinal or longitudinal!");const x=3,g=this._lodMeshes[o];g.material=p;const v=p.uniforms,y=this._sizeLods[r]-1,M=isFinite(c)?Math.PI/(2*y):2*Math.PI/(2*kr-1),A=c/M,b=isFinite(c)?1+Math.floor(x*A):kr;b>kr&&ct(`sigmaRadians, ${c}, is too large and will clip, as it requested ${b} samples when the maximum is set to ${kr}`);const S=[];let z=0;for(let F=0;F<kr;++F){const Z=F/A,C=Math.exp(-Z*Z/2);S.push(C),F===0?z+=C:F<b&&(z+=2*C)}for(let F=0;F<S.length;F++)S[F]=S[F]/z;v.envMap.value=e.texture,v.samples.value=b,v.weights.value=S,v.latitudinal.value=f==="latitudinal",h&&(v.poleAxis.value=h);const{_lodMax:N}=this;v.dTheta.value=M,v.mipInt.value=N-r;const D=this._sizeLods[o],G=3*D*(o>N-cr?o-N+cr:0),L=4*(this._cubeSize-D);Ws(n,G,L,3*D,2*D),m.setRenderTarget(n),m.render(g,bl)}}function rT(a){const e=[],n=[],r=[];let o=a;const c=a-cr+1+Wv.length;for(let f=0;f<c;f++){const h=Math.pow(2,o);e.push(h);let m=1/h;f>a-cr?m=Wv[f-a+cr-1]:f===0&&(m=0),n.push(m);const p=1/(h-2),x=-p,g=1+p,v=[x,x,g,x,g,g,x,x,g,g,x,g],y=6,M=6,A=3,b=2,S=1,z=new Float32Array(A*M*y),N=new Float32Array(b*M*y),D=new Float32Array(S*M*y);for(let L=0;L<y;L++){const F=L%3*2/3-1,Z=L>2?0:-1,C=[F,Z,0,F+2/3,Z,0,F+2/3,Z+1,0,F,Z,0,F+2/3,Z+1,0,F,Z+1,0];z.set(C,A*M*L),N.set(v,b*M*L);const w=[L,L,L,L,L,L];D.set(w,S*M*L)}const G=new fr;G.setAttribute("position",new ki(z,A)),G.setAttribute("uv",new ki(N,b)),G.setAttribute("faceIndex",new ki(D,S)),r.push(new Wi(G,null)),o>cr&&o--}return{lodMeshes:r,sizeLods:e,sigmas:n}}function jv(a,e,n){const r=new Zr(a,e,n);return r.texture.mapping=Wu,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ws(a,e,n,r,o){a.viewport.set(e,n,r,o),a.scissor.set(e,n,r,o)}function sT(a,e,n){return new Ca({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:iT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ma,depthTest:!1,depthWrite:!1})}function oT(a,e,n){const r=new Float32Array(kr),o=new se(0,1,0);return new Ca({name:"SphericalGaussianBlur",defines:{n:kr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:o}},vertexShader:Yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ma,depthTest:!1,depthWrite:!1})}function Kv(){return new Ca({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ma,depthTest:!1,depthWrite:!1})}function Zv(){return new Ca({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ma,depthTest:!1,depthWrite:!1})}function Yu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function lT(a){let e=new WeakMap,n=null;function r(h){if(h&&h.isTexture){const m=h.mapping,p=m===np||m===ip,x=m===co||m===uo;if(p||x){let g=e.get(h);const v=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==v)return n===null&&(n=new Yv(a)),g=p?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{const y=h.image;return p&&y&&y.height>0||x&&y&&o(y)?(n===null&&(n=new Yv(a)),g=p?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",c),g.texture):null}}}return h}function o(h){let m=0;const p=6;for(let x=0;x<p;x++)h[x]!==void 0&&m++;return m===p}function c(h){const m=h.target;m.removeEventListener("dispose",c);const p=e.get(m);p!==void 0&&(e.delete(m),p.dispose())}function f(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function cT(a){const e={};function n(r){if(e[r]!==void 0)return e[r];const o=a.getExtension(r);return e[r]=o,o}return{has:function(r){return n(r)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(r){const o=n(r);return o===null&&zl("WebGLRenderer: "+r+" extension not supported."),o}}}function uT(a,e,n,r){const o={},c=new WeakMap;function f(g){const v=g.target;v.index!==null&&e.remove(v.index);for(const M in v.attributes)e.remove(v.attributes[M]);v.removeEventListener("dispose",f),delete o[v.id];const y=c.get(v);y&&(e.remove(y),c.delete(v)),r.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function h(g,v){return o[v.id]===!0||(v.addEventListener("dispose",f),o[v.id]=!0,n.memory.geometries++),v}function m(g){const v=g.attributes;for(const y in v)e.update(v[y],a.ARRAY_BUFFER)}function p(g){const v=[],y=g.index,M=g.attributes.position;let A=0;if(y!==null){const z=y.array;A=y.version;for(let N=0,D=z.length;N<D;N+=3){const G=z[N+0],L=z[N+1],F=z[N+2];v.push(G,L,L,F,F,G)}}else if(M!==void 0){const z=M.array;A=M.version;for(let N=0,D=z.length/3-1;N<D;N+=3){const G=N+0,L=N+1,F=N+2;v.push(G,L,L,F,F,G)}}else return;const b=new(J_(v)?iS:nS)(v,1);b.version=A;const S=c.get(g);S&&e.remove(S),c.set(g,b)}function x(g){const v=c.get(g);if(v){const y=g.index;y!==null&&v.version<y.version&&p(g)}else p(g);return c.get(g)}return{get:h,update:m,getWireframeAttribute:x}}function fT(a,e,n){let r;function o(v){r=v}let c,f;function h(v){c=v.type,f=v.bytesPerElement}function m(v,y){a.drawElements(r,y,c,v*f),n.update(y,r,1)}function p(v,y,M){M!==0&&(a.drawElementsInstanced(r,y,c,v*f,M),n.update(y,r,M))}function x(v,y,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,y,0,c,v,0,M);let b=0;for(let S=0;S<M;S++)b+=y[S];n.update(b,r,1)}function g(v,y,M,A){if(M===0)return;const b=e.get("WEBGL_multi_draw");if(b===null)for(let S=0;S<v.length;S++)p(v[S]/f,y[S],A[S]);else{b.multiDrawElementsInstancedWEBGL(r,y,0,c,v,0,A,0,M);let S=0;for(let z=0;z<M;z++)S+=y[z]*A[z];n.update(S,r,1)}}this.setMode=o,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=x,this.renderMultiDrawInstances=g}function dT(a){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,f,h){switch(n.calls++,f){case a.TRIANGLES:n.triangles+=h*(c/3);break;case a.LINES:n.lines+=h*(c/2);break;case a.LINE_STRIP:n.lines+=h*(c-1);break;case a.LINE_LOOP:n.lines+=h*c;break;case a.POINTS:n.points+=h*c;break;default:nn("WebGLInfo: Unknown draw mode:",f);break}}function o(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:o,update:r}}function hT(a,e,n){const r=new WeakMap,o=new ln;function c(f,h,m){const p=f.morphTargetInfluences,x=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=x!==void 0?x.length:0;let v=r.get(h);if(v===void 0||v.count!==g){let C=function(){F.dispose(),r.delete(h),h.removeEventListener("dispose",C)};v!==void 0&&v.texture.dispose();const y=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,A=h.morphAttributes.color!==void 0,b=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],z=h.morphAttributes.color||[];let N=0;y===!0&&(N=1),M===!0&&(N=2),A===!0&&(N=3);let D=h.attributes.position.count*N,G=1;D>e.maxTextureSize&&(G=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const L=new Float32Array(D*G*4*g),F=new $_(L,D,G,g);F.type=ba,F.needsUpdate=!0;const Z=N*4;for(let w=0;w<g;w++){const k=b[w],ne=S[w],le=z[w],fe=D*G*4*w;for(let pe=0;pe<k.count;pe++){const P=pe*Z;y===!0&&(o.fromBufferAttribute(k,pe),L[fe+P+0]=o.x,L[fe+P+1]=o.y,L[fe+P+2]=o.z,L[fe+P+3]=0),M===!0&&(o.fromBufferAttribute(ne,pe),L[fe+P+4]=o.x,L[fe+P+5]=o.y,L[fe+P+6]=o.z,L[fe+P+7]=0),A===!0&&(o.fromBufferAttribute(le,pe),L[fe+P+8]=o.x,L[fe+P+9]=o.y,L[fe+P+10]=o.z,L[fe+P+11]=le.itemSize===4?o.w:1)}}v={count:g,texture:F,size:new zt(D,G)},r.set(h,v),h.addEventListener("dispose",C)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(a,"morphTexture",f.morphTexture,n);else{let y=0;for(let A=0;A<p.length;A++)y+=p[A];const M=h.morphTargetsRelative?1:1-y;m.getUniforms().setValue(a,"morphTargetBaseInfluence",M),m.getUniforms().setValue(a,"morphTargetInfluences",p)}m.getUniforms().setValue(a,"morphTargetsTexture",v.texture,n),m.getUniforms().setValue(a,"morphTargetsTextureSize",v.size)}return{update:c}}function pT(a,e,n,r){let o=new WeakMap;function c(m){const p=r.render.frame,x=m.geometry,g=e.get(m,x);if(o.get(g)!==p&&(e.update(g),o.set(g,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",h)===!1&&m.addEventListener("dispose",h),o.get(m)!==p&&(n.update(m.instanceMatrix,a.ARRAY_BUFFER),m.instanceColor!==null&&n.update(m.instanceColor,a.ARRAY_BUFFER),o.set(m,p))),m.isSkinnedMesh){const v=m.skeleton;o.get(v)!==p&&(v.update(),o.set(v,p))}return g}function f(){o=new WeakMap}function h(m){const p=m.target;p.removeEventListener("dispose",h),n.remove(p.instanceMatrix),p.instanceColor!==null&&n.remove(p.instanceColor)}return{update:c,dispose:f}}const fS=new Vn,Qv=new lS(1,1),dS=new $_,hS=new GM,pS=new sS,Jv=[],$v=[],e_=new Float32Array(16),t_=new Float32Array(9),n_=new Float32Array(4);function yo(a,e,n){const r=a[0];if(r<=0||r>0)return a;const o=e*n;let c=Jv[o];if(c===void 0&&(c=new Float32Array(o),Jv[o]=c),e!==0){r.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=n,a[f].toArray(c,h)}return c}function _n(a,e){if(a.length!==e.length)return!1;for(let n=0,r=a.length;n<r;n++)if(a[n]!==e[n])return!1;return!0}function Sn(a,e){for(let n=0,r=e.length;n<r;n++)a[n]=e[n]}function ju(a,e){let n=$v[e];n===void 0&&(n=new Int32Array(e),$v[e]=n);for(let r=0;r!==e;++r)n[r]=a.allocateTextureUnit();return n}function mT(a,e){const n=this.cache;n[0]!==e&&(a.uniform1f(this.addr,e),n[0]=e)}function xT(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(_n(n,e))return;a.uniform2fv(this.addr,e),Sn(n,e)}}function gT(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(a.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(_n(n,e))return;a.uniform3fv(this.addr,e),Sn(n,e)}}function vT(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(_n(n,e))return;a.uniform4fv(this.addr,e),Sn(n,e)}}function _T(a,e){const n=this.cache,r=e.elements;if(r===void 0){if(_n(n,e))return;a.uniformMatrix2fv(this.addr,!1,e),Sn(n,e)}else{if(_n(n,r))return;n_.set(r),a.uniformMatrix2fv(this.addr,!1,n_),Sn(n,r)}}function ST(a,e){const n=this.cache,r=e.elements;if(r===void 0){if(_n(n,e))return;a.uniformMatrix3fv(this.addr,!1,e),Sn(n,e)}else{if(_n(n,r))return;t_.set(r),a.uniformMatrix3fv(this.addr,!1,t_),Sn(n,r)}}function yT(a,e){const n=this.cache,r=e.elements;if(r===void 0){if(_n(n,e))return;a.uniformMatrix4fv(this.addr,!1,e),Sn(n,e)}else{if(_n(n,r))return;e_.set(r),a.uniformMatrix4fv(this.addr,!1,e_),Sn(n,r)}}function bT(a,e){const n=this.cache;n[0]!==e&&(a.uniform1i(this.addr,e),n[0]=e)}function MT(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(_n(n,e))return;a.uniform2iv(this.addr,e),Sn(n,e)}}function ET(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(_n(n,e))return;a.uniform3iv(this.addr,e),Sn(n,e)}}function TT(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(_n(n,e))return;a.uniform4iv(this.addr,e),Sn(n,e)}}function AT(a,e){const n=this.cache;n[0]!==e&&(a.uniform1ui(this.addr,e),n[0]=e)}function RT(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(a.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(_n(n,e))return;a.uniform2uiv(this.addr,e),Sn(n,e)}}function wT(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(a.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(_n(n,e))return;a.uniform3uiv(this.addr,e),Sn(n,e)}}function CT(a,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(a.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(_n(n,e))return;a.uniform4uiv(this.addr,e),Sn(n,e)}}function DT(a,e,n){const r=this.cache,o=n.allocateTextureUnit();r[0]!==o&&(a.uniform1i(this.addr,o),r[0]=o);let c;this.type===a.SAMPLER_2D_SHADOW?(Qv.compareFunction=Q_,c=Qv):c=fS,n.setTexture2D(e||c,o)}function LT(a,e,n){const r=this.cache,o=n.allocateTextureUnit();r[0]!==o&&(a.uniform1i(this.addr,o),r[0]=o),n.setTexture3D(e||hS,o)}function UT(a,e,n){const r=this.cache,o=n.allocateTextureUnit();r[0]!==o&&(a.uniform1i(this.addr,o),r[0]=o),n.setTextureCube(e||pS,o)}function NT(a,e,n){const r=this.cache,o=n.allocateTextureUnit();r[0]!==o&&(a.uniform1i(this.addr,o),r[0]=o),n.setTexture2DArray(e||dS,o)}function OT(a){switch(a){case 5126:return mT;case 35664:return xT;case 35665:return gT;case 35666:return vT;case 35674:return _T;case 35675:return ST;case 35676:return yT;case 5124:case 35670:return bT;case 35667:case 35671:return MT;case 35668:case 35672:return ET;case 35669:case 35673:return TT;case 5125:return AT;case 36294:return RT;case 36295:return wT;case 36296:return CT;case 35678:case 36198:case 36298:case 36306:case 35682:return DT;case 35679:case 36299:case 36307:return LT;case 35680:case 36300:case 36308:case 36293:return UT;case 36289:case 36303:case 36311:case 36292:return NT}}function FT(a,e){a.uniform1fv(this.addr,e)}function PT(a,e){const n=yo(e,this.size,2);a.uniform2fv(this.addr,n)}function zT(a,e){const n=yo(e,this.size,3);a.uniform3fv(this.addr,n)}function BT(a,e){const n=yo(e,this.size,4);a.uniform4fv(this.addr,n)}function IT(a,e){const n=yo(e,this.size,4);a.uniformMatrix2fv(this.addr,!1,n)}function GT(a,e){const n=yo(e,this.size,9);a.uniformMatrix3fv(this.addr,!1,n)}function HT(a,e){const n=yo(e,this.size,16);a.uniformMatrix4fv(this.addr,!1,n)}function VT(a,e){a.uniform1iv(this.addr,e)}function kT(a,e){a.uniform2iv(this.addr,e)}function XT(a,e){a.uniform3iv(this.addr,e)}function WT(a,e){a.uniform4iv(this.addr,e)}function qT(a,e){a.uniform1uiv(this.addr,e)}function YT(a,e){a.uniform2uiv(this.addr,e)}function jT(a,e){a.uniform3uiv(this.addr,e)}function KT(a,e){a.uniform4uiv(this.addr,e)}function ZT(a,e,n){const r=this.cache,o=e.length,c=ju(n,o);_n(r,c)||(a.uniform1iv(this.addr,c),Sn(r,c));for(let f=0;f!==o;++f)n.setTexture2D(e[f]||fS,c[f])}function QT(a,e,n){const r=this.cache,o=e.length,c=ju(n,o);_n(r,c)||(a.uniform1iv(this.addr,c),Sn(r,c));for(let f=0;f!==o;++f)n.setTexture3D(e[f]||hS,c[f])}function JT(a,e,n){const r=this.cache,o=e.length,c=ju(n,o);_n(r,c)||(a.uniform1iv(this.addr,c),Sn(r,c));for(let f=0;f!==o;++f)n.setTextureCube(e[f]||pS,c[f])}function $T(a,e,n){const r=this.cache,o=e.length,c=ju(n,o);_n(r,c)||(a.uniform1iv(this.addr,c),Sn(r,c));for(let f=0;f!==o;++f)n.setTexture2DArray(e[f]||dS,c[f])}function eA(a){switch(a){case 5126:return FT;case 35664:return PT;case 35665:return zT;case 35666:return BT;case 35674:return IT;case 35675:return GT;case 35676:return HT;case 5124:case 35670:return VT;case 35667:case 35671:return kT;case 35668:case 35672:return XT;case 35669:case 35673:return WT;case 5125:return qT;case 36294:return YT;case 36295:return jT;case 36296:return KT;case 35678:case 36198:case 36298:case 36306:case 35682:return ZT;case 35679:case 36299:case 36307:return QT;case 35680:case 36300:case 36308:case 36293:return JT;case 36289:case 36303:case 36311:case 36292:return $T}}class tA{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.setValue=OT(n.type)}}class nA{constructor(e,n,r){this.id=e,this.addr=r,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=eA(n.type)}}class iA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,r){const o=this.seq;for(let c=0,f=o.length;c!==f;++c){const h=o[c];h.setValue(e,n[h.id],r)}}}const Hh=/(\w+)(\])?(\[|\.)?/g;function i_(a,e){a.seq.push(e),a.map[e.id]=e}function aA(a,e,n){const r=a.name,o=r.length;for(Hh.lastIndex=0;;){const c=Hh.exec(r),f=Hh.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&f+2===o){i_(n,p===void 0?new tA(h,a,e):new nA(h,a,e));break}else{let g=n.map[h];g===void 0&&(g=new iA(h),i_(n,g)),n=g}}}class Du{constructor(e,n){this.seq=[],this.map={};const r=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<r;++o){const c=e.getActiveUniform(n,o),f=e.getUniformLocation(n,c.name);aA(c,f,this)}}setValue(e,n,r,o){const c=this.map[n];c!==void 0&&c.setValue(e,r,o)}setOptional(e,n,r){const o=n[r];o!==void 0&&this.setValue(e,r,o)}static upload(e,n,r,o){for(let c=0,f=n.length;c!==f;++c){const h=n[c],m=r[h.id];m.needsUpdate!==!1&&h.setValue(e,m.value,o)}}static seqWithValue(e,n){const r=[];for(let o=0,c=e.length;o!==c;++o){const f=e[o];f.id in n&&r.push(f)}return r}}function a_(a,e,n){const r=a.createShader(e);return a.shaderSource(r,n),a.compileShader(r),r}const rA=37297;let sA=0;function oA(a,e){const n=a.split(`
`),r=[],o=Math.max(e-6,0),c=Math.min(e+6,n.length);for(let f=o;f<c;f++){const h=f+1;r.push(`${h===e?">":" "} ${h}: ${n[f]}`)}return r.join(`
`)}const r_=new pt;function lA(a){Nt._getMatrix(r_,Nt.workingColorSpace,a);const e=`mat3( ${r_.elements.map(n=>n.toFixed(4))} )`;switch(Nt.getTransfer(a)){case Fu:return[e,"LinearTransferOETF"];case Wt:return[e,"sRGBTransferOETF"];default:return ct("WebGLProgram: Unsupported color space: ",a),[e,"LinearTransferOETF"]}}function s_(a,e,n){const r=a.getShaderParameter(e,a.COMPILE_STATUS),c=(a.getShaderInfoLog(e)||"").trim();if(r&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return n.toUpperCase()+`

`+c+`

`+oA(a.getShaderSource(e),h)}else return c}function cA(a,e){const n=lA(e);return[`vec4 ${a}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function uA(a,e){let n;switch(e){case Q1:n="Linear";break;case J1:n="Reinhard";break;case $1:n="Cineon";break;case eM:n="ACESFilmic";break;case nM:n="AgX";break;case iM:n="Neutral";break;case tM:n="Custom";break;default:ct("WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+a+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const bu=new se;function fA(){Nt.getLuminanceCoefficients(bu);const a=bu.x.toFixed(4),e=bu.y.toFixed(4),n=bu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function dA(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Tl).join(`
`)}function hA(a){const e=[];for(const n in a){const r=a[n];r!==!1&&e.push("#define "+n+" "+r)}return e.join(`
`)}function pA(a,e){const n={},r=a.getProgramParameter(e,a.ACTIVE_ATTRIBUTES);for(let o=0;o<r;o++){const c=a.getActiveAttrib(e,o),f=c.name;let h=1;c.type===a.FLOAT_MAT2&&(h=2),c.type===a.FLOAT_MAT3&&(h=3),c.type===a.FLOAT_MAT4&&(h=4),n[f]={type:c.type,location:a.getAttribLocation(e,f),locationSize:h}}return n}function Tl(a){return a!==""}function o_(a,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function l_(a,e){return a.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fp(a){return a.replace(mA,gA)}const xA=new Map;function gA(a,e){let n=gt[e];if(n===void 0){const r=xA.get(e);if(r!==void 0)n=gt[r],ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Fp(n)}const vA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function c_(a){return a.replace(vA,_A)}function _A(a,e,n,r){let o="";for(let c=parseInt(e);c<parseInt(n);c++)o+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return o}function u_(a){let e=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?e+=`
#define HIGH_PRECISION`:a.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function SA(a){let e="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===H_?e="SHADOWMAP_TYPE_PCF":a.shadowMapType===D1?e="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===va&&(e="SHADOWMAP_TYPE_VSM"),e}function yA(a){let e="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case co:case uo:e="ENVMAP_TYPE_CUBE";break;case Wu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function bA(a){let e="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case uo:e="ENVMAP_MODE_REFRACTION";break}return e}function MA(a){let e="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case V_:e="ENVMAP_BLENDING_MULTIPLY";break;case K1:e="ENVMAP_BLENDING_MIX";break;case Z1:e="ENVMAP_BLENDING_ADD";break}return e}function EA(a){const e=a.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:r,maxMip:n}}function TA(a,e,n,r){const o=a.getContext(),c=n.defines;let f=n.vertexShader,h=n.fragmentShader;const m=SA(n),p=yA(n),x=bA(n),g=MA(n),v=EA(n),y=dA(n),M=hA(c),A=o.createProgram();let b,S,z=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(b=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M].filter(Tl).join(`
`),b.length>0&&(b+=`
`),S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M].filter(Tl).join(`
`),S.length>0&&(S+=`
`)):(b=[u_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+x:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tl).join(`
`),S=[u_(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,M,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+p:"",n.envMap?"#define "+x:"",n.envMap?"#define "+g:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+m:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ur?"#define TONE_MAPPING":"",n.toneMapping!==ur?gt.tonemapping_pars_fragment:"",n.toneMapping!==ur?uA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",gt.colorspace_pars_fragment,cA("linearToOutputTexel",n.outputColorSpace),fA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Tl).join(`
`)),f=Fp(f),f=o_(f,n),f=l_(f,n),h=Fp(h),h=o_(h,n),h=l_(h,n),f=c_(f),h=c_(h),n.isRawShaderMaterial!==!0&&(z=`#version 300 es
`,b=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+b,S=["#define varying in",n.glslVersion===bv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===bv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const N=z+b+f,D=z+S+h,G=a_(o,o.VERTEX_SHADER,N),L=a_(o,o.FRAGMENT_SHADER,D);o.attachShader(A,G),o.attachShader(A,L),n.index0AttributeName!==void 0?o.bindAttribLocation(A,0,n.index0AttributeName):n.morphTargets===!0&&o.bindAttribLocation(A,0,"position"),o.linkProgram(A);function F(k){if(a.debug.checkShaderErrors){const ne=o.getProgramInfoLog(A)||"",le=o.getShaderInfoLog(G)||"",fe=o.getShaderInfoLog(L)||"",pe=ne.trim(),P=le.trim(),te=fe.trim();let j=!0,ve=!0;if(o.getProgramParameter(A,o.LINK_STATUS)===!1)if(j=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(o,A,G,L);else{const Se=s_(o,G,"vertex"),U=s_(o,L,"fragment");nn("THREE.WebGLProgram: Shader Error "+o.getError()+" - VALIDATE_STATUS "+o.getProgramParameter(A,o.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+pe+`
`+Se+`
`+U)}else pe!==""?ct("WebGLProgram: Program Info Log:",pe):(P===""||te==="")&&(ve=!1);ve&&(k.diagnostics={runnable:j,programLog:pe,vertexShader:{log:P,prefix:b},fragmentShader:{log:te,prefix:S}})}o.deleteShader(G),o.deleteShader(L),Z=new Du(o,A),C=pA(o,A)}let Z;this.getUniforms=function(){return Z===void 0&&F(this),Z};let C;this.getAttributes=function(){return C===void 0&&F(this),C};let w=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=o.getProgramParameter(A,rA)),w},this.destroy=function(){r.releaseStatesOfProgram(this),o.deleteProgram(A),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=sA++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=G,this.fragmentShader=L,this}let AA=0;class RA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,r=e.fragmentShader,o=this._getShaderStage(n),c=this._getShaderStage(r),f=this._getShaderCacheForMaterial(e);return f.has(o)===!1&&(f.add(o),o.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const r of n)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let r=n.get(e);return r===void 0&&(r=new Set,n.set(e,r)),r}_getShaderStage(e){const n=this.shaderCache;let r=n.get(e);return r===void 0&&(r=new wA(e),n.set(e,r)),r}}class wA{constructor(e){this.id=AA++,this.code=e,this.usedTimes=0}}function CA(a,e,n,r,o,c,f){const h=new lm,m=new RA,p=new Set,x=[],g=o.logarithmicDepthBuffer,v=o.vertexTextures;let y=o.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(C){return p.add(C),C===0?"uv":`uv${C}`}function b(C,w,k,ne,le){const fe=ne.fog,pe=le.geometry,P=C.isMeshStandardMaterial?ne.environment:null,te=(C.isMeshStandardMaterial?n:e).get(C.envMap||P),j=te&&te.mapping===Wu?te.image.height:null,ve=M[C.type];C.precision!==null&&(y=o.getMaxPrecision(C.precision),y!==C.precision&&ct("WebGLProgram.getParameters:",C.precision,"not supported, using",y,"instead."));const Se=pe.morphAttributes.position||pe.morphAttributes.normal||pe.morphAttributes.color,U=Se!==void 0?Se.length:0;let K=0;pe.morphAttributes.position!==void 0&&(K=1),pe.morphAttributes.normal!==void 0&&(K=2),pe.morphAttributes.color!==void 0&&(K=3);let ye,Ae,Fe,ie;if(ve){const Ct=Hi[ve];ye=Ct.vertexShader,Ae=Ct.fragmentShader}else ye=C.vertexShader,Ae=C.fragmentShader,m.update(C),Fe=m.getVertexShaderID(C),ie=m.getFragmentShaderID(C);const ce=a.getRenderTarget(),we=a.state.buffers.depth.getReversed(),He=le.isInstancedMesh===!0,We=le.isBatchedMesh===!0,ft=!!C.map,an=!!C.matcap,mt=!!te,wt=!!C.aoMap,I=!!C.lightMap,xt=!!C.bumpMap,vt=!!C.normalMap,Bt=!!C.displacementMap,Ve=!!C.emissiveMap,qt=!!C.metalnessMap,Ze=!!C.roughnessMap,ot=C.anisotropy>0,O=C.clearcoat>0,E=C.dispersion>0,J=C.iridescence>0,xe=C.sheen>0,be=C.transmission>0,ue=ot&&!!C.anisotropyMap,je=O&&!!C.clearcoatMap,Ne=O&&!!C.clearcoatNormalMap,et=O&&!!C.clearcoatRoughnessMap,qe=J&&!!C.iridescenceMap,Me=J&&!!C.iridescenceThicknessMap,Te=xe&&!!C.sheenColorMap,Ke=xe&&!!C.sheenRoughnessMap,ke=!!C.specularMap,Pe=!!C.specularColorMap,rt=!!C.specularIntensityMap,H=be&&!!C.transmissionMap,Le=be&&!!C.thicknessMap,Ce=!!C.gradientMap,De=!!C.alphaMap,Ee=C.alphaTest>0,_e=!!C.alphaHash,Be=!!C.extensions;let st=ur;C.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(st=a.toneMapping);const Ht={shaderID:ve,shaderType:C.type,shaderName:C.name,vertexShader:ye,fragmentShader:Ae,defines:C.defines,customVertexShaderID:Fe,customFragmentShaderID:ie,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:y,batching:We,batchingColor:We&&le._colorsTexture!==null,instancing:He,instancingColor:He&&le.instanceColor!==null,instancingMorph:He&&le.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:ce===null?a.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:fo,alphaToCoverage:!!C.alphaToCoverage,map:ft,matcap:an,envMap:mt,envMapMode:mt&&te.mapping,envMapCubeUVHeight:j,aoMap:wt,lightMap:I,bumpMap:xt,normalMap:vt,displacementMap:v&&Bt,emissiveMap:Ve,normalMapObjectSpace:vt&&C.normalMapType===lM,normalMapTangentSpace:vt&&C.normalMapType===oM,metalnessMap:qt,roughnessMap:Ze,anisotropy:ot,anisotropyMap:ue,clearcoat:O,clearcoatMap:je,clearcoatNormalMap:Ne,clearcoatRoughnessMap:et,dispersion:E,iridescence:J,iridescenceMap:qe,iridescenceThicknessMap:Me,sheen:xe,sheenColorMap:Te,sheenRoughnessMap:Ke,specularMap:ke,specularColorMap:Pe,specularIntensityMap:rt,transmission:be,transmissionMap:H,thicknessMap:Le,gradientMap:Ce,opaque:C.transparent===!1&&C.blending===ro&&C.alphaToCoverage===!1,alphaMap:De,alphaTest:Ee,alphaHash:_e,combine:C.combine,mapUv:ft&&A(C.map.channel),aoMapUv:wt&&A(C.aoMap.channel),lightMapUv:I&&A(C.lightMap.channel),bumpMapUv:xt&&A(C.bumpMap.channel),normalMapUv:vt&&A(C.normalMap.channel),displacementMapUv:Bt&&A(C.displacementMap.channel),emissiveMapUv:Ve&&A(C.emissiveMap.channel),metalnessMapUv:qt&&A(C.metalnessMap.channel),roughnessMapUv:Ze&&A(C.roughnessMap.channel),anisotropyMapUv:ue&&A(C.anisotropyMap.channel),clearcoatMapUv:je&&A(C.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&A(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&A(C.clearcoatRoughnessMap.channel),iridescenceMapUv:qe&&A(C.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&A(C.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&A(C.sheenColorMap.channel),sheenRoughnessMapUv:Ke&&A(C.sheenRoughnessMap.channel),specularMapUv:ke&&A(C.specularMap.channel),specularColorMapUv:Pe&&A(C.specularColorMap.channel),specularIntensityMapUv:rt&&A(C.specularIntensityMap.channel),transmissionMapUv:H&&A(C.transmissionMap.channel),thicknessMapUv:Le&&A(C.thicknessMap.channel),alphaMapUv:De&&A(C.alphaMap.channel),vertexTangents:!!pe.attributes.tangent&&(vt||ot),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!pe.attributes.color&&pe.attributes.color.itemSize===4,pointsUvs:le.isPoints===!0&&!!pe.attributes.uv&&(ft||De),fog:!!fe,useFog:C.fog===!0,fogExp2:!!fe&&fe.isFogExp2,flatShading:C.flatShading===!0&&C.wireframe===!1,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:we,skinning:le.isSkinnedMesh===!0,morphTargets:pe.morphAttributes.position!==void 0,morphNormals:pe.morphAttributes.normal!==void 0,morphColors:pe.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:K,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:C.dithering,shadowMapEnabled:a.shadowMap.enabled&&k.length>0,shadowMapType:a.shadowMap.type,toneMapping:st,decodeVideoTexture:ft&&C.map.isVideoTexture===!0&&Nt.getTransfer(C.map.colorSpace)===Wt,decodeVideoTextureEmissive:Ve&&C.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(C.emissiveMap.colorSpace)===Wt,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Sa,flipSided:C.side===Kn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:Be&&C.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&C.extensions.multiDraw===!0||We)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return Ht.vertexUv1s=p.has(1),Ht.vertexUv2s=p.has(2),Ht.vertexUv3s=p.has(3),p.clear(),Ht}function S(C){const w=[];if(C.shaderID?w.push(C.shaderID):(w.push(C.customVertexShaderID),w.push(C.customFragmentShaderID)),C.defines!==void 0)for(const k in C.defines)w.push(k),w.push(C.defines[k]);return C.isRawShaderMaterial===!1&&(z(w,C),N(w,C),w.push(a.outputColorSpace)),w.push(C.customProgramCacheKey),w.join()}function z(C,w){C.push(w.precision),C.push(w.outputColorSpace),C.push(w.envMapMode),C.push(w.envMapCubeUVHeight),C.push(w.mapUv),C.push(w.alphaMapUv),C.push(w.lightMapUv),C.push(w.aoMapUv),C.push(w.bumpMapUv),C.push(w.normalMapUv),C.push(w.displacementMapUv),C.push(w.emissiveMapUv),C.push(w.metalnessMapUv),C.push(w.roughnessMapUv),C.push(w.anisotropyMapUv),C.push(w.clearcoatMapUv),C.push(w.clearcoatNormalMapUv),C.push(w.clearcoatRoughnessMapUv),C.push(w.iridescenceMapUv),C.push(w.iridescenceThicknessMapUv),C.push(w.sheenColorMapUv),C.push(w.sheenRoughnessMapUv),C.push(w.specularMapUv),C.push(w.specularColorMapUv),C.push(w.specularIntensityMapUv),C.push(w.transmissionMapUv),C.push(w.thicknessMapUv),C.push(w.combine),C.push(w.fogExp2),C.push(w.sizeAttenuation),C.push(w.morphTargetsCount),C.push(w.morphAttributeCount),C.push(w.numDirLights),C.push(w.numPointLights),C.push(w.numSpotLights),C.push(w.numSpotLightMaps),C.push(w.numHemiLights),C.push(w.numRectAreaLights),C.push(w.numDirLightShadows),C.push(w.numPointLightShadows),C.push(w.numSpotLightShadows),C.push(w.numSpotLightShadowsWithMaps),C.push(w.numLightProbes),C.push(w.shadowMapType),C.push(w.toneMapping),C.push(w.numClippingPlanes),C.push(w.numClipIntersection),C.push(w.depthPacking)}function N(C,w){h.disableAll(),w.supportsVertexTextures&&h.enable(0),w.instancing&&h.enable(1),w.instancingColor&&h.enable(2),w.instancingMorph&&h.enable(3),w.matcap&&h.enable(4),w.envMap&&h.enable(5),w.normalMapObjectSpace&&h.enable(6),w.normalMapTangentSpace&&h.enable(7),w.clearcoat&&h.enable(8),w.iridescence&&h.enable(9),w.alphaTest&&h.enable(10),w.vertexColors&&h.enable(11),w.vertexAlphas&&h.enable(12),w.vertexUv1s&&h.enable(13),w.vertexUv2s&&h.enable(14),w.vertexUv3s&&h.enable(15),w.vertexTangents&&h.enable(16),w.anisotropy&&h.enable(17),w.alphaHash&&h.enable(18),w.batching&&h.enable(19),w.dispersion&&h.enable(20),w.batchingColor&&h.enable(21),w.gradientMap&&h.enable(22),C.push(h.mask),h.disableAll(),w.fog&&h.enable(0),w.useFog&&h.enable(1),w.flatShading&&h.enable(2),w.logarithmicDepthBuffer&&h.enable(3),w.reversedDepthBuffer&&h.enable(4),w.skinning&&h.enable(5),w.morphTargets&&h.enable(6),w.morphNormals&&h.enable(7),w.morphColors&&h.enable(8),w.premultipliedAlpha&&h.enable(9),w.shadowMapEnabled&&h.enable(10),w.doubleSided&&h.enable(11),w.flipSided&&h.enable(12),w.useDepthPacking&&h.enable(13),w.dithering&&h.enable(14),w.transmission&&h.enable(15),w.sheen&&h.enable(16),w.opaque&&h.enable(17),w.pointsUvs&&h.enable(18),w.decodeVideoTexture&&h.enable(19),w.decodeVideoTextureEmissive&&h.enable(20),w.alphaToCoverage&&h.enable(21),C.push(h.mask)}function D(C){const w=M[C.type];let k;if(w){const ne=Hi[w];k=$M.clone(ne.uniforms)}else k=C.uniforms;return k}function G(C,w){let k;for(let ne=0,le=x.length;ne<le;ne++){const fe=x[ne];if(fe.cacheKey===w){k=fe,++k.usedTimes;break}}return k===void 0&&(k=new TA(a,w,C,c),x.push(k)),k}function L(C){if(--C.usedTimes===0){const w=x.indexOf(C);x[w]=x[x.length-1],x.pop(),C.destroy()}}function F(C){m.remove(C)}function Z(){m.dispose()}return{getParameters:b,getProgramCacheKey:S,getUniforms:D,acquireProgram:G,releaseProgram:L,releaseShaderCache:F,programs:x,dispose:Z}}function DA(){let a=new WeakMap;function e(f){return a.has(f)}function n(f){let h=a.get(f);return h===void 0&&(h={},a.set(f,h)),h}function r(f){a.delete(f)}function o(f,h,m){a.get(f)[h]=m}function c(){a=new WeakMap}return{has:e,get:n,remove:r,update:o,dispose:c}}function LA(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.material.id!==e.material.id?a.material.id-e.material.id:a.z!==e.z?a.z-e.z:a.id-e.id}function f_(a,e){return a.groupOrder!==e.groupOrder?a.groupOrder-e.groupOrder:a.renderOrder!==e.renderOrder?a.renderOrder-e.renderOrder:a.z!==e.z?e.z-a.z:a.id-e.id}function d_(){const a=[];let e=0;const n=[],r=[],o=[];function c(){e=0,n.length=0,r.length=0,o.length=0}function f(g,v,y,M,A,b){let S=a[e];return S===void 0?(S={id:g.id,object:g,geometry:v,material:y,groupOrder:M,renderOrder:g.renderOrder,z:A,group:b},a[e]=S):(S.id=g.id,S.object=g,S.geometry=v,S.material=y,S.groupOrder=M,S.renderOrder=g.renderOrder,S.z=A,S.group=b),e++,S}function h(g,v,y,M,A,b){const S=f(g,v,y,M,A,b);y.transmission>0?r.push(S):y.transparent===!0?o.push(S):n.push(S)}function m(g,v,y,M,A,b){const S=f(g,v,y,M,A,b);y.transmission>0?r.unshift(S):y.transparent===!0?o.unshift(S):n.unshift(S)}function p(g,v){n.length>1&&n.sort(g||LA),r.length>1&&r.sort(v||f_),o.length>1&&o.sort(v||f_)}function x(){for(let g=e,v=a.length;g<v;g++){const y=a[g];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:n,transmissive:r,transparent:o,init:c,push:h,unshift:m,finish:x,sort:p}}function UA(){let a=new WeakMap;function e(r,o){const c=a.get(r);let f;return c===void 0?(f=new d_,a.set(r,[f])):o>=c.length?(f=new d_,c.push(f)):f=c[o],f}function n(){a=new WeakMap}return{get:e,dispose:n}}function NA(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new se,color:new Pt};break;case"SpotLight":n={position:new se,direction:new se,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new se,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new se,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":n={color:new Pt,position:new se,halfWidth:new se,halfHeight:new se};break}return a[e.id]=n,n}}}function OA(){const a={};return{get:function(e){if(a[e.id]!==void 0)return a[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[e.id]=n,n}}}let FA=0;function PA(a,e){return(e.castShadow?2:0)-(a.castShadow?2:0)+(e.map?1:0)-(a.map?1:0)}function zA(a){const e=new NA,n=OA(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new se);const o=new se,c=new cn,f=new cn;function h(p){let x=0,g=0,v=0;for(let C=0;C<9;C++)r.probe[C].set(0,0,0);let y=0,M=0,A=0,b=0,S=0,z=0,N=0,D=0,G=0,L=0,F=0;p.sort(PA);for(let C=0,w=p.length;C<w;C++){const k=p[C],ne=k.color,le=k.intensity,fe=k.distance,pe=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)x+=ne.r*le,g+=ne.g*le,v+=ne.b*le;else if(k.isLightProbe){for(let P=0;P<9;P++)r.probe[P].addScaledVector(k.sh.coefficients[P],le);F++}else if(k.isDirectionalLight){const P=e.get(k);if(P.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const te=k.shadow,j=n.get(k);j.shadowIntensity=te.intensity,j.shadowBias=te.bias,j.shadowNormalBias=te.normalBias,j.shadowRadius=te.radius,j.shadowMapSize=te.mapSize,r.directionalShadow[y]=j,r.directionalShadowMap[y]=pe,r.directionalShadowMatrix[y]=k.shadow.matrix,z++}r.directional[y]=P,y++}else if(k.isSpotLight){const P=e.get(k);P.position.setFromMatrixPosition(k.matrixWorld),P.color.copy(ne).multiplyScalar(le),P.distance=fe,P.coneCos=Math.cos(k.angle),P.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),P.decay=k.decay,r.spot[A]=P;const te=k.shadow;if(k.map&&(r.spotLightMap[G]=k.map,G++,te.updateMatrices(k),k.castShadow&&L++),r.spotLightMatrix[A]=te.matrix,k.castShadow){const j=n.get(k);j.shadowIntensity=te.intensity,j.shadowBias=te.bias,j.shadowNormalBias=te.normalBias,j.shadowRadius=te.radius,j.shadowMapSize=te.mapSize,r.spotShadow[A]=j,r.spotShadowMap[A]=pe,D++}A++}else if(k.isRectAreaLight){const P=e.get(k);P.color.copy(ne).multiplyScalar(le),P.halfWidth.set(k.width*.5,0,0),P.halfHeight.set(0,k.height*.5,0),r.rectArea[b]=P,b++}else if(k.isPointLight){const P=e.get(k);if(P.color.copy(k.color).multiplyScalar(k.intensity),P.distance=k.distance,P.decay=k.decay,k.castShadow){const te=k.shadow,j=n.get(k);j.shadowIntensity=te.intensity,j.shadowBias=te.bias,j.shadowNormalBias=te.normalBias,j.shadowRadius=te.radius,j.shadowMapSize=te.mapSize,j.shadowCameraNear=te.camera.near,j.shadowCameraFar=te.camera.far,r.pointShadow[M]=j,r.pointShadowMap[M]=pe,r.pointShadowMatrix[M]=k.shadow.matrix,N++}r.point[M]=P,M++}else if(k.isHemisphereLight){const P=e.get(k);P.skyColor.copy(k.color).multiplyScalar(le),P.groundColor.copy(k.groundColor).multiplyScalar(le),r.hemi[S]=P,S++}}b>0&&(a.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Oe.LTC_FLOAT_1,r.rectAreaLTC2=Oe.LTC_FLOAT_2):(r.rectAreaLTC1=Oe.LTC_HALF_1,r.rectAreaLTC2=Oe.LTC_HALF_2)),r.ambient[0]=x,r.ambient[1]=g,r.ambient[2]=v;const Z=r.hash;(Z.directionalLength!==y||Z.pointLength!==M||Z.spotLength!==A||Z.rectAreaLength!==b||Z.hemiLength!==S||Z.numDirectionalShadows!==z||Z.numPointShadows!==N||Z.numSpotShadows!==D||Z.numSpotMaps!==G||Z.numLightProbes!==F)&&(r.directional.length=y,r.spot.length=A,r.rectArea.length=b,r.point.length=M,r.hemi.length=S,r.directionalShadow.length=z,r.directionalShadowMap.length=z,r.pointShadow.length=N,r.pointShadowMap.length=N,r.spotShadow.length=D,r.spotShadowMap.length=D,r.directionalShadowMatrix.length=z,r.pointShadowMatrix.length=N,r.spotLightMatrix.length=D+G-L,r.spotLightMap.length=G,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=F,Z.directionalLength=y,Z.pointLength=M,Z.spotLength=A,Z.rectAreaLength=b,Z.hemiLength=S,Z.numDirectionalShadows=z,Z.numPointShadows=N,Z.numSpotShadows=D,Z.numSpotMaps=G,Z.numLightProbes=F,r.version=FA++)}function m(p,x){let g=0,v=0,y=0,M=0,A=0;const b=x.matrixWorldInverse;for(let S=0,z=p.length;S<z;S++){const N=p[S];if(N.isDirectionalLight){const D=r.directional[g];D.direction.setFromMatrixPosition(N.matrixWorld),o.setFromMatrixPosition(N.target.matrixWorld),D.direction.sub(o),D.direction.transformDirection(b),g++}else if(N.isSpotLight){const D=r.spot[y];D.position.setFromMatrixPosition(N.matrixWorld),D.position.applyMatrix4(b),D.direction.setFromMatrixPosition(N.matrixWorld),o.setFromMatrixPosition(N.target.matrixWorld),D.direction.sub(o),D.direction.transformDirection(b),y++}else if(N.isRectAreaLight){const D=r.rectArea[M];D.position.setFromMatrixPosition(N.matrixWorld),D.position.applyMatrix4(b),f.identity(),c.copy(N.matrixWorld),c.premultiply(b),f.extractRotation(c),D.halfWidth.set(N.width*.5,0,0),D.halfHeight.set(0,N.height*.5,0),D.halfWidth.applyMatrix4(f),D.halfHeight.applyMatrix4(f),M++}else if(N.isPointLight){const D=r.point[v];D.position.setFromMatrixPosition(N.matrixWorld),D.position.applyMatrix4(b),v++}else if(N.isHemisphereLight){const D=r.hemi[A];D.direction.setFromMatrixPosition(N.matrixWorld),D.direction.transformDirection(b),A++}}}return{setup:h,setupView:m,state:r}}function h_(a){const e=new zA(a),n=[],r=[];function o(x){p.camera=x,n.length=0,r.length=0}function c(x){n.push(x)}function f(x){r.push(x)}function h(){e.setup(n)}function m(x){e.setupView(n,x)}const p={lightsArray:n,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:o,state:p,setupLights:h,setupLightsView:m,pushLight:c,pushShadow:f}}function BA(a){let e=new WeakMap;function n(o,c=0){const f=e.get(o);let h;return f===void 0?(h=new h_(a),e.set(o,[h])):c>=f.length?(h=new h_(a),f.push(h)):h=f[c],h}function r(){e=new WeakMap}return{get:n,dispose:r}}const IA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function HA(a,e,n){let r=new oS;const o=new zt,c=new zt,f=new ln,h=new uE({depthPacking:sM}),m=new fE,p={},x=n.maxTextureSize,g={[Aa]:Kn,[Kn]:Aa,[Sa]:Sa},v=new Ca({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:IA,fragmentShader:GA}),y=v.clone();y.defines.HORIZONTAL_PASS=1;const M=new fr;M.setAttribute("position",new ki(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Wi(M,v),b=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=H_;let S=this.type;this.render=function(L,F,Z){if(b.enabled===!1||b.autoUpdate===!1&&b.needsUpdate===!1||L.length===0)return;const C=a.getRenderTarget(),w=a.getActiveCubeFace(),k=a.getActiveMipmapLevel(),ne=a.state;ne.setBlending(Ma),ne.buffers.depth.getReversed()===!0?ne.buffers.color.setClear(0,0,0,0):ne.buffers.color.setClear(1,1,1,1),ne.buffers.depth.setTest(!0),ne.setScissorTest(!1);const le=S!==va&&this.type===va,fe=S===va&&this.type!==va;for(let pe=0,P=L.length;pe<P;pe++){const te=L[pe],j=te.shadow;if(j===void 0){ct("WebGLShadowMap:",te,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;o.copy(j.mapSize);const ve=j.getFrameExtents();if(o.multiply(ve),c.copy(j.mapSize),(o.x>x||o.y>x)&&(o.x>x&&(c.x=Math.floor(x/ve.x),o.x=c.x*ve.x,j.mapSize.x=c.x),o.y>x&&(c.y=Math.floor(x/ve.y),o.y=c.y*ve.y,j.mapSize.y=c.y)),j.map===null||le===!0||fe===!0){const U=this.type!==va?{minFilter:ci,magFilter:ci}:{};j.map!==null&&j.map.dispose(),j.map=new Zr(o.x,o.y,U),j.map.texture.name=te.name+".shadowMap",j.camera.updateProjectionMatrix()}a.setRenderTarget(j.map),a.clear();const Se=j.getViewportCount();for(let U=0;U<Se;U++){const K=j.getViewport(U);f.set(c.x*K.x,c.y*K.y,c.x*K.z,c.y*K.w),ne.viewport(f),j.updateMatrices(te,U),r=j.getFrustum(),D(F,Z,j.camera,te,this.type)}j.isPointLightShadow!==!0&&this.type===va&&z(j,Z),j.needsUpdate=!1}S=this.type,b.needsUpdate=!1,a.setRenderTarget(C,w,k)};function z(L,F){const Z=e.update(A);v.defines.VSM_SAMPLES!==L.blurSamples&&(v.defines.VSM_SAMPLES=L.blurSamples,y.defines.VSM_SAMPLES=L.blurSamples,v.needsUpdate=!0,y.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Zr(o.x,o.y)),v.uniforms.shadow_pass.value=L.map.texture,v.uniforms.resolution.value=L.mapSize,v.uniforms.radius.value=L.radius,a.setRenderTarget(L.mapPass),a.clear(),a.renderBufferDirect(F,null,Z,v,A,null),y.uniforms.shadow_pass.value=L.mapPass.texture,y.uniforms.resolution.value=L.mapSize,y.uniforms.radius.value=L.radius,a.setRenderTarget(L.map),a.clear(),a.renderBufferDirect(F,null,Z,y,A,null)}function N(L,F,Z,C){let w=null;const k=Z.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(k!==void 0)w=k;else if(w=Z.isPointLight===!0?m:h,a.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0||F.alphaToCoverage===!0){const ne=w.uuid,le=F.uuid;let fe=p[ne];fe===void 0&&(fe={},p[ne]=fe);let pe=fe[le];pe===void 0&&(pe=w.clone(),fe[le]=pe,F.addEventListener("dispose",G)),w=pe}if(w.visible=F.visible,w.wireframe=F.wireframe,C===va?w.side=F.shadowSide!==null?F.shadowSide:F.side:w.side=F.shadowSide!==null?F.shadowSide:g[F.side],w.alphaMap=F.alphaMap,w.alphaTest=F.alphaToCoverage===!0?.5:F.alphaTest,w.map=F.map,w.clipShadows=F.clipShadows,w.clippingPlanes=F.clippingPlanes,w.clipIntersection=F.clipIntersection,w.displacementMap=F.displacementMap,w.displacementScale=F.displacementScale,w.displacementBias=F.displacementBias,w.wireframeLinewidth=F.wireframeLinewidth,w.linewidth=F.linewidth,Z.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const ne=a.properties.get(w);ne.light=Z}return w}function D(L,F,Z,C,w){if(L.visible===!1)return;if(L.layers.test(F.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&w===va)&&(!L.frustumCulled||r.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,L.matrixWorld);const le=e.update(L),fe=L.material;if(Array.isArray(fe)){const pe=le.groups;for(let P=0,te=pe.length;P<te;P++){const j=pe[P],ve=fe[j.materialIndex];if(ve&&ve.visible){const Se=N(L,ve,C,w);L.onBeforeShadow(a,L,F,Z,le,Se,j),a.renderBufferDirect(Z,null,le,Se,L,j),L.onAfterShadow(a,L,F,Z,le,Se,j)}}}else if(fe.visible){const pe=N(L,fe,C,w);L.onBeforeShadow(a,L,F,Z,le,pe,null),a.renderBufferDirect(Z,null,le,pe,L,null),L.onAfterShadow(a,L,F,Z,le,pe,null)}}const ne=L.children;for(let le=0,fe=ne.length;le<fe;le++)D(ne[le],F,Z,C,w)}function G(L){L.target.removeEventListener("dispose",G);for(const Z in p){const C=p[Z],w=L.target.uuid;w in C&&(C[w].dispose(),delete C[w])}}}const VA={[Kh]:Zh,[Qh]:ep,[Jh]:tp,[lo]:$h,[Zh]:Kh,[ep]:Qh,[tp]:Jh,[$h]:lo};function kA(a,e){function n(){let H=!1;const Le=new ln;let Ce=null;const De=new ln(0,0,0,0);return{setMask:function(Ee){Ce!==Ee&&!H&&(a.colorMask(Ee,Ee,Ee,Ee),Ce=Ee)},setLocked:function(Ee){H=Ee},setClear:function(Ee,_e,Be,st,Ht){Ht===!0&&(Ee*=st,_e*=st,Be*=st),Le.set(Ee,_e,Be,st),De.equals(Le)===!1&&(a.clearColor(Ee,_e,Be,st),De.copy(Le))},reset:function(){H=!1,Ce=null,De.set(-1,0,0,0)}}}function r(){let H=!1,Le=!1,Ce=null,De=null,Ee=null;return{setReversed:function(_e){if(Le!==_e){const Be=e.get("EXT_clip_control");_e?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),Le=_e;const st=Ee;Ee=null,this.setClear(st)}},getReversed:function(){return Le},setTest:function(_e){_e?ce(a.DEPTH_TEST):we(a.DEPTH_TEST)},setMask:function(_e){Ce!==_e&&!H&&(a.depthMask(_e),Ce=_e)},setFunc:function(_e){if(Le&&(_e=VA[_e]),De!==_e){switch(_e){case Kh:a.depthFunc(a.NEVER);break;case Zh:a.depthFunc(a.ALWAYS);break;case Qh:a.depthFunc(a.LESS);break;case lo:a.depthFunc(a.LEQUAL);break;case Jh:a.depthFunc(a.EQUAL);break;case $h:a.depthFunc(a.GEQUAL);break;case ep:a.depthFunc(a.GREATER);break;case tp:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}De=_e}},setLocked:function(_e){H=_e},setClear:function(_e){Ee!==_e&&(Le&&(_e=1-_e),a.clearDepth(_e),Ee=_e)},reset:function(){H=!1,Ce=null,De=null,Ee=null,Le=!1}}}function o(){let H=!1,Le=null,Ce=null,De=null,Ee=null,_e=null,Be=null,st=null,Ht=null;return{setTest:function(Ct){H||(Ct?ce(a.STENCIL_TEST):we(a.STENCIL_TEST))},setMask:function(Ct){Le!==Ct&&!H&&(a.stencilMask(Ct),Le=Ct)},setFunc:function(Ct,On,Zn){(Ce!==Ct||De!==On||Ee!==Zn)&&(a.stencilFunc(Ct,On,Zn),Ce=Ct,De=On,Ee=Zn)},setOp:function(Ct,On,Zn){(_e!==Ct||Be!==On||st!==Zn)&&(a.stencilOp(Ct,On,Zn),_e=Ct,Be=On,st=Zn)},setLocked:function(Ct){H=Ct},setClear:function(Ct){Ht!==Ct&&(a.clearStencil(Ct),Ht=Ct)},reset:function(){H=!1,Le=null,Ce=null,De=null,Ee=null,_e=null,Be=null,st=null,Ht=null}}}const c=new n,f=new r,h=new o,m=new WeakMap,p=new WeakMap;let x={},g={},v=new WeakMap,y=[],M=null,A=!1,b=null,S=null,z=null,N=null,D=null,G=null,L=null,F=new Pt(0,0,0),Z=0,C=!1,w=null,k=null,ne=null,le=null,fe=null;const pe=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,te=0;const j=a.getParameter(a.VERSION);j.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(j)[1]),P=te>=1):j.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),P=te>=2);let ve=null,Se={};const U=a.getParameter(a.SCISSOR_BOX),K=a.getParameter(a.VIEWPORT),ye=new ln().fromArray(U),Ae=new ln().fromArray(K);function Fe(H,Le,Ce,De){const Ee=new Uint8Array(4),_e=a.createTexture();a.bindTexture(H,_e),a.texParameteri(H,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(H,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let Be=0;Be<Ce;Be++)H===a.TEXTURE_3D||H===a.TEXTURE_2D_ARRAY?a.texImage3D(Le,0,a.RGBA,1,1,De,0,a.RGBA,a.UNSIGNED_BYTE,Ee):a.texImage2D(Le+Be,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,Ee);return _e}const ie={};ie[a.TEXTURE_2D]=Fe(a.TEXTURE_2D,a.TEXTURE_2D,1),ie[a.TEXTURE_CUBE_MAP]=Fe(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[a.TEXTURE_2D_ARRAY]=Fe(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),ie[a.TEXTURE_3D]=Fe(a.TEXTURE_3D,a.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),ce(a.DEPTH_TEST),f.setFunc(lo),xt(!1),vt(xv),ce(a.CULL_FACE),wt(Ma);function ce(H){x[H]!==!0&&(a.enable(H),x[H]=!0)}function we(H){x[H]!==!1&&(a.disable(H),x[H]=!1)}function He(H,Le){return g[H]!==Le?(a.bindFramebuffer(H,Le),g[H]=Le,H===a.DRAW_FRAMEBUFFER&&(g[a.FRAMEBUFFER]=Le),H===a.FRAMEBUFFER&&(g[a.DRAW_FRAMEBUFFER]=Le),!0):!1}function We(H,Le){let Ce=y,De=!1;if(H){Ce=v.get(Le),Ce===void 0&&(Ce=[],v.set(Le,Ce));const Ee=H.textures;if(Ce.length!==Ee.length||Ce[0]!==a.COLOR_ATTACHMENT0){for(let _e=0,Be=Ee.length;_e<Be;_e++)Ce[_e]=a.COLOR_ATTACHMENT0+_e;Ce.length=Ee.length,De=!0}}else Ce[0]!==a.BACK&&(Ce[0]=a.BACK,De=!0);De&&a.drawBuffers(Ce)}function ft(H){return M!==H?(a.useProgram(H),M=H,!0):!1}const an={[Vr]:a.FUNC_ADD,[U1]:a.FUNC_SUBTRACT,[N1]:a.FUNC_REVERSE_SUBTRACT};an[O1]=a.MIN,an[F1]=a.MAX;const mt={[P1]:a.ZERO,[z1]:a.ONE,[B1]:a.SRC_COLOR,[Yh]:a.SRC_ALPHA,[X1]:a.SRC_ALPHA_SATURATE,[V1]:a.DST_COLOR,[G1]:a.DST_ALPHA,[I1]:a.ONE_MINUS_SRC_COLOR,[jh]:a.ONE_MINUS_SRC_ALPHA,[k1]:a.ONE_MINUS_DST_COLOR,[H1]:a.ONE_MINUS_DST_ALPHA,[W1]:a.CONSTANT_COLOR,[q1]:a.ONE_MINUS_CONSTANT_COLOR,[Y1]:a.CONSTANT_ALPHA,[j1]:a.ONE_MINUS_CONSTANT_ALPHA};function wt(H,Le,Ce,De,Ee,_e,Be,st,Ht,Ct){if(H===Ma){A===!0&&(we(a.BLEND),A=!1);return}if(A===!1&&(ce(a.BLEND),A=!0),H!==L1){if(H!==b||Ct!==C){if((S!==Vr||D!==Vr)&&(a.blendEquation(a.FUNC_ADD),S=Vr,D=Vr),Ct)switch(H){case ro:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case gv:a.blendFunc(a.ONE,a.ONE);break;case vv:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case _v:a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE);break;default:nn("WebGLState: Invalid blending: ",H);break}else switch(H){case ro:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case gv:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE);break;case vv:nn("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _v:nn("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nn("WebGLState: Invalid blending: ",H);break}z=null,N=null,G=null,L=null,F.set(0,0,0),Z=0,b=H,C=Ct}return}Ee=Ee||Le,_e=_e||Ce,Be=Be||De,(Le!==S||Ee!==D)&&(a.blendEquationSeparate(an[Le],an[Ee]),S=Le,D=Ee),(Ce!==z||De!==N||_e!==G||Be!==L)&&(a.blendFuncSeparate(mt[Ce],mt[De],mt[_e],mt[Be]),z=Ce,N=De,G=_e,L=Be),(st.equals(F)===!1||Ht!==Z)&&(a.blendColor(st.r,st.g,st.b,Ht),F.copy(st),Z=Ht),b=H,C=!1}function I(H,Le){H.side===Sa?we(a.CULL_FACE):ce(a.CULL_FACE);let Ce=H.side===Kn;Le&&(Ce=!Ce),xt(Ce),H.blending===ro&&H.transparent===!1?wt(Ma):wt(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),f.setFunc(H.depthFunc),f.setTest(H.depthTest),f.setMask(H.depthWrite),c.setMask(H.colorWrite);const De=H.stencilWrite;h.setTest(De),De&&(h.setMask(H.stencilWriteMask),h.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),h.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ve(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ce(a.SAMPLE_ALPHA_TO_COVERAGE):we(a.SAMPLE_ALPHA_TO_COVERAGE)}function xt(H){w!==H&&(H?a.frontFace(a.CW):a.frontFace(a.CCW),w=H)}function vt(H){H!==w1?(ce(a.CULL_FACE),H!==k&&(H===xv?a.cullFace(a.BACK):H===C1?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):we(a.CULL_FACE),k=H}function Bt(H){H!==ne&&(P&&a.lineWidth(H),ne=H)}function Ve(H,Le,Ce){H?(ce(a.POLYGON_OFFSET_FILL),(le!==Le||fe!==Ce)&&(a.polygonOffset(Le,Ce),le=Le,fe=Ce)):we(a.POLYGON_OFFSET_FILL)}function qt(H){H?ce(a.SCISSOR_TEST):we(a.SCISSOR_TEST)}function Ze(H){H===void 0&&(H=a.TEXTURE0+pe-1),ve!==H&&(a.activeTexture(H),ve=H)}function ot(H,Le,Ce){Ce===void 0&&(ve===null?Ce=a.TEXTURE0+pe-1:Ce=ve);let De=Se[Ce];De===void 0&&(De={type:void 0,texture:void 0},Se[Ce]=De),(De.type!==H||De.texture!==Le)&&(ve!==Ce&&(a.activeTexture(Ce),ve=Ce),a.bindTexture(H,Le||ie[H]),De.type=H,De.texture=Le)}function O(){const H=Se[ve];H!==void 0&&H.type!==void 0&&(a.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function E(){try{a.compressedTexImage2D(...arguments)}catch(H){H("WebGLState:",H)}}function J(){try{a.compressedTexImage3D(...arguments)}catch(H){H("WebGLState:",H)}}function xe(){try{a.texSubImage2D(...arguments)}catch(H){H("WebGLState:",H)}}function be(){try{a.texSubImage3D(...arguments)}catch(H){H("WebGLState:",H)}}function ue(){try{a.compressedTexSubImage2D(...arguments)}catch(H){H("WebGLState:",H)}}function je(){try{a.compressedTexSubImage3D(...arguments)}catch(H){H("WebGLState:",H)}}function Ne(){try{a.texStorage2D(...arguments)}catch(H){H("WebGLState:",H)}}function et(){try{a.texStorage3D(...arguments)}catch(H){H("WebGLState:",H)}}function qe(){try{a.texImage2D(...arguments)}catch(H){H("WebGLState:",H)}}function Me(){try{a.texImage3D(...arguments)}catch(H){H("WebGLState:",H)}}function Te(H){ye.equals(H)===!1&&(a.scissor(H.x,H.y,H.z,H.w),ye.copy(H))}function Ke(H){Ae.equals(H)===!1&&(a.viewport(H.x,H.y,H.z,H.w),Ae.copy(H))}function ke(H,Le){let Ce=p.get(Le);Ce===void 0&&(Ce=new WeakMap,p.set(Le,Ce));let De=Ce.get(H);De===void 0&&(De=a.getUniformBlockIndex(Le,H.name),Ce.set(H,De))}function Pe(H,Le){const De=p.get(Le).get(H);m.get(Le)!==De&&(a.uniformBlockBinding(Le,De,H.__bindingPointIndex),m.set(Le,De))}function rt(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),f.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),x={},ve=null,Se={},g={},v=new WeakMap,y=[],M=null,A=!1,b=null,S=null,z=null,N=null,D=null,G=null,L=null,F=new Pt(0,0,0),Z=0,C=!1,w=null,k=null,ne=null,le=null,fe=null,ye.set(0,0,a.canvas.width,a.canvas.height),Ae.set(0,0,a.canvas.width,a.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:ce,disable:we,bindFramebuffer:He,drawBuffers:We,useProgram:ft,setBlending:wt,setMaterial:I,setFlipSided:xt,setCullFace:vt,setLineWidth:Bt,setPolygonOffset:Ve,setScissorTest:qt,activeTexture:Ze,bindTexture:ot,unbindTexture:O,compressedTexImage2D:E,compressedTexImage3D:J,texImage2D:qe,texImage3D:Me,updateUBOMapping:ke,uniformBlockBinding:Pe,texStorage2D:Ne,texStorage3D:et,texSubImage2D:xe,texSubImage3D:be,compressedTexSubImage2D:ue,compressedTexSubImage3D:je,scissor:Te,viewport:Ke,reset:rt}}function XA(a,e,n,r,o,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new zt,x=new WeakMap;let g;const v=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(O,E){return y?new OffscreenCanvas(O,E):zu("canvas")}function A(O,E,J){let xe=1;const be=ot(O);if((be.width>J||be.height>J)&&(xe=J/Math.max(be.width,be.height)),xe<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const ue=Math.floor(xe*be.width),je=Math.floor(xe*be.height);g===void 0&&(g=M(ue,je));const Ne=E?M(ue,je):g;return Ne.width=ue,Ne.height=je,Ne.getContext("2d").drawImage(O,0,0,ue,je),ct("WebGLRenderer: Texture has been resized from ("+be.width+"x"+be.height+") to ("+ue+"x"+je+")."),Ne}else return"data"in O&&ct("WebGLRenderer: Image in DataTexture is too big ("+be.width+"x"+be.height+")."),O;return O}function b(O){return O.generateMipmaps}function S(O){a.generateMipmap(O)}function z(O){return O.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?a.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function N(O,E,J,xe,be=!1){if(O!==null){if(a[O]!==void 0)return a[O];ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let ue=E;if(E===a.RED&&(J===a.FLOAT&&(ue=a.R32F),J===a.HALF_FLOAT&&(ue=a.R16F),J===a.UNSIGNED_BYTE&&(ue=a.R8)),E===a.RED_INTEGER&&(J===a.UNSIGNED_BYTE&&(ue=a.R8UI),J===a.UNSIGNED_SHORT&&(ue=a.R16UI),J===a.UNSIGNED_INT&&(ue=a.R32UI),J===a.BYTE&&(ue=a.R8I),J===a.SHORT&&(ue=a.R16I),J===a.INT&&(ue=a.R32I)),E===a.RG&&(J===a.FLOAT&&(ue=a.RG32F),J===a.HALF_FLOAT&&(ue=a.RG16F),J===a.UNSIGNED_BYTE&&(ue=a.RG8)),E===a.RG_INTEGER&&(J===a.UNSIGNED_BYTE&&(ue=a.RG8UI),J===a.UNSIGNED_SHORT&&(ue=a.RG16UI),J===a.UNSIGNED_INT&&(ue=a.RG32UI),J===a.BYTE&&(ue=a.RG8I),J===a.SHORT&&(ue=a.RG16I),J===a.INT&&(ue=a.RG32I)),E===a.RGB_INTEGER&&(J===a.UNSIGNED_BYTE&&(ue=a.RGB8UI),J===a.UNSIGNED_SHORT&&(ue=a.RGB16UI),J===a.UNSIGNED_INT&&(ue=a.RGB32UI),J===a.BYTE&&(ue=a.RGB8I),J===a.SHORT&&(ue=a.RGB16I),J===a.INT&&(ue=a.RGB32I)),E===a.RGBA_INTEGER&&(J===a.UNSIGNED_BYTE&&(ue=a.RGBA8UI),J===a.UNSIGNED_SHORT&&(ue=a.RGBA16UI),J===a.UNSIGNED_INT&&(ue=a.RGBA32UI),J===a.BYTE&&(ue=a.RGBA8I),J===a.SHORT&&(ue=a.RGBA16I),J===a.INT&&(ue=a.RGBA32I)),E===a.RGB&&(J===a.UNSIGNED_INT_5_9_9_9_REV&&(ue=a.RGB9_E5),J===a.UNSIGNED_INT_10F_11F_11F_REV&&(ue=a.R11F_G11F_B10F)),E===a.RGBA){const je=be?Fu:Nt.getTransfer(xe);J===a.FLOAT&&(ue=a.RGBA32F),J===a.HALF_FLOAT&&(ue=a.RGBA16F),J===a.UNSIGNED_BYTE&&(ue=je===Wt?a.SRGB8_ALPHA8:a.RGBA8),J===a.UNSIGNED_SHORT_4_4_4_4&&(ue=a.RGBA4),J===a.UNSIGNED_SHORT_5_5_5_1&&(ue=a.RGB5_A1)}return(ue===a.R16F||ue===a.R32F||ue===a.RG16F||ue===a.RG32F||ue===a.RGBA16F||ue===a.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function D(O,E){let J;return O?E===null||E===jr||E===Ol?J=a.DEPTH24_STENCIL8:E===ba?J=a.DEPTH32F_STENCIL8:E===Nl&&(J=a.DEPTH24_STENCIL8,ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===jr||E===Ol?J=a.DEPTH_COMPONENT24:E===ba?J=a.DEPTH_COMPONENT32F:E===Nl&&(J=a.DEPTH_COMPONENT16),J}function G(O,E){return b(O)===!0||O.isFramebufferTexture&&O.minFilter!==ci&&O.minFilter!==Mi?Math.log2(Math.max(E.width,E.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?E.mipmaps.length:1}function L(O){const E=O.target;E.removeEventListener("dispose",L),Z(E),E.isVideoTexture&&x.delete(E)}function F(O){const E=O.target;E.removeEventListener("dispose",F),w(E)}function Z(O){const E=r.get(O);if(E.__webglInit===void 0)return;const J=O.source,xe=v.get(J);if(xe){const be=xe[E.__cacheKey];be.usedTimes--,be.usedTimes===0&&C(O),Object.keys(xe).length===0&&v.delete(J)}r.remove(O)}function C(O){const E=r.get(O);a.deleteTexture(E.__webglTexture);const J=O.source,xe=v.get(J);delete xe[E.__cacheKey],f.memory.textures--}function w(O){const E=r.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),r.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let xe=0;xe<6;xe++){if(Array.isArray(E.__webglFramebuffer[xe]))for(let be=0;be<E.__webglFramebuffer[xe].length;be++)a.deleteFramebuffer(E.__webglFramebuffer[xe][be]);else a.deleteFramebuffer(E.__webglFramebuffer[xe]);E.__webglDepthbuffer&&a.deleteRenderbuffer(E.__webglDepthbuffer[xe])}else{if(Array.isArray(E.__webglFramebuffer))for(let xe=0;xe<E.__webglFramebuffer.length;xe++)a.deleteFramebuffer(E.__webglFramebuffer[xe]);else a.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&a.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&a.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let xe=0;xe<E.__webglColorRenderbuffer.length;xe++)E.__webglColorRenderbuffer[xe]&&a.deleteRenderbuffer(E.__webglColorRenderbuffer[xe]);E.__webglDepthRenderbuffer&&a.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const J=O.textures;for(let xe=0,be=J.length;xe<be;xe++){const ue=r.get(J[xe]);ue.__webglTexture&&(a.deleteTexture(ue.__webglTexture),f.memory.textures--),r.remove(J[xe])}r.remove(O)}let k=0;function ne(){k=0}function le(){const O=k;return O>=o.maxTextures&&ct("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+o.maxTextures),k+=1,O}function fe(O){const E=[];return E.push(O.wrapS),E.push(O.wrapT),E.push(O.wrapR||0),E.push(O.magFilter),E.push(O.minFilter),E.push(O.anisotropy),E.push(O.internalFormat),E.push(O.format),E.push(O.type),E.push(O.generateMipmaps),E.push(O.premultiplyAlpha),E.push(O.flipY),E.push(O.unpackAlignment),E.push(O.colorSpace),E.join()}function pe(O,E){const J=r.get(O);if(O.isVideoTexture&&qt(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&J.__version!==O.version){const xe=O.image;if(xe===null)ct("WebGLRenderer: Texture marked for update but no image data found.");else if(xe.complete===!1)ct("WebGLRenderer: Texture marked for update but image is incomplete");else{ie(J,O,E);return}}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);n.bindTexture(a.TEXTURE_2D,J.__webglTexture,a.TEXTURE0+E)}function P(O,E){const J=r.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){ie(J,O,E);return}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);n.bindTexture(a.TEXTURE_2D_ARRAY,J.__webglTexture,a.TEXTURE0+E)}function te(O,E){const J=r.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){ie(J,O,E);return}n.bindTexture(a.TEXTURE_3D,J.__webglTexture,a.TEXTURE0+E)}function j(O,E){const J=r.get(O);if(O.version>0&&J.__version!==O.version){ce(J,O,E);return}n.bindTexture(a.TEXTURE_CUBE_MAP,J.__webglTexture,a.TEXTURE0+E)}const ve={[ap]:a.REPEAT,[ya]:a.CLAMP_TO_EDGE,[rp]:a.MIRRORED_REPEAT},Se={[ci]:a.NEAREST,[aM]:a.NEAREST_MIPMAP_NEAREST,[iu]:a.NEAREST_MIPMAP_LINEAR,[Mi]:a.LINEAR,[ph]:a.LINEAR_MIPMAP_NEAREST,[Wr]:a.LINEAR_MIPMAP_LINEAR},U={[cM]:a.NEVER,[mM]:a.ALWAYS,[uM]:a.LESS,[Q_]:a.LEQUAL,[fM]:a.EQUAL,[pM]:a.GEQUAL,[dM]:a.GREATER,[hM]:a.NOTEQUAL};function K(O,E){if(E.type===ba&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Mi||E.magFilter===ph||E.magFilter===iu||E.magFilter===Wr||E.minFilter===Mi||E.minFilter===ph||E.minFilter===iu||E.minFilter===Wr)&&ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(O,a.TEXTURE_WRAP_S,ve[E.wrapS]),a.texParameteri(O,a.TEXTURE_WRAP_T,ve[E.wrapT]),(O===a.TEXTURE_3D||O===a.TEXTURE_2D_ARRAY)&&a.texParameteri(O,a.TEXTURE_WRAP_R,ve[E.wrapR]),a.texParameteri(O,a.TEXTURE_MAG_FILTER,Se[E.magFilter]),a.texParameteri(O,a.TEXTURE_MIN_FILTER,Se[E.minFilter]),E.compareFunction&&(a.texParameteri(O,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(O,a.TEXTURE_COMPARE_FUNC,U[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ci||E.minFilter!==iu&&E.minFilter!==Wr||E.type===ba&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||r.get(E).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");a.texParameterf(O,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,o.getMaxAnisotropy())),r.get(E).__currentAnisotropy=E.anisotropy}}}function ye(O,E){let J=!1;O.__webglInit===void 0&&(O.__webglInit=!0,E.addEventListener("dispose",L));const xe=E.source;let be=v.get(xe);be===void 0&&(be={},v.set(xe,be));const ue=fe(E);if(ue!==O.__cacheKey){be[ue]===void 0&&(be[ue]={texture:a.createTexture(),usedTimes:0},f.memory.textures++,J=!0),be[ue].usedTimes++;const je=be[O.__cacheKey];je!==void 0&&(be[O.__cacheKey].usedTimes--,je.usedTimes===0&&C(E)),O.__cacheKey=ue,O.__webglTexture=be[ue].texture}return J}function Ae(O,E,J){return Math.floor(Math.floor(O/J)/E)}function Fe(O,E,J,xe){const ue=O.updateRanges;if(ue.length===0)n.texSubImage2D(a.TEXTURE_2D,0,0,0,E.width,E.height,J,xe,E.data);else{ue.sort((Me,Te)=>Me.start-Te.start);let je=0;for(let Me=1;Me<ue.length;Me++){const Te=ue[je],Ke=ue[Me],ke=Te.start+Te.count,Pe=Ae(Ke.start,E.width,4),rt=Ae(Te.start,E.width,4);Ke.start<=ke+1&&Pe===rt&&Ae(Ke.start+Ke.count-1,E.width,4)===Pe?Te.count=Math.max(Te.count,Ke.start+Ke.count-Te.start):(++je,ue[je]=Ke)}ue.length=je+1;const Ne=a.getParameter(a.UNPACK_ROW_LENGTH),et=a.getParameter(a.UNPACK_SKIP_PIXELS),qe=a.getParameter(a.UNPACK_SKIP_ROWS);a.pixelStorei(a.UNPACK_ROW_LENGTH,E.width);for(let Me=0,Te=ue.length;Me<Te;Me++){const Ke=ue[Me],ke=Math.floor(Ke.start/4),Pe=Math.ceil(Ke.count/4),rt=ke%E.width,H=Math.floor(ke/E.width),Le=Pe,Ce=1;a.pixelStorei(a.UNPACK_SKIP_PIXELS,rt),a.pixelStorei(a.UNPACK_SKIP_ROWS,H),n.texSubImage2D(a.TEXTURE_2D,0,rt,H,Le,Ce,J,xe,E.data)}O.clearUpdateRanges(),a.pixelStorei(a.UNPACK_ROW_LENGTH,Ne),a.pixelStorei(a.UNPACK_SKIP_PIXELS,et),a.pixelStorei(a.UNPACK_SKIP_ROWS,qe)}}function ie(O,E,J){let xe=a.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(xe=a.TEXTURE_2D_ARRAY),E.isData3DTexture&&(xe=a.TEXTURE_3D);const be=ye(O,E),ue=E.source;n.bindTexture(xe,O.__webglTexture,a.TEXTURE0+J);const je=r.get(ue);if(ue.version!==je.__version||be===!0){n.activeTexture(a.TEXTURE0+J);const Ne=Nt.getPrimaries(Nt.workingColorSpace),et=E.colorSpace===lr?null:Nt.getPrimaries(E.colorSpace),qe=E.colorSpace===lr||Ne===et?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,E.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,E.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let Me=A(E.image,!1,o.maxTextureSize);Me=Ze(E,Me);const Te=c.convert(E.format,E.colorSpace),Ke=c.convert(E.type);let ke=N(E.internalFormat,Te,Ke,E.colorSpace,E.isVideoTexture);K(xe,E);let Pe;const rt=E.mipmaps,H=E.isVideoTexture!==!0,Le=je.__version===void 0||be===!0,Ce=ue.dataReady,De=G(E,Me);if(E.isDepthTexture)ke=D(E.format===Pl,E.type),Le&&(H?n.texStorage2D(a.TEXTURE_2D,1,ke,Me.width,Me.height):n.texImage2D(a.TEXTURE_2D,0,ke,Me.width,Me.height,0,Te,Ke,null));else if(E.isDataTexture)if(rt.length>0){H&&Le&&n.texStorage2D(a.TEXTURE_2D,De,ke,rt[0].width,rt[0].height);for(let Ee=0,_e=rt.length;Ee<_e;Ee++)Pe=rt[Ee],H?Ce&&n.texSubImage2D(a.TEXTURE_2D,Ee,0,0,Pe.width,Pe.height,Te,Ke,Pe.data):n.texImage2D(a.TEXTURE_2D,Ee,ke,Pe.width,Pe.height,0,Te,Ke,Pe.data);E.generateMipmaps=!1}else H?(Le&&n.texStorage2D(a.TEXTURE_2D,De,ke,Me.width,Me.height),Ce&&Fe(E,Me,Te,Ke)):n.texImage2D(a.TEXTURE_2D,0,ke,Me.width,Me.height,0,Te,Ke,Me.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){H&&Le&&n.texStorage3D(a.TEXTURE_2D_ARRAY,De,ke,rt[0].width,rt[0].height,Me.depth);for(let Ee=0,_e=rt.length;Ee<_e;Ee++)if(Pe=rt[Ee],E.format!==Ni)if(Te!==null)if(H){if(Ce)if(E.layerUpdates.size>0){const Be=Xv(Pe.width,Pe.height,E.format,E.type);for(const st of E.layerUpdates){const Ht=Pe.data.subarray(st*Be/Pe.data.BYTES_PER_ELEMENT,(st+1)*Be/Pe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,Ee,0,0,st,Pe.width,Pe.height,1,Te,Ht)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,Ee,0,0,0,Pe.width,Pe.height,Me.depth,Te,Pe.data)}else n.compressedTexImage3D(a.TEXTURE_2D_ARRAY,Ee,ke,Pe.width,Pe.height,Me.depth,0,Pe.data,0,0);else ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else H?Ce&&n.texSubImage3D(a.TEXTURE_2D_ARRAY,Ee,0,0,0,Pe.width,Pe.height,Me.depth,Te,Ke,Pe.data):n.texImage3D(a.TEXTURE_2D_ARRAY,Ee,ke,Pe.width,Pe.height,Me.depth,0,Te,Ke,Pe.data)}else{H&&Le&&n.texStorage2D(a.TEXTURE_2D,De,ke,rt[0].width,rt[0].height);for(let Ee=0,_e=rt.length;Ee<_e;Ee++)Pe=rt[Ee],E.format!==Ni?Te!==null?H?Ce&&n.compressedTexSubImage2D(a.TEXTURE_2D,Ee,0,0,Pe.width,Pe.height,Te,Pe.data):n.compressedTexImage2D(a.TEXTURE_2D,Ee,ke,Pe.width,Pe.height,0,Pe.data):ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):H?Ce&&n.texSubImage2D(a.TEXTURE_2D,Ee,0,0,Pe.width,Pe.height,Te,Ke,Pe.data):n.texImage2D(a.TEXTURE_2D,Ee,ke,Pe.width,Pe.height,0,Te,Ke,Pe.data)}else if(E.isDataArrayTexture)if(H){if(Le&&n.texStorage3D(a.TEXTURE_2D_ARRAY,De,ke,Me.width,Me.height,Me.depth),Ce)if(E.layerUpdates.size>0){const Ee=Xv(Me.width,Me.height,E.format,E.type);for(const _e of E.layerUpdates){const Be=Me.data.subarray(_e*Ee/Me.data.BYTES_PER_ELEMENT,(_e+1)*Ee/Me.data.BYTES_PER_ELEMENT);n.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,_e,Me.width,Me.height,1,Te,Ke,Be)}E.clearLayerUpdates()}else n.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,Me.width,Me.height,Me.depth,Te,Ke,Me.data)}else n.texImage3D(a.TEXTURE_2D_ARRAY,0,ke,Me.width,Me.height,Me.depth,0,Te,Ke,Me.data);else if(E.isData3DTexture)H?(Le&&n.texStorage3D(a.TEXTURE_3D,De,ke,Me.width,Me.height,Me.depth),Ce&&n.texSubImage3D(a.TEXTURE_3D,0,0,0,0,Me.width,Me.height,Me.depth,Te,Ke,Me.data)):n.texImage3D(a.TEXTURE_3D,0,ke,Me.width,Me.height,Me.depth,0,Te,Ke,Me.data);else if(E.isFramebufferTexture){if(Le)if(H)n.texStorage2D(a.TEXTURE_2D,De,ke,Me.width,Me.height);else{let Ee=Me.width,_e=Me.height;for(let Be=0;Be<De;Be++)n.texImage2D(a.TEXTURE_2D,Be,ke,Ee,_e,0,Te,Ke,null),Ee>>=1,_e>>=1}}else if(rt.length>0){if(H&&Le){const Ee=ot(rt[0]);n.texStorage2D(a.TEXTURE_2D,De,ke,Ee.width,Ee.height)}for(let Ee=0,_e=rt.length;Ee<_e;Ee++)Pe=rt[Ee],H?Ce&&n.texSubImage2D(a.TEXTURE_2D,Ee,0,0,Te,Ke,Pe):n.texImage2D(a.TEXTURE_2D,Ee,ke,Te,Ke,Pe);E.generateMipmaps=!1}else if(H){if(Le){const Ee=ot(Me);n.texStorage2D(a.TEXTURE_2D,De,ke,Ee.width,Ee.height)}Ce&&n.texSubImage2D(a.TEXTURE_2D,0,0,0,Te,Ke,Me)}else n.texImage2D(a.TEXTURE_2D,0,ke,Te,Ke,Me);b(E)&&S(xe),je.__version=ue.version,E.onUpdate&&E.onUpdate(E)}O.__version=E.version}function ce(O,E,J){if(E.image.length!==6)return;const xe=ye(O,E),be=E.source;n.bindTexture(a.TEXTURE_CUBE_MAP,O.__webglTexture,a.TEXTURE0+J);const ue=r.get(be);if(be.version!==ue.__version||xe===!0){n.activeTexture(a.TEXTURE0+J);const je=Nt.getPrimaries(Nt.workingColorSpace),Ne=E.colorSpace===lr?null:Nt.getPrimaries(E.colorSpace),et=E.colorSpace===lr||je===Ne?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,E.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,E.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);const qe=E.isCompressedTexture||E.image[0].isCompressedTexture,Me=E.image[0]&&E.image[0].isDataTexture,Te=[];for(let _e=0;_e<6;_e++)!qe&&!Me?Te[_e]=A(E.image[_e],!0,o.maxCubemapSize):Te[_e]=Me?E.image[_e].image:E.image[_e],Te[_e]=Ze(E,Te[_e]);const Ke=Te[0],ke=c.convert(E.format,E.colorSpace),Pe=c.convert(E.type),rt=N(E.internalFormat,ke,Pe,E.colorSpace),H=E.isVideoTexture!==!0,Le=ue.__version===void 0||xe===!0,Ce=be.dataReady;let De=G(E,Ke);K(a.TEXTURE_CUBE_MAP,E);let Ee;if(qe){H&&Le&&n.texStorage2D(a.TEXTURE_CUBE_MAP,De,rt,Ke.width,Ke.height);for(let _e=0;_e<6;_e++){Ee=Te[_e].mipmaps;for(let Be=0;Be<Ee.length;Be++){const st=Ee[Be];E.format!==Ni?ke!==null?H?Ce&&n.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Be,0,0,st.width,st.height,ke,st.data):n.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Be,rt,st.width,st.height,0,st.data):ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?Ce&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Be,0,0,st.width,st.height,ke,Pe,st.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Be,rt,st.width,st.height,0,ke,Pe,st.data)}}}else{if(Ee=E.mipmaps,H&&Le){Ee.length>0&&De++;const _e=ot(Te[0]);n.texStorage2D(a.TEXTURE_CUBE_MAP,De,rt,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(Me){H?Ce&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,Te[_e].width,Te[_e].height,ke,Pe,Te[_e].data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,rt,Te[_e].width,Te[_e].height,0,ke,Pe,Te[_e].data);for(let Be=0;Be<Ee.length;Be++){const Ht=Ee[Be].image[_e].image;H?Ce&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Be+1,0,0,Ht.width,Ht.height,ke,Pe,Ht.data):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Be+1,rt,Ht.width,Ht.height,0,ke,Pe,Ht.data)}}else{H?Ce&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,ke,Pe,Te[_e]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,rt,ke,Pe,Te[_e]);for(let Be=0;Be<Ee.length;Be++){const st=Ee[Be];H?Ce&&n.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Be+1,0,0,ke,Pe,st.image[_e]):n.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+_e,Be+1,rt,ke,Pe,st.image[_e])}}}b(E)&&S(a.TEXTURE_CUBE_MAP),ue.__version=be.version,E.onUpdate&&E.onUpdate(E)}O.__version=E.version}function we(O,E,J,xe,be,ue){const je=c.convert(J.format,J.colorSpace),Ne=c.convert(J.type),et=N(J.internalFormat,je,Ne,J.colorSpace),qe=r.get(E),Me=r.get(J);if(Me.__renderTarget=E,!qe.__hasExternalTextures){const Te=Math.max(1,E.width>>ue),Ke=Math.max(1,E.height>>ue);be===a.TEXTURE_3D||be===a.TEXTURE_2D_ARRAY?n.texImage3D(be,ue,et,Te,Ke,E.depth,0,je,Ne,null):n.texImage2D(be,ue,et,Te,Ke,0,je,Ne,null)}n.bindFramebuffer(a.FRAMEBUFFER,O),Ve(E)?h.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,xe,be,Me.__webglTexture,0,Bt(E)):(be===a.TEXTURE_2D||be>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&be<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,xe,be,Me.__webglTexture,ue),n.bindFramebuffer(a.FRAMEBUFFER,null)}function He(O,E,J){if(a.bindRenderbuffer(a.RENDERBUFFER,O),E.depthBuffer){const xe=E.depthTexture,be=xe&&xe.isDepthTexture?xe.type:null,ue=D(E.stencilBuffer,be),je=E.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,Ne=Bt(E);Ve(E)?h.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,Ne,ue,E.width,E.height):J?a.renderbufferStorageMultisample(a.RENDERBUFFER,Ne,ue,E.width,E.height):a.renderbufferStorage(a.RENDERBUFFER,ue,E.width,E.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,je,a.RENDERBUFFER,O)}else{const xe=E.textures;for(let be=0;be<xe.length;be++){const ue=xe[be],je=c.convert(ue.format,ue.colorSpace),Ne=c.convert(ue.type),et=N(ue.internalFormat,je,Ne,ue.colorSpace),qe=Bt(E);J&&Ve(E)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,qe,et,E.width,E.height):Ve(E)?h.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,qe,et,E.width,E.height):a.renderbufferStorage(a.RENDERBUFFER,et,E.width,E.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function We(O,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(a.FRAMEBUFFER,O),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const xe=r.get(E.depthTexture);xe.__renderTarget=E,(!xe.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),pe(E.depthTexture,0);const be=xe.__webglTexture,ue=Bt(E);if(E.depthTexture.format===Fl)Ve(E)?h.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,be,0,ue):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,be,0);else if(E.depthTexture.format===Pl)Ve(E)?h.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,be,0,ue):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,be,0);else throw new Error("Unknown depthTexture format")}function ft(O){const E=r.get(O),J=O.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==O.depthTexture){const xe=O.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),xe){const be=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,xe.removeEventListener("dispose",be)};xe.addEventListener("dispose",be),E.__depthDisposeCallback=be}E.__boundDepthTexture=xe}if(O.depthTexture&&!E.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");const xe=O.texture.mipmaps;xe&&xe.length>0?We(E.__webglFramebuffer[0],O):We(E.__webglFramebuffer,O)}else if(J){E.__webglDepthbuffer=[];for(let xe=0;xe<6;xe++)if(n.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer[xe]),E.__webglDepthbuffer[xe]===void 0)E.__webglDepthbuffer[xe]=a.createRenderbuffer(),He(E.__webglDepthbuffer[xe],O,!1);else{const be=O.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,ue=E.__webglDepthbuffer[xe];a.bindRenderbuffer(a.RENDERBUFFER,ue),a.framebufferRenderbuffer(a.FRAMEBUFFER,be,a.RENDERBUFFER,ue)}}else{const xe=O.texture.mipmaps;if(xe&&xe.length>0?n.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(a.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=a.createRenderbuffer(),He(E.__webglDepthbuffer,O,!1);else{const be=O.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,ue=E.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,ue),a.framebufferRenderbuffer(a.FRAMEBUFFER,be,a.RENDERBUFFER,ue)}}n.bindFramebuffer(a.FRAMEBUFFER,null)}function an(O,E,J){const xe=r.get(O);E!==void 0&&we(xe.__webglFramebuffer,O,O.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),J!==void 0&&ft(O)}function mt(O){const E=O.texture,J=r.get(O),xe=r.get(E);O.addEventListener("dispose",F);const be=O.textures,ue=O.isWebGLCubeRenderTarget===!0,je=be.length>1;if(je||(xe.__webglTexture===void 0&&(xe.__webglTexture=a.createTexture()),xe.__version=E.version,f.memory.textures++),ue){J.__webglFramebuffer=[];for(let Ne=0;Ne<6;Ne++)if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer[Ne]=[];for(let et=0;et<E.mipmaps.length;et++)J.__webglFramebuffer[Ne][et]=a.createFramebuffer()}else J.__webglFramebuffer[Ne]=a.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){J.__webglFramebuffer=[];for(let Ne=0;Ne<E.mipmaps.length;Ne++)J.__webglFramebuffer[Ne]=a.createFramebuffer()}else J.__webglFramebuffer=a.createFramebuffer();if(je)for(let Ne=0,et=be.length;Ne<et;Ne++){const qe=r.get(be[Ne]);qe.__webglTexture===void 0&&(qe.__webglTexture=a.createTexture(),f.memory.textures++)}if(O.samples>0&&Ve(O)===!1){J.__webglMultisampledFramebuffer=a.createFramebuffer(),J.__webglColorRenderbuffer=[],n.bindFramebuffer(a.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Ne=0;Ne<be.length;Ne++){const et=be[Ne];J.__webglColorRenderbuffer[Ne]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,J.__webglColorRenderbuffer[Ne]);const qe=c.convert(et.format,et.colorSpace),Me=c.convert(et.type),Te=N(et.internalFormat,qe,Me,et.colorSpace,O.isXRRenderTarget===!0),Ke=Bt(O);a.renderbufferStorageMultisample(a.RENDERBUFFER,Ke,Te,O.width,O.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Ne,a.RENDERBUFFER,J.__webglColorRenderbuffer[Ne])}a.bindRenderbuffer(a.RENDERBUFFER,null),O.depthBuffer&&(J.__webglDepthRenderbuffer=a.createRenderbuffer(),He(J.__webglDepthRenderbuffer,O,!0)),n.bindFramebuffer(a.FRAMEBUFFER,null)}}if(ue){n.bindTexture(a.TEXTURE_CUBE_MAP,xe.__webglTexture),K(a.TEXTURE_CUBE_MAP,E);for(let Ne=0;Ne<6;Ne++)if(E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)we(J.__webglFramebuffer[Ne][et],O,E,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,et);else we(J.__webglFramebuffer[Ne],O,E,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,0);b(E)&&S(a.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(je){for(let Ne=0,et=be.length;Ne<et;Ne++){const qe=be[Ne],Me=r.get(qe);let Te=a.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Te=O.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),n.bindTexture(Te,Me.__webglTexture),K(Te,qe),we(J.__webglFramebuffer,O,qe,a.COLOR_ATTACHMENT0+Ne,Te,0),b(qe)&&S(Te)}n.unbindTexture()}else{let Ne=a.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Ne=O.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),n.bindTexture(Ne,xe.__webglTexture),K(Ne,E),E.mipmaps&&E.mipmaps.length>0)for(let et=0;et<E.mipmaps.length;et++)we(J.__webglFramebuffer[et],O,E,a.COLOR_ATTACHMENT0,Ne,et);else we(J.__webglFramebuffer,O,E,a.COLOR_ATTACHMENT0,Ne,0);b(E)&&S(Ne),n.unbindTexture()}O.depthBuffer&&ft(O)}function wt(O){const E=O.textures;for(let J=0,xe=E.length;J<xe;J++){const be=E[J];if(b(be)){const ue=z(O),je=r.get(be).__webglTexture;n.bindTexture(ue,je),S(ue),n.unbindTexture()}}}const I=[],xt=[];function vt(O){if(O.samples>0){if(Ve(O)===!1){const E=O.textures,J=O.width,xe=O.height;let be=a.COLOR_BUFFER_BIT;const ue=O.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,je=r.get(O),Ne=E.length>1;if(Ne)for(let qe=0;qe<E.length;qe++)n.bindFramebuffer(a.FRAMEBUFFER,je.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+qe,a.RENDERBUFFER,null),n.bindFramebuffer(a.FRAMEBUFFER,je.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+qe,a.TEXTURE_2D,null,0);n.bindFramebuffer(a.READ_FRAMEBUFFER,je.__webglMultisampledFramebuffer);const et=O.texture.mipmaps;et&&et.length>0?n.bindFramebuffer(a.DRAW_FRAMEBUFFER,je.__webglFramebuffer[0]):n.bindFramebuffer(a.DRAW_FRAMEBUFFER,je.__webglFramebuffer);for(let qe=0;qe<E.length;qe++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(be|=a.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(be|=a.STENCIL_BUFFER_BIT)),Ne){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,je.__webglColorRenderbuffer[qe]);const Me=r.get(E[qe]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,Me,0)}a.blitFramebuffer(0,0,J,xe,0,0,J,xe,be,a.NEAREST),m===!0&&(I.length=0,xt.length=0,I.push(a.COLOR_ATTACHMENT0+qe),O.depthBuffer&&O.resolveDepthBuffer===!1&&(I.push(ue),xt.push(ue),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,xt)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,I))}if(n.bindFramebuffer(a.READ_FRAMEBUFFER,null),n.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),Ne)for(let qe=0;qe<E.length;qe++){n.bindFramebuffer(a.FRAMEBUFFER,je.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+qe,a.RENDERBUFFER,je.__webglColorRenderbuffer[qe]);const Me=r.get(E[qe]).__webglTexture;n.bindFramebuffer(a.FRAMEBUFFER,je.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+qe,a.TEXTURE_2D,Me,0)}n.bindFramebuffer(a.DRAW_FRAMEBUFFER,je.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&m){const E=O.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[E])}}}function Bt(O){return Math.min(o.maxSamples,O.samples)}function Ve(O){const E=r.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function qt(O){const E=f.render.frame;x.get(O)!==E&&(x.set(O,E),O.update())}function Ze(O,E){const J=O.colorSpace,xe=O.format,be=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||J!==fo&&J!==lr&&(Nt.getTransfer(J)===Wt?(xe!==Ni||be!==Ra)&&ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nn("WebGLTextures: Unsupported texture color space:",J)),E}function ot(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(p.width=O.naturalWidth||O.width,p.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(p.width=O.displayWidth,p.height=O.displayHeight):(p.width=O.width,p.height=O.height),p}this.allocateTextureUnit=le,this.resetTextureUnits=ne,this.setTexture2D=pe,this.setTexture2DArray=P,this.setTexture3D=te,this.setTextureCube=j,this.rebindTextures=an,this.setupRenderTarget=mt,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=ft,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Ve}function WA(a,e){function n(r,o=lr){let c;const f=Nt.getTransfer(o);if(r===Ra)return a.UNSIGNED_BYTE;if(r===$p)return a.UNSIGNED_SHORT_4_4_4_4;if(r===em)return a.UNSIGNED_SHORT_5_5_5_1;if(r===q_)return a.UNSIGNED_INT_5_9_9_9_REV;if(r===Y_)return a.UNSIGNED_INT_10F_11F_11F_REV;if(r===X_)return a.BYTE;if(r===W_)return a.SHORT;if(r===Nl)return a.UNSIGNED_SHORT;if(r===Jp)return a.INT;if(r===jr)return a.UNSIGNED_INT;if(r===ba)return a.FLOAT;if(r===go)return a.HALF_FLOAT;if(r===j_)return a.ALPHA;if(r===K_)return a.RGB;if(r===Ni)return a.RGBA;if(r===Fl)return a.DEPTH_COMPONENT;if(r===Pl)return a.DEPTH_STENCIL;if(r===Z_)return a.RED;if(r===tm)return a.RED_INTEGER;if(r===nm)return a.RG;if(r===im)return a.RG_INTEGER;if(r===am)return a.RGBA_INTEGER;if(r===Au||r===Ru||r===wu||r===Cu)if(f===Wt)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===Au)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ru)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===wu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Cu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===Au)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ru)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===wu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Cu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===sp||r===op||r===lp||r===cp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===sp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===op)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===lp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===cp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===up||r===fp||r===dp)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(r===up||r===fp)return f===Wt?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===dp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===hp||r===pp||r===mp||r===xp||r===gp||r===vp||r===_p||r===Sp||r===yp||r===bp||r===Mp||r===Ep||r===Tp||r===Ap)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(r===hp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===pp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===mp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===xp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===gp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===vp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===_p)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Sp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===yp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===bp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Mp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ep)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Tp)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ap)return f===Wt?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Rp||r===wp||r===Cp)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(r===Rp)return f===Wt?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===wp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Cp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Dp||r===Lp||r===Up||r===Np)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(r===Dp)return c.COMPRESSED_RED_RGTC1_EXT;if(r===Lp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Up)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Np)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ol?a.UNSIGNED_INT_24_8:a[r]!==void 0?a[r]:null}return{convert:n}}const qA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,YA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class jA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const r=new cS(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,r=new Ca({vertexShader:qA,fragmentShader:YA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Wi(new po(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class KA extends vo{constructor(e,n){super();const r=this;let o=null,c=1,f=null,h="local-floor",m=1,p=null,x=null,g=null,v=null,y=null,M=null;const A=typeof XRWebGLBinding<"u",b=new jA,S={},z=n.getContextAttributes();let N=null,D=null;const G=[],L=[],F=new zt;let Z=null;const C=new bi;C.viewport=new ln;const w=new bi;w.viewport=new ln;const k=[C,w],ne=new hE;let le=null,fe=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let ce=G[ie];return ce===void 0&&(ce=new Fh,G[ie]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(ie){let ce=G[ie];return ce===void 0&&(ce=new Fh,G[ie]=ce),ce.getGripSpace()},this.getHand=function(ie){let ce=G[ie];return ce===void 0&&(ce=new Fh,G[ie]=ce),ce.getHandSpace()};function pe(ie){const ce=L.indexOf(ie.inputSource);if(ce===-1)return;const we=G[ce];we!==void 0&&(we.update(ie.inputSource,ie.frame,p||f),we.dispatchEvent({type:ie.type,data:ie.inputSource}))}function P(){o.removeEventListener("select",pe),o.removeEventListener("selectstart",pe),o.removeEventListener("selectend",pe),o.removeEventListener("squeeze",pe),o.removeEventListener("squeezestart",pe),o.removeEventListener("squeezeend",pe),o.removeEventListener("end",P),o.removeEventListener("inputsourceschange",te);for(let ie=0;ie<G.length;ie++){const ce=L[ie];ce!==null&&(L[ie]=null,G[ie].disconnect(ce))}le=null,fe=null,b.reset();for(const ie in S)delete S[ie];e.setRenderTarget(N),y=null,v=null,g=null,o=null,D=null,Fe.stop(),r.isPresenting=!1,e.setPixelRatio(Z),e.setSize(F.width,F.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){c=ie,r.isPresenting===!0&&ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){h=ie,r.isPresenting===!0&&ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(ie){p=ie},this.getBaseLayer=function(){return v!==null?v:y},this.getBinding=function(){return g===null&&A&&(g=new XRWebGLBinding(o,n)),g},this.getFrame=function(){return M},this.getSession=function(){return o},this.setSession=async function(ie){if(o=ie,o!==null){if(N=e.getRenderTarget(),o.addEventListener("select",pe),o.addEventListener("selectstart",pe),o.addEventListener("selectend",pe),o.addEventListener("squeeze",pe),o.addEventListener("squeezestart",pe),o.addEventListener("squeezeend",pe),o.addEventListener("end",P),o.addEventListener("inputsourceschange",te),z.xrCompatible!==!0&&await n.makeXRCompatible(),Z=e.getPixelRatio(),e.getSize(F),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,He=null,We=null;z.depth&&(We=z.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,we=z.stencil?Pl:Fl,He=z.stencil?Ol:jr);const ft={colorFormat:n.RGBA8,depthFormat:We,scaleFactor:c};g=this.getBinding(),v=g.createProjectionLayer(ft),o.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),D=new Zr(v.textureWidth,v.textureHeight,{format:Ni,type:Ra,depthTexture:new lS(v.textureWidth,v.textureHeight,He,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:z.stencil,colorSpace:e.outputColorSpace,samples:z.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}else{const we={antialias:z.antialias,alpha:!0,depth:z.depth,stencil:z.stencil,framebufferScaleFactor:c};y=new XRWebGLLayer(o,n,we),o.updateRenderState({baseLayer:y}),e.setPixelRatio(1),e.setSize(y.framebufferWidth,y.framebufferHeight,!1),D=new Zr(y.framebufferWidth,y.framebufferHeight,{format:Ni,type:Ra,colorSpace:e.outputColorSpace,stencilBuffer:z.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await o.requestReferenceSpace(h),Fe.setContext(o),Fe.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(o!==null)return o.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function te(ie){for(let ce=0;ce<ie.removed.length;ce++){const we=ie.removed[ce],He=L.indexOf(we);He>=0&&(L[He]=null,G[He].disconnect(we))}for(let ce=0;ce<ie.added.length;ce++){const we=ie.added[ce];let He=L.indexOf(we);if(He===-1){for(let ft=0;ft<G.length;ft++)if(ft>=L.length){L.push(we),He=ft;break}else if(L[ft]===null){L[ft]=we,He=ft;break}if(He===-1)break}const We=G[He];We&&We.connect(we)}}const j=new se,ve=new se;function Se(ie,ce,we){j.setFromMatrixPosition(ce.matrixWorld),ve.setFromMatrixPosition(we.matrixWorld);const He=j.distanceTo(ve),We=ce.projectionMatrix.elements,ft=we.projectionMatrix.elements,an=We[14]/(We[10]-1),mt=We[14]/(We[10]+1),wt=(We[9]+1)/We[5],I=(We[9]-1)/We[5],xt=(We[8]-1)/We[0],vt=(ft[8]+1)/ft[0],Bt=an*xt,Ve=an*vt,qt=He/(-xt+vt),Ze=qt*-xt;if(ce.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(Ze),ie.translateZ(qt),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),We[10]===-1)ie.projectionMatrix.copy(ce.projectionMatrix),ie.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const ot=an+qt,O=mt+qt,E=Bt-Ze,J=Ve+(He-Ze),xe=wt*mt/O*ot,be=I*mt/O*ot;ie.projectionMatrix.makePerspective(E,J,xe,be,ot,O),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function U(ie,ce){ce===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(ce.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(o===null)return;let ce=ie.near,we=ie.far;b.texture!==null&&(b.depthNear>0&&(ce=b.depthNear),b.depthFar>0&&(we=b.depthFar)),ne.near=w.near=C.near=ce,ne.far=w.far=C.far=we,(le!==ne.near||fe!==ne.far)&&(o.updateRenderState({depthNear:ne.near,depthFar:ne.far}),le=ne.near,fe=ne.far),ne.layers.mask=ie.layers.mask|6,C.layers.mask=ne.layers.mask&3,w.layers.mask=ne.layers.mask&5;const He=ie.parent,We=ne.cameras;U(ne,He);for(let ft=0;ft<We.length;ft++)U(We[ft],He);We.length===2?Se(ne,C,w):ne.projectionMatrix.copy(C.projectionMatrix),K(ie,ne,He)};function K(ie,ce,we){we===null?ie.matrix.copy(ce.matrixWorld):(ie.matrix.copy(we.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(ce.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(ce.projectionMatrix),ie.projectionMatrixInverse.copy(ce.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Bl*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return ne},this.getFoveation=function(){if(!(v===null&&y===null))return m},this.setFoveation=function(ie){m=ie,v!==null&&(v.fixedFoveation=ie),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=ie)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(ne)},this.getCameraTexture=function(ie){return S[ie]};let ye=null;function Ae(ie,ce){if(x=ce.getViewerPose(p||f),M=ce,x!==null){const we=x.views;y!==null&&(e.setRenderTargetFramebuffer(D,y.framebuffer),e.setRenderTarget(D));let He=!1;we.length!==ne.cameras.length&&(ne.cameras.length=0,He=!0);for(let mt=0;mt<we.length;mt++){const wt=we[mt];let I=null;if(y!==null)I=y.getViewport(wt);else{const vt=g.getViewSubImage(v,wt);I=vt.viewport,mt===0&&(e.setRenderTargetTextures(D,vt.colorTexture,vt.depthStencilTexture),e.setRenderTarget(D))}let xt=k[mt];xt===void 0&&(xt=new bi,xt.layers.enable(mt),xt.viewport=new ln,k[mt]=xt),xt.matrix.fromArray(wt.transform.matrix),xt.matrix.decompose(xt.position,xt.quaternion,xt.scale),xt.projectionMatrix.fromArray(wt.projectionMatrix),xt.projectionMatrixInverse.copy(xt.projectionMatrix).invert(),xt.viewport.set(I.x,I.y,I.width,I.height),mt===0&&(ne.matrix.copy(xt.matrix),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale)),He===!0&&ne.cameras.push(xt)}const We=o.enabledFeatures;if(We&&We.includes("depth-sensing")&&o.depthUsage=="gpu-optimized"&&A){g=r.getBinding();const mt=g.getDepthInformation(we[0]);mt&&mt.isValid&&mt.texture&&b.init(mt,o.renderState)}if(We&&We.includes("camera-access")&&A){e.state.unbindTexture(),g=r.getBinding();for(let mt=0;mt<we.length;mt++){const wt=we[mt].camera;if(wt){let I=S[wt];I||(I=new cS,S[wt]=I);const xt=g.getCameraImage(wt);I.sourceTexture=xt}}}}for(let we=0;we<G.length;we++){const He=L[we],We=G[we];He!==null&&We!==void 0&&We.update(He,ce,p||f)}ye&&ye(ie,ce),ce.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:ce}),M=null}const Fe=new uS;Fe.setAnimationLoop(Ae),this.setAnimationLoop=function(ie){ye=ie},this.dispose=function(){}}}const Pr=new wa,ZA=new cn;function QA(a,e){function n(b,S){b.matrixAutoUpdate===!0&&b.updateMatrix(),S.value.copy(b.matrix)}function r(b,S){S.color.getRGB(b.fogColor.value,aS(a)),S.isFog?(b.fogNear.value=S.near,b.fogFar.value=S.far):S.isFogExp2&&(b.fogDensity.value=S.density)}function o(b,S,z,N,D){S.isMeshBasicMaterial||S.isMeshLambertMaterial?c(b,S):S.isMeshToonMaterial?(c(b,S),g(b,S)):S.isMeshPhongMaterial?(c(b,S),x(b,S)):S.isMeshStandardMaterial?(c(b,S),v(b,S),S.isMeshPhysicalMaterial&&y(b,S,D)):S.isMeshMatcapMaterial?(c(b,S),M(b,S)):S.isMeshDepthMaterial?c(b,S):S.isMeshDistanceMaterial?(c(b,S),A(b,S)):S.isMeshNormalMaterial?c(b,S):S.isLineBasicMaterial?(f(b,S),S.isLineDashedMaterial&&h(b,S)):S.isPointsMaterial?m(b,S,z,N):S.isSpriteMaterial?p(b,S):S.isShadowMaterial?(b.color.value.copy(S.color),b.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(b,S){b.opacity.value=S.opacity,S.color&&b.diffuse.value.copy(S.color),S.emissive&&b.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(b.map.value=S.map,n(S.map,b.mapTransform)),S.alphaMap&&(b.alphaMap.value=S.alphaMap,n(S.alphaMap,b.alphaMapTransform)),S.bumpMap&&(b.bumpMap.value=S.bumpMap,n(S.bumpMap,b.bumpMapTransform),b.bumpScale.value=S.bumpScale,S.side===Kn&&(b.bumpScale.value*=-1)),S.normalMap&&(b.normalMap.value=S.normalMap,n(S.normalMap,b.normalMapTransform),b.normalScale.value.copy(S.normalScale),S.side===Kn&&b.normalScale.value.negate()),S.displacementMap&&(b.displacementMap.value=S.displacementMap,n(S.displacementMap,b.displacementMapTransform),b.displacementScale.value=S.displacementScale,b.displacementBias.value=S.displacementBias),S.emissiveMap&&(b.emissiveMap.value=S.emissiveMap,n(S.emissiveMap,b.emissiveMapTransform)),S.specularMap&&(b.specularMap.value=S.specularMap,n(S.specularMap,b.specularMapTransform)),S.alphaTest>0&&(b.alphaTest.value=S.alphaTest);const z=e.get(S),N=z.envMap,D=z.envMapRotation;N&&(b.envMap.value=N,Pr.copy(D),Pr.x*=-1,Pr.y*=-1,Pr.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Pr.y*=-1,Pr.z*=-1),b.envMapRotation.value.setFromMatrix4(ZA.makeRotationFromEuler(Pr)),b.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,b.reflectivity.value=S.reflectivity,b.ior.value=S.ior,b.refractionRatio.value=S.refractionRatio),S.lightMap&&(b.lightMap.value=S.lightMap,b.lightMapIntensity.value=S.lightMapIntensity,n(S.lightMap,b.lightMapTransform)),S.aoMap&&(b.aoMap.value=S.aoMap,b.aoMapIntensity.value=S.aoMapIntensity,n(S.aoMap,b.aoMapTransform))}function f(b,S){b.diffuse.value.copy(S.color),b.opacity.value=S.opacity,S.map&&(b.map.value=S.map,n(S.map,b.mapTransform))}function h(b,S){b.dashSize.value=S.dashSize,b.totalSize.value=S.dashSize+S.gapSize,b.scale.value=S.scale}function m(b,S,z,N){b.diffuse.value.copy(S.color),b.opacity.value=S.opacity,b.size.value=S.size*z,b.scale.value=N*.5,S.map&&(b.map.value=S.map,n(S.map,b.uvTransform)),S.alphaMap&&(b.alphaMap.value=S.alphaMap,n(S.alphaMap,b.alphaMapTransform)),S.alphaTest>0&&(b.alphaTest.value=S.alphaTest)}function p(b,S){b.diffuse.value.copy(S.color),b.opacity.value=S.opacity,b.rotation.value=S.rotation,S.map&&(b.map.value=S.map,n(S.map,b.mapTransform)),S.alphaMap&&(b.alphaMap.value=S.alphaMap,n(S.alphaMap,b.alphaMapTransform)),S.alphaTest>0&&(b.alphaTest.value=S.alphaTest)}function x(b,S){b.specular.value.copy(S.specular),b.shininess.value=Math.max(S.shininess,1e-4)}function g(b,S){S.gradientMap&&(b.gradientMap.value=S.gradientMap)}function v(b,S){b.metalness.value=S.metalness,S.metalnessMap&&(b.metalnessMap.value=S.metalnessMap,n(S.metalnessMap,b.metalnessMapTransform)),b.roughness.value=S.roughness,S.roughnessMap&&(b.roughnessMap.value=S.roughnessMap,n(S.roughnessMap,b.roughnessMapTransform)),S.envMap&&(b.envMapIntensity.value=S.envMapIntensity)}function y(b,S,z){b.ior.value=S.ior,S.sheen>0&&(b.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),b.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(b.sheenColorMap.value=S.sheenColorMap,n(S.sheenColorMap,b.sheenColorMapTransform)),S.sheenRoughnessMap&&(b.sheenRoughnessMap.value=S.sheenRoughnessMap,n(S.sheenRoughnessMap,b.sheenRoughnessMapTransform))),S.clearcoat>0&&(b.clearcoat.value=S.clearcoat,b.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(b.clearcoatMap.value=S.clearcoatMap,n(S.clearcoatMap,b.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(b.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,n(S.clearcoatRoughnessMap,b.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(b.clearcoatNormalMap.value=S.clearcoatNormalMap,n(S.clearcoatNormalMap,b.clearcoatNormalMapTransform),b.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Kn&&b.clearcoatNormalScale.value.negate())),S.dispersion>0&&(b.dispersion.value=S.dispersion),S.iridescence>0&&(b.iridescence.value=S.iridescence,b.iridescenceIOR.value=S.iridescenceIOR,b.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],b.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(b.iridescenceMap.value=S.iridescenceMap,n(S.iridescenceMap,b.iridescenceMapTransform)),S.iridescenceThicknessMap&&(b.iridescenceThicknessMap.value=S.iridescenceThicknessMap,n(S.iridescenceThicknessMap,b.iridescenceThicknessMapTransform))),S.transmission>0&&(b.transmission.value=S.transmission,b.transmissionSamplerMap.value=z.texture,b.transmissionSamplerSize.value.set(z.width,z.height),S.transmissionMap&&(b.transmissionMap.value=S.transmissionMap,n(S.transmissionMap,b.transmissionMapTransform)),b.thickness.value=S.thickness,S.thicknessMap&&(b.thicknessMap.value=S.thicknessMap,n(S.thicknessMap,b.thicknessMapTransform)),b.attenuationDistance.value=S.attenuationDistance,b.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(b.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(b.anisotropyMap.value=S.anisotropyMap,n(S.anisotropyMap,b.anisotropyMapTransform))),b.specularIntensity.value=S.specularIntensity,b.specularColor.value.copy(S.specularColor),S.specularColorMap&&(b.specularColorMap.value=S.specularColorMap,n(S.specularColorMap,b.specularColorMapTransform)),S.specularIntensityMap&&(b.specularIntensityMap.value=S.specularIntensityMap,n(S.specularIntensityMap,b.specularIntensityMapTransform))}function M(b,S){S.matcap&&(b.matcap.value=S.matcap)}function A(b,S){const z=e.get(S).light;b.referencePosition.value.setFromMatrixPosition(z.matrixWorld),b.nearDistance.value=z.shadow.camera.near,b.farDistance.value=z.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:o}}function JA(a,e,n,r){let o={},c={},f=[];const h=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function m(z,N){const D=N.program;r.uniformBlockBinding(z,D)}function p(z,N){let D=o[z.id];D===void 0&&(M(z),D=x(z),o[z.id]=D,z.addEventListener("dispose",b));const G=N.program;r.updateUBOMapping(z,G);const L=e.render.frame;c[z.id]!==L&&(v(z),c[z.id]=L)}function x(z){const N=g();z.__bindingPointIndex=N;const D=a.createBuffer(),G=z.__size,L=z.usage;return a.bindBuffer(a.UNIFORM_BUFFER,D),a.bufferData(a.UNIFORM_BUFFER,G,L),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,N,D),D}function g(){for(let z=0;z<h;z++)if(f.indexOf(z)===-1)return f.push(z),z;return nn("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(z){const N=o[z.id],D=z.uniforms,G=z.__cache;a.bindBuffer(a.UNIFORM_BUFFER,N);for(let L=0,F=D.length;L<F;L++){const Z=Array.isArray(D[L])?D[L]:[D[L]];for(let C=0,w=Z.length;C<w;C++){const k=Z[C];if(y(k,L,C,G)===!0){const ne=k.__offset,le=Array.isArray(k.value)?k.value:[k.value];let fe=0;for(let pe=0;pe<le.length;pe++){const P=le[pe],te=A(P);typeof P=="number"||typeof P=="boolean"?(k.__data[0]=P,a.bufferSubData(a.UNIFORM_BUFFER,ne+fe,k.__data)):P.isMatrix3?(k.__data[0]=P.elements[0],k.__data[1]=P.elements[1],k.__data[2]=P.elements[2],k.__data[3]=0,k.__data[4]=P.elements[3],k.__data[5]=P.elements[4],k.__data[6]=P.elements[5],k.__data[7]=0,k.__data[8]=P.elements[6],k.__data[9]=P.elements[7],k.__data[10]=P.elements[8],k.__data[11]=0):(P.toArray(k.__data,fe),fe+=te.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,ne,k.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function y(z,N,D,G){const L=z.value,F=N+"_"+D;if(G[F]===void 0)return typeof L=="number"||typeof L=="boolean"?G[F]=L:G[F]=L.clone(),!0;{const Z=G[F];if(typeof L=="number"||typeof L=="boolean"){if(Z!==L)return G[F]=L,!0}else if(Z.equals(L)===!1)return Z.copy(L),!0}return!1}function M(z){const N=z.uniforms;let D=0;const G=16;for(let F=0,Z=N.length;F<Z;F++){const C=Array.isArray(N[F])?N[F]:[N[F]];for(let w=0,k=C.length;w<k;w++){const ne=C[w],le=Array.isArray(ne.value)?ne.value:[ne.value];for(let fe=0,pe=le.length;fe<pe;fe++){const P=le[fe],te=A(P),j=D%G,ve=j%te.boundary,Se=j+ve;D+=ve,Se!==0&&G-Se<te.storage&&(D+=G-Se),ne.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),ne.__offset=D,D+=te.storage}}}const L=D%G;return L>0&&(D+=G-L),z.__size=D,z.__cache={},this}function A(z){const N={boundary:0,storage:0};return typeof z=="number"||typeof z=="boolean"?(N.boundary=4,N.storage=4):z.isVector2?(N.boundary=8,N.storage=8):z.isVector3||z.isColor?(N.boundary=16,N.storage=12):z.isVector4?(N.boundary=16,N.storage=16):z.isMatrix3?(N.boundary=48,N.storage=48):z.isMatrix4?(N.boundary=64,N.storage=64):z.isTexture?ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ct("WebGLRenderer: Unsupported uniform value type.",z),N}function b(z){const N=z.target;N.removeEventListener("dispose",b);const D=f.indexOf(N.__bindingPointIndex);f.splice(D,1),a.deleteBuffer(o[N.id]),delete o[N.id],delete c[N.id]}function S(){for(const z in o)a.deleteBuffer(o[z]);f=[],o={},c={}}return{bind:m,update:p,dispose:S}}const $A=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let ga=null;function eR(){return ga===null&&(ga=new sE($A,32,32,nm,go),ga.minFilter=Mi,ga.magFilter=Mi,ga.wrapS=ya,ga.wrapT=ya,ga.generateMipmaps=!1,ga.needsUpdate=!0),ga}class tR{constructor(e={}){const{canvas:n=xM(),context:r=null,depth:o=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:x="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:v=!1}=e;this.isWebGLRenderer=!0;let y;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");y=r.getContextAttributes().alpha}else y=f;const M=new Set([am,im,tm]),A=new Set([Ra,jr,Nl,Ol,$p,em]),b=new Uint32Array(4),S=new Int32Array(4);let z=null,N=null;const D=[],G=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ur,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let F=!1;this._outputColorSpace=yi;let Z=0,C=0,w=null,k=-1,ne=null;const le=new ln,fe=new ln;let pe=null;const P=new Pt(0);let te=0,j=n.width,ve=n.height,Se=1,U=null,K=null;const ye=new ln(0,0,j,ve),Ae=new ln(0,0,j,ve);let Fe=!1;const ie=new oS;let ce=!1,we=!1;const He=new cn,We=new se,ft=new ln,an={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let mt=!1;function wt(){return w===null?Se:1}let I=r;function xt(R,W){return n.getContext(R,W)}try{const R={alpha:!0,depth:o,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:x,failIfMajorPerformanceCaveat:g};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Qp}`),n.addEventListener("webglcontextlost",Ee,!1),n.addEventListener("webglcontextrestored",_e,!1),n.addEventListener("webglcontextcreationerror",Be,!1),I===null){const W="webgl2";if(I=xt(W,R),I===null)throw xt(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw R("WebGLRenderer: "+R.message),R}let vt,Bt,Ve,qt,Ze,ot,O,E,J,xe,be,ue,je,Ne,et,qe,Me,Te,Ke,ke,Pe,rt,H,Le;function Ce(){vt=new cT(I),vt.init(),rt=new WA(I,vt),Bt=new eT(I,vt,e,rt),Ve=new kA(I,vt),Bt.reversedDepthBuffer&&v&&Ve.buffers.depth.setReversed(!0),qt=new dT(I),Ze=new DA,ot=new XA(I,vt,Ve,Ze,Bt,rt,qt),O=new nT(L),E=new lT(L),J=new xE(I),H=new J2(I,J),xe=new uT(I,J,qt,H),be=new pT(I,xe,J,qt),Ke=new hT(I,Bt,ot),qe=new tT(Ze),ue=new CA(L,O,E,vt,Bt,H,qe),je=new QA(L,Ze),Ne=new UA,et=new BA(vt),Te=new Q2(L,O,E,Ve,be,y,m),Me=new HA(L,be,Bt),Le=new JA(I,qt,Bt,Ve),ke=new $2(I,vt,qt),Pe=new fT(I,vt,qt),qt.programs=ue.programs,L.capabilities=Bt,L.extensions=vt,L.properties=Ze,L.renderLists=Ne,L.shadowMap=Me,L.state=Ve,L.info=qt}Ce();const De=new KA(L,I);this.xr=De,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=vt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=vt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return Se},this.setPixelRatio=function(R){R!==void 0&&(Se=R,this.setSize(j,ve,!1))},this.getSize=function(R){return R.set(j,ve)},this.setSize=function(R,W,re=!0){if(De.isPresenting){ct("WebGLRenderer: Can't change size while VR device is presenting.");return}j=R,ve=W,n.width=Math.floor(R*Se),n.height=Math.floor(W*Se),re===!0&&(n.style.width=R+"px",n.style.height=W+"px"),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(j*Se,ve*Se).floor()},this.setDrawingBufferSize=function(R,W,re){j=R,ve=W,Se=re,n.width=Math.floor(R*re),n.height=Math.floor(W*re),this.setViewport(0,0,R,W)},this.getCurrentViewport=function(R){return R.copy(le)},this.getViewport=function(R){return R.copy(ye)},this.setViewport=function(R,W,re,ee){R.isVector4?ye.set(R.x,R.y,R.z,R.w):ye.set(R,W,re,ee),Ve.viewport(le.copy(ye).multiplyScalar(Se).round())},this.getScissor=function(R){return R.copy(Ae)},this.setScissor=function(R,W,re,ee){R.isVector4?Ae.set(R.x,R.y,R.z,R.w):Ae.set(R,W,re,ee),Ve.scissor(fe.copy(Ae).multiplyScalar(Se).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(R){Ve.setScissorTest(Fe=R)},this.setOpaqueSort=function(R){U=R},this.setTransparentSort=function(R){K=R},this.getClearColor=function(R){return R.copy(Te.getClearColor())},this.setClearColor=function(){Te.setClearColor(...arguments)},this.getClearAlpha=function(){return Te.getClearAlpha()},this.setClearAlpha=function(){Te.setClearAlpha(...arguments)},this.clear=function(R=!0,W=!0,re=!0){let ee=0;if(R){let Y=!1;if(w!==null){const Re=w.texture.format;Y=M.has(Re)}if(Y){const Re=w.texture.type,Ue=A.has(Re),ze=Te.getClearColor(),Ie=Te.getClearAlpha(),nt=ze.r,at=ze.g,Qe=ze.b;Ue?(b[0]=nt,b[1]=at,b[2]=Qe,b[3]=Ie,I.clearBufferuiv(I.COLOR,0,b)):(S[0]=nt,S[1]=at,S[2]=Qe,S[3]=Ie,I.clearBufferiv(I.COLOR,0,S))}else ee|=I.COLOR_BUFFER_BIT}W&&(ee|=I.DEPTH_BUFFER_BIT),re&&(ee|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Ee,!1),n.removeEventListener("webglcontextrestored",_e,!1),n.removeEventListener("webglcontextcreationerror",Be,!1),Te.dispose(),Ne.dispose(),et.dispose(),Ze.dispose(),O.dispose(),E.dispose(),be.dispose(),H.dispose(),Le.dispose(),ue.dispose(),De.dispose(),De.removeEventListener("sessionstart",Eo),De.removeEventListener("sessionend",To),Ei.stop()};function Ee(R){R.preventDefault(),Ev("WebGLRenderer: Context Lost."),F=!0}function _e(){Ev("WebGLRenderer: Context Restored."),F=!1;const R=qt.autoReset,W=Me.enabled,re=Me.autoUpdate,ee=Me.needsUpdate,Y=Me.type;Ce(),qt.autoReset=R,Me.enabled=W,Me.autoUpdate=re,Me.needsUpdate=ee,Me.type=Y}function Be(R){nn("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function st(R){const W=R.target;W.removeEventListener("dispose",st),Ht(W)}function Ht(R){Ct(R),Ze.remove(R)}function Ct(R){const W=Ze.get(R).programs;W!==void 0&&(W.forEach(function(re){ue.releaseProgram(re)}),R.isShaderMaterial&&ue.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,re,ee,Y,Re){W===null&&(W=an);const Ue=Y.isMesh&&Y.matrixWorld.determinant()<0,ze=tf(R,W,re,ee,Y);Ve.setMaterial(ee,Ue);let Ie=re.index,nt=1;if(ee.wireframe===!0){if(Ie=xe.getWireframeAttribute(re),Ie===void 0)return;nt=2}const at=re.drawRange,Qe=re.attributes.position;let dt=at.start*nt,Rt=(at.start+at.count)*nt;Re!==null&&(dt=Math.max(dt,Re.start*nt),Rt=Math.min(Rt,(Re.start+Re.count)*nt)),Ie!==null?(dt=Math.max(dt,0),Rt=Math.min(Rt,Ie.count)):Qe!=null&&(dt=Math.max(dt,0),Rt=Math.min(Rt,Qe.count));const Dt=Rt-dt;if(Dt<0||Dt===1/0)return;H.setup(Y,ee,ze,re,Ie);let Et,Ft=ke;if(Ie!==null&&(Et=J.get(Ie),Ft=Pe,Ft.setIndex(Et)),Y.isMesh)ee.wireframe===!0?(Ve.setLineWidth(ee.wireframeLinewidth*wt()),Ft.setMode(I.LINES)):Ft.setMode(I.TRIANGLES);else if(Y.isLine){let tt=ee.linewidth;tt===void 0&&(tt=1),Ve.setLineWidth(tt*wt()),Y.isLineSegments?Ft.setMode(I.LINES):Y.isLineLoop?Ft.setMode(I.LINE_LOOP):Ft.setMode(I.LINE_STRIP)}else Y.isPoints?Ft.setMode(I.POINTS):Y.isSprite&&Ft.setMode(I.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)zl("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ft.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(vt.get("WEBGL_multi_draw"))Ft.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const tt=Y._multiDrawStarts,Yt=Y._multiDrawCounts,Tt=Y._multiDrawCount,yn=Ie?J.get(Ie).bytesPerElement:1,La=Ze.get(ee).currentProgram.getUniforms();for(let Kt=0;Kt<Tt;Kt++)La.setValue(I,"_gl_DrawID",Kt),Ft.render(tt[Kt]/yn,Yt[Kt])}else if(Y.isInstancedMesh)Ft.renderInstances(dt,Dt,Y.count);else if(re.isInstancedBufferGeometry){const tt=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,Yt=Math.min(re.instanceCount,tt);Ft.renderInstances(dt,Dt,Yt)}else Ft.render(dt,Dt)};function On(R,W,re){R.transparent===!0&&R.side===Sa&&R.forceSinglePass===!1?(R.side=Kn,R.needsUpdate=!0,xn(R,W,re),R.side=Aa,R.needsUpdate=!0,xn(R,W,re),R.side=Sa):xn(R,W,re)}this.compile=function(R,W,re=null){re===null&&(re=R),N=et.get(re),N.init(W),G.push(N),re.traverseVisible(function(Y){Y.isLight&&Y.layers.test(W.layers)&&(N.pushLight(Y),Y.castShadow&&N.pushShadow(Y))}),R!==re&&R.traverseVisible(function(Y){Y.isLight&&Y.layers.test(W.layers)&&(N.pushLight(Y),Y.castShadow&&N.pushShadow(Y))}),N.setupLights();const ee=new Set;return R.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Re=Y.material;if(Re)if(Array.isArray(Re))for(let Ue=0;Ue<Re.length;Ue++){const ze=Re[Ue];On(ze,re,Y),ee.add(ze)}else On(Re,re,Y),ee.add(Re)}),N=G.pop(),ee},this.compileAsync=function(R,W,re=null){const ee=this.compile(R,W,re);return new Promise(Y=>{function Re(){if(ee.forEach(function(Ue){Ze.get(Ue).currentProgram.isReady()&&ee.delete(Ue)}),ee.size===0){Y(R);return}setTimeout(Re,10)}vt.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let Zn=null;function ql(R){Zn&&Zn(R)}function Eo(){Ei.stop()}function To(){Ei.start()}const Ei=new uS;Ei.setAnimationLoop(ql),typeof self<"u"&&Ei.setContext(self),this.setAnimationLoop=function(R){Zn=R,De.setAnimationLoop(R),R===null?Ei.stop():Ei.start()},De.addEventListener("sessionstart",Eo),De.addEventListener("sessionend",To),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){nn("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(De.cameraAutoUpdate===!0&&De.updateCamera(W),W=De.getCamera()),R.isScene===!0&&R.onBeforeRender(L,R,W,w),N=et.get(R,G.length),N.init(W),G.push(N),He.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),ie.setFromProjectionMatrix(He,Vi,W.reversedDepth),we=this.localClippingEnabled,ce=qe.init(this.clippingPlanes,we),z=Ne.get(R,D.length),z.init(),D.push(z),De.enabled===!0&&De.isPresenting===!0){const Re=L.xr.getDepthSensingMesh();Re!==null&&hr(Re,W,-1/0,L.sortObjects)}hr(R,W,0,L.sortObjects),z.finish(),L.sortObjects===!0&&z.sort(U,K),mt=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,mt&&Te.addToRenderList(z,R),this.info.render.frame++,ce===!0&&qe.beginShadows();const re=N.state.shadowsArray;Me.render(re,R,W),ce===!0&&qe.endShadows(),this.info.autoReset===!0&&this.info.reset();const ee=z.opaque,Y=z.transmissive;if(N.setupLights(),W.isArrayCamera){const Re=W.cameras;if(Y.length>0)for(let Ue=0,ze=Re.length;Ue<ze;Ue++){const Ie=Re[Ue];Ro(ee,Y,R,Ie)}mt&&Te.render(R);for(let Ue=0,ze=Re.length;Ue<ze;Ue++){const Ie=Re[Ue];Ao(z,R,Ie,Ie.viewport)}}else Y.length>0&&Ro(ee,Y,R,W),mt&&Te.render(R),Ao(z,R,W);w!==null&&C===0&&(ot.updateMultisampleRenderTarget(w),ot.updateRenderTargetMipmap(w)),R.isScene===!0&&R.onAfterRender(L,R,W),H.resetDefaultState(),k=-1,ne=null,G.pop(),G.length>0?(N=G[G.length-1],ce===!0&&qe.setGlobalState(L.clippingPlanes,N.state.camera)):N=null,D.pop(),D.length>0?z=D[D.length-1]:z=null};function hr(R,W,re,ee){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)re=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLight)N.pushLight(R),R.castShadow&&N.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ie.intersectsSprite(R)){ee&&ft.setFromMatrixPosition(R.matrixWorld).applyMatrix4(He);const Ue=be.update(R),ze=R.material;ze.visible&&z.push(R,Ue,ze,re,ft.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ie.intersectsObject(R))){const Ue=be.update(R),ze=R.material;if(ee&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ft.copy(R.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),ft.copy(Ue.boundingSphere.center)),ft.applyMatrix4(R.matrixWorld).applyMatrix4(He)),Array.isArray(ze)){const Ie=Ue.groups;for(let nt=0,at=Ie.length;nt<at;nt++){const Qe=Ie[nt],dt=ze[Qe.materialIndex];dt&&dt.visible&&z.push(R,Ue,dt,re,ft.z,Qe)}}else ze.visible&&z.push(R,Ue,ze,re,ft.z,null)}}const Re=R.children;for(let Ue=0,ze=Re.length;Ue<ze;Ue++)hr(Re[Ue],W,re,ee)}function Ao(R,W,re,ee){const{opaque:Y,transmissive:Re,transparent:Ue}=R;N.setupLightsView(re),ce===!0&&qe.setGlobalState(L.clippingPlanes,re),ee&&Ve.viewport(le.copy(ee)),Y.length>0&&Qn(Y,W,re),Re.length>0&&Qn(Re,W,re),Ue.length>0&&Qn(Ue,W,re),Ve.buffers.depth.setTest(!0),Ve.buffers.depth.setMask(!0),Ve.buffers.color.setMask(!0),Ve.setPolygonOffset(!1)}function Ro(R,W,re,ee){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;N.state.transmissionRenderTarget[ee.id]===void 0&&(N.state.transmissionRenderTarget[ee.id]=new Zr(1,1,{generateMipmaps:!0,type:vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float")?go:Ra,minFilter:Wr,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Nt.workingColorSpace}));const Re=N.state.transmissionRenderTarget[ee.id],Ue=ee.viewport||le;Re.setSize(Ue.z*L.transmissionResolutionScale,Ue.w*L.transmissionResolutionScale);const ze=L.getRenderTarget(),Ie=L.getActiveCubeFace(),nt=L.getActiveMipmapLevel();L.setRenderTarget(Re),L.getClearColor(P),te=L.getClearAlpha(),te<1&&L.setClearColor(16777215,.5),L.clear(),mt&&Te.render(re);const at=L.toneMapping;L.toneMapping=ur;const Qe=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),N.setupLightsView(ee),ce===!0&&qe.setGlobalState(L.clippingPlanes,ee),Qn(R,re,ee),ot.updateMultisampleRenderTarget(Re),ot.updateRenderTargetMipmap(Re),vt.has("WEBGL_multisampled_render_to_texture")===!1){let dt=!1;for(let Rt=0,Dt=W.length;Rt<Dt;Rt++){const Et=W[Rt],{object:Ft,geometry:tt,material:Yt,group:Tt}=Et;if(Yt.side===Sa&&Ft.layers.test(ee.layers)){const yn=Yt.side;Yt.side=Kn,Yt.needsUpdate=!0,un(Ft,re,ee,tt,Yt,Tt),Yt.side=yn,Yt.needsUpdate=!0,dt=!0}}dt===!0&&(ot.updateMultisampleRenderTarget(Re),ot.updateRenderTargetMipmap(Re))}L.setRenderTarget(ze,Ie,nt),L.setClearColor(P,te),Qe!==void 0&&(ee.viewport=Qe),L.toneMapping=at}function Qn(R,W,re){const ee=W.isScene===!0?W.overrideMaterial:null;for(let Y=0,Re=R.length;Y<Re;Y++){const Ue=R[Y],{object:ze,geometry:Ie,group:nt}=Ue;let at=Ue.material;at.allowOverride===!0&&ee!==null&&(at=ee),ze.layers.test(re.layers)&&un(ze,W,re,Ie,at,nt)}}function un(R,W,re,ee,Y,Re){R.onBeforeRender(L,W,re,ee,Y,Re),R.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),Y.onBeforeRender(L,W,re,ee,R,Re),Y.transparent===!0&&Y.side===Sa&&Y.forceSinglePass===!1?(Y.side=Kn,Y.needsUpdate=!0,L.renderBufferDirect(re,W,ee,Y,R,Re),Y.side=Aa,Y.needsUpdate=!0,L.renderBufferDirect(re,W,ee,Y,R,Re),Y.side=Sa):L.renderBufferDirect(re,W,ee,Y,R,Re),R.onAfterRender(L,W,re,ee,Y,Re)}function xn(R,W,re){W.isScene!==!0&&(W=an);const ee=Ze.get(R),Y=N.state.lights,Re=N.state.shadowsArray,Ue=Y.state.version,ze=ue.getParameters(R,Y.state,Re,W,re),Ie=ue.getProgramCacheKey(ze);let nt=ee.programs;ee.environment=R.isMeshStandardMaterial?W.environment:null,ee.fog=W.fog,ee.envMap=(R.isMeshStandardMaterial?E:O).get(R.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,nt===void 0&&(R.addEventListener("dispose",st),nt=new Map,ee.programs=nt);let at=nt.get(Ie);if(at!==void 0){if(ee.currentProgram===at&&ee.lightsStateVersion===Ue)return es(R,ze),at}else ze.uniforms=ue.getUniforms(R),R.onBeforeCompile(ze,L),at=ue.acquireProgram(ze,Ie),nt.set(Ie,at),ee.uniforms=ze.uniforms;const Qe=ee.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Qe.clippingPlanes=qe.uniform),es(R,ze),ee.needsLights=Yl(R),ee.lightsStateVersion=Ue,ee.needsLights&&(Qe.ambientLightColor.value=Y.state.ambient,Qe.lightProbe.value=Y.state.probe,Qe.directionalLights.value=Y.state.directional,Qe.directionalLightShadows.value=Y.state.directionalShadow,Qe.spotLights.value=Y.state.spot,Qe.spotLightShadows.value=Y.state.spotShadow,Qe.rectAreaLights.value=Y.state.rectArea,Qe.ltc_1.value=Y.state.rectAreaLTC1,Qe.ltc_2.value=Y.state.rectAreaLTC2,Qe.pointLights.value=Y.state.point,Qe.pointLightShadows.value=Y.state.pointShadow,Qe.hemisphereLights.value=Y.state.hemi,Qe.directionalShadowMap.value=Y.state.directionalShadowMap,Qe.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Qe.spotShadowMap.value=Y.state.spotShadowMap,Qe.spotLightMatrix.value=Y.state.spotLightMatrix,Qe.spotLightMap.value=Y.state.spotLightMap,Qe.pointShadowMap.value=Y.state.pointShadowMap,Qe.pointShadowMatrix.value=Y.state.pointShadowMatrix),ee.currentProgram=at,ee.uniformsList=null,at}function qi(R){if(R.uniformsList===null){const W=R.currentProgram.getUniforms();R.uniformsList=Du.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function es(R,W){const re=Ze.get(R);re.outputColorSpace=W.outputColorSpace,re.batching=W.batching,re.batchingColor=W.batchingColor,re.instancing=W.instancing,re.instancingColor=W.instancingColor,re.instancingMorph=W.instancingMorph,re.skinning=W.skinning,re.morphTargets=W.morphTargets,re.morphNormals=W.morphNormals,re.morphColors=W.morphColors,re.morphTargetsCount=W.morphTargetsCount,re.numClippingPlanes=W.numClippingPlanes,re.numIntersection=W.numClipIntersection,re.vertexAlphas=W.vertexAlphas,re.vertexTangents=W.vertexTangents,re.toneMapping=W.toneMapping}function tf(R,W,re,ee,Y){W.isScene!==!0&&(W=an),ot.resetTextureUnits();const Re=W.fog,Ue=ee.isMeshStandardMaterial?W.environment:null,ze=w===null?L.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:fo,Ie=(ee.isMeshStandardMaterial?E:O).get(ee.envMap||Ue),nt=ee.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,at=!!re.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Qe=!!re.morphAttributes.position,dt=!!re.morphAttributes.normal,Rt=!!re.morphAttributes.color;let Dt=ur;ee.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Dt=L.toneMapping);const Et=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,Ft=Et!==void 0?Et.length:0,tt=Ze.get(ee),Yt=N.state.lights;if(ce===!0&&(we===!0||R!==ne)){const Mn=R===ne&&ee.id===k;qe.setState(ee,R,Mn)}let Tt=!1;ee.version===tt.__version?(tt.needsLights&&tt.lightsStateVersion!==Yt.state.version||tt.outputColorSpace!==ze||Y.isBatchedMesh&&tt.batching===!1||!Y.isBatchedMesh&&tt.batching===!0||Y.isBatchedMesh&&tt.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&tt.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&tt.instancing===!1||!Y.isInstancedMesh&&tt.instancing===!0||Y.isSkinnedMesh&&tt.skinning===!1||!Y.isSkinnedMesh&&tt.skinning===!0||Y.isInstancedMesh&&tt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&tt.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&tt.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&tt.instancingMorph===!1&&Y.morphTexture!==null||tt.envMap!==Ie||ee.fog===!0&&tt.fog!==Re||tt.numClippingPlanes!==void 0&&(tt.numClippingPlanes!==qe.numPlanes||tt.numIntersection!==qe.numIntersection)||tt.vertexAlphas!==nt||tt.vertexTangents!==at||tt.morphTargets!==Qe||tt.morphNormals!==dt||tt.morphColors!==Rt||tt.toneMapping!==Dt||tt.morphTargetsCount!==Ft)&&(Tt=!0):(Tt=!0,tt.__version=ee.version);let yn=tt.currentProgram;Tt===!0&&(yn=xn(ee,W,Y));let La=!1,Kt=!1,Yi=!1;const Zt=yn.getUniforms(),bn=tt.uniforms;if(Ve.useProgram(yn.program)&&(La=!0,Kt=!0,Yi=!0),ee.id!==k&&(k=ee.id,Kt=!0),La||ne!==R){Ve.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Zt.setValue(I,"projectionMatrix",R.projectionMatrix),Zt.setValue(I,"viewMatrix",R.matrixWorldInverse);const Cn=Zt.map.cameraPosition;Cn!==void 0&&Cn.setValue(I,We.setFromMatrixPosition(R.matrixWorld)),Bt.logarithmicDepthBuffer&&Zt.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Zt.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),ne!==R&&(ne=R,Kt=!0,Yi=!0)}if(Y.isSkinnedMesh){Zt.setOptional(I,Y,"bindMatrix"),Zt.setOptional(I,Y,"bindMatrixInverse");const Mn=Y.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),Zt.setValue(I,"boneTexture",Mn.boneTexture,ot))}Y.isBatchedMesh&&(Zt.setOptional(I,Y,"batchingTexture"),Zt.setValue(I,"batchingTexture",Y._matricesTexture,ot),Zt.setOptional(I,Y,"batchingIdTexture"),Zt.setValue(I,"batchingIdTexture",Y._indirectTexture,ot),Zt.setOptional(I,Y,"batchingColorTexture"),Y._colorsTexture!==null&&Zt.setValue(I,"batchingColorTexture",Y._colorsTexture,ot));const gn=re.morphAttributes;if((gn.position!==void 0||gn.normal!==void 0||gn.color!==void 0)&&Ke.update(Y,re,yn),(Kt||tt.receiveShadow!==Y.receiveShadow)&&(tt.receiveShadow=Y.receiveShadow,Zt.setValue(I,"receiveShadow",Y.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(bn.envMap.value=Ie,bn.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&W.environment!==null&&(bn.envMapIntensity.value=W.environmentIntensity),bn.dfgLUT!==void 0&&(bn.dfgLUT.value=eR()),Kt&&(Zt.setValue(I,"toneMappingExposure",L.toneMappingExposure),tt.needsLights&&nf(bn,Yi),Re&&ee.fog===!0&&je.refreshFogUniforms(bn,Re),je.refreshMaterialUniforms(bn,ee,Se,ve,N.state.transmissionRenderTarget[R.id]),Du.upload(I,qi(tt),bn,ot)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Du.upload(I,qi(tt),bn,ot),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Zt.setValue(I,"center",Y.center),Zt.setValue(I,"modelViewMatrix",Y.modelViewMatrix),Zt.setValue(I,"normalMatrix",Y.normalMatrix),Zt.setValue(I,"modelMatrix",Y.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const Mn=ee.uniformsGroups;for(let Cn=0,Fi=Mn.length;Cn<Fi;Cn++){const ji=Mn[Cn];Le.update(ji,yn),Le.bind(ji,yn)}}return yn}function nf(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function Yl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(R,W,re){const ee=Ze.get(R);ee.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),Ze.get(R.texture).__webglTexture=W,Ze.get(R.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:re,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,W){const re=Ze.get(R);re.__webglFramebuffer=W,re.__useDefaultFramebuffer=W===void 0};const pr=I.createFramebuffer();this.setRenderTarget=function(R,W=0,re=0){w=R,Z=W,C=re;let ee=!0,Y=null,Re=!1,Ue=!1;if(R){const Ie=Ze.get(R);if(Ie.__useDefaultFramebuffer!==void 0)Ve.bindFramebuffer(I.FRAMEBUFFER,null),ee=!1;else if(Ie.__webglFramebuffer===void 0)ot.setupRenderTarget(R);else if(Ie.__hasExternalTextures)ot.rebindTextures(R,Ze.get(R.texture).__webglTexture,Ze.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Qe=R.depthTexture;if(Ie.__boundDepthTexture!==Qe){if(Qe!==null&&Ze.has(Qe)&&(R.width!==Qe.image.width||R.height!==Qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ot.setupDepthRenderbuffer(R)}}const nt=R.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(Ue=!0);const at=Ze.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(at[W])?Y=at[W][re]:Y=at[W],Re=!0):R.samples>0&&ot.useMultisampledRTT(R)===!1?Y=Ze.get(R).__webglMultisampledFramebuffer:Array.isArray(at)?Y=at[re]:Y=at,le.copy(R.viewport),fe.copy(R.scissor),pe=R.scissorTest}else le.copy(ye).multiplyScalar(Se).floor(),fe.copy(Ae).multiplyScalar(Se).floor(),pe=Fe;if(re!==0&&(Y=pr),Ve.bindFramebuffer(I.FRAMEBUFFER,Y)&&ee&&Ve.drawBuffers(R,Y),Ve.viewport(le),Ve.scissor(fe),Ve.setScissorTest(pe),Re){const Ie=Ze.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ie.__webglTexture,re)}else if(Ue){const Ie=W;for(let nt=0;nt<R.textures.length;nt++){const at=Ze.get(R.textures[nt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+nt,at.__webglTexture,re,Ie)}}else if(R!==null&&re!==0){const Ie=Ze.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ie.__webglTexture,re)}k=-1},this.readRenderTargetPixels=function(R,W,re,ee,Y,Re,Ue,ze=0){if(!(R&&R.isWebGLRenderTarget)){nn("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=Ze.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ie=Ie[Ue]),Ie){Ve.bindFramebuffer(I.FRAMEBUFFER,Ie);try{const nt=R.textures[ze],at=nt.format,Qe=nt.type;if(!Bt.textureFormatReadable(at)){nn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(Qe)){nn("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-ee&&re>=0&&re<=R.height-Y&&(R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ze),I.readPixels(W,re,ee,Y,rt.convert(at),rt.convert(Qe),Re))}finally{const nt=w!==null?Ze.get(w).__webglFramebuffer:null;Ve.bindFramebuffer(I.FRAMEBUFFER,nt)}}},this.readRenderTargetPixelsAsync=async function(R,W,re,ee,Y,Re,Ue,ze=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=Ze.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ue!==void 0&&(Ie=Ie[Ue]),Ie)if(W>=0&&W<=R.width-ee&&re>=0&&re<=R.height-Y){Ve.bindFramebuffer(I.FRAMEBUFFER,Ie);const nt=R.textures[ze],at=nt.format,Qe=nt.type;if(!Bt.textureFormatReadable(at))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const dt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,dt),I.bufferData(I.PIXEL_PACK_BUFFER,Re.byteLength,I.STREAM_READ),R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+ze),I.readPixels(W,re,ee,Y,rt.convert(at),rt.convert(Qe),0);const Rt=w!==null?Ze.get(w).__webglFramebuffer:null;Ve.bindFramebuffer(I.FRAMEBUFFER,Rt);const Dt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await gM(I,Dt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,dt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Re),I.deleteBuffer(dt),I.deleteSync(Dt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,W=null,re=0){const ee=Math.pow(2,-re),Y=Math.floor(R.image.width*ee),Re=Math.floor(R.image.height*ee),Ue=W!==null?W.x:0,ze=W!==null?W.y:0;ot.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,re,0,0,Ue,ze,Y,Re),Ve.unbindTexture()};const wo=I.createFramebuffer(),Da=I.createFramebuffer();this.copyTextureToTexture=function(R,W,re=null,ee=null,Y=0,Re=null){Re===null&&(Y!==0?(zl("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Re=Y,Y=0):Re=0);let Ue,ze,Ie,nt,at,Qe,dt,Rt,Dt;const Et=R.isCompressedTexture?R.mipmaps[Re]:R.image;if(re!==null)Ue=re.max.x-re.min.x,ze=re.max.y-re.min.y,Ie=re.isBox3?re.max.z-re.min.z:1,nt=re.min.x,at=re.min.y,Qe=re.isBox3?re.min.z:0;else{const gn=Math.pow(2,-Y);Ue=Math.floor(Et.width*gn),ze=Math.floor(Et.height*gn),R.isDataArrayTexture?Ie=Et.depth:R.isData3DTexture?Ie=Math.floor(Et.depth*gn):Ie=1,nt=0,at=0,Qe=0}ee!==null?(dt=ee.x,Rt=ee.y,Dt=ee.z):(dt=0,Rt=0,Dt=0);const Ft=rt.convert(W.format),tt=rt.convert(W.type);let Yt;W.isData3DTexture?(ot.setTexture3D(W,0),Yt=I.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(ot.setTexture2DArray(W,0),Yt=I.TEXTURE_2D_ARRAY):(ot.setTexture2D(W,0),Yt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,W.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,W.unpackAlignment);const Tt=I.getParameter(I.UNPACK_ROW_LENGTH),yn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),La=I.getParameter(I.UNPACK_SKIP_PIXELS),Kt=I.getParameter(I.UNPACK_SKIP_ROWS),Yi=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Et.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Et.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,nt),I.pixelStorei(I.UNPACK_SKIP_ROWS,at),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Qe);const Zt=R.isDataArrayTexture||R.isData3DTexture,bn=W.isDataArrayTexture||W.isData3DTexture;if(R.isDepthTexture){const gn=Ze.get(R),Mn=Ze.get(W),Cn=Ze.get(gn.__renderTarget),Fi=Ze.get(Mn.__renderTarget);Ve.bindFramebuffer(I.READ_FRAMEBUFFER,Cn.__webglFramebuffer),Ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,Fi.__webglFramebuffer);for(let ji=0;ji<Ie;ji++)Zt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ze.get(R).__webglTexture,Y,Qe+ji),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ze.get(W).__webglTexture,Re,Dt+ji)),I.blitFramebuffer(nt,at,Ue,ze,dt,Rt,Ue,ze,I.DEPTH_BUFFER_BIT,I.NEAREST);Ve.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(Y!==0||R.isRenderTargetTexture||Ze.has(R)){const gn=Ze.get(R),Mn=Ze.get(W);Ve.bindFramebuffer(I.READ_FRAMEBUFFER,wo),Ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,Da);for(let Cn=0;Cn<Ie;Cn++)Zt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,gn.__webglTexture,Y,Qe+Cn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,gn.__webglTexture,Y),bn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Mn.__webglTexture,Re,Dt+Cn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Mn.__webglTexture,Re),Y!==0?I.blitFramebuffer(nt,at,Ue,ze,dt,Rt,Ue,ze,I.COLOR_BUFFER_BIT,I.NEAREST):bn?I.copyTexSubImage3D(Yt,Re,dt,Rt,Dt+Cn,nt,at,Ue,ze):I.copyTexSubImage2D(Yt,Re,dt,Rt,nt,at,Ue,ze);Ve.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ve.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else bn?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(Yt,Re,dt,Rt,Dt,Ue,ze,Ie,Ft,tt,Et.data):W.isCompressedArrayTexture?I.compressedTexSubImage3D(Yt,Re,dt,Rt,Dt,Ue,ze,Ie,Ft,Et.data):I.texSubImage3D(Yt,Re,dt,Rt,Dt,Ue,ze,Ie,Ft,tt,Et):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Re,dt,Rt,Ue,ze,Ft,tt,Et.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Re,dt,Rt,Et.width,Et.height,Ft,Et.data):I.texSubImage2D(I.TEXTURE_2D,Re,dt,Rt,Ue,ze,Ft,tt,Et);I.pixelStorei(I.UNPACK_ROW_LENGTH,Tt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,La),I.pixelStorei(I.UNPACK_SKIP_ROWS,Kt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Yi),Re===0&&W.generateMipmaps&&I.generateMipmap(Yt),Ve.unbindTexture()},this.initRenderTarget=function(R){Ze.get(R).__webglFramebuffer===void 0&&ot.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?ot.setTextureCube(R,0):R.isData3DTexture?ot.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?ot.setTexture2DArray(R,0):ot.setTexture2D(R,0),Ve.unbindTexture()},this.resetState=function(){Z=0,C=0,w=null,Ve.reset(),H.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Nt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Nt._getUnpackColorSpace()}}const nR=[1,0,0,0,1,0,0,0,1],Lu=a=>a+0;function p_(a,e){const n=new Array(9);for(let r=0;r<3;r++)for(let o=0;o<3;o++)n[r*3+o]=Lu(a[r*3]*e[o]+a[r*3+1]*e[3+o]+a[r*3+2]*e[6+o]);return n}function cm(a,e){return[Lu(a[0]*e[0]+a[1]*e[1]+a[2]*e[2]),Lu(a[3]*e[0]+a[4]*e[1]+a[5]*e[2]),Lu(a[6]*e[0]+a[7]*e[1]+a[8]*e[2])]}const Iu=(a,e)=>a[0]===e[0]&&a[1]===e[1]&&a[2]===e[2],iR=(a,e)=>a.every((n,r)=>n===e[r]),m_={0:{pos:[1,0,0,0,0,-1,0,1,0],neg:[1,0,0,0,0,1,0,-1,0]},1:{pos:[0,0,1,0,1,0,-1,0,0],neg:[0,0,-1,0,1,0,1,0,0]},2:{pos:[0,-1,0,1,0,0,0,0,1],neg:[0,1,0,-1,0,0,0,0,1]}},bo=["U","R","F","D","L","B"],Qr={U:[0,1,0],D:[0,-1,0],R:[1,0,0],L:[-1,0,0],F:[0,0,1],B:[0,0,-1]};function um(){const a=[];for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++)for(let r=-1;r<=1;r++){if(e===0&&n===0&&r===0)continue;const o=[e,n,r];a.push({home:o,pos:o,rot:nR})}return{cubies:a}}const x_=a=>{const e=a.home.filter(n=>n!==0).length;return e===3?"corner":e===2?"edge":"center"},Mo={U:{axis:1,layer:1,negIsCw:!0},D:{axis:1,layer:-1,negIsCw:!1},R:{axis:0,layer:1,negIsCw:!0},L:{axis:0,layer:-1,negIsCw:!1},F:{axis:2,layer:1,negIsCw:!0},B:{axis:2,layer:-1,negIsCw:!1},M:{axis:0,layer:0,negIsCw:!1},E:{axis:1,layer:0,negIsCw:!1},S:{axis:2,layer:0,negIsCw:!0}},aR=a=>a in Mo;function rR(a){const e=Mo[a];return e.negIsCw?m_[e.axis].neg:m_[e.axis].pos}function fm(a,e){const n=Mo[e.base],r=rR(e.base);let o=r;for(let c=1;c<e.amount;c++)o=p_(r,o);return{cubies:a.cubies.map(c=>c.pos[n.axis]===n.layer?{home:c.home,pos:cm(o,c.pos),rot:p_(o,c.rot)}:c)}}const Ku=(a,e)=>e.reduce(fm,a);function Pp(a){const e=a.cubies.find(r=>x_(r)==="corner");if(!e)return!1;const n=e.rot;return a.cubies.every(r=>Iu(r.pos,cm(n,r.home))?x_(r)==="center"||iR(r.rot,n):!1)}function mS(a){const e=[];for(let n=0;n<3;n++){const r=a.home[n];if(r===0)continue;const o=[0,0,0];o[n]=r;const c=o,f=bo.find(h=>Iu(Qr[h],c));e.push({normal:c,color:f})}return e}function dm(a,e,n){const r=a.cubies.find(o=>Iu(o.pos,e));if(!r)return null;for(const o of mS(r))if(Iu(cm(r.rot,o.normal),n))return o.color;return null}function hm(a){const e={};for(const n of bo)e[n]=dm(a,Qr[n],Qr[n])??n;return e}const zp={cardinal:{id:"cardinal",name:"Cardinal",faces:{U:"#ECEFF2",D:"#FFC81E",F:"#0BC25E",B:"#2E7BFF",L:"#FF7A1A",R:"#FA2F45"},alarm:"#FF4A5C",stickerInset:.06},universal:{id:"universal",name:"Universal",faces:{U:"#F1F4F7",D:"#F5C518",F:"#22C7E0",B:"#2A62E0",L:"#D9660F",R:"#E8497F"},alarm:"#F55E92",stickerInset:.09}},sR="#141518",qs={up:1,toward:.88,left:.82,right:.76,away:.76,down:.7},Ys=.98,js=1,oR=Math.PI/4,lR=24*Math.PI/180,io=72*Math.PI/180,cR=[45,135,225,315].map(a=>a*Math.PI/180),uR=[24,-24].map(a=>a*Math.PI/180),fR=[new se(1,0,0),new se(0,1,0),new se(0,0,1)];class dR{constructor(e,n){this.container=e,this.palette=n,this.renderer=new tR({antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setClearColor(0,1),e.appendChild(this.renderer.domElement),this.renderer.domElement.style.display="block",this.renderer.domElement.style.touchAction="none",this.camera=new bi(28,1,.1,100),this.scene.add(this.root),this.buildCubies(),this.resize(),this.loop()}scene=new rE;camera;renderer;root=new no;cubies=[];raycaster=new pE;pointer=new zt;yaw=oR;pitch=lR;distance=12;liveBase=null;liveAngle=0;frameHandle=0;buildCubies(){const e=new So(Ys,Ys,Ys),n=new Bu({color:sR});for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++)for(let c=-1;c<=1;c++){if(!r&&!o&&!c)continue;const f=new no;f.add(new Wi(e,n));const h=[r,o,c],m=[];for(const{normal:p,color:x}of mS({home:h})){const g=Ys*(1-this.palette.stickerInset*2),v=new po(g,g),y=new Pt(this.palette.faces[x]),M=new Bu({color:y.clone(),side:Aa}),A=new Wi(v,M),b=new se(p[0],p[1],p[2]);A.position.copy(b).multiplyScalar(Ys/2+.001),A.quaternion.setFromUnitVectors(new se(0,0,1),b),f.add(A),m.push({mesh:A,material:M,face:x,base:y,localNormal:b})}this.root.add(f),this.cubies.push({group:f,stickers:m,basePosition:new se(r*js,o*js,c*js),baseQuaternion:new Kr,coords:h})}}setState(e){e.cubies.forEach((n,r)=>{const o=this.cubies[r];o.basePosition.set(n.pos[0]*js,n.pos[1]*js,n.pos[2]*js);const c=new cn().set(n.rot[0],n.rot[1],n.rot[2],0,n.rot[3],n.rot[4],n.rot[5],0,n.rot[6],n.rot[7],n.rot[8],0,0,0,0,1);o.baseQuaternion.setFromRotationMatrix(c),o.coords=n.pos}),this.liveBase=null,this.liveAngle=0}playSequence(e,n,r,o){let c=!1,f=e,h=0,m=0,p=0;const x=()=>{c||(c=!0,cancelAnimationFrame(p),window.clearTimeout(g),this.setLayerRotation(null,0),o?.())};if(typeof document<"u"&&document.hidden)return o?.(),()=>{};const g=window.setTimeout(x,n.length*r+1500),v=y=>{if(c)return;m===0&&(m=y);const M=n[h];if(!M){x();return}const A=Math.min(1,(y-m)/r),b=1-(1-A)**3;this.setLayerRotation(M.base,b*(Math.PI/2)*M.amount),A>=1&&(f=fm(f,M),this.setState(f),h++,m=0),p=requestAnimationFrame(v)};return this.setState(e),p=requestAnimationFrame(v),()=>{c=!0,cancelAnimationFrame(p),window.clearTimeout(g),this.setLayerRotation(null,0)}}setPalette(e){this.palette=e;const n=Ys*(1-e.stickerInset*2);for(const r of this.cubies)for(const o of r.stickers)o.base=new Pt(e.faces[o.face]),o.mesh.geometry.dispose(),o.mesh.geometry=new po(n,n)}setLayerRotation(e,n){this.liveBase=e,this.liveAngle=n}setOrbit(e,n){this.yaw=e,this.pitch=OM.clamp(n,-io,io)}getOrbit(){return{yaw:this.yaw,pitch:this.pitch}}pickSticker(e,n){const r=this.renderer.domElement.getBoundingClientRect();this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((n-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.camera);const o=this.cubies.flatMap(x=>x.stickers.map(g=>g.mesh)),c=this.raycaster.intersectObjects(o,!1);if(c.length===0)return null;const f=c[0].object,h=this.cubies.findIndex(x=>x.stickers.some(g=>g.mesh===f));if(h<0)return null;const p=this.cubies[h].stickers.find(x=>x.mesh===f).localNormal.clone().applyQuaternion(this.cubies[h].group.quaternion).round();return{cubieIndex:h,worldNormal:[p.x,p.y,p.z]}}cubieCoords(e){return this.cubies[e].coords}projectDirection(e,n){const r=new se(...e).project(this.camera),o=new se(e[0]+n[0],e[1]+n[1],e[2]+n[2]).project(this.camera);return new zt(o.x-r.x,-(o.y-r.y)).normalize()}screenEdgeLength(){const e=this.renderer.domElement.getBoundingClientRect(),n=new se(-1.5,1.5,1.5).project(this.camera),r=new se(1.5,1.5,1.5).project(this.camera);return Math.hypot(r.x-n.x,r.y-n.y)/2*e.width}resize(){const e=this.container.clientWidth||1,n=this.container.clientHeight||1;this.camera.aspect=e/n,this.distance=12;for(let r=0;r<3;r++){this.placeCamera(),this.camera.updateProjectionMatrix();const o=this.projectedWidth();if(o<=0)break;this.distance*=o/.78}this.placeCamera(),this.camera.updateProjectionMatrix(),this.renderer.setSize(e,n)}projectedWidth(){let e=1/0,n=-1/0;for(const r of[-1.5,1.5])for(const o of[-1.5,1.5])for(const c of[-1.5,1.5]){const f=new se(r,o,c).project(this.camera);e=Math.min(e,f.x),n=Math.max(n,f.x)}return(n-e)/2}placeCamera(){const e=Math.cos(this.pitch);this.camera.position.set(this.distance*e*Math.sin(this.yaw),this.distance*Math.sin(this.pitch),this.distance*e*Math.cos(this.yaw)),this.camera.up.set(0,1,0),this.camera.lookAt(0,0,0)}applyTransforms(){const e=this.liveBase?Mo[this.liveBase]:null,n=e?new Kr().setFromAxisAngle(fR[e.axis],e.negIsCw?-this.liveAngle:this.liveAngle):null;for(const r of this.cubies){const o=e!==null&&r.coords[e.axis]===e.layer;n&&o?(r.group.position.copy(r.basePosition).applyQuaternion(n),r.group.quaternion.copy(n).multiply(r.baseQuaternion)):(r.group.position.copy(r.basePosition),r.group.quaternion.copy(r.baseQuaternion))}}applyShading(){const e=this.camera.matrixWorldInverse,n=new se;for(const r of this.cubies)for(const o of r.stickers){n.copy(o.localNormal).applyQuaternion(r.group.quaternion).transformDirection(e);const c={up:Math.max(0,n.y),down:Math.max(0,-n.y),right:Math.max(0,n.x),left:Math.max(0,-n.x),toward:Math.max(0,n.z),away:Math.max(0,-n.z)},f=c.up+c.down+c.right+c.left+c.toward+c.away||1,h=(c.up*qs.up+c.down*qs.down+c.right*qs.right+c.left*qs.left+c.toward*qs.toward+c.away*qs.away)/f;o.material.color.copy(o.base).multiplyScalar(h)}}loop=()=>{this.frameHandle=requestAnimationFrame(this.loop),this.placeCamera(),this.camera.updateMatrixWorld(),this.applyTransforms(),this.root.updateMatrixWorld(!0),this.applyShading(),this.renderer.render(this.scene,this.camera)};dispose(){cancelAnimationFrame(this.frameHandle),this.renderer.dispose(),this.renderer.domElement.remove()}get canvas(){return this.renderer.domElement}}const oo=Math.PI/180,hR=.42,g_=180*oo,pR=8,mR=900*oo,xR=.55,gR=260,vR=12*oo,_R={stiffness:520,damping:26,mass:.55},SR={stiffness:180,damping:24,mass:1},yR=[[1,0,0],[0,1,0],[0,0,1]],bR=(a,e)=>[a[1]*e[2]-a[2]*e[1],a[2]*e[0]-a[0]*e[2],a[0]*e[1]-a[1]*e[0]];function MR(a,e){for(const[n,r]of Object.entries(Mo))if(r.axis===a&&r.layer===e)return n;return null}function ER(a,e,n,r,o){const c=a.cubieCoords(e),f={x:r,y:-o};let h=null;for(let m=0;m<3;m++){if(n[m]!==0)continue;const p=bR(yR[m],c);if(p.every(A=>A===0))continue;const x=a.projectDirection(c,p),g=MR(m,c[m]);if(!g)continue;const v=Mo[g].negIsCw?-1:1,y={x:x.x*v,y:x.y*v},M=y.x*f.x+y.y*f.y;(!h||Math.abs(M)>Math.abs(h.score))&&(h={base:g,tangent:y,score:M})}return h?{base:h.base,tangent:h.tangent}:null}class TR{constructor(e,n,r={now:()=>performance.now(),raf:o=>requestAnimationFrame(o),caf:o=>cancelAnimationFrame(o)}){this.renderer=e,this.callbacks=n,this.scheduler=r;const o=e.canvas;o.addEventListener("pointerdown",this.onDown),o.addEventListener("pointermove",this.onMove),o.addEventListener("pointerup",this.onUp),o.addEventListener("pointercancel",this.onUp)}drag=null;animation=0;dispose(){const e=this.renderer.canvas;e.removeEventListener("pointerdown",this.onDown),e.removeEventListener("pointermove",this.onMove),e.removeEventListener("pointerup",this.onUp),e.removeEventListener("pointercancel",this.onUp),this.scheduler.caf(this.animation)}get animating(){return this.animation!==0}onDown=e=>{if(this.animating)return;e.preventDefault();try{this.renderer.canvas.setPointerCapture(e.pointerId)}catch{}const n=this.renderer.pickSticker(e.clientX,e.clientY);if(n){this.drag={kind:"pending",cubieIndex:n.cubieIndex,normal:n.worldNormal,startX:e.clientX,startY:e.clientY};return}const{yaw:r,pitch:o}=this.renderer.getOrbit();this.drag={kind:"orbit",startX:e.clientX,startY:e.clientY,startYaw:r,startPitch:o,lastX:e.clientX,lastY:e.clientY,lastTime:this.scheduler.now(),velocityYaw:0,velocityPitch:0}};onMove=e=>{const n=this.drag;if(!n)return;e.preventDefault();const r=e.clientX-n.startX,o=e.clientY-n.startY;if(n.kind==="pending"){if(Math.hypot(r,o)<pR)return;const g=ER(this.renderer,n.cubieIndex,n.normal,r,o);if(!g)return;this.drag={kind:"turn",base:g.base,tangent:g.tangent,startX:n.startX,startY:n.startY,angle:0,lastAngle:0,lastTime:this.scheduler.now(),velocity:0,detent:0},this.callbacks.onGrab(g.base),this.applyTurn(this.drag,r,o);return}if(n.kind==="turn"){this.applyTurn(n,r,o);return}const c=this.renderer.canvas.clientWidth||1,f=Math.PI/(xR*c),h=n.startYaw+r*f,m=Math.max(-io,Math.min(io,n.startPitch+o*f)),p=this.scheduler.now(),x=Math.max(1,p-n.lastTime)/1e3;n.velocityYaw=(e.clientX-n.lastX)*f/x,n.velocityPitch=(e.clientY-n.lastY)*f/x,n.lastX=e.clientX,n.lastY=e.clientY,n.lastTime=p,this.renderer.setOrbit(h,m)};applyTurn(e,n,r){const o=this.renderer.screenEdgeLength()||1,f=(n*e.tangent.x+-r*e.tangent.y)/(hR*o)*(90*oo),h=Math.max(-g_,Math.min(g_,f)),m=this.scheduler.now(),p=Math.max(1,m-e.lastTime)/1e3;e.velocity=(h-e.lastAngle)/p,e.lastAngle=h,e.lastTime=m,e.angle=h;const x=Math.round(h/(90*oo));x!==e.detent&&(e.detent=x,this.callbacks.onDetent()),this.renderer.setLayerRotation(e.base,h)}onUp=e=>{const n=this.drag;if(this.drag=null,!!n){try{this.renderer.canvas.releasePointerCapture(e.pointerId)}catch{}if(n.kind==="pending"){this.callbacks.onRelease();return}if(n.kind==="orbit"){this.settleOrbit(n);return}this.settleTurn(n)}};settleTurn(e){const n=90*oo,r=Math.abs(e.velocity)>=mR?(e.velocity>0?Math.floor(e.angle/n)+1:Math.ceil(e.angle/n)-1)*n:Math.round(e.angle/n)*n;this.callbacks.onSnapStart(170),this.spring(e.angle,r,e.velocity,_R,c=>this.renderer.setLayerRotation(e.base,c),()=>{const f=(Math.round(r/n)%4+4)%4;if(this.renderer.setLayerRotation(null,0),f===0){this.callbacks.onRelease();return}this.callbacks.onCommit({base:e.base,amount:f})})}settleOrbit(e){let{yaw:n,pitch:r}=this.renderer.getOrbit(),o=e.velocityYaw,c=e.velocityPitch,f=this.scheduler.now();const h=()=>{const m=this.scheduler.now(),p=Math.min(.05,Math.max(.001,(m-f)/1e3));f=m;const x=Math.exp(-(p*1e3)/gR);if(o*=x,c*=x,n+=o*p,r=Math.max(-io,Math.min(io,r+c*p)),this.renderer.setOrbit(n,r),Math.hypot(o,c)>vR){this.animation=this.scheduler.raf(h);return}this.animation=0,this.snapOrbit(n,r)};this.animation=this.scheduler.raf(h)}snapOrbit(e,n){const r=(m,p,x)=>{let g=p[0],v=1/0;for(const y of p){let M=y-m;x&&(M-=Math.round(M/x)*x),Math.abs(M)<Math.abs(v)&&(v=M,g=m+M)}return g},o=r(e,cR,Math.PI*2),c=r(n,uR),f=e,h=n;this.spring(0,1,0,SR,m=>{this.renderer.setOrbit(f+(o-f)*m,h+(c-h)*m)})}spring(e,n,r,{stiffness:o,damping:c,mass:f},h,m){let p=e,x=r,g=this.scheduler.now();const v=()=>{const y=this.scheduler.now(),M=Math.min(.032,Math.max(.001,(y-g)/1e3));g=y;const A=(-o*(p-n)-c*x)/f;if(x+=A*M,p+=x*M,h(p),Math.abs(p-n)>.0015||Math.abs(x)>.02){this.animation=this.scheduler.raf(v);return}h(n),this.animation=0,m?.()};this.animation=this.scheduler.raf(v)}}const zr=a=>10**(a/20);class AR{context=null;enabled=!0;unlock(){if(this.enabled){if(!this.context){const e=window.AudioContext??window.webkitAudioContext;if(!e){this.enabled=!1;return}this.context=new e}this.context.state==="suspended"&&this.context.resume()}}setEnabled(e){this.enabled=e}noiseBuffer(e){const n=this.context;if(!n)return null;const r=Math.max(1,Math.floor(n.sampleRate*e/1e3)),o=n.createBuffer(1,r,n.sampleRate),c=o.getChannelData(0);for(let f=0;f<r;f++)c[f]=Math.random()*2-1;return o}tick(){const e=this.context;if(!e||!this.enabled)return;const n=this.noiseBuffer(8);if(!n)return;const r=e.createBufferSource();r.buffer=n;const o=e.createBiquadFilter();o.type="bandpass",o.frequency.value=3100,o.Q.value=6;const c=e.createGain();c.gain.value=zr(-26),r.connect(o).connect(c).connect(e.destination),r.start()}clack(){const e=this.context;if(!e||!this.enabled)return;const n=e.currentTime,r=1900*(1+(Math.random()-.5)*.18),o=zr((Math.random()-.5)*3),c=e.createGain();c.gain.value=o,c.connect(e.destination);const f=e.createOscillator();f.frequency.value=4200;const h=e.createGain();h.gain.setValueAtTime(zr(-20),n),h.gain.exponentialRampToValueAtTime(1e-4,n+.003),f.connect(h).connect(c),f.start(n),f.stop(n+.004);const m=this.noiseBuffer(18);if(m){const g=e.createBufferSource();g.buffer=m;const v=e.createBiquadFilter();v.type="bandpass",v.frequency.value=r,v.Q.value=1.4;const y=e.createGain();y.gain.setValueAtTime(zr(-14),n),y.gain.exponentialRampToValueAtTime(1e-4,n+.055),g.connect(v).connect(y).connect(c),g.start(n)}const p=e.createOscillator();p.frequency.value=168;const x=e.createGain();x.gain.setValueAtTime(zr(-18),n),x.gain.exponentialRampToValueAtTime(1e-4,n+.04),p.connect(x).connect(c),p.start(n),p.stop(n+.045)}call(e){const n=this.context;if(!(!n||!this.enabled))for(let r=0;r<e;r++){const o=n.currentTime+r*.09,c=n.createOscillator();c.frequency.value=900;const f=n.createGain();f.gain.setValueAtTime(1e-4,o),f.gain.exponentialRampToValueAtTime(zr(-22),o+.006),f.gain.exponentialRampToValueAtTime(1e-4,o+.06),c.connect(f).connect(n.destination),c.start(o),c.stop(o+.07)}}thunk(){const e=this.context;if(!e||!this.enabled)return;const n=e.currentTime,r=e.createOscillator();r.frequency.value=120;const o=e.createBiquadFilter();o.type="lowpass",o.frequency.value=400;const c=e.createGain();c.gain.setValueAtTime(zr(-24),n),c.gain.exponentialRampToValueAtTime(1e-4,n+.045),r.connect(o).connect(c).connect(e.destination),r.start(n),r.stop(n+.05)}}const RR=["M","E","S"];function wR(a){const e=/^([UDFBLRMES])(2|'|)$/.exec(a.trim());if(!e)return null;const n=e[1];if(!aR(n))return null;const r=e[2]==="2"?2:e[2]==="'"?3:1;return{base:n,amount:r}}function Zu(a){const e=a.trim().split(/\s+/).filter(Boolean),n=[];for(const r of e){const o=wR(r);if(!o)throw new Error(`Unparseable move in algorithm: ${JSON.stringify(r)}`);n.push(o)}return n}const Cl=a=>a.base+(a.amount===2?"2":a.amount===3?"'":""),xS=a=>a.map(Cl).join(" "),v_=a=>RR.includes(a.base)?2:1,gS=[{id:"checkerboard",name:"Checkerboard",alg:"M2 E2 S2"},{id:"cube-in-cube",name:"Cube in a Cube",alg:"F L F U' R U F2 L2 U' L' B D' B' L2 U"},{id:"superflip",name:"Superflip",alg:"U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2"}],CR=a=>{const e=gS.find(n=>n.id===a);if(!e)throw new Error(`Unknown pattern: ${a}`);return e},DR=a=>Ku(um(),Zu(CR(a).alg)),LR=(a,e)=>a.pos.every((n,r)=>n===e.pos[r])&&a.rot.every((n,r)=>n===e.rot[r]);function UR(a,e){return a.cubies.every(n=>{const r=e.cubies.find(o=>o.home.every((c,f)=>c===n.home[f]));return!!r&&LR(n,r)})}const Bp=15e3,vS=17e3,NR=2e3;function OR(a){return a>=vS?"dnf":a>=Bp?"plus2":"none"}const _S=a=>Math.floor(a/10)*10,FR=a=>Math.round(a/10)*10;function Il(a){return a.penalty==="dnf"?null:_S(a.rawMs)+(a.penalty==="plus2"?NR:0)}function SS(a,e,n){if(a.length!==e)throw new Error(`Expected ${e} results, got ${a.length}`);if(a.filter(m=>m.penalty==="dnf").length>n)return{kind:"dnf"};const c=[...a.map(Il)].sort((m,p)=>m===null?1:p===null?-1:m-p),f=c.slice(n,c.length-n),h=f.reduce((m,p)=>m+p,0)/f.length;return{kind:"time",ms:FR(h)}}const PR=a=>SS(a,5,1),zR=a=>SS(a,12,1);function __(a,e){return a.length<e?null:a.slice(a.length-e)}function Jr(a){if(a===null)return"DNF";const e=Math.max(0,a),n=Math.floor(e/6e4),r=Math.floor(e%6e4/1e3),o=Math.floor(e%1e3/10),c=String(o).padStart(2,"0");return n===0?`${r}.${c}`:`${n}:${String(r).padStart(2,"0")}.${c}`}const S_=a=>a.kind==="dnf"?"DNF":Jr(a.ms);function y_(a){const e=Jr(_S(a.rawMs));return a.penalty==="dnf"?`DNF (${e})`:a.penalty==="plus2"?`${e} + 2 = ${Jr(Il(a))}`:e}function BR(a){const e=[];for(let n=0;n<3;n++){if(a[n]===0)continue;const r=[0,0,0];r[n]=a[n],e.push(r)}return e}function yS(a,e,n){for(const r of BR(e)){const o=bo.find(c=>Qr[c].every((f,h)=>f===r[h]));if(dm(a,e,r)!==n[o])return!1}return!0}const IR=a=>bo.find(e=>Qr[e].every((n,r)=>n===a[r]));function pm(a,e){return bo.find(n=>a[n]===e)??null}const mm=(()=>{const a=[];for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++)for(let r=-1;r<=1;r++)(e||n||r)&&a.push([e,n,r]);return a})(),GR=a=>a.filter(e=>e!==0).length===1,Qu=a=>Qr[a].findIndex(e=>e!==0),xm=a=>Qr[a][Qu(a)];function HR(a){const e=Qu(a),n=xm(a);return mm.filter(r=>r[e]===n&&r.filter(o=>o!==0).length===2)}function VR(a,e){const n=hm(a),r=pm(n,e);return r?HR(r).every(o=>yS(a,o,n)):!1}function kR(a,e){const n=hm(a),r=pm(n,e);if(!r)return!1;const o=Qu(r),c=xm(r);return mm.filter(f=>f[o]===c||f[o]===0).every(f=>GR(f)||yS(a,f,n))}function XR(a,e){const n=hm(a),r=pm(n,e);if(!r)return!1;const o=Qu(r),c=-xm(r),f=[0,0,0];f[o]=c;const h=f,m=n[IR(h)];return mm.filter(p=>p[o]===c).every(p=>dm(a,p,h)===m)}function Mu(a,e,n){for(let r=Math.max(0,n+1);r<a.length;r++)if(e(a[r]))return r-1;return null}function WR(a,e){if(e.length===0)return{shape:"unrecognised"};const n=[a];for(const c of e)n.push(fm(n[n.length-1],c.move));if(!Pp(n[n.length-1]))return{shape:"unrecognised"};const r=c=>({moveIndex:c,atMs:c<0?0:e[Math.min(c,e.length-1)].atMs});let o=null;for(const c of bo){const f=Mu(n,g=>VR(g,c),-1);if(f===null)continue;const h=Mu(n,g=>kR(g,c),f);if(h===null)continue;const m=Mu(n,g=>XR(g,c),h);if(m===null)continue;const p=Mu(n,Pp,m-1);if(p===null||!(f<h&&h<m&&m<=p))continue;const x={shape:"cfop",crossColor:c,cross:r(f),f2l:r(h),oll:r(m),solved:r(p)};(!o||x.cross.moveIndex<o.cross.moveIndex)&&(o=x)}return o??{shape:"unrecognised"}}function Vh(a){const e=Ku(um(),Zu(a.scramble));return{mode:a.mode,goal:a.goal,scramble:a.scramble,scrambled:e,cube:e,log:[],moveCount:0,hinted:!1,shownHint:null,phase:a.mode==="competition"?{kind:"covered"}:{kind:"ready"}}}function qR(a){return a.goal.kind==="pattern"?UR(a.cube,DR(a.goal.pattern)):Pp(a.cube)}function YR(a,e){return a.phase.kind==="solving"?Math.max(0,e-a.phase.startedAt):a.phase.kind==="finished"?a.phase.result.rawMs:0}function jR(a,e){return a.phase.kind==="inspecting"?Math.max(0,e-a.phase.startedAt):a.phase.kind==="holding"?Math.max(0,e-a.phase.inspectionStartedAt):0}const bS=a=>a.log.length>0&&a.phase.kind==="solving",KR=(a,e)=>Ku(a.scrambled,e.map(n=>n.move));function ZR(a,e,n){if(e.phase.kind!=="solving"||!qR(e))return e;const r=Math.max(0,n-e.phase.startedAt);return{...e,phase:{kind:"finished",result:{rawMs:r,penalty:e.phase.penalty},splits:e.goal.kind==="solved"?WR(e.scrambled,e.log):{shape:"unrecognised"}}}}function QR(a,e){switch(e.type){case"reveal":return a.phase.kind!=="covered"?a:{...a,phase:{kind:"inspecting",startedAt:e.at}};case"holdDown":return a.phase.kind!=="inspecting"?a:{...a,phase:{kind:"holding",inspectionStartedAt:a.phase.startedAt}};case"holdUp":{if(a.phase.kind!=="holding")return a;const n=Math.max(0,e.at-a.phase.inspectionStartedAt);return{...a,phase:{kind:"solving",startedAt:e.at,penalty:OR(n)}}}case"turn":{if(a.phase.kind==="finished"||a.phase.kind==="covered"||a.phase.kind==="inspecting"||a.phase.kind==="holding")return a;const n=a.phase.kind==="ready"?{kind:"solving",startedAt:e.at,penalty:"none"}:a.phase,r=n.kind==="solving"?n.startedAt:e.at,o=[...a.log,{move:e.move,atMs:Math.max(0,e.at-r)}],c={...a,phase:n,log:o,cube:Ku(a.cube,[e.move]),moveCount:a.moveCount+v_(e.move),shownHint:null};return ZR(a,c,e.at)}case"undo":{if(!bS(a))return a;const n=a.log[a.log.length-1],r=a.log.slice(0,-1);return{...a,log:r,cube:KR(a,r),moveCount:Math.max(0,a.moveCount-v_(n.move)),shownHint:null}}case"hintShown":return a.phase.kind==="finished"?a:{...a,hinted:!0,shownHint:e.move}}}const JR="modulepreload",$R=function(a){return"/"+a},b_={},wn=function(e,n,r){let o=Promise.resolve();if(n&&n.length>0){let f=function(p){return Promise.all(p.map(x=>Promise.resolve(x).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const h=document.querySelector("meta[property=csp-nonce]"),m=h?.nonce||h?.getAttribute("nonce");o=f(n.map(p=>{if(p=$R(p),p in b_)return;b_[p]=!0;const x=p.endsWith(".css"),g=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${g}`))return;const v=document.createElement("link");if(v.rel=x?"stylesheet":JR,x||(v.as="script"),v.crossOrigin="",v.href=p,m&&v.setAttribute("nonce",m),document.head.appendChild(v),x)return new Promise((y,M)=>{v.addEventListener("load",y),v.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${p}`)))})}))}function c(f){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=f,window.dispatchEvent(h),!h.defaultPrevented)throw f}return o.then(f=>{for(const h of f||[])h.status==="rejected"&&c(h.reason);return e().catch(c)})};var MS=class{is(a){return this instanceof a}as(a){return this instanceof a?this:null}},dr=class extends MS{constructor(){super()}get log(){return console.log.bind(console,this,this.toString())}};function ew(a,e=!0){if(!e)return a;switch(a){case 1:return-1;case-1:return 1}}function tw(a,e){return e===-1?Array.from(a).reverse():a}function nw(a){return Array.from(a).reverse()}var oi=class Ip extends dr{#e;#t;constructor(e,n){super(),this.#e=Gl(e),this.#t=Gl(n)}get A(){return this.#e}get B(){return this.#t}isIdentical(e){const n=e.as(Ip);return!!(n?.A.isIdentical(this.A)&&n?.B.isIdentical(this.B))}invert(){return new Ip(this.#t,this.#e)}*experimentalExpand(e=1,n){n??=1/0,n===0?yield e===1?this:this.invert():e===1?(yield*this.A.experimentalExpand(1,n-1),yield*this.B.experimentalExpand(1,n-1),yield*this.A.experimentalExpand(-1,n-1),yield*this.B.experimentalExpand(-1,n-1)):(yield*this.B.experimentalExpand(1,n-1),yield*this.A.experimentalExpand(1,n-1),yield*this.B.experimentalExpand(-1,n-1),yield*this.A.experimentalExpand(-1,n-1))}toString(e){return`[${this.#e.toString(e)}, ${this.#t.toString(e)}]`}},li=class Gp extends dr{#e;#t;constructor(e,n){super(),this.#e=Gl(e),this.#t=Gl(n)}get A(){return this.#e}get B(){return this.#t}isIdentical(e){const n=e.as(Gp);return!!(n?.A.isIdentical(this.A)&&n?.B.isIdentical(this.B))}invert(){return new Gp(this.#e,this.#t.invert())}*experimentalExpand(e,n){n??=1/0,n===0?yield e===1?this:this.invert():(yield*this.A.experimentalExpand(1,n-1),yield*this.B.experimentalExpand(e,n-1),yield*this.A.experimentalExpand(-1,n-1))}toString(e){return`[${this.A.toString(e)}: ${this.B.toString(e)}]`}},Hp=2147483647,Vp="2^31 - 1",iw=-2147483648,ES=class{#e=[];push(a){this.#e.push(a)}experimentalPushAlg(a){for(const e of a.childAlgNodes())this.push(e)}experimentalNumAlgNodes(){return this.#e.length}toAlg(){return new Ye(this.#e)}reset(){this.#e=[]}},Wl=class TS extends dr{#e;constructor(e){if(super(),e.includes(`
`)||e.includes("\r"))throw new Error("LineComment cannot contain newline");this.#e=e}get text(){return this.#e}isIdentical(e){const n=e;return e.is(TS)&&this.#e===n.#e}invert(){return this}*experimentalExpand(e=1,n=1/0){yield this}toString(e){return`//${this.#e}`}},Yr=class AS extends dr{toString(e){return`
`}isIdentical(e){return e.is(AS)}invert(){return this}*experimentalExpand(e=1,n=1/0){yield this}},fi=class RS extends dr{experimentalNISSGrouping;toString(e){return"."}isIdentical(e){return e.is(RS)}invert(){return this}*experimentalExpand(e=1,n=1/0){yield this}};function Eu(a,e){return a?parseInt(a,10):e}var M_=/^(\d+)?('?)/,aw=/^[_\dA-Za-z]/,rw=/^((([1-9]\d*)-)?([1-9]\d*))?([_A-Za-z]+)/,sw=/^[^\n]*/,ow=/^(-?\d+), ?/,lw=/^(-?\d+)\)/;function wS(a){return new gm().parseAlg(a)}function cw(a){return new gm().parseMove(a)}function uw(a){return new gm().parseQuantumMove(a)}var Dl=Symbol("startCharIndex"),Ll=Symbol("endCharIndex");function An(a,e,n){const r=a;return r[Dl]=e,r[Ll]=n,r}function fw(a,e){return Dl in a&&(e[Dl]=a[Dl]),Ll in a&&(e[Ll]=a[Ll]),e}var gm=class{#e="";#t=0;#n=[];parseAlg(a){this.#e=a,this.#t=0;const e=this.parseAlgWithStopping([]);this.mustBeAtEndOfInput();const n=Array.from(e.childAlgNodes());if(this.#n.length>0)for(const f of this.#n.reverse())n.push(f);const r=new Ye(n),{[Dl]:o,[Ll]:c}=e;return An(r,o,c),r}parseMove(a){this.#e=a,this.#t=0;const e=this.parseMoveImpl();return this.mustBeAtEndOfInput(),e}parseQuantumMove(a){this.#e=a,this.#t=0;const e=this.parseQuantumMoveImpl();return this.mustBeAtEndOfInput(),e}mustBeAtEndOfInput(){if(this.#t!==this.#e.length)throw new Error("parsing unexpectedly ended early")}parseAlgWithStopping(a){let e=this.#t,n=this.#t;const r=new ES;let o=!1;const c=f=>{if(o)throw new Error(`Unexpected character at index ${f}. Are you missing a space?`)};for(;this.#t<this.#e.length;){const f=this.#t;if(a.includes(this.#e[this.#t]))return An(r.toAlg(),e,n);if(this.tryConsumeNext(" "))o=!1,r.experimentalNumAlgNodes()===0&&(e=this.#t);else if(aw.test(this.#e[this.#t])){c(f);const h=this.parseMoveImpl();r.push(h),o=!0,n=this.#t}else if(this.tryConsumeNext("(")){c(f);const h=this.tryRegex(ow);if(h){const m=h[1],p=this.#t,x=this.parseRegex(lw),g=An(new X(new Ta("U_SQ_"),parseInt(m,10)),f+1,f+1+m.length),v=An(new X(new Ta("D_SQ_"),parseInt(x[1],10)),p,this.#t-1),y=An(new Ye([g,v]),f+1,this.#t-1);r.push(An(new Oi(y),f,this.#t)),o=!0,n=this.#t}else{const m=this.parseAlgWithStopping([")"]);this.mustConsumeNext(")");const p=this.parseAmount();r.push(An(new Oi(m,p),f,this.#t)),o=!0,n=this.#t}}else if(this.tryConsumeNext("^")){this.mustConsumeNext("(");const h=this.parseAlgWithStopping([")"]);this.popNext();const m=new Oi(h,-1),p=new fi;m.experimentalNISSPlaceholder=p,p.experimentalNISSGrouping=m,this.#n.push(m),r.push(p)}else if(this.tryConsumeNext("[")){c(f);const h=this.parseAlgWithStopping([",",":"]),m=this.popNext(),p=this.parseAlgWithStopping(["]"]);this.mustConsumeNext("]");let x;switch(m){case":":{x=An(new li(h,p),f,this.#t),o=!0,n=this.#t;break}case",":{x=An(new oi(h,p),f,this.#t),o=!0,n=this.#t;break}default:throw new Error("unexpected parsing error")}const g=this.#t,v=this.parseAmount();if(v===1)r.push(x);else{const y=An(new Ye([x]),f,g),M=An(new Oi(y,v),f,this.#t);r.push(M)}o=!0,n=this.#t}else if(this.tryConsumeNext(`
`))r.push(An(new Yr,f,this.#t)),o=!1,n=this.#t;else if(this.tryConsumeNext("/"))if(this.tryConsumeNext("/")){c(f);const[h]=this.parseRegex(sw);r.push(An(new Wl(h),f,this.#t)),o=!1,n=this.#t}else r.push(An(new X("_SLASH_"),f,this.#t)),o=!0,n=this.#t;else if(this.tryConsumeNext("."))c(f),r.push(An(new fi,f,this.#t)),o=!0,n=this.#t;else throw new Error(`Unexpected character: ${this.popNext()}`)}if(this.#t!==this.#e.length)throw new Error("did not finish parsing?");if(a.length>0)throw new Error("expected stopping");return An(r.toAlg(),e,n)}parseQuantumMoveImpl(){const[,,,a,e,n]=this.parseRegex(rw);return new Ta(n,Eu(e,void 0),Eu(a,void 0))}parseMoveImpl(){const a=this.#t;if(this.tryConsumeNext("/"))return An(new X("_SLASH_"),a,this.#t);let e=this.parseQuantumMoveImpl(),[n,r]=this.parseAmountAndTrackEmptyAbsAmount();const o=this.parseMoveSuffix();if(o){if(n<0)throw new Error("uh-oh");if((o==="++"||o==="--")&&n!==1)throw new Error("Pochmann ++ or -- moves cannot have an amount other than 1.");if((o==="++"||o==="--")&&!r)throw new Error("Pochmann ++ or -- moves cannot have an amount written as a number.");if((o==="+"||o==="-")&&r)throw new Error("Clock dial moves must have an amount written as a natural number followed by + or -.");o.startsWith("+")&&(e=e.modified({family:`${e.family}_${o==="+"?"PLUS":"PLUSPLUS"}_`})),o.startsWith("-")&&(e=e.modified({family:`${e.family}_${o==="-"?"PLUS":"PLUSPLUS"}_`}),n*=-1)}return An(new X(e,n),a,this.#t)}parseMoveSuffix(){return this.tryConsumeNext("+")?this.tryConsumeNext("+")?"++":"+":this.tryConsumeNext("-")?this.tryConsumeNext("-")?"--":"-":null}parseAmountAndTrackEmptyAbsAmount(){const a=this.#t,[,e,n]=this.parseRegex(M_);if(e?.startsWith("0")&&e!=="0")throw new Error(`Error at char index ${a}: An amount can only start with 0 if it's exactly the digit 0.`);return[Eu(e,1)*(n==="'"?-1:1),!e]}parseAmount(){const a=this.#t,[,e,n]=this.parseRegex(M_);if(e?.startsWith("0")&&e!=="0")throw new Error(`Error at char index ${a}: An amount number can only start with 0 if it's exactly the digit 0.`);return Eu(e,1)*(n==="'"?-1:1)}parseRegex(a){const e=a.exec(this.remaining());if(e===null)throw new Error("internal parsing error");return this.#t+=e[0].length,e}tryRegex(a){const e=a.exec(this.remaining());return e===null?null:(this.#t+=e[0].length,e)}remaining(){return this.#e.slice(this.#t)}popNext(){const a=this.#e[this.#t];return this.#t++,a}tryConsumeNext(a){return this.#e[this.#t]===a?(this.#t++,!0):!1}mustConsumeNext(a){const e=this.popNext();if(e!==a)throw new Error(`expected \`${a}\` while parsing, encountered ${e}`);return e}},E_=new Set;function CS(a){E_.has(a)||(console.warn(a),E_.add(a))}var kp=class{quantum;amount;constructor(a,e=1){if(this.quantum=a,this.amount=e,!Number.isInteger(this.amount)||this.amount<iw||this.amount>Hp)throw new Error(`AlgNode amount absolute value must be a non-negative integer below ${Vp}.`)}suffix(){let a="";const e=Math.abs(this.amount);return e!==1&&(a+=e),this.amount<0&&(a+="'"),a}isIdentical(a){return this.quantum.isIdentical(a.quantum)&&this.amount===a.amount}*experimentalExpand(a,e){const n=Math.abs(this.amount),r=ew(a,this.amount<0);for(let o=0;o<n;o++)yield*this.quantum.experimentalExpand(r,e)}},Ta=class Xp extends MS{#e;#t;#n;constructor(e,n,r){if(super(),this.#e=e,this.#t=n??null,this.#n=r??null,Object.freeze(this),this.#t!==null&&(!Number.isInteger(this.#t)||this.#t<1||this.#t>Hp))throw new Error(`QuantumMove inner layer must be a positive integer below ${Vp}.`);if(this.#n!==null&&(!Number.isInteger(this.#n)||this.#n<1||this.#n>Hp))throw new Error(`QuantumMove outer layer must be a positive integer below ${Vp}.`);if(this.#n!==null&&this.#t!==null&&this.#t<=this.#n)throw new Error("QuantumMove outer layer must be smaller than inner layer.");if(this.#n!==null&&this.#t===null)throw new Error("QuantumMove with an outer layer must have an inner layer")}static fromString(e){return uw(e)}modified(e){return new Xp(e.family??this.#e,e.innerLayer??this.#t,e.outerLayer??this.#n)}isIdentical(e){const n=e;return e.is(Xp)&&this.#e===n.#e&&this.#t===n.#t&&this.#n===n.#n}get family(){return this.#e}get outerLayer(){return this.#n}get innerLayer(){return this.#t}experimentalExpand(){throw new Error("experimentalExpand() cannot be called on a `QuantumMove` directly.")}toString(e){let n=this.#e;return this.#t!==null&&(n=String(this.#t)+n,this.#n!==null&&(n=`${String(this.#n)}-${n}`)),n}},X=class Js extends dr{#e;constructor(...e){if(super(),typeof e[0]=="string")if(e[1]??null){this.#e=new kp(Ta.fromString(e[0]),e[1]);return}else return Js.fromString(e[0]);this.#e=new kp(e[0],e[1])}isIdentical(e){const n=e.as(Js);return!!n&&this.#e.isIdentical(n.#e)}invert(){return fw(this,new Js(this.#e.quantum,this.#n()?this.amount:-this.amount))}*experimentalExpand(e=1){e===1?yield this:yield this.modified({amount:-this.amount})}get quantum(){return this.#e.quantum}modified(e){return new Js(this.#e.quantum.modified(e),e.amount??this.amount)}static fromString(e){return cw(e)}get amount(){return this.#e.amount}get type(){return CS("deprecated: type"),"blockMove"}get family(){return this.#e.quantum.family??void 0}get outerLayer(){return this.#e.quantum.outerLayer??void 0}get innerLayer(){return this.#e.quantum.innerLayer??void 0}#t;#n(){return this.isIdentical(this.#t??=new Js("_SLASH_"))}toString(e){if(e?.notation!=="LGN"){if(this.#n())return"/";if(this.family.endsWith("_PLUS_"))return this.#e.quantum.toString().slice(0,-6)+Math.abs(this.amount)+(this.amount<0?"-":"+");if(this.family.endsWith("_PLUSPLUS_")){const n=Math.abs(this.amount);return this.#e.quantum.toString().slice(0,-10)+(n===1?"":n)+(this.amount<0?"--":"++")}}return this.#e.quantum.toString(e)+this.#e.suffix()}},dw=class{quantumU_SQ_=null;quantumD_SQ_=null;format(a,e){if(e?.notation==="LGN"||a.amount!==1)return null;const n=this.tuple(a);return n?`(${n.map(r=>r.amount).join(", ")})`:null}tuple(a){if(a.amount!==1)return null;this.quantumU_SQ_||=new Ta("U_SQ_"),this.quantumD_SQ_||=new Ta("D_SQ_");const e=a.alg;if(e.experimentalNumChildAlgNodes()===2){const[n,r]=e.childAlgNodes();if(n.as(X)?.quantum.isIdentical(this.quantumU_SQ_)&&r.as(X)?.quantum.isIdentical(this.quantumD_SQ_))return[n,r]}return null}},kh=new dw,Oi=class Al extends dr{#e;experimentalNISSPlaceholder;constructor(e,n){super();const r=Gl(e);this.#e=new kp(r,n)}isIdentical(e){const n=e;return e.is(Al)&&this.#e.isIdentical(n.#e)}get alg(){return this.#e.quantum}get amount(){return this.#e.amount}modified(e){return new Al(e.alg??this.alg,e.amount??this.amount)}get experimentalRepetitionSuffix(){return this.#e.suffix()}invert(){const e=kh.tuple(this);if(e){const[n,r]=e;return new Al(new Ye([n.invert(),r.invert()]))}return new Al(this.#e.quantum,-this.#e.amount)}*experimentalExpand(e=1,n){n??=1/0,n===0?yield e===1?this:this.invert():yield*this.#e.experimentalExpand(e,n-1)}static fromString(){throw new Error("unimplemented")}#t(e){const n=this.#e.quantum.toString(e),r=this.alg.childAlgNodes(),{value:o}=r.next();return r.next().done&&(o?.is(oi)||o?.is(li))?n:`(${n})`}toString(e){return kh.format(this,e)??`${this.#t(e)}${this.#e.suffix()}`}experimentalAsSquare1Tuple(){return kh.tuple(this)}};function _a(a,e){return a instanceof e}function hw(a){return _a(a,Oi)||_a(a,Wl)||_a(a,oi)||_a(a,li)||_a(a,X)||_a(a,Yr)||_a(a,fi)}var pw="any-direction",DS=class{constructor(a={}){this.config=a}config;cancelQuantum(){const{cancel:a}=this.config;return a===!0?pw:a===!1?"none":a?.directional??"none"}cancelAny(){return this.config.cancel&&this.cancelQuantum()!=="none"}cancelPuzzleSpecificModWrap(){const{cancel:a}=this.config;return a===!0||a===!1?"canonical-centered":a?.puzzleSpecificModWrap?a?.puzzleSpecificModWrap:a?.directional==="same-direction"?"preserve-sign":"canonical-centered"}puzzleSpecificSimplifyOptions(){return this.config.puzzleLoader?.puzzleSpecificSimplifyOptions??this.config.puzzleSpecificSimplifyOptions}};function mw(a,e){return a*Math.sign(e.amount)>=0}function xw(a,e,n=0){return((a-n)%e+e)%e+n}function gw(a,e,n){const r=new DS(n),o=Array.from(a.childAlgNodes());let c=[e];function f(){return new Ye([...o,...c])}function h(m){if(r.cancelPuzzleSpecificModWrap()==="none")return m;const p=r.puzzleSpecificSimplifyOptions()?.quantumMoveOrder;if(!p)return m;const x=p(e.quantum);let g;switch(r.cancelPuzzleSpecificModWrap()){case"gravity":{g=-Math.floor((x-(m.amount<0?0:1))/2);break}case"canonical-centered":{g=-Math.floor((x-1)/2);break}case"canonical-positive":{g=0;break}case"preserve-sign":{g=m.amount<0?1-x:0;break}default:throw new Error("Unknown mod wrap")}const v=xw(m.amount,x,g);return m.modified({amount:v})}if(r.cancelAny()){let m;const p=r.puzzleSpecificSimplifyOptions()?.axis;if(p)m=M=>p.areQuantumMovesSameAxis(e.quantum,M.quantum);else{const M=e.quantum.toString();m=A=>A.quantum.toString()===M}const x=r.cancelQuantum()==="same-direction",g=new Map;g.set(e.quantum.toString(),Math.sign(e.amount));let v;for(v=o.length-1;v>=0;v--){const M=o[v].as(X);if(!M||!m(M))break;const A=M.quantum.toString();if(x){const b=g.get(A);if(b&&!mw(b,M))break;g.set(A,Math.sign(M.amount))}}const y=[...o.splice(v+1),e];if(p)c=p.simplifySameAxisMoves(y,r.cancelPuzzleSpecificModWrap()!=="none");else{const M=y.reduce((A,b)=>A+b.amount,0);if(g.size!==1)throw new Error("Internal error: multiple quantums when one was expected");c=[new X(e.quantum,M)]}}return c=c.map(m=>h(m)).filter(m=>m.amount!==0),f()}function vw(a,e,n){const r=e.as(X);return r?gw(a,r,n):new Ye([...a.childAlgNodes(),e])}function LS(a,e,n){if(e.is(Oi))return a.traverseGrouping(e,n);if(e.is(X))return a.traverseMove(e,n);if(e.is(oi))return a.traverseCommutator(e,n);if(e.is(li))return a.traverseConjugate(e,n);if(e.is(fi))return a.traversePause(e,n);if(e.is(Yr))return a.traverseNewline(e,n);if(e.is(Wl))return a.traverseLineComment(e,n);throw new Error("unknown AlgNode")}function US(a){if(a.is(Oi)||a.is(X)||a.is(oi)||a.is(li)||a.is(fi)||a.is(Yr)||a.is(Wl))return a;throw new Error("internal error: expected AlgNode")}var Ju=class{traverseAlgNode(a,e){return LS(this,a,e)}traverseIntoAlgNode(a,e){return US(this.traverseAlgNode(a,e))}},UD=class extends Ju{traverseAlgNode(a){return LS(this,a,void 0)}traverseIntoAlgNode(a){return US(this.traverseAlgNode(a))}};function vm(a,e){const n=new a(...e??[]);return n.traverseAlg.bind(n)}var _w=class extends Ju{#e;#t(){return this.#e??=new Map}#n(a){return{...a,depth:a.depth?a.depth-1:null}}*traverseAlg(a,e){if(e.depth===0){yield*a.childAlgNodes();return}let n=[];const r=this.#n(e);for(const o of a.childAlgNodes())for(const c of this.traverseAlgNode(o,r))n=Array.from(vw(new Ye(n),c,r).childAlgNodes());for(const o of n)yield o}*traverseGrouping(a,e){if(e.depth===0){yield a;return}if(a.amount===0)return;const n=new Oi(this.traverseAlg(a.alg,this.#n(e)),a.amount);if(n.alg.experimentalIsEmpty())return;const r=this.#t().get(a);r&&(n.experimentalNISSPlaceholder=r,r.experimentalNISSGrouping=n),yield n}*traverseMove(a,e){yield a}#i(a,e,n){if(a.experimentalNumChildAlgNodes()===1&&e.experimentalNumChildAlgNodes()===1){const r=Array.from(a.childAlgNodes())[0]?.as(X),o=Array.from(e.childAlgNodes())[0]?.as(X);if(!(r&&o))return!1;if(o.quantum.isIdentical(r.quantum)||new DS(n).puzzleSpecificSimplifyOptions()?.axis?.areQuantumMovesSameAxis(r.quantum,o.quantum))return!0}return!1}*traverseCommutator(a,e){if(e.depth===0){yield a;return}const n=this.#n(e),r=new oi(this.traverseAlg(a.A,n),this.traverseAlg(a.B,n));r.A.experimentalIsEmpty()||r.B.experimentalIsEmpty()||r.A.isIdentical(r.B)||r.A.isIdentical(r.B.invert())||this.#i(r.A,r.B,e)||(yield r)}*traverseConjugate(a,e){if(e.depth===0){yield a;return}const n=this.#n(e),r=new li(this.traverseAlg(a.A,n),this.traverseAlg(a.B,n));if(!r.B.experimentalIsEmpty()){if(r.A.experimentalIsEmpty()||r.A.isIdentical(r.B)||r.A.isIdentical(r.B.invert())||this.#i(r.A,r.B,e)){yield*a.B.childAlgNodes();return}yield r}}*traversePause(a,e){if(a.experimentalNISSGrouping){const n=new fi;this.#t().set(a.experimentalNISSGrouping,n),yield n}else yield a}*traverseNewline(a,e){yield a}*traverseLineComment(a,e){yield a}},Sw=vm(_w);function T_(a){if(!a)return[];if(_a(a,Ye))return a.childAlgNodes();if(typeof a=="string")return wS(a).childAlgNodes();const e=a;if(typeof e[Symbol.iterator]=="function")return e;throw new Error("Invalid AlgNode")}function Gl(a){return _a(a,Ye)?a:new Ye(a)}var Ye=class $s extends dr{#e;constructor(e){super(),this.#e=Array.from(T_(e));for(const n of this.#e)if(!hw(n))throw new Error("An alg can only contain alg nodes.")}isIdentical(e){const n=e;if(!e.is($s))return!1;const r=Array.from(this.#e),o=Array.from(n.#e);if(r.length!==o.length)return!1;for(let c=0;c<r.length;c++)if(!r[c].isIdentical(o[c]))return!1;return!0}invert(){return new $s(nw(Array.from(this.#e).map(e=>e.invert())))}*experimentalExpand(e=1,n){n??=1/0;for(const r of tw(this.#e,e))yield*r.experimentalExpand(e,n)}expand(e){return new $s(this.experimentalExpand(1,e?.depth??1/0))}*experimentalLeafMoves(){for(const e of this.experimentalExpand())e.is(X)&&(yield e)}concat(e){return new $s(Array.from(this.#e).concat(Array.from(T_(e))))}experimentalIsEmpty(){for(const e of this.#e)return!1;return!0}static fromString(e){return wS(e)}units(){return this.childAlgNodes()}*childAlgNodes(){for(const e of this.#e)yield e}experimentalNumUnits(){return this.experimentalNumChildAlgNodes()}experimentalNumChildAlgNodes(){return Array.from(this.#e).length}get type(){return CS("deprecated: type"),"sequence"}toString(e){let n="",r=null;for(const o of this.#e){r&&(n+=yw(r,o));const c=o.as(fi)?.experimentalNISSGrouping;if(c){if(c.amount!==-1)throw new Error("Invalid NISS Grouping amount!");n+=`^(${c.alg.toString(e)})`}else o.as(Oi)?.experimentalNISSPlaceholder||(n+=o.toString(e));r=o}return n}experimentalSimplify(e){return new $s(Sw(this,e??{}))}simplify(e){return this.experimentalSimplify(e)}};function yw(a,e){return a.is(Yr)||e.is(Yr)||e.as(Oi)?.experimentalNISSPlaceholder?"":a.is(Wl)&&!e.is(Yr)?`
`:" "}new Ye([new X("R",1),new X("U",1),new X("R",-1),new X("U",1),new X("R",1),new X("U",-2),new X("R",-1)]),new Ye([new X("R",1),new X("U",2),new X("R",-1),new X("U",-1),new X("R",1),new X("U",-1),new X("R",-1)]),new Ye([new oi(new Ye([new X("R",1),new X("U",1),new X("R",-2)]),new Ye([new li(new Ye([new X("R",1)]),new Ye([new X("U",1)]))]))]),new Ye([new X("R",1),new X("U",-1),new X("L",-1),new X("U",1),new X("R",-1),new X("U",-1),new X("L",1),new X("U",1)]),new Ye([new X("x",-1),new oi(new Ye([new li(new Ye([new X("R",1)]),new Ye([new X("U",-1)]))]),new Ye([new X("D",1)])),new oi(new Ye([new li(new Ye([new X("R",1)]),new Ye([new X("U",1)]))]),new Ye([new X("D",1)])),new X("x",1)]),new Ye([new li(new Ye([new X("F",1)]),new Ye([new oi(new Ye([new X("U",1)]),new Ye([new X("R",1)]))]))]),new Ye([new li(new Ye([new X("R",2)]),new Ye([new oi(new Ye([new X("F",2)]),new Ye([new X("R",-1),new X("B",-1),new X("R",1)]))]))]),new Ye([new X("F",1),new X("U",1),new X("R",1),new X("U",-1),new X("R",-1),new X("F",-1)]),new Ye([new X("R",1),new X("U",1),new X("R",-1),new X("U",-1),new X("R",-1),new X("F",1),new X("R",2),new X("U",-1),new X("R",-1),new X("U",-1),new X("R",1),new X("U",1),new X("R",-1),new X("F",-1)]),new Ye([new li(new Ye([new X("F",1)]),new Ye([new Oi(new Ye([new oi(new Ye([new X("R",1)]),new Ye([new X("U",1)]))]),3)]))]),new Ye([new fi,new fi,new fi]);function Wp(a,e,n){const r={};for(const o of a.orbits){const c=e[o.orbitName],f=n[o.orbitName];if(Gu(o.numOrientations,f))r[o.orbitName]=c;else if(Gu(o.numOrientations,c))r[o.orbitName]=f;else{const h=new Array(o.numPieces);if(o.numOrientations===1){for(let m=0;m<o.numPieces;m++)h[m]=c.permutation[f.permutation[m]];r[o.orbitName]={permutation:h,orientationDelta:c.orientationDelta}}else{const m=new Array(o.numPieces);for(let p=0;p<o.numPieces;p++)m[p]=(c.orientationDelta[f.permutation[p]]+f.orientationDelta[p])%o.numOrientations,h[p]=c.permutation[f.permutation[p]];r[o.orbitName]={permutation:h,orientationDelta:m}}}}return r}function A_(a,e,n){const r={};for(const o of a.orbits){const c=e[o.orbitName],f=n[o.orbitName];if(Gu(o.numOrientations,f))r[o.orbitName]=c;else{const h=new Array(o.numPieces);if(o.numOrientations===1){for(let p=0;p<o.numPieces;p++)h[p]=c.pieces[f.permutation[p]];const m={pieces:h,orientation:c.orientation};r[o.orbitName]=m}else{const m=new Array(o.numPieces),p=c.orientationMod?new Array(o.numPieces):void 0;for(let g=0;g<o.numPieces;g++){const v=f.permutation[g];let y=o.numOrientations;if(c.orientationMod){const M=c.orientationMod[v];p[g]=M,y=M||o.numOrientations}m[g]=(c.orientation[v]+f.orientationDelta[g])%y,h[g]=c.pieces[v]}const x={pieces:h,orientation:m};p&&(x.orientationMod=p),r[o.orbitName]=x}}}return r}var R_=new Map;function bw(a){const e=R_.get(a);if(e)return e;const n=new Array(a),r=new Array(a);for(let c=0;c<a;c++)n[c]=c,r[c]=0;const o={permutation:n,orientationDelta:r};return R_.set(a,o),o}function Mw(a){const e={};for(const n of a.orbits)e[n.orbitName]=bw(n.numPieces);return e}function Ew(a,e){function n(o,c){const f=o.toString(),h=a.definition.moves[f];if(h)return mo(a,h,c);const m=a.definition.derivedMoves?.[f];if(m)return mo(a,a.algToTransformation(m).transformationData,c)}const r=n(e.quantum,e.amount)??n(e,1)??n(e.invert,-1);if(r)return r;throw new Error(`Invalid move for KPuzzle (${a.name()}): ${e}`)}var ao=class Gr{constructor(e,n){this.kpuzzle=e,this.transformationData=n}kpuzzle;transformationData;toJSON(){return{experimentalPuzzleName:this.kpuzzle.name(),transformationData:this.transformationData}}invert(){return new Gr(this.kpuzzle,NS(this.kpuzzle,this.transformationData))}#e;isIdentityTransformation(){return this.#e??=this.isIdentical(this.kpuzzle.identityTransformation())}static experimentalConstructIdentity(e){const n=new Gr(e,Mw(e.definition));return n.#e=!0,n}isIdentical(e){return Aw(this.kpuzzle,this.transformationData,e.transformationData)}apply(e){return this.applyTransformation(this.kpuzzle.toTransformation(e))}applyTransformation(e){if(this.kpuzzle!==e.kpuzzle)throw new Error(`Tried to apply a transformation for a KPuzzle (${e.kpuzzle.name()}) to a different KPuzzle (${this.kpuzzle.name()}).`);return this.#e?new Gr(this.kpuzzle,e.transformationData):e.#e?new Gr(this.kpuzzle,this.transformationData):new Gr(this.kpuzzle,Wp(this.kpuzzle.definition,this.transformationData,e.transformationData))}applyMove(e){return this.applyTransformation(this.kpuzzle.moveToTransformation(e))}applyAlg(e){return this.applyTransformation(this.kpuzzle.algToTransformation(e))}toKPattern(){return Hl.fromTransformation(this)}repetitionOrder(){return Lw(this.kpuzzle.definition,this)}selfMultiply(e){return new Gr(this.kpuzzle,mo(this.kpuzzle,this.transformationData,e))}};function Gu(a,e){e.permutation||console.log(e);const{permutation:n}=e,r=n.length;for(let o=0;o<r;o++)if(n[o]!==o)return!1;if(a>1){const{orientationDelta:o}=e;for(let c=0;c<r;c++)if(o[c]!==0)return!1}return!0}function Tw(a,e,n,r={}){for(let o=0;o<a.numPieces;o++)if(!r?.ignorePieceOrientations&&e.orientationDelta[o]!==n.orientationDelta[o]||!r?.ignorePiecePermutation&&e.permutation[o]!==n.permutation[o])return!1;return!0}function Aw(a,e,n){for(const r of a.definition.orbits)if(!Tw(r,e[r.orbitName],n[r.orbitName]))return!1;return!0}function Rw(a,e,n,r={}){for(let o=0;o<a.numPieces;o++)if(!r?.ignorePieceOrientations&&(e.orientation[o]!==n.orientation[o]||(e.orientationMod?.[o]??0)!==(n.orientationMod?.[o]??0))||!r?.ignorePieceIndices&&e.pieces[o]!==n.pieces[o])return!1;return!0}function ww(a,e,n){for(const r of a.definition.orbits)if(!Rw(r,e[r.orbitName],n[r.orbitName]))return!1;return!0}function NS(a,e){const n={};for(const r of a.definition.orbits){const o=e[r.orbitName];if(Gu(r.numOrientations,o))n[r.orbitName]=o;else if(r.numOrientations===1){const c=new Array(r.numPieces);for(let f=0;f<r.numPieces;f++)c[o.permutation[f]]=f;n[r.orbitName]={permutation:c,orientationDelta:o.orientationDelta}}else{const c=new Array(r.numPieces),f=new Array(r.numPieces);for(let h=0;h<r.numPieces;h++){const m=o.permutation[h];c[m]=h,f[m]=(r.numOrientations-o.orientationDelta[h]+r.numOrientations)%r.numOrientations}n[r.orbitName]={permutation:c,orientationDelta:f}}}return n}function mo(a,e,n){if(n===1)return e;if(n<0)return mo(a,NS(a,e),-n);if(n===0){const{transformationData:c}=a.identityTransformation();return c}let r=e;n!==2&&(r=mo(a,e,Math.floor(n/2)));const o=Wp(a.definition,r,r);return n%2===0?o:Wp(a.definition,e,o)}var Cw=class extends Ju{traverseAlg(a,e){let n=null;for(const r of a.childAlgNodes())n?n=n.applyTransformation(this.traverseAlgNode(r,e)):n=this.traverseAlgNode(r,e);return n??e.identityTransformation()}traverseGrouping(a,e){const n=this.traverseAlg(a.alg,e);return new ao(e,mo(e,n.transformationData,a.amount))}traverseMove(a,e){return e.moveToTransformation(a)}traverseCommutator(a,e){const n=this.traverseAlg(a.A,e),r=this.traverseAlg(a.B,e);return n.applyTransformation(r).applyTransformation(n.invert()).applyTransformation(r.invert())}traverseConjugate(a,e){const n=this.traverseAlg(a.A,e),r=this.traverseAlg(a.B,e);return n.applyTransformation(r).applyTransformation(n.invert())}traversePause(a,e){return e.identityTransformation()}traverseNewline(a,e){return e.identityTransformation()}traverseLineComment(a,e){return e.identityTransformation()}},Dw=vm(Cw);function qp(a,e){return e?qp(e,a%e):a}function Lw(a,e){let n=1;for(const r of a.orbits){const o=e.transformationData[r.orbitName],c=new Array(r.numPieces);for(let f=0;f<r.numPieces;f++)if(!c[f]){let h=f,m=0,p=0;for(;c[h]=!0,m=m+o.orientationDelta[h],p=p+1,h=o.permutation[h],h!==f;);m!==0&&(p=p*r.numOrientations/qp(r.numOrientations,Math.abs(m))),n=n*p/qp(n,p)}}return n}var Hl=class Uu{constructor(e,n){this.kpuzzle=e,this.patternData=n}kpuzzle;patternData;toJSON(){return{experimentalPuzzleName:this.kpuzzle.name(),patternData:this.patternData}}static fromTransformation(e){const n=A_(e.kpuzzle.definition,e.kpuzzle.definition.defaultPattern,e.transformationData);return new Uu(e.kpuzzle,n)}apply(e){return this.applyTransformation(this.kpuzzle.toTransformation(e))}applyTransformation(e){if(e.isIdentityTransformation())return new Uu(this.kpuzzle,this.patternData);const n=A_(this.kpuzzle.definition,this.patternData,e.transformationData);return new Uu(this.kpuzzle,n)}applyMove(e){return this.applyTransformation(this.kpuzzle.moveToTransformation(e))}applyAlg(e){return this.applyTransformation(this.kpuzzle.algToTransformation(e))}isIdentical(e){return ww(this.kpuzzle,this.patternData,e.patternData)}experimentalToTransformation(){if(!this.kpuzzle.canConvertDefaultPatternToUniqueTransformation())return null;const e={};for(const[n,r]of Object.entries(this.patternData)){const o={permutation:r.pieces,orientationDelta:r.orientation};e[n]=o}return new ao(this.kpuzzle,e)}experimentalIsSolved(e){if(!this.kpuzzle.definition.experimentalIsPatternSolved)throw new Error("`KPattern.experimentalIsPatternSolved()` is not supported for this puzzle at the moment.");return this.kpuzzle.definition.experimentalIsPatternSolved(this,e)}},_m=class{constructor(a,e){this.definition=a,this.experimentalPGNotation=e?.experimentalPGNotation}definition;experimentalPGNotation;#e;lookupOrbitDefinition(a){return this.#e||=(()=>{const e={};for(const n of this.definition.orbits)e[n.orbitName]=n;return e})(),this.#e[a]}name(){return this.definition.name}identityTransformation(){return ao.experimentalConstructIdentity(this)}#t=new Map;moveToTransformation(a){typeof a=="string"&&(a=new X(a));const e=a.toString(),n=this.#t.get(e);if(n)return new ao(this,n);if(this.experimentalPGNotation){const o=this.experimentalPGNotation.lookupMove(a);if(!o)throw new Error(`could not map to internal move: ${a}`);return this.#t.set(e,o),new ao(this,o)}const r=Ew(this,a);return this.#t.set(e,r),new ao(this,r)}algToTransformation(a){return typeof a=="string"&&(a=new Ye(a)),Dw(a,this)}toTransformation(a){return typeof a=="string"?this.algToTransformation(a):a?.is?.(Ye)?this.algToTransformation(a):a?.is?.(X)?this.moveToTransformation(a):a}defaultPattern(){return new Hl(this,this.definition.defaultPattern)}#n;canConvertDefaultPatternToUniqueTransformation(){return this.#n??=(()=>{for(const a of this.definition.orbits){const e=new Array(a.numPieces).fill(!1);for(const n of this.definition.defaultPattern[a.orbitName].pieces)e[n]=!0;for(const n of e)if(!n)return!1}return!0})()}},$u=class{#e;constructor(a){this.#e=a}#t;async#n(){return this.#t??=Promise.resolve(this.#e())}async then(a,e){return this.#n().then(a,e)}catch(a){return this.#n().catch(a)}async finally(a){return this.#n().finally(a)}get[Symbol.toStringTag](){return"LazyPromise"}},Hr=class{stickerings=new Map;constructor(a,e){for(const n of a.definition.orbits)this.stickerings.set(n.orbitName,new Array(n.numPieces).fill(e))}},Gi="regular",on="ignored",Ks="oriented",Uw="experimentalOriented2",Ml="invisible",Br="dim",El="mystery",Nw={Regular:{facelets:[Gi,Gi,Gi,Gi,Gi]},Ignored:{facelets:[on,on,on,on,on]},OrientationStickers:{facelets:[Ks,Ks,Ks,Ks,Ks]},IgnoreNonPrimary:{facelets:[Gi,on,on,on,on]},Invisible:{facelets:[Ml,Ml,Ml,Ml,Ml]},PermuteNonPrimary:{facelets:[Br,Gi,Gi,Gi,Gi]},Dim:{facelets:[Br,Br,Br,Br,Br]},Ignoriented:{facelets:[Br,on,on,on,on]},OrientationWithoutPermutation:{facelets:[Ks,on,on,on,on]},ExperimentalOrientationWithoutPermutation2:{facelets:[Uw,on,on,on,on]},Mystery:{facelets:[El,El,El,El,El]}};function Ow(a){return Nw[a]}var OS=class extends Hr{constructor(a){super(a,"Regular")}set(a,e){for(const[n,r]of this.stickerings.entries())for(let o=0;o<r.length;o++)a.stickerings.get(n)[o]&&(r[o]=e);return this}toStickeringMask(){const a={orbits:{}};for(const[e,n]of this.stickerings.entries()){const r=[],o={pieces:r};a.orbits[e]=o;for(const c of n)r.push(Ow(c))}return a}},FS=class{constructor(a){this.kpuzzle=a}kpuzzle;and(a){const e=new Hr(this.kpuzzle,!1);for(const n of this.kpuzzle.definition.orbits)e:for(let r=0;r<n.numPieces;r++){e.stickerings.get(n.orbitName)[r]=!0;for(const o of a)if(!o.stickerings.get(n.orbitName)[r]){e.stickerings.get(n.orbitName)[r]=!1;continue e}}return e}or(a){const e=new Hr(this.kpuzzle,!1);for(const n of this.kpuzzle.definition.orbits)e:for(let r=0;r<n.numPieces;r++){e.stickerings.get(n.orbitName)[r]=!1;for(const o of a)if(o.stickerings.get(n.orbitName)[r]){e.stickerings.get(n.orbitName)[r]=!0;continue e}}return e}not(a){const e=new Hr(this.kpuzzle,!1);for(const n of this.kpuzzle.definition.orbits)for(let r=0;r<n.numPieces;r++)e.stickerings.get(n.orbitName)[r]=!a.stickerings.get(n.orbitName)[r];return e}all(){return this.and(this.moves([]))}move(a){const e=this.kpuzzle.moveToTransformation(a),n=new Hr(this.kpuzzle,!1);for(const r of this.kpuzzle.definition.orbits)for(let o=0;o<r.numPieces;o++)(e.transformationData[r.orbitName].permutation[o]!==o||e.transformationData[r.orbitName].orientationDelta[o]!==0)&&(n.stickerings.get(r.orbitName)[o]=!0);return n}moves(a){return a.map(e=>this.move(e))}orbits(a){const e=new Hr(this.kpuzzle,!1);for(const n of a)e.stickerings.get(n).fill(!0);return e}orbitPrefix(a){const e=new Hr(this.kpuzzle,!1);for(const n of this.kpuzzle.definition.orbits)n.orbitName.startsWith(a)&&e.stickerings.get(n.orbitName).fill(!0);return e}},w_="Last Layer",C_="Last Slot",Li={"3x3x3":w_,megaminx:w_},or={"3x3x3":C_,megaminx:C_},Fw={full:{groups:{"3x3x3":"Stickering",megaminx:"Stickering"}},OLL:{groups:Li},PLL:{groups:Li},LL:{groups:Li},EOLL:{groups:Li},COLL:{groups:Li},OCLL:{groups:Li},CPLL:{groups:Li},CLL:{groups:Li},EPLL:{groups:Li},ELL:{groups:Li},ZBLL:{groups:Li},LS:{groups:or},LSOLL:{groups:or},LSOCLL:{groups:or},ELS:{groups:or},CLS:{groups:or},ZBLS:{groups:or},VLS:{groups:or},WVLS:{groups:or},F2L:{groups:{"3x3x3":"CFOP (Fridrich)"}},Daisy:{groups:{"3x3x3":"CFOP (Fridrich)"}},Cross:{groups:{"3x3x3":"CFOP (Fridrich)"}},EO:{groups:{"3x3x3":"ZZ"}},EOline:{groups:{"3x3x3":"ZZ"}},EOcross:{groups:{"3x3x3":"ZZ"}},FirstBlock:{groups:{"3x3x3":"Roux"}},SecondBlock:{groups:{"3x3x3":"Roux"}},CMLL:{groups:{"3x3x3":"Roux"}},L10P:{groups:{"3x3x3":"Roux"}},L6E:{groups:{"3x3x3":"Roux"}},L6EO:{groups:{"3x3x3":"Roux"}},"2x2x2":{groups:{"3x3x3":"Petrus"}},"2x2x3":{groups:{"3x3x3":"Petrus"}},EODF:{groups:{"3x3x3":"Nautilus"}},G1:{groups:{"3x3x3":"FMC"}},L2C:{groups:{"4x4x4":"Reduction","5x5x5":"Reduction","6x6x6":"Reduction"}},OBL:{groups:{"2x2x2":"General"}},PBL:{groups:{"2x2x2":"Ortega"}},"Void Cube":{groups:{"3x3x3":"Miscellaneous"}},invisible:{groups:{"3x3x3":"Miscellaneous"}},picture:{groups:{"3x3x3":"Miscellaneous"}},"centers-only":{groups:{"3x3x3":"Miscellaneous"}},"opposite-centers":{groups:{"4x4x4":"Reduction"}},"experimental-centers-U":{},"experimental-centers-U-D":{},"experimental-centers-U-L-D":{},"experimental-centers-U-L-B-D":{},"experimental-centers":{},"experimental-fto-fc":{groups:{fto:"Bencisco"}},"experimental-fto-f2t":{groups:{fto:"Bencisco"}},"experimental-fto-sc":{groups:{fto:"Bencisco"}},"experimental-fto-l2c":{groups:{fto:"Bencisco"}},"experimental-fto-lbt":{groups:{fto:"Bencisco"}},"experimental-fto-l3t":{groups:{fto:"Bencisco"}}};async function Vl(a,e){return(await Pw(a,e)).toStickeringMask()}async function Pw(a,e){const n=await a.kpuzzle(),r=new OS(n),o=new FS(n),c=()=>o.move("U"),f=()=>o.or(o.moves(["U","D"])),h=()=>o.or(o.moves(["L","R"])),m=()=>o.not(h()),p=()=>o.not(c()),x=()=>o.orbitPrefix("CENTER"),g=Z=>o.and([o.move(Z),x()]),v=()=>o.orbitPrefix("EDGE"),y=Z=>o.and([o.and(o.moves(Z)),v()]),M=()=>o.or([o.orbitPrefix("CORNER"),o.orbitPrefix("C4RNER"),o.orbitPrefix("C5RNER")]),A=()=>o.or([m(),o.and([c(),v()])]),b=()=>o.and([c(),x()]),S=()=>o.and([o.and(o.moves(["F","R"])),v()]),z=()=>o.and([o.and(o.moves(["F","R"])),M(),o.not(c())]),N=()=>o.or([z(),S()]);function D(){r.set(p(),"Dim")}function G(){r.set(c(),"PermuteNonPrimary"),r.set(b(),"Dim")}function L(){r.set(c(),"IgnoreNonPrimary"),r.set(b(),"Regular")}function F(){r.set(c(),"Ignoriented"),r.set(b(),"Dim")}switch(e){case"full":break;case"PLL":{D(),G();break}case"CLS":{D(),r.set(z(),"Regular"),r.set(c(),"Ignoriented"),r.set(o.and([c(),x()]),"Dim"),r.set(o.and([c(),M()]),"IgnoreNonPrimary");break}case"OLL":{D(),L();break}case"EOLL":{D(),L(),r.set(o.and([c(),M()]),"Ignored");break}case"COLL":{D(),r.set(o.and([c(),v()]),"Ignoriented"),r.set(o.and([c(),x()]),"Dim"),r.set(o.and([c(),M()]),"Regular");break}case"OCLL":{D(),F(),r.set(o.and([c(),M()]),"IgnoreNonPrimary");break}case"CPLL":{D(),r.set(o.and([M(),c()]),"PermuteNonPrimary"),r.set(o.and([o.not(M()),c()]),"Dim");break}case"CLL":{D(),r.set(o.not(o.and([M(),c()])),"Dim");break}case"EPLL":{D(),r.set(c(),"Dim"),r.set(o.and([c(),v()]),"PermuteNonPrimary");break}case"ELL":{D(),r.set(c(),"Dim"),r.set(o.and([c(),v()]),"Regular");break}case"ELS":{D(),L(),r.set(o.and([c(),M()]),"Ignored"),r.set(S(),"Regular"),r.set(z(),"Ignored");break}case"LL":{D();break}case"F2L":{r.set(c(),"Ignored");break}case"ZBLL":{D(),r.set(c(),"PermuteNonPrimary"),r.set(b(),"Dim"),r.set(o.and([c(),M()]),"Regular");break}case"ZBLS":{D(),r.set(N(),"Regular"),L(),r.set(o.and([c(),M()]),"Ignored");break}case"VLS":{D(),r.set(N(),"Regular"),L();break}case"WVLS":{D(),r.set(N(),"Regular"),r.set(o.and([c(),v()]),"Ignoriented"),r.set(o.and([c(),x()]),"Dim"),r.set(o.and([c(),M()]),"IgnoreNonPrimary");break}case"LS":{D(),r.set(N(),"Regular"),r.set(c(),"Ignored"),r.set(b(),"Dim");break}case"LSOLL":{D(),L(),r.set(N(),"Regular");break}case"LSOCLL":{D(),F(),r.set(o.and([c(),M()]),"IgnoreNonPrimary"),r.set(N(),"Regular");break}case"EO":{r.set(M(),"Ignored"),r.set(v(),"OrientationWithoutPermutation");break}case"EOline":{r.set(M(),"Ignored"),r.set(v(),"OrientationWithoutPermutation"),r.set(o.and(o.moves(["D","M"])),"Regular");break}case"EOcross":{r.set(v(),"OrientationWithoutPermutation"),r.set(o.move("D"),"Regular"),r.set(M(),"Ignored");break}case"CMLL":{r.set(p(),"Dim"),r.set(A(),"Ignored"),r.set(o.and([c(),M()]),"Regular");break}case"L10P":{r.set(o.not(A()),"Dim"),r.set(o.and([M(),c()]),"Regular");break}case"L6E":{r.set(o.not(A()),"Dim");break}case"L6EO":{r.set(o.not(A()),"Dim"),r.set(A(),"ExperimentalOrientationWithoutPermutation2"),r.set(o.and([x(),f()]),"ExperimentalOrientationWithoutPermutation2"),r.set(o.and([o.move("M"),o.move("E")]),"Ignored");break}case"Daisy":{r.set(o.all(),"Ignored"),r.set(x(),"Dim"),r.set(o.and([o.move("D"),x()]),"Regular"),r.set(o.and([o.move("U"),v()]),"IgnoreNonPrimary");break}case"Cross":{r.set(o.all(),"Ignored"),r.set(x(),"Dim"),r.set(o.and([o.move("D"),x()]),"Regular"),r.set(o.and([o.move("D"),v()]),"Regular");break}case"2x2x2":{r.set(o.or(o.moves(["U","F","R"])),"Ignored"),r.set(o.and([o.or(o.moves(["U","F","R"])),x()]),"Dim");break}case"2x2x3":{r.set(o.all(),"Dim"),r.set(o.or(o.moves(["U","F","R"])),"Ignored"),r.set(o.and([o.or(o.moves(["U","F","R"])),x()]),"Dim"),r.set(o.and([o.move("F"),o.not(o.or(o.moves(["U","R"])))]),"Regular");break}case"G1":{r.set(o.all(),"ExperimentalOrientationWithoutPermutation2"),r.set(o.or(o.moves(["E"])),"OrientationWithoutPermutation"),r.set(o.and(o.moves(["E","S"])),"Ignored");break}case"L2C":{r.set(o.or(o.moves(["L","R","B","D"])),"Dim"),r.set(o.not(x()),"Ignored");break}case"PBL":{r.set(o.all(),"Ignored"),r.set(o.or(o.moves(["U","D"])),"PermuteNonPrimary");break}case"FirstBlock":{r.set(o.not(o.and([o.and(o.moves(["L"])),o.not(c())])),"Ignored"),r.set(g("R"),"Dim");break}case"SecondBlock":{r.set(o.not(o.and([o.and(o.moves(["L"])),o.not(c())])),"Ignored"),r.set(o.and([o.and(o.moves(["L"])),o.not(c())]),"Dim"),r.set(o.and([o.and(o.moves(["R"])),o.not(c())]),"Regular");break}case"EODF":{D(),r.set(o.or([z(),o.and([c(),M()])]),"Ignored"),r.set(o.or([o.and([c(),v()]),S()]),"OrientationWithoutPermutation"),r.set(y(["D","F"]),"Regular"),r.set(g("F"),"Regular");break}case"Void Cube":{r.set(x(),"Invisible");break}case"picture":case"invisible":{r.set(o.all(),"Invisible");break}case"centers-only":{r.set(o.not(x()),"Ignored");break}case"opposite-centers":{r.set(o.not(o.and([x(),o.or(o.moves(["U","D"]))])),"Ignored");break}case"OBL":{r.set(o.or(o.moves(["U","D"])),"IgnoreNonPrimary");break}default:console.warn(`Unsupported stickering for ${a.id}: ${e}. Setting all pieces to dim.`),r.set(o.and(o.moves([])),"Dim")}return r}async function ef(a,e){const n=[],r=[];for(const[o,c]of Object.entries(Fw))c.groups&&(a in c.groups?n.push(o):e?.use3x3x3Fallbacks&&"3x3x3"in c.groups&&r.push(o));return n.concat(r)}function Bn(a){const e=new $u(a);return()=>e}async function Sm(a){return(await wn(()=>import("./index-CfoZfjjN.js"),[])).getPuzzleGeometryByName(a,{allMoves:!0,orientCenters:!0,addRotations:!0})}async function zw(a){return(await wn(()=>import("./index-CfoZfjjN.js"),[])).getPuzzleGeometryByName(a)}async function Bw(a,e,n){const r=await a,o=r.getKPuzzleDefinition(!0);o.name=e;const c=await wn(()=>import("./index-CfoZfjjN.js"),[]),f=new c.ExperimentalPGNotation(r,r.getOrbitsDef(!0));if(n){const h=new Set(n);for(const[m,p]of Object.entries(o.defaultPattern))h.has(m)&&(p.orientationMod=new Array(p.pieces.length).fill(1))}return new _m(f.remapKPuzzleDefinition(o),{experimentalPGNotation:f})}var Xi=class{pgId;id;fullName;inventedBy;inventionYear;#e;constructor(a){this.pgId=a.pgID,this.id=a.id,this.fullName=a.fullName,this.inventedBy=a.inventedBy,this.inventionYear=a.inventionYear,this.#e=a.setOrientationModTo1ForPiecesOfOrbits}#t;pg(){return this.#t??=Sm(this.pgId??this.id)}#n;basePG(){return this.#n??=zw(this.pgId??this.id)}#i;kpuzzle(){return this.#i??=Bw(this.pg(),this.id,this.#e)}#a;svg(){return this.#a??=(async()=>(await this.pg()).generatesvg())()}puzzleSpecificSimplifyOptionsPromise=Iw(this.kpuzzle.bind(this))},Ul=class extends Xi{stickeringMask(a){return Vl(this,a)}stickerings=()=>ef(this.id,{use3x3x3Fallbacks:!0});algTransformData=ym};function Iw(a){return new $u(async()=>{const e=await a();return{quantumMoveOrder:n=>e.moveToTransformation(new X(n)).repetitionOrder()}})}var PS={name:"3x3x3",orbits:[{orbitName:"EDGES",numPieces:12,numOrientations:2},{orbitName:"CORNERS",numPieces:8,numOrientations:3},{orbitName:"CENTERS",numPieces:6,numOrientations:4}],defaultPattern:{EDGES:{pieces:[0,1,2,3,4,5,6,7,8,9,10,11],orientation:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{pieces:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{pieces:[0,1,2,3,4,5],orientation:[0,0,0,0,0,0],orientationMod:[1,1,1,1,1,1]}},moves:{U:{EDGES:{permutation:[1,2,3,0,4,5,6,7,8,9,10,11],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[1,2,3,0,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[1,0,0,0,0,0]}},y:{EDGES:{permutation:[1,2,3,0,5,6,7,4,10,8,11,9],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[1,2,3,0,7,4,5,6],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,2,3,4,1,5],orientationDelta:[1,0,0,0,0,3]}},x:{EDGES:{permutation:[4,8,0,9,6,10,2,11,5,7,1,3],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[4,0,3,5,7,6,2,1],orientationDelta:[2,1,2,1,1,2,1,2]},CENTERS:{permutation:[2,1,5,3,0,4],orientationDelta:[0,3,0,1,2,2]}},L:{EDGES:{permutation:[0,1,2,11,4,5,6,9,8,3,10,7],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[0,1,6,2,4,3,5,7],orientationDelta:[0,0,2,1,0,2,1,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,1,0,0,0,0]}},F:{EDGES:{permutation:[9,1,2,3,8,5,6,7,0,4,10,11],orientationDelta:[1,0,0,0,1,0,0,0,1,1,0,0]},CORNERS:{permutation:[3,1,2,5,0,4,6,7],orientationDelta:[1,0,0,2,2,1,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,1,0,0,0]}},R:{EDGES:{permutation:[0,8,2,3,4,10,6,7,5,9,1,11],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[4,0,2,3,7,5,6,1],orientationDelta:[2,1,0,0,1,0,0,2]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,0,1,0,0]}},B:{EDGES:{permutation:[0,1,10,3,4,5,11,7,8,9,6,2],orientationDelta:[0,0,1,0,0,0,1,0,0,0,1,1]},CORNERS:{permutation:[0,7,1,3,4,5,2,6],orientationDelta:[0,2,1,0,0,0,2,1]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,0,0,1,0]}},D:{EDGES:{permutation:[0,1,2,3,7,4,5,6,8,9,10,11],orientationDelta:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,5,6,7,4],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientationDelta:[0,0,0,0,0,1]}},z:{EDGES:{permutation:[9,3,11,7,8,1,10,5,0,4,2,6],orientationDelta:[1,1,1,1,1,1,1,1,1,1,1,1]},CORNERS:{permutation:[3,2,6,5,0,4,7,1],orientationDelta:[1,2,1,2,2,1,2,1]},CENTERS:{permutation:[1,5,2,0,4,3],orientationDelta:[1,1,1,1,3,1]}},M:{EDGES:{permutation:[2,1,6,3,0,5,4,7,8,9,10,11],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[4,1,0,3,5,2],orientationDelta:[2,0,0,0,2,0]}},E:{EDGES:{permutation:[0,1,2,3,4,5,6,7,9,11,8,10],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,4,1,2,3,5],orientationDelta:[0,0,0,0,0,0]}},S:{EDGES:{permutation:[0,3,2,7,4,1,6,5,8,9,10,11],orientationDelta:[0,1,0,1,0,1,0,1,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[1,5,2,0,4,3],orientationDelta:[1,1,0,1,0,1]}},u:{EDGES:{permutation:[1,2,3,0,4,5,6,7,10,8,11,9],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[1,2,3,0,4,5,6,7],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,2,3,4,1,5],orientationDelta:[1,0,0,0,0,0]}},l:{EDGES:{permutation:[2,1,6,11,0,5,4,9,8,3,10,7],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[0,1,6,2,4,3,5,7],orientationDelta:[0,0,2,1,0,2,1,0]},CENTERS:{permutation:[4,1,0,3,5,2],orientationDelta:[2,1,0,0,2,0]}},f:{EDGES:{permutation:[9,3,2,7,8,1,6,5,0,4,10,11],orientationDelta:[1,1,0,1,1,1,0,1,1,1,0,0]},CORNERS:{permutation:[3,1,2,5,0,4,6,7],orientationDelta:[1,0,0,2,2,1,0,0]},CENTERS:{permutation:[1,5,2,0,4,3],orientationDelta:[1,1,1,1,0,1]}},r:{EDGES:{permutation:[4,8,0,3,6,10,2,7,5,9,1,11],orientationDelta:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[4,0,2,3,7,5,6,1],orientationDelta:[2,1,0,0,1,0,0,2]},CENTERS:{permutation:[2,1,5,3,0,4],orientationDelta:[0,0,0,1,2,2]}},b:{EDGES:{permutation:[0,5,10,1,4,7,11,3,8,9,6,2],orientationDelta:[0,1,1,1,0,1,1,1,0,0,1,1]},CORNERS:{permutation:[0,7,1,3,4,5,2,6],orientationDelta:[0,2,1,0,0,0,2,1]},CENTERS:{permutation:[3,0,2,5,4,1],orientationDelta:[3,3,0,3,1,3]}},d:{EDGES:{permutation:[0,1,2,3,7,4,5,6,9,11,8,10],orientationDelta:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[0,1,2,3,5,6,7,4],orientationDelta:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,4,1,2,3,5],orientationDelta:[0,0,0,0,0,1]}}},derivedMoves:{Uw:"u",Lw:"l",Fw:"f",Rw:"r",Bw:"b",Dw:"d",Uv:"y",Lv:"x'",Fv:"z",Rv:"x",Bv:"z'",Dv:"y'","2U":"u U'","2L":"l L'","2F":"f F'","2R":"r R'","2B":"b B'","2D":"d D'"}};function zS(a){const e=a.patternData.CENTERS.pieces[0],n=a.patternData.CENTERS.pieces[5],r=a.patternData.CENTERS.pieces[1];let o=r;return e<r&&o--,n<r&&o--,[e,o]}var D_=new Array(6).fill(0).map(()=>new Array(6));function Gw(){{const a=["","z","x","z'","x'","x2"].map(n=>Ye.fromString(n)),e=new Ye("y");for(const n of a){let r=IS.algToTransformation(n);for(let o=0;o<4;o++){r=r.applyAlg(e);const[c,f]=zS(r.toKPattern());D_[c][f]=r.invert()}}}return D_}function Hw(a){const[e,n]=zS(a),r=Gw()[e][n];return a.applyTransformation(r)}function Vw(a,e){return e.ignorePuzzleOrientation&&(a=Hw(a)),e.ignoreCenterOrientation&&(a=new Hl(a.kpuzzle,{EDGES:a.patternData.EDGES,CORNERS:a.patternData.CORNERS,CENTERS:{pieces:a.patternData.CENTERS.pieces,orientation:new Array(6).fill(0)}})),!!a.experimentalToTransformation()?.isIdentityTransformation()}var kw=class extends Ju{traverseAlg(a,e){const n=[];for(const r of a.childAlgNodes())n.push(this.traverseAlgNode(r,e));return new Ye(n)}traverseGrouping(a,e){return a.modified({alg:this.traverseAlg(a.alg,e)})}traverseMove(a,e){const n=(()=>{const{invertExceptByFamily:r}=e;return r?!r.has(a.family):!1})();return a.modified({amount:n?-a.amount:a.amount,family:e.replaceMovesByFamily[a.family]??a.family})}traverseCommutator(a,e){return new oi(this.traverseAlg(a.A,e),this.traverseAlg(a.B,e))}traverseConjugate(a,e){return new li(this.traverseAlg(a.A,e),this.traverseAlg(a.B,e))}traversePause(a,e){return a}traverseNewline(a,e){return a}traverseLineComment(a,e){return a}};vm(kw);function BS(a){const n=a.experimentalToTransformation().invert().transformationData.CORNERS;return n.permutation[6]*3+n.orientationDelta[6]}var L_=new Array(24);function Xw(a){{const e=["","z","x","z'","x'","x2"].map(r=>Ye.fromString(r)),n=new Ye("y");for(const r of e){let o=a.algToTransformation(r);for(let c=0;c<4;c++){o=o.applyAlg(n);const f=BS(o.toKPattern());L_[f]={transformation:o.invert(),alg:r.concat(n)}}}}return L_}function Ww(a){const e=BS(a),{transformation:n,alg:r}=Xw(a.kpuzzle)[e];return{normalizedPattern:a.applyTransformation(n),normalizationAlg:r.invert()}}function qw(a,e){return e.ignorePuzzleOrientation&&(a=Ww(a).normalizedPattern),!!a.experimentalToTransformation().isIdentityTransformation()}var IS=new _m(PS);PS.experimentalIsPatternSolved=Vw;var GS=Bn(()=>wn(()=>import("./big-puzzle-orientation-ADWIOX6S-BP1v17mY.js"),[])),HS={KeyI:new X("R"),KeyK:new X("R'"),KeyW:new X("B"),KeyO:new X("B'"),KeyS:new X("D"),KeyL:new X("D'"),KeyD:new X("L"),KeyE:new X("L'"),KeyJ:new X("U"),KeyF:new X("U'"),KeyH:new X("F"),KeyG:new X("F'"),KeyC:new X("l"),KeyR:new X("l'"),KeyU:new X("r"),KeyM:new X("r'"),KeyX:new X("d"),Comma:new X("d'"),KeyT:new X("x"),KeyY:new X("x"),KeyV:new X("x'"),KeyN:new X("x'"),Semicolon:new X("y"),KeyA:new X("y'"),KeyP:new X("z"),KeyQ:new X("z'"),KeyZ:new X("M'"),KeyB:new X("M"),Period:new X("M'"),Backquote:new fi};function Rn(a,e,n,r){const o=[];for(const c of a){const f=X.fromString(c),{family:h,amount:m}=f;if(![-1,1].includes(m))throw new Error("Invalid config move");o.push({family:h,direction:m,type:e,from:n,to:r})}return o}var $r={"x axis":{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...Rn(["R"],0,0,3),...Rn(["L'"],1,0,3),...Rn(["r","Rw"],2,0,2),...Rn(["l'","Lw'"],3,0,2),...Rn(["M'"],4,1,2),...Rn(["x","Uv","Dv'"],5,0,3)]},"y axis":{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...Rn(["U"],0,0,3),...Rn(["D'"],1,0,3),...Rn(["u","Uw"],2,0,2),...Rn(["d'","Dw'"],3,0,2),...Rn(["E'"],4,1,2),...Rn(["y","Uv","Dv'"],5,0,3)]},"z axis":{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...Rn(["F"],0,0,3),...Rn(["B'"],1,0,3),...Rn(["f","Fw"],2,0,3),...Rn(["b'","Bw'"],3,0,3),...Rn(["S"],4,1,2),...Rn(["z","Fv","Bv'"],5,0,3)]}},kl={};for(const[a,e]of Object.entries($r))for(const n of e.moveSourceInfos)kl[n.family]={axis:a,moveSourceInfo:n};var VS={};for(const a of Object.keys($r)){const e={};VS[a]=e;for(const n of $r[a].moveSourceInfos)(e[n.type]??=[]).push(n)}var kS={};for(const a of Object.keys($r)){const e=new Map;kS[a]=e;for(const n of $r[a].moveSourceInfos)e.get(n.from)||e.set(n.from,n)}function U_(a,e){const n=VS[a][e]?.[0];if(!n)throw new Error(`Could not find a reference move (axis: ${a}, move source type: ${e})`);return n}var Yw=(a,e)=>kl[a.family].axis===kl[e.family].axis;function jw(a,e,n,r){if(e+1===n){const v=kS[a].get(e);if(v)return new X(new Ta(v.family),r*v.direction)}const o=$r[a],{sliceDiameter:c}=o;if(e===0&&n===c){const v=U_(a,5);return new X(new Ta(v.family),r*v.direction)}const f=e+n>c;f&&([e,n]=[c-n,c-e]);let h=e+1,m=n;const p=h===m;p&&(m=null),h===1&&(h=null),p&&h===1&&(m=null),!p&&m===2&&(m=null);const g=U_(a,p?f?1:0:f?3:2);return new X(new Ta(g.family,m,h),r*g.direction)}function Kw(a,e=!0){if(a.length===0)return[];const n=kl[a[0].family].axis,r=$r[n],{sliceDiameter:o}=r,c=new Map;let f=null;function h(v,y){let M=(c.get(v)??0)+y;e&&(M=M%4+5%4-1),M===0?c.delete(v):c.set(v,M)}let m=0;for(const v of Array.from(a).reverse()){m++;const{moveSourceInfo:y}=kl[v.family],M=v.amount*y.direction;switch(y.type){case 0:{const A=(v.innerLayer??1)-1;h(A,M),h(A+1,-M);break}case 1:{const A=o-(v.innerLayer??1);h(A,M),h(A+1,-M);break}case 2:{h((v.outerLayer??1)-1,M),h(v.innerLayer??2,-M);break}case 3:{h(o-(v.innerLayer??2),M),h(o-((v.outerLayer??1)-1),-M);break}case 4:{h(y.from,M),h(y.to,-M);break}case 5:{h(0,M),h(o,-M);break}}[0,2].includes(c.size)&&(f={suffixLength:m,sliceDeltas:new Map(c)})}if(c.size===0)return[];if(!f)return a;let[p,x]=f.sliceDeltas.keys();p>x&&([p,x]=[x,p]);const g=f.sliceDeltas.get(p);return[...a.slice(0,-f.suffixLength),...g!==0?[jw(n,p,x,g)]:[]]}var Zw={quantumMoveOrder:()=>4,axis:{areQuantumMovesSameAxis:Yw,simplifySameAxisMoves:Kw}},ym={"↔ Mirror (M)":{replaceMovesByFamily:{L:"R",R:"L",l:"r",r:"l",Lw:"Rw",Rw:"Lw",Lv:"Rv",Rv:"Lv"},invertExceptByFamily:new Set(["x","M","m"])},"⤢ Mirror (S)":{replaceMovesByFamily:{F:"B",B:"F",f:"b",b:"f",Fw:"Bw",Bw:"Fw",Fv:"Bv",Bv:"Fv"},invertExceptByFamily:new Set(["z","S","s"])},"↕ Mirror (E)":{replaceMovesByFamily:{U:"D",D:"U",u:"d",d:"u",Uw:"Dw",Dw:"Uw",Uv:"Dv",Dv:"Uv"},invertExceptByFamily:new Set(["y","E","e"])}},bm={id:"3x3x3",fullName:"3×3×3 Cube",inventedBy:["Ernő Rubik"],inventionYear:1974,kpuzzle:Bn(async()=>IS),svg:Bn(async()=>(await wn(async()=>{const{cube3x3x3SVG:a}=await import("./puzzles-dynamic-3x3x3-FYXD7SIU-BAAKgtmM.js");return{cube3x3x3SVG:a}},[])).cube3x3x3SVG),llSVG:Bn(async()=>(await wn(async()=>{const{cube3x3x3LLSVG:a}=await import("./puzzles-dynamic-3x3x3-FYXD7SIU-BAAKgtmM.js");return{cube3x3x3LLSVG:a}},[])).cube3x3x3LLSVG),llFaceSVG:Bn(async()=>(await wn(async()=>{const{cube3x3x3LLFaceSVG:a}=await import("./puzzles-dynamic-3x3x3-FYXD7SIU-BAAKgtmM.js");return{cube3x3x3LLFaceSVG:a}},[])).cube3x3x3LLFaceSVG),pg:Bn(async()=>Sm("3x3x3")),stickeringMask:a=>Vl(bm,a),stickerings:()=>ef("3x3x3"),puzzleSpecificSimplifyOptions:Zw,keyMapping:async()=>HS,algTransformData:ym},ND={333:{puzzleID:"3x3x3",eventName:"3x3x3 Cube",scramblesImplemented:"random-state"},222:{puzzleID:"2x2x2",eventName:"2x2x2 Cube",scramblesImplemented:"random-state"},444:{puzzleID:"4x4x4",eventName:"4x4x4 Cube",scramblesImplemented:"random-state"},555:{puzzleID:"5x5x5",eventName:"5x5x5 Cube",scramblesImplemented:"random-moves"},666:{puzzleID:"6x6x6",eventName:"6x6x6 Cube",scramblesImplemented:"random-moves"},777:{puzzleID:"7x7x7",eventName:"7x7x7 Cube",scramblesImplemented:"random-moves"},"333bf":{puzzleID:"3x3x3",eventName:"3x3x3 Blindfolded",scramblesImplemented:"random-state"},"333fm":{puzzleID:"3x3x3",eventName:"3x3x3 Fewest Moves",scramblesImplemented:"random-state"},"333oh":{puzzleID:"3x3x3",eventName:"3x3x3 One-Handed",scramblesImplemented:"random-state"},clock:{puzzleID:"clock",eventName:"Clock",scramblesImplemented:"random-state"},minx:{puzzleID:"megaminx",eventName:"Megaminx",scramblesImplemented:"random-moves"},pyram:{puzzleID:"pyraminx",eventName:"Pyraminx",scramblesImplemented:"random-state"},skewb:{puzzleID:"skewb",eventName:"Skewb",scramblesImplemented:"random-state"},sq1:{puzzleID:"square1",eventName:"Square-1",scramblesImplemented:"random-state"},"444bf":{puzzleID:"4x4x4",eventName:"4x4x4 Blindfolded",scramblesImplemented:"random-state"},"555bf":{puzzleID:"5x5x5",eventName:"5x5x5 Blindfolded",scramblesImplemented:"random-moves"},"333mbf":{puzzleID:"3x3x3",eventName:"3x3x3 Multi-Blind",scramblesImplemented:"random-state"}},XS={id:"2x2x2",fullName:"2×2×2 Cube",kpuzzle:Bn(async()=>{const a=new _m((await wn(async()=>{const{cube2x2x2JSON:e}=await import("./puzzles-dynamic-side-events-IMYJ533P-DK91LDw7.js");return{cube2x2x2JSON:e}},[])).cube2x2x2JSON);return a.definition.experimentalIsPatternSolved=qw,a}),svg:async()=>(await wn(async()=>{const{cube2x2x2SVG:a}=await import("./puzzles-dynamic-side-events-IMYJ533P-DK91LDw7.js");return{cube2x2x2SVG:a}},[])).cube2x2x2SVG,llSVG:Bn(async()=>(await wn(async()=>{const{cube2x2x2LLSVG:a}=await import("./puzzles-dynamic-side-events-IMYJ533P-DK91LDw7.js");return{cube2x2x2LLSVG:a}},[])).cube2x2x2LLSVG),pg:Bn(async()=>Sm("2x2x2")),stickeringMask:a=>Vl(XS,a),stickerings:()=>ef("2x2x2",{use3x3x3Fallbacks:!0}),algTransformData:ym},WS={...HS,KeyZ:new X("m'"),KeyB:new X("m"),Period:new X("m'")},Hu=new Ul({id:"4x4x4",fullName:"4×4×4 Cube",inventedBy:["Peter Sebestény"],inventionYear:1981});Hu.llSVG=Bn(async()=>(await wn(async()=>{const{cube4x4x4LLSVG:a}=await import("./puzzles-dynamic-4x4x4-AIGABOAR-Cr8v4tqZ.js");return{cube4x4x4LLSVG:a}},[])).cube4x4x4LLSVG);Hu.keyMapping=async()=>WS;Hu.kpuzzle=Bn(async()=>{const a=await Xi.prototype.kpuzzle.call(Hu);a.definition.defaultPattern.CENTERS.pieces=[0,0,0,0,4,4,4,4,8,8,8,8,12,12,12,12,16,16,16,16,20,20,20,20];const{experimentalIsBigCubeSolved:e}=await GS();return a.definition.experimentalIsPatternSolved=e,a});var Yp=new Ul({id:"5x5x5",fullName:"5×5×5 Cube",inventedBy:["Udo Krell"],inventionYear:1981});Yp.keyMapping=async()=>WS;Yp.kpuzzle=Bn(async()=>{const a=await Xi.prototype.kpuzzle.call(Yp),e=[0,0,0,0,4,4,4,4,8,8,8,8,12,12,12,12,16,16,16,16,20,20,20,20];a.definition.defaultPattern.CENTERS.pieces=e,a.definition.defaultPattern.CENTERS2.pieces=e,a.definition.defaultPattern.CENTERS3.orientationMod=new Array(6).fill(1);const{experimentalIsBigCubeSolved:n}=await GS();return a.definition.experimentalIsPatternSolved=n,a});async function qS(a,e){const n=await a.kpuzzle(),r=new OS(n),o=new FS(n),c=()=>o.and([o.move("U"),o.not(o.or(o.moves(["F","BL","BR"])))]),f=()=>o.and([o.move("U"),o.not(o.move("F"))]),h=()=>o.or([f(),o.and([o.move("F"),o.not(o.or(o.moves(["U","BL","BR"])))])]),m=()=>o.not(o.or([o.and([o.move("U"),o.move("F")]),o.and([o.move("F"),o.move("BL")]),o.and([o.move("F"),o.move("BR")]),o.and([o.move("BL"),o.move("BR")])])),p=()=>o.not(o.or([o.and([o.move("F"),o.move("BL")]),o.and([o.move("F"),o.move("BR")]),o.and([o.move("BL"),o.move("BR")])]));switch(e){case"full":break;case"experimental-fto-fc":{r.set(o.not(c()),"Ignored");break}case"experimental-fto-f2t":{r.set(o.not(f()),"Ignored"),r.set(c(),"Dim");break}case"experimental-fto-sc":{r.set(o.not(h()),"Ignored"),r.set(f(),"Dim");break}case"experimental-fto-l2c":{r.set(o.not(m()),"Ignored"),r.set(h(),"Dim");break}case"experimental-fto-lbt":{r.set(o.not(p()),"Ignored"),r.set(m(),"Dim");break}case"experimental-fto-l3t":{r.set(p(),"Dim");break}default:console.warn(`Unsupported stickering for ${a.id}: ${e}. Setting all pieces to dim.`),r.set(o.and(o.moves([])),"Dim")}return r.toStickeringMask()}async function Qw(){return["full","experimental-fto-fc","experimental-fto-f2t","experimental-fto-sc","experimental-fto-l2c","experimental-fto-lbt","experimental-fto-l3t"]}var YS={KeyI:new X("R"),KeyK:new X("R'"),KeyW:new X("B"),KeyO:new X("B'"),KeyS:new X("D"),KeyL:new X("D'"),KeyD:new X("L"),KeyE:new X("L'"),KeyJ:new X("U"),KeyF:new X("U'"),KeyH:new X("F"),KeyG:new X("F'"),KeyN:new X("Rv'"),KeyC:new X("l"),KeyR:new X("l'"),KeyU:new X("r"),KeyM:new X("r'"),KeyX:new X("d"),Comma:new X("d'"),KeyT:new X("Lv'"),KeyY:new X("Rv"),KeyV:new X("Lv"),Semicolon:new X("Uv"),KeyA:new X("Uv'"),KeyP:new X("BR'"),KeyQ:new X("BL"),KeyZ:new X("BL'"),KeyB:new X("T"),Period:new X("BR"),Backquote:new fi},Jw=class extends Xi{constructor(){super({pgID:"skewb diamond",id:"baby_fto",fullName:"Baby FTO",inventedBy:["Uwe Mèffert"],setOrientationModTo1ForPiecesOfOrbits:["CENTERS"]})}stickeringMask(a){return qS(this,a)}svg=Bn(async()=>(await wn(async()=>{const{babyFTOSVG:a}=await import("./puzzles-dynamic-unofficial-P3TW433I-Qmz-kdAk.js");return{babyFTOSVG:a}},[])).babyFTOSVG);keyMapping=async()=>YS};new Jw;var $w=class extends Xi{constructor(){super({pgID:"FTO",id:"fto",fullName:"Face-Turning Octahedron",inventedBy:["Karl Rohrbach","David Pitcher"],inventionYear:1983})}stickeringMask(a){return qS(this,a)}stickerings=Qw;svg=Bn(async()=>(await wn(async()=>{const{ftoSVG:a}=await import("./puzzles-dynamic-unofficial-P3TW433I-Qmz-kdAk.js");return{ftoSVG:a}},[])).ftoSVG);keyMapping=async()=>YS;algTransformData={"↔ Mirror (x)":{replaceMovesByFamily:{L:"R",R:"L",l:"r",r:"l",Lw:"Rw",Rw:"Lw",Lv:"Rv",Rv:"Lv",BL:"BR",BR:"BL",bl:"br",br:"bl",BLw:"BRw",BRw:"BLw",BLv:"BRv",BRv:"BLv"},invertExceptByFamily:new Set(["x"])}}},eC=new $w;async function tC(a,e){return(await jS()).includes(e)?Vl(a,e):(console.warn(`Unsupported stickering for ${a.id}: ${e}. Setting all pieces to dim.`),Vl(a,"full"))}var nC=new $u(()=>ef("megaminx"));function jS(){return nC}var iC={KeyI:new X("R"),KeyK:new X("R'"),KeyW:new X("B"),KeyO:new X("B'"),KeyS:new X("FR"),KeyL:new X("FR'"),KeyD:new X("L"),KeyE:new X("L'"),KeyJ:new X("U"),KeyF:new X("U'"),KeyH:new X("F"),KeyG:new X("F'"),KeyC:new X("Lw"),KeyR:new X("Lw'"),KeyU:new X("Rw"),KeyM:new X("Rw'"),KeyX:new X("d"),Comma:new X("d'"),KeyT:new X("Rv"),KeyY:new X("Rv"),KeyV:new X("Rv'"),KeyN:new X("Rv'"),Semicolon:new X("y"),KeyA:new X("y'"),KeyP:new X("z"),KeyQ:new X("z'"),KeyZ:new X("2L'"),KeyB:new X("2R"),Period:new X("2R'"),Backquote:new fi},aC=class extends Xi{constructor(){super({id:"megaminx",fullName:"Megaminx",inventionYear:1981})}stickeringMask(a){return tC(this,a)}stickerings=jS;llSVG=Bn(async()=>(await wn(async()=>{const{megaminxLLSVG:a}=await import("./puzzles-dynamic-megaminx-2LVHIDL4-Cm8jQJ-N.js");return{megaminxLLSVG:a}},[])).megaminxLLSVG);keyMapping=async()=>iC},rC=new aC,sC=class extends Xi{constructor(){super({id:"pyraminx",fullName:"Pyraminx",inventedBy:["Uwe Meffert"]})}svg=Bn(async()=>(await wn(async()=>{const{pyraminxSVG:a}=await import("./puzzles-dynamic-side-events-IMYJ533P-DK91LDw7.js");return{pyraminxSVG:a}},[])).pyraminxSVG);algTransformData={"↔ Mirror (x)":{replaceMovesByFamily:{L:"R",R:"L",l:"r",r:"l",Lw:"Rw",Rw:"Lw",Lv:"Rv",Rv:"Lv"},invertExceptByFamily:new Set([])}}},oC=new sC,lC={"3x3x3":bm,"2x2x2":XS,"6x6x6":new Ul({id:"6x6x6",fullName:"6×6×6 Cube"}),"7x7x7":new Ul({id:"7x7x7",fullName:"7×7×7 Cube"}),"40x40x40":new Ul({id:"40x40x40",fullName:"40×40×40 Cube"}),megaminx:rC,pyraminx:oC,skewb:new Xi({id:"skewb",fullName:"Skewb",inventedBy:["Tony Durham"]}),fto:eC,gigaminx:new Xi({id:"gigaminx",fullName:"Gigaminx",inventedBy:["Tyler Fox"],inventionYear:2006}),master_tetraminx:new Xi({pgID:"master tetraminx",id:"master_tetraminx",fullName:"Master Tetraminx",inventedBy:["Katsuhiko Okamoto"],inventionYear:2002})},KS=2**53,cC=2097152,uC=11,Xh=new Uint32Array(2);function fC(){globalThis.crypto.getRandomValues(Xh);const a=Xh[0],e=Xh[1];return Math.floor(a*cC)+(e>>uC)}function dC(a){if(typeof a!="number"||a<0||Math.floor(a)!==a)throw new Error("randomUIntBelow() not called with a positive integer value.");if(a>KS)throw new Error(`Called randomUIntBelow() with max === ${a}, which is larger than JavaScript can handle with integer precision.`)}function hC(a){dC(a);for(var e,n,r;;)if(e=fC(),n=Math.floor(e/a),r=n*a,r<=KS-a)return e-r}function ZS(a){return a[hC(a.length)]}var QS=!1;function OD(a){QS=a}function pC(){if(!QS)throw new Error("Must be called from inside a worker, to avoid impact on page performance. Try importing from the top level of `cubing/solve`?")}function mC(a,e){const n=new ES;n.experimentalPushAlg(a);for(const r of e){const o=ZS(r);o!==null&&n.push(X.fromString(o))}return n.toAlg()}var JS=new $u(()=>wn(()=>import("./search-dynamic-solve-3x3x3-B2L4IN34-uMfhr9Ka.js"),[])),xC="UF UR UB UL DF DR DB DL FR FL BR BL".split(" "),gC="UFR URB UBL ULF DRF DFL DLB DBR".split(" "),vC="U L F R B D".split(" "),_C=[[1,2,0],[0,2,0],[1,1,0],[0,3,0],[2,0,0],[0,1,0],[1,3,0],[0,0,0],[1,0,0],[1,0,2],[0,1,1],[1,1,1],[0,8,1],[2,3,0],[0,10,1],[1,4,1],[0,5,1],[1,7,2],[1,3,2],[0,0,1],[1,0,1],[0,9,0],[2,2,0],[0,8,0],[1,5,1],[0,4,1],[1,4,2],[1,5,0],[0,4,0],[1,4,0],[0,7,0],[2,5,0],[0,5,0],[1,6,0],[0,6,0],[1,7,0],[1,2,2],[0,3,1],[1,3,1],[0,11,1],[2,1,0],[0,9,1],[1,6,1],[0,7,1],[1,5,2],[1,1,2],[0,2,1],[1,2,1],[0,10,0],[2,4,0],[0,11,0],[1,7,1],[0,6,1],[1,6,2]];function N_(a,e){return a.slice(e)+a.slice(0,e)}function SC(a){const e=[[],[]];for(let n=0;n<6;n++)if(a.patternData.CENTERS.pieces[n]!==n)throw new Error("non-oriented puzzles are not supported");for(let n=0;n<12;n++)e[0].push(N_(xC[a.patternData.EDGES.pieces[n]],a.patternData.EDGES.orientation[n]));for(let n=0;n<8;n++)e[1].push(N_(gC[a.patternData.CORNERS.pieces[n]],a.patternData.CORNERS.orientation[n]));return e.push(vC),e}function yC(a){const e=SC(a);return _C.map(([n,r,o])=>e[n][r][o]).join("")}function O_(a,e){const n=new Hl(a.kpuzzle,{EDGES:a.patternData.EDGES,CORNERS:a.patternData.CORNERS,CENTERS:{pieces:a.patternData.CENTERS.pieces,orientation:new Array(6).fill(0)}}).experimentalToTransformation(),r=new Hl(e.kpuzzle,{EDGES:e.patternData.EDGES,CORNERS:e.patternData.CORNERS,CENTERS:{pieces:e.patternData.CENTERS.pieces,orientation:new Array(6).fill(0)}}).experimentalToTransformation();return n.isIdentical(r)}function bC(a,e){if(O_(a.defaultPattern(),e))return!1;for(const n of"ULFRBD")for(let r=1;r<4;r++){const o=a.moveToTransformation(new X(n,r)).toKPattern();if(O_(o,e))return!1}return!0}var MC=[["R U'","R2 B","D2 B2","D' L B'","R' U'","B","D B2","R' B","L' U","L2 B'","B2","D L B'","L U","B'","U'","R B","D' B2","L B'","U2","U L' B'","","U' L' B'","U","L' B'"],["F2 L2","F' L'","R' F L2","D' L2","F L2","F2 L'","R' F' L'","R2 F L2","R2 F2 L'","L2","F L'","D' L","D2 L2","R2 F' L'","D L","","L2 F L'","L F' L2","L F L'","F' L2","L'","D L2","D F L'","L"],["R B U2 B'","R2 B U' B'","F2 B U B'","F B2 L' B2","B2 L B2","B U' B'","R2 B U2 B'","R' B U' B'","B2 L' B2","F B U B'","B2 U' B2","B' L B","L F' B D' B'","B' U' B2 D B'","B U2 B'","R B U' B'","B2 L2 B2","D' B' L B","B U B'","F' B2 L' B2","","B2 L' B' U' B'"],["U F2 L2 U'","F' U L' U'","F2 U L' U'","U F L2 U'","U2 B2 U2","R' U' B U","D2 U L U'","D U2 B' U2","U L2 U'","F U L' U'","D U L U'","U2 B' U2","","U2 B' U' L' U'","U2 L' U2","U' B U","U L U'","D' U2 B' U2","U L' U'","U2 B U2"],["R' D' F2","F'","F2","D R F'","R D' F2","R2 F'","D' F2","R F'","F2 R' D' F2","F","D2 F2","D' R F'","R2 D' F2","R' F'","D F2","D2 R F'","","F R' D' F2"],["R' D2 F' D F","R F2 R2 F2","R2 F' D2 F","F' R2 D2 F","L D' L'","D F' D2 F","F2 R2 F2","R F' D2 F","F' R2 D' F","F' R' D2 F","F2 R' F2","L D L'","F' R D' F","F2 R F2","F' D2 F","","L D2 R D' L'","F' D2 F' R F2","D2 R2 F2 R2 F2","D F' D' F","F' D F"],["U F2 U'","R U F' U'","D R U F2 U'","U F U'","R2 U F2 U'","R' U F' U'","R U F2 U'","R2 U F' U'","","U L D L' F U'","F2 D' R D F2","D2 U F U'","R' U F2 U'","U F' U'","F2 D2 R D2 F2","D U F U'"],["R2","R' B' D B","D R'","F' R2 F","","R B' D B","R'","B' D B","D' R'","D2 F' R2 F","R","R2 B' D B","D2 R'","B' D' B"],["R2 D' R2","F' R' F R","R D' R2 D R'","D2 R2 D2 R2","R' D' F' R F","U F D F' U'","","R2 D2 B R' B' R'","R' F D' F2 R F","R2 D R2","F2 U F U' F","R' D F' R F","D R2 D2 R2","U F D' F' U'","D R' D2 F' R F","R2 D2 R2","U F D2 F' U'","R' D2 F' R F"],["B R B'","F D F' B R2 B'","D B R2 B'","D2 B R' B'","B R2 B'","D B R' B'","D' B R2 B'","B R' B'","","B R2 B' D B R' B'","D2 B R2 B'","D' B R' B'"],["","R' D R F D2 F'","R' D R","D F D' F'","R F' R' F","F D' F'","R' D' R","F D2 F'","R' D2 R","F D F'"],["","F2 D2 R F' R' D2 F' D2 F'","F2 D2 F' D' F D' F' D2 F'","F2 D F2 D F2 D2 F2","D2 F L D2 L' D2 F'","D F D2 L D2 L' F'","R' D B' D2 B D' R","R' D2 B' D2 B R","F D2 F' D F D F'","F D' L D2 L' D F'","B D' F D B' D' F'","F D2 L D2 L' F'","F D' L D L' D F'","F L D2 L' D2 F'","R' B' D2 B D2 R"],["D'","F L D L' D' F'","D2","L B D B' D' L'","D","B' L' D' L D B","","D F L D L' D' F'"],["F' D2 F D F' D F","F' D' R' D R F","F' R' D' R D F","B D R D' R' B'","","D B' D' L' D L B"],["D F D F' D F D2 F'","F' U2 B' R' B U2 F' L F' L' F'","","D2 L D L2 F L F2 D F"],["L B' L' F L B L' F'","F2 U F' D2 F U' F' D2 F'","D' F' D B D' F D B'","F L2 F R2 F' L2 F R2 F2","D B D' F' D B' D' F","R F L F' R' F L' F'","","D2 B L' U2 L B' D2 B L' U2 L B'","D2 F R' U2 R F' D2 F R' U2 R F'","R F L' F' R' F L F'","D F D' B' D F' D' B","L2 F2 L' B2 L F2 L' B2 L'"],["L B R' B' L' B R B'","R' B R F' R' B' R F","L D2 L U L' D2 L U' L2","","D2 B' D2 F D' L2 F L2 F' D2 B D' F'","D2 F' R' F R2 B' D2 B D2 R' F D2 F'","L B L' F L B' L' F'","F' D2 F' U' F D2 F' U F2","D' B' D F D' B D F'"],["","D2 F' L U2 L' F D2 F' L U2 L' F","D2 B' R U2 R' B D2 B' R U2 R' B"]];async function $S(){const a=await lC["3x3x3"].kpuzzle();let e=a.defaultPattern();for(const n of MC)e=e.applyAlg(Ye.fromString(ZS(n)));return bC(a,e)?e:$S()}async function EC(a){return pC(),Ye.fromString((await JS).solvePattern(yC(a)))}async function TC(){return EC(await $S())}async function FD(){(await JS).initialize()}var AC=[[null,"Rw","Rw2","Rw'","Fw","Fw'"],[null,"Dw","Dw2","Dw'"]];async function PD(){return mC(await TC(),AC)}var ey=Symbol("Comlink.proxy"),RC=Symbol("Comlink.endpoint"),wC=Symbol("Comlink.releaseProxy"),Wh=Symbol("Comlink.finalizer"),Nu=Symbol("Comlink.thrown"),CC=!0,ty=a=>typeof a=="object"&&a!==null||typeof a=="function",DC={canHandle:a=>ty(a)&&a[ey],serialize(a){const{port1:e,port2:n}=new MessageChannel;return ay(a,e),[n,[n]]},deserialize(a){return a.start(),sy(a)}},LC={canHandle:a=>ty(a)&&Nu in a,serialize({value:a}){let e;return a instanceof Error?e={isError:!0,value:{message:a.message,name:a.name,stack:a.stack}}:e={isError:!1,value:a},[e,[]]},deserialize(a){throw a.isError?Object.assign(new Error(a.value.message),a.value):a.value}},ny=new Map([["proxy",DC],["throw",LC]]);function UC(a){const e={};function n(r,o){const c=e[r]?.get(o);c&&(a.off(r,c),e[r]?.delete(o))}return{postMessage:a.postMessage.bind(a),addEventListener:(r,o,c)=>{const f=h=>{c?.once&&n(r,f),"handleEvent"in o?o.handleEvent({data:h}):o({data:h})};a.on(r,f),(e[r]??new WeakMap).set(o,f)},removeEventListener:n,ref:a.ref?.bind(a),unref:a.unref?.bind(a),start:a.start?.bind(a),terminate:a.terminate?.bind(a),close:a.close?.bind(a)}}function iy(a){return!("addEventListener"in a)||!("removeEventListener"in a)?UC(a):a}function NC(a,e){for(const n of a)if(e===n||n==="*"||n instanceof RegExp&&n.test(e))return!0;return!1}function OC(){return globalThis.process?.getBuiltinModule("node:worker_threads").parentPort??globalThis}function ay(a,e=OC(),n=["*"]){const r=iy(e);r.addEventListener("message",function o(c){if(!c||!c.data)return;if(!NC(n,c.origin)){console.warn(`Invalid origin '${c.origin}' for comlink proxy`);return}const{id:f,type:h,path:m}={path:[],...c.data},p=(c.data.argumentList||[]).map(Xr);let x;try{const g=m.slice(0,-1).reduce((y,M)=>y[M],a),v=m.reduce((y,M)=>y[M],a);switch(h){case"GET":x=v;break;case"SET":g[m.slice(-1)[0]]=Xr(c.data.value),x=!0;break;case"APPLY":x=v.apply(g,p);break;case"CONSTRUCT":{const y=new v(...p);x=IC(y)}break;case"ENDPOINT":{const{port1:y,port2:M}=new MessageChannel;ay(a,M),x=BC(y,[y])}break;case"RELEASE":x=void 0;break;default:return}}catch(g){x={value:g,[Nu]:0}}Promise.resolve(x).catch(g=>({value:g,[Nu]:0})).then(g=>{const[v,y]=Xu(g);r.postMessage({...v,id:f},y),h==="RELEASE"&&(r.removeEventListener("message",o),ry(r),Wh in a&&typeof a[Wh]=="function"&&a[Wh]())}).catch(g=>{console.log(g);const[v,y]=Xu({value:new TypeError("Unserializable return value"),[Nu]:0});r.postMessage({...v,id:f},y)})}),r.start?.()}function ry(a){a.close?.(),a.terminate?.()}function sy(a,e,n){const r=iy(a),o=new Map;return r.addEventListener("message",function(f){const{data:h}=f;if(!h||!h.id)return;const m=o.get(h.id);if(m)try{m(h)}finally{o.delete(h.id),o.size===0&&CC&&r.unref?.()}}),jp({endpoint:r,pendingListeners:o},[],e)}function Tu(a){if(a)throw new Error("Proxy has been released and is not useable")}function oy(a){return eo(a,{type:"RELEASE"}).then(()=>{ry(a.endpoint)})}var Vu=new WeakMap,ku="FinalizationRegistry"in globalThis&&new FinalizationRegistry(a=>{const e=(Vu.get(a)||0)-1;Vu.set(a,e),e===0&&oy(a).finally(()=>{a.pendingListeners.clear()})});function FC(a,e){const n=(Vu.get(e)||0)+1;Vu.set(e,n),ku&&ku.register(a,e,a)}function PC(a){ku&&ku.unregister(a)}function jp(a,e=[],n=()=>{}){let r=!1;const o=new Proxy(n,{get(c,f){if(Tu(r),f===wC)return()=>{PC(o),oy(a).finally(()=>{a.pendingListeners.clear()}),r=!0};if(f==="then"){if(e.length===0)return{then:()=>o};const h=eo(a,{type:"GET",path:e.map(m=>m.toString())}).then(Xr);return h.then.bind(h)}return jp(a,[...e,f])},set(c,f,h){Tu(r);const[m,p]=Xu(h);return eo(a,{type:"SET",path:[...e,f].map(x=>x.toString()),value:m},p).then(Xr)},apply(c,f,h){Tu(r);const m=e[e.length-1];if(m===RC)return eo(a,{type:"ENDPOINT"}).then(Xr);if(m==="bind")return jp(a,e.slice(0,-1));const[p,x]=F_(h);return eo(a,{type:"APPLY",path:e.map(g=>g.toString()),argumentList:p},x).then(Xr)},construct(c,f){Tu(r);const[h,m]=F_(f);return eo(a,{type:"CONSTRUCT",path:e.map(p=>p.toString()),argumentList:h},m).then(Xr)}});return FC(o,a),o}function zC(a){return Array.prototype.concat.apply([],a)}function F_(a){const e=a.map(Xu);return[e.map(n=>n[0]),zC(e.map(n=>n[1]))]}var ly=new WeakMap;function BC(a,e){return ly.set(a,e),a}function IC(a){return Object.assign(a,{[ey]:!0})}function Xu(a){for(const[e,n]of ny)if(n.canHandle(a)){const[r,o]=n.serialize(a);return[{type:"HANDLER",name:e,value:r},o]}return[{type:"RAW",value:a},ly.get(a)||[]]}function Xr(a){switch(a.type){case"HANDLER":return ny.get(a.name).deserialize(a.value);case"RAW":return a.value}}function eo(a,e,n){const r=a.endpoint,o=a.pendingListeners;return new Promise(c=>{const f=GC();o.set(f,c),r.start?.(),r.ref?.(),r.postMessage({id:f,...e},n)})}function GC(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}function HC(a){if(!globalThis.location)return!1;const e=globalThis.location.origin,n=new URL(a,globalThis.location.href).origin;return e!==n}function P_(a,e){const n=HC(a);if(n){const o=`import ${JSON.stringify(a.toString())};`,c=new Blob([o],{type:"text/javascript"});a=URL.createObjectURL(c)}const r=new globalThis.Worker(a,{...e,type:"module"});if(n){const o=r.terminate.bind(r);Object.defineProperty(r,"terminate",{get(){URL.revokeObjectURL(a),o()}})}return r}function VC(a,e){const{Worker:n}=globalThis.process.getBuiltinModule("node:worker_threads");return a=typeof a=="string"&&a.startsWith("file://")?new URL(a):a,new n(a,e)}function kC(a,e){const n=globalThis.Worker,r=!!globalThis.process?.getBuiltinModule;if(n&&!r)return P_(a,e);const o=globalThis.Worker?.prototype.unref;return n&&r&&o?P_(a,e):VC(a,e)}var XC=kC;/*! Bundled license information:

@cubing/comlink-everywhere/dist/lib/comlink/index.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/var WC={expose:!0};function qC(){return import.meta.resolve("./search-worker-entry.js")}function YC(){return new URL("data:text/javascript;base64,aW1wb3J0IHsKICBleHBvc2VBUEkKfSBmcm9tICIuL2NodW5rLTdHVUwzT0JRLmpzIjsKCi8vIHNyYy9jdWJpbmcvc2VhcmNoL3dvcmtlci13b3JrYXJvdW5kcy9zZWFyY2gtd29ya2VyLWVudHJ5LmpzCmlmIChleHBvc2VBUEkuZXhwb3NlKSB7CiAgdm9pZCBpbXBvcnQoIi4vaW5zaWRlLVZVSlNQQlJBLmpzIikudGhlbigoKSA9PiB7CiAgICBpZiAoZ2xvYmFsVGhpcy5wb3N0TWVzc2FnZSkgewogICAgICBnbG9iYWxUaGlzLnBvc3RNZXNzYWdlKCJjb21saW5rLWV4cG9zZWQiKTsKICAgIH0gZWxzZSB7CiAgICAgIGdsb2JhbFRoaXMucHJvY2Vzcy5nZXRCdWlsdGluTW9kdWxlKCJub2RlOndvcmtlcl90aHJlYWRzIikucGFyZW50UG9ydD8ucG9zdE1lc3NhZ2UoImNvbWxpbmstZXhwb3NlZCIpOwogICAgfQogIH0pOwp9CnZhciBXT1JLRVJfRU5UUllfRklMRV9VUkwgPSBpbXBvcnQubWV0YS51cmw7CmV4cG9ydCB7CiAgV09SS0VSX0VOVFJZX0ZJTEVfVVJMCn07Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlYXJjaC13b3JrZXItZW50cnkuanMubWFwCg==",import.meta.url)}async function jC(){return WC.expose=!1,(await wn(async()=>{const{WORKER_ENTRY_FILE_URL:a}=await import("./search-worker-entry-dmpMgWhg.js");return{WORKER_ENTRY_FILE_URL:a}},[])).WORKER_ENTRY_FILE_URL}function KC(a){return sy(a)}async function qh(a){return new Promise(async(e,n)=>{try{const r=new XC(a),o=f=>{f==="comlink-exposed"?e(KC(r)):n(new Error(`wrong module instantiation message ${f}`))},c=f=>{n(f)};"once"in r?r.once("message",o):(r.addEventListener("error",c,{once:!0}),r.addEventListener("message",f=>o(f.data),{once:!0}))}catch(r){n(r)}})}async function ZC(){const a=QC(),e=await a;return e.setDebugMeasurePerf(Ou.logPerf),e.setDebugForceTwipsForScrambles(Ou.forceTwipsForScrambles),e.setScramblePrefetchLevel(Ou.scramblePrefetchLevel),a}async function QC(){globalThis.location?.protocol==="file:"&&console.warn("This current web page is loaded from the local filesystem (a URL that starts with `file://`). In this situation, `cubing.js` may be unable to generate scrambles or perform searches in some browsers. See: https://js.cubing.net/cubing/scramble/#file-server-required");function a(c){return"Module worker instantiation failed"}const o=[[async()=>qh(qC()),"using `import.meta.resolve(…)",null],[async()=>qh(await jC()),"using the `esbuild` workaround",null],[async()=>qh(YC()),"using `new URL(…, import.meta.url)`","will"]];for(const[c,f,h]of o)try{const m=await c();return h&&Ou.showWorkerInstantiationWarnings&&console.warn(`Module worker instantiation required ${f}. \`cubing.js\` ${h} not support this fallback in the future.`),m}catch{}throw new Error(`${a()}. There are no more fallbacks available.`)}var JC;function cy(){return JC??=ZC()}async function $C(a){const n=await(await cy()).randomScrambleStringForEvent(a);return Ye.fromString(n)}async function eD(a){const e=await cy();return Ye.fromString(await e.solve333ToString(a.patternData))}var Ou={logPerf:!0,scramblePrefetchLevel:"auto",forceNewWorkerForEveryScramble:!1,forceTwipsForScrambles:!1,showWorkerInstantiationWarnings:!0,prioritizeEsbuildWorkaroundForWorkerInstantiation:!1,allowDerivedScrambles:!1};async function uy(){return(await $C("333")).toString()}async function tD(a,e){let r=(await bm.kpuzzle()).defaultPattern().applyAlg(a);e.length>0&&(r=r.applyAlg(xS(e)));const o=(await eD(r)).toString().trim();return o===""?[]:Zu(o)}const z_=(a,e)=>a.base===e.base&&a.amount===e.amount;function fy(a,e){if(e.length<a.origin.length)return null;for(let r=0;r<a.origin.length;r++)if(!z_(a.origin[r],e[r]))return null;const n=e.slice(a.origin.length);if(n.length>a.solution.length)return null;for(let r=0;r<n.length;r++)if(!z_(a.solution[r],n[r]))return null;return n.length}function nD(a,e){const n=fy(a,e);return n===null?null:a.solution[n]??null}class iD{constructor(e){this.solve=e}plan=null;async next(e){if(this.plan){const r=nD(this.plan,e);if(r)return r;if(fy(this.plan,e)!==null)return null}const n=await this.solve(e);return n.length===0?(this.plan=null,null):(this.plan={origin:[...e],solution:n},n[0]??null)}reset(){this.plan=null}get planned(){return this.plan?this.plan.solution.map(Cl).join(" "):null}}const aD=1400;function rD(a,e,n){const[,r]=$e.useReducer(D=>D+1,0),o=$e.useRef(Vh({mode:n,goal:{kind:"solved"},scramble:""})),[c,f]=$e.useState(null),[h,m]=$e.useState(!0),[p,x]=$e.useState(!1),g=$e.useRef(void 0),v=$e.useRef(null),y=$e.useRef(null),M=$e.useCallback(D=>{e.thunk(),f(D),window.clearTimeout(g.current),g.current=window.setTimeout(()=>f(null),aD)},[e]),A=$e.useCallback(D=>{const G=o.current,L=QR(G,D);if(L===G){D.type==="turn"&&M(G.phase.kind==="finished"?"SOLVED · LOCKED":G.phase.kind==="holding"?"STILL HOLDING":"INSPECTING · NOT YET");return}o.current=L,L.cube!==G.cube&&a.current?.setState(L.cube),r()},[M,a]),b=$e.useCallback(D=>{const G=D?.mode??o.current.mode,L=D?.goal??o.current.goal;m(!0),f(null),uy().then(F=>{o.current=Vh({mode:G,goal:L,scramble:F}),y.current?.reset(),m(!1),r();const Z=a.current;Z&&(v.current?.(),v.current=Z.playSequence(um(),Zu(F),34,()=>Z.setState(o.current.cube)))}).catch(()=>{m(!1),M("SCRAMBLE FAILED")})},[M,a]),S=$e.useCallback(({scramble:D,goal:G,mode:L})=>{f(null),m(!1),v.current?.(),o.current=Vh({mode:L,goal:G,scramble:D}),y.current?.reset(),a.current?.setState(o.current.cube),r()},[a]),z=$e.useCallback(()=>{const D=o.current;D.phase.kind==="finished"||p||(y.current||(y.current=new iD(G=>tD(o.current.scramble,G))),x(!0),y.current.next(D.log.map(G=>G.move)).then(G=>{x(!1),G&&A({type:"hintShown",move:G})}).catch(()=>{x(!1),M("HINT UNAVAILABLE")}))},[M,A,p]);$e.useEffect(()=>()=>{window.clearTimeout(g.current),v.current?.()},[]);const N=$e.useCallback(D=>{(D.type==="turn"||D.type==="undo")&&v.current?.(),A(D)},[A]);return{session:o.current,refusal:c,scrambling:h,hintPending:p,dispatch:N,newScramble:b,startWith:S,requestHint:z}}const dy=[{name:"solves",keyPath:"id",indexes:[{name:"byCreatedAt",keyPath:"createdAt"},{name:"byDailyDate",keyPath:"dailyDate"}]},{name:"dailyScrambles",keyPath:"date"},{name:"patternRecords",keyPath:"patternId"},{name:"settings",keyPath:"key"}],B_="quarter-turn";function Mm(a){return new Promise((e,n)=>{a.onsuccess=()=>e(a.result),a.onerror=()=>n(a.error)})}function I_(a,e){return new Promise((n,r)=>{const o=a===void 0?indexedDB.open(B_):indexedDB.open(B_,a);o.onupgradeneeded=()=>e?.(o.result),o.onsuccess=()=>n(o.result),o.onerror=()=>r(o.error),o.onblocked=()=>r(new Error("The database is open in another tab. Close it and reload."))})}function sD(a){for(const e of dy){if(a.objectStoreNames.contains(e.name))continue;const n=a.createObjectStore(e.name,{keyPath:e.keyPath});for(const r of e.indexes??[])n.createIndex(r.name,r.keyPath,{unique:r.unique??!1})}}let Zs=null;function oD(){return Zs||(Zs=(async()=>{const a=await I_();if(dy.filter(o=>!a.objectStoreNames.contains(o.name)).length===0)return a.onversionchange=()=>a.close(),a;const n=a.version+1;a.close();const r=await I_(n,sD);return r.onversionchange=()=>r.close(),r})(),Zs.catch(()=>{Zs=null}),Zs)}async function xo(a,e,n){const r=await oD();return new Promise((o,c)=>{const f=r.transaction(a,e);let h,m=null;f.oncomplete=()=>m?c(m):o(h),f.onabort=()=>c(m??f.error??new Error("Transaction aborted")),f.onerror=()=>c(m??f.error??new Error("Transaction failed")),(async()=>{try{h=await n(f)}catch(p){m=p;try{f.abort()}catch{}}})()})}const Em=(a,e,n)=>Mm(a.objectStore(e).put(n)),lD=(a,e)=>Mm(a.objectStore(e).getAll()),Kp=(a,e,n)=>Mm(a.objectStore(e).get(n)),cD=a=>xo("solves","readwrite",async e=>{await Em(e,"solves",a)}),uD=()=>xo("solves","readonly",a=>lD(a,"solves"));async function fD(a,e){const n=await xo("dailyScrambles","readonly",o=>Kp(o,"dailyScrambles",a));if(n)return n.scramble;const r=await e();return xo("dailyScrambles","readwrite",async o=>{const c=await Kp(o,"dailyScrambles",a);return c?c.scramble:(await Em(o,"dailyScrambles",{date:a,scramble:r}),r)})}const dD=a=>xo("settings","readonly",async e=>(await Kp(e,"settings",a))?.value),hD=(a,e)=>xo("settings","readwrite",async n=>{await Em(n,"settings",{key:a,value:e})}),to=a=>({rawMs:a.rawMs,penalty:a.penalty}),Tm=a=>!a.hinted&&a.penalty!=="dnf",hy=5;function pD(a,e=hy){return a.filter(n=>n.goal.kind==="solved"&&Tm(n)).map(n=>({s:n,ms:Il(to(n))})).filter(n=>n.ms!==null).sort((n,r)=>n.ms-r.ms||n.s.createdAt.localeCompare(r.s.createdAt)).slice(0,e).map(n=>n.s)}function mD(a,e=hy){return a.filter(n=>n.goal.kind==="solved"&&Tm(n)).slice().sort((n,r)=>n.moveCount-r.moveCount||n.createdAt.localeCompare(r.createdAt)).slice(0,e)}function xD(a,e){return a.filter(r=>r.goal.kind==="pattern"&&r.goal.pattern===e&&Tm(r)).sort((r,o)=>r.moveCount-o.moveCount||r.createdAt.localeCompare(o.createdAt))[0]??null}const gD=(a,e)=>a.filter(n=>n.dailyDate===e).sort((n,r)=>r.createdAt.localeCompare(n.createdAt));function vD(a){const e=a.getFullYear(),n=String(a.getMonth()+1).padStart(2,"0"),r=String(a.getDate()).padStart(2,"0");return`${e}-${n}-${r}`}function _D(){const[a,e]=$e.useState([]),[n,r]=$e.useState(!1);$e.useEffect(()=>{let f=!1;return uD().then(h=>{f||(e(h),r(!0))}).catch(()=>{f||r(!0)}),()=>{f=!0}},[]);const o=$e.useCallback(async f=>{e(h=>[...h,f]);try{await cD(f)}catch{throw e(h=>h.filter(m=>m.id!==f.id)),new Error("This solve could not be saved.")}},[]),c=$e.useCallback(async()=>{const f=vD(new Date),h=await fD(f,uy);return{date:f,scramble:h}},[]);return{solves:a,ready:n,record:o,todaysScramble:c,readSetting:dD,writeSetting:hD}}function SD(a){const e=Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");return`${a}-${e}`}function yD(a,e,n){if(a.phase.kind!=="finished")return null;const r=e.toISOString();return{id:SD(r),createdAt:r,mode:a.mode,goal:a.goal,scramble:a.scramble,solution:xS(a.log.map(o=>o.move)),moveCount:a.moveCount,rawMs:a.phase.result.rawMs,penalty:a.phase.result.penalty,hinted:a.hinted,...n?{dailyDate:n}:{},splits:a.phase.splits}}function bD({onBothDown:a,onRelease:e}){const[n,r]=$e.useState(new Set),o=$e.useRef(!1),c=$e.useCallback(p=>{if(r(p),p.size>=2&&!o.current){o.current=!0,a();return}p.size<2&&o.current&&(o.current=!1,e())},[a,e]),f=p=>x=>{x.preventDefault();const g=new Set(n);g.add(p),c(g)},h=p=>x=>{x.preventDefault();const g=new Set(n);g.delete(p),c(g)},m=n.size>=2;return he.jsxs("div",{className:"hold","data-both":m,children:[[0,1].map(p=>he.jsx("div",{className:"hold__pad","data-down":n.has(p),"data-both":m,onPointerDown:f(p),onPointerUp:h(p),onPointerCancel:h(p),onPointerLeave:h(p),"aria-label":`Start pad ${p+1}`},p)),he.jsx("div",{className:"hold__rule","data-both":m})]})}function MD({elapsedMs:a}){const e=Math.max(0,Bp-a),n=a>=vS,r=a>=Bp,o=a>=8e3,c=a>=12e3,f=n?"dnf":r?"plus2":c?"second":o?"first":"idle";return he.jsxs("div",{className:"inspection","data-state":f,children:[he.jsx("span",{className:"inspection__number",children:(e/1e3).toFixed(1)}),r&&he.jsx("span",{className:"inspection__tag",children:n?"DNF":"+2"})]})}function ED({size:a=20,title:e}){return he.jsxs("svg",{width:a,height:a,viewBox:"0 0 30 30",fill:"none",xmlns:"http://www.w3.org/2000/svg",role:e?"img":"presentation","aria-hidden":e?void 0:!0,children:[e&&he.jsx("title",{children:e}),[0,1,2].map(f=>[0,1,2].map(h=>he.jsx("rect",{x:h*10+(f===0?5:0),y:f*10,width:8,height:8,fill:"currentColor",opacity:f===0?1:.42},`${f}-${h}`)))]})}function G_({title:a,rows:e,empty:n}){return he.jsxs("section",{className:"board",children:[he.jsx("h3",{className:"board__title",children:a}),e.length===0?he.jsx("p",{className:"board__empty",children:n}):he.jsx("ol",{className:"board__list",children:e.map((r,o)=>he.jsxs("li",{className:"board__row",children:[he.jsx("span",{className:"board__rank",children:o+1}),he.jsx("span",{className:"board__value",children:r})]},o))})]})}function TD(a){const{solves:e,today:n}=a,r=$e.useMemo(()=>pD(e),[e]),o=$e.useMemo(()=>mD(e),[e]),c=$e.useMemo(()=>[...e].sort((x,g)=>g.createdAt.localeCompare(x.createdAt)),[e]),f=$e.useMemo(()=>gD(e,n),[e,n]),h=$e.useMemo(()=>e.filter(x=>x.mode==="competition"&&x.goal.kind==="solved"&&!x.hinted).map(to),[e]),m=__(h,5),p=__(h,12);return he.jsxs("div",{className:"sheet",role:"dialog","aria-label":"Menu",children:[he.jsxs("div",{className:"sheet__head",children:[he.jsxs("h2",{className:"sheet__title",children:[he.jsx(ED,{size:18}),"RECORDS"]}),he.jsx("button",{className:"control",onClick:a.onClose,children:"CLOSE"})]}),he.jsxs("div",{className:"sheet__body",children:[he.jsx(G_,{title:"BEST SINGLE",empty:"No solves yet. Finish one and it lands here.",rows:r.map(x=>Jr(Il(to(x))))}),he.jsx(G_,{title:"FEWEST MOVES",empty:"No solves yet.",rows:o.map(x=>`${x.moveCount} moves · ${Jr(Il(to(x)))}`)}),he.jsxs("section",{className:"board",children:[he.jsx("h3",{className:"board__title",children:"BEST AVERAGE"}),he.jsxs("div",{className:"stat-row",children:[he.jsxs("div",{className:"stat",children:[he.jsx("span",{className:"stat__label",children:"AO5"}),he.jsx("span",{className:"stat__value",children:m?S_(PR(m)):"—"})]}),he.jsxs("div",{className:"stat",children:[he.jsxs("span",{className:"stat__label",children:["AO12 ",he.jsx("span",{className:"split__scope",children:"NOT WCA"})]}),he.jsx("span",{className:"stat__value",children:p?S_(zR(p)):"—"})]})]}),he.jsx("p",{className:"board__note",children:"Rolling, from Competition solves only."})]}),he.jsxs("section",{className:"board",children:[he.jsx("h3",{className:"board__title",children:"TODAY"}),he.jsx("button",{className:"control control--wide",onClick:a.onStartDaily,children:"DAILY SCRAMBLE"}),f.length===0?he.jsx("p",{className:"board__empty",children:"Today’s scramble is waiting."}):he.jsx("ol",{className:"board__list",children:f.map(x=>he.jsxs("li",{className:"board__row",children:[he.jsx("span",{className:"board__value",children:y_(to(x))}),he.jsxs("span",{className:"board__meta",children:[x.moveCount," moves"]})]},x.id))})]}),he.jsxs("section",{className:"board",children:[he.jsx("h3",{className:"board__title",children:"PATTERNS"}),he.jsx("ul",{className:"board__list",children:gS.map(x=>{const g=xD(e,x.id);return he.jsxs("li",{className:"board__row",children:[he.jsx("button",{className:"board__link",onClick:()=>a.onStartPattern(x.id),children:x.name.toUpperCase()}),he.jsx("span",{className:"board__meta",children:g?`${g.moveCount} moves`:"Not yet"})]},x.id)})}),he.jsx("p",{className:"board__note",children:"Patterns keep a move record, not a time."})]}),he.jsxs("section",{className:"board",children:[he.jsx("h3",{className:"board__title",children:"HISTORY"}),c.length===0?he.jsx("p",{className:"board__empty",children:"Nothing solved yet."}):he.jsx("ol",{className:"board__list",children:c.slice(0,40).map(x=>he.jsxs("li",{className:"board__row",children:[he.jsx("span",{className:"board__value",children:y_(to(x))}),he.jsxs("span",{className:"board__meta",children:[x.moveCount," moves",x.hinted?" · PRACTICE":"",x.goal.kind==="pattern"?` · ${x.goal.pattern.toUpperCase()}`:""]})]},x.id))})]}),he.jsxs("section",{className:"board",children:[he.jsx("h3",{className:"board__title",children:"COLOURS"}),he.jsx("div",{className:"choices",children:Object.values(zp).map(x=>he.jsxs("button",{className:"choice","data-selected":a.paletteId===x.id,onClick:()=>a.onPalette(x.id),children:[he.jsx("span",{className:"choice__swatches",children:Object.values(x.faces).map(g=>he.jsx("span",{className:"choice__swatch",style:{background:g}},g))}),x.name.toUpperCase()]},x.id))}),he.jsx("p",{className:"board__note",children:"Universal is derived for red-green colour vision deficiency. Face positions do not move."})]}),he.jsxs("section",{className:"board",children:[he.jsx("h3",{className:"board__title",children:"SOUND"}),he.jsx("button",{className:"control control--wide",onClick:()=>a.onSound(!a.soundOn),children:a.soundOn?"SOUND ON":"SOUND OFF"}),he.jsx("p",{className:"board__note",children:"iOS gives a web app no haptics, so sound is the only feel a turn has."})]})]})]})}function AD(a={}){const{immediate:e=!1,onNeedReload:n,onNeedRefresh:r,onOfflineReady:o,onRegistered:c,onRegisteredSW:f,onRegisterError:h}=a;let m,p,x;const g=async(y=!0)=>{await p,x?.()};async function v(){if("serviceWorker"in navigator){if(m=await wn(async()=>{const{Workbox:y}=await import("./workbox-window.prod.es5-BBnX5xw4.js");return{Workbox:y}},[]).then(({Workbox:y})=>new y("/sw.js",{scope:"/",type:"classic"})).catch(y=>{h?.(y)}),!m)return;x=()=>{m?.messageSkipWaiting()};{let y=!1;const M=()=>{y=!0,m?.addEventListener("controlling",A=>{A.isUpdate&&(n?n():window.location.reload())}),r?.()};m.addEventListener("installed",A=>{typeof A.isUpdate>"u"?typeof A.isExternal<"u"&&A.isExternal?M():!y&&o?.():A.isUpdate||o?.()}),m.addEventListener("waiting",M)}m.register({immediate:e}).then(y=>{f?f("/sw.js",y):c?.(y)}).catch(y=>{h?.(y)})}}return p=v(),g}function RD(a={}){const{immediate:e=!0,onNeedReload:n,onNeedRefresh:r,onOfflineReady:o,onRegistered:c,onRegisteredSW:f,onRegisterError:h}=a,[m,p]=$e.useState(!1),[x,g]=$e.useState(!1),[v]=$e.useState(()=>AD({immediate:e,onNeedReload:n,onOfflineReady(){g(!0),o?.()},onNeedRefresh(){p(!0),r?.()},onRegistered:c,onRegisteredSW:f,onRegisterError:h}));return{needRefresh:[m,p],offlineReady:[x,g],updateServiceWorker:v}}function wD(){const{needRefresh:[a,e],updateServiceWorker:n}=RD();return a?he.jsxs("div",{className:"update-prompt",role:"status",children:[he.jsx("span",{children:"A new version is ready."}),he.jsxs("div",{className:"update-prompt__actions",children:[he.jsx("button",{className:"control",onClick:()=>void n(!0),children:"RELOAD"}),he.jsx("button",{className:"control",onClick:()=>e(!1),children:"LATER"})]})]}):null}function CD(a){const e=a.lastIndexOf(".");return e<0?[a,""]:[a.slice(0,e),a.slice(e)]}function DD({splits:a}){const e=a?.shape==="cfop"?a:null,n=o=>o===null?"—":Jr(o),r=[["CROSS",null,e?e.cross.atMs:null],["F2L","CFOP",e?e.f2l.atMs:null],["OLL","CFOP",e?e.oll.atMs:null],["SOLVED",null,e?e.solved.atMs:null]];return he.jsx("div",{className:"splits",children:r.map(([o,c,f])=>he.jsxs("div",{children:[he.jsxs("div",{className:"split__label",children:[o,c&&he.jsx("span",{className:"split__scope",children:c})]}),he.jsx("div",{className:"split__value",children:n(f)})]},o))})}function LD(){const a=$e.useRef(null),e=$e.useRef(null),n=$e.useRef(new AR),[r,o]=$e.useState("casual"),[c,f]=$e.useState("cardinal"),[h,m]=$e.useState(!0),[p,x]=$e.useState(!1),[g,v]=$e.useState(()=>performance.now()),[y,M]=$e.useState(null),[A,b]=$e.useState(""),[S,z]=$e.useState(!0),N=_D(),D=rD(e,n.current,r),G=$e.useRef(D);G.current=D;const L=$e.useRef(N);L.current=N,$e.useEffect(()=>{const U=a.current;if(!U)return;const K=new dR(U,zp.cardinal);e.current=K;const ye=n.current,Ae=new TR(K,{onGrab:()=>ye.unlock(),onRelease:()=>{},onDetent:()=>ye.tick(),onSnapStart:we=>{window.setTimeout(()=>ye.clack(),Math.min(70,we*.6))},onCommit:we=>G.current.dispatch({type:"turn",move:we,at:performance.now()})}),Fe=()=>K.resize();window.addEventListener("resize",Fe);const ie=()=>ye.unlock();window.addEventListener("pointerdown",ie,{once:!0});const ce=window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0;return z(ce),G.current.newScramble(),L.current.todaysScramble().then(({date:we})=>b(we)),()=>{window.removeEventListener("resize",Fe),window.removeEventListener("pointerdown",ie),Ae.dispose(),K.dispose(),e.current=null}},[]),$e.useEffect(()=>{e.current?.setPalette(zp[c])},[c]),$e.useEffect(()=>{n.current.setEnabled(h)},[h]);const{session:F}=D,Z=F.phase.kind,C=Z==="solving",w=Z==="inspecting"||Z==="holding",k=Z==="finished";$e.useEffect(()=>{if(!C&&!w)return;let U=0;const K=()=>{v(performance.now()),U=requestAnimationFrame(K)};return U=requestAnimationFrame(K),()=>cancelAnimationFrame(U)},[C,w]);const ne=$e.useRef({first:!1,second:!1}),le=jR(F,g);$e.useEffect(()=>{if(!w){ne.current={first:!1,second:!1};return}le>=8e3&&!ne.current.first&&(ne.current.first=!0,n.current.call(1)),le>=12e3&&!ne.current.second&&(ne.current.second=!0,n.current.call(2))},[w,le]);const fe=$e.useRef(null);$e.useEffect(()=>{if(F.phase.kind!=="finished")return;const U=`${F.scramble}|${F.log.length}|${F.phase.result.rawMs}`;if(fe.current===U)return;fe.current=U;const K=yD(F,new Date,y??void 0);K&&N.record(K).catch(()=>{})},[F,y,N]);const pe=$e.useCallback(U=>{fe.current=null,M(null),x(!1),G.current.newScramble(U)},[]);$e.useEffect(()=>{});const P=YR(F,g),[te,j]=CD(Jr(P)),ve=k?F.phase.result.penalty:"none",Se=ve==="dnf"?"DNF":ve==="plus2"?"+2":F.hinted?"PRACTICE · NO RECORD":"";return he.jsxs("div",{className:"solve",children:[he.jsx("div",{}),he.jsxs("div",{className:"rail gutter",children:[he.jsx("button",{className:"chip",onClick:()=>{const U=r==="casual"?"competition":"casual";o(U),pe({mode:U})},children:r==="casual"?"CASUAL":"COMPETITION"}),he.jsx("button",{className:"rail__menu",onClick:()=>x(!0),children:"MENU"})]}),he.jsx("div",{}),he.jsxs("div",{className:"readout gutter",children:[w?he.jsx(MD,{elapsedMs:le}):he.jsxs("div",{className:"timer","data-live":C||k,"data-settled":k,children:[te,he.jsx("span",{className:"timer__fraction",children:j})]}),he.jsx("div",{}),he.jsx("div",{className:"qualifier","data-alarm":ve!=="none",children:Se}),he.jsx("div",{}),he.jsx(DD,{splits:k?F.phase.splits:null})]}),he.jsxs("div",{className:"stage",ref:a,children:[Z==="covered"&&he.jsx("button",{className:"reveal",onClick:()=>D.dispatch({type:"reveal",at:performance.now()}),children:"REVEAL SCRAMBLE"}),k&&he.jsx("button",{className:"again",onClick:()=>pe({}),children:"NEXT SCRAMBLE"}),!S&&he.jsx("div",{className:"install-note",children:"Add to your home screen. In a Safari tab, the edge swipe fights the cube."})]}),he.jsx("div",{className:"notation gutter","data-refused":D.refusal!==null,"data-mode":D.refusal!==null?"refusal":F.log.length===0?"scramble":"log",children:D.refusal!==null?D.refusal:F.log.length===0?he.jsxs(he.Fragment,{children:[he.jsx("span",{className:"notation__label",children:"SCRAMBLE"}),D.scrambling?"…":Z==="covered"?"COVERED":F.scramble]}):F.log.map((U,K)=>he.jsx("span",{className:"notation__move",children:Cl(U.move)},`${K}-${Cl(U.move)}`))}),he.jsx("div",{}),he.jsxs("div",{className:"controls gutter",children:[he.jsxs("button",{className:"control",disabled:!bS(F),onClick:()=>D.dispatch({type:"undo",at:performance.now()}),children:[he.jsx("span",{className:"control__glyph",children:"‹"})," UNDO"]}),he.jsxs("div",{className:"movecount",children:[he.jsx("span",{className:"movecount__value",children:F.moveCount}),he.jsx("span",{className:"movecount__label",children:"MOVES"})]}),he.jsx("div",{className:"controls__spacer"}),he.jsxs("div",{className:"control-stack",children:[he.jsxs("button",{className:"control",disabled:k||D.hintPending,onClick:()=>D.requestHint(),children:["HINT ",he.jsx("span",{className:"control__glyph",children:"?"})]}),he.jsx("span",{className:"control__scope",children:"PRACTICE"})]})]}),he.jsx("div",{}),w&&he.jsx(bD,{onBothDown:()=>D.dispatch({type:"holdDown",at:performance.now()}),onRelease:()=>D.dispatch({type:"holdUp",at:performance.now()})}),D.session.shownHint&&he.jsxs("div",{className:"hint-token",children:[he.jsx("span",{className:"hint-token__move",children:Cl(D.session.shownHint)}),he.jsx("span",{className:"hint-token__scope",children:"SOLVER’S ROUTE"})]}),he.jsx(wD,{}),p&&he.jsx(TD,{solves:N.solves,today:A,paletteId:c,soundOn:h,onPalette:f,onSound:m,onClose:()=>x(!1),onStartDaily:()=>{x(!1),N.todaysScramble().then(({date:U,scramble:K})=>{fe.current=null,M(U),G.current.startWith({scramble:K,goal:{kind:"solved"},mode:r})})},onStartPattern:U=>{fe.current=null,M(null),x(!1),G.current.startWith({scramble:"",goal:{kind:"pattern",pattern:U},mode:r})}})]})}R1.createRoot(document.getElementById("root")).render(he.jsx($e.StrictMode,{children:he.jsx(LD,{})}));export{Ye as A,Oi as G,_m as K,$u as L,X as M,Ta as Q,UD as T,wn as _,ay as a,Hl as b,XS as c,TC as d,WC as e,vm as f,mC as g,ES as h,OD as i,FD as j,hC as k,pC as m,lC as p,PD as r,EC as s,ND as w};
