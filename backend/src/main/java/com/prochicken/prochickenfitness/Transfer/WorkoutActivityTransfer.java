package com.prochicken.prochickenfitness.Transfer;

import com.prochicken.prochickenfitness.DTO.WorkoutActivityDTO;
import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.WorkoutActivityEntity;
import org.modelmapper.ModelMapper;

public class WorkoutActivityTransfer {
    private static ModelMapper mapper = new ModelMapper();

    public static WorkoutActivityEntity toEntity(WorkoutActivityDTO workoutActivityDTO){
        workoutActivityDTO.setPicture(FileUtil.compressFile(workoutActivityDTO.getPicture()));
        return mapper.map(workoutActivityDTO, WorkoutActivityEntity.class);
    };

    public static WorkoutActivityEntity toEntity(WorkoutActivityDTO workoutActivityDTO,WorkoutActivityEntity workoutActivityEntity){
        workoutActivityDTO.setPicture(FileUtil.compressFile(workoutActivityDTO.getPicture()));
        mapper.map(workoutActivityDTO,workoutActivityEntity);
        return workoutActivityEntity;
    };

    public static WorkoutActivityDTO toDTO(WorkoutActivityEntity workoutActivityEntity){
        workoutActivityEntity.setPicture(FileUtil.decompressFile(workoutActivityEntity.getPicture()));
        return mapper.map(workoutActivityEntity, WorkoutActivityDTO.class);
    }

}
