Ext.define('AD.view.admin.MemberInfo', {
	extend : 'Ext.form.Panel',
	title : 'User Information',
	alias : 'widget.admin_memberinfo',
	requires : [ 'AD.model.admin.MemberProfile' ],
	style : 'margin: 30px',
	defaults : {
		cls : 'field-margin'
	},
	initComponent : function() {
		this.items = [ {
			xtype : 'textfield',
			fieldLabel : 'First Name',
			name : 'firstName'
		}, {
			xtype : 'textfield',
			fieldLabel : 'Last Name',
			name : 'lastName'
		}, {
			xtype : 'textfield',
			fieldLabel : 'Email',
			name : 'email'
		}, {
			xtype : 'textfield',
			fieldLabel : 'Website',
			name : 'website'
		}, {
			xtype : 'textfield',
			fieldLabel : 'Company Name',
			name : 'company'
		}, {
			xtype : 'textfield',
			fieldLabel : 'Phone Number',
			name : 'phoneNumber'
		} ];
		this.buttons = [ {
			xtype : 'button',
			action : 'save',
			text : 'Save'
		}, {
			xtype : 'button',
			action : 'changePassword',
			text : 'Change Password'
		} ];
		this.buttonAlign = 'center';

		this.callParent();
		this.on('render', this.loadFromBackend, this);
	},
	loadFromBackend : function() {
		var MemberProfile = Ext.ModelMgr
				.getModel('AD.model.admin.MemberProfile');
		MemberProfile.load(1, {
			success : function(user) {
				this.getForm().loadRecord(user);
			},
			scope : this
		});

	},
	showPasswordPopup : function() {
		this.passwordChangeForm = Ext.create('Ext.form.Panel',{
			items : [{
				xtype : 'textfield',
				fieldLabel : 'Old Password*',
				inputType: 'password',
				name : 'oldPassword',
				allowBlank : false
			}, {
				xtype : 'textfield',
				fieldLabel : 'New Password*',
				inputType: 'password',
				name : 'newPassword',
				allowBlank : false
			}, {
				xtype : 'textfield',
				fieldLabel : 'Retype Password*',
				inputType: 'password',
				name : 'retypePassword',
				allowBlank : false
			} ]
		})
		this.passwordWindow =  Ext.create('Ext.window.Window', {
			title : 'Change Password',
			height : 200,
			width : 400,
			layout : 'form',
			defaults : {
				labelAlign : 'left',
				labelWidth : 190
			},
			items : [this.passwordChangeForm
			         ],
			buttons : [ {
				xtype : 'button',
				action : 'savePassword',
				handler : function() {
					if( this.passwordChangeForm.getForm().isValid() ){
						var rec = this.passwordChangeForm.getForm().getValues();
						if( rec.newPassword != rec.retypePassword){
							Ext.Msg.alert('Error','Password should match, please reenter new password and retype password');
							return;
						}
						ajaxService.processRequest('admin','changePassword',{
							args : rec,
							success : function(data){
								this.passwordWindow.hide();
							},
							failure : function(data){
								Ext.Msg.alert('Error','Current password didnot match, please retype the old password');
							},
							scope : this
						});
					}else{
						Ext.Msg.alert('Error','Please correct the above fields');
					}
					
				},
				scope : this,
				text : 'Save Password'
			} ]
		}).show();
	}
});