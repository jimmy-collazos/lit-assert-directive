> :warning: :warning:  **Paquete deprecado** :warning: :warning: en favor de https://github.com/jimmy-collazos/lit-directive-assert para respetar una convención de nombres (para directivas de lit-html) estándar. Por favor use `lit-directive-assert`

# Assert Directive for lit-html

Esta directiva exporta dos factorías de [Directivas, de LitHtml,](https://lit-html.polymer-project.org/guide/creating-directives) para pintar un resultado en función de un valor. Éste valor puede ser un Promise o otro valor; según la parte (propiedad, atributo, evento, contenido) que se quiera actualizar.

Está muy enfocado a un estilo más funcional; donde creamos una función que devuelve un templete en función del resultado.

## # assertDirective(trueOptionResult, falseOptionResult)

Esta función de factoría que duelve una función, tipo, _assert_ que pintará uno de los valores proporcionados.

### _Parámentros_
* **trueOptionResult**: Estes es un argumento **OptionResult** (ver descripción al final de este documento) que será renderizado en caso de que el *assert* sea positivo
* **falseOptionResult**: Estes es un argumento **OptionResult** (ver descripción al final de este documento) que será renderizado en caso de que el *assert* sea negativo. Por defecto su valor es [nothing](https://lit-html.polymer-project.org/api/modules/_lit_html_.html#nothing)

### _Valor Devuelto_
Devuelve una función que recibe un único argumento que será transformado a *Boolean* y según el valor se renderizará una de las opciones proporcionadas

### Ejemplo:

```javascript
import {render, html} from 'lit-html'
import {assertDirective} from 'lit-assert-directive';

const assertPart = assertDirective('ok', 'ko');
const assertEventPart = assertDirective(_ => console.log('ok'), _ => console.log('ko'));

render(html`
  <h1>Assert</h1>

  <h2>Node Part</h2>
  <ul>
    <li> ok === ${assertPart(true)}</li>
    <li> ko === ${assertPart(false)}</li>
  </ul>

  <h2>Property Part</h2>
  <ul>
    <li> <span .title=${assertPart(true)}>ok</span></li>
    <li> <span .title=${assertPart(false)}>ok</span></li>
  </ul>
  
  <h2>Attribute Part</h2>
  <ul>
    <li>ok == <input type="text" value="${assertPart(true)}" /></li>
    <li>ko == <input type="text" value="${assertPart(false)}" /></li>
  </ul>

  <h2>Event Part</h2>
  <ul>
    <li> <span @click=${assertEventPart(true)}>ok</span></li>
    <li> <span @click=${assertEventPart(false)}>ko</span></li>
  </ul>`, window.container);
```

## # assertAsyncDirective(pendingTemplatePart, successTemplatePart, errorTemplatePart)

Esta función duelve una función, tipo, _assert_ que evalua [Promises]() y en función de la resolución de ésta, pinta uno de los _templates_ proporcionados:


### _Parámentros_
* **pendingTemplatePart**:  Estes es un argumento **OptionResult** (ver descripción al final de este documento) que será renderizado mientras el estado de la _Promise_ sea igual a _"pending"_
* **successOptionResult**: Estes es un argumento **OptionResult** (ver descripción al final de este documento) que será renderizado cuando la _Promise_ accabe en _success_
* **errorOptionResult**: Estes es un argumento **OptionResult** (ver descripción al final de este documento) que será renderizado cuando la _Promise_ accabe en _error_. Por defecto su valor es [nothing](https://lit-html.polymer-project.org/api/modules/_lit_html_.html#nothing)

### _Valor Devuelto_
Devuelve una función que recibe un único argumento que será una _Promise_ y según el estado y resultado de ésta; se renderizará una de las opciones proporcionadas

### Ejemplo
```javascript
import {render, html} from 'lit-html'
import {assertAsyncDirective} from 'lit-assert-directive';

const assertAsyncPart = assertAsyncDirective('pending...', 'ok', 'ko');
const assertAsyncEventPart = assertAsyncDirective(
  v => ev => console.log('pending...', ev, v), 
  v => ev => console.log('ok', ev, v), 
  v => ev => console.log('ko', ev, v));

const pendingPromise = new Promise((resolve) => setTimeout(_ => resolve(), 3000));

render(html`
  <h1>Assert</h1>

  <h2>Node Part</h2>
  <ul>
    <li> async: ok === ${assertAsyncPart(Promise.resolve())}</li>
    <li> async: ko === ${assertAsyncPart(Promise.reject())}</li>
    <li> async: -- === ${assertAsyncPart(pendingPromise)}</li>
  </ul>
  
  <h2>Property Part</h2>
  <ul>
    <li> <span .title=${assertAsyncPart(Promise.resolve())}>ok</span></li>
    <li> <span .title=${assertAsyncPart(Promise.reject())}>ok</span></li>
    <li> <span .title=${assertAsyncPart(pendingPromise)}>ok</span></li>
  </ul>

  <h2>Attribute Part</h2>
  <ul>
    <li> async: ok === <input type="text" value="${assertAsyncPart(Promise.resolve())}" /></li>
    <li> async: ko === <input type="text" value="${assertAsyncPart(Promise.reject())}" /></li>
    <li> async: -- === <input type="text" value="${assertAsyncPart(pendingPromise)}" /></li>
  </ul>
  
  <h2>Event Part</h2>
  <ul>
    <li> <span @click=${assertAsyncEventPart(Promise.resolve())}>ko</span></li>
    <li> <span @click=${assertAsyncEventPart(Promise.reject())}>ko</span></li>
    <li> <span @click=${assertAsyncEventPart(pendingPromise)}>ko</span></li>
  </ul>`, window.container);
```

## Argumento OptionResult
Según la parte que se quiere cambiar:
  * [*NodePart*](https://lit-html.polymer-project.org/api/classes/_lit_html_.nodepart.html) : Un valor cualquiera, incluído un [TemplateResult](https://lit-html.polymer-project.org/api/classes/_lit_html_.templateresult.html) (html\`\<i\>somevalue\</i\>\`)
  * [*AttributePart*](https://lit-html.polymer-project.org/api/classes/_lit_html_.attributepart.html) : Un valor cualquiera
  * [*BooleanAttributePart*](https://lit-html.polymer-project.org/api/classes/_lit_html_.booleanattributepart.html) : Un valor cualquiera
  * [*EventPart*](https://lit-html.polymer-project.org/api/classes/_lit_html_.eventpart.html) : Un valor cualquiera o un [EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener)
  * [*PropertyPart*](https://lit-html.polymer-project.org/api/classes/_lit_html_.propertypart.html) : Un valor cualquiera
  También puede ser una función que devuelva uno de estos valores. Esta posibilidad es para facilitar una [evaluación perezoso](https://es.wikipedia.org/wiki/Evaluaci%C3%B3n_perezosa)
