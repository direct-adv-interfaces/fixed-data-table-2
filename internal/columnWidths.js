'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                   * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * @providesModule columnWidths
                                                                                                                                                                                                                                                                   */


var _widthHelper = require('./widthHelper');

var _Scrollbar = require('./Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _scrollbarsVisible = require('./scrollbarsVisible');

var _scrollbarsVisible2 = _interopRequireDefault(_scrollbarsVisible);

var _shallowEqualSelector = require('./shallowEqualSelector');

var _shallowEqualSelector2 = _interopRequireDefault(_shallowEqualSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {{
 *   fixed: boolean,
 *   fixedRight: boolean,
 *   flexGrow: number,
 *   width: number,
 * }}
 */
var columnDefinition = void 0;

/**
 * @param {!Array.<columnDefinition>} columnGroupProps
 * @param {!Array.<columnDefinition>} columnProps
 * @param {boolean} scrollEnabledY
 * @param {number} width
 * @return {{
 *   columnGroupProps: !Array.<columnDefinition>,
 *   columnProps: !Array.<columnDefinition>,
 *   availableScrollWidth: number,
 *   fixedColumns: !Array.<columnDefinition>,
 *   fixedRightColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>,
 *   maxScrollX: number,
 * }} The total width of all columns.
 */
function columnWidths(columnGroupProps, columnProps, scrollEnabledY, width) {
  var scrollbarSpace = scrollEnabledY ? _Scrollbar2.default.SIZE + _Scrollbar2.default.OFFSET : 0;
  var viewportWidth = width - scrollbarSpace;

  var _flexWidths = flexWidths(columnGroupProps, columnProps, viewportWidth),
      newColumnGroupProps = _flexWidths.newColumnGroupProps,
      newColumnProps = _flexWidths.newColumnProps;

  var _groupColumns = groupColumns(newColumnProps),
      fixedColumns = _groupColumns.fixedColumns,
      fixedRightColumns = _groupColumns.fixedRightColumns,
      scrollableColumns = _groupColumns.scrollableColumns;

  var availableScrollWidth = viewportWidth - (0, _widthHelper.getTotalWidth)(fixedColumns) - (0, _widthHelper.getTotalWidth)(fixedRightColumns);
  var maxScrollX = Math.max(0, (0, _widthHelper.getTotalWidth)(newColumnProps) - viewportWidth);
  return {
    columnGroupProps: newColumnGroupProps,
    columnProps: newColumnProps,
    availableScrollWidth: availableScrollWidth,
    fixedColumns: fixedColumns,
    fixedRightColumns: fixedRightColumns,
    scrollableColumns: scrollableColumns,
    maxScrollX: maxScrollX
  };
}

/**
 * @param {!Array.<columnDefinition>} columnGroupProps
 * @param {!Array.<columnDefinition>} columnProps
 * @param {number} viewportWidth
 * @return {{
 *   newColumnGroupProps: !Array.<columnDefinition>,
 *   newColumnProps: !Array.<columnDefinition>
 * }}
 */
function flexWidths(columnGroupProps, columnProps, viewportWidth) {
  var remainingFlexGrow = (0, _widthHelper.getTotalFlexGrow)(columnProps);

  var columnsWidth = (0, _widthHelper.getTotalWidth)(columnProps);
  var remainingFlexWidth = Math.max(viewportWidth - columnsWidth, 0);

  var newColumnProps = (0, _map2.default)(columnProps, function (column) {
    var flexGrow = column.flexGrow;


    if (!flexGrow || remainingFlexGrow === 0) {
      return column;
    }

    var flexWidth = Math.floor(flexGrow * remainingFlexWidth / remainingFlexGrow);
    var newWidth = column.width + flexWidth;
    remainingFlexGrow -= flexGrow;
    remainingFlexWidth -= flexWidth;

    return _extends({}, column, { width: newWidth });
  });

  var columnGroupWidths = (0, _map2.default)(columnGroupProps, function () {
    return 0;
  });
  (0, _forEach2.default)(newColumnProps, function (column) {
    if (column.groupIdx !== undefined) {
      columnGroupWidths[column.groupIdx] += column.width;
    }
  });

  var newColumnGroupProps = (0, _map2.default)(columnGroupProps, function (columnGroup, idx) {
    if (columnGroupWidths[idx] === columnGroup.width) {
      return columnGroup;
    }
    return _extends({}, columnGroup, { width: columnGroupWidths[idx] });
  });

  return {
    newColumnGroupProps: newColumnGroupProps,
    newColumnProps: newColumnProps
  };
}

/**
 * @param {!Array.<columnDefinition>} columnProps
 * @return {{
 *   fixedColumns: !Array.<columnDefinition>,
 *   fixedRightColumns: !Array.<columnDefinition>,
 *   scrollableColumns: !Array.<columnDefinition>
 * }}
 */
function groupColumns(columnProps) {
  var fixedColumns = [];
  var fixedRightColumns = [];
  var scrollableColumns = [];

  (0, _forEach2.default)(columnProps, function (columnProp) {
    var container = scrollableColumns;
    if (columnProp.fixed) {
      container = fixedColumns;
    } else if (columnProp.fixedRight) {
      container = fixedRightColumns;
    }
    container.push(columnProp);
  });

  return {
    fixedColumns: fixedColumns,
    fixedRightColumns: fixedRightColumns,
    scrollableColumns: scrollableColumns
  };
}

exports.default = (0, _shallowEqualSelector2.default)([function (state) {
  return state.columnGroupProps;
}, function (state) {
  return state.columnProps;
}, function (state) {
  return (0, _scrollbarsVisible2.default)(state).scrollEnabledY;
}, function (state) {
  return state.tableSize.width;
}], columnWidths);