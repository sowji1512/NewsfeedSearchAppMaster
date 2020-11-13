package com.articles.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.articles.entity.Role;


@Repository
public interface RoleRepository extends CrudRepository<Role,Integer> {
      Role findById(int roleId);
}
