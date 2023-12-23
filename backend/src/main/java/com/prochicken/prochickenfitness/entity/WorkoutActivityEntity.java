package com.prochicken.prochickenfitness.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "workout_activities")
@Data
public class WorkoutActivityEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "picture",length = 500000)
    private Byte[] picture;


}
