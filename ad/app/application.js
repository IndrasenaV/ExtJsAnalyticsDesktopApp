Ext.define('AD.Application', {
    name: 'AD',
    extend: 'Ext.app.Application',
    requires : [ 'AD.service.BaseService', 'AD.view.Main', 'AD.view.admin.Login', 'AD.view.common.Message', 'AD.view.common.TimeSplitMenu' ],
	controllers : [ 'Admin', 'Setup', 'Analysis', 'Dashboard' ],
	launch : function() {
		tempGraphCount = 0;
		rootAjaxUrl = "http://localhost:8080/WebAnalyticsWebConsole/";
		Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
			minWidth : 400
		});
		ajaxService = new AD.service.BaseService();
		// userMessage = new analytics.view.common.Message();
		Ext.create('Ext.container.Viewport', {
			border : false,
			layout : 'border',
			defaults : {
				border : false
			},
			items : [ {
				xtype : 'main',
				region : 'center'
			}, {
				html : '<div align="center">Developed and Maintained by Indrasena</div>',
				region : 'south'
			} ]
		});
	}
});

var ajaxService = null;
var userMessage = null;
Ext.Loader.setConfig({
	enabled : true,
	disableCaching : false
});
Ext.Loader.config.disableCaching = false;
Ext.Ajax.disableCaching = false;
var rootContext = "/WebAnalyticsWebConsole";
var appFolder = '/WebAnalyticsWebConsole/js/analytics';
