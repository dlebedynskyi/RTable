/** @jsx React.DOM */

jest.dontMock('../jsx/RTable.jsx');

describe('RxTable', function() {
  it('test for hookups working', function() {
   var React = require('react/addons');
        //RTable = require('../jsx/RTable.jsx'),
   var TestUtils = React.addons.TestUtils;
/*
    // Render component
    var elRTable = TestUtils.renderIntoDocument(
      <RTable />
    );
*/
  var ok = 'ok';
  expect(ok).toBe('ok');

  });
});