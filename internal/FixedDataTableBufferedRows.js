'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FixedDataTableRow = require('./FixedDataTableRow');

var _FixedDataTableRow2 = _interopRequireDefault(_FixedDataTableRow);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

var _emptyFunction = require('./emptyFunction');

var _emptyFunction2 = _interopRequireDefault(_emptyFunction);

var _joinClasses = require('./joinClasses');

var _joinClasses2 = _interopRequireDefault(_joinClasses);

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @providesModule FixedDataTableBufferedRows
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @typechecks
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var FixedDataTableBufferedRows = function (_React$Component) {
  _inherits(FixedDataTableBufferedRows, _React$Component);

  function FixedDataTableBufferedRows() {
    _classCallCheck(this, FixedDataTableBufferedRows);

    return _possibleConstructorReturn(this, (FixedDataTableBufferedRows.__proto__ || Object.getPrototypeOf(FixedDataTableBufferedRows)).apply(this, arguments));
  }

  _createClass(FixedDataTableBufferedRows, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._staticRowArray = [];
      this._initialRender = true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._initialRender = false;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() /*boolean*/{
      // Don't add PureRenderMixin to this component please.
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._staticRowArray.length = 0;
    }
  }, {
    key: 'render',
    value: function render() /*object*/{
      var props = this.props;
      var rowClassNameGetter = props.rowClassNameGetter || _emptyFunction2.default;
      var rowsToRender = this.props.rowsToRender || [];

      this._staticRowArray.length = rowsToRender.length;
      var baseOffsetTop = props.offsetTop - props.scrollTop;

      for (var i = 0; i < rowsToRender.length; ++i) {
        var rowIndex = rowsToRender[i];
        if (rowIndex === undefined) {
          this._staticRowArray[i] = _React2.default.createElement(_FixedDataTableRow2.default, {
            key: i,
            isScrolling: props.isScrolling,
            index: i,
            width: props.width,
            height: 0,
            offsetTop: 0,
            scrollLeft: Math.round(props.scrollLeft),
            visible: false,
            fixedColumns: props.fixedColumns,
            fixedRightColumns: props.fixedRightColumns,
            scrollableColumns: props.scrollableColumns
          });
          continue;
        }

        var currentRowHeight = this.props.rowSettings.rowHeightGetter(rowIndex);
        var currentSubRowHeight = this.props.rowSettings.subRowHeightGetter(rowIndex);
        var rowOffsetTop = baseOffsetTop + props.rowHeights[rowIndex];
        var rowKey = props.rowKeyGetter ? props.rowKeyGetter(rowIndex) : i;
        var hasBottomBorder = rowIndex === props.rowSettings.rowsCount - 1 && props.showLastRowBorder;

        this._staticRowArray[i] = _React2.default.createElement(_FixedDataTableRow2.default, {
          key: rowKey,
          isScrolling: props.isScrolling,
          index: rowIndex,
          width: props.width,
          height: currentRowHeight,
          subRowHeight: currentSubRowHeight,
          rowExpanded: props.rowExpanded,
          scrollLeft: Math.round(props.scrollLeft),
          offsetTop: Math.round(rowOffsetTop),
          visible: true,
          fixedColumns: props.fixedColumns,
          fixedRightColumns: props.fixedRightColumns,
          scrollableColumns: props.scrollableColumns,
          onClick: props.onRowClick,
          onContextMenu: props.onRowContextMenu,
          onDoubleClick: props.onRowDoubleClick,
          onMouseDown: props.onRowMouseDown,
          onMouseUp: props.onRowMouseUp,
          onMouseEnter: props.onRowMouseEnter,
          onMouseLeave: props.onRowMouseLeave,
          onTouchStart: props.onRowTouchStart,
          onTouchEnd: props.onRowTouchEnd,
          onTouchMove: props.onRowTouchMove,
          showScrollbarY: props.showScrollbarY,
          className: (0, _joinClasses2.default)(rowClassNameGetter(rowIndex), (0, _cx2.default)('public/fixedDataTable/bodyRow'), (0, _cx2.default)({
            'fixedDataTableLayout/hasBottomBorder': hasBottomBorder,
            'public/fixedDataTable/hasBottomBorder': hasBottomBorder
          }))
        });
      }

      return _React2.default.createElement(
        'div',
        null,
        this._staticRowArray
      );
    }
  }]);

  return FixedDataTableBufferedRows;
}(_React2.default.Component);

FixedDataTableBufferedRows.propTypes = {
  isScrolling: _propTypes2.default.bool,
  fixedColumns: _propTypes2.default.array.isRequired,
  fixedRightColumns: _propTypes2.default.array.isRequired,
  height: _propTypes2.default.number.isRequired,
  offsetTop: _propTypes2.default.number.isRequired,
  onRowClick: _propTypes2.default.func,
  onRowContextMenu: _propTypes2.default.func,
  onRowDoubleClick: _propTypes2.default.func,
  onRowMouseDown: _propTypes2.default.func,
  onRowMouseUp: _propTypes2.default.func,
  onRowMouseEnter: _propTypes2.default.func,
  onRowMouseLeave: _propTypes2.default.func,
  onRowTouchStart: _propTypes2.default.func,
  onRowTouchEnd: _propTypes2.default.func,
  onRowTouchMove: _propTypes2.default.func,
  rowClassNameGetter: _propTypes2.default.func,
  rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  rowHeights: _propTypes2.default.object.isRequired,
  rowKeyGetter: _propTypes2.default.func,
  rowSettings: _propTypes2.default.shape({
    rowHeightGetter: _propTypes2.default.func,
    rowsCount: _propTypes2.default.number.isRequired,
    subRowHeightGetter: _propTypes2.default.func
  }),
  rowsToRender: _propTypes2.default.array.isRequired,
  scrollLeft: _propTypes2.default.number.isRequired,
  scrollTop: _propTypes2.default.number.isRequired,
  scrollableColumns: _propTypes2.default.array.isRequired,
  showLastRowBorder: _propTypes2.default.bool,
  showScrollbarY: _propTypes2.default.bool,
  width: _propTypes2.default.number.isRequired
};
;

module.exports = FixedDataTableBufferedRows;