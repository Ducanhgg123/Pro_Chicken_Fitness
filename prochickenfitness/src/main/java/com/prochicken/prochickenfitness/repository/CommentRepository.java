package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<CommentEntity,Integer> {
}
