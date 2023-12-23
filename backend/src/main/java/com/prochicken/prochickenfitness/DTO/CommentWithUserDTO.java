package com.prochicken.prochickenfitness.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentWithUserDTO {
    private Integer id;
    private String content;

    private Byte[] avatar;

    private String username;
}
