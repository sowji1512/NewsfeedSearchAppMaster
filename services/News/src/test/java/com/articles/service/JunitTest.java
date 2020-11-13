package com.articles.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.articles.entity.Search;
import com.articles.entity.SignupStatus;
import com.articles.entity.Users;
import com.articles.repository.SearchRepository;
import com.articles.repository.UserRepository;

public class JunitTest {
	@Mock
	private UserRepository mUserRepository;
	@Mock
	private SearchRepository mSearchRepo;
	@InjectMocks
	private UserService ImUserService;

	private static final Logger LOGGER = LoggerFactory.getLogger(JunitTest.class);

	@Before
	public void setUp() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testForSuccessfulSignup() {

		LOGGER.info("Testing for Successful Signup");
		SignupStatus expectedStatus = new SignupStatus();
		expectedStatus.setStatus(true);
		Users user = new Users("sowji1512@gmail.com", "sowji", "secret", 4,true);
		SignupStatus actualStatus = ImUserService.registerUser(user);
		Mockito.verify(mUserRepository).save(user);
		assertEquals(true, expectedStatus.equals(actualStatus));
	}

	@Test
	public void testForUnSuccessfulSignup() {

		LOGGER.info("Testing for unSuccessful Signup");
		SignupStatus expectedStatus = new SignupStatus();
		expectedStatus.setStatus(false);
		Users user = new Users();
		user.setEmail("sowji123@gmail.com");
		when(mUserRepository.existsByEmail(user.getEmail())).thenReturn(true);
		SignupStatus actualStatus = ImUserService.registerUser(user);
		LOGGER.debug("User details -> {}", user);
		LOGGER.debug("Signup status -> {}", actualStatus);
		assertEquals(true, expectedStatus.equals(actualStatus));
	}

	@Test
	public void testToSaveSearches() {
		LOGGER.info("Testing for Saving Searches");
		Boolean expectedStatus = true;
		Users user=new Users();
		Search search = new Search("bts", user);
		when(mUserRepository.existsByEmail(search.getUser().getEmail())).thenReturn(true);
		Boolean actualStatus = ImUserService.saveSearches(search);
		assertEquals(true, expectedStatus.equals(actualStatus));
	}

	

	@Test
	public void testToDeleteSearches() {

		ImUserService.deteteSearch(10);
		Mockito.verify(mSearchRepo).deleteById(10);
	}

	@Test
	public void testToGetSearchedList() {
		
		Users user=new Users();
		long id = 8;
		when(mUserRepository.existsById(id)).thenReturn(true);
		when(mUserRepository.findById(id)).thenReturn(user);
		ImUserService.getAllSearchList(id);
		Mockito.verify(mSearchRepo).findByUser(user);
	}
	
	
	@Test
	public void testToGetSearchedAnalyst() {
		long id = 8;
		ImUserService.getAnalyst(id);
		Mockito.verify(mUserRepository).findByIdAndRoles(id,1);
	}
	
	@Test
	public void testToGetAllActiveAnalysts() {
		
		ImUserService.getAllActiveAnalysts();
		Mockito.verify(mUserRepository).findAllByactiveStatusAndRoles(true,1);
	}
	
	
	@Test
	public void testToGetAllSearchedAnalysts() {
	
		ImUserService.getAllAnalysts();
		Mockito.verify(mUserRepository).findAllByRoles(1);
	}

	@Test
	public void testToBlockAnalyst() {
		Users user = new Users();
		user.setName("sowji");
		user.setEmail("sowji1512@gmail.com");
		user.setPassword("123456");
		user.setRoles(1);
		user.setActiveStatus(true);
		long id = 2;
		when(mUserRepository.existsById(id)).thenReturn(true);
		when(mUserRepository.findById(id)).thenReturn(user);
		ImUserService.blockAnalyst(id);
		Mockito.verify(mUserRepository).save(user);
	}

	@Test
	public void testToreactivateAnalyst() {
		Users user = new Users();
		user.setName("sowji");
		user.setEmail("sowji1512@gmail.com");
		user.setPassword("123456");
		user.setRoles(1);
		user.setActiveStatus(false);
		long id =2;
		when(mUserRepository.existsById(id)).thenReturn(true);
		when(mUserRepository.findById(id)).thenReturn(user);
		ImUserService.reactivateAnalyst(id);
		Mockito.verify(mUserRepository).save(user);
	}

}
