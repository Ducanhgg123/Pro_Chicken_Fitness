package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.Service.IngredientService;
import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.IngredientEntity;
import com.prochicken.prochickenfitness.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        return ingredientService.getFavouriteIngredient();
    }

    @GetMapping("/favourite")
    public List<IngredientEntity> getFavouriteIngredient(){
        return ingredientService.getFavouriteIngredient();
    }

    @GetMapping("/unfavourite")
    public List<IngredientEntity> getUnfavouriteIngredient(){
        return ingredientService.getUnfavouriteIngredient();
    }

    @GetMapping("/{id}")
    public IngredientEntity getIngredientById(@PathVariable(name = "id") int id){
        return ingredientRepository.findById(id).get();
    }

    @PostMapping("/")
    public IngredientEntity addIngredient(@RequestBody(required = false) IngredientEntity ingredientEntity){
        IngredientEntity tmp = new IngredientEntity();
        ingredientEntity.setStatus(true);
        ingredientRepository.save(ingredientEntity);
        tmp.setStatus(false);
        tmp.setName(ingredientEntity.getName());
        tmp.setImage(ingredientEntity.getImage());
        ingredientRepository.save(tmp);
        return ingredientRepository.save(ingredientEntity);
    }

    @PutMapping("/")
    public IngredientEntity updateIngredient(@RequestBody(required = false) IngredientEntity ingredientEntity){
        IngredientEntity ingredientEntity1 = ingredientRepository.findById(ingredientEntity.getId()).get();
        List<IngredientEntity> ingredients = ingredientRepository.findAllByName(ingredientEntity1.getName());
        for (IngredientEntity ingredient: ingredients) {
            ingredient.setName(ingredientEntity.getName());
            ingredient.setImage(ingredientEntity.getImage());
            ingredientRepository.save(ingredient);
        }
        return ingredientEntity;
    }

    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable(name = "id") int id){
        IngredientEntity ingredientEntity = ingredientRepository.findById(id).get();
        List<IngredientEntity> ingredients = ingredientRepository.findAllByName(ingredientEntity.getName());
        for (IngredientEntity ingredient: ingredients) {
            ingredientRepository.delete(ingredient);
        }
    }
}
