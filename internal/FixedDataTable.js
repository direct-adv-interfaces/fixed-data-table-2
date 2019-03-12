'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Copyright Schrodinger, LLC
                                                                                                                                                                                                                                                                   * All rights reserved.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                   * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * @providesModule FixedDataTable
                                                                                                                                                                                                                                                                   * @typechecks
                                                                                                                                                                                                                                                                   * @noflow
                                                                                                                                                                                                                                                                   */

/*eslint no-bitwise:1*/

var _FixedDataTableBufferedRows = require('./FixedDataTableBufferedRows');

var _FixedDataTableBufferedRows2 = _interopRequireDefault(_FixedDataTableBufferedRows);

var _FixedDataTableColumnResizeHandle = require('./FixedDataTableColumnResizeHandle');

var _FixedDataTableColumnResizeHandle2 = _interopRequireDefault(_FixedDataTableColumnResizeHandle);

var _FixedDataTableRow = require('./FixedDataTableRow');

var _FixedDataTableRow2 = _interopRequireDefault(_FixedDataTableRow);

var _React = require('./React');

var _React2 = _interopRequireDefault(_React);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactComponentWithPureRenderMixin = require('./ReactComponentWithPureRenderMixin');

var _ReactComponentWithPureRenderMixin2 = _interopRequireDefault(_ReactComponentWithPureRenderMixin);

var _ReactTouchHandler = require('./ReactTouchHandler');

var _ReactTouchHandler2 = _interopRequireDefault(_ReactTouchHandler);

var _ReactWheelHandler = require('./ReactWheelHandler');

var _ReactWheelHandler2 = _interopRequireDefault(_ReactWheelHandler);

var _Scrollbar = require('./Scrollbar');

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

var _columnTemplates = require('./columnTemplates');

var _columnTemplates2 = _interopRequireDefault(_columnTemplates);

var _cx = require('./cx');

var _cx2 = _interopRequireDefault(_cx);

var _debounceCore = require('./debounceCore');

var _debounceCore2 = _interopRequireDefault(_debounceCore);

var _joinClasses = require('./joinClasses');

var _joinClasses2 = _interopRequireDefault(_joinClasses);

var _scrollbarsVisible2 = require('./scrollbarsVisible');

var _scrollbarsVisible3 = _interopRequireDefault(_scrollbarsVisible2);

var _tableHeights = require('./tableHeights');

var _tableHeights2 = _interopRequireDefault(_tableHeights);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Data grid component with fixed or scrollable header and columns.
 *
 * The layout of the data table is as follows:
 *
 * ```
 * +---------------------------------------------------+
 * | Fixed Column Group    | Scrollable Column Group   |
 * | Header                | Header                    |
 * |                       |                           |
 * +---------------------------------------------------+
 * |                       |                           |
 * | Fixed Header Columns  | Scrollable Header Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Body Columns    | Scrollable Body Columns   |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * |                       |                           |
 * | Fixed Footer Columns  | Scrollable Footer Columns |
 * |                       |                           |
 * +-----------------------+---------------------------+
 * ```
 *
 * - Fixed Column Group Header: These are the headers for a group
 *   of columns if included in the table that do not scroll
 *   vertically or horizontally.
 *
 * - Scrollable Column Group Header: The header for a group of columns
 *   that do not move while scrolling vertically, but move horizontally
 *   with the horizontal scrolling.
 *
 * - Fixed Header Columns: The header columns that do not move while scrolling
 *   vertically or horizontally.
 *
 * - Scrollable Header Columns: The header columns that do not move
 *   while scrolling vertically, but move horizontally with the horizontal
 *   scrolling.
 *
 * - Fixed Body Columns: The body columns that do not move while scrolling
 *   horizontally, but move vertically with the vertical scrolling.
 *
 * - Scrollable Body Columns: The body columns that move while scrolling
 *   vertically or horizontally.
 */
