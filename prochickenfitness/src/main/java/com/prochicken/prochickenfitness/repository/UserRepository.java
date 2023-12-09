package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.CalendarEntity;
import com.prochicken.prochickenfitness.entity.IngredientEntity;
import com.prochicken.prochickenfitness.entity.RoleEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;


public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsername(String username);

    @Query("select u from UserEntity u join u.roles r where r.name='ROLE_COACH' ")
    List<UserEntity> findAllCoach();

    @Query("select i.name from UserEntity u join u.ingredients i " +
            " where u.username = :username and i.status = :status")
    Set<String> findIngredientsbyStatus(@Param("username") String username, Boolean status);

    @Query("select u from UserEntity u join u.roles r where r.name = :role")
    List<UserEntity> findUserByRoles_Name(@Param("role") String role);


    @Query("select r from UserEntity u join u.roles r where u.username = :username")
    List<RoleEntity> findRoleOfUserByUsername(@Param("username") String username);
}
