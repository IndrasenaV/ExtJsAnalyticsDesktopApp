Ext.define('AD.view.admin.SystemInfo', {
	extend : 'Ext.panel.Panel',
	title : 'System Info',
	alias : 'widget.admin_systeminfo',
	style : 'margin: 30px',
	layout : 'vbox',
	defaults : {
		cls : 'field-margin'
	},
	initComponent : function() {

		this.formPanel = new Ext.form.Panel({
			border : false,
			items : [ {
				xtype : 'textfield',
				fieldLabel : 'Theme',
				name : 'theme'
			}, {
				xtype : 'textfield',
				fieldLabel : 'Language',
				name : 'language'
			},{
				xtype : 'textfield',
				fieldLabel : 'Time Zone',
				name : 'timeZone'
			}]
		});
		var store = Ext.create('Ext.data.JsonStore', {
			fields : [ 'data' ]
		});

		this.memoryMeter = Ext.create('Ext.chart.Chart', {
			style : 'background:#fff',
			animate : {
				easing : 'elasticIn',
				duration : 1000
			},
			store : store,
			insetPadding : 25,
			flex : 1,
			axes : [ {
				type : 'gauge',
				position : 'gauge',
				minimum : 0,
				maximum : 100,
				steps : 10,
				margin : -10,
				title : 'Hits in Millions'
			} ],
			series : [ {
				type : 'gauge',
				field : 'data',
				donut : false,
				colorSet : [ '#F49D10', '#ddd' ]
			} ]
		});
		this.meterPanel = Ext.create('Ext.panel.Panel',{
			items : [ this.memoryMeter ],
			title : 'Current Hits Usage',
			layout : 'fit',
			height : 200,
			width : 300
		});
		this.items = [ this.formPanel, this.meterPanel ];
		this.callParent();
		this.on('render', this.loadFromBackend, this);
	},
	loadFromBackend : function() {

		ajaxService.processRequest('admin', 'getSystemInfo', {
			success : function(data) {
				this.formPanel.getForm().setValues(data);
				this.memoryMeter.store.loadData([ {
					data : data.currentMemoryUsage
				} ]);
			},
			scope : this
		});
	}
});