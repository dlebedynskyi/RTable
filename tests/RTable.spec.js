/** @jsx React.DOM */

jest.dontMock('../jsx/RTable');
//pubsub =  jest.genMockFromModule('pubsub-js');

describe('RxTable', function() {
  it('init default values and declare its is published', function() {
   var React = require('react/addons'),
       RTable = require('../jsx/RTable'),
       pubsub = require('pubsub-js'),
      TestUtils = React.addons.TestUtils;

    // Render component
    var elRTable = TestUtils.renderIntoDocument(
      <RTable />
    );
    var props = elRTable.props;

    expect(props.dataProp).toBe('.');
    expect(props.columnFieldValueProp).toBe('field');
    expect(props.columnNameProp).toBe('name');
    
    expect(props.enableSelection).toBe(true);
    expect(props.optimization).toBe(true);
    expect(props.enableFilters).toBe(true);
    expect(props.className).toBe('');    
    expect(props.data.length).toBe(0);
    expect(props.definitions.length).toBe(0);

    expect(pubsub.publish.mock.calls[0][0]).toEqual('RTable.Mounted');
  });
});