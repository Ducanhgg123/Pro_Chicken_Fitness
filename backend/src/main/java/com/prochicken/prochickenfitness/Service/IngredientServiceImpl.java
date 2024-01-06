package com.prochicken.prochickenfitness.Service;

import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.IngredientEntity;
import com.prochicken.prochickenfitness.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientServiceImpl implements IngredientService{

    private IngredientRepository ingredientRepository;

    @Autowired
    public IngredientServiceImpl(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public List<IngredientEntity> getFavouriteIngredient() {
        List<IngredientEntity> ingredientEntities = ingredientRepository.getIngredientEntitiesByStatus(true);
        for (IngredientEntity ingredientEntity: ingredientEntities) {
            ingredientEntity.setImage(ingredientEntity.getImage());
        }
        return ingredientEntities;
    }

    @Override
    public List<IngredientEntity> getUnfavouriteIngredient() {
        List<IngredientEntity> ingredientEntities = ingredientRepository.getIngredientEntitiesByStatus(false);
        for (IngredientEntity ingredientEntity: ingredientEntities) {
            ingredientEntity.setImage(ingredientEntity.getImage());
        }
        return ingredientEntities;
    }
}
