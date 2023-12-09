package com.prochicken.prochickenfitness.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "post")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Lob
    @Column(name = "thumbnail", length=500000)
    private Byte[] thumbnail;

    @Column(name = "post_date")
    private LocalDate postDate;

    @Column(name = "content")
    private String content;

    @Column(name = "like_count")
    private int likeCount;

    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "post")
    private List<CommentEntity> comments;

    public void addComment(CommentEntity comment){
        if (comments==null){
            comments = new ArrayList<>();
        }
        comments.add(comment);
    }

    public void removeComment(CommentEntity comment){
        if (comments==null){
            return;
        }
        comments.remove(comment);
    }
}
