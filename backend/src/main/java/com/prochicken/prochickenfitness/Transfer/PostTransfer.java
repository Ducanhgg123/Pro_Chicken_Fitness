package com.prochicken.prochickenfitness.Transfer;


import com.prochicken.prochickenfitness.DTO.PostDTO;
import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.CommentEntity;
import com.prochicken.prochickenfitness.entity.PostEntity;
import com.prochicken.prochickenfitness.repository.CommentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostTransfer {

    private static CommentRepository commentRepository;

    @Autowired
    public PostTransfer(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public static PostDTO toDTO(PostEntity postEntity){
        ModelMapper mapper = new ModelMapper();
        List<CommentEntity> commentEntities = commentRepository.findAllByPostId(postEntity.getId());
        PostDTO postDTO = mapper.map(postEntity,PostDTO.class);
        postDTO.setThumbnail(FileUtil.decompressFile(postEntity.getThumbnail()));
        postDTO.setCommentCount(commentEntities.size());
        return postDTO;
    }

    public static PostEntity toEntity(PostDTO postDTO){
        ModelMapper mapper = new ModelMapper();
        PostEntity postEntity = mapper.map(postDTO,PostEntity.class);
        postEntity.setThumbnail(FileUtil.compressFile(postDTO.getThumbnail()));
        return postEntity;
    }
}
