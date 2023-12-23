package com.prochicken.prochickenfitness.Fake;

import com.github.javafaker.Faker;
import com.prochicken.prochickenfitness.Util.ByteConverter;
import com.prochicken.prochickenfitness.entity.CommentEntity;
import com.prochicken.prochickenfitness.entity.PostEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.CommentRepository;
import com.prochicken.prochickenfitness.repository.PostRepository;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostFaker {
    private PostRepository postRepository;
    private UserRepository userRepository;

    private CommentRepository commentRepository;
    private final Faker faker = new Faker();

    public PostFaker(PostRepository postRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public PostEntity getFakePost(UserEntity user){
        PostEntity post = new PostEntity();
        post.setPostDate(LocalDate.now());
        post.setContent(faker.lorem().sentence());
        post.setLikeCount(faker.number().numberBetween(0, 100));
        post.setUser(user);
        post.setThumbnail(ByteConverter.convertToByteWrapperArray(faker.internet().image().getBytes()));
        post = postRepository.save(post);
        List<CommentEntity> comments = new ArrayList<>();
        List<UserEntity> users = userRepository.findAll();
        for (int i=0;i<faker.number().numberBetween(0, 10);i++){
            CommentEntity comment = new CommentEntity();
            comment.setContent(faker.lorem().sentence());
            comment.setCommentUser(users.get(faker.number().numberBetween(0, users.size())));
            comment.setPost(post);
            comment = commentRepository.save(comment);
            comments.add(comment);
        }
        post.setComments(comments);
        post = postRepository.save(post);
        return post;
    }
}
