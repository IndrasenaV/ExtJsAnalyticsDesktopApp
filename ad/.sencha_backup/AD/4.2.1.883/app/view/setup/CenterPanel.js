Ext.define('AD.view.setup.CenterPanel', {
	extend : 'Ext.Panel',
	alias : 'widget.setup_centerpanel',
	requires : [ 'AD.view.setup.WebsiteTracking'],
	initComponent : function() {
		this.items = [{
		            	  xtype : 'setup_websitetracking'
		              }];
		this.callParent();
	}
});