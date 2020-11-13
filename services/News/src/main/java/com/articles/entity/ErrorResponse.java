package com.articles.entity;

public class ErrorResponse {

	

	
	private String errorMessage;
	private int reasonCode;

	public String getErrorMessage() {
		return errorMessage;
	}

	public ErrorResponse() {
	
	}

	public ErrorResponse( int reasonCode) {
	
		
		this.reasonCode = reasonCode;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public int getReasonCode() {
		return reasonCode;
	}

	public ErrorResponse(String errorMessage, int reasonCode) {
		super();
		this.errorMessage = errorMessage;
		this.reasonCode = reasonCode;
	}

	public void setReasonCode(int reasonCode) {
		this.reasonCode = reasonCode;
	}

	

}
