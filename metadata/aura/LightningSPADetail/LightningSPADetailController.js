({
	populatedetail: function(component, event, helper) {
                var selected = event.getParam("saccount");
                component.set("v.actdetail",selected);
	},

        refreshdetail:function(component, event, helper) {
                var selected = event.getParam("actsave");
                component.set("v.actdetail",selected);
        },

	delete :function(component, event, helper) {
                var delaccount = component.get("v.actdetail");
                var deleteEvent = $A.get("e.c:deleteAccountCard");
                deleteEvent.setParams({ "deleteacct": delaccount });
                deleteEvent.fire();
	},

	back:function(component,event,helper) {
		var mainEvent = $A.get("e.c:mainNavigator");
        mainEvent.fire();
	},

	edit:function(component, event, helper) {

                var editaccount = component.get("v.actdetail");
                //Looks like a bug to me that response ignores and does not return field keys when value is null
                if($A.util.isUndefined(editaccount.Description)){
                     editaccount.Description='';   
                }
                if($A.util.isUndefined(editaccount.Phone)){
                      editaccount.Phone='';   
                }  
                if($A.util.isUndefined(editaccount.Fax)){
                     editaccount.Fax='';    
                }
                var editEvent = $A.get("e.c:editAccount");
                editEvent.setParams({ "actedit": editaccount });
                editEvent.fire();
	},

})