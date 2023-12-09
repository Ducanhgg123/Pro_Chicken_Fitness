package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.CommentDTO;
import com.prochicken.prochickenfitness.DTO.UserDTO;
import com.prochicken.prochickenfitness.DTO.UserIngredientDTO;
import com.prochicken.prochickenfitness.Service.UserService;
import com.prochicken.prochickenfitness.Transfer.CommentTransfer;
import com.prochicken.prochickenfitness.Transfer.UserTransfer;
import com.prochicken.prochickenfitness.entity.CommentEntity;
import com.prochicken.prochickenfitness.entity.IngredientEntity;
import com.prochicken.prochickenfitness.entity.RoleEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.CommentRepository;
import com.prochicken.prochickenfitness.repository.IngredientRepository;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController {

    private UserRepository userRepository;

    private UserService userService;

    private IngredientRepository ingredientRepository;

    private CommentRepository commentRepository;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService,
                          IngredientRepository ingredientRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.ingredientRepository = ingredientRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping("/")
    public List<UserDTO> getUsers(){
        List<UserEntity> userEntities = userRepository.findAll();
        List<UserDTO> userDTOS = userEntities.stream().map(e -> UserTransfer.toDTO(e)).toList();
        return userDTOS;
    }


    @GetMapping("/coaches")
    public List<UserDTO> getCoaches(){
        List<UserEntity> userEntities = userRepository.findUserByRoles_Name("ROLE_COACH");

        List<UserDTO> userDTOS = userEntities.stream().map(e -> UserTransfer.toDTO(e)).toList();
        return userDTOS;
    }

    @GetMapping("/users")
    public List<UserDTO> getNormalUsers(){
        List<UserEntity> userEntities = userRepository.findUserByRoles_Name("ROLE_USER");

        List<UserDTO> userDTOS = userEntities.stream().map(e -> UserTransfer.toDTO(e)).toList();
        return userDTOS;
    }

    @GetMapping("/admins")
    public List<UserDTO> getAdmins(){
        List<UserEntity> userEntities = userRepository.findUserByRoles_Name("ROLE_ADMIN");

        List<UserDTO> userDTOS = userEntities.stream().map(e -> UserTransfer.toDTO(e)).toList();
        return userDTOS;
    }

    @GetMapping("/roles/{username}")
    public List<RoleEntity> getRole(@PathVariable(name = "username") String username){
        return userRepository.findRoleOfUserByUsername(username);
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

    @PutMapping("/update/ingredient")
    public ResponseEntity<?> addIngredient(@RequestBody(required = false)UserIngredientDTO userIngredientDTO){
        List<IngredientEntity> ingredients = new ArrayList<>();
        for (Integer ingrId: userIngredientDTO.getIngredients()) {
            ingredients.add(ingredientRepository.findById(ingrId).get());
        }

        UserEntity userEntity = userRepository.findByUsername(userIngredientDTO.getUsername()).get();
        userEntity.setIngredients(ingredients);
        userRepository.save(userEntity);
        return ResponseEntity.ok(userIngredientDTO);
    }

    @PostMapping("/subcribe")
    public UserDTO subcribeCoach(@RequestBody Map<String,String> api){
        String username = api.get("username");
        String coachName = api.get("coachName");
        UserEntity user = userRepository.findByUsername(username).get();
        UserEntity coach = userRepository.findByUsername(coachName).get();
        user.setCoach(coach);
        user = userRepository.save(user);
        return UserTransfer.toDTO(user);
    }

    @GetMapping("/comment/{username}")
    public List<CommentDTO> getUserComments(@PathVariable(name = "username") String username){
        List<CommentEntity> commentEntities = commentRepository.findAllByUsername(username);
        List<CommentDTO> commentDTOS = commentEntities.stream().map(e -> CommentTransfer.toDTO(e)).toList();
        return commentDTOS;

    }
}
