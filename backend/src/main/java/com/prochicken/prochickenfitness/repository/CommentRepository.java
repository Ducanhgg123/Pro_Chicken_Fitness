package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity,Integer> {
    @Query("select c from CommentEntity c where c.commentUser.username = :username")
    List<CommentEntity> findAllByUsername(@Param("username") String username);

    @Query("select c from CommentEntity c where c.post.id = :postId ")
    List<CommentEntity> findAllByPostId(@Param("postId") int postId);
}