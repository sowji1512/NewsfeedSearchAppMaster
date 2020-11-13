package com.articles.entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtResponse {
	public JwtResponse() {
		super();
		
	}

	private String token;
	private long id;
	private String type = "Bearer";
	private String username;
	private Collection<? extends GrantedAuthority> authorities;

	public JwtResponse(String accessToken,long id, String username, Collection<? extends GrantedAuthority> authorities) {
		this.token = accessToken;
		this.id=id;
		this.username = username;
		this.authorities = authorities;
	}
	
	public JwtResponse(String accessToken,long id, String username) {
		this.token = accessToken;
		this.id=id;
		this.username = username;
		
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}
	
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
   
}

