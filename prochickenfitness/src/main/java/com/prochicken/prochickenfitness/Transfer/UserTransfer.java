package com.prochicken.prochickenfitness.Transfer;

import com.prochicken.prochickenfitness.DTO.UserDTO;
import com.prochicken.prochickenfitness.entity.UserEntity;

public class UserTransfer {
    public static final UserDTO toDTO(UserEntity userEntity){
        UserDTO userDTO = new UserDTO();
        userDTO.setAddress(userEntity.getAddress());
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setHeight(userEntity.getHeight());
        userDTO.setGender(userEntity.getGender());
        userDTO.setFullname(userEntity.getFullname());
        userDTO.setWeight(userEntity.getWeight());
        userDTO.setPhoneNumber(userEntity.getPhoneNumber());
        userDTO.setDateOfBirth(userEntity.getDateOfBirth());
        userDTO.setUsername(userEntity.getUsername());
        userDTO.setWorkoutFrequency(userEntity.getWorkoutFrequency());
        userDTO.setDescription(userEntity.getDescription());
        userDTO.setPrice(userEntity.getPrice());
        return userDTO;
    }

    public static final UserEntity toEntity(UserDTO userDTO){
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userDTO.getUsername());
        userEntity.setAddress(userDTO.getAddress());
        userEntity.setEmail(userDTO.getEmail());
        if (userDTO.getHeight()==null){
            userEntity.setHeight(0f);
        }else{
            userEntity.setHeight(userDTO.getHeight());
        }
        userEntity.setGender(userDTO.getGender());
        userEntity.setFullname(userDTO.getFullname());
        if (userDTO.getWeight()==null){
            userEntity.setWeight(0f);
        }else{
            userEntity.setWeight(userDTO.getWeight());
        }

        userEntity.setPhoneNumber(userDTO.getPhoneNumber());
        userEntity.setDateOfBirth(userDTO.getDateOfBirth());
        userEntity.setUsername(userDTO.getUsername());
        if (userDTO.getWorkoutFrequency()==null){
            userEntity.setWorkoutFrequency(0);
        }
        userEntity.setWorkoutFrequency(userDTO.getWorkoutFrequency());
        userEntity.setDescription(userDTO.getDescription());
        userEntity.setPrice(userDTO.getPrice());
        return userEntity;
    }

    public static final UserEntity toEntity(UserEntity userEntity,UserDTO userDTO){
        userEntity.setAddress(userDTO.getAddress());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setUsername(userDTO.getUsername());
        if (userDTO.getHeight()==null){
            userEntity.setHeight(0f);
        }else{
            userEntity.setHeight(userDTO.getHeight());
        }
        userEntity.setGender(userDTO.getGender());
        userEntity.setFullname(userDTO.getFullname());
        if (userDTO.getWeight()==null){
            userEntity.setWeight(0f);
        }else{
            userEntity.setWeight(userDTO.getWeight());
        }

        userEntity.setPhoneNumber(userDTO.getPhoneNumber());
        userEntity.setDateOfBirth(userDTO.getDateOfBirth());
        userEntity.setUsername(userDTO.getUsername());
        if (userDTO.getWorkoutFrequency()==null){
            userEntity.setWorkoutFrequency(0);
        }
        userEntity.setWorkoutFrequency(userDTO.getWorkoutFrequency());
        userEntity.setDescription(userDTO.getDescription());
        userEntity.setPrice(userDTO.getPrice());
        return userEntity;
    }
}
