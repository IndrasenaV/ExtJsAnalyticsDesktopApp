Ext.define('AD.controller.Setup', {
	extend : 'Ext.app.Controller',
	views :['setup.SitePanel','setup.Main','setup.WebsiteTracking'],
	refs : [ {
		ref : 'setupPanel',
		selector : 'setupmain'
	}, {
		ref : 'sitePanel',
		selector : 'setup_sitepanel'
	},
	{ 
		ref : 'configurationPanel',
		selector : 'setup_websitetracking'
	},
	{ 
		ref : 'analysisPanel',
		selector : 'analysis_leftpanel'
	}],
	init : function() {

		this.control({
			'setup_sitepanel menuitem[action=webanalytics]' : {
				click : this.addConfiguration
			},
			'setup_sitepanel button[text=Remove]' : {
				click : this.removeConfiguration
			},
			'setup_websitetracking button[action=save]':{
				click : this.saveConfiguration
			},
			'setup_websitetracking' : {
				updatedConfiguration : this.reloadConfigurationGrid
			},
			'setup_sitepanel':{
				itemdblclick : this.gridDoubleClickHandler
			},
			'setup_sitepanel':{
				itemclick : this.gridDoubleClickHandler
			}
		});

	},
	addConfiguration : function(){
		this.getConfigurationPanel().enable();
		this.getConfigurationPanel().createNewConfiguration();
	},
	saveConfiguration : function(){
		this.getConfigurationPanel().saveConfiguration();
	},
	reloadConfigurationGrid : function(){
		this.getSitePanel().loadGridData();
		this.getAnalysisPanel().loadGridData();
	},
	gridDoubleClickHandler : function( grid, rec, cellIndex,rowIndex,e){
		this.getConfigurationPanel().enable();
		this.getConfigurationPanel().loadConfiguration(rec.raw);
	},
	removeConfiguration : function(){
		var recs = this.getSitePanel().getSelectionModel().getSelection();
		if( recs.length == 0 ){
			Ext.MessageBox
			.show({
				title : 'Warning',
				msg : 'Please select a record from above grid to be removed.',
				buttons : Ext.MessageBox.OK,
				icon : Ext.Msg.ERROR
			});
		}else{
			Ext.MessageBox.show({
			     title:'Confirm Delete',
			     msg: ' Removing the configuration would loose all the analytic data and will stop monitoring further. Would you like to continue?',
			     buttons: Ext.Msg.YESNO,
			     scope : this,
			     recs : recs,
			     fn : function(buttonId,text,opt){
			    	 if( buttonId == "yes"){
			    		this.removeConfigurationConfirm(opt.recs);
			    	 }else{
			    		 
			    	 }
			     },
			     icon: Ext.Msg.QUESTION
			});
		}
	},
	removeConfigurationConfirm : function(recs){
		ajaxService.processRequest('setup','removeConfiguration',{
			success : function(data){
				this.getSitePanel().loadGridData();
				this.getAnalysisPanel().loadGridData();
				this.getConfigurationPanel().emptyAndDisable();
				Ext.MessageBox
				.show({
					title : 'Warning',
					msg : 'Removed successfully.',
					buttons : Ext.MessageBox.OK
				});
			},
			args : { id : recs[0].raw.id },
			scope : this,
			loadMaskEl : Ext.getBody(),
			loadMaskMessage : 'Removing configuration '+recs[0].raw.configurationName
		});
	}
});