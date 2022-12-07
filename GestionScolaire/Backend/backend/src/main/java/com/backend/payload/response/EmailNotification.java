package com.backend.payload.response;

public class EmailNotification {

    private String subject;
    private String emailAddress;
    private String message;
    

    public EmailNotification( String emailAddress, String message, String subject) {
        super();
        this.subject = subject;
        this.emailAddress = emailAddress;
        this.message = message;
    }
    
    
    public EmailNotification() {
        super();
    }


    public String getSubject() {
        return subject;
    }


    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getEmailAddress() {
        return emailAddress;
    }
    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

}