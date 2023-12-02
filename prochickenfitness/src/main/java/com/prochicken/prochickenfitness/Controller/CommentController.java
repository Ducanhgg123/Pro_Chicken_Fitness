package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.CommentDTO;
import com.prochicken.prochickenfitness.Transfer.CommentTransfer;
import com.prochicken.prochickenfitness.entity.CommentEntity;
import com.prochicken.prochickenfitness.entity.PostEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.CommentRepository;
import com.prochicken.prochickenfitness.repository.PostRepository;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private UserRepository userRepository;
    private CommentRepository commentRepository;
    private PostRepository postRepository;

    @Autowired
    public CommentController(UserRepository userRepository, CommentRepository commentRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @GetMapping("/")
    public List<CommentDTO> getComments(){
        List<CommentEntity> commentEntities = commentRepository.findAll();
        List<CommentDTO> commentDTOS = commentEntities.stream().map(e -> CommentTransfer.toDTO(e)).toList();
        return commentDTOS;
    }

    @GetMapping("/{id}")
    public CommentDTO getComment(@PathVariable(name = "id") int id){
        CommentEntity commentEntity = commentRepository.findById(id).get();
        return CommentTransfer.toDTO(commentEntity);
    }


    @PostMapping("/")
    public CommentDTO createComment(@RequestBody  Map<String, Object> api){
        String content = (String) api.get("content");
        String username = (String) api.get("username");
        int postId = (int) api.get("postId");
        PostEntity post = postRepository.findById(postId).get();
        UserEntity user = userRepository.findByUsername(username).get();
        CommentEntity comment = new CommentEntity();
        comment.setContent(content);
        comment.setCommentUser(user);
        comment.setPost(post);
        comment = commentRepository.save(comment);
        post.addComment(comment);
        postRepository.save(post);
        return CommentTransfer.toDTO(comment);
    }

    @PutMapping("/")
    public CommentDTO updateComment(@RequestBody CommentDTO commentDTO){
        CommentEntity commentEntity = commentRepository.save(CommentTransfer.toEntity(commentDTO));
        return CommentTransfer.toDTO(commentEntity);
    }

    @DeleteMapping("/")
    public CommentDTO deleteComment(@RequestBody Map<String,Integer> api){
        int postId = api.get("postId");
        int commentId = api.get("commentId");
        PostEntity postEntity = postRepository.findById(postId).get();
        CommentEntity commentEntity = commentRepository.findById(commentId).get();
        postEntity.removeComment(commentEntity);
        commentEntity.setCommentUser(null);
        commentRepository.delete(commentEntity);
        return CommentTransfer.toDTO(commentEntity);
    }
}
