/*!
 * Item Layouter based on jQuery UI Widget
 * Author: office@slicemenice.de
 * Licensed under the MIT license
 *
 *  Requires UI version 1.9+
 */

( function ( $, window, document, undefined ) {

	$.widget( "smn.itemLayouter", {

		options: {
			filter: undefined
		},

		_create: function () {
			var widget = this;

			widget.isInitialized = false;

			widget.items = new Map();
			widget.layout = $.debounce( 10, widget._layout );
		},

		addItem: function( element ) {
			var widget = this;

			if ( !widget.items.has( element ) ) {

				var item = widget._createItem( element );
				widget.items.set( element, item );

				widget._onItemAdded( item );
				widget.layout();

				return item;
			}
		},

		_createItem: function( element ) {
			var item = {
				element: element,
				position: null
			};

			return item;
		},

		_filterItem: function( item ) {
			var widget = this;

			if ( $.isFunction( widget.options.filter ) ) {
				return widget.options.filter( item );
			}

			return true;
		},

		_layout: function() {
			var widget = this;

			//var items = Array.from( this.items.values() );
			var items = [];

			this.items.forEach( function( item ) {
				items.push( item );
			} );

			items = widget._sortItems( items );

			var itemsToLayout = [];
			var itemsToHide = [];

			items.forEach( function( item ) {
				( widget._filterItem( item ) ? itemsToLayout : itemsToHide ).push( item );
			});

			widget._resetLayout( itemsToLayout, itemsToHide );
			widget._layoutItems( itemsToLayout, itemsToHide );
			widget._postLayout( itemsToLayout, itemsToHide );

			if ( !widget.isInitialized ) {
				widget.isInitialized = true;
			}
		},

		_layoutItems: function( itemsToLayout, itemsToHide ) {
			// noop
		},

		_onItemAdded: function( item ) {
			// noop
		},

		_onItemRemoved: function( item ) {
			// noop
		},

		_postLayout: function( itemsToLayout, itemsToHide ) {
			// noop
		},

		removeItem: function( element ) {
			var widget = this;

			if ( widget.items.has( element ) ) {
				var item = widget.items.get( element );
				widget.items.delete( element );

				widget._onItemRemoved( item );
				widget.layout();
			}
		},

		_resetLayout: function( itemsToLayout, itemsToHide ) {
			// noop
		},

		_setOption: function( key, value ) {
			this._super( key, value );
			this.layout();
		},

		_setOptions: function( options ) {
			this._super( options );
			this.layout();
		},

		_sortItems: function( items ) {
			return items;
		},

		_destroy: function () {
			var widget = this;

			
		}
	} );

})( jQuery, window, document );