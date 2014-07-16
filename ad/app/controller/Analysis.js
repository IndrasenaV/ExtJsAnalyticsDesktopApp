Ext.define('AD.controller.Analysis', {
	extend : 'Ext.app.Controller',
	refs : [ {
		ref : 'analysisPanel',
		selector : 'analysis_main'
	}, {
		ref : 'configGridPanel',
		selector : 'analysis_leftpanel'
	},{
		ref : 'analysisCenterPanel',
		selector : 'analysis_centerpanel'
	} ],
	init : function() {

		this.control({
			'analysis_leftpanel' : {
				itemdblclick : this.gridDoubleClickHandler
			}
		});

	},
	gridDoubleClickHandler : function( grid, rec, cellIndex,rowIndex,e){
		this.getAnalysisCenterPanel().loadPanel(rec.raw);
	}
});