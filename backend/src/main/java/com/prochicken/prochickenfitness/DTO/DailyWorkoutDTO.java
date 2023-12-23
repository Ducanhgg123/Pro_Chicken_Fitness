package com.prochicken.prochickenfitness.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyWorkoutDTO {
    private Integer id;
    private LocalDate dateSet;

    private List<DishDTO> dishes;

    private List<WorkoutActivityDTO> activities;

}
