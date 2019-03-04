'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DOMMouseMoveTracker = require('./DOMMouseMoveTracker');

var _DOMMouseMoveTracker2 = _interopRequireDefault(_DOMMouseMoveTracker);

var _Keys = require('./Keys');

var _Keys2 = _interopRequireDefault(_Keys);

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactDOM = require('./ReactDOM');

var _ReactDOM2 = _interopRequireDefault(_ReactDOM);

var _ReactWheelHandler = require('./ReactWheelHandler');

var _ReactWheelHandler2 = _interopRequireDefault(_ReactWheelHandler);

var _cssVar = require('./cssVar');

var _cssVar2 = _interopRequireDefault(_cssVar);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

var _emptyFunction = require('./emptyFunction');

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _FixedDataTableTranslateDOMPosition = require('./FixedDataTableTranslateDOMPosition');

var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule Scrollbar
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var UNSCROLLABLE_STATE = {
  position: 0,
  scrollable: false
};

var FACE_MARGIN = parseInt((0, _cssVar2.default)('scrollbar-face-margin'), 10);
var FACE_MARGIN_2 = FACE_MARGIN * 2;
var FACE_SIZE_MIN = 30;
var KEYBOARD_SCROLL_AMOUNT = 40;

var _lastScrolledScrollbar = null;

var Scrollbar = function (_React$PureComponent) {
  _inherits(Scrollbar, _React$PureComponent);

  function Scrollbar(props) /*object*/{
    _classCallCheck(this, Scrollbar);

    var _this = _possibleConstructorReturn(this, (Scrollbar.__proto__ || Object.getPrototypeOf(Scrollbar)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = _this._calculateState(props.position || props.defaultPosition || 0, props.size, props.contentSize, props.orientation);
    return _this;
  }

  _createClass(Scrollbar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps( /*object*/nextProps) {
      var controlledPosition = nextProps.position;
      if (controlledPosition === undefined) {
        this._setNextState(this._calculateState(this.state.position, nextProps.size, nextProps.contentSize, nextProps.orientation));
      } else {
        this._setNextState(this._calculateState(controlledPosition, nextProps.size, nextProps.contentSize, nextProps.orientation), nextProps);
      }
    }
  }, {
    key: 'render',
    value: function render() /*?object*/{
      if (!this.state.scrollable) {
        return null;
      }

      var size = this.props.size;
      var mainStyle;
      var faceStyle;
      var isHorizontal = this.state.isHorizontal;
      var isVertical = !isHorizontal;
      var isActive = this.state.focused || this.state.isDragging;
      var faceSize = this.state.faceSize;
      var isOpaque = this.props.isOpaque;
      var verticalTop = this.props.verticalTop || 0;

      var mainClassName = (0, _cx2.default)({
        'ScrollbarLayout/main': true,
        'ScrollbarLayout/mainVertical': isVertical,
        'ScrollbarLayout/mainHorizontal': isHorizontal,
        'public/Scrollbar/main': true,
        'public/Scrollbar/mainOpaque': isOpaque,
        'public/Scrollbar/mainActive': isActive
      });

      var faceClassName = (0, _cx2.default)({
        'ScrollbarLayout/face': true,
        'ScrollbarLayout/faceHorizontal': isHorizontal,
        'ScrollbarLayout/faceVertical': isVertical,
        'public/Scrollbar/faceActive': isActive,
        'public/Scrollbar/face': true
      });

      var position = this.state.position * this.state.scale + FACE_MARGIN;

      if (isHorizontal) {
        mainStyle = {
          width: size
        };
        faceStyle = {
          width: faceSize - FACE_MARGIN_2
        };
        (0, _FixedDataTableTranslateDOMPosition2.default)(faceStyle, position, 0, this._initialRender);
      } else {
        mainStyle = {
          top: verticalTop,
          height: size
        };
        faceStyle = {
          height: faceSize - FACE_MARGIN_2
        };
        (0, _FixedDataTableTranslateDOMPosition2.default)(faceStyle, 0, position, this._initialRender);
      }

      mainStyle.touchAction = 'none';
      mainStyle.zIndex = this.props.zIndex;

      if (this.props.trackColor === 'gray') {
        mainStyle.backgroundColor = (0, _cssVar2.default)('fbui-desktop-background-light');
      }

      return _React2.default.createElement(
        'div',
        {
          onFocus: this._onFocus,
          onBlur: this._onBlur,
          onKeyDown: this._onKeyDown,
          onMouseDown: this._onMouseDown,
          onTouchCancel: this._onTouchCancel,
          onTouchEnd: this._onTouchEnd,
          onTouchMove: this._onTouchMove,
          onTouchStart: this._onTouchStart,
          onWheel: this._wheelHandler.onWheel,
          className: mainClassName,
          style: mainStyle,
          ref: this._onRefRoot },
        _React2.default.createElement('div', {
          ref: this._onRefFace,
          className: faceClassName,
          style: faceStyle
        })
      );
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var isHorizontal = this.props.orientation === 'horizontal';
      var onWheel = isHorizontal ? this._onWheelX : this._onWheelY;

      this._wheelHandler = new _ReactWheelHandler2.default(onWheel, this._shouldHandleX, // Should hanlde horizontal scroll
      this._shouldHandleY // Should handle vertical scroll
      );
      this._initialRender = true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(this._onMouseMove, this._onMouseMoveEnd, document.documentElement, this.props.touchEnabled);

      if (this.props.position !== undefined && this.state.position !== this.props.position) {
        this._didScroll();
      }
      this._initialRender = false;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._nextState = null;
      this._mouseMoveTracker.releaseMouseMoves();
      if (_lastScrolledScrollbar === this) {
        _lastScrolledScrollbar = null;
      }
      delete this._mouseMoveTracker;
    }
  }]);

  return Scrollbar;
}(_React2.default.PureComponent);

