Ext.define('AD.view.graph.VerticalBar', {
	extend : 'Ext.chart.Chart',
	alias : 'widget.graph_verticalBar',
	style: 'background:#fff',
    animate: true,
    shadow: true,
    theme: 'Category1',
    width : 450,
	height : 450,
    legend: {
        position: 'right'
    },
   
	initComponent : function() {

		this.title = this.config.title;

		this.store = Ext.create('Ext.data.JsonStore', {
			fields : this.config.fields
		});
		var recs = [];
		for( var i=0;i<this.config.data.length;i++){
			var row = this.config.data[i];
			recs[recs.length] = row;
		}
		this.store.loadData(recs);
		
		this.axes = [ {
			type : 'Numeric',
			position : 'left',
			fields : this.config.fields,
			title : false,
			grid : true
		}, {
			type : 'Category',
			position : 'bottom',
			fields : [ this.config.xField ],
			title : false
		} ];
		this.series = [ {
			type : 'column',
			axis : 'left',
			gutter : 80,
			xField : this.config.xField,
			yField : this.config.yFields,
			stacked : true,
			tips : {
				trackMouse : true,
				width : 65,
				height : 28,
				renderer : function(storeItem, item) {
					this.setTitle(String(item.value[1]));
				}
			}
		} ];
		this.callParent();
	}
});