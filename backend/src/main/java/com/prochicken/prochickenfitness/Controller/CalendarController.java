package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.CalendarDTO;
import com.prochicken.prochickenfitness.Service.CalendarService;
import com.prochicken.prochickenfitness.entity.CalendarEntity;
import com.prochicken.prochickenfitness.entity.DailyWorkoutEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.CalendarRepository;
import com.prochicken.prochickenfitness.repository.DailyWorkoutRepository;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {
    private DailyWorkoutRepository dailyWorkoutRepository;
    private CalendarRepository calendarRepository;

    private UserRepository userRepository;

    private CalendarService calendarService;

    public CalendarController(DailyWorkoutRepository dailyWorkoutRepository, CalendarRepository calendarRepository,
                              UserRepository userRepository, CalendarService calendarService) {
        this.dailyWorkoutRepository = dailyWorkoutRepository;
        this.calendarRepository = calendarRepository;
        this.userRepository = userRepository;
        this.calendarService = calendarService;
    }

    @GetMapping("/")
    public List<CalendarDTO> getCalendars(){
        List<CalendarEntity> calendarEntities = calendarRepository.findAll();
        List<CalendarDTO> calendarDTOS = new ArrayList<>();
        for (CalendarEntity calendarEntity:calendarEntities){
            CalendarDTO calendarDTO = new CalendarDTO();
            calendarDTO.setId(calendarEntity.getId());
            calendarDTO.setGenerateDate(calendarEntity.getGenerateDate());
            calendarDTO.setDailyWorkouts(calendarEntity.getDailyWorkouts().stream().map(e -> e.getId()).toList());
            calendarDTOS.add(calendarDTO);
        }
        return calendarDTOS;
    }

    @GetMapping("/{username}")
    public CalendarDTO getCalendarByUsername(@PathVariable(name = "username") String username){
        CalendarEntity calendarEntity = calendarRepository.findByUsername(username);
        CalendarDTO calendarDTO = new CalendarDTO();
        calendarDTO.setId(calendarEntity.getId());
        calendarDTO.setGenerateDate(calendarEntity.getGenerateDate());
        if (calendarEntity.getDailyWorkouts()!=null){
            calendarDTO.setDailyWorkouts(calendarEntity.getDailyWorkouts().stream().map(e -> e.getId()).toList());
        }
        return calendarDTO;
    }


    @PostMapping("/{username}")
    public CalendarDTO createCalendar(@PathVariable(name = "username") String username){
        UserEntity user = userRepository.findByUsername(username).get();
        CalendarEntity calendarEntity = new CalendarEntity();
        calendarEntity.setGenerateDate(LocalDate.now());
        calendarEntity = calendarRepository.save(calendarEntity);
        user.setCalendar(calendarEntity);
        userRepository.save(user);
        CalendarDTO calendarDTO = new CalendarDTO();
        calendarDTO.setId(calendarEntity.getId());
        calendarDTO.setGenerateDate(calendarEntity.getGenerateDate());
        return calendarDTO;
    }

    @PutMapping("/")
    public CalendarDTO updateCalendar(@RequestBody CalendarDTO calendarDTO){
        CalendarEntity calendarEntity = new CalendarEntity();
        calendarEntity.setId(calendarDTO.getId());
        calendarEntity.setGenerateDate(calendarDTO.getGenerateDate());
        if (calendarDTO.getDailyWorkouts()!=null){
            List<DailyWorkoutEntity> dailyWorkoutEntities = new ArrayList<>();
            for (Integer id: calendarDTO.getDailyWorkouts()){
                DailyWorkoutEntity dailyWorkoutEntity = dailyWorkoutRepository.findById(id).get();
                dailyWorkoutEntities.add(dailyWorkoutEntity);
            }

            calendarEntity.setDailyWorkouts(dailyWorkoutEntities);
            calendarEntity = calendarRepository.save(calendarEntity);
            for (DailyWorkoutEntity dailyWorkoutEntity:dailyWorkoutEntities){
                dailyWorkoutEntity.setCalendar(calendarEntity);
                dailyWorkoutRepository.save(dailyWorkoutEntity);
            }
        }
        calendarEntity = calendarRepository.save(calendarEntity);
        calendarDTO.setId(calendarEntity.getId());
        calendarDTO.setGenerateDate(calendarEntity.getGenerateDate());
        if (calendarEntity.getDailyWorkouts()!=null){
            calendarDTO.setDailyWorkouts(calendarEntity.getDailyWorkouts().stream().map(e -> e.getId()).toList());
        }
        return calendarDTO;
    }

    @DeleteMapping("/{username}")
    private CalendarDTO deleteCalendar(@PathVariable(name = "username") String username){
        CalendarEntity calendarEntity = calendarRepository.findByUsername(username);
        UserEntity user = userRepository.findByUsername(username).get();
        user.setCalendar(null);
        calendarRepository.delete(calendarEntity);
        userRepository.save(user);
        CalendarDTO calendarDTO = new CalendarDTO();
        calendarDTO.setId(calendarEntity.getId());
        calendarDTO.setGenerateDate(calendarEntity.getGenerateDate());
        if (calendarEntity.getDailyWorkouts()!=null){
            calendarDTO.setDailyWorkouts(calendarEntity.getDailyWorkouts().stream().map(e -> e.getId()).toList());
        }
        return calendarDTO;
    }

    @PostMapping("/generate")
    public CalendarDTO generateCalendarForUser(@RequestBody Map<String,Object> api){
        String username = (String) api.get("username");
        int caloriesPerDay = (int) api.get("caloriesPerDay");

//        Delete previous calendar
        UserEntity user = userRepository.findByUsername(username).get();
        CalendarEntity calendarEntity = calendarRepository.findByUsername(username);
        user.setCalendar(null);
        if (calendarEntity!=null){
            calendarRepository.delete(calendarEntity);
            userRepository.save(user);
        }


//        Generate a new calendar for user
        calendarEntity = calendarService.generateCalendar(caloriesPerDay,user);
        user.setCalendar(calendarEntity);
        userRepository.save(user);

//        Return calendarDTO
        CalendarDTO calendarDTO = new CalendarDTO();
        calendarDTO.setId(calendarEntity.getId());
        calendarDTO.setGenerateDate(calendarEntity.getGenerateDate());
        if (calendarEntity.getDailyWorkouts()!=null){
            calendarDTO.setDailyWorkouts(calendarEntity.getDailyWorkouts().stream().map(e -> e.getId()).toList());
        }
        return calendarDTO;
    }
}
