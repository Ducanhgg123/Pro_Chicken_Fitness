package com.prochicken.prochickenfitness.Transfer;

import com.prochicken.prochickenfitness.DTO.DailyWorkoutDTO;
import com.prochicken.prochickenfitness.entity.DailyWorkoutEntity;
import com.prochicken.prochickenfitness.repository.DishRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class DailyWorkoutTransfer {
    private static ModelMapper mapper = new ModelMapper();


    public static DailyWorkoutDTO toDTO(DailyWorkoutEntity dailyWorkoutEntity){
        DailyWorkoutDTO dailyWorkoutDTO = new DailyWorkoutDTO();
        dailyWorkoutDTO.setId(dailyWorkoutEntity.getId());
        dailyWorkoutDTO.setDateSet(dailyWorkoutEntity.getDateSet());
        dailyWorkoutDTO.setDishes(dailyWorkoutEntity.getDishes().stream().map(e -> DishTransfer.toDTO(e)).toList());
        dailyWorkoutDTO.setActivities(dailyWorkoutEntity.getActivities().stream().map(e -> WorkoutActivityTransfer.toDTO(e)).toList());
        return dailyWorkoutDTO;
    }

    public static DailyWorkoutEntity toEntity(DailyWorkoutDTO dailyWorkoutDTO,DailyWorkoutEntity dailyWorkoutEntity){
        dailyWorkoutEntity.setId(dailyWorkoutDTO.getId());
        dailyWorkoutEntity.setDateSet(dailyWorkoutDTO.getDateSet());
        return dailyWorkoutEntity;
    }

    public static DailyWorkoutEntity toEntity(DailyWorkoutDTO dailyWorkoutDTO){
        DailyWorkoutEntity dailyWorkoutEntity = new DailyWorkoutEntity();
        dailyWorkoutEntity.setId(dailyWorkoutDTO.getId());
        dailyWorkoutEntity.setDateSet(dailyWorkoutDTO.getDateSet());
        return dailyWorkoutEntity;
    }
}
