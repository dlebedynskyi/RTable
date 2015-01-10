# RTable
======
RTable is [React](http://facebook.github.io/react/) component for fast rendering table data. 
  - Fast and simple render or data based on datas and definitions array
  - Support for filtering and row selection
  - All event are fired with support of PubSub so that component is responsible only for rendering and nothing else
  - Supplied as UMD module. So that you can use it as plain include, [Require](http://requirejs.org/) or common.js module

### Version
0.6.1-alpha

### Dependencies

RTable has only following dependancies 

* [React](http://facebook.github.io/react/) - React framework
* [PubSubJS](https://github.com/mroderick/PubSubJS) - Dependency free publish/subscribe for JavaScript

### Installation
For simple use you only need  to clone git 
```sh
$ git clone https://github.com/dlebedynskyi/RTable RTable
```


### Documentation 
Please visit [github pages](dlebedynskyi.github.io/RTable)
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
 - Rethink pubsub to a simpler one or annother approach
 - Impliment columns resize and variable width

