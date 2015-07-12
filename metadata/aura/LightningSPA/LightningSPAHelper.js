({
	getAccounts: function(component) {
       		var action = component.get("c.lstaccounts");
			var self = this;
			action.setCallback(this, function(response) {
			var state = response.getState();
				if (component.isValid() && state === "SUCCESS") {
					component.set("v.lstAccnts", response.getReturnValue());
				}else if (state === "ERROR") {
	                var errors = response.getError();
	                if (errors) {
	                    $A.logf("Errors", errors);
	                    if (errors[0] && errors[0].message) {
	                        $A.error("Error message: " +
	                                 errors[0].message);
	                    }
	                } else {
	                    $A.error("Unknown error");
	                }
            }
			});
			$A.enqueueAction(action);
		},

	deleteAccounts: function(component,event) {// Call the Apex controller and update the view in the callback
	    var action = component.get("c.deleteAccount");
	    var self = this;
	    var acctdeleted=event.getParam("deleteacct");
	    action.setParams({
	        "acc": acctdeleted
	    });
	    action.setCallback(this, function(response) {
	        var state = response.getState();
	        if (state === "SUCCESS") {
	            // Remove only the deleted expense from view
	            var lstacct = component.get("v.lstAccnts");
	            var items = [];
	            for (i = 0; i < lstacct.length; i++) {
	                if(lstacct[i]!==acctdeleted) {
	                    items.push(lstacct[i]);  
	                }
	            }
	            //console.log(items.length);
	            component.set("v.lstAccnts", items);
	            // Other client-side logic
	            var toggleText = component.find("listview");
				$A.util.removeClass(toggleText,'toggle');
				var toggleText = component.find("detailView");
				$A.util.addClass(toggleText,'toggle');
				var toggleBtn= component.find("Newbtn");
				$A.util.addClass(toggleBtn,'btn btn-primary btn-lg btn-block');
	        }else if (state === "ERROR") {
	                var errors = response.getError();
	                if (errors) {
	                    if (errors[0] && errors[0].pageErrors) {
	                    	console.log(errors[0].pageErrors);
	                        $A.createComponents([
							    ["ui:message",{
							        "title" : "Deletion Failed:",
							        "severity" : "error",
							    }],
							    ["ui:outputText",{
							        "value" : errors[0].pageErrors[0].message
							    }]
							    ],
								function(components) {
							        var message = components[0];
									var outputText = components[1];
									// set the body of the ui:message to be the ui:outputText
									message.set("v.body", outputText);
									component.set("v.messages", message);  
							        setTimeout(function() {
							        $A.run(function() {
							        	component.set("v.messages", []);                                       
							        });
							    }, 10000)
							    } )   
							}
	                } else {
	                    $A.error("Unknown error");
	                }
            	}
	    	});

	    	$A.enqueueAction(action);
	    },

	upsertAcc: function(component,event) {
	    var action = component.get("c.saveAccount");
		var saveaccount = event.getParam("actsave");
		console.log(saveaccount);
		action.setParams({
		"acc": saveaccount
		});
		action.setCallback(this, function(response) {
	        var state = response.getState();
	        //console.log(state);
	        if (state === "SUCCESS") {
	     
	           	var acctsave=response.getReturnValue();
				var lstacct = component.get("v.lstAccnts");
	    		var items = [];
	    		console.log(event.getParam("isupdate"));
	    		if(!event.getParam("isupdate")){
	     			items.push(acctsave); //Push to item list at top if its new component
	     		}

			    for (i = 0; i < lstacct.length; i++) {
			        if(lstacct[i].Id==acctsave.Id) {
			            items.push(acctsave);  
			        }else{
			        	items.push(lstacct[i]); 
			        }
			     }
				    component.set("v.lstAccnts", items);
					var toggleText = component.find("editview");
					$A.util.addClass(toggleText,'toggle');
					var toggleText = component.find("detailView");
					$A.util.removeClass(toggleText,'toggle');

		        }else if (state === "ERROR") {
	                var errors = response.getError();
	                if (errors[0] && errors[0].pageErrors) {
	                    	console.log(errors[0].pageErrors);
	                        $A.createComponents([
							    ["ui:message",{
							        "title" : "Deletion Failed:",
							        "severity" : "error",
							    }],
							    ["ui:outputText",{
							        "value" : errors[0].pageErrors[0].message
							    }]
							    ],
								function(components) {
							        var message = components[0];
									var outputText = components[1];
									// set the body of the ui:message to be the ui:outputText
									message.set("v.body", outputText);
									component.set("v.messages", message);  
							        setTimeout(function() {
							        $A.run(function() {
							        	component.set("v.messages", []);                                       
							        });
							    }, 10000)
							    } )   
							} else {
	                    $A.error("Unknown error");
	                }
            }
		    });
		    $A.enqueueAction(action);
	},

	hidenewBtn:function(component,event) {
		var toggleBtn= component.find("Newbtn");
		$A.util.removeClass(toggleBtn,'btn btn-primary btn-lg btn-block');
		$A.util.addClass(toggleBtn,'toggle');
	}

})