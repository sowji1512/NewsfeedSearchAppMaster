package com.articles.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.articles.entity.News;
import com.articles.entity.Role;
import com.articles.entity.Search;
import com.articles.entity.SignupStatus;
import com.articles.entity.Users;
import com.articles.repository.NewsRepository;
import com.articles.repository.RoleRepository;
import com.articles.repository.SearchRepository;
import com.articles.repository.UserRepository;


@Service
public class UserService implements UserDetailsService{
	public static final Logger logger=LoggerFactory.getLogger(UserService.class);


	@Autowired
	private UserRepository userRepo;
	@Autowired
	private NewsRepository newsRepo;
	@Autowired
	private RoleRepository roleRepo;
	@Autowired
	private SearchRepository searchrepository;

	public SignupStatus registerUser(Users user) {
		logger.info("registerUser method is invoked");
		SignupStatus status=new SignupStatus();
		boolean  userstatus = userRepo.existsByEmail(user.getEmail()); 
		if (userstatus) {
			status.setStatus(false);
			status.setError("Email already exists!");
			return status;

		} else {

			user.setActiveStatus(true);
			status.setStatus(true);
			status.setError("Registered Successfully");
			System.out.println(user);
			userRepo.save(user);
			return status;
		}
	}

	public List<Users> getAllAnalysts() {
		
		logger.info("getAllAnalysts method is invoked");
		List<Users> userList=(List<Users>) userRepo.findAllByRoles(1);
		return userList;
	}
	public List<Users> getAllActiveAnalysts() {

		logger.info("getAllActiveAnalysts method is invoked");

		List<Users> userList=(List<Users>) userRepo.findAllByactiveStatusAndRoles(true,1);
		return userList;
	}

	public Users getAnalyst(long id){

		logger.info("getAnalyst method is invoked");
		Users analyst=userRepo.findByIdAndRoles(id,1);
		return analyst;
	}


	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		
		logger.info("loadUserByUsername method is invoked");
		Users users=userRepo.findByEmail(userName);
		Role roles=roleRepo.findById(users.getRoles());
		List<GrantedAuthority> authorities=new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(roles.getRoleName()));
		User user=new User(users.getEmail(),users.getPassword(),authorities);
		return user;
	}

	public boolean saveSearches(Search search){
		
		logger.info("saveSearches method is invoked");
		
		if(userRepo.existsByEmail(search.getUser().getEmail()))
		{
				
			search.setUser(userRepo.findByEmail(search.getUser().getEmail()));
			searchrepository.save(search);
			return true;
		}  
		else 
			{
			
			return false;
			}
		
	}
	
public boolean saveFavourites(News news	){
		
		logger.info("saveFavourites method is invoked");
		
		
				
			news.setUser(userRepo.findByEmail(news.getUser().getEmail()));
			newsRepo.save(news);
			return true;
		
			
		
	}

	public List<Search> getAllSearchList(long id) {
		
		logger.info("getAllAnalysts method is invoked");
		boolean  userstatus = userRepo.existsById(id); 
		Users users=userRepo.findById(id);
		
		if(userstatus){
			
		List<Search> searchList= searchrepository.findByUser(users);
		System.out.println(searchList);
		return searchList;
		}
		else return null;
	}

	public boolean deteteSearch(int id){

		logger.info("deteteSearch method is invoked");
		searchrepository.deleteById(id);
		return true;
	}
	
	public boolean blockAnalyst(long id){
		boolean  userstatus = userRepo.existsById(id); 
		if(userstatus){
		Users user=userRepo.findById(id);
		
			user.setActiveStatus(false);
			userRepo.save(user);
			return true;	
		}
		else
			return false;
		
	}
	
	public boolean reactivateAnalyst(long id){
		boolean  userstatus = userRepo.existsById(id); 
		if(userstatus){
		Users user=userRepo.findById(id);
		user.setActiveStatus(true);
		userRepo.save(user);
		return true;
		}
		else
		return false;
		
	}
	
	
	public boolean deleteAnalystByEmail(String email){
		Users users=userRepo.findByEmail(email);
		userRepo.delete(users);
		return true;
	}
	
	
	public long getIdByEmail(String email){
		Users users=userRepo.findByEmail(email);
		return users.getId();
	}


}
