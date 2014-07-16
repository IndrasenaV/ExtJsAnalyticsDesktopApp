Ext.define('AD.view.admin.Login', {
	extend : 'Ext.window.Window',
	alias : 'widget.login_form',
	//requires : [ 'home.model.Register' ],
	style : 'margin: 50px',
	defaults : {
		cls : 'field-margin'
	},
	layout : {
		type : 'fit'
	},
	height : 250,
	width : 400,
	initComponent : function() {
		this.formPanel = new Ext.form.Panel({
			items : [
			         {xtype : 'textfield',
			 			fieldLabel : 'Email',
						name : 'email',
						allowBlank : false,
						vtype : 'email'
					}, {
						xtype : 'textfield',
						fieldLabel : 'Password',
						name : 'password',
						inputType: 'password',
						allowBlank : false
					}
			         ],
			buttons : [{
		        text: 'Login As Demo',
		        handler: this.handleDemoLogin,
		        scope : this
		    }, {
		        text: 'Login',
		        formBind: true, //only enabled once the form is valid
		        disabled: true,
		        handler: this.handleLogin,
		        scope : this
		    },
		    {
		        text: 'Register',
		        handler: this.handleRegister,
		        scope : this
		    }],
		    buttonAlign : 'center',
		    border : false
		});
		this.items = [ this.formPanel];
		this.callParent();
	},
	handleDemoLogin : function(){
		this.down('textfield[name=email]').setValue("demo1@demo.com");
		this.down('textfield[name=password]').setValue("demo");
		this.handleLogin();
	},
	handleLogin : function(){
		var form = this.formPanel.getForm();
        if (form.isValid()) {
            ajaxService.processRequest('admin','login',{
                success: function(data) {
                	if( data ){
                		var url = document.URL.replace('home.jsp','main.jsp');
                    	window.location = url;
                	}else{
                		 Ext.Msg.alert('Failed', "Email and password didnot match our records, please re-enter or register ");
                         
                	}
                	
                },
                args : this.formPanel.getForm().getValues(),
                scope : this,
                loadMaskEl : Ext.getBody(),
                loadMaskMessage : 'Logging in.... Please wait'
            });
        }
	},
	handleRegister : function(){
		var url = document.URL.replace('main.jsp','home.jsp');
		url = url + "?deepLink=Register"
    	window.location = url;
	}
});