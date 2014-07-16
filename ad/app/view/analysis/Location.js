Ext.define('AD.view.analysis.Location',
		{
			extend : 'Ext.panel.Panel',
			alias : 'widget.analysis_location',
			layout : {
				type : 'absolute'
			},
			defaults: {
			    collapsible: true,
			    split: true,
			    bodyStyle: 'padding:15px'
			},

			height : 550,
			width : 500,
			requires : [ 'AD.view.map.GMapPanel'],
			initComponent : function() {
				this.todayUsage = Ext.create('Ext.panel.Panel',{
					title : 'Today Usage',
					width : 450,
					height : 450,
					x : 0,
					y : 0,
					dockedItems : [ {
						xtype : 'toolbar',
						dock : 'top',
						align : 'right',
						items : [ {
							xtype : 'common_timesplit'
						}]
					} ]
				});
				this.totalUsage = Ext.create('Ext.panel.Panel',{
					title : 'Total Usage',
					width : 450,
					height : 450,
					x : 510,
					y : 0
				});
				this.items = [this.todayUsage, this.weeklyUsage,this.monthlyUsage,this.totalUsage];
				this.callParent();
				this.on('afterrender', this.loadData,this);
			},
			loadData : function(){
				ajaxService.processRequest("browserUsage","getBrowserUsageDaily",{
					loadMaskMessage : 'Loading chart data.....',
					loadMaskEl : this.getEl(),
					success : this.browserUsageDailyCompleted,
					scope : this
				});
				ajaxService.processRequest("browserUsage","getBrowserUsageComplete",{
					loadMaskMessage : 'Loading chart data.....',
					loadMaskEl : this.getEl(),
					success : this.browserUsageCompleteCompleted,
					scope : this
				});
			},
			browserUsageDailyCompleted : function(data){
				if( data == null || data.length == 0 ){
					this.add({ html : 'No Data Found'});
				}
				this.todayUsage.add( {
					xtype : 'graph_pi',
					config : data,
					width : 400,
					height : 400
				} );
			},
			browserUsageWeeklyCompleted : function(data){
				if( data == null || data.length == 0 ){
					this.add({ html : 'No Data Found'});
				}
				this.weeklyUsage.add( {
					xtype : 'graph_pi',
					config : data,
					width : 400,
					height : 400
				} );
			},
			browserUsageMonthlyCompleted : function(data){
				if( data == null || data.length == 0 ){
					this.add({ html : 'No Data Found'});
				}
				this.monthlyUsage.add( {
					xtype : 'graph_pi',
					config : data,
					width : 400,
					height : 400
				} );
			},
			browserUsageCompleteCompleted : function(data){
				if( data == null || data.length == 0 ){
					this.add({ html : 'No Data Found'});
				}
				this.totalUsage.add( {
					xtype : 'graph_pi',
					config : data,
					width : 400,
					height : 400
				} );
			}
			
		});