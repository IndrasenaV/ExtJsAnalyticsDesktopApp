Ext.QuickTips.init();

Ext.form.VTypes['alphanumwithdashVal'] =   /^[A-Za-z\-0-9]*$/;
Ext.form.VTypes['alphanumwithdashMask'] = /[A-Za-z\-0-9]/;
Ext.form.VTypes['alphanumwithdashText'] = 'Invalid Entry: Only characters, numbers and \'-\' are allowed.';
Ext.form.VTypes['alphanumwithdash'] = function(val) {
     return Ext.form.VTypes['alphanumwithdashVal'].test(val);
};

Ext.form.VTypes['alphanumspacewithdashVal'] =   /^[A-Za-z\s\-0-9]*$/;
Ext.form.VTypes['alphanumspacewithdashMask'] = /[A-Za-z\s\-0-9]/;
Ext.form.VTypes['alphanumspacewithdashText'] = 'Invalid Entry: Only characters, numbers, space and \'-\' are allowed.';
Ext.form.VTypes['alphanumspacewithdash'] = function(val) {
     return Ext.form.VTypes['alphanumspacewithdashVal'].test(val);
};

Ext.form.VTypes['alphanumwithspaceVal'] =   /^[A-Za-z\s0-9]*$/;
Ext.form.VTypes['alphanumwithspaceMask'] = /[A-Za-z0-9\s]/;
Ext.form.VTypes['alphanumwithspaceText'] = 'Invalid Entry: Only characters, numbers and space are allowed.';
Ext.form.VTypes['alphanumwithspace'] = function(val) {
     return Ext.form.VTypes['alphanumwithspaceVal'].test(val);
};

Ext.form.VTypes['alphawithspaceVal'] =   /^[A-Za-z\s]*$/;
Ext.form.VTypes['alphawithspaceMask'] = /[A-Za-z\s]/;
Ext.form.VTypes['alphawithspaceText'] = 'Invalid Entry: Only characters, numbers and space are allowed.';
Ext.form.VTypes['alphawithspace'] = function(val) {
     return Ext.form.VTypes['alphawithspaceVal'].test(val);
};

Ext.form.VTypes['alphawithspacehyphenVal'] =   /^[A-Za-z\s\-]*$/;
Ext.form.VTypes['alphawithspacehyphenMask'] = /[A-Za-z\s\-]/;
Ext.form.VTypes['alphawithspacehyphenText'] = 'Invalid Entry: Only characters, space and hyphen are allowed.';
Ext.form.VTypes['alphawithspacehyphen'] = function(val) {
     return Ext.form.VTypes['alphawithspacehyphenVal'].test(val);
};

Ext.form.VTypes['alphawithspacehyphendotVal'] =   /^[A-Za-z.\s\-]*$/;
Ext.form.VTypes['alphawithspacehyphendotMask'] = /[A-Za-z.\s\-]/;
Ext.form.VTypes['alphawithspacehyphendotText'] = 'Invalid Entry: Only characters, space, dot and hyphen are allowed.';
Ext.form.VTypes['alphawithspacehyphendot'] = function(val) {
     return Ext.form.VTypes['alphawithspacehyphendotVal'].test(val);
};

Ext.form.VTypes['alphanumwithspacehyphendotVal'] =   /^[A-Za-z0-9.\s\-]*$/;
Ext.form.VTypes['alphanumwithspacehyphendotMask'] = /[A-Za-z0-9.\s\-]/;
Ext.form.VTypes['alphanumwithspacehyphendotText'] = 'Invalid Entry: Only characters, numbers, space, dot and hyphen are allowed.';
Ext.form.VTypes['alphanumwithspacehyphendot'] = function(val) {
     return Ext.form.VTypes['alphanumwithspacehyphendotVal'].test(val);
};

Ext.form.VTypes['alphanumwithspacehyphenVal'] =   /^[A-Za-z0-9\s\-]*$/;
Ext.form.VTypes['alphanumwithspacehyphenMask'] = /[A-Za-z0-9\s\-]/;
Ext.form.VTypes['alphanumwithspacehyphenText'] = 'Invalid Entry: Only Number, Characters, space and hyphen are allowed.';
Ext.form.VTypes['alphanumwithspacehyphen'] = function(val) {
     return Ext.form.VTypes['alphanumwithspacehyphenVal'].test(val);
};

