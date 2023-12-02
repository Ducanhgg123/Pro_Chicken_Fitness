package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.DishEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishRepository extends JpaRepository<DishEntity,Integer> {
}
