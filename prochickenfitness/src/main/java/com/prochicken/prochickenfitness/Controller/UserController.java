package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.UserDTO;
import com.prochicken.prochickenfitness.Service.UserService;
import com.prochicken.prochickenfitness.Transfer.UserTransfer;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private UserRepository userRepository;

    private UserService userService;

    @Autowired
    public UserController(UserRepository userRepository,
                          UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }


    @GetMapping("/")
    public List<UserEntity> getUsers(){
        return userRepository.findAll();
    }

    @PostMapping("/update/avatar")
    public ResponseEntity<?> updateAvatar(@RequestParam("avatar")MultipartFile file,
                                          @RequestParam("username") String username) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.uploadAvatar(file,username));
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUser(@PathVariable(name = "username") String username){
        Byte[] avatar = userService.downloadAvatar(username);
        UserDTO userDTO = UserTransfer.toDTO(userRepository.findByUsername(username).get());
        userDTO.setAvatar(avatar);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable(name = "username") String username,
                                        @RequestBody(required = false) UserDTO userDTO){
        UserEntity userEntity = userRepository.findByUsername(username).get();
        userEntity = UserTransfer.toEntity(userEntity,userDTO);
        userDTO = UserTransfer.toDTO(userRepository.save(userEntity));
        return ResponseEntity.ok(userDTO);
    }

}
