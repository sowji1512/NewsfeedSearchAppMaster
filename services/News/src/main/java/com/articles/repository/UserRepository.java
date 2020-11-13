package com.articles.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.articles.entity.Users;

public interface UserRepository extends CrudRepository<Users,Long>{
	Users   findById(long id);
    List<Users> findByEmailAndPassword(String email, String password);
    Users findByEmail(String email);
    boolean existsByEmail(String email);
    List<Users> findAllByactiveStatusAndRoles(boolean activeStatus,int roles);
    List<Users> findAllByRoles(int roles);
    Users findByIdAndRoles(long id,int roles);
    boolean deleteByEmail(String email);
    


	

}
