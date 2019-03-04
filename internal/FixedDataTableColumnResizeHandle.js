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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is to be used with the FixedDataTable. It is a read line
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * that when you click on a column that is resizable appears and allows
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you to resize the corresponding column.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableColumnResizeHandle
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FixedDataTableColumnResizeHandle = function (_React$PureComponent) {
  _inherits(FixedDataTableColumnResizeHandle, _React$PureComponent);

  function FixedDataTableColumnResizeHandle() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FixedDataTableColumnResizeHandle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FixedDataTableColumnResizeHandle.__proto__ || Object.getPrototypeOf(FixedDataTableColumnResizeHandle)).call.apply(_ref, [this].concat(args))), _this), _this.state = /*object*/{
      width: 0,
      cursorDelta: 0
    }, _this._onMove = function ( /*number*/deltaX) {
      if (_Locale2.default.isRTL()) {
        deltaX = -deltaX;
      }
      var newWidth = _this.state.cursorDelta + deltaX;
      var newColumnWidth = (0, _clamp2.default)(newWidth, _this.props.minWidth, _this.props.maxWidth);

      // Please note cursor delta is the different between the currently width
      // and the new width.
      _this.setState({
        width: newColumnWidth,
        cursorDelta: newWidth
      });
    }, _this._onColumnResizeEnd = function () {
      _this._mouseMoveTracker.releaseMouseMoves();
      _this.props.onColumnResizeEnd(_this.state.width, _this.props.columnKey);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FixedDataTableColumnResizeHandle, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps( /*object*/newProps) {
      if (newProps.initialEvent && !this._mouseMoveTracker.isDragging()) {
        this._mouseMoveTracker.captureMouseMoves(newProps.initialEvent);
        this.setState({
          width: newProps.initialWidth,
          cursorDelta: newProps.initialWidth
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mouseMoveTracker = new _DOMMouseMoveTracker2.default(this._onMove, this._onColumnResizeEnd, document.body, this.props.touchEnabled);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mouseMoveTracker.releaseMouseMoves();
      this._mouseMoveTracker = null;
    }
  }, {
    key: 'render',
    value: function render() /*object*/{
      var style = {
        width: this.state.width,
        height: this.props.height
      };
      if (_Locale2.default.isRTL()) {
        style.right = this.props.leftOffset;
      } else {
        style.left = this.props.leftOffset;
      }
      return _React2.default.createElement(
        'div',
        {
          className: (0, _cx2.default)({
            'fixedDataTableColumnResizerLineLayout/main': true,
            'fixedDataTableColumnResizerLineLayout/hiddenElem': !this.props.visible,
            'public/fixedDataTableColumnResizerLine/main': true
          }),
          style: style },
        _React2.default.createElement('div', {
          className: (0, _cx2.default)('fixedDataTableColumnResizerLineLayout/mouseArea'),
          style: { height: this.props.height }
        })
      );
    }
  }]);

  return FixedDataTableColumnResizeHandle;
}(_React2.default.PureComponent);

FixedDataTableColumnResizeHandle.propTypes = {
  visible: _propTypes2.default.bool.isRequired,

  /**
   * This is the height of the line
   */
  height: _propTypes2.default.number.isRequired,

  /**
   * Offset from left border of the table, please note
   * that the line is a border on diff. So this is really the
   * offset of the column itself.
   */
  leftOffset: _propTypes2.default.number.isRequired,

  /**
   * Height of the clickable region of the line.
   * This is assumed to be at the top of the line.
   */
  knobHeight: _propTypes2.default.number.isRequired,

  /**
   * The line is a border on a diff, so this is essentially
   * the width of column.
   */
  initialWidth: _propTypes2.default.number,

  /**
   * The minimum width this dragger will collapse to
   */
  minWidth: _propTypes2.default.number,

  /**
   * The maximum width this dragger will collapse to
   */
  maxWidth: _propTypes2.default.number,

  /**
   * Initial click event on the header cell.
   */
  initialEvent: _propTypes2.default.object,

  /**
   * When resizing is complete this is called.
   */
  onColumnResizeEnd: _propTypes2.default.func,

  /**
   * Column key for the column being resized.
   */
  columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * Whether the resize handle should respond to touch events or not.
   */
  touchEnabled: _propTypes2.default.bool
};
;

module.exports = FixedDataTableColumnResizeHandle;