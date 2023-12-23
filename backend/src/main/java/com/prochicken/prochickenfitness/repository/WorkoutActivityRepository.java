package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.WorkoutActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutActivityRepository extends JpaRepository<WorkoutActivityEntity,Integer> {
}
