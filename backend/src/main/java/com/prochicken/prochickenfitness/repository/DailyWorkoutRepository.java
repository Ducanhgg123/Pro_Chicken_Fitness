package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.DailyWorkoutEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailyWorkoutRepository extends JpaRepository<DailyWorkoutEntity,Integer> {
}
