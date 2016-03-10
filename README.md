# Reangulact

This is an experimental library that allows to design UI components in pure JS6/JSX non-obtrusive way.

It is about to get the best from React and Angular2 and can be run over both of them, but not aware of any underlying UI framework or library based on.

> To make things as abstract as possible, keep on declarative side.

## Features

Most important features are following:
 - reactive functional state-driven approach.
 - static JSX template with `if/each` directives and `:key` placeholders.
 - `init()`, `initialSate()`, `done()` life-cycle hooks.

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
                <li each='tag of :datum.tags'>: tag: (:tag.name) datum: (:datum.name)</li>
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
