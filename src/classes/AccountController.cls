public with sharing class AccountController{
   
   @AuraEnabled
   public static list<Account> lstaccounts(){
      list<Account> lst=[Select Id,Name,Description,Phone,Fax from Account order by createdDate DESC limit 100];
      return lst;
   }
   
   @AuraEnabled
    public static Account deleteAccount(Account acc) {
        delete acc;
        return acc;
    }
    
    @AuraEnabled
    public static Account saveAccount(Account acc) {
        upsert acc;
        return acc;
    }

}