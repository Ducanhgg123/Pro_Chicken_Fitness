package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.entity.IngredientEntity;
import com.prochicken.prochickenfitness.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/ingredient")
public class IngredientController {
    private IngredientRepository ingredientRepository;

    @Autowired
    public IngredientController(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping("/")
    public List<IngredientEntity> getIngredients(){
        return ingredientRepository.findAll();
    }
}
