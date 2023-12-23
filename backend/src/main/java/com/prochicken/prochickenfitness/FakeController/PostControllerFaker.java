package com.prochicken.prochickenfitness.FakeController;

import com.github.javafaker.Faker;
import com.prochicken.prochickenfitness.DTO.PostDTO;
import com.prochicken.prochickenfitness.Fake.PostFaker;
import com.prochicken.prochickenfitness.Transfer.PostTransfer;
import com.prochicken.prochickenfitness.entity.PostEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/fake/post")
public class PostControllerFaker {
    private PostFaker postFaker;
    private UserRepository userRepository;

    @Autowired
    public PostControllerFaker(PostFaker postFaker, UserRepository userRepository) {
        this.postFaker = postFaker;
        this.userRepository = userRepository;
    }

    @PostMapping("/create/")
    public List<PostDTO> createFakePost(){
        List<UserEntity> users = userRepository.findAll();
        List<PostDTO> posts = new ArrayList<>();
        Faker faker = new Faker();
        for (UserEntity user:users){
            for (int i=0;i<faker.number().numberBetween(5,10);i++){
                posts.add(PostTransfer.toDTO(postFaker.getFakePost(user)));
            }
        }
        return posts;
    }
}
