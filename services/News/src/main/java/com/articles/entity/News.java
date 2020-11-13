package com.articles.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table
public class News {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	private String title;

	private String description;

	private String url;
	
	private String urlToImage;


	private boolean bookmark;

	private boolean favourite;

	@ManyToOne
	@JoinColumn(name="userId")
	private Users user;

	@Override
	public String toString() {
		return "News [id=" + id + ", title=" + title + ", description=" + description + ", url=" + url + ", urlToImage="
				+ urlToImage + ", bookmark=" + bookmark + ", favourite=" + favourite + ", user=" + user + "]";
	}

	public News() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUrlToImage() {
		return urlToImage;
	}

	public void setUrlToImage(String urlToImage) {
		this.urlToImage = urlToImage;
	}

	public boolean isBookmark() {
		return bookmark;
	}

	public void setBookmark(boolean bookmark) {
		this.bookmark = bookmark;
	}

	public boolean isFavourite() {
		return favourite;
	}

	public void setFavourite(boolean favourite) {
		this.favourite = favourite;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	


	

}
