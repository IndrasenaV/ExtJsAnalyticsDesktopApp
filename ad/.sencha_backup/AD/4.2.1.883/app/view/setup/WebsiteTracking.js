Ext.define('AD.view.setup.WebsiteTracking', {
	extend : 'Ext.form.Panel',
	formBind : true,
	alias : 'widget.setup_websitetracking',
	border : false,
	autoScroll : true,
	defaults : {
		bodyStyle : 'padding:15px; border : 10px',
	},
	initComponent : function() {
		this.addEvents({
			'updatedConfiguration' : true
		});
		var configFormPanelConfig = {
			xtype : 'form',
			layout : 'form',
			width : 300,
			items : [ {
				xtype : 'textfield',
				name : 'configurationName',
				fieldLabel : 'Name',
				allowBlank : false
			}, {
				xtype : 'textfield',
				name : 'website',
				fieldLabel : 'Website URL'
			}, {
				xtype : 'textfield',
				name : 'websiteTrackId',
				fieldLabel : 'Track Id'
			}, {
				xtype : 'numberfield',
				name : 'refreshRate',
				minValue : 10,
				maxValue : 1000,
				fieldLabel : 'Data Refresh Rate in Mins'
			} ]
		};
		var instructionPanelConfig = {
			xtype : 'panel',
			title : 'Instructions',
			html : ' Holder for instruction panel',
			width : 300
		};
		var siteAliasPanelConfig = {
			xtype : 'grid',
			store : Ext.create('Ext.data.JsonStore', {
				fields : [ 'absoluteUrl', 'aliasName' ]
			}),
			plugins : [ {
				ptype : 'cellediting',
				clicksToEdit : 1
			} ],
			autoScroll : true,
			minHeight : 200,
			height : 200,
			viewConfig : {

			},
			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'top',
				align : 'right',
				items : [ {
					xtype : 'button',
					text : 'Add',
					action : 'addRemove',
					scope : this,
					handler : this.onSiteAliasAddClick
				} ]
			} ],
			columns : [ {
				xtype : 'actioncolumn',
				width : 30,
				sortable : false,
				menuDisabled : true,
				items : [ {
					icon : '../resources/ext-theme-neptune/images/dd/drop-no.png',
					tooltip : 'Delete Alias',
					scope : this,
					handler : this.onSiteAliasRemoveClick
				} ]
			}, {
				header : 'Absolute Url',
				dataIndex : 'absoluteUrl',
				width : 500,
				editor : {
					allowBlank : false
				}
			}, {
				header : 'Alias',
				dataIndex : 'aliasName',
				width : 150,
				editor : {
					allowBlank : false
				}
			} ],
			title : 'Site Alias Panel'
		};
		this.items = [

		{
			layout : 'column',
			defaults : {
				bodyStyle : 'padding:15px; border : 10px',
				columnWidth : 0.5,
				border : false

			},
			items : [ configFormPanelConfig, instructionPanelConfig ]
		}, siteAliasPanelConfig ];
		this.buttons = [ {
			text : 'Save',
			xtype : 'button',
			action : 'save'
		} ];
		this.buttonAlign = 'center';
		this.disabled = true;
		this.callParent();
	},
	onSiteAliasAddClick : function() {
		var rec = {
			absoluteUrl : '',
			aliasName : ''
		};

		this.down('grid').getStore().loadData([ rec ], true);
		this.cellEditing.startEditByPosition({
			row : 0,
			column : 0
		});
	},
	onSiteAliasRemoveClick : function(grid, rowIndex) {
		grid.getStore().removeAt(rowIndex);
	},
	createNewConfiguration : function() {
		ajaxService.processRequest("setup", "getEmptyConfiguration", {
			success : function(data) {
				this.down('form').getForm().setValues(data);
				this.down('grid').getStore().loadData(data.allSiteAlias);
				this.rec = data;
			},
			loadMaskMessasge : 'Getting empty configuration',
			loadMaskEl : this.getEl(),
			scope : this
		});
	},
	saveConfiguration : function() {

		if (this.getForm().isValid()) {
			Ext.apply(this.rec, this.down('form').getForm().getValues());
			var listRecs = this.down('grid').getStore().getRange();
			var aliasData = [];
			for ( var i = 0; i < listRecs.length; i++) {
				var temp = listRecs[i].data;
				aliasData[aliasData.length] = temp;
			}
			this.rec.allSiteAlias = aliasData;
			ajaxService.processRequest("setup", "saveConfiguration", {
				success : function(data) {

					Ext.Msg.alert('Saved', "Configuration saved successfully !!");
					this.rec = data;
					this.down('form').getForm().setValues(data);
					this.down('grid').getStore().loadData(data.allSiteAlias);
					this.fireEvent('updatedConfiguration');
				},
				loadMaskEl : this.getEl(),
				loadMaskMessage : 'Saving configuration.....',
				scope : this,
				args : this.rec
			});
		} else {
			Ext.Msg.alert('Not Valid', "Configuration has form error, please fix the above issues.");
		}
	},
	loadConfiguration : function(rec) {
		ajaxService.processRequest("setup", "getConfiguration", {
			success : function(data) {
				this.down('form').getForm().setValues(data);
				this.down('grid').getStore().loadData(data.allSiteAlias);
				this.rec = data;
			},
			failure : function(form, action) {

			},
			args : rec,
			scope : this,
			loadMaskEl : this.getEl(),
			loadMaskMessage : 'Loading configuration.....'
		});
	},
	emptyAndDisable : function() {
		this.getForm().reset();
		this.disable();
	}
});