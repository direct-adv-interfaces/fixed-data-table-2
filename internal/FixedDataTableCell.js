'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FixedDataTableCellDefault = require('./FixedDataTableCellDefault');

var _FixedDataTableCellDefault2 = _interopRequireDefault(_FixedDataTableCellDefault);

var _FixedDataTableColumnReorderHandle = require('././FixedDataTableColumnReorderHandle');

var _FixedDataTableColumnReorderHandle2 = _interopRequireDefault(_FixedDataTableColumnReorderHandle);

var _FixedDataTableHelper = require('./FixedDataTableHelper');

var _FixedDataTableHelper2 = _interopRequireDefault(_FixedDataTableHelper);

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

var _joinClasses = require('./joinClasses');

var _joinClasses2 = _interopRequireDefault(_joinClasses);

var _shallowEqual = require('./shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableCell
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DIR_SIGN = _FixedDataTableHelper2.default.DIR_SIGN;

var FixedDataTableCell = function (_React$Component) {
  _inherits(FixedDataTableCell, _React$Component);

  function FixedDataTableCell() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FixedDataTableCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FixedDataTableCell.__proto__ || Object.getPrototypeOf(FixedDataTableCell)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isReorderingThisColumn: false,
      displacement: 0,
      reorderingDisplacement: 0
    }, _this._onColumnResizerMouseDown = function ( /*object*/event) {
      _this.props.onColumnResize(_this.props.left, _this.props.width, _this.props.minWidth, _this.props.maxWidth, _this.props.columnKey, event);
      /**
       * This prevents the rows from moving around when we resize the
       * headers on touch devices.
       */
      if (_this.props.touchEnabled) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, _this._onColumnReorderMouseDown = function ( /*object*/event) {
      _this.props.onColumnReorder(_this.props.columnKey, _this.props.width, _this.props.left, event);
    }, _this._suppressEvent = function ( /*object*/event) {
      event.preventDefault();
      event.stopPropagation();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */


  _createClass(FixedDataTableCell, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.isScrolling && this.props.rowIndex === nextProps.rowIndex) {
        return false;
      }

      //Performance check not enabled
      if (!nextProps.pureRendering) {
        return true;
      }

      var _props = this.props,
          oldCell = _props.cell,
          oldIsScrolling = _props.isScrolling,
          oldProps = _objectWithoutProperties(_props, ['cell', 'isScrolling']);

      var newCell = nextProps.cell,
          newIsScrolling = nextProps.isScrolling,
          newProps = _objectWithoutProperties(nextProps, ['cell', 'isScrolling']);

      if (!(0, _shallowEqual2.default)(oldProps, newProps)) {
        return true;
      }

      if (!oldCell || !newCell || oldCell.type !== newCell.type) {
        return true;
      }

      if (!(0, _shallowEqual2.default)(oldCell.props, newCell.props)) {
        return true;
      }

      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var left = props.left + this.state.displacement;

      var newState = {
        isReorderingThisColumn: false
      };

      if (props.isColumnReordering) {
        var originalLeft = props.columnReorderingData.originalLeft;
        var reorderCellLeft = originalLeft + props.columnReorderingData.dragDistance;
        var farthestPossiblePoint = props.columnGroupWidth - props.columnReorderingData.columnWidth;

        // ensure the cell isn't being dragged out of the column group
        reorderCellLeft = Math.max(reorderCellLeft, 0);
        reorderCellLeft = Math.min(reorderCellLeft, farthestPossiblePoint);

        if (props.columnKey === props.columnReorderingData.columnKey) {
          newState.displacement = reorderCellLeft - props.left;
          newState.isReorderingThisColumn = true;
        } else {
          var reorderCellRight = reorderCellLeft + props.columnReorderingData.columnWidth;
          var reorderCellCenter = reorderCellLeft + props.columnReorderingData.columnWidth / 2;
          var centerOfThisColumn = left + props.width / 2;

          var cellIsBeforeOneBeingDragged = reorderCellCenter > centerOfThisColumn;
          var cellWasOriginallyBeforeOneBeingDragged = originalLeft > props.left;
          var changedPosition = false;

          var dragPoint, thisCellPoint;
          if (cellIsBeforeOneBeingDragged) {
            if (reorderCellLeft < centerOfThisColumn) {
              changedPosition = true;
              if (cellWasOriginallyBeforeOneBeingDragged) {
                newState.displacement = props.columnReorderingData.columnWidth;
              } else {
                newState.displacement = 0;
              }
            }
          } else {
            if (reorderCellRight > centerOfThisColumn) {
              changedPosition = true;
              if (cellWasOriginallyBeforeOneBeingDragged) {
                newState.displacement = 0;
              } else {
                newState.displacement = props.columnReorderingData.columnWidth * -1;
              }
            }
          }

          if (changedPosition) {
            if (cellIsBeforeOneBeingDragged) {
              if (!props.columnReorderingData.columnAfter) {
                props.columnReorderingData.columnAfter = props.columnKey;
              }
            } else {
              props.columnReorderingData.columnBefore = props.columnKey;
            }
          } else if (cellIsBeforeOneBeingDragged) {
            props.columnReorderingData.columnBefore = props.columnKey;
          } else if (!props.columnReorderingData.columnAfter) {
            props.columnReorderingData.columnAfter = props.columnKey;
          }
        }
      } else {
        newState.displacement = 0;
      }

      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() /*object*/{
      var _props2 = this.props,
          height = _props2.height,
          width = _props2.width,
          columnKey = _props2.columnKey,
          props = _objectWithoutProperties(_props2, ['height', 'width', 'columnKey']);

      var style = {
        height: height,
        width: width
      };

      if (DIR_SIGN === 1) {
        style.left = props.left;
      } else {
        style.right = props.left;
      }

      if (this.state.isReorderingThisColumn) {
        style.transform = 'translateX(' + this.state.displacement + 'px) translateZ(0)';
        style.zIndex = 1;
      }

      var className = (0, _joinClasses2.default)((0, _cx2.default)({
        'fixedDataTableCellLayout/main': true,
        'fixedDataTableCellLayout/lastChild': props.lastChild,
        'fixedDataTableCellLayout/alignRight': props.align === 'right',
        'fixedDataTableCellLayout/alignCenter': props.align === 'center',
        'public/fixedDataTableCell/alignRight': props.align === 'right',
        'public/fixedDataTableCell/highlighted': props.highlighted,
        'public/fixedDataTableCell/main': true,
        'public/fixedDataTableCell/hasReorderHandle': !!props.onColumnReorder,
        'public/fixedDataTableCell/reordering': this.state.isReorderingThisColumn
      }), props.className);

      var columnResizerComponent;
      if (props.onColumnResize) {
        var columnResizerStyle = {
          height: height
        };
        columnResizerComponent = _React2.default.createElement(
          'div',
          {
            className: (0, _cx2.default)('fixedDataTableCellLayout/columnResizerContainer'),
            style: columnResizerStyle,
            onMouseDown: this._onColumnResizerMouseDown,
            onTouchStart: this.props.touchEnabled ? this._onColumnResizerMouseDown : null,
            onTouchEnd: this.props.touchEnabled ? this._suppressEvent : null,
            onTouchMove: this.props.touchEnabled ? this._suppressEvent : null },
          _React2.default.createElement('div', {
            className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableCellLayout/columnResizerKnob'), (0, _cx2.default)('public/fixedDataTableCell/columnResizerKnob')),
            style: columnResizerStyle
          })
        );
      }

      var columnReorderComponent;
      if (props.onColumnReorder) {
        //header row
        columnReorderComponent = _React2.default.createElement(_FixedDataTableColumnReorderHandle2.default, _extends({
          columnKey: this.columnKey,
          touchEnabled: this.props.touchEnabled,
          onMouseDown: this._onColumnReorderMouseDown,
          onTouchStart: this._onColumnReorderMouseDown,
          height: height
        }, this.props));
      }

      var cellProps = {
        columnKey: columnKey,
        height: height,
        width: width
      };

      if (props.rowIndex >= 0) {
        cellProps.rowIndex = props.rowIndex;
      }

      var content;
      if (_React2.default.isValidElement(props.cell)) {
        content = _React2.default.cloneElement(props.cell, cellProps);
      } else if (typeof props.cell === 'function') {
        content = props.cell(cellProps);
      } else {
        content = _React2.default.createElement(
          _FixedDataTableCellDefault2.default,
          cellProps,
          props.cell
        );
      }

      return _React2.default.createElement(
        'div',
        { className: className, style: style },
        columnResizerComponent,
        columnReorderComponent,
        content
      );
    }
  }]);

  return FixedDataTableCell;
}(_React2.default.Component);

