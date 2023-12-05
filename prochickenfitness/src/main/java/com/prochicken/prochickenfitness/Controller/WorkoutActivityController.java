package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.WorkoutActivityDTO;
import com.prochicken.prochickenfitness.Transfer.WorkoutActivityTransfer;
import com.prochicken.prochickenfitness.Util.ByteConverter;
import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.WorkoutActivityEntity;
import com.prochicken.prochickenfitness.repository.UserRepository;
import com.prochicken.prochickenfitness.repository.WorkoutActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/workout/")
public class WorkoutActivityController {
    private UserRepository userRepository;
    private WorkoutActivityRepository workoutActivityRepository;

    @Autowired
    public WorkoutActivityController(UserRepository userRepository, WorkoutActivityRepository workoutActivityRepository) {
        this.userRepository = userRepository;
        this.workoutActivityRepository = workoutActivityRepository;
    }

    @GetMapping("/")
    public List<WorkoutActivityDTO> getWorkouts(){
        List<WorkoutActivityEntity> workoutActivityEntities = workoutActivityRepository.findAll();
        List<WorkoutActivityDTO> workoutActivityDTOS = workoutActivityEntities.stream().
                map(e -> WorkoutActivityTransfer.toDTO(e)).toList();
        return workoutActivityDTOS;
    }

    @GetMapping("/{id}")
    public WorkoutActivityDTO getWorkout(@PathVariable(name = "id") int id){
        WorkoutActivityEntity workoutActivityEntity = workoutActivityRepository.findById(id).get();
        return WorkoutActivityTransfer.toDTO(workoutActivityEntity);
    }

    @PostMapping("/")
    public WorkoutActivityDTO createWorkout(@RequestParam(name = "name") String name,
                                            @RequestParam(name = "picture")MultipartFile picture) throws IOException {

        WorkoutActivityDTO workoutActivityDTO = new WorkoutActivityDTO();
        workoutActivityDTO.setName(name);
        workoutActivityDTO.setPicture(FileUtil.compressFile(ByteConverter.convertToByteWrapperArray(picture.getBytes())));
        WorkoutActivityEntity workoutActivityEntity = workoutActivityRepository.save(WorkoutActivityTransfer.toEntity(workoutActivityDTO));
        return WorkoutActivityTransfer.toDTO(workoutActivityEntity);
    }

    @PutMapping("/")
    public WorkoutActivityDTO updateWorkout(@RequestBody WorkoutActivityDTO workoutActivityDTO){
        WorkoutActivityEntity workoutActivityEntity = workoutActivityRepository.findById(workoutActivityDTO.getId()).get();
        workoutActivityEntity = workoutActivityRepository.save(WorkoutActivityTransfer.toEntity(workoutActivityDTO,workoutActivityEntity));
        return WorkoutActivityTransfer.toDTO(workoutActivityEntity);
    }

    @DeleteMapping("/{id}")
    public WorkoutActivityDTO deleteWorkout(@PathVariable(name = "id") int id){
        WorkoutActivityEntity workoutActivityEntity = workoutActivityRepository.findById(id).get();
        workoutActivityRepository.delete(workoutActivityEntity);
        return WorkoutActivityTransfer.toDTO(workoutActivityEntity);
    }
}
