package com.prochicken.prochickenfitness.Controller;

import com.prochicken.prochickenfitness.DTO.AuthenticationRequest;
import com.prochicken.prochickenfitness.DTO.AuthenticationResponse;
import com.prochicken.prochickenfitness.DTO.RegisterDTO;
import com.prochicken.prochickenfitness.DTO.RegisterResponseDTO;
import com.prochicken.prochickenfitness.Service.MyUserDetailService;
import com.prochicken.prochickenfitness.Util.JwtUtil;
import com.prochicken.prochickenfitness.entity.RoleEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;
import com.prochicken.prochickenfitness.repository.RoleRepository;
import com.prochicken.prochickenfitness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/authentication")
public class AuthenticationController {
    private AuthenticationManager authenticationManager;

    private JwtUtil jwtUtil;

    private MyUserDetailService myUserDetailService;

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                                     MyUserDetailService myUserDetailService, UserRepository userRepository,
                                     RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.myUserDetailService = myUserDetailService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @RequestMapping({"/hello"})
    public String hello(){
        return "Hello world";
    }

    @RequestMapping({"/admin"})
    public String forAdmin(){
        return "This is for admin only";
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException(e);
        }

        final UserDetails user = myUserDetailService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO){
        if (userRepository.existsByUsername(registerDTO.getUsername())){
            return new ResponseEntity<>(new RegisterResponseDTO(registerDTO.getUsername(),false), HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        RoleEntity role = roleRepository.findByName("ROLE_USER").get();
        List<RoleEntity> roles = List.of(role);

        user.setRoles(roles);
        userRepository.save(user);
        return new ResponseEntity<>(new RegisterResponseDTO(registerDTO.getUsername(), true),HttpStatus.OK);
    }
}
