/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableCellGroup
 * @typechecks
 */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FixedDataTableCell = require('./FixedDataTableCell');

var _FixedDataTableCell2 = _interopRequireDefault(_FixedDataTableCell);

var _FixedDataTableHelper = require('./FixedDataTableHelper');

var _FixedDataTableHelper2 = _interopRequireDefault(_FixedDataTableHelper);

var _FixedDataTableTranslateDOMPosition = require('./FixedDataTableTranslateDOMPosition');

var _FixedDataTableTranslateDOMPosition2 = _interopRequireDefault(_FixedDataTableTranslateDOMPosition);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

var _widthHelper = require('./widthHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIR_SIGN = _FixedDataTableHelper2.default.DIR_SIGN;

var FixedDataTableCellGroupImpl = function (_React$Component) {
  _inherits(FixedDataTableCellGroupImpl, _React$Component);

  function FixedDataTableCellGroupImpl() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FixedDataTableCellGroupImpl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FixedDataTableCellGroupImpl.__proto__ || Object.getPrototypeOf(FixedDataTableCellGroupImpl)).call.apply(_ref, [this].concat(args))), _this), _this._renderCell = function (
    /*number*/rowIndex,
    /*number*/height,
    /*object*/columnProps,
    /*object*/cellTemplate,
    /*number*/left,
    /*string*/key,
    /*number*/columnGroupWidth,
    /*boolean*/isColumnReordering) /*object*/{

      var cellIsResizable = columnProps.isResizable && _this.props.onColumnResize;
      var onColumnResize = cellIsResizable ? _this.props.onColumnResize : null;

      var cellIsReorderable = columnProps.isReorderable && _this.props.onColumnReorder && rowIndex === -1 && columnGroupWidth !== columnProps.width;
      var onColumnReorder = cellIsReorderable ? _this.props.onColumnReorder : null;

      var className = columnProps.cellClassName;
      var pureRendering = columnProps.pureRendering || false;

      return _React2.default.createElement(_FixedDataTableCell2.default, {
        isScrolling: _this.props.isScrolling,
        align: columnProps.align,
        className: className,
        height: height,
        key: key,
        maxWidth: columnProps.maxWidth,
        minWidth: columnProps.minWidth,
        touchEnabled: _this.props.touchEnabled,
        onColumnResize: onColumnResize,
        onColumnReorder: onColumnReorder,
        onColumnReorderMove: _this.props.onColumnReorderMove,
        onColumnReorderEnd: _this.props.onColumnReorderEnd,
        isColumnReordering: isColumnReordering,
        columnReorderingData: _this.props.columnReorderingData,
        rowIndex: rowIndex,
        columnKey: columnProps.columnKey,
        width: columnProps.width,
        left: left,
        cell: cellTemplate,
        columnGroupWidth: columnGroupWidth,
        pureRendering: pureRendering
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */


  _createClass(FixedDataTableCellGroupImpl, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._initialRender = true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._initialRender = false;
    }
  }, {
    key: 'render',
    value: function render() /*object*/{
      var props = this.props;
      var columns = props.columns;
      var cells = new Array(columns.length);
      var contentWidth = (0, _widthHelper.sumPropWidths)(columns);

      var isColumnReordering = props.isColumnReordering && columns.reduce(function (acc, column) {
        return acc || props.columnReorderingData.columnKey === column.props.columnKey;
      }, false);

      var currentPosition = 0;
      for (var i = 0, j = columns.length; i < j; i++) {
        var columnProps = columns[i].props;
        var cellTemplate = columns[i].template;
        var recyclable = columnProps.allowCellsRecycling && !isColumnReordering;
        if (!recyclable || currentPosition - props.left <= props.width && currentPosition - props.left + columnProps.width >= 0) {
          var key = columnProps.columnKey || 'cell_' + i;
          cells[i] = this._renderCell(props.rowIndex, props.rowHeight, columnProps, cellTemplate, currentPosition, key, contentWidth, isColumnReordering);
        }
        currentPosition += columnProps.width;
      }
      var style = {
        height: props.height,
        position: 'absolute',
        width: contentWidth,
        zIndex: props.zIndex
      };
      (0, _FixedDataTableTranslateDOMPosition2.default)(style, -1 * DIR_SIGN * props.left, 0, this._initialRender);

      return _React2.default.createElement(
        'div',
        {
          className: (0, _cx2.default)('fixedDataTableCellGroupLayout/cellGroup'),
          style: style },
        cells
      );
    }
  }]);

  return FixedDataTableCellGroupImpl;
}(_React2.default.Component);

