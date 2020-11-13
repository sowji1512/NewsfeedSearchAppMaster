package com.articles.entity;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;



@Entity
public class Users {

	@Id
	 @GeneratedValue(strategy=GenerationType.IDENTITY)
	 long id;
	
	@NotBlank(message="email is required")
	@Email
	@Size(min = 10, max = 30, message = "Email should be between 10 to 30 characters")
	private String email;
	@NotBlank(message="name is required")
	@Size(min = 2, max = 20, message = "Name should be between 2 to 20 characters")
	private String name;
	@NotBlank(message="password is required")
	@Size(min=6)
	private String password;
	
	@NotNull(message = "Role is required")
	int roles;
	
	private boolean activeStatus; 

	public boolean isActiveStatus() {
		return activeStatus;
	}

	public void setActiveStatus(boolean activeStatus) {
		this.activeStatus = activeStatus;
	}

	public Users( String email,String name, String password,int roles,boolean activeStatus) {
		
		
		this.email = email;
		this.name = name;
		this.password = password;
		this.roles=roles;
		this.activeStatus=activeStatus;
	}
	

	public Users() {
	
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getRoles() {
		return roles;
	}

	public void setRoles(int roles) {
		this.roles = roles;
	}
	
	@Override
	public String toString() {
		return "User [email=" + email + ", name=" + name + ", password=" + password + "]";
	}
}

