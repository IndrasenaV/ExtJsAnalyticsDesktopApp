Ext.define('AD.view.analysis.Main',
		{
			extend : 'Ext.panel.Panel',
			alias : 'widget.analysis_main',
			layout : {
				type : 'border'
			},
			defaults: {
			    collapsible: true,
			    split: true,
			    bodyStyle: 'padding:15px'
			},
			height : 600,
			width : 500,
			requires : [ 'AD.view.analysis.Left',
							'AD.view.analysis.Center' ],
			initComponent : function() {
				this.items = [ {
					xtype : 'analysis_leftpanel',
					region : 'west',
					title : 'Configuration',
					margins: '5 0 0 0',
				    cmargins: '5 5 0 0',
				    width: 225,
				    minSize: 100,
				    maxSize: 250
				}
				, {
					xtype : 'analysis_centerpanel',
					region : 'center',
				    collapsible: false,
				    margins: '5 0 0 0',
				    width: 300,
				    minSize: 100,
				    maxSize: 250
				}
				];
				this.callParent();
			}
		});