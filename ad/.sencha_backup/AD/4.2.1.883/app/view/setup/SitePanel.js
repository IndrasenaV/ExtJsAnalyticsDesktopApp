Ext.define('AD.view.setup.SitePanel', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.setup_sitepanel',
	layout : 'fit',
	height : 500,
	initComponent : function() {
		this.columns = [ {
			header : 'Name',
			dataIndex : 'configurationName',
			width : 150
		} ];
		this.tbar = [ {
			xtype : 'button',
			text : 'Add',
			menu : [ { text : 'Web Analytics', action : 'webanalytics'}, { text : 'Log Analytics'} ]
		}, {
			xtype : 'button',
			text : 'Remove'
		} ];
		this.store = new Ext.data.JsonStore({
			autoDestroy : true,
			fields : [ {
				name : 'configurationName',
				type : 'string'
			} ],
			proxy : new Ext.data.MemoryProxy()
		});

		this.callParent();
		this.on('render', this.loadGridData, this);
	},
	loadGridData : function() {
		ajaxService.processRequest('setup', 'getAllConfigs', {
			success : function(data) {
				this.store.loadData(data);
			},
			scope : this
		});
	}
});