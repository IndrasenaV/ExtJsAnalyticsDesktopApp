Ext.define('AD.view.common.TimeSplitMenu', {
	extend : 'Ext.button.Split',
	alias : 'widget.common_timesplit',
	text : 'Complete',
	initComponent : function() {
		this.addEvents({
			'complete':true,
			'daily' : true,
			'weekly' : true,
			'monthly' : true,
			'quarter' : true,
			'custom': true
		});
		this.menu = new Ext.menu.Menu({
			items : [
			{
				text : 'Daily',
				scope : this,
				handler : function() {
					this.setText('Daily');
					this.fireEvent('daily');
					
				}
			}, {
				text : 'Weekly',
				scope : this,
				handler : function() {
					this.setText('Weekly');
					this.fireEvent('weekly');
				}
			}, {
				text : 'Monthly',
				scope : this,
				handler : function() {
					this.setText('Monthly');
					this.fireEvent('monthly');
				}
			}, {
				text : 'Quarter',
				scope : this,
				handler : function() {
					this.setText('quarter');
					this.fireEvent('Quarter');
				}
			}, {
				text : 'Complete',
				scope : this,
				handler : function() {
					this.setText('Complete');
					this.fireEvent('complete');
				}
			}, {
				text : 'Custom',
				scope : this,
				handler : function() {
					this.setText('Custom');
					this.fireEvent('custom');
				}
			} ]
		});
		this.callParent();
	}
});