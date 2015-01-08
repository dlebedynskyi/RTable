/** @jsx React.DOM */

jest.dontMock('../cjs/PropRenderMixin');

describe('PropsRenderMixin test', function  () {
	var mix = null;
	beforeEach(function(){
		mix = require('../cjs/PropRenderMixin');
		mix.props = {optimization : true};
	});

	it('sets defaults in componentWillMount', function(){
		mix.componentWillMount();

		expect(mix.shouldUpdate).toBeTruthy();
		expect(mix.oldProps).toBeNull();
	});

	it('componentWillReceiveProps sets flag to true when different objects', function(){
		mix.shouldUpdate = false;

		mix.oldProps = JSON.stringify({a : [1, 2]});
		
		var newProps = {a : [2, 1]};
		mix.componentWillReceiveProps(newProps);

		expect(mix.shouldUpdate).toBeTruthy();
		expect(mix.oldProps).toEqual( JSON.stringify(newProps));
	});

	it('componentWillReceiveProps sets flag to false when equal objects', function(){
		mix.props = {optimization : true};
		mix.shouldUpdate = false;

		mix.oldProps = JSON.stringify({a : [1, 2]});
		
		var newProps = {a : [1, 2]};
		mix.componentWillReceiveProps(newProps);

		expect(mix.shouldUpdate).toBeFalsy();
		expect(mix.oldProps).toEqual( JSON.stringify(newProps));
	});

	it('componentWillReceiveProps flag is true if optimization is off on equal objects', function(){
		mix.props = {optimization : false};
		mix.shouldUpdate = false;

		mix.oldProps = JSON.stringify({a : [1, 2]});
		
		var newProps = {a : [1, 2]};
		mix.componentWillReceiveProps(newProps);

		expect(mix.shouldUpdate).toBeTruthy();
	});

	it('shouldComponentUpdate returns true by default', function(){
		mix.shouldUpdate = true;
		
		var result = mix.shouldComponentUpdate();
		expect(mix.shouldUpdate).toBeTruthy();
	});

	it('shouldComponentUpdate returns false if flag is set to false', function(){
		mix.shouldUpdate = false;

		var result = mix.shouldComponentUpdate();
		expect(mix.shouldUpdate).toBeFalsy();
	});
})
