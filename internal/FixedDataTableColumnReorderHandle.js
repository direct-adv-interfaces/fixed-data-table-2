'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DOMMouseMoveTracker = require('./DOMMouseMoveTracker');

var _DOMMouseMoveTracker2 = _interopRequireDefault(_DOMMouseMoveTracker);

var _Locale = require('./Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FixedDataTableEventHelper = require('./FixedDataTableEventHelper');

var _FixedDataTableEventHelper2 = _interopRequireDefault(_FixedDataTableEventHelper);

var _clamp = require('./clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is to be used with the FixedDataTable. It is a header icon
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * that allows you to reorder the corresponding column.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableColumnReorderHandle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FixedDataTableColumnReorderHandle = function (_React$PureComponent) {
  _inherits(FixedDataTableColumnReorderHandle, _React$PureComponent);

  function FixedDataTableColumnReorderHandle() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FixedDataTableColumnReorderHandle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FixedDataTableColumnReorderHandle.__proto__ || Object.getPrototypeOf(FixedDataTableColumnReorderHandle)).call.apply(_ref, [this].concat(args))), _this), _this.state = /*object*/{
      dragDistance: 0
    }, _this.onMouseDown = function (event) {
      var targetRect = event.target.getBoundingClientRect();
      var coordinates = _FixedDataTableEventHelper2.default.getCoordinatesFromEvent(event);

      var mouseLocationInElement = coordinates.x - targetRect.left;
      var mouseLocationInRelationToColumnGroup = mouseLocationInElement + event.target.parentElement.offsetLeft;

      _this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(_this._onMove, _this._onColumnReorderEnd, document.body, _this.props.touchEnabled);
      _this._mouseMoveTracker.captureMouseMoves(event);
      _this.setState({
        dragDistance: 0
      });
      _this.props.onMouseDown({
        columnKey: _this.props.columnKey,
        mouseLocation: {
          dragDistance: 0,
          inElement: mouseLocationInElement,
          inColumnGroup: mouseLocationInRelationToColumnGroup
        }
      });

      _this._distance = 0;
      _this._animating = true;
      _this.frameId = requestAnimationFrame(_this._updateState);

      /**
       * This prevents the rows from moving around when we drag the
       * headers on touch devices.
       */
      if (_this.props.touchEnabled) {
        event.stopPropagation();
      }
    }, _this._onMove = function ( /*number*/deltaX) {
      _this._distance = _this.state.dragDistance + deltaX;
    }, _this._onColumnReorderEnd = function ( /*boolean*/cancelReorder) {
      _this._animating = false;
      cancelAnimationFrame(_this.frameId);
      _this.frameId = null;
      _this._mouseMoveTracker.releaseMouseMoves();
      _this.props.columnReorderingData.cancelReorder = cancelReorder;
      _this.props.onColumnReorderEnd();
    }, _this._updateState = function () {
      if (_this._animating) {
        _this.frameId = requestAnimationFrame(_this._updateState);
      }
      _this.setState({
        dragDistance: _this._distance
      });
      _this.props.onColumnReorderMove(_this._distance);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FixedDataTableColumnReorderHandle, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps( /*object*/newProps) {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._mouseMoveTracker) {
        cancelAnimationFrame(this.frameId);
        this.frameId = null;
        this._mouseMoveTracker.releaseMouseMoves();
        this._mouseMoveTracker = null;
      }
    }
  }, {
    key: 'render',
    value: function render() /*object*/{
      var style = {
        height: this.props.height
      };
      return _React2.default.createElement('div', {
        className: (0, _cx2.default)({
          'fixedDataTableCellLayout/columnReorderContainer': true,
          'fixedDataTableCellLayout/columnReorderContainer/active': false
        }),
        onMouseDown: this.onMouseDown,
        onTouchStart: this.props.touchEnabled ? this.onMouseDown : null,
        onTouchEnd: this.props.touchEnabled ? function (e) {
          return e.stopPropagation();
        } : null,
        onTouchMove: this.props.touchEnabled ? function (e) {
          return e.stopPropagation();
        } : null,
        style: style });
    }
  }]);

  return FixedDataTableColumnReorderHandle;
}(_React2.default.PureComponent);

FixedDataTableColumnReorderHandle.propTypes = {

  /**
   * When resizing is complete this is called.
   */
  onColumnReorderEnd: _propTypes2.default.func,

  /**
   * Column key for the column being reordered.
   */
  columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * Whether the reorder handle should respond to touch events or not.
   */
  touchEnabled: _propTypes2.default.bool
};
;

module.exports = FixedDataTableColumnReorderHandle;