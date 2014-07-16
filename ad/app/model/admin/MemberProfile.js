Ext.define('AD.model.admin.MemberProfile', {
	extend : 'Ext.data.Model',
	fields : ['firstName', 'lastName','website', 'email', 'company','phoneNumber'],
	proxy : {
	 url : rootContext + '/admin/getMemberProfile.json',
	 type :'ajax',
	 reader : {
	 type : 'json',
	 root : 'result'
}
}
});