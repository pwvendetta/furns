/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#bs4/dt-1.10.18/e-1.9.0
 *
 * Included libraries:
 *   DataTables 1.10.18, Editor 1.9.0
 */

/*! DataTables 1.10.18
 * ©2008-2018 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.18
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   Copyright 2008-2018 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable = function ( options )
	{
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};
		
		
		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};
		
		
		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};
		
		
		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );
		
			/* Check if we want to add multiple rows or not */
			var rows = $.isArray(data) && ( $.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return rows.flatten().toArray();
		};
		
		
		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};
		
		
		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};
		
		
		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};
		
		
		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];
		
			rows.remove();
		
			if ( callback ) {
				callback.call( this, settings, data );
			}
		
			if ( redraw === undefined || redraw ) {
				api.draw();
			}
		
			return data;
		};
		
		
		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};
		
		
		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};
		
		
		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );
		
			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
		
			api.draw();
		};
		
		
		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );
		
			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';
		
				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}
		
			return api.data().toArray();
		};
		
		
		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );
		
			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};
		
		
		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();
		
			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();
		
				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};
		
		
		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};
		
		
		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};
		
		
		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};
		
		
		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );
		
			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};
		
		
		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};
		
		
		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};
		
		
		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};
		
		
		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );
		
			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}
		
			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}
		
			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};
		
		
		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;
		

		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;

		if ( emptyInit ) {
			options = {};
		}

		this.oApi = this.internal = _ext.internal;

		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}

		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;

			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);
			
			
			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}
			
			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );
			
			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );
			
			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ) );
			
			
			
			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];
			
				/* Base check on table node */
				if (
					s.nTable == this ||
					(s.nTHead && s.nTHead.parentNode == this) ||
					(s.nTFoot && s.nTFoot.parentNode == this)
				) {
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
			
					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}
			
				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}
			
			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}
			
			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;
			
			allSettings.push( oSettings );
			
			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();
			
			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			_fnLanguageCompat( oInit.oLanguage );
			
			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = $.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}
			
			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );
			
			
			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );
			
			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );
			
			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );
			
			/* Browser support detection */
			_fnBrowserDetect( oSettings );
			
			var oClasses = oSettings.oClasses;
			
			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );
			
			
			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}
			
			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = $.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}
			
			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );
			
			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnLanguageCompat( json );
						_fnCamelToHungarian( defaults.oLanguage, json );
						$.extend( true, oLanguage, json );
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}
			
			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}
			
			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}
			
			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}
			
			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}
			
			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}
			
			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );
			
			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};
			
				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];
			
					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );
			
						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};
			
							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}
			
			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */
			
				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}
			
				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );
			
				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};
			
							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );
			
							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}
			
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );
			
			
				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */
			
				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );
			
				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];
			
				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').appendTo($this);
				}
				oSettings.nTBody = tbody[0];
			
				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}
			
				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}
			
				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}
			
				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
			
				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;
			
				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};
			
			/* Must be done after everything which can be overridden by the state saving! */
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}
			
		} );
		_that = null;
		return this;
	};

	
	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
	
	
	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes
	
	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural
	
	var _re_dic = {};
	var _re_new_lines = /[\r\n]/g;
	var _re_html = /<.*?>/g;
	
	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;
	
	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );
	
	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	// - Ƀ - Bitcoin
	// - Ξ - Ethereum
	//   standards as thousands separators.
	var _re_formatted_numeric = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi;
	
	
	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};
	
	
	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};
	
	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};
	
	
	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';
	
		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}
	
		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}
	
		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}
	
		return !isNaN( parseFloat(d) ) && isFinite( d );
	};
	
	
	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};
	
	
	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}
	
		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};
	
	
	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}
	
		return out;
	};
	
	
	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;
	
		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}
	
		return out;
	};
	
	
	var _range = function ( len, start )
	{
		var out = [];
		var end;
	
		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}
	
		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}
	
		return out;
	};
	
	
	var _removeEmpty = function ( a )
	{
		var out = [];
	
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}
	
		return out;
	};
	
	
	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};
	
	
	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}
	
		var sorted = src.slice().sort();
		var last = sorted[0];
	
		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}
	
			last = sorted[i];
		}
	
		return true;
	};
	
	
	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}
	
		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;
	
		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];
	
			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}
	
			out.push( val );
			k++;
		}
	
		return out;
	};
	
	
	/**
	 * DataTables utility methods
	 * 
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;
	
			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;
	
				if ( last && now < last + frequency ) {
					clearTimeout( timer );
	
					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},
	
	
		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		}
	};
	
	
	
	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};
	
		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);
	
			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;
	
				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );
	
		o._hungarianMap = map;
	}
	
	
	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}
	
		var hungarianKey;
	
		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];
	
			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );
	
					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}
	
	
	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		// Note the use of the Hungarian notation for the parameters in this method as
		// this is called after the mapping of camelCase to Hungarian
		var defaults = DataTable.defaults.oLanguage;
	
		// Default mapping
		var defaultDecimal = defaults.sDecimal;
		if ( defaultDecimal ) {
			_addNumericSort( defaultDecimal );
		}
	
		if ( lang ) {
			var zeroRecords = lang.sZeroRecords;
	
			// Backwards compatibility - if there is no sEmptyTable given, then use the same as
			// sZeroRecords - assuming that is given.
			if ( ! lang.sEmptyTable && zeroRecords &&
				defaults.sEmptyTable === "No data available in table" )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
			}
	
			// Likewise with loading records
			if ( ! lang.sLoadingRecords && zeroRecords &&
				defaults.sLoadingRecords === "Loading..." )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
			}
	
			// Old parameter name of the thousands separator mapped onto the new
			if ( lang.sInfoThousands ) {
				lang.sThousands = lang.sInfoThousands;
			}
	
			var decimal = lang.sDecimal;
			if ( decimal && defaultDecimal !== decimal ) {
				_addNumericSort( decimal );
			}
		}
	}
	
	
	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};
	
	
	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );
	
		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}
	
		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;
	
		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}
	
	
	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );
	
		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! $.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}
	
	
	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;
	
			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );
	
			var outer = n.children();
			var inner = outer.children();
	
			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100
	
			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;
	
			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;
	
			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;
	
			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;
	
			n.remove();
		}
	
		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}
	
	
	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;
	
		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}
	
		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}
	
			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];
	
			isSet = true;
			i += inc;
		}
	
		return value;
	}
	
	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );
	
		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );
	
		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}
	
	
	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);
	
		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;
	
			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}
	
		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );
	
			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions );
	
			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}
	
			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}
	
			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}
	
			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );
	
			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}
	
		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;
	
		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;
	
		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );
	
			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};
	
		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}
	
		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}
	
		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}
	
	
	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;
	
			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}
	
		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}
	
		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}
	
	
	/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
	
		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}
	
	
	/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );
	
		return iPos !== -1 ? iPos : null;
	}
	
	
	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;
	
		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );
	
		return vis;
	}
	
	
	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];
	
		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );
	
		return a;
	}
	
	
	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;
	
		// For each column, spin over the 
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];
	
			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}
	
						detectedType = types[j]( cache[k], settings );
	
						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}
	
						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string
						if ( detectedType === 'html' ) {
							break;
						}
					}
	
					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}
	
				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}
	
	
	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;
	
		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];
	
				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.targets !== undefined ?
					def.targets :
					def.aTargets;
	
				if ( ! $.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}
	
				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}
	
						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}
	
		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}
	
	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );
	
		oData._aData = aDataIn;
		oSettings.aoData.push( oData );
	
		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;
	
		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}
	
		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );
	
		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}
	
		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}
	
		return iRow;
	}
	
	
	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;
	
		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}
	
		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}
	
	
	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}
	
	
	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}
	
	
	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );
	
		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}
	
		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}
	
		if ( cellData === null && type == 'display' ) {
			return '';
		}
		return cellData;
	}
	
	
	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;
	
		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}
	
	
	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;
	
	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}
	
	
	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	function _fnGetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Build an object of get functions, and wrap them in a single call */
			var o = {};
			$.each( mSource, function (key, val) {
				if ( val ) {
					o[key] = _fnGetObjectDataFn( val );
				}
			} );
	
			return function (data, type, row, meta) {
				var t = o[type] || o._;
				return t !== undefined ?
					t(data, type, row, meta) :
					data;
			};
		}
		else if ( mSource === null )
		{
			/* Give an empty string for rendering / sorting etc */
			return function (data) { // type, row and meta also passed, but not used
				return data;
			};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, type, row, meta) {
				return mSource( data, type, row, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var arrayNotation, funcNotation, out, innerSrc;
	
				if ( src !== "" )
				{
					var a = _fnSplitObjNotation( src );
	
					for ( var i=0, iLen=a.length ; i<iLen ; i++ )
					{
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);
	
						if ( arrayNotation )
						{
							// Array notation
							a[i] = a[i].replace(__reArray, '');
	
							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];
	
							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');
	
							// Traverse each entry in the array getting the properties requested
							if ( $.isArray( data ) ) {
								for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
									out.push( fetchData( data[j], type, innerSrc ) );
								}
							}
	
							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);
	
							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation )
						{
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}
	
						if ( data === null || data[ a[i] ] === undefined )
						{
							return undefined;
						}
						data = data[ a[i] ];
					}
				}
	
				return data;
			};
	
			return function (data, type) { // row and meta also passed, but not used
				return fetchData( data, type, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, type) { // row and meta also passed, but not used
				return data[mSource];
			};
		}
	}
	
	
	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	function _fnSetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
			return _fnSetObjectDataFn( mSource._ );
		}
		else if ( mSource === null )
		{
			/* Nothing to do when the data source is null */
			return function () {};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, val, meta) {
				mSource( data, 'set', val, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* Like the get, we need to get data from a nested object */
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;
	
				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
				{
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);
	
					if ( arrayNotation )
					{
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];
	
						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');
	
						// Traverse each entry in the array setting the properties requested
						if ( $.isArray( val ) )
						{
							for ( var j=0, jLen=val.length ; j<jLen ; j++ )
							{
								o = {};
								setData( o, val[j], innerSrc );
								data[ a[i] ].push( o );
							}
						}
						else
						{
							// We've been asked to save data to an array, but it
							// isn't array data to be saved. Best that can be done
							// is to just save the value.
							data[ a[i] ] = val;
						}
	
						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation )
					{
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}
	
					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined )
					{
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}
	
				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) )
				{
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else
				{
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};
	
			return function (data, val) { // meta is also passed in, but not used
				return setData( data, val, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, val) { // meta is also passed in, but not used
				data[mSource] = val;
			};
		}
	}
	
	
	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}
	
	
	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}
	
	
	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;
	
		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}
	
		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}
	
	
	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}
	
			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};
	
		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;
	
			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}
	
		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;
	
		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}
	
			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}
	
	
	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;
	
		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];
	
		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');
	
				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};
	
		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = $.trim(cell.innerHTML);
	
				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );
	
					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}
	
			i++;
		};
	
		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();
	
				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}
	
				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;
	
			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}
	
		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;
	
		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );
	
			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}
	
		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen;
	
		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');
	
			row.nTr = nTr;
			row.anCells = cells;
	
			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;
	
			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );
	
			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];
	
				nTd = nTrIn ? anTds[i] : document.createElement( oCol.sCellType );
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};
				
				cells.push( nTd );
	
				// Need to create the HTML if new, or if a rendering function is defined
				if ( (!nTrIn || oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}
	
				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}
	
				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}
	
				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}
	
			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells] );
		}
	
		// Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
		// and deployed
		row.nTr.setAttribute( 'role', 'row' );
	}
	
	
	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;
	
		if ( tr ) {
			var id = settings.rowIdFn( data );
	
			if ( id ) {
				tr.id = id;
			}
	
			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;
	
				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}
	
			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}
	
			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}
	
	
	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;
	
		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}
	
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );
	
			if ( createHeader ) {
				cell.appendTo( row );
			}
	
			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );
	
				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );
	
					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}
	
			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}
	
			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}
	
		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}
		
		/* ARIA role for the rows */
	 	$(thead).find('>tr').attr('role', 'row');
	
		/* Deal with the footer - add classes if required */
		$(thead).find('>tr>th, >tr>td').addClass( classes.sHeaderTH );
		$(tfoot).find('>tr>th, >tr>td').addClass( classes.sFooterTH );
	
		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];
	
			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;
	
				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}
	
	
	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;
	
		if ( ! aoSource )
		{
			return;
		}
	
		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}
	
		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;
	
			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}
	
			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}
	
		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;
	
			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}
	
			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;
	
				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;
	
					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}
	
					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}
	
					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}
	
	
	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}
	
		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		var oLang = oSettings.oLanguage;
		var iInitDisplayStart = oSettings.iInitDisplayStart;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;
	
		oSettings.bDrawing = true;
	
		/* Check and see if we have an initial draw position from state saving */
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;
	
			oSettings.iInitDisplayStart = -1;
		}
	
		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();
	
		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
		{
			return;
		}
	
		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
	
			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}
	
				var nRow = aoData.nTr;
	
				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}
	
				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j, iDataIndex] );
	
				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}
	
			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}
	
		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );
	
		var body = $(oSettings.nTBody);
	
		body.children().detach();
		body.append( $(anRows) );
	
		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );
	
		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}
	
	
	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;
	
		if ( sort ) {
			_fnSort( settings );
		}
	
		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}
	
		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}
	
		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;
	
		_fnDraw( settings );
	
		settings._drawHold = false;
	}
	
	
	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;
	
		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );
	
		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
	
		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];
	
			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];
	
				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}
	
					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}
	
					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}
	
					i += j; /* Move along the position array */
				}
	
				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}
	
			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;
	
				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}
	
				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}
	
		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}
	
	
	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};
	
		aLayout.splice( 0, aLayout.length );
	
		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}
	
		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;
	
			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;
	
					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );
	
					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;
	
					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}
	
	
	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}
	
		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}
	
		return aReturn;
	}
	
	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );
	
		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && $.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;
	
			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);
	
				if ( match ) {
					// Support for arrays
					var name = match[0];
	
					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}
	
		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};
	
		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;
	
			var newData = typeof ajaxData === 'function' ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge
	
			// If the function returned something, use that alone
			data = typeof ajaxData === 'function' && newData ?
				newData :
				$.extend( true, data, newData );
	
			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}
	
		var baseAjax = {
			"data": data,
			"success": function (json) {
				var error = json.error || json.sError;
				if ( error ) {
					_fnLog( oSettings, 0, error );
				}
	
				oSettings.json = json;
				callback( json );
			},
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );
	
				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}
	
				_fnProcessingDisplay( oSettings, false );
			}
		};
	
		// Store the data submitted for the API
		oSettings.oAjaxData = data;
	
		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );
	
		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( typeof ajax === 'function' )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );
	
			// Restore for next time around
			ajax.data = ajaxData;
		}
	}
	
	
	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		if ( settings.bAjaxDataGet ) {
			settings.iDraw++;
			_fnProcessingDisplay( settings, true );
	
			_fnBuildAjax(
				settings,
				_fnAjaxParameters( settings ),
				function(json) {
					_fnAjaxUpdateDraw( settings, json );
				}
			);
	
			return false;
		}
		return true;
	}
	
	
	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;
	
		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};
	
		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );
	
		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};
	
		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;
	
			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );
	
			param( "mDataProp_"+i, dataProp );
	
			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}
	
			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}
	
		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}
	
		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );
	
				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );
	
			param( 'iSortingCols', sort.length );
		}
	
		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}
	
		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}
	
	
	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};
	
		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );
	
		if ( draw ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}
	
		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
	
		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();
	
		settings.bAjaxDataGet = false;
		_fnDraw( settings );
	
		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}
	
		settings.bAjaxDataGet = true;
		_fnProcessingDisplay( settings, false );
	}
	
	
	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	function _fnAjaxDataSrc ( oSettings, json )
	{
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.
	
		// Compatibility with 1.9-. In order to read from aaData, check if the
		// default has been changed, if not, check for aaData
		if ( dataSrc === 'data' ) {
			return json.aaData || json[dataSrc];
		}
	
		return dataSrc !== "" ?
			_fnGetObjectDataFn( dataSrc )( json ) :
			json;
	}
	
	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';
	
		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;
	
		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );
	
		var searchFn = function() {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(
	
			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive
				} );
	
				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};
	
		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;
	
		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);
	
		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );
	
		return filter[0];
	}
	
	
	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );
	
		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive );
			fnSaveFilter( oInput );
	
			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}
	
			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}
	
		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}
	
	
	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;
	
		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];
	
			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];
	
				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}
	
			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}
	
	
	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}
	
		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );
	
		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];
	
			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}
	
		settings.aiDisplay = out;
	}
	
	
	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];
	
		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}
	
		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );
	
		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}
	
			// Search the display array
			display = settings.aiDisplay;
	
			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}
	
			settings.aiDisplay = filtered;
		}
	}
	
	
	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );
		
		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 * 
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}
	
				return word.replace('"', '');
			} );
	
			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}
	
		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}
	
	
	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;
	
	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;
	
	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var fomatters = DataTable.ext.type.search;
		var wasInvalidated = false;
	
		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aFilterData ) {
				filterData = [];
	
				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];
	
					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );
	
						if ( fomatters[ column.sType ] ) {
							cellData = fomatters[ column.sType ]( cellData );
						}
	
						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}
	
						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}
	
					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}
	
					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n]/g, '');
					}
	
					filterData.push( cellData );
				}
	
				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}
	
		return wasInvalidated;
	}
	
	
	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}
	
	
	
	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}
	
	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );
	
		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );
	
			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );
	
			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}
	
		return n[0];
	}
	
	
	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}
	
		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;
	
		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}
	
		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );
	
		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}
	
		$(nodes).html( out );
	}
	
	
	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}
	
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw
	
		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}
	
		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );
	
		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );
	
		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}
	
		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];
	
			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}
	
		_fnCallbackFire( settings, null, 'preInit', [settings] );
	
		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );
	
		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );
	
					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}
	
					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;
	
					_fnReDraw( settings );
	
					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}
	
	
	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;
	
		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}
	
		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}
	
	
	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;
	
		_fnLengthOverflow( settings );
	
		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}
	
	
	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = $.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;
	
		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );
	
		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}
	
		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}
	
		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);
	
		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );
	
		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );
	
		return div[0];
	}
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
	
	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;
	
		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}
	
		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';
	
			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;
	
						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}
	
		return node;
	}
	
	
	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();
	
		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;
	
			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;
	
			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}
	
		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;
	
		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );
	
			if ( redraw ) {
				_fnDraw( settings );
			}
		}
	
		return changed;
	}
	
	
	
	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.insertBefore( settings.nTable )[0];
	}
	
	
	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}
	
		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}
	
	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);
	
		// Add the ARIA grid role to the table
		table.attr( 'role', 'grid' );
	
		// Scrolling from here on in
		var scroll = settings.oScroll;
	
		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}
	
		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};
	
		if ( ! footer.length ) {
			footer = null;
		}
	
		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);
	
		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}
	
		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;
	
		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;
	
				scrollHead.scrollLeft = scrollLeft;
	
				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}
	
		$(scrollBody).css(
			scrollY && scroll.bCollapse ? 'max-height' : 'height', 
			scrollY
		);
	
		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;
	
		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );
	
		return scroller[0];
	}
	
	
	
	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};
	
		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;
		
		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}
	
		/*
		 * 1. Re-create the table inside the scrolling div
		 */
	
		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();
	
		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
		}
	
		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');
	
	
		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
	
		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}
	
		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );
	
		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}
	
		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";
	
			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);
	
			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
	
		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers
	
		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );
	
		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
		}, headerSrcEls );
	
		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			// Only apply widths to the DataTables detected header cells - this
			// prevents complex headers from having contradictory sizes applied
			if ( $.inArray( nToSize, dtHeaderCells ) !== -1 ) {
				nToSize.style.width = headerWidths[i];
			}
		}, headerTrgEls );
	
		$(headerSrcEls).height(0);
	
		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );
	
			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );
	
			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );
	
			$(footerSrcEls).height(0);
		}
	
	
		/*
		 * 3. Apply the measurements
		 */
	
		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing">'+headerContent[i]+'</div>';
			nSizer.childNodes[0].style.height = "0";
			nSizer.childNodes[0].style.overflow = "hidden";
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );
	
		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing">'+footerContent[i]+'</div>';
				nSizer.childNodes[0].style.height = "0";
				nSizer.childNodes[0].style.overflow = "hidden";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}
	
		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( table.outerWidth() < sanityWidth )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;
	
			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}
	
			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}
	
		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );
	
		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}
	
	
		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}
	
		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );
	
		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";
	
		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}
	
		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );
	
		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.scroll();
	
		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}
	
	
	
	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;
	
		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;
	
			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}
	
					index++;
				}
	
				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}
	
			i++;
		}
	}
	
	
	
	var __re_html_remove = /<.*?>/g;
	
	
	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;
	
		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}
	
		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];
	
			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );
	
				userInputs = true;
			}
		}
	
		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );
	
				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );
	
			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );
	
			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );
	
			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');
	
			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );
	
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];
	
				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';
	
				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}
	
			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];
	
					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}
	
			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');
	
			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );
	
			// When scrolling (X or Y) we want to set the width of the table as 
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');
	
				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}
	
			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();
	
				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();
	
				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;
	
				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}
	
			table.style.width = _fnStringToCss( total );
	
			// Finished with the table - ditch it
			holder.remove();
		}
	
		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}
	
		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};
	
			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}
	
			oSettings._reszEvt = true;
		}
	}
	
	
	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;
	
	
	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}
	
		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );
	
		var val = n[0].offsetWidth;
		n.remove();
	
		return val;
	}
	
	
	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}
	
		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}
	
	
	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );
	
			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}
	
		return maxIdx;
	}
	
	
	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}
	
		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}
	
		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}
	
	
	
	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! $.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};
	
		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( $.isArray( fixed ) ) {
			add( fixed );
		}
	
		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}
	
		add( settings.aaSorting );
	
		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}
	
		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;
	
			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';
	
				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}
	
				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}
	
		return aSort;
	}
	
	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;
	
		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );
	
		aSort = _fnSortFlatten( oSettings );
	
		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];
	
			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}
	
			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}
	
		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}
	
			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;
	
					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];
	
						x = dataA[ sort.col ];
						y = dataB[ sort.col ];
	
						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}
	
					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}
	
		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}
	
	
	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;
	
		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;
	
			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');
	
			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}
	
				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}
	
			th.setAttribute('aria-label', label);
		}
	}
	
	
	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}
	
			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};
	
		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}
	
		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );
	
			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );
	
				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}
	
				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );
	
			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}
	
		// Run the sort by calling a full redraw
		_fnReDraw( settings );
	
		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}
	
	
	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];
	
		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}
	
			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );
	
				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );
	
					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}
	
	
	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;
	
		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;
	
				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}
	
			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;
	
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}
	
		settings.aLastSort = sort;
	}
	
	
	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;
	
		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}
	
		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];
	
		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];
	
			if ( ! row._aSortData ) {
				row._aSortData = [];
			}
	
			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );
	
				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}
	
	
	
	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if ( !settings.oFeatures.bStateSave || settings.bDestroying )
		{
			return;
		}
	
		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};
	
		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );
	
		settings.oSavedState = state;
		settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
	}
	
	
	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		var i, ien;
		var columns = settings.aoColumns;
		var loaded = function ( s ) {
			if ( ! s || ! s.time ) {
				callback();
				return;
			}
	
			// Allow custom and plug-in manipulation functions to alter the saved data set and
			// cancelling of loading by returning false
			var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
			if ( $.inArray( false, abStateLoad ) !== -1 ) {
				callback();
				return;
			}
	
			// Reject old data
			var duration = settings.iStateDuration;
			if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
				callback();
				return;
			}
	
			// Number of columns have changed - all bets are off, no restore of settings
			if ( s.columns && columns.length !== s.columns.length ) {
				callback();
				return;
			}
	
			// Store the saved state so it might be accessed at any time
			settings.oLoadedState = $.extend( true, {}, s );
	
			// Restore key features - todo - for 1.11 this needs to be done by
			// subscribed events
			if ( s.start !== undefined ) {
				settings._iDisplayStart    = s.start;
				settings.iInitDisplayStart = s.start;
			}
			if ( s.length !== undefined ) {
				settings._iDisplayLength   = s.length;
			}
	
			// Order
			if ( s.order !== undefined ) {
				settings.aaSorting = [];
				$.each( s.order, function ( i, col ) {
					settings.aaSorting.push( col[0] >= columns.length ?
						[ 0, col[1] ] :
						col
					);
				} );
			}
	
			// Search
			if ( s.search !== undefined ) {
				$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
			}
	
			// Columns
			//
			if ( s.columns ) {
				for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
					var col = s.columns[i];
	
					// Visibility
					if ( col.visible !== undefined ) {
						columns[i].bVisible = col.visible;
					}
	
					// Search
					if ( col.search !== undefined ) {
						$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
					}
				}
			}
	
			_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
			callback();
		}
	
		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}
	
		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );
	
		if ( state !== undefined ) {
			loaded( state );
		}
		// otherwise, wait for the loaded callback to be executed
	}
	
	
	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );
	
		return idx !== -1 ?
			settings[ idx ] :
			null;
	}
	
	
	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;
	
		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}
	
		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;
	
			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}
	
			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}
	
	
	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( $.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( $.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );
	
			return;
		}
	
		if ( mappedName === undefined ) {
			mappedName = name;
		}
	
		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}
	
	
	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;
	
		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];
	
				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}
	
		return out;
	}
	
	
	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					$(n).blur(); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}
	
	
	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}
	
	
	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];
	
		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}
	
		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );
	
			$(settings.nTable).trigger( e, args );
	
			ret.push( e.result );
		}
	
		return ret;
	}
	
	
	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;
	
		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}
	
		// Keep the start record on the current page
		start -= (start % len);
	
		if ( len === -1 || start < 0 )
		{
			start = 0;
		}
	
		settings._iDisplayStart = start;
	}
	
	
	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];
	
		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}
	
		// Use the default
		return host._;
	}
	
	
	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}
	

	
	
	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];
	
	
	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;
	
	
	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );
	
		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}
	
		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};
	
	
	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}
	
		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings = settings.concat( a );
			}
		};
	
		if ( $.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}
	
		// Remove duplicates
		this.context = _unique( settings );
	
		// Initial data
		if ( data ) {
			$.merge( this, data );
		}
	
		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};
	
		_Api.extend( this, this, __apiStruct );
	};
	
	DataTable.Api = _Api;
	
	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},
	
	
		concat:  __arrayProto.concat,
	
	
		context: [], // array of table settings objects
	
	
		count: function ()
		{
			return this.flatten().length;
		},
	
	
		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}
	
			return this;
		},
	
	
		eq: function ( idx )
		{
			var ctx = this.context;
	
			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},
	
	
		filter: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},
	
	
		join:    __arrayProto.join,
	
	
		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},
	
		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;
	
			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}
	
			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );
	
				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );
	
					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];
	
					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}
	
					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];
	
						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}
	
						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}
	
			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},
	
	
		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},
	
	
		length:  0,
	
	
		map: function ( fn )
		{
			var a = [];
	
			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}
	
			return new _Api( this.context, a );
		},
	
	
		pluck: function ( prop )
		{
			return this.map( function ( el ) {
				return el[ prop ];
			} );
		},
	
		pop:     __arrayProto.pop,
	
	
		push:    __arrayProto.push,
	
	
		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},
	
	
		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},
	
	
		reverse: __arrayProto.reverse,
	
	
		// Object with rows, columns and opts
		selector: null,
	
	
		shift:   __arrayProto.shift,
	
	
		slice: function () {
			return new _Api( this.context, this );
		},
	
	
		sort:    __arrayProto.sort, // ? name - order?
	
	
		splice:  __arrayProto.splice,
	
	
		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},
	
	
		to$: function ()
		{
			return $( this );
		},
	
	
		toJQuery: function ()
		{
			return $( this );
		},
	
	
		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},
	
	
		unshift: __arrayProto.unshift
	} );
	
	
	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}
	
		var
			i, ien,
			j, jen,
			struct, inner,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );
	
					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};
	
		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];
	
			// Value
			obj[ struct.name ] = typeof struct.val === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				$.isPlainObject( struct.val ) ?
					{} :
					struct.val;
	
			obj[ struct.name ].__dt_wrapper = true;
	
			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};
	
	
	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');
	
	// 	_Api.extend( inst, obj );
	// };
	
	
	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]
	
	_Api.register = _api_register = function ( name, val )
	{
		if ( $.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}
	
		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;
	
		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};
	
		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];
	
			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   []
				};
				struct.push( src );
			}
	
			if ( i === ien-1 ) {
				src.val = val;
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};
	
	
	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );
	
		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );
	
			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					$.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}
	
			// Non-API return - just fire it back
			return ret;
		} );
	};
	
	
	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}
	
		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );
	
		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};
	
	
	
	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );
	
	
	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;
	
		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );
	
	
	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );
	
	
	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );
	
	
	
	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}
	
				_fnReDraw( settings, paging===false );
			}
		} );
	} );
	
	
	
	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}
	
		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );
	
	
	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}
	
		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;
	
		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );
	
	
	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}
	
		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );
	
	
	
	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );
	
			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );
	
			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}
	
			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );
	
				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}
	
				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};
	
	
	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;
	
		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}
	
		// else return undefined;
	} );
	
	
	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );
	
	
	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;
	
		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];
	
			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );
	
	
	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );
	
	
	
	
	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;
	
		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}
	
		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];
	
			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? $.trim(a[j]) : a[j] );
	
				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}
	
		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}
	
		return _unique( out );
	};
	
	
	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}
	
		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}
	
		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};
	
	
	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];
	
				return inst;
			}
		}
	
		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};
	
	
	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;
	
		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current
	
		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and fitler=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			if ( search == 'none') {
				a = displayMaster.slice();
			}
			else if ( search == 'applied' ) {
				a = displayFiltered.slice();
			}
			else if ( search == 'removed' ) {
				// O(n+m) solution by creating a hash map
				var displayFilteredMap = {};
	
				for ( var i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
					displayFilteredMap[displayFiltered[i]] = null;
				}
	
				a = $.map( displayMaster, function (el) {
					return ! displayFilteredMap.hasOwnProperty(el) ?
						el :
						null;
				} );
			}
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );
	
					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}
	
		return a;
	};
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
			var aoData = settings.aoData;
	
			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}
	
			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}
	
			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}
	
			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}
	
			// Selector - node
			if ( sel.nodeName ) {
				var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
				var cellIdx = sel._DT_CellIndex;
	
				if ( rowIdx !== undefined ) {
					// Make sure that the row is actually still present in the table
					return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
						[ rowIdx ] :
						[];
				}
				else if ( cellIdx ) {
					return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel ?
						[ cellIdx.row ] :
						[];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}
	
			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}
	
				// need to fall through to jQuery in case there is DOM id that
				// matches
			}
			
			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);
	
			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};
	
		return _selector_run( 'row', selector, run, settings, opts );
	};
	
	
	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );
	
	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );
	
	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );
	
	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;
	
		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}
	
		return new _Api( context, a );
	} );
	
	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;
	
		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;
	
			data.splice( row, 1 );
	
			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;
	
				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}
	
				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}
	
			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes
	
			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}
	
			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );
	
			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );
	
		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );
	
		return this;
	} );
	
	
	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}
	
				return out;
			}, 1 );
	
		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );
	
		return modRows;
	} );
	
	
	
	
	
	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );
	
	
	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}
	
		// Set
		var row = ctx[0].aoData[ this[0] ];
		row._aData = data;
	
		// If the DOM has an id, and the data source is an array
		if ( $.isArray( data ) && row.nTr.id ) {
			_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
		}
	
		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );
	
		return this;
	} );
	
	
	_api_register( 'row().node()', function () {
		var ctx = this.context;
	
		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );
	
	
	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}
	
		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );
	
		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );
	
	
	
	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( $.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}
	
			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td/></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );
	
				rows.push( created[0] );
			}
		};
	
		addRow( data, klass );
	
		if ( row._details ) {
			row._details.detach();
		}
	
		row._details = $(rows);
	
		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};
	
	
	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;
	
		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];
	
			if ( row && row._details ) {
				row._details.remove();
	
				row._detailsShow = undefined;
				row._details = undefined;
			}
		}
	};
	
	
	var __details_display = function ( api, show ) {
		var ctx = api.context;
	
		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];
	
			if ( row._details ) {
				row._detailsShow = show;
	
				if ( show ) {
					row._details.insertAfter( row.nTr );
				}
				else {
					row._details.detach();
				}
	
				__details_events( ctx[0] );
			}
		}
	};
	
	
	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-visibility'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;
	
		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );
	
		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];
	
					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );
	
			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}
	
				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];
	
					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );
	
			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}
	
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};
	
	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';
	
	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;
	
		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}
	
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );
	
	
	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );
	
	
	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;
	
		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
	
	// can be an array of these items, comma separated list, or an array of comma
	// separated lists
	
	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;
	
	
	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};
	
	
	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );
	
		var run = function ( s ) {
			var selInt = _intVal( s );
	
			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}
	
			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}
	
			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );
	
				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}
	
			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';
	
			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];
	
					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );
	
					default:
						return [];
				}
			}
	
			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}
	
			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};
	
		return _selector_run( 'column', selector, run, settings, opts );
	};
	
	
	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;
	
		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}
	
		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}
	
		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );
	
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;
	
				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}
	
		// Common actions
		col.bVisible = vis;
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );
	
		// Update colspan for no records display. Child rows and extensions will use their own
		// listeners to do this - only need to update the empty table item here
		if ( ! settings.aiDisplay.length ) {
			$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
		}
	
		_fnSaveState( settings );
	};
	
	
	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}
	
		opts = _selector_opts( opts );
	
		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );
	
		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;
	
		return inst;
	} );
	
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );
	
	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );
	
	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );
	
		// Group the column visibility changes
		if ( vis !== undefined ) {
			// Second loop once the first is done for events
			this.iterator( 'column', function ( settings, column ) {
				_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
			} );
	
			if ( calc === undefined || calc ) {
				this.columns.adjust();
			}
		}
	
		return ret;
	} );
	
	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );
	
	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );
	
	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];
	
			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );
	
	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );
	
	
	
	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $( [].concat.apply([], cells) );
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;
	
		var run = function ( s ) {
			var fnSelector = typeof s === 'function';
	
			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];
	
				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];
	
					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};
	
						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];
	
							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}
	
				return a;
			}
			
			// Selector - index
			if ( $.isPlainObject( s ) ) {
				// Valid cell index and its in the array of selectable rows
				return s.column !== undefined && s.row !== undefined && $.inArray( s.row, rows ) !== -1 ?
					[s] :
					[];
			}
	
			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();
	
			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}
	
			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};
	
		return _selector_run( 'cell', selector, run, settings, opts );
	};
	
	
	
	
	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}
	
		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}
	
		// Row + column selector
		var columns = this.columns( columnSelector );
		var rows = this.rows( rowSelector );
		var a, i, ien, j, jen;
	
		this.iterator( 'table', function ( settings, idx ) {
			a = [];
	
			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
		}, 1 );
	
	    // Now pass through the cell selector for options
	    var cells = this.cells( a, opts );
	
		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );
	
		return cells;
	} );
	
	
	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];
	
			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );
	
	
	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';
	
		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );
	
	
	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );
	
	
	
	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );
	
	
	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];
	
		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}
	
		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );
	
		return this;
	} );
	
	
	
	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;
	
		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}
	
		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! $.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );
	
	
	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );
	
	
	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;
	
			return $.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}
	
		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );
	
	
	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;
	
		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];
	
			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );
	
			settings.aaSorting = sort;
		} );
	} );
	
	
	
	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;
	
		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}
	
		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}
	
			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );
	
	
	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;
	
				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}
	
				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}
	
				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );
	
				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);
	
	/*
	 * State API methods
	 */
	
	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );
	
	
	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );
	
	
	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );
	
	
	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );
	
	
	
	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;
	
		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;
	
			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}
	
			// Parts are different, return immediately
			return iThis > iThat;
		}
	
		return true;
	};
	
	
	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;
	
		if ( table instanceof DataTable.Api ) {
			return true;
		}
	
		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;
	
			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );
	
		return is;
	};
	
	
	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;
	
		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}
	
		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );
	
		return api ?
			new _Api( a ) :
			a;
	};
	
	
	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;
	
	
	
	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);
	
		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );
	
	
	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);
	
			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );
	
			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );
	
	
	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );
	
	
	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );
	
	
	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );
	
	
	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );
	
	
	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;
	
		return this.iterator( 'table', function ( settings ) {
			var orig      = settings.nTableWrapper.parentNode;
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;
	
			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;
	
			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );
	
			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}
	
			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);
	
			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}
	
			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}
	
			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );
	
			$( rows ).removeClass( settings.asStripeClasses.join(' ') );
	
			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);
	
			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );
	
			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();
	
			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );
	
				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );
	
				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;
	
				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}
	
			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );
	
	
	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;
	
			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );
	
	
	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );
	
		if ( resolved === undefined ) {
			resolved = def;
		}
	
		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}
	
		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );

	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.10.18";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];

	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,
	
		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",
	
		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,
	
		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true
	};
	
	
	
	
	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,
	
		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,
	
		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],
	
		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,
	
		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,
	
		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,
	
		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",
	
		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,
	
		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};
	
	
	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,
	
		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,
	
		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,
	
		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,
	
		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,
	
		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,
	
		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,
	
		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,
	
		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,
	
		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,
	
		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,
	
		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,
	
		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,
	
		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,
	
		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,
	
		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,
	
		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',
	
		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,
	
		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,
	
		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,
	
		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,
	
		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,
	
		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};
	
	
	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would at around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit.
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
	
	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,
	
	
		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],
	
	
		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],
	
	
		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,
	
	
		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],
	
	
		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,
	
		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,
	
	
		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],
	
	
		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,
	
	
		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,
	
	
		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,
	
	
		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,
	
	
		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,
	
	
		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,
	
	
		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,
	
	
		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,
	
	
		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,
	
	
		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,
	
	
		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,
	
	
		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,
	
	
		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,
	
	
		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,
	
	
		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,
	
	
		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,
	
	
		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,
	
	
		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,
	
	
		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,
	
	
		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},
	
	
		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,
	
	
		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,
	
	
		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,
	
	
		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,
	
	
		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,
	
	
		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,
	
	
		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,
	
	
		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},
	
	
		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,
	
	
		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,
	
	
		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,
	
	
		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,
	
	
		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,
	
	
		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,
	
	
		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},
	
	
		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",
	
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},
	
			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",
	
	
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",
	
	
				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",
	
	
				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},
	
			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",
	
	
			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
	
	
			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",
	
	
			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",
	
	
			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",
	
	
			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",
	
	
			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",
	
	
			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",
	
	
			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",
	
	
			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "Processing...",
	
	
			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",
	
	
			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default 
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",
	
	
			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",
	
	
			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},
	
	
		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,
	
	
		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",
	
	
		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,
	
	
		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *  
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",
	
	
		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",
	
	
		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",
	
	
		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",
	
	
		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",
	
	
		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,
	
	
		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};
	
	_fnHungarianMap( DataTable.defaults );
	
	
	
	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
	
	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,
	
	
		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],
	
	
		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,
	
	
		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,
	
	
		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,
	
	
		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,
	
	
		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */
	
	
		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "details.0" },
		 *          { "data": "details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed dislay and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,
	
	
		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,
	
	
		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",
	
	
		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",
	
		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",
	
	
		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,
	
	
		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",
	
	
		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",
	
	
		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,
	
	
		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,
	
	
		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};
	
	_fnHungarianMap( DataTable.defaults.column );
	
	
	
	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {
	
			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,
	
			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all fro DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,
	
			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,
	
			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,
	
			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,
	
			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,
	
			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,
	
			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,
	
			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,
	
			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,
	
			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,
	
			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},
	
	
		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,
	
			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,
	
			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,
	
			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,
	
			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},
	
		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},
	
		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,
	
			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,
	
			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,
	
			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},
	
	
		"ajax": null,
	
	
		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],
	
		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],
	
		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],
	
		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],
	
		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},
	
		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],
	
		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],
	
		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],
	
		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},
	
		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],
	
		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,
	
		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],
	
		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,
	
		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],
	
		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,
	
		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],
	
		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],
	
		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],
	
		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],
	
		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],
	
		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],
	
		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],
	
	
		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],
	
		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],
	
		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],
	
		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",
	
		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,
	
		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,
	
		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,
	
		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,
	
		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,
	
		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,
	
		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,
	
		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],
	
		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,
	
		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,
	
		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",
	
		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,
	
		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],
	
		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],
	
		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,
	
		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,
	
		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,
	
		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,
	
		/**
		 * Note if draw should be blocked while getting data
		 *  @type boolean
		 *  @default true
		 */
		"bAjaxDataGet": true,
	
		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,
	
		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,
	
		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,
	
		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,
	
		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],
	
		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,
	
		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,
	
		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,
	
		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,
	
		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,
	
		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,
	
		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,
	
		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,
	
		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,
	
		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,
	
		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,
	
		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,
	
		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,
	
		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,
	
		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],
	
	
		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},
	
		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},
	
		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;
	
			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},
	
		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,
	
		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,
	
		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,
	
		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,
	
		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],
	
		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},
	
		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,
	
		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};

	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
	
	
	/**
	 * DataTables extensions
	 * 
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},
	
	
		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},
	
	
		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		build:"bs4/dt-1.10.18/e-1.9.0",
	
	
		/**
		 * Error reporting.
		 * 
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",
	
	
		/**
		 * Feature plug-ins.
		 * 
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 * 
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 * 
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 * 
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],
	
	
		/**
		 * Row searching.
		 * 
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],
	
	
		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},
	
	
		/**
		 * Internal functions, exposed for used in plug-ins.
		 * 
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},
	
	
		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},
	
	
		/**
		 * Pagination plug-in methods.
		 * 
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},
	
	
		renderer: {
			pageButton: {},
			header: {}
		},
	
	
		/**
		 * Ordering plug-ins - custom data source
		 * 
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 * 
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 * 
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},
	
	
		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! data.substring(1).match(/[0-9]/) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],
	
	
			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 * 
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},
	
	
			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 * 
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},
	
		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,
	
	
		//
		// Depreciated
		// The following properties are retained for backwards compatiblity only.
		// The should not be used in new projects and will be removed in a future
		// version
		//
	
		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,
	
	
		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,
	
	
		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},
	
	
		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};
	
	
	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );
	
	
	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",
	
		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",
	
		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",
	
		/* Empty row */
		"sRowEmpty": "dataTables_empty",
	
		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",
	
		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_asc_disabled",
		"sSortableDesc": "sorting_desc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */
	
		/* Filtering */
		"sFilterInput": "",
	
		/* Page length */
		"sLengthSelect": "",
	
		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",
	
		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",
	
		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );
	
	
	var extPagination = DataTable.ext.pager;
	
	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;
	
		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}
	
		numbers.DT_el = 'span';
		return numbers;
	}
	
	
	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},
	
		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},
	
		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},
	
		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},
	
		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},
		
		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},
	
		// For testing and plug-ins to use
		_numbers: _numbers,
	
		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );
	
	
	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass, counter=0;
	
				var attach = function( container, buttons ) {
					var i, ien, node, button;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};
	
					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];
	
						if ( $.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = '';
	
							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;
	
								case 'first':
									btnDisplay = lang.sFirst;
									btnClass = button + (page > 0 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;
	
								case 'previous':
									btnDisplay = lang.sPrevious;
									btnClass = button + (page > 0 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;
	
								case 'next':
									btnDisplay = lang.sNext;
									btnClass = button + (page < pages-1 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;
	
								case 'last':
									btnDisplay = lang.sLast;
									btnClass = button + (page < pages-1 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;
	
								default:
									btnDisplay = button + 1;
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}
	
							if ( btnDisplay !== null ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': settings.iTabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );
	
								_fnBindAction(
									node, {action: button}, clickHandler
								);
	
								counter++;
							}
						}
					}
				};
	
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;
	
				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}
	
				attach( $(host).empty(), buttons );
	
				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
				}
			}
		}
	} );
	
	
	
	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},
	
		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},
	
		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},
	
		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},
	
		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},
	
		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );
	
	
	
	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	// 
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is
	
	
	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},
	
		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );
	
	
	
	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}
	
		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}
	
		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}
	
			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}
	
		return d * 1;
	};
	
	
	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},
	
				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},
	
				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},
	
				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;
	
				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}
	
	
	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		},
	
		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},
	
		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},
	
		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},
	
		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );
	
	
	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );
	
	
	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass(
							column.sSortingClass +' '+
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},
	
			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );
	
				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}
	
					var colIdx = column.idx;
	
					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
	
					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );
	
	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
	
	var __htmlEscapeEntities = function ( d ) {
		return typeof d === 'string' ?
			d.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') :
			d;
	};
	
	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}
	
					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );
	
					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}
	
					flo = flo.toFixed( precision );
					d = Math.abs( flo );
	
					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';
	
					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},
	
		text: function () {
			return {
				display: __htmlEscapeEntities
			};
		}
	};
	
	
	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
	
	
	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}
	
	
	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnExtend: _fnExtend,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );
	

	// jQuery access
	$.fn.dataTable = DataTable;

	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;

	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;

	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};

	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );


	// Information about events fired by DataTables - for documentation.
	/**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */

	/**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */

	/**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, searcg or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */

	/**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */

	/**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */

	/**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */

	return $.fn.dataTable;
}));


/*! DataTables Bootstrap 4 integration
 * ©2011-2017 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for Bootstrap 4. This requires Bootstrap 4 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				// Require DataTables, which attaches to jQuery, including
				// jQuery if needed and have a $ property so we can access the
				// jQuery object that is used
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
	renderer: 'bootstrap'
} );


/* Default class modification */
$.extend( DataTable.ext.classes, {
	sWrapper:      "dataTables_wrapper dt-bootstrap4",
	sFilterInput:  "form-control form-control-sm",
	sLengthSelect: "custom-select custom-select-sm form-control form-control-sm",
	sProcessing:   "dataTables_processing card",
	sPageButton:   "paginate_button page-item"
} );


/* Bootstrap paging button renderer */
DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
	var api     = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang    = settings.oLanguage.oPaginate;
	var aria = settings.oLanguage.oAria.paginate || {};
	var btnDisplay, btnClass, counter=0;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( !$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action ) {
				api.page( e.data.action ).draw( 'page' );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( $.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&#x2026;';
						btnClass = 'disabled';
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'active' : '';
						break;
				}

				if ( btnDisplay ) {
					node = $('<li>', {
							'class': classes.sPageButton+' '+btnClass,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( $('<a>', {
								'href': '#',
								'aria-controls': settings.sTableId,
								'aria-label': aria[ button ],
								'data-dt-idx': counter,
								'tabindex': settings.iTabIndex,
								'class': 'page-link'
							} )
							.html( btnDisplay )
						)
						.appendTo( container );

					settings.oApi._fnBindAction(
						node, {action: button}, clickHandler
					);

					counter++;
				}
			}
		}
	};

	// IE9 throws an 'unknown error' if document.activeElement is used
	// inside an iframe or frame. 
	var activeEl;

	try {
		// Because this approach is destroying and recreating the paging
		// elements, focus is lost on the select button which is bad for
		// accessibility. So we want to restore focus once the draw has
		// completed
		activeEl = $(host).find(document.activeElement).data('dt-idx');
	}
	catch (e) {}

	attach(
		$(host).empty().html('<ul class="pagination"/>').children('ul'),
		buttons
	);

	if ( activeEl !== undefined ) {
		$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
	}
};


return DataTable;
}));


/*!
 * File:        dataTables.editor.min.js
 * Version:     1.9.0
 * Author:      SpryMedia (www.sprymedia.co.uk)
 * Info:        http://editor.datatables.net
 * 
 * Copyright 2012-2019 SpryMedia Limited, all rights reserved.
 * License: DataTables Editor - http://editor.datatables.net/license
 */

 // Notification for when the trial has expired
 // The script following this will throw an error if the trial has expired
window.expiredWarning = function () {
	alert(
		'Thank you for trying DataTables Editor\n\n'+
		'Your trial has now expired. To purchase a license '+
		'for Editor, please see https://editor.datatables.net/purchase'
	);
};

z7MM(typeof window===typeof{}?window:typeof global===typeof{}?global:this);R2mm(typeof window===typeof{}?window:typeof global===typeof{}?global:this);b2kk.F7F="c";b2kk.A9=function (){return typeof b2kk.t9.S7==='function'?b2kk.t9.S7.apply(b2kk.t9,arguments):b2kk.t9.S7;};b2kk.v7F="9";b2kk.L7F="m";b2kk.O7F="f";function z7MM(){function X3(){var Z1=2;for(;Z1!==5;){switch(Z1){case 2:var q1=[arguments];return q1[0][0].Function;break;}}}var J1=2;for(;J1!==82;){switch(J1){case 55:a1[29]+=a1[25];a1[29]+=a1[25];a1[98]=a1[5];J1=75;break;case 18:a1[2]="";a1[2]="_";a1[4]="";a1[4]="";a1[4]="7";J1=26;break;case 26:a1[6]="";a1[94]="residual";a1[45]="C";a1[6]="F";a1[15]="MM";a1[22]="";J1=35;break;case 61:a1[84]+=a1[25];a1[84]+=a1[25];a1[79]=a1[73];J1=58;break;case 64:a1[26]+=a1[2];a1[26]+=a1[94];a1[84]=a1[9];J1=61;break;case 43:a1[74]=2;a1[74]=1;a1[87]=0;a1[96]=a1[95];J1=39;break;case 14:a1[3]="";a1[3]="";a1[99]="n";a1[3]="ptim";a1[9]="";a1[9]="x7";a1[73]="__o";J1=18;break;case 87:v3(b3,a1[79],a1[87],a1[84]);v3(b3,a1[26],a1[87],a1[91]);v3(z3,"push",a1[74],a1[90]);v3(b3,a1[36],a1[87],a1[28]);J1=83;break;case 9:a1[1]="";a1[1]="E7";a1[7]="";a1[7]="ize";J1=14;break;case 46:a1[91]+=a1[4];a1[91]+=a1[15];a1[26]=a1[2];J1=64;break;case 49:a1[90]+=a1[4];a1[90]+=a1[15];a1[91]=a1[45];J1=46;break;case 52:a1[36]+=a1[86];a1[36]+=a1[22];a1[90]=a1[6];J1=49;break;case 66:v3(b3,"window",a1[87],a1[72]);v3(i3,"global",a1[87],a1[37]);v3(u3,"global",a1[74],a1[98]);v3(u3,"test",a1[74],a1[29]);J1=87;break;case 36:a1[28]+=a1[89];a1[28]+=a1[25];a1[36]=a1[30];J1=52;break;case 35:a1[22]="";a1[22]="ract";a1[12]="";a1[12]="h";a1[86]="bst";J1=30;break;case 75:a1[98]+=a1[4];a1[98]+=a1[15];a1[37]=a1[8];J1=72;break;case 2:var a1=[arguments];a1[8]="";a1[8]="d7";a1[5]="";a1[5]="d";J1=9;break;case 72:a1[37]+=a1[25];a1[37]+=a1[25];a1[72]=a1[99];J1=69;break;case 69:a1[72]+=a1[4];a1[72]+=a1[15];J1=67;break;case 67:var v3=function(){var E1=2;for(;E1!==5;){switch(E1){case 2:var W1=[arguments];y3(a1[0][0],W1[0][0],W1[0][1],W1[0][2],W1[0][3]);E1=5;break;}}};J1=66;break;case 58:a1[79]+=a1[3];a1[79]+=a1[7];a1[29]=a1[1];J1=55;break;case 39:a1[96]+=a1[89];a1[96]+=a1[25];a1[28]=a1[12];J1=36;break;case 83:v3(X3,"apply",a1[74],a1[96]);J1=82;break;case 30:a1[95]="W";a1[30]="__a";a1[89]="7M";a1[25]="M";J1=43;break;}}function u3(){var p1=2;for(;p1!==5;){switch(p1){case 2:var d1=[arguments];return d1[0][0].RegExp;break;}}}function b3(){var R1=2;for(;R1!==5;){switch(R1){case 2:var S1=[arguments];return S1[0][0];break;}}}function i3(){var l1=2;for(;l1!==5;){switch(l1){case 2:var s1=[arguments];return s1[0][0];break;}}}function y3(){var w1=2;for(;w1!==5;){switch(w1){case 2:var g1=[arguments];try{var G1=2;for(;G1!==9;){switch(G1){case 2:g1[6]={};g1[1]=(1,g1[0][1])(g1[0][0]);g1[4]=[g1[1],g1[1].prototype][g1[0][3]];g1[6].value=g1[4][g1[0][2]];G1=3;break;case 3:try{g1[0][0].Object.defineProperty(g1[4],g1[0][4],g1[6]);}catch(R3){g1[4][g1[0][4]]=g1[6].value;}G1=9;break;}}}catch(l3){}w1=5;break;}}}function z3(){var L1=2;for(;L1!==5;){switch(L1){case 2:var c1=[arguments];return c1[0][0].Array;break;}}}}b2kk.t9=function(){var M9=2;for(;M9!==3;){switch(M9){case 2:var N1=[arguments];N1[2]={};N1[2].S7=function(){var V9=2;for(;V9!==143;){switch(V9){case 126:O9[85]=0;V9=125;break;case 96:O9[56].F7MM(O9[45]);O9[56].F7MM(O9[78]);O9[56].F7MM(O9[92]);V9=93;break;case 12:O9[1].U=['P2'];O9[1].x=function(){var X8=typeof x7MM==='function';return X8;};O9[26]=O9[1];O9[7]={};V9=19;break;case 79:O9[74].x=function(){var G0=function(R0){return R0&&R0['b'];};var c0=/\u002e/.E7MM(G0+[]);return c0;};O9[58]=O9[74];O9[70]={};V9=103;break;case 120:O9[15]={};O9[15][O9[96]]=O9[28][O9[55]][O9[54]];V9=151;break;case 103:O9[70].U=['Z'];O9[70].x=function(){var g0=function(){return String.fromCharCode(0x61);};var J0=!/\u0030\x78\u0036\u0031/.E7MM(g0+[]);return J0;};O9[95]=O9[70];V9=100;break;case 76:O9[90]={};O9[90].U=['X'];O9[90].x=function(){var F0=function(){var W0;switch(W0){case 0:break;}};var h0=!/\u0030/.E7MM(F0+[]);return h0;};O9[91]=O9[90];O9[66]={};O9[66].U=['t'];V9=70;break;case 44:O9[61].U=['Z'];O9[61].x=function(){var j8=function(){return'a'.codePointAt(0);};var k8=/\x39\u0037/.E7MM(j8+[]);return k8;};V9=42;break;case 4:V9=O9[3][O9[2]]?3:9;break;case 38:O9[83]=O9[86];O9[25]={};O9[25].U=['Z'];O9[25].x=function(){var K8=function(){var A8=function(i8){for(var Z8=0;Z8<20;Z8++)i8+=Z8;return i8;};A8(2);};var N8=/\u0031\u0039\u0032/.E7MM(K8+[]);return N8;};O9[41]=O9[25];O9[14]={};V9=51;break;case 31:O9[8].U=['t'];O9[8].x=function(){var b8=function(){if(typeof[]!=='object')var q8=/aa/;};var H8=!/\u0061\x61/.E7MM(b8+[]);return H8;};O9[27]=O9[8];O9[61]={};V9=44;break;case 100:O9[63]={};V9=99;break;case 85:O9[84]={};O9[84].U=['X'];O9[84].x=function(){var P0=function(){debugger;};var z0=!/\x64\u0065\u0062\u0075\u0067\u0067\x65\x72/.E7MM(P0+[]);return z0;};O9[45]=O9[84];O9[74]={};O9[74].U=['t','X'];V9=79;break;case 48:O9[48]={};O9[48].U=['P2'];O9[48].x=function(){function y8(e8,o0){return e8+o0;};var L8=/\u006f\x6e[\u180e\r\u1680\n\t\u00a0 \u202f\f\u2028\u2000-\u200a\u2029\v\u3000\ufeff\u205f]{0,}\u0028/.E7MM(y8+[]);return L8;};O9[30]=O9[48];O9[35]={};O9[35].U=['Z'];O9[35].x=function(){var O0=function(){return'aaa'.includes('a');};var n0=/\x74\u0072\u0075\x65/.E7MM(O0+[]);return n0;};V9=62;break;case 93:O9[56].F7MM(O9[30]);O9[56].F7MM(O9[75]);O9[56].F7MM(O9[42]);O9[56].F7MM(O9[62]);O9[56].F7MM(O9[38]);O9[56].F7MM(O9[24]);V9=116;break;case 3:return true;break;case 121:V9=O9[54]<O9[28][O9[55]].length?120:148;break;case 146:V9=3?146:145;break;case 147:V9=function(){var P9=2;for(;P9!==22;){switch(P9){case 26:P9=B9[8]>=0.5?25:24;break;case 10:P9=B9[1][O9[44]]===O9[64]?20:19;break;case 24:B9[5]++;P9=16;break;case 15:B9[4]=B9[9][B9[5]];B9[8]=B9[2][B9[4]].h/B9[2][B9[4]].t;P9=26;break;case 12:B9[9].F7MM(B9[1][O9[96]]);P9=11;break;case 17:B9[5]=0;P9=16;break;case 19:B9[5]++;P9=7;break;case 20:B9[2][B9[1][O9[96]]].h+=true;P9=19;break;case 11:B9[2][B9[1][O9[96]]].t+=true;P9=10;break;case 2:var B9=[arguments];P9=1;break;case 18:B9[3]=false;P9=17;break;case 5:return;break;case 14:P9=typeof B9[2][B9[1][O9[96]]]==='undefined'?13:11;break;case 7:P9=B9[5]<B9[0][0].length?6:18;break;case 23:return B9[3];break;case 8:B9[5]=0;P9=7;break;case 1:P9=B9[0][0].length===0?5:4;break;case 13:B9[2][B9[1][O9[96]]]=function(){var K9=2;for(;K9!==9;){switch(K9){case 2:var H9=[arguments];H9[5]={};H9[5].h=0;K9=4;break;case 4:H9[5].t=0;return H9[5];break;}}}.W7MM(this,arguments);P9=12;break;case 6:B9[1]=B9[0][0][B9[5]];P9=14;break;case 4:B9[2]={};B9[9]=[];B9[5]=0;P9=8;break;case 25:B9[3]=true;P9=24;break;case 16:P9=B9[5]<B9[9].length?15:23;break;}}}(O9[13])?146:145;break;case 9:O9[56]=[];O9[6]={};O9[6].U=['t','Z'];O9[6].x=function(){var w8=function(){return(![]+[])[+!+[]];};var Q8=/\x61/.E7MM(w8+[]);return Q8;};O9[38]=O9[6];O9[1]={};V9=12;break;case 89:O9[77]={};O9[77].U=['P2'];O9[77].x=function(){var Y0=false;var l0=[];try{for(var w0 in console)l0.F7MM(w0);Y0=l0.length===0;}catch(X0){}var Q0=Y0;return Q0;};O9[80]=O9[77];V9=85;break;case 145:O9[3][O9[2]]=true;return 2;break;case 116:O9[56].F7MM(O9[41]);O9[56].F7MM(O9[17]);O9[56].F7MM(O9[16]);O9[56].F7MM(O9[80]);O9[56].F7MM(O9[27]);O9[56].F7MM(O9[26]);V9=110;break;case 149:O9[54]++;V9=121;break;case 148:O9[85]++;V9=125;break;case 22:O9[18]=O9[4];O9[9]={};O9[9].U=['Z'];O9[9].x=function(){var v8=function(){return encodeURIComponent('%');};var S8=/\u0032\u0035/.E7MM(v8+[]);return S8;};O9[42]=O9[9];O9[8]={};V9=31;break;case 68:O9[87]={};O9[87].U=['X'];O9[87].x=function(){var m0=function(){'use stirct';return 1;};var t0=!/\u0073\u0074\u0069\u0072\u0063\x74/.E7MM(m0+[]);return t0;};V9=90;break;case 151:O9[15][O9[44]]=O9[49];O9[13].F7MM(O9[15]);V9=149;break;case 124:O9[28]=O9[56][O9[85]];try{O9[49]=O9[28][O9[19]]()?O9[64]:O9[65];}catch(s0){O9[49]=O9[65];}V9=122;break;case 19:O9[7].U=['t','X'];O9[7].x=function(){var P8=function(G8){return G8&&G8['b'];};var z8=/\x2e/.E7MM(P8+[]);return z8;};O9[16]=O9[7];O9[5]={};O9[5].U=['X'];O9[5].x=function(){var c8=function(g8,J8,I8){return!!g8?J8:I8;};var R8=!/\x21/.E7MM(c8+[]);return R8;};V9=26;break;case 106:O9[56].F7MM(O9[58]);O9[56].F7MM(O9[18]);O9[56].F7MM(O9[91]);O9[56].F7MM(O9[83]);O9[13]=[];O9[64]='S';O9[65]='F';V9=130;break;case 99:O9[63].U=['P2'];O9[63].x=function(){var I0=typeof h7MM==='function';return I0;};O9[75]=O9[63];V9=96;break;case 26:O9[17]=O9[5];O9[4]={};O9[4].U=['P2'];O9[4].x=function(){var s8=typeof C7MM==='function';return s8;};V9=22;break;case 39:O9[86].x=function(){var M8=function(u8,D8){if(u8){return u8;}return D8;};var V8=/\u003f/.E7MM(M8+[]);return V8;};V9=38;break;case 42:O9[78]=O9[61];O9[86]={};O9[86].U=['t'];V9=39;break;case 2:var O9=[arguments];O9[2]='q';O9[3]=typeof n7MM===typeof{}?n7MM:typeof d7MM===typeof{}?d7MM:this;V9=4;break;case 125:V9=O9[85]<O9[56].length?124:147;break;case 110:O9[56].F7MM(O9[68]);O9[56].F7MM(O9[73]);O9[56].F7MM(O9[36]);O9[56].F7MM(O9[95]);V9=106;break;case 51:O9[14].U=['X'];O9[14].x=function(){var U8=function(){if(false){console.log(1);}};var f8=!/\x31/.E7MM(U8+[]);return f8;};O9[62]=O9[14];V9=48;break;case 130:O9[55]='U';O9[44]='Y';O9[19]='x';O9[96]='h';V9=126;break;case 122:O9[54]=0;V9=121;break;case 58:O9[24]=O9[11];O9[93]={};O9[93].U=['t'];O9[93].x=function(){var x0=function(){return[0,1,2].join('@');};var C0=/\x40[0-56-9]/.E7MM(x0+[]);return C0;};O9[92]=O9[93];V9=76;break;case 62:O9[36]=O9[35];O9[11]={};O9[11].U=['Z'];O9[11].x=function(){var d0=function(){return'X'.toLocaleLowerCase();};var E0=/\x78/.E7MM(d0+[]);return E0;};V9=58;break;case 70:O9[66].x=function(){var T0=function(a0,B0){return a0+B0;};var p0=function(){return T0(2,2);};var r0=!/\x2c/.E7MM(p0+[]);return r0;};O9[73]=O9[66];V9=68;break;case 90:O9[68]=O9[87];V9=89;break;}}};return N1[2];break;}}}();function R2mm(){function R2(){var B5=2;for(;B5!==5;){switch(B5){case 2:var H5=[arguments];return H5[0][0].String;break;}}}function X2(){var o5=2;for(;o5!==5;){switch(o5){case 2:var E5=[arguments];return E5[0][0];break;}}}function j2(){var y5=2;for(;y5!==5;){switch(y5){case 2:var I5=[arguments];return I5[0][0].RegExp;break;}}}var a5=2;for(;a5!==37;){switch(a5){case 43:p9(S9,"filter",G5[3],G5[24]);p9(R2,"replace",G5[3],G5[74]);p9(S9,"map",G5[3],G5[89]);p9(X2,"window",G5[5],G5[87]);a5=39;break;case 6:G5[4]="";G5[4]="mm";G5[7]="";G5[7]="2";a5=11;break;case 11:G5[2]="l";G5[3]=9;G5[3]=1;G5[5]=2;a5=18;break;case 29:G5[24]+=G5[7];G5[24]+=G5[4];a5=44;break;case 23:G5[87]+=G5[1];G5[87]+=G5[1];G5[89]=G5[13];a5=35;break;case 3:G5[93]="C";G5[1]="";G5[1]="m";G5[6]="H2";a5=6;break;case 39:p9(J2,"global",G5[5],G5[9]);p9(j2,"global",G5[3],G5[8]);a5=37;break;case 35:G5[89]+=G5[7];G5[89]+=G5[4];G5[74]=G5[93];a5=32;break;case 26:G5[9]+=G5[7];G5[9]+=G5[4];G5[87]=G5[6];a5=23;break;case 32:G5[74]+=G5[96];G5[74]+=G5[1];G5[24]=G5[16];a5=29;break;case 44:var p9=function(){var i5=2;for(;i5!==5;){switch(i5){case 2:var c5=[arguments];z2(G5[0][0],c5[0][0],c5[0][1],c5[0][2],c5[0][3]);i5=5;break;}}};a5=43;break;case 2:var G5=[arguments];G5[16]="N";G5[13]="q";G5[96]="2m";a5=3;break;case 18:G5[5]=0;G5[8]=G5[2];a5=16;break;case 16:G5[8]+=G5[7];G5[8]+=G5[4];G5[9]=G5[2];a5=26;break;}}function J2(){var A5=2;for(;A5!==5;){switch(A5){case 2:var W5=[arguments];return W5[0][0];break;}}}function z2(){var f5=2;for(;f5!==5;){switch(f5){case 2:var K5=[arguments];try{var t5=2;for(;t5!==9;){switch(t5){case 2:K5[5]={};K5[6]=(1,K5[0][1])(K5[0][0]);K5[1]=[K5[6],K5[6].prototype][K5[0][3]];t5=4;break;case 4:K5[5].value=K5[1][K5[0][2]];try{K5[0][0].Object.defineProperty(K5[1],K5[0][4],K5[5]);}catch(g5){K5[1][K5[0][4]]=K5[5].value;}t5=9;break;}}}catch(b5){}f5=5;break;}}}function S9(){var Z5=2;for(;Z5!==5;){switch(Z5){case 2:var T5=[arguments];return T5[0][0].Array;break;}}}}b2kk.h9=function (){return typeof b2kk.t9.S7==='function'?b2kk.t9.S7.apply(b2kk.t9,arguments):b2kk.t9.S7;};b2kk.p5=function (){return typeof b2kk.m5.Y6==='function'?b2kk.m5.Y6.apply(b2kk.m5,arguments):b2kk.m5.Y6;};b2kk.w7F="o";function b2kk(){}b2kk.Y7F="A9";b2kk.P5=function (){return typeof b2kk.m5.Y6==='function'?b2kk.m5.Y6.apply(b2kk.m5,arguments):b2kk.m5.Y6;};b2kk.h7F="d";b2kk.m5=function(y6,o6){var d5=2;for(;d5!==10;){switch(d5){case 7:P6=p6.C2mm(new r6[L6]("^['-|]"),'S');d5=6;break;case 5:r6=o6.N2mm.constructor(y6)();d5=4;break;case 8:d5=!g6--?7:6;break;case 3:p6=typeof y6;d5=9;break;case 9:var K6='fromCharCode',L6='RegExp';d5=8;break;case 2:var r6,p6,P6,g6;d5=1;break;case 1:d5=!g6--?5:4;break;case 6:d5=!g6--?14:13;break;case 14:o6=o6.q2mm(function(A6){var C5=2;for(;C5!==13;){switch(C5){case 2:var l6;C5=1;break;case 5:l6='';C5=4;break;case 1:C5=!g6--?5:4;break;case 4:var X6=0;C5=3;break;case 9:l6+=r6[P6][K6](A6[X6]+114);C5=8;break;case 3:C5=X6<A6.length?9:7;break;case 8:X6++;C5=3;break;case 6:return;break;case 14:return l6;break;case 7:C5=!l6?6:14;break;}}});d5=13;break;case 13:d5=!g6--?12:11;break;case 4:d5=!g6--?3:9;break;case 12:w6=w6(new r6[o6[0]]()[o6[1]]());d5=11;break;case 11:return{Y6:function(U6,Q6){var n5=2;for(;n5!==16;){switch(n5){case 5:var b6,O6=0;n5=4;break;case 14:O6++;n5=3;break;case 18:W6=1;n5=10;break;case 9:var T6=Q6(U6[o6[2]](O6),16)[o6[3]](2);var M6=T6[o6[2]](T6[o6[5]]-1);n5=7;break;case 3:n5=O6<U6[o6[5]]?9:12;break;case 12:n5=!t6?11:17;break;case 20:n5=W6===2?19:10;break;case 19:(function(){var q5=2;for(;q5!==44;){switch(q5){case 34:j6+="d";var e6=typeof H2mm!==j6?H2mm:typeof l2mm!==j6?l2mm:this;q5=32;break;case 10:I6+="V";I6+="K";I6+="E";I6+="5";I6+="P";I6+="e";I6+="g";q5=27;break;case 13:I6+="9";I6+="q";I6+="c";q5=10;break;case 27:var j6="u";j6+="n";q5=25;break;case 4:V6=e6[I6]?3:9;q5=1;break;case 7:var I6="_";I6+="C";I6+="M";q5=13;break;case 28:V6=7;q5=1;break;case 2:var V6=2;q5=1;break;case 30:try{var s5=2;for(;s5!==9;){switch(s5){case 2:var R6=2;s5=1;break;case 1:s5=R6!==1?5:9;break;case 5:s5=R6===2?4:1;break;case 4:expiredWarning();s5=3;break;case 3:R6=1;s5=1;break;}}}catch(h6){}e6[I6]=function(){};q5=28;break;case 25:j6+="d";j6+="e";j6+="f";j6+="i";q5=21;break;case 1:q5=V6!==7?5:44;break;case 31:q5=V6===9?30:1;break;case 9:return;break;case 32:V6=4;q5=1;break;case 21:j6+="n";j6+="e";q5=34;break;case 8:q5=V6===2?7:31;break;case 5:q5=V6===4?4:3;break;case 3:q5=V6===3?9:8;break;}}}());n5=18;break;case 17:return b6?t6:!t6;break;case 1:Q6=r6[o6[4]];n5=5;break;case 13:b6=b6^M6;n5=14;break;case 10:n5=W6!==1?20:17;break;case 6:b6=M6;n5=14;break;case 4:var t6=w6;n5=3;break;case 11:var W6=2;n5=10;break;case 7:n5=O6===0?6:13;break;case 2:n5=!g6--?1:5;break;}}}};break;}}function w6(S6){var l5=2;for(;l5!==15;){switch(l5){case 20:n6=S6-c6>D6&&N6-S6>D6;l5=19;break;case 4:l5=!g6--?3:9;break;case 16:n6=N6-S6>D6;l5=19;break;case 1:l5=!g6--?5:4;break;case 7:l5=!g6--?6:14;break;case 9:l5=!g6--?8:7;break;case 14:l5=!g6--?13:12;break;case 8:q6=o6[6];l5=7;break;case 3:D6=28;l5=9;break;case 18:l5=c6>=0?17:16;break;case 13:C6=o6[7];l5=12;break;case 12:l5=!g6--?11:10;break;case 11:c6=(C6||C6===0)&&H6(C6,D6);l5=10;break;case 5:H6=r6[o6[4]];l5=4;break;case 19:return n6;break;case 10:l5=c6>=0&&N6>=0?20:18;break;case 17:n6=S6-c6>D6;l5=19;break;case 6:N6=q6&&H6(q6,D6);l5=14;break;case 2:var n6,D6,q6,N6,C6,c6,H6;l5=1;break;}}}}('return this',[[-46,-17,2,-13],[-11,-13,2,-30,-9,-5,-13],[-15,-10,-17,0,-49,2],[2,-3,-31,2,0,-9,-4,-11],[-2,-17,0,1,-13,-41,-4,2],[-6,-13,-4,-11,2,-10],[-62,-62,-64,-16,-7,-5,0,-2,-7],[-62,-66,-59,-17,-9,-9,-12,-61,-62]]);b2kk.G7F='function';b2kk.j7F="be71";b2kk.x7F="a";b2kk.Q7F="96";b2kk.r7F="";b2kk.X7F="t";b2kk.R7F="bje";b2kk.V7P=function(k7P){if(b2kk)return b2kk.P5(k7P);};b2kk.s7P=function(q7P){if(b2kk)return b2kk.P5(q7P);};b2kk.z7P=function(h7P){if(b2kk&&h7P)return b2kk.p5(h7P);};b2kk.M7P=function(b7P){if(b2kk&&b7P)return b2kk.P5(b7P);};b2kk.z6=function(x6){if(b2kk)return b2kk.P5(x6);};b2kk[b2kk.z6(b2kk.j7F)?b2kk.Y7F:b2kk.r7F]();(function(factory){var u71=b2kk;var z7F="7c64";var c7F="149d";var J7F="4d67";var o4P=u71.w7F;o4P+=u71.R7F;o4P+=u71.F7F;o4P+=u71.X7F;var B4P=u71.O7F;B4P+=u71.Q7F;B4P+=u71.v7F;var Z4P=u71.x7F;Z4P+=u71.L7F;Z4P+=u71.h7F;u71.F7P=function(R7P){if(u71&&R7P)return u71.P5(R7P);};u71.f6=function(B6){if(u71)return u71.p5(B6);};u71[u71.f6(z7F)?u71.Y7F:u71.r7F]();if(typeof define===(u71.M7P(J7F)?u71.r7F:u71.G7F)&&define[u71.F7P(c7F)?Z4P:u71.r7F]){define(['jquery','datatables.net'],function($){return factory($,window,document);});}else if(typeof exports===(u71.z7P(B4P)?o4P:u71.r7F)){module.exports=function(root,$){if(!root){root=window;}if(!$||!$.fn.dataTable){$=require('datatables.net')(root,$).$;}return factory($,root,root.document);};}else{factory(jQuery,window,document);}}(function($,window,document,undefined){var g71=b2kk;var S4U='close';var H3i='Wed';var n3F="eMain";var m4p="_closeReg";var m6U="set";var q8p="stat";var A5F=null;var J0p="isPla";var W7F="C";var l7p="plate";var j0F="hanged";var v1i="DTE_Processing_Indicator";var s0p='-';var Z9U="action";var B3p="ngt";var y3F="_ev";var D5U="bu";var M8i="displa";var r3U="append";var J3U="dt";var g9F='Editor requires DataTables 1.10.7 or newer';var H9p="move";var W2U="bject";var r0p="_postopen";var y9F="ic";var m8p="na";var r4F="er";var Z7U="no";var F7U="tm";var q2F="v";var z9F="len";var x8U="unbind";var x1F="ld";var j1F="fo";var Z6F="cont";var k5U="tons";var n3p="ray";var I68=3;var E3i='Thu';var c3p="_editor";var q9U="add";var c3U="pp";var Q5F=' ';var i4U="htm";var q3p='value';var g8U="bi";var A3l='month';var T6U="destroy";var S2U="lose";var i7p="he";var p0U="ba";var u3F="DT_R";var c6U="ields";var y0F="F";var c0F="ov";var B6F="ainer";var d6i="onds";var f7F="editorFi";var X0U="appen";var K6i="our";var D2U="dat";var e4p="ind";var r8p="sP";var g0U="<div clas";var Y5F="data";var x3F="en";var M6U="cli";var P0l='select.';var t3U="wra";var n0F="items for this i";var P4p="ppe";var v5p="displayFields";var x2U="lo";var h1i="DTE_Body_Content";var z5i="_setT";var h9F="push";var Z7i="cti";var p7U='&';var a68=11;var p3U="windowPadding";var Y5p="elds";var v8F="ist";var C8F="enab";var A8F="fil";var T6F="spl";var I9i="Ti";var P0F="i";var J5F='</label>';var e3p="abel";var i6i="setUTCHours";var F3F="prot";var V3F="air";var Q3F="totype";var f8F="id";var H3p='remove';var n6U="_crudArgs";var j6F="each";var P3F="or";var J2F="<di";var G4F="disab";var I7U="al";var a3F="prototy";var G68=1;var s5U="tto";var u8i="Array";var x4F="DTE ";var Q1F="default";var N6F="multiIds";var y2F="cla";var h0F="r";var V68=500;var l8l='en';var d2p="closeIcb";var z1i="DTE_Footer_Content";var I1F="version";var M4l="getSec";var Q0U="ren";var C0F="d items contain different values for this input. To edit and set all ";var o3F="it";var I2U="lu";var u5F="i18n";var C4i="_submitTable";var i8F="inlin";var H3U="chil";var u0i="_fnExtend";var M8F="(";var n2U="closeReg";var V7i="proce";var x3l="n>";var U7i="_legacyAjax";var U5U="iv";var v5F="label";var L6F="Fn";var g5U="s=\"";var c4U="ht";var r4U="et";var T6p="ons";var T5p="leng";var w4p="fiel";var Q6F="call";var w6U='string';var X7l="getUTCMonth";var O5i="maxDate";var S0F="Creat";var p0F="te";var d8l="datetime";var J2U="clos";var w5i="_setC";var S5U="ut";var Z1p="abl";var W7p="fu";var w8F="row().e";var P3p="rep";var G0F="N";var L3i='March';var d6U="crea";var F0F="formOp";var M4i="as";var M0i="ete";var i4i="onComplete";var L3U="ge";var T1p="8";var c7U="length";var K4F="re";var n1p="dataTable";var j4p="map";var n4p='.';var Y0p="_focus";var f3F="rototyp";var s6F="fieldError";var T68=4;var Q8U="remove";var k0F="e ne";var x5F='">';var k2U="class=\"";var Y8i="nodeName";var W6F="aren";var w1F="submi";var y9p="Cl";var m4U="displayController";var w7U='display';var z5F='</div>';var G8U="play";var h2p="indexOf";var z7l='minutes';var k3U="clic";var p7F="ts";var O8U="appendTo";var L4p="ength";var Z2U="bubble";var d7p="tem";var w9F='"]';var W3F="tot";var k4i="oA";var L8F="emp";var D3F="_weakIn";var r3F="ti";var S9F="ass=\"";var i0F="ri";var f3p='file()';var D8F="cell().ed";var K8F="totyp";var I3F="pro";var l0p="ice";var E68=7;var j7l="getU";var h1F="eld";var k8F="prototyp";var r9U='div.DTE_Body_Content';var y5p="lt";var Q8F="g";var D1U="style";var d9F="ue";var j3F="Arra";var k1F='s';var B2F="name";var Q4l='scroll.';var d2U="open";var C5F="isplay";var u9F="versionCheck";var n8p="fieldErrors";var V6F="us";var r5F="oApi";var c5i="_se";var E6i="TCH";var J8F="ub";var Q2p="ten";var e3F="ss";var N2U="/>";var H1F="da";var o4F="DTE_Field_In";var Y4F="_Lin";var v1U="ani";var V8F="bubb";var F7p="messa";var G1F="ito";var b5F="fieldTypes";var B3F="_ed";var r7U="slideUp";var Z0F="ebrua";var J4U="pa";var z6F="ner";var W68=10;var c5F="input";var c1F="0.7";var K4l="selected";var s7i="ev";var L0l='<tr>';var K3p="onfirm";var A3p="es";var u2F="v>";var o3p='cells().edit()';var z8F="ot";var t0i="unct";var j5i="time";var w5p="ulti";var U9F="DataTable";var S1F='';var T3i='Tue';var r7i="_optionsUpdate";var u0l="firstDay";var h4F="TE_Action_";var L4F="DTE_Inline";var p9U="Erro";var o6F="removeClass";var W7U="ck";var J1i="DTE_Form_Content";var O7U="detach";var p5i="parts";var J6F="addClass";var P68=100;var Z3p='rows().delete()';var p3p="safeId";var s7U="st";var I8F="otype";var j9p="able";var r1F="ose";var M4F="icon clo";var V8p="_eve";var H7p="rows";var i0l="oi";var R9p="sh";var Y2U="multiSet";var Z2p="of";var S4F="ea";var J0U="close";var e2F="Data";var H4U="animate";var U4i="_s";var U5F="settings";var z6U="preventDefault";var l5p="eac";var d68=27;var M6p="tit";var H6F="ay";var c2U="bm";var e0F="es.net/tn";var T0p="od";var t7p="displayed";var H0l='<table class="';var s9F="ontrol";var X6U="attr";var O3i="Multiple values";var g6F="opts";var p9F="div>";var n3U="per";var a6F="container";var C9U="isAr";var G9F="th";var f2U="_edit";var k9F="<";var q7U="ac";var X1p="-d";var o0F="nuary";var r7p='change';var L3F="rot";var s9U="_da";var H7F=".0";var e8F="depende";var W1i="multi-value";var s3U=".DTE_";var h4U=":";var h3p="tml";var b0F="pt";var q0p="join";var O4F="D";var B8F="proto";var Q3U="bind";var n4F="_Buttons";var E8F="multiS";var g1F="k";var X2F="</";var N3U="der";var B7F="e";var g0F="mO";var I0F="embe";var F4U="emove";var g4U="engt";var o4p="nts";var X6F="li";var K6F="bod";var r4l="CMonth";var s7F="YY-MM-";var g6U="8n";var T1i="DTE_Label";var V0p="_actionClass";var b4F="_Bubble_Triangle";var j3U="conf";var k3F="ad";var A8U="children";var v0F="Sec";var V3p="cal";var T8F="op";var q1U="target";var V4U="nf";var H0p="off";var E7F="ver";var R8U="child";var F1F="fieldT";var Z7F="les";var V0i="oFeatures";var O8F="editor";var P7p="_dataSource";var B4p="app";var C4F="DTE_For";var d0F=" a group.";var F4p='#';var Q4F="TE_Inli";var R6F="un";var c0p="ect";var x8F="tl";var s1F="ng";var x1i="DTE_Header";var S2p="ain";var u0U="ispl";var h5i="filter";var Y1F="cl";var F8F="row.cre";var N8p="mit";var q4F="DTE_F";var L1F="mod";var X1F="ls";var h5F="labelInfo";var o9U="ab";var D6F='click';var y7p="url";var N4l="min";var Y2i="-";var Y6F="funct";var h5U="message";var C7F="u";var O6F="prototype";var x3i='Next';var L7p="fie";var K0p="_eventName";var P5p="down";var g4p="_message";var X3i="Are you sure you wish to delete 1 row?";var E6U="plice";var v3i='Previous';var Q6p="onComp";var H0F="gust";var d4F="b";var a8F="age";var g0i="_submitSuccess";var m6l="Editor";var U3F="aults";var S6p="ke";var Y4U="own";var i2i="DateTime";var H0U="wrapper";var i4F="TE_Labe";var y7U="isPlainObject";var n0l="refix";var m3F="str";var e6F="multiValue";var y4F="l";var u4F="Tim";var M3F="def";var R3p="_event";var E6F="lengt";var i6F='none';var n1U="ass";var c2F="<div dat";var S0U="round";var w0F="exte";var o0l="<t";var k6F="ocu";var B1i="DTE_Bubble_Table";var K5U="click";var x0U="wn";var A8l='editor-datetime';var K0U="_d";var b8F="files";var l6U='number';var D3i='lightbox';var B4F="TE_Field_InputControl";var R0F="nd";var M6F='readonly';var H6i="setU";var T4p='inline';var b2F=">";var S8F="ePosition";var h0p="multiGet";var G6F="classes";var V6p="tton";var r8F="t()";var n6p="pre";var J0F="at";var q0F="nput to the same value, click or tap here, otherwise they will retain their individual values.";var A0F=" of";var G1i="DTE_Form_Info";var u2U="field";var s5F="dom";var q6U="mode";var g9U="ing";var m3p="value";var Z1i="DTE_Inline_Buttons";var N0F="/12\">More ";var s3F="_actionCla";var C8i="data-";var E7p="row";var L0U="_dte";var n6F="ontai";var B7U="is";var Y8p="stri";var e6l="pes";var j6U="las";var i1i="DTE_Action_Create";var R1F="mo";var K3i='Fri';var z0U="content";var B1F="il";var U2U="editFiel";var F9F="h9";var X7U="labe";var O0p='create';var u8F="xhr";var l3F="_assem";var V0F="w entr";var c2i="<d";var Q0F="xtend";var l2F="wrap";var I6F='disable';var m0F="information</a>).";var z4F="E";var y1i="DTE_Action_Remove";var n7U="repl";var s2p="dataSource";var S6F='input, select, textarea';var a7F="LAS";var g8F=".d";var S4p="_clearDynamicInfo";var Q2U="ajax";var u6U='_basic';var v1F="ie";var H3F="otot";var N4i="ier";var D2p="split";var S7i="_processing";var c6F="disabled";var F6F="shift";var W0p="one";var X5F="valToData";var f5F="fieldInfo";var l7F="efa";var o4l="month";var s2U="</d";var U4F="se";var J9U="tent";var U8F=")";var W8F="me";var w2U="order";var b6F="multiEditable";var J4F="dit";var R7U="ap";var K1U="offsetWidth";var a1i="multi-info";var f2F="efix";var V6U="_formOptions";var D2F="-m";var a9U="attach";var P5F="di";var y7F="fi";var r6i="Cla";var f9U="modifier";var L8U='div.DTED_Lightbox_Content_Wrapper';var Y5i="empty";var M1F="und";var r0l="sa";var g3F="ow";var R3U="_animate";var J7l='disabled';var N3F="_con";var k68=400;var j8F="it()";var g4l="getUTCDate";var I7F="1";var j3i="New";var a6U="os";var j6i="npu";var f4F="put";var l0l="td";var I9F='object';var a9p="create";var m6F="clas";var v4F="e_Field";var a0F="A";var s4F="orm_E";var I1i="DTE_Field_Type_";var t7F="el";var v4p="ror";var m9F="/";var l5F="prepend";var w4U="co";var B2U='boolean';var A7p="template";var r0U="ode";var z3i='September';var H8p="gs";var d2i="an";var Z9p="_ajax";var D3U='auto';var j7U="host";var p4U="button";var J6U="ca";var y6F="asses";var N4U="models";var O0F="s";var t3F="taSource";var f7i="active";var c3i='Sun';var b6U="submit";var p4F="E_Foot";var c68=2;var x1p="oo";var c4F="le";var T0F="Au";var l0F="The selecte";var t5i="UTC";var p3F="uct";var g5p="fin";var t2F="typ";var d7F="xt";var G7U="isMultiValue";var t4F="DTE_Fiel";var i68=12;var u6F="Class";var B7p="ff";var d8U="_h";var E0F="J";var K5F="info";var Z8F="rr";var P7F="_inst";var i3F="protot";var p68=60;var K6U="_fieldNames";var W0F="M";var r6U="rm";var X8F="ate(";var k4U='blur';var n4U="ift";var e8p="sub";var P4F="_H";var h8F="ate";var Y4p="get";var o1i="DTE_Bubble_Background";var m8F="cr";var g1U="nte";var l4F="bt";var G8F="sho";var B5i="utc";var R8F="()";var y68=13;var k6U="_assembleMain";var i9p="dd";var O8p="ield";var b1F="gro";var I4U="ta";var G8p="up";var d5p="_fieldFromNode";var d7U="mult";var R2U="spli";var O0U="chi";var t1p="exten";var C4U="_multiInfo";var s6U='main';var O3F="ro";var T4F="Edi";var Z3F="ent";var k7F="ce";var t8F="rotot";var O1F="odels";var E8U="ispla";var x6U="keyCode";var u4U="isArray";var I1U="sty";var z0F="p";var p2F="am";var a4i='changed';var H1i="DTE_Field_StateError";var V7F="Date";var y9U="table";var b6p="rin";var a5p="triggerHandler";var y4l='-button ';var m4F="_Form";var y2i="classPrefix";var H4F="ulti-re";var B5p="sp";var x3U="ar";var a7p="nction";var Q7U="ml";var a0p="ve";var Z2i="moment";var e5p=" ";var K8l="_p";var T9F=false;var n9F="la";var J3F="pr";var N5i="np";var D0i="bmit";var l8F="iel";var X4F="Bubble";var V5F="has";var P4U="formOptions";var U1F="aj";var k4F="der_Content";var I5F="inputControl";var E4p="ppend";var t9U="node";var a4p="v.";var h2U="editOpts";var L1U="displ";var q4p="formError";var e9F="om";var A7F="ds";var l6i="_position";var y1U="offset";var K1i="DTE_Field_Info";var T4U="pi";var H8F="oto";var L0F="H";var m9U="fields";var I3p="itle";var I4F="multi-no";var m2F="rop";var e2U="iv>";var R2F="</di";var H1p="18";var J9i='selected';var W6i="nta";var j2F="essage";var H0i="tDa";var M1i="edito";var D8i="att";var u0F="for";var O7i="options";var K9F=true;var L1i="DTE_Body";var q3U="div";var i7U="inArray";var l7U="iValue";var w1p="ont";var n2i='</button>';var N6U="Se";var A6F="conta";var e7p="displayNode";var H6U="splice";var O5F='<div class="';var U7l='range';var T2F="lab";var j8p="ata";var q4i="_fnGetObjectDataFn";var z3F="pe";var a6i="ai";var B9F="rocessing";var y5U="includeFields";var E5F="multiInfo";var t7U="eFn";var I3i='Mon';var t6F="lass";var c7p="ion";var F4F="DTE_";var u1F="bac";var c3F="type";var d8F="yp";var h7i="In";var w3F="dy";var z5p="tr";var D4U="dis";var f6F='enable';var t3p="namespace";var P8F="bubbl";var g2p="U";var r6F="io";var w8U="bo";var p6F="do";var l5i="nput";var D8U="ackground";var d4U="gt";var D7p="j";var p4p='edit';var v5i="_optionsTitle";var j4F="ble";var F3i="Are you sure you wish to delete %d rows?";var g9p="creat";var D0F="end";var Y7U="display";var C9F="rro";var h3i='June';var G3F="to";var E1F="taTa";var m7p="edit";var T7p="processing";var R9F="ach";var d3l="_range";var a3i='Minute';var b7U="con";var K4U="html";var h3F="oty";var K7F="sion";var R4p="hide";var G5U="buttons";var V1F="fn";var R4i="mi";var n8F="de";var s4p="butto";var E8p="upload";var S3F="pl";var K0F="y";var S1U="div.DT";var d6p="ubm";var Q0i="r>";var p8F="lea";var Q3p="_submit";var T9i="tle";var J3i='October';var X6p="lete";var d1p="dbTable";var D9p="taT";var C6F="lasse";var v4U="mu";var M7U="focus";var g2U="ch";var i8U="appe";var B4U="ngth";var a7i="focu";var k5F="ed";var o7F="x";var i1U="top";var t2U='bubble';var A4F="d_Name_";var v6F="fau";var W3i='am';var C0i="_submitError";var B2i="format";var G3i='December';var L5U="form";var n7p="disable";var C3U="ra";var x8i="cells";var Y2F="<div ";var D4F="DTE_Bub";var M3U='body';var C6U="editFields";var w3U="_heightCalc";var E0U="ity";var r3i="Edit entry";var a9F="mul";var q6F="ne";var h0l='</tr>';var u5i='-time';var W4F="E_Field_";var s0F="A system error has occurred (<a target=\"_blank\" href=\"//datatabl";var W9F="Field";var Y0F="formOptio";var y1p="ces";var S6i="stopPropagation";var T7U="_multiValueCheck";var v2U="bmi";var R3F="rototype";var o7i="ment";var N7F="defa";var z7p="date";var X2U="rray";var V9i="ime";var J3p="val";var u7U="_t";var i7F="S";var n7i="oc";var q7p="disa";var N8F="nt";var j5U="tt";var n7F="lts";var R5U="e.";var w7i="opt";var z2F="\"/";var J8i="any";var j4l="getFullYear";var W5U="ur";var Z0p="ope";var n7l="setUTCDate";var q8F="stroy";var X2p="err";var E9F="ject";var g4F="DTE";var S2F="Fie";var T7F=".";var E4F="sto";var s4i="idSrc";var R4U="mp";var X3F="ype";var G6U="ll";var O2p="unshift";var N6l="editorFields";var X0F="tion";var w3i="Update";var r4p="isA";var m2U="<div";var b3F="Id";var J9F="gth";var t9p="idS";var N4p='div.';var A6U="_tidy";var r0F="ns";var G2U="su";var E2F="\" ";var R1p="orm";var T1F="Check";var s5i="pu";var l7l='year';var e5F="extend";var X5U="bub";var N3p="bel";var C4p="find";var y8F="in";var B0F="Ja";var H2F="afeI";var L3p="header";var L4U="subm";var U8U="los";var E1i="DTE_Field_Message";var J68=0;var c8F="w";var D1F="ax";var x0F="ond";var N7U="replace";var w4F="DT";var p5F="on";var x5U="eq";var V4F="T";var s8F="ty";var M0F="ions";var W1F="Time";var T5F="title";var c1i="DTE_Field";var t5F="_typeFn";var n5F="css";var A6i="ec";var y6U="vent";var w9U="outerHeight";var C3F="bl";var H9U="cre";var A9p="rc";var S1i="i1";var W4l="sele";var f7U='block';var V2F="ult";var d6F="hasClass";var a3U="ma";var E3F="_f";var J7U="multiValues";var T2U="_dat";var i6U="_e";var A7i="parents";var P2F="ex";var f0F="This input can be ed";var a4F="Error";var k7i="process";var P6F="error";var A3F="_b";var J1F="Ed";var d3F="lur";var k2F="tend";var R4F="E ";var O0i="<b";var Q3i="Undo changes";var m68=59;var T3F="otyp";var t0F="ited individually, but not part";var e7F="DD";var z1F="dito";var i0U="background";var z2U="blur";var t9F="multi";var Z2F="Name";var g2F="\"";var S7F="n";var w4l="getUTCFullYear";var B0p="disp";var q3F="ototyp";var g6p="ncti";var O7p='label';var x7l="tes";var z3p="Api";var s0l="setDate";var F8p="pen";var y2U="ct";var U0F="ext";var W1p="em";var q7F="YY";var F0U="ho";var C0p="slice";var O2U="_displayReorder";var b7p="dependent";var Z4F="_Info";var t2p="clo";var Z8U="ild";var z9p="pla";var p7p="lds";var E1p="ses";var f7p="ear";var o8F="h";var U7U="isMultiValu";var Y3F="_";var q4U="ft";var Y8F="ws().edi";var m7F="ul";var e2p="ly";var R3i="Delete";var v8i="columns";var I7l='seconds';var n9p="res";var q3i="indexes";var T0U="_hide";var U6F="cu";var y3p='row().delete()';var s6l="Ty";var x1U="mate";var v3F="_preop";var v6U='keyup';var K3F="ormOptions";var Y3i="Create";var e4F="rror";var t68=24;var r9F="=\"";var h0U="_dom";var c4l="bled";var a5U="_close";var N4F="TE";var o68=20;var z68=I7F;z68+=T7F;z68+=g71.v7F;z68+=H7F;var h68=E7F;h68+=K7F;var L68=W7F;L68+=a7F;L68+=i7F;var x68=y7F;x68+=Z7F;var v68=B7F;v68+=o7F;v68+=g71.X7F;var X68=f7F;X68+=t7F;X68+=A7F;var F68=B7F;F68+=d7F;var L08=g71.h7F;L08+=l7F;L08+=C7F;L08+=n7F;var x08=q7F;x08+=s7F;x08+=e7F;var v08=N7F;v08+=m7F;v08+=p7F;var Q08=P7F;Q08+=g71.x7F;Q08+=S7F;Q08+=k7F;var p8M=V7F;p8M+=u4F;p8M+=B7F;var u3M=g4F;u3M+=b4F;var V0M=M4F;V0M+=U4F;var k0M=D4F;k0M+=j4F;k0M+=Y4F;k0M+=r4F;var S0M=w4F;S0M+=R4F;S0M+=F4F;S0M+=X4F;var P0M=O4F;P0M+=Q4F;P0M+=S7F;P0M+=v4F;var p0M=x4F;p0M+=L4F;var m0M=O4F;m0M+=h4F;m0M+=z4F;m0M+=J4F;var N0M=G4F;N0M+=c4F;N0M+=g71.h7F;var e0M=I4F;e0M+=T4F;e0M+=g71.X7F;var s0M=g71.L7F;s0M+=H4F;s0M+=E4F;s0M+=K4F;var q0M=w4F;q0M+=W4F;q0M+=a4F;var n0M=O4F;n0M+=i4F;n0M+=y4F;n0M+=Z4F;var C0M=O4F;C0M+=B4F;var l0M=o4F;l0M+=f4F;var d0M=t4F;d0M+=A4F;var A0M=d4F;A0M+=g71.X7F;A0M+=S7F;var t0M=l4F;t0M+=S7F;var f0M=C4F;f0M+=g71.L7F;f0M+=n4F;var o0M=q4F;o0M+=s4F;o0M+=e4F;var B0M=O4F;B0M+=N4F;B0M+=m4F;var Z0M=w4F;Z0M+=p4F;Z0M+=r4F;var y0M=g4F;y0M+=P4F;y0M+=S4F;y0M+=k4F;var i0M=O4F;i0M+=V4F;i0M+=z4F;var k6V=u0F;k6V+=g0F;k6V+=b0F;k6V+=M0F;var S6V=U0F;S6V+=D0F;var P6V=g71.F7F;P6V+=j0F;var p6V=Y0F;p6V+=r0F;var m6V=w0F;m6V+=R0F;var N6V=F0F;N6V+=X0F;N6V+=O0F;var e6V=B7F;e6V+=Q0F;var s6V=v0F;s6V+=x0F;var q6V=L0F;q6V+=g71.w7F;q6V+=C7F;q6V+=h0F;var n6V=z0F;n6V+=g71.L7F;var C6V=i7F;C6V+=J0F;var l6V=G0F;l6V+=c0F;l6V+=I0F;l6V+=h0F;var d6V=T0F;d6V+=H0F;var A6V=E0F;A6V+=C7F;A6V+=y4F;A6V+=K0F;var t6V=W0F;t6V+=g71.x7F;t6V+=K0F;var f6V=a0F;f6V+=z0F;f6V+=i0F;f6V+=y4F;var o6V=y0F;o6V+=Z0F;o6V+=h0F;o6V+=K0F;var B6V=B0F;B6V+=o0F;var Z6V=f0F;Z6V+=t0F;Z6V+=A0F;Z6V+=d0F;var y6V=l0F;y6V+=C0F;y6V+=n0F;y6V+=q0F;var i6V=s0F;i6V+=e0F;i6V+=N0F;i6V+=m0F;var a6V=O4F;a6V+=B7F;a6V+=c4F;a6V+=p0F;var W6V=z4F;W6V+=g71.h7F;W6V+=P0F;W6V+=g71.X7F;var K6V=S0F;K6V+=k0F;K6V+=V0F;K6V+=K0F;var E6V=u3F;E6V+=g3F;E6V+=b3F;var H6V=M3F;H6V+=U3F;var I6V=D3F;I6V+=j3F;I6V+=K0F;var r6V=Y3F;r6V+=r3F;r6V+=w3F;var M6V=z0F;M6V+=R3F;var q2V=F3F;q2V+=g71.w7F;q2V+=g71.X7F;q2V+=X3F;var V9V=z0F;V9V+=O3F;V9V+=Q3F;var f9V=v3F;f9V+=x3F;var J9V=z0F;J9V+=L3F;J9V+=h3F;J9V+=z3F;var x9V=J3F;x9V+=g71.w7F;x9V+=G3F;x9V+=c3F;var D9V=I3F;D9V+=g71.X7F;D9V+=T3F;D9V+=B7F;var V1V=z0F;V1V+=O3F;V1V+=Q3F;var l1V=z0F;l1V+=h0F;l1V+=H3F;l1V+=X3F;var f8V=E3F;f8V+=K3F;var o8V=z0F;o8V+=O3F;o8V+=W3F;o8V+=X3F;var E8V=a3F;E8V+=z0F;E8V+=B7F;var c8V=J3F;c8V+=H3F;c8V+=X3F;var L8V=i3F;L8V+=X3F;var j8V=y3F;j8V+=Z3F;var y3V=B3F;y3V+=o3F;var i3V=z0F;i3V+=f3F;i3V+=B7F;var Q3V=Y3F;Q3V+=g71.h7F;Q3V+=g71.x7F;Q3V+=t3F;var w3V=J3F;w3V+=H3F;w3V+=K0F;w3V+=z3F;var p0V=A3F;p0V+=d3F;var m0V=I3F;m0V+=Q3F;var d0V=l3F;d0V+=C3F;d0V+=n3F;var B0V=z0F;B0V+=h0F;B0V+=q3F;B0V+=B7F;var S4V=a3F;S4V+=z3F;var l4V=s3F;l4V+=e3F;var d4V=F3F;d4V+=h3F;d4V+=z0F;d4V+=B7F;var R7V=N3F;R7V+=m3F;R7V+=p3F;R7V+=P3F;var U6b=C7F;U6b+=S3F;U6b+=g71.w7F;U6b+=k3F;var k5b=z0F;k5b+=V3F;k5b+=O0F;var P5b=B7F;P5b+=h0F;P5b+=O3F;P5b+=h0F;var n5b=u8F;n5b+=g8F;n5b+=g71.X7F;var C5b=g71.w7F;C5b+=S7F;var l5b=b8F;l5b+=M8F;l5b+=U8F;var A5b=D8F;A5b+=j8F;var y5b=O3F;y5b+=Y8F;y5b+=r8F;var W5b=w8F;W5b+=g71.h7F;W5b+=o3F;W5b+=R8F;var H5b=F8F;H5b+=X8F;H5b+=U8F;var T5b=O8F;T5b+=R8F;var O5b=K4F;O5b+=Q8F;O5b+=v8F;O5b+=r4F;var X5b=a0F;X5b+=z0F;X5b+=P0F;var b5b=g71.X7F;b5b+=P0F;b5b+=x8F;b5b+=B7F;var u5b=g71.X7F;u5b+=L8F;u5b+=y4F;u5b+=h8F;var V2b=J3F;V2b+=z8F;V2b+=z8F;V2b+=X3F;var C2b=O0F;C2b+=J8F;C2b+=g71.L7F;C2b+=o3F;var l2b=F3F;l2b+=T3F;l2b+=B7F;var t2b=G8F;t2b+=c8F;var f2b=a3F;f2b+=z3F;var F2b=z0F;F2b+=O3F;F2b+=g71.X7F;F2b+=I8F;var s9b=T8F;s9b+=x3F;var C9b=J3F;C9b+=H8F;C9b+=c3F;var d9b=g71.w7F;d9b+=S7F;var t9b=z0F;t9b+=R3F;var T9b=E8F;T9b+=B7F;T9b+=g71.X7F;var I9b=I3F;I9b+=Q3F;var h9b=I3F;h9b+=K8F;h9b+=B7F;var x9b=I3F;x9b+=g71.X7F;x9b+=T3F;x9b+=B7F;var R9b=W8F;R9b+=O0F;R9b+=O0F;R9b+=a8F;var w9b=I3F;w9b+=G3F;w9b+=c3F;var I1b=i8F;I1b+=B7F;var L1b=y8F;L1b+=z4F;L1b+=Z8F;L1b+=P3F;var x1b=P0F;x1b+=g71.h7F;x1b+=O0F;var v1b=B8F;v1b+=c3F;var O1b=o8F;O1b+=f8F;O1b+=B7F;var X1b=I3F;X1b+=K8F;X1b+=B7F;var j1b=z0F;j1b+=t8F;j1b+=X3F;var D1b=g71.O7F;D1b+=P0F;D1b+=c4F;D1b+=O0F;var U1b=A8F;U1b+=B7F;var b1b=i3F;b1b+=d8F;b1b+=B7F;var V8b=g71.O7F;V8b+=l8F;V8b+=g71.h7F;var k8b=z0F;k8b+=R3F;var m8b=B7F;m8b+=Z8F;m8b+=P3F;var q8b=C8F;q8b+=c4F;var n8b=z0F;n8b+=O3F;n8b+=K8F;n8b+=B7F;var f8b=z0F;f8b+=R3F;var E8b=I3F;E8b+=g71.X7F;E8b+=I8F;var v8b=n8F;v8b+=q8F;var Q8b=J3F;Q8b+=H8F;Q8b+=s8F;Q8b+=z3F;var Z3b=C7F;Z3b+=S7F;Z3b+=e8F;Z3b+=N8F;var x3b=m8F;x3b+=B7F;x3b+=J0F;x3b+=B7F;var v3b=F3F;v3b+=h3F;v3b+=z3F;var Y3b=g71.F7F;Y3b+=p8F;Y3b+=h0F;var Y0b=P8F;Y0b+=S8F;var j0b=k8F;j0b+=B7F;var M4b=V8F;M4b+=c4F;var p7b=u1F;p7b+=g1F;p7b+=b1F;p7b+=M1F;var m7b=k8F;m7b+=B7F;var N7b=U1F;N7b+=D1F;var T7b=g71.x7F;T7b+=g71.h7F;T7b+=g71.h7F;var I7b=F3F;I7b+=I8F;var z9P=h0F;z9P+=g3F;var h9P=g71.x7F;h9P+=y4F;h9P+=y4F;var L9P=j1F;L9P+=g71.F7F;L9P+=C7F;L9P+=O0F;var x9P=Y1F;x9P+=r1F;var v9P=w1F;v9P+=g71.X7F;var Q9P=R1F;Q9P+=n8F;Q9P+=y4F;Q9P+=O0F;var O9P=F1F;O9P+=K0F;O9P+=z0F;O9P+=B7F;var X9P=R1F;X9P+=g71.h7F;X9P+=t7F;X9P+=O0F;var F9P=g71.h7F;F9P+=g71.w7F;F9P+=g71.L7F;var R9P=g71.L7F;R9P+=g71.w7F;R9P+=n8F;R9P+=X1F;var w9P=g71.L7F;w9P+=O1F;var r9P=g71.X7F;r9P+=B7F;r9P+=o7F;r9P+=g71.X7F;var Y9P=Q1F;Y9P+=O0F;var j9P=y0F;j9P+=v1F;j9P+=x1F;var D9P=L1F;D9P+=t7F;D9P+=O0F;var U9P=y0F;U9P+=P0F;U9P+=h1F;var y3P=I3F;y3P+=g71.X7F;y3P+=h3F;y3P+=z3F;var g0P=z4F;g0P+=z1F;g0P+=h0F;var u0P=g71.O7F;u0P+=S7F;var V4P=J1F;V4P+=G1F;V4P+=h0F;var P4P=I7F;P4P+=T7F;P4P+=I7F;P4P+=c1F;var p4P=I1F;p4P+=T1F;var m4P=H1F;m4P+=E1F;m4P+=C3F;m4P+=B7F;'use strict';g71.Y4P=function(j4P){if(g71)return g71.p5(j4P);};g71.f7P=function(o7P){if(g71)return g71.P5(o7P);};g71.K7P=function(E7P){if(g71&&E7P)return g71.P5(E7P);};(function(){var f1F="b754";var q1F=" remain";var y1F="7";var P1F=' day';var t1F="Editor - Trial exp";var n1F='for Editor, please see https://editor.datatables.net/purchase';var i1F="5";var K1F="62";var A1F="ired";var Z1F="84";var e1F="DataTables Editor trial info";var a1F="etTime";var d1F="6";var o1F="683c";var p1F="b4fb";var N1F=" - ";var D7F=1566345600;var m1F="53ac";var l1F='Thank you for trying DataTables Editor\n\n';var b7F=1000;var C1F='Your trial has now expired. To purchase a license ';var M7F=8792;var C4P=K1F;C4P+=g71.Q7F;var l4P=Q8F;l4P+=B7F;l4P+=g71.X7F;l4P+=W1F;var d4P=Q8F;d4P+=a1F;var A4P=i1F;A4P+=y1F;A4P+=g71.x7F;A4P+=I7F;var t4P=g71.h7F;t4P+=g71.F7F;t4P+=Z1F;var f4P=g71.F7F;f4P+=B7F;f4P+=B1F;g71.y4P=function(i4P){if(g71)return g71.P5(i4P);};g71.I4P=function(c4P){if(g71&&c4P)return g71.P5(c4P);};g71.v4P=function(Q4P){if(g71&&Q4P)return g71.P5(Q4P);};var remaining=Math[g71.K7P(o1F)?f4P:g71.r7F]((new Date(D7F*(g71.f7P(t4P)?b7F:M7F))[g71.s7P(A4P)?d4P:g71.r7F]()-new Date()[g71.V7P(f1F)?l4P:g71.r7F]())/(b7F*p68*p68*t68));g71[g71.Y4P(C4P)?g71.Y7F:g71.r7F]();if(remaining<=J68){var q4P=t1F;q4P+=A1F;var n4P=i1F;n4P+=y1F;n4P+=g71.O7F;n4P+=d1F;alert((g71.v4P(n4P)?l1F:g71.r7F)+C1F+n1F);throw q4P;}else if(remaining<=E68){var N4P=q1F;N4P+=P0F;N4P+=s1F;var e4P=e1F;e4P+=N1F;var s4P=y4F;s4P+=g71.w7F;s4P+=Q8F;console[g71.I4P(m1F)?g71.r7F:s4P]((g71.y4P(p1F)?e4P:g71.r7F)+remaining+P1F+(remaining===G68?S1F:k1F)+N4P);}}());var DataTable=$[V1F][m4P];if(!DataTable||!DataTable[p4P]||!DataTable[u9F](P4P)){throw g9F;}var Editor=function(opts){var b9F="ataTables Editor must be initialised as a 'new' instance'";var M9F="_constructor";var S4P=o8F;S4P+=g71.v7F;g71[S4P]();if(!(this instanceof Editor)){var k4P=O4F;k4P+=b9F;alert(k4P);}this[M9F](opts);};DataTable[V4P]=Editor;$[u0P][U9F][g0P]=Editor;var _editor_el=function(dis,ctx){var D9F="*";var Y9F="a-dte-e";var j9F="[dat";var M0P=D9F;M0P+=j9F;M0P+=Y9F;M0P+=r9F;var b0P=a0F;b0P+=g71.v7F;if(ctx===undefined){ctx=document;}g71[b0P]();return $(M0P+dis+w9F,ctx);};var __inlineCounter=J68;var _pluck=function(a,prop){var U0P=B7F;U0P+=R9F;g71[F9F]();var out=[];$[U0P](a,function(idx,el){var D0P=z0F;D0P+=C7F;D0P+=O0F;D0P+=o8F;g71[g71.Y7F]();out[D0P](el[prop]);});return out;};var _api_file=function(name,id){var Q9F="e ";var X9F=" in";var O9F=" ta";var v9F='Unknown file id ';g71[g71.Y7F]();var table=this[b8F](name);var file=table[id];if(!file){var j0P=X9F;j0P+=O9F;j0P+=C3F;j0P+=Q9F;throw v9F+id+j0P+name;}return table[id];};var _api_files=function(name){var x9F='Unknown file table name: ';var r0P=g71.O7F;r0P+=P0F;r0P+=Z7F;var Y0P=a0F;Y0P+=g71.v7F;if(!name){return Editor[b8F];}g71[Y0P]();var table=Editor[r0P][name];if(!table){throw x9F+name;}return table;};var _objectKeys=function(o){var L9F="hasOwnProperty";var out=[];for(var key in o){if(o[L9F](key)){out[h9F](key);}}return out;};var _deepCompare=function(o1,o2){var H9F="ob";var c9F="jec";var X0P=z9F;X0P+=J9F;var F0P=z9F;F0P+=J9F;var R0P=y4F;R0P+=B7F;R0P+=s1F;R0P+=G9F;var w0P=g71.w7F;w0P+=d4F;w0P+=c9F;w0P+=g71.X7F;g71[g71.Y7F]();if(typeof o1!==I9F||typeof o2!==w0P){return o1==o2;}var o1Props=_objectKeys(o1);var o2Props=_objectKeys(o2);if(o1Props[R0P]!==o2Props[F0P]){return T9F;}for(var i=J68,ien=o1Props[X0P];i<ien;i++){var O0P=H9F;O0P+=E9F;var propName=o1Props[i];if(typeof o1[propName]===O0P){if(!_deepCompare(o1[propName],o2[propName])){return T9F;}}else if(o1[propName]!=o2[propName]){return T9F;}}return K9F;};Editor[W9F]=function(opts,classes,host){var U2F="ms";var i9F="Return";var L2F="lti-va";var P9F="<div data-dte-e=\"field-processing\" cl";var W2F="<la";var C2F="_fnSetObj";var y5F='msg-error';var i5F='<div data-dte-e="msg-error" class="';var o9F="multi-";var A2F="typePref";var h2F="lue\" class=\"";var Q2F="multiV";var N5F='msg-message';var Z9F="field-p";var r2F="data-dte-e=\"ms";var H5F='<span data-dte-e="multi-info" class="';var G5F='<div data-dte-e="input" class="';var M5F="Error adding field - unknown field type ";var N2F="taP";var A9F="-val";var F2F="rest";var d5F="control";var o5F='msg-info';var a2F="bel data-dt";var q5F="none";var L5F='msg-label';var G2F="v data-dte-e=\"input-control\" class=\"";var K2F="for=";var O2F="pan";var Z5F='"></div>';var l9F="msg-e";var V9F="/di";var i2F="e-e=\"label\" class=\"";var g5F="defaults";var n2F="ectDataFn";var f9F="inf";var a5F="multiRestore";var o2F="Pr";var j5F="taPr";var D5F='DTE_Field_';var x2F="<div data-dte-e=\"mu";var M2F="essa";var v2F="alue";var q9F="input-";var B5F='<div data-dte-e="msg-info" class="';var N9F="\"><span/><";var I2F="a-dte-e=\"msg-label\" class=\"";var m5F='msg-multi';var s2F="alFrom";var w2F="-message\" class=\"";var d2F="ix";var W5F='<div data-dte-e="msg-multi" class="';var E3P=g71.X7F;E3P+=K0F;E3P+=z3F;var H3P=g71.w7F;H3P+=S7F;var T3P=a9F;T3P+=r3F;T3P+=i9F;var I3P=g71.h7F;I3P+=g71.w7F;I3P+=g71.L7F;var h3P=g71.F7F;h3P+=y4F;h3P+=y9F;h3P+=g1F;var L3P=Z9F;L3P+=B9F;var x3P=o9F;x3P+=f9F;x3P+=g71.w7F;var v3P=t9F;v3P+=A9F;v3P+=d9F;var Q3P=l9F;Q3P+=C9F;Q3P+=h0F;var O3P=n9F;O3P+=d4F;O3P+=t7F;var X3P=q9F;X3P+=g71.F7F;X3P+=s9F;var F3P=g71.h7F;F3P+=e9F;var R3P=R1F;R3P+=g71.h7F;R3P+=t7F;R3P+=O0F;var Y3P=g71.F7F;Y3P+=K4F;Y3P+=J0F;Y3P+=B7F;var j3P=N9F;j3P+=m9F;j3P+=p9F;var D3P=z0F;D3P+=B9F;var U3P=P9F;U3P+=S9F;var M3P=k9F;M3P+=V9F;M3P+=u2F;var b3P=g2F;b3P+=b2F;var g3P=g71.L7F;g3P+=M2F;g3P+=Q8F;g3P+=B7F;var u3P=g2F;u3P+=b2F;var V0P=U2F;V0P+=Q8F;V0P+=D2F;V0P+=j2F;var k0P=Y2F;k0P+=r2F;k0P+=Q8F;k0P+=w2F;var S0P=R2F;S0P+=u2F;var P0P=F2F;P0P+=g71.w7F;P0P+=K4F;var p0P=g2F;p0P+=b2F;var m0P=X2F;m0P+=O0F;m0P+=O2F;m0P+=b2F;var N0P=Q2F;N0P+=v2F;var e0P=x2F;e0P+=L2F;e0P+=h2F;var s0P=z2F;s0P+=b2F;var q0P=J2F;q0P+=G2F;var n0P=g2F;n0P+=b2F;var C0P=c2F;C0P+=I2F;var l0P=T2F;l0P+=t7F;var d0P=O0F;d0P+=H2F;d0P+=g71.h7F;var A0P=E2F;A0P+=K2F;A0P+=g2F;var t0P=W2F;t0P+=a2F;t0P+=i2F;var f0P=g2F;f0P+=b2F;var o0P=y2F;o0P+=O0F;o0P+=O0F;o0P+=Z2F;var B0P=S7F;B0P+=g71.x7F;B0P+=g71.L7F;B0P+=B7F;var Z0P=B2F;Z0P+=o2F;Z0P+=f2F;var y0P=t2F;y0P+=B7F;var i0P=A2F;i0P+=d2F;var a0P=l2F;a0P+=z0F;a0P+=B7F;a0P+=h0F;var W0P=H1F;W0P+=g71.X7F;W0P+=g71.x7F;var K0P=C2F;K0P+=n2F;var H0P=q2F;H0P+=s2F;H0P+=e2F;var c0P=H1F;c0P+=N2F;c0P+=m2F;var J0P=S7F;J0P+=p2F;J0P+=B7F;var z0P=g71.X7F;z0P+=K0F;z0P+=z0F;z0P+=B7F;var h0P=P2F;h0P+=p0F;h0P+=S7F;h0P+=g71.h7F;var L0P=s8F;L0P+=z0F;L0P+=B7F;var x0P=S2F;x0P+=x1F;var v0P=P2F;v0P+=k2F;var Q0P=g71.L7F;Q0P+=V2F;Q0P+=P0F;var that=this;var multiI18n=host[u5F][Q0P];opts=$[v0P](K9F,{},Editor[x0P][g5F],opts);if(!Editor[b5F][opts[L0P]]){throw M5F+opts[c3F];}this[O0F]=$[h0P]({},Editor[W9F][U5F],{type:Editor[b5F][opts[z0P]],name:opts[J0P],classes:classes,host:host,opts:opts,multiValue:T9F});if(!opts[f8F]){var G0P=P0F;G0P+=g71.h7F;opts[G0P]=D5F+opts[B2F];}if(opts[c0P]){var T0P=H1F;T0P+=j5F;T0P+=T8F;var I0P=g71.h7F;I0P+=g71.x7F;I0P+=g71.X7F;I0P+=g71.x7F;opts[I0P]=opts[T0P];}if(opts[Y5F]===S1F){opts[Y5F]=opts[B2F];}var dtPrivateApi=DataTable[U0F][r5F];this[H0P]=function(d){var R5F="bjectDataF";var w5F="_fnGetO";var F5F='editor';var E0P=w5F;E0P+=R5F;E0P+=S7F;return dtPrivateApi[E0P](opts[Y5F])(d,F5F);};this[X5F]=dtPrivateApi[K0P](opts[W0P]);var template=$(O5F+classes[a0P]+Q5F+classes[i0P]+opts[y0P]+Q5F+classes[Z0P]+opts[B0P]+Q5F+opts[o0P]+f0P+t0P+classes[v5F]+A0P+Editor[d0P](opts[f8F])+x5F+opts[l0P]+C0P+classes[L5F]+x5F+opts[h5F]+z5F+J5F+G5F+classes[c5F]+n0P+q0P+classes[I5F]+s0P+e0P+classes[N0P]+x5F+multiI18n[T5F]+H5F+classes[E5F]+x5F+multiI18n[K5F]+m0P+z5F+W5F+classes[a5F]+p0P+multiI18n[P0P]+S0P+i5F+classes[y5F]+Z5F+k0P+classes[V0P]+u3P+opts[g3P]+z5F+B5F+classes[o5F]+b3P+opts[f5F]+M3P+z5F+U3P+classes[D3P]+j3P+z5F);var input=this[t5F](Y3P,opts);if(input!==A5F){var r3P=q9F;r3P+=d5F;_editor_el(r3P,template)[l5F](input);}else{var w3P=g71.h7F;w3P+=C5F;template[n5F](w3P,q5F);}this[s5F]=$[e5F](K9F,{},Editor[W9F][R3P][F3P],{container:template,inputControl:_editor_el(X3P,template),label:_editor_el(O3P,template),fieldInfo:_editor_el(o5F,template),labelInfo:_editor_el(L5F,template),fieldError:_editor_el(Q3P,template),fieldMessage:_editor_el(N5F,template),multi:_editor_el(v3P,template),multiReturn:_editor_el(m5F,template),multiInfo:_editor_el(x3P,template),processing:_editor_el(L3P,template)});this[s5F][t9F][p5F](h3P,function(){var S5F="sab";var J3P=P5F;J3P+=S5F;J3P+=y4F;J3P+=k5F;var z3P=V5F;z3P+=u6F;if(that[O0F][g6F][b6F]&&!template[z3P](classes[J3P])&&opts[c3F]!==M6F){var c3P=g71.O7F;c3P+=g71.w7F;c3P+=U6F;c3P+=O0F;var G3P=q2F;G3P+=g71.x7F;G3P+=y4F;that[G3P](S1F);that[c3P]();}});this[I3P][T3P][H3P](D6F,function(){that[a5F]();});$[j6F](this[O0F][E3P],function(name,fn){var K3P=Y6F;K3P+=r6F;K3P+=S7F;if(typeof fn===K3P&&that[name]===undefined){that[name]=function(){var w6F="ply";var i3P=g71.x7F;i3P+=z0F;i3P+=w6F;var a3P=R6F;a3P+=F6F;var W3P=O0F;W3P+=X6F;W3P+=k7F;var args=Array[O6F][W3P][Q6F](arguments);g71[g71.Y7F]();args[a3P](name);var ret=that[t5F][i3P](that,args);return ret===undefined?that:ret;};}});};Editor[W9F][y3P]={def:function(set){var x6F="fa";var t3P=g71.h7F;t3P+=B7F;t3P+=g71.O7F;var B3P=a0F;B3P+=g71.v7F;var Z3P=T8F;Z3P+=p7F;var opts=this[O0F][Z3P];g71[B3P]();if(set===undefined){var f3P=n8F;f3P+=v6F;f3P+=y4F;f3P+=g71.X7F;var o3P=n8F;o3P+=x6F;o3P+=m7F;o3P+=g71.X7F;var def=opts[o3P]!==undefined?opts[f3P]:opts[M3F];return typeof def===g71.G7F?def():def;}opts[t3P]=set;return this;},disable:function(){var h6F="ntai";var d3P=Y3F;d3P+=g71.X7F;d3P+=X3F;d3P+=L6F;var A3P=g71.F7F;A3P+=g71.w7F;A3P+=h6F;A3P+=z6F;this[s5F][A3P][J6F](this[O0F][G6F][c6F]);this[d3P](I6F);return this;},displayed:function(){var s3P=P5F;s3P+=T6F;s3P+=H6F;var q3P=E6F;q3P+=o8F;var n3P=K6F;n3P+=K0F;var C3P=z0F;C3P+=W6F;C3P+=g71.X7F;C3P+=O0F;var l3P=g71.h7F;l3P+=e9F;var container=this[l3P][a6F];return container[C3P](n3P)[q3P]&&container[n5F](s3P)!=i6F?K9F:T9F;},enable:function(){var m3P=Y1F;m3P+=y6F;var N3P=Z6F;N3P+=B6F;var e3P=a0F;e3P+=g71.v7F;g71[e3P]();this[s5F][N3P][o6F](this[O0F][m3P][c6F]);this[t5F](f6F);return this;},enabled:function(){var P3P=g71.F7F;P3P+=t6F;P3P+=B7F;P3P+=O0F;var p3P=A6F;p3P+=y8F;p3P+=r4F;return this[s5F][p3P][d6F](this[O0F][P3P][c6F])===T9F;},error:function(msg,fn){var l6F="errorMessag";var M8P=g71.h7F;M8P+=g71.w7F;M8P+=g71.L7F;var b8P=Y3F;b8P+=g71.L7F;b8P+=O0F;b8P+=Q8F;var g8P=l6F;g8P+=B7F;var S3P=g71.F7F;S3P+=C6F;S3P+=O0F;var classes=this[O0F][S3P];if(msg){var V3P=r4F;V3P+=O3F;V3P+=h0F;var k3P=g71.F7F;k3P+=n6F;k3P+=q6F;k3P+=h0F;this[s5F][k3P][J6F](classes[V3P]);}else{var u8P=r4F;u8P+=h0F;u8P+=g71.w7F;u8P+=h0F;this[s5F][a6F][o6F](classes[u8P]);}g71[g71.Y7F]();this[t5F](g8P,msg);return this[b8P](this[M8P][s6F],msg,fn);},fieldInfo:function(msg){var D8P=g71.h7F;D8P+=g71.w7F;D8P+=g71.L7F;var U8P=Y3F;U8P+=g71.L7F;U8P+=O0F;U8P+=Q8F;g71[F9F]();return this[U8P](this[D8P][f5F],msg);},isMultiValue:function(){var j8P=c4F;j8P+=S7F;j8P+=Q8F;j8P+=G9F;return this[O0F][e6F]&&this[O0F][N6F][j8P]!==G68;},inError:function(){var r8P=m6F;r8P+=U4F;r8P+=O0F;var Y8P=p6F;Y8P+=g71.L7F;g71[F9F]();return this[Y8P][a6F][d6F](this[O0F][r8P][P6F]);},input:function(){var F8P=p6F;F8P+=g71.L7F;var R8P=y8F;R8P+=f4F;var w8P=s8F;w8P+=z3F;g71[F9F]();return this[O0F][w8P][c5F]?this[t5F](R8P):$(S6F,this[F8P][a6F]);},focus:function(){var g7U="ypeFn";var O8P=g71.O7F;O8P+=k6F;O8P+=O0F;var X8P=t2F;X8P+=B7F;g71[F9F]();if(this[O0F][X8P][O8P]){var v8P=g71.O7F;v8P+=g71.w7F;v8P+=g71.F7F;v8P+=V6F;var Q8P=u7U;Q8P+=g7U;this[Q8P](v8P);}else{var L8P=b7U;L8P+=g71.X7F;L8P+=B6F;var x8P=g71.h7F;x8P+=g71.w7F;x8P+=g71.L7F;$(S6F,this[x8P][L8P])[M7U]();}return this;},get:function(){var D7U='get';var h8P=U7U;h8P+=B7F;if(this[h8P]()){return undefined;}var val=this[t5F](D7U);return val!==undefined?val:this[M3F]();},hide:function(animate){var J8P=o8F;J8P+=g71.v7F;var el=this[s5F][a6F];if(animate===undefined){animate=K9F;}if(this[O0F][j7U][Y7U]()&&animate&&$[V1F][r7U]){el[r7U]();}else{var z8P=g71.F7F;z8P+=O0F;z8P+=O0F;el[z8P](w7U,i6F);}g71[J8P]();return this;},label:function(str){var T8P=R7U;T8P+=z3F;T8P+=R0F;var I8P=o8F;I8P+=F7U;I8P+=y4F;var G8P=X7U;G8P+=y4F;var label=this[s5F][G8P];var labelInfo=this[s5F][h5F][O7U]();if(str===undefined){var c8P=o8F;c8P+=g71.X7F;c8P+=Q7U;return label[c8P]();}label[I8P](str);label[T8P](labelInfo);return this;},labelInfo:function(msg){var x7U="_msg";var v7U="lInfo";var E8P=X7U;E8P+=v7U;var H8P=o8F;H8P+=g71.v7F;g71[H8P]();return this[x7U](this[s5F][E8P],msg);},message:function(msg,fn){var L7U="_m";var h7U="fieldMessage";var K8P=L7U;K8P+=O0F;K8P+=Q8F;return this[K8P](this[s5F][h7U],msg,fn);},multiGet:function(id){var z7U="iI";var y8P=a0F;y8P+=g71.v7F;var W8P=a9F;W8P+=g71.X7F;W8P+=z7U;W8P+=A7F;var value;var multiValues=this[O0F][J7U];var multiIds=this[O0F][W8P];var isMultiValue=this[G7U]();if(id===undefined){var a8P=q2F;a8P+=g71.x7F;a8P+=y4F;var fieldVal=this[a8P]();value={};for(var i=J68;i<multiIds[c7U];i++){value[multiIds[i]]=isMultiValue?multiValues[multiIds[i]]:fieldVal;}}else if(isMultiValue){value=multiValues[id];}else{var i8P=q2F;i8P+=I7U;value=this[i8P]();}g71[y8P]();return value;},multiRestore:function(){g71[F9F]();this[O0F][e6F]=K9F;this[T7U]();},multiSet:function(id,val){var H7U="_mu";var K7U="lueChe";var E7U="ltiVa";var a7U="ltiValu";var o8P=H7U;o8P+=E7U;o8P+=K7U;o8P+=W7U;var B8P=g71.L7F;B8P+=C7F;B8P+=a7U;B8P+=B7F;var multiValues=this[O0F][J7U];var multiIds=this[O0F][N6F];if(val===undefined){val=id;id=undefined;}var set=function(idSrc,val){if($[i7U](multiIds)===-G68){multiIds[h9F](idSrc);}multiValues[idSrc]=val;};if($[y7U](val)&&id===undefined){$[j6F](val,function(idSrc,innerVal){g71[F9F]();set(idSrc,innerVal);});}else if(id===undefined){var Z8P=S4F;Z8P+=g71.F7F;Z8P+=o8F;$[Z8P](multiIds,function(i,idSrc){set(idSrc,val);});}else{set(id,val);}this[O0F][B8P]=K9F;this[o8P]();return this;},name:function(){var t8P=g71.w7F;t8P+=z0F;t8P+=g71.X7F;t8P+=O0F;var f8P=a0F;f8P+=g71.v7F;g71[f8P]();return this[O0F][t8P][B2F];},node:function(){g71[F9F]();return this[s5F][a6F][J68];},processing:function(set){var o7U="cessing";var C8P=Z7U;C8P+=S7F;C8P+=B7F;var l8P=g71.h7F;l8P+=B7U;l8P+=S3F;l8P+=H6F;var d8P=g71.F7F;d8P+=e3F;var A8P=J3F;A8P+=g71.w7F;A8P+=o7U;this[s5F][A8P][d8P](l8P,set?f7U:C8P);return this;},set:function(val,multiCheck){var b4U='set';var A7U="pts";var V7U="entityDecode";var P8P=Y3F;P8P+=g71.X7F;P8P+=d8F;P8P+=t7U;var m8P=g71.w7F;m8P+=A7U;var N8P=d7U;N8P+=l7U;var decodeFn=function(d){var k7U='\n';var S7U='\'';var P7U='"';var e7U='>';var m7U='<';var C7U="replac";var e8P=C7U;e8P+=B7F;var s8P=n7U;s8P+=q7U;s8P+=B7F;var q8P=s7U;q8P+=i0F;q8P+=s1F;var n8P=o8F;n8P+=g71.v7F;g71[n8P]();return typeof d!==q8P?d:d[s8P](/&gt;/g,e7U)[N7U](/&lt;/g,m7U)[N7U](/&amp;/g,p7U)[e8P](/&quot;/g,P7U)[N7U](/&#39;/g,S7U)[N7U](/&#10;/g,k7U);};this[O0F][N8P]=T9F;var decode=this[O0F][m8P][V7U];if(decode===undefined||decode===K9F){if($[u4U](val)){var p8P=y4F;p8P+=g4U;p8P+=o8F;for(var i=J68,ien=val[p8P];i<ien;i++){val[i]=decodeFn(val[i]);}}else{val=decodeFn(val);}}this[P8P](b4U,val);if(multiCheck===undefined||multiCheck===K9F){this[T7U]();}return this;},show:function(animate){var j4U="slideD";var M4U="slide";var U4U="Dow";var k8P=M4U;k8P+=U4U;k8P+=S7F;var S8P=D4U;S8P+=S3F;S8P+=g71.x7F;S8P+=K0F;g71[F9F]();var el=this[s5F][a6F];if(animate===undefined){animate=K9F;}if(this[O0F][j7U][S8P]()&&animate&&$[V1F][k8P]){var V8P=j4U;V8P+=Y4U;el[V8P]();}else{el[n5F](w7U,S1F);}return this;},val:function(val){var g1P=O0F;g1P+=B7F;g1P+=g71.X7F;var u1P=Q8F;u1P+=r4U;g71[g71.Y7F]();return val===undefined?this[u1P]():this[g1P](val);},compare:function(value,original){var M1P=a0F;M1P+=g71.v7F;var b1P=w4U;b1P+=R4U;b1P+=g71.x7F;b1P+=K4F;var compare=this[O0F][g6F][b1P]||_deepCompare;g71[M1P]();return compare(value,original);},dataSrc:function(){return this[O0F][g6F][Y5F];},destroy:function(){var X4U='destroy';var D1P=Y3F;D1P+=s8F;D1P+=z0F;D1P+=t7U;var U1P=h0F;U1P+=F4U;g71[F9F]();this[s5F][a6F][U1P]();this[D1P](X4U);return this;},multiEditable:function(){var O4U="Editable";var Y1P=t9F;Y1P+=O4U;var j1P=g71.w7F;j1P+=z0F;j1P+=g71.X7F;j1P+=O0F;return this[O0F][j1P][Y1P];},multiIds:function(){return this[O0F][N6F];},multiInfoShown:function(show){var w1P=g71.F7F;w1P+=O0F;w1P+=O0F;var r1P=g71.h7F;r1P+=e9F;this[r1P][E5F][w1P]({display:show?f7U:i6F});},multiReset:function(){var x4U="Ids";var Q4U="iValues";var F1P=d7U;F1P+=Q4U;var R1P=v4U;R1P+=y4F;R1P+=r3F;R1P+=x4U;this[O0F][R1P]=[];this[O0F][F1P]={};},submittable:function(){var X1P=L4U;X1P+=P0F;X1P+=g71.X7F;return this[O0F][g6F][X1P];},valFromData:A5F,valToData:A5F,_errorNode:function(){var O1P=g71.h7F;O1P+=g71.w7F;O1P+=g71.L7F;g71[F9F]();return this[O1P][s6F];},_msg:function(el,msg,fn){var z4U="isible";var E4U="slideDown";var G4U="functio";var z1P=h4U;z1P+=q2F;z1P+=z4U;var h1P=J4U;h1P+=h0F;h1P+=x3F;h1P+=g71.X7F;var v1P=G4U;v1P+=S7F;if(msg===undefined){var Q1P=c4U;Q1P+=Q7U;return el[Q1P]();}if(typeof msg===v1P){var L1P=I4U;L1P+=C3F;L1P+=B7F;var x1P=a0F;x1P+=T4U;var editor=this[O0F][j7U];msg=msg(editor,new DataTable[x1P](editor[O0F][L1P]));}if(el[h1P]()[B7U](z1P)&&$[V1F][H4U]){var J1P=o8F;J1P+=g71.X7F;J1P+=g71.L7F;J1P+=y4F;el[J1P](msg);if(msg){el[E4U](fn);}else{el[r7U](fn);}}else{var G1P=C3F;G1P+=g71.w7F;G1P+=g71.F7F;G1P+=g1F;el[K4U](msg||S1F)[n5F](w7U,msg?G1P:i6F);if(fn){fn();}}return this;},_multiValueCheck:function(){var a4U="ogg";var Z4U="ock";var W4U="multiNoEdi";var y4U="tiInfo";var A4U="ltiI";var t4U="multiEdita";var o4U="ltiRet";var f4U="rn";var l4U="noMulti";var P1P=W4U;P1P+=g71.X7F;var p1P=y2F;p1P+=O0F;p1P+=U4F;p1P+=O0F;var m1P=g71.X7F;m1P+=a4U;m1P+=c4F;m1P+=u6F;var N1P=i4U;N1P+=y4F;var e1P=a9F;e1P+=y4U;var s1P=g71.h7F;s1P+=g71.w7F;s1P+=g71.L7F;var q1P=o8F;q1P+=g71.w7F;q1P+=O0F;q1P+=g71.X7F;var n1P=C3F;n1P+=Z4U;var C1P=c4F;C1P+=B4U;var l1P=g71.F7F;l1P+=e3F;var d1P=v4U;d1P+=o4U;d1P+=C7F;d1P+=f4U;var H1P=t4U;H1P+=j4F;var T1P=g71.w7F;T1P+=z0F;T1P+=p7F;var I1P=o8F;I1P+=g71.v7F;var c1P=v4U;c1P+=A4U;c1P+=A7F;var last;var ids=this[O0F][c1P];g71[I1P]();var values=this[O0F][J7U];var isMultiValue=this[O0F][e6F];var isMultiEditable=this[O0F][T1P][H1P];var val;var different=T9F;if(ids){var E1P=y4F;E1P+=x3F;E1P+=d4U;E1P+=o8F;for(var i=J68;i<ids[E1P];i++){val=values[ids[i]];if(i>J68&&!_deepCompare(val,last)){different=K9F;break;}last=val;}}if(different&&isMultiValue||!isMultiEditable&&this[G7U]()){var y1P=g71.F7F;y1P+=O0F;y1P+=O0F;var i1P=a9F;i1P+=r3F;var a1P=g71.h7F;a1P+=g71.w7F;a1P+=g71.L7F;var W1P=S7F;W1P+=p5F;W1P+=B7F;var K1P=g71.F7F;K1P+=e3F;this[s5F][I5F][K1P]({display:W1P});this[a1P][i1P][y1P]({display:f7U});}else{var t1P=g71.F7F;t1P+=O0F;t1P+=O0F;var f1P=d7U;f1P+=P0F;var o1P=g71.h7F;o1P+=g71.w7F;o1P+=g71.L7F;var B1P=g71.F7F;B1P+=O0F;B1P+=O0F;var Z1P=g71.h7F;Z1P+=g71.w7F;Z1P+=g71.L7F;this[Z1P][I5F][B1P]({display:f7U});this[o1P][f1P][t1P]({display:i6F});if(isMultiValue&&!different){var A1P=O0F;A1P+=B7F;A1P+=g71.X7F;this[A1P](last,T9F);}}this[s5F][d1P][l1P]({display:ids&&ids[C1P]>G68&&different&&!isMultiValue?n1P:i6F});var i18n=this[O0F][q1P][u5F][t9F];this[s1P][e1P][N1P](isMultiEditable?i18n[K5F]:i18n[l4U]);this[s5F][t9F][m1P](this[O0F][p1P][P1P],!isMultiEditable);this[O0F][j7U][C4U]();return K9F;},_typeFn:function(name){var e4U="appl";var s4U="sl";var g9P=g71.X7F;g9P+=K0F;g9P+=z3F;var u9P=T8F;u9P+=g71.X7F;u9P+=O0F;var V1P=R6F;V1P+=O0F;V1P+=o8F;V1P+=n4U;var k1P=O0F;k1P+=o8F;k1P+=P0F;k1P+=q4U;var S1P=s4U;S1P+=P0F;S1P+=g71.F7F;S1P+=B7F;var args=Array[O6F][S1P][Q6F](arguments);args[k1P]();args[V1P](this[O0F][u9P]);var fn=this[O0F][g9P][name];if(fn){var M9P=o8F;M9P+=g71.w7F;M9P+=O0F;M9P+=g71.X7F;var b9P=e4U;b9P+=K0F;return fn[b9P](this[O0F][M9P],args);}}};Editor[U9P][D9P]={};Editor[j9P][Y9P]={"className":g71.r7F,"data":g71.r7F,"def":g71.r7F,"fieldInfo":g71.r7F,"id":g71.r7F,"label":g71.r7F,"labelInfo":g71.r7F,"name":A5F,"type":r9P,"message":g71.r7F,"multiEditable":K9F,"submit":K9F};Editor[W9F][w9P][U5F]={type:A5F,name:A5F,classes:A5F,opts:A5F,host:A5F};Editor[W9F][R9P][F9P]={container:A5F,label:A5F,labelInfo:A5F,fieldInfo:A5F,fieldError:A5F,fieldMessage:A5F};Editor[X9P]={};Editor[N4U][m4U]={"init":function(dte){},"open":function(dte,append,fn){},"close":function(dte,fn){}};Editor[N4U][O9P]={"create":function(conf){},"get":function(conf){},"set":function(conf,val){},"enable":function(conf){},"disable":function(conf){}};Editor[N4U][U5F]={"ajaxUrl":A5F,"ajax":A5F,"dataSource":A5F,"domTable":A5F,"opts":A5F,"displayController":A5F,"fields":{},"order":[],"id":-G68,"displayed":T9F,"processing":T9F,"modifier":A5F,"action":A5F,"idSrc":A5F,"unique":J68};Editor[Q9P][p4U]={"label":A5F,"fn":A5F,"className":A5F};Editor[N4U][P4U]={onReturn:v9P,onBlur:S4U,onBackground:k4U,onComplete:S4U,onEsc:x9P,onFieldError:L9P,submit:h9P,focus:J68,buttons:K9F,title:K9F,message:K9F,drawType:T9F,scope:z9P};Editor[Y7U]={};(function(){var v3U='click.DTED_Lightbox';var U0U="<div class=\"DTED_L";var m0U="lick.DTED_Lightbox";var A68=25;var J8U='<div class="DTED_Lightbox_Content">';var z8U='<div class="DTED_Lightbox_Content_Wrapper">';var w0U="lightbox";var C0U="tbox";var M0U="lose\"></di";var k0U="wr";var D0U="ightbox_";var G3U="orientation";var h8U='<div class="DTED_Lightbox_Container">';var Y3U="offsetAni";var b0U="s=\"DTED_Lightbox_C";var Y0U="div class=\"DTED DTED_Lightbox_Wrapper\">";var j0U="Background\"><div/></div>";var M5P=g71.F7F;M5P+=g71.w7F;M5P+=V4U;var b5P=g71.h7F;b5P+=u0U;b5P+=H6F;var g5P=g0U;g5P+=b0U;g5P+=M0U;g5P+=u2F;var u5P=U0U;u5P+=D0U;u5P+=j0U;var V2P=k9F;V2P+=Y0U;var G9P=g71.L7F;G9P+=r0U;G9P+=y4F;G9P+=O0F;var J9P=B7F;J9P+=Q0F;g71[g71.Y7F]();var self;Editor[Y7U][w0U]=$[J9P](K9F,{},Editor[G9P][m4U],{"init":function(dte){var R0U="_ini";var c9P=R0U;c9P+=g71.X7F;self[c9P]();g71[g71.Y7F]();return self;},"open":function(dte,append,callback){var G0U="_shown";var v0U="_sho";var i9P=Y3F;i9P+=O0F;i9P+=F0U;i9P+=c8F;var a9P=a0F;a9P+=g71.v7F;var W9P=Y3F;W9P+=g71.h7F;W9P+=g71.w7F;W9P+=g71.L7F;var K9P=R7U;K9P+=z3F;K9P+=S7F;K9P+=g71.h7F;var E9P=X0U;E9P+=g71.h7F;var H9P=n8F;H9P+=g71.X7F;H9P+=q7U;H9P+=o8F;var T9P=O0U;T9P+=y4F;T9P+=g71.h7F;T9P+=Q0U;var I9P=v0U;I9P+=x0U;if(self[I9P]){if(callback){callback();}return;}self[L0U]=dte;var content=self[h0U][z0U];content[T9P]()[H9P]();content[E9P](append)[K9P](self[W9P][J0U]);g71[a9P]();self[G0U]=K9F;self[i9P](callback);},"close":function(dte,callback){var c0U="hown";var I0U="_sh";var o9P=Y3F;o9P+=O0F;o9P+=c0U;var B9P=a0F;B9P+=g71.v7F;var Z9P=Y3F;Z9P+=g71.h7F;Z9P+=p0F;var y9P=I0U;y9P+=Y4U;if(!self[y9P]){if(callback){callback();}return;}self[Z9P]=dte;g71[B9P]();self[T0U](callback);self[o9P]=T9F;},node:function(dte){return self[h0U][H0U][J68];},"_init":function(){var y0U='opacity';var a0U='div.DTED_Lightbox_Content';var W0U="_ready";var d9P=T8F;d9P+=q7U;d9P+=E0U;var A9P=l2F;A9P+=z3F;A9P+=h0F;var t9P=K0U;t9P+=g71.w7F;t9P+=g71.L7F;var f9P=Y3F;f9P+=p6F;f9P+=g71.L7F;if(self[W0U]){return;}var dom=self[f9P];dom[z0U]=$(a0U,self[t9P][A9P]);dom[H0U][n5F](d9P,J68);dom[i0U][n5F](y0U,J68);},"_show":function(callback){var U3U='height';var P0U="kg";var A0U="resi";var q0U="D_Lightbox_C";var d0U="ze.DTE";var T3U="\"DTED_Lightbox_Shown\"/>";var B0U="Top";var W3U='div.DTED_Lightbox_Shown';var f0U="_sc";var t0U="rollTop";var Z0U="scroll";var b3U="bile";var N0U="rou";var l0U="D_Ligh";var s0U="ontent_Wrapper";var E3U="dre";var o0U="ody";var I3U="<div class=";var K3U="not";var n0U="div.DTE";var e0U="backg";var V0U="wrapp";var g3U="DTED_Lightbox_Mo";var u3U="ien";var O2P=Z0U;O2P+=B0U;var X2P=d4F;X2P+=o0U;var F2P=f0U;F2P+=t0U;var R2P=A0U;R2P+=d0U;R2P+=l0U;R2P+=C0U;var j2P=n0U;j2P+=q0U;j2P+=s0U;var U2P=e0U;U2P+=N0U;U2P+=R0F;var b2P=g71.F7F;b2P+=m0U;var g2P=d4F;g2P+=P0F;g2P+=S7F;g2P+=g71.h7F;var u2P=g71.F7F;u2P+=y4F;u2P+=g71.w7F;u2P+=U4F;var S9P=p0U;S9P+=g71.F7F;S9P+=P0U;S9P+=S0U;var P9P=k0U;P9P+=R7U;P9P+=z0F;P9P+=r4F;var p9P=K0U;p9P+=g71.X7F;p9P+=B7F;var m9P=g71.x7F;m9P+=z0F;m9P+=z0F;m9P+=D0F;var N9P=K0U;N9P+=e9F;var e9P=g71.F7F;e9P+=e3F;var s9P=V0U;s9P+=r4F;var q9P=g71.F7F;q9P+=O0F;q9P+=O0F;var C9P=P3F;C9P+=u3U;C9P+=I4U;C9P+=X0F;var l9P=Y3F;l9P+=g71.h7F;l9P+=g71.w7F;l9P+=g71.L7F;var that=this;var dom=self[l9P];if(window[C9P]!==undefined){var n9P=g3U;n9P+=b3U;$(M3U)[J6F](n9P);}dom[z0U][q9P](U3U,D3U);dom[s9P][e9P]({top:-self[j3U][Y3U]});$(M3U)[r3U](self[N9P][i0U])[m9P](self[h0U][H0U]);self[w3U]();self[p9P][R3U](dom[P9P],{opacity:G68,top:J68},callback);self[L0U][R3U](dom[S9P],{opacity:G68});setTimeout(function(){var F3U="text-";var O3U='div.DTE_Footer';var X3U="ndent";var V9P=F3U;V9P+=P0F;V9P+=X3U;var k9P=g71.F7F;k9P+=O0F;k9P+=O0F;$(O3U)[k9P](V9P,-G68);},W68);dom[u2P][g2P](b2P,function(e){var M2P=Y3F;M2P+=g71.h7F;M2P+=p0F;g71[F9F]();self[M2P][J0U]();});dom[U2P][Q3U](v3U,function(e){var D2P=a0F;D2P+=g71.v7F;g71[D2P]();self[L0U][i0U]();});g71[g71.Y7F]();$(j2P,dom[H0U])[Q3U](v3U,function(e){var z3U="ackg";var h3U='DTED_Lightbox_Content_Wrapper';var Y2P=g71.X7F;Y2P+=x3U;Y2P+=L3U;Y2P+=g71.X7F;if($(e[Y2P])[d6F](h3U)){var w2P=d4F;w2P+=z3U;w2P+=S0U;var r2P=Y3F;r2P+=J3U;r2P+=B7F;self[r2P][w2P]();}});$(window)[Q3U](R2P,function(){self[w3U]();});self[F2P]=$(X2P)[O2P]();if(window[G3U]!==undefined){var h2P=g71.x7F;h2P+=c3U;h2P+=D0F;var L2P=I3U;L2P+=T3U;var x2P=d4F;x2P+=o0U;var v2P=S7F;v2P+=z8F;var Q2P=H3U;Q2P+=E3U;Q2P+=S7F;var kids=$(M3U)[Q2P]()[v2P](dom[i0U])[K3U](dom[H0U]);$(x2P)[r3U](L2P);$(W3U)[h2P](kids);}},"_heightCalc":function(){var m3U="eig";var y3U="igh";var i3U="xHe";var l3U="rHe";var A3U="div.DTE_Foo";var B3U="dy_Content";var o3U="oute";var f3U="rHei";var e3U="Hea";var d3U="ter";var Z3U="div.DTE_Bo";var a2P=a3U;a2P+=i3U;a2P+=y3U;a2P+=g71.X7F;var W2P=k0U;W2P+=R7U;W2P+=z0F;W2P+=r4F;var K2P=Z3U;K2P+=B3U;var E2P=o3U;E2P+=f3U;E2P+=Q8F;E2P+=c4U;var H2P=t3U;H2P+=z0F;H2P+=z0F;H2P+=r4F;var T2P=A3U;T2P+=d3U;var I2P=o3U;I2P+=l3U;I2P+=y3U;I2P+=g71.X7F;var c2P=c8F;c2P+=C3U;c2P+=z0F;c2P+=n3U;var G2P=q3U;G2P+=s3U;G2P+=e3U;G2P+=N3U;var J2P=b7U;J2P+=g71.O7F;var z2P=o8F;z2P+=m3U;z2P+=o8F;z2P+=g71.X7F;var dom=self[h0U];var maxHeight=$(window)[z2P]()-self[J2P][p3U]*c68-$(G2P,dom[c2P])[I2P]()-$(T2P,dom[H2P])[E2P]();$(K2P,dom[W2P])[n5F](a2P,maxHeight);},"_hide":function(callback){var S3U="e.DTED_Lightbox";var F8U="div.DTED_Ligh";var X8U="box_Sh";var v8U="scrollTop";var P3U="esiz";var V3U="k.";var b8U="backgr";var M8U="ound";var r8U="ED_Lightbox_Mobi";var Y8U="_scrollT";var u8U="DTED_Ligh";var j8U="animat";var k2P=h0F;k2P+=P3U;k2P+=S3U;var S2P=g71.F7F;S2P+=m0U;var P2P=l2F;P2P+=z0F;P2P+=r4F;var p2P=k3U;p2P+=V3U;p2P+=u8U;p2P+=C0U;var m2P=C7F;m2P+=S7F;m2P+=g8U;m2P+=R0F;var N2P=b8U;N2P+=M8U;var e2P=g71.F7F;e2P+=U8U;e2P+=B7F;var q2P=d4F;q2P+=D8U;var n2P=Y3F;n2P+=g71.h7F;n2P+=g71.X7F;n2P+=B7F;var l2P=g71.F7F;l2P+=g71.w7F;l2P+=S7F;l2P+=g71.O7F;var d2P=t3U;d2P+=c3U;d2P+=r4F;var A2P=Y3F;A2P+=j8U;A2P+=B7F;var t2P=Y3F;t2P+=g71.h7F;t2P+=g71.X7F;t2P+=B7F;var f2P=Y8U;f2P+=g71.w7F;f2P+=z0F;var o2P=w4F;o2P+=r8U;o2P+=c4F;var B2P=w8U;B2P+=g71.h7F;B2P+=K0F;var i2P=K0U;i2P+=e9F;var dom=self[i2P];if(!callback){callback=function(){};}g71[F9F]();if(window[G3U]!==undefined){var Z2P=R8U;Z2P+=h0F;Z2P+=B7F;Z2P+=S7F;var y2P=F8U;y2P+=g71.X7F;y2P+=X8U;y2P+=Y4U;var show=$(y2P);show[Z2P]()[O8U](M3U);show[Q8U]();}$(B2P)[o6F](o2P)[v8U](self[f2P]);self[t2P][A2P](dom[d2P],{opacity:J68,top:self[l2P][Y3U]},function(){var C2P=g71.h7F;C2P+=r4U;C2P+=q7U;C2P+=o8F;$(this)[C2P]();callback();});self[n2P][R3U](dom[q2P],{opacity:J68},function(){var s2P=o8F;s2P+=g71.v7F;g71[s2P]();$(this)[O7U]();});dom[e2P][x8U](v3U);dom[N2P][m2P](p2P);$(L8U,dom[P2P])[x8U](S2P);$(window)[x8U](k2P);},"_dte":A5F,"_ready":T9F,"_shown":T9F,"_dom":{"wrapper":$(V2P+h8U+z8U+J8U+z5F+z5F+z5F+z5F),"background":$(u5P),"close":$(g5P),"content":A5F}});self=Editor[b5P][w0U];self[M5P]={"offsetAni":A68,"windowPadding":A68};}());(function(){var H1U="height";var q8U="blo";var B1U='normal';var m8U="yle";var g7F=600;var H8U="pe_Shadow\"></div>";var N68=50;var W8U="_dt";var d9U='<div class="DTED_Envelope_Container"></div>';var s8U="ckground";var t8U="_do";var K8U="envelope";var T8U="class=\"DTED_Envelo";var l9U='<div class="DTED_Envelope_Background"><div/></div>';var A9U='<div class="DTED DTED_Envelope_Wrapper">';var A1U="offsetHeight";var c8U="<div class=\"D";var C8U="tyl";var I8U="ED_Envelope_Close\">&times;</di";var c7b=h0F;c7b+=g71.w7F;c7b+=c8F;var G7b=D4U;G7b+=G8U;var J7b=c8U;J7b+=V4F;J7b+=I8U;J7b+=u2F;var z7b=R2F;z7b+=q2F;z7b+=b2F;var h7b=Y2F;h7b+=T8U;h7b+=H8U;var U5P=g71.h7F;U5P+=E8U;U5P+=K0F;var self;g71[g71.Y7F]();Editor[U5P][K8U]=$[e5F](K9F,{},Editor[N4U][m4U],{"init":function(dte){var a8U="_init";var j5P=W8U;j5P+=B7F;var D5P=o8F;D5P+=g71.v7F;g71[D5P]();self[j5P]=dte;self[a8U]();return self;},"open":function(dte,append,callback){var f8U="onten";var o8U="hild";var y8U="Ch";var B8U="appendC";var Q5P=Y3F;Q5P+=O0F;Q5P+=F0U;Q5P+=c8F;var O5P=Y1F;O5P+=g71.w7F;O5P+=O0F;O5P+=B7F;var X5P=i8U;X5P+=R0F;X5P+=y8U;X5P+=Z8U;var F5P=K0U;F5P+=e9F;var R5P=B8U;R5P+=o8U;var w5P=g71.F7F;w5P+=f8U;w5P+=g71.X7F;var r5P=t8U;r5P+=g71.L7F;var Y5P=W8U;Y5P+=B7F;g71[g71.Y7F]();self[Y5P]=dte;$(self[r5P][z0U])[A8U]()[O7U]();self[h0U][w5P][R5P](append);self[F5P][z0U][X5P](self[h0U][O5P]);self[Q5P](callback);},"close":function(dte,callback){var v5P=d8U;v5P+=f8F;v5P+=B7F;self[L0U]=dte;self[v5P](callback);},node:function(dte){return self[h0U][H0U][J68];},"_init":function(){var M1U="body";var U1U="appendChild";var e8U="hidd";var Y1U='visible';var l8U="sbili";var P8U="groun";var b1U="_re";var u1U="velope_Contain";var j1U="_cssBackgroundOpacity";var k8U="div.D";var n8U="aci";var V8U="TED_En";var S8U="pper";var N8U="isbil";var p8U="appendChi";var B5P=q2F;B5P+=P0F;B5P+=l8U;B5P+=s8F;var Z5P=O0F;Z5P+=C8U;Z5P+=B7F;var y5P=Y3F;y5P+=g71.h7F;y5P+=g71.w7F;y5P+=g71.L7F;var i5P=g71.w7F;i5P+=z0F;i5P+=n8U;i5P+=s8F;var a5P=q8U;a5P+=g71.F7F;a5P+=g1F;var W5P=p0U;W5P+=s8U;var K5P=K0U;K5P+=e9F;var E5P=e8U;E5P+=B7F;E5P+=S7F;var H5P=q2F;H5P+=N8U;H5P+=E0U;var T5P=O0F;T5P+=g71.X7F;T5P+=m8U;var I5P=Y3F;I5P+=s5F;var c5P=p8U;c5P+=y4F;c5P+=g71.h7F;var G5P=u1F;G5P+=g1F;G5P+=P8U;G5P+=g71.h7F;var J5P=t3U;J5P+=S8U;var z5P=K0U;z5P+=e9F;var h5P=k8U;h5P+=V8U;h5P+=u1U;h5P+=r4F;var L5P=w4U;L5P+=g1U;L5P+=S7F;L5P+=g71.X7F;var x5P=b1U;x5P+=g71.x7F;x5P+=g71.h7F;x5P+=K0F;if(self[x5P]){return;}self[h0U][L5P]=$(h5P,self[z5P][J5P])[J68];document[M1U][U1U](self[h0U][G5P]);document[M1U][c5P](self[h0U][H0U]);self[I5P][i0U][T5P][H5P]=E5P;self[K5P][W5P][D1U][Y7U]=a5P;self[j1U]=$(self[h0U][i0U])[n5F](i5P);self[y5P][i0U][D1U][Y7U]=i6F;self[h0U][i0U][Z5P][B5P]=Y1U;},"_show":function(callback){var z1U="fse";var T1U="styl";var J1U="tHeight";var r1U="resize.DTED_En";var w1U="velope";var G1U="wrappe";var W1U="opacity";var X1U="ghtbox_Content_Wrapper";var c1U="wi";var d1U="conten";var R1U="div.DTED_";var a1U="marginLeft";var o1U="fadeIn";var F1U="L";var Z1U="px";var f1U="windowScroll";var t1U="ml,body";var Q1U="kgroundOpacity";var E1U="_findAttachRow";var O1U="_cssBac";var h1U="paci";var l1U='click.DTED_Envelope';var K6P=r1U;K6P+=w1U;var I6P=d4F;I6P+=y8F;I6P+=g71.h7F;var c6P=Y3F;c6P+=g71.h7F;c6P+=e9F;var G6P=R1U;G6P+=F1U;G6P+=P0F;G6P+=X1U;var h6P=g8U;h6P+=R0F;var L6P=d4F;L6P+=P0F;L6P+=R0F;var R6P=b7U;R6P+=g71.O7F;var w6P=t8U;w6P+=g71.L7F;var r6P=O1U;r6P+=Q1U;var Y6P=v1U;Y6P+=x1U;var j6P=Y3F;j6P+=s5F;var D6P=q8U;D6P+=W7U;var U6P=L1U;U6P+=H6F;var M6P=O0F;M6P+=g71.X7F;M6P+=m8U;var b6P=g71.w7F;b6P+=h1U;b6P+=s8F;var g6P=O0F;g6P+=s8F;g6P+=c4F;var u6P=O0F;u6P+=C8U;u6P+=B7F;var V5P=t8U;V5P+=g71.L7F;var k5P=g71.w7F;k5P+=g71.O7F;k5P+=z1U;k5P+=J1U;var S5P=g71.X7F;S5P+=T8F;var P5P=t8U;P5P+=g71.L7F;var p5P=z0F;p5P+=o7F;var m5P=G1U;m5P+=h0F;var N5P=Y3F;N5P+=p6F;N5P+=g71.L7F;var e5P=z0F;e5P+=o7F;var s5P=c1U;s5P+=J3U;s5P+=o8F;var q5P=I1U;q5P+=c4F;var n5P=Y3F;n5P+=g71.h7F;n5P+=g71.w7F;n5P+=g71.L7F;var C5P=C3F;C5P+=g71.w7F;C5P+=W7U;var l5P=D4U;l5P+=S3F;l5P+=g71.x7F;l5P+=K0F;var d5P=g71.w7F;d5P+=h1U;d5P+=s8F;var A5P=O0F;A5P+=g71.X7F;A5P+=K0F;A5P+=c4F;var t5P=Y3F;t5P+=g71.h7F;t5P+=g71.w7F;t5P+=g71.L7F;var f5P=T1U;f5P+=B7F;var o5P=w4U;o5P+=S7F;o5P+=p0F;o5P+=N8F;var that=this;var formHeight;if(!callback){callback=function(){};}self[h0U][o5P][f5P][H1U]=D3U;var style=self[t5P][H0U][A5P];style[d5P]=J68;style[l5P]=C5P;var targetRow=self[E1U]();var height=self[w3U]();var width=targetRow[K1U];style[Y7U]=i6F;style[W1U]=G68;self[n5P][H0U][q5P][s5P]=width+e5P;self[N5P][m5P][D1U][a1U]=-(width/c68)+p5P;self[P5P][H0U][D1U][i1U]=$(targetRow)[y1U]()[S5P]+targetRow[k5P]+Z1U;self[V5P][z0U][u6P][i1U]=-G68*height-o68+Z1U;self[h0U][i0U][g6P][b6P]=J68;self[h0U][i0U][M6P][U6P]=D6P;$(self[j6P][i0U])[Y6P]({'opacity':self[r6P]},B1U);$(self[w6P][H0U])[o1U]();if(self[R6P][f1U]){var O6P=g71.F7F;O6P+=g71.w7F;O6P+=S7F;O6P+=g71.O7F;var X6P=g71.X7F;X6P+=g71.w7F;X6P+=z0F;var F6P=c4U;F6P+=t1U;$(F6P)[H4U]({"scrollTop":$(targetRow)[y1U]()[X6P]+targetRow[A1U]-self[O6P][p3U]},function(){var v6P=b7U;v6P+=g71.X7F;v6P+=Z3F;var Q6P=Y3F;Q6P+=g71.h7F;Q6P+=g71.w7F;Q6P+=g71.L7F;$(self[Q6P][v6P])[H4U]({"top":J68},g7F,callback);});}else{var x6P=d1U;x6P+=g71.X7F;$(self[h0U][x6P])[H4U]({"top":J68},g7F,callback);}$(self[h0U][J0U])[L6P](l1U,function(e){self[L0U][J0U]();});$(self[h0U][i0U])[h6P](l1U,function(e){var J6P=Y3F;J6P+=J3U;J6P+=B7F;var z6P=o8F;z6P+=g71.v7F;g71[z6P]();self[J6P][i0U]();});$(G6P,self[c6P][H0U])[I6P](l1U,function(e){var C1U="hasCl";var s1U='DTED_Envelope_Content_Wrapper';var H6P=C1U;H6P+=n1U;var T6P=o8F;T6P+=g71.v7F;g71[T6P]();if($(e[q1U])[H6P](s1U)){var E6P=d4F;E6P+=g71.x7F;E6P+=s8U;self[L0U][E6P]();}});$(window)[Q3U](K6P,function(){self[w3U]();});},"_heightCalc":function(){var N1U="ght";var P1U="v.DTE_Footer";var j9U="alc";var e1U="xHei";var U9U="heigh";var V1U="Header";var M9U="ntent";var u9U="windowPad";var k1U="E_";var Y9U="heightCalc";var D9U="tC";var m1U="outer";var b9U="eigh";var p1U="Height";var q6P=g71.L7F;q6P+=g71.x7F;q6P+=e1U;q6P+=N1U;var n6P=g71.F7F;n6P+=O0F;n6P+=O0F;var C6P=t8U;C6P+=g71.L7F;var l6P=m1U;l6P+=p1U;var d6P=t8U;d6P+=g71.L7F;var A6P=P5F;A6P+=P1U;var t6P=m1U;t6P+=p1U;var f6P=Y3F;f6P+=g71.h7F;f6P+=g71.w7F;f6P+=g71.L7F;var o6P=S1U;o6P+=k1U;o6P+=V1U;var B6P=u9U;B6P+=g71.h7F;B6P+=g9U;var Z6P=g71.F7F;Z6P+=g71.w7F;Z6P+=S7F;Z6P+=g71.O7F;var y6P=o8F;y6P+=b9U;y6P+=g71.X7F;var i6P=g71.F7F;i6P+=g71.w7F;i6P+=M9U;var a6P=U9U;a6P+=D9U;a6P+=j9U;var W6P=g71.F7F;W6P+=g71.w7F;W6P+=V4U;g71[F9F]();var formHeight;formHeight=self[W6P][Y9U]?self[j3U][a6P](self[h0U][H0U]):$(self[h0U][i6P])[A8U]()[H1U]();var maxHeight=$(window)[y6P]()-self[Z6P][B6P]*c68-$(o6P,self[f6P][H0U])[t6P]()-$(A6P,self[d6P][H0U])[l6P]();$(r9U,self[C6P][H0U])[n6P](q6P,maxHeight);return $(self[L0U][s5F][H0U])[w9U]();},"_hide":function(callback){var z9U="htbox";var v9U="ox";var Q9U="_Lightb";var x9U="unbi";var L9U="click.";var F9U="D_Lightbox";var R9U="k.DT";var T9U='resize.DTED_Lightbox';var X9U="unbin";var h9U="DTED_Lig";var O9U="k.DTED";var D7b=k3U;D7b+=R9U;D7b+=z4F;D7b+=F9U;var U7b=X9U;U7b+=g71.h7F;var M7b=t3U;M7b+=z0F;M7b+=z0F;M7b+=r4F;var b7b=Y3F;b7b+=p6F;b7b+=g71.L7F;var g7b=k3U;g7b+=O9U;g7b+=Q9U;g7b+=v9U;var u7b=x9U;u7b+=R0F;var V6P=L9U;V6P+=h9U;V6P+=z9U;var k6P=g71.F7F;k6P+=U8U;k6P+=B7F;var S6P=t8U;S6P+=g71.L7F;var s6P=b7U;s6P+=J9U;g71[F9F]();if(!callback){callback=function(){};}$(self[h0U][z0U])[H4U]({"top":-(self[h0U][s6P][A1U]+N68)},g7F,function(){var G9U="fade";var I9U="ground";var c9U="Out";var P6P=G9U;P6P+=c9U;var p6P=p0U;p6P+=g71.F7F;p6P+=g1F;p6P+=I9U;var m6P=Y3F;m6P+=p6F;m6P+=g71.L7F;var N6P=Y3F;N6P+=g71.h7F;N6P+=e9F;var e6P=a0F;e6P+=g71.v7F;g71[e6P]();$([self[N6P][H0U],self[m6P][p6P]])[P6P](B1U,callback);});$(self[S6P][k6P])[x8U](V6P);$(self[h0U][i0U])[u7b](g7b);$(L8U,self[b7b][M7b])[U7b](D7b);$(window)[x8U](T9U);},"_findAttachRow":function(){var K9U="Ap";var i9U='head';var W9U="dataTa";var E9U="tabl";var B9U="hea";var O7b=H9U;O7b+=g71.x7F;O7b+=p0F;var X7b=W8U;X7b+=B7F;var R7b=g71.F7F;R7b+=g71.w7F;R7b+=S7F;R7b+=g71.O7F;var w7b=E9U;w7b+=B7F;var r7b=K0U;r7b+=p0F;var Y7b=K9U;Y7b+=P0F;var j7b=W9U;j7b+=j4F;var dt=new $[V1F][j7b][Y7b](self[r7b][O0F][w7b]);if(self[R7b][a9U]===i9U){var F7b=o8F;F7b+=S4F;F7b+=N3U;return dt[y9U]()[F7b]();}else if(self[X7b][O0F][Z9U]===O7b){var v7b=B9U;v7b+=n8F;v7b+=h0F;var Q7b=g71.X7F;Q7b+=o9U;Q7b+=c4F;return dt[Q7b]()[v7b]();}else{var L7b=Y3F;L7b+=g71.h7F;L7b+=p0F;var x7b=h0F;x7b+=g3F;return dt[x7b](self[L7b][O0F][f9U])[t9U]();}},"_dte":A5F,"_ready":T9F,"_cssBackgroundOpacity":G68,"_dom":{"wrapper":$(A9U+h7b+d9U+z7b)[J68],"background":$(l9U)[J68],"close":$(J7b)[J68],"content":A5F}});self=Editor[G7b][K8U];self[j3U]={"windowPadding":N68,"heightCalc":A5F,"attach":c7b,"windowScroll":K9F};}());Editor[I7b][T7b]=function(cfg,after){var b2U="lti";var V9U='initField';var N9U="Error adding field. The field requires a `name` option";var e9U="Source";var n9U="reverse";var P9U="r add";var k9U="'. A field already exists with this name";var S9U="ing field '";var F2U="inA";var M2U="Reset";var r2U="nshift";var e7b=g71.w7F;e7b+=h0F;e7b+=g71.h7F;e7b+=r4F;var H7b=C9U;H7b+=h0F;H7b+=H6F;if($[H7b](cfg)){var E7b=y4F;E7b+=B7F;E7b+=S7F;E7b+=J9F;if(after!==undefined){cfg[n9U]();}for(var i=J68;i<cfg[E7b];i++){this[q9U](cfg[i],after);}}else{var A7b=g71.O7F;A7b+=l8F;A7b+=A7F;var a7b=g71.L7F;a7b+=r0U;var W7b=s9U;W7b+=I4U;W7b+=e9U;var name=cfg[B2F];if(name===undefined){throw N9U;}if(this[O0F][m9U][name]){var K7b=p9U;K7b+=P9U;K7b+=S9U;throw K7b+name+k9U;}this[W7b](V9U,cfg);var field=new Editor[W9F](cfg,this[G6F][u2U],this);if(this[O0F][a7b]){var Z7b=S4F;Z7b+=g2U;var y7b=v4U;y7b+=b2U;y7b+=M2U;var i7b=U2U;i7b+=A7F;var editFields=this[O0F][i7b];field[y7b]();$[Z7b](editFields,function(idSrc,edit){var j2U="FromDat";var t7b=n8F;t7b+=g71.O7F;var B7b=D2U;B7b+=g71.x7F;var val;if(edit[B7b]){var f7b=g71.h7F;f7b+=g71.x7F;f7b+=g71.X7F;f7b+=g71.x7F;var o7b=q2F;o7b+=I7U;o7b+=j2U;o7b+=g71.x7F;val=field[o7b](edit[f7b]);}field[Y2U](idSrc,val!==undefined?val:field[t7b]());});}this[O0F][A7b][name]=field;if(after===undefined){var l7b=z0F;l7b+=C7F;l7b+=O0F;l7b+=o8F;var d7b=P3F;d7b+=g71.h7F;d7b+=r4F;this[O0F][d7b][l7b](name);}else if(after===A5F){var C7b=C7F;C7b+=r2U;this[O0F][w2U][C7b](name);}else{var s7b=R2U;s7b+=k7F;var q7b=g71.w7F;q7b+=h0F;q7b+=g71.h7F;q7b+=r4F;var n7b=F2U;n7b+=X2U;var idx=$[n7b](after,this[O0F][q7b]);this[O0F][w2U][s7b](idx+G68,J68,name);}}this[O2U](this[e7b]());return this;};Editor[O6F][N7b]=function(newAjax){g71[g71.Y7F]();if(newAjax){this[O0F][Q2U]=newAjax;return this;}return this[O0F][Q2U];};Editor[m7b][p7b]=function(){var L2U="onBackg";var V7b=O0F;V7b+=C7F;V7b+=v2U;V7b+=g71.X7F;var S7b=g71.F7F;S7b+=x2U;S7b+=U4F;var P7b=L2U;P7b+=S0U;var onBackground=this[O0F][h2U][P7b];if(typeof onBackground===g71.G7F){onBackground(this);}else if(onBackground===k4U){this[z2U]();}else if(onBackground===S7b){var k7b=J2U;k7b+=B7F;this[k7b]();}else if(onBackground===V7b){var u4b=G2U;u4b+=c2U;u4b+=P0F;u4b+=g71.X7F;this[u4b]();}return this;};Editor[O6F][z2U]=function(){var b4b=A3F;b4b+=I2U;b4b+=h0F;var g4b=a0F;g4b+=g71.v7F;g71[g4b]();this[b4b]();return this;};Editor[O6F][M4b]=function(cells,fieldNames,show,opts){var H2U="aS";var E2U="urce";var a2U="isPl";var K2U="isPlainO";var i2U="ainO";var o2U='individual';var F4b=T2U;F4b+=H2U;F4b+=g71.w7F;F4b+=E2U;var R4b=g71.O7F;R4b+=K3F;var w4b=P2F;w4b+=k2F;var r4b=K2U;r4b+=W2U;var Y4b=o8F;Y4b+=g71.v7F;var j4b=a2U;j4b+=i2U;j4b+=g71.R7F;j4b+=y2U;var U4b=Y3F;U4b+=g71.X7F;U4b+=f8F;U4b+=K0F;var that=this;if(this[U4b](function(){var D4b=a0F;D4b+=g71.v7F;g71[D4b]();that[Z2U](cells,fieldNames,opts);})){return this;}if($[j4b](fieldNames)){opts=fieldNames;fieldNames=undefined;show=K9F;}else if(typeof fieldNames===B2U){show=fieldNames;fieldNames=undefined;opts=undefined;}g71[Y4b]();if($[r4b](show)){opts=show;show=K9F;}if(show===undefined){show=K9F;}opts=$[w4b]({},this[O0F][R4b][Z2U],opts);var editFields=this[F4b](o2U,cells,fieldNames);this[f2U](cells,editFields,t2U,opts,function(){var Y5U="nca";var b5U="\"><";var z5U="formInfo";var p2U=" class=\"DTE_Proces";var F5U="eopen";var q2U="rmE";var w5U="siz";var i5U="bubblePosition";var M5U="div/></d";var P2U="sing_Indicator\"><span></div>";var J5U="ead";var l2U="ocus";var u5U="lass=";var Q5U="apply";var V2U="<div c";var C2U="_foc";var c5U="utt";var r5U="eNode";var v5U="pointer";var A2U="pos";var D0b=d4F;D0b+=J8F;D0b+=j4F;var U0b=Y3F;U0b+=A2U;U0b+=g71.X7F;U0b+=d2U;var M0b=g71.O7F;M0b+=l2U;var b0b=C2U;b0b+=C7F;b0b+=O0F;var g0b=Y3F;g0b+=v1U;g0b+=x1U;var u0b=g71.F7F;u0b+=y4F;u0b+=P0F;u0b+=W7U;var N4b=Y3F;N4b+=n2U;var n4b=g71.h7F;n4b+=e9F;var C4b=j1F;C4b+=q2U;C4b+=e4F;var l4b=O0U;l4b+=x1F;l4b+=Q0U;var d4b=g2U;d4b+=Z8U;d4b+=h0F;d4b+=x3F;var t4b=s2U;t4b+=e2U;var f4b=E2F;f4b+=N2U;var o4b=k9F;o4b+=m9F;o4b+=P5F;o4b+=u2F;var B4b=m2U;B4b+=p2U;B4b+=P2U;var Z4b=E2F;Z4b+=m9F;Z4b+=b2F;var y4b=g71.F7F;y4b+=S2U;var i4b=Y2F;i4b+=k2U;var a4b=g2F;a4b+=b2F;var W4b=g2F;W4b+=b2F;var K4b=X6F;K4b+=q6F;K4b+=h0F;var E4b=V2U;E4b+=u5U;E4b+=g2F;var H4b=g2F;H4b+=b2F;var T4b=g0U;T4b+=g5U;var I4b=b5U;I4b+=M5U;I4b+=U5U;I4b+=b2F;var c4b=d4F;c4b+=Q8F;var G4b=D5U;G4b+=d4F;G4b+=d4F;G4b+=c4F;var J4b=g71.F7F;J4b+=C6F;J4b+=O0F;var z4b=g71.x7F;z4b+=j5U;z4b+=R9F;var h4b=w4U;h4b+=Y5U;h4b+=g71.X7F;var L4b=P8F;L4b+=r5U;L4b+=O0F;var Q4b=K4F;Q4b+=w5U;Q4b+=R5U;var O4b=Y3F;O4b+=J3F;O4b+=F5U;var X4b=Y3F;X4b+=P4U;var namespace=that[X4b](opts);var ret=that[O4b](t2U);if(!ret){return that;}$(window)[p5F](Q4b+namespace,function(){var O5U="blePosition";var x4b=X5U;x4b+=O5U;var v4b=a0F;v4b+=g71.v7F;g71[v4b]();that[x4b]();});var nodes=[];that[O0F][L4b]=nodes[h4b][Q5U](nodes,_pluck(editFields,z4b));var classes=that[J4b][G4b];var background=$(O5F+classes[c4b]+I4b);var container=$(T4b+classes[H0U]+H4b+E4b+classes[K4b]+W4b+O5F+classes[y9U]+a4b+i4b+classes[y4b]+Z4b+B4b+o4b+z5F+O5F+classes[v5U]+f4b+t4b);if(show){var A4b=K6F;A4b+=K0F;container[O8U](A4b);background[O8U](M3U);}var liner=container[A8U]()[x5U](J68);var table=liner[d4b]();var close=table[l4b]();liner[r3U](that[s5F][C4b]);table[l5F](that[n4b][L5U]);if(opts[h5U]){liner[l5F](that[s5F][z5U]);}if(opts[T5F]){var s4b=o8F;s4b+=J5U;s4b+=B7F;s4b+=h0F;var q4b=g71.h7F;q4b+=g71.w7F;q4b+=g71.L7F;liner[l5F](that[q4b][s4b]);}if(opts[G5U]){var e4b=d4F;e4b+=c5U;e4b+=p5F;e4b+=O0F;table[r3U](that[s5F][e4b]);}var pair=$()[q9U](container)[q9U](background);that[N4b](function(submitComplete){var I5U="_anim";var m4b=I5U;m4b+=h8F;g71[g71.Y7F]();that[m4b](pair,{opacity:J68},function(){var E5U='resize.';var T5U="_clearD";var H5U="ynamicInf";var k4b=T5U;k4b+=H5U;k4b+=g71.w7F;var S4b=g71.w7F;S4b+=g71.O7F;S4b+=g71.O7F;var P4b=n8F;P4b+=g71.X7F;P4b+=g71.x7F;P4b+=g2U;var p4b=a0F;p4b+=g71.v7F;g71[p4b]();pair[P4b]();$(window)[S4b](E5U+namespace);that[k4b]();});});background[K5U](function(){var V4b=C3F;V4b+=W5U;that[V4b]();});close[u0b](function(){that[a5U]();});that[i5U]();that[g0b](pair,{opacity:G68});that[b0b](that[O0F][y5U],opts[M0b]);that[U0b](D0b);});return this;};Editor[j0b][Y0b]=function(){var o5U="terWidth";var B68=15;var e5U='below';var q5U="left";var Z5U="ubbl";var t5U="E_B";var p5U='left';var m5U="removeC";var d5U='div.DTE_Bubble';var l5U="bubbleNodes";var B5U="ou";var A5U="ubble_Lin";var f5U="gh";var N5U="low";var W0b=g71.F7F;W0b+=e3F;var K0b=d4F;K0b+=Z5U;K0b+=B7F;var E0b=y2F;E0b+=e3F;E0b+=B7F;E0b+=O0F;var H0b=c8F;H0b+=P0F;H0b+=g71.h7F;H0b+=G9F;var T0b=B5U;T0b+=o5U;var I0b=i0F;I0b+=Q8F;I0b+=c4U;var c0b=g71.X7F;c0b+=g71.w7F;c0b+=z0F;var G0b=d4F;G0b+=z8F;G0b+=g71.X7F;G0b+=e9F;var J0b=h0F;J0b+=P0F;J0b+=f5U;J0b+=g71.X7F;var z0b=c4F;z0b+=B4U;var h0b=y4F;h0b+=B7F;h0b+=g71.O7F;h0b+=g71.X7F;var L0b=g71.X7F;L0b+=g71.w7F;L0b+=z0F;var r0b=S1U;r0b+=t5U;r0b+=A5U;r0b+=r4F;var wrapper=$(d5U),liner=$(r0b),nodes=this[O0F][l5U];var position={top:J68,left:J68,right:J68,bottom:J68};$[j6F](nodes,function(i,node){var C5U="offsetH";var n5U="eight";var x0b=C5U;x0b+=n5U;var v0b=g71.X7F;v0b+=g71.w7F;v0b+=z0F;var Q0b=w8U;Q0b+=g71.X7F;Q0b+=G3F;Q0b+=g71.L7F;var O0b=h0F;O0b+=P0F;O0b+=Q8F;O0b+=c4U;var X0b=c4F;X0b+=q4U;var F0b=g71.X7F;F0b+=g71.w7F;F0b+=z0F;var R0b=G3F;R0b+=z0F;var w0b=Q8F;w0b+=B7F;w0b+=g71.X7F;var pos=$(node)[y1U]();node=$(node)[w0b](J68);position[R0b]+=pos[F0b];position[q5U]+=pos[X0b];position[O0b]+=pos[q5U]+node[K1U];position[Q0b]+=pos[v0b]+node[x0b];});position[L0b]/=nodes[c7U];position[h0b]/=nodes[z0b];position[J0b]/=nodes[c7U];position[G0b]/=nodes[c7U];var top=position[c0b],left=(position[q5U]+position[I0b])/c68,width=liner[T0b](),visLeft=left-width/c68,visRight=visLeft+width,docWidth=$(window)[H0b](),padding=B68,classes=this[E0b][K0b];wrapper[W0b]({top:top,left:left});if(liner[c7U]&&liner[y1U]()[i1U]<J68){var i0b=w8U;i0b+=s5U;i0b+=g71.L7F;var a0b=G3F;a0b+=z0F;wrapper[n5F](a0b,position[i0b])[J6F](e5U);}else{var Z0b=d4F;Z0b+=B7F;Z0b+=N5U;var y0b=m5U;y0b+=t6F;wrapper[y0b](Z0b);}if(visRight+padding>docWidth){var B0b=c4F;B0b+=g71.O7F;B0b+=g71.X7F;var diff=visRight-docWidth;liner[n5F](B0b,visLeft<padding?-(visLeft-padding):-(diff+padding));}else{liner[n5F](p5U,visLeft<padding?-(visLeft-padding):J68);}return this;};Editor[O6F][G5U]=function(buttons){var P5U="pty";var V5U="Arr";var C0b=B7F;C0b+=g71.L7F;C0b+=P5U;var l0b=d4F;l0b+=S5U;l0b+=k5U;var d0b=B7U;d0b+=V5U;d0b+=g71.x7F;d0b+=K0F;var that=this;if(buttons===u6U){var f0b=q7U;f0b+=r3F;f0b+=g71.w7F;f0b+=S7F;var o0b=P0F;o0b+=I7F;o0b+=g6U;buttons=[{text:this[o0b][this[O0F][f0b]][b6U],action:function(){var A0b=O0F;A0b+=C7F;A0b+=c2U;A0b+=o3F;var t0b=a0F;t0b+=g71.v7F;g71[t0b]();this[A0b]();}}];}else if(!$[d0b](buttons)){buttons=[buttons];}$(this[s5F][l0b])[C0b]();$[j6F](buttons,function(i,btn){var D6U="ssName";var Y6U="sNa";var O6U='tabindex';var F6U='<button/>';var L6U='keypress';var U6U="abIn";var Q6U="tabIndex";var j3b=d4F;j3b+=S5U;j3b+=k5U;var D3b=g71.h7F;D3b+=g71.w7F;D3b+=g71.L7F;var M3b=M6U;M3b+=g71.F7F;M3b+=g1F;var b3b=g71.w7F;b3b+=S7F;var u3b=g71.w7F;u3b+=S7F;var k0b=g71.X7F;k0b+=U6U;k0b+=g71.h7F;k0b+=P2F;var S0b=o8F;S0b+=g71.X7F;S0b+=g71.L7F;S0b+=y4F;var P0b=g71.F7F;P0b+=y4F;P0b+=g71.x7F;P0b+=D6U;var p0b=g71.F7F;p0b+=j6U;p0b+=Y6U;p0b+=W8F;var m0b=j1F;m0b+=r6U;var N0b=g71.O7F;N0b+=S7F;var e0b=o8F;e0b+=g71.v7F;var s0b=g71.X7F;s0b+=B7F;s0b+=d7F;if(typeof btn===w6U){btn={text:btn,action:function(){var R6U="ubmit";var q0b=O0F;q0b+=R6U;var n0b=o8F;n0b+=g71.v7F;g71[n0b]();this[q0b]();}};}var text=btn[s0b]||btn[v5F];g71[e0b]();var action=btn[Z9U]||btn[N0b];$(F6U,{'class':that[G6F][m0b][p4U]+(btn[p0b]?Q5F+btn[P0b]:S1F)})[S0b](typeof text===g71.G7F?text(that):text||S1F)[X6U](O6U,btn[Q6U]!==undefined?btn[k0b]:J68)[p5F](v6U,function(e){if(e[x6U]===y68&&action){var V0b=g71.F7F;V0b+=g71.x7F;V0b+=y4F;V0b+=y4F;action[V0b](that);}})[u3b](L6U,function(e){var h6U="eyCo";var g3b=g1F;g3b+=h6U;g3b+=g71.h7F;g3b+=B7F;g71[g71.Y7F]();if(e[g3b]===y68){e[z6U]();}})[b3b](M3b,function(e){e[z6U]();if(action){var U3b=J6U;U3b+=G6U;action[U3b](that);}})[O8U](that[D3b][j3b]);});return this;};Editor[O6F][Y3b]=function(fieldName){var I6U="includeField";var r3b=g71.O7F;r3b+=c6U;var that=this;var fields=this[O0F][r3b];g71[F9F]();if(typeof fieldName===w6U){var R3b=I6U;R3b+=O0F;var w3b=P3F;w3b+=g71.h7F;w3b+=B7F;w3b+=h0F;that[u2U](fieldName)[T6U]();delete fields[fieldName];var orderIdx=$[i7U](fieldName,this[O0F][w2U]);this[O0F][w3b][H6U](orderIdx,G68);var includeIdx=$[i7U](fieldName,this[O0F][R3b]);if(includeIdx!==-G68){var F3b=O0F;F3b+=E6U;this[O0F][y5U][F3b](includeIdx,G68);}}else{var X3b=B7F;X3b+=R9F;$[X3b](this[K6U](fieldName),function(i,name){var W6U="clear";var O3b=a0F;O3b+=g71.v7F;g71[O3b]();that[W6U](name);});}return this;};Editor[O6F][J0U]=function(){var Q3b=Y3F;Q3b+=Y1F;Q3b+=a6U;Q3b+=B7F;this[Q3b](T9F);return this;};Editor[v3b][x3b]=function(arg1,arg2,arg3,arg4){var o6U="_actionCl";var Z6U="_displ";var f6U="lock";var p6U='initCreate';var t6U="reat";var B6U="ayReorder";var i3b=i6U;i3b+=y6U;var E3b=B7F;E3b+=g71.x7F;E3b+=g71.F7F;E3b+=o8F;var H3b=Z6U;H3b+=B6U;var T3b=o6U;T3b+=n1U;var I3b=d4F;I3b+=f6U;var c3b=g71.h7F;c3b+=P0F;c3b+=T6F;c3b+=H6F;var G3b=I1U;G3b+=c4F;var J3b=g71.O7F;J3b+=g71.w7F;J3b+=h0F;J3b+=g71.L7F;var z3b=g71.F7F;z3b+=t6U;z3b+=B7F;var that=this;var fields=this[O0F][m9U];var count=G68;if(this[A6U](function(){var L3b=d6U;L3b+=p0F;that[L3b](arg1,arg2,arg3,arg4);})){return this;}if(typeof arg1===l6U){count=arg1;arg1=arg2;arg2=arg3;}this[O0F][C6U]={};for(var i=J68;i<count;i++){var h3b=U2U;h3b+=A7F;this[O0F][h3b][i]={fields:this[O0F][m9U]};}var argOpts=this[n6U](arg1,arg2,arg3,arg4);this[O0F][q6U]=s6U;this[O0F][Z9U]=z3b;this[O0F][f9U]=A5F;this[s5F][J3b][G3b][c3b]=I3b;this[T3b]();this[H3b](this[m9U]());$[E3b](fields,function(name,field){var e6U="multiReset";var a3b=g71.h7F;a3b+=B7F;a3b+=g71.O7F;field[e6U]();g71[F9F]();for(var i=J68;i<count;i++){var W3b=n8F;W3b+=g71.O7F;var K3b=a9F;K3b+=r3F;K3b+=N6U;K3b+=g71.X7F;field[K3b](i,field[W3b]());}field[m6U](field[a3b]());});this[i3b](p6U,A5F,function(){var P6U="maybe";var S6U="Ope";var y3b=P6U;y3b+=S6U;y3b+=S7F;that[k6U]();that[V6U](argOpts[g6F]);g71[g71.Y7F]();argOpts[y3b]();});return this;};Editor[O6F][Z3b]=function(parent){var g7p='.edep';var u7p="undependent";var t3b=g71.w7F;t3b+=g71.O7F;t3b+=g71.O7F;var f3b=S7F;f3b+=g71.w7F;f3b+=g71.h7F;f3b+=B7F;var o3b=g71.O7F;o3b+=P0F;o3b+=h1F;var B3b=P0F;B3b+=O0F;B3b+=j3F;B3b+=K0F;if($[B3b](parent)){for(var i=J68,ien=parent[c7U];i<ien;i++){this[u7p](parent[i]);}return this;}var field=this[o3b](parent);$(field[f3b]())[t3b](g7p);return this;};Editor[O6F][b7p]=function(parent,url,opts){var M7p=".e";var U7p="dep";var Y7p="sArr";var J7p="event";var j7p="POS";var g8b=M7p;g8b+=U7p;var u8b=g71.w7F;u8b+=S7F;var V3b=S7F;V3b+=g71.w7F;V3b+=g71.h7F;V3b+=B7F;var C3b=B7F;C3b+=Q0F;var l3b=D7p;l3b+=O0F;l3b+=g71.w7F;l3b+=S7F;var d3b=j7p;d3b+=V4F;var A3b=P0F;A3b+=Y7p;A3b+=H6F;if($[A3b](parent)){for(var i=J68,ien=parent[c7U];i<ien;i++){this[b7p](parent[i],url,opts);}return this;}var that=this;var field=this[u2U](parent);var ajaxOpts={type:d3b,dataType:l3b};opts=$[C3b]({event:r7p,data:A5F,preUpdate:A5F,postUpdate:A5F},opts);var update=function(json){var x7p='error';var R7p="Upda";var w7p="post";var h7p="postUp";var Q7p='update';var v7p='val';var X7p="preUpdate";var k3b=z0F;k3b+=B9F;var P3b=w7p;P3b+=R7p;P3b+=g71.X7F;P3b+=B7F;var p3b=G8F;p3b+=c8F;var m3b=o8F;m3b+=P0F;m3b+=n8F;var N3b=B7F;N3b+=g71.x7F;N3b+=g71.F7F;N3b+=o8F;var q3b=F7p;q3b+=L3U;var n3b=S4F;n3b+=g71.F7F;n3b+=o8F;if(opts[X7p]){opts[X7p](json);}$[n3b]({labels:O7p,options:Q7p,values:v7p,messages:q3b,errors:x7p},function(jsonProp,fieldFn){if(json[jsonProp]){var s3b=B7F;s3b+=q7U;s3b+=o8F;$[s3b](json[jsonProp],function(field,val){var e3b=L7p;e3b+=x1F;g71[F9F]();that[e3b](field)[fieldFn](val);});}});$[N3b]([m3b,p3b,f6F,I6F],function(i,key){if(json[key]){that[key](json[key],json[H4U]);}});g71[g71.Y7F]();if(opts[P3b]){var S3b=h7p;S3b+=z7p;opts[S3b](json);}field[k3b](T9F);};$(field[V3b]())[u8b](opts[J7p]+g8b,function(e){var G7p="fun";var K7p="values";var I7p="tFields";var Y8b=G7p;Y8b+=y2U;Y8b+=c7p;var j8b=q2F;j8b+=I7U;var D8b=O3F;D8b+=c8F;D8b+=O0F;var U8b=g71.h7F;U8b+=J0F;U8b+=g71.x7F;var M8b=k5F;M8b+=P0F;M8b+=I7p;var b8b=y7F;b8b+=R0F;if($(field[t9U]())[b8b](e[q1U])[c7U]===J68){return;}field[T7p](K9F);var data={};data[H7p]=that[O0F][M8b]?_pluck(that[O0F][C6U],U8b):A5F;data[E7p]=data[D8b]?data[H7p][J68]:A5F;data[K7p]=that[j8b]();if(opts[Y5F]){var ret=opts[Y5F](data);if(ret){opts[Y5F]=ret;}}if(typeof url===Y8b){var r8b=q2F;r8b+=g71.x7F;r8b+=y4F;var o=url(field[r8b](),data,update);if(o){var R8b=W7p;R8b+=a7p;var w8b=g71.X7F;w8b+=i7p;w8b+=S7F;if(typeof o===I9F&&typeof o[w8b]===R8b){var F8b=g71.X7F;F8b+=o8F;F8b+=x3F;o[F8b](function(resolved){if(resolved){update(resolved);}});}else{update(o);}}}else{var O8b=U1F;O8b+=g71.x7F;O8b+=o7F;if($[y7U](url)){var X8b=P2F;X8b+=g71.X7F;X8b+=x3F;X8b+=g71.h7F;$[X8b](ajaxOpts,url);}else{ajaxOpts[y7p]=url;}$[O8b]($[e5F](ajaxOpts,{url:url,data:data,success:update}));}});return this;};Editor[Q8b][v8b]=function(){var o7p="roy";var Z7p="qu";var C7p="destro";var H8b=g71.h7F;H8b+=g71.w7F;H8b+=g71.L7F;var T8b=R6F;T8b+=P0F;T8b+=Z7p;T8b+=B7F;var I8b=T7F;I8b+=J3U;I8b+=B7F;var c8b=g71.w7F;c8b+=B7p;var J8b=n8F;J8b+=s7U;J8b+=o7p;var z8b=o8F;z8b+=g71.v7F;var L8b=g71.F7F;L8b+=y4F;L8b+=f7p;if(this[O0F][t7p]){var x8b=Y1F;x8b+=g71.w7F;x8b+=U4F;this[x8b]();}this[L8b]();if(this[O0F][A7p]){var h8b=d7p;h8b+=l7p;$(M3U)[r3U](this[O0F][h8b]);}var controller=this[O0F][m4U];g71[z8b]();if(controller[J8b]){var G8b=C7p;G8b+=K0F;controller[G8b](this);}$(document)[c8b](I8b+this[O0F][T8b]);this[H8b]=A5F;this[O0F]=A5F;};Editor[E8b][n7p]=function(name){var a8b=a0F;a8b+=g71.v7F;var K8b=B7F;K8b+=R9F;var that=this;$[K8b](this[K6U](name),function(i,n){var W8b=q7p;W8b+=d4F;W8b+=c4F;that[u2U](n)[W8b]();});g71[a8b]();return this;};Editor[O6F][Y7U]=function(show){var s7p='open';var y8b=g71.F7F;y8b+=U8U;y8b+=B7F;if(show===undefined){var i8b=g71.h7F;i8b+=C5F;i8b+=k5F;return this[O0F][i8b];}return this[show?s7p:y8b]();};Editor[O6F][t7p]=function(){var Z8b=a3U;Z8b+=z0F;return $[Z8b](this[O0F][m9U],function(field,name){return field[t7p]()?name:A5F;});};Editor[O6F][e7p]=function(){var N7p="Controller";var o8b=Z7U;o8b+=g71.h7F;o8b+=B7F;var B8b=D4U;B8b+=G8U;B8b+=N7p;return this[O0F][B8b][o8b](this);};Editor[f8b][m7p]=function(items,arg1,arg2,arg3,arg4){var l8b=g71.w7F;l8b+=z0F;l8b+=g71.X7F;l8b+=O0F;var d8b=g71.L7F;d8b+=g71.x7F;d8b+=P0F;d8b+=S7F;var A8b=g71.O7F;A8b+=v1F;A8b+=p7p;var that=this;if(this[A6U](function(){var t8b=k5F;t8b+=o3F;g71[F9F]();that[t8b](items,arg1,arg2,arg3,arg4);})){return this;}var argOpts=this[n6U](arg1,arg2,arg3,arg4);this[f2U](items,this[P7p](A8b,items),d8b,argOpts[l8b],function(){var k7p="maybeOpen";var S7p="_assembleMa";var C8b=S7p;C8b+=y8F;that[C8b]();that[V6U](argOpts[g6F]);argOpts[k7p]();});return this;};Editor[n8b][q8b]=function(name){var V7p="_fieldNa";var s8b=V7p;s8b+=W8F;s8b+=O0F;g71[F9F]();var that=this;$[j6F](this[s8b](name),function(i,n){var N8b=B7F;N8b+=S7F;N8b+=g71.x7F;N8b+=j4F;var e8b=y7F;e8b+=t7F;e8b+=g71.h7F;g71[g71.Y7F]();that[e8b](n)[N8b]();});return this;};Editor[O6F][m8b]=function(name,msg){var u4p="rmError";var b4p="globalError";if(msg===undefined){var p8b=j1F;p8b+=u4p;this[g4p](this[s5F][p8b],name);this[O0F][b4p]=name;}else{var S8b=B7F;S8b+=Z8F;S8b+=P3F;var P8b=y7F;P8b+=h1F;this[P8b](name)[S8b](msg);}return this;};Editor[k8b][V8b]=function(name){var M4p="Unknown fi";var U4p="ld name ";var D4p="- ";var u1b=L7p;u1b+=x1F;u1b+=O0F;var fields=this[O0F][u1b];if(!fields[name]){var g1b=M4p;g1b+=B7F;g1b+=U4p;g1b+=D4p;throw g1b+name;}return fields[name];};Editor[b1b][m9U]=function(){var M1b=y7F;M1b+=t7F;M1b+=g71.h7F;M1b+=O0F;return $[j4p](this[O0F][M1b],function(field,name){return name;});};Editor[O6F][U1b]=_api_file;Editor[O6F][D1b]=_api_files;Editor[j1b][Y4p]=function(name){var r1b=r4p;r1b+=X2U;var that=this;if(!name){var Y1b=w4p;Y1b+=g71.h7F;Y1b+=O0F;name=this[Y1b]();}if($[r1b](name)){var w1b=S4F;w1b+=g71.F7F;w1b+=o8F;var out={};$[w1b](name,function(i,n){var F1b=L7p;F1b+=y4F;F1b+=g71.h7F;var R1b=o8F;R1b+=g71.v7F;g71[R1b]();out[n]=that[F1b](n)[Y4p]();});return out;}return this[u2U](name)[Y4p]();};Editor[X1b][O1b]=function(names,animate){var that=this;$[j6F](this[K6U](names),function(i,n){var Q1b=y7F;Q1b+=h1F;that[Q1b](n)[R4p](animate);});return this;};Editor[v1b][x1b]=function(includeHash){return $[j4p](this[O0F][C6U],function(edit,idSrc){g71[F9F]();return includeHash===K9F?F4p+idSrc:idSrc;});};Editor[O6F][L1b]=function(inNames){var Q4p="formEr";var O4p="bal";var x4p="inError";var X4p="glo";var c1b=z9F;c1b+=J9F;var G1b=X4p;G1b+=O4p;G1b+=p9U;G1b+=h0F;var J1b=o8F;J1b+=g71.v7F;var z1b=Q4p;z1b+=v4p;var h1b=g71.h7F;h1b+=g71.w7F;h1b+=g71.L7F;var formError=$(this[h1b][z1b]);g71[J1b]();if(this[O0F][G1b]){return K9F;}var names=this[K6U](inNames);for(var i=J68,ien=names[c1b];i<ien;i++){if(this[u2U](names[i])[x4p]()){return K9F;}}return T9F;};Editor[O6F][I1b]=function(cell,fieldName,opts){var J4p="inline";var z4p="xten";var h4p="individ";var I4p='div.DTE_Field';var Z1b=u7U;Z1b+=P0F;Z1b+=g71.h7F;Z1b+=K0F;var y1b=y4F;y1b+=L4p;var K1b=B7F;K1b+=g71.x7F;K1b+=g71.F7F;K1b+=o8F;var E1b=y2F;E1b+=O0F;E1b+=U4F;E1b+=O0F;var H1b=h4p;H1b+=C7F;H1b+=I7U;var T1b=B7F;T1b+=z4p;T1b+=g71.h7F;var that=this;if($[y7U](fieldName)){opts=fieldName;fieldName=undefined;}opts=$[T1b]({},this[O0F][P4U][J4p],opts);var editFields=this[P7p](H1b,cell,fieldName);var node,field;var countOuter=J68,countInner;var closed=T9F;var classes=this[E1b][J4p];$[K1b](editFields,function(i,editField){var G4p='Cannot edit more than one row inline at a time';var a1b=D4U;a1b+=G8U;a1b+=S2F;a1b+=p7p;var W1b=J0F;W1b+=g71.X7F;W1b+=g71.x7F;W1b+=g2U;if(countOuter>J68){throw G4p;}node=$(editField[W1b][J68]);countInner=J68;$[j6F](editField[a1b],function(j,f){var c4p='Cannot edit more than one field inline at a time';var i1b=o8F;i1b+=g71.v7F;if(countInner>J68){throw c4p;}g71[i1b]();field=f;countInner++;});countOuter++;});if($(I4p,node)[y1b]){return this;}if(this[Z1b](function(){that[J4p](cell,fieldName,opts);})){return this;}this[f2U](cell,editFields,T4p,opts,function(){var t4p="eo";var W4p="line";var i4p="\" s";var A4p="liner";var f4p="_pr";var d4p="width";var K4p="epla";var y4p="tyle=\"w";var H4p="nl";var Z4p="th:";var l4p='<div class="DTE_Processing_Indicator"><span/></div>';var r9b=P0F;r9b+=H4p;r9b+=y8F;r9b+=B7F;var N1b=R7U;N1b+=z3F;N1b+=S7F;N1b+=g71.h7F;var e1b=g71.x7F;e1b+=E4p;var s1b=h0F;s1b+=K4p;s1b+=k7F;var q1b=W4p;q1b+=h0F;var n1b=P5F;n1b+=a4p;var C1b=g2F;C1b+=m9F;C1b+=b2F;var l1b=z0F;l1b+=o7F;l1b+=g2F;l1b+=b2F;var d1b=i4p;d1b+=y4p;d1b+=f8F;d1b+=Z4p;var A1b=g2F;A1b+=b2F;var t1b=t3U;t1b+=c3U;t1b+=B7F;t1b+=h0F;var f1b=B4p;f1b+=D0F;var o1b=Z6F;o1b+=B7F;o1b+=o4p;var B1b=f4p;B1b+=t4p;B1b+=z3F;B1b+=S7F;var namespace=that[V6U](opts);var ret=that[B1b](T4p);if(!ret){return that;}var children=node[o1b]()[O7U]();node[f1b]($(O5F+classes[t1b]+A1b+O5F+classes[A4p]+d1b+node[d4p]()+l1b+l4p+z5F+O5F+classes[G5U]+C1b+z5F));node[C4p](n1b+classes[q1b][s1b](/ /g,n4p))[e1b](field[t9U]())[N1b](that[s5F][q4p]);if(opts[G5U]){var p1b=s4p;p1b+=r0F;var m1b=g71.O7F;m1b+=e4p;node[m1b](N4p+classes[p1b][N7U](/ /g,n4p))[r3U](that[s5F][G5U]);}that[m4p](function(submitComplete,action){var P1b=g71.w7F;P1b+=g71.O7F;P1b+=g71.O7F;closed=K9F;$(document)[P1b](D6F+namespace);if(!submitComplete||action!==p4p){var k1b=g71.x7F;k1b+=P4p;k1b+=R0F;var S1b=g71.F7F;S1b+=p5F;S1b+=J9U;S1b+=O0F;node[S1b]()[O7U]();node[k1b](children);}that[S4p]();});setTimeout(function(){var u9b=g71.w7F;u9b+=S7F;var V1b=o8F;V1b+=g71.v7F;if(closed){return;}g71[V1b]();$(document)[u9b](D6F+namespace,function(e){var V4p="nA";var M0p="lf";var b0p="andSe";var U0p="Ba";var u0p="rge";var k4p="ents";var g0p="_ty";var j0p='owns';var D0p='addBack';var Y9b=z0F;Y9b+=x3U;Y9b+=k4p;var j9b=P0F;j9b+=V4p;j9b+=X2U;var D9b=g71.X7F;D9b+=g71.x7F;D9b+=u0p;D9b+=g71.X7F;var U9b=g0p;U9b+=z3F;U9b+=L6F;var M9b=a0F;M9b+=g71.v7F;var b9b=b0p;b9b+=M0p;var g9b=k3F;g9b+=g71.h7F;g9b+=U0p;g9b+=W7U;var back=$[V1F][g9b]?D0p:b9b;g71[M9b]();if(!field[U9b](j0p,e[D9b])&&$[j9b](node[J68],$(e[q1U])[Y9b]()[back]())===-G68){that[z2U]();}});},J68);that[Y0p]([field],opts[M7U]);g71[g71.Y7F]();that[r0p](r9b);});return this;};Editor[w9b][R9b]=function(name,msg){var R0p="ssa";var w0p="formInf";if(msg===undefined){var F9b=w0p;F9b+=g71.w7F;this[g4p](this[s5F][F9b],name);}else{var X9b=W8F;X9b+=R0p;X9b+=L3U;this[u2U](name)[X9b](msg);}return this;};Editor[O6F][q6U]=function(mode){var X0p='Not currently in an editing mode';var v0p="ging from create m";var Q0p="han";var x0p="ode is not supported";var F0p="act";var v9b=F0p;v9b+=c7p;var O9b=g71.F7F;O9b+=K4F;O9b+=J0F;O9b+=B7F;if(!mode){return this[O0F][Z9U];}if(!this[O0F][Z9U]){throw new Error(X0p);}else if(this[O0F][Z9U]===O0p&&mode!==O9b){var Q9b=W7F;Q9b+=Q0p;Q9b+=v0p;Q9b+=x0p;throw new Error(Q9b);}this[O0F][v9b]=mode;return this;};Editor[x9b][f9U]=function(){var L0p="odifie";var L9b=g71.L7F;L9b+=L0p;L9b+=h0F;return this[O0F][L9b];};Editor[h9b][h0p]=function(fieldNames){var z9b=o8F;z9b+=g71.v7F;var that=this;g71[z9b]();if(fieldNames===undefined){fieldNames=this[m9U]();}if($[u4U](fieldNames)){var J9b=S4F;J9b+=g71.F7F;J9b+=o8F;var out={};$[J9b](fieldNames,function(i,name){var z0p="Ge";var c9b=d7U;c9b+=P0F;c9b+=z0p;c9b+=g71.X7F;var G9b=o8F;G9b+=g71.v7F;g71[G9b]();out[name]=that[u2U](name)[c9b]();});return out;}return this[u2U](fieldNames)[h0p]();};Editor[I9b][T9b]=function(fieldNames,val){var G0p="nObj";var E9b=J0p;E9b+=P0F;E9b+=G0p;E9b+=c0p;var H9b=a0F;H9b+=g71.v7F;var that=this;g71[H9b]();if($[E9b](fieldNames)&&val===undefined){$[j6F](fieldNames,function(name,value){var I0p="iSet";var W9b=d7U;W9b+=I0p;var K9b=a0F;K9b+=g71.v7F;g71[K9b]();that[u2U](name)[W9b](value);});}else{var a9b=L7p;a9b+=y4F;a9b+=g71.h7F;this[a9b](fieldNames)[Y2U](val);}return this;};Editor[O6F][t9U]=function(name){var f9b=S7F;f9b+=T0p;f9b+=B7F;var o9b=y7F;o9b+=B7F;o9b+=y4F;o9b+=g71.h7F;var i9b=r4p;i9b+=X2U;var that=this;if(!name){name=this[w2U]();}g71[F9F]();return $[i9b](name)?$[j4p](name,function(n){var B9b=S7F;B9b+=g71.w7F;B9b+=n8F;var Z9b=y7F;Z9b+=B7F;Z9b+=x1F;var y9b=o8F;y9b+=g71.v7F;g71[y9b]();return that[Z9b](n)[B9b]();}):this[o9b](name)[f9b]();};Editor[t9b][H0p]=function(name,fn){var E0p="eventName";var A9b=Y3F;A9b+=E0p;g71[F9F]();$(this)[H0p](this[A9b](name),fn);return this;};Editor[O6F][d9b]=function(name,fn){var l9b=g71.w7F;l9b+=S7F;$(this)[l9b](this[K0p](name),fn);return this;};Editor[C9b][W0p]=function(name,fn){var i0p="tName";var q9b=i6U;q9b+=a0p;q9b+=S7F;q9b+=i0p;var n9b=p5F;n9b+=B7F;$(this)[n9b](this[q9b](name),fn);return this;};Editor[O6F][s9b]=function(){var y0p="_post";var f0p="ler";var t0p="mai";var A0p="_preopen";var o0p="layC";var U2b=y0p;U2b+=Z0p;U2b+=S7F;var k9b=l2F;k9b+=n3U;var S9b=B0p;S9b+=o0p;S9b+=s9F;S9b+=f0p;var P9b=t0p;P9b+=S7F;var N9b=Y3F;N9b+=n2U;var e9b=a0F;e9b+=g71.v7F;var that=this;g71[e9b]();this[O2U]();this[N9b](function(submitComplete){var m9b=Y1F;m9b+=g71.w7F;m9b+=O0F;m9b+=B7F;that[O0F][m4U][m9b](that,function(){var p9b=o8F;p9b+=g71.v7F;g71[p9b]();that[S4p]();});});var ret=this[A0p](P9b);if(!ret){return this;}this[O0F][S9b][d2U](this,this[s5F][k9b],function(){var d0p="editOpt";var M2b=j1F;M2b+=g71.F7F;M2b+=C7F;M2b+=O0F;var b2b=d0p;b2b+=O0F;var g2b=g71.w7F;g2b+=h0F;g2b+=g71.h7F;g2b+=r4F;var u2b=g71.L7F;u2b+=g71.x7F;u2b+=z0F;var V9b=Y3F;V9b+=g71.O7F;V9b+=k6F;V9b+=O0F;that[V9b]($[u2b](that[O0F][g2b],function(name){g71[F9F]();return that[O0F][m9U][name];}),that[O0F][b2b][M2b]);});this[U2b](s6U);return this;};Editor[O6F][w2U]=function(set){var N0p="fields, and no additional fiel";var n0p="sort";var m0p="ds, must be provided for ordering.";var e0p="All ";var w2b=O0F;w2b+=X6F;w2b+=g71.F7F;w2b+=B7F;var j2b=y4F;j2b+=g4U;j2b+=o8F;if(!set){var D2b=P3F;D2b+=N3U;return this[O0F][D2b];}if(arguments[j2b]&&!$[u4U](set)){var r2b=g71.F7F;r2b+=g71.x7F;r2b+=y4F;r2b+=y4F;var Y2b=O0F;Y2b+=y4F;Y2b+=l0p;set=Array[O6F][Y2b][r2b](arguments);}if(this[O0F][w2U][C0p]()[n0p]()[q0p](s0p)!==set[w2b]()[n0p]()[q0p](s0p)){var R2b=e0p;R2b+=N0p;R2b+=m0p;throw R2b;}$[e5F](this[O0F][w2U],set);this[O2U]();return this;};Editor[F2b][Q8U]=function(items,arg1,arg2,arg3,arg4){var k0p="difi";var S0p="yl";var P0p="ove";var p0p="initRem";var u3p='data';var G2b=S7F;G2b+=T0p;G2b+=B7F;var J2b=p0p;J2b+=P0p;var z2b=Y3F;z2b+=B7F;z2b+=q2F;z2b+=Z3F;var h2b=Z7U;h2b+=S7F;h2b+=B7F;var L2b=O0F;L2b+=g71.X7F;L2b+=S0p;L2b+=B7F;var x2b=g71.h7F;x2b+=g71.w7F;x2b+=g71.L7F;var v2b=g71.L7F;v2b+=g71.w7F;v2b+=k0p;v2b+=r4F;var Q2b=L7p;Q2b+=p7p;var X2b=u7U;X2b+=f8F;X2b+=K0F;var that=this;if(this[X2b](function(){var O2b=h0F;O2b+=B7F;O2b+=g71.L7F;O2b+=P0p;g71[g71.Y7F]();that[O2b](items,arg1,arg2,arg3,arg4);})){return this;}if(items[c7U]===undefined){items=[items];}var argOpts=this[n6U](arg1,arg2,arg3,arg4);var editFields=this[P7p](Q2b,items);this[O0F][Z9U]=Q8U;this[O0F][v2b]=items;this[O0F][C6U]=editFields;this[x2b][L5U][L2b][Y7U]=h2b;this[V0p]();this[z2b](J2b,[_pluck(editFields,G2b),_pluck(editFields,u3p),items],function(){var M3p="ven";var b3p="ltiRemove";var g3p="initMu";var T2b=g3p;T2b+=b3p;var I2b=Y3F;I2b+=B7F;I2b+=M3p;I2b+=g71.X7F;var c2b=o8F;c2b+=g71.v7F;g71[c2b]();that[I2b](T2b,[editFields,items],function(){var Y3p='button';var D3p="Options";var U3p="aybeOpen";var j3p="butt";var W2b=g71.O7F;W2b+=g71.w7F;W2b+=g71.F7F;W2b+=V6F;var K2b=g71.L7F;K2b+=U3p;var E2b=g71.w7F;E2b+=b0F;E2b+=O0F;var H2b=Y3F;H2b+=u0F;H2b+=g71.L7F;H2b+=D3p;that[k6U]();that[H2b](argOpts[E2b]);argOpts[K2b]();var opts=that[O0F][h2U];if(opts[W2b]!==A5F){var i2b=j1F;i2b+=g71.F7F;i2b+=C7F;i2b+=O0F;var a2b=j3p;a2b+=g71.w7F;a2b+=r0F;$(Y3p,that[s5F][a2b])[x5U](opts[M7U])[i2b]();}});});return this;};Editor[O6F][m6U]=function(set,val){var r3p="isPlainObjec";var B2b=S4F;B2b+=g71.F7F;B2b+=o8F;var Z2b=r3p;Z2b+=g71.X7F;var y2b=a0F;y2b+=g71.v7F;g71[y2b]();var that=this;if(!$[Z2b](set)){var o={};o[set]=val;set=o;}$[B2b](set,function(n,v){var o2b=y7F;o2b+=h1F;g71[F9F]();that[o2b](n)[m6U](v);});return this;};Editor[f2b][t2b]=function(names,animate){var A2b=B7F;A2b+=R9F;var that=this;$[A2b](this[K6U](names),function(i,n){var w3p="show";var d2b=y7F;d2b+=B7F;d2b+=y4F;d2b+=g71.h7F;that[d2b](n)[w3p](animate);});return this;};Editor[l2b][C2b]=function(successCallback,errorCallback,formatdata,hide){var k2b=B7F;k2b+=R9F;var P2b=B7F;P2b+=q7U;P2b+=o8F;var p2b=B7F;p2b+=C9F;p2b+=h0F;var s2b=Y3F;s2b+=T7p;var q2b=g71.x7F;q2b+=y2U;q2b+=r6F;q2b+=S7F;var n2b=L7p;n2b+=y4F;n2b+=g71.h7F;n2b+=O0F;var that=this,fields=this[O0F][n2b],errorFields=[],errorReady=J68,sent=T9F;if(this[O0F][T7p]||!this[O0F][q2b]){return this;}this[s2b](K9F);var send=function(){var F3p='initSubmit';var N2b=q7U;N2b+=r3F;N2b+=g71.w7F;N2b+=S7F;var e2b=c4F;e2b+=B4U;if(errorFields[e2b]!==errorReady||sent){return;}that[R3p](F3p,[that[O0F][N2b]],function(result){var O3p="essing";var X3p="roc";if(result===T9F){var m2b=Y3F;m2b+=z0F;m2b+=X3p;m2b+=O3p;that[m2b](T9F);return;}sent=K9F;g71[F9F]();that[Q3p](successCallback,errorCallback,formatdata,hide);});};this[p2b]();$[P2b](fields,function(name,field){var v3p="inE";var S2b=v3p;S2b+=Z8F;S2b+=P3F;g71[F9F]();if(field[S2b]()){errorFields[h9F](name);}});$[k2b](errorFields,function(i,name){g71[F9F]();fields[name][P6F](S1F,function(){errorReady++;send();});});send();return this;};Editor[V2b][u5b]=function(set){if(set===undefined){var g5b=d7p;g5b+=l7p;return this[O0F][g5b];}g71[g71.Y7F]();this[O0F][A7p]=set===A5F?A5F:$(set);return this;};Editor[O6F][b5b]=function(title){var x3p="unc";var w5b=o8F;w5b+=g71.X7F;w5b+=Q7U;var r5b=g71.O7F;r5b+=x3p;r5b+=r3F;r5b+=p5F;var j5b=i7p;j5b+=k3F;j5b+=r4F;var D5b=g71.F7F;D5b+=y4F;D5b+=y6F;var U5b=O0U;U5b+=x1F;U5b+=Q0U;var M5b=g71.h7F;M5b+=g71.w7F;M5b+=g71.L7F;var header=$(this[M5b][L3p])[U5b](N4p+this[D5b][j5b][z0U]);if(title===undefined){var Y5b=o8F;Y5b+=h3p;return header[Y5b]();}g71[F9F]();if(typeof title===r5b){title=title(this,new DataTable[z3p](this[O0F][y9U]));}header[w5b](title);return this;};Editor[O6F][J3p]=function(field,value){var F5b=Q8F;F5b+=B7F;F5b+=g71.X7F;var R5b=o8F;R5b+=g71.v7F;g71[R5b]();if(value!==undefined||$[y7U](field)){return this[m6U](field,value);}return this[F5b](field);};var apiRegister=DataTable[X5b][O5b];function __getInst(api){var G3p="oInit";var Q5b=g71.F7F;Q5b+=p5F;Q5b+=p0F;Q5b+=d7F;var ctx=api[Q5b][J68];return ctx[G3p][O8F]||ctx[c3p];}function __setBasic(inst,opts,type,plural){var a3p='1';var T3p="utto";var E3p="repla";var W3p=/%d/;var z5b=F7p;z5b+=L3U;var x5b=g71.X7F;x5b+=I3p;if(!opts){opts={};}if(opts[G5U]===undefined){var v5b=d4F;v5b+=T3p;v5b+=r0F;opts[v5b]=u6U;}if(opts[x5b]===undefined){var h5b=g71.X7F;h5b+=P0F;h5b+=x8F;h5b+=B7F;var L5b=r3F;L5b+=g71.X7F;L5b+=y4F;L5b+=B7F;opts[L5b]=inst[u5F][type][h5b];}if(opts[z5b]===undefined){if(type===H3p){var c5b=E3p;c5b+=k7F;var G5b=F7p;G5b+=L3U;var J5b=g71.F7F;J5b+=K3p;var confirm=inst[u5F][type][J5b];opts[G5b]=plural!==G68?confirm[Y3F][c5b](W3p,plural):confirm[a3p];}else{var I5b=F7p;I5b+=Q8F;I5b+=B7F;opts[I5b]=S1F;}}return opts;}apiRegister(T5b,function(){return __getInst(this);});apiRegister(H5b,function(opts){var i3p="rea";var K5b=g71.F7F;K5b+=i3p;K5b+=g71.X7F;K5b+=B7F;var E5b=m8F;E5b+=B7F;E5b+=J0F;E5b+=B7F;var inst=__getInst(this);inst[E5b](__setBasic(inst,opts,K5b));return this;});apiRegister(W5b,function(opts){var i5b=B7F;i5b+=g71.h7F;i5b+=P0F;i5b+=g71.X7F;var a5b=B7F;a5b+=J4F;var inst=__getInst(this);inst[a5b](this[J68][J68],__setBasic(inst,opts,i5b));return this;});apiRegister(y5b,function(opts){var o5b=a0F;o5b+=g71.v7F;var B5b=B7F;B5b+=g71.h7F;B5b+=P0F;B5b+=g71.X7F;var Z5b=B7F;Z5b+=J4F;var inst=__getInst(this);inst[Z5b](this[J68],__setBasic(inst,opts,B5b));g71[o5b]();return this;});apiRegister(y3p,function(opts){var f5b=o8F;f5b+=g71.v7F;var inst=__getInst(this);g71[f5b]();inst[Q8U](this[J68][J68],__setBasic(inst,opts,H3p,G68));return this;});apiRegister(Z3p,function(opts){var t5b=c4F;t5b+=B3p;t5b+=o8F;var inst=__getInst(this);inst[Q8U](this[J68],__setBasic(inst,opts,H3p,this[J68][t5b]));return this;});apiRegister(A5b,function(type,opts){if(!type){var d5b=P0F;d5b+=S7F;d5b+=X6F;d5b+=q6F;type=d5b;}else if($[y7U](type)){opts=type;type=T4p;}__getInst(this)[type](this[J68][J68],opts);return this;});apiRegister(o3p,function(opts){__getInst(this)[Z2U](this[J68],opts);return this;});g71[g71.Y7F]();apiRegister(f3p,_api_file);apiRegister(l5b,_api_files);$(document)[C5b](n5b,function(e,ctx,json){var q5b=g71.h7F;q5b+=g71.X7F;if(e[t3p]!==q5b){return;}if(json&&json[b8F]){var s5b=g71.O7F;s5b+=B1F;s5b+=A3p;$[j6F](json[s5b],function(name,files){var p5b=y7F;p5b+=y4F;p5b+=A3p;var m5b=w0F;m5b+=S7F;m5b+=g71.h7F;var e5b=A8F;e5b+=A3p;if(!Editor[e5b][name]){var N5b=y7F;N5b+=c4F;N5b+=O0F;Editor[N5b][name]={};}$[m5b](Editor[p5b][name],files);});}});Editor[P5b]=function(msg,tn){var l3p="ease refer to ";var d3p=" For more information, ";var C3p="https://datatables.net/tn/";var S5b=d3p;S5b+=S3F;S5b+=l3p;S5b+=C3p;g71[F9F]();throw tn?msg+S5b+tn:msg;};Editor[k5b]=function(data,props,fn){var s3p="inObje";var V5b=C9U;V5b+=n3p;var i,ien,dataPoint;g71[g71.Y7F]();props=$[e5F]({label:O7p,value:q3p},props);if($[V5b](data)){for(i=J68,ien=data[c7U];i<ien;i++){var u6b=J0p;u6b+=s3p;u6b+=y2U;dataPoint=data[i];if($[u6b](dataPoint)){var b6b=y4F;b6b+=e3p;var g6b=y4F;g6b+=g71.x7F;g6b+=N3p;fn(dataPoint[props[m3p]]===undefined?dataPoint[props[g6b]]:dataPoint[props[m3p]],dataPoint[props[b6b]],i,dataPoint[X6U]);}else{fn(dataPoint,dataPoint,i);}}}else{i=J68;$[j6F](data,function(key,val){fn(val,key,i);i++;});}};Editor[p3p]=function(id){var M6b=P3p;M6b+=y4F;M6b+=q7U;M6b+=B7F;return id[M6b](/\./g,s0p);};Editor[U6b]=function(editor,conf,files,progressCallback,completeCallback){var P8p="_limitLeft";var k3p="ing the file";var S3p="A server error occurred while upload";var u8p="fileReadText";var b8p="onload";var g8p="<i>Uploading file</i>";var h8p="readAsDataURL";var D6b=a0F;D6b+=g71.v7F;g71[D6b]();var reader=new FileReader();var counter=J68;var ids=[];var generalError=S3p;generalError+=k3p;editor[P6F](conf[B2F],S1F);if(typeof conf[Q2U]===g71.G7F){conf[Q2U](files,function(ids){var Y6b=V3p;Y6b+=y4F;var j6b=o8F;j6b+=g71.v7F;g71[j6b]();completeCallback[Y6b](editor,ids);});return;}progressCallback(conf,conf[u8p]||g8p);reader[b8p]=function(e){var w8p="lainO";var D8p="preUplo";var X8p="oadF";var x8p="plo";var a8p="loa";var L8p='No Ajax option specified for upload plug-in';var Q8p='upload';var U8p="ost";var M8p="js";var J8p='preSubmit.DTE_Upload';var z8p="all";var v8p="ajaxData";var R8p="pload";var H6b=M8p;H6b+=p5F;var T6b=z0F;T6b+=U8p;var I6b=g71.w7F;I6b+=S7F;var G6b=D8p;G6b+=k3F;var h6b=g71.h7F;h6b+=j8p;var L6b=Y8p;L6b+=s1F;var Q6b=P0F;Q6b+=r8p;Q6b+=w8p;Q6b+=W2U;var O6b=C7F;O6b+=R8p;var X6b=g71.x7F;X6b+=z0F;X6b+=F8p;X6b+=g71.h7F;var F6b=C7F;F6b+=S3F;F6b+=X8p;F6b+=O8p;var R6b=i8U;R6b+=R0F;var w6b=q7U;w6b+=r3F;w6b+=p5F;var r6b=g71.x7F;r6b+=c3U;r6b+=B7F;r6b+=R0F;var data=new FormData();var ajax;data[r6b](w6b,Q8p);data[R6b](F6b,conf[B2F]);data[X6b](O6b,files[counter]);if(conf[v8p]){conf[v8p](data);}if(conf[Q2U]){ajax=conf[Q2U];}else if($[Q6b](editor[O0F][Q2U])){var x6b=C7F;x6b+=x8p;x6b+=g71.x7F;x6b+=g71.h7F;var v6b=C7F;v6b+=R8p;ajax=editor[O0F][Q2U][v6b]?editor[O0F][Q2U][x6b]:editor[O0F][Q2U];}else if(typeof editor[O0F][Q2U]===L6b){ajax=editor[O0F][Q2U];}if(!ajax){throw L8p;}if(typeof ajax===w6U){ajax={url:ajax};}if(typeof ajax[h6b]===g71.G7F){var z6b=B7F;z6b+=R9F;var d={};var ret=ajax[Y5F](d);if(ret!==undefined&&typeof ret!==w6U){d=ret;}$[z6b](d,function(key,value){var J6b=B4p;J6b+=D0F;data[J6b](key,value);});}var preRet=editor[R3p](G6b,[conf[B2F],files[counter],data]);if(preRet===T9F){if(counter<files[c7U]-G68){counter++;reader[h8p](files[counter]);}else{var c6b=g71.F7F;c6b+=z8p;completeCallback[c6b](editor,ids);}return;}var submit=T9F;editor[I6b](J8p,function(){submit=K9F;return T9F;});$[Q2U]($[e5F]({},ajax,{type:T6b,data:data,dataType:H6b,contentType:T9F,processData:T9F,xhr:function(){var T8p="jaxSetti";var K8p="onprogress";var I8p="xh";var B8p="onloadend";var c8p="load";var a6b=G8p;a6b+=c8p;var W6b=o8F;W6b+=g71.v7F;var K6b=I8p;K6b+=h0F;var E6b=g71.x7F;E6b+=T8p;E6b+=S7F;E6b+=H8p;var xhr=$[E6b][K6b]();g71[W6b]();if(xhr[a6b]){xhr[E8p][K8p]=function(e){var W8p="lengthComputable";var i8p="toFixed";var y8p="%";var Z8p=':';var i6b=o8F;i6b+=g71.v7F;g71[i6b]();if(e[W8p]){var B6b=E6F;B6b+=o8F;var Z6b=g71.X7F;Z6b+=g71.w7F;Z6b+=I4U;Z6b+=y4F;var y6b=a8p;y6b+=g71.h7F;y6b+=B7F;y6b+=g71.h7F;var percent=(e[y6b]/e[Z6b]*P68)[i8p](J68)+y8p;progressCallback(conf,files[c7U]===G68?percent:counter+Z8p+files[B6b]+Q5F+percent);}};xhr[E8p][B8p]=function(e){var o8p="processingText";var f8p='Processing';progressCallback(conf,conf[o8p]||f8p);};}return xhr;},success:function(json){var C8p='uploadXhrSuccess';var l8p="TE_Upload";var A8p="rors";var d8p="preSubmit.";var s8p="iles";var t8p="fieldEr";var e6b=P0F;e6b+=g71.h7F;var s6b=C7F;s6b+=R8p;var q6b=C7F;q6b+=z0F;q6b+=a8p;q6b+=g71.h7F;var d6b=E6F;d6b+=o8F;var A6b=t8p;A6b+=A8p;var t6b=S7F;t6b+=g71.x7F;t6b+=g71.L7F;t6b+=B7F;var f6b=i6U;f6b+=q2F;f6b+=x3F;f6b+=g71.X7F;var o6b=d8p;o6b+=O4F;o6b+=l8p;editor[H0p](o6b);editor[f6b](C8p,[conf[t6b],json]);if(json[A6b]&&json[n8p][d6b]){var errors=json[n8p];for(var i=J68,ien=errors[c7U];i<ien;i++){var C6b=q8p;C6b+=V6F;var l6b=r4F;l6b+=h0F;l6b+=P3F;editor[l6b](errors[i][B2F],errors[i][C6b]);}}else if(json[P6F]){var n6b=B7F;n6b+=C9F;n6b+=h0F;editor[P6F](json[n6b]);}else if(!json[q6b]||!json[s6b][e6b]){var N6b=B7F;N6b+=C9F;N6b+=h0F;editor[N6b](conf[B2F],generalError);}else{var u7V=y4F;u7V+=L4p;var V6b=P0F;V6b+=g71.h7F;var k6b=G8p;k6b+=x2U;k6b+=g71.x7F;k6b+=g71.h7F;var S6b=z0F;S6b+=C7F;S6b+=O0F;S6b+=o8F;var m6b=g71.O7F;m6b+=s8p;if(json[m6b]){$[j6F](json[b8F],function(table,files){var P6b=P2F;P6b+=g71.X7F;P6b+=B7F;P6b+=R0F;if(!Editor[b8F][table]){var p6b=g71.O7F;p6b+=B1F;p6b+=B7F;p6b+=O0F;Editor[p6b][table]={};}$[P6b](Editor[b8F][table],files);});}ids[S6b](json[k6b][V6b]);if(counter<files[u7V]-G68){counter++;reader[h8p](files[counter]);}else{completeCallback[Q6F](editor,ids);if(submit){var g7V=e8p;g7V+=N8p;editor[g7V]();}}}progressCallback(conf);},error:function(xhr){var p8p="XhrError";var Y7V=m8p;Y7V+=g71.L7F;Y7V+=B7F;var j7V=B7F;j7V+=h0F;j7V+=h0F;j7V+=P3F;var D7V=S7F;D7V+=g71.x7F;D7V+=g71.L7F;D7V+=B7F;var U7V=E8p;U7V+=p8p;var M7V=i6U;M7V+=y6U;var b7V=o8F;b7V+=g71.v7F;g71[b7V]();editor[M7V](U7V,[conf[D7V],xhr]);editor[j7V](conf[Y7V],generalError);progressCallback(conf);}}));};files=$[j4p](files,function(val){var r7V=o8F;r7V+=g71.v7F;g71[r7V]();return val;});if(conf[P8p]!==undefined){var w7V=R2U;w7V+=g71.F7F;w7V+=B7F;files[w7V](conf[P8p],files[c7U]);}reader[h8p](files[J68]);};Editor[O6F][R7V]=function(init){var u9p="TableTools";var o1p="ttings";var O1p="e-e=\"form_content\" class=\"";var v9p="unique";var F1p="<div data";var l1p="ajaxUrl";var L1p="foote";var X9p='foot';var g1p="y_content";var r1p="</fo";var z1p="\"><span";var c1p="ings";var L9p='xhr.dt.dte';var D1p="e=\"head\" class=\"";var h1p="<div data-dte-e=\"body_content\" cl";var S1p='"><div class="';var q1p="legacyAjax";var U9p="NS";var Q1p="<form da";var v1p="ta-dte-e=\"form\" ";var V1p='<div data-dte-e="form_buttons" class="';var m1p='<div data-dte-e="foot" class="';var N1p='<div data-dte-e="body" class="';var C1p="domTable";var S8p="nitCo";var e1p="indicator";var u1p="cess";var b1p="ormCo";var P1p="tag";var c9p="init";var k8p="plete";var J9p="displayCont";var B1p="domT";var G9p="roller";var f1p="del";var O9p="bodyContent";var s1p='<div data-dte-e="processing" class="';var b9p="BUT";var i1p="Sour";var M1p="Ta";var K1p="temp";var J1p="/></div>";var j1p="a-dte-e=\"form_info\" class=\"";var I1p="dels";var Q9p='init.dt.dte';var k1p='"/></div>';var M9p="O";var p1p='"/>';var F9p="footer";var U1p="v data-dte-";var G1p="uniq";var a1p="ataSourc";var A1p="ault";var Y1p=" data-dte-e=\"form_error\" class=\"";var A4V=P0F;A4V+=S8p;A4V+=g71.L7F;A4V+=k8p;var t4V=V8p;t4V+=S7F;t4V+=g71.X7F;var K4V=g71.w7F;K4V+=S7F;var H4V=J3F;H4V+=g71.w7F;H4V+=u1p;H4V+=g9U;var T4V=K6F;T4V+=g1p;var I4V=d4F;I4V+=g71.w7F;I4V+=g71.h7F;I4V+=K0F;var c4V=L5U;c4V+=N3F;c4V+=J9U;var G4V=g71.O7F;G4V+=b1p;G4V+=g1U;G4V+=N8F;var J4V=g71.h7F;J4V+=g71.w7F;J4V+=g71.L7F;var x4V=B7F;x4V+=a0p;x4V+=S7F;x4V+=p7F;var v4V=B7F;v4V+=R9F;var Y4V=Y5F;Y4V+=M1p;Y4V+=j4F;var j4V=z2F;j4V+=b2F;var D4V=c8F;D4V+=C3U;D4V+=P4p;D4V+=h0F;var U4V=J2F;U4V+=U1p;U4V+=D1p;var M4V=P0F;M4V+=S7F;M4V+=j1F;var b4V=g71.O7F;b4V+=g71.w7F;b4V+=r6U;var g4V=c2F;g4V+=j1p;var u4V=g2F;u4V+=m9F;u4V+=b2F;var V7V=r4F;V7V+=v4p;var k7V=j1F;k7V+=h0F;k7V+=g71.L7F;var S7V=m2U;S7V+=Y1p;var P7V=r1p;P7V+=r6U;P7V+=b2F;var p7V=g71.F7F;p7V+=w1p;p7V+=Z3F;var m7V=g71.O7F;m7V+=R1p;var N7V=F1p;N7V+=X1p;N7V+=g71.X7F;N7V+=O1p;var e7V=g2F;e7V+=b2F;var s7V=Q1p;s7V+=v1p;s7V+=k2U;var q7V=s2U;q7V+=P0F;q7V+=q2F;q7V+=b2F;var n7V=w4U;n7V+=N8F;n7V+=B7F;n7V+=N8F;var C7V=g71.O7F;C7V+=x1p;C7V+=g71.X7F;C7V+=r4F;var l7V=g2F;l7V+=b2F;var d7V=L1p;d7V+=h0F;var A7V=k9F;A7V+=m9F;A7V+=P5F;A7V+=u2F;var t7V=g2F;t7V+=m9F;t7V+=b2F;var f7V=d4F;f7V+=g71.w7F;f7V+=g71.h7F;f7V+=K0F;var o7V=h1p;o7V+=S9F;var B7V=w8U;B7V+=g71.h7F;B7V+=K0F;var Z7V=z1p;Z7V+=J1p;var y7V=g0U;y7V+=g5U;var i7V=G1p;i7V+=C7F;i7V+=B7F;var a7V=U4F;a7V+=g71.X7F;a7V+=g71.X7F;a7V+=c1p;var W7V=R1F;W7V+=I1p;var K7V=P0F;K7V+=I7F;K7V+=T1p;K7V+=S7F;var E7V=P0F;E7V+=H1p;E7V+=S7F;var H7V=B7F;H7V+=d7F;H7V+=x3F;H7V+=g71.h7F;var T7V=m6F;T7V+=E1p;var I7V=K1p;I7V+=y4F;I7V+=h8F;var c7V=g71.X7F;c7V+=W1p;c7V+=S3F;c7V+=h8F;var G7V=c4U;G7V+=Q7U;var J7V=g71.h7F;J7V+=a1p;J7V+=B7F;J7V+=O0F;var z7V=Y5F;z7V+=i1p;z7V+=y1p;var h7V=f8F;h7V+=i7F;h7V+=h0F;h7V+=g71.F7F;var L7V=g71.X7F;L7V+=Z1p;L7V+=B7F;var x7V=B1p;x7V+=g71.x7F;x7V+=C3F;x7V+=B7F;var v7V=U4F;v7V+=o1p;var Q7V=R1F;Q7V+=f1p;Q7V+=O0F;var O7V=t1p;O7V+=g71.h7F;var X7V=M3F;X7V+=A1p;X7V+=O0F;var F7V=B7F;F7V+=Q0F;init=$[F7V](K9F,{},Editor[X7V],init);this[O0F]=$[O7V](K9F,{},Editor[Q7V][v7V],{table:init[x7V]||init[L7V],dbTable:init[d1p]||A5F,ajaxUrl:init[l1p],ajax:init[Q2U],idSrc:init[h7V],dataSource:init[C1p]||init[y9U]?Editor[z7V][n1p]:Editor[J7V][G7V],formOptions:init[P4U],legacyAjax:init[q1p],template:init[c7V]?$(init[I7V])[O7U]():A5F});this[T7V]=$[H7V](K9F,{},Editor[G6F]);g71[g71.Y7F]();this[E7V]=init[K7V];Editor[W7V][a7V][i7V]++;var that=this;var classes=this[G6F];this[s5F]={"wrapper":$(y7V+classes[H0U]+x5F+s1p+classes[T7p][e1p]+Z7V+N1p+classes[B7V][H0U]+x5F+o7V+classes[f7V][z0U]+t7V+A7V+m1p+classes[d7V][H0U]+l7V+O5F+classes[C7V][n7V]+p1p+q7V+z5F)[J68],"form":$(s7V+classes[L5U][P1p]+e7V+N7V+classes[m7V][p7V]+p1p+P7V)[J68],"formError":$(S7V+classes[k7V][V7V]+u4V)[J68],"formInfo":$(g4V+classes[b4V][M4V]+p1p)[J68],"header":$(U4V+classes[L3p][D4V]+S1p+classes[L3p][z0U]+k1p)[J68],"buttons":$(V1p+classes[L5U][G5U]+j4V)[J68]};if($[V1F][Y4V][u9p]){var X4V=h0F;X4V+=B7F;X4V+=R1F;X4V+=a0p;var F4V=g9p;F4V+=B7F;var R4V=B7F;R4V+=q7U;R4V+=o8F;var w4V=b9p;w4V+=V4F;w4V+=M9p;w4V+=U9p;var r4V=g71.h7F;r4V+=g71.x7F;r4V+=D9p;r4V+=j9p;var ttButtons=$[V1F][r4V][u9p][w4V];var i18n=this[u5F];$[R4V]([F4V,p4p,X4V],function(i,val){var r9p="onT";var Y9p="sButt";var w9p="itor";var Q4V=Y9p;Q4V+=r9p;Q4V+=B7F;Q4V+=d7F;var O4V=k5F;O4V+=w9p;O4V+=Y3F;ttButtons[O4V+val][Q4V]=i18n[val][p4U];});}$[v4V](init[x4V],function(evt,fn){that[p5F](evt,function(){var z4V=B4p;z4V+=y4F;z4V+=K0F;var h4V=R9p;h4V+=P0F;h4V+=g71.O7F;h4V+=g71.X7F;var L4V=o8F;L4V+=g71.v7F;var args=Array[O6F][C0p][Q6F](arguments);g71[L4V]();args[h4V]();fn[z4V](that,args);});});var dom=this[J4V];var wrapper=dom[H0U];dom[G4V]=_editor_el(c4V,dom[L5U])[J68];dom[F9p]=_editor_el(X9p,wrapper)[J68];dom[I4V]=_editor_el(M3U,wrapper)[J68];dom[O9p]=_editor_el(T4V,wrapper)[J68];dom[T7p]=_editor_el(H4V,wrapper)[J68];if(init[m9U]){var E4V=u2U;E4V+=O0F;this[q9U](init[E4V]);}$(document)[K4V](Q9p+this[O0F][v9p],function(e,settings,json){var x9p="nTable";var W4V=a0F;W4V+=g71.v7F;g71[W4V]();if(that[O0F][y9U]&&settings[x9p]===$(that[O0F][y9U])[Y4p](J68)){settings[c3p]=that;}})[p5F](L9p+this[O0F][v9p],function(e,settings,json){var h9p="_optionsUpda";var y4V=Q8F;y4V+=r4U;var i4V=I4U;i4V+=d4F;i4V+=y4F;i4V+=B7F;var a4V=S7F;a4V+=V4F;a4V+=g71.x7F;a4V+=j4F;g71[g71.Y7F]();if(json&&that[O0F][y9U]&&settings[a4V]===$(that[O0F][i4V])[y4V](J68)){var Z4V=h9p;Z4V+=p0F;that[Z4V](json);}});try{var f4V=g71.h7F;f4V+=P0F;f4V+=T6F;f4V+=H6F;var o4V=P5F;o4V+=O0F;o4V+=z9p;o4V+=K0F;var B4V=J9p;B4V+=G9p;this[O0F][B4V]=Editor[o4V][init[f4V]][c9p](this);}catch(e){var I9p='Cannot find display controller ';throw I9p+init[Y7U];}this[t4V](A4V,[]);};Editor[d4V][l4V]=function(){var W9p="addClas";var T9p="mov";var K9p="actions";var E9p="rapper";var m4V=K4F;m4V+=T9p;m4V+=B7F;var s4V=m8F;s4V+=B7F;s4V+=h8F;var q4V=K4F;q4V+=H9p;var n4V=H9U;n4V+=g71.x7F;n4V+=g71.X7F;n4V+=B7F;var C4V=c8F;C4V+=E9p;var classesActions=this[G6F][K9p];var action=this[O0F][Z9U];var wrapper=$(this[s5F][C4V]);wrapper[o6F]([classesActions[n4V],classesActions[m7p],classesActions[q4V]][q0p](Q5F));if(action===s4V){var e4V=W9p;e4V+=O0F;wrapper[e4V](classesActions[a9p]);}else if(action===m7p){var N4V=k5F;N4V+=o3F;wrapper[J6F](classesActions[N4V]);}else if(action===m4V){var P4V=h0F;P4V+=F4U;var p4V=g71.x7F;p4V+=i9p;p4V+=y9p;p4V+=n1U;wrapper[p4V](classesActions[P4V]);}};Editor[S4V][Z9p]=function(data,success,error,submitParams){var u2p=',';var B9p="deleteBo";var v2p='DELETE';var j2p=/_id_/;var l9p='POST';var R2p="nsh";var z2p='?';var M2p="Of";var Y2p="exOf";var d9p="axU";var w2p="mple";var F2p="complet";var U2p="axUrl";var f9p="Obj";var b2p="dex";var o9p="isPlain";var r2p="complete";var x2p="deleteBody";var L2p="param";var Z0V=g71.x7F;Z0V+=D7p;Z0V+=g71.x7F;Z0V+=o7F;var i0V=B9p;i0V+=w3F;var E0V=C7F;E0V+=h0F;E0V+=y4F;var O0V=Y6F;O0V+=c7p;var X0V=o9p;X0V+=f9p;X0V+=c0p;var R0V=t9p;R0V+=A9p;var w0V=U1F;w0V+=d9p;w0V+=h0F;w0V+=y4F;var k4V=D7p;k4V+=O0F;k4V+=p5F;var that=this;var action=this[O0F][Z9U];var thrown;var opts={type:l9p,dataType:k4V,data:A5F,error:[function(xhr,text,err){var V4V=o8F;V4V+=g71.v7F;g71[V4V]();thrown=err;}],success:[],complete:[function(xhr,text){var m9p="JS";var N9p="rse";var s9p="tatu";var p9p="ON";var S68=204;var P9p="po";var k9p="respo";var S9p="seJSON";var V9p="nseJS";var C9p="ull";var q9p="ponseText";var e9p="responseTex";var Y0V=o9p;Y0V+=f9p;Y0V+=c0p;var b0V=S7F;b0V+=C9p;var g0V=n9p;g0V+=q9p;var u0V=O0F;u0V+=s9p;u0V+=O0F;var json=A5F;if(xhr[u0V]===S68||xhr[g0V]===b0V){json={};}else{try{var j0V=e9p;j0V+=g71.X7F;var D0V=J4U;D0V+=N9p;D0V+=m9p;D0V+=p9p;var U0V=n9p;U0V+=P9p;U0V+=S7F;U0V+=S9p;var M0V=k9p;M0V+=V9p;M0V+=p9p;json=xhr[M0V]?xhr[U0V]:$[D0V](xhr[j0V]);}catch(e){}}if($[Y0V](json)||$[u4U](json)){var r0V=s7U;r0V+=J0F;r0V+=C7F;r0V+=O0F;success(json,xhr[r0V]>=k68,xhr);}else{error(xhr,text,thrown);}}]};var a;var ajaxSrc=this[O0F][Q2U]||this[O0F][w0V];var id=action===p4p||action===H3p?_pluck(this[O0F][C6U],R0V):A5F;if($[u4U](id)){var F0V=D7p;F0V+=g71.w7F;F0V+=P0F;F0V+=S7F;id=id[F0V](u2p);}if($[X0V](ajaxSrc)&&ajaxSrc[action]){ajaxSrc=ajaxSrc[action];}if(typeof ajaxSrc===O0V){var Q0V=Q2U;Q0V+=g2p;Q0V+=h0F;Q0V+=y4F;var uri=A5F;var method=A5F;if(this[O0F][Q0V]){var x0V=P0F;x0V+=S7F;x0V+=b2p;x0V+=M2p;var v0V=U1F;v0V+=U2p;var url=this[O0F][v0V];if(url[a9p]){uri=url[action];}if(uri[x0V](Q5F)!==-G68){a=uri[D2p](Q5F);method=a[J68];uri=a[G68];}uri=uri[N7U](j2p,id);}ajaxSrc(method,uri,data,success,error);return;}else if(typeof ajaxSrc===w6U){var L0V=P0F;L0V+=R0F;L0V+=Y2p;if(ajaxSrc[L0V](Q5F)!==-G68){var h0V=C7F;h0V+=h0F;h0V+=y4F;a=ajaxSrc[D2p](Q5F);opts[c3F]=a[J68];opts[h0V]=a[G68];}else{var z0V=C7F;z0V+=h0F;z0V+=y4F;opts[z0V]=ajaxSrc;}}else{var H0V=P2F;H0V+=g71.X7F;H0V+=B7F;H0V+=R0F;var optsCopy=$[e5F]({},ajaxSrc||{});if(optsCopy[r2p]){var c0V=g71.F7F;c0V+=g71.w7F;c0V+=w2p;c0V+=p0F;var G0V=C7F;G0V+=R2p;G0V+=n4U;var J0V=F2p;J0V+=B7F;opts[J0V][G0V](optsCopy[r2p]);delete optsCopy[c0V];}if(optsCopy[P6F]){var T0V=X2p;T0V+=P3F;var I0V=X2p;I0V+=P3F;opts[I0V][O2p](optsCopy[T0V]);delete optsCopy[P6F];}opts=$[H0V]({},opts,optsCopy);}opts[E0V]=opts[y7p][N7U](j2p,id);if(opts[Y5F]){var a0V=B7F;a0V+=o7F;a0V+=Q2p;a0V+=g71.h7F;var W0V=H1F;W0V+=g71.X7F;W0V+=g71.x7F;var K0V=D2U;K0V+=g71.x7F;var isFn=typeof opts[K0V]===g71.G7F;var newData=isFn?opts[W0V](data):opts[Y5F];data=isFn&&newData?newData:$[a0V](K9F,data,newData);}opts[Y5F]=data;if(opts[c3F]===v2p&&(opts[x2p]===undefined||opts[i0V]===K9F)){var y0V=g71.h7F;y0V+=g71.x7F;y0V+=g71.X7F;y0V+=g71.x7F;var params=$[L2p](opts[Y5F]);opts[y7p]+=opts[y7p][h2p](z2p)===-G68?z2p+params:p7U+params;delete opts[y0V];}$[Z0V](opts);};Editor[B0V][R3U]=function(target,style,time,callback){var J2p="stop";var f0V=g71.O7F;f0V+=S7F;var o0V=o8F;o0V+=g71.v7F;g71[o0V]();if($[f0V][H4U]){var t0V=v1U;t0V+=x1U;target[J2p]()[t0V](style,time,callback);}else{target[n5F](style);if(typeof time===g71.G7F){time[Q6F](target);}else if(callback){var A0V=V3p;A0V+=y4F;callback[A0V](target);}}};Editor[O6F][d0V]=function(){var T2p="but";var G2p="ormI";var E2p="eader";var I2p="Con";var H2p="ote";var c2p="nfo";var N0V=g71.O7F;N0V+=G2p;N0V+=c2p;var e0V=R7U;e0V+=F8p;e0V+=g71.h7F;var s0V=w8U;s0V+=w3F;s0V+=I2p;s0V+=J9U;var q0V=T2p;q0V+=G3F;q0V+=S7F;q0V+=O0F;var n0V=j1F;n0V+=H2p;n0V+=h0F;var C0V=o8F;C0V+=E2p;var l0V=t3U;l0V+=c3U;l0V+=r4F;var dom=this[s5F];$(dom[l0V])[l5F](dom[C0V]);$(dom[n0V])[r3U](dom[q4p])[r3U](dom[q0V]);$(dom[s0V])[e0V](dom[N0V])[r3U](dom[L5U]);};Editor[m0V][p0V]=function(){var W2p="nBl";var K2p="reB";var V0V=G2U;V0V+=c2U;V0V+=o3F;var k0V=o8F;k0V+=g71.v7F;var S0V=z0F;S0V+=K2p;S0V+=I2U;S0V+=h0F;var P0V=g71.w7F;P0V+=W2p;P0V+=W5U;var opts=this[O0F][h2U];var onBlur=opts[P0V];if(this[R3p](S0V)===T9F){return;}g71[k0V]();if(typeof onBlur===g71.G7F){onBlur(this);}else if(onBlur===V0V){this[b6U]();}else if(onBlur===S4U){this[a5U]();}};Editor[O6F][S4p]=function(){var a2p="moveClass";var g3V=B7F;g3V+=h0F;g3V+=v4p;var u3V=h0F;u3V+=B7F;u3V+=a2p;if(!this[O0F]){return;}var errorClass=this[G6F][u2U][P6F];g71[g71.Y7F]();var fields=this[O0F][m9U];$(N4p+errorClass,this[s5F][H0U])[u3V](errorClass);$[j6F](fields,function(name,field){field[P6F](S1F)[h5U](S1F);});this[g3V](S1F)[h5U](S1F);};Editor[O6F][a5U]=function(submitComplete,mode){var y2p="ditor-focu";var f2p="closeCb";var B2p="eIcb";var o2p="reC";var A2p="seIc";var i2p="focus.";var Y3V=i2p;Y3V+=B7F;Y3V+=y2p;Y3V+=O0F;var j3V=Z2p;j3V+=g71.O7F;var D3V=o8F;D3V+=g71.v7F;var M3V=g71.F7F;M3V+=U8U;M3V+=B2p;var b3V=z0F;b3V+=o2p;b3V+=S2U;if(this[R3p](b3V)===T9F){return;}if(this[O0F][f2p]){this[O0F][f2p](submitComplete,mode);this[O0F][f2p]=A5F;}if(this[O0F][M3V]){var U3V=t2p;U3V+=A2p;U3V+=d4F;this[O0F][U3V]();this[O0F][d2p]=A5F;}g71[D3V]();$(M3U)[j3V](Y3V);this[O0F][t7p]=T9F;this[R3p](S4U);};Editor[O6F][m4p]=function(fn){var l2p="Cb";var r3V=Y1F;r3V+=g71.w7F;r3V+=U4F;r3V+=l2p;g71[F9F]();this[O0F][r3V]=fn;};Editor[w3V][n6U]=function(arg1,arg2,arg3,arg4){var C2p="Pl";var n2p="ainObject";var q2p="main";var R3V=B7U;R3V+=C2p;R3V+=n2p;var that=this;var title;var buttons;var show;var opts;if($[R3V](arg1)){opts=arg1;}else if(typeof arg1===B2U){show=arg1;opts=arg2;}else{title=arg1;buttons=arg2;show=arg3;opts=arg4;}if(show===undefined){show=K9F;}if(title){var F3V=r3F;F3V+=g71.X7F;F3V+=c4F;that[F3V](title);}if(buttons){that[G5U](buttons);}return{opts:$[e5F]({},this[O0F][P4U][q2p],opts),maybeOpen:function(){var X3V=o8F;X3V+=g71.v7F;g71[X3V]();if(show){var O3V=g71.w7F;O3V+=z0F;O3V+=B7F;O3V+=S7F;that[O3V]();}}};};Editor[O6F][Q3V]=function(name){var L3V=o8F;L3V+=g71.v7F;var x3V=J6U;x3V+=y4F;x3V+=y4F;var v3V=I3F;v3V+=Q3F;var args=Array[v3V][C0p][x3V](arguments);args[F6F]();var fn=this[O0F][s2p][name];g71[L3V]();if(fn){var h3V=R7U;h3V+=z0F;h3V+=e2p;return fn[h3V](this,args);}};Editor[O6F][O2U]=function(includeFields){var N2p="_even";var p2p="formContent";var m2p="detac";var U5p='displayOrder';var a3V=N2p;a3V+=g71.X7F;var J3V=m2p;J3V+=o8F;var z3V=H3U;z3V+=g71.h7F;z3V+=h0F;z3V+=x3F;var that=this;var formContent=$(this[s5F][p2p]);var fields=this[O0F][m9U];var order=this[O0F][w2U];var template=this[O0F][A7p];var mode=this[O0F][q6U]||s6U;if(includeFields){this[O0F][y5U]=includeFields;}else{includeFields=this[O0F][y5U];}formContent[z3V]()[J3V]();$[j6F](order,function(i,fieldOrName){var u5p="mplate=\"";var b5p='editor-field[name="';var V2p="itor-te";var M5p="after";var k2p="[data-ed";var P2p="_weakInArray";var G3V=m8p;G3V+=g71.L7F;G3V+=B7F;var name=fieldOrName instanceof Editor[W9F]?fieldOrName[G3V]():fieldOrName;g71[g71.Y7F]();if(that[P2p](name,includeFields)!==-G68){var c3V=g71.L7F;c3V+=S2p;if(template&&mode===c3V){var K3V=S7F;K3V+=T0p;K3V+=B7F;var E3V=k2p;E3V+=V2p;E3V+=u5p;var H3V=g71.O7F;H3V+=P0F;H3V+=S7F;H3V+=g71.h7F;var T3V=S7F;T3V+=g71.w7F;T3V+=g71.h7F;T3V+=B7F;var I3V=g5p;I3V+=g71.h7F;template[I3V](b5p+name+w9F)[M5p](fields[name][T3V]());template[H3V](E3V+name+w9F)[r3U](fields[name][K3V]());}else{var W3V=Z7U;W3V+=g71.h7F;W3V+=B7F;formContent[r3U](fields[name][W3V]());}}});if(template&&mode===s6U){template[O8U](formContent);}g71[F9F]();this[a3V](U5p,[this[O0F][t7p],this[O0F][Z9U],formContent]);};Editor[i3V][y3V]=function(items,editFields,type,formOptions,setupDone){var G5p='node';var D5p="rder";var h5p="oS";var j5p="odifi";var r5p="editData";var J5p='initEdit';var b8V=g71.h7F;b8V+=g71.x7F;b8V+=g71.X7F;b8V+=g71.x7F;var g8V=V8p;g8V+=S7F;g8V+=g71.X7F;var k3V=E6F;k3V+=o8F;var S3V=g71.w7F;S3V+=D5p;var t3V=g71.L7F;t3V+=g71.w7F;t3V+=g71.h7F;t3V+=B7F;var f3V=g71.O7F;f3V+=R1p;var o3V=g71.x7F;o3V+=g71.F7F;o3V+=X0F;var B3V=g71.L7F;B3V+=j5p;B3V+=B7F;B3V+=h0F;var Z3V=g71.O7F;Z3V+=P0F;Z3V+=Y5p;var that=this;g71[g71.Y7F]();var fields=this[O0F][Z3V];var usedFields=[];var includeInOrder;var editData={};this[O0F][C6U]=editFields;this[O0F][r5p]=editData;this[O0F][B3V]=items;this[O0F][o3V]=m7p;this[s5F][f3V][D1U][Y7U]=f7U;this[O0F][t3V]=type;this[V0p]();$[j6F](fields,function(name,field){var R5p="tiR";var p3V=g71.L7F;p3V+=w5p;p3V+=b3F;p3V+=O0F;var A3V=a9F;A3V+=R5p;A3V+=A3p;A3V+=r4U;field[A3V]();includeInOrder=T9F;editData[name]={};$[j6F](editFields,function(idSrc,edit){var x5p="playFiel";var Q5p="playF";var F5p="From";var L5p="Set";var O5p='row';var X5p="scope";var l3V=g71.O7F;l3V+=v1F;l3V+=y4F;l3V+=A7F;var d3V=o8F;d3V+=g71.v7F;g71[d3V]();if(edit[l3V][name]){var q3V=O0F;q3V+=y4F;q3V+=y9F;q3V+=B7F;var n3V=r4p;n3V+=X2U;var C3V=J3p;C3V+=F5p;C3V+=e2F;var val=field[C3V](edit[Y5F]);editData[name][idSrc]=val===A5F?S1F:$[n3V](val)?val[q3V]():val;if(!formOptions||formOptions[X5p]===O5p){var s3V=P5F;s3V+=O0F;s3V+=Q5p;s3V+=c6U;field[Y2U](idSrc,val!==undefined?val:field[M3F]());if(!edit[v5p]||edit[s3V][name]){includeInOrder=K9F;}}else{var e3V=D4U;e3V+=x5p;e3V+=A7F;if(!edit[v5p]||edit[e3V][name]){var m3V=n8F;m3V+=g71.O7F;var N3V=t9F;N3V+=L5p;field[N3V](idSrc,val!==undefined?val:field[m3V]());includeInOrder=K9F;}}}});if(field[p3V]()[c7U]!==J68&&includeInOrder){var P3V=z0F;P3V+=C7F;P3V+=O0F;P3V+=o8F;usedFields[P3V](name);}});var currOrder=this[S3V]()[C0p]();for(var i=currOrder[k3V]-G68;i>=J68;i--){var V3V=g71.X7F;V3V+=h5p;V3V+=z5p;V3V+=g9U;if($[i7U](currOrder[i][V3V](),usedFields)===-G68){var u8V=O0F;u8V+=E6U;currOrder[u8V](i,G68);}}this[O2U](currOrder);this[g8V](J5p,[_pluck(editFields,G5p)[J68],_pluck(editFields,b8V)[J68],items,type],function(){var I5p="tiEdit";var c5p="itMul";var U8V=P0F;U8V+=S7F;U8V+=c5p;U8V+=I5p;var M8V=a0F;M8V+=g71.v7F;g71[M8V]();that[R3p](U8V,[editFields,items,type],function(){var D8V=a0F;D8V+=g71.v7F;g71[D8V]();setupDone();});});};Editor[O6F][j8V]=function(trigger,args,promiseComplete){var E5p='pre';var i5p="esu";var K5p="result";var Z5p="then";var W5p="Cancell";var H5p="riggerHandler";var Y8V=C9U;Y8V+=n3p;if(!args){args=[];}if($[Y8V](trigger)){var r8V=T5p;r8V+=g71.X7F;r8V+=o8F;for(var i=J68,ien=trigger[r8V];i<ien;i++){this[R3p](trigger[i],args);}}else{var R8V=g71.X7F;R8V+=H5p;var w8V=z4F;w8V+=q2F;w8V+=x3F;w8V+=g71.X7F;var e=$[w8V](trigger);$(this)[R8V](e,args);if(trigger[h2p](E5p)===J68&&e[K5p]===T9F){var X8V=W5p;X8V+=k5F;var F8V=z4F;F8V+=q2F;F8V+=x3F;F8V+=g71.X7F;$(this)[a5p]($[F8V](trigger+X8V),args);}if(promiseComplete){var v8V=g71.X7F;v8V+=o8F;v8V+=B7F;v8V+=S7F;var Q8V=h0F;Q8V+=i5p;Q8V+=y5p;var O8V=K4F;O8V+=O0F;O8V+=C7F;O8V+=y5p;if(e[O8V]&&typeof e[Q8V]===I9F&&e[K5p][v8V]){var x8V=n9p;x8V+=V2F;e[x8V][Z5p](promiseComplete);}else{promiseComplete();}}return e[K5p];}};Editor[L8V][K0p]=function(input){var t5p="toLowerCase";var A5p="substring";var f5p=/^on([A-Z])/;var o5p="matc";var G8V=D7p;G8V+=g71.w7F;G8V+=P0F;G8V+=S7F;var z8V=a0F;z8V+=g71.v7F;var h8V=B5p;h8V+=y4F;h8V+=P0F;h8V+=g71.X7F;var name;var names=input[h8V](Q5F);g71[z8V]();for(var i=J68,ien=names[c7U];i<ien;i++){var J8V=o5p;J8V+=o8F;name=names[i];var onStyle=name[J8V](f5p);if(onStyle){name=onStyle[G68][t5p]()+name[A5p](I68);}names[i]=name;}return names[G8V](Q5F);};Editor[c8V][d5p]=function(node){var I8V=l5p;I8V+=o8F;var foundField=A5F;$[I8V](this[O0F][m9U],function(name,field){var T8V=z9F;T8V+=Q8F;T8V+=G9F;if($(field[t9U]())[C4p](node)[T8V]){foundField=field;}});return foundField;};Editor[O6F][K6U]=function(fieldNames){if(fieldNames===undefined){var H8V=g71.O7F;H8V+=P0F;H8V+=Y5p;return this[H8V]();}else if(!$[u4U](fieldNames)){return[fieldNames];}return fieldNames;};Editor[E8V][Y0p]=function(fieldsIn,focus){var m5p="foc";var q5p="lace";var C5p="setFoc";var s5p="v.DTE";var N5p=/^jq:/;var n5p="q";var Z8V=C5p;Z8V+=V6F;var K8V=g71.L7F;K8V+=R7U;g71[F9F]();var that=this;var field;var fields=$[K8V](fieldsIn,function(fieldOrName){var W8V=s7U;W8V+=h0F;W8V+=y8F;W8V+=Q8F;return typeof fieldOrName===W8V?that[O0F][m9U][fieldOrName]:fieldOrName;});if(typeof focus===l6U){field=fields[focus];}else if(focus){var a8V=D7p;a8V+=n5p;a8V+=h4U;if(focus[h2p](a8V)===J68){var y8V=P3p;y8V+=q5p;var i8V=P5F;i8V+=s5p;i8V+=e5p;field=$(i8V+focus[y8V](N5p,S1F));}else{field=this[O0F][m9U][focus];}}this[O0F][Z8V]=field;if(field){var B8V=m5p;B8V+=V6F;field[B8V]();}};Editor[o8V][f8V]=function(opts){var z6p="onReturn";var L6p="Bl";var w6p="turn";var E6p="activeElement";var U6p="itCo";var R6p="ubmitOnBlur";var k5p="ag";var J6p='submit';var F6p="oseOnCo";var D6p="unt";var j6p="editOp";var Z6p="canReturnSubmit";var x6p="tOnBlu";var G6p="onBac";var h6p="itOnRe";var v6p="closeOnComplete";var V5p="mes";var I6p="blurOnBackground";var Y6p="OnB";var p5p="key";var u6p="sag";var r6p="tOnRe";var S5p="mess";var c6p="kground";var O6p="dteInlin";var z1V=g71.w7F;z1V+=S7F;var Q1V=p5p;Q1V+=P5p;var O1V=g71.w7F;O1V+=S7F;var R1V=p4U;R1V+=O0F;var r1V=g71.O7F;r1V+=C7F;r1V+=a7p;var Y1V=S5p;Y1V+=k5p;Y1V+=B7F;var j1V=m3F;j1V+=P0F;j1V+=s1F;var D1V=V5p;D1V+=u6p;D1V+=B7F;var M1V=W7p;M1V+=g6p;M1V+=g71.w7F;M1V+=S7F;var b1V=s7U;b1V+=b6p;b1V+=Q8F;var g1V=M6p;g1V+=c4F;var u1V=B7F;u1V+=g71.h7F;u1V+=U6p;u1V+=D6p;var V8V=j6p;V8V+=g71.X7F;V8V+=O0F;var P8V=C3F;P8V+=W5U;P8V+=Y6p;P8V+=D8U;var p8V=o8F;p8V+=g71.v7F;var e8V=w1F;e8V+=r6p;e8V+=w6p;var C8V=O0F;C8V+=R6p;var A8V=Y1F;A8V+=F6p;A8V+=R4U;A8V+=X6p;var t8V=T7F;t8V+=O6p;t8V+=B7F;var that=this;var inlineCount=__inlineCounter++;var namespace=t8V+inlineCount;if(opts[A8V]!==undefined){var l8V=g71.F7F;l8V+=S2U;var d8V=Q6p;d8V+=X6p;opts[d8V]=opts[v6p]?l8V:i6F;}if(opts[C8V]!==undefined){var s8V=w1F;s8V+=g71.X7F;var q8V=w1F;q8V+=x6p;q8V+=h0F;var n8V=g71.w7F;n8V+=S7F;n8V+=L6p;n8V+=W5U;opts[n8V]=opts[q8V]?s8V:S4U;}if(opts[e8V]!==undefined){var m8V=S7F;m8V+=W0p;var N8V=L4U;N8V+=h6p;N8V+=w6p;opts[z6p]=opts[N8V]?J6p:m8V;}g71[p8V]();if(opts[P8V]!==undefined){var k8V=S7F;k8V+=W0p;var S8V=G6p;S8V+=c6p;opts[S8V]=opts[I6p]?k4U:k8V;}this[O0F][V8V]=opts;this[O0F][u1V]=inlineCount;if(typeof opts[g1V]===b1V||typeof opts[T5F]===M1V){var U1V=M6p;U1V+=c4F;this[U1V](opts[T5F]);opts[T5F]=K9F;}if(typeof opts[D1V]===j1V||typeof opts[Y1V]===r1V){var w1V=g71.L7F;w1V+=j2F;this[h5U](opts[h5U]);opts[w1V]=K9F;}if(typeof opts[R1V]!==B2U){var X1V=d4F;X1V+=S5U;X1V+=g71.X7F;X1V+=T6p;var F1V=s4p;F1V+=r0F;this[F1V](opts[G5U]);opts[X1V]=K9F;}$(document)[O1V](Q1V+namespace,function(e){var H6p="splayed";var B6p="preventDefaul";var y6p="mN";var W6p="rnSubmit";var a6p="_fiel";var K6p="canRetu";var i6p="dFro";var v1V=P5F;v1V+=H6p;if(e[x6U]===y68&&that[O0F][v1V]){var el=$(document[E6p]);if(el){var L1V=K6p;L1V+=W6p;var x1V=a6p;x1V+=i6p;x1V+=y6p;x1V+=r0U;var field=that[x1V](el);if(field&&typeof field[Z6p]===g71.G7F&&field[L1V](el)){var h1V=B6p;h1V+=g71.X7F;e[h1V]();}}}});$(document)[z1V](v6U+namespace,function(e){var e68=39;var l6p="onRetur";var s6p="Esc";var b7i="next";var A6p="paren";var C6p="reventDefa";var g7i="ton";var o6p="Form_";var N6p="blu";var k6p="Cod";var q6p="ventDefau";var t6p="ttons";var s68=37;var f6p="Bu";var u7i="prev";var p6p="nct";var P6p="onEsc";var e6p="nEsc";var m6p="nE";var Z1V=s3U;Z1V+=o6p;Z1V+=f6p;Z1V+=t6p;var y1V=A6p;y1V+=g71.X7F;y1V+=O0F;var el=$(document[E6p]);if(e[x6U]===y68&&that[O0F][t7p]){var field=that[d5p](el);if(field&&typeof field[Z6p]===g71.G7F&&field[Z6p](el)){var G1V=O0F;G1V+=d6p;G1V+=o3F;var J1V=l6p;J1V+=S7F;if(opts[J1V]===G1V){var c1V=z0F;c1V+=C6p;c1V+=V2F;e[c1V]();that[b6U]();}else if(typeof opts[z6p]===g71.G7F){var I1V=n6p;I1V+=q6p;I1V+=y5p;e[I1V]();opts[z6p](that,e);}}}else if(e[x6U]===d68){var i1V=p5F;i1V+=s6p;var a1V=g71.F7F;a1V+=y4F;a1V+=g71.w7F;a1V+=U4F;var W1V=g71.w7F;W1V+=e6p;var E1V=N6p;E1V+=h0F;var H1V=g71.w7F;H1V+=m6p;H1V+=O0F;H1V+=g71.F7F;var T1V=g71.O7F;T1V+=C7F;T1V+=p6p;T1V+=c7p;e[z6U]();if(typeof opts[P6p]===T1V){opts[P6p](that,e);}else if(opts[H1V]===E1V){var K1V=d4F;K1V+=d3F;that[K1V]();}else if(opts[W1V]===a1V){that[J0U]();}else if(opts[i1V]===J6p){that[b6U]();}}else if(el[y1V](Z1V)[c7U]){var f1V=S6p;f1V+=K0F;f1V+=W7F;f1V+=r0U;var B1V=p5p;B1V+=k6p;B1V+=B7F;if(e[B1V]===s68){var o1V=d4F;o1V+=C7F;o1V+=V6p;el[u7i](o1V)[M7U]();}else if(e[f1V]===e68){var A1V=j1F;A1V+=U6F;A1V+=O0F;var t1V=D5U;t1V+=g71.X7F;t1V+=g7i;el[b7i](t1V)[A1V]();}}});this[O0F][d2p]=function(){var M7i='keydown';var d1V=Z2p;d1V+=g71.O7F;$(document)[d1V](M7i+namespace);$(document)[H0p](v6U+namespace);};return namespace;};Editor[l1V][U7i]=function(direction,action,data){var j7i='send';var D7i="gacyAj";var n1V=o8F;n1V+=g71.v7F;var C1V=c4F;C1V+=D7i;C1V+=D1F;if(!this[O0F][C1V]||!data){return;}g71[n1V]();if(direction===j7i){if(action===O0p||action===p4p){var N1V=D2U;N1V+=g71.x7F;var e1V=g71.h7F;e1V+=J0F;e1V+=g71.x7F;var s1V=g71.h7F;s1V+=g71.x7F;s1V+=g71.X7F;s1V+=g71.x7F;var q1V=B7F;q1V+=g71.x7F;q1V+=g71.F7F;q1V+=o8F;var id;$[q1V](data[s1V],function(rowId,values){var Y7i='Editor: Multi-row editing is not supported by the legacy Ajax data format';if(id!==undefined){throw Y7i;}id=rowId;});data[e1V]=data[N1V][id];if(action===p4p){data[f8F]=id;}}else{var p1V=H1F;p1V+=I4U;var m1V=g71.L7F;m1V+=g71.x7F;m1V+=z0F;data[f8F]=$[m1V](data[Y5F],function(values,id){return id;});delete data[p1V];}}else{var k1V=g71.h7F;k1V+=g71.x7F;k1V+=g71.X7F;k1V+=g71.x7F;var P1V=h0F;P1V+=g3F;if(!data[Y5F]&&data[P1V]){var S1V=h0F;S1V+=g3F;data[Y5F]=[data[S1V]];}else if(!data[k1V]){data[Y5F]=[];}}};Editor[V1V][r7i]=function(json){var u9V=w7i;u9V+=r6F;u9V+=r0F;var that=this;if(json[u9V]){var g9V=B7F;g9V+=q7U;g9V+=o8F;$[g9V](this[O0F][m9U],function(name,field){var F7i="update";var X7i="upda";var R7i="optio";var b9V=R7i;b9V+=r0F;if(json[b9V][name]!==undefined){var M9V=g71.O7F;M9V+=O8p;var fieldInst=that[M9V](name);if(fieldInst&&fieldInst[F7i]){var U9V=X7i;U9V+=p0F;fieldInst[U9V](json[O7i][name]);}}});}};Editor[D9V][g4p]=function(el,msg){var Q7i="fad";var L7i="ade";var v7i="Ou";var x7i="laye";var canAnimate=$[V1F][H4U]?K9F:T9F;if(typeof msg===g71.G7F){msg=msg(this,new DataTable[z3p](this[O0F][y9U]));}g71[F9F]();el=$(el);if(canAnimate){var j9V=O0F;j9V+=G3F;j9V+=z0F;el[j9V]();}if(!msg){var Y9V=L1U;Y9V+=g71.x7F;Y9V+=K0F;Y9V+=k5F;if(this[O0F][Y9V]&&canAnimate){var r9V=Q7i;r9V+=B7F;r9V+=v7i;r9V+=g71.X7F;el[r9V](function(){var w9V=o8F;w9V+=g71.X7F;w9V+=g71.L7F;w9V+=y4F;g71[F9F]();el[w9V](S1F);});}else{var R9V=S7F;R9V+=g71.w7F;R9V+=S7F;R9V+=B7F;el[K4U](S1F)[n5F](w7U,R9V);}}else{var F9V=P5F;F9V+=B5p;F9V+=x7i;F9V+=g71.h7F;if(this[O0F][F9V]&&canAnimate){var O9V=g71.O7F;O9V+=L7i;O9V+=h7i;var X9V=i4U;X9V+=y4F;el[X9V](msg)[O9V]();}else{var v9V=d4F;v9V+=x2U;v9V+=W7U;var Q9V=o8F;Q9V+=F7U;Q9V+=y4F;el[Q9V](msg)[n5F](w7U,v9V);}}};Editor[x9V][C4U]=function(){var J7i="Shown";var G7i="isMul";var z7i="Info";var fields=this[O0F][m9U];var include=this[O0F][y5U];var show=K9F;var state;if(!include){return;}for(var i=J68,ien=include[c7U];i<ien;i++){var z9V=t9F;z9V+=z7i;z9V+=J7i;var h9V=G7i;h9V+=g71.X7F;h9V+=l7U;var L9V=U7U;L9V+=B7F;var field=fields[include[i]];var multiEditable=field[b6F]();if(field[L9V]()&&multiEditable&&show){state=K9F;show=T9F;}else if(field[h9V]()&&!multiEditable){state=K9F;}else{state=T9F;}fields[include[i]][z9V](state);}};Editor[J9V][r0p]=function(type){var E7i="oller";var K7i="captureFocus";var I7i="submit.e";var y7i="or-focus";var H7i="layContr";var W7i='submit.editor-internal';var i7i="s.e";var T7i="tor-internal";var c7i="iInfo";var o9V=g71.x7F;o9V+=y2U;o9V+=r6F;o9V+=S7F;var B9V=Z0p;B9V+=S7F;var Z9V=Y3F;Z9V+=d7U;Z9V+=c7i;var H9V=X5U;H9V+=d4F;H9V+=y4F;H9V+=B7F;var I9V=I7i;I9V+=P5F;I9V+=T7i;var c9V=g71.w7F;c9V+=g71.O7F;c9V+=g71.O7F;var G9V=B0p;G9V+=H7i;G9V+=E7i;var that=this;var focusCapture=this[O0F][G9V][K7i];if(focusCapture===undefined){focusCapture=K9F;}$(this[s5F][L5U])[c9V](I9V)[p5F](W7i,function(e){var T9V=a0F;T9V+=g71.v7F;g71[T9V]();e[z6U]();});if(focusCapture&&(type===s6U||type===H9V)){var E9V=a7i;E9V+=i7i;E9V+=J4F;E9V+=y7i;$(M3U)[p5F](E9V,function(){var d7i='.DTE';var t7i="El";var l7i='.DTED';var C7i="setFocus";var B7i="veEle";var a9V=c4F;a9V+=s1F;a9V+=g71.X7F;a9V+=o8F;var W9V=g71.x7F;W9V+=Z7i;W9V+=B7i;W9V+=o7i;var K9V=f7i;K9V+=t7i;K9V+=W1p;K9V+=Z3F;if($(document[K9V])[A7i](d7i)[c7U]===J68&&$(document[W9V])[A7i](l7i)[a9V]===J68){if(that[O0F][C7i]){var y9V=g71.O7F;y9V+=g71.w7F;y9V+=g71.F7F;y9V+=V6F;var i9V=m6U;i9V+=y0F;i9V+=n7i;i9V+=V6F;that[O0F][i9V][y9V]();}}});}this[Z9V]();this[R3p](B9V,[type,this[O0F][o9V]]);return K9F;};Editor[O6F][f9V]=function(type){var e7i="Icb";var N7i="cance";var p7i="_clea";var m7i="Op";var q7i="Open";var P7i="rDynamicInfo";var A9V=n6p;A9V+=q7i;var t9V=Y3F;t9V+=s7i;t9V+=x3F;t9V+=g71.X7F;if(this[t9V](A9V,[type,this[O0F][Z9U]])===T9F){var s9V=J2U;s9V+=B7F;s9V+=e7i;var n9V=g71.L7F;n9V+=T0p;n9V+=B7F;var C9V=g71.L7F;C9V+=g71.w7F;C9V+=n8F;var l9V=N7i;l9V+=y4F;l9V+=m7i;l9V+=x3F;var d9V=p7i;d9V+=P7i;this[d9V]();this[R3p](l9V,[type,this[O0F][Z9U]]);if((this[O0F][C9V]===T4p||this[O0F][n9V]===t2U)&&this[O0F][d2p]){var q9V=Y1F;q9V+=r1F;q9V+=e7i;this[O0F][q9V]();}this[O0F][s9V]=A5F;return T9F;}g71[g71.Y7F]();this[O0F][t7p]=type;return K9F;};Editor[O6F][S7i]=function(processing){var u4i="ssing";var b4i="leClass";var g4i="togg";var k9V=k7i;k9V+=g9U;var S9V=Y3F;S9V+=B7F;S9V+=a0p;S9V+=N8F;var P9V=V7i;P9V+=u4i;var p9V=g4i;p9V+=b4i;var m9V=l2F;m9V+=n3U;var N9V=P5F;N9V+=q2F;N9V+=T7F;N9V+=g4F;var e9V=Y1F;e9V+=M4i;e9V+=E1p;var procClass=this[e9V][T7p][f7i];$([N9V,this[s5F][m9V]])[p9V](procClass,processing);this[O0F][P9V]=processing;this[S9V](k9V,[processing]);};Editor[V9V][Q3p]=function(successCallback,errorCallback,formatdata,hide){var L4i="Dat";var w4i="dbT";var h4i="aFn";var O4i="difie";var x4i="SetObject";var B4i='submitComplete';var f4i="ssin";var Y4i="Url";var o4i='preSubmit';var X4i="ditData";var Z4i="omple";var r4i="sen";var D4i="itTable";var v4i="_fn";var y4i="onC";var F4i="ditOpts";var Q4i="Coun";var W4i='allIfChanged';var K4i='all';var j4i="_aja";var A2V=J6U;A2V+=y4F;A2V+=y4F;var t2V=U4i;t2V+=d6p;t2V+=D4i;var f2V=j4i;f2V+=o7F;var o2V=U1F;o2V+=g71.x7F;o2V+=o7F;o2V+=Y4i;var B2V=g71.x7F;B2V+=D7p;B2V+=g71.x7F;B2V+=o7F;var y2V=B7F;y2V+=d7F;y2V+=B7F;y2V+=R0F;var i2V=r4i;i2V+=g71.h7F;var E2V=K4F;E2V+=H9p;var w2V=w4i;w2V+=g71.x7F;w2V+=j4F;var r2V=e8p;r2V+=R4i;r2V+=g71.X7F;var Y2V=B7F;Y2V+=F4i;var j2V=B7F;j2V+=X4i;var D2V=R1F;D2V+=O4i;D2V+=h0F;var U2V=m7p;U2V+=Q4i;U2V+=g71.X7F;var M2V=w4p;M2V+=g71.h7F;M2V+=O0F;var b2V=v4i;b2V+=x4i;b2V+=L4i;b2V+=h4i;var g2V=g71.w7F;g2V+=a0F;g2V+=z0F;g2V+=P0F;var u2V=B7F;u2V+=o7F;u2V+=g71.X7F;var that=this;var i,iLen,eventRet,errorNodes;var changed=T9F,allData={},changedData={};var setBuilder=DataTable[u2V][g2V][b2V];var dataSource=this[O0F][s2p];var fields=this[O0F][M2V];var editCount=this[O0F][U2V];var modifier=this[O0F][D2V];var editFields=this[O0F][C6U];var editData=this[O0F][j2V];var opts=this[O0F][Y2V];var changedSubmit=opts[r2V];var submitParamsLocal;var action=this[O0F][Z9U];var submitParams={"action":action,"data":{}};if(this[O0F][w2V]){submitParams[y9U]=this[O0F][d1p];}if(action===a9p||action===m7p){var R2V=B7F;R2V+=R9F;$[R2V](editFields,function(idSrc,edit){var E4i="isEmptyObject";var F2V=B7F;F2V+=g71.x7F;F2V+=g71.F7F;F2V+=o8F;var allRowData={};g71[g71.Y7F]();var changedRowData={};$[F2V](fields,function(name,field){var H4i=/\[.*$/;var I4i="valFromData";var T4i='[]';var J4i="any-count";var c4i="Ar";var z4i="submittable";var G4i="plac";var O2V=g71.O7F;O2V+=P0F;O2V+=B7F;O2V+=p7p;var X2V=a0F;X2V+=g71.v7F;g71[X2V]();if(edit[O2V][name]&&field[z4i]()){var z2V=w4U;z2V+=R4U;z2V+=g71.x7F;z2V+=K4F;var h2V=B7F;h2V+=P5F;h2V+=g71.X7F;var x2V=D2F;x2V+=J4i;var v2V=K4F;v2V+=G4i;v2V+=B7F;var Q2V=P0F;Q2V+=O0F;Q2V+=c4i;Q2V+=n3p;var multiGet=field[h0p]();var builder=setBuilder(name);if(multiGet[idSrc]===undefined){var originalVal=field[I4i](edit[Y5F]);builder(allRowData,originalVal);return;}var value=multiGet[idSrc];var manyBuilder=$[Q2V](value)&&name[h2p](T4i)!==-G68?setBuilder(name[v2V](H4i,S1F)+x2V):A5F;builder(allRowData,value);if(manyBuilder){var L2V=c4F;L2V+=S7F;L2V+=Q8F;L2V+=G9F;manyBuilder(allRowData,value[L2V]);}if(action===h2V&&(!editData[name]||!field[z2V](value,editData[name][idSrc]))){builder(changedRowData,value);changed=K9F;if(manyBuilder){manyBuilder(changedRowData,value[c7U]);}}}});if(!$[E4i](allRowData)){allData[idSrc]=allRowData;}if(!$[E4i](changedRowData)){changedData[idSrc]=changedRowData;}});if(action===O0p||changedSubmit===K4i||changedSubmit===W4i&&changed){submitParams[Y5F]=allData;}else if(changedSubmit===a4i&&changed){var J2V=g71.h7F;J2V+=g71.x7F;J2V+=g71.X7F;J2V+=g71.x7F;submitParams[J2V]=changedData;}else{var H2V=Y3F;H2V+=T7p;var I2V=g71.O7F;I2V+=C7F;I2V+=g6p;I2V+=p5F;var c2V=Q6p;c2V+=X6p;var G2V=g71.F7F;G2V+=y4F;G2V+=g71.w7F;G2V+=U4F;this[O0F][Z9U]=A5F;if(opts[i4i]===G2V&&(hide===undefined||hide)){this[a5U](T9F);}else if(typeof opts[c2V]===I2V){var T2V=y4i;T2V+=Z4i;T2V+=p0F;opts[T2V](this);}if(successCallback){successCallback[Q6F](this);}this[H2V](T9F);this[R3p](B4i);return;}}else if(action===E2V){$[j6F](editFields,function(idSrc,edit){var a2V=H1F;a2V+=I4U;var W2V=g71.h7F;W2V+=g71.x7F;W2V+=g71.X7F;W2V+=g71.x7F;var K2V=a0F;K2V+=g71.v7F;g71[K2V]();submitParams[W2V][idSrc]=edit[a2V];});}this[U7i](i2V,action,submitParams);submitParamsLocal=$[y2V](K9F,{},submitParams);if(formatdata){formatdata(submitParams);}if(this[R3p](o4i,[submitParams,action])===T9F){var Z2V=Y3F;Z2V+=V7i;Z2V+=f4i;Z2V+=Q8F;this[Z2V](T9F);return;}var submitWire=this[O0F][B2V]||this[O0F][o2V]?this[f2V]:this[t2V];submitWire[A2V](this,submitParams,function(json,notGood,xhr){var t4i="_sub";var A4i="mitSuccess";var l2V=g71.x7F;l2V+=Z7i;l2V+=g71.w7F;l2V+=S7F;var d2V=t4i;d2V+=A4i;that[d2V](json,notGood,submitParams,submitParamsLocal,that[O0F][l2V],editCount,hide,successCallback,errorCallback,xhr);},function(xhr,err,thrown){var l4i="_submitE";var d4i="acti";var n2V=d4i;n2V+=p5F;var C2V=l4i;C2V+=e4F;g71[g71.Y7F]();that[C2V](xhr,err,thrown,errorCallback,submitParams,that[O0F][n2V]);},submitParams);};Editor[q2V][C4i]=function(data,success,error,submitParams){var P4i="modifie";var m4i="vidua";var n4i="SetObjectDataFn";var p4i="ataSour";var S4i='fields';var e4i="modif";var P2V=f8F;P2V+=i7F;P2V+=h0F;P2V+=g71.F7F;var p2V=Y3F;p2V+=g71.O7F;p2V+=S7F;p2V+=n4i;var m2V=g71.w7F;m2V+=a0F;m2V+=z0F;m2V+=P0F;var N2V=B7F;N2V+=o7F;N2V+=g71.X7F;var e2V=B7F;e2V+=o7F;e2V+=g71.X7F;var s2V=o8F;s2V+=g71.v7F;var that=this;var action=data[Z9U];g71[s2V]();var out={data:[]};var idGet=DataTable[e2V][r5F][q4i](this[O0F][s4i]);var idSet=DataTable[N2V][m2V][p2V](this[O0F][P2V]);if(action!==H3p){var M5V=g71.h7F;M5V+=g71.x7F;M5V+=g71.X7F;M5V+=g71.x7F;var b5V=B7F;b5V+=g71.x7F;b5V+=g71.F7F;b5V+=o8F;var g5V=e4i;g5V+=N4i;var u5V=y8F;u5V+=P5F;u5V+=m4i;u5V+=y4F;var V2V=K0U;V2V+=p4i;V2V+=k7F;var k2V=P4i;k2V+=h0F;var S2V=g71.L7F;S2V+=g71.w7F;S2V+=g71.h7F;S2V+=B7F;var originalData=this[O0F][S2V]===s6U?this[P7p](S4i,this[k2V]()):this[V2V](u5V,this[g5V]());$[b5V](data[M5V],function(key,vals){var V4i="dataTableExt";var U5V=k4i;U5V+=z0F;U5V+=P0F;g71[g71.Y7F]();var toSave;var extender=$[V1F][V4i][U5V][u0i];if(action===p4p){var rowData=originalData[key][Y5F];toSave=extender({},rowData,K9F);toSave=extender(toSave,vals,K9F);}else{toSave=extender({},vals,K9F);}var overrideId=idGet(toSave);if(action===O0p&&overrideId===undefined){idSet(toSave,+new Date()+S1F+key);}else{idSet(toSave,overrideId);}out[Y5F][h9F](toSave);});}success(out);};Editor[O6F][g0i]=function(json,notGood,submitParams,submitParamsLocal,action,editCount,hide,successCallback,errorCallback,xhr){var r0i="ega";var i0i='commit';var d0i="nCompl";var T0i="eate";var o0i='postRemove';var f0i="editCount";var A0i="Complet";var w0i="yAjax";var U0i="ostSu";var l0i='submitSuccess';var F0i="itOp";var W0i='preEdit';var j0i="rece";var I0i='submitUnsuccessful';var v0i="eldErrors";var B0i="ids";var b0i="mitCompl";var X0i="ieldErrors";var y0i="preR";var Y0i="_l";var K0i='preCreate';var E0i="postCrea";var a0i='postEdit';var R0i="odi";var Z0i="emov";var b6V=O0F;b6V+=J8F;b6V+=b0i;b6V+=M0i;var g6V=Y3F;g6V+=T7p;var X5V=B7F;X5V+=Z8F;X5V+=g71.w7F;X5V+=h0F;var R5V=r4F;R5V+=O3F;R5V+=h0F;var w5V=z0F;w5V+=U0i;w5V+=D0i;var r5V=j0i;r5V+=U5U;r5V+=B7F;var Y5V=Y0i;Y5V+=r0i;Y5V+=g71.F7F;Y5V+=w0i;var j5V=g71.L7F;j5V+=R0i;j5V+=L7p;j5V+=h0F;var D5V=k5F;D5V+=F0i;D5V+=g71.X7F;D5V+=O0F;var that=this;var setData;var fields=this[O0F][m9U];var opts=this[O0F][D5V];var modifier=this[O0F][j5V];this[Y5V](r5V,action,json);this[R3p](w5V,[json,submitParams,action,xhr]);if(!json[R5V]){json[P6F]=g71.r7F;}if(!json[n8p]){var F5V=g71.O7F;F5V+=X0i;json[F5V]=[];}if(notGood||json[X5V]||json[n8p][c7U]){var H5V=O0i;H5V+=Q0i;var T5V=D7p;T5V+=g71.w7F;T5V+=P0F;T5V+=S7F;var O5V=y7F;O5V+=v0i;var globalError=[];if(json[P6F]){globalError[h9F](json[P6F]);}$[j6F](json[O5V],function(i,err){var h0i="status";var z0i="onFieldError";var G0i="bodyConten";var c0i=': ';var L0i='Unknown field: ';var x0i="played";var J0i="posi";var Q5V=D4U;Q5V+=x0i;var field=fields[err[B2F]];if(!field){throw new Error(L0i+err[B2F]);}else if(field[Q5V]()){var v5V=z4F;v5V+=e4F;field[P6F](err[h0i]||v5V);if(i===J68){var x5V=g71.O7F;x5V+=g71.w7F;x5V+=g71.F7F;x5V+=V6F;if(opts[z0i]===x5V){var G5V=g71.O7F;G5V+=n7i;G5V+=V6F;var J5V=g71.X7F;J5V+=g71.w7F;J5V+=z0F;var z5V=J0i;z5V+=g71.X7F;z5V+=r6F;z5V+=S7F;var h5V=G0i;h5V+=g71.X7F;var L5V=g71.h7F;L5V+=g71.w7F;L5V+=g71.L7F;that[R3U]($(that[L5V][h5V],that[O0F][H0U]),{scrollTop:$(field[t9U]())[z5V]()[J5V]},V68);field[G5V]();}else if(typeof opts[z0i]===g71.G7F){opts[z0i](that,err);}}}else{var I5V=z4F;I5V+=h0F;I5V+=h0F;I5V+=P3F;var c5V=q8p;c5V+=C7F;c5V+=O0F;globalError[h9F](field[B2F]()+c0i+(err[c5V]||I5V));}});this[P6F](globalError[T5V](H5V));this[R3p](I0i,[json]);if(errorCallback){var E5V=g71.F7F;E5V+=I7U;E5V+=y4F;errorCallback[E5V](that,json);}}else{var K5V=m8F;K5V+=T0i;var store={};if(json[Y5F]&&(action===K5V||action===m7p)){var A5V=g71.h7F;A5V+=J0F;A5V+=g71.x7F;var a5V=z9F;a5V+=d4U;a5V+=o8F;var W5V=z0F;W5V+=h0F;W5V+=B7F;W5V+=z0F;this[P7p](W5V,action,modifier,submitParamsLocal,json,store);for(var i=J68;i<json[Y5F][a5V];i++){var f5V=B7F;f5V+=J4F;var y5V=U4F;y5V+=H0i;y5V+=I4U;var i5V=P0F;i5V+=g71.h7F;setData=json[Y5F][i];var id=this[P7p](i5V,setData);this[R3p](y5V,[json,setData,action]);if(action===a9p){var o5V=E0i;o5V+=p0F;var B5V=g71.F7F;B5V+=K4F;B5V+=g71.x7F;B5V+=p0F;var Z5V=i6U;Z5V+=y6U;this[R3p](K0i,[json,setData,id]);this[P7p](O0p,fields,setData,store);this[Z5V]([B5V,o5V],[json,setData,id]);}else if(action===f5V){var t5V=i6U;t5V+=q2F;t5V+=x3F;t5V+=g71.X7F;this[R3p](W0i,[json,setData,id]);this[P7p](p4p,modifier,fields,setData,store);this[t5V]([p4p,a0i],[json,setData,id]);}}this[P7p](i0i,action,modifier,json[A5V],store);}else if(action===Q8U){var e5V=g71.h7F;e5V+=J0F;e5V+=g71.x7F;var s5V=f8F;s5V+=O0F;var q5V=y3F;q5V+=Z3F;var n5V=y0i;n5V+=Z0i;n5V+=B7F;var C5V=Y3F;C5V+=s7i;C5V+=x3F;C5V+=g71.X7F;var l5V=z0F;l5V+=h0F;l5V+=B7F;l5V+=z0F;var d5V=s9U;d5V+=t3F;this[d5V](l5V,action,modifier,submitParamsLocal,json,store);this[C5V](n5V,[json,this[B0i]()]);this[P7p](H3p,modifier,fields,store);this[q5V]([H3p,o0i],[json,this[s5V]()]);this[P7p](i0i,action,modifier,json[e5V],store);}if(editCount===this[O0F][f0i]){var V5V=g71.O7F;V5V+=t0i;V5V+=c7p;var k5V=g71.w7F;k5V+=S7F;k5V+=A0i;k5V+=B7F;var P5V=g71.F7F;P5V+=y4F;P5V+=a6U;P5V+=B7F;var p5V=g71.w7F;p5V+=d0i;p5V+=r4U;p5V+=B7F;var m5V=g71.x7F;m5V+=g71.F7F;m5V+=g71.X7F;m5V+=c7p;var N5V=q7U;N5V+=X0F;var action=this[O0F][N5V];this[O0F][m5V]=A5F;if(opts[p5V]===P5V&&(hide===undefined||hide)){var S5V=g71.h7F;S5V+=g71.x7F;S5V+=g71.X7F;S5V+=g71.x7F;this[a5U](json[S5V]?K9F:T9F,action);}else if(typeof opts[k5V]===V5V){opts[i4i](this);}}if(successCallback){var u6V=g71.F7F;u6V+=I7U;u6V+=y4F;successCallback[u6V](that,json);}this[R3p](l0i,[json,setData,action]);}this[g6V](T9F);this[R3p](b6V,[json,setData,action]);};Editor[M6V][C0i]=function(xhr,err,thrown,errorCallback,submitParams,action){var e0i="system";var q0i="omplete";var N0i='submitError';var s0i="postSu";var n0i="bmitC";var Y6V=G2U;Y6V+=n0i;Y6V+=q0i;var j6V=P0F;j6V+=I7F;j6V+=T1p;j6V+=S7F;var D6V=s0i;D6V+=d4F;D6V+=g71.L7F;D6V+=o3F;var U6V=i6U;U6V+=y6U;g71[g71.Y7F]();this[U6V](D6V,[A5F,submitParams,action,xhr]);this[P6F](this[j6V][P6F][e0i]);this[S7i](T9F);if(errorCallback){errorCallback[Q6F](this,xhr,err,thrown);}this[R3p]([N0i,Y6V],[xhr,err,thrown,submitParams]);};Editor[O6F][r6V]=function(fn){var m0i="sing";var b3i='draw';var P0i="bSer";var k0i="etting";var g3i="omp";var S0i="erSid";var u3i="submitC";var p0i="taTabl";var z6V=X5U;z6V+=d4F;z6V+=y4F;z6V+=B7F;var h6V=L1U;h6V+=H6F;var Q6V=I3F;Q6V+=k7F;Q6V+=O0F;Q6V+=m0i;var F6V=I4U;F6V+=C3F;F6V+=B7F;var R6V=a0F;R6V+=z0F;R6V+=P0F;var w6V=H1F;w6V+=p0i;w6V+=B7F;var that=this;var dt=this[O0F][y9U]?new $[V1F][w6V][R6V](this[O0F][F6V]):A5F;var ssp=T9F;if(dt){var O6V=P0i;O6V+=q2F;O6V+=S0i;O6V+=B7F;var X6V=O0F;X6V+=k0i;X6V+=O0F;ssp=dt[X6V]()[J68][V0i][O6V];}if(this[O0F][Q6V]){var v6V=u3i;v6V+=g3i;v6V+=y4F;v6V+=M0i;this[W0p](v6V,function(){if(ssp){var x6V=g71.w7F;x6V+=S7F;x6V+=B7F;dt[x6V](b3i,fn);}else{setTimeout(function(){var L6V=o8F;L6V+=g71.v7F;g71[L6V]();fn();},W68);}});return K9F;}else if(this[h6V]()===T4p||this[Y7U]()===z6V){this[W0p](S4U,function(){var M3i="sin";var U3i="submitComple";var J6V=I3F;J6V+=y1p;J6V+=M3i;J6V+=Q8F;if(!that[O0F][J6V]){setTimeout(function(){g71[F9F]();if(that[O0F]){fn();}},W68);}else{var G6V=U3i;G6V+=p0F;that[W0p](G6V,function(e,json){var c6V=a0F;c6V+=g71.v7F;g71[c6V]();if(ssp&&json){dt[W0p](b3i,fn);}else{setTimeout(function(){if(that[O0F]){fn();}},W68);}});}})[z2U]();return K9F;}return T9F;};Editor[O6F][I6V]=function(name,arr){var T6V=o8F;T6V+=g71.v7F;for(var i=J68,ien=arr[c7U];i<ien;i++){if(name==arr[i]){return i;}}g71[T6V]();return-G68;};Editor[H6V]={"table":A5F,"ajaxUrl":A5F,"fields":[],"display":D3i,"ajax":A5F,"idSrc":E6V,"events":{},"i18n":{"create":{"button":j3i,"title":K6V,"submit":Y3i},"edit":{"button":W6V,"title":r3i,"submit":w3i},"remove":{"button":R3i,"title":a6V,"submit":R3i,"confirm":{"_":F3i,"1":X3i}},"error":{"system":i6V},multi:{title:O3i,info:y6V,restore:Q3i,noMulti:Z6V},datetime:{previous:v3i,next:x3i,months:[B6V,o6V,L3i,f6V,t6V,h3i,A6V,d6V,z3i,J3i,l6V,G3i],weekdays:[c3i,I3i,T3i,H3i,E3i,K3i,C6V],amPm:[W3i,n6V],hours:q6V,minutes:a3i,seconds:s6V,unknown:s0p}},formOptions:{bubble:$[e6V]({},Editor[N4U][N6V],{title:T9F,message:T9F,buttons:u6U,submit:a4i}),inline:$[m6V]({},Editor[N4U][p6V],{buttons:T9F,submit:P6V}),main:$[S6V]({},Editor[N4U][k6V])},legacyAjax:T9F};(function(){var t8i="]";var s3i="nod";var B3i="bServerSide";var f8i='keyless';var T8i="rowIds";var o3i="drawType";var i3i="aSou";var c8i="ataT";var p8i="dataSrc";var V6V=D2U;V6V+=i3i;V6V+=A9p;V6V+=A3p;var __dataSources=Editor[V6V]={};var __dtIsSsp=function(dt,editor){var y3i="itO";var Z3i="Feature";var g7M=k5F;g7M+=y3i;g7M+=z0F;g7M+=p7F;var u7M=g71.w7F;u7M+=Z3i;u7M+=O0F;g71[F9F]();return dt[U5F]()[J68][u7M][B3i]&&editor[O0F][g7M][o3i]!==i6F;};var __dtApi=function(table){g71[F9F]();return $(table)[U9F]();};var __dtHighlight=function(node){node=$(node);g71[g71.Y7F]();setTimeout(function(){var f3i='highlight';node[J6F](f3i);g71[g71.Y7F]();setTimeout(function(){var d3i="oveCla";var A3i="light";var l3i='noHighlight';var t3i="high";var u7F=550;var D7M=t3i;D7M+=A3i;var U7M=h0F;U7M+=W1p;U7M+=d3i;U7M+=e3F;var M7M=q9U;M7M+=y9p;M7M+=n1U;var b7M=o8F;b7M+=g71.v7F;g71[b7M]();node[M7M](l3i)[U7M](D7M);setTimeout(function(){var n3i="hli";var C3i="noHig";var Y7M=C3i;Y7M+=n3i;Y7M+=Q8F;Y7M+=c4U;var j7M=o8F;j7M+=g71.v7F;g71[j7M]();node[o6F](Y7M);},u7F);},V68);},o68);};var __dtRowSelector=function(out,dt,identifier,fields,idFn){var w7M=B7F;w7M+=g71.x7F;w7M+=g71.F7F;w7M+=o8F;var r7M=o8F;r7M+=g71.v7F;g71[r7M]();dt[H7p](identifier)[q3i]()[w7M](function(idx){var N3i="o fi";var e3i="Unable t";var m3i="nd row identif";var Z68=14;var Q7M=h0F;Q7M+=g71.w7F;Q7M+=c8F;var O7M=s3i;O7M+=B7F;var R7M=h0F;R7M+=g71.w7F;R7M+=c8F;var row=dt[R7M](idx);var data=row[Y5F]();var idSrc=idFn(data);if(idSrc===undefined){var X7M=e3i;X7M+=N3i;X7M+=m3i;X7M+=N4i;var F7M=r4F;F7M+=h0F;F7M+=g71.w7F;F7M+=h0F;Editor[F7M](X7M,Z68);}out[idSrc]={idSrc:idSrc,data:data,node:row[O7M](),fields:fields,type:Q7M};});};var __dtFieldsFromIdx=function(dt,fields,idx){var S3i="itFi";var k3i="aoColumns";var p3i="isEm";var P3i="ptyObject";var g8i='Unable to automatically determine field from source. Please specify the field name.';var V3i="editField";var I7M=a0F;I7M+=g71.v7F;var c7M=p3i;c7M+=P3i;var z7M=B7F;z7M+=g71.x7F;z7M+=g71.F7F;z7M+=o8F;var L7M=g71.L7F;L7M+=O4F;L7M+=J0F;L7M+=g71.x7F;var x7M=k5F;x7M+=S3i;x7M+=h1F;var v7M=m6U;v7M+=r3F;v7M+=S7F;v7M+=H8p;var field;var col=dt[v7M]()[J68][k3i][idx];var dataSrc=col[V3i]!==undefined?col[x7M]:col[L7M];var resolvedFields={};var run=function(field,dataSrc){var h7M=o8F;h7M+=g71.v7F;g71[h7M]();if(field[B2F]()===dataSrc){resolvedFields[field[B2F]()]=field;}};$[z7M](fields,function(name,fieldInst){var J7M=P0F;J7M+=O0F;J7M+=u8i;if($[J7M](dataSrc)){var G7M=y4F;G7M+=B7F;G7M+=S7F;G7M+=J9F;for(var i=J68;i<dataSrc[G7M];i++){run(fieldInst,dataSrc[i]);}}else{run(fieldInst,dataSrc);}});if($[c7M](resolvedFields)){Editor[P6F](g8i,a68);}g71[I7M]();return resolvedFields;};var __dtCellSelector=function(out,dt,identifier,allFields,idFn,forceFields){var H7M=k7F;H7M+=y4F;H7M+=y4F;H7M+=O0F;var T7M=a0F;T7M+=g71.v7F;g71[T7M]();dt[H7M](identifier)[q3i]()[j6F](function(idx){var r8i="atta";var j8i="column";var U8i="yFields";var b8i="Fields";var B7M=Y7U;B7M+=b8i;var Z7M=w0F;Z7M+=R0F;var y7M=M8i;y7M+=U8i;var i7M=S7F;i7M+=r0U;var a7M=D8i;a7M+=R9F;var K7M=h0F;K7M+=g71.w7F;K7M+=c8F;var E7M=g71.F7F;E7M+=B7F;E7M+=G6U;var cell=dt[E7M](idx);var row=dt[E7p](idx[K7M]);var data=row[Y5F]();var idSrc=idFn(data);var fields=forceFields||__dtFieldsFromIdx(dt,allFields,idx[j8i]);var isNode=typeof identifier===I9F&&identifier[Y8i]||identifier instanceof $;var prevDisplayFields,prevAttach;if(out[idSrc]){var W7M=r8i;W7M+=g2U;prevAttach=out[idSrc][W7M];prevDisplayFields=out[idSrc][v5p];}g71[g71.Y7F]();__dtRowSelector(out,dt,idx[E7p],allFields,idFn);out[idSrc][a7M]=prevAttach||[];out[idSrc][a9U][h9F](isNode?$(identifier)[Y4p](J68):cell[i7M]());out[idSrc][y7M]=prevDisplayFields||{};$[Z7M](out[idSrc][B7M],fields);});};var __dtColumnSelector=function(out,dt,identifier,fields,idFn){var f7M=S4F;f7M+=g2U;var o7M=k7F;o7M+=y4F;o7M+=y4F;o7M+=O0F;dt[o7M](A5F,identifier)[q3i]()[f7M](function(idx){g71[g71.Y7F]();__dtCellSelector(out,dt,idx,fields,idFn);});};var __dtjqId=function(id){var w8i='\\$1';var t7M=s7U;t7M+=b6p;t7M+=Q8F;return typeof id===t7M?F4p+id[N7U](/(:|\.|\[|\]|,)/g,w8i):F4p+id;};__dataSources[n1p]={id:function(data){var R8i="oAp";var d7M=o8F;d7M+=g71.v7F;var A7M=R8i;A7M+=P0F;var idFn=DataTable[U0F][A7M][q4i](this[O0F][s4i]);g71[d7M]();return idFn(data);},individual:function(identifier,fieldNames){var F8i="_fnGetObjectD";var X8i="ataFn";var s7M=a0F;s7M+=g71.v7F;var n7M=w4p;n7M+=A7F;var C7M=f8F;C7M+=i7F;C7M+=A9p;var l7M=F8i;l7M+=X8i;var idFn=DataTable[U0F][r5F][l7M](this[O0F][C7M]);var dt=__dtApi(this[O0F][y9U]);var fields=this[O0F][n7M];var out={};var forceFields;var responsiveNode;if(fieldNames){var q7M=P0F;q7M+=O0F;q7M+=u8i;if(!$[q7M](fieldNames)){fieldNames=[fieldNames];}forceFields={};$[j6F](fieldNames,function(i,name){g71[g71.Y7F]();forceFields[name]=fields[name];});}g71[s7M]();__dtCellSelector(out,dt,identifier,fields,idFn,forceFields);return out;},fields:function(identifier){var h8i="colum";var O8i="sPlainObject";var Q8i="dSr";var L8i="ells";var p7M=P0F;p7M+=O8i;var m7M=a0F;m7M+=g71.v7F;var N7M=P0F;N7M+=Q8i;N7M+=g71.F7F;var e7M=B7F;e7M+=o7F;e7M+=g71.X7F;var idFn=DataTable[e7M][r5F][q4i](this[O0F][N7M]);var dt=__dtApi(this[O0F][y9U]);var fields=this[O0F][m9U];var out={};g71[m7M]();if($[p7M](identifier)&&(identifier[H7p]!==undefined||identifier[v8i]!==undefined||identifier[x8i]!==undefined)){var k7M=g71.F7F;k7M+=L8i;var S7M=h8i;S7M+=S7F;S7M+=O0F;if(identifier[H7p]!==undefined){var P7M=O3F;P7M+=c8F;P7M+=O0F;__dtRowSelector(out,dt,identifier[P7M],fields,idFn);}if(identifier[S7M]!==undefined){__dtColumnSelector(out,dt,identifier[v8i],fields,idFn);}if(identifier[k7M]!==undefined){var V7M=k7F;V7M+=y4F;V7M+=y4F;V7M+=O0F;__dtCellSelector(out,dt,identifier[V7M],fields,idFn);}}else{__dtRowSelector(out,dt,identifier,fields,idFn);}return out;},create:function(fields,data){var dt=__dtApi(this[O0F][y9U]);if(!__dtIsSsp(dt,this)){var u4M=h0F;u4M+=g71.w7F;u4M+=c8F;var row=dt[u4M][q9U](data);__dtHighlight(row[t9U]());}},edit:function(identifier,fields,data,store){var z8i="ny";var I8i="bleExt";var G8i="owId";var b4M=Z7U;b4M+=q6F;var g4M=g71.X7F;g4M+=g71.x7F;g4M+=C3F;g4M+=B7F;var that=this;var dt=__dtApi(this[O0F][g4M]);if(!__dtIsSsp(dt,this)||this[O0F][h2U][o3i]===b4M){var F4M=s3i;F4M+=B7F;var U4M=g71.x7F;U4M+=z8i;var M4M=P0F;M4M+=g71.h7F;var rowId=__dataSources[n1p][M4M][Q6F](this,data);var row;try{row=dt[E7p](__dtjqId(rowId));}catch(e){row=dt;}if(!row[J8i]()){row=dt[E7p](function(rowIdx,rowData,rowNode){g71[F9F]();return rowId==__dataSources[n1p][f8F][Q6F](that,rowData);});}if(row[U4M]()){var r4M=h0F;r4M+=G8i;r4M+=O0F;var Y4M=g71.w7F;Y4M+=a0F;Y4M+=z0F;Y4M+=P0F;var j4M=g71.h7F;j4M+=c8i;j4M+=g71.x7F;j4M+=I8i;var D4M=g71.O7F;D4M+=S7F;var extender=$[D4M][j4M][Y4M][u0i];var toSave=extender({},row[Y5F](),K9F);toSave=extender(toSave,data,K9F);row[Y5F](toSave);var idx=$[i7U](rowId,store[r4M]);store[T8i][H6U](idx,G68);}else{var R4M=k3F;R4M+=g71.h7F;var w4M=h0F;w4M+=g71.w7F;w4M+=c8F;row=dt[w4M][R4M](data);}__dtHighlight(row[F4M]());}},remove:function(identifier,fields,store){var K8i="every";var H8i="cancel";var E8i="remov";var O4M=H8i;O4M+=y4F;O4M+=k5F;var X4M=I4U;X4M+=d4F;X4M+=y4F;X4M+=B7F;var that=this;var dt=__dtApi(this[O0F][X4M]);var cancelled=store[O4M];if(cancelled[c7U]===J68){var Q4M=E8i;Q4M+=B7F;dt[H7p](identifier)[Q4M]();}else{var v4M=h0F;v4M+=g71.w7F;v4M+=c8F;v4M+=O0F;var indexes=[];dt[v4M](identifier)[K8i](function(){g71[F9F]();var id=__dataSources[n1p][f8F][Q6F](that,this[Y5F]());if($[i7U](id,cancelled)===-G68){var L4M=P0F;L4M+=S7F;L4M+=g71.h7F;L4M+=P2F;var x4M=z0F;x4M+=C7F;x4M+=O0F;x4M+=o8F;indexes[x4M](this[L4M]());}});dt[H7p](indexes)[Q8U]();}},prep:function(action,identifier,submit,json,store){var B8i="lled";var W8i="cancelled";var Z8i="can";var c4M=K4F;c4M+=g71.L7F;c4M+=g71.w7F;c4M+=a0p;var h4M=B7F;h4M+=g71.h7F;h4M+=P0F;h4M+=g71.X7F;if(action===h4M){var z4M=g71.h7F;z4M+=g71.x7F;z4M+=g71.X7F;z4M+=g71.x7F;var cancelled=json[W8i]||[];store[T8i]=$[j4p](submit[z4M],function(val,key){var y8i="yOb";var a8i="isE";var i8i="mpt";var G4M=g71.h7F;G4M+=j8p;var J4M=a8i;J4M+=i8i;J4M+=y8i;J4M+=E9F;g71[g71.Y7F]();return!$[J4M](submit[G4M][key])&&$[i7U](key,cancelled)===-G68?key:undefined;});}else if(action===c4M){var I4M=Z8i;I4M+=k7F;I4M+=B8i;store[I4M]=json[W8i]||[];}},commit:function(action,identifier,data,store){var o8i="draw";var that=this;g71[F9F]();var dt=__dtApi(this[O0F][y9U]);if(!__dtIsSsp(dt,this)&&action===p4p&&store[T8i][c7U]){var E4M=y4F;E4M+=B7F;E4M+=s1F;E4M+=G9F;var ids=store[T8i];var row;var compare=function(id){return function(rowIdx,rowData,rowNode){var H4M=g71.F7F;H4M+=I7U;H4M+=y4F;var T4M=g71.h7F;T4M+=c8i;T4M+=g71.x7F;T4M+=j4F;g71[F9F]();return id==__dataSources[T4M][f8F][H4M](that,rowData);};};for(var i=J68,ien=ids[E4M];i<ien;i++){var W4M=g71.x7F;W4M+=S7F;W4M+=K0F;try{row=dt[E7p](__dtjqId(ids[i]));}catch(e){row=dt;}if(!row[J8i]()){var K4M=h0F;K4M+=g71.w7F;K4M+=c8F;row=dt[K4M](compare(ids[i]));}if(row[W4M]()&&!dt[U5F]()[J68][V0i][B3i]){var a4M=K4F;a4M+=g71.L7F;a4M+=g71.w7F;a4M+=a0p;row[a4M]();}}}var drawType=this[O0F][h2U][o3i];if(drawType!==i6F){dt[o8i](drawType);}}};function __html_id(identifier){var A8i='[data-editor-id="';var d8i='Could not find an element with `data-editor-id` or `id` of: ';var context=document;if(identifier!==f8i){var y4M=z9F;y4M+=Q8F;y4M+=G9F;var i4M=g2F;i4M+=t8i;context=$(A8i+identifier+i4M);if(context[y4M]===J68){context=typeof identifier===w6U?$(__dtjqId(identifier)):$(identifier);}if(context[c7U]===J68){throw d8i+identifier;}}return context;}function __html_el(identifier,name){var l8i='[data-editor-field="';var Z4M=g2F;Z4M+=t8i;var context=__html_id(identifier);return $(l8i+name+Z4M,context);}function __html_els(identifier,names){var o4M=y4F;o4M+=B7F;o4M+=B3p;o4M+=o8F;var B4M=a0F;B4M+=g71.v7F;var out=$();g71[B4M]();for(var i=J68,ien=names[o4M];i<ien;i++){out=out[q9U](__html_el(identifier,names[i]));}return out;}function __html_get(identifier,dataSrc){var n8i="editor-val";var s8i='[data-editor-value]';var q8i="filt";var l4M=c4U;l4M+=Q7U;var d4M=C8i;d4M+=n8i;d4M+=d9F;var A4M=g71.x7F;A4M+=g71.X7F;A4M+=z5p;var t4M=T5p;t4M+=G9F;var f4M=q8i;f4M+=r4F;var el=__html_el(identifier,dataSrc);return el[f4M](s8i)[t4M]?el[A4M](d4M):el[l4M]();}function __html_set(identifier,fields,data){var C4M=S4F;C4M+=g71.F7F;C4M+=o8F;$[C4M](fields,function(name,field){var e8i="valFromDat";var N8i="[data";var P8i='data-editor-value';var m8i="-editor-value]";var q4M=e8i;q4M+=g71.x7F;var n4M=o8F;n4M+=g71.v7F;g71[n4M]();var val=field[q4M](data);if(val!==undefined){var N4M=c4F;N4M+=B4U;var e4M=N8i;e4M+=m8i;var s4M=g71.O7F;s4M+=B1F;s4M+=p0F;s4M+=h0F;var el=__html_el(identifier,field[p8i]());if(el[s4M](e4M)[N4M]){el[X6U](P8i,val);}else{var p4M=o8F;p4M+=g71.X7F;p4M+=Q7U;el[j6F](function(){var S8i="ldN";var u1i="firstChild";var V8i="removeChild";var k8i="odes";var m4M=O0U;m4M+=S8i;m4M+=k8i;g71[F9F]();while(this[m4M][c7U]){this[V8i](this[u1i]);}})[p4M](val);}}});}__dataSources[K4U]={id:function(data){var k4M=t9p;k4M+=A9p;var S4M=k4i;S4M+=T4U;var P4M=B7F;P4M+=d7F;g71[g71.Y7F]();var idFn=DataTable[P4M][S4M][q4i](this[O0F][k4M]);return idFn(data);},initField:function(cfg){var b1i="ta-editor-label=\"";var g1i="[d";var b0M=y4F;b0M+=x3F;b0M+=Q8F;b0M+=G9F;var g0M=S7F;g0M+=p2F;g0M+=B7F;var u0M=g1i;u0M+=g71.x7F;u0M+=b1i;var V4M=a0F;V4M+=g71.v7F;g71[V4M]();var label=$(u0M+(cfg[Y5F]||cfg[g0M])+w9F);if(!cfg[v5F]&&label[b0M]){var U0M=o8F;U0M+=h3p;var M0M=n9F;M0M+=N3p;cfg[M0M]=label[U0M]();}},individual:function(identifier,fieldNames){var r1i='andSelf';var R1i='Cannot automatically determine field name from data source';var U1i="r-";var Y1i="addBack";var D1i="addBac";var j1i='data-editor-field';var w1i='[data-editor-id]';var X0M=l5p;X0M+=o8F;var F0M=l5p;F0M+=o8F;var R0M=o8F;R0M+=g71.X7F;R0M+=g71.L7F;R0M+=y4F;var w0M=B7U;w0M+=a0F;w0M+=X2U;var D0M=t9U;D0M+=Z2F;var attachEl;if(identifier instanceof $||identifier[D0M]){var r0M=M1i;r0M+=U1i;r0M+=f8F;var Y0M=D1i;Y0M+=g1F;attachEl=identifier;if(!fieldNames){var j0M=g71.x7F;j0M+=g71.X7F;j0M+=z5p;fieldNames=[$(identifier)[j0M](j1i)];}var back=$[V1F][Y1i]?Y0M:r1i;identifier=$(identifier)[A7i](w1i)[back]()[Y5F](r0M);}if(!identifier){identifier=f8i;}if(fieldNames&&!$[w0M](fieldNames)){fieldNames=[fieldNames];}if(!fieldNames||fieldNames[c7U]===J68){throw R1i;}var out=__dataSources[R0M][m9U][Q6F](this,identifier);var fields=this[O0F][m9U];var forceFields={};g71[g71.Y7F]();$[F0M](fieldNames,function(i,name){forceFields[name]=fields[name];});$[X0M](out,function(id,set){var O1i="toArray";var F1i="ttac";var X1i='cell';var v0M=o8F;v0M+=g71.v7F;var Q0M=g71.O7F;Q0M+=P0F;Q0M+=t7F;Q0M+=A7F;var O0M=g71.x7F;O0M+=F1i;O0M+=o8F;set[c3F]=X1i;set[O0M]=attachEl?$(attachEl):__html_els(identifier,fieldNames)[O1i]();set[Q0M]=fields;g71[v0M]();set[v5p]=forceFields;});return out;},fields:function(identifier){var G0M=h0F;G0M+=g71.w7F;G0M+=c8F;var L0M=C9U;L0M+=n3p;var x0M=o8F;x0M+=g71.X7F;x0M+=g71.L7F;x0M+=y4F;var out={};var self=__dataSources[x0M];if($[L0M](identifier)){var h0M=y4F;h0M+=L4p;for(var i=J68,ien=identifier[h0M];i<ien;i++){var J0M=g71.F7F;J0M+=I7U;J0M+=y4F;var z0M=y7F;z0M+=t7F;z0M+=g71.h7F;z0M+=O0F;var res=self[z0M][J0M](this,identifier[i]);out[identifier[i]]=res[identifier[i]];}return out;}var data={};var fields=this[O0F][m9U];if(!identifier){identifier=f8i;}$[j6F](fields,function(name,field){var val=__html_get(identifier,field[p8i]());field[X5F](data,val===A5F?undefined:val);});out[identifier]={idSrc:identifier,data:data,node:document,fields:fields,type:G0M};return out;},create:function(fields,data){var c0M=o8F;c0M+=g71.v7F;g71[c0M]();if(data){var T0M=g71.F7F;T0M+=g71.x7F;T0M+=G6U;var I0M=P0F;I0M+=g71.h7F;var id=__dataSources[K4U][I0M][T0M](this,data);try{if(__html_id(id)[c7U]){__html_set(id,fields,data);}}catch(e){}}},edit:function(identifier,fields,data){var Q1i="eyless";var K0M=g1F;K0M+=Q1i;var E0M=g71.F7F;E0M+=g71.x7F;E0M+=y4F;E0M+=y4F;var H0M=P0F;H0M+=g71.h7F;var id=__dataSources[K4U][H0M][E0M](this,data)||K0M;__html_set(id,fields,data);},remove:function(identifier,fields){var a0M=h0F;a0M+=B7F;a0M+=H9p;var W0M=a0F;W0M+=g71.v7F;g71[W0M]();__html_id(identifier)[a0M]();}};}());Editor[G6F]={"wrapper":i0M,"processing":{"indicator":v1i,"active":T7p},"header":{"wrapper":x1i,"content":y0M},"body":{"wrapper":L1i,"content":h1i},"footer":{"wrapper":Z0M,"content":z1i},"form":{"wrapper":B0M,"content":J1i,"tag":g71.r7F,"info":G1i,"error":o0M,"buttons":f0M,"button":t0M,"buttonInternal":A0M},"field":{"wrapper":c1i,"typePrefix":I1i,"namePrefix":d0M,"label":T1i,"input":l0M,"inputControl":C0M,"error":H1i,"msg-label":n0M,"msg-error":q0M,"msg-message":E1i,"msg-info":K1i,"multiValue":W1i,"multiInfo":a1i,"multiRestore":s0M,"multiNoEdit":e0M,"disabled":N0M,"processing":v1i},"actions":{"create":i1i,"edit":m0M,"remove":y1i},"inline":{"wrapper":p0M,"liner":P0M,"buttons":Z1i},"bubble":{"wrapper":S0M,"liner":k0M,"table":B1i,"close":V0M,"pointer":u3M,"bg":o1i}};(function(){var y9i='rows';var N1i="TTONS";var f1i="tons-r";var n1i="ect_sin";var q1i="xte";var A1i="s-cre";var Q9i="confirm";var t1i="utton";var c9i='buttons-edit';var e1i="BU";var d1i="TableToo";var g9i="editor_remove";var P1i="text";var k1i="formButtons";var m1i="ableTools";var s1i="editor_e";var q9i="editSingle";var C1i="sel";var R9i="nfi";var e9i="removeSingle";var p1i="editor_create";var L9i="reOp";var l1i="elect";var s9i='selectedSingle';var m8M=U0F;m8M+=D0F;var N8M=U0F;N8M+=D0F;var e8M=P2F;e8M+=g71.X7F;e8M+=D0F;var s8M=B7F;s8M+=J4F;var q8M=B7F;q8M+=Q0F;var J8M=D5U;J8M+=g71.X7F;J8M+=f1i;J8M+=F4U;var C3M=d4F;C3M+=t1i;C3M+=A1i;C3M+=h8F;var g3M=d1i;g3M+=y4F;g3M+=O0F;if(DataTable[g3M]){var L3M=O0F;L3M+=l1i;var X3M=C1i;X3M+=n1i;X3M+=Q8F;X3M+=c4F;var F3M=B7F;F3M+=q1i;F3M+=R0F;var R3M=s1i;R3M+=J4F;var M3M=e1i;M3M+=N1i;var b3M=V4F;b3M+=m1i;var ttButtons=DataTable[b3M][M3M];var ttButtonBase={sButtonText:A5F,editor:A5F,formTitle:A5F};ttButtons[p1i]=$[e5F](K9F,ttButtons[P1i],ttButtonBase,{formButtons:[{label:A5F,fn:function(e){var D3M=e8p;D3M+=g71.L7F;D3M+=o3F;var U3M=o8F;U3M+=g71.v7F;g71[U3M]();this[D3M]();}}],fnClick:function(button,config){var w3M=H9U;w3M+=h8F;var r3M=d6U;r3M+=g71.X7F;r3M+=B7F;var Y3M=S1i;Y3M+=g6U;var j3M=a0F;j3M+=g71.v7F;var editor=config[O8F];g71[j3M]();var i18nCreate=editor[Y3M][r3M];var buttons=config[k1i];if(!buttons[J68][v5F]){buttons[J68][v5F]=i18nCreate[b6U];}editor[w3M]({title:i18nCreate[T5F],buttons:buttons});}});ttButtons[R3M]=$[F3M](K9F,ttButtons[X3M],ttButtonBase,{formButtons:[{label:A5F,fn:function(e){g71[g71.Y7F]();this[b6U]();}}],fnClick:function(button,config){var u9i="fnGetSelectedIndexes";var V1i="ormButtons";var v3M=g71.O7F;v3M+=V1i;var Q3M=a0F;Q3M+=g71.v7F;var O3M=P0F;O3M+=H1p;O3M+=S7F;var selected=this[u9i]();if(selected[c7U]!==G68){return;}var editor=config[O8F];var i18nEdit=editor[O3M][m7p];g71[Q3M]();var buttons=config[v3M];if(!buttons[J68][v5F]){var x3M=T2F;x3M+=t7F;buttons[J68][x3M]=i18nEdit[b6U];}editor[m7p](selected[J68],{title:i18nEdit[T5F],buttons:buttons});}});ttButtons[g9i]=$[e5F](K9F,ttButtons[L3M],ttButtonBase,{question:A5F,formButtons:[{label:A5F,fn:function(e){var h3M=G2U;h3M+=D0i;var that=this;this[h3M](function(json){var U9i="aTa";var Y9i="Tab";var D9i="fnGet";var M9i="lectNone";var r9i="leT";var b9i="fnSe";var j9i="stanc";var H3M=b9i;H3M+=M9i;var T3M=S7F;T3M+=T0p;T3M+=B7F;var I3M=O4F;I3M+=J0F;I3M+=U9i;I3M+=j4F;var c3M=D9i;c3M+=h7i;c3M+=j9i;c3M+=B7F;var G3M=Y9i;G3M+=r9i;G3M+=x1p;G3M+=X1F;var J3M=H1F;J3M+=D9p;J3M+=j9p;var z3M=g71.O7F;z3M+=S7F;var tt=$[z3M][J3M][G3M][c3M]($(that[O0F][y9U])[I3M]()[y9U]()[T3M]());tt[H3M]();});}}],fnClick:function(button,config){var X9i="fnGetSelectedI";var O9i="ndexes";var w9i="be";var F9i="fir";var f3M=y4F;f3M+=g71.x7F;f3M+=w9i;f3M+=y4F;var o3M=g71.F7F;o3M+=g71.w7F;o3M+=R9i;o3M+=r6U;var B3M=g71.F7F;B3M+=K3p;var Z3M=y4F;Z3M+=x3F;Z3M+=d4U;Z3M+=o8F;var y3M=w4U;y3M+=S7F;y3M+=F9i;y3M+=g71.L7F;var i3M=w4U;i3M+=R9i;i3M+=h0F;i3M+=g71.L7F;var a3M=S1i;a3M+=g6U;var W3M=M1i;W3M+=h0F;var K3M=E6F;K3M+=o8F;var E3M=X9i;E3M+=O9i;var rows=this[E3M]();if(rows[K3M]===J68){return;}var editor=config[W3M];var i18nRemove=editor[a3M][Q8U];var buttons=config[k1i];var question=typeof i18nRemove[i3M]===w6U?i18nRemove[y3M]:i18nRemove[Q9i][rows[Z3M]]?i18nRemove[B3M][rows[c7U]]:i18nRemove[o3M][Y3F];if(!buttons[J68][f3M]){buttons[J68][v5F]=i18nRemove[b6U];}editor[Q8U](rows,{message:question[N7U](/%d/g,rows[c7U]),title:i18nRemove[T5F],buttons:buttons});}});}var _buttons=DataTable[U0F][G5U];$[e5F](_buttons,{create:{text:function(dt,node,config){var v9i="ns.create";var l3M=d4F;l3M+=t1i;var d3M=s4p;d3M+=v9i;var A3M=S1i;A3M+=g6U;var t3M=a0F;t3M+=g71.v7F;g71[t3M]();return dt[A3M](d3M,config[O8F][u5F][a9p][l3M]);},className:C3M,editor:A5F,formButtons:{text:function(editor){var s3M=O0F;s3M+=C7F;s3M+=c2U;s3M+=o3F;var q3M=g9p;q3M+=B7F;var n3M=o8F;n3M+=g71.v7F;g71[n3M]();return editor[u5F][q3M][s3M];},action:function(e){var e3M=O0F;e3M+=J8F;e3M+=N8p;this[e3M]();}},formMessage:A5F,formTitle:A5F,action:function(e,dt,node,config){var z9i="formMessage";var h9i="ormBut";var x9i="Title";var u8M=M6p;u8M+=y4F;u8M+=B7F;var V3M=j1F;V3M+=r6U;V3M+=x9i;var k3M=d6U;k3M+=p0F;var S3M=z0F;S3M+=L9i;S3M+=B7F;S3M+=S7F;var P3M=g71.w7F;P3M+=S7F;P3M+=B7F;var p3M=a0F;p3M+=g71.v7F;var m3M=g71.O7F;m3M+=h9i;m3M+=k5U;var N3M=m7p;N3M+=P3F;var that=this;var editor=config[N3M];var buttons=config[m3M];this[T7p](K9F);g71[p3M]();editor[P3M](S3M,function(){that[T7p](T9F);})[k3M]({buttons:config[k1i],message:config[z9i],title:config[V3M]||editor[u5F][a9p][u8M]});}},edit:{extend:J9i,text:function(dt,node,config){var G9i='buttons.edit';var b8M=S1i;b8M+=g6U;var g8M=m7p;g8M+=P3F;g71[F9F]();return dt[u5F](G9i,config[g8M][b8M][m7p][p4U]);},className:c9i,editor:A5F,formButtons:{text:function(editor){var U8M=G2U;U8M+=c2U;U8M+=o3F;var M8M=o8F;M8M+=g71.v7F;g71[M8M]();return editor[u5F][m7p][U8M];},action:function(e){var D8M=e8p;D8M+=g71.L7F;D8M+=o3F;g71[g71.Y7F]();this[D8M]();}},formMessage:A5F,formTitle:A5F,action:function(e,dt,node,config){var W9i="eng";var a9i="dexes";var i9i="exe";var H9i="formM";var K9i="reOpe";var E9i="sage";var v8M=k5F;v8M+=P0F;v8M+=g71.X7F;var Q8M=u0F;Q8M+=g71.L7F;Q8M+=I9i;Q8M+=T9i;var O8M=H9i;O8M+=A3p;O8M+=E9i;var R8M=z0F;R8M+=K9i;R8M+=S7F;var w8M=y4F;w8M+=W9i;w8M+=g71.X7F;w8M+=o8F;var r8M=y8F;r8M+=a9i;var Y8M=y8F;Y8M+=g71.h7F;Y8M+=i9i;Y8M+=O0F;var j8M=h0F;j8M+=g71.w7F;j8M+=c8F;j8M+=O0F;var that=this;var editor=config[O8F];var rows=dt[j8M]({selected:K9F})[Y8M]();var columns=dt[v8i]({selected:K9F})[q3i]();var cells=dt[x8i]({selected:K9F})[r8M]();var items=columns[c7U]||cells[w8M]?{rows:rows,columns:columns,cells:cells}:rows;this[T7p](K9F);editor[W0p](R8M,function(){var X8M=k7i;X8M+=P0F;X8M+=s1F;var F8M=o8F;F8M+=g71.v7F;g71[F8M]();that[X8M](T9F);})[m7p](items,{message:config[O8M],buttons:config[k1i],title:config[Q8M]||editor[u5F][v8M][T5F]});}},remove:{extend:J9i,limitTo:[y9i],text:function(dt,node,config){var Z9i="buttons.re";var z8M=D5U;z8M+=V6p;var h8M=P0F;h8M+=I7F;h8M+=T1p;h8M+=S7F;var L8M=Z9i;L8M+=H9p;var x8M=S1i;x8M+=T1p;x8M+=S7F;return dt[x8M](L8M,config[O8F][h8M][Q8U][z8M]);},className:J8M,editor:A5F,formButtons:{text:function(editor){var I8M=O0F;I8M+=C7F;I8M+=v2U;I8M+=g71.X7F;var c8M=h0F;c8M+=F4U;var G8M=P0F;G8M+=H1p;G8M+=S7F;g71[g71.Y7F]();return editor[G8M][c8M][I8M];},action:function(e){var T8M=G2U;T8M+=D0i;this[T8M]();}},formMessage:function(editor,dt){var o9i="index";var f9i="ws";var B9i="ace";var Z8M=E6F;Z8M+=o8F;var y8M=n7U;y8M+=B9i;var i8M=w4U;i8M+=R9i;i8M+=h0F;i8M+=g71.L7F;var a8M=Y8p;a8M+=s1F;var W8M=K4F;W8M+=g71.L7F;W8M+=g71.w7F;W8M+=a0p;var K8M=P0F;K8M+=H1p;K8M+=S7F;var E8M=o9i;E8M+=A3p;var H8M=O3F;H8M+=f9i;var rows=dt[H8M]({selected:K9F})[E8M]();var i18n=editor[K8M][W8M];var question=typeof i18n[Q9i]===a8M?i18n[i8M]:i18n[Q9i][rows[c7U]]?i18n[Q9i][rows[c7U]]:i18n[Q9i][Y3F];return question[y8M](/%d/g,rows[Z8M]);},formTitle:A5F,action:function(e,dt,node,config){var t9i="ormM";var A9i="essag";var d9i="mB";var l9i="uttons";var n8M=P0F;n8M+=I7F;n8M+=g6U;var C8M=j1F;C8M+=r6U;C8M+=I9i;C8M+=T9i;var l8M=g71.O7F;l8M+=t9i;l8M+=A9i;l8M+=B7F;var d8M=u0F;d8M+=d9i;d8M+=l9i;var t8M=z0F;t8M+=L9i;t8M+=B7F;t8M+=S7F;var f8M=g71.w7F;f8M+=S7F;f8M+=B7F;var o8M=a0F;o8M+=g71.v7F;var B8M=m7p;B8M+=P3F;var that=this;var editor=config[B8M];g71[o8M]();this[T7p](K9F);editor[f8M](t8M,function(){var n9i="si";var C9i="roces";var A8M=z0F;A8M+=C9i;A8M+=n9i;A8M+=s1F;g71[g71.Y7F]();that[A8M](T9F);})[Q8U](dt[H7p]({selected:K9F})[q3i](),{buttons:config[d8M],message:config[l8M],title:config[C8M]||editor[n8M][Q8U][T5F]});}}});_buttons[q9i]=$[q8M]({},_buttons[s8M]);_buttons[q9i][e8M]=s9i;_buttons[e9i]=$[N8M]({},_buttons[Q8U]);_buttons[e9i][m8M]=s9i;}());Editor[b5F]={};Editor[p8M]=function(input,opts){var D2i="ss=\"";var S2i='-hours"/>';var F2i="es\"/>";var J2i="<select cl";var h2i="lass=\"";var b5i="match";var x2i="t class=\"";var C2i='-iconLeft">';var M2i="alendar";var N9i="struc";var P2i='-time">';var T2i="previo";var E2i="-title";var j2i="/d";var o2i="Editor datetime: Without momentjs only the format 'YYYY-MM-DD' can be used";var g5i='-error';var S9i="instance";var w2i="s\"/>";var K2i="\">";var v2i="elec";var b2i="-c";var H2i="utton>";var G2i="span/>";var L2i="v c";var W2i="YYY";var p9i="inde";var N2i='<span/>';var I2i="iv class=";var z2i="onth\"/>";var M5i=/[YMD]|L(?!T)|l/;var q2i='-iconRight">';var V2i='-title';var O2i="v ";var u2i="editor-dat";var k2i='-error"/>';var p2i='-calendar"/>';var R2i="-minut";var Q2i="/div";var r2i="cond";var k9i="DateT";var U5i=/[Hhm]|LT|LTS/;var U2i="<div cla";var m2i='-year"/>';var e2i='-label">';var P9i="xO";var s2i='<button>';var l2i='-date">';var D5i=/[haA]/;var m9i="endar";var a2i="Y-MM-DD";var g2i="eime-";var X2i=" cla";var p1M=N3F;p1M+=N9i;p1M+=g71.X7F;p1M+=P3F;var m1M=g71.F7F;m1M+=I7U;m1M+=m9i;var N1M=B4p;N1M+=B7F;N1M+=R0F;var e1M=g71.X7F;e1M+=P0F;e1M+=x8F;e1M+=B7F;var s1M=g71.h7F;s1M+=g71.w7F;s1M+=g71.L7F;var q1M=g71.h7F;q1M+=g71.w7F;q1M+=g71.L7F;var n1M=R7U;n1M+=z0F;n1M+=B7F;n1M+=R0F;var C1M=Z6F;C1M+=S2p;C1M+=B7F;C1M+=h0F;var l1M=g71.h7F;l1M+=e9F;var d1M=j1F;d1M+=h0F;d1M+=a3U;d1M+=g71.X7F;var A1M=p9i;A1M+=P9i;A1M+=g71.O7F;var t1M=g71.O7F;t1M+=R1p;t1M+=J0F;var f1M=Y3F;f1M+=S9i;var o1M=k9i;o1M+=V9i;var B1M=u2i;B1M+=g2i;var Z1M=g71.O7F;Z1M+=P0F;Z1M+=R0F;var y1M=g71.O7F;y1M+=P0F;y1M+=S7F;y1M+=g71.h7F;var i1M=b2i;i1M+=M2i;var a1M=y7F;a1M+=S7F;a1M+=g71.h7F;var W1M=X1p;W1M+=h8F;var K1M=y7F;K1M+=R0F;var E1M=p6F;E1M+=g71.L7F;var H1M=U2i;H1M+=D2i;var T1M=k9F;T1M+=j2i;T1M+=U5U;T1M+=b2F;var I1M=Y2i;I1M+=U4F;I1M+=r2i;I1M+=w2i;var c1M=R2i;c1M+=F2i;var G1M=m2U;G1M+=X2i;G1M+=O0F;G1M+=g5U;var J1M=U2i;J1M+=D2i;var z1M=k9F;z1M+=m9F;z1M+=g71.h7F;z1M+=e2U;var h1M=J2F;h1M+=O2i;h1M+=m6F;h1M+=g5U;var L1M=k9F;L1M+=Q2i;L1M+=b2F;var x1M=s2U;x1M+=e2U;var v1M=k9F;v1M+=O0F;v1M+=v2i;v1M+=x2i;var Q1M=J2F;Q1M+=L2i;Q1M+=h2i;var O1M=k9F;O1M+=m9F;O1M+=g71.h7F;O1M+=e2U;var X1M=D2F;X1M+=z2i;var F1M=J2i;F1M+=M4i;F1M+=g5U;var R1M=k9F;R1M+=G2i;var w1M=S7F;w1M+=B7F;w1M+=o7F;w1M+=g71.X7F;var r1M=c2i;r1M+=I2i;r1M+=g2F;var Y1M=T2i;Y1M+=C7F;Y1M+=O0F;var j1M=O0i;j1M+=H2i;var D1M=E2i;D1M+=K2i;var U1M=g2F;U1M+=b2F;var b1M=o8F;b1M+=g71.v7F;var k8M=W2i;k8M+=a2i;var S8M=M3F;S8M+=g71.x7F;S8M+=C7F;S8M+=n7F;var P8M=P2F;P8M+=p0F;P8M+=R0F;this[g71.F7F]=$[P8M](K9F,{},Editor[i2i][S8M],opts);var classPrefix=this[g71.F7F][y2i];var i18n=this[g71.F7F][u5F];if(!window[Z2i]&&this[g71.F7F][B2i]!==k8M){throw o2i;}var timeBlock=function(type){var f2i='-timeblock">';var g1M=R2F;g1M+=u2F;var u1M=Y2F;u1M+=m6F;u1M+=g5U;var V8M=o8F;V8M+=g71.v7F;g71[V8M]();return u1M+classPrefix+f2i+g1M;};g71[b1M]();var gap=function(){var t2i="<span";var A2i=">:</sp";var M1M=t2i;M1M+=A2i;M1M+=d2i;M1M+=b2F;return M1M;};var structure=$(O5F+classPrefix+U1M+O5F+classPrefix+l2i+O5F+classPrefix+D1M+O5F+classPrefix+C2i+j1M+i18n[Y1M]+n2i+z5F+r1M+classPrefix+q2i+s2i+i18n[w1M]+n2i+z5F+O5F+classPrefix+e2i+R1M+F1M+classPrefix+X1M+O1M+Q1M+classPrefix+e2i+N2i+v1M+classPrefix+m2i+x1M+L1M+h1M+classPrefix+p2i+z1M+O5F+classPrefix+P2i+J1M+classPrefix+S2i+G1M+classPrefix+c1M+O5F+classPrefix+I1M+T1M+H1M+classPrefix+k2i+z5F);this[E1M]={container:structure,date:structure[K1M](n4p+classPrefix+W1M),title:structure[C4p](n4p+classPrefix+V2i),calendar:structure[a1M](n4p+classPrefix+i1M),time:structure[y1M](n4p+classPrefix+u5i),error:structure[Z1M](n4p+classPrefix+g5i),input:$(input)};this[O0F]={d:A5F,display:A5F,minutesRange:A5F,secondsRange:A5F,namespace:B1M+Editor[o1M][f1M]++,parts:{date:this[g71.F7F][t1M][b5i](M5i)!==A5F,time:this[g71.F7F][B2i][b5i](U5i)!==A5F,seconds:this[g71.F7F][B2i][A1M](k1F)!==-G68,hours12:this[g71.F7F][d1M][b5i](D5i)!==A5F}};this[l1M][C1M][r3U](this[s5F][z7p])[n1M](this[s5F][j5i])[r3U](this[q1M][P6F]);this[s1M][z7p][r3U](this[s5F][e1M])[N1M](this[s5F][m1M]);this[p1M]();};$[e5F](Editor[i2i][O6F],{destroy:function(){var r5i='.editor-datetime';var V1M=p6F;V1M+=g71.L7F;var k1M=Z2p;k1M+=g71.O7F;var S1M=g71.F7F;S1M+=n6F;S1M+=q6F;S1M+=h0F;var P1M=g71.h7F;P1M+=g71.w7F;P1M+=g71.L7F;this[T0U]();this[P1M][S1M][k1M]()[Y5i]();this[V1M][c5F][H0p](r5i);},errorMsg:function(msg){var u9M=X2p;u9M+=P3F;var error=this[s5F][u9M];g71[g71.Y7F]();if(msg){var g9M=i4U;g9M+=y4F;error[g9M](msg);}else{error[Y5i]();}},hide:function(){var M9M=d8U;M9M+=P0F;M9M+=g71.h7F;M9M+=B7F;var b9M=a0F;b9M+=g71.v7F;g71[b9M]();this[M9M]();},max:function(date){var R5i="alande";var X5i="sT";var F5i="option";var D9M=w5i;D9M+=R5i;D9M+=h0F;var U9M=Y3F;U9M+=F5i;U9M+=X5i;U9M+=I3p;this[g71.F7F][O5i]=date;this[U9M]();this[D9M]();},min:function(date){var Q5i="nDate";var x5i="_setCalander";var j9M=R4i;j9M+=Q5i;g71[g71.Y7F]();this[g71.F7F][j9M]=date;this[v5i]();this[x5i]();},owns:function(node){var L5i="ntain";var r9M=w4U;r9M+=L5i;r9M+=B7F;r9M+=h0F;var Y9M=z0F;Y9M+=g71.x7F;Y9M+=K4F;Y9M+=o4p;return $(node)[Y9M]()[h5i](this[s5F][r9M])[c7U]>J68;},val:function(set,write){var a5i="Strict";var y5i="ale";var K5i="Va";var J5i="im";var f5i=/(\d{4})\-(\d{2})\-(\d{2})/;var Z5i="rma";var T5i="UTCDate";var W5i="lid";var H5i="_dateToUtc";var d5i="Output";var G5i="_setCalande";var C5i="toString";var I5i="tT";var E5i="oD";var o5i="atc";var A5i="_write";var i5i="mentLoc";var I9M=z5i;I9M+=J5i;I9M+=B7F;var c9M=G5i;c9M+=h0F;var G9M=c5i;G9M+=I5i;G9M+=o3F;G9M+=c4F;var J9M=m6U;J9M+=T5i;var z9M=g71.h7F;z9M+=u0U;z9M+=g71.x7F;z9M+=K0F;var w9M=O0F;w9M+=g71.X7F;w9M+=h0F;w9M+=g9U;if(set===undefined){return this[O0F][g71.h7F];}if(set instanceof Date){this[O0F][g71.h7F]=this[H5i](set);}else if(set===A5F||set===S1F){this[O0F][g71.h7F]=A5F;}else if(typeof set===w9M){if(window[Z2i]){var Q9M=g71.X7F;Q9M+=E5i;Q9M+=h8F;var O9M=B7U;O9M+=K5i;O9M+=W5i;var X9M=R1F;X9M+=o7i;X9M+=a5i;var F9M=R1F;F9M+=i5i;F9M+=y5i;var R9M=g71.O7F;R9M+=g71.w7F;R9M+=Z5i;R9M+=g71.X7F;var m=window[Z2i][B5i](set,this[g71.F7F][R9M],this[g71.F7F][F9M],this[g71.F7F][X9M]);this[O0F][g71.h7F]=m[O9M]()?m[Q9M]():A5F;}else{var v9M=g71.L7F;v9M+=o5i;v9M+=o8F;var match=set[v9M](f5i);this[O0F][g71.h7F]=match?new Date(Date[t5i](match[G68],match[c68]-G68,match[I68])):A5F;}}if(write||write===undefined){if(this[O0F][g71.h7F]){var x9M=A5i;x9M+=d5i;this[x9M]();}else{var h9M=P0F;h9M+=l5i;var L9M=g71.h7F;L9M+=g71.w7F;L9M+=g71.L7F;this[L9M][h9M][J3p](set);}}if(!this[O0F][g71.h7F]){this[O0F][g71.h7F]=this[H5i](new Date());}this[O0F][Y7U]=new Date(this[O0F][g71.h7F][C5i]());this[O0F][z9M][J9M](G68);this[G9M]();this[c9M]();this[I9M]();},_constructor:function(){var V5i='focus.editor-datetime click.editor-datetime';var e5i="nds";var B6i="_wr";var M6i='keyup.editor-datetime';var n5i="chang";var k5i='autocomplete';var L6i="tTi";var Z6i="_writeOutput";var Q6i="_correctMonth";var P5i="ildren";var S5i='-seconds';var q5i="iner";var l2M=M6U;l2M+=W7U;var O2M=U4F;O2M+=y4F;O2M+=c0p;var X2M=n5i;X2M+=B7F;var F2M=g71.w7F;F2M+=S7F;var R2M=A6F;R2M+=q5i;var g2M=g71.w7F;g2M+=S7F;var m9M=g71.w7F;m9M+=g71.O7F;m9M+=g71.O7F;var N9M=P0F;N9M+=S7F;N9M+=s5i;N9M+=g71.X7F;var l9M=U4F;l9M+=g71.F7F;l9M+=g71.w7F;l9M+=e5i;var d9M=z0F;d9M+=x3U;d9M+=p7F;var o9M=z0F;o9M+=g71.x7F;o9M+=h0F;o9M+=p7F;var y9M=g71.h7F;y9M+=J0F;y9M+=B7F;var T9M=o8F;T9M+=g71.v7F;g71[T9M]();var that=this;var classPrefix=this[g71.F7F][y2i];var onChange=function(){var m5i="Cha";var i9M=g71.h7F;i9M+=g71.w7F;i9M+=g71.L7F;var a9M=q2F;a9M+=I7U;var W9M=P0F;W9M+=N5i;W9M+=C7F;W9M+=g71.X7F;var K9M=g71.h7F;K9M+=g71.w7F;K9M+=g71.L7F;var E9M=g71.F7F;E9M+=g71.x7F;E9M+=y4F;E9M+=y4F;var H9M=p5F;H9M+=m5i;H9M+=s1F;H9M+=B7F;that[g71.F7F][H9M][E9M](that,that[K9M][W9M][a9M](),that[O0F][g71.h7F],that[i9M][c5F]);};if(!this[O0F][p5i][y9M]){var B9M=S7F;B9M+=g71.w7F;B9M+=S7F;B9M+=B7F;var Z9M=g71.h7F;Z9M+=g71.x7F;Z9M+=g71.X7F;Z9M+=B7F;this[s5F][Z9M][n5F](w7U,B9M);}if(!this[O0F][o9M][j5i]){var A9M=Z7U;A9M+=S7F;A9M+=B7F;var t9M=g71.F7F;t9M+=O0F;t9M+=O0F;var f9M=r3F;f9M+=g71.L7F;f9M+=B7F;this[s5F][f9M][t9M](w7U,A9M);}if(!this[O0F][d9M][l9M]){var e9M=h0F;e9M+=F4U;var s9M=O0F;s9M+=J4U;s9M+=S7F;var q9M=g2U;q9M+=P5i;var n9M=q3U;n9M+=T7F;var C9M=R8U;C9M+=K4F;C9M+=S7F;this[s5F][j5i][C9M](n9M+classPrefix+S5i)[Q8U]();this[s5F][j5i][q9M](s9M)[x5U](G68)[e9M]();}this[v5i]();this[s5F][N9M][X6U](k5i,m9M)[p5F](V5i,function(){var g6i=':disabled';var b6i="_show";var u6i="visible";var u2M=q2F;u2M+=g71.x7F;u2M+=y4F;var V9M=P0F;V9M+=O0F;var k9M=g71.h7F;k9M+=g71.w7F;k9M+=g71.L7F;var S9M=h4U;S9M+=u6i;var P9M=A6F;P9M+=q5i;var p9M=g71.h7F;p9M+=e9F;if(that[p9M][P9M][B7U](S9M)||that[k9M][c5F][V9M](g6i)){return;}that[J3p](that[s5F][c5F][u2M](),T9F);g71[g71.Y7F]();that[b6i]();})[g2M](M6i,function(){var D6i="ibl";var U6i=":vi";var D2M=U6i;D2M+=O0F;D2M+=D6i;D2M+=B7F;var U2M=P0F;U2M+=O0F;var M2M=b7U;M2M+=I4U;M2M+=q5i;var b2M=o8F;b2M+=g71.v7F;g71[b2M]();if(that[s5F][M2M][U2M](D2M)){var w2M=q2F;w2M+=g71.x7F;w2M+=y4F;var r2M=y8F;r2M+=z0F;r2M+=C7F;r2M+=g71.X7F;var Y2M=g71.h7F;Y2M+=g71.w7F;Y2M+=g71.L7F;var j2M=q2F;j2M+=g71.x7F;j2M+=y4F;that[j2M](that[Y2M][r2M][w2M](),T9F);}});this[s5F][R2M][F2M](X2M,O2M,function(){var I6i="rs";var T6i="12";var X6i="_set";var F6i='-month';var f6i="etTi";var w6i="hasCla";var O6i="Cala";var z6i="CFullYear";var h6i="setUT";var x6i="land";var J6i='-hours';var c6i="hou";var G6i='-ampm';var v6i="tCa";var R6i="asCl";var t6i="setUTCMinutes";var o6i="teOutput";var Y6i="minutes";var y6i="_setTime";var d2M=P0F;d2M+=j6i;d2M+=g71.X7F;var o2M=Y2i;o2M+=Y6i;var B2M=V5F;B2M+=r6i;B2M+=O0F;B2M+=O0F;var T2M=w6i;T2M+=e3F;var z2M=Y2i;z2M+=K0F;z2M+=B7F;z2M+=x3U;var v2M=o8F;v2M+=R6i;v2M+=M4i;v2M+=O0F;var Q2M=q2F;Q2M+=g71.x7F;Q2M+=y4F;var select=$(this);var val=select[Q2M]();if(select[v2M](classPrefix+F6i)){var h2M=X6i;h2M+=O6i;h2M+=R0F;h2M+=r4F;var L2M=U4i;L2M+=r4U;L2M+=I9i;L2M+=T9i;var x2M=D4U;x2M+=G8U;that[Q6i](that[O0F][x2M],val);that[L2M]();that[h2M]();}else if(select[d6F](classPrefix+z2M)){var I2M=c5i;I2M+=v6i;I2M+=x6i;I2M+=r4F;var c2M=c5i;c2M+=L6i;c2M+=g71.X7F;c2M+=c4F;var G2M=h6i;G2M+=z6i;var J2M=B0p;J2M+=y4F;J2M+=H6F;that[O0F][J2M][G2M](val);that[c2M]();that[I2M]();}else if(select[d6F](classPrefix+J6i)||select[T2M](classPrefix+G6i)){var H2M=c6i;H2M+=I6i;H2M+=T6i;if(that[O0F][p5i][H2M]){var Z2M=H6i;Z2M+=E6i;Z2M+=K6i;Z2M+=O0F;var y2M=z0F;y2M+=g71.L7F;var i2M=Y2i;i2M+=g71.x7F;i2M+=R4U;i2M+=g71.L7F;var a2M=g71.F7F;a2M+=g71.w7F;a2M+=W6i;a2M+=q5i;var W2M=g71.h7F;W2M+=g71.w7F;W2M+=g71.L7F;var K2M=b7U;K2M+=g71.X7F;K2M+=a6i;K2M+=z6F;var E2M=g71.h7F;E2M+=g71.w7F;E2M+=g71.L7F;var hours=$(that[E2M][K2M])[C4p](n4p+classPrefix+J6i)[J3p]()*G68;var pm=$(that[W2M][a2M])[C4p](n4p+classPrefix+i2M)[J3p]()===y2M;that[O0F][g71.h7F][Z2M](hours===i68&&!pm?J68:pm&&hours!==i68?hours+i68:hours);}else{that[O0F][g71.h7F][i6i](val);}that[y6i]();that[Z6i](K9F);onChange();}else if(select[B2M](classPrefix+o2M)){var t2M=B6i;t2M+=P0F;t2M+=o6i;var f2M=U4i;f2M+=f6i;f2M+=W8F;that[O0F][g71.h7F][t6i](val);that[f2M]();that[t2M](K9F);onChange();}else if(select[d6F](classPrefix+S5i)){var A2M=m6U;A2M+=i7F;A2M+=A6i;A2M+=d6i;that[O0F][g71.h7F][A2M](val);that[y6i]();that[Z6i](K9F);onChange();}that[s5F][d2M][M7U]();that[l6i]();})[p5F](l2M,function(e){var w7l="setUTCM";var V6i="conLeft";var Q7l="iteOutput";var t7l="TCDate";var k6i="-i";var B7l='setUTCHours';var G7l="_setTim";var W7l="Range";var b7l="sClass";var O7l="_setTitle";var p6i="tar";var y7l="getUTCHo";var D7l="alander";var q6i="Cas";var H7l="etT";var c7l="minutesRange";var E7l="secondsRange";var q7l="etCala";var i7l="urs";var N6i="rCas";var s7l="nder";var Z7l="getUTCHours";var M7l="isa";var o7l='setUTCMinutes';var m6i="nodeNam";var T7l="sClas";var h7l="uni";var s6i="tNode";var v7l="minu";var A7l="eToUt";var Y7l="TCMonth";var K7l="seconds";var u7l="ha";var e6i="toLow";var g7l="sC";var F7l="tCalander";var n6i="toLower";var f7l='setSeconds';var L7l="hour";var C6i="lec";var C7l="setUTCMonth";var R7l='-iconRight';var P6i='span';var a7l="getUTCH";var r7l="splay";var d7l="setUTCFullYear";var p2M=s4p;p2M+=S7F;var m2M=U4F;m2M+=C6i;m2M+=g71.X7F;var N2M=n6i;N2M+=q6i;N2M+=B7F;var e2M=J4U;e2M+=K4F;e2M+=S7F;e2M+=s6i;var s2M=e6i;s2M+=B7F;s2M+=N6i;s2M+=B7F;var q2M=m6i;q2M+=B7F;var n2M=p6i;n2M+=Y4p;var C2M=a0F;C2M+=g71.v7F;g71[C2M]();var d=that[O0F][g71.h7F];var nodeName=e[n2M][q2M][s2M]();var target=nodeName===P6i?e[q1U][e2M]:e[q1U];nodeName=target[Y8i][N2M]();if(nodeName===m2M){return;}e[S6i]();if(nodeName===p2M){var g5M=k6i;g5M+=V6i;var u5M=u7l;u5M+=g7l;u5M+=t6F;var k2M=u7l;k2M+=b7l;var S2M=g71.h7F;S2M+=M7l;S2M+=C3F;S2M+=k5F;var P2M=J4U;P2M+=Q0U;P2M+=g71.X7F;var button=$(target);var parent=button[P2M]();if(parent[d6F](S2M)&&!parent[k2M](U7l)){var V2M=d4F;V2M+=I2U;V2M+=h0F;button[V2M]();return;}if(parent[u5M](classPrefix+g5M)){var Y5M=g71.h7F;Y5M+=g71.w7F;Y5M+=g71.L7F;var j5M=w5i;j5M+=D7l;var D5M=z5i;D5M+=I3p;var U5M=j7l;U5M+=Y7l;var M5M=P5F;M5M+=r7l;var b5M=w7l;b5M+=w1p;b5M+=o8F;that[O0F][Y7U][b5M](that[O0F][M5M][U5M]()-G68);that[D5M]();that[j5M]();that[Y5M][c5F][M7U]();}else if(parent[d6F](classPrefix+R7l)){var R5M=P0F;R5M+=S7F;R5M+=z0F;R5M+=S5U;var w5M=g71.h7F;w5M+=g71.w7F;w5M+=g71.L7F;var r5M=c5i;r5M+=F7l;that[Q6i](that[O0F][Y7U],that[O0F][Y7U][X7l]()+G68);that[O7l]();that[r5M]();that[w5M][R5M][M7U]();}else if(button[A7i](n4p+classPrefix+u5i)[c7U]){var E5M=B6i;E5M+=Q7l;var H5M=c5i;H5M+=L6i;H5M+=g71.L7F;H5M+=B7F;var T5M=v7l;T5M+=x7l;var I5M=L7l;I5M+=O0F;var c5M=z0F;c5M+=g71.L7F;var O5M=h7l;O5M+=g71.X7F;var X5M=g71.h7F;X5M+=g71.x7F;X5M+=I4U;var F5M=g71.h7F;F5M+=g71.x7F;F5M+=I4U;var val=button[F5M](q3p);var unit=button[X5M](O5M);if(unit===z7l){if(parent[d6F](J7l)&&parent[d6F](U7l)){var Q5M=G7l;Q5M+=B7F;that[O0F][c7l]=val;that[Q5M]();return;}else{that[O0F][c7l]=A5F;}}if(unit===I7l){var L5M=u7l;L5M+=T7l;L5M+=O0F;var x5M=G4F;x5M+=y4F;x5M+=k5F;var v5M=u7l;v5M+=O0F;v5M+=y9p;v5M+=n1U;if(parent[v5M](x5M)&&parent[L5M](U7l)){var h5M=U4i;h5M+=H7l;h5M+=V9i;that[O0F][E7l]=val;that[h5M]();return;}else{var z5M=K7l;z5M+=W7l;that[O0F][z5M]=A5F;}}if(val===W3i){var J5M=a7l;J5M+=g71.w7F;J5M+=i7l;if(d[J5M]()>=i68){var G5M=y7l;G5M+=i7l;val=d[G5M]()-i68;}else{return;}}else if(val===c5M){if(d[Z7l]()<i68){val=d[Z7l]()+i68;}else{return;}}var set=unit===I5M?B7l:unit===T5M?o7l:f7l;d[set](val);that[H5M]();that[E5M](K9F);onChange();}else{var B5M=g71.X7F;B5M+=P0F;B5M+=W8F;var Z5M=H1F;Z5M+=K0F;var y5M=g71.h7F;y5M+=g71.x7F;y5M+=I4U;var i5M=g71.L7F;i5M+=g71.w7F;i5M+=S7F;i5M+=G9F;var a5M=H1F;a5M+=I4U;var W5M=H6i;W5M+=t7l;if(!d){var K5M=T2U;K5M+=A7l;K5M+=g71.F7F;d=that[K5M](new Date());}d[W5M](G68);d[d7l](button[Y5F](l7l));d[C7l](button[a5M](i5M));d[n7l](button[y5M](Z5M));that[Z6i](K9F);if(!that[O0F][p5i][B5M]){setTimeout(function(){that[T0U]();},W68);}else{var o5M=U4i;o5M+=q7l;o5M+=s7l;that[o5M]();}onChange();}}else{var t5M=a7i;t5M+=O0F;var f5M=g71.h7F;f5M+=g71.w7F;f5M+=g71.L7F;that[f5M][c5F][t5M]();}});},_compareDates:function(a,b){var N7l="oUtcSt";var m7l="ring";var p7l="_dateToUtcString";var e7l="ateT";var A5M=K0U;A5M+=e7l;A5M+=N7l;A5M+=m7l;g71[g71.Y7F]();return this[p7l](a)===this[A5M](b);},_correctMonth:function(date,month){var S7l="etU";var k7l="TCFullYear";var P7l="CMont";var V7l="_daysIn";var b4l="setUTCMon";var u4l="Mon";var n5M=H6i;n5M+=V4F;n5M+=P7l;n5M+=o8F;var C5M=a0F;C5M+=g71.v7F;var l5M=Q8F;l5M+=S7l;l5M+=k7l;var d5M=V7l;d5M+=u4l;d5M+=G9F;var days=this[d5M](date[l5M](),month);var correctDays=date[g4l]()>days;g71[C5M]();date[n5M](month);if(correctDays){var q5M=b4l;q5M+=G9F;date[n7l](days);date[q5M](month);}},_daysInMonth:function(year,month){var q68=31;var C68=29;var l68=28;var n68=30;var isLeap=year%T68===J68&&(year%P68!==J68||year%k68===J68);var months=[q68,isLeap?C68:l68,q68,n68,q68,n68,q68,q68,n68,q68,n68,q68];g71[F9F]();return months[month];},_dateToUtc:function(s){var D4l="tDat";var Y4l="getMinutes";var U4l="tHours";var m5M=M4l;m5M+=d6i;var N5M=Q8F;N5M+=B7F;N5M+=U4l;var e5M=Q8F;e5M+=B7F;e5M+=D4l;e5M+=B7F;var s5M=Y4p;s5M+=W0F;s5M+=w1p;s5M+=o8F;return new Date(Date[t5i](s[j4l](),s[s5M](),s[e5M](),s[N5M](),s[Y4l](),s[m5M]()));},_dateToUtcString:function(d){var S5M=Y3F;S5M+=J4U;S5M+=g71.h7F;var P5M=Y4p;P5M+=g2p;P5M+=V4F;P5M+=r4l;var p5M=Y3F;p5M+=z0F;p5M+=g71.x7F;p5M+=g71.h7F;g71[F9F]();return d[w4l]()+s0p+this[p5M](d[P5M]()+G68)+s0p+this[S5M](d[g4l]());},_hide:function(){var R4l="lick.";var X4l="wn.";var O4l="tac";var F4l="keydo";var U6M=g71.F7F;U6M+=R4l;var M6M=d4F;M6M+=g71.w7F;M6M+=w3F;var b6M=g71.w7F;b6M+=g71.O7F;b6M+=g71.O7F;var g6M=F4l;g6M+=X4l;var u6M=o8F;u6M+=g71.v7F;var V5M=g71.w7F;V5M+=g71.O7F;V5M+=g71.O7F;var k5M=g71.h7F;k5M+=B7F;k5M+=O4l;k5M+=o8F;var namespace=this[O0F][t3p];this[s5F][a6F][k5M]();$(window)[V5M](n4p+namespace);g71[u6M]();$(document)[H0p](g6M+namespace);$(r9U)[b6M](Q4l+namespace);$(M6M)[H0p](U6M+namespace);},_hours24To12:function(val){g71[g71.Y7F]();return val===J68?i68:val>i68?val-i68:val;},_htmlDay:function(day){var i4l='<td data-day="';var L4l="year=";var d4l='</td>';var a4l="cted";var t4l="day";var I4l="selec";var z4l=" cl";var h4l="<button";var E4l="d>";var G4l="tod";var A4l='<span>';var H4l="</t";var v4l="pan>";var x4l="ye";var J4l="\" cl";var Z4l='-day" type="button" ';var f4l='" data-day="';var B4l='" data-month="';var T4l="<td class=\"empty\">";var z6M=X2F;z6M+=O0F;z6M+=v4l;var h6M=H1F;h6M+=K0F;var L6M=x4l;L6M+=g71.x7F;L6M+=h0F;var x6M=C8i;x6M+=L4l;x6M+=g2F;var v6M=h4l;v6M+=z4l;v6M+=n1U;v6M+=r9F;var Q6M=D7p;Q6M+=g71.w7F;Q6M+=P0F;Q6M+=S7F;var O6M=J4l;O6M+=S9F;var X6M=g71.h7F;X6M+=H6F;var r6M=G4l;r6M+=H6F;var Y6M=q7p;Y6M+=c4l;var j6M=I4l;j6M+=y9U;if(day[Y5i]){var D6M=T4l;D6M+=H4l;D6M+=E4l;return D6M;}var classes=[j6M];var classPrefix=this[g71.F7F][y2i];if(day[Y6M]){classes[h9F](J7l);}if(day[r6M]){var R6M=S7F;R6M+=g71.w7F;R6M+=c8F;var w6M=z0F;w6M+=C7F;w6M+=R9p;classes[w6M](R6M);}if(day[K4l]){var F6M=W4l;F6M+=a4l;classes[h9F](F6M);}return i4l+day[X6M]+O6M+classes[Q6M](Q5F)+x5F+v6M+classPrefix+y4l+classPrefix+Z4l+x6M+day[L6M]+B4l+day[o4l]+f4l+day[t4l]+x5F+A4l+day[h6M]+z6M+n2i+d4l;},_htmlMonth:function(year,month){var q4l="ody>";var U0l="nutes";var e4l="xD";var T0l="Rig";var C4l="jo";var M0l="setUTCMi";var m4l="getUT";var X0l="getUTCDay";var S4l="To";var R0l="UT";var z0l=" weekN";var b0l="Day";var J0l="mber";var G0l="non";var a0l='</table>';var P4l="_date";var j0l="tUTCMin";var c0l='-iconLeft';var x0l="_htmlWeekOfYear";var p4l="CDay";var V4l="_daysInMonth";var F0l="_compareDates";var O0l="_htmlDay";var Y0l="setUTCHour";var f68=23;var K0l="_htmlMonthHead";var I0l="-icon";var E0l='<thead>';var D0l="setSeconds";var k4l="tc";var l4l="tbody";var v0l="eekNumbe";var W0l='</thead>';var s4l="showWeekNumbe";var Q0l="owW";var g0l="firs";var w0l="bleDay";var n4l="<tb";var S6M=X2F;S6M+=l4l;S6M+=b2F;var P6M=C4l;P6M+=P0F;P6M+=S7F;var p6M=n4l;p6M+=q4l;var f6M=s4l;f6M+=h0F;var o6M=Y2i;o6M+=g71.X7F;o6M+=Z1p;o6M+=B7F;var H6M=a3U;H6M+=e4l;H6M+=g71.x7F;H6M+=p0F;var T6M=N4l;T6M+=V7F;var c6M=m4l;c6M+=p4l;var G6M=g2p;G6M+=V4F;G6M+=W7F;var J6M=P4l;J6M+=S4l;J6M+=g2p;J6M+=k4l;var now=this[J6M](new Date()),days=this[V4l](year,month),before=new Date(Date[G6M](year,month,G68))[c6M](),data=[],row=[];if(this[g71.F7F][u0l]>J68){var I6M=g0l;I6M+=g71.X7F;I6M+=b0l;before-=this[g71.F7F][I6M];if(before<J68){before+=E68;}}var cells=days+before,after=cells;while(after>E68){after-=E68;}cells+=E68-after;var minDate=this[g71.F7F][T6M];var maxDate=this[g71.F7F][H6M];if(minDate){var E6M=M0l;E6M+=U0l;minDate[i6i](J68);minDate[E6M](J68);minDate[D0l](J68);}if(maxDate){var W6M=U4F;W6M+=j0l;W6M+=C7F;W6M+=x7l;var K6M=Y0l;K6M+=O0F;maxDate[K6M](f68);maxDate[W6M](m68);maxDate[D0l](m68);}for(var i=J68,r=J68;i<cells;i++){var Z6M=z0F;Z6M+=C7F;Z6M+=O0F;Z6M+=o8F;var y6M=g71.O7F;y6M+=t0i;y6M+=r6F;y6M+=S7F;var i6M=P5F;i6M+=r0l;i6M+=w0l;i6M+=O0F;var a6M=R0l;a6M+=W7F;var day=new Date(Date[a6M](year,month,G68+(i-before))),selected=this[O0F][g71.h7F]?this[F0l](day,this[O0F][g71.h7F]):T9F,today=this[F0l](day,now),empty=i<before||i>=days+before,disabled=minDate&&day<minDate||maxDate&&day>maxDate;var disableDays=this[g71.F7F][i6M];if($[u4U](disableDays)&&$[i7U](day[X0l](),disableDays)!==-G68){disabled=K9F;}else if(typeof disableDays===y6M&&disableDays(day)===K9F){disabled=K9F;}var dayConfig={day:G68+(i-before),month:month,year:year,selected:selected,today:today,disabled:disabled,empty:empty};row[Z6M](this[O0l](dayConfig));if(++r===E68){var B6M=R9p;B6M+=Q0l;B6M+=v0l;B6M+=h0F;if(this[g71.F7F][B6M]){row[O2p](this[x0l](i-before,month,year));}data[h9F](L0l+row[q0p](S1F)+h0l);row=[];r=J68;}}var classPrefix=this[g71.F7F][y2i];var className=classPrefix+o6M;if(this[g71.F7F][f6M]){var t6M=z0l;t6M+=C7F;t6M+=J0l;className+=t6M;}if(minDate){var q6M=G0l;q6M+=B7F;var n6M=P5F;n6M+=O0F;n6M+=G8U;var C6M=g71.F7F;C6M+=O0F;C6M+=O0F;var l6M=g71.h7F;l6M+=P0F;l6M+=q2F;l6M+=T7F;var d6M=g71.X7F;d6M+=o3F;d6M+=y4F;d6M+=B7F;var A6M=g2p;A6M+=V4F;A6M+=W7F;var underMin=minDate>=new Date(Date[A6M](year,month,G68,J68,J68,J68));this[s5F][d6M][C4p](l6M+classPrefix+c0l)[C6M](n6M,underMin?q6M:f7U);}if(maxDate){var m6M=d4F;m6M+=x2U;m6M+=W7U;var N6M=S7F;N6M+=g71.w7F;N6M+=S7F;N6M+=B7F;var e6M=g71.F7F;e6M+=O0F;e6M+=O0F;var s6M=I0l;s6M+=T0l;s6M+=o8F;s6M+=g71.X7F;var overMax=maxDate<new Date(Date[t5i](year,month+G68,G68,J68,J68,J68));this[s5F][T5F][C4p](N4p+classPrefix+s6M)[e6M](w7U,overMax?N6M:m6M);}return H0l+className+x5F+E0l+this[K0l]()+W0l+p6M+data[P6M](S1F)+S6M+a0l;},_htmlMonthHead:function(){var f0l="h>";var t0l="</th>";var A0l='<th>';var y0l="wWeekNumb";var d0l='</th>';var b78=D7p;b78+=i0l;b78+=S7F;var u78=G8F;u78+=y0l;u78+=r4F;var k6M=P0F;k6M+=I7F;k6M+=T1p;k6M+=S7F;g71[F9F]();var a=[];var firstDay=this[g71.F7F][u0l];var i18n=this[g71.F7F][k6M];var dayName=function(day){var Z0l="we";var B0l="kday";var V6M=Z0l;V6M+=B7F;V6M+=B0l;V6M+=O0F;day+=firstDay;while(day>=E68){day-=E68;}return i18n[V6M][day];};if(this[g71.F7F][u78]){var g78=o0l;g78+=f0l;g78+=t0l;a[h9F](g78);}for(var i=J68;i<E68;i++){a[h9F](A0l+dayName(i)+d0l);}return a[b78](S1F);},_htmlWeekOfYear:function(d,m,y){var e0l="getDay";var U7F=86400000;var C0l="-week";var N0l="ceil";var q0l="d clas";var Y78=k9F;Y78+=m9F;Y78+=l0l;Y78+=b2F;var j78=C0l;j78+=g2F;j78+=b2F;var D78=Y1F;D78+=M4i;D78+=r8p;D78+=n0l;var U78=o0l;U78+=q0l;U78+=g5U;var M78=L3U;M78+=H0i;M78+=g71.X7F;M78+=B7F;var date=new Date(y,m,d,J68,J68,J68,J68);date[s0l](date[M78]()+T68-(date[e0l]()||E68));var oneJan=new Date(y,J68,G68);var weekNum=Math[N0l](((date-oneJan)/U7F+G68)/E68);return U78+this[g71.F7F][D78]+j78+weekNum+Y78;},_options:function(selector,values,labels){var S0l="</opti";var p0l="sPrefix";var V0l='<option value="';var m0l="empt";var k0l="on>";var X78=y4F;X78+=x3F;X78+=d4U;X78+=o8F;var F78=m0l;F78+=K0F;var R78=m6F;R78+=p0l;var w78=w4U;w78+=W6i;w78+=y8F;w78+=r4F;var r78=p6F;r78+=g71.L7F;if(!labels){labels=values;}var select=this[r78][w78][C4p](P0l+this[g71.F7F][R78]+s0p+selector);select[F78]();for(var i=J68,ien=values[X78];i<ien;i++){var Q78=S0l;Q78+=k0l;var O78=g2F;O78+=b2F;select[r3U](V0l+values[i]+O78+labels[i]+Q78);}},_optionSet:function(selector,val){var u3l="18n";var j3l="unknown";var U3l="classP";var M3l="spa";var D3l="parent";var g3l="ion:se";var b3l="lected";var T78=P0F;T78+=u3l;var I78=p0F;I78+=d7F;var c78=z9F;c78+=Q8F;c78+=G9F;var G78=g71.w7F;G78+=b0F;G78+=g3l;G78+=b3l;var J78=g5p;J78+=g71.h7F;var z78=a0F;z78+=g71.v7F;var h78=M3l;h78+=S7F;var L78=U3l;L78+=n0l;var x78=w4U;x78+=N8F;x78+=S2p;x78+=r4F;var v78=g71.h7F;v78+=g71.w7F;v78+=g71.L7F;var select=this[v78][x78][C4p](P0l+this[g71.F7F][L78]+s0p+selector);var span=select[D3l]()[A8U](h78);g71[z78]();select[J3p](val);var selected=select[J78](G78);span[K4U](selected[c78]!==J68?selected[I78]():this[g71.F7F][T78][j3l]);},_optionsTime:function(unit,count,val,allowed,range){var H3l="amPm";var O3l='-table';var a3l='<tbody>';var i3l='</tbody>';var H68=6;var X3l="lassP";var R3l="th cols";var F3l="pan=\"";var w3l="<tr><";var E3l='</tbody></thead><table class="';var W3l='</th></tr></thead>';var Y3l="/table";var r3l="<thead>";var K3l='-nospace"><tbody>';var m78=k9F;m78+=Y3l;m78+=b2F;var N78=g2F;N78+=b2F;var e78=r3l;e78+=w3l;e78+=R3l;e78+=F3l;var s78=g2F;s78+=b2F;var i78=g71.F7F;i78+=X3l;i78+=h0F;i78+=f2F;var a78=Y3F;a78+=J4U;a78+=g71.h7F;var K78=y7F;K78+=R0F;var E78=b7U;E78+=g71.X7F;E78+=B6F;var H78=g71.h7F;H78+=g71.w7F;H78+=g71.L7F;var classPrefix=this[g71.F7F][y2i];var container=this[H78][E78][K78](N4p+classPrefix+s0p+unit);var i,j;var render=count===i68?function(i){var W78=a0F;W78+=g71.v7F;g71[W78]();return i;}:this[a78];var classPrefix=this[g71.F7F][i78];g71[F9F]();var className=classPrefix+O3l;var i18n=this[g71.F7F][u5F];if(!container[c7U]){return;}var a=S1F;var span=W68;var button=function(value,label,className){var v3l="<spa";var G3l=' disabled';var I3l='-day" type="button" data-unit="';var h3l="ss=";var J3l='pm';var L3l="<button cla";var z3l="nArr";var T3l='" data-value="';var c3l='<td class="selectable ';var Q3l="/span";var f78=k9F;f78+=m9F;f78+=l0l;f78+=b2F;var o78=k9F;o78+=Q3l;o78+=b2F;var B78=v3l;B78+=x3l;var Z78=L3l;Z78+=h3l;Z78+=g2F;var y78=P0F;y78+=z3l;y78+=H6F;if(count===i68&&val>=i68&&typeof value===l6U){value+=i68;}var selected=val===value||value===W3i&&val<i68||value===J3l&&val>=i68?J9i:S1F;if(allowed&&$[y78](value,allowed)===-G68){selected+=G3l;}if(className){selected+=Q5F+className;}return c3l+selected+x5F+Z78+classPrefix+y4l+classPrefix+I3l+unit+T3l+value+x5F+B78+label+o78+n2i+f78;};if(count===i68){var d78=z0F;d78+=g71.L7F;var A78=k9F;A78+=z5p;A78+=b2F;var t78=g71.x7F;t78+=g71.L7F;a+=L0l;for(i=G68;i<=H68;i++){a+=button(i,render(i));}a+=button(t78,i18n[H3l][J68]);a+=h0l;a+=A78;for(i=E68;i<=i68;i++){a+=button(i,render(i));}a+=button(d78,i18n[H3l][G68]);a+=h0l;span=E68;}else if(count===t68){var c=J68;for(j=J68;j<T68;j++){var l78=k9F;l78+=g71.X7F;l78+=Q0i;a+=l78;for(i=J68;i<H68;i++){a+=button(c,render(c));c++;}a+=h0l;}span=H68;}else{var q78=g71.O7F;q78+=y4F;q78+=x1p;q78+=h0F;var n78=k9F;n78+=m9F;n78+=z5p;n78+=b2F;var C78=k9F;C78+=g71.X7F;C78+=Q0i;a+=C78;for(j=J68;j<p68;j+=W68){a+=button(j,render(j),U7l);}a+=n78;a+=E3l+className+Q5F+className+K3l;var start=range!==A5F?range:Math[q78](val/W68)*W68;a+=L0l;for(j=start+G68;j<start+W68;j++){a+=button(j,render(j));}a+=h0l;span=H68;}container[Y5i]()[r3U](H0l+className+s78+e78+span+N78+i18n[unit]+W3l+a3l+a+i3l+m78);},_optionsTitle:function(){var t3l="_options";var o3l="llYear";var f3l="yearRange";var B3l="getFu";var Z3l="ullYear";var y3l="getF";var g48=Y3F;g48+=h0F;g48+=d2i;g48+=L3U;var u48=o4l;u48+=O0F;var V78=y3l;V78+=Z3l;var k78=B3l;k78+=o3l;var S78=a0F;S78+=g71.v7F;var P78=N4l;P78+=O4F;P78+=g71.x7F;P78+=p0F;var p78=S1i;p78+=T1p;p78+=S7F;var i18n=this[g71.F7F][p78];var min=this[g71.F7F][P78];var max=this[g71.F7F][O5i];var minYear=min?min[j4l]():A5F;g71[S78]();var maxYear=max?max[k78]():A5F;var i=minYear!==A5F?minYear:new Date()[V78]()-this[g71.F7F][f3l];var j=maxYear!==A5F?maxYear:new Date()[j4l]()+this[g71.F7F][f3l];this[t3l](A3l,this[d3l](J68,a68),i18n[u48]);this[t3l](l7l,this[g48](i,j));},_pad:function(i){var l3l='0';return i<W68?l3l+i:i;},_position:function(){var e3l="cs";var S3l="widt";var P3l="ef";var s3l="outerWidt";var n3l="scr";var m3l="ontainer";var C3l="ight";var N3l="inpu";var p3l='top';var q3l="ollTop";var v48=c8F;v48+=P0F;v48+=g71.h7F;v48+=G9F;var Q48=c4F;Q48+=g71.O7F;Q48+=g71.X7F;var F48=i7p;F48+=C3l;var R48=g71.X7F;R48+=T8F;var w48=n3l;w48+=q3l;var r48=s3l;r48+=o8F;var Y48=y4F;Y48+=B7F;Y48+=q4U;var j48=e3l;j48+=O0F;var D48=N3l;D48+=g71.X7F;var U48=g71.F7F;U48+=m3l;var M48=g71.h7F;M48+=g71.w7F;M48+=g71.L7F;var b48=P0F;b48+=S7F;b48+=s5i;b48+=g71.X7F;var offset=this[s5F][b48][y1U]();var container=this[M48][U48];var inputHeight=this[s5F][D48][w9U]();container[j48]({top:offset[i1U]+inputHeight,left:offset[Y48]})[O8U](M3U);var calHeight=container[w9U]();var calWidth=container[r48]();var scrollTop=$(window)[w48]();if(offset[R48]+inputHeight+calHeight-scrollTop>$(window)[F48]()){var O48=g71.F7F;O48+=O0F;O48+=O0F;var X48=g71.X7F;X48+=g71.w7F;X48+=z0F;var newTop=offset[X48]-calHeight;container[O48](p3l,newTop<J68?J68:newTop);}if(calWidth+offset[Q48]>$(window)[v48]()){var L48=y4F;L48+=P3l;L48+=g71.X7F;var x48=S3l;x48+=o8F;var newLeft=$(window)[x48]()-calWidth;container[n5F](L48,newLeft<J68?J68:newLeft);}},_range:function(start,end,inc){var h48=o8F;h48+=g71.v7F;var a=[];if(!inc){inc=G68;}g71[h48]();for(var i=start;i<=end;i+=inc){a[h9F](i);}return a;},_setCalander:function(){var g8l="calen";var u8l="onth";var k3l="isp";var V3l="lM";var b8l="dar";var z48=g71.h7F;z48+=k3l;z48+=n9F;z48+=K0F;g71[F9F]();if(this[O0F][z48]){var T48=g71.h7F;T48+=E8U;T48+=K0F;var I48=L1U;I48+=H6F;var c48=Y3F;c48+=i4U;c48+=V3l;c48+=u8l;var G48=g71.x7F;G48+=E4p;var J48=g8l;J48+=b8l;this[s5F][J48][Y5i]()[G48](this[c48](this[O0F][I48][w4l](),this[O0F][T48][X7l]()));}},_setTitle:function(){var M8l="etUTCFullYear";var U8l="optionSet";var D8l="_optionSet";var i48=Q8F;i48+=M8l;var a48=K0F;a48+=f7p;var W48=a0F;W48+=g71.v7F;var K48=j7l;K48+=V4F;K48+=r4l;var E48=M8i;E48+=K0F;var H48=Y3F;H48+=U8l;this[H48](A3l,this[O0F][E48][K48]());g71[W48]();this[D8l](a48,this[O0F][Y7U][i48]());},_setTime:function(){var Y8l="nge";var G8l='hours';var j8l="secondsRa";var w8l="_opti";var x8l="ptionsTime";var R8l="nutesRange";var c8l="_optionsTime";var F8l="ute";var v8l="_o";var L8l="ours";var X8l="getUTCMinute";var r8l="sec";var O8l="sAvailable";var Q8l="s12";var s48=j8l;s48+=Y8l;var q48=r8l;q48+=d6i;var n48=M4l;n48+=x0F;n48+=O0F;var C48=w8l;C48+=T6p;C48+=W1F;var l48=R4i;l48+=R8l;var d48=g71.L7F;d48+=y8F;d48+=F8l;d48+=O0F;var A48=X8l;A48+=O0F;var t48=o8F;t48+=K6i;t48+=O8l;var f48=o8F;f48+=g71.w7F;f48+=W5U;f48+=Q8l;var o48=v8l;o48+=x8l;var y48=j7l;y48+=E6i;y48+=L8l;var that=this;var d=this[O0F][g71.h7F];var hours=d?d[y48]():J68;var allowed=function(prop){var J8l='Increment';var z8l='Available';var h8l="Av";var B48=h8l;B48+=g71.x7F;B48+=B1F;B48+=j9p;var Z48=a0F;Z48+=g71.v7F;g71[Z48]();return that[g71.F7F][prop+B48]?that[g71.F7F][prop+z8l]:that[d3l](J68,m68,that[g71.F7F][prop+J8l]);};this[o48](G8l,this[O0F][p5i][f48]?i68:t68,hours,this[g71.F7F][t48]);this[c8l](z7l,p68,d?d[A48]():J68,allowed(d48),this[O0F][l48]);this[C48](I7l,p68,d?d[n48]():J68,allowed(q48),this[O0F][s48]);},_show:function(){var a8l='keydown.';var H8l="scro";var E8l="pac";var T8l="iz";var I8l=" r";var k48=g71.w7F;k48+=S7F;var S48=g71.w7F;S48+=S7F;var m48=I8l;m48+=A3p;m48+=T8l;m48+=R5U;var N48=H8l;N48+=y4F;N48+=y4F;N48+=T7F;var e48=B2F;e48+=O0F;e48+=E8l;e48+=B7F;var that=this;var namespace=this[O0F][e48];g71[F9F]();this[l6i]();$(window)[p5F](N48+namespace+m48+namespace,function(){var W8l="osition";var P48=K8l;P48+=W8l;var p48=a0F;p48+=g71.v7F;g71[p48]();that[P48]();});$(r9U)[S48](Q4l+namespace,function(){g71[g71.Y7F]();that[l6i]();});$(document)[k48](a8l+namespace,function(e){var K68=9;g71[F9F]();if(e[x6U]===K68||e[x6U]===d68||e[x6U]===y68){that[T0U]();}});setTimeout(function(){var i8l='click.';var u08=g71.w7F;u08+=S7F;var V48=w8U;V48+=g71.h7F;V48+=K0F;$(V48)[u08](i8l+namespace,function(e){var y8l="lte";var D08=I4U;D08+=h0F;D08+=L3U;D08+=g71.X7F;var U08=c4F;U08+=S7F;U08+=d4U;U08+=o8F;var M08=p6F;M08+=g71.L7F;var b08=g71.O7F;b08+=P0F;b08+=y8l;b08+=h0F;var g08=z0F;g08+=W6F;g08+=g71.X7F;g08+=O0F;var parents=$(e[q1U])[g08]();if(!parents[b08](that[M08][a6F])[U08]&&e[D08]!==that[s5F][c5F][J68]){var j08=d8U;j08+=f8F;j08+=B7F;that[j08]();}});},W68);},_writeOutput:function(focus){var B8l="momentS";var Z8l="forma";var f8l="momentLocale";var o8l="trict";var t8l="_pad";var O08=P0F;O08+=S7F;O08+=f4F;var X08=g71.h7F;X08+=g71.w7F;X08+=g71.L7F;var F08=K8l;F08+=g71.x7F;F08+=g71.h7F;var R08=Z8l;R08+=g71.X7F;var w08=B8l;w08+=o8l;var r08=g71.L7F;r08+=e9F;r08+=x3F;r08+=g71.X7F;var Y08=g71.L7F;Y08+=e9F;Y08+=x3F;Y08+=g71.X7F;var date=this[O0F][g71.h7F];var out=window[Y08]?window[r08][B5i](date,undefined,this[g71.F7F][f8l],this[g71.F7F][w08])[R08](this[g71.F7F][B2i]):date[w4l]()+s0p+this[F08](date[X7l]()+G68)+s0p+this[t8l](date[g4l]());this[X08][O08][J3p](out);if(focus){this[s5F][c5F][M7U]();}}});Editor[i2i][Q08]=J68;Editor[i2i][v08]={classPrefix:A8l,disableDays:A5F,firstDay:G68,format:x08,hoursAvailable:A5F,i18n:Editor[L08][u5F][d8l],maxDate:A5F,minDate:A5F,minutesAvailable:A5F,minutesIncrement:G68,momentStrict:K9F,momentLocale:l8l,onChange:function(){},secondsAvailable:A5F,secondsIncrement:G68,showWeekNumber:T9F,yearRange:W68};(function(){var N8l="uploa";var W9l="_la";var H2l='input';var s8l="Type";var d2l="_preC";var T5l="_picker";var h1l="_enabled";var Y2l='input:last';var b9l="password";var V9l="box";var N1l="_i";var a2l="<l";var p9l="ttr";var V1l='<input/>';var k9l="eck";var C8l="loadMany";var l2l="hecked";var s9l="checkbox";var Z5l="ker";var D2l='_';var p1l="prop";var V5l="enabled";var q8l="hid";var G9l="inp";var u5l="datepicker";var J9l="_editor_val";var m9l="_editor_va";var v9l="placeho";var k1l="_in";var e1l="_inp";var o9l="separator";var L1l="_input";var N9l="optionsPair";var S1l="_val";var P1l="_va";var A5l="oa";var F2l="chec";var n8l="adon";var u9l="fe";var r9l="select";var m1l="_inpu";var q1l="va";var D9l="textarea";var O2l='<div />';var Q2l="_addOptions";var r58=w0F;r58+=S7F;r58+=g71.h7F;var Y58=G8p;Y58+=C8l;var y28=B7F;y28+=o7F;y28+=p0F;y28+=R0F;var E98=U0F;E98+=D0F;var I18=h0F;I18+=g71.x7F;I18+=P5F;I18+=g71.w7F;var t38=B7F;t38+=d7F;t38+=D0F;var H38=P2F;H38+=k2F;var T38=p0F;T38+=d7F;var z38=K4F;z38+=n8l;z38+=e2p;var x38=q8l;x38+=g71.h7F;x38+=B7F;x38+=S7F;var j38=g71.O7F;j38+=O8p;j38+=s8l;var D38=B7F;D38+=o7F;D38+=k2F;var fieldTypes=Editor[b5F];function _buttonText(conf,text){var P8l="...";var e8l="div.";var S8l="uploadText";var m8l="d ";var p8l="Choose f";var G08=e8l;G08+=N8l;G08+=m8l;G08+=p4U;var J08=y7F;J08+=R0F;var z08=Y3F;z08+=P0F;z08+=l5i;if(text===A5F||text===undefined){var h08=p8l;h08+=P0F;h08+=c4F;h08+=P8l;text=conf[S8l]||h08;}g71[F9F]();conf[z08][J08](G08)[K4U](text);}function _commonUpload(editor,conf,dropCallback,multiple){var z1l="FileReader";var w1l='<input type="file" ';var R1l='multiple';var J1l="dragDrop";var f1l='dragleave dragexit';var E1l="dragDropText";var b1l="s=\"editor_upload\">";var x1l='<div class="rendered"/>';var G1l="dr";var v1l='<div class="cell">';var K1l='div.drop';var Y1l='<button class="';var U1l="nternal";var A1l='dragover.DTE_Upload drop.DTE_Upload';var d1l="v.rendered";var c1l="agover";var Q1l='<div class="drop"><span/></div>';var g1l="class=\"row\">";var D1l='<div class="eu_table">';var T1l="e to upload";var j1l='<div class="cell upload limitHide">';var W1l='drop';var o1l='over';var I1l="Drag and drop a file her";var u1l="iv ";var X1l='<div class="cell clearValue">';var H1l='div.drop span';var C1l='div.clearValue button';var k8l="<div class=\"row";var V8l=" second\">";var n1l='input[type=file]';var M1l="ttonI";var F1l='/>';var l1l="noD";var O1l='<div class="cell limitHide">';var r1l='" />';var k08=g71.w7F;k08+=S7F;var S08=g71.F7F;S08+=y4F;S08+=P0F;S08+=W7U;var P08=g71.w7F;P08+=S7F;var W08=k9F;W08+=m9F;W08+=P5F;W08+=u2F;var K08=k8l;K08+=V8l;var E08=X2F;E08+=p9F;var H08=c2i;H08+=u1l;H08+=g1l;var T08=g0U;T08+=b1l;var I08=D5U;I08+=M1l;I08+=U1l;var c08=g71.O7F;c08+=R1p;var btnClass=editor[G6F][c08][I08];var container=$(T08+D1l+H08+j1l+Y1l+btnClass+r1l+w1l+(multiple?R1l:S1F)+F1l+E08+X1l+Y1l+btnClass+r1l+z5F+z5F+K08+O1l+Q1l+z5F+v1l+x1l+z5F+z5F+W08+z5F);conf[L1l]=container;conf[h1l]=K9F;_buttonText(conf);if(window[z1l]&&conf[J1l]!==T9F){var e08=Y1F;e08+=a6U;e08+=B7F;var s08=g71.w7F;s08+=S7F;var l08=g71.w7F;l08+=z0F;l08+=B7F;l08+=S7F;var t08=G1l;t08+=c1l;var f08=g71.w7F;f08+=S7F;var i08=I1l;i08+=T1l;var a08=p0F;a08+=o7F;a08+=g71.X7F;container[C4p](H1l)[a08](conf[E1l]||i08);var dragDrop=container[C4p](K1l);dragDrop[p5F](W1l,function(e){var y1l="oveClass";var B1l="dataTransfer";var i1l="rem";var a1l="_ena";var Z1l="riginalE";var y08=a1l;y08+=c4l;if(conf[y08]){var o08=i1l;o08+=y1l;var B08=g71.w7F;B08+=Z1l;B08+=q2F;B08+=Z3F;var Z08=G8p;Z08+=x2U;Z08+=g71.x7F;Z08+=g71.h7F;Editor[Z08](editor,conf,e[B08][B1l][b8F],_buttonText,dropCallback);dragDrop[o08](o1l);}return T9F;})[f08](f1l,function(e){if(conf[h1l]){dragDrop[o6F](o1l);}return T9F;})[p5F](t08,function(e){var t1l="addC";if(conf[h1l]){var d08=g71.w7F;d08+=q2F;d08+=r4F;var A08=t1l;A08+=n9F;A08+=e3F;dragDrop[A08](d08);}return T9F;});editor[p5F](l08,function(){var n08=g71.w7F;n08+=S7F;var C08=K6F;C08+=K0F;$(C08)[n08](A1l,function(e){var q08=a0F;q08+=g71.v7F;g71[q08]();return T9F;});})[s08](e08,function(){var N08=w8U;N08+=g71.h7F;N08+=K0F;g71[g71.Y7F]();$(N08)[H0p](A1l);});}else{var p08=P5F;p08+=d1l;var m08=l1l;m08+=m2F;container[J6F](m08);container[r3U](container[C4p](p08));}container[C4p](C1l)[P08](S08,function(){Editor[b5F][E8p][m6U][Q6F](editor,conf,S1F);});container[C4p](n1l)[k08](r7p,function(){var V08=G8p;V08+=y4F;V08+=g71.w7F;V08+=k3F;g71[F9F]();Editor[V08](editor,conf,this[b8F],_buttonText,function(ids){var b38=q1l;b38+=y4F;var g38=g71.O7F;g38+=e4p;var u38=V3p;u38+=y4F;dropCallback[u38](editor,ids);g71[F9F]();container[g38](n1l)[b38](S1F);});});return container;}function _triggerChange(input){g71[F9F]();setTimeout(function(){var s1l="tri";var U38=s1l;U38+=Q8F;U38+=Q8F;U38+=r4F;var M38=a0F;M38+=g71.v7F;g71[M38]();input[U38](r7p,{editor:K9F,editorSet:K9F});},J68);}var baseFieldType=$[D38](K9F,{},Editor[N4U][j38],{get:function(conf){var r38=q2F;r38+=g71.x7F;r38+=y4F;var Y38=e1l;Y38+=S5U;return conf[Y38][r38]();},set:function(conf,val){var R38=q2F;R38+=I7U;var w38=Y3F;w38+=y8F;w38+=f4F;conf[w38][R38](val);_triggerChange(conf[L1l]);},enable:function(conf){var X38=z0F;X38+=O3F;X38+=z0F;var F38=N1l;F38+=l5i;conf[F38][X38](J7l,T9F);},disable:function(conf){var Q38=P5F;Q38+=O0F;Q38+=Z1p;Q38+=k5F;var O38=m1l;O38+=g71.X7F;conf[O38][p1l](Q38,K9F);},canReturnSubmit:function(conf,node){var v38=a0F;v38+=g71.v7F;g71[v38]();return K9F;}});fieldTypes[x38]={create:function(conf){var L38=Y3F;L38+=q2F;L38+=g71.x7F;L38+=y4F;conf[L38]=conf[m3p];return A5F;},get:function(conf){var h38=P1l;h38+=y4F;return conf[h38];},set:function(conf,val){conf[S1l]=val;}};fieldTypes[z38]=$[e5F](K9F,{},baseFieldType,{create:function(conf){var I38=k1l;I38+=s5i;I38+=g71.X7F;var c38=g71.X7F;c38+=P2F;c38+=g71.X7F;var G38=w0F;G38+=S7F;G38+=g71.h7F;var J38=D8i;J38+=h0F;conf[L1l]=$(V1l)[J38]($[G38]({id:Editor[p3p](conf[f8F]),type:c38,readonly:M6F},conf[X6U]||{}));g71[g71.Y7F]();return conf[I38][J68];}});fieldTypes[T38]=$[H38](K9F,{},baseFieldType,{create:function(conf){var g9l="I";var a38=g71.X7F;a38+=P2F;a38+=g71.X7F;var W38=P0F;W38+=g71.h7F;var K38=r0l;K38+=u9l;K38+=g9l;K38+=g71.h7F;var E38=Y3F;E38+=y8F;E38+=f4F;conf[E38]=$(V1l)[X6U]($[e5F]({id:Editor[K38](conf[W38]),type:a38},conf[X6U]||{}));return conf[L1l][J68];}});fieldTypes[b9l]=$[e5F](K9F,{},baseFieldType,{create:function(conf){var M9l="passwo";var U9l="rd";var Z38=M9l;Z38+=U9l;var y38=P0F;y38+=g71.h7F;var i38=t1p;i38+=g71.h7F;g71[F9F]();conf[L1l]=$(V1l)[X6U]($[i38]({id:Editor[p3p](conf[y38]),type:Z38},conf[X6U]||{}));return conf[L1l][J68];}});fieldTypes[D9l]=$[e5F](K9F,{},baseFieldType,{create:function(conf){var Y9l="ea/>";var j9l="<tex";var f38=D8i;f38+=h0F;var o38=j9l;o38+=g71.X7F;o38+=x3U;o38+=Y9l;var B38=o8F;B38+=g71.v7F;g71[B38]();conf[L1l]=$(o38)[f38]($[e5F]({id:Editor[p3p](conf[f8F])},conf[X6U]||{}));return conf[L1l][J68];},canReturnSubmit:function(conf,node){return T9F;}});fieldTypes[r9l]=$[t38](K9F,{},baseFieldType,{_addOptions:function(conf,opts,append){var x9l="lderVal";var R9l="hi";var Q9l="cehol";var z9l="airs";var L9l="placeholderValue";var O9l="Disabled";var X9l="erDisabled";var w9l="placeholder";var F9l="placehold";var h9l="ionsPair";var A38=k1l;A38+=s5i;A38+=g71.X7F;var elOpts=conf[A38][J68][O7i];var countOffset=J68;if(!append){var d38=y4F;d38+=x3F;d38+=d4U;d38+=o8F;elOpts[d38]=J68;if(conf[w9l]!==undefined){var e38=f2U;e38+=P3F;e38+=P1l;e38+=y4F;var s38=R9l;s38+=g71.h7F;s38+=n8F;s38+=S7F;var q38=F9l;q38+=X9l;var n38=w9l;n38+=O9l;var C38=z9p;C38+=Q9l;C38+=g71.h7F;C38+=r4F;var l38=v9l;l38+=x9l;l38+=d9F;var placeholderValue=conf[L9l]!==undefined?conf[l38]:S1F;countOffset+=G68;elOpts[J68]=new Option(conf[C38],placeholderValue);var disabled=conf[n38]!==undefined?conf[q38]:K9F;elOpts[J68][s38]=disabled;elOpts[J68][c6F]=disabled;elOpts[J68][e38]=placeholderValue;}}else{countOffset=elOpts[c7U];}if(opts){var m38=w7i;m38+=h9l;var N38=z0F;N38+=z9l;Editor[N38](opts,conf[m38],function(val,label,i,attr){var option=new Option(label,val);option[J9l]=val;if(attr){var p38=J0F;p38+=g71.X7F;p38+=h0F;$(option)[p38](attr);}elOpts[i+countOffset]=option;});}},create:function(conf){var i9l="ipOpts";var I9l="dOptions";var E9l="feId";var K9l='<select/>';var T9l="change.dt";var H9l="ple";var c9l="_ad";var r88=Y3F;r88+=G9l;r88+=C7F;r88+=g71.X7F;var Y88=w7i;Y88+=r6F;Y88+=S7F;Y88+=O0F;var j88=c9l;j88+=I9l;var g88=T9l;g88+=B7F;var u88=g71.w7F;u88+=S7F;var V38=g71.L7F;V38+=V2F;V38+=P0F;V38+=H9l;var k38=P0F;k38+=g71.h7F;var S38=O0F;S38+=g71.x7F;S38+=E9l;var P38=g71.x7F;P38+=g71.X7F;P38+=g71.X7F;P38+=h0F;conf[L1l]=$(K9l)[P38]($[e5F]({id:Editor[S38](conf[k38]),multiple:conf[V38]===K9F},conf[X6U]||{}))[u88](g88,function(e,d){var a9l="stSet";var b88=o8F;b88+=g71.v7F;g71[b88]();if(!d||!d[O8F]){var D88=Q8F;D88+=B7F;D88+=g71.X7F;var U88=O0F;U88+=t7F;U88+=c0p;var M88=W9l;M88+=a9l;conf[M88]=fieldTypes[U88][D88](conf);}});fieldTypes[r9l][j88](conf,conf[Y88]||conf[i9l]);g71[F9F]();return conf[r88][J68];},update:function(conf,options,append){var y9l="addOptio";var F88=Y3F;F88+=y8F;F88+=f4F;var R88=W9l;R88+=s7U;R88+=N6U;R88+=g71.X7F;var w88=Y3F;w88+=y9l;w88+=r0F;fieldTypes[r9l][w88](conf,options,append);var lastSet=conf[R88];if(lastSet!==undefined){fieldTypes[r9l][m6U](conf,lastSet,K9F);}g71[F9F]();_triggerChange(conf[F88]);},get:function(conf){var Z9l="iple";var B9l='option:selected';var z88=c4F;z88+=S7F;z88+=J9F;var L88=v4U;L88+=y4F;L88+=g71.X7F;L88+=Z9l;var x88=a0F;x88+=g71.v7F;var v88=G3F;v88+=u8i;var Q88=g71.L7F;Q88+=R7U;var O88=g5p;O88+=g71.h7F;var X88=N1l;X88+=l5i;var val=conf[X88][O88](B9l)[Q88](function(){g71[g71.Y7F]();return this[J9l];})[v88]();g71[x88]();if(conf[L88]){var h88=D7p;h88+=i0l;h88+=S7F;return conf[o9l]?val[h88](conf[o9l]):val;}return val[z88]?val[J68]:A5F;},set:function(conf,val,localUpdate){var d9l="multiple";var A9l="tSet";var f9l="lder";var t9l="eparator";var C9l='option';var l9l="parato";var B88=T5p;B88+=G9F;var Z88=g71.L7F;Z88+=w5p;Z88+=z0F;Z88+=c4F;var y88=v9l;y88+=f9l;var W88=g71.O7F;W88+=y8F;W88+=g71.h7F;var K88=g5p;K88+=g71.h7F;var E88=k1l;E88+=f4F;var H88=P0F;H88+=O0F;H88+=u8i;var c88=r4p;c88+=Z8F;c88+=g71.x7F;c88+=K0F;var G88=O0F;G88+=t9l;if(!localUpdate){var J88=Y3F;J88+=y4F;J88+=M4i;J88+=A9l;conf[J88]=val;}if(conf[d9l]&&conf[G88]&&!$[c88](val)){var T88=O0F;T88+=B7F;T88+=l9l;T88+=h0F;var I88=Y8p;I88+=s1F;val=typeof val===I88?val[D2p](conf[T88]):[];}else if(!$[H88](val)){val=[val];}var i,len=val[c7U],found,allFound=T9F;var options=conf[E88][K88](C9l);conf[L1l][W88](C9l)[j6F](function(){var i88=W4l;i88+=g71.F7F;i88+=p0F;i88+=g71.h7F;var a88=o8F;a88+=g71.v7F;g71[a88]();found=T9F;for(i=J68;i<len;i++){if(this[J9l]==val[i]){found=K9F;allFound=K9F;break;}}this[i88]=found;});if(conf[y88]&&!allFound&&!conf[Z88]&&options[B88]){options[J68][K4l]=K9F;}if(!localUpdate){_triggerChange(conf[L1l]);}return allFound;},destroy:function(conf){var n9l="cha";var q9l="nge.dte";var o88=n9l;o88+=q9l;conf[L1l][H0p](o88);}});fieldTypes[s9l]=$[e5F](K9F,{},baseFieldType,{_addOptions:function(conf,opts,append){var e9l="pai";var val,label;var jqInput=conf[L1l];var offset=J68;g71[g71.Y7F]();if(!append){var f88=B7F;f88+=R4U;f88+=g71.X7F;f88+=K0F;jqInput[f88]();}else{var A88=c4F;A88+=B4U;var t88=P0F;t88+=N5i;t88+=S5U;offset=$(t88,jqInput)[A88];}if(opts){var d88=e9l;d88+=h0F;d88+=O0F;Editor[d88](opts,conf[N9l],function(val,label,i,attr){var P9l="safeI";var j2l='<label for="';var u2l="\" />";var g2l="saf";var b2l="eId";var U2l="d=\"";var S9l="\" type=\"ch";var r2l="t:la";var M2l="<input i";var P88=m9l;P88+=y4F;var p88=g71.x7F;p88+=p9l;var m88=R2F;m88+=u2F;var N88=P9l;N88+=g71.h7F;var e88=S9l;e88+=k9l;e88+=V9l;e88+=u2l;var s88=P0F;s88+=g71.h7F;var q88=g2l;q88+=b2l;var n88=M2l;n88+=U2l;var C88=J2F;C88+=q2F;C88+=b2F;var l88=R7U;l88+=z0F;l88+=B7F;l88+=R0F;jqInput[l88](C88+n88+Editor[q88](conf[s88])+D2l+(i+offset)+e88+j2l+Editor[N88](conf[f8F])+D2l+(i+offset)+x5F+label+J5F+m88);$(Y2l,jqInput)[p88](q3p,val)[J68][P88]=val;if(attr){var S88=P0F;S88+=j6i;S88+=r2l;S88+=s7U;$(S88,jqInput)[X6U](attr);}});}},create:function(conf){var w2l="pO";var R2l="opti";var X2l="kbox";var b18=k1l;b18+=f4F;var g18=P0F;g18+=w2l;g18+=z0F;g18+=p7F;var u18=R2l;u18+=T6p;var V88=F2l;V88+=X2l;var k88=Y3F;k88+=P0F;k88+=S7F;k88+=f4F;g71[g71.Y7F]();conf[k88]=$(O2l);fieldTypes[V88][Q2l](conf,conf[u18]||conf[g18]);return conf[b18][J68];},get:function(conf){var J2l="ush";var L2l="rator";var h2l='input:checked';var v2l="ep";var x2l="arator";var z2l="unselectedValue";var w18=O0F;w18+=v2l;w18+=x2l;var r18=O0F;r18+=B7F;r18+=J4U;r18+=L2l;var U18=g71.O7F;U18+=y8F;U18+=g71.h7F;var M18=Y3F;M18+=P0F;M18+=j6i;M18+=g71.X7F;var out=[];var selected=conf[M18][U18](h2l);if(selected[c7U]){selected[j6F](function(){var j18=m9l;j18+=y4F;var D18=s5i;D18+=R9p;out[D18](this[j18]);});}else if(conf[z2l]!==undefined){var Y18=z0F;Y18+=J2l;out[Y18](conf[z2l]);}return conf[o9l]===undefined||conf[r18]===A5F?out:out[q0p](conf[w18]);},set:function(conf,val){var G2l="parator";var c2l='|';var v18=B7F;v18+=q7U;v18+=o8F;var X18=Y8p;X18+=s1F;var F18=P0F;F18+=N5i;F18+=C7F;F18+=g71.X7F;var R18=N1l;R18+=l5i;var jqInputs=conf[R18][C4p](F18);if(!$[u4U](val)&&typeof val===X18){var Q18=U4F;Q18+=G2l;var O18=O0F;O18+=z0F;O18+=X6F;O18+=g71.X7F;val=val[O18](conf[Q18]||c2l);}else if(!$[u4U](val)){val=[val];}var i,len=val[c7U],found;jqInputs[v18](function(){var I2l="che";var L18=I2l;L18+=W7U;L18+=k5F;var x18=a0F;x18+=g71.v7F;found=T9F;for(i=J68;i<len;i++){if(this[J9l]==val[i]){found=K9F;break;}}g71[x18]();this[L18]=found;});_triggerChange(jqInputs);},enable:function(conf){var T2l="sabled";var z18=P5F;z18+=T2l;var h18=g71.O7F;h18+=P0F;h18+=S7F;h18+=g71.h7F;conf[L1l][h18](H2l)[p1l](z18,T9F);},disable:function(conf){var J18=P0F;J18+=N5i;J18+=S5U;g71[F9F]();conf[L1l][C4p](J18)[p1l](J7l,K9F);},update:function(conf,options,append){var c18=Q8F;c18+=r4U;var G18=g71.F7F;G18+=o8F;G18+=k9l;G18+=V9l;g71[g71.Y7F]();var checkbox=fieldTypes[G18];var currVal=checkbox[c18](conf);checkbox[Q2l](conf,options,append);checkbox[m6U](conf,currVal);}});fieldTypes[I18]=$[e5F](K9F,{},baseFieldType,{_addOptions:function(conf,opts,append){var E18=a0F;E18+=g71.v7F;var val,label;var jqInput=conf[L1l];var offset=J68;if(!append){jqInput[Y5i]();}else{var H18=y4F;H18+=B7F;H18+=s1F;H18+=G9F;var T18=P0F;T18+=S7F;T18+=z0F;T18+=S5U;offset=$(T18,jqInput)[H18];}g71[E18]();if(opts){var K18=z0F;K18+=a6i;K18+=h0F;K18+=O0F;Editor[K18](opts,conf[N9l],function(val,label,i,attr){var K2l="af";var W2l="eI";var Z2l="\" type=\"radio\" ";var f2l='<input id="';var o2l="e=\"";var i2l="abel for";var E2l="</l";var y2l="=";var B2l="nam";var A18=g71.x7F;A18+=g71.X7F;A18+=z5p;var t18=E2l;t18+=e3p;t18+=b2F;var f18=O0F;f18+=K2l;f18+=W2l;f18+=g71.h7F;var o18=a2l;o18+=i2l;o18+=y2l;o18+=g2F;var B18=g2F;B18+=e5p;B18+=N2U;var Z18=m8p;Z18+=W8F;var y18=Z2l;y18+=B2l;y18+=o2l;var i18=r0l;i18+=u9l;i18+=b3F;var a18=k9F;a18+=p9F;var W18=X0U;W18+=g71.h7F;jqInput[W18](a18+f2l+Editor[i18](conf[f8F])+D2l+(i+offset)+y18+conf[Z18]+B18+o18+Editor[f18](conf[f8F])+D2l+(i+offset)+x5F+label+t18+z5F);g71[F9F]();$(Y2l,jqInput)[A18](q3p,val)[J68][J9l]=val;if(attr){var d18=g71.x7F;d18+=g71.X7F;d18+=g71.X7F;d18+=h0F;$(Y2l,jqInput)[d18](attr);}});}},create:function(conf){var A2l="_addOptio";var t2l="ipO";var V18=N1l;V18+=S7F;V18+=s5i;V18+=g71.X7F;var e18=g71.w7F;e18+=F8p;var s18=g71.w7F;s18+=S7F;var q18=o8F;q18+=g71.v7F;var n18=t2l;n18+=z0F;n18+=p7F;var C18=A2l;C18+=r0F;var l18=C3U;l18+=g71.h7F;l18+=P0F;l18+=g71.w7F;conf[L1l]=$(O2l);fieldTypes[l18][C18](conf,conf[O7i]||conf[n18]);g71[q18]();this[s18](e18,function(){var p18=B7F;p18+=g71.x7F;p18+=g71.F7F;p18+=o8F;var m18=y7F;m18+=S7F;m18+=g71.h7F;var N18=e1l;N18+=C7F;N18+=g71.X7F;conf[N18][m18](H2l)[p18](function(){var S18=d2l;S18+=l2l;var P18=o8F;P18+=g71.v7F;g71[P18]();if(this[S18]){var k18=g2U;k18+=A6i;k18+=g1F;k18+=k5F;this[k18]=K9F;}});});return conf[V18][J68];},get:function(conf){var n2l="put:checked";var C2l="tor_val";var M98=i6U;M98+=P5F;M98+=C2l;var b98=c4F;b98+=B4U;var g98=y8F;g98+=n2l;var u98=y7F;u98+=R0F;var el=conf[L1l][u98](g98);return el[b98]?el[J68][M98]:undefined;},set:function(conf,val){var q2l="t:checked";var O98=G9l;O98+=C7F;O98+=q2l;var X98=y7F;X98+=S7F;X98+=g71.h7F;var Y98=B7F;Y98+=g71.x7F;Y98+=g71.F7F;Y98+=o8F;var j98=y8F;j98+=f4F;var D98=g71.O7F;D98+=P0F;D98+=S7F;D98+=g71.h7F;var U98=Y3F;U98+=P0F;U98+=N5i;U98+=S5U;var that=this;g71[g71.Y7F]();conf[U98][D98](j98)[Y98](function(){var p2l="ked";var e2l="cked";var m2l="_preChec";var N2l="checked";var s2l="_preChe";var r98=s2l;r98+=e2l;this[r98]=T9F;if(this[J9l]==val){var w98=d2l;w98+=l2l;this[N2l]=K9F;this[w98]=K9F;}else{var F98=m2l;F98+=p2l;var R98=F2l;R98+=g1F;R98+=B7F;R98+=g71.h7F;this[R98]=T9F;this[F98]=T9F;}});_triggerChange(conf[L1l][X98](O98));},enable:function(conf){var v98=I3F;v98+=z0F;var Q98=g71.O7F;Q98+=P0F;Q98+=R0F;g71[g71.Y7F]();conf[L1l][Q98](H2l)[v98](J7l,T9F);},disable:function(conf){var z98=q7p;z98+=c4l;var h98=z0F;h98+=h0F;h98+=g71.w7F;h98+=z0F;var L98=y8F;L98+=z0F;L98+=C7F;L98+=g71.X7F;var x98=a0F;x98+=g71.v7F;g71[x98]();conf[L1l][C4p](L98)[h98](z98,K9F);},update:function(conf,options,append){var P2l="rad";var S2l='[value="';var H98=q2F;H98+=g71.x7F;H98+=y4F;H98+=d9F;var T98=a0F;T98+=g71.v7F;var I98=P0F;I98+=N5i;I98+=S5U;var c98=g71.O7F;c98+=P0F;c98+=S7F;c98+=g71.h7F;var G98=Q8F;G98+=B7F;G98+=g71.X7F;var J98=P2l;J98+=r6F;var radio=fieldTypes[J98];var currVal=radio[G98](conf);radio[Q2l](conf,options,append);var inputs=conf[L1l][c98](I98);g71[T98]();radio[m6U](conf,inputs[h5i](S2l+currVal+w9F)[c7U]?currVal:inputs[x5U](J68)[X6U](H98));}});fieldTypes[z7p]=$[E98](K9F,{},baseFieldType,{create:function(conf){var g5l='jqueryui';var M5l="R";var b5l="dateFormat";var k2l="<input";var V2l=" />";var U5l="FC_2822";var y98=g71.X7F;y98+=U0F;var i98=P0F;i98+=g71.h7F;var a98=J0F;a98+=z5p;var W98=k2l;W98+=V2l;var K98=Y3F;K98+=G9l;K98+=C7F;K98+=g71.X7F;conf[K98]=$(W98)[a98]($[e5F]({id:Editor[p3p](conf[i98]),type:y98},conf[X6U]));if($[u5l]){var Z98=e1l;Z98+=S5U;conf[Z98][J6F](g5l);if(!conf[b5l]){var B98=M5l;B98+=U5l;conf[b5l]=$[u5l][B98];}setTimeout(function(){var j5l='#ui-datepicker-div';var D5l="dateI";var A98=S7F;A98+=W0p;var t98=g71.F7F;t98+=O0F;t98+=O0F;var o98=D5l;o98+=a3U;o98+=L3U;$(conf[L1l])[u5l]($[e5F]({dateFormat:conf[b5l],buttonImage:conf[o98],buttonImageOnly:K9F,onSelect:function(){var f98=a7i;f98+=O0F;g71[F9F]();conf[L1l][f98]()[K5U]();}},conf[g6F]));$(j5l)[t98](w7U,A98);},W68);}else{var n98=D2U;n98+=B7F;var C98=g71.X7F;C98+=K0F;C98+=z0F;C98+=B7F;var l98=g71.x7F;l98+=p9l;var d98=m1l;d98+=g71.X7F;conf[d98][l98](C98,n98);}return conf[L1l][J68];},set:function(conf,val){var R5l="datepicke";var F5l="epicker";var X5l="change";var Y5l="asDatep";var w5l="hasC";var r5l="icker";var m98=o8F;m98+=Y5l;m98+=r5l;var N98=w5l;N98+=j6U;N98+=O0F;var e98=Y3F;e98+=P0F;e98+=l5i;var s98=R5l;s98+=h0F;var q98=o8F;q98+=g71.v7F;g71[q98]();if($[s98]&&conf[e98][N98](m98)){var P98=D2U;P98+=F5l;var p98=e1l;p98+=C7F;p98+=g71.X7F;conf[p98][P98](s0l,val)[X5l]();}else{$(conf[L1l])[J3p](val);}},enable:function(conf){var v5l="enable";var Q5l="cker";var O5l="datepi";var S98=O5l;S98+=Q5l;if($[S98]){conf[L1l][u5l](v5l);}else{var k98=N1l;k98+=l5i;$(conf[k98])[p1l](J7l,T9F);}},disable:function(conf){var x5l="atepicker";if($[u5l]){var g28=G4F;g28+=c4F;var u28=g71.h7F;u28+=x5l;var V98=N1l;V98+=l5i;conf[V98][u28](g28);}else{var b28=z0F;b28+=O3F;b28+=z0F;$(conf[L1l])[b28](J7l,K9F);}},owns:function(conf,node){var L5l=".ui-datepicker-header";var h5l='div.ui-datepicker';var j28=E6F;j28+=o8F;var D28=q3U;D28+=L5l;var U28=z0F;U28+=g71.x7F;U28+=K4F;U28+=o4p;var M28=E6F;M28+=o8F;return $(node)[A7i](h5l)[M28]||$(node)[U28](D28)[j28]?K9F:T9F;}});fieldTypes[d8l]=$[e5F](K9F,{},baseFieldType,{create:function(conf){var J5l="seFn";var E5l="keyInput";var G5l="tex";var I5l="t /";var c5l="<inpu";var z5l="_cl";var H5l="_closeFn";var J28=N1l;J28+=l5i;var z28=z5l;z28+=g71.w7F;z28+=J5l;var h28=g71.F7F;h28+=y4F;h28+=g71.w7F;h28+=U4F;var L28=g71.w7F;L28+=S7F;var F28=U0F;F28+=B7F;F28+=R0F;var R28=J0F;R28+=g71.X7F;R28+=h0F;var w28=G5l;w28+=g71.X7F;var r28=O0F;r28+=H2F;r28+=g71.h7F;var Y28=c5l;Y28+=I5l;Y28+=b2F;conf[L1l]=$(Y28)[X6U]($[e5F](K9F,{id:Editor[r28](conf[f8F]),type:w28},conf[R28]));conf[T5l]=new Editor[i2i](conf[L1l],$[F28]({format:conf[B2i],i18n:this[u5F][d8l],onChange:function(){var O28=N1l;O28+=N5i;O28+=S5U;var X28=o8F;X28+=g71.v7F;g71[X28]();_triggerChange(conf[O28]);}},conf[g6F]));conf[H5l]=function(){conf[T5l][R4p]();};if(conf[E5l]===T9F){var v28=S6p;v28+=K0F;v28+=P5p;var Q28=N1l;Q28+=N5i;Q28+=S5U;conf[Q28][p5F](v28,function(e){var W5l="tDe";var K5l="preven";var x28=K5l;x28+=W5l;x28+=v6F;x28+=y5p;e[x28]();});}this[L28](h28,conf[z28]);return conf[J28][J68];},set:function(conf,val){var c28=a0F;c28+=g71.v7F;var G28=q1l;G28+=y4F;conf[T5l][G28](val);g71[c28]();_triggerChange(conf[L1l]);},owns:function(conf,node){var a5l="owns";var I28=a0F;I28+=g71.v7F;g71[I28]();return conf[T5l][a5l](node);},errorMessage:function(conf,msg){var i5l="errorMsg";conf[T5l][i5l](msg);},destroy:function(conf){var o5l="oseFn";var B5l="ey";var y5l="pic";var W28=Y3F;W28+=y5l;W28+=Z5l;var K28=g1F;K28+=B5l;K28+=p6F;K28+=x0U;var E28=Y3F;E28+=g71.F7F;E28+=y4F;E28+=o5l;var H28=t2p;H28+=U4F;var T28=g71.w7F;T28+=B7p;this[T28](H28,conf[E28]);conf[L1l][H0p](K28);conf[W28][T6U]();},minDate:function(conf,min){var i28=Y3F;i28+=z0F;i28+=y9F;i28+=Z5l;var a28=o8F;a28+=g71.v7F;g71[a28]();conf[i28][N4l](min);},maxDate:function(conf,max){var f5l="max";g71[g71.Y7F]();conf[T5l][f5l](max);}});fieldTypes[E8p]=$[y28](K9F,{},baseFieldType,{create:function(conf){var editor=this;var container=_commonUpload(editor,conf,function(val){var t5l="postU";var f28=t5l;f28+=S3F;f28+=A5l;f28+=g71.h7F;var o28=i6U;o28+=q2F;o28+=B7F;o28+=N8F;var B28=O0F;B28+=B7F;B28+=g71.X7F;var Z28=G8p;Z28+=x2U;Z28+=g71.x7F;Z28+=g71.h7F;g71[F9F]();Editor[b5F][Z28][B28][Q6F](editor,conf,val[J68]);editor[o28](f28,[conf[B2F],val[J68]]);});return container;},get:function(conf){g71[F9F]();return conf[S1l];},set:function(conf,val){var n5l=".ren";var P5l="clearText";var s5l="lay";var p5l='</span>';var d5l="uplo";var C5l="clearValue button";var q5l="dered";var l5l=".edito";var S5l="arT";var N5l="<sp";var k5l='noClear';var e5l="No ";var m5l="noFileText";var k28=d5l;k28+=k3F;k28+=l5l;k28+=h0F;var S28=g71.O7F;S28+=y8F;S28+=g71.h7F;var P28=Y3F;P28+=G9l;P28+=C7F;P28+=g71.X7F;var e28=a0F;e28+=g71.v7F;var s28=q3U;s28+=T7F;s28+=C5l;conf[S1l]=val;var container=conf[L1l];if(conf[Y7U]){var t28=q3U;t28+=n5l;t28+=q5l;var rendered=container[C4p](t28);if(conf[S1l]){var l28=Y3F;l28+=q2F;l28+=g71.x7F;l28+=y4F;var d28=B0p;d28+=s5l;var A28=c4U;A28+=Q7U;rendered[A28](conf[d28](conf[l28]));}else{var q28=e5l;q28+=y7F;q28+=y4F;q28+=B7F;var n28=N5l;n28+=g71.x7F;n28+=x3l;var C28=R7U;C28+=z3F;C28+=R0F;rendered[Y5i]()[C28](n28+(conf[m5l]||q28)+p5l);}}var button=container[C4p](s28);g71[e28]();if(val&&conf[P5l]){var N28=Y1F;N28+=B7F;N28+=S5l;N28+=U0F;button[K4U](conf[N28]);container[o6F](k5l);}else{var p28=Z7U;p28+=W7F;p28+=y4F;p28+=f7p;var m28=g71.x7F;m28+=i9p;m28+=r6i;m28+=e3F;container[m28](p28);}conf[P28][S28](H2l)[a5p](k28,[conf[S1l]]);},enable:function(conf){var u6l="disabl";var g58=Y3F;g58+=V5l;var u58=u6l;u58+=k5F;var V28=g71.O7F;V28+=y8F;V28+=g71.h7F;conf[L1l][V28](H2l)[p1l](u58,T9F);g71[g71.Y7F]();conf[g58]=K9F;},disable:function(conf){var g6l="led";var D58=D4U;D58+=o9U;D58+=g6l;var U58=z0F;U58+=h0F;U58+=T8F;var M58=g5p;M58+=g71.h7F;var b58=a0F;b58+=g71.v7F;g71[b58]();conf[L1l][M58](H2l)[U58](D58,K9F);conf[h1l]=T9F;},canReturnSubmit:function(conf,node){var j58=o8F;j58+=g71.v7F;g71[j58]();return T9F;}});fieldTypes[Y58]=$[r58](K9F,{},baseFieldType,{_showHide:function(conf){var D6l="tai";var M6l="loc";var b6l="_limitL";var j6l="limit";var U6l="limitHide";var L58=E6F;L58+=o8F;var x58=b6l;x58+=B7F;x58+=g71.O7F;x58+=g71.X7F;var v58=o8F;v58+=g71.v7F;var Q58=d4F;Q58+=M6l;Q58+=g1F;var O58=S7F;O58+=g71.w7F;O58+=q6F;var X58=y4F;X58+=L4p;var F58=D4U;F58+=z0F;F58+=n9F;F58+=K0F;var R58=P5F;R58+=a4p;R58+=U6l;var w58=N3F;w58+=D6l;w58+=z6F;if(!conf[j6l]){return;}conf[w58][C4p](R58)[n5F](F58,conf[S1l][X58]>=conf[j6l]?O58:Q58);g71[v58]();conf[x58]=conf[j6l]-conf[S1l][L58];},create:function(conf){var v6l='button.remove';var r6l="ontaine";var Y6l="_c";var o58=Y6l;o58+=r6l;o58+=h0F;var W58=g71.F7F;W58+=X6F;W58+=g71.F7F;W58+=g1F;var K58=g71.w7F;K58+=S7F;var E58=g71.L7F;E58+=m7F;E58+=g71.X7F;E58+=P0F;var H58=o8F;H58+=g71.v7F;var editor=this;var container=_commonUpload(editor,conf,function(val){var w6l="upl";var R6l="dMan";var F6l="ieldTyp";var O6l="concat";var X6l="_v";var Q6l='postUpload';var T58=Y3F;T58+=q2F;T58+=g71.x7F;T58+=y4F;var I58=S7F;I58+=g71.x7F;I58+=g71.L7F;I58+=B7F;var c58=O0F;c58+=B7F;c58+=g71.X7F;var G58=w6l;G58+=A5l;G58+=R6l;G58+=K0F;var J58=g71.O7F;J58+=F6l;J58+=A3p;var z58=P1l;z58+=y4F;var h58=X6l;h58+=g71.x7F;h58+=y4F;conf[h58]=conf[z58][O6l](val);Editor[J58][G58][c58][Q6F](editor,conf,conf[S1l]);editor[R3p](Q6l,[conf[I58],conf[T58]]);},K9F);g71[H58]();container[J6F](E58)[K58](W58,v6l,function(e){var x6l="dM";var B58=N8l;B58+=x6l;B58+=J8i;var Z58=a0F;Z58+=g71.v7F;var y58=O0F;y58+=z0F;y58+=y4F;y58+=l0p;var i58=Y3F;i58+=q2F;i58+=g71.x7F;i58+=y4F;var a58=P0F;a58+=g71.h7F;a58+=o7F;e[S6i]();var idx=$(this)[Y5F](a58);conf[i58][y58](idx,G68);g71[Z58]();Editor[b5F][B58][m6U][Q6F](editor,conf,conf[S1l]);});conf[o58]=container;return container;},get:function(conf){var f58=o8F;f58+=g71.v7F;g71[f58]();return conf[S1l];},set:function(conf,val){var A6l="noFileTex";var n6l='upload.editor';var E6l="<u";var l6l='No files';var C6l="uploadMany";var J6l="_showH";var H6l='div.rendered';var G6l="ide";var d6l="span>";var L6l="trigg";var h6l="erHa";var I6l="sA";var c6l="dT";var T6l='Upload collections must have an array as a value';var z6l="ndler";var t6l="/span>";var U68=Y3F;U68+=J3p;var M68=L6l;M68+=h6l;M68+=z6l;var b68=P0F;b68+=S7F;b68+=f4F;var g68=g71.O7F;g68+=e4p;var u68=Y3F;u68+=y8F;u68+=f4F;var V58=J6l;V58+=G6l;var k58=w4p;k58+=c6l;k58+=X3F;k58+=O0F;var A58=Y3F;A58+=q2F;A58+=I7U;var t58=P0F;t58+=I6l;t58+=h0F;t58+=n3p;if(!val){val=[];}if(!$[t58](val)){throw T6l;}conf[A58]=val;var that=this;var container=conf[L1l];if(conf[Y7U]){var d58=L8F;d58+=g71.X7F;d58+=K0F;var rendered=container[C4p](H6l)[d58]();if(val[c7U]){var l58=E6l;l58+=y4F;l58+=m9F;l58+=b2F;var list=$(l58)[O8U](rendered);$[j6F](val,function(i,file){var a6l="remove\" dat";var W6l="es;</button>";var K6l="\">&tim";var i6l="a-id";var o6l="i>";var f6l='</li>';var Z6l=" <bu";var B6l="n class";var y6l="x=\"";var m58=K6l;m58+=W6l;var N58=e5p;N58+=a6l;N58+=i6l;N58+=y6l;var e58=D5U;e58+=j5U;e58+=p5F;var s58=Z6l;s58+=s5U;s58+=B6l;s58+=r9F;var q58=a2l;q58+=o6l;var n58=X0U;n58+=g71.h7F;var C58=a0F;C58+=g71.v7F;g71[C58]();list[n58](q58+conf[Y7U](file,i)+s58+that[G6F][L5U][e58]+N58+i+m58+f6l);});}else{var S58=k9F;S58+=t6l;var P58=A6l;P58+=g71.X7F;var p58=k9F;p58+=d6l;rendered[r3U](p58+(conf[P58]||l6l)+S58);}}Editor[k58][C6l][V58](conf);conf[u68][g68](b68)[M68](n6l,[conf[U68]]);},enable:function(conf){var q6l="isable";var Y68=g71.h7F;Y68+=q6l;Y68+=g71.h7F;var j68=y7F;j68+=R0F;var D68=N1l;D68+=l5i;g71[g71.Y7F]();conf[D68][j68](H2l)[p1l](Y68,T9F);conf[h1l]=K9F;},disable:function(conf){var R68=Y3F;R68+=V5l;var w68=q7p;w68+=c4l;var r68=g71.O7F;r68+=P0F;r68+=S7F;r68+=g71.h7F;g71[g71.Y7F]();conf[L1l][r68](H2l)[p1l](w68,K9F);conf[R68]=T9F;},canReturnSubmit:function(conf,node){g71[g71.Y7F]();return T9F;}});}());if(DataTable[F68][X68]){var Q68=u2U;Q68+=s6l;Q68+=e6l;var O68=P2F;O68+=Q2p;O68+=g71.h7F;$[O68](Editor[Q68],DataTable[U0F][N6l]);}DataTable[v68][N6l]=Editor[b5F];Editor[x68]={};Editor[O6F][L68]=m6l;Editor[h68]=z68;return Editor;}));

/*! Bootstrap integration for DataTables' Editor
 * ©2015 SpryMedia Ltd - datatables.net/license
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net-bs4', 'datatables.net-editor'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net-bs4')(root, $).$;
			}

			if ( ! $.fn.dataTable.Editor ) {
				require('datatables.net-editor')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/*
 * Set the default display controller to be our bootstrap control 
 */
DataTable.Editor.defaults.display = "bootstrap";


/*
 * Alter the buttons that Editor adds to TableTools so they are suitable for bootstrap
 */
var i18nDefaults = DataTable.Editor.defaults.i18n;
i18nDefaults.create.title = '<h5 class="modal-title">'+i18nDefaults.create.title+'</h5>';
i18nDefaults.edit.title = '<h5 class="modal-title">'+i18nDefaults.edit.title+'</h5>';
i18nDefaults.remove.title = '<h5 class="modal-title">'+i18nDefaults.remove.title+'</h5>';

var tt = DataTable.TableTools;
if ( tt ) {
	tt.BUTTONS.editor_create.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_edit.formButtons[0].className = "btn btn-primary";
	tt.BUTTONS.editor_remove.formButtons[0].className = "btn btn-danger";
}


/*
 * Change the default classes from Editor to be classes for Bootstrap
 */
$.extend( true, $.fn.dataTable.Editor.classes, {
	"header": {
		"wrapper": "DTE_Header modal-header"
	},
	"body": {
		"wrapper": "DTE_Body modal-body"
	},
	"footer": {
		"wrapper": "DTE_Footer modal-footer"
	},
	"form": {
		"tag": "form-horizontal",
		"button": "btn",
		"buttonInternal": "btn btn-outline-secondary"
	},
	"field": {
		"wrapper": "DTE_Field form-group row",
		"label":   "col-lg-4 col-form-label",
		"input":   "col-lg-8",
		"error":   "error is-invalid",
		"msg-labelInfo": "form-text text-secondary small",
		"msg-info":      "form-text text-secondary small",
		"msg-message":   "form-text text-secondary small",
		"msg-error":     "form-text text-danger small",
		"multiValue":    "card multi-value",
		"multiInfo":     "small",
		"multiRestore":  "card multi-restore"
	}
} );

$.extend( true, DataTable.ext.buttons, {
	create: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	edit: {
		formButtons: {
			className: 'btn-primary'
		}
	},
	remove: {
		formButtons: {
			className: 'btn-danger'
		}
	}
} );


/*
 * Bootstrap display controller - this is effectively a proxy to the Bootstrap
 * modal control.
 */

var self;

DataTable.Editor.display.bootstrap = $.extend( true, {}, DataTable.Editor.models.displayController, {
	/*
	 * API methods
	 */
	"init": function ( dte ) {
		// init can be called multiple times (one for each Editor instance), but
		// we only support a single construct here (shared between all Editor
		// instances)
		if ( ! self._dom.content ) {
			self._dom.content = $(
				'<div class="modal fade DTED">'+
					'<div class="modal-dialog">'+
						'<div class="modal-content"/>'+
					'</div>'+
				'</div>'
			);

			self._dom.close = $('<button class="close">&times;</div>');

			self._dom.close.click( function () {
				self._dte.close('icon');
			} );

			$(document).on('click', 'div.modal', function (e) {
				if ( $(e.target).hasClass('modal') && self._shown ) {
					self._dte.background();
				}
			} );
		}

		// Add `form-control` to required elements
		dte.on( 'displayOrder.dtebs', function ( e, display, action, form ) {
			$.each( dte.s.fields, function ( key, field ) {
				$('input:not([type=checkbox]):not([type=radio]), select, textarea', field.node() )
					.addClass( 'form-control' );
			} );
		} );

		return self;
	},

	"open": function ( dte, append, callback ) {
		if ( self._shown ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		self._dte = dte;
		self._shown = true;
		self._fullyDisplayed = false;

		var content = self._dom.content.find('div.modal-content');
		content.children().detach();
		content.append( append );

		$('div.modal-header', append).append( self._dom.close );

		$(self._dom.content)
			.one('shown.bs.modal', function () {
				// Can only give elements focus when shown
				if ( self._dte.s.setFocus ) {
					self._dte.s.setFocus.focus();
				}

				self._fullyDisplayed = true;

				if ( callback ) {
					callback();
				}
			})
			.one('hidden', function () {
				self._shown = false;
			})
			.appendTo( 'body' )
			.modal( {
				backdrop: "static",
				keyboard: false
			} );
	},

	"close": function ( dte, callback ) {
		if ( !self._shown ) {
			if ( callback ) {
				callback();
			}
			return;
		}

		// Check if actually displayed or not before hiding. BS4 doesn't like `hide`
		// before it has been fully displayed
		if ( ! self._fullyDisplayed ) {
			$(self._dom.content)
				.one('shown.bs.modal', function () {
					self.close( dte, callback );
				} );

			return;
		}

		$(self._dom.content)
			.one( 'hidden.bs.modal', function () {
				$(this).detach();
			} )
			.modal('hide');

		self._dte = dte;
		self._shown = false;
		self._fullyDisplayed = false;

		if ( callback ) {
			callback();
		}
	},

	node: function ( dte ) {
		return self._dom.content[0];
	},


	/*
	 * Private properties
	 */
	 "_shown": false,
	"_dte": null,
	"_dom": {}
} );

self = DataTable.Editor.display.bootstrap;


return DataTable.Editor;
}));


