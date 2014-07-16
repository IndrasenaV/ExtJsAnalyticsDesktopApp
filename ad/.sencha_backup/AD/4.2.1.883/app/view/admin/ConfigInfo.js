Ext.define('AD.view.admin.ConfigInfo', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.adminmain',
    requires : [ 'AD.view.admin.MemberInfo','AD.view.admin.SystemInfo'],
    layout: {
        type: 'column'
    },
    cm : [
          { name : ''}],
    width : 800,
    defaults : {
    	columnWidth : 0.5
    },
	initComponent : function() {
		this.items = [ { xtype : 'admin_memberinfo' },
		               { xtype : 'admin_systeminfo'}];
		this.callParent();
	}
});