FixedDataTableCellGroupImpl.propTypes_DISABLED_FOR_PERFORMANCE = {

  /**
   * Array of per column configuration properties.
   */
  columns: _propTypes2.default.array.isRequired,

  isScrolling: _propTypes2.default.bool,

  left: _propTypes2.default.number,

  onColumnResize: _propTypes2.default.func,

  onColumnReorder: _propTypes2.default.func,
  onColumnReorderMove: _propTypes2.default.func,
  onColumnReorderEnd: _propTypes2.default.func,

  height: _propTypes2.default.number.isRequired,

  /**
   * Height of fixedDataTableCellGroupLayout/cellGroupWrapper.
   */
  cellGroupWrapperHeight: _propTypes2.default.number,

  rowHeight: _propTypes2.default.number.isRequired,

  rowIndex: _propTypes2.default.number.isRequired,

  width: _propTypes2.default.number.isRequired,

  zIndex: _propTypes2.default.number.isRequired,

  touchEnabled: _propTypes2.default.bool
};
;

var FixedDataTableCellGroup = function (_React$Component2) {
  _inherits(FixedDataTableCellGroup, _React$Component2);

  function FixedDataTableCellGroup() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, FixedDataTableCellGroup);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = FixedDataTableCellGroup.__proto__ || Object.getPrototypeOf(FixedDataTableCellGroup)).call.apply(_ref2, [this].concat(args))), _this2), _this2._onColumnResize = function (
    /*number*/left,
    /*number*/width,
    /*?number*/minWidth,
    /*?number*/maxWidth,
    /*string|number*/columnKey,
    /*object*/event) {
      _this2.props.onColumnResize && _this2.props.onColumnResize(_this2.props.offsetLeft, left - _this2.props.left + width, width, minWidth, maxWidth, columnKey, event);
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }
  /**
   * PropTypes are disabled in this component, because having them on slows
   * down the FixedDataTable hugely in DEV mode. You can enable them back for
   * development, but please don't commit this component with enabled propTypes.
   */


  _createClass(FixedDataTableCellGroup, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate( /*object*/nextProps) /*boolean*/{
      return !nextProps.isScrolling || this.props.rowIndex !== nextProps.rowIndex || this.props.left !== nextProps.left;
    }
  }, {
    key: 'render',
    value: function render() /*object*/{
      var _props = this.props,
          offsetLeft = _props.offsetLeft,
          props = _objectWithoutProperties(_props, ['offsetLeft']);

      var style = {
        height: props.cellGroupWrapperHeight || props.height,
        width: props.width
      };

      if (DIR_SIGN === 1) {
        style.left = offsetLeft;
      } else {
        style.right = offsetLeft;
      }

      var onColumnResize = props.onColumnResize ? this._onColumnResize : null;

      return _React2.default.createElement(
        'div',
        {
          style: style,
          className: (0, _cx2.default)('fixedDataTableCellGroupLayout/cellGroupWrapper') },
        _React2.default.createElement(FixedDataTableCellGroupImpl, _extends({}, props, {
          onColumnResize: onColumnResize
        }))
      );
    }
  }]);

  return FixedDataTableCellGroup;
}(_React2.default.Component);

FixedDataTableCellGroup.propTypes_DISABLED_FOR_PERFORMANCE = {
  isScrolling: _propTypes2.default.bool,
  /**
   * Height of the row.
   */
  height: _propTypes2.default.number.isRequired,

  offsetLeft: _propTypes2.default.number,

  left: _propTypes2.default.number,
  /**
   * Z-index on which the row will be displayed. Used e.g. for keeping
   * header and footer in front of other rows.
   */
  zIndex: _propTypes2.default.number.isRequired
};
FixedDataTableCellGroup.defaultProps = /*object*/{
  left: 0,
  offsetLeft: 0
};
;

module.exports = FixedDataTableCellGroup;