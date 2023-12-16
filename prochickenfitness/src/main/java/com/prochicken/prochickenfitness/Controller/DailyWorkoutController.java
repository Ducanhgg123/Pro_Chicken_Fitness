package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.DailyWorkoutDTO;
import com.prochicken.prochickenfitness.Transfer.DailyWorkoutTransfer;
import com.prochicken.prochickenfitness.entity.DailyWorkoutEntity;
import com.prochicken.prochickenfitness.entity.DishEntity;
import com.prochicken.prochickenfitness.entity.WorkoutActivityEntity;
import com.prochicken.prochickenfitness.repository.DailyWorkoutRepository;
import com.prochicken.prochickenfitness.repository.DishRepository;
import com.prochicken.prochickenfitness.repository.WorkoutActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/dailyworkout")
public class DailyWorkoutController {
    private DailyWorkoutRepository dailyWorkoutRepository;
    private DishRepository dishRepository;
    private WorkoutActivityRepository workoutActivityRepository;

    @Autowired
    public DailyWorkoutController(DailyWorkoutRepository dailyWorkoutRepository,
                                  DishRepository dishRepository, WorkoutActivityRepository workoutActivityRepository) {
        this.dailyWorkoutRepository = dailyWorkoutRepository;
        this.dishRepository = dishRepository;
        this.workoutActivityRepository = workoutActivityRepository;
    }

    @GetMapping("/")
    public List<DailyWorkoutDTO> getDailyWorkouts(@RequestBody(required = false) List<Integer> dailyWorkouts){
        if (dailyWorkouts==null){
            return dailyWorkoutRepository.findAll().stream().map(e -> DailyWorkoutTransfer.toDTO(e)).toList();
        }
        List<DailyWorkoutEntity> dailyWorkoutEntities = dailyWorkouts.stream().
                map(e -> dailyWorkoutRepository.findById(e).get()).toList();
        List<DailyWorkoutDTO> dailyWorkoutDTOS = dailyWorkoutEntities.stream().
                map(e -> DailyWorkoutTransfer.toDTO(e)).toList();
        return dailyWorkoutDTOS;
    }

    @GetMapping("/{id}")
    public DailyWorkoutDTO getDailyWorkout(@PathVariable(name = "id") int id){
        return DailyWorkoutTransfer.toDTO(dailyWorkoutRepository.findById(id).get());
    }


    @PostMapping("/")
    public DailyWorkoutDTO createDailyWorkout(@RequestBody DailyWorkoutDTO dailyWorkoutDTO){
        DailyWorkoutEntity dailyWorkoutEntity = new DailyWorkoutEntity();
        dailyWorkoutDTO.setDateSet(LocalDate.now());
        List<DishEntity> dishEntities = dailyWorkoutDTO.getDishes().stream().
                map(e -> dishRepository.findById(e.getId()).get()).toList();
        List<WorkoutActivityEntity> activities = dailyWorkoutDTO.getActivities().stream().
                map(e -> workoutActivityRepository.findById(e.getId()).get()).toList();
        dailyWorkoutEntity.setDishes(dishEntities);
        dailyWorkoutEntity.setActivities(activities);
        dailyWorkoutEntity = DailyWorkoutTransfer.toEntity(dailyWorkoutDTO,dailyWorkoutEntity);
        dailyWorkoutEntity = dailyWorkoutRepository.save(dailyWorkoutEntity);
        return DailyWorkoutTransfer.toDTO(dailyWorkoutEntity);
    }

    @PutMapping("/")
    public DailyWorkoutDTO updateDailyWorkout(@RequestBody DailyWorkoutDTO dailyWorkoutDTO){
        DailyWorkoutEntity dailyWorkoutEntity = dailyWorkoutRepository.findById(dailyWorkoutDTO.getId()).get();
        if (dailyWorkoutDTO.getActivities()==null){
            dailyWorkoutEntity.setActivities(null);
        }else{
            List<WorkoutActivityEntity> activities = new ArrayList<>(dailyWorkoutDTO.getActivities().stream().
                    map(e -> workoutActivityRepository.findById(e.getId()).get()).toList());
            dailyWorkoutEntity.setActivities(activities);
        }

        if (dailyWorkoutDTO.getDishes()==null){
            dailyWorkoutEntity.setDishes(null);
        }else{
            List<DishEntity> dishEntities = new ArrayList<>(dailyWorkoutDTO.getDishes().stream().
                    map(e -> dishRepository.findById(e.getId()).get()).toList());
            dailyWorkoutEntity.setDishes(dishEntities);
        }

        dailyWorkoutEntity = DailyWorkoutTransfer.toEntity(dailyWorkoutDTO,dailyWorkoutEntity);
        dailyWorkoutEntity = dailyWorkoutRepository.save(dailyWorkoutEntity);
        return DailyWorkoutTransfer.toDTO(dailyWorkoutEntity);
    }

    @DeleteMapping("/{id}")
    public DailyWorkoutDTO deleteDailyWorkout(@PathVariable(name = "id") int id){
        System.out.println(id);
        DailyWorkoutEntity dailyWorkoutEntity = dailyWorkoutRepository.findById(id).get();
        dailyWorkoutRepository.delete(dailyWorkoutEntity);
        return DailyWorkoutTransfer.toDTO(dailyWorkoutEntity);
    }


}
