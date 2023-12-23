package com.prochicken.prochickenfitness.Fake;

import com.github.javafaker.Faker;
import com.prochicken.prochickenfitness.Util.ByteConverter;
import com.prochicken.prochickenfitness.Util.FileUtil;
import com.prochicken.prochickenfitness.entity.CalendarEntity;
import com.prochicken.prochickenfitness.entity.RoleEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.CalendarRepository;
import com.prochicken.prochickenfitness.repository.IngredientRepository;
import com.prochicken.prochickenfitness.repository.RoleRepository;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserFaker {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private CalendarRepository calendarRepository;
    private IngredientRepository ingredientRepository;
    private PasswordEncoder passwordEncoder;

    private final Faker faker = new Faker();

    public UserFaker(UserRepository userRepository, RoleRepository roleRepository, CalendarRepository calendarRepository,
                     IngredientRepository ingredientRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.calendarRepository = calendarRepository;
        this.ingredientRepository = ingredientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity getFakeUser(){
        UserEntity user = new UserEntity();
        String username = faker.name().username();
        while (userRepository.findByUsername(username).isPresent()){
            System.out.println(username);
            username = faker.name().username();
        }
        user.setUsername(username);
        String password = "hello";
        user.setPassword(passwordEncoder.encode(password));
        user.setFullname(faker.name().fullName());
        user.setEmail(faker.internet().emailAddress());
        user.setDateOfBirth(faker.date().birthday());
        user.setDescription(faker.lorem().sentence());
        user.setAvatar(FileUtil.compressFile(ByteConverter.convertToByteWrapperArray(faker.internet().image().getBytes())));
        user.setAddress(faker.address().fullAddress());
        user.setPhoneNumber(faker.phoneNumber().cellPhone());
        user.setWorkoutFrequency(faker.number().numberBetween(1, 7));
        user.setPrice(0);
        RoleEntity role = roleRepository.findByName("ROLE_USER").get();
        List<RoleEntity> roles = List.of(role);
        user.setRoles(roles);
        CalendarEntity calendarEntity = new CalendarEntity();
        calendarEntity = calendarRepository.save(calendarEntity);
        user.setCalendar(calendarEntity);
        return user;
    }
}
