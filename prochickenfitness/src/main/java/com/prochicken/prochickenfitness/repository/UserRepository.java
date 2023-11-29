package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsername(String username);

    @Query("select u from UserEntity u join u.roles r where r.name='ROLE_COACH' ")
    List<UserEntity> findAllCoach();
}
