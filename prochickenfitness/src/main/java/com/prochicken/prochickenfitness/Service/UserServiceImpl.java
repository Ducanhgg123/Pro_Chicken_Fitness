package com.prochicken.prochickenfitness.Service;

import com.prochicken.prochickenfitness.Util.ByteConverter;
import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;

    private FileUtil fileUtil;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public Boolean uploadAvatar(MultipartFile file,String username) throws IOException {
        UserEntity user = userRepository.findByUsername(username).get();
        user.setAvatar(FileUtil.compressFile(ByteConverter.convertToByteWrapperArray(file.getBytes())));
        userRepository.save(user);
        return true;
    }

    @Override
    public Byte[] downloadAvatar(String username) {
        UserEntity user = userRepository.findByUsername(username).get();
        Byte[] avatar = FileUtil.decompressFile(user.getAvatar());
        return avatar;
    }
}
