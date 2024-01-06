package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.IngredientEntity;
import com.prochicken.prochickenfitness.entity.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IngredientRepository extends JpaRepository<IngredientEntity,Integer> {
    Optional<RoleEntity> findByName(String name);

    List<IngredientEntity> getIngredientEntitiesByStatus(boolean status);
    List<IngredientEntity> findAllByName(String name);
}
