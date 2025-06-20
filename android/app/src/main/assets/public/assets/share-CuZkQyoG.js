import{r as x,j as a}from"./index-7zqVQZSl.js";import{d as O,c as ve,q as Ne,y as Ee,z as Ae,A as Se,T as ee,a as X,t as V,s as Ue,B as Oe,x as Ce,v as De,C as Ie,D as H,E as Pe,F as je,G as ae,H as Le,I as Be,J as Fe,K as Me,L as $e,M as He,N as qe,O as te,S as ze}from"./auth.client-CflvfX9_.js";import{u as We}from"./AuthContext-sY7-ro_6.js";import{S as Ve}from"./SideBar-RPPDQC4C.js";/* empty css               */import{O as Ke}from"./Overall-AhJsQqpO.js";import"./components-D-6D0vyL.js";const q="Posts";function Xe(){return String(Math.floor(1e4+Math.random()*9e4))}function Ge(){const e=new Date,t=String(e.getDate()).padStart(2,"0"),n=String(e.getMonth()+1).padStart(2,"0"),s=e.getFullYear();return`${t}${n}${s}`}async function Je(e){if(typeof window>"u")return null;if(!O)throw new Error("Firestore not initialized");try{const t=Ge(),n=Xe(),s=`PS-${t}-${n}`,r=X(O,q,s),o={id:s,...e,support_count:0,created_at:V(),latest_update:V()};return await Ue(r,o),o}catch(t){return console.error("Error creating post with random ID:",t),null}}async function Ye(e,t){if(typeof window>"u")return!1;try{if(!O)throw new Error("Firestore instance is not initialized.");const n=X(O,q,e);return await Ce(n,{support_count:De(t||1),latest_update:V()}),!0}catch(n){return console.error(`Error incrementing support count for post ID ${e}:`,n),!1}}async function Ze(e){if(typeof window>"u")return!1;try{if(!O)throw new Error("Firestore instance is not initialized.");const t=X(O,q,e);return await Oe(t),!0}catch(t){return console.error(`Error deleting post with ID ${e}:`,t),!1}}function Qe(e={},t){if(typeof window>"u"||!O)return()=>{};const n=ve(O,q),s=Ne(n,Ae("created_at","desc"),Ee(e.limitCount||20));return Se(s,o=>{const i=[];o.forEach(l=>{const c=l.data();i.push({id:l.id,...c,created_at:c.created_at instanceof ee?c.created_at:void 0,latest_update:c.latest_update instanceof ee?c.latest_update:void 0})}),t(i)},o=>{console.error("Realtime post listener error:",o),t([])})}function et(e){return e.startsWith("image/")?"image":e.startsWith("video/")?"video":e.startsWith("audio/")?"audio":"file"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le="firebasestorage.googleapis.com",ce="storageBucket",tt=2*60*1e3,nt=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f extends $e{constructor(t,n,s=0){super(z(t),`Firebase Storage: ${n} (${z(t)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,f.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return z(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var h;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(h||(h={}));function z(e){return"storage/"+e}function G(){const e="An unknown error occurred, please check the error payload for server response.";return new f(h.UNKNOWN,e)}function st(e){return new f(h.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function rt(e){return new f(h.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function ot(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new f(h.UNAUTHENTICATED,e)}function it(){return new f(h.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function at(e){return new f(h.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function lt(){return new f(h.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function ct(){return new f(h.CANCELED,"User canceled the upload/download.")}function ut(e){return new f(h.INVALID_URL,"Invalid URL '"+e+"'.")}function dt(e){return new f(h.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function ht(){return new f(h.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+ce+"' property when initializing the app?")}function ft(){return new f(h.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function pt(){return new f(h.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function mt(e){return new f(h.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function K(e){return new f(h.INVALID_ARGUMENT,e)}function ue(){return new f(h.APP_DELETED,"The Firebase app was deleted.")}function gt(e){return new f(h.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function F(e,t){return new f(h.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function B(e){throw new f(h.INTERNAL_ERROR,"Internal error: "+e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let s;try{s=k.makeFromUrl(t,n)}catch{return new k(t,"")}if(s.path==="")return s;throw dt(t)}static makeFromUrl(t,n){let s=null;const r="([A-Za-z0-9.\\-_]+)";function o(g){g.path.charAt(g.path.length-1)==="/"&&(g.path_=g.path_.slice(0,-1))}const i="(/(.*))?$",l=new RegExp("^gs://"+r+i,"i"),c={bucket:1,path:3};function u(g){g.path_=decodeURIComponent(g.path)}const p="v[A-Za-z0-9_]+",v=n.replace(/[.]/g,"\\."),R="(/([^?#]*).*)?$",b=new RegExp(`^https?://${v}/${p}/b/${r}/o${R}`,"i"),N={bucket:1,path:3},T=n===le?"(?:storage.googleapis.com|storage.cloud.google.com)":n,m="([^?#]*)",E=new RegExp(`^https?://${T}/${r}/${m}`,"i"),d=[{regex:l,indices:c,postModify:o},{regex:b,indices:N,postModify:u},{regex:E,indices:{bucket:1,path:2},postModify:u}];for(let g=0;g<d.length;g++){const C=d[g],L=C.regex.exec(t);if(L){const _=L[C.indices.bucket];let w=L[C.indices.path];w||(w=""),s=new k(_,w),C.postModify(s);break}}if(s==null)throw ut(t);return s}}class _t{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(e,t,n){let s=1,r=null,o=null,i=!1,l=0;function c(){return l===2}let u=!1;function p(...m){u||(u=!0,t.apply(null,m))}function v(m){r=setTimeout(()=>{r=null,e(b,c())},m)}function R(){o&&clearTimeout(o)}function b(m,...E){if(u){R();return}if(m){R(),p.call(null,m,...E);return}if(c()||i){R(),p.call(null,m,...E);return}s<64&&(s*=2);let d;l===1?(l=2,d=0):d=(s+Math.random())*1e3,v(d)}let N=!1;function T(m){N||(N=!0,R(),!u&&(r!==null?(m||(l=2),clearTimeout(r),v(0)):m||(l=1)))}return v(0),o=setTimeout(()=>{i=!0,T(!0)},n),T}function bt(e){e(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(e){return e!==void 0}function xt(e){return typeof e=="object"&&!Array.isArray(e)}function J(e){return typeof e=="string"||e instanceof String}function ne(e){return Y()&&e instanceof Blob}function Y(){return typeof Blob<"u"}function se(e,t,n,s){if(s<t)throw K(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw K(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e,t,n){let s=t;return n==null&&(s=`https://${t}`),`${n}://${s}/v0${e}`}function de(e){const t=encodeURIComponent;let n="?";for(const s in e)if(e.hasOwnProperty(s)){const r=t(s)+"="+t(e[s]);n=n+r+"&"}return n=n.slice(0,-1),n}var P;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(P||(P={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(e,t){const n=e>=500&&e<600,r=[408,429].indexOf(e)!==-1,o=t.indexOf(e)!==-1;return n||r||o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(t,n,s,r,o,i,l,c,u,p,v,R=!0,b=!1){this.url_=t,this.method_=n,this.headers_=s,this.body_=r,this.successCodes_=o,this.additionalRetryCodes_=i,this.callback_=l,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=p,this.connectionFactory_=v,this.retry=R,this.isUsingEmulator=b,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((N,T)=>{this.resolve_=N,this.reject_=T,this.start_()})}start_(){const t=(s,r)=>{if(r){s(!1,new M(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const i=l=>{const c=l.loaded,u=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&o.addUploadProgressListener(i),o.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(i),this.pendingConnection_=null;const l=o.getErrorCode()===P.NO_ERROR,c=o.getStatus();if(!l||Rt(c,this.additionalRetryCodes_)&&this.retry){const p=o.getErrorCode()===P.ABORT;s(!1,new M(!1,null,p));return}const u=this.successCodes_.indexOf(c)!==-1;s(!0,new M(u,o))})},n=(s,r)=>{const o=this.resolve_,i=this.reject_,l=r.connection;if(r.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());yt(c)?o(c):o()}catch(c){i(c)}else if(l!==null){const c=G();c.serverResponse=l.getErrorText(),this.errorCallback_?i(this.errorCallback_(l,c)):i(c)}else if(r.canceled){const c=this.appDelete_?ue():ct();i(c)}else{const c=lt();i(c)}};this.canceled_?n(!1,new M(!1,null,!0)):this.backoffId_=wt(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&bt(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class M{constructor(t,n,s){this.wasSuccessCode=t,this.connection=n,this.canceled=!!s}}function kt(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function vt(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Nt(e,t){t&&(e["X-Firebase-GMPID"]=t)}function Et(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function At(e,t,n,s,r,o,i=!0,l=!1){const c=de(e.urlParams),u=e.url+c,p=Object.assign({},e.headers);return Nt(p,t),kt(p,n),vt(p,o),Et(p,s),new Tt(u,e.method,p,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r,i,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Ut(...e){const t=St();if(t!==void 0){const n=new t;for(let s=0;s<e.length;s++)n.append(e[s]);return n.getBlob()}else{if(Y())return new Blob(e);throw new f(h.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Ot(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(e){if(typeof atob>"u")throw mt("base-64");return atob(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class W{constructor(t,n){this.data=t,this.contentType=n||null}}function Dt(e,t){switch(e){case S.RAW:return new W(he(t));case S.BASE64:case S.BASE64URL:return new W(fe(e,t));case S.DATA_URL:return new W(Pt(t),jt(t))}throw G()}function he(e){const t=[];for(let n=0;n<e.length;n++){let s=e.charCodeAt(n);if(s<=127)t.push(s);else if(s<=2047)t.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const o=s,i=e.charCodeAt(++n);s=65536|(o&1023)<<10|i&1023,t.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?t.push(239,191,189):t.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(t)}function It(e){let t;try{t=decodeURIComponent(e)}catch{throw F(S.DATA_URL,"Malformed data URL.")}return he(t)}function fe(e,t){switch(e){case S.BASE64:{const r=t.indexOf("-")!==-1,o=t.indexOf("_")!==-1;if(r||o)throw F(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break}case S.BASE64URL:{const r=t.indexOf("+")!==-1,o=t.indexOf("/")!==-1;if(r||o)throw F(e,"Invalid character '"+(r?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Ct(t)}catch(r){throw r.message.includes("polyfill")?r:F(e,"Invalid character found")}const s=new Uint8Array(n.length);for(let r=0;r<n.length;r++)s[r]=n.charCodeAt(r);return s}class pe{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw F(S.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=n[1]||null;s!=null&&(this.base64=Lt(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=t.substring(t.indexOf(",")+1)}}function Pt(e){const t=new pe(e);return t.base64?fe(S.BASE64,t.rest):It(t.rest)}function jt(e){return new pe(e).contentType}function Lt(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(t,n){let s=0,r="";ne(t)?(this.data_=t,s=t.size,r=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),s=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),s=t.length),this.size_=s,this.type_=r}size(){return this.size_}type(){return this.type_}slice(t,n){if(ne(this.data_)){const s=this.data_,r=Ot(s,t,n);return r===null?null:new U(r)}else{const s=new Uint8Array(this.data_.buffer,t,n-t);return new U(s,!0)}}static getBlob(...t){if(Y()){const n=t.map(s=>s instanceof U?s.data_:s);return new U(Ut.apply(null,n))}else{const n=t.map(i=>J(i)?Dt(S.RAW,i).data:i.data_);let s=0;n.forEach(i=>{s+=i.byteLength});const r=new Uint8Array(s);let o=0;return n.forEach(i=>{for(let l=0;l<i.length;l++)r[o++]=i[l]}),new U(r,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(e){let t;try{t=JSON.parse(e)}catch{return null}return xt(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function Ft(e,t){const n=t.split("/").filter(s=>s.length>0).join("/");return e.length===0?n:e+"/"+n}function ge(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(e,t){return t}class y{constructor(t,n,s,r){this.server=t,this.local=n||t,this.writable=!!s,this.xform=r||Mt}}let $=null;function $t(e){return!J(e)||e.length<2?e:ge(e)}function _e(){if($)return $;const e=[];e.push(new y("bucket")),e.push(new y("generation")),e.push(new y("metageneration")),e.push(new y("name","fullPath",!0));function t(o,i){return $t(i)}const n=new y("name");n.xform=t,e.push(n);function s(o,i){return i!==void 0?Number(i):i}const r=new y("size");return r.xform=s,e.push(r),e.push(new y("timeCreated")),e.push(new y("updated")),e.push(new y("md5Hash",null,!0)),e.push(new y("cacheControl",null,!0)),e.push(new y("contentDisposition",null,!0)),e.push(new y("contentEncoding",null,!0)),e.push(new y("contentLanguage",null,!0)),e.push(new y("contentType",null,!0)),e.push(new y("metadata","customMetadata",!0)),$=e,$}function Ht(e,t){function n(){const s=e.bucket,r=e.fullPath,o=new k(s,r);return t._makeStorageReference(o)}Object.defineProperty(e,"ref",{get:n})}function qt(e,t,n){const s={};s.type="file";const r=n.length;for(let o=0;o<r;o++){const i=n[o];s[i.local]=i.xform(s,t[i.server])}return Ht(s,e),s}function we(e,t,n){const s=me(t);return s===null?null:qt(e,s,n)}function zt(e,t,n,s){const r=me(t);if(r===null||!J(r.downloadTokens))return null;const o=r.downloadTokens;if(o.length===0)return null;const i=encodeURIComponent;return o.split(",").map(u=>{const p=e.bucket,v=e.fullPath,R="/b/"+i(p)+"/o/"+i(v),b=Z(R,n,s),N=de({alt:"media",token:u});return b+N})[0]}function Wt(e,t){const n={},s=t.length;for(let r=0;r<s;r++){const o=t[r];o.writable&&(n[o.server]=e[o.local])}return JSON.stringify(n)}class be{constructor(t,n,s,r){this.url=t,this.method=n,this.handler=s,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(e){if(!e)throw G()}function Vt(e,t){function n(s,r){const o=we(e,r,t);return ye(o!==null),o}return n}function Kt(e,t){function n(s,r){const o=we(e,r,t);return ye(o!==null),zt(o,r,e.host,e._protocol)}return n}function xe(e){function t(n,s){let r;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?r=it():r=ot():n.getStatus()===402?r=rt(e.bucket):n.getStatus()===403?r=at(e.path):r=s,r.status=n.getStatus(),r.serverResponse=s.serverResponse,r}return t}function Xt(e){const t=xe(e);function n(s,r){let o=t(s,r);return s.getStatus()===404&&(o=st(e.path)),o.serverResponse=r.serverResponse,o}return n}function Gt(e,t,n){const s=t.fullServerUrl(),r=Z(s,e.host,e._protocol),o="GET",i=e.maxOperationRetryTime,l=new be(r,o,Kt(e,n),i);return l.errorHandler=Xt(t),l}function Jt(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function Yt(e,t,n){const s=Object.assign({},n);return s.fullPath=e.path,s.size=t.size(),s.contentType||(s.contentType=Jt(null,t)),s}function Zt(e,t,n,s,r){const o=t.bucketOnlyServerUrl(),i={"X-Goog-Upload-Protocol":"multipart"};function l(){let d="";for(let g=0;g<2;g++)d=d+Math.random().toString().slice(2);return d}const c=l();i["Content-Type"]="multipart/related; boundary="+c;const u=Yt(t,s,r),p=Wt(u,n),v="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+p+`\r
--`+c+`\r
Content-Type: `+u.contentType+`\r
\r
`,R=`\r
--`+c+"--",b=U.getBlob(v,s,R);if(b===null)throw ft();const N={name:u.fullPath},T=Z(o,e.host,e._protocol),m="POST",E=e.maxUploadRetryTime,A=new be(T,m,Vt(e,n),E);return A.urlParams=N,A.headers=i,A.body=b.uploadData(),A.errorHandler=xe(t),A}class Qt{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=P.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=P.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=P.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,s,r,o){if(this.sent_)throw B("cannot .send() more than once");if(ae(t)&&s&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,t,!0),o!==void 0)for(const i in o)o.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,o[i].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw B("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw B("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw B("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw B("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class en extends Qt{initXhr(){this.xhr_.responseType="text"}}function Re(){return new en}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(t,n){this._service=t,n instanceof k?this._location=n:this._location=k.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new j(t,n)}get root(){const t=new k(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return ge(this._location.path)}get storage(){return this._service}get parent(){const t=Bt(this._location.path);if(t===null)return null;const n=new k(this._location.bucket,t);return new j(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw gt(t)}}function tn(e,t,n){e._throwIfRoot("uploadBytes");const s=Zt(e.storage,e._location,_e(),new U(t,!0),n);return e.storage.makeRequestWithTokens(s,Re).then(r=>({metadata:r,ref:e}))}function nn(e){e._throwIfRoot("getDownloadURL");const t=Gt(e.storage,e._location,_e());return e.storage.makeRequestWithTokens(t,Re).then(n=>{if(n===null)throw pt();return n})}function sn(e,t){const n=Ft(e._location.path,t),s=new k(e._location.bucket,n);return new j(e.storage,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(e){return/^[A-Za-z]+:\/\//.test(e)}function on(e,t){return new j(e,t)}function Te(e,t){if(e instanceof Q){const n=e;if(n._bucket==null)throw ht();const s=new j(n,n._bucket);return t!=null?Te(s,t):s}else return t!==void 0?sn(e,t):e}function an(e,t){if(t&&rn(t)){if(e instanceof Q)return on(e,t);throw K("To use ref(service, url), the first argument must be a Storage instance.")}else return Te(e,t)}function re(e,t){const n=t==null?void 0:t[ce];return n==null?null:k.makeFromBucketSpec(n,e)}function ln(e,t,n,s={}){e.host=`${t}:${n}`;const r=ae(t);r&&(Le(`https://${e.host}`),Be("Storage",!0)),e._isUsingEmulator=!0,e._protocol=r?"https":"http";const{mockUserToken:o}=s;o&&(e._overrideAuthToken=typeof o=="string"?o:Fe(o,e.app.options.projectId))}class Q{constructor(t,n,s,r,o,i=!1){this.app=t,this._authProvider=n,this._appCheckProvider=s,this._url=r,this._firebaseVersion=o,this._isUsingEmulator=i,this._bucket=null,this._host=le,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=tt,this._maxUploadRetryTime=nt,this._requests=new Set,r!=null?this._bucket=k.makeFromBucketSpec(r,this._host):this._bucket=re(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=k.makeFromBucketSpec(this._url,t):this._bucket=re(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){se("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){se("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(Me(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new j(this,t)}_makeRequest(t,n,s,r,o=!0){if(this._deleted)return new _t(ue());{const i=At(t,this._appId,s,r,n,this._firebaseVersion,o,this._isUsingEmulator);return this._requests.add(i),i.getPromise().then(()=>this._requests.delete(i),()=>this._requests.delete(i)),i}}async makeRequestWithTokens(t,n){const[s,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,s,r).getPromise()}}const oe="@firebase/storage",ie="0.13.12";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="storage";function cn(e,t,n){return e=H(e),tn(e,t,n)}function un(e){return e=H(e),nn(e)}function dn(e,t){return e=H(e),an(e,t)}function hn(e=Ie(),t){e=H(e);const s=Pe(e,ke).getImmediate({identifier:t}),r=je("storage");return r&&fn(s,...r),s}function fn(e,t,n,s={}){ln(e,t,n,s)}function pn(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return new Q(n,s,r,t,ze)}function mn(){He(new qe(ke,pn,"PUBLIC").setMultipleInstances(!0)),te(oe,ie,""),te(oe,ie,"esm2017")}mn();async function gn(e){const t=hn(),n=dn(t,`media/${Date.now()}_${e.name}`);return await cn(n,e),await un(n)}function _n(){const{user:e}=We(),[t,n]=x.useState({display_name:(e==null?void 0:e.displayName)||"",user_id:"",content:"",media:null}),[s,r]=x.useState(!1),[o,i]=x.useState(null),[l,c]=x.useState([]),[u,p]=x.useState([]),[v,R]=x.useState([]),[b,N]=x.useState(null),T=x.useRef(null),m=x.useRef(null),E=x.useRef(null);let A=null,d=null;async function g(_){_.preventDefault(),r(!0),i(null),t!=null&&t.media&&(d=t==null?void 0:t.media,A=await gn(d));let w={display_name:t.display_name.trim(),user_id:t.user_id.trim()||"anonymous",content:t.content.trim(),media:null,tags:[]};d&&(w.media=[{url:A||"",type:d?et(d.type):"file",name:(d==null?void 0:d.name)||"",mime_type:(d==null?void 0:d.type)||""}]);try{await Je(w)?(n({display_name:"",user_id:"",content:"",media:null}),T!=null&&T.current&&(T.current.value=""),m!=null&&m.current&&(m.current.value=""),E!=null&&E.current&&(E.current.value="")):i("ไม่สามารถสร้างโพสต์ได้ กรุณาลองใหม่")}catch(D){console.error(D),i("เกิดข้อผิดพลาดในการส่งโพสต์")}finally{r(!1)}}function C(_){const{name:w,value:D}=_.target;n(I=>({...I,[w]:D}))}const L=_=>{c(w=>w.filter((D,I)=>I!==_)),p(w=>w.filter((D,I)=>I!==_)),R(w=>w.filter((D,I)=>I!==_))};return a.jsx("div",{className:"mb-4",children:a.jsxs("form",{onSubmit:g,className:"space-y-4 border bg-white   rounded-xl p-5",children:[a.jsx("input",{type:"text",name:"display_name",placeholder:"Display name",className:"w-full px-3 py-2 ",value:t.display_name,onChange:C,required:!0}),a.jsxs("label",{htmlFor:"",className:"relative",children:[a.jsx("textarea",{name:"content",placeholder:"What is in your mind?",className:"w-full px-3 py-2 min-h-[100px] max-h-[300px]",rows:2,value:t.content,onChange:_=>C(_),required:!0}),a.jsxs("div",{className:"absolute right-0 bottom-14 px-2 text-sm",children:[t.content.length," "]}),a.jsx("div",{className:"flex gap-2",children:(l==null?void 0:l.length)>0&&(l==null?void 0:l.map((_,w)=>a.jsxs("div",{className:"mt-4 relative",children:[b==="image"&&a.jsx("img",{src:_,alt:"prev",className:"max-w-xs rounded-xl"}),b==="video"&&a.jsx("video",{src:_,controls:!0,className:"max-w-xs rounded"}),b==="audio"&&a.jsx("audio",{src:_,controls:!0}),b==="application"&&a.jsx("a",{href:_,target:"_blank",rel:"noopener noreferrer",className:"text-blue-500 underline",children:"Preview file"}),a.jsx("div",{onClick:()=>L(w),className:"absolute top-0 right-0 rounded-full bg-black/80 text-white p-1 m-2",children:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",children:a.jsx("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18 6L6 18M6 6l12 12"})})})]})))}),a.jsxs("section",{className:"flex justify-between",children:[a.jsx("div",{className:"flex gap-2 items-center"}),a.jsx("button",{type:"submit",disabled:t.content.length<=0,className:" disabled:opacity-50",children:a.jsx("div",{className:"btn-question",children:s?"กำลังโพสต์...":"โพสต์เลย"})})]})]}),o&&a.jsx("p",{className:"text-red-600",children:o})]})})}function wn(e){return e>=1e9?(e/1e9).toFixed(1).replace(/\.0$/,"")+"B":e>=1e6?(e/1e6).toFixed(1).replace(/\.0$/,"")+"M":e>=1e3?(e/1e3).toFixed(1).replace(/\.0$/,"")+"K":e.toString()}function bn(e){const t=Math.floor((Date.now()-e.getTime())/1e3),n=[[60,"Just now"],[60*60,"m"],[60*60*24,"h"],[60*60*24*7,"d"],[60*60*24*30,"w"],[60*60*24*365,"mo"],[1/0,"y"]];if(t<60)return"Just now";for(let s=1;s<n.length;s++){const r=n[s][0],o=n[s][1],i=n[s-1][0];if(t<r)return`${Math.floor(t/i)}${o} ago`}return"A long time ago"}const Sn=()=>{const e="Selfness Share Feed - โพสต์เลย! แบ่งปันทุกความรู้และทริคการพัฒนาตัวเอง",t="Selfness Share Feed: พื้นที่ปลอดภัยให้คุณฝึกโพสต์ แบ่งปันความรู้ ทริคการพัฒนา Soft Skill และเรื่องราวของคุณ เพื่อสร้างความมั่นใจและแรงบันดาลใจให้ผู้อื่น",n="https://selfness.khain.app/share",s="https://selfness.khain.app/images/selfness-share-og-image.jpg";return[{title:e},{name:"description",content:t},{name:"keywords",content:"Selfness, Soft Skill, การสื่อสาร, พัฒนาตัวเอง, โพสต์, แบ่งปัน, ความรู้, ทริค, แรงบันดาลใจ, ชุมชน, โซเชียล"},{name:"robots",content:"index, follow"},{property:"og:title",content:e},{property:"og:description",content:t},{property:"og:url",content:n},{property:"og:type",content:"website"},{property:"og:image",content:s},{property:"og:image:width",content:"1200"},{property:"og:image:height",content:"630"},{property:"og:site_name",content:"Selfness"},{property:"og:locale",content:"th_TH"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:e},{name:"twitter:description",content:t},{name:"twitter:image",content:s},{name:"twitter:alt",content:"Selfness Share: พื้นที่แบ่งปันความรู้และทริคการพัฒนา Soft Skill"}]};function Un(){const[e,t]=x.useState();return x.useEffect(()=>{const n=Qe({limitCount:20},s=>{t(s)});return()=>n()},[]),a.jsxs("div",{className:"flex",children:[a.jsx(Ve,{}),a.jsxs("main",{className:"max-h-[100vh] w-full flex overflow-auto p-5 pb-20 bg-zinc-200/30",children:[a.jsxs("section",{className:" max-w-4xl w-full",children:[a.jsx("h1",{className:"text-2xl font-bold mb-6 ",children:"Selfness Feed"}),a.jsx(_n,{}),e?e.map(n=>a.jsx(yn,{post:n},n.id)):a.jsx("div",{className:"m-auto w-fit h-fit",children:"Loading..."})]}),a.jsx(Ke,{})]})]})}function yn({post:e}){var r,o;const[t,n]=x.useState(!1),s=async()=>{try{e.id&&await Ze(e.id)&&alert("Successfully")}catch(i){alert(`ERROR ${i==null?void 0:i.message}`)}};return a.jsx("div",{className:"",children:a.jsxs("div",{className:"bg-white border box rounded-lg p-4 mb-4",children:[a.jsxs("div",{className:"flex justify-between items-center ",children:[a.jsxs("div",{className:"flex items-center  gap-5",children:[a.jsx("p",{className:"font-semibold",children:e.display_name}),e.created_at&&a.jsxs("p",{className:"text-sm text-gray-500",children:[" • ",bn((r=e.created_at)==null?void 0:r.toDate())]})]}),a.jsxs("div",{className:"relative",children:[a.jsx("button",{onClick:()=>n(i=>!i),className:"bg-white p-2 rounded-md hover:bg-zinc-200/30",children:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",children:a.jsx("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"})})}),t&&a.jsx("div",{className:"p-1 absolute right-0 shadow rounded-md min-w-[200px] mt-1",children:a.jsx("button",{onClick:()=>s(),className:"bg-white hover:bg-zinc-100/30 w-full px-2 py-1 text-left rounded-sm",children:"Delete"})})]})]}),a.jsx("p",{className:"mt-2",children:e.content}),e.media&&e.media.length>0&&a.jsx("div",{className:"mt-2",children:(o=e.media)==null?void 0:o.map(i=>{switch(i.type){case"image":return a.jsx("img",{src:i.url,alt:i.name||"Image"});case"video":return a.jsx("video",{controls:!0,src:i.url});case"audio":return a.jsx("audio",{controls:!0,src:i.url});case"file":return a.jsx("a",{href:i.url,download:!0,children:i.name||"Download file"})}})}),a.jsx(xn,{value:e.support_count,id:e.id})]})})}function xn({value:e=0,id:t}){const[n,s]=x.useState(0),r=x.useRef(null);function o(){s(i=>i+1),r.current&&clearTimeout(r.current),r.current=setTimeout(async()=>{t&&await Ye(t,n+1),s(0)},3e3)}return a.jsx("button",{type:"button",onClick:()=>o(),className:"bg-white group btn-bubble animate",children:a.jsx("div",{className:" ",children:a.jsxs("div",{className:" flex gap-2 items-center",children:[a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:32,height:32,viewBox:"0 0 24 24",className:"fill-none active:scale-105  bg-white p-1 hover:bg-zinc-300/20 rounded-md group-active:fill-yellow-500 group-active:text-indigo-500 group-focus:fill-yellow-500",children:a.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 5h2M5 4v2m6.5-2L11 6m7-1h2m-1-1v2m-4 3l-1 1m4 3l2-.5M18 19h2m-1-1v2m-5-3.482L7.482 10l-4.39 9.58a1 1 0 0 0 1.329 1.329z"})}),a.jsxs("div",{className:"relative",children:[wn(e+n),a.jsx("div",{className:" group-active:opacity-100 opacity-0 absolute duration-300 top-[-15px] group-active:animate-ping text-[var(--secondary-color)]",children:"+1"})]})]})})})}export{Un as default,Sn as meta};
