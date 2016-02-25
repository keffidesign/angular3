# Reangulact

This is an experimental library that allows to design UI components in pure-JS/JSX non-obtrusive way.

It is about to get the best from React and Angular2.

It can be runned over both of them, but not aware of any underlying UI framework or library based on.

> Main Idea is to make things as abstract as possible, to extremely simplify sacrifying rarely used flexibility.

## Features

Most important features are following:
 - reactive functional state-driven approach.
 - JSX template is static (no any JS expression injections).
 - `if` and `each` directives used to add dynamics.
 - `$[key]` placeholder can be resolved into `state.key` or `this.key()`
 - `init()`, `done()`, `update()` life-time hook can be used to manage state and adopt rendering.

## Example 

in Component.es6

```javascript
import template from 'template.jsx';

class Button extends BaseComponent {

    init() {
        
        super.init();
        
        this.state ={data:[{id:1, name:'Item 1', tags;[{name:'some'}]},...]};
    }
    done() {
    
        super.done();
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
    
    getHasError(){
        return !!this.getState('error')
    }

}

```

in template.jsx

```javascript

<ul if='hasData'>
    <li each='datum of data'>
        #[caption]
        #[datum.name]
        <ul>
            <li each='tag of datum.tags'>tag.name = #[tag.name] datum.name = #[datum.name]</li>
        </ul>
    </li>
    <else if='hasError'>
        <span>Error: #[error.message]</span>
        <else>
            <span>No data</span>
        </else>
    </else>
</ul>
```
