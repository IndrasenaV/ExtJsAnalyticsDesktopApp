Ext.define('AD.view.analysis.Left', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.analysis_leftpanel',
    requires : [ 'AD.store.analysis.ConfigurationStore'],
    initComponent : function() {
		this.columns = [ {
			header : 'Name',
			dataIndex : 'configurationName',
			width : 150
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
		this.on('show',this.loadGridData,this);
	},
	loadGridData : function(){
		ajaxService.processRequest('analysis','getAllConfigs',{
			success : function(data){
				this.store.loadData(data);
			},
			scope : this
		});
	}
});