package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity,Integer> {
    @Query("select p from PostEntity p join UserEntity u on u.id = p.user.id where u.username = :username")
    List<PostEntity> findByUsername(@Param("username") String username);
}
