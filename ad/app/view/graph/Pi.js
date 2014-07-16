Ext.define('AD.view.graph.Pi', {
	extend : 'Ext.chart.Chart',
	alias : 'widget.graph_pi',
	style: 'background:#fff',
	requires : ['AD.store.graph.PieGraphStore'],
    animate: true,
    shadow: true,
    theme: 'Base:gradients',
    width : 450,
	height : 450,
    legend: {
        position: 'right'
    },
	initComponent : function() {
		this.store = new AD.store.graph.PieGraphStore();
		var recs = [];
		for( var field in this.config.data ){
			var rec = {};
			rec.name = field;
			rec.data = this.config.data[field];
			recs[recs.length] = rec;
		}
		this.store.loadData(recs);
		this.series =  [{
	        type: 'pie',
	        angleField: 'data',
	        showInLegend: true,
	        tips: {
	            trackMouse: true,
	            width: 140,
	            height: 28,
	            renderer: function(storeItem, item,store) {
	                // calculate and display percentage on hover
	                var total = 0;
	                storeItem.store.each(function(rec) {
	                    total += rec.get('data');
	                });
	                this.setTitle(storeItem.get('name') + ': '+storeItem.get('data')+'-' + Math.round(storeItem.get('data') / total * 100) + '%');
	            }
	        },
	        highlight: {
	            segment: {
	                margin: 20
	            }
	        },
	        label: {
	            field: 'name',
	            display: 'rotate',
	            contrast: true,
	            font: '18px Arial'
	        }
	    }];
		
		
		
		this.callParent();
	}
});