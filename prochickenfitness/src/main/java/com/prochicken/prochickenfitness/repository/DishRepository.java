package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.DishEntity;
import com.prochicken.prochickenfitness.entity.IngredientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DishRepository extends JpaRepository<DishEntity,Integer> {

    @Query("select d.ingredients from DishEntity d where d.id = :id")
    List<IngredientEntity> findAllIngredients(@Param("id") int id);
}
