Ext.define('AD.store.analysis.ConfigurationStore',{
	model : 'AD.model.analysis.ConfigList',
	extend : 'Ext.data.Store',
	requires : ['Ext.data.Store','AD.model.analysis.ConfigList'],
	proxy : {
		type : 'ajax',
		url :   '/WebAnalyticsWebConsole/analysis/getAllConfigs.json',
		reader : {
			type : 'json',
			root : 'results'
		}
	}
});