FixedDataTableCell.propTypes_DISABLED_FOR_PERFORMANCE = {
  isScrolling: _propTypes2.default.bool,
  align: _propTypes2.default.oneOf(['left', 'center', 'right']),
  className: _propTypes2.default.string,
  highlighted: _propTypes2.default.bool,
  width: _propTypes2.default.number.isRequired,
  minWidth: _propTypes2.default.number,
  maxWidth: _propTypes2.default.number,
  height: _propTypes2.default.number.isRequired,

  cell: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func]),

  columnKey: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  /**
   * The row index that will be passed to `cellRenderer` to render.
   */
  rowIndex: _propTypes2.default.number.isRequired,

  /**
   * Callback for when resizer knob (in FixedDataTableCell) is clicked
   * to initialize resizing. Please note this is only on the cells
   * in the header.
   * @param number combinedWidth
   * @param number left
   * @param number width
   * @param number minWidth
   * @param number maxWidth
   * @param number|string columnKey
   * @param object event
   */
  onColumnResize: _propTypes2.default.func,
  onColumnReorder: _propTypes2.default.func,

  /**
   * The left offset in pixels of the cell.
   */
  left: _propTypes2.default.number,

  /**
   * Flag for enhanced performance check
   */
  pureRendering: _propTypes2.default.bool,

  /**
   * Whether touch is enabled or not.
   */
  touchEnabled: _propTypes2.default.bool
};
FixedDataTableCell.defaultProps = /*object*/{
  align: 'left',
  highlighted: false
};
;

module.exports = FixedDataTableCell;