var FixedDataTable = (0, _createReactClass2.default)({
  displayName: 'FixedDataTable',

  propTypes: {

    // TODO (jordan) Remove propType of width without losing documentation (moved to tableSize)
    /**
     * Pixel width of table. If all columns do not fit,
     * a horizontal scrollbar will appear.
     */
    width: _propTypes2.default.number.isRequired,

    // TODO (jordan) Remove propType of height without losing documentation (moved to tableSize)
    /**
     * Pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    height: _propTypes2.default.number,

    /**
     * Class name to be passed into parent container
     */
    className: _propTypes2.default.string,

    // TODO (jordan) Remove propType of maxHeight without losing documentation (moved to tableSize)
    /**
     * Maximum pixel height of table. If all rows do not fit,
     * a vertical scrollbar will appear.
     *
     * Either `height` or `maxHeight` must be specified.
     */
    maxHeight: _propTypes2.default.number,

    // TODO (jordan) Remove propType of ownerHeight without losing documentation (moved to tableSize)
    /**
     * Pixel height of table's owner, this is used in a managed scrolling
     * situation when you want to slide the table up from below the fold
     * without having to constantly update the height on every scroll tick.
     * Instead, vary this property on scroll. By using `ownerHeight`, we
     * over-render the table while making sure the footer and horizontal
     * scrollbar of the table are visible when the current space for the table
     * in view is smaller than the final, over-flowing height of table. It
     * allows us to avoid resizing and reflowing table when it is moving in the
     * view.
     *
     * This is used if `ownerHeight < height` (or `maxHeight`).
     */
    ownerHeight: _propTypes2.default.number,

    // TODO (jordan) Remove propType of overflowX & overflowY without losing documentation (moved to scrollFlags)
    overflowX: _propTypes2.default.oneOf(['hidden', 'auto']),
    overflowY: _propTypes2.default.oneOf(['hidden', 'auto']),

    /**
     * Boolean flag indicating of touch scrolling should be enabled
     * This feature is current in beta and may have bugs
     */
    touchScrollEnabled: _propTypes2.default.bool,

    // TODO (jordan) Remove propType of showScrollbarX & showScrollbarY without losing documentation (moved to scrollFlags)
    /**
     * Hide the scrollbar but still enable scroll functionality
     */
    showScrollbarX: _propTypes2.default.bool,
    showScrollbarY: _propTypes2.default.bool,

    /**
     * Callback when horizontally scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onHorizontalScroll: _propTypes2.default.func,

    /**
     * Callback when vertically scrolling the grid.
     *
     * Return false to stop propagation.
     */
    onVerticalScroll: _propTypes2.default.func,

    // TODO (jordan) Remove propType of rowsCount without losing documentation (moved to rowSettings)
    /**
     * Number of rows in the table.
     */
    rowsCount: _propTypes2.default.number.isRequired,

    // TODO (jordan) Remove propType of rowHeight without losing documentation (moved to rowSettings)
    /**
     * Pixel height of rows unless `rowHeightGetter` is specified and returns
     * different value.
     */
    rowHeight: _propTypes2.default.number.isRequired,

    // TODO (jordan) Remove propType of rowHeightGetter without losing documentation (moved to rowSettings)
    /**
     * If specified, `rowHeightGetter(index)` is called for each row and the
     * returned value overrides `rowHeight` for particular row.
     */
    rowHeightGetter: _propTypes2.default.func,

    // TODO (jordan) Remove propType of subRowHeight without losing documentation (moved to rowSettings)
    /**
     * Pixel height of sub-row unless `subRowHeightGetter` is specified and returns
     * different value.  Defaults to 0 and no sub-row being displayed.
     */
    subRowHeight: _propTypes2.default.number,

    // TODO (jordan) Remove propType of subRowHeightGetter without losing documentation (moved to rowSettings)
    /**
     * If specified, `subRowHeightGetter(index)` is called for each row and the
     * returned value overrides `subRowHeight` for particular row.
     */
    subRowHeightGetter: _propTypes2.default.func,

    /**
     * The row expanded for table row.
     * This can either be a React element, or a function that generates
     * a React Element. By default, the React element passed in can expect to
     * receive the following props:
     *
     * ```
     * props: {
     *   rowIndex; number // (the row index)
     *   height: number // (supplied from subRowHeight or subRowHeightGetter)
     *   width: number // (supplied from the Table)
     * }
     * ```
     *
     * Because you are passing in your own React element, you can feel free to
     * pass in whatever props you may want or need.
     *
     * If you pass in a function, you will receive the same props object as the
     * first argument.
     */
    rowExpanded: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),

    /**
     * To get any additional CSS classes that should be added to a row,
     * `rowClassNameGetter(index)` is called.
     */
    rowClassNameGetter: _propTypes2.default.func,

    /**
     * If specified, `rowKeyGetter(index)` is called for each row and the
     * returned value overrides `key` for the particular row.
     */
    rowKeyGetter: _propTypes2.default.func,

    // TODO (jordan) Remove propType of groupHeaderHeight without losing documentation (moved to elementHeights)
    /**
     * Pixel height of the column group header.
     */
    groupHeaderHeight: _propTypes2.default.number,

    // TODO (jordan) Remove propType of headerHeight without losing documentation (moved to elementHeights)
    /**
     * Pixel height of header.
     */
    headerHeight: _propTypes2.default.number.isRequired,

    // TODO (jordan) Remove propType of footerHeight without losing documentation (moved to elementHeights)
    /**
     * Pixel height of footer.
     */
    footerHeight: _propTypes2.default.number,

    /**
     * Value of horizontal scroll.
     */
    scrollLeft: _propTypes2.default.number,

    // TODO (jordan) Remove propType of scrollToRow & scrollToColumn without losing documentation
    /**
     * Index of column to scroll to.
     */
    scrollToColumn: _propTypes2.default.number,

    /**
     * Value of vertical scroll.
     */
    scrollTop: _propTypes2.default.number,

    /**
     * Index of row to scroll to.
     */
    scrollToRow: _propTypes2.default.number,

    /**
     * Callback that is called when scrolling starts with current horizontal
     * and vertical scroll values.
     */
    onScrollStart: _propTypes2.default.func,

    /**
     * Callback that is called when scrolling ends or stops with new horizontal
     * and vertical scroll values.
     */
    onScrollEnd: _propTypes2.default.func,

    /**
     * If enabled scroll events will not be propagated outside of the table.
     */
    stopScrollPropagation: _propTypes2.default.bool,

    /**
     * Callback that is called when `rowHeightGetter` returns a different height
     * for a row than the `rowHeight` prop. This is necessary because initially
     * table estimates heights of some parts of the content.
     */
    onContentHeightChange: _propTypes2.default.func,

    /**
     * Callback that is called when a row is clicked.
     */
    onRowClick: _propTypes2.default.func,

    /**
     * Callback that is called when a row is double clicked.
     */
    onRowDoubleClick: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-down event happens on a row.
     */
    onRowMouseDown: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-enter event happens on a row.
     */
    onRowMouseEnter: _propTypes2.default.func,

    /**
     * Callback that is called when a mouse-leave event happens on a row.
     */
    onRowMouseLeave: _propTypes2.default.func,

    /**
     * Callback that is called when resizer has been released
     * and column needs to be updated.
     *
     * Required if the isResizable property is true on any column.
     *
     * ```
     * function(
     *   newColumnWidth: number,
     *   columnKey: string,
     * )
     * ```
     */
    onColumnResizeEndCallback: _propTypes2.default.func,

    /**
     * Callback that is called when reordering has been completed
     * and columns need to be updated.
     *
     * ```
     * function(
     *   event {
     *     columnBefore: string|undefined, // the column before the new location of this one
     *     columnAfter: string|undefined,  // the column after the new location of this one
     *     reorderColumn: string,          // the column key that was just reordered
     *   }
     * )
     * ```
     */
    onColumnReorderEndCallback: _propTypes2.default.func,

    /**
     * Whether a column is currently being resized.
     */
    isColumnResizing: _propTypes2.default.bool,

    /**
     * Whether columns are currently being reordered.
     */
    isColumnReordering: _propTypes2.default.bool,

    // TODO (jordan) Remove propType of bufferRowCount without losing documentation
    /**
     * The number of rows outside the viewport to prerender. Defaults to roughly
     * half of the number of visible rows.
     */
    bufferRowCount: _propTypes2.default.number
  },

  getDefaultProps: function getDefaultProps() /*object*/{
    return {
      elementHeights: {
        footerHeight: 0,
        groupHeaderHeight: 0,
        headerHeight: 0
      },
      touchScrollEnabled: false,
      stopScrollPropagation: false
    };
  },
  componentWillMount: function componentWillMount() {
    this._didScrollStop = (0, _debounceCore2.default)(this._didScrollStop, 200, this);

    this._wheelHandler = new _ReactWheelHandler2.default(this._onScroll, this._shouldHandleWheelX, this._shouldHandleWheelY, this.props.stopScrollPropagation);

    this._touchHandler = new _ReactTouchHandler2.default(this._onScroll, this._shouldHandleTouchX, this._shouldHandleTouchY, this.props.stopScrollPropagation);
  },
  componentWillUnmount: function componentWillUnmount() {
    this._wheelHandler = null;
    this._touchHandler = null;
  },
  _shouldHandleTouchX: function _shouldHandleTouchX( /*number*/delta) /*boolean*/{
    return this.props.touchScrollEnabled && this._shouldHandleWheelX(delta);
  },
  _shouldHandleTouchY: function _shouldHandleTouchY( /*number*/delta) /*boolean*/{
    return this.props.touchScrollEnabled && this._shouldHandleWheelY(delta);
  },
  _shouldHandleWheelX: function _shouldHandleWheelX( /*number*/delta) /*boolean*/{
    var _props = this.props,
        maxScrollX = _props.maxScrollX,
        scrollFlags = _props.scrollFlags,
        scrollX = _props.scrollX;
    var overflowX = scrollFlags.overflowX;


    if (overflowX === 'hidden') {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return delta < 0 && scrollX > 0 || delta >= 0 && scrollX < maxScrollX;
  },
  _shouldHandleWheelY: function _shouldHandleWheelY( /*number*/delta) /*boolean*/{
    var _props2 = this.props,
        maxScrollY = _props2.maxScrollY,
        scrollFlags = _props2.scrollFlags,
        scrollY = _props2.scrollY;
    var overflowY = scrollFlags.overflowY;


    if (overflowY === 'hidden' || delta === 0) {
      return false;
    }

    delta = Math.round(delta);
    if (delta === 0) {
      return false;
    }

    return delta < 0 && scrollY > 0 || delta >= 0 && scrollY < maxScrollY;
  },
  _reportContentHeight: function _reportContentHeight() {
    var _tableHeightsSelector = (0, _tableHeights2.default)(this.props),
        contentHeight = _tableHeightsSelector.contentHeight;

    var onContentHeightChange = this.props.onContentHeightChange;


    if (contentHeight !== this._contentHeight && onContentHeightChange) {
      onContentHeightChange(contentHeight);
    }
    this._contentHeight = contentHeight;
  },
  componentDidMount: function componentDidMount() {
    this._reportContentHeight();
  },
  componentWillReceiveProps: function componentWillReceiveProps( /*object*/nextProps) {

    // In the case of controlled scrolling, notify.
    if (this.props.tableSize.ownerHeight !== nextProps.tableSize.ownerHeight || this.props.scrollTop !== nextProps.scrollTop || this.props.scrollLeft !== nextProps.scrollLeft) {
      this._didScrollStart();
    }
    this._didScrollStop();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._reportContentHeight();
  },
  render: function render() /*object*/{
    var _columnTemplatesSelec = (0, _columnTemplates2.default)(this.props),
        fixedColumnGroups = _columnTemplatesSelec.fixedColumnGroups,
        fixedColumns = _columnTemplatesSelec.fixedColumns,
        scrollableColumnGroups = _columnTemplatesSelec.scrollableColumnGroups,
        scrollableColumns = _columnTemplatesSelec.scrollableColumns;

    var _tableHeightsSelector2 = (0, _tableHeights2.default)(this.props),
        bodyHeight = _tableHeightsSelector2.bodyHeight,
        bodyOffsetTop = _tableHeightsSelector2.bodyOffsetTop,
        componentHeight = _tableHeightsSelector2.componentHeight,
        footOffsetTop = _tableHeightsSelector2.footOffsetTop,
        scrollbarXOffsetTop = _tableHeightsSelector2.scrollbarXOffsetTop,
        visibleRowsHeight = _tableHeightsSelector2.visibleRowsHeight;

    var _props3 = this.props,
        className = _props3.className,
        columnReorderingData = _props3.columnReorderingData,
        columnResizingData = _props3.columnResizingData,
        elementHeights = _props3.elementHeights,
        isColumnReordering = _props3.isColumnReordering,
        isColumnResizing = _props3.isColumnResizing,
        maxScrollX = _props3.maxScrollX,
        maxScrollY = _props3.maxScrollY,
        onColumnReorderEndCallback = _props3.onColumnReorderEndCallback,
        onColumnResizeEndCallback = _props3.onColumnResizeEndCallback,
        scrollContentHeight = _props3.scrollContentHeight,
        scrollX = _props3.scrollX,
        scrollY = _props3.scrollY,
        tableSize = _props3.tableSize;
    var ownerHeight = tableSize.ownerHeight,
        width = tableSize.width;
    var footerHeight = elementHeights.footerHeight,
        groupHeaderHeight = elementHeights.groupHeaderHeight,
        headerHeight = elementHeights.headerHeight;

    var _scrollbarsVisible = (0, _scrollbarsVisible3.default)(this.props),
        scrollEnabledX = _scrollbarsVisible.scrollEnabledX,
        scrollEnabledY = _scrollbarsVisible.scrollEnabledY;

    var onColumnReorder = onColumnReorderEndCallback ? this._onColumnReorder : null;

    var groupHeader = void 0;
    if (groupHeaderHeight > 0) {
      groupHeader = _React2.default.createElement(_FixedDataTableRow2.default, {
        key: 'group_header',
        isScrolling: this._isScrolling,
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/header'), (0, _cx2.default)('public/fixedDataTable/header')),
        width: width,
        height: groupHeaderHeight,
        index: 0,
        zIndex: 1,
        offsetTop: 0,
        scrollLeft: scrollX,
        fixedColumns: fixedColumnGroups,
        scrollableColumns: scrollableColumnGroups,
        visible: true,
        onColumnResize: this._onColumnResize,
        onColumnReorder: onColumnReorder,
        onColumnReorderMove: this._onColumnReorderMove
      });
    }

    var scrollbarY = void 0;
    if (scrollEnabledY) {
      scrollbarY = _React2.default.createElement(_Scrollbar2.default, {
        size: visibleRowsHeight,
        contentSize: scrollContentHeight,
        onScroll: this._onVerticalScroll,
        verticalTop: bodyOffsetTop,
        position: scrollY
      });
    }

    var scrollbarX = void 0;
    if (scrollEnabledX) {
      scrollbarX = _React2.default.createElement(HorizontalScrollbar, {
        contentSize: width + maxScrollX,
        offset: scrollbarXOffsetTop,
        onScroll: this._onHorizontalScroll,
        position: scrollX,
        size: width
      });
    }

    var dragKnob = _React2.default.createElement(_FixedDataTableColumnResizeHandle2.default, {
      height: componentHeight,
      initialWidth: columnResizingData.width || 0,
      minWidth: columnResizingData.minWidth || 0,
      maxWidth: columnResizingData.maxWidth || Number.MAX_VALUE,
      visible: !!isColumnResizing,
      leftOffset: columnResizingData.left || 0,
      knobHeight: headerHeight,
      initialEvent: columnResizingData.initialEvent,
      onColumnResizeEnd: onColumnResizeEndCallback,
      columnKey: columnResizingData.key
    });

    var footer = null;
    if (footerHeight) {
      footer = _React2.default.createElement(_FixedDataTableRow2.default, {
        key: 'footer',
        isScrolling: this._isScrolling,
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/footer'), (0, _cx2.default)('public/fixedDataTable/footer')),
        width: width,
        height: footerHeight,
        index: -1,
        zIndex: 1,
        offsetTop: footOffsetTop,
        visible: true,
        fixedColumns: fixedColumns.footer,
        scrollableColumns: scrollableColumns.footer,
        scrollLeft: scrollX
      });
    }

    var rows = this._renderRows(bodyOffsetTop, fixedColumns.cell, scrollableColumns.cell, bodyHeight);

    var header = _React2.default.createElement(_FixedDataTableRow2.default, {
      key: 'header',
      isScrolling: this._isScrolling,
      className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/header'), (0, _cx2.default)('public/fixedDataTable/header')),
      width: width,
      height: headerHeight,
      index: -1,
      zIndex: 1,
      offsetTop: groupHeaderHeight,
      scrollLeft: scrollX,
      visible: true,
      fixedColumns: fixedColumns.header,
      scrollableColumns: scrollableColumns.header,
      onColumnResize: this._onColumnResize,
      onColumnReorder: onColumnReorder,
      onColumnReorderMove: this._onColumnReorderMove,
      onColumnReorderEnd: this._onColumnReorderEnd,
      isColumnReordering: !!isColumnReordering,
      columnReorderingData: columnReorderingData
    });

    var topShadow = void 0;
    if (scrollY) {
      topShadow = _React2.default.createElement('div', {
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/topShadow'), (0, _cx2.default)('public/fixedDataTable/topShadow')),
        style: { top: bodyOffsetTop }
      });
    }

    // ownerScrollAvailable is true if the rows rendered will overflow the owner element
    // so we show a shadow in that case even if the FDT component can't scroll anymore
    var ownerScrollAvailable = ownerHeight && ownerHeight < componentHeight && scrollContentHeight > visibleRowsHeight;
    var bottomShadow = void 0;
    if (ownerScrollAvailable || scrollY < maxScrollY) {
      bottomShadow = _React2.default.createElement('div', {
        className: (0, _joinClasses2.default)((0, _cx2.default)('fixedDataTableLayout/bottomShadow'), (0, _cx2.default)('public/fixedDataTable/bottomShadow')),
        style: { top: footOffsetTop }
      });
    }

    return _React2.default.createElement(
      'div',
      {
        className: (0, _joinClasses2.default)(className, (0, _cx2.default)('fixedDataTableLayout/main'), (0, _cx2.default)('public/fixedDataTable/main')),
        onWheel: this._wheelHandler.onWheel,
        onTouchStart: this._touchHandler.onTouchStart,
        onTouchEnd: this._touchHandler.onTouchEnd,
        onTouchMove: this._touchHandler.onTouchMove,
        onTouchCancel: this._touchHandler.onTouchCancel,
        style: {
          height: componentHeight,
          width: width
        } },
      _React2.default.createElement(
        'div',
        {
          className: (0, _cx2.default)('fixedDataTableLayout/rowsContainer'),
          style: {
            height: scrollbarXOffsetTop,
            width: width
          } },
        dragKnob,
        groupHeader,
        header,
        rows,
        footer,
        topShadow,
        bottomShadow
      ),
      scrollbarY,
      scrollbarX
    );
  },
  _renderRows: function _renderRows( /*number*/offsetTop, fixedCellTemplates, scrollableCellTemplates, bodyHeight) /*object*/{
    var props = this.props;
    return _React2.default.createElement(_FixedDataTableBufferedRows2.default, {
      isScrolling: this._isScrolling,
      fixedColumns: fixedCellTemplates,
      height: bodyHeight,
      offsetTop: offsetTop,
      onRowClick: props.onRowClick,
      onRowDoubleClick: props.onRowDoubleClick,
      onRowMouseDown: props.onRowMouseDown,
      onRowMouseEnter: props.onRowMouseEnter,
      onRowMouseLeave: props.onRowMouseLeave,
      rowClassNameGetter: props.rowClassNameGetter,
      rowExpanded: props.rowExpanded,
      rowKeyGetter: props.rowKeyGetter,
      rowSettings: props.rowSettings,
      scrollLeft: props.scrollX,
      scrollTop: props.scrollY,
      scrollableColumns: scrollableCellTemplates,
      showLastRowBorder: true,
      width: props.tableSize.width,
      rowsToRender: props.rows,
      rowHeights: props.rowHeights
    });
  },


  /**
   * This is called when a cell that is in the header of a column has its
   * resizer knob clicked on. It displays the resizer and puts in the correct
   * location on the table.
   */
  _onColumnResize: function _onColumnResize(
  /*number*/combinedWidth,
  /*number*/leftOffset,
  /*number*/cellWidth,
  /*?number*/cellMinWidth,
  /*?number*/cellMaxWidth,
  /*number|string*/columnKey,
  /*object*/event) {
    var clientX = event.clientX;
    var clientY = event.clientY;
    this.props.columnActions.resizeColumn({
      cellMinWidth: cellMinWidth,
      cellMaxWidth: cellMaxWidth,
      cellWidth: cellWidth,
      columnKey: columnKey,
      combinedWidth: combinedWidth,
      clientX: clientX,
      clientY: clientY,
      leftOffset: leftOffset
    });
  },
  _onColumnReorder: function _onColumnReorder( /*string*/columnKey, /*number*/width, /*number*/left, /*object*/event) {
    this.props.columnActions.startColumnReorder({
      scrollStart: this.props.scrollX,
      columnKey: columnKey,
      width: width,
      left: left
    });
  },
  _onColumnReorderMove: function _onColumnReorderMove( /*number*/deltaX) {
    this.props.columnActions.moveColumnReorder(deltaX);
  },
  _onColumnReorderEnd: function _onColumnReorderEnd( /*object*/props, /*object*/event) {
    var _props4 = this.props,
        columnActions = _props4.columnActions,
        _props4$columnReorder = _props4.columnReorderingData,
        cancelReorder = _props4$columnReorder.cancelReorder,
        columnAfter = _props4$columnReorder.columnAfter,
        columnBefore = _props4$columnReorder.columnBefore,
        columnKey = _props4$columnReorder.columnKey,
        scrollStart = _props4$columnReorder.scrollStart,
        onColumnReorderEndCallback = _props4.onColumnReorderEndCallback,
        onHorizontalScroll = _props4.onHorizontalScroll,
        scrollX = _props4.scrollX;


    columnActions.stopColumnReorder();
    if (cancelReorder) {
      return;
    }

    onColumnReorderEndCallback({
      columnAfter: columnAfter,
      columnBefore: columnBefore,
      reorderColumn: columnKey
    });

    if (scrollStart !== scrollX && onHorizontalScroll) {
      onHorizontalScroll(scrollX);
    };
  },
  _onScroll: function _onScroll( /*number*/deltaX, /*number*/deltaY) {
    var _props5 = this.props,
        maxScrollX = _props5.maxScrollX,
        maxScrollY = _props5.maxScrollY,
        onHorizontalScroll = _props5.onHorizontalScroll,
        onVerticalScroll = _props5.onVerticalScroll,
        scrollActions = _props5.scrollActions,
        scrollFlags = _props5.scrollFlags,
        scrollX = _props5.scrollX,
        scrollY = _props5.scrollY;
    var overflowX = scrollFlags.overflowX,
        overflowY = scrollFlags.overflowY;


    if (!this._isScrolling) {
      this._didScrollStart();
    }
    var x = scrollX;
    var y = scrollY;
    if (Math.abs(deltaY) > Math.abs(deltaX) && overflowY !== 'hidden') {
      y += deltaY;
      y = y < 0 ? 0 : y;
      y = y > maxScrollY ? maxScrollY : y;

      //NOTE (jordan) This is a hacky workaround to prevent FDT from setting its internal state
      if (onVerticalScroll ? onVerticalScroll(y) : true) {
        scrollActions.scrollToY(y);
      }
    } else if (deltaX && overflowX !== 'hidden') {
      x += deltaX;
      x = x < 0 ? 0 : x;
      x = x > maxScrollX ? maxScrollX : x;

      //NOTE (asif) This is a hacky workaround to prevent FDT from setting its internal state
      if (onHorizontalScroll ? onHorizontalScroll(x) : true) {
        scrollActions.scrollToX(x);
      }
    }

    this._didScrollStop();
  },
  _onHorizontalScroll: function _onHorizontalScroll( /*number*/scrollPos) {
    var _props6 = this.props,
        onHorizontalScroll = _props6.onHorizontalScroll,
        scrollActions = _props6.scrollActions,
        scrollX = _props6.scrollX;


    if (scrollPos === scrollX) {
      return;
    }

    if (!this._isScrolling) {
      this._didScrollStart();
    }

    if (onHorizontalScroll ? onHorizontalScroll(scrollPos) : true) {
      scrollActions.scrollToX(scrollPos);
    }
    this._didScrollStop();
  },
  _onVerticalScroll: function _onVerticalScroll( /*number*/scrollPos) {
    var _props7 = this.props,
        onVerticalScroll = _props7.onVerticalScroll,
        scrollActions = _props7.scrollActions,
        scrollY = _props7.scrollY;


    if (scrollPos === scrollY) {
      return;
    }

    if (!this._isScrolling) {
      this._didScrollStart();
    }

    if (onVerticalScroll ? onVerticalScroll(scrollPos) : true) {
      scrollActions.scrollToY(scrollPos);
    }

    this._didScrollStop();
  },
  _didScrollStart: function _didScrollStart() {
    var _props8 = this.props,
        firstRowIndex = _props8.firstRowIndex,
        onScrollStart = _props8.onScrollStart,
        scrollActions = _props8.scrollActions,
        scrollX = _props8.scrollX,
        scrollY = _props8.scrollY;


    if (this._isScrolling) {
      return;
    }

    this._isScrolling = true;
    scrollActions.startScroll();

    if (onScrollStart) {
      onScrollStart(scrollX, scrollY, firstRowIndex);
    }
  },
  _didScrollStop: function _didScrollStop() {
    var _props9 = this.props,
        firstRowIndex = _props9.firstRowIndex,
        onScrollEnd = _props9.onScrollEnd,
        scrollActions = _props9.scrollActions,
        scrollX = _props9.scrollX,
        scrollY = _props9.scrollY;


    if (!this._isScrolling) {
      return;
    }

    this._isScrolling = false;
    scrollActions.stopScroll();

    if (onScrollEnd) {
      onScrollEnd(scrollX, scrollY, firstRowIndex);
    }
  }
});

