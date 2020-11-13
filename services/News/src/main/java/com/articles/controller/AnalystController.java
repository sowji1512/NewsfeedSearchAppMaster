package com.articles.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.articles.entity.JwtResponse;
import com.articles.entity.Login;
import com.articles.entity.News;
import com.articles.entity.Search;
import com.articles.entity.SignupStatus;
import com.articles.entity.Users;
import com.articles.exceptions.ExceptioHandler;
import com.articles.repository.UserRepository;
import com.articles.security.JwtProvider;
import com.articles.service.UserService;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/auth")
public class AnalystController extends ExceptioHandler {
	private static final Logger LOGGER = LoggerFactory.getLogger(AnalystController.class);
	@Autowired
	private UserService userService;	
	@Autowired AuthenticationManager authenticationManager;
	@Autowired JwtProvider jwtProvider;
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired UserRepository userRepo;
	

	
	@PostMapping("/signup")
	public ResponseEntity<SignupStatus> register(@Valid @RequestBody Users user) {
		
		LOGGER.info("register method is invoked");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		SignupStatus status = userService.registerUser(user);
		if (status.isStatus() == false) {
        return new ResponseEntity<SignupStatus>(status,HttpStatus.CONFLICT);
        }
        return new ResponseEntity<SignupStatus>(status,HttpStatus.OK);
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<JwtResponse> authenticated(@RequestBody Login login) {
		
		LOGGER.info("authenticated method is invoked");
		Users user=userRepo.findByEmail(login.getEmail());
		LOGGER.debug("getting Newsanalyst by email ",user);
			if(user.isActiveStatus()==false){
			return ResponseEntity.ok(new JwtResponse(null,0, null,null));
		}
			
		else{
		Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getEmail(),login.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwtToken=jwtProvider.generateToken(authentication);
		UserDetails userDetails=(UserDetails)authentication.getPrincipal();
		LOGGER.debug("getting Newsanalyst by email ",user);
		return ResponseEntity.ok(new JwtResponse(jwtToken,userService.getIdByEmail(userDetails.getUsername()), userDetails.getUsername(), userDetails.getAuthorities()));
		}
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@PostMapping("/saveSearches")
	public ResponseEntity<Boolean> saveSearches(@Valid @RequestBody Search search) {
		
		LOGGER.info("saveSearches method is invoked");
		boolean saveStatus=userService.saveSearches(search);
        return new ResponseEntity<Boolean>(saveStatus,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@GetMapping("/SearchList/{id}")
	public ResponseEntity<List<Search>> getAllSearchList(@PathVariable long id)
	{
		LOGGER.info("getAllSearchList method is invoked");
		List<Search> searchList=userService.getAllSearchList(id);
		LOGGER.debug("getting searchlist of particular analyst  by id ",searchList);

		if(searchList!=null)
		return new ResponseEntity<List<Search>>(searchList,HttpStatus.OK);
		else
			return new ResponseEntity<List<Search>>(searchList,HttpStatus.CONFLICT);

	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@DeleteMapping("delete/{id}")
	public ResponseEntity<Boolean> deteteSearch(@PathVariable int id){
		
	LOGGER.info("deteteSearch method is invoked");
	 boolean status=userService.deteteSearch(id);
		return new ResponseEntity<Boolean>(status,HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ROLE_USER')")
	@DeleteMapping("deleteAnalyst/{email}")
	public ResponseEntity<Boolean> deleteUser(@PathVariable String email){
		LOGGER.info("deleteUser method is invoked");
		return new ResponseEntity<Boolean>(userService.deleteAnalystByEmail(email),HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ROLE_USER')")
	@PostMapping("/addingFavourites")
	public ResponseEntity<Boolean> saveSearches(@Valid @RequestBody News news) {
		
		LOGGER.info("saveSearches method is invoked");
		LOGGER.debug("news",news);
		System.out.println(news);
		boolean saveStatus=userService.saveFavourites(news);
        return new ResponseEntity<Boolean>(saveStatus,HttpStatus.OK);
	}


}
