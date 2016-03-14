try {
function isset(a){return typeof a!=='undefined';}
(function(){
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	this.Class=function() {}
	Class.extendMultiple=function() {
		var _super = this.prototype;
		var result=arguments[0];
		var _scls=[result.prototype._props];
		for(var i=1;i<arguments.length-1;++i) {
			result=result.extend(arguments[i].prototype._props);
			_scls.push(arguments[i].prototype._props);
		}
		result=result.extend(arguments[arguments.length-1]);
		result.prototype._scls=_scls;
		return result;
	};
	Class.extend = function(prop) {
		var _super = this.prototype;
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		prototype._props=prop;
		initializing = false;
	 
		// Copy the properties over onto the new prototype
		for (var name in prop) {
			if(isset(prop.__lookupGetter__(name))||isset(prop.__lookupSetter__(name))) {
				if(isset(prop.__lookupGetter__(name)))
					prototype.__defineGetter__(name,prop.__lookupGetter__(name));
				if(isset(prop.__lookupSetter__(name)))
					prototype.__defineSetter__(name,prop.__lookupSetter__(name));
				continue;
			}
			// Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn){
					return function() {
						var tmp = this._super;
					 
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];
					 
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);				
						this._super = tmp;
					 
						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
	 
		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if ( !initializing && this.construct )
				this.construct.apply(this, arguments);
		}
	 
		// Populate our constructed prototype object
		Class.prototype = prototype;
	 
		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;
 
		// And make this class extendable
		Class.extend = arguments.callee;
		
		if (prop.__constrname)
			Class.toString = Class.constructor.toString;
		return Class;
	};
})();
} catch(e) {
	if (isMobile)
		window.onerror(e.message, "class.js", e.lineNumber, 0, e);
	else
		throw e;
}