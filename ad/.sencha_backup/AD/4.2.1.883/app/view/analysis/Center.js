Ext.define('AD.view.analysis.Center', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.analysis_centerpanel',
	layout : {
		type : 'absolute'
	},
	width : 550,
	height : 500,
	requires : [ 'AD.view.analysis.Browser','AD.view.analysis.OS'],
	initComponent : function() {
		try {
			this.callParent();
		} catch (e) {
			console.log('Error Initializing ' + e);
		}
	},
	defaults : {
		width : 450,
		height : 450
	},
	loadPanel : function(rec) {
		ajaxService.processRequest("analysis", "getAnalyticsForConfig", {
			loadMaskMessage : 'Loading meta data.....',
			loadMaskEl : this.getEl(),
			args : rec,
			success : this.afterDataLoad,
			scope : this
		});
	},
	afterDataLoad : function(data) {
		this.removeAll(true);
		var allReports = data;
		var j = 0;
		for ( var i in allReports) {
			var report = allReports[i];
			switch (report.reportType) {
			case 'browserUsage':
				this.add({
					xtype : 'analysis_browser',
					panelConfig : report,
					title : report.reportTitle
				});
				break;
			case 'osUsage':
				this.add({
					xtype : 'analysis_os',
					title : report.reportTitle
				});
				break;
			case 'locationUsage' : this.add({
				xtype : 'common_reportPanel',
				title : report.reportTitle,
				panelConfig : report,
				tempGraphCount : j
			});
			break;
			default:
				this.add({
					xtype : 'common_reportPanel',
					title : report.reportTitle,
					panelConfig : report,
					tempGraphCount : j
				});
				j++;
				break;
			}

		}
		this.setActiveTab(0);
		this.doLayout();
	}
});