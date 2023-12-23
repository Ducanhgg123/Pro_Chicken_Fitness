package com.prochicken.prochickenfitness.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "calendar")
@Data
public class CalendarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "generate_date")
    private LocalDate generateDate;

    @OneToMany(mappedBy = "calendar",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<DailyWorkoutEntity> dailyWorkouts;

    public void addDailyWorkout(DailyWorkoutEntity dailyWorkout){
        if (dailyWorkouts==null){
            dailyWorkouts = new ArrayList<>();
        }

        dailyWorkouts.add(dailyWorkout);
    }

    public void removeDailyWorkout(DailyWorkoutEntity dailyWorkout){
        if (dailyWorkouts==null){
            return;
        }
        dailyWorkouts.remove(dailyWorkout);
    }
}
