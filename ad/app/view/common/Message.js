Ext.define('AD.view.common.Message', {
	msgCt : null,
	createBox : function(t, s) {
		return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
	},
	msg : function(title, format) {
		if ( this.msgCt == null) {
			this.msgCt = Ext.core.DomHelper.insertFirst(document.body, {
				id : 'msg-div',
				style:'position:absolute;z-index:10000;background-color:#51A0F5;text-align:center'
			}, true);
		}
		var s = Ext.String.format.apply(String, Array.prototype.slice.call(
				arguments, 1));
		var m = Ext.core.DomHelper.append(this.msgCt, this.createBox(title, s), true);
		m.hide();
		m.slideIn('t').ghost("t", {
			delay : 1000,
			remove : true
		});
	}
});