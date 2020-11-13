package com.articles.controller;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.assertj.core.util.Arrays;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.articles.entity.ErrorResponse;
import com.articles.entity.Search;
import com.articles.entity.Users;
import com.articles.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class NewsAdminSpringBootTest {

	private static final Logger LOGGER = LoggerFactory.getLogger(NewsAdminSpringBootTest.class);
	
	@Autowired
	TestRestTemplate restTemplate;
	
	@Autowired
	private UserRepository mUserRepo;
	
	
	String token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb3dqaTE1MTJAZ21haWwuY29tIiwiaWF0IjoxNTUxNjg5MTcwLCJleHAiOjE1ODMyMjUxNzB9.6FDKZ1sC6obzmjt-v0doMmAEswYTEN2RVL41tt9rgk9eM9N1EMqnVAtb0SROvJ-P7oZMdJTpqOyf5kR-VfmTng";
	

	@Test
	public void testForGetAllNewsAnalysts() {
		LOGGER.info("Test for getting all NewsAnalysts");
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(null,headers);
		ResponseEntity<Object[]> response = restTemplate.exchange("/api/admin/getAllAnalysts", HttpMethod.GET, entity, Object[].class);
		List<Object> list = Arrays.asList(response.getBody());
		LOGGER.info("Response->{}",list);
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
	}
	
	@Test
	public void testForGetAllActiveNewsAnalysts() {
		LOGGER.info("Test for getting all NewsAnalysts");
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(null,headers);
		ResponseEntity<Object[]> response = restTemplate.exchange("/api/admin/getAllActiveAnalysts", HttpMethod.GET, entity, Object[].class);
		List<Object> list = Arrays.asList(response.getBody());
		LOGGER.info("Response->{}",list);
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
	}


	@Test
	public void testForGettingNewsAnalystByEmail(){
		LOGGER.info("Test for getting NewsAnalyst by email");
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(null,headers);
		ResponseEntity<Users> response = restTemplate.exchange("/api/admin/getAnalyst/{id}", 
				HttpMethod.GET, entity, Users.class, 19);
		LOGGER.info("Response->{}",response.getBody());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
	}
	

	@Test
	public void testForBlackListNewsAnalyst(){
		LOGGER.info("Test to block NewsAnalyst");
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(null,headers);
		ResponseEntity<Boolean> response = restTemplate.exchange("/api/admin/blacklist/{id}", 
				HttpMethod.GET, entity, Boolean.class,17);
		assertThat(response.getBody(),equalTo(true));
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
	}
	
	
	
	@Test
	public void testForReactivatingNewsAnalyst(){
		LOGGER.info("Test for Reactivating blocked analyst");
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(null,headers);
		ResponseEntity<Boolean> response = restTemplate.exchange("/api/admin/reactivate/{id}", 
				HttpMethod.GET, entity, Boolean.class,17);
		assertThat(response.getBody(),equalTo(true));
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
	}
	
	@Test
	public void testForAddingSearchedWords(){
		LOGGER.info("Test for adding Searched keywords");
		Users user=mUserRepo.findByEmail("sowjanyamaguluri@gmail.com");
		Search search = new Search("jimin",user);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(search,headers);
		ResponseEntity<ErrorResponse> response = restTemplate.exchange("/api/auth/saveSearches", HttpMethod.POST, entity, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody());
		assertThat(response.getBody().getErrorMessage(),containsString("Error:Access is denied"));
	}
}
