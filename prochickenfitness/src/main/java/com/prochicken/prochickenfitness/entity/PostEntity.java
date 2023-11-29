package com.prochicken.prochickenfitness.entity;

import jakarta.persistence.*;
import lombok.Data;

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
    private Date postDate;

    @Column(name = "content")
    private String content;

    @Column(name = "like_count")
    private int likeCount;

    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(name = "post_comment",
    joinColumns = @JoinColumn(name = "post_id"),
    inverseJoinColumns = @JoinColumn(name = "comment_id"))
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
