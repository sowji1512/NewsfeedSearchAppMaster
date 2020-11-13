package com.articles.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.articles.entity.Search;
import com.articles.entity.Users;
@Repository
public interface SearchRepository extends CrudRepository<Search,Integer> {
	List<Search> findByUser(Users user);
//boolean existsByEmail(String email);

}
