package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.CommentDTO;
import com.prochicken.prochickenfitness.DTO.CommentWithUserDTO;
import com.prochicken.prochickenfitness.DTO.PostDTO;
import com.prochicken.prochickenfitness.Service.PostService;
import com.prochicken.prochickenfitness.Transfer.CommentTransfer;
import com.prochicken.prochickenfitness.Transfer.PostTransfer;
import com.prochicken.prochickenfitness.Util.ByteConverter;
import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.CommentEntity;
import com.prochicken.prochickenfitness.entity.PostEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.CommentRepository;
import com.prochicken.prochickenfitness.repository.PostRepository;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/post")
public class PostController {
    private UserRepository userRepository;
    private PostRepository postRepository;

    private PostService postService;

    private CommentRepository commentRepository;

    @Autowired
    public PostController(UserRepository userRepository, PostRepository postRepository,
                          PostService postService, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.postService = postService;
        this.commentRepository = commentRepository;
    }

    @GetMapping("/")
    public List<PostDTO> getPosts(){
        List<PostEntity> postEntities = postRepository.findAll();
        List<PostDTO> postDTOS = postEntities.stream().map(e -> PostTransfer.toDTO(e)).toList();
        return postDTOS;
    }

    @GetMapping("/{id}")
    public PostDTO getPost(@PathVariable(name = "id") int id){
        PostEntity postEntity = postRepository.findById(id).get();
        return PostTransfer.toDTO(postEntity);
    }

    @GetMapping("/user/{username}")
    public List<PostDTO> getAllPostByUsername(@PathVariable(name = "username") String username){
        List<PostEntity> postEntities =  postRepository.findByUsername(username);
        List<PostDTO> postDTOS = postEntities.stream().map(e -> PostTransfer.toDTO(e)).toList();
        return postDTOS;
    }

    @PostMapping("/")
    public PostDTO createPost(@RequestParam(name = "thumbnail") MultipartFile thumbnail,
                              @RequestParam(name = "username") String username,
                              @RequestParam(name = "content") String content) throws IOException {
        UserEntity user = userRepository.findByUsername(username).get();
        PostDTO postDTO = new PostDTO();
        postDTO.setPostDate(LocalDate.now());
        postDTO.setId(0);
        postDTO.setContent(content);
        postDTO.setLikeCount(0);
        postDTO.setThumbnail(ByteConverter.convertToByteWrapperArray(thumbnail.getBytes()));
        PostEntity postEntity = PostTransfer.toEntity(postDTO);
        postEntity.setUser(user);
        postEntity = postRepository.save(postEntity);
        return PostTransfer.toDTO(postEntity);
    }

    @PutMapping("/")
    public PostDTO updatePost(@RequestBody PostDTO postDTO){
        PostEntity postEntity = PostTransfer.toEntity(postDTO);
        postEntity.setUser(postService.getUserByPostId(postDTO.getId()));
        postEntity = postRepository.save(postEntity);
        return PostTransfer.toDTO(postEntity);
    }

    @DeleteMapping("/{id}")
    public PostDTO deletePost(@PathVariable(name = "id") int id){
        PostEntity postEntity = postRepository.findById(id).get();
        for (CommentEntity comment:postEntity.getComments()){
            comment.setPost(null);
            comment.setCommentUser(null);
            commentRepository.delete(comment);
        }
        postRepository.delete(postEntity);
        return PostTransfer.toDTO(postEntity);
    }

    @PutMapping("/like/{id}")
    public PostDTO likePost(@PathVariable(name = "id") int id){
        PostEntity postEntity = postRepository.findById(id).get();
        postEntity.setLikeCount(postEntity.getLikeCount()+1);
        postEntity = postRepository.save(postEntity);
        return PostTransfer.toDTO(postEntity);
    }

    @GetMapping("/comment/{id}")
    public Map<String,Object> getPostComments(@PathVariable(name = "id") int id){
        List<CommentEntity> commentEntities = commentRepository.findAllByPostId(id);
        List<CommentWithUserDTO> commentDTOS = new ArrayList<>();
        for (CommentEntity commentEntity:commentEntities){
            CommentWithUserDTO commentDTO = new CommentWithUserDTO();
            commentDTO.setContent(commentEntity.getContent());
            commentDTO.setId(commentEntity.getId());
            UserEntity userEntity = commentEntity.getCommentUser();
            commentDTO.setUsername(userEntity.getUsername());
            commentDTO.setAvatar(FileUtil.decompressFile(userEntity.getAvatar()));
            commentDTOS.add(commentDTO);
        }
        Map<String,Object> map = Map.of("comments",commentDTOS,"numComment",commentDTOS.size());
        return map;
    }

}
