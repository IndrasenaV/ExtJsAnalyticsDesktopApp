Ext
		.define(
				'AD.service.BaseService',
				{

					processRequest : function(controllerName, methodName,
							config) {
						var loadMask = null;
						if (config.loadMaskMessage != 'undefined'
								&& config.loadMaskMessage != null) {
							var el = config.loadMaskEl;
							if (el == undefined || el == null) {
								el = Ext.getBody();
							}
							loadMask = new Ext.LoadMask(el, {
								msg : config.loadMaskMessage
							});
							loadMask.show();
						}
						var timeout = 300000;
						if (config.timeout != undefined) {
							timeout = config.timeout;
						}
						if (config.loadMask == undefined) {
							config.loadMask = loadMask;
						}
						var url = rootAjaxUrl + controllerName + '/' + methodName
								+ '.json';
						Ext.Ajax
								.request({
									url : url,
									timeout : timeout,
									success : function(response, request) {
										try {
											var responseObject = Ext
													.decode(response.responseText);

										} catch (e) {
											console.log(e);
											if (config.loadMask != 'undefined'
													&& config.loadMask != null) {
												config.loadMask.hide();
											}
											var msg = 'Server error while processing the request, please try again.';

											if (response.responseText
													.indexOf('notAuthorized') != -1) {
												msg = 'Session timeout occured.  Please login again.';
												var win = Ext
														.create('AD.view.admin.Login');
												win.show();
												return;
											}

											Ext.MessageBox.show({
												title : 'Error',
												msg : msg,
												buttons : Ext.MessageBox.OK,
												icon : Ext.Msg.ERROR
											});

											return;
										}

										if (config.loadMask != undefined
												&& config.loadMask != null) {
											config.loadMask.hide();
										}
										if (responseObject.success) {
											config.success.call(this,
													responseObject.result);
										} else {
											config.failure.call(this,
													responseObject.result);
										}

									},
									failure : function(response, request) {
										if (config.loadMask != 'undefined'
												&& config.loadMask != null) {
											config.loadMask.hide();
										}

										Ext.MessageBox
												.show({
													title : 'Error',
													msg : 'Server error while processing the request, please try again.',
													buttons : Ext.MessageBox.OK,
													icon : Ext.Msg.ERROR
												});

										if (config.failure != undefined) {
											config.failure.call(this);
										}
									},
									method : 'POST',
									jsonData : Ext.encode(config.args),
									scope : config.scope
								});
					}
				});
