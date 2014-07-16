Ext.define('AD.store.ReportIdentifier', {
	extend : 'Ext.data.JsonStore',
	requires : [ 'Ext.data.JsonStore' ],
	proxy : {
		type : 'memory'
	},
	fields : [ {
		name : 'configName',
		type : 'string'
	}, {
		name : 'reportName',
		type : 'string'
	}, {
		name : 'reportId',
		type : 'number'
	}, {
		name : 'configId',
		type : 'number'
	}

	]
});