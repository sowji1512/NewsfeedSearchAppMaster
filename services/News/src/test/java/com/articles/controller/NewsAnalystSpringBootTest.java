package com.articles.controller;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;

import org.junit.After;
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
import com.articles.entity.JwtResponse;
import com.articles.entity.Login;
import com.articles.entity.Search;
import com.articles.entity.SignupStatus;
import com.articles.entity.Users;
import com.articles.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)
public class NewsAnalystSpringBootTest {

	private static final Logger LOGGER = LoggerFactory.getLogger(NewsAnalystSpringBootTest.class);
	
	@Autowired
	TestRestTemplate restTemplate;
	
	@Autowired
	private UserRepository mUserRepo;
	
	static  int sid;
	String email="";
	String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXJ2YXRoaUBnbWFpbC5jb20iLCJpYXQiOjE1NTE2ODkxMjEsImV4cCI6MTU4MzIyNTEyMX0.YzZkezgU7O7WY1-AFIu_2sJui5bIkdgpOR6Bt8f03Lk9yzu8uZDw4kyT-F3-LUd0L7vmB1gMZw0Nqmss1CoGAQ";
	
	
//	@After
//	public void deletemail(){
//		LOGGER.info("Test for delete user by email");
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON);
//		headers.set("Authorization", "Bearer "+token);
//		HttpEntity<?> entity = new HttpEntity<Object>(null,headers);
//		ResponseEntity<?> response = restTemplate.exchange("/api/auth/deleteAnalyst/{email}", 
//				HttpMethod.DELETE, entity, Object.class, email);
//		LOGGER.info("Response->{}",response.getBody());
//	}

	
	
	@Test
	public void testForSuccessfulSignup() throws Exception {
		
		LOGGER.info("Test for successful signup");
		email = "sowjnayaram@"+new Random().nextInt(1000)+".com";
		Users user = new Users(email,"sowjanya1","123456",1,true);
		ResponseEntity<SignupStatus> response = restTemplate.postForEntity("/api/auth/signup", user, SignupStatus.class);
		LOGGER.info("Response->{}",response.getBody().isStatus());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
		assertThat(response.getBody().getError(),containsString("Registered Successfully"));
	}
	
	@Test
	public void testForEmailAlreadyExists() throws Exception {
		LOGGER.info("Test for Email already exists");
		Users user = new Users("sowjanyamaguluri@gmail.com","sowjanya","123456",1,true);
		ResponseEntity<SignupStatus> response = restTemplate.postForEntity("/api/auth/signup", user, SignupStatus.class);
		LOGGER.info("Response->{}",response.getBody().isStatus());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.CONFLICT));
		assertThat(response.getBody().getError(),containsString("Email already exists!"));
	}
	


	
	@Test
	public void testForEmptyEmail() throws Exception {
		LOGGER.info("Test for Empty Email");
		Users user = new Users("","sowjanya","123456",1,true);
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
		assertThat(response.getBody().getErrorMessage(),containsString("email is required"));
	}
	
	
	@Test
	public void testForInvalidEmail() throws Exception {
		LOGGER.info("Test for invalid Email");
		Users user = new Users("sowjanya1512gmail.com","sowjanya","123456",1,true);
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
		assertThat(response.getBody().getErrorMessage(),containsString("must be a well-formed email address"));
	}
	
	@Test
	public void testForMinEmail() throws Exception {
		LOGGER.info("Test for minimum email length");
		Users user = new Users("s@g.com","sowjanya","123456",1,true);
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
		assertThat(response.getBody().getErrorMessage(),containsString("Email should be between 10 to 30 characters"));
	}
	
	@Test
	public void testForMaxEmail() throws Exception {
		LOGGER.info("Test for maximumm email length");
		Users user = new Users("sowjanyamanojramlakshmishingyfsg@gmail.com","sowjanya","123456",1,true);
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
		assertThat(response.getBody().getErrorMessage(),containsString("Email should be between 10 to 30 characters"));
	}
	@Test
	public void testForMinAnalystName() throws Exception {
		LOGGER.info("Test for minimum length of NewsAnalyst name");
		Users user = new Users("sowjanya1512@gmail.com","i","123456",1,true);
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
		assertThat(response.getBody().getErrorMessage(),containsString("Name should be between 2 to 20 characters"));
	}
	
	@Test
	public void testForMaxAnalystName() throws Exception {
		LOGGER.info("Test for maximum length of Newsanalyst name");
		Users user = new Users("sowjanya1512@gmail.com","sowjanyaramsobhalakshmimanojvandanapravallika","123456",1,true);
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
		assertThat(response.getBody().getErrorMessage(),containsString("Name should be between 2 to 20 characters"));
	}
	
	@Test
	public void testForEmptyAnalystName() throws Exception {
		LOGGER.info("Test for empty NewsAnalyst name");
		Users user = new Users("sowjanya1512@gmail.com","","123456",1,true);
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
		assertThat(response.getBody().getErrorMessage(),containsString("name is required"));
	}
	
	@Test
	public void testForMinPassword() throws Exception {
		LOGGER.info("Test for minimum length of password");
		Users user = new Users("sowjanya1512@gmail.com","sowjanya","123",1,true);
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
		assertThat(response.getBody().getErrorMessage(),containsString("size must be between 6 and 2147483647"));
	}
	
	@Test
	public void testForEmptypassword() throws Exception {
		LOGGER.info("Test for empty password");
		Users user = new Users("sowjanya1512@gmail.com","sowjanya","",1,true);
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.BAD_REQUEST));
		assertThat(response.getBody().getErrorMessage(),containsString("password is required"));
	}
	
	@Test
	public void testForNoData() throws Exception {
		LOGGER.info("Test for sending empty data");
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/signup", null, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.UNSUPPORTED_MEDIA_TYPE));
		assertThat(response.getBody().getErrorMessage(),containsString("not supported"));

	}
	
	
	@Test
	public void testForInvalidloginCredentials(){
		LOGGER.info("Test for invalid credentials");
		Login user = new Login("sowjanyamaguluri@gmail.com","765543");
		ResponseEntity<ErrorResponse> response = restTemplate.postForEntity("/api/auth/authenticate", user, ErrorResponse.class);
		LOGGER.info("Response->{}",response.getBody().getErrorMessage());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.NOT_ACCEPTABLE));
		assertThat(response.getBody().getErrorMessage(),containsString("Bad credentials"));
	}
	
	
	@Test
	public void testForValidloginCredentials(){
		LOGGER.info("Test for invalid credentials");
		Login user = new Login("sowjanyamaguluri@gmail.com","123456");
		ResponseEntity<Object> response = restTemplate.postForEntity("/api/auth/authenticate", user, Object.class);
//		LOGGER.info("Response->{}",response.getBody());
		//assertThat(response.g,equalTo(HttpStatus.OK));
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
	}

	@Test
	public void testForAddSearchUnAuthorized(){
		LOGGER.info("Test for adding Searched keywords without authorization");
		Users user=mUserRepo.findByEmail("sowjanyamaguluri@gmail.com");
		Search search = new Search("jimin",user);
		ResponseEntity<Void> response = restTemplate.postForEntity("/api/auth/saveSearches",search,Void.class);
		LOGGER.info("Response->{}",response.getBody());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.UNAUTHORIZED));
	}
	

	
	@Test
	public void testForAddingSearchedAuthorized(){
		LOGGER.info("Test for adding Searched keywords");
		Users user=mUserRepo.findByEmail("sowjanyamaguluri@gmail.com");
		Search search = new Search("jimin",user);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(search,headers);
		ResponseEntity<Boolean> response = restTemplate.exchange("/api/auth/saveSearches", HttpMethod.POST, entity, Boolean.class);
		LOGGER.info("Response->{}",response.getBody());
		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
		assertThat(response.getBody(),equalTo(true));
	}
	
	

	
	
	@Test
	public void testForGetSearchListByEmail(){
		LOGGER.info("Test for getting searched list by email");
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(null,headers);
		ResponseEntity<List> response = restTemplate.exchange("/api/auth/SearchList/{id}", 
				HttpMethod.GET, entity, List.class, 19);

		LOGGER.info("Response->{}",response);
		sid = Integer.valueOf(((LinkedHashMap<String,Integer>)
				response.getBody().get(0)).get("sid"));
		LOGGER.info("Response->{}",sid);

		assertThat(response.getStatusCode(),equalTo(HttpStatus.OK));
	}
	@Test
	public void testForDeleteSearch(){
		LOGGER.info("Test for deleting Searched keywords");
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(null,headers);
		ResponseEntity<Boolean> response = restTemplate.exchange("/api/auth/delete/{id}", HttpMethod.DELETE, 
				entity, Boolean.class, sid);
		assertThat(response.getBody(),equalTo(true));
	}
	@Test
	public void testForBlackListNewsAnalyst(){
		LOGGER.info("Test to block NewsAnalyst");
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer "+token);
		HttpEntity<?> entity = new HttpEntity<Object>(null,headers);
		ResponseEntity<ErrorResponse> response = restTemplate.exchange("/api/admin/blacklist/{id}", 
		HttpMethod.GET, entity, ErrorResponse.class,17);
		assertThat(response.getBody().getErrorMessage(),containsString("Error:Access is denied"));

	}

}
