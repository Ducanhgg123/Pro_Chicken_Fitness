package com.prochicken.prochickenfitness.Transfer;


import com.prochicken.prochickenfitness.DTO.PostDTO;
import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.PostEntity;
import org.modelmapper.ModelMapper;

public class PostTransfer {

    public static PostDTO toDTO(PostEntity postEntity){
        ModelMapper mapper = new ModelMapper();
        PostDTO postDTO = mapper.map(postEntity,PostDTO.class);
        postDTO.setThumbnail(FileUtil.decompressFile(postEntity.getThumbnail()));
        return postDTO;
    }

    public static PostEntity toEntity(PostDTO postDTO){
        ModelMapper mapper = new ModelMapper();
        PostEntity postEntity = mapper.map(postDTO,PostEntity.class);
        postEntity.setThumbnail(FileUtil.compressFile(postDTO.getThumbnail()));
        return postEntity;
    }
}
