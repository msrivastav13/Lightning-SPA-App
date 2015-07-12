({
	doinit: function(component, event, helper) {
		var toggleText = component.find("detailView");
		$A.util.addClass(toggleText,'toggle');
		var toggleText = component.find("editview");
		$A.util.addClass(toggleText,'toggle');
		helper.getAccounts(component);
	},

	navigate:function(component,event,helper) {
		var toggleText = component.find("listview");
		$A.util.addClass(toggleText,'toggle');
		var toggleText = component.find("detailView");
		$A.util.removeClass(toggleText,'toggle');
		helper.hidenewBtn(component, event);
		var toggleText = component.find("editview");
		$A.util.addClass(toggleText,'toggle');
	},

	deleterec:function(component,event,helper) {
		helper.deleteAccounts(component,event);
	},

	mainnavigate:function(component,event,helper) {
		var toggleText = component.find("listview");
		$A.util.removeClass(toggleText,'toggle');
		var toggleText = component.find("detailView");
		$A.util.addClass(toggleText,'toggle');
		var toggleBtn= component.find("Newbtn");
		$A.util.addClass(toggleBtn,'btn btn-primary btn-lg btn-block');
		$A.util.removeClass(toggleBtn,'toggle');
	},

	editnavigate:function(component,event,helper) {
		var toggleText = component.find("editview");
		$A.util.removeClass(toggleText,'toggle');
		var toggleText = component.find("detailView");
		$A.util.addClass(toggleText,'toggle');
		helper.hidenewBtn(component, event);
	},

	detailnavigate:function(component,event,helper) {
		helper.upsertAcc(component,event);
	},

	newAcc:function(component, event, helper) {
		var toggleText = component.find("editview");
		$A.util.removeClass(toggleText,'toggle');
		var toggleText = component.find("detailView");
		$A.util.addClass(toggleText,'toggle');
		var toggleText = component.find("listview");
		$A.util.addClass(toggleText,'toggle');
		helper.hidenewBtn(component, event);
		var newAccountvar = {
	    	"Name":"",
	    	"Description":"",
	    	"Fax":"",
	    	"Phone":"",
	    	"Id":null,
	        "sobjectType":"Account"
		};
		var newAccount = $A.get("e.c:newAccount");
        newAccount.setParams({ "actnew": newAccountvar });
        newAccount.fire();
    },

    showSpinner : function (component, event, helper) {
        var spinner = component.find('spinner');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : true });
        evt.fire();    
    },
    
    hideSpinner : function (component, event, helper) {
       var spinner = component.find('spinner');
       var evt = spinner.get("e.toggle");
       evt.setParams({ isVisible : false });
       evt.fire();    
    }

})