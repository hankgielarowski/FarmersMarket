package com.theironyard.services;

import com.theironyard.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

/**
 * Created by drewmunnerlyn on 4/6/16.
 */
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByName (String userName);
    ArrayList<User> findByIsValid (boolean isValid);
    ArrayList<User> findByUserType (String userType);
}
