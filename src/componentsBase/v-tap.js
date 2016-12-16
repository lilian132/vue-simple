/*
 * base on vue2.0
 * 支持['swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap']
 * example如下
 * v-touch:swipeUp.prevent="giftTap"
 * 不支持传参，通过arguments[0]可以获得事件对象
 * 
 * */
;(function () {
	var vueTap = {};	
	var events = ['swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'tap'];
	/**                               公用方法开始                 * */
	function isPc() {
		var uaInfo = navigator.userAgent;
		var agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
		var flag   = true;
		for ( var i = 0; i < agents.length; i++ ) {
			if (uaInfo.indexOf(agents[i]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	
	function isTap(self) {
		if (self.disabled) {
			return false;
		}
		var tapObj = self.tapObj;
		return self.time < 150 && Math.abs(tapObj.distanceX) < 2 && Math.abs(tapObj.distanceY) < 2;
	}

	function getType(self) {		
		var tapObj = self.tapObj;
		var xDelta = Math.abs(tapObj.distanceX);
		var yDelta = Math.abs(tapObj.distanceY);
		if(xDelta < 15 && yDelta < 15){
			return 'tap'
		}else{
			return 'swipe' + (xDelta >= yDelta ? (tapObj.distanceX > 0 ? 'Left' : 'Right') : tapObj.distanceY > 0 ? 'Up' : 'Down')
		}		
	}
	
	function touchstart(e, self) {
		console.log('touchstart')	
		var touches    = e.touches[0];
		var tapObj     = self.tapObj;
		tapObj.pageX   = touches.pageX;
		tapObj.pageY   = touches.pageY;
		tapObj.clientX = touches.clientX;
		tapObj.clientY = touches.clientY;
		self.time      = +new Date();
	}
	
	function touchend(e, self) {
		console.log('touchend')	
		var touches      = e.changedTouches[0];
		var tapObj       = self.tapObj;
		self.time        = +new Date() - self.time;
		tapObj.distanceX = tapObj.pageX - touches.pageX;
		tapObj.distanceY = tapObj.pageY - touches.pageY;
		
		self.handler(e);
	}
	
	/**                               公用方法结束                 * */
	var vue2 = {
		bind: function (el, binding) {
			console.log('日志开始')
			console.dir(el)
			console.dir(binding)

			el.tapObj = {};
			var arg = {
				el:el,
				event:null,
				tapObj:null
			};
			var value = binding.value;
			var EType = binding.arg;
			
			el.handler = function (e) { //This directive.handler
				if (!value && el.href && !binding.modifiers.prevent) {
					return window.location = el.href;
				}
				arg.event = e;
				arg.tapObj = el.tapObj;
				if(EType == getType(this)){
					value.call(this, arg);
				}				
			};
			if(isPc()) {
				if(EType == 'tap'){
					el.addEventListener('click', function (e) {
						if (!value && el.href && !binding.modifiers.prevent) {
							return window.location = el.href;
						}
						arg.event = e;
						value.call(this, arg);
					}, false);
				}
			} else {
				el.addEventListener('touchstart', function (e) {					
					if (binding.modifiers.stop)
						e.stopPropagation();
					if (binding.modifiers.prevent)
						e.preventDefault();
					touchstart(e, el);
				}, false);
				el.addEventListener('touchend', function (e) {
					Object.defineProperties(e, { // 重写currentTarget对象 与jq相同
						"currentTarget": {
							value: el,
							writable: true,
							enumerable: true,
							configurable: true
						},
					});
					e.preventDefault();			
					return touchend(e, el);
				}, false);
			}
		},
		//被绑定元素所在的模板更新时调用
		update: function (el, binding) {
			console.log('update')
			console.dir(el)
			console.dir(binding)
		},
		//只调用一次， 指令与元素解绑时调用
		unbind: function (el, binding) {
			console.log('unbind')
	        console.dir(el)
			console.dir(binding)
	    }
	};
	
	vueTap.install = function (Vue) {		
		Vue.directive('touch', vue2);
	};
	
	if (typeof exports == "object") {
		module.exports = vueTap;
	} else if (typeof define == "function" && define.amd) {
		define([], function () {
			return vueTap
		})
	} else if (window.Vue) {
		window.vueTap = vueTap;
		Vue.use(vueTap);
	}
	
})();
