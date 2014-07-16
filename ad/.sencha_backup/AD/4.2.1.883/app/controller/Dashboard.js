Ext.define('AD.controller.Dashboard', {
	extend : 'Ext.app.Controller',
	refs : [ {
		ref : 'dashboardPanel',
		selector : 'dashboard_main'
	}, {
		ref : 'saveButton',
		selector : 'dashboard_main  button[action=save]'
	},{
		ref : 'addButton',
		selector : 'dashboard_main button[action=addRemove]'
	},
	{ 
		ref : 'addRemovePanel',
		selector : 'dashboard_addRemoveGrid'
	}],
	init : function() {
		
		this.control({
			'dashboard_main button[action=editDashboard]' : {
				click : this.editDashboardLayout
			},
			'dashboard_main button[action=save]':{
				click : this.saveDashboardState
			},
			'dashboard_main button[action=addRemove]' : {
				click : this.addRemovePanel
			}
		});

	},
	editDashboardLayout : function(){
		this.getSaveButton().enable();
		this.getAddButton().enable();
		
	},
	saveDashboardState : function(){
		this.getDashboardPanel().saveDashboard();
	},
	addRemovePanel : function(){
		this.getDashboardPanel().showAddRemoveGrid();
	}
});