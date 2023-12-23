package com.prochicken.prochickenfitness.FakeController;

import com.prochicken.prochickenfitness.Fake.UserFaker;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/fake/user")
public class UserControllerFaker {
    private UserFaker userFaker;
    private UserRepository userRepository;

    @Autowired
    public UserControllerFaker(UserFaker userFaker, UserRepository userRepository) {
        this.userFaker = userFaker;
        this.userRepository = userRepository;
    }

    @PostMapping("/create/{number}")
    public String createFakeUser(@PathVariable(name = "number") int number){
        for (int i = 0; i < number; i++) {
            UserEntity user = userFaker.getFakeUser();
            userRepository.save(user);
        }
        return "success";
    }
}
