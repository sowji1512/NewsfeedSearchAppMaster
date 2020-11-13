package com.articles.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint{
public static final Logger logger=LoggerFactory.getLogger(JwtAuthEntryPoint.class); 
	
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException Ex)
			throws IOException, ServletException {
		logger.error("Unauthorized error.message->{}",Ex.getMessage());
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Error->Unauthorized");
		
	}

}
	