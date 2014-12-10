/** @jsx React.DOM */

jest.dontMock('../jsx/RTable');

describe('RxTable', function() {
  it('test defaults', function() {
   var React = require('react/addons'),
       RTable = require('../jsx/RTable'),
      TestUtils = React.addons.TestUtils;

    // Render component
    var elRTable = TestUtils.renderIntoDocument(
      <RTable />
    );
    var props = elRTable.props;
    
    expect(props.dataProp).toBe('.');
    expect(props.columnFieldValueProp).toBe('field');
    expect(props.columnNameProp).toBe('name');

    var state = elRTable.state;
    expect(state.data).toEqual([]);
    expect(state.definitions).toEqual([]);
  });
});