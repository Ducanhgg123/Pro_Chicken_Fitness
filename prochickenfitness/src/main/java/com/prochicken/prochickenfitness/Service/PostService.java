package com.prochicken.prochickenfitness.Service;

import com.prochicken.prochickenfitness.entity.UserEntity;

public interface PostService {
    UserEntity getUserByPostId(int id);
}
