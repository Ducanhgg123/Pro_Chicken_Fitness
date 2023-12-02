package com.prochicken.prochickenfitness.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "dish")
public class DishEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "total_calories")
    private Integer totalCalories;

    @Lob
    @Column(name = "picture",length = 500000)
    private Byte[] picture;

    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(name = "dish_ingredient",
    joinColumns = @JoinColumn(name = "dish_id"),
    inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
    private List<IngredientEntity> ingredients;

    
}
