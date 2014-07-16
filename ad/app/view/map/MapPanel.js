Ext
		.define(
				'AD.view.map.MapPanel',
				{
					extend : 'Ext.Panel',
					alias : 'widget.map_mappanel',
					layout : 'fit',
					initComponent : function() {
						this.callParent();
						this.on('render', this.drawMap, this);
					},
					drawMap : function() {
						this.mapDiv = this.body.dom;

						this.map = new esri.Map(this.mapDiv);
						this.tiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(
								"http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer");
						this.map.addLayer(this.tiledMapServiceLayer);
						this.map.parent = this;
						dojo.connect(this.map, "onLoad", function() {
							this.parent.drawPoints();
							 dojo.connect(this.parent.map, "onClick", this.parent.showLabels);
						});

					},
					showLabels : function(evt){
						
						var map = this.map;
						 map.graphics.clear();
					      var point = evt.mapPoint;
					      var symbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND);
					      var graphic = new esri.Graphic(point, symbol);
					      var outSR = new esri.SpatialReference({ wkid: 102113});
					      map.graphics.add(graphic);

					      gsvc.project([ graphic ], outSR, function(features) {
					        pt = features[0].geometry;
					        graphic.setInfoTemplate(new esri.InfoTemplate("Coordinates",
					          "<p>&nbsp;X: " + pt.x +
					          "<br/>&nbsp;Y: " + pt.y +
					          "</p>"  +
					          "<input type='button' value='Convert back to LatLong' onclick='projectToLatLong();' />" +
					          "<div id='latlong'></div>"));
					        map.infoWindow
					          .setTitle(graphic.getTitle())
					          .setContent(graphic.getContent())
					          .show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
					      });
					},
					drawPoints : function(){
						
						
						var globalSpatial = new esri.SpatialReference({
							wkid : 4326
						});
						var centerPoint = new esri.geometry.Point(-101.767578,36.7828,globalSpatial);
						
						this.map.centerAndZoom(centerPoint, 3);
						var multiPoint = new esri.geometry.Multipoint(
								globalSpatial);
						for(var i=0;i<this.config.latLngData.length;i++){
							var rec = this.config.latLngData[i];
							var point = new esri.geometry.Point(rec.lat,rec.lng,globalSpatial);
							multiPoint.addPoint(point);
						}
						
						
						var multiPointMarker = new esri.symbol.SimpleMarkerSymbol()
								.setStyle(
										esri.symbol.SimpleMarkerSymbol.STYLE_X)
								.setSize(12);
						multiPointMarker.outline.setWidth(4).setColor("blue");
						var pointGraphic = new esri.Graphic(multiPoint,
								multiPointMarker);
						pointGraphic.setInfoTemplate(new esri.InfoTemplate("Coordinates",
						          "<p>&nbsp;X: " + pt.x +
						          "<br/>&nbsp;Y: " + pt.y +
						          "</p>"  +
						          "<div id='latlong'></div>"));
						this.map.graphics.add(pointGraphic);
					}

				});