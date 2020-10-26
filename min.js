!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).litAssertDirective={})}(this,(function(e){"use strict";
/**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */const t=new WeakMap,n=e=>(...n)=>{const o=e(...n);return t.set(o,!0),o}
/**
     * @license
     * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */,o={},s=(e,t)=>"function"==typeof e&&e(t)||e;e.assertAsyncDirective=function(e,t,i=o){return n((n=>o=>{o.setValue(s(e,n)),Promise.resolve(n).then((e=>s(t,e)),(e=>s(i,e))).then((e=>(o.setValue(e),o.commit())))}))},e.assertDirective=function(e,t=o){return n((n=>o=>{const i=s(Boolean(n)&&e||t,n);o.setValue(i)}))},Object.defineProperty(e,"__esModule",{value:!0})}));
