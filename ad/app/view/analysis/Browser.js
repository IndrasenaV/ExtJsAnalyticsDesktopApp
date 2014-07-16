Ext.define('AD.view.analysis.Browser',
		{
			extend : 'Ext.panel.Panel',
			alias : 'widget.analysis_browser',
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
			requires : [ 'AD.view.graph.Pi'],
			initComponent : function() {
				this.pieGraph = Ext.create('AD.view.graph.Pi',{
					
					config : { data : []}
					
				});
				this.piePanel = Ext.create('Ext.panel.Panel',{
					items : [ this.pieGraph],
					title : 'Browser Usage',
					width : 475,
					height : 475,
					x : 0,
					y : 0,
					dockedItems : [ {
						xtype : 'toolbar',
						dock : 'top',
						align : 'right',
						items : [ {
							xtype : 'common_timesplit',
							listeners : {
								weekly : function(){
									var pan = this.up('analysis_browser');
									pan.loadDataToStore(pan.pieGraph.store,'getUsageWeekly');
								},
								daily : function(){
									var pan = this.up('analysis_browser');
									pan.loadDataToStore(pan.pieGraph.store,'getUsageDaily');
								},
								complete : function(){
									var pan = this.up('analysis_browser');
									pan.loadDataToStore(pan.pieGraph.store,'getUsageComplete');
								}
							}
						}]
					} ]
				});
				this.gridStore = Ext.create('Ext.data.JsonStore', {
					fields : [ {
						name : 'name',
						type : 'string'
					}, {
						name : 'data',
						type : 'number'
					}
					]
				});
				
				this.gridPanel = Ext.create('Ext.grid.Panel', {
					store : this.gridStore,
					autoScroll : true,
					multiSelect: true,
					minHeight :400,
					height : 400,
					x : 510,
					y : 0,
					dockedItems : [ {
						xtype : 'toolbar',
						dock : 'top',
						align : 'right',
						items : [ {
							xtype : 'common_timesplit',
							listeners : {
								weekly : function(){
									var pan = this.up('analysis_browser');
									pan.loadDataToStore(pan.gridPanel.store,'getUsageWeekly');
								},
								daily : function(){
									var pan = this.up('analysis_browser');
									pan.loadDataToStore(pan.gridPanel.store,'getUsageDaily');
								},
								complete : function(){
									var pan = this.up('analysis_browser');
									pan.loadDataToStore(pan.gridPanel.store,'getUsageComplete');
								},
								monthly : function(){
									var pan = this.up('analysis_browser');
									pan.loadDataToStore(pan.gridPanel.store,'getUsageMonthly');
								}
							}
						}]
					} ],
					columns : [ {
						header  : 'Name',
						dataIndex : 'name'
					} ,{
						header  : 'Group',
						dataIndex : 'name'
					},{
						header  : 'Count',
						dataIndex : 'data'
					}],
					title : 'Browser Usage'
				});

				this.items = [this.piePanel, this.gridPanel];
				this.callParent();
				this.on('afterrender', this.loadData,this);
			},
			loadData : function(){
				ajaxService.processRequest("browserUsage","getUsageComplete",{
					loadMaskMessage : 'Loading chart data.....',
					loadMaskEl : this.getEl(),
					success : this.browserUsageDailyCompleted,
					scope : this
				});
			},
			loadDataToStore : function(store,dateType){
				ajaxService.processRequest("browserUsage",dateType,{
					loadMaskMessage : 'Loading chart data.....',
					loadMaskEl : this.getEl(),
					success : function(config){
						var recs = [];
						for( var field in config.data ){
							var rec = {};
							rec.name = field;
							rec.data = config.data[field];
							recs[recs.length] = rec;
						}
						this.loadData(recs);
					},
					scope : store
				});
			},
			browserUsageDailyCompleted : function(config){
				if( config == null ){
					this.add({ html : 'No Data Found'});
				}
				var recs = [];
				for( var field in config.data ){
					var rec = {};
					rec.name = field;
					rec.data = config.data[field];
					recs[recs.length] = rec;
				}
				this.pieGraph.store.loadData(recs);
				this.gridStore.loadData(recs);
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