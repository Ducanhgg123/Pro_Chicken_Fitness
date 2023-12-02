package com.prochicken.prochickenfitness.Service;

import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    Boolean uploadAvatar(MultipartFile file,String username) throws IOException;

    Byte[] downloadAvatar(String username);
}
