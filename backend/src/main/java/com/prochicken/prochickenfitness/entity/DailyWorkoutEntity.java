package com.prochicken.prochickenfitness.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "daily_workout")
@Data
public class DailyWorkoutEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "date_set")
    private LocalDate dateSet;

    @ManyToMany(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(name = "daily_dish",
    joinColumns = @JoinColumn(name = "daily_id"),
    inverseJoinColumns = @JoinColumn(name = "dish_id"))
    private List<DishEntity> dishes;

    @ManyToMany(fetch = FetchType.EAGER,cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinTable(name = "daily_activities",
    joinColumns = @JoinColumn(name = "daily_id"),
    inverseJoinColumns = @JoinColumn(name = "activity_id"))
    private List<WorkoutActivityEntity> activities;

    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.MERGE,
            CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "calendar_id")
    private CalendarEntity calendar;


    public void addDish(DishEntity dish){
        if (dishes ==null){
            dishes=new ArrayList<>();
        }
        dishes.add(dish);
    }

    public void addActivity(WorkoutActivityEntity workoutActivityEntity){
        if (activities==null){
            activities = new ArrayList<>();
        }
        activities.add(workoutActivityEntity);
    }
}
