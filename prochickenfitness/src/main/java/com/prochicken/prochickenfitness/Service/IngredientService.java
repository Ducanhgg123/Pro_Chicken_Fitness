package com.prochicken.prochickenfitness.Service;

import com.prochicken.prochickenfitness.entity.IngredientEntity;

import java.util.List;

public interface IngredientService {
    List<IngredientEntity> getFavouriteIngredient();
    List<IngredientEntity> getUnfavouriteIngredient();
}
