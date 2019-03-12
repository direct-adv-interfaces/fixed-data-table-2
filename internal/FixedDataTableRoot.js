/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableRoot
 */

'use strict';

var _FixedDataTableContainer = require('./FixedDataTableContainer');

var _FixedDataTableContainer2 = _interopRequireDefault(_FixedDataTableContainer);

var _FixedDataTableCellDefault = require('./FixedDataTableCellDefault');

var _FixedDataTableCellDefault2 = _interopRequireDefault(_FixedDataTableCellDefault);

var _FixedDataTableColumn = require('./FixedDataTableColumn');

var _FixedDataTableColumn2 = _interopRequireDefault(_FixedDataTableColumn);

var _FixedDataTableColumnGroup = require('./FixedDataTableColumnGroup');

var _FixedDataTableColumnGroup2 = _interopRequireDefault(_FixedDataTableColumnGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FixedDataTableRoot = {
  Cell: _FixedDataTableCellDefault2.default,
  Column: _FixedDataTableColumn2.default,
  ColumnGroup: _FixedDataTableColumnGroup2.default,
  Table: _FixedDataTableContainer2.default
};

FixedDataTableRoot.version = '1.0.0-beta.4';
module.exports = FixedDataTableRoot;