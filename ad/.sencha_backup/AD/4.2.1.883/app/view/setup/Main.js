Ext.define('AD.view.setup.Main',
		{
			extend : 'Ext.panel.Panel',
			alias : 'widget.setupmain',
			layout : {
				type : 'border'
			},
			defaults: {
			    collapsible: true,
			    split: true,
			    bodyStyle: 'padding:15px'
			},
			width : 500,
			requires : [ 'AD.view.setup.SitePanel',
					'AD.view.setup.CenterPanel' ],
			initComponent : function() {
				this.items = [ {
					xtype : 'setup_sitepanel',
					region : 'west',
					title : 'Configuration',
					margins: '5 0 0 0',
				    cmargins: '5 5 0 0',
				    width: 225,
				    minSize: 100,
				    maxSize: 250
				}
				, {
					xtype : 'setup_centerpanel',
					region : 'center',
					title: 'Main Content',
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