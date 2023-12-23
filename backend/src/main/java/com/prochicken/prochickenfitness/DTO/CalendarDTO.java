package com.prochicken.prochickenfitness.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDTO {
    private Integer id;
    private LocalDate generateDate;

    private List<Integer> dailyWorkouts;
}
