/**
 * Copyright Schrodinger, LLC
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule FixedDataTableHelper
 * @typechecks
 */

'use strict';

var _Locale = require('./Locale');

var _Locale2 = _interopRequireDefault(_Locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DIR_SIGN = _Locale2.default.isRTL() ? -1 : +1;
var FixedDataTableHelper = {
  DIR_SIGN: DIR_SIGN
};

module.exports = FixedDataTableHelper;