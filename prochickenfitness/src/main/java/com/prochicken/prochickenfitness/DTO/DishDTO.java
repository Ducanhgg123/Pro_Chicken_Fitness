package com.prochicken.prochickenfitness.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DishDTO {
    private Integer id;
    private String name;
    private Integer totalCalories;
    private Byte[] picture;

}
