# Main Syntax

#### Placeholders
```
#[path.to.data.or.function]
```
#[<...>] is a placeholder. Inserts value from scope to the string.

    // example
    <h1>Tasks: #[data.length]</h1>

#### Directive  ___if___ 
```
<h1 if='data'>Tasks: #[data.length]</h1>
```
* ___if___ directive check whether we need to show element.
* ___data___ is any value or a function which returns such value.
```
<h1 if='data'>
    Tasks: #[data.length]
    <else>
        <h1>There are no tasks</h1>
    <else>
</h1>
```
* ___<else></else>___ is used to provide alternative way.

#### Directive  ___each___ 
```
<ul>
    <li each='data'>#[datum.name]</li>
</ul>
```
* ___each___ directive will clone an element which was defined on
* ___data___ is an array or a function which returns an array.
* ___datum___ is singular name for data in that case determines automaticly

```
// Verbose version
<ul>
    <li each='d of data'>#[d.name]</li>
</ul>
```

#### Example 
```
<ul if='hasData'>
    <li each='datum of getData'>
        #[getString]
        #[datum.name]
        <ul>
            <li each='datum.tags'>tag.name = #[tag.name] datum.name = #[datum.name]</li>
        </ul>
    </li>
    <else if='hasError'>
        <span>Error occurred</span>
        <else>
            <span>There is no data</span>
        </else>
    </else>
</ul>
```