Scrollbar.propTypes = {
  contentSize: _propTypes2.default.number.isRequired,
  defaultPosition: _propTypes2.default.number,
  isOpaque: _propTypes2.default.bool,
  orientation: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  onScroll: _propTypes2.default.func,
  position: _propTypes2.default.number,
  size: _propTypes2.default.number.isRequired,
  trackColor: _propTypes2.default.oneOf(['gray']),
  touchEnabled: _propTypes2.default.bool,
  zIndex: _propTypes2.default.number,
  verticalTop: _propTypes2.default.number
};
Scrollbar.defaultProps = /*object*/{
  defaultPosition: 0,
  isOpaque: false,
  onScroll: _emptyFunction2.default,
  orientation: 'vertical',
  zIndex: 99
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._onRefFace = function (ref) {
    return _this2._faceRef = ref;
  };

  this._onRefRoot = function (ref) {
    return _this2._rootRef = ref;
  };

  this.scrollBy = function ( /*number*/delta) {
    _this2._onWheel(delta);
  };

  this._shouldHandleX = function ( /*number*/delta) {
    return (/*boolean*/_this2.props.orientation === 'horizontal' ? _this2._shouldHandleChange(delta) : false
    );
  };

  this._shouldHandleY = function ( /*number*/delta) {
    return (/*boolean*/_this2.props.orientation !== 'horizontal' ? _this2._shouldHandleChange(delta) : false
    );
  };

  this._shouldHandleChange = function ( /*number*/delta) /*boolean*/{
    var nextState = _this2._calculateState(_this2.state.position + delta, _this2.props.size, _this2.props.contentSize, _this2.props.orientation);
    return nextState.position !== _this2.state.position;
  };

  this._calculateState = function (
  /*number*/position,
  /*number*/size,
  /*number*/contentSize,
  /*string*/orientation) /*object*/{

    var clampedSize = Math.max(1, size);
    if (contentSize <= clampedSize) {
      return UNSCROLLABLE_STATE;
    }

    var stateKey = position + '_' + clampedSize + '_' + contentSize + '_' + orientation;
    if (_this2._stateKey === stateKey) {
      return _this2._stateForKey;
    }

    // There are two types of positions here.
    // 1) Phisical position: changed by mouse / keyboard
    // 2) Logical position: changed by props.
    // The logical position will be kept as as internal state and the `render()`
    // function will translate it into physical position to render.

    var isHorizontal = orientation === 'horizontal';
    var scale = clampedSize / contentSize;
    var faceSize = clampedSize * scale;

    if (faceSize < FACE_SIZE_MIN) {
      scale = (clampedSize - FACE_SIZE_MIN) / (contentSize - clampedSize);
      faceSize = FACE_SIZE_MIN;
    }

    var scrollable = true;
    var maxPosition = contentSize - clampedSize;

    if (position < 0) {
      position = 0;
    } else if (position > maxPosition) {
      position = maxPosition;
    }

    var isDragging = _this2._mouseMoveTracker ? _this2._mouseMoveTracker.isDragging() : false;

    // This function should only return flat values that can be compared quiclky
    // by `ReactComponentWithPureRenderMixin`.
    var state = {
      faceSize: faceSize,
      isDragging: isDragging,
      isHorizontal: isHorizontal,
      position: position,
      scale: scale,
      scrollable: scrollable
    };

    // cache the state for later use.
    _this2._stateKey = stateKey;
    _this2._stateForKey = state;
    return state;
  };

  this._onWheelY = function ( /*number*/deltaX, /*number*/deltaY) {
    _this2._onWheel(deltaY);
  };

  this._onWheelX = function ( /*number*/deltaX, /*number*/deltaY) {
    _this2._onWheel(deltaX);
  };

  this._onWheel = function ( /*number*/delta) {
    var props = _this2.props;

    // The mouse may move faster then the animation frame does.
    // Use `requestAnimationFrame` to avoid over-updating.
    _this2._setNextState(_this2._calculateState(_this2.state.position + delta, props.size, props.contentSize, props.orientation));
  };

  this._onMouseDown = function ( /*object*/event) {
    var nextState;

    if (event.target !== _this2._faceRef) {
      // Both `offsetX` and `layerX` are non-standard DOM property but they are
      // magically available for browsers somehow.
      var nativeEvent = event.nativeEvent;
      var position = _this2.state.isHorizontal ? nativeEvent.offsetX || nativeEvent.layerX || _this2.getTouchX(nativeEvent) : nativeEvent.offsetY || nativeEvent.layerY || _this2.getTouchY(nativeEvent);

      // MouseDown on the scroll-track directly, move the center of the
      // scroll-face to the mouse position.
      var props = _this2.props;
      position /= _this2.state.scale;
      nextState = _this2._calculateState(position - _this2.state.faceSize * 0.5 / _this2.state.scale, props.size, props.contentSize, props.orientation);
    } else {
      nextState = {};
    }

    nextState.focused = true;
    _this2._setNextState(nextState);

    _this2._mouseMoveTracker.captureMouseMoves(event);
    // Focus the node so it may receive keyboard event.
    _this2._rootRef.focus();
  };

  this._onTouchCancel = function ( /*object*/event) {
    event.stopPropagation();
  };

  this._onTouchEnd = function ( /*object*/event) {
    event.stopPropagation();
  };

  this._onTouchMove = function ( /*object*/event) {
    event.stopPropagation();
  };

  this._onTouchStart = function ( /*object*/event) {
    event.stopPropagation();
    _this2._onMouseDown(event);
  };

  this._onMouseMove = function ( /*number*/deltaX, /*number*/deltaY) {
    var props = _this2.props;
    var delta = _this2.state.isHorizontal ? deltaX : deltaY;
    delta /= _this2.state.scale;

    _this2._setNextState(_this2._calculateState(_this2.state.position + delta, props.size, props.contentSize, props.orientation));
  };

  this._onMouseMoveEnd = function () {
    _this2._nextState = null;
    _this2._mouseMoveTracker.releaseMouseMoves();
    _this2.setState({ isDragging: false });
  };

  this._onKeyDown = function ( /*object*/event) {
    var keyCode = event.keyCode;

    if (keyCode === _Keys2.default.TAB) {
      // Let focus move off the scrollbar.
      return;
    }

    var distance = KEYBOARD_SCROLL_AMOUNT;
    var direction = 0;

    if (_this2.state.isHorizontal) {
      switch (keyCode) {
        case _Keys2.default.HOME:
          direction = -1;
          distance = _this2.props.contentSize;
          break;

        case _Keys2.default.LEFT:
          direction = -1;
          break;

        case _Keys2.default.RIGHT:
          direction = 1;
          break;

        default:
          return;
      }
    }

    if (!_this2.state.isHorizontal) {
      switch (keyCode) {
        case _Keys2.default.SPACE:
          if (event.shiftKey) {
            direction = -1;
          } else {
            direction = 1;
          }
          break;

        case _Keys2.default.HOME:
          direction = -1;
          distance = _this2.props.contentSize;
          break;

        case _Keys2.default.UP:
          direction = -1;
          break;

        case _Keys2.default.DOWN:
          direction = 1;
          break;

        case _Keys2.default.PAGE_UP:
          direction = -1;
          distance = _this2.props.size;
          break;

        case _Keys2.default.PAGE_DOWN:
          direction = 1;
          distance = _this2.props.size;
          break;

        default:
          return;
      }
    }

    event.preventDefault();

    var props = _this2.props;
    _this2._setNextState(_this2._calculateState(_this2.state.position + distance * direction, props.size, props.contentSize, props.orientation));
  };

  this._onFocus = function () {
    _this2.setState({
      focused: true
    });
  };

  this._onBlur = function () {
    _this2.setState({
      focused: false
    });
  };

  this._blur = function () {
    var el = _ReactDOM2.default.findDOMNode(_this2);
    if (!el) {
      return;
    }

    try {
      _this2._onBlur();
      el.blur();
    } catch (oops) {
      // pass
    }
  };

  this.getTouchX = function ( /*object*/e) {
    return Math.round(e.targetTouches[0].pageX - e.target.getBoundingClientRect().x);
  };

  this.getTouchY = function ( /*object*/e) {
    return Math.round(e.targetTouches[0].pageY - e.target.getBoundingClientRect().y);
  };

  this._setNextState = function ( /*object*/nextState, /*?object*/props) {
    props = props || _this2.props;
    var controlledPosition = props.position;
    var willScroll = _this2.state.position !== nextState.position;
    if (controlledPosition === undefined) {
      var callback = willScroll ? _this2._didScroll : undefined;
      _this2.setState(nextState, callback);
    } else if (controlledPosition === nextState.position) {
      _this2.setState(nextState);
    } else {
      // Scrolling is controlled. Don't update the state and let the owner
      // to update the scrollbar instead.
      if (nextState.position !== undefined && nextState.position !== _this2.state.position) {
        _this2.props.onScroll(nextState.position);
      }
      return;
    }

    if (willScroll && _lastScrolledScrollbar !== _this2) {
      _lastScrolledScrollbar && _lastScrolledScrollbar._blur();
      _lastScrolledScrollbar = _this2;
    }
  };

  this._didScroll = function () {
    _this2.props.onScroll(_this2.state.position);
  };
};

;

Scrollbar.KEYBOARD_SCROLL_AMOUNT = KEYBOARD_SCROLL_AMOUNT;
Scrollbar.SIZE = parseInt((0, _cssVar2.default)('scrollbar-size'), 10);
Scrollbar.OFFSET = 1;

module.exports = Scrollbar;