package com.articles.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;


@Entity
public class  Search
{
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private int sid;
@NotBlank(message="keyword is required")
private String keyword;

@ManyToOne
@JoinColumn(name="userId")
private Users user;

@CreationTimestamp
private LocalDateTime creationDate;


public Search() {
	
}



public int getSid() {
	return sid;
}

public void setSid(int sid) {
	this.sid = sid;
}

public String getKeyword() {
	return keyword;
}

public void setKeyword(String keyword) {
	this.keyword = keyword;
}
public Search( String keyword, Users user) {
	
	
	this.keyword = keyword;
	this.user = user;
}

public LocalDateTime getCreationDate() {
	return creationDate;
}

public void setCreationDate(LocalDateTime creationDate) {
	this.creationDate = creationDate;
}

public Users getUser() {
	return user;
}

public void setUser(Users user) {
	this.user = user;
}

}
