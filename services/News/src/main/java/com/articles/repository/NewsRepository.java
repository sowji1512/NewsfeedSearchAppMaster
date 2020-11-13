package com.articles.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.articles.entity.News;

@Repository
public interface NewsRepository extends CrudRepository<News,Integer> {

	
}
