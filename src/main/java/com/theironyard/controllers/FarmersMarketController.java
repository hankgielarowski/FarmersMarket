package com.theironyard.controllers;

import com.theironyard.entities.Inventory;
import com.theironyard.entities.User;
import com.theironyard.services.InventoryRepository;
import com.theironyard.services.UserRepository;
import com.theironyard.utilities.PasswordStorage;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;


/**
 * Created by drewmunnerlyn on 4/6/16.
 */

@RestController
public class FarmersMarketController {

    @Autowired
    UserRepository users;

    @Autowired
    InventoryRepository inventories;

    Server dbui = null;

    @PostConstruct
    public void init() throws SQLException, SQLException, FileNotFoundException {
        dbui = Server.createWebServer().start();
    }

    @PreDestroy
    public void destroy() {
        dbui.stop();
    }

    @PostConstruct
    public void construct() throws PasswordStorage.CannotPerformOperationException {
        if (users.findByUserName("Admin") == null) {
            User user = new User("Admin", PasswordStorage.createHash("admin"), "Admin", "FarmersMarket", "Here", "888-888-8888", "FarmersMarket@FarmersMarket.com", "admin");
            users.save(user);
        }
    }

    @RequestMapping(path = "/users", method = RequestMethod.POST)
    public void createUser(@RequestBody User user) throws Exception {
        if(!user.getUserType().equals("Buyer") && !user.getUserType().equals("Farmer")) {
            throw new Exception("Invalid user type");
        }
        if (user.getPasswordHash().equals(user.getPasswordValidate())) {
            user.setPasswordHash(PasswordStorage.createHash(user.getPasswordHash()));
            users.save(user);
        }
        else {
            throw new Exception("password does not match");
        }
    }

    @RequestMapping(path = "/users/{id}", method = RequestMethod.PUT)
    public void updateUser(@RequestBody User newUser, @PathVariable("id") int id, HttpSession session) {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(user.getUserType().equals("Admin")) {
            users.save(newUser);
        }
        else if(user.getId() == id) {
            users.save(newUser);
        }
    }

    @RequestMapping(path = "/users/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("id") int id, HttpSession session) {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(user.getUserType().equals("Admin")) {
            users.delete(id);
        }
        else if(user.getId() == id) {
            users.delete(id);
        }
    }

    @RequestMapping(path = "/users", method = RequestMethod.GET)
    public ArrayList<User> getAllUsers(HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
//        if(!user.getUserType().equals("Admin")) {
//            throw new Exception("Insufficient Permissions.");
//        }
        return (ArrayList<User>) users.findAll();
    }

    @RequestMapping(path = "/users/{id}", method = RequestMethod.GET)
    public User getOneUser(@PathVariable("id") int id) {
        return users.findOne(id);
    }

    @RequestMapping(path = "/users/category/{category}", method = RequestMethod.GET)
    public ArrayList<User> getUsersInCategory(HttpSession session, @PathVariable("category") String category) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(!user.getUserType().equals("Admin") || !user.getUserType().equals("Buyer")) {
            throw new Exception("Insufficient Permissions");
        }
        return users.findByUserType(category);
    }

    @RequestMapping(path = "/users/validate/{id}", method = RequestMethod.PUT)
    public void validateUser(@PathVariable("id") int id, HttpSession session) {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(user.getUserType().equals("Admin")) {
            User newUser = users.findOne(id);
            newUser.setValid(true);
        }
    }

    @RequestMapping(path = "/users/validate", method = RequestMethod.GET)
    public ArrayList<User> getValidatingUsers(HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        if(!user.getUserType().equals("Admin")) {
            throw new Exception("Insufficient Permissions");
        }
        ArrayList<User> validatingUsers = users.findByIsValid(false);
        return validatingUsers;
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User login(HttpSession session, @RequestBody User user) throws Exception {
        User user2 = users.findByUserName(user.getUserName());
        if (!PasswordStorage.verifyPassword(user.getPasswordHash(), user2.getPasswordHash())) {
            throw new Exception("Wrong Password");
        }
        session.setAttribute("userName", user.getUserName());
        return user2;
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public void logout(HttpSession session) throws IOException {
        session.invalidate();
    }

    @RequestMapping(path = "/inventory", method = RequestMethod.POST)
    public Inventory createInventory(@RequestBody Inventory inventory, HttpSession session) throws Exception {
        String userName = (String) session.getAttribute("userName");
        User user = users.findByUserName(userName);
        inventory.setUser(user);
        inventories.save(inventory);
        return inventory;
    }

    @RequestMapping(path = "/inventory", method = RequestMethod.GET)
    public List<Inventory> getAllInventory() {
        return (List<Inventory>) inventories.findAll();
    }

    // show all inventory by category findByCategory
    @RequestMapping(path = "/inventory/{category}", method = RequestMethod.GET)
    public List<Inventory> getAllInventoryByCategory() {
        return (List<Inventory>) inventories.findAll();
    }

    //is getOne needed?
    @RequestMapping(path = "/inventory/{id}", method = RequestMethod.GET)
    public Inventory getOneInventory(@PathVariable("id") int id) {
        return inventories.findOne(id);
    }

    @RequestMapping(path = "/inventory/{id}", method = RequestMethod.DELETE)
    public void deleteInventory(@PathVariable("id") int id) {
        inventories.delete(id);
    }

    //is this one written right? to edit an inventory item...
    @RequestMapping(path = "/inventory/{id}", method = RequestMethod.PUT)
    public void updateInventory(@RequestBody Inventory inventory, @PathVariable("id") int id) {
        inventories.save(inventory);
    }

}
