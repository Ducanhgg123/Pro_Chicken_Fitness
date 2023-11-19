package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    Optional<UserEntity> findByUsername(String username);

    Boolean existsByUsername(String username);
}