var HorizontalScrollbar = (0, _createReactClass2.default)({
  displayName: 'HorizontalScrollbar',
  mixins: [_ReactComponentWithPureRenderMixin2.default],

  propTypes: {
    contentSize: _propTypes2.default.number.isRequired,
    offset: _propTypes2.default.number.isRequired,
    onScroll: _propTypes2.default.func.isRequired,
    position: _propTypes2.default.number.isRequired,
    size: _propTypes2.default.number.isRequired
  },

  componentWillMount: function componentWillMount() {
    this._initialRender = true;
  },
  componentDidMount: function componentDidMount() {
    this._initialRender = false;
  },
  render: function render() /*object*/{
    var _props10 = this.props,
        offset = _props10.offset,
        size = _props10.size;


    var outerContainerStyle = {
      height: _Scrollbar2.default.SIZE,
      width: size
    };
    var innerContainerStyle = {
      height: _Scrollbar2.default.SIZE,
      overflow: 'hidden',
      width: size,
      top: offset
    };

    return _React2.default.createElement(
      'div',
      {
        className: (0, _joinClasses2.default)((0, _cx2.default)('public/fixedDataTable/horizontalScrollbar')),
        style: outerContainerStyle },
      _React2.default.createElement(
        'div',
        { style: innerContainerStyle },
        _React2.default.createElement(_Scrollbar2.default, _extends({}, this.props, {
          isOpaque: true,
          orientation: 'horizontal',
          offset: undefined
        }))
      )
    );
  }
});

module.exports = FixedDataTable;