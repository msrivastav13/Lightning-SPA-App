({
	select : function(component, event, helper) {
        var account = component.get("v.act");
        var selectEvent = $A.get("e.c:selectAccount");
        selectEvent.setParams({ "saccount": account });
        selectEvent.fire();
	},
})