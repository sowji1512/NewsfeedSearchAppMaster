package com.articles.controller;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.articles.entity.Users;
import com.articles.exceptions.ExceptioHandler;
import com.articles.service.UserService;
@CrossOrigin("http://localhost:4200")

@RestController
@RequestMapping("api/admin")
public class AdminController  extends ExceptioHandler{
	private static final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);
	@Autowired
	UserService userService;
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/getAllAnalysts")
	public ResponseEntity<List<Users>> getAllAnalysts()
	{
		
		LOGGER.info("getAllAnalysts method is invoked");
		List<Users> userlist=userService.getAllAnalysts();
		LOGGER.debug("getting Newsanalysts list",userlist);
		return new ResponseEntity<List<Users>>(userlist,HttpStatus.OK);	
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/getAllActiveAnalysts")
	public ResponseEntity<List<Users>> getAllActiveAnalysts()
	{
		
		LOGGER.info("getAllActiveAnalysts method is invoked");
		List<Users> userlist=userService.getAllActiveAnalysts();
		LOGGER.debug("getting all active Newsanalysts list",userlist);
		return new ResponseEntity<List<Users>>(userlist,HttpStatus.OK);
	}
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/getAnalyst/{id}")
	public ResponseEntity<Users> getAnalystByEmail(@PathVariable long id){
		
		LOGGER.info("getAnalystByEmail method is invoked");
		Users user=userService.getAnalyst(id);
		LOGGER.debug("getting Newsanalyst by email ",user);
		return new ResponseEntity<Users>(user,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/blacklist/{id}")
	public ResponseEntity<Boolean> blackListUser(@PathVariable long id){
		
		LOGGER.info("blackListUser method is invoked");
		boolean status=userService.blockAnalyst(id);
		if(status)
		return new ResponseEntity<Boolean>(status,HttpStatus.OK);
		else
			return new ResponseEntity<Boolean>(status,HttpStatus.CONFLICT);
	}
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/reactivate/{id}")
	public ResponseEntity<Boolean> reActivatetUser(@PathVariable long id){
		
		LOGGER.info("reActivatetUser method is invoked");
		boolean status=userService.reactivateAnalyst(id);
		if(status)
		return new ResponseEntity<Boolean>(status,HttpStatus.OK);
		else
			return new ResponseEntity<Boolean>(status,HttpStatus.CONFLICT);
	}
}
