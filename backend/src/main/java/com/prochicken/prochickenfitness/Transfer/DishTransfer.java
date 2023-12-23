package com.prochicken.prochickenfitness.Transfer;

import com.prochicken.prochickenfitness.DTO.DishDTO;
import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.DishEntity;
import org.modelmapper.ModelMapper;

public class DishTransfer {
    private static ModelMapper mapper = new ModelMapper();
    public static DishDTO toDTO(DishEntity dishEntity){
        if (dishEntity.getPicture()!=null){
            dishEntity.setPicture(FileUtil.decompressFile(dishEntity.getPicture()));
        }
        DishDTO dishDTO = mapper.map(dishEntity, DishDTO.class);
        return dishDTO;
    }

    public static DishEntity toEntity(DishDTO dishDTO){
        if (dishDTO.getPicture()!=null){
            dishDTO.setPicture(FileUtil.compressFile(dishDTO.getPicture()));
        }
        return mapper.map(dishDTO, DishEntity.class);
    }

    public static DishEntity toEntity(DishDTO dishDTO,DishEntity dishEntity){
        if (dishDTO.getPicture()!=null){
            dishDTO.setPicture(FileUtil.compressFile(dishDTO.getPicture()));
        }
        mapper.map(dishDTO,dishEntity);
        return dishEntity;
    }
}
