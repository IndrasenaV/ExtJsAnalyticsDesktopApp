Ext.define( 'AD.controller.Admin', {
	extend : 'Ext.app.Controller',
	refs : [ { ref : 'adminPanel', selector : 'adminmain'},{ ref : 'memberForm', selector:'admin_memberinfo'}],
	init : function(){
		
		this.control({
			'admin_memberinfo button[action=save]' : {
			click : this.saveClicked
		},
		'admin_memberinfo button[action=changePassword]' : {
			click : this.resetPasswordClicked
		}
		});
		
	
	},
	saveClicked : function(event){
		this.getAdminPanel().submit({ method : 'POST'});
	},
	resetPasswordClicked : function(event){
		this.getMemberForm().showPasswordPopup();
	}
});