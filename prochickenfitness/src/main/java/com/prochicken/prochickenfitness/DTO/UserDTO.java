package com.prochicken.prochickenfitness.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String username;
    private String fullname;
    private String address;
    private String email;
    private String phoneNumber;

    private Float height;

    private Float weight;
    private Integer workoutFrequency;
    private Date dateOfBirth;
    private String gender;

    private Byte[] avatar;

    private String description;
    private Integer price;

}
