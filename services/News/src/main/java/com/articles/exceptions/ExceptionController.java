package com.articles.exceptions;


import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;


import com.articles.entity.ErrorResponse;


public class ExceptionController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionController.class);
	String defaultMessage;
	String test;
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleError(Exception ex) {
		LOGGER.info("handleError() execution started!");
		LOGGER.error(ex.getMessage(), ex);
		ErrorResponse error = new ErrorResponse();
		LOGGER.debug("Error -> {}", error);
		ResponseEntity<ErrorResponse> response=null;


		if (ex instanceof MethodArgumentNotValidException) 
		{
			MethodArgumentNotValidException exception = (MethodArgumentNotValidException) ex;
			String message = "";
			error.setReasonCode(HttpStatus.BAD_REQUEST.value());
			List<FieldError> errors = exception.getBindingResult().getFieldErrors();
			for (FieldError err : errors) {
				message += err.getDefaultMessage() + ", ";
			}
			message= message.substring(0, message.length() - 2);
			error.setErrorMessage(message);
			return new ResponseEntity<ErrorResponse>(error, HttpStatus.BAD_REQUEST);

		} 
		else if(ex instanceof ConstraintViolationException)
    	{
    		ConstraintViolationException constraintException =(ConstraintViolationException) ex;
    		Set<ConstraintViolation<?>> violations= constraintException.getConstraintViolations();
    		String errorMessage="Message: ";
    		for(ConstraintViolation<?> constraintViolation: violations )
    		{
    			errorMessage+=constraintViolation.getMessageTemplate()+", ";
    			
    		}
    		errorMessage=errorMessage.substring(0, errorMessage.length()-2);
    		error.setErrorMessage(errorMessage);
    		response=new ResponseEntity<ErrorResponse>(error, HttpStatus.BAD_REQUEST);
    	}
		else if(ex instanceof AuthenticationException)
    	{
    		AuthenticationException authenticationExp=(AuthenticationException) ex;
    		error.setErrorMessage(authenticationExp.getLocalizedMessage());
    		response= new ResponseEntity<ErrorResponse>(error, HttpStatus.BAD_REQUEST);
    	}
		else if(ex instanceof BadCredentialsException){
			BadCredentialsException bce = (BadCredentialsException) ex;
			return new ResponseEntity<ErrorResponse>(new ErrorResponse(HttpStatus.BAD_REQUEST.value()),HttpStatus.BAD_REQUEST);
		}
    	else if(ex instanceof IllegalArgumentException){
			IllegalArgumentException iae = (IllegalArgumentException) ex;
			error.setErrorMessage(iae.getMessage());
			error.setReasonCode(400);
			return new ResponseEntity<ErrorResponse>(error,HttpStatus.BAD_REQUEST);
		}
		else if(ex instanceof AccessDeniedException){
			AccessDeniedException ade = (AccessDeniedException) ex;
			error.setErrorMessage(ade.getMessage());
			error.setReasonCode(401);
			return new ResponseEntity<ErrorResponse>(error,HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
		}
		
		else if(ex instanceof InternalAuthenticationServiceException){
			InternalAuthenticationServiceException iase = (InternalAuthenticationServiceException) ex;
			error.setErrorMessage(iase.getMessage());
			error.setReasonCode(409);
			return new ResponseEntity<ErrorResponse>(error,HttpStatus.CONFLICT);
		}
		else if (ex instanceof HttpMediaTypeNotSupportedException) {
			HttpMediaTypeNotSupportedException he = (HttpMediaTypeNotSupportedException) ex;
			error.setErrorMessage("Content type not supported");
			error.setReasonCode(415);
			return new ResponseEntity<ErrorResponse>(error,HttpStatus.UNSUPPORTED_MEDIA_TYPE);
		}
		else if (ex instanceof HttpMessageNotReadableException) {
			HttpMessageNotReadableException he = (HttpMessageNotReadableException) ex;
			error.setErrorMessage("Content type not supported");
			error.setReasonCode(415);
			return new ResponseEntity<ErrorResponse>(error,HttpStatus.UNSUPPORTED_MEDIA_TYPE);
		}

    	else
    	{
    		error.setErrorMessage("System Error, Please Contact Administrator");
    		response=new ResponseEntity<ErrorResponse>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    	return response;
	}


}
