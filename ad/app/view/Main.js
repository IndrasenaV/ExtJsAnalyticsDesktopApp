Ext.define('AD.view.Main', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.main',
	border : false,
	defaults : {
		border : false
	},
	tabBar : {
		layout : {
			pack : 'center'
		}
	},
	requires : [ 'AD.view.common.ReportPanel',
			'AD.view.dashboard.Main', 'AD.view.setup.Main',
			'AD.view.admin.Main', 'AD.view.analysis.Main' ],
	initComponent : function() {
		this.items = [ {
			xtype : 'dashboard_main',
			title : 'Dashboard'
		}, {
			xtype : 'analysis_main',
			title : 'Analysis'
		}, {
			xtype : 'setupmain',
			title : 'Setup'
		}, {
			xtype : 'adminmain',
			title : 'Admin'
		} ];
		this.callParent();
		this.on('afterrender', this.addLogInInfo, this);
	},
	addLogInInfo : function() {
		this.getTabBar().add([{
			xtype : 'label',
			baseCls : 'logInClass',
			text : 'Logged In User : '
		},{
			xtype : 'label',
			baseCls : 'logInClass',
			text : ' '
		}, {
			xtype : "button",
			text : 'Logout',
			handler : function(){
				ajaxService.processRequest('admin','logoff',{
					success : function(){
						var url = document.URL.replace('home.jsp','main.jsp');
                    	window.location = url;
					}
				});
			}

		},
		{
			xtype : "button",
			text : 'Mobile App',
			handler : function(){
				if( Ext.isChrome || Ext.isSafari){
					var url = document.URL.replace('main.jsp','mobile.jsp');
                	window.location = url;
				}else{
					Ext.Msg.alert('Warning','Please use Chrome or Safari to login to mobile app');
				}
						
					
			}

		}]);
		// this.doLayout();
	}
});