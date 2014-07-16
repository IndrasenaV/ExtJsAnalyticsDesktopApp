Ext.define('AD.view.dashboard.Main', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.dashboard_main',
	layout : {
		type : 'absolute'
	},
	defaults : {
		collapsible : true,
		split : true,
		bodyStyle : 'padding:15px'
	},
	requires : [ 'AD.view.dashboard.AddRemoveGrid'],
	height : 1000,
	autoScroll : true,
	border : false,
	dockedItems : [ {
		xtype : 'toolbar',
		dock : 'top',
		align : 'right',
		items : [ {
			xtype : 'button',
			text : 'Add/Remove',
			action : 'addRemove'
		}, {
			xtype : 'button',
			text : 'Save',
			action:'save'
		}]
	} ],
	initComponent : function() {
		this.buttons = [];
		this.allPanels = [];
		this.callParent();
		this.on('render', this.loadData, this);
	},
	loadData : function() {
		ajaxService.processRequest("dashboard", "getMetaData", {
			loadMaskMessage : 'Loading meta data.....',
			loadMaskEl : this.getEl(),
			success : this.afterDataLoad,
			scope : this
		});
	},
	afterDataLoad : function(data) {
		this.rec = data;
		var panels = data.reportPanelsInfo;
		for ( var i = 0; i < panels.length; i++) {
			var panelConfig = panels[i];
			this.createPanel(panelConfig);
		}
		
		this.doLayout();
	},
	createPanel : function(panelConfig){
		var pan = new Ext.panel.Panel({
			layout : 'fit',
			height : panelConfig.height,
			width : panelConfig.width,
			resizable : true,
			draggable : true,
			items : [  new AD.view.common.ReportPanel({panelConfig : panelConfig})],
			x :  panelConfig.startXAxis,
			y :  panelConfig.startYAxis,
			rec : panelConfig
		});
		this.allPanels[this.allPanels.length] = pan;
		this.add(pan);
		this.editDashboardLayout();
		this.doLayout();
		
	},
	saveDashboard : function(){
		var dashboardState = {};
		dashboardState.reportPanelsInfo=[];
		for( var i=0;i<this.allPanels.length;i++){
			var panel = this.allPanels[i];
			var rec = panel.rec;
			rec.startXAxis = panel.getX()-this.getX();
			rec.startYAxis = panel.getY()-this.getY()-38;
			rec.height = panel.getHeight();
			rec.width = panel.getWidth();
			dashboardState.reportPanelsInfo[dashboardState.reportPanelsInfo.length] = rec;
		}
		ajaxService.processRequest('dashboard','saveMetaData',{
			success: function(data){
				//userMessage.msg('Dashboard','very long message for saving the dashboard for seeing the impact of large in user messages Saved Dashboard!');
			},
			scope : this,
			args : dashboardState,
			loadMaskEl : this.getEl(),
			loadMaskMessage : 'Saving dashboard state, please wait.....'
		});
	},
	removeDashboardPanel : function(){
		
	},
	editDashboardLayout : function(){
		for( var i=0;i<this.items.length;i++){
			this.items.items[i].resizable = true;
			this.items.items[i].closable = true;
			this.items.items[i].draggable = true;
		}
	},
	
	freezeDashboardLayout : function(){
		for( var i=0;i<this.items.length;i++){
			this.items.items[i].resizable = false;
			this.items.items[i].closable = false;
			this.items.items[i].draggable = false;
		}
	},
	
	showAddRemoveGrid : function(){
		var win = Ext.create('AD.view.dashboard.AddRemoveGrid');
		win.on('selectedReports',this.changedPanels,this);
		win.show();
	},
	changedPanels : function(recs){
		var newPanelXAxis = 50;
		var newPanelYAxis = 50;
		this.newAllPanels = [];
		// Remove all the panels which are not in the record
		for( var i=0;i<this.allPanels.length;i++){
			var present = false;
			for( var j=0;j<recs.length;j++){
				if( recs[j].data.reportId == this.allPanels[i].rec.reportId ){
					present = true;
					break;
				}
			}
			if( !present ){
				this.remove( this.allPanels[i],true);
			}else{
				this.newAllPanels[this.newAllPanels.length] = this.allPanels[i];
			}
		}
		this.allPanels = this.newAllPanels;
		for( var i=0;i<recs.length;i++){
			
			var present = false;
			for(var j=0;j<this.allPanels.length;j++){
				if( recs[i].data.reportId == this.allPanels[j].rec.reportId){
					present = true;
					break;
				}
			}
			if( !present ){
				// Add the panel
				var  reportPanelsInfo = {};
				Ext.apply( reportPanelsInfo, recs[i].data);
				reportPanelsInfo.width = 450;
				reportPanelsInfo.height = 450;
				reportPanelsInfo.startXAxis = newPanelXAxis;
				reportPanelsInfo.startYAxis = newPanelYAxis;
				newPanelXAxis = newPanelXAxis + 50;
				newPanelYAxis = newPanelYAxis + 50;
				this.createPanel(reportPanelsInfo);
			}
		}
		
		this.saveDashboard();
	}
});