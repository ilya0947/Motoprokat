'use strict';
var multiItemSlider = (function () {
  return function (selector, config) {
	var
	  _mainElement = document.querySelector(selector), // РѕСЃРЅРѕРІРЅС‹Р№ СЌР»РµРјРµРЅС‚ Р±Р»РѕРєР°
	  _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // РѕР±РµСЂС‚РєР° РґР»СЏ .slider-item
	  _sliderItems = _mainElement.querySelectorAll('.slider__item'), // СЌР»РµРјРµРЅС‚С‹ (.slider-item)
	  _sliderControls = _mainElement.querySelectorAll('.slider__control'), // СЌР»РµРјРµРЅС‚С‹ СѓРїСЂР°РІР»РµРЅРёСЏ
	  _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // РєРЅРѕРїРєР° "LEFT"
	  _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // РєРЅРѕРїРєР° "RIGHT"
	  _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // С€РёСЂРёРЅР° РѕР±С‘СЂС‚РєРё
	  _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // С€РёСЂРёРЅР° РѕРґРЅРѕРіРѕ СЌР»РµРјРµРЅС‚Р°    
	  _positionLeftItem = 0, // РїРѕР·РёС†РёСЏ Р»РµРІРѕРіРѕ Р°РєС‚РёРІРЅРѕРіРѕ СЌР»РµРјРµРЅС‚Р°
	  _transform = 0, // Р·РЅР°С‡РµРЅРёРµ С‚СЂР°РЅС„СЃРѕС„СЂРјР°С†РёРё .slider_wrapper
	  _step = _itemWidth / _wrapperWidth * 100, // РІРµР»РёС‡РёРЅР° С€Р°РіР° (РґР»СЏ С‚СЂР°РЅСЃС„РѕСЂРјР°С†РёРё)
	  _items = []; // РјР°СЃСЃРёРІ СЌР»РµРјРµРЅС‚РѕРІ
	// РЅР°РїРѕР»РЅРµРЅРёРµ РјР°СЃСЃРёРІР° _items
	_sliderItems.forEach(function (item, index) {
	  _items.push({ item: item, position: index, transform: 0 });
	});

	var position = {
	  getMin: 0,
	  getMax: _items.length - 1,
	}

	var _transformItem = function (direction) {
	  if (direction === 'right') {
		if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
		  return;
		}
		if (!_sliderControlLeft.classList.contains('slider__control_show')) {
		  _sliderControlLeft.classList.add('slider__control_show');
		}
		if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
		  _sliderControlRight.classList.remove('slider__control_show');
		}
		_positionLeftItem++;
		_transform -= _step;
	  }
	  if (direction === 'left') {
		if (_positionLeftItem <= position.getMin) {
		  return;
		}
		if (!_sliderControlRight.classList.contains('slider__control_show')) {
		  _sliderControlRight.classList.add('slider__control_show');
		}
		if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
		  _sliderControlLeft.classList.remove('slider__control_show');
		}
		_positionLeftItem--;
		_transform += _step;
	  }
	  _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
	}

	// РѕР±СЂР°Р±РѕС‚С‡РёРє СЃРѕР±С‹С‚РёСЏ click РґР»СЏ РєРЅРѕРїРѕРє "РЅР°Р·Р°Рґ" Рё "РІРїРµСЂРµРґ"
	var _controlClick = function (e) {
	  var direction = this.classList.contains('slider__control_right') ? 'right' : 'left';
	  e.preventDefault();
	  _transformItem(direction);
	};

	var _setUpListeners = function () {
	  // РґРѕР±Р°РІР»РµРЅРёРµ Рє РєРЅРѕРїРєР°Рј "РЅР°Р·Р°Рґ" Рё "РІРїРµСЂРµРґ" РѕР±СЂР±РѕС‚С‡РёРєР° _controlClick РґР»СЏ СЃРѕР±С‹С‚СЏ click
	  _sliderControls.forEach(function (item) {
		item.addEventListener('click', _controlClick);
	  });
	}

	// РёРЅРёС†РёР°Р»РёР·Р°С†РёСЏ
	_setUpListeners();
	
	/* 
	
	РЅСѓР¶РµРЅ С„РёРєСЃ СЃРєСЂРѕР»Р° РІРІРµСЂС…-РІРЅРёР· РїРѕ СЃР»Р°Р№РґРµСЂСѓ
	
	// РґРѕР±Р°РІР»РµРЅРёРµ РІРѕР·РјРѕР¶РЅРѕСЃС‚Рё Р»РёСЃС‚Р°С‚СЊ СЃР»Р°Р№РґРµСЂ СЃРІР°Р№РїРѕРј, СЂРµР°Р»РёР·Р°С†РёСЏ С‡РµСЂРµР· jquery
	$('.slider').swipe({
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
	//	console.log(direction);
		if(direction == "left") {
			_transformItem("right");
		} else if(direction == "right") {
			_transformItem("left");
		} 
	}});
	*/

	return {
	  right: function () { // РјРµС‚РѕРґ right
		_transformItem('right');
	  },
	  left: function () { // РјРµС‚РѕРґ left
		_transformItem('left');
	  }
	}

  }
}());

var slider = multiItemSlider('.slider');
