Ext.define('GreenFleet.view.driver.Driver', {
	extend : 'Ext.container.Container',

	alias : 'widget.driver',

	title : 'Driver',

	layout : {
		align : 'stretch',
		type : 'vbox'
	},

	initComponent : function() {
		this.callParent(arguments);

		this.add(this.buildList(this));
		this.add(this.buildForm(this));
	},

	buildList : function(main) {
		return {
			xtype : 'gridpanel',
			title : 'Driver List',
			store : 'DriverStore',
			autoScroll : true,
			flex : 1,
			columns : [ {
				dataIndex : 'key',
				text : 'Key',
				type : 'string',
				hidden : true
			}, {
				dataIndex : 'name',
				text : 'Name',
				type : 'string'
			}, {
				dataIndex : 'id',
				text : 'Employee Id',
				type : 'string'
			}, {
				dataIndex : 'division',
				text : 'Division',
				type : 'string'
			}, {
				dataIndex : 'title',
				text : 'Title',
				type : 'string'
			}, {
				dataIndex : 'imageClip',
				text : 'ImageClip',
				type : 'string'
			}, {
				dateFormat : 'YYYY-MM-DD',
				dataIndex : 'createdAt',
				text : 'CreatedAt',
				type : 'date'
			}, {
				dateFormat : 'YYYY-MM-DD',
				dataIndex : 'updaatedAt',
				text : 'UpdaatedAt',
				type : 'date'
			} ],
			viewConfig : {

			},
			listeners : {
				itemclick : function(grid, record) {
					var form = main.down('form');
					form.loadRecord(record);
				}
			},
			onSearch : function(grid) {
				var idFilter = grid.down('textfield[name=idFilter]');
				var namefilter = grid.down('textfield[name=nameFilter]');
				grid.store.load({
					filters : [ {
						property : 'id',
						value : idFilter.getValue()
					}, {
						property : 'name',
						value : namefilter.getValue()
					} ]
				});
			},
			onReset : function(grid) {
				grid.down('textfield[name=idFilter]').setValue('');
				grid.down('textfield[name=nameFilter]').setValue('');
			},
			tbar : [ 'ID', {
				xtype : 'textfield',
				name : 'idFilter',
				hideLabel : true,
				width : 200,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == e.ENTER) {
							var grid = this.up('gridpanel');
							grid.onSearch(grid);
						}
					}
				}
			}, 'Name', {
				xtype : 'textfield',
				name : 'nameFilter',
				hideLabel : true,
				width : 200,
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == e.ENTER) {
							var grid = this.up('gridpanel');
							grid.onSearch(grid);
						}
					}
				}
			}, {
				xtype : 'button',
				text : 'Search',
				tooltip : 'Find Driver',
				handler : function() {
					var grid = this.up('gridpanel');
					grid.onSearch(grid);
				}
			}, {
				text : 'reset',
				handler : function() {
					var grid = this.up('gridpanel');
					grid.onReset(grid);
				}
			} ]
		}
	},

	buildForm : function(main) {
		return {
			xtype : 'form',
			bodyPadding : 10,
			title : 'Vehicle Details',
			autoScroll : true,
			flex : 1,
			items : [ {
				xtype : 'textfield',
				name : 'key',
				fieldLabel : 'Key',
				anchor : '100%',
				hidden : true
			}, {
				xtype : 'textfield',
				name : 'name',
				fieldLabel : 'Name',
				anchor : '100%'
			}, {
				xtype : 'textfield',
				name : 'id',
				fieldLabel : 'Employee Id',
				anchor : '100%'
			}, {
				xtype : 'textfield',
				name : 'division',
				fieldLabel : 'Division',
				anchor : '100%'
			}, {
				xtype : 'textfield',
				name : 'title',
				fieldLabel : 'Title',
				anchor : '100%'
			}, {
				xtype : 'textfield',
				name : 'imageClip',
				fieldLabel : 'ImageClip',
				anchor : '100%'
			}, {
				xtype : 'textfield',
				name : 'updatedAt',
				disabled : true,
				fieldLabel : 'Updated At',
				anchor : '100%'
			}, {
				xtype : 'textfield',
				name : 'createdAt',
				disabled : true,
				fieldLabel : 'Created At',
				anchor : '100%'
			} ],
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'bottom',
				layout : {
					align : 'middle',
					type : 'hbox'
				},
				items : [ {
					xtype : 'button',
					text : 'Save',
					handler : function() {
						var form = this.up('form').getForm();

						if (form.isValid()) {
							form.submit({
								url : 'driver/save',
								success : function(form, action) {
									main.down('gridpanel').store.load();
								},
								failure : function(form, action) {
									GreenFleet.msg('Failed', action.result);
								}
							});
						}
					}
				}, {
					xtype : 'button',
					text : 'Delete',
					handler : function() {
						var form = this.up('form').getForm();

						if (form.isValid()) {
							form.submit({
								url : 'driver/delete',
								success : function(form, action) {
									main.down('gridpanel').store.load();
									form.reset();
								},
								failure : function(form, action) {
									GreenFleet.msg('Failed', action.result);
								}
							});
						}
					}
				}, {
					xtype : 'button',
					text : 'New',
					handler : function() {
						this.up('form').getForm().reset();
					}
				} ]
			} ]
		}
	}
});