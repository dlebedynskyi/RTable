# RTable
======
RTable is [React](http://facebook.github.io/react/) component for fast rendering table data. 
  - Fast and simple render or data based on data and definitions array
  - Support for filtering and row selection
  - All event are fired with support of PubSub so that component is responsible only for rendering and nothing else
  - Supplied as UMD module. So that you can use it as plain include, [Require](http://requirejs.org/) or common.js module

### Version
0.6.1-alpha

### Dependencies

RTable has only following dependencies 

* [React](http://facebook.github.io/react/) - React framework
* [PubSubJS](https://github.com/mroderick/PubSubJS) - Dependency free publish/subscribe for JavaScript

### Installation
For simple use you only need  to clone git 
```sh
$ git clone https://github.com/dlebedynskyi/RTable RTable
```
Or Use bower component 
```sh
bower install -S rtable
```


### Documentation 
#### Usage
Since RTable is supplied as [UMD module](https://github.com/umdjs/umd) you can reference it in several ways
1. By simply adding it to page  
 ` 
    <script src="./bower_components/rtable/dist/rtable.min.js"></script>
`
 In this case RTable will look for 2 dependencies  - [React](http://facebook.github.io/react/) and [Pubsub](https://github.com/mroderick/PubSubJS).

2. using [require.js](http://requirejs.org/) AMD module   
3. as Common JS module. *You may find Common JS modules in **cjs** folder*

You can  mount component to DOM using standard React methods  
 ```
    var settings = {},
        reactElement = React.createElement(RTable.Component, settings); 
    React.render(reactElement, document.getElementById('app'));
```

#### Configuration 
Following setting are supported  to set as settings. 
```javascript
 var settings = {
    //Array with data rows for table. Order sensitive
    //React.PropTypes.arrayOf(React.PropTypes.object)
    data : [], //default is empty array
    //Columns definitions.  Order sensitive
    //React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.string),React.PropTypes.arrayOf(React.PropTypes.object)])
    definitions : [], //default is empty array
    //Property that defines where in data object to look for values to display. 
    //example. If dataProp === 'values' then  each object in data array need to have {values : { ...} } as a place to store values for columns
    //React.PropTypes.string
    dataProp : '.',//defualt is '.' - points that root of data object will be used to look for values
    // In case definition of column is an object
    //Property that will be looked for in each column object to use as property name to look for in data item.
    //example. If columnFieldValueProp === 'field' then each column will have following { field :'testName', name :'Test Name' }. This will allow to get values from data array as data[i]['testName'] to be displayed
    //React.PropTypes.string
    columnFieldValueProp : 'field', //default is 'field'
    // In case definition of column is an object
    //Property that will be looked for in each column object to use as property name to look for in data item.
    //example. If columnNameProp === 'name' then each column will have following { field :'testName', name :'Test Name' }. This will display column header as Test Name
    //React.PropTypes.string
    columnNameProp : 'name', //default is 'name'
    //Should filters row be displayed. 
    //React.PropTypes.bool
    enableFilters : true,
    //Should the selection check-boxes be displayed before each row.
    //React.PropTypes.bool
    enableSelection : true,
    //css classes to be added to table css class definition
    //React.PropTypes.string
    classes : '',
    //Table performance optimisation flag. 
    //React.PropTypes.bool
    optimization : true,
    //should table apply fixed header and only body content scrolling.
    // This will add 'rtable-fixed-header' class to table css classes and will require correct css classes declarations.
    fixedHeader : false
 }
```

#### How to ? 
1. Render simple table with pretty titles?    
```javascript
var settings = settings = { columnFieldValueProp : 'field', columnNameProp : 'title', dataProp : '.'},
        reactElement = React.createElement(RTable.Component, settings), 
        component = React.render(reactElement, document.getElementById('app'));
    //columns
var definitions = [{field : 'col_1', title : 'Column 1 '}, {field : 'col_2', title : 'Column 2 '}],
    //rows
    data = [{col_1 : 'TEST ROW 1 COL 1', col_2: 'TEST ROW 1 COL 2'}, 
            {col_1 : 'TEST ROW 2 COL 1', col_2: 'TEST ROW 2 COL 2'}];
//updating props to render new values            
component.setProps({definitions : definitions, data : data});
```
2. Render table with fixed header ?   
```javascript
<!-- add following css styles -->
<link rel="stylesheet" type="text/css" href="bower_components/rtable/css/styles.css">
....
 var settings = {fixedHeader : true},
        reactElement = React.createElement(RTable.Component, settings); 
    React.render(reactElement, document.getElementById('app'));
```
3. Render new values?   
Simply call ```setProps``` with new values  
```javascript
    //updated all
    component.setProps({definitions : definitions, data : data});
    //update only data
    component.setProps({data : data});
    //update colums only
    component.setProps({definitions : definitions});
```
Please visit [github pages](dlebedynskyi.github.io/RTable) if you need more demo and examples
### Development

Want to contribute? Great!

At the current moment I'm using gulp with [gulp-pure-cjs](https://github.com/parroit/gulp-pure-cjs/)
Open your favorite Terminal and run these commands.

First Tab:
```sh
$ gulp  build watch
```

Second Tab:
```sh
$ gulp test
```



### Todo's

 - Write Tests
 - Write documentation 
 - Add Code Comments
 - Write Angular directive wrapper
 - Rethink pubsub to a simpler one or another approach
 - Implement columns resize and variable width

