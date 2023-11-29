package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.Service.IngredientService;
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
    private IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientRepository ingredientRepository, IngredientService ingredientService) {
        this.ingredientRepository = ingredientRepository;
        this.ingredientService = ingredientService;
    }

    @GetMapping("/")
    public List<IngredientEntity> getIngredients(){
        return ingredientRepository.findAll();
    }

    @GetMapping("/favourite")
    public List<IngredientEntity> getFavouriteIngredient(){
        return ingredientService.getFavouriteIngredient();
    }

    @GetMapping("/unfavourite")
    public List<IngredientEntity> getUnfavouriteIngredient(){
        return ingredientService.getUnfavouriteIngredient();
    }
}
