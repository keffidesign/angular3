# Reangulact

This is an experimental libraryin pure JS6/JSX that allows to design UI components most abstract non-obtrusive way.

We intended to keep on declarative side providing functional reactive approach.

We have got the best from React and Angular2: it can be run over both of them, staying agnostic of underlying UI framework or library based on.

## Features

Most important features:
 - static JSX template with `if/each` directives and `:key` placeholders.
 - `init()`, `render()`, `done()` life-cycle hooks.
 - getters
 - pipes
 - data-driven component

## Example 

in MyList.es6

```javascript
import template from 'template.jsx';

class MyList extends Component {

    getDefaults() {
        
        return { data:[ {id: 1, name: 'Item 1', tags:[{name:'some'}]}};
    }
    
    render(){
    
        return template;
    }
    
    getCaption(){
        return this.getState('caption') || 'Apply'
    }
    
    getHasData(){
        return !!this.getState('data')
    }

}

```

in template.jsx

```html
<div>
    <h1>:caption</h1>

    <ul if=":hasData">
        <li each='datum of :data'>
            <p>:datum.name</p>
            <ul>
                <li each='tag of :datum.tags'>: tag (:tag.name) of datum (:datum.name)</li>
            </ul>
        </li>
        <else if=':hasError'>
            <span>:Error: (:error.message)</span>
            <else>
                <span>No data</span>
            </else>
        </else>
    </ul>
    
    <ui.Button caption=":(Apply  :caption)"/>
</div>
```
