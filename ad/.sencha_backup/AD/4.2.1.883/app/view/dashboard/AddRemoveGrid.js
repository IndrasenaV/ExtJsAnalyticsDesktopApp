Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.dd.*'
]);

Ext.define('AD.view.dashboard.AddRemoveGrid', {
	extend : 'Ext.window.Window',
	alias : 'widget.addRemoveGrid',
	title : 'Drag and Drop Reports',
	modal : true,
	closable : false,
	draggable : true,
	layout : {
		type : 'fit'
	},
	height : 500,
	width : 800,
	autoScroll : true,
	requires : ['AD.store.ReportIdentifier'],
	initComponent : function() {
		this.addEvents({
			'selectedReports' : true
		});
		this.existingReportsGrid = Ext.create('Ext.grid.Panel', {
			store : new AD.store.ReportIdentifier(),
			autoScroll : true,
			multiSelect: true,
			minHeight :400,
			height : 400,
	        viewConfig: {
	            plugins: {
	                ptype: 'gridviewdragdrop',
	                dragGroup: 'firstGridDDGroup',
	                dropGroup: 'secondGridDDGroup'
	            },
	            listeners: {
	                drop: function(node, data, dropRec, dropPosition) {
	                    //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
	                    //AM.common.info.msg("Drag from right to left", 'Dropped ' + data.records[0].get('name') + dropOn);
	                }
	            }
	        },
			columns : [ {
				header  : 'Config Name',
				dataIndex : 'configName'
			} ,{
				header  : 'Report Name',
				dataIndex : 'reportName'
			}],
			title : 'Existing Reports'
		});
		this.availableReportsGrid =  Ext.create('Ext.grid.Panel', {
			store : new AD.store.ReportIdentifier(),
			autoScroll : true,
			multiSelect: true,
			minHeight :400,
			height : 400,
	        viewConfig: {
	        	plugins: {
	                ptype: 'gridviewdragdrop',
	                dragGroup: 'secondGridDDGroup',
	                dropGroup: 'firstGridDDGroup'
	            },
	            listeners: {
	                drop: function(node, data, dropRec, dropPosition) {
	                    //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
	                    //AM.common.info.msg("Drag from left to right", 'Dropped ' + data.records[0].get('name') + dropOn);
	                }
	            }
	        },
			columns : [ {
				header  : 'Config Name',
				dataIndex : 'configName'
			} ,{
				header  : 'Report Name',
				dataIndex : 'reportName'
			}],
			title : 'Available Reports'

		});
		this.items = [ Ext.create('Ext.panel.Panel',{
			items : [this.availableReportsGrid,this.existingReportsGrid],
			layout : {
				type : 'column'
			},
			defaults : {
				columnWidth : 0.5
			}
		}) ];
		this.buttons = [ {
			xtype : 'button',
			text : 'Ok',
			handler : this.okButtonClicked,
			scope : this
		}, {
			xtype : 'button',
			text : 'Cancel',
			handler : this.cancelButtonClicked,
			scope : this
		} ];
		this.callParent();
		this.on('render', this.loadData,this);

	},
	okButtonClicked : function(){
		var recs = this.existingReportsGrid.store.getRange();
		this.fireEvent('selectedReports',recs);
		this.close();
		this.destroy();
	},
	cancelButtonClicked : function(){
		this.close();
		this.destroy();
	},
	loadData : function() {
		ajaxService.processRequest('dashboard', 'getAvailableExistingReports',
				{
					success : function(data) {
						this.existingReportsGrid.store
								.loadData(data.existingReports);
						this.availableReportsGrid.store
								.loadData(data.availableReports);
					},
					scope : this,
					loadMaskMessage : 'Loading data.....',
					loadMaskEl : this.getEl()

				});
	}
});