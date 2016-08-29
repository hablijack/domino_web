/* 

var MailListener = require("mail-listener");
 
var mailListener = new MailListener({
  username: "imap-username",
  password: "imap-password",
  host: "imap-host",
  port: 993, // imap port 
  secure: true, // use secure connection 
  mailbox: "INBOX", // mailbox to monitor 
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time 
  fetchUnreadOnStart: true // use it only if you want to get all unread email on lib start. Default is `false` 
});
 
mailListener.start();
 
mailListener.on("server:connected", function(){
  console.log("imapConnected");
});
  
mailListener.on("mail:arrived", function(id){
  console.log("new mail arrived with id:" + id);
});

*/