Ext.form.VTypes['addresslineVal'] =   /^[A-Za-z0-9.\s\#\-\/]*$/;
Ext.form.VTypes['addresslineMask'] = /[A-Za-z0-9.\s\#\-\/]/;
Ext.form.VTypes['addresslineText'] = 'Invalid Entry: Only characters, numbers, space, dot, hash and hyphen are allowed.';
Ext.form.VTypes['addressline'] = function(val) {
     return Ext.form.VTypes['addresslineVal'].test(val);
};



Ext.form.VTypes['numwithdashVal'] =   /^[0-9\-]*$/;
Ext.form.VTypes['numwithdashMask'] = /[0-9\-]/;
Ext.form.VTypes['numwithdashText'] = 'Invalid Entry: Only numbers. and - is allowed';
Ext.form.VTypes['numwithdash'] = function(val) {
     return Ext.form.VTypes['numwithdashVal'].test(val);
};

Ext.form.VTypes['numwithhyphenVal'] =   /^[0-9\-]*$/;
Ext.form.VTypes['numwithhyphenMask'] = /[0-9\-]/;
Ext.form.VTypes['numwithhyphenText'] = 'Invalid Entry: Only numbers allowed';
Ext.form.VTypes['numwithhyphen'] = function(val) {
     return Ext.form.VTypes['numwithhyphenVal'].test(val);
};

Ext.form.VTypes['numwithslashVal'] =   /^[0-9\/]*$/;
Ext.form.VTypes['numwithslashMask'] = /[0-9\/]/;
Ext.form.VTypes['numwithslashText'] = 'Invalid Entry: Only numbers. and \ is allowed';
Ext.form.VTypes['numwithslash'] = function(val) {
     return Ext.form.VTypes['numwithslashVal'].test(val);
};

Ext.form.VTypes['numVal'] =   /^[0-9]*$/;
Ext.form.VTypes['numMask'] = /[0-9]/;
Ext.form.VTypes['numText'] = 'Invalid Entry: Only numbers is allowed';
Ext.form.VTypes['num'] = function(val) {
     return Ext.form.VTypes['numVal'].test(val);
};

Ext.form.VTypes['countyVal'] =   /^[A-Za-z0-9.\s\-\(\)]*$/;
Ext.form.VTypes['countyMask'] = /[A-Za-z0-9.\s\-\(\)]/;
Ext.form.VTypes['countyText'] = 'Invalid Entry: Only characters, numbers, space, dot, hyphen and braces are allowed.';
Ext.form.VTypes['county'] = function(val) {
     return Ext.form.VTypes['countyVal'].test(val);
};

Ext.form.VTypes['directionVal'] =   /^[a-zA-Z]*$/;
Ext.form.VTypes['directionMask'] = /^[a-zA-Z]/;
Ext.form.VTypes['directionText'] = 'Invalid Entry: Only characters are allowed.';
Ext.form.VTypes['direction'] = function(val) {
     return Ext.form.VTypes['directionVal'].test(val);
};

Ext.form.VTypes['businessnameVal'] =   /^[A-Za-z0-9.\s\-\&]*$/;
Ext.form.VTypes['businessnameMask'] = /[A-Za-z0-9.\s\-\&]/;
Ext.form.VTypes['businessnameText'] = 'Invalid Entry: Only characters, numbers, space, dot, amp and hyphen are allowed.';
Ext.form.VTypes['businessname'] = function(val) {
     return Ext.form.VTypes['businessnameVal'].test(val);
};

Ext.form.VTypes['companynameVal'] =   /^[A-Za-z0-9.\s\-\&]*$/;
Ext.form.VTypes['companynameMask'] = /[A-Za-z0-9.\s\-\&]/;
Ext.form.VTypes['companynameText'] = 'Invalid Entry: Only characters, numbers, space, dot, amp and hyphen are allowed.';
Ext.form.VTypes['companyname'] = function(val) {
     return Ext.form.VTypes['companynameVal'].test(val);
};



Ext.namespace('AD.view.common.Validations');
AD.view.common.Validations.validateCopyPaste = function(fieldName,field,evt){
	
	var keyCode = evt.getKey();
 
		if ((evt.ctrlKey) && (keyCode == 86)) {
			evt.stopEvent(); // handle both preventDefault() and stopPropagation();
			Ext.MessageBox.show({
					title: 'Error', msg: "Please enter "+fieldName+" manually. Copy and paste is not allowed.",
					width: 450, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR, closable: false
			});
		}

	
};

AD.view.common.Validations.validateMandatoryFields = function(form){
	
	form.isValid();
	
	var obj = form.getFieldValues();
	
	var errorMessage="";
	
	for (field in obj) {
		var existingField = form.findField(
				field);
		if(existingField.allowBlank!=null && existingField.allowBlank!=undefined && existingField.allowBlank==false && existingField.getValue()==''){
			
			errorMessage=errorMessage+ "<ul> Invalid "+existingField.fieldLabel
			
		}
	}
	
	if(errorMessage.length>0){
		Ext.MessageBox.show({
			title: 'Error', msg: errorMessage,
			width: 200, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR, closable: false
		});
		return false;
	}
	
	return true;
	
};



