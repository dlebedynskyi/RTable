/** @jsx React.DOM */

jest.dontMock('../cjs/RTable');
//pubsub =  jest.genMockFromModule('pubsub-js');

describe('RxTable', function() {
  var React, RTableComponent, pubsub, TestUtils;

  beforeEach(function(){
    React = require('react/addons');
    RTableComponent = require('../cjs/RTable').Component;
    pubsub = require('pubsub-js');
    TestUtils = React.addons.TestUtils;

  })

  it('init default values and declare its is published', function() {
    // Render component
    var elRTable = TestUtils.renderIntoDocument(React.createElement(RTableComponent, null));

    var props = elRTable.props;

    expect(props.dataProp).toBe('.');
    expect(props.columnFieldValueProp).toBe('field');
    expect(props.columnNameProp).toBe('name');
    
    expect(props.enableSelection).toBe(true);
    expect(props.optimization).toBe(true);
    expect(props.enableFilters).toBe(true);
    console.log('props.classes');
    expect(props.classes).toBe('');

    expect(props.data.length).toBe(0);
    expect(props.definitions.length).toBe(0);
    expect(props.fixedHeader).toBeFalsy();

    expect(pubsub.publish.mock.calls[0][0]).toEqual('RTable.Mounted');
  });

  it(' renders default table markup on start', function(){
     // Render component 
    var elRTable = TestUtils.renderIntoDocument(React.createElement(RTableComponent, null));

    var node = elRTable.getDOMNode();
    
    expect(node.className).toContain('rtable');    
    expect(node.children.length).toBe(3);
    
    expect(node.children[0].children.length).toBe(0);
    expect(node.children[1].children.length).toBe(0);
    expect(node.children[2].children.length).toBe(0);
      
  });

  it(' sets additional classes supplied from props', function(){
     // Render component 
    var settings = {classes : 'test'};
    var reactElement = React.createElement(RTableComponent, settings);
    var elRTable = TestUtils.renderIntoDocument(reactElement);

    var node = elRTable.getDOMNode();
      
    expect(node.className).toContain('test'); 
    expect(node.className).toContain('rtable');
  });


  it('set correct style if fixedHeader  property is set ', function(){      
      // Render component
      var elRTable = TestUtils.renderIntoDocument(React.createElement(RTableComponent, {fixedHeader : true}));
      
      var node = elRTable.getDOMNode();
      expect(node.className).toContain('rtable-fixed-header');
  });

  it('renders selection column if some data is present ', function(){      
      // Render component
      var settings = {fixedHeader : true, enableSelection : true, data : [{}]};
      var element = React.createElement(RTableComponent, settings);
      var elRTable = TestUtils.renderIntoDocument(element);
      
      var allColsSelection = TestUtils.scryRenderedDOMComponentsWithClass(elRTable, 'rtable-selection');
      
      expect(allColsSelection.length).toBe(3);        
    
      expect(allColsSelection[0].tagName).toBe("COL");
      expect(allColsSelection[1].tagName).toBe("TH");
      expect(allColsSelection[2].tagName).toBe("TH");
      

      /*var header = TestUtils.findRenderedDOMComponentWithTag(elRTable, 'thead');
      expect(header).not.toBeUndefined();
      expect(TestUtils.isDOMComponent(header)).toBe(true);
      
      console.log(header.tagName);
      console.log(header.props.children.length);

      for(var i in header){
        if (header.hasOwnProperty(i)){
         console.log('prop '+ i);
       }
      }*/
      //expect(header.children.length).toBe(1);
  });
});