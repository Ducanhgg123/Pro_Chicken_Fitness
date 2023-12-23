package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.UserDTO;
import com.prochicken.prochickenfitness.Transfer.UserTransfer;
import com.prochicken.prochickenfitness.entity.RoleEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.RoleRepository;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coach")
public class CoachController {
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public CoachController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/")
    public List<UserDTO> getCoaches(){
        List<UserEntity> coachEntities = userRepository.findAllCoach();
        List<UserDTO> coachDTOS = coachEntities.stream().map(e -> UserTransfer.toDTO(e)).toList();
        return coachDTOS;
    }

    @PostMapping("/becomeCoach/{username}")
    public UserDTO becomeCoach(@PathVariable(name = "username") String username){
        UserEntity user = userRepository.findByUsername(username).get();
        RoleEntity role = roleRepository.findByName("ROLE_COACH").get();
        user.addRole(role);
        user = userRepository.save(user);
        return UserTransfer.toDTO(user);
    }

    @GetMapping("/find/coach/{username}")
    public UserDTO findCoachByUsername(@PathVariable(name = "username") String username){
        UserEntity user = userRepository.findUserCoach(username);
        return UserTransfer.toDTO(user);
    }

    @GetMapping("/find/client/{username}")
    public List<UserDTO> findClientByUsername(@PathVariable(name = "username") String username){
        List<UserEntity> user = userRepository.findClientForCoach(username);
        return user.stream().map(e -> UserTransfer.toDTO(e)).toList();
    }
}
