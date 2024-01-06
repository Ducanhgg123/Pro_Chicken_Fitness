package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.DishDTO;
import com.prochicken.prochickenfitness.Transfer.DishTransfer;
import com.prochicken.prochickenfitness.Util.ByteConverter;
import com.prochicken.prochickenfitness.entity.DishEntity;
import com.prochicken.prochickenfitness.entity.IngredientEntity;
import com.prochicken.prochickenfitness.repository.DishRepository;
import com.prochicken.prochickenfitness.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @GetMapping("/ingredients/{id}")
    public List<IngredientEntity> getIngredients(@PathVariable(name = "id") int id){
        return dishRepository.findAllIngredients(id);
    }
    @GetMapping("/{id}")
    public DishDTO getDish(@PathVariable(name = "id") int id){
        return DishTransfer.toDTO(dishRepository.findById(id).get());
    }
    @PostMapping("/")
    public DishDTO createDish(@RequestParam(name = "picture",required = false)MultipartFile file,
                              @RequestParam(name = "totalCalories") int totalCalories,
                              @RequestParam(name = "name") String name,
                              @RequestParam(name = "ingredients",required = false) List<Integer> ingredientsId) throws IOException {
        List<IngredientEntity> ingredients = null;
        if (ingredientsId!=null){
            ingredients = ingredientsId.stream().map(i -> ingredientRepository.findById(i).get()).toList();
        }

        DishDTO dishDTO = new DishDTO();
        dishDTO.setPicture(ByteConverter.convertToByteWrapperArray(file.getBytes()));
        dishDTO.setName(name);
        dishDTO.setTotalCalories(totalCalories);
        DishEntity dishEntity = DishTransfer.toEntity(dishDTO);
        dishEntity.setIngredients(ingredients);
        dishEntity = dishRepository.save(dishEntity);
        return DishTransfer.toDTO(dishEntity);
    }

    @PutMapping("/")
    public DishDTO updateDish(@RequestBody(required = false) DishDTO dishDTO){
        DishEntity dishEntity = dishRepository.findById(dishDTO.getId()).get();
        dishEntity = dishRepository.save(DishTransfer.toEntity(dishDTO,dishEntity));
        return DishTransfer.toDTO(dishEntity);
    }

    @DeleteMapping("/{id}")
    public DishDTO deleteDish(@PathVariable(name = "id") int id){
        DishEntity dish = dishRepository.findById(id).get();
        dishRepository.delete(dish);
        return DishTransfer.toDTO(dish);
    }
}
