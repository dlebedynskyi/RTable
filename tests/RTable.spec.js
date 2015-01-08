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
    expect(props.classes).toBe('rtable');    
    expect(props.data.length).toBe(0);
    expect(props.definitions.length).toBe(0);
    expect(props.fixedHeader).toBeFalsy();

    var node = elRTable.getDOMNode();
      expect(node.className).toContain('rtable');
      
      expect(node.children.length).toBe(3);
      /*for(var i in node.children[0]){
        console.log('prop  ' + i);
      }*/
      
      expect(node.children[0].children.length).toBe(0);
      expect(node.children[1].children.length).toBe(0);
      expect(node.children[2].children.length).toBe(0);
      

    expect(pubsub.publish.mock.calls[0][0]).toEqual('RTable.Mounted');
  });



  it('set correct style if fixedHeader  property is set ', function(){
      
      // Render component
      var elRTable = TestUtils.renderIntoDocument(React.createElement(RTableComponent, {fixedHeader : true}));
      /* TestUtils.renderIntoDocument(
        <RTableComponent  fixedHeader={true}/>
      );*/
      
      var node = elRTable.getDOMNode();
      expect(node.className).toContain('rtable-fixed-header');
  });
});