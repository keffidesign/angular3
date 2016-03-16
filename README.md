# Reangulact

This is an experimental library in pure JS6/JSX that allows to design UI components most abstract non-obtrusive way.

We intended to be _actually_ declarative reactive functional oriented.

We have got the best from React and Angular2: it can use either, staying agnostic about underlying engine.

## Features

Most important features:
 - static JSX template with `if/each` directives and `:key` placeholders.
 - `init()`, `render()`, `done()` life-cycle hooks, on state changed hooks.
 - getters
 - pipes
 - ???

## Example 

in MyList.es6

```javascript
import template from 'template.jsx';

class MyList extends Component {

    static DEFAULTS = {
       caption: "List",
       data: [ { id: 1, name: 'Item 1', tags: [ { name: 'some' } ] } ]
    }

    static TEMPLATE = template;
    
    init(){
        ...
    }
    
    getIsActive(){
    
        return this.get('active') === this.get('datum.id')
    }
    
    activeChanged(){
    
        doSomething();
    }
    
    itemClicked(ev){
    
        this.set("active", ev.currentTarget.dataset('id'));
    }

}

```

in template.jsx

```html
<div>
    <h1>:caption</h1>

    <ul if=':data'>
    
        <li each='datum of :data' class=":{item: true, active: (:isActive)}">
        
            <h2 click=":itemClicked" data-id=":datum.id">:datum.name</h2>
            
            <ul>
                <li each='tag of :datum.tags'>:(tag (:tag.name) of datum (:datum.name))</li>
            </ul>
            
        </li>
        
        <else if=':error'>
        
            <span>:(Error: (:error.message))</span>
            
            <else>
                <span>:no_data | string </span>
            </else>
            
        </else>
        
    </ul>
    
    <ui.Button caption=':(Apply  :caption)'/>
</div>
```
