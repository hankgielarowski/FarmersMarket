package com.theironyard.controllers;

import com.theironyard.entities.Category;
import com.theironyard.entities.Inventory;
import com.theironyard.entities.Order;
import com.theironyard.entities.User;
import com.theironyard.services.*;
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
import java.time.LocalDateTime;
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

    @Autowired
    CategoryRepository categories;

    @Autowired
    OrderRepository orders;

    @Autowired
    SoldRepository sales;

    Server dbui = null;

    @PostConstruct
    public void init() throws SQLException, FileNotFoundException {
        dbui = Server.createWebServer().start();
    }

    @PreDestroy
    public void destroy() {
        dbui.stop();
    }

    @PostConstruct
    public void constructAdminAndTestUsers() throws PasswordStorage.CannotPerformOperationException {
        if (users.findByUserName("Admin") == null) {
            User user = new User("Admin", PasswordStorage.createHash("admin"),"Admin","FarmersMarket", "Here", "888-888-8888", "FarmersMarket@FarmersMarket.com", true);
            users.save(user);
            User user2 = new User("HankFarming", PasswordStorage.createHash("hank"), "Farmer", "Hank Farms", "Charleston", "999-999-9999", "Hank@Hank.com", true);
            users.save(user2);
            User user3 = new User("FrankStore", PasswordStorage.createHash("frank"), "Buyer", "Frank's Store", "Charleston", "777-989-9998", "Frank@Frank.com", true);
            users.save(user3);
        }
    }

//    @PostConstruct
//    public void constructInventory(){
//
//    }

    @PostConstruct
    public void categoryParse() throws FileNotFoundException {
        if (categories.count() == 0) {
            File f = new File("categoryCSV.csv");
            Scanner fileScanner = new Scanner(new File("categoryCSV.csv"));
            fileScanner.nextLine();
            while (fileScanner.hasNext()) {
                String line = fileScanner.nextLine();
                String[] column = line.split(",");
                Category c = new Category(column[0], column[1]);
                categories.save(c);
            }
        }
    }

    @RequestMapping(path = "/users", method = RequestMethod.POST)
    public User createUser(@RequestBody User user) throws Exception {
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
        return user;
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
    public ArrayList<Inventory> getAllInventoryByCategory(@PathVariable("category") String category, HttpSession session) {
        return (ArrayList<Inventory>) inventories.findByCategory(category);
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

    @RequestMapping(path = "/categories", method = RequestMethod.GET)
    public ArrayList<Category> getAllCategories(HttpSession session) {
        return (ArrayList<Category>) categories.findAll();
    }

    @RequestMapping(path = "/categories/{letter}", method = RequestMethod.GET)
    public ArrayList<Category> getCategoryByLetter(HttpSession session, @PathVariable("letter") String letter) {
        return categories.findByCategoryNameStartingWith(letter);
    }

//    @RequestMapping(path = "/orders/{pending}", method = RequestMethod.GET)
//    public ArrayList<Order> getOrdersPending(HttpSession session, @PathVariable("pending") boolean pending) {
//        String userName = (String) session.getAttribute("userName");
//        User user = users.findByUserName(userName);
//        ArrayList<Order> orderList = new ArrayList<Order>();
//        if(user.getUserType().equals("Farmer")) {
//            orderList = orders.findByIsPendingApprovalAndFarmer(pending, user.getUserName());
//        }
//        else if (user.getUserType().equals("Buyer")) {
//            orderList = orders.findByIsPendingApprovalAndBuyer(pending, user.getUserName());
//        }
//        return orderList;
//    }
//
//    @RequestMapping(path = "/orders", method = RequestMethod.POST)
//    public void createOrder(HttpSession session, @RequestBody Order order) {
//        order.setTimeStampOrdered(LocalDateTime.now());
//        orders.save(order);
//    }
//
//    @RequestMapping(path = "/orders/{id}", method = RequestMethod.DELETE)
//    public void deleteOrder(HttpSession session, @PathVariable("id") int id) throws Exception {
//        if(orders.findOne(id).isPendingApproval() == false) {
//            throw new Exception("invalid request");
//        }
//        orders.delete(id);
//    }
//
//    @RequestMapping(path = "/orders/{userId}", method = RequestMethod.GET)
//    public ArrayList<Order> getUserOrders(HttpSession session, @PathVariable("userId") int id) throws Exception {
//        String userName = (String) session.getAttribute("userName");
//        User user = users.findByUserName(userName);
//
//        if(!user.getUserType().equals("Admin")){
//            throw new Exception("insufficient permisions");
//        }
//        User checkedUser = users.findOne(id);
//
//        return orders.findByFarmerOrBuyer(checkedUser.getUserName(), checkedUser.getUserName());
//    }


    // frontend will handle the buyers' order validation by just not sending the validated (GET route) to backend until the buyer clicks "confirm"
    // need to explain to frontend that they should display a purchse button next to each item
    // when deleting a user or inventory object, need to figure out the parenthood/cascading

}
