package com.prochicken.prochickenfitness.Transfer;

import com.prochicken.prochickenfitness.DTO.CommentDTO;
import com.prochicken.prochickenfitness.entity.CommentEntity;
import org.modelmapper.ModelMapper;

public class CommentTransfer {
    public static CommentDTO toDTO(CommentEntity commentEntity){
        ModelMapper mapper = new ModelMapper();
        CommentDTO commentDTO = mapper.map(commentEntity, CommentDTO.class);
        return commentDTO;
    }

    public static CommentEntity toEntity(CommentDTO commentDTO){
        ModelMapper mapper = new ModelMapper();
        CommentEntity commentEntity = mapper.map(commentDTO, CommentEntity.class);
        return commentEntity;
    }

    public static CommentEntity toEntity(CommentDTO commentDTO,CommentEntity commentEntity){
        ModelMapper mapper = new ModelMapper();
        mapper.map(commentDTO,commentEntity);
        return commentEntity;
    }
}
