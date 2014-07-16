Ext.define('AD.view.ondemand.Main',
		{
			extend : 'Ext.panel.Panel',
			alias : 'widget.ondemand_main',
			layout : {
				type : 'border'
			},
			defaults: {
			    collapsible: true,
			    split: true,
			    bodyStyle: 'padding:15px'
			},
			height : 500,
			width : 500,
			initComponent : function() {
				
				this.callParent();
			}
		});