package com.backend.service;

import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.backend.payload.response.EmailNotification;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailSenderService {
	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private AuthService authService;
	@Value("${gestionScol.frontendUrl}")
	String url;

	public boolean sendForgetPasswordMail(EmailNotification emailNotification) {
		boolean isSent = false;
		if(authService.getUser(emailNotification.getEmailAddress()) != null)
		{
			try {
				MimeMessage message = javaMailSender.createMimeMessage();
				MimeMessageHelper helper = new MimeMessageHelper(message, true);
				helper.setTo(emailNotification.getEmailAddress());
				helper.setSubject(emailNotification.getSubject());
				helper.setText(emailNotification.getMessage(), true);
				Multipart multipart = new MimeMultipart("alternative");
				MimeBodyPart htmlPart = new MimeBodyPart();
				htmlPart.setContent(emailNotification.getMessage(), "text/html;");
				multipart.addBodyPart(htmlPart);
				message.setContent(multipart);
				javaMailSender.send(message);
				isSent = true;
			} catch (Exception e) {
				log.error("Cannot forget password mail", e);
			}
		}
		return isSent;
	}
}