var utils = {}; 
utils.stringify = function(oldObj){
	return JSON.stringify(oldObj);
};

utils.cloneProps = function(oldObj){
    return JSON.parse(JSON.stringify(oldObj));
};

utils.equalProps = function(oldObj, newObj){
    return JSON.stringify(oldObj) === JSON.stringify(newObj);
};

utils.warn = function(){
	if (console){console.warn(arguments);}
};

module.exports = utils;