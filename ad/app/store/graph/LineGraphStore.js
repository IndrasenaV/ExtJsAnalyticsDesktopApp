Ext.define('AD.store.graph.LineGraphStore', {
	extend : 'Ext.data.JsonStore',
	requires : [ 'Ext.data.JsonStore' ],
	proxy : {
		type : 'memory'
	},
	fields : [ {
		name : 'xAxis',
		type : 'string'
	}, {
		name : 'yAxis1',
		type : 'number'
	}, {
		name : 'yAxis2',
		type : 'number'
	}, {
		name : 'yAxis3',
		type : 'number'
	}

	]
});