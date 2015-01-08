/** @jsx React.DOM */

jest.dontMock('../jsx/RTable');
//pubsub =  jest.genMockFromModule('pubsub-js');

describe('RxTable', function() {
  var React, RTableComponent, pubsub, TestUtils;

  beforeEach(function(){
    React = require('react/addons');
    RTableComponent = require('../jsx/RTable').Component;
    pubsub = require('pubsub-js');
    TestUtils = React.addons.TestUtils;

  })

  it('init default values and declare its is published', function() {
    // Render component
    var elRTable = TestUtils.renderIntoDocument(
      <RTableComponent />
    );

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

    expect(pubsub.publish.mock.calls[0][0]).toEqual('RTable.Mounted');
  });

  it('set correct style if fixedHeader  property is set ', function(){
      
      // Render component
      var elRTable = TestUtils.renderIntoDocument(
        <RTableComponent  fixedHeader={true}/>
      );
      
      var node = elRTable.getDOMNode();
      expect(node.className).toContain('rtable-fixed-header');
  });
});