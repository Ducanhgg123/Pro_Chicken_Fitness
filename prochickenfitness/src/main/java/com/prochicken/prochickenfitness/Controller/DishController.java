package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.DishDTO;
import com.prochicken.prochickenfitness.Transfer.DishTransfer;
import com.prochicken.prochickenfitness.entity.DishEntity;
import com.prochicken.prochickenfitness.repository.DishRepository;
import com.prochicken.prochickenfitness.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dish")
public class DishController {
    private DishRepository dishRepository;
    private IngredientRepository ingredientRepository;

    @Autowired
    public DishController(DishRepository dishRepository, IngredientRepository ingredientRepository) {
        this.dishRepository = dishRepository;
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping("/")
    public List<DishDTO> getDishes(){
        List<DishEntity> dishEntities = dishRepository.findAll();
        List<DishDTO> dishDTOS = dishEntities.stream().map(e -> DishTransfer.toDTO(e)).toList();
        return dishDTOS;
    